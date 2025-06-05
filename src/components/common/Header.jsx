import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('token') !== null;

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center">
                        <img src="/src/assets/logo.svg" alt="BolsoPro" className="h-8" />
                        <span className="ml-2 text-xl font-bold text-gray-900">BolsoPro</span>
                    </Link>

                    <nav className="hidden md:flex space-x-8">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`text-sm font-medium ${
                                        isActive('/dashboard')
                                            ? 'text-green-600'
                                            : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/transactions"
                                    className={`text-sm font-medium ${
                                        isActive('/transactions')
                                            ? 'text-green-600'
                                            : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    Transações
                                </Link>
                                <Link
                                    to="/alerts"
                                    className={`text-sm font-medium ${
                                        isActive('/alerts')
                                            ? 'text-green-600'
                                            : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    Alertas
                                </Link>
                                <Link
                                    to="/economytips"
                                    className={`text-sm font-medium ${
                                        isActive('/economytips')
                                            ? 'text-green-600'
                                            : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    Dicas
                                </Link>
                                <Link
                                    to="/investments"
                                    className={`text-sm font-medium ${
                                        isActive('/investments')
                                            ? 'text-green-600'
                                            : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    Investimentos
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Cadastro
                                </Link>
                            </>
                        )}
                    </nav>

                    {isAuthenticated && (
                        <div className="flex items-center">
                            <Link
                                to="/perfil"
                                className={`text-sm font-medium mr-4 ${
                                    isActive('/perfil')
                                        ? 'text-green-600'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Perfil
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-gray-500 hover:text-gray-900"
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
