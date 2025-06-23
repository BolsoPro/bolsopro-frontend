import Header from '../components/common/Header';
import { Card, Title, BarChart } from '@tremor/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from '../components/common/Table';
import { useTransactions } from '../context/TransactionsContext';

const valueFormatter = (number) => `R$ ${new Intl.NumberFormat('pt-BR').format(number).toString()}`;

function Dashboard() {
    const { transacoes } = useTransactions();

    const ultimasTransacoes = [...transacoes]
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, 3)
        .map(t => ({
            data: new Date(t.data).toLocaleDateString(),
            descricao: t.descricao,
            valor: t.valor,
            tipo: t.tipo
        }));

    // Calcula dados para o gráfico de despesas por categoria
    const dadosGraficoDespesas = Object.values(
        transacoes
            .filter((t) => t.tipo === 'Despesa' && t.categoria)
            .reduce((acc, t) => {
                acc[t.categoria] = acc[t.categoria]
                    ? { ...acc[t.categoria], valorDespesa: acc[t.categoria].valorDespesa + t.valor }
                    : { name: t.categoria, valorDespesa: t.valor };
                return acc;
            }, {})
    );

    // Novo: Dados para o gráfico de receitas por mês
    const receitasPorMes = transacoes
        .filter((t) => t.tipo === 'Receita')
        .reduce((acc, t) => {
            const mes = new Date(t.data).toLocaleString('pt-BR', { month: 'short', year: '2-digit' });
            acc[mes] = acc[mes] ? acc[mes] + t.valor : t.valor;
            return acc;
        }, {});
    const dadosGraficoReceitas = Object.entries(receitasPorMes).map(([mes, valorReceita]) => ({ mes, valorReceita }));

    // Calcula economia do mês (saldo)
    const totalReceitas = transacoes
        .filter((t) => t.tipo === 'Receita')
        .reduce((soma, r) => soma + r.valor, 0);

    const totalDespesas = transacoes
        .filter((t) => t.tipo === 'Despesa')
        .reduce((soma, d) => soma + d.valor, 0);

    const economiaDoMes = totalReceitas - totalDespesas;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <Title>Distribuição de Despesas</Title>
                        <BarChart
                            className="mt-6"
                            data={dadosGraficoDespesas}
                            index="name"
                            categories={["valorDespesa"]}
                            colors={["rose"]}
                            valueFormatter={valueFormatter}
                            yAxisWidth={48}
                        />
                    </Card>
                    <Card>
                        <Title>Receitas por Mês</Title>
                        <BarChart
                            className="mt-6"
                            data={dadosGraficoReceitas}
                            index="mes"
                            categories={["valorReceita"]}
                            colors={["emerald"]}
                            valueFormatter={valueFormatter}
                            yAxisWidth={48}
                        />
                    </Card>
                </div>

                {/* <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Economia do Mês</h2>
                    <p className="text-3xl font-bold text-blue-600">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(economiaDoMes)}
                    </p>
                </div> */}

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
                    <TableRoot>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell className="text-black">Data</TableHeaderCell>
                                    <TableHeaderCell className="text-black">Descrição</TableHeaderCell>
                                    <TableHeaderCell className="text-black">Valor</TableHeaderCell>
                                    <TableHeaderCell className="text-black">Tipo</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ultimasTransacoes.map((t, idx) => (
                                    <TableRow key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <TableCell>{t.data}</TableCell>
                                        <TableCell>{t.descricao}</TableCell>
                                        <TableCell className={t.tipo === 'Receita' ? 'text-green-600' : 'text-red-600'}>R$ {t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                                        <TableCell>{t.tipo}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableRoot>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
