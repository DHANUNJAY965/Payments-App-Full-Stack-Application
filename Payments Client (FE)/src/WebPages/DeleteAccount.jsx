import { Header } from "../PageComponents/Header";
import { Subheading } from "../PageComponents/Subheading";
import { InputFeild } from "../PageComponents/InputFeild";
import { Button } from "../PageComponents/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Bottomexist } from "../PageComponents/Bottomexist";
export default function DeleteAccount() {
  const navi = useNavigate();
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const token = localStorage.getItem("token");
  const [showToast, setShowToast] = useState(false);
  const [Toast, setToastMessage] = useState("");
  return (
    <>
      <div className="bg-slate-320 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white text-center py-2 h-max px-4 border-8  border-indigo-600">
            <Header label={"Account Delete"} />
            <Subheading
              label={"Please enter your details to Delete your account"}
            />
            <InputFeild
              onChange={(e) => {
                setEmail(e.target.value);
                // console.log("the mail is : ",Email);
              }}
              label={"Enter Email"}
              placeholder={"dhanunjayaburada6@gmail.com"}
            />
            <InputFeild
              onChange={(e) => {
                setPass(e.target.value);
                
              }}
              label={"Enter Password"}
              placeholder={"Password"}
              type={"password"}
            />
            <div className="pt-4">
              <Button
                label={"Delete"}
                OnPress={async () => {
                  try {
                    if (!Email || !Pass) {
                      setToastMessage("Please Fill in your details");
                      setShowToast(true);
                      setTimeout(() => {
                        setShowToast(false);
                      }, 4000);
                      return;
                    }
                    const response = await axios.delete(
                      "https://payments-app-api-dhanu.vercel.app/api/v1/account/DeleteAccount",
                      {
                        data: {
                          username: Email,
                          password: Pass,
                        },
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    // console.log("feom delete",response.data.message);
                    
                    if(response.data.message=="User Doesnt Exist")
                    {
                      setToastMessage(response.data.message);
                      setShowToast(true);
                      setTimeout(() => {
                        setShowToast(false);
                      }, 4000);
                      setTimeout(() => {
                        navi(`/Signup`);
                      }, 3000); 
                      return;
                    }
                    else if(response.data.message=="Account deleted Successfully")
                    {
                      setToastMessage(response.data.message);
                      setShowToast(true);
                      setTimeout(() => {
                        setShowToast(false);
                      }, 4000);
                      setTimeout(() => {
                        navi(`/Signup`);
                      }, 1500);
                    }
                    else{
                      setToastMessage(response.data.message);
                      setShowToast(true);
                      setTimeout(() => {
                        setShowToast(false);
                      }, 4000);
                    }
                  } catch (e) {
                    // console.log("error is : ", e);
                    setToastMessage("please enter correct credentials");
                    setShowToast(true);
                    setTimeout(() => {
                      setShowToast(false);
                    }, 4000);
                  }
                }}
              />
               <Bottomexist to={"/Account"} text={"Back"} />
            </div>
          </div>
        </div>
      </div>
      {showToast && (
              Toast.startsWith("Account deleted Successfully") ?
              (<div
                id="toast-success"
                className="fixed inset-x-0 top-0 mx-auto mt-4 max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div className="flex items-center">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="sr-only">Check icon</span>
                  </div>
                  <div className="ms-3 text-sm font-normal">{Toast}</div>
                  <button
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    data-dismiss-target="#toast-success"
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
              </div>):(<div
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
  </div>)
            )}
            <div className="absolute bottom-0 mb-4 text-gray-600 font-semibold w-full text-center">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Burada Dhanunjay
        </div>
    </>
  );
}
