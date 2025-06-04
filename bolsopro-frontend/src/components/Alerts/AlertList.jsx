import AlertItem from './AlertItem';

function AlertList({ alerts, onToggle }) {
    return (
        <div>
            {alerts.map(alert => (
                <AlertItem
                    key={alert.id}
                    name={alert.name}
                    description={alert.description}
                    active={alert.active}
                    onToggle={() => onToggle(alert.id)}
                />
            ))}
        </div>
    );
}

export default AlertList;
