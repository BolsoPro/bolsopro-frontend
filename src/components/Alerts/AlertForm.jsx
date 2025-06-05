function AlertForm({ onSave, onCancel }) {
    return (
        <form>
            <label>Nome do alerta</label>
            <input placeholder="Name of your project" />

            <label>Tipo de alerta</label>
            <select>
                <option>Select</option>
            </select>

            <label>Valor limite (R$)</label>
            <input placeholder="R$50" />

            <label>Ativar Alerta</label>
            <input type="checkbox" />

            <button type="button" onClick={onCancel}>Cancelar</button>
            <button type="submit" onClick={onSave}>Salvar</button>
        </form>
    );
}

export default AlertForm;
