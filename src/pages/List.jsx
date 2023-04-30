import { useEffect, useState } from "react";
import axios from 'axios'
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { status, saveBook } from "../redux/store";

export default function List() {
  const username = localStorage.getItem("name");
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  // const [book,setBook] = useState({
  //   title : null,
  //   author : null,
  //   publishedAt : null,
  // })


  const fetch =()=>{
    axios.get("https://books-api-wf3s.onrender.com/fetch-books")
    .then((item)=>{
      setData(item.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const bookDeleteData = useSelector((state)=>state.book)
  const deleteBook=()=>{
    console.log(bookDeleteData);
    axios.post(`https://books-api-wf3s.onrender.com/delete-book?title=${bookDeleteData.title}&author=${bookDeleteData.author}&publishedAt=${bookDeleteData.publishedAt}`)
    .then(()=>{
      console.log("book deleted");
    }).catch((err)=>{
      console.log(err);
    })
  }
  
  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("name")==null) {
      navigate("/")
    } else {
      dispatch(status(true))
    }
    axios.get("https://books-api-wf3s.onrender.com/fetch-books")
    .then((item)=>{
      setData(item.data);
    })
    console.log(data);

  },[])

  return (
    <div className="w-[85%] mx-auto my-5 text-left px-4">
      <i className="">You are signed in as {username}</i>
      <div className="mt-3 w-[100%]">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <motion.button
              initial={{y:0}}
              whileTap={{y:[-5,0]}}
              type=""
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </motion.button>
          </div>
        </form>
      </div>
      <div className="my-4 flex flex-wrap gap-x-5 gap-y-5">
        {data && data.map((item)=>{
          return (
            <div key={item.id} className="mx-auto border border-black w-[20rem] px-5 py-3 rounded-md">
              <i className="font-medium">{item.title}</i>
              <div className="flex justify-between mt-2">
                <i className="">Written by : </i>
                <i className="">{item.author}</i>
              </div>
              <div className="flex justify-between">
                <i className="">Published at : </i>
                <i className="">{item.publishedAt}</i>
              </div>
              <div className="py-1 my-2 text-center bg rounded-md" onClick={()=>{
                  // setBook({ 
                  //   title : item.title,
                  //   author : item.author,
                  //   publishedAt : item.publishedAt,
                  // })
                  dispatch(saveBook({
                    title : item.title,
                    author : item.author,
                    publishedAt : item.publishedAt
                  }))
                  deleteBook()
                  fetch();
                }}>
                <i className="text-white">Delete</i>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
