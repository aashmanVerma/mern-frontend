import { useEffect, useState } from "react";
import axios from "axios";
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { status } from "../redux/store";

export default function Change() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if (localStorage.getItem("name")==null) {
      navigate("/");
    } else {
      dispatch(status(true))
    }
  },[])


  const username =localStorage.getItem("name");
  const [book,setBook] = useState({
    title : null,
    author : null,
    publishedAt : null,
  })

  const addBook=()=>{

    axios.post(`https://books-api-wf3s.onrender.com/add-book?title=${book.title}&author=${book.author}&publishedAt=${book.publishedAt}`).then(()=>{
      console.log("book has been added");
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="w-[85%] mx-auto my-5 text-left px-4">
      <i className="">You are signed in as {username}</i>
      <div className="my-5 w-[20rem] mx-auto text-center border border-black py-3 rounded-md px-4">
        <i className="font-medium text-lg">Add Book</i>
        <div className="flex flex-col mt-4 text-left ">
            <i className="">Title of book :</i>
            <input type="text" className={`px-2 py-1 border border-black block rounded-md`} onChange={(e)=>{
              setBook({...book, title:e.target.value})
            }} />
        </div>
        <div className="flex flex-col mt-4 text-left ">
            <i className="">Author name : </i>
            <input type="text" className={`px-2 py-1 border border-black block rounded-md`} onChange={(e)=>{
              setBook({...book, author:e.target.value})
            }} />
        </div>
        <div className="flex flex-col mt-4 text-left ">
            <i className="">Published at :</i>
            <input type="text" className={`px-2 py-1 border border-black block rounded-md`} onChange={(e)=>{
              setBook({...book, publishedAt:e.target.value})
            }} />
        </div>
        <motion.div className="border border-black mt-4 py-1  cursor-pointer rounded-md bg-[#4F4557]" 
        onClick={addBook}
        initial={{y:0}}
        whileTap={{y:[-5,0]}}
        >
            <i className="text-white">Add book</i>
        </motion.div>
      </div>

    </div>
  )
}
