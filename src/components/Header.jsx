import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
  useContext(Context);

const logoutHandler = async () => {
  setLoading(true);
  try {
    await axios.get(`${server}/users/logout`, {
      withCredentials: true,
    });

    toast.success("Logged Out Successfully");
    setIsAuthenticated(false);
    setLoading(false);
  } catch (error) {
    toast.error(error.response.data.message);
    setIsAuthenticated(true);
    setLoading(false);
  }
};
  return (
    <>
      
<nav class=" bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <Link to="/" class="flex items-center">
      
      <span class="self-center text-2xl  font-extrabold whitespace-nowrap text-white">TaskERA</span>
  </Link>
  <div class="flex md:order-2">
  {isAuthenticated ? (
   
      <button disabled={loading} onClick={logoutHandler} type="button" class="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
        LogOut</button>
     
  ):(
    <Link to="/login" >
      <button type="button" class="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Login</button>
      </Link>
  )}
      <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center gap-x-10 justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
      <li>
        <Link to="/" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
      </li>
    
      
      <li>
        <a href="https://github.com/ElvinPero/TaskERA" class="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Github</a>
      </li>
    </ul>
  </div>
  </div>
</nav>



    </>
  )
}

export default Header