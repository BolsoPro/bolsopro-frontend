import { Card, Metric, Text, AreaChart } from '@tremor/react';

// Os dados do gráfico devem ser numéricos para funcionar corretamente.
const chartdata = [
    { date: 'Jan', Receita: 2890 },
    { date: 'Fev', Receita: 2756 },
    { date: 'Mar', Receita: 3322 },
    { date: 'Abr', Receita: 3470 },
    { date: 'Mai', Receita: 3475 },
    { date: 'Jun', Receita: 3129 },
];

// Formata os números para exibir a moeda corretamente no tooltip (quando o usuário passar o mouse).
const dataFormatter = (number) => {
    return 'R$ ' + new Intl.NumberFormat('pt-BR').format(number).toString();
};

function DashboardPreview() {
    return (
        <Card className="w-96 h-56 p-4 bg-white rounded-lg shadow-lg">
            <Text className="text-gray-600">Receita Mensal</Text>
            <Metric className="text-gray-900">R$ 12.699</Metric>
            <AreaChart
                className="mt-4 h-24"
                data={chartdata}
                index="date"
                categories={['Receita']}
                colors={['purple']}
                showYAxis={false}
                showLegend={false}
                curveType="monotone"
                valueFormatter={dataFormatter}
            />
        </Card>
    );
}

export default DashboardPreview; 