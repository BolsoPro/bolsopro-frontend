function AlertItem({ name, description, active, onToggle }) {
    return (
        <div className="alert-item">
            <div>
                <strong>{name}</strong>
                <p>{description}</p>
            </div>
            <input
                type="checkbox"
                checked={active}
                onChange={onToggle}
            />
        </div>
    );
}

export default AlertItem;
