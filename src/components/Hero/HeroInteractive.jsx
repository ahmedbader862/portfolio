import React, { useEffect, useState, useRef, useContext } from 'react';
import './HeroInteractive.css';
import ScrollButton from '../tools/ScrollButton/ScrollButton';
import Social from '../Social/Social';
import { motion as Motion } from "framer-motion";
import { usePointer } from '../../hooks/usePointer';
import { ScrollContext } from '../../context/ScrollContext';

function HeroInteractive({
  backgroundImage = '/src/assets/Images/my-photo.jpg',
  maskedTitle = 'CREATIVE\nDEVELOPER',
  maskedSubtitle = 'Blending design and code',
  normalTitle = 'MORE THAN\nJUST A CODE',
  normalSubtitle = "There's a story behind every interaction. Find it."
}) {

  const [_mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const maskRef = useRef(null);
  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);

  const size = isHovered ? 300 : 20;

  // Get scroll context
  const { scrollYProgress } = useContext(ScrollContext);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const mask = document.querySelector('.mask');
    const cursor = document.querySelector('.global-cursor');
    if (!isHovered){
      mask.style.display='none'
    }else{
      mask.style.display='flex'
      cursor.style.display='none'
    }
  },[isHovered]);

  const { x, y } = usePointer();

  // Track mouse position using global pointer
  useEffect(() => {
    // absolute mouse for the brown circle
    setMousePosition({ x, y });

    // element-relative mouse for the mask
    const el = maskRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      setMaskPos({ x: x - rect.left, y: y - rect.top });
    }
  }, [x, y]);

  // Update scroll progress
  useEffect(() => {
    if (scrollYProgress) {
      const unsubscribe = scrollYProgress.on('change', (value) => {
        setScrollProgress(value);
      });
      return unsubscribe;
    }
  }, [scrollYProgress]);

  // Calculate transforms based on scroll progress
  const backgroundScale = 1 + (scrollProgress * .5); // Scale from 1 to 1.1
  const textScale = 1 - (scrollProgress * .5); // Scale from 1 to 0.95

  return (
    <>
      <header 
        className='Hero' 
        style={{ 
          '--background-scale': backgroundScale,
          '--background-image': `url(${backgroundImage})`
        }}
      >
        <div 
          className="hero-content"
          style={{
            transform: `scale(${textScale})`
          }}
        >
          <Motion.div
            className="mask"
            ref={maskRef}
            animate={{ 
              WebkitMaskPosition: `${maskPos.x - size / 2}px ${maskPos.y - size / 2}px`,
              maskPosition: `${maskPos.x - size / 2}px ${maskPos.y - size / 2}px`,
              WebkitMaskSize: `${size}px`,
              maskSize: `${size}px`
            }}
            transition={{ ease : "easeOut", duration: 0.3 }}
          >
                       <h1>
              {maskedTitle.split('\n').map((line, index) => 
                <span key={index}>
                  {line}
                  {index < maskedTitle.split('\n').length - 1 && <br />}
                </span>
              )}
            </h1>
            <p>{maskedSubtitle}</p>
          </Motion.div>

          <div className='normal'
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
          >
              <h1>
              {normalTitle.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < normalTitle.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p>{normalSubtitle}</p>
          </div>
          
        </div>
        <div className="Social-Hero">
            <Social/>
          </div>
        <ScrollButton/>
      </header>
    </>
  );
}

export default HeroInteractive;
