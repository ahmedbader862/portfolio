import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import LetIsWork from "../../components/LetIsWork/LetIsWork";
import NavButton from "../../components/NavButton/NavButton";
import Projects from "../../components/Projects/Projects";
import ScrollFreeLance from "../../components/ScrollVelocity/ScrollFreeLance";
import Services from "../../components/Services/Services";
import SplitText from "../../components/tools/TextEffect/TextEffect";

import './Home.css';
import CircleEffect from "../../components/tools/CircleEffect/CircleEffect";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroInteractive from "../../components/Hero/HeroInteractive";


function Home() {



    return(
    <>
    <div className="Home"
    >
    
    <div className="page-content">
    <HeroInteractive/>
    <About/>


    <Projects/>
    <ScrollFreeLance/>

    <Services/>
    
    <LetIsWork/>


  </div>
    

    
    </div>
    </>
    )
}
export default Home;