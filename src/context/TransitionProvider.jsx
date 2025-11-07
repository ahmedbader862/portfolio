import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // أضيفي ده
import { TransitionContext } from './TransitionContext';

export function TransitionProvider({ children }) {
  const location = useLocation(); // أضيفي ده
  
  const [isOpen, setOpen] = useState(true); // تبدأ ظاهرة من الأول
  
  // Function to get title based on current path
  const getTitleFromPath = (pathname) => {
    switch (pathname) {
      case '/': return 'Home';
      case '/work': return 'Work';
      case '/about': return 'About'; 
      case '/contact': return 'Contact';
      default: return 'Home';
    }
  };
  
  const [title, setTitle] = useState(getTitleFromPath(location.pathname));
  const durationMs = 1700; // keep in sync with .tc-overlay CSS transition duration
  const varsRef = useRef({ ty: 0, scale: 1 });
  const closeTimeoutRef = useRef(null); // لحفظ timeout الـ close
  const rafIdsRef = useRef([]); // لحفظ requestAnimationFrame IDs
  const isTransitioningRef = useRef(false); // لمنع استدعاءات متعددة (ref للتحقق الفوري)

  const setVar = (name, value) => {
    document.documentElement.style.setProperty(name, value);
  };

  // Initialize: الدائرة تبدأ من تحت وتتحرك للنص
  useEffect(() => {
    const dist = Math.max(window.innerHeight * 1.75, window.innerWidth * 1.75);
    // نبدأ الدائرة من تحت
    varsRef.current.ty = dist;
    setVar('--tc-ty', `${dist}px`);
    setVar('--tc-scale', '1');
    
    // بعد delay صغير نحركها للنص (0) لتظهر الحركة
    const initTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        varsRef.current.ty = 0;
        setVar('--tc-ty', '0px');
      });
    }, 50); // delay صغير لضمان render الدائرة
    
    return () => clearTimeout(initTimeout);
  }, []);

  const open = useCallback((nextTitle) => {
    // إلغاء أي عمليات close قيد التنفيذ
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    // إلغاء أي requestAnimationFrame سابقة
    rafIdsRef.current.forEach(id => cancelAnimationFrame(id));
    rafIdsRef.current = [];
    
    // منع استدعاءات متعددة متزامنة
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    
    setTitle(nextTitle || '');
    setOpen(true); // نضعها true أولاً لضمان ظهور الدائرة
    
    // ننتظر حتى يتم render الدائرة
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        const dist = Math.max(window.innerHeight * 1.75, window.innerWidth * 1.75);
        // نحرك الدائرة من تحت (dist) إلى النص (0) لتغطي الشاشة
        varsRef.current.ty = dist;
        varsRef.current.scale = 1;
        setVar('--tc-ty', `${varsRef.current.ty}px`);
        setVar('--tc-scale', `${varsRef.current.scale}`);
        
        // بعد ذلك نحركها من تحت للنص (0) لتغطي الشاشة
        const raf3 = requestAnimationFrame(() => {
          varsRef.current.ty = 0;
          setVar('--tc-ty', '0px');
          isTransitioningRef.current = false;
        });
        rafIdsRef.current.push(raf3);
      });
      rafIdsRef.current.push(raf2);
    });
    rafIdsRef.current.push(raf1);
  }, []);

  const close = useCallback((opts = {}) => {
    // إلغاء أي timeout سابق
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    // إلغاء أي requestAnimationFrame سابقة
    rafIdsRef.current.forEach(id => cancelAnimationFrame(id));
    rafIdsRef.current = [];
    
    isTransitioningRef.current = false;
    
    const dist = Math.max(window.innerHeight * 1.75, window.innerWidth * 1.75);
    varsRef.current.ty = -dist;
    setVar('--tc-ty', `${varsRef.current.ty}px`);
    const d = opts.durationMs ?? durationMs;
    
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, d);
  }, [durationMs]);

  const setFooterSlice = useCallback((progress) => {
    const baseScale = 1;
    const scaled = baseScale + progress * 0.5;
    varsRef.current.scale = scaled;
    setVar('--tc-scale', `${scaled}`);
  }, []);

  // Auto-close initial transition after boot
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, durationMs + 300); // نفس التأخير اللي في BootIntro
    
    return () => clearTimeout(timer);
  }, [close, durationMs]);

  // Cleanup عند unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      rafIdsRef.current.forEach(id => cancelAnimationFrame(id));
    };
  }, []);

  const value = useMemo(() => ({ isOpen, title, durationMs, open, close, setFooterSlice }), [isOpen, title, durationMs, open, close, setFooterSlice]);

  return (
    <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>
  );
}


