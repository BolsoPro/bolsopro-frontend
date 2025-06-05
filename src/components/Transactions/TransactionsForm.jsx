import { useState } from 'react';
import './Transactions.css';

function TransactionsForm() {
    const [formData, setFormData] = useState({
        type: 'receita',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implementar a lógica de salvar a transação
        console.log('Dados do formulário:', formData);
        
        // Limpar o formulário
        setFormData({
            type: 'receita',
            description: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            category: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="transactions-form">
            <div className="form-group">
                <label>Tipo</label>
                <select 
                    name="type" 
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                </select>
            </div>

            <div className="form-group">
                <label>Descrição</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ex: Salário, Conta de luz"
                    required
                />
            </div>

            <div className="form-group">
                <label>Valor (R$)</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                />
            </div>

            <div className="form-group">
                <label>Data</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Categoria</label>
                <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="salario">Salário</option>
                    <option value="investimentos">Investimentos</option>
                    <option value="alimentacao">Alimentação</option>
                    <option value="transporte">Transporte</option>
                    <option value="moradia">Moradia</option>
                    <option value="lazer">Lazer</option>
                    <option value="saude">Saúde</option>
                    <option value="educacao">Educação</option>
                    <option value="outros">Outros</option>
                </select>
            </div>

            <button type="submit" className="submit-button">
                Cadastrar {formData.type}
            </button>
        </form>
    );
}

export default TransactionsForm;