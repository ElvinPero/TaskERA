import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'

import './App.css'

const App =()=> {
  

  return (
    <>
      <Header/>
      <Routes>

          <Route path="/" element={<Home/>}/> 
          <Route path="/profile" element={<Profile/>}/> 
          <Route path="/login" element={<Login/>}/> 
          <Route path="/register" element={<Register/>}/> 

      </Routes>
      <Toaster/>
    </>
  )
}

export default App
