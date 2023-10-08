import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true);
    console.log("login")
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("success")
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
      
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;


  return (
    <>
 <form onSubmit={submitHandler}>
    <div class="min-h-screen shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-gray-100 py-6 flex flex-col justify-center sm:py-12  ">
	<div class="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			class="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div class="max-w-md mx-auto">

               
				    <div>
				    	<h1 class="text-2xl font-semibold">Register Form </h1>
				    </div>
				    <div class="divide-y divide-gray-200">
				    	<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
				    		<div class="relative">
				    			<input 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Your Name" />
				    			<label for="name" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
				    		</div>
				    		<div class="relative">
				    			<input 
                                 type="email"
                                 placeholder="Email"
                                 required
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"  />
				    			<label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
				    		</div>
				    		<div class="relative">
				    			<input 
                                 type="password"
                                 required
                                 placeholder="Password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
				    			<label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
				    		</div>
				    		<div class="relative">
				    			<button type="submit" class="bg-blue-500 text-white font-semibold rounded-md px-2 py-1">Sign Up</button>
				    		</div>
				    		<div class="relative flex flex-row justify-around ">
                                <div className='mr-4'>
                                    Already have an account?
                                </div>
                                <Link to="/login">
				    			<div className="bg-gray-200  text-black font-md rounded-md px-3 py-2">Login</div>
                                </Link>
				    		</div> 
				    	</div>
				    </div>
                   
			</div>
		</div>
	</div>
</div>
</form>
    </>
  )
}

export default Register


