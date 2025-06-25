import React, { createContext, useContext, useState } from 'react';

const TransactionsContext = createContext();

const initialTransacoes = [
  {
    id: 1,
    descricao: 'Salário',
    valor: 5000,
    data: '2024-06-01',
    tipo: 'Receita',
    categoria: null,
  },
  {
    id: 2,
    descricao: 'Aluguel',
    valor: 1500,
    data: '2024-06-05',
    tipo: 'Despesa',
    categoria: 'Moradia',
  },
];

export function TransactionsProvider({ children }) {
  const [transacoes, setTransacoes] = useState(initialTransacoes);

  function adicionarTransacao(transacao) {
    const novoId = transacoes.length > 0 ? Math.max(...transacoes.map(t => t.id)) + 1 : 1;
    const novaTransacao = { ...transacao, id: novoId };
    setTransacoes([...transacoes, novaTransacao]);
  }

  function removerTransacao(id) {
    setTransacoes(transacoes.filter(t => t.id !== id));
  }

  return (
    <TransactionsContext.Provider value={{ transacoes, adicionarTransacao, removerTransacao }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
} 