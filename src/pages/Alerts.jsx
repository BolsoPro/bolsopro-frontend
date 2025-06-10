import { useEffect, useState } from 'react';
import Header from '../components/common/Header';

function Alerts() {
    const [notificacoes, setNotificacoes] = useState([
        {
            id: 1,
            tipo: "Alerta",
            mensagem: "Despesa excedeu a meta de economia",
            data: "2024-06-07T14:00:00",
        },
        {
            id: 2,
            tipo: "Aviso",
            mensagem: "Meta de economia atingida!",
            data: "2024-06-01T09:00:00",
        },
    ]);

    const usuarioId = localStorage.getItem("usuarioId"); // ou outra forma de autenticação

    useEffect(() => {
        fetch(`http://localhost:8080/notificacoes/${usuarioId}`)
            .then(res => res.json())
            .then(data => setNotificacoes(data))
            .catch(err => console.error("Erro ao carregar notificações:", err));
    }, [usuarioId]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Alertas</h1>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Novo Alerta
                    </button>
                </div>

                <div className="grid gap-6">
                    {notificacoes.length === 0 ? (
                        <p className="text-gray-600">Nenhum alerta encontrado.</p>
                    ) : (
                        notificacoes.map((noti) => (
                            <div key={noti.id} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">{noti.tipo}</h2>
                                        <p className="text-gray-600 mb-2">{noti.mensagem}</p>
                                        <p className="text-sm text-gray-500">
                                            Criado em: {new Date(noti.data).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked readOnly />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default Alerts;
