import { useState } from 'react';

function NovaTransacaoModal({ onClose, onSalvar }) {
    const [tipo, setTipo] = useState('Receita');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoria, setCategoria] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const novaTransacao = {
            descricao,
            valor: parseFloat(valor),
            data,
            tipo,
            categoria: tipo === 'Despesa' ? categoria : null,
            usuarioId: 1 // trocar pelo valor real do usuário logado
        };

        onSalvar(novaTransacao);
        onClose(); // fecha o modal após salvar
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Nova Transação</h2>

                <label className="block mb-2">Tipo</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full mb-4 p-2 border rounded">
                    <option value="Receita">Receita</option>
                    <option value="Despesa">Despesa</option>
                </select>

                <label className="block mb-2">Descrição</label>
                <input
                    type="text"
                    className="w-full mb-4 p-2 border rounded"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />

                <label className="block mb-2">Valor</label>
                <input
                    type="number"
                    className="w-full mb-4 p-2 border rounded"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    required
                />

                <label className="block mb-2">Data</label>
                <input
                    type="date"
                    className="w-full mb-4 p-2 border rounded"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                />

                {tipo === 'Despesa' && (
                    <>
                        <label className="block mb-2">Categoria</label>
                        <input
                            type="text"
                            className="w-full mb-4 p-2 border rounded"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            required
                        />
                    </>
                )}

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NovaTransacaoModal;
