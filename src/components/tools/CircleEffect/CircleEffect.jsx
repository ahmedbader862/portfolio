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
  
    const ctx = gsap.context(() => {
      const triggerEl = triggerElement.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          // ابدأ عندما يدخل Footer viewport
          start: "top bottom", 
          // انتهِ عندما يصل Footer لمنتصف viewport
          end: "bottom center", 
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
  
      tl.fromTo(
        effectRef.current,
        {
          yPercent: 100, // ابدأ من خارج viewport (أسفل)
          opacity: 0,
          scale: 0.8,
          xPercent: -50,
        },
        {
          yPercent: -50, // تحرك لأعلى
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          xPercent: -50,
          force3D: true,
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