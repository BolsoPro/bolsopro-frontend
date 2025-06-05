import { useState } from 'react';

function TransactionsList() {
    // Mock de dados - posteriormente será substituído por dados reais
    const [transactions] = useState([
        {
            id: 1,
            type: 'receita',
            description: 'Salário',
            amount: 5000.00,
            date: '2024-03-15',
            category: 'salario'
        },
        {
            id: 2,
            type: 'despesa',
            description: 'Aluguel',
            amount: 1500.00,
            date: '2024-03-10',
            category: 'moradia'
        }
    ]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <div className="transactions-list">
            <h2>Histórico de Transações</h2>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr 
                            key={transaction.id}
                            className={transaction.type === 'receita' ? 'income' : 'expense'}
                        >
                            <td>{formatDate(transaction.date)}</td>
                            <td>{transaction.type === 'receita' ? 'Receita' : 'Despesa'}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.category}</td>
                            <td className="amount">
                                {formatCurrency(transaction.amount)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionsList;