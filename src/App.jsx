// import { useEffect, useState } from 'react';
import './App.css'
import Home from './pages/Home'
import Cursor from './components/Cursor/Cursor'
import Navbar from './components/Navbar/Navbar'
import { PointerProvider } from './context/PointerProvider'
import { ScrollProvider } from './context/ScrollProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Work from './pages/Work'
import { TransitionProvider } from './context/TransitionProvider'
import TransitionCircle from './components/TransitionCircle/TransitionCircle'
import { useEffect, useRef } from 'react'
import { useTransitionOverlay } from './hooks/useTransition'
// import { motion } from "framer-motion";


function BootIntro() {
  const { close, durationMs } = useTransitionOverlay();
  const hasInitialized = useRef(false);

  // عند أول mount: ننتظر حتى تكتمل الحركة الأولية (من تحت للنص) ثم نغلقها
  useEffect(() => {
    if (!hasInitialized.current) {
      // الحركة الأولية تستغرق durationMs + delay صغير (50ms)
      // ننتظر حتى تكتمل الحركة الأولية ثم نغلقها
      const initDelay = 50; // delay الحركة الأولية
      const id = setTimeout(() => {
        close();
      }, durationMs + initDelay);
      hasInitialized.current = true;
      return () => clearTimeout(id);
    }
  }, [close, durationMs]);

  return null;
}

function App() {

  

  return (
    <div
    className='App'
   
    >
     <BrowserRouter>
      <ScrollProvider>
       <PointerProvider>
        <TransitionProvider>
         <TransitionCircle/>
         <BootIntro/>
         <Navbar/>
         <Cursor />
         <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/about" element={<About/>} />
           <Route path="/work" element={<Work/>} />
         </Routes>
        </TransitionProvider>
       </PointerProvider>
      </ScrollProvider>
     </BrowserRouter>
    </div>
  )
}

export default App
