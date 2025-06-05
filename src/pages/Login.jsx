import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { NeatGradient } from "@firecms/neat";
import * as THREE from 'three';
import LogoOficial from '../assets/LogoOficial.svg';

function Login() {
    const gradientRef = useRef(null);
    const neatInstanceRef = useRef(null);
    const [gradientLoaded, setGradientLoaded] = useState(false);
    const [form, setForm] = useState({ email: '', senha: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            await new Promise(resolve => setTimeout(resolve, 1000));
            const storedUser = localStorage.getItem('user');
            const userData = storedUser ? JSON.parse(storedUser) : null;

            if (!userData || userData.email !== form.email.trim()) {
                throw new Error('Email ou senha incorretos');
            }

            localStorage.setItem('token', userData.token);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left pane */}
            <div className="w-[480px] bg-white p-12">
                <div className="mb-8">
                    <img src={LogoOficial} alt="Logo" className="w-12 h-12" />
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
                        {isLoading ? 'Entrando...' : 'Continuar'}
                    </button>
                </form>
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

