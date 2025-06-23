import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import api from '../services/api';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from '../components/common/Table';

const carteira = [
    { tipo: 'Tesouro Direto', valor: 'R$ 20.000,00', rendimento: '10% a.a.', vencimento: '2026' },
    { tipo: 'CDB', valor: 'R$ 15.000,00', rendimento: '12% a.a.', vencimento: '2025' },
    { tipo: 'Ações', valor: 'R$ 15.000,00', rendimento: '15% a.a.', vencimento: '-' }
];

function Investments() {
    const [perfil, setPerfil] = useState('');
    const [sugestao, setSugestao] = useState(null);
    const usuarioId = 1; // depois substitua pelo ID real do usuário logado

    // Função local para buscar o perfil
    const buscarPerfil = async (id) => {
        const response = await api.get(`/perfil/${id}`);
        return response.data;
    };

    // Função local para buscar sugestão de investimento
    const buscarSugestaoInvestimento = async (perfil) => {
        const response = await api.get(`/investimentos/sugestao/${perfil}`);
        return response.data;
    };

    useEffect(() => {
        buscarPerfil(usuarioId)
            .then(data => setPerfil(data.tipoPerfil))
            .catch(err => console.error("Erro ao buscar perfil:", err));
    }, [usuarioId]);

    useEffect(() => {
        if (perfil) {
            buscarSugestaoInvestimento(perfil)
                .then(data => setSugestao(data))
                .catch(err => console.error("Erro ao buscar sugestão:", err));
        }
    }, [perfil]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Investimentos</h1>

                {/* Bloco de resumo */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Total Investido</h2>
                        <p className="text-3xl font-bold text-green-600">R$ 50.000,00</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Rendimento Mensal</h2>
                        <p className="text-3xl font-bold text-blue-600">R$ 500,00</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Rentabilidade</h2>
                        <p className="text-3xl font-bold text-purple-600">12% a.a.</p>
                    </div>
                </div>

                {/* Carteira */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-6">Carteira de Investimentos</h2>
                    <TableRoot>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell className="text-black">Tipo</TableHeaderCell>
                                    <TableHeaderCell className="text-black">Valor Investido</TableHeaderCell>
                                    <TableHeaderCell className="text-black">Rendimento</TableHeaderCell>
                                    <TableHeaderCell className="text-black">Vencimento</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {carteira.map((item, idx) => (
                                    <TableRow key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <TableCell>{item.tipo}</TableCell>
                                        <TableCell>{item.valor}</TableCell>
                                        <TableCell className="text-green-600">{item.rendimento}</TableCell>
                                        <TableCell>{item.vencimento}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableRoot>
                </div>

                {/* Sugestão Inteligente de Investimento */}
                {sugestao && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-xl font-semibold mb-4">Sugestão de Investimento com base no seu perfil: <span className="text-indigo-600">{perfil}</span></h2>
                        <p><strong>Tipo:</strong> {sugestao.tipo}</p>
                        <p><strong>Descrição:</strong> {sugestao.descricao}</p>
                        <p><strong>Nível de Risco:</strong> {sugestao.nivelRisco}</p>
                    </div>
                )}

                {/* Botão final */}
                <div className="flex justify-end">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Novo Investimento
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Investments;
