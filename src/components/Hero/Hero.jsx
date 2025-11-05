import { useEffect, useState, useRef } from 'react';
import './Hero.css';
import ScrollButton from '../tools/ScrollButton/ScrollButton';
import Social from '../Social/Social';
import { motion,  } from "framer-motion";



function Hero( ) {


  const [_mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const maskRef = useRef(null);
  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);



  const size = isHovered ? 300 : 20;


  useEffect(() => {
  const mask = document.querySelector('.mask');
    if (!isHovered){

     mask.style.display='none'
    }else{

      mask.style.display='flex'

    }

    },[isHovered]);


  // Track mouse position
 useEffect(() => {
  const rafRef = { id: null };

  const updatePositions = (e) => {
    // لو الماوس فوق الأيقونات متعملش تحديث هنا (دا يحل التعارض)
    if (e.target && e.target.closest && e.target.closest('.social-icons')) return;

    // نستخدم RAF علشان ما نعملش setState على كل حدث ماوس فوراً
    if (rafRef.id) cancelAnimationFrame(rafRef.id);
    rafRef.id = requestAnimationFrame(() => {
      // absolute mouse for the brown circle
      setMousePosition({ x: e.clientX, y: e.clientY });

      // element-relative mouse for the mask
      const el = maskRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setMaskPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
      rafRef.id = null;
    });
  };

  window.addEventListener("mousemove", updatePositions);
  return () => {
    window.removeEventListener("mousemove", updatePositions);
    if (rafRef.id) cancelAnimationFrame(rafRef.id);
  };
}, []);



 

    // console.log(isHovered);

  return (
  <>

  {/* <div className='mouse' ref={mouseRef}
  >
  </div> */}

  <header className='Hero'
 
  >

 <div className="hero-content">

<motion.div
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
  <h1
   
  >
     CREATIVE

    <br />
     DEVELOPER

  </h1>


  <p>  Blending design and code </p>

</motion.div>


   <div className='normal'
  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
    
   >
    <h1
    >
    MORE THAN
   <br />
    JUST A CODE
   </h1>

<p>
    There’s a story behind every interaction. Find it.
  </p>
   </div>
   <div className="Social-Hero">
   <Social/>

   </div>
 

   </div>
   <ScrollButton/>

  </header>
  </>
  );
}
export default Hero;

