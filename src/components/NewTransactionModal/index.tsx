import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, RadiosBox, TransactionTypeContainer } from './styles'
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}



export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const { createTransaction } = useTransactions();


    const [type, setType] = useState('deposit');

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');


    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
       await createTransaction({
            title,
            amount,
            type,
            category
        })
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
        onRequestClose();
    }


    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                overlayClassName='react-modal-overlay'
                className="react-modal-content"
            >
                <button type="button"
                    onClick={onRequestClose}
                    className="react-modal-close">
                    <img src={closeImg} alt="" />
                </button>
                <Container onSubmit={handleCreateNewTransaction}>
                    <h2>Cadastrar Transação</h2>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='Título' />

                    <input value={amount}
                        onChange={e => setAmount(Number(e.target.value))} type='number' placeholder='Valor' />
                    <TransactionTypeContainer>
                        <RadiosBox
                            type="button"
                            isActive={type === 'deposit'}
                            onClick={() => { setType('deposit') }}
                            activeColor="green"
                        >
                            <img src={incomeImg} alt="" />
                            <span>Entrada</span>
                        </RadiosBox>
                        <RadiosBox
                            type="button"
                            isActive={type === 'withdraw'}
                            onClick={() => { setType('withdraw') }}
                            activeColor="red"
                        >
                            <img src={outcomeImg} alt="" />
                            <span>Saída</span>
                        </RadiosBox>
                    </TransactionTypeContainer>
                    <input value={category}
                        onChange={e => setCategory(e.target.value)} placeholder='Categoria' />
                    <button type="submit"> Cadastrar</button>
                </Container>
            </Modal>
        </>
    )
}