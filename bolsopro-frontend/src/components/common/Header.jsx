import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>BolsoPro AI</h1>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/transactions">Transações</Link>
                <Link to="/alerts">Alertas</Link>
            </nav>
        </header>
    );
}

export default Header;
