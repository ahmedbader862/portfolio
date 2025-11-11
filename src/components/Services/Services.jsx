import React, { useState } from "react";
import "./Services.css";
import SplitText from "../tools/TextEffect/TextEffect";
import useHoverFade from "../../hooks/useHoverFade"; // استيراد الـ Hook

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null); // للـ click (الوصف)

  const lines = [
    { 
      num: "01", 
      text: "WEBSITE DEVELOPMENT",
      description: "Develop responsive and visually appealing websites using modern frontend technologies like HTML5, CSS3, and JavaScript. Focus on cross-browser compatibility and mobile-first design."
    },
    { 
      num: "02", 
      text: "UI/UX DESIGN ASSISTANCE",
      description: "Collaborate on designing user interfaces that are intuitive and user-friendly. Assist in creating wireframes, prototypes, and high-fidelity designs for web applications."
    },
    { 
      num: "03", 
      text: "INTERACTIVITY",
      description: "Implementing engaging interactive elements and animations to create memorable and dynamic user experiences."
    },
    { 
      num: "04", // مُصحح: من المتكرر
      text: "Responsive Design",
      description: "Ensure websites are fully responsive, adapting to various screen sizes and devices. Utilize CSS frameworks like Bootstrap or media queries to create mobile-first layouts."
    },
      { 
      num: "05", // مُصحح: من المتكرر
      text: "Version Control",
      description: "Manage code versions using Git, ensuring smooth collaboration in team projects. Handle code branches, resolve merge conflicts, and push code to repositories like GitHub or GitLab."
    },
       { 
      num: "06", // مُصحح: من المتكرر
      text: "Web Animations",
      description: "Implement animations and transitions using CSS and JavaScript to enhance user experience, including hover effects, fade-ins, and scroll-triggered animations."
    },
    
  ];

  // استخدام الـ Hook
  const { hovered, getLetterOpacity, handleMouseEnter, handleMouseLeave } = useHoverFade(lines);

  // helper: يفصل النص لحروف ويحتفظ بالـspace كـ non-breaking
  const splitToLetters = (str) =>
    str.split("").map((ch) => (ch === " " ? "\u00A0" : ch));

  return (
    <section className="services-section">
      <header className="services-left">
        <SplitText
          text={"What I do"}
          tag="h2"
          className="small"
          delay={40}
          duration={0.7}
          splitType={"chars"}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
        
        <SplitText
          text={"SERVICES"}
          tag="h2"
          className="services-head"
          delay={40}
          duration={0.7}
          splitType={"chars"}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />

        <SplitText
          text={" Comprehensive digital services to boost your online presence and achieve impactful results."}
          tag="p"
          className="services-desc"
          delay={40}
          duration={0.7}
          splitType={"chars"}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
      </header>

      <div className="services-right">
        {lines.map((line, idx) => {
          const letters = splitToLetters(line.text);
          return (
            <div
              key={idx}
              className={`service-row ${activeIndex === idx ? 'active' : ''}`}
              onMouseEnter={handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            >
              <span className="service-num">{line.num}</span>

              <h2 className="service-title" aria-hidden>
                {letters.map((ch, i) => {
                  const len = letters.length;
                  const opacity = getLetterOpacity(idx, i, len); // استخدام الـ Hook
                  const delay = hovered === idx ? i * 28 : (hovered === null ? i * 8 : i * 10);

                  return (
                    <span
                      key={i}
                      className="char"
                      style={{
                        opacity,
                        transitionDelay: `${delay}ms`,
                        transform: "translateY(0)",
                      }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </h2>

              <div className="row-underline" />
              
              <svg className="w-[35px] h-[35px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M12 19V5m0 14-4-4m4 4 4-4"/>
              </svg>

              <p className="service-description">
                {line.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;