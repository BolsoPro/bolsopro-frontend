import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Alerts from './pages/Alerts';
import MetasFinanceiras from './pages/MetasFinanceiras.jsx';
import Investments from './pages/Investments';
import Register from './pages/Register';
import Login from './pages/Login';
import Perfil from './pages/Perfil';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas Privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />

        <Route
          path="/alerts"
          element={
            <PrivateRoute>
              <Alerts />
            </PrivateRoute>
          }
        />

        <Route
          path="/economytips"
          element={
            <PrivateRoute>
              <MetasFinanceiras />
            </PrivateRoute>
          }
        />

        <Route
          path="/investments"
          element={
            <PrivateRoute>
              <Investments />
            </PrivateRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        {/* Rota para página não encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
