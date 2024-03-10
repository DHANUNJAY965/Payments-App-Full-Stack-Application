import { Header } from "../PageComponents/Header";
import { Button } from "../PageComponents/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MiniStatement() {
  const navi = useNavigate();
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [Toast, setToastMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://payments-app-api-dhanu.vercel.app/api/v1/user/TransactionHistory",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const response2 = await axios.get(
          "https://payments-app-api-dhanu.vercel.app/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

       
        setTransactions(response.data.history);
        setBalance(response2.data.balance);
      } catch (error) {
        setToastMessage("Server down please try again later!")
       setShowToast(true)
       setTimeout(()=>{
        setShowToast(false)
       },4000)
       setTimeout(()=>{
        navi("/Account");
       },2000)
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    console.log("the response2 is : ", transactions);
  }, [transactions, balance]);

  return (
    <>
      <div className="bg-slate-320 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white text-center py-2 h-max px-4 border-8  border-indigo-600">
            <Header label={"Mini Statement"} />
            <div className="flex flex-wrap justify-center">
              <h3 className="my-4 font-semibold text-base">Balance: {balance}</h3>
            </div>
            {
                transactions.length==0? (<h1 className="font-semibold text-base text-green-600 mb-3">NO Trancactions Made</h1>) : (<div className="flex flex-col mt-6">
                <div className="flex justify-between border-b border-gray-300 py-2">
                  <div className="w-1/3">
                    <h1 className="font-bold text-xl">Transaction Amount</h1>
                  </div>
                  <div className="w-1/3">
                    <h1 className="font-bold text-xl">Transaction Type</h1>
                  </div>
                  <div className="w-1/3">
                    <h1 className="font-bold text-xl">By Whom</h1>
                  </div>
                </div>
                {transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-300 py-2"
                  >
                    <div className="w-1/3">
                      <p className="text-lg">{transaction.amount}</p>
                    </div>
                    <div className="w-1/3">
                      <p className="text-lg">{transaction.TransType}</p>
                    </div>
                    <div className="w-1/3">
                      <p className="text-lg">{transaction.ByWhom}</p>
                    </div>
                  </div>
                ))}
              </div>)
            }
            
            <div className="pt-4">
              <Button
                label={"Back"}
                OnPress={()=>
                {
                  navi("/Account");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 mb-4 text-gray-600 font-semibold w-full text-center">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Burada Dhanunjay
        </div>
        {showToast && (
        <div
          id="toast-warning"
          className="fixed inset-x-0 top-0 mx-auto mt-4 max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="flex items-center">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
              <span className="sr-only">Warning icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{Toast}</div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-warning"
              aria-label="Close"
              onClick={() => {
                setShowToast(false);
              }}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
