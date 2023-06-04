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

interface NewTransactionType {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionsContextType {
  transactions: TransactionType[];
  fetchLoadTransactions: (data?: string) => Promise<void>;
  createNewTransaction(data: NewTransactionType): Promise<void>;
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

  async function createNewTransaction(data: NewTransactionType) {
    const { description, price, category, type } = data;

    const newTransaction = await api.post("/transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions([newTransaction.data, ...transactions]);
  }

  useEffect(() => {
    fetchLoadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchLoadTransactions,
        createNewTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
