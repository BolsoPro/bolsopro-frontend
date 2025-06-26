import { useContext, useState } from 'react';
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
import { AuthContext } from '../context/AuthContext';
import { useTransactions } from '../context/TransactionsContext';

function Transactions() {
    const { user } = useContext(AuthContext);
    const usuarioId = user?.id;
    const { transacoes, adicionarTransacao, removerTransacao } = useTransactions();

    const [filtro, setFiltro] = useState('');
    const [termoBusca, setTermoBusca] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Resumo
    const receitas = transacoes.filter(t => t.tipo === 'Receita');
    const despesas = transacoes.filter(t => t.tipo === 'Despesa');
    const totalReceitas = receitas.reduce((soma, r) => soma + r.valor, 0);
    const totalDespesas = despesas.reduce((soma, d) => soma + d.valor, 0);
    const saldo = totalReceitas - totalDespesas;

    // Filtro e busca
    const transacoesFiltradas = transacoes.filter(t => {
        const correspondeBusca = t.descricao.toLowerCase().includes(termoBusca.toLowerCase());
        const correspondeFiltro = filtro === '' ? true : t.tipo.toLowerCase() === filtro;
        return correspondeBusca && correspondeFiltro;
    });

    // Salvar nova transação
    const salvarNovaTransacao = async (transacao) => {
        if (!usuarioId) {
            alert('Usuário não identificado. Faça login novamente.');
            return;
        }
        try {
            await adicionarTransacao(transacao);
            setShowModal(false);
        } catch (error) {
            alert('Erro ao salvar transação.');
        }
    };

    // Excluir transação
    const excluirTransacao = async (transacao) => {
        if (!window.confirm('Deseja realmente excluir esta transação?')) return;
        try {
            await removerTransacao(transacao);
        } catch (error) {
            alert('Erro ao excluir transação.');
        }
    };

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