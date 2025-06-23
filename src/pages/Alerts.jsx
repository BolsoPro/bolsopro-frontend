import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import TipCard from '../components/EconomyTips/TipCard';
import TipList from '../components/EconomyTips/TipList';
import { useNavigate } from 'react-router-dom';

function Alerts() {
    const [notificacoes, setNotificacoes] = useState([
        {
            id: 1,
            tipo: "Alerta",
            mensagem: "Despesa excedeu a meta de economia",
            data: "2024-06-07T14:00:00",
            dica: {
                title: "Reduza gastos supérfluos",
                description: "Revise seus gastos mensais e corte despesas não essenciais para equilibrar seu orçamento."
            }
        },
        {
            id: 2,
            tipo: "Aviso",
            mensagem: "Meta de economia atingida!",
            data: "2024-06-01T09:00:00",
            dica: {
                title: "Invista seu excedente",
                description: "Considere investir o valor economizado para potencializar seus rendimentos."
            }
        },
    ]);

    // Dicas gerais para exibir no final da página
    const dicasGerais = [
        {
            title: "Planeje suas compras",
            description: "Faça uma lista antes de ir ao mercado e evite compras por impulso."
        },
        {
            title: "Negocie dívidas",
            description: "Procure condições melhores para quitar dívidas e evitar juros altos."
        }
    ];

    const usuarioId = localStorage.getItem("usuarioId"); // ou outra forma de autenticação
    const navigate = useNavigate();

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
                            <div key={noti.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">{noti.tipo}</h2>
                                        <p className="text-gray-600 mb-2">{noti.mensagem}</p>
                                        <p className="text-sm text-gray-500 mb-2">
                                            Criado em: {new Date(noti.data).toLocaleDateString()}
                                        </p>
                                        {/* 1. Sugestão de dica ao receber um alerta */}
                                        {noti.dica && (
                                            <TipCard title={noti.dica.title} description={noti.dica.description} />
                                        )}
                                        {/* 2. Botão para ver dicas */}
                                        <button
                                            onClick={() => navigate('/dicas')}
                                            className="mt-2 text-blue-600 underline text-sm"
                                        >
                                            Ver Dicas de Economia
                                        </button>
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

                {/* 3. Exibir dicas direto na página de alertas */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Dicas de Economia</h2>
                    <TipList tips={dicasGerais} />
                </div>
            </main>
        </div>
    );
}

export default Alerts;
