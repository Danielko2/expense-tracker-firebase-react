import { query,collection, orderBy,where,  onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useEffect, useState } from "react"
import { useGetUserInfo } from "./useGetUserInfo";
export const useGetTransaction = () =>{
    const [transaction, setTransaction]= useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expenses: 0.0,
      });
      const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getTransaction = async () => {
        let unsubscribe;
 try {

    const queryTransaction= query(transactionCollectionRef, where("userID", "==",userID), orderBy("createdAt") );
    unsubscribe = onSnapshot(queryTransaction, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }

       
        });

setTransaction(docs);
let balance = totalIncome - totalExpenses;
setTransactionTotals({
  balance,
  expenses: totalExpenses,
  income: totalIncome,
});
    });
 } catch (err) {
    console.error(err);
    setTransaction([]);
 }
 return() => unsubscribe();
    };
    useEffect(() => {
        getTransaction();
      }, []);
 
     console.log(transactionTotals);
     return { transaction, transactionTotals };
};
