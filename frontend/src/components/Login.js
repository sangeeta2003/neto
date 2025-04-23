import React, { useState } from 'react'
import Header from './Header'
import axios from 'axios';
import {API_END_PONITS} from '../utils/constant.js'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const[isLogin,setIsLogin] = useState(false);
  const[fullName,setFullName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const navigate = useNavigate();


   const loginHandler=()=>{
setIsLogin(!isLogin);
   }
   const getInputData = async(e) =>{
    e.preventDefault();

    if (isLogin) {
      // Login
      const user = { email, password };
      try {
        const res = await axios.post(`${API_END_PONITS}/login`, user,{
          headers:{
              'Content-Type':'application/json'
          },
          withCredentials:true
      });

        // console.log(res);
        if (res.data.success) {
          toast.success(res.data.message || 'Login successful!');
        }
        navigate('/browse')
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Login failed');
        console.error(error);
      }
    } else {
      // Register
      const user = { fullName, email, password };
      try {
        const res = await axios.post(`${API_END_PONITS}/register`, user);
        // console.log(res);
        if (res.data.success) {
          toast.success(res.data.message || 'Registration successful!');
        }
        setIsLogin(true);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Registration failed');
        console.error(error);
      }
    }

    setFullName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <Header/>

 <div className='absolute'>
<img  className="w-[100vw] h-[100vh]" src='https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg' alt=''/>
</div>
<form onSubmit={getInputData} className='flex flex-col items-center justify-center absolute left-0 w-3/12 p-12 my-36 right-0 bg-black mx-auto opacity-90 rounded-md'>
  <h1 className='text-3xl text-white mb-5 font-bold'>{isLogin ? "Login" : "Signup"}</h1>
  <div className='flex flex-col'>
    {
      !isLogin && <input value={fullName} onChange={(e) => setFullName(e.target.value)} type='text' placeholder='Fullname' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white'/>
    }
    
    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white'/>
    <input value={password} onChange={(e) => setPassword(e.target.value)} type='text' placeholder='Password' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white'/>
    <button className='bg-red-600 mt-6 p-3 text-white rounded-sm font-medium'>{isLogin ? "Login" : "Signup"}</button>
    <p className='text-white mt-2'>{isLogin ? "New to Netflix?" : "Already have an account?"}<span onClick={loginHandler} className='ml-1 text-blue-900 font-medium cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></p>
    </div>
</form>
</div>
   
  )
}

export default Login