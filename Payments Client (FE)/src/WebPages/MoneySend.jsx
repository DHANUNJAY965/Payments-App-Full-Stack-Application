import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function MoneySend() {
    const [ParamName]=useSearchParams();
    const name=ParamName.get('name');
    const id=ParamName.get('id');
    const[Money,setMoney]=useState(0);
    const [showToast, setShowToast] = useState(false);
    const [Toast, setToastMessage] = useState("");
    const navi=useNavigate();
  return (
    <>
      <div className="flex h-screen bg-gray-100 justify-center">
        <div className="flex flex-col justify-center h-full">
          <div className=" h-min text-card-foreground  p-4 space-y-8 w-96 bg-slate-300 shadow-xl rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="text-3xl font-bold text-center">Send Money</div>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">
                      {name[0].toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="Money"
                    >
                      Amount (in (₹) Rs)    
                    </label>
                    <input
                      onChange={(e) => {
                        setMoney(e.target.value);
                      }}
                      type="number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      id="amount"
                      placeholder="Enter amount"
                    />
                  </div>
                  <button
                    onClick={async ()=>
                    {

                      if(!Money)
                      {
                        setShowToast(true);
                        setToastMessage("Please Enter the amount to send !");
                        return;
                      }
                      try{
                        const response= await axios.post("https://payments-app-api-dhanu.vercel.app/api/v1/account/transferamount",{
                         amountTransfer:Money,
                         toID:id
                        },
                        {
                         headers:{
                             Authorization: "Bearer "+localStorage.getItem('token'),
                         }
                        });
                        // console.log("the response after money send is : ",response.data.message)
                        if(response.data.message.startsWith("Rupees"))
                        {
                          setShowToast(true);
                           setToastMessage(response.data.message);
                           setTimeout(()=>{
                             setShowToast(false);
                           },3000);
                           setTimeout(()=>{
                             navi("/Account");
                             return
                           },1500);
                        }
                        else{
                         setShowToast(true);
                           setToastMessage(response.data.message);
                           setTimeout(()=>{
                             setShowToast(false);
                           },3000);
                        }
                      }
                      catch(e)
                      {
                        setShowToast(true);
                           setToastMessage("Server down please try again later!");
                           setTimeout(()=>{
                             setShowToast(false);
                           },3000);
                           setTimeout(()=>{
                            navi("/Account");
                          },3000);
                      }
                    }}
                    className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                  >
                    Initiate Transfer
                  </button>
                </div>
              </div>
            </div>
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
