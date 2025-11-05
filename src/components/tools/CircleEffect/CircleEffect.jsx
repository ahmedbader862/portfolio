// CircleEffect.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CircleEffect.css';

gsap.registerPlugin(ScrollTrigger);

const CircleEffect = ({
  variant = 'light',
  triggerElement,
  className = '',
}) => {
  const effectRef = useRef(null);

  useEffect(() => {
    if (!triggerElement.current) return;

    // تطبيق الألوان المخصصة إذا وجدت
    

    const ctx = gsap.context(() => {
      const footerEl = document.querySelector('.footer') || triggerElement.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerEl,
          // يبدأ عندما حافة الفوتر العلوية تلمس أسفل الفيو بورت
          start: "top bottom",
          // وينتهي في منتصف الفيو بورت للحصول على مسافة تحريك كافية
          end: "top center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        effectRef.current,
        {
          yPercent: 40, // يظهر جزء من الدائرة من أسفل
          opacity: 1,
          scale: 1,
          xPercent: -50,
          left: "50%",
        },
        {
          yPercent: -40, // تتحرك لأعلى
          opacity: 1, // وتختفي تدريجياً
          ease: "power1.out",
          xPercent: -50,
          left: "50%",
        }
      );
    });

    return () => ctx.revert();
  }, [triggerElement]);

  return (
    <div className={`circle-effect-container ${className}`}>
      <div
        ref={effectRef}
        className={`circle-effect ${variant}`}
        aria-hidden="true"
      />
    </div>
  );
};

export default CircleEffect;