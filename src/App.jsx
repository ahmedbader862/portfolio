// import { useEffect, useState } from 'react';
import './App.css'
import Home from './pages/Home/Home'
import Cursor from './components/tools/Cursor/Cursor'
import Navbar from './components/Navbar/Navbar'
import { PointerProvider } from './context/PointerProvider'
import { ScrollProvider } from './context/ScrollProvider'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { TransitionProvider } from './context/TransitionProvider'
import TransitionCircle from './components/tools/TransitionCircle/TransitionCircle'
import { useEffect, useRef } from 'react'
import { useTransitionOverlay } from './hooks/useTransition'
import AboutP from './pages/About/AboutP'
import WorkP from './pages/Work/WorkP'
import ContactP from './pages/Contact/ContactP'
import NavButton from './components/NavButton/NavButton'
import Footer from './components/Footer/Footer'
import Noise from './components/tools/Noise/Noise'
import CircleEffect from './components/tools/CircleEffect/CircleEffect'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollToTop from './components/tools/ScrollToTop/ScrollToTop'
import useTabTitle from './hooks/useTabTitle'

function BootIntro() {
  const { close, durationMs } = useTransitionOverlay();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      const initDelay = 300;
      const id = setTimeout(() => {
        close();
      }, durationMs + initDelay);
      hasInitialized.current = true;
      return () => clearTimeout(id);
    }
  }, [close, durationMs]);

  return null;
}

// أنشئ component منفصل للـ routing
// أنشئ component منفصل للـ routing
function AppRoutes() {
  const footerRef = useRef(null);
  const location = useLocation();

  // الـ useEffect هنا
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <ScrollProvider>
     <PointerProvider>
      <TransitionProvider>
       <TransitionCircle/>
       <BootIntro/>
       <ScrollToTop/>
       <Navbar/>
     <NavButton/>
       <Cursor/>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/about" element={<AboutP/>} />
         <Route path="/work" element={<WorkP/>} />
         <Route path="/contact" element={<ContactP/>} />
       </Routes>
     <Footer ref={footerRef}/>

      </TransitionProvider>
     </PointerProvider>
    </ScrollProvider>
  );
}

function App() {
  useTabTitle("Ahmed - Frontend Developer", "Come back 😢");
  return (
    <div className='App'>
     <BrowserRouter>
      <AppRoutes/>
      
      <CircleEffect 
        variant="light"
        className="global-background-effect"
      />
      
      <Noise 
        patternAlpha={8}
        patternRefreshInterval={4}
      />
     </BrowserRouter>
    </div>
  )
}

export default App
