import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CircleEffect.css';
import { useTransitionOverlay } from '../../../hooks/useTransition'; // أضف ده

const CircleEffect = ({ variant = 'light', className = '' }) => {
  const effectRef = useRef(null);
  const { isOpen, setFooterSlice } = useTransitionOverlay();
  const scrollProgress = useRef(0);

  useEffect(() => {
    const el = effectRef.current;
    if (!el) return;

    // init
    gsap.set(el, {
      yPercent: 90,
      opacity: 0,
      scale: 0.9,
      transformOrigin: '50% 50%',
    });

    // تحديث الدائرة بناءً على scroll progress
    const updateCircle = () => {
      const progress = scrollProgress.current;
      
      // استخدم setFooterSlice للتحكم في scale من خلال transition context
      setFooterSlice?.(progress);
      
      // تحريك الدائرة
      const yPercent = 90 - (progress * 120); // من 90% لـ -30%
      const opacity = Math.min(progress * 2, 1);
      const scale = 0.9 + (progress * 0.1);

      gsap.to(el, {
        yPercent,
        opacity,
        scale,
        duration: 0.35,
        ease: 'power2.out',
        force3D: true,
      });
    };

    // scroll listener
    const handleScroll = () => {
      scrollProgress.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      updateCircle();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setFooterSlice]);

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
