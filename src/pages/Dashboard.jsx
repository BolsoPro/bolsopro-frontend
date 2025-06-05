import Header from '../components/common/Header';

function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Saldo Total</h2>
                        <p className="text-3xl font-bold text-green-600">R$ 15.000,00</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Economia do Mês</h2>
                        <p className="text-3xl font-bold text-blue-600">R$ 2.500,00</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3">Data</th>
                                    <th className="text-left py-3">Descrição</th>
                                    <th className="text-left py-3">Valor</th>
                                    <th className="text-left py-3">Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3">15/03/2024</td>
                                    <td>Salário</td>
                                    <td className="text-green-600">R$ 5.000,00</td>
                                    <td>Receita</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3">10/03/2024</td>
                                    <td>Aluguel</td>
                                    <td className="text-red-600">R$ 1.500,00</td>
                                    <td>Despesa</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
