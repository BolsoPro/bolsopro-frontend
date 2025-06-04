import AlertList from '../components/Alerts/AlertList';
import AlertForm from '../components/Alerts/AlertForm';
import AddAlertButton from '../components/Alerts/AddAlertButton';

function Alerts() {
    const [showForm, setShowForm] = React.useState(false);
    const [alerts, setAlerts] = React.useState([
        { id: 1, name: "Gasto Mensal", description: "Alerta quando gastos mensais excedem limite", active: true },
        { id: 2, name: "Receita diária", description: "Receber notificação para cada receita", active: false },
        { id: 3, name: "Meta financeira", description: "Notificar meta semanal", active: false },
    ]);

    const toggleAlert = id => {
        setAlerts(alerts.map(alert =>
            alert.id === id ? { ...alert, active: !alert.active } : alert
        ));
    };

    return (
        <div>
            <h1>Alertas Personalizados</h1>
            <p>Configure regras para receber alertas financeiros automáticos</p>

            <AlertList alerts={alerts} onToggle={toggleAlert} />

            {showForm ? (
                <AlertForm
                    onSave={() => setShowForm(false)}
                    onCancel={() => setShowForm(false)}
                />
            ) : (
                <AddAlertButton onClick={() => setShowForm(true)} />
            )}
        </div>
    );
}

export default Alerts;
