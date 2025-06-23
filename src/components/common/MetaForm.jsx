import { useState } from 'react';

function MetaForm({ onSave }) {
    const [descricao, setDescricao] = useState('');
    const [valorLimite, setValorLimite] = useState('');
    const [periodo, setPeriodo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const novaMeta = { descricao, valorLimite: parseFloat(valorLimite), periodo, usuarioId: 1 };

        fetch('http://localhost:8080/metas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaMeta)
        })
            .then(() => {
                onSave(); // recarrega metas
                setDescricao('');
                setValorLimite('');
                setPeriodo('');
            });
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
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Valor Limite de Gastos para o mês</label>
            <input 
                type="number" 
                value={valorLimite} 
                onChange={e => setValorLimite(e.target.value)} 
                placeholder="R$ 1000,00" 
                className="w-full p-2 mb-4 border rounded-lg" 
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Período</label>
            <input 
                type="text" 
                value={periodo} 
                onChange={e => setPeriodo(e.target.value)} 
                placeholder="Ex: Mensal" 
                className="w-full p-2 mb-4 border rounded-lg" 
            />

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full">Salvar Meta</button>
        </form>
    );
}

export default MetaForm;
