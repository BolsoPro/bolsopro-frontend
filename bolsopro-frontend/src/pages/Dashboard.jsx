import Header from '../components/common/Header';
import Button from '../components/common/Button';

function Dashboard() {
    return (
        <>
            <Header />
            <h2>Resumo financeiro</h2>
            <Button onClick={() => console.log('clicou')}>Clique aqui</Button>
        </>
    );
}

export default Dashboard;
