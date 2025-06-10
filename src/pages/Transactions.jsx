import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import NovaTransacaoModal from '../components/Transactions/NovaTransacaoModal';

function Transactions() {
    const [transacoes, setTransacoes] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [totalReceitas, setTotalReceitas] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const usuarioId = 1; // Trocar com ID real

    useEffect(() => {
        fetch(`http://localhost:8080/transacoes/${usuarioId}`)
            .then(res => res.json())
            .then(data => {
                setTransacoes(data);
                calcularResumo(data);
            })
            .catch(err => console.error('Erro ao buscar transações:', err));
    }, [usuarioId]);

    const calcularResumo = (lista) => {
        const receitas = lista.filter(t => t.tipo === 'Receita');
        const despesas = lista.filter(t => t.tipo === 'Despesa');

        const totalR = receitas.reduce((soma, r) => soma + r.valor, 0);
        const totalD = despesas.reduce((soma, d) => soma + d.valor, 0);

        setTotalReceitas(totalR);
        setTotalDespesas(totalD);
        setSaldo(totalR - totalD);
    };

    const salvarNovaTransacao = (transacao) => {
        const url = transacao.tipo === 'Receita'
            ? 'http://localhost:8080/receitas'
            : 'http://localhost:8080/despesas';

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transacao)
        })
            .then(res => res.json())
            .then(() => {
                fetch(`http://localhost:8080/transacoes/${usuarioId}`)
                    .then(res => res.json())
                    .then(data => {
                        setTransacoes(data);
                        calcularResumo(data);
                    });
            });
    };

    const excluirTransacao = (transacao) => {
        const endpoint = transacao.tipo === 'Receita'
            ? `http://localhost:8080/receitas/${transacao.id}`
            : `http://localhost:8080/despesas/${transacao.id}`;

        if (window.confirm('Deseja realmente excluir esta transação?')) {
            fetch(endpoint, { method: 'DELETE' })
                .then(() => {
                    const novaLista = transacoes.filter(t => t.id !== transacao.id);
                    setTransacoes(novaLista);
                    calcularResumo(novaLista);
                });
        }
    };

    const transacoesFiltradas = transacoes.filter(t =>
        filtro === '' ? true : t.tipo.toLowerCase() === filtro
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Transações</h1>
                    <button onClick={() => setShowModal(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Nova Transação
                    </button>
                </div>

                {/* Cards com valores automáticos */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <ResumoCard titulo="Receitas do Mês" valor={totalReceitas} cor="text-green-600" />
                    <ResumoCard titulo="Despesas do Mês" valor={totalDespesas} cor="text-red-600" />
                    <ResumoCard titulo="Saldo do Mês" valor={saldo} cor="text-blue-600" />
                </div>

                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6">
                        <div className="flex gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Pesquisar transações..."
                                className="flex-1 p-2 border rounded-lg"
                                disabled
                            />
                            <select
                                className="p-2 border rounded-lg"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                            >
                                <option value="">Todas as Categorias</option>
                                <option value="receita">Receitas</option>
                                <option value="despesa">Despesas</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3">Data</th>
                                    <th className="text-left py-3">Descrição</th>
                                    <th className="text-left py-3">Categoria</th>
                                    <th className="text-left py-3">Valor</th>
                                    <th className="text-left py-3">Tipo</th>
                                    <th className="text-left py-3">Ações</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transacoesFiltradas.map((t, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-3">{new Date(t.data).toLocaleDateString()}</td>
                                        <td>{t.descricao}</td>
                                        <td>{t.categoria || '-'}</td>
                                        <td className={t.tipo === 'Receita' ? 'text-green-600' : 'text-red-600'}>
                                            R$ {t.valor.toFixed(2)}
                                        </td>
                                        <td>{t.tipo}</td>
                                        <td>
                                            <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                                            <button
                                                onClick={() => excluirTransacao(t)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {transacoesFiltradas.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-gray-500">
                                            Nenhuma transação encontrada.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <NovaTransacaoModal
                    onClose={() => setShowModal(false)}
                    onSalvar={salvarNovaTransacao}
                />
            )}
        </div>
    );
}

function ResumoCard({ titulo, valor, cor }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{titulo}</h2>
            <p className={`text-3xl font-bold ${cor}`}>R$ {valor.toFixed(2)}</p>
        </div>
    );
}

export default Transactions;
