import { useEffect, useState, useContext } from 'react';
import Header from '../components/common/Header';
import PerfilUsuario from '../components/common/PerfilUsuario';
import { AuthContext } from '../context/AuthContext';

function Perfil() {
    const { user } = useContext(AuthContext);
    const usuarioId = user?.id;

    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [preferencias, setPreferencias] = useState({ email: false, relatorio: false });

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');

            // Atualizar dados do usuário
            await fetch(`http://localhost:8080/usuario/${usuarioId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome: user?.nomeCompleto,
                    email: user?.email,
                    preferencias
                })
            });

            // Atualizar senha se preenchida
            if (novaSenha && novaSenha === confirmarSenha) {
                await fetch(`http://localhost:8080/usuario/${usuarioId}/senha`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        novaSenha
                    })
                });
            }

            alert('Alterações salvas com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            alert('Erro ao salvar alterações');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Perfil</h1>

                    <div className="bg-white shadow rounded-lg p-6 space-y-6">
                        <div className="border-b pb-6">
                            <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                                        value={user?.nomeCompleto || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                                        value={user?.email || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-b pb-6">
                            <h2 className="text-xl font-semibold mb-4">Perfil Comportamental</h2>
                            <div className="bg-gray-100 p-4 rounded-md">
                                {usuarioId ? (
                                    <PerfilUsuario usuarioId={usuarioId} />
                                ) : (
                                    <p>Usuário não autenticado</p>
                                )}
                            </div>
                        </div>

                        <div className="border-b pb-6">
                            <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
                            <div className="space-y-4">
                                <input
                                    type="password"
                                    placeholder="Senha atual"
                                    className="w-full p-2 border rounded-md"
                                    value={senhaAtual}
                                    onChange={e => setSenhaAtual(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Nova senha"
                                    className="w-full p-2 border rounded-md"
                                    value={novaSenha}
                                    onChange={e => setNovaSenha(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirmar nova senha"
                                    className="w-full p-2 border rounded-md"
                                    value={confirmarSenha}
                                    onChange={e => setConfirmarSenha(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="border-b pb-6">
                            <h2 className="text-xl font-semibold mb-4">Preferências</h2>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                        checked={preferencias.email}
                                        onChange={e => setPreferencias(prev => ({ ...prev, email: e.target.checked }))}
                                    />
                                    <span>Receber notificações por email</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                        checked={preferencias.relatorio}
                                        onChange={e => setPreferencias(prev => ({ ...prev, relatorio: e.target.checked }))}
                                    />
                                    <span>Receber relatórios mensais</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button className="px-4 py-2 border rounded-md hover:bg-gray-100">Cancelar</button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Salvar alterações
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Perfil;
