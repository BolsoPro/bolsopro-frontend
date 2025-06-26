import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const { user } = useContext(AuthContext);
  const usuarioId = user?.id;
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carrega receitas e despesas do usuário autenticado
  const carregarTransacoes = async () => {
    if (!usuarioId) return;
    setLoading(true);
    try {
      const [resReceitas, resDespesas] = await Promise.all([
        api.get(`/usuarios/${usuarioId}/receitas`),
        api.get(`/despesas`)
      ]);
      const receitas = resReceitas.data.map(r => ({ ...r, tipo: 'Receita' }));
      const despesas = resDespesas.data
        .filter(d => d.usuario && d.usuario.id === usuarioId)
        .map(d => ({ ...d, tipo: 'Despesa' }));
      setTransacoes([...receitas, ...despesas]);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTransacoes();
    // eslint-disable-next-line
  }, [usuarioId]);

  // Adiciona uma nova transação (receita ou despesa)
  const adicionarTransacao = async (transacao) => {
  if (!usuarioId) throw new Error('Usuário não autenticado');
  let endpoint;
  let payload = { ...transacao };
  if (transacao.tipo === 'Receita') {
    endpoint = `/usuarios/${usuarioId}/receitas/adicionar`;
  } else {
    endpoint = '/despesas';
    payload = { ...payload, usuario: { id: usuarioId } };
  }

  console.log('📤 Enviando transação:', payload);

  try {
    const res = await api.post(endpoint, payload);
    console.log('✅ Resposta do backend:', res.data);
    await carregarTransacoes();
  } catch (error) {
    console.error('❌ Erro ao adicionar transação:', error.response?.data || error.message);
    throw error; // você pode manter ou remover conforme preferir
  }
};


  // Remove uma transação (receita ou despesa)
  const removerTransacao = async (transacao) => {
    let endpoint = transacao.tipo === 'Receita'
      ? `/receitas/${transacao.id}`
      : `/despesas/${transacao.id}`;
    await api.delete(endpoint);
    await carregarTransacoes();
  };

  return (
    <TransactionsContext.Provider value={{ transacoes, loading, carregarTransacoes, adicionarTransacao, removerTransacao }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}