
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import Modal from 'react-modal';
import { GlobalStyle } from './styles/global';
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';
import {TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root') // é a div que está contida no index.html

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

 


  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleClosenNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionsProvider>

      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleClosenNewTransactionModal} />
      <Dashboard />

    </TransactionsProvider>
  );
}


