import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LogoOficial from '../assets/logo-oficial.png';

function Login() {
    const [form, setForm] = useState({ email: '', senha: '' });
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (form.senha !== form.confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email, senha: form.senha }),
            });

            if (!response.ok) {
                throw new Error('Usuário não cadastrado!');
            }

            alert('Seja bem vindo!');
            navigate('/Dashboard.jsx');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <img src={LogoOficial} alt="BolsoPro Logo" className="register-logo" />

                <form onSubmit={handleSubmit}>

                    <label>E-mail</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />

                    <label>Senha</label>
                    <input type="password" name="senha" value={form.senha} onChange={handleChange} required />

                    <button type="submit">Continuar</button>
                </form>

                <p>
                    Não tem uma conta? <Link to="/Register">Criar aqui</Link>
                </p>
            </div>

            <div className="register-banner">
                <h1>BOLSOPRO AI</h1>
                <p>Seu bolso inteligente começa aqui</p>
            </div>
        </div>
    );
}

export default Login;

