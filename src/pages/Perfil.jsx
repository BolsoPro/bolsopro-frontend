import Header from '../components/common/Header';

function Perfil() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Perfil</h1>

                    <div className="bg-white shadow rounded-lg">
                        <div className="p-6 space-y-6">
                            <div className="border-b pb-6">
                                <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nome completo
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                                            value="João Silva"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                                            value="joao.silva@email.com"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-b pb-6">
                                <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Senha atual
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nova senha
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirmar nova senha
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-b pb-6">
                                <h2 className="text-xl font-semibold mb-4">Preferências</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="notifications"
                                            type="checkbox"
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
                                            Receber notificações por email
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="reports"
                                            type="checkbox"
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="reports" className="ml-2 block text-sm text-gray-900">
                                            Receber relatórios mensais
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                                    Cancelar
                                </button>
                                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                                    Salvar alterações
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Perfil;
