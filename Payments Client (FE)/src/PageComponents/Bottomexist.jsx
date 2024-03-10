import { useNavigate } from "react-router-dom";
export const Bottomexist=({label,to,text})=>
{
    const navi=useNavigate()
    return<div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <button className="pointer underline pl-1 cursor-pointer" onClick={()=>
        {
            navi(to)
        }}>{text}</button>
    </div>
}