import './AboutP.css'
import Hero from "../../components/Hero/Hero";
import TextEffect from "../../components/tools/TextEffect/TextEffect";
import TextOpacity from "../../components/tools/TextOpacity/TextOpacity";
import CircleButton from "../../components/tools/CircleButton/CircleButton";
import LetIsWork from '../../components/LetIsWork/LetIsWork';
import Footer from '../../components/Footer/Footer';
import CircularGallery from '../../components/tools/CircularGallery/CircularGallery'
import LogoLoop from './../../components/LogoLoop/LogoLoop';
import { SiGithub , SiBootstrap , SiMui , SiDocker , SiSupabase , SiFirebase , SiFlutter , SiCss3 , SiHtml5 , SiJavascript , SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

// إضافة hook للتحقق من حجم الشاشة
import { useState, useEffect } from 'react';

export default function AboutP() {
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const techLogos = [
    { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { node: <SiBootstrap />, title: "Bootstrap", href: "https://getbootstrap.com/docs/" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
    { node: <SiMui />, title: "Material-UI", href: "https://mui.com/material-ui/getting-started/overview/" },
    { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org/docs/" },
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https:/\nextjs.org/docs" },
    { node: <SiFlutter />, title: "Flutter", href: "https://flutter.dev/docs" },
    { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com/docs" },
    { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com/docs" },
    { node: <SiDocker />, title: "Docker", href: "https://docs.docker.com" },
    { node: <SiGithub />, title: "GitHub", href: "https://docs.github.com" },
    
  ];
  

  const myImages = [
    { image: "/Images/ai-1.png", text: "AI Agent", href: "https://example.com/ai-agent" },
    { image: "/Images/ai-2.png", text: "Lang Chain LLM", href: "https://example.com/langchain" },
    { image: "/Images/ai-3.png", text: "Hugging Face", href: "https://example.com/huggingface" },
    { image: "/Images/ai-4.png", text: "RAG & CAG", href: "https://example.com/rag-cag" },
    { image: "/Images/freelance.png", text: "freelance", href: "https://example.com/freelance" },
    { image: "/Images/html.png", text: "HTML & CSS", href: "https://example.com/html-css" },
    { image: "/Images/javaScript.png", text: "javaScript", href: "https://example.com/javascript" },
    { image: "/Images/typeScript.png", text: "typeScript", href: "https://example.com/typescript" },
    { image: "/Images/itidaGIGS.jpg", text: "itida GIGS", href: "https://example.com/typescript" },
  ];

  return (
    <div className="About-page">
      <Hero
        backgroundImage="/Images/"
        Title = "AHMED BADR"
        normalTitle="About ME"
        normalSubtitle="Get to know me:My journey,approach,and passion for creating impactful web experiences"
      />
      
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <TextEffect
              text="Hello"
              tag="h2"
              className="about-title"
              splitType="chars"
              delay={100}
              duration={0.6}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
            />
            
            <div className="about-text">
            <TextOpacity
           text={`
I'm Ahmed Bader, a frontend developer who loves building fast, clean, and intuitive web experiences.\n
I focus on creating interfaces that feel smooth, meaningful, and easy to use  without unnecessary complexity.\n
I work mainly with React, Vite, Redux Toolkit, and Tailwind to build real production-ready applications, from dashboards to e-commerce platforms and AI-driven features.\n
I'm also deeply interested in AI, LLMs, and the latest frontend/AI integrations — always experimenting, learning, and keeping up with the fast changes in the field.\n\
I enjoy turning ideas into solid products, whether it’s a simple component or a full platform.\n
If you're looking for someone who cares about clean structure, performance, and the small details that make an experience feel great — I’m your guy.`}
          className="about-paragraph"
          delayPerChar={0.001}   
          revealDuration={0.05}
        />
            </div>
            
            <div className="about-button">
            <CircleButton 
             one="Explore" 
             two="my works" 
             page="/work" 
             title="Work"
            />
            </div>
          </div>
          
          <div className="about-image">
            <picture>
              <source media="(orientation: landscape)" srcSet="/Images/my-photo.jpg" />
              <source media="(orientation: portrait)" srcSet="/Images/my-photo.jpg" />
              <img 
                src="/Images/my-photo.jpg" 
                alt="Karan Sethi - Frontend Developer" 
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </section>


      <div style={{ 
        height: isMobile ? '80px' : '120px', 
        position: 'relative', 
        overflow: 'hidden',
        marginTop : '40px'
      }}>

      {/* Basic horizontal loop */}
      <LogoLoop
        logos={techLogos}
        speed={isMobile ? 80 : 120}
        direction="left"
        logoHeight={isMobile ? 32 : 48}
        gap={isMobile ? 40 : 60}
        hoverSpeed={0}
        scaleOnHover={!isMobile} // تعطيل scale on hover في الموبايل
        fadeOut
        fadeOutColor="#fffff"
        ariaLabel="Technology partners"
        bend={isMobile ? -20 : -70} // bend أقل في الموبايل
      />

      
    </div>


    <div style={{ 
      height: isMobile ? '300px' : '500px', 
      position: 'relative' 
    }}>
      <CircularGallery
        items={myImages}
        bend={isMobile ? 1 : 3} // bend أقل في الموبايل لتقليل التقوس
        textColor="red"
        borderRadius={0.05}
        font={isMobile ? "bold 24px Bebas Neue" : "bold 40px Bebas Neue"}
      />
     </div>



    <LetIsWork/>
    
      



    </div>
  );
}


