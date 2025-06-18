import { Header } from "../PageComponents/Header";
import { InputFeild } from "../PageComponents/InputFeild";
import { Subheading } from "../PageComponents/Subheading";
import { Bottomexist } from "../PageComponents/Bottomexist";
import { Button } from "../PageComponents/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userdetails } from "../../Userdetails";
import { useRecoilState } from "recoil";
export const Emailsignup = () => {
  const [Email, setEmail] = useState("");
 const [showToast, setShowToast] = useState(false);
  const [Toast, setToastMessage] = useState("");
  const [maket, setT] = useState(false);
  const navi = useNavigate();
  const [details,setDetails]=useRecoilState(userdetails);

  return (
    <>
    {maket?(<div> <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
    </div></div>):( <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-slate-320 max-h-screen flex flex-col items-center justify-center">
        <div className="relative max-w-md w-full">
          <div className="rounded-lg bg-white text-center py-2 px-4 border-8 border-indigo-600 mx-auto">
            <div className="font-bold text-4xl mx-6 mt-6">Payment's App</div>
            <Header label={"Signup"} />
            <Subheading
              label={"For Your Secure Payment's"}
            />
            <InputFeild
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label={"Enter Email"}
              placeholder={"dhanunjayaburada6@gmail.com"}
            />
            
            <div className="pt-4">
              <Button
                label={"Verify"}
                OnPress={async () => {
                 
                  if (!Email) {
                    setShowToast(true);
                    setToastMessage("Please Enter Email Address.");
                    setTimeout(() => {
                      setShowToast(false);
                    }, 4000);
                    return;
                  }
                  setT(true);
                 try{
                   const response = await axios.post(
                     "https://payments-app-api-dhanu.vercel.app/api/v1/user/generate-otp",
                     {
                       username: Email,
                     },
                     {
                       "Content-Type": "application/json",
                     }
                   );
                   
                   console.log(response.data.message.startsWith("OTP sent to your email"))
                  console.log(response.data.otp);
                   if (response.data.message.startsWith("OTP sent to your email")) {
                     setDetails({
                       Email:Email.toLowerCase(),
                       otp: response.data.otp,
                     });
                     
                     setTimeout(() => {
                                        console.log("came here");

                        navi(`/Verify`);
                     }, 1500);
                     setToastMessage(response.data.message);
                     setShowToast(true);
                     setT(false)
                     setTimeout(() => {
                       setShowToast(false);
                     }, 1000);
                     
                   } else {
                     setToastMessage(response.data.message);
                     setShowToast(true);
                     setT(false)
                     setTimeout(() => {
                       setShowToast(false);
                     }, 4000);
                     return;
                   }
                 }
                 catch(e)
                 {
                  setToastMessage("Server down Pease try again later");
                  setShowToast(true);
                  setT(false)
                  setTimeout(() => {
                    setShowToast(false);
                  }, 4000);
                  return;
                 }
                }}
              />
            </div>
            <Bottomexist
              label={"Already Registered?"}
              to={"/signin"}
              text={"Sign in"}
            />
            

            {showToast &&
              (Toast.startsWith("OTP send to your mail") ? (
              
                <div
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
                </div>
              ) : (
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
              ))}
          </div>
        </div>
      </div>
      <div className="mt-4 mb-4 text-gray-600 font-semibold w-full text-center">
        Made with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by Burada Dhanunjay
      </div>
    </div>)}
   
    </>
  );
};
