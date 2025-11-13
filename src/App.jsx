// import { useEffect, useState } from 'react';
import './App.css'
import Home from './pages/Home/Home'
import Cursor from './components/tools/Cursor/Cursor'
import Navbar from './components/Navbar/Navbar'
import { PointerProvider } from './context/PointerProvider'
import { ScrollProvider } from './context/ScrollProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TransitionProvider } from './context/TransitionProvider'
import TransitionCircle from './components/tools/TransitionCircle/TransitionCircle'
import { useEffect, useRef } from 'react'
import { useTransitionOverlay } from './hooks/useTransition'
import AboutP from './pages/About/AboutP'
import WorkP from './pages/Work/WorkP'
import ContactP from './pages/Contact/ContactP'
import NavButton from './components/NavButton/NavButton'
import Footer from './components/Footer/Footer'
import Noise from './components/tools/Noise/Noise' // أضف ده


function BootIntro() {
  const { close, durationMs } = useTransitionOverlay();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      // زيادة التأخير لضمان ظهور الحركة بوضوح
      const initDelay = 300; // زيادة من 50 إلى 300
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
       <NavButton/>
         <Cursor/>
         <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/about" element={<AboutP/>} />
           <Route path="/work" element={<WorkP/>} />
           <Route path="/contact" element={<ContactP/>} />
         </Routes>
     <Footer/>

        </TransitionProvider>
       </PointerProvider>
      </ScrollProvider>
     </BrowserRouter>
     {/* ضيف الـ Noise هنا عشان يبقى فوق كل حاجة */}
     <Noise 
       patternAlpha={8} // قيمة شفافية أقل عشان متكونش قوية جداً
       patternRefreshInterval={4} // تحديث أبطأ شوية
     />
    </div>
  )
}

export default App
