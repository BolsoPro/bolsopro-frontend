import { useEffect, useState } from 'react';

function PerfilUsuario({ usuarioId }) {
    const [perfil, setPerfil] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/perfil/${usuarioId}`)
            .then(res => res.json())
            .then(data => {
                setPerfil(data.tipoPerfil);
            })
            .catch(err => console.error("Erro ao buscar perfil:", err));
    }, [usuarioId]);

    return (
        <div>
            <h2>Meu Perfil Comportamental</h2>
            {perfil ? (
                <p>Você é um investidor <strong>{perfil}</strong></p>
            ) : (
                <p>Carregando perfil...</p>
            )}
        </div>
    );
}

export default PerfilUsuario;
