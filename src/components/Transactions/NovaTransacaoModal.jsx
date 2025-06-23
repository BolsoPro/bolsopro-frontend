import { useState } from 'react';
import BasicDropdown from '../smoothui/ui/BasicDropdown';

const categoriasDespesa = [
    'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação',
    'Vestuário', 'Contas', 'Investimentos', 'Viagem', 'Outros'
];

const categoriasReceita = [
    'Salário', 'Bônus', 'Venda', 'Rendimento', 'Presente', 'Outros'
];

// Items para o dropdown de tipo
const tipoItems = [
    { id: 1, label: "Receita" },
    { id: 2, label: "Despesa" }
];

function NovaTransacaoModal({ onClose, onSalvar }) {
    const [tipo, setTipo] = useState('Receita');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoria, setCategoria] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação para categoria
        if (!categoria) {
            alert('Por favor, selecione uma categoria.');
            return;
        }

        const novaTransacao = {
            descricao,
            valor: parseFloat(valor),
            data,
            tipo,
            categoria,
            usuarioId: 1 // trocar pelo valor real do usuário logado
        };

        onSalvar(novaTransacao);
    };

    const handleTipoChange = (item) => {
        setTipo(item.label);
        setCategoria(''); // Limpa categoria ao trocar tipo
    };

    const handleCategoriaChange = (item) => {
        setCategoria(item.label);
    };

    // Define as categorias conforme o tipo
    const categoriaItems = (tipo === 'Receita' ? categoriasReceita : categoriasDespesa).map((cat, index) => ({
        id: index + 1,
        label: cat
    }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Nova Transação</h2>

                <BasicDropdown
                    label="Tipo"
                    items={tipoItems}
                    onChange={handleTipoChange}
                    placeholder="Selecione o tipo"
                />

                <label className="block mb-2 text-black">Descrição</label>
                <input
                    type="text"
                    className="w-full mb-4 p-2 border rounded text-black placeholder:text-gray-500"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Ex: Salário, aluguel, etc."
                    required
                />

                <label className="block mb-2 text-black">Valor</label>
                <input
                    type="number"
                    className="w-full mb-4 p-2 border rounded text-black placeholder:text-gray-500"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="R$ 0,00"
                    required
                />

                <label className="block mb-2 text-black">Data</label>
                <input
                    type="date"
                    className="w-full mb-4 p-2 border rounded text-black"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                />

                {/* Dropdown de categoria para ambos os tipos */}
                <div className="mb-4">
                    <BasicDropdown
                        label="Categoria"
                        items={categoriaItems}
                        onChange={handleCategoriaChange}
                        placeholder="Selecione uma categoria"
                    />
                </div>

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
