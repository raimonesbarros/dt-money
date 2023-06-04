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
  fetchLoadTransactions: (data?: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  async function fetchLoadTransactions(query?: string) {
    const url = new URL("http://localhost:3000/transactions")

    if (query) {
      url.searchParams.append("q", query)
    }

    const transactions = await fetch(url);
    const data = await transactions.json();

    setTransactions(data);
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
