import Header from '../components/common/Header';

function EconomyTips() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Dicas de Economia</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-3">Planejamento Financeiro</h2>
                        <p className="text-gray-600">
                            Estabeleça metas financeiras claras e crie um orçamento mensal detalhado.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-3">Economia no Dia a Dia</h2>
                        <p className="text-gray-600">
                            Pequenas mudanças nos hábitos diários podem gerar grandes economias ao longo do tempo.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-3">Investimentos Inteligentes</h2>
                        <p className="text-gray-600">
                            Aprenda sobre diferentes tipos de investimentos e diversifique sua carteira.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EconomyTips;
