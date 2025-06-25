import { useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

function MetaForm({ onSave }) {
    const [descricao, setDescricao] = useState('');
    const [valorLimite, setValorLimite] = useState('');
    const [periodo, setPeriodo] = useState('');
    const { user } = useContext(AuthContext); // Pega ID do usuário autenticado

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/metas', {
                descricao,
                valorLimite: parseFloat(valorLimite),
                periodo,
                usuario: { id: user?.id || 1 } // fallback para ID 1 se não estiver autenticado
            });

            setDescricao('');
            setValorLimite('');
            setPeriodo('');
            onSave();
        } catch (error) {
            console.error('Erro ao cadastrar meta:', error);
            alert('Erro ao cadastrar meta. Verifique os dados.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Cadastrar Nova Meta</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">Descrição</label>
            <input 
                type="text" 
                value={descricao} 
                onChange={e => setDescricao(e.target.value)} 
                placeholder="Ex: Economizar para viagem" 
                className="w-full p-2 mb-4 border rounded-lg" 
                required
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Valor Limite</label>
            <input 
                type="number" 
                value={valorLimite} 
                onChange={e => setValorLimite(e.target.value)} 
                placeholder="Ex: 1000.00" 
                className="w-full p-2 mb-4 border rounded-lg" 
                required
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Período</label>
            <input 
                type="month" 
                value={periodo} 
                onChange={e => setPeriodo(e.target.value)} 
                className="w-full p-2 mb-4 border rounded-lg" 
                required
            />

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full">
                Salvar Meta
            </button>
        </form>
    );
}

export default MetaForm;
