import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export default function UsertoSend({usernam}) {
  const [filter, setFilter] = useState("");
  const[Userss,SetUsers] =useState([]);
  useEffect(()=>
  { 
     async function fun()
     {
      const response = await axios.get("https://payments-app-api-dhanu.vercel.app/api/v1/user/users?filter="+filter);
      SetUsers(response.data.users);
     }
     fun();
  },[filter,Users])
  return (
    <>
      <div className="font-bold mt-6 ml-4">Users</div>
      <div className="my-2 mx-4">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          className="w-full px-2 py-1 border rounded border-slate-200"
          type="text"
          name=""
          id=""
          placeholder="Search Users.."
        />
      </div>
      <div>
      {Userss.map((find) => {
        if(find.username==usernam)
        {
          return <></>  
        }
        else{
          return <Users user={find}/>
        }
      })}
      </div>
    </>
  );    
}

function Users({ user }) {
 const navi= useNavigate();
  return (
    <>
      <div className="flex justify-between my-2 mx-4">
        <div className="flex ">
          <div className="flex  rounded-full h-12 w-12 bg-slate-200 justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {user.firstname[0].toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col justify-center h-full">
            <div className="capitalize">
              {user.firstname} {user.lastname}
            </div>
          </div>
        </div>
        <div>
          <button onClick={()=>
        {
            navi(`/SendMoney?id=${user._id}&name=${user.firstname}`)
        }} id="butt">
            <div id="svg-wrapper-1">
              <div id="svg-wrapper">
                <svg
                  id="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span id="title">Send</span>
          </button>
        </div>
      </div>
    </>
  );
}
