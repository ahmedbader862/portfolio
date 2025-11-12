import React, { useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useTransitionOverlay } from '../../hooks/useTransition';
import "./About.css";
import SplitText from "../tools/TextEffect/TextEffect";
import TextOpacity from "../tools/TextOpacity/TextOpacity";
import AnimatedButton from '../tools/AnimatedButton/AnimatedButton';

export default function About() {
  const text = `Passionate about creating seamless, visually engaging web experiences. I design with purpose, building websites that are both beautiful and intuitive.`;
  
  const navigate = useNavigate();
  const { open, close, durationMs } = useTransitionOverlay();
  const navigateTimeoutRef = useRef(null);

  // تنظيف عند unmount
  React.useEffect(() => {
    return () => {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, []);

  // دالة للتعامل مع النقر على زر READ MORE
  const handleReadMore = useCallback((e) => {
    e.preventDefault();
    
    // إلغاء أي timeout سابق
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current);
      navigateTimeoutRef.current = null;
    }
    
    // نفتح الدائرة الانتقالية
    open('About');
    
    // ننتظر حتى تكتمل الحركة قبل التنقل
    navigateTimeoutRef.current = setTimeout(() => {
      navigate('/about');
      // بعد navigate مباشرة نبدأ إغلاق الدائرة
      requestAnimationFrame(() => {
        close();
      });
      navigateTimeoutRef.current = null;
    }, durationMs);
  }, [navigate, open, close, durationMs]);

  return (
    <section className="about">
      <div className="about-left">
        <SplitText
          text="ABOUT ME"
          tag="h2"
          className="left-title"
          delay={40}
          duration={0.5}
          splitType="chars"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />

        <div className="about-left-lines">
          <SplitText
            text="FRONT END DEVELOPER"
            tag="p"
            className="about-line"
            delay={25}
            duration={0.6}
            splitType="chars"
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
          />
          <br />
          <SplitText
            text="BASED IN INDIA"
            tag="p"
            className="about-line"
            delay={28}
            duration={0.6}
            splitType="chars"
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
      </div>

      <div className="about-right">
        <p className="about-text" aria-hidden>
          {text}
        </p>

        <TextOpacity
          text={text}
          minOpacity={0.3}
          maxOpacity={1}
          className="animated-line"
        />

          <AnimatedButton 
          text="READ MORE" 
          onClick={handleReadMore}
          ariaLabel="Read more about me"
          initialOpacity={15}
          type="button"
          className="read-more"
        />
      </div>
    </section>
  );
}
