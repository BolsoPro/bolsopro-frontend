import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    // Aqui você deve implementar a lógica de verificação de autenticação
    // Por exemplo, verificar se existe um token no localStorage
    const isAuthenticated = localStorage.getItem('user') !== null;

    if (!isAuthenticated) {
        // Se não estiver autenticado, redireciona para a página de login
        return <Navigate to="/login" replace />;
    }

    // Se estiver autenticado, renderiza o componente filho
    return children;
}

export default PrivateRoute;
