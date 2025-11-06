import { useEffect, useState, useRef } from 'react';
import './Hero.css';
import ScrollButton from '../tools/ScrollButton/ScrollButton';
import Social from '../Social/Social';
import { motion as Motion } from "framer-motion";
import { usePointer } from '../../hooks/usePointer';



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



 

    // console.log(isHovered);

  return (
  <>

  {/* <div className='mouse' ref={mouseRef}
  >
  </div> */}

  <header className='Hero'
 
  >

 <div className="hero-content">

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
  <h1
   
  >
     CREATIVE

    <br />
     DEVELOPER

  </h1>


  <p>  Blending design and code </p>

</Motion.div>


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

