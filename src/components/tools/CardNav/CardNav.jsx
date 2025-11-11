// CardNav.jsx
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import useMotionHover from "../../../hooks/useMotionHover";
import { useScrollState } from '../../../hooks/useScrollState';
import './CardNav.css';

const CardNav = ({
  items = [],
  className = '',
  ease = 'power3.out',
  baseColor = '#000', // default black panel
  onItemClick = null,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const itemRefs = useRef([]);
  const tlRef = useRef(null);

  const { handleMouseMove, handleMouseLeave, style } = useMotionHover(150, 12, 0.3);
  
  // استخدام useScrollState بدلاً من window scroll listener
  const { scrollY } = useScrollState();

  const setItemRef = i => el => {
    if (el) itemRefs.current[i] = el;
  };

  // تتبع الscroll باستخدام scrollY من context
  useEffect(() => {
    if (scrollY) {
      const unsubscribe = scrollY.on('change', (value) => {
        const shouldShow = value > 100; // يظهر بعد 100px scroll
        setIsVisible(shouldShow);
      });
      
      return unsubscribe;
    }
  }, [scrollY]);

  const createTimeline = () => {
    const navEl = navRef.current;
    const overlayEl = overlayRef.current;
    if (!navEl || !overlayEl) return null;

    gsap.set(navEl, { xPercent: 100, autoAlpha: 1, display: 'block' });
    gsap.set(overlayEl, { autoAlpha: 0, display: 'block' });
    gsap.set(itemRefs.current, { x: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(overlayEl, { autoAlpha: 0.6, duration: 0.35, ease }, 0);
    tl.to(navEl, { xPercent: 0, duration: 0.45, ease }, 0);
    tl.to(itemRefs.current, { x: 0, opacity: 1, duration: 0.45, ease, stagger: 0.08 }, '-=0.2');

    return tl;
  };

  useLayoutEffect(() => {
    tlRef.current = createTimeline();
    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, ease]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsExpanded(true);
      tl.play(0);
    } else {
      tl.reverse().then(() => setIsExpanded(false));
    }
  };


  return (
    <>
      {/* single toggle button — fixed top-right */}
      <motion.button
        className={`menu-toggle ${isExpanded ? 'open' : ''} ${isVisible ? 'visible' : 'hidden'}`}
        onClick={toggleMenu}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
      >
          <motion.div
            className=''
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style}
          >
            <div className="hamburger-line"/>
            <div className="hamburger-line"/>

          </motion.div>


        {/* <span className="close-x" aria-hidden="true">✕</span> */}
      </motion.button>

      {/* overlay */}
      <div ref={overlayRef} className="card-nav-overlay" onClick={toggleMenu} aria-hidden={!isExpanded} />

      {/* side panel */}
      <aside
        ref={navRef}
        className={`card-nav-side ${isExpanded ? 'is-open' : ''} ${className}`}
        style={{ backgroundColor: baseColor }}
        aria-hidden={!isExpanded}
      >
        <div className="side-inner">
         

        <div className="side-right-col">
            <div className="nav-section-meta">NAVIGATION</div>
            <hr className="nav-divider" />

            <ul className="big-nav-list">
              {/* if items provided, map them, otherwise fallback to screenshot labels */}
              {(items && items.length > 0 ? items : [
                { label: 'Home', href: '/' },
                { label: 'Works', href: '/work' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' }
              ]).map((it, i) => (
                <li
                  key={`${it.label}-${i}`}
                  ref={setItemRef(i)}
                  className="big-nav-item"
                  role="link"
                  tabIndex={0}
                  onClick={() => {
                    setIsExpanded(false);

                    // Handle navigation with transition
                    if (onItemClick) {
                      onItemClick(it.href, it.label);
                    }
                  }}
                >
                  <span className="bullet">•</span>
                  <span className="big-nav-text">{it.label}</span>
                </li>
              ))}
            </ul>

           
          </div>
        </div>
      </aside>
    </>
  );
};

export default CardNav;
