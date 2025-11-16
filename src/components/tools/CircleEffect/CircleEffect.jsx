import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CircleEffect.css';

gsap.registerPlugin(ScrollTrigger);

const CircleEffect = ({ triggerElement, variant = 'light', className = '' }) => {
  const effectRef = useRef(null);

  useEffect(() => {
    if (!effectRef.current) return;

    const el = effectRef.current;
    // ابحث عن الفوتر لو مفيش triggerElement
    const triggerEl = triggerElement?.current || document.querySelector('footer');

    if (!triggerEl) return; // لو مفيش فوتير، خلاص

    // init
   

   
    const start = "top bottom";          // يبدأ لما أعلى الفوتر يوصل أسفل الشاشة
    const end = "bottom top";            // ينتهي لما أسفل الفوتر يوصل أعلى الشاشة
    
    // القيم اللي تتحكم في الحركة
    const yStart = 80;   
    const yEnd = -20;     
    const opacityStart = 1;  // ابدأ غير مرئي
    const opacityEnd = 1;  // يصبح مرئي
    const scaleStart = 0.8;    
    const scaleEnd = 1.1;
    // ===== =====

    // init
    gsap.set(el, {
      yPercent: yStart,
      opacity: opacityStart,
      scale: scaleStart,
      transformOrigin: '90% 90%',
      force3D: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: start,
        end: end,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(el, 
      {
        yPercent: yStart,
        opacity: opacityStart,
        scale: scaleStart,
      },
      {
        yPercent: yEnd,
        opacity: opacityEnd,
        scale: scaleEnd,
        ease: "power2.out",
        force3D: true,
      }
    );

    return () => {
      tl.kill();
    };
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
