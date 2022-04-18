import { createContext, ReactNode, useContext } from 'react'
import { api } from "../services/api";
import { useEffect, useState } from "react";




interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// interface TransactionInput {
//     title: string;
//     amount: number;
//     type: string;
//     category: string;
// } É IGUAL A:

// type TransactionInput = Pick<Transaction, 'title' | 'amount'|'type' | 'category'> // Há a inclusão das propriedades

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'> // Há a omissão das duas propriedades




interface TransactionsProviderProps {
    children: ReactNode;
}


interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}


const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {


    const [transactions, setTransactions] = useState<Transaction[]>([]);


    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])


    async function createTransaction(transactionInput: TransactionInput) {

        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }


    return (

        <TransactionsContext.Provider value={{
            transactions, createTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    return context
}