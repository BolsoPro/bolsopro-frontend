function InvestmentCard({ tipo, valor, rendimento, vencimento }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-bold text-gray-800">{tipo}</h3>
            <p className="text-gray-600">Valor investido: <strong>R$ {valor}</strong></p>
            <p className="text-gray-600">Rendimento: <strong>{rendimento}</strong></p>
            <p className="text-gray-600">Vencimento: <strong>{vencimento || 'Indefinido'}</strong></p>
        </div>
    );
}

export default InvestmentCard;
