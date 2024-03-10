import { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userdetails } from "../../Userdetails";
const Sidebar = ({ onClose }) => {
  const navi = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [Toast, setToastMessage] = useState("");
  return (
    <div className="fixed top-0 left-0 h-full w-56 bg-gray-800 text-white z-50">
      <div className="p-4">
        <h1 className="text-lg font-bold mb-4 text-center">Payments App</h1>
        <div className="flex  justify-center flex-col">
          <div
            onClick={() => {
              navi("/Profile");
            }}
            className="flex justify-center hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            Profile{" "}
            <svg
              className="h-8 w-8 pb-2 text-yellow-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <circle cx="12" cy="7" r="4" />{" "}
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </div>
          <div
            onClick={() => {
              navi("/ChangePassword");
            }}
            className="flex justify-center hover:bg-gray-700 p-2 mt-1.5 rounded cursor-pointer"
          >
            <div>Change Password</div>
            <svg
              className="pl-1 pb-1 h-8 w-8 text-yellow-500"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </div>
          <div
            onClick={() => {
              navi("/MiniStatement");
            }}
            className="flex justify-center mt-1.5 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <div>Mini Statement</div>
            <svg
              className="h-8 w-8 ml-1 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div
            onClick={() => {
              navi("/DeleteAccount");
            }}
            className="flex justify-center mt-1.5 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <div>Delete Account</div>
            <svg className="h-7 w-7 pl-1 text-yellow-600"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
          </div>

          <div
            onClick={() => {
              localStorage.removeItem("token");
              setShowToast(true);
              setToastMessage("Logged Out Successfully");
              setTimeout(()=>{
                setShowToast(false);
              },3000);
              setTimeout(()=>{
                navi("/SignUp");
              },500)
            }}
            className="flex justify-center mt-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <div className="mt-1">Sign Out</div>
            <svg
              className="pl-1.5 h-8 w-8 text-yellow-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
          </div>
          <div
            className="cursor-pointer mt-4 flex justify-center hover:bg-red-700 p-2 rounded"
            onClick={onClose}
          >
            <span className="mr-2">Close</span>
            <svg
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      {showToast && (
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
            )}
    </div>
  );
};

const Appbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { fname } = useRecoilValue(userdetails);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (event) => {
    // Close the sidebar if the click is outside of it
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="shadow flex h-14 justify-between">
        <div className="flex flex-col justify-center font-bold text-lg h-full ml-4">
          Payments App
        </div>
        <div className="flex justify-center">
          <div
            className="flex flex-col justify-center cursor-pointer h-full mr-4 capitalize"
            onClick={toggleSidebar}
          >
            Hello {fname}
          </div>
          <div
            className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mt-1 mr-2 cursor-pointer"
            onClick={toggleSidebar}
          >
            <div className="flex flex-col justify-center">
              {fname[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <Sidebar onClose={() => setIsSidebarOpen(false)} ref={sidebarRef} />
      )}
      
    </>
  );
};

export default Appbar;
