import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface TransactionType {
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  type: "income" | "outcome";
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextType {
  transactions: TransactionType[];
  fetchLoadTransactions: (data?: string) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  async function fetchLoadTransactions(query?: string) {
    const transactions = await api.get("/transactions", {
      params: {
        q: query,
      },
    });

    setTransactions(transactions.data);
  }

  useEffect(() => {
    fetchLoadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchLoadTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
