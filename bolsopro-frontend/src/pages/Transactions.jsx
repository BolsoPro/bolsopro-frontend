import TransactionForm from '../components/Transactions/TransactionForm';
import TransactionList from '../components/Transactions/TransactionList';

function Transactions() {
    return (
        <>
            <h1>Cadastrar Receita/Despesa</h1>
            <TransactionForm />
            <TransactionList />
        </>
    );
}

export default Transactions;
