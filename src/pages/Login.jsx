import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import { NeatGradient } from "@firecms/neat";
import * as THREE from 'three';
import LogoBP from '../assets/LogoBP.svg';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const gradientRef = useRef(null);
    const neatInstanceRef = useRef(null);
    const [gradientLoaded, setGradientLoaded] = useState(false);
    const [form, setForm] = useState({ email: '', senha: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const initGradient = async () => {
            console.log("Iniciando gradiente...");
            if (gradientRef.current && !neatInstanceRef.current) {
                try {
                    console.log("Configurando gradiente...");
                    const config = {
                        colors: [
                            {
                                color: '#2A4235',
                                enabled: true,
                            },
                            {
                                color: '#769E7A',
                                enabled: true,
                            },
                            {
                                color: '#B2C9AB',
                                enabled: true,
                            },
                            {
                                color: '#E5E5E5',
                                enabled: true,
                            },
                            {
                                color: '#C4DDC5',
                                enabled: false,
                            },
                        ],
                        speed: 2,
                        horizontalPressure: 5,
                        verticalPressure: 5,
                        waveFrequencyX: 3,
                        waveFrequencyY: 3,
                        waveAmplitude: 4,
                        shadows: 4,
                        highlights: 6,
                        colorBrightness: 1,
                        colorSaturation: 5,
                        wireframe: false,
                        colorBlending: 8,
                        backgroundColor: '#3B7D1E',
                        backgroundAlpha: 1,
                        grainScale: 2,
                        grainSparsity: 0,
                        grainIntensity: 0.2,
                        grainSpeed: 0.8,
                        resolution: 1.2,
                        yOffset: 0,
                    };

                    console.log("Criando instância do NeatGradient...");
                    neatInstanceRef.current = new NeatGradient({
                        ref: gradientRef.current,
                        ...config
                    });

                    await new Promise(resolve => setTimeout(resolve, 500));
                    console.log("Gradiente inicializado com sucesso!");
                    setGradientLoaded(true);
                } catch (error) {
                    console.error('Erro detalhado ao inicializar NeatGradient:', error);
                    setGradientLoaded(false);
                }
            }
        };

        initGradient();

        return () => {
            if (neatInstanceRef.current) {
                try {
                    console.log("Destruindo instância do gradiente...");
                    neatInstanceRef.current.destroy();
                    neatInstanceRef.current = null;
                    setGradientLoaded(false);
                } catch (error) {
                    console.error('Erro ao destruir NeatGradient:', error);
                }
            }
        };
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // 1. Pega os usuários cadastrados do localStorage
            const registeredUsers = JSON.parse(localStorage.getItem('mock_users')) || [];

            // 2. Procura por um usuário com o email e senha correspondentes
            const foundUser = registeredUsers.find(
                user => user.email === form.email.trim() && user.senha === form.senha
            );

            if (!foundUser) {
                throw new Error('E-mail ou senha inválidos.');
            }

            // 3. Remove a senha antes de salvar no contexto e redireciona
            const { senha, ...userToLogin } = foundUser;
            
            login(userToLogin);
            navigate('/dashboard');

        } catch (error) {
            setError(error.message || 'Erro ao fazer login');
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="flex min-h-screen">
            {/* Left pane */}
            <div className="w-[480px] bg-white p-12">
                <div className="mb-8">
                    <img src={LogoBP} alt="Logo" className="w-40 h-40" />
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Entre na sua conta
                    </h2>
                    <p className="text-gray-600">
                        Ou{' '}
                        <Link to="/register" className="text-[#004E64] hover:text-[#003D4F]">
                            crie uma conta gratuita
                        </Link>
                    </p>
                </div>

                <div className="relative">
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-md">
                            <svg className="animate-spin h-8 w-8 text-[#004E64]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                                    E-mail
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#004E64]"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                                    Senha
                                </label>
                                <input
                                    id="password"
                                    name="senha"
                                    type="password"
                                    required
                                    className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#004E64]"
                                    value={form.senha}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#004E64] focus:ring-[#004E64] border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Lembrar-me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="text-[#004E64] hover:text-[#003D4F]">
                                    Esqueceu sua senha?
                                </a>
                            </div>
                        </div>

                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                        <button
                            type="submit"
                            className={`w-full py-2 px-4 bg-[#004E64] text-white rounded-md hover:bg-[#003D4F] transition-colors duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            Continuar
                        </button>
                    </form>
                </div>

                <div className="text-center mt-6">
                    <Link to="/" className="inline-block p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-7 4h6" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Right pane */}
            <div className="flex-1 relative overflow-hidden bg-[#004E64]">
                <canvas 
                    ref={gradientRef} 
                    className="absolute inset-0 w-full h-full" 
                    style={{ 
                        minHeight: '100vh',
                        opacity: gradientLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out'
                    }}
                />
                <div className="relative z-10 flex items-center justify-center h-full p-8">
                    <div className="text-center text-white">
                        <h1 className="text-7xl font-bold mb-6">BOLSOPRO AI</h1>
                        <p className="text-2xl">Seu bolso inteligente começa aqui</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

