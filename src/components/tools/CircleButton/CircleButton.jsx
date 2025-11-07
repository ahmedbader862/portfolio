import { useNavigate } from 'react-router-dom';
import './CircleButton.css'
import { useRef, useEffect } from 'react';
import { motion , useMotionValue, useSpring } from "framer-motion";
import { useTransitionOverlay } from '../../../hooks/useTransition';

function CircleButton({one , two , page , title}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const navigate = useNavigate();
    const { open, close, durationMs } = useTransitionOverlay();
    const navigateTimeoutRef = useRef(null);

    const springX = useSpring(x, { stiffness: 150, damping: 12 });
    const springY = useSpring(y, { stiffness: 150, damping: 12 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);

        x.set(offsetX * 0.1);
        y.set(offsetY * 0.1);
    };

    useEffect(() => {
        return () => {
            if (navigateTimeoutRef.current) {
                clearTimeout(navigateTimeoutRef.current);
            }
        };
    }, []);

    const handleClick = () => {
        if (!page) return;
        
        // لو نفس الصفحة، مفيش تأثير - نعمل navigate بس
        if (window.location.pathname === page) {
            navigate(page);
            return;
        }
        
        // إلغاء أي timeout سابق
        if (navigateTimeoutRef.current) {
            clearTimeout(navigateTimeoutRef.current);
            navigateTimeoutRef.current = null;
        }
        
        // نفتح الدائرة من تحت لتغطي الشاشة
        open(title || one);
        
        // ننتظر حتى تكتمل حركة open() (100% من المدة) قبل navigate و close
        navigateTimeoutRef.current = setTimeout(() => {
            navigate(page);
            // بعد navigate مباشرة نبدأ close
            requestAnimationFrame(() => {
                close();
            });
            navigateTimeoutRef.current = null;
        }, durationMs);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div 
            className="circle-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
        >
         <button 
            className="circle"
            onClick={handleClick}
          >
            <span>{one}</span>
            <span>{two}</span>
          </button>
        </motion.div>
    );
}
export default CircleButton;