import { useEffect, useState } from "react"
import axios from 'axios'
import { useDispatch} from 'react-redux'
import { status, save } from "../redux/store"
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [name,setName] = useState("");

    useEffect(()=>{
        if (localStorage.getItem("name")!=null) {
            navigate("/list")
        }
    },[])

    const submit=()=>{
        localStorage.setItem("name",name);
        localStorage.setItem("email",email);

        axios.post(`https://books-api-wf3s.onrender.com/save-user?name=${name}&email=${email}`).then(()=>{
            dispatch(status(true));
            dispatch(save({
                name : name,
                email : email
            }))
        })
    }

  return (
    <div className="w-[20rem] my-5 mx-auto border border-black py-5 px-3 rounded-md">
        <i className ="my-2 font-medium text-lg inline-block mx-auto">Create an Account</i>
        <i className="block mb-4">Website where you can share your favourite books and it will be visible to auhenticated users</i>
        <div className="flex flex-col text-left">
            <i className="">Username</i>
            <input type="text" className={`${name} px-2 py-1 border border-black block rounded-md`} onChange={(e)=>{
                setName(e.target.value)
            }} />
        </div>
        <div className="flex flex-col text-left">
            <i className="">Email</i>
            <input type="email" className={`${email} px-2 py-1 border border-black block rounded-md`} onChange={(e)=>{
                setEmail(e.target.value)
            }} />
        </div>
        <div className="border border-black mt-4 cursor-pointer rounded-md bg-[#4F4557]">
            <i className="text-white" onClick={submit}>Sign in</i>
        </div>

    </div>
  )
}
