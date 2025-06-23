import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        logout();
        navigate('/'); // Redireciona para a home page após o logout
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center">
                        <img src="/src/assets/bolsopro.svg" alt="BolsoPro" className="h-16" />
                        <span className="ml-2 text-xl font-bold text-gray-900">BolsoPro AI</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        {user ? (
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
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Cadastro
                                </Link>
                            </>
                        )}
                    </nav>

                    {user && (
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
                                className="text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
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
