import { useState } from "react";
import { Header } from "../PageComponents/Header";
import { Subheading } from "../PageComponents/Subheading";
import { InputFeild } from "../PageComponents/InputFeild";
import { Button } from "../PageComponents/Button";
import { Bottomexist } from "../PageComponents/Bottomexist";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userdetails } from "../../Userdetails";
import { useRecoilValue } from "recoil";
export const Details = () => {
  const [Firstname, setfirstName] = useState("");
  const [Lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const details = useRecoilValue(userdetails);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&()<>?{}*])(?=.{8,})[^\s]{8,}$/;
  const [showToast, setShowToast] = useState(false);
  const [Toast, setToastMessage] = useState("");
  const navi = useNavigate();

  return (
    <>
    <div className="flex flex-col justify-center items-center h-screen">

      <div className="bg-slate-320 max-h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-4 lg:max-w-lg">
          <div className="rounded-lg bg-white text-center p-4 border-8 border-indigo-600">
            <div className="font-bold text-4xl pt-6">Payment's App</div>
            <Header label={"Details"} />
            <Subheading
              label={"Enter the following information to create a new account"}
            />
            <InputFeild
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              label={"Enter First Name"}
              placeholder={"Dhanunjay"}
            />
            <InputFeild
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              label={"Enter Last Name"}
              placeholder={"Burada"}
            />

            <InputFeild
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label={"Enter Password"}
              placeholder={"Password (min length of 8)"}
              type={"password"}
            />
            {passwordRegex.test(password) && password.length >= 8 ? (
              <div
                className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mb-4 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
                role="alert"
              >
                <div className="flex p-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-teal-500 mt-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div className="ms-3">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Strong Password
                    </p>
                  </div>
                </div>
              </div>
            ) : password.length >= 1 ? (
              <div className="flex p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-2 mt-[2px]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Danger</span>
                <div>
                  <span className="font-medium">
                    Ensure that these requirements are met:
                  </span>
                  <ul className="mt-1.5 list-disc list-inside">
                    <li>At least 8 characters in length</li>
                    <li>
                      At least 1 lowercase, uppercase, numeric, special
                      character
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div className="pt-2">
              <Button
                label={"Sign Up"}
                OnPress={async () => {
                  // console.log("clicked");
                  // console.log(details==undefined);
                  // console.log(details.Email);
                  try{
                    if (
                      details.Email.length > 4 &&
                      details.otp == details.userotp
                    ) {
                      if (!Firstname || !Lastname || !password) {
                        setShowToast(true);
                        setToastMessage("Please Enter All Required Fields");
                        setTimeout(() => {
                          setShowToast(false);
                        }, 4000);
                        return;
                      }
                      
                      try{

                        const response = await axios.post(
                          "https://payments-app-api-dhanu.vercel.app/api/v1/user/signup",
                          {
                            username: details.Email,
                            password: password,
                            firstname: Firstname,
                            lastname: Lastname,
                          },
                          {
                            "Content-Type": "application/json",
                            "Content-Length": 0,
                          }
                        );
                        if (response.data.token) {
                          localStorage.setItem("token", response.data.token);
                          setToastMessage(response.data.message);
                          setShowToast(true);
    
                          setTimeout(() => {
                            setShowToast(false);
                          }, 4000);
                          setTimeout(() => {
                            if (localStorage.getItem("token")) {
                              navi(`/Account`);
                            } else {
                              navi("/SignUp");
                            }
                          }, 1500);
                        } else {
                          setToastMessage(response.data.message);
                          setShowToast(true);
                          setTimeout(() => {
                            setShowToast(false);
                          }, 4000);
                        }
                      }
                      catch(e)
                      {
                        setToastMessage("Server down please try again later!");
                        setShowToast(true);
                        setTimeout(() => {
                          setShowToast(false);
                        }, 4000);
                        setTimeout(() => {
                          navi("/SignUp")
                        }, 1500);
                      }
                    }
                    else{
                      console.log("reached else part")
                      setToastMessage("Please go back and verify your mail");
                        setShowToast(true);
                        setTimeout(() => {
                          setShowToast(false);
                        }, 4000);
                        setTimeout(() => {
                          navi("/SignUp");
                        }, 1500);
                    }
                  }
                  catch (e) {
                    // console.log("reached catch part")
                      setToastMessage("Please go back and verify your mail");
                        setShowToast(true);
                        setTimeout(() => {
                          setShowToast(false);
                        }, 4000);
                        setTimeout(() => {
                          navi("/SignUp");
                        }, 1500);
                  }
                }}
              />
              {showToast &&
                (Toast.startsWith("Registered") ? (
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
            <Bottomexist to={"/Emailsignup"} text={"Back"} />
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
    </div>
    </>
  );
};
