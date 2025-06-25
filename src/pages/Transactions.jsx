import { useEffect, useState, useContext } from 'react';
import Header from '../components/common/Header';
import NovaTransacaoModal from '../components/Transactions/NovaTransacaoModal';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from '../components/common/Table';
import { TrashIcon, PencilIcon } from "lucide-react";
import Button from "../components/common/Button";
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Transactions() {
    const { user } = useContext(AuthContext);
    const usuarioId = user?.id;

    console.log('user do contexto:', user);
    console.log('usuarioId:', usuarioId);

    const [transacoes, setTransacoes] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [termoBusca, setTermoBusca] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [totalReceitas, setTotalReceitas] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);
    const [saldo, setSaldo] = useState(0);

    const carregarTransacoes = async () => {
        if (!usuarioId) return;

        console.log('usuarioId usado na busca:', usuarioId);
        try {
            const [resReceitas, resDespesas] = await Promise.all([
                axios.get(`/usuarios/${usuarioId}/receitas`),
                axios.get(`/despesas`)
            ]);

            console.log('Receitas retornadas:', resReceitas.data);
            console.log('Despesas retornadas:', resDespesas.data);

            const receitas = resReceitas.data.map(r => ({ ...r, tipo: 'Receita' }));
            // Filtra despesas do usuário
            const despesas = resDespesas.data
                .filter(d => d.usuario && d.usuario.id === usuarioId)
                .map(d => ({ ...d, tipo: 'Despesa' }));

            const todas = [...receitas, ...despesas];
            setTransacoes(todas);
            calcularResumo(todas);
        } catch (error) {
            console.error('Erro ao carregar transações:', error);
        }
    };

    useEffect(() => {
        carregarTransacoes();
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

    const salvarNovaTransacao = async (transacao) => {
        if (!usuarioId) {
            alert('Usuário não identificado. Faça login novamente.');
            return;
        }
        try {
            let endpoint;
            let payload = { ...transacao };
            if (transacao.tipo === 'Receita') {
                endpoint = `/usuarios/${usuarioId}/receitas`;
            } else {
                endpoint = '/despesas';
                payload = { ...payload, usuario: { id: usuarioId } };
            }

            console.log('Payload enviado no POST:', payload);
            const response = await axios.post(endpoint, payload);
            console.log('Response do POST:', response.data);
            await carregarTransacoes(); // Aguarda atualização
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao salvar transação:', error);
        }
    };

    const excluirTransacao = async (transacao) => {
        if (!window.confirm('Deseja realmente excluir esta transação?')) return;

        try {
            const endpoint = transacao.tipo === 'Receita'
                ? `/receitas/${transacao.id}`
                : `/despesas/${transacao.id}`;

            await axios.delete(endpoint);
            carregarTransacoes();
        } catch (error) {
            console.error('Erro ao excluir transação:', error);
        }
    };

    const transacoesFiltradas = transacoes.filter(t => {
        const correspondeBusca = t.descricao.toLowerCase().includes(termoBusca.toLowerCase());
        const correspondeFiltro = filtro === '' ? true : t.tipo.toLowerCase() === filtro;
        return correspondeBusca && correspondeFiltro;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Transações</h1>
                    <button
                        onClick={() => {
                            if (!usuarioId) {
                                alert('Você precisa estar logado para cadastrar uma transação.');
                                return;
                            }
                            setShowModal(true);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        disabled={!usuarioId}
                        style={!usuarioId ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                        Nova Transação
                    </button>
                </div>

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
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                            />
                            <select
                                className="p-2 border rounded-lg"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                            >
                                <option value="">Todos os Tipos</option>
                                <option value="receita">Receitas</option>
                                <option value="despesa">Despesas</option>
                            </select>
                        </div>

                        <TableRoot>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell className="text-black">Data</TableHeaderCell>
                                        <TableHeaderCell className="text-black">Descrição</TableHeaderCell>
                                        <TableHeaderCell className="text-black">Categoria</TableHeaderCell>
                                        <TableHeaderCell className="text-black">Valor</TableHeaderCell>
                                        <TableHeaderCell className="text-black">Tipo</TableHeaderCell>
                                        <TableHeaderCell className="text-black">Ações</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transacoesFiltradas.map((t, index) => (
                                        <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <TableCell>{new Date(t.data).toLocaleDateString()}</TableCell>
                                            <TableCell>{t.descricao}</TableCell>
                                            <TableCell>{t.categoria || '-'}</TableCell>
                                            <TableCell>R$ {t.valor.toFixed(2)}</TableCell>
                                            <TableCell>{t.tipo}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-row items-center gap-2">
                                                    <button className="inline-flex items-center justify-center p-2 rounded bg-black">
                                                        <PencilIcon className="text-white" size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => excluirTransacao(t)}
                                                        className="inline-flex items-center justify-center p-2 rounded bg-red-600">
                                                        <TrashIcon className="text-white" size={18} />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {transacoesFiltradas.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center">Nenhuma transação encontrada.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableRoot>
                    </div>
                </div>
            </main>

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
