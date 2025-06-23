import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import DashboardPreview from '../components/common/DashboardPreview'; // 1. Importado
import { NeatGradient } from "@firecms/neat";
import { useRef, useState, useEffect } from 'react';

function Home() {
    const funcionalidadesGradientRef = useRef(null);
    const funcionalidadesNeatInstanceRef = useRef(null);
    const [funcionalidadesGradientLoaded, setFuncionalidadesGradientLoaded] = useState(false);

    const sobreGradientRef = useRef(null);
    const sobreNeatInstanceRef = useRef(null);
    const [sobreGradientLoaded, setSobreGradientLoaded] = useState(false);

    const [currentTime, setCurrentTime] = useState(() => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    useEffect(() => {
        const initGradient = async () => {
            if (funcionalidadesGradientRef.current && !funcionalidadesNeatInstanceRef.current) {
                try {
                    const config = {
                        colors: [
                            { color: '#2A4235', enabled: true },
                            { color: '#769E7A', enabled: true },
                            { color: '#B2C9AB', enabled: true },
                            { color: '#E5E5E5', enabled: true },
                            { color: '#C4DDC5', enabled: false },
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
                    funcionalidadesNeatInstanceRef.current = new NeatGradient({
                        ref: funcionalidadesGradientRef.current,
                        ...config
                    });
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setFuncionalidadesGradientLoaded(true);
                } catch (error) {
                    setFuncionalidadesGradientLoaded(false);
                }
            }

            if (sobreGradientRef.current && !sobreNeatInstanceRef.current) {
                try {
                    const config = {
                        colors: [
                            {
                                color: '#130437',
                                enabled: true,
                            },
                            {
                                color: '#B34BD0',
                                enabled: true,
                            },
                            {
                                color: '#210751',
                                enabled: true,
                            },
                            {
                                color: '#3511A5',
                                enabled: true,
                            },
                            {
                                color: '#8F3E8D',
                                enabled: false,
                            },
                        ],
                        speed: 4,
                        horizontalPressure: 7,
                        verticalPressure: 3,
                        waveFrequencyX: 0,
                        waveFrequencyY: 0,
                        waveAmplitude: 0,
                        shadows: 4,
                        highlights: 0,
                        colorBrightness: 1.95,
                        colorSaturation: 2,
                        wireframe: false,
                        colorBlending: 9,
                        backgroundColor: '#003FFF',
                        backgroundAlpha: 1,
                        grainScale: 0,
                        grainSparsity: 0,
                        grainIntensity: 0,
                        grainSpeed: 0,
                        resolution: 1,
                        yOffset: 0,
                    };
                    sobreNeatInstanceRef.current = new NeatGradient({
                        ref: sobreGradientRef.current,
                        ...config
                    });
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setSobreGradientLoaded(true);
                } catch (error) {
                    setSobreGradientLoaded(false);
                }
            }
        };
        initGradient();
        return () => {
            if (funcionalidadesNeatInstanceRef.current) {
                funcionalidadesNeatInstanceRef.current.destroy();
                funcionalidadesNeatInstanceRef.current = null;
                setFuncionalidadesGradientLoaded(false);
            }
            if (sobreNeatInstanceRef.current) {
                sobreNeatInstanceRef.current.destroy();
                sobreNeatInstanceRef.current = null;
                setSobreGradientLoaded(false);
            }
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
                {/* Hero Section */}
                <div className="bg-white">
                    <div className="container mx-auto px-4 py-32 sm:py-40 min-h-[calc(110vh-64px)] flex items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    Organize seu dinheiro<br />com inteligência
                                </h1>
                                <p className="text-base text-gray-600 mb-6">
                                    Controle financeiro pessoal com dicas inteligentes e sugestões de investimentos baseadas no seu perfil
                                </p>
                                <div className="flex gap-4">
                                    <Link
                                        to="/register"
                                        className="inline-block bg-black text-white px-5 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        Cadastre-se agora
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="inline-block bg-white text-black px-5 py-2 rounded-md font-medium border border-black hover:bg-gray-50 transition-colors"
                                    >
                                        Fazer login
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="bg-black rounded-2xl w-52 h-96 flex flex-col items-center justify-center shadow-2xl">
                                    {(() => {
                                        const [hour, minute] = currentTime.split(':');
                                        return (
                                            <span className="text-white text-7xl font-bold tracking-tight">{hour}<br />{minute}</span>
                                        );
                                    })()}
                                    <span className="text-gray-400 text-sm mt-10">Toque para desbloquear</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sobre o BolsoPro AI */}
                <div className="relative overflow-hidden rounded-2xl shadow-xl py-32">
                    <canvas
                        ref={sobreGradientRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ minHeight: '100%', opacity: sobreGradientLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out', zIndex: 0 }}
                    />
                    <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-5xl font-bold mb-4 text-white drop-shadow">Sobre o BolsoPro AI</h2>
                            <p className="text-xl text-gray-200 mb-8 drop-shadow">
                                Missão: Transformar a vida financeira de pessoas comuns usando inteligência artificial
                            </p>
                            <Link
                                to="/register"
                                className="inline-block bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                            >
                                Teste
                            </Link>
                        </div>
                        <div className="flex justify-center">
                           <DashboardPreview /> 
                        </div>
                    </div>
                </div>

                {/* Funcionalidades e Como Funciona */}
                <div className="py-32 mt-16 bg-gray-50">
                    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Funcionalidades */}
                        <div>
                            <h2 className="text-3xl font-regular mb-8 text-gray-900">Funcionalidades</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="rounded-xl shadow-lg p-6 flex items-center justify-center min-h-[120px] text-white text-lg font-medium text-center bg-gradient-to-br from-[#005F73] via-[#0A9396] to-[#94D2BD]">Registro de receitas e despesas</div>
                                <div className="rounded-xl shadow-lg p-6 flex items-center justify-center min-h-[120px] text-white text-lg font-medium text-center bg-gradient-to-br from-[#005F73] via-[#0A9396] to-[#94D2BD]">Alertas de movimentação</div>
                                <div className="rounded-xl shadow-lg p-6 flex items-center justify-center min-h-[120px] text-white text-lg font-medium text-center bg-gradient-to-br from-[#005F73] via-[#0A9396] to-[#94D2BD]">Sugestões de economia</div>
                                <div className="rounded-xl shadow-lg p-6 flex items-center justify-center min-h-[120px] text-white text-lg font-medium text-center bg-gradient-to-br from-[#005F73] via-[#0A9396] to-[#94D2BD]">Investimentos inteligentes</div>
                            </div>
                        </div>
                        
                        {/* Como Funciona */}
                        <div className='pl-40'>
                            <h2 className="text-3xl font-bold mb-8 text-gray-900">Como Funciona</h2>
                            <ol className="list-decimal list-inside text-gray-800 space-y-2 mb-6">
                                <li>Cadastre-se</li>
                                <li>Registre sua movimentação</li>
                                <li>Receba alertas e sugestões</li>
                                <li>Acompanhe sua evolução financeira</li>
                            </ol>
                            <Link
                                to="/register"
                                className="inline-block bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                            >
                                Criar conta agora 
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;