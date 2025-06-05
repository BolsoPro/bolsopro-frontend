import Header from '../components/common/Header';

function Transactions() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Transações</h1>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Nova Transação
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Receitas do Mês</h2>
                        <p className="text-3xl font-bold text-green-600">R$ 8.000,00</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Despesas do Mês</h2>
                        <p className="text-3xl font-bold text-red-600">R$ 5.500,00</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Saldo do Mês</h2>
                        <p className="text-3xl font-bold text-blue-600">R$ 2.500,00</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6">
                        <div className="flex gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Pesquisar transações..."
                                className="flex-1 p-2 border rounded-lg"
                            />
                            <select className="p-2 border rounded-lg">
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
                                    <tr className="border-b">
                                        <td className="py-3">15/03/2024</td>
                                        <td>Salário</td>
                                        <td>Renda</td>
                                        <td className="text-green-600">R$ 5.000,00</td>
                                        <td>Receita</td>
                                        <td>
                                            <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                                            <button className="text-red-600 hover:text-red-800">Excluir</button>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-3">10/03/2024</td>
                                        <td>Aluguel</td>
                                        <td>Moradia</td>
                                        <td className="text-red-600">R$ 1.500,00</td>
                                        <td>Despesa</td>
                                        <td>
                                            <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                                            <button className="text-red-600 hover:text-red-800">Excluir</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Transactions;
