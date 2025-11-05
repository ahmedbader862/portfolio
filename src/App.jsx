// import { useEffect, useState } from 'react';
import './App.css'
import Home from './pages/Home'
import Cursor from './components/Cursor/Cursor'
import Navbar from './components/Navbar/Navbar'
// import { motion } from "framer-motion";


function App() {

  

  return (
    <div
    className='App'
   
    >
     <Navbar/>
      <Cursor />
    <Home/>
    </div>
  )
}

export default App
