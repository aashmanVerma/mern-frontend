import './App.css'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const signedIn = useSelector((state)=>state.toggle.signedIn);
  const user = localStorage.getItem("name");


  return (
    <>
      <div className='flex w-[85%] mx-auto px-4 py-2 rounded-md border-2 gap-x-6'>
        <i className='font-medium inline-block text-lg cursor-pointer'>Sign Up</i>
        <i className={`${signedIn ? "opacity-100" : "opacity-30"} cursor-pointer font-medium inline-block text-lg`}>
          <Link to={`${user? "/list":"/"}`}>
          Book List
          </Link>
          </i>
        <i className={`${signedIn ? "opacity-100" : "opacity-30"} cursor-pointer font-medium inline-block text-lg`}>
          <Link to={`${user ? "/change":"/"}`}>
            Add Book
          </Link>
        </i>
        <i className='bg-red-500 text-white inline-block text-sm rounded-md px-2 py-1 cursor-pointer' onClick={()=>{
          localStorage.removeItem("name");
          localStorage.removeItem("email");
          navigate("/")
        }}>Delete Account</i>
      </div>
      <div className=''>
        <Outlet />
      </div>
    </>
  )
}

export default App
