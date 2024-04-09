import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { useGetUserInfo } from "./useGetUserInfo"



export const useGetTransaction = () => {
    const [transactions, setTransactions] = useState([])
    const [transactionTotal, setTransactionsTotal] = useState({ balance: 0, income: 0, expanse: 0 })

    const transactionCollectionRef = collection(db, 'transactions')
    const { userID } = useGetUserInfo()



    const getTransaction = async () => {
        let unsubscribe;
        try {
            const queryTransaction = query(transactionCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt")
            )

            unsubscribe = onSnapshot(queryTransaction, (snapshot) => {

                let docs = []
                let totalIncome = 0;
                let totalExpanse = 0




                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({ ...data, id })

                    if (data.transactionType === "expanse") {
                        totalExpanse += Number(data.transactionAmount)
                    } else {
                        totalIncome += Number(data.transactionAmount)
                    }


                })
                setTransactions(docs)
                let balance = totalIncome - totalExpanse
                setTransactionsTotal({
                    balance,
                    expanse: totalExpanse,
                    income: totalIncome
                })
            })


        } catch (error) {
            console.error(error)
        }

        return () => unsubscribe()
    }

    useEffect(() => {
        getTransaction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return { transactions, transactionTotal }
}