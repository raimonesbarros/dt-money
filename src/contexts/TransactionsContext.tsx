import { ReactNode, createContext, useEffect, useState } from "react";

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
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  async function loadTransactions() {
    const transactions = await fetch("http://localhost:3000/transactions");
    const data = await transactions.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
