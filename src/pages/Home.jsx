import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import LetIsWork from "../components/LetIsWork/LetIsWork";
import NavButton from "../components/NavButton/NavButton";
import Projects from "../components/Projects/Projects";
import ScrollFreeLance from "../components/ScrollVelocity/ScrollFreeLance";
import Services from "../components/Services/Services";
import SplitText from "./../components/tools/TextEffect/TextEffect";

import React, { useEffect, useRef } from "react";
import './Home.css';
import { gsap } from "gsap";
import CircleEffect from "../components/tools/CircleEffect/CircleEffect";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Home() {

    const rootRef = useRef(null);
gsap.registerPlugin(ScrollTrigger);

     useEffect(() => {
    const ctx = gsap.context(() => {
      // subtle wave movement on the separator
      const separator = rootRef.current?.querySelector(".footer-separator");
      if (separator) {
        gsap.to(separator, {
          y: -10,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1.2,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);
 

    return(
    <>
    <div className="Home"
    ref={rootRef}>
    
    <div className="page-content">
    <Hero/>
    <About/>


    <Projects/>
    <ScrollFreeLance/>
    <NavButton/>

    <Services/>
    
    <LetIsWork/>
    <Contact/>

    {/* <CircleEffect 
        triggerElement={rootRef}
      /> */}

  </div>
    <Footer/>
    

    
    </div>
    </>
    )
}
export default Home;