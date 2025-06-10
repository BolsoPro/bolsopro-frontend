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
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
            <h2 className="text-xl font-bold mb-4">Cadastrar Nova Meta</h2>
            <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" className="w-full p-2 mb-2 border rounded" />
            <input type="number" value={valorLimite} onChange={e => setValorLimite(e.target.value)} placeholder="Valor Limite" className="w-full p-2 mb-2 border rounded" />
            <input type="text" value={periodo} onChange={e => setPeriodo(e.target.value)} placeholder="Período (ex: Mensal)" className="w-full p-2 mb-2 border rounded" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Meta</button>
        </form>
    );
}

export default MetaForm;
