import React, { useState } from 'react'
import { useAddTransactions } from '../hooks/useAddTransactions'
import { useGetTransaction } from '../hooks/useGetTrnsaction';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom'


function ExpanseTracker() {
    const { addTransaction } = useAddTransactions()
    const { transactions, transactionTotal } = useGetTransaction()
    const { balance, income, expanse } = transactionTotal
    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionType, setTransactionType] = useState("expanse")
    const { userName, userPhoto } = useGetUserInfo()
    let navigate = useNavigate()



    const onSubmit = (e) => {
        e.preventDefault()
        addTransaction({ description, transactionAmount, transactionType })
        setDescription("")
        setTransactionAmount("")

    };

    const signUserOut = async () => {
        try {
            await signOut(auth)
            localStorage.clear()
            navigate("/")

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className='expanse-tracker'>
                <div className='container'>
                    {userPhoto && (
                        <div className='profile'>
                            <img className='profile-photo' src={userPhoto} alt='' />
                            <button className='sign-out-btn' onClick={signUserOut}>Sign Out</button>
                        </div>)}
                    <h1> {userName}'s Expanse Tracker </h1>
                    <div className='balance'>
                        <h2>Your Balance</h2>
                        {balance >= 0 ? (<h4 style={{ color: balance > 0 ? "green" : "red" }}>$ {balance} </h4>) : (<h4 style={{ color: balance > 0 ? "green" : "red" }}>-$ {balance * -1} </h4>)}
                    </div>
                    <div className='summary'>
                        <div className='income'>
                            <h4>income</h4>
                            <p>$ {income}</p>
                        </div>
                        <div className='expanse'>
                            <h4>expanse</h4>
                            <p>$ {expanse}</p>
                        </div>
                    </div>
                    <form className='add-transaction' onSubmit={onSubmit}>
                        <input type='text' placeholder='Description' value={description} required onChange={(e) => setDescription(e.target.value)} />
                        <input type='number' placeholder='Amount' value={transactionAmount} required onChange={(e) => setTransactionAmount(e.target.value)} />
                        <input type='radio' id='expanse ' value="expanse" checked={transactionType === "expanse"} onChange={(e) => setTransactionType(e.target.value)} />
                        <label htmlFor='expanse' >Expanses</label>
                        <input type='radio' id='income ' value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                        <label htmlFor='income' >Income</label>

                        <button type='submit'>Add Transactions  </button>
                    </form>
                </div>
            </div >

            <div className='transactions'>
                <h3>Transactions</h3>

                <ul>
                    {transactions.map((transaction) => {
                        const { description, transactionAmount, transactionType } = transaction
                        return <li>
                            <h4>{description}</h4>
                            <p>$ {transactionAmount} <label style={{ color: transactionType === "expanse" ? "red " : "green" }} >{transactionType}</label></p>
                        </li>
                    })}

                </ul>
            </div >
        </>
    )
}

export default ExpanseTracker
