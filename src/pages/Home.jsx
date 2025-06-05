import { Link } from 'react-router-dom';
import Header from '../components/common/Header';

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
                {/* Hero Section */}
                <div className="bg-white">
                    <div className="container mx-auto px-4 py-16 sm:py-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                                    Gerencie suas finanças de forma inteligente
                                </h1>
                                <p className="text-lg text-gray-600 mb-8">
                                    BolsoPro é a plataforma que você precisa para organizar suas finanças pessoais,
                                    acompanhar gastos e alcançar seus objetivos financeiros.
                                </p>
                                <div className="space-x-4">
                                    <Link
                                        to="/register"
                                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                                    >
                                        Começar Agora
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-medium border border-green-600 hover:bg-green-50 transition-colors"
                                    >
                                        Fazer Login
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <img
                                    src="/src/assets/dashboard-preview.svg"
                                    alt="Dashboard Preview"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Controle de Gastos</h3>
                                <p className="text-gray-600">
                                    Acompanhe suas despesas e receitas em tempo real, com categorização automática
                                    e relatórios detalhados.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Metas Financeiras</h3>
                                <p className="text-gray-600">
                                    Estabeleça objetivos financeiros e acompanhe seu progresso com ferramentas
                                    visuais intuitivas.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Investimentos</h3>
                                <p className="text-gray-600">
                                    Gerencie sua carteira de investimentos e receba recomendações personalizadas
                                    baseadas no seu perfil.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-green-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">
                            Comece a transformar sua vida financeira hoje
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Junte-se a milhares de pessoas que já estão usando o BolsoPro para alcançar
                            seus objetivos financeiros.
                        </p>
                        <Link
                            to="/register"
                            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                            Criar Conta Gratuita
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;