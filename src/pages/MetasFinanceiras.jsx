import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import MetaForm from '../components/common/MetaForm';
import api from '../services/api';

function MetasFinanceiras() {
    const [metas, setMetas] = useState([]);
    const usuarioId = 1; // substitua com ID real do usuário

    const carregarMetas = () => {
        api.get(`/metas/${usuarioId}`)
            .then(res => setMetas(res.data))
            .catch(err => console.error('Erro ao buscar metas:', err));
    };

    useEffect(() => {
        carregarMetas();
    }, []);

    const excluirMeta = (id) => {
        api.delete(`/metas/${id}`)
            .then(() => carregarMetas());
    };

    const editarMeta = (meta) => {
        const novaDescricao = prompt("Nova descrição:", meta.descricao);
        const novoValor = prompt("Novo valor limite:", meta.valorLimite);

        if (novaDescricao && novoValor) {
            const atualizada = { ...meta, descricao: novaDescricao, valorLimite: parseFloat(novoValor) };

            api.put(`/metas/${meta.id}`, atualizada)
                .then(() => carregarMetas());
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Minhas Metas Financeiras</h1>

                <MetaForm onSave={carregarMetas} />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metas.map((meta) => {
                        const progresso = (meta.valorAtual / meta.valorLimite) * 100;
                        const ultrapassou = meta.valorAtual > meta.valorLimite;

                        return (
                            <div key={meta.id} className="bg-white rounded-lg shadow-md p-6 border relative">
                                <h2 className="text-xl font-semibold mb-2">{meta.descricao}</h2>
                                <p className="text-gray-700">Limite: <strong>R$ {meta.valorLimite.toFixed(2)}</strong></p>
                                <p className="text-gray-700">Atual: <strong>R$ {meta.valorAtual.toFixed(2)}</strong></p>
                                <p className={`text-sm ${ultrapassou ? 'text-red-600' : 'text-green-600'}`}>
                                    Progresso: {progresso.toFixed(1)}%
                                </p>

                                {/* Barra de progresso */}
                                <div className="w-full bg-gray-200 h-2 rounded mt-2 mb-4">
                                    <div
                                        className={`h-2 rounded ${ultrapassou ? 'bg-red-500' : 'bg-green-500'}`}
                                        style={{ width: `${Math.min(progresso, 100)}%` }}
                                    ></div>
                                </div>

                                <div className="flex gap-4 text-sm">
                                    <button onClick={() => editarMeta(meta)} className="text-blue-600 hover:underline">
                                        Editar
                                    </button>
                                    <button onClick={() => excluirMeta(meta.id)} className="text-red-600 hover:underline">
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default MetasFinanceiras;
