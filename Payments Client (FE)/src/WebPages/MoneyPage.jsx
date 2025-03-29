import { useState, useEffect } from "react";
import Appbar from "../PageComponents/Appbar";
import BalanceDisplay from "../PageComponents/BalanceDisplay";
import UsertoSend from "../PageComponents/UsertoSend";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userdetails } from "../../Userdetails";
// ... (import statements remain unchanged)
import { useNavigate } from "react-router-dom";
export default function MoneyPage() {
  const [balance, setBalance] = useState(0);
  const [userDetailsState, setUserDetailsState] = useRecoilState(userdetails);
  const [maket, setT] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [Toast, setToastMessage] = useState("");
const navi=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://payments-app-api-dhanu.vercel.app/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

         setBalance(response.data.balance);

        const response2 = await axios.get(
          "https://payments-app-api-dhanu.vercel.app/api/v1/user/Userdetails",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        // console.log("the details from moneypage : ", response2.data);

        // console.log("the balance is : ", balance);
        await setUserDetailsState({
          ...response2.data,
          balance: response.data.balance,
        });
        // console.log("the user details from moneypage : ", userDetailsState);
        setT(true);
      } catch (error) {
       setToastMessage("Server down please try again later!")
       setShowToast(true)
       setTimeout(()=>{
        setShowToast(false)
       },4000)
       setTimeout(()=>{
        navi("/SignUp");
       },2500)
      }
    };

    fetchData();
  }, [balance, maket]);

  // Removed balance, userDetailsState, and maket from dependencies

  return (
    <>
      {maket ? (
        <div className="">
          <Appbar />
          <BalanceDisplay balance={balance} />
          
          <UsertoSend usernam={userDetailsState.uname} />
          <div className="bottom-0 mb-4 text-gray-600 font-semibold w-full text-center">
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by Burada Dhanunjay
          </div>
        </div>
      ) : (
      <div> <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
    </div></div>
      )}
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
