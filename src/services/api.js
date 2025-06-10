// services/api.js
export const buscarPerfil = (id) =>
    fetch(`http://localhost:8080/perfil/${id}`).then(res => res.json());

export const buscarSugestaoInvestimento = (perfil) =>
    fetch(`http://localhost:8080/investimentos/sugestao/${perfil}`).then(res => res.json());
