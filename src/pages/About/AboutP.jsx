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

export default function AboutP() {

  const techLogos = [
    { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { node: <SiBootstrap />, title: "Bootstrap", href: "https://getbootstrap.com/docs/" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
    { node: <SiMui />, title: "Material-UI", href: "https://mui.com/material-ui/getting-started/overview/" },
    { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org/docs/" },
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org/docs" },
    { node: <SiFlutter />, title: "Flutter", href: "https://flutter.dev/docs" },
    { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com/docs" },
    { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com/docs" },
    { node: <SiDocker />, title: "Docker", href: "https://docs.docker.com" },
    { node: <SiGithub />, title: "GitHub", href: "https://docs.github.com" },
    
  ];
  

  const myImages = [
    { image: "/src/assets/Images/ai-1.png", text: "AI Agent", href: "https://example.com/ai-agent" },
    { image: "/src/assets/Images/ai-2.png", text: "Lang Chain LLM", href: "https://example.com/langchain" },
    { image: "/src/assets/Images/ai-3.png", text: "Hugging Face", href: "https://example.com/huggingface" },
    { image: "/src/assets/Images/ai-4.png", text: "RAG & CAG", href: "https://example.com/rag-cag" },
    { image: "/src/assets/Images/freelance.png", text: "freelance", href: "https://example.com/freelance" },
    { image: "/src/assets/Images/html.png", text: "HTML & CSS", href: "https://example.com/html-css" },
    { image: "/src/assets/Images/javaScript.png", text: "javaScript", href: "https://example.com/javascript" },
    { image: "/src/assets/Images/typeScript.png", text: "typeScript", href: "https://example.com/typescript" },
  ];

  return (
    <div className="About-page">
      <Hero
        backgroundImage="/src/assets/Images/"
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
                text="I'm Karan Sethi, a frontend developer with a passion for creating beautiful, user-friendly web experiences. I believe that great design and seamless functionality go hand-in-hand to tell a compelling story online."
                className="about-paragraph"
              />
              <TextOpacity
                text="I specialize in building websites that look great, work smoothly, and are easy for users to navigate. My focus is on making sure every interaction feels intuitive and enjoyable, no matter the device or screen size."
                className="about-paragraph"
              />
              <TextOpacity
                text="If you're looking for a frontend developer who cares about both the details and the bigger picture, I'd love to help bring your next project to life. Let's create something that resonates with your audience!"
                className="about-paragraph"
              />
            </div>
            
            <div className="about-button">
              <CircleButton one="Explore" two="my works" />
            </div>
          </div>
          
          <div className="about-image">
            <picture>
              <source media="(orientation: landscape)" srcSet="/src/assets/Images/my-photo.jpg" />
              <source media="(orientation: portrait)" srcSet="/src/assets/Images/my-photo.jpg" />
              <img 
                src="/src/assets/Images/my-photo.jpg" 
                alt="Karan Sethi - Frontend Developer" 
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </section>


      <div style={{ height: '120px', position: 'relative', overflow: 'hidden'}}>
      {/* Basic horizontal loop */}
      <LogoLoop
  logos={techLogos}
  speed={120}
  direction="left"
  logoHeight={48}
  gap={60}
  hoverSpeed={0}
  scaleOnHover
  fadeOut
  fadeOutColor="#fffff"
  ariaLabel="Technology partners"
  bend={-70}  // <= هنا القوس، جرب 1..6 أو حتى -3 للعكس
/>

      
    </div>


    <div style={{ height: '500px', position: 'relative' }}>
      <CircularGallery
        items={myImages}
        bend={3}
        textColor="red"
        borderRadius={0.05}
        font="bold 40px Bebas Neue"
      />
     </div>



    <LetIsWork/>
    
      



    </div>
  );
}


