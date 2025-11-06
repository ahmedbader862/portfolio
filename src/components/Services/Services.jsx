import React, { useState } from "react";
import "./Services.css";
import SplitText from "../tools/TextEffect/TextEffect";


const Services = () => {
  const [hovered, setHovered] = useState(null); // index of hovered line or null
  const [activeIndex, setActiveIndex] = useState(null); // index of clicked service

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
      num: "04", 
      text: "Responsive Design",
      description: "Ensure websites are fully responsive, adapting to various screen sizes and devices. Utilize CSS frameworks like Bootstrap or media queries to create mobile-first layouts."
    },
      { 
      num: "04", 
      text: "Version Control",
      description: "Manage code versions using Git, ensuring smooth collaboration in team projects. Handle code branches, resolve merge conflicts, and push code to repositories like GitHub or GitLab."
    },
       { 
      num: "05", 
      text: "Web Animations",
      description: "Implement animations and transitions using CSS and JavaScript to enhance user experience, including hover effects, fade-ins, and scroll-triggered animations."
    },
    
  ];
  


  // helper: يفصل النص لحروف ويحتفظ بالـspace كـ non-breaking
  const splitToLetters = (str) =>
    str.split("").map((ch) => (ch === " " ? "\u00A0" : ch));

  return (
    <section className="services-section">
      <header className="services-left">


        {/* <p className="small">What I do</p> */}
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
        
        {/* <h2 className="services-head">SERVICES</h2> */}

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


        {/* <p className="services-desc">
          Comprehensive digital services to boost your online presence and
          achieve impactful results.
        </p>  */}

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
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            >
              <span className="service-num">{line.num}</span>

              {/* كل حرف هنا span علشان نتحكم في الـopacity و transitionDelay */}
              <h2 className="service-title" aria-hidden>
                {letters.map((ch, i) => {
                  // طول السطر (عدد الحروف فعلياً)
                  const len = letters.length;

                  // لو مفيش hover على أي سطر => قيمة افتراضية بسيطة
                  if (hovered === null) {
                    return (
                      
                      <span
                        key={i}
                        className="char"
                        style={{
                          opacity: 0.9,
                          transitionDelay: `${i * 8}ms`,
                          transform: "translateY(0)",
                        }}
                      >
                        {ch}
                        
                      </span>

                    );
                  }

                  // لو السطر الحالي هو اللى عليه hover => نخلي الحروف تبان بقوة (1)
                  if (hovered === idx) {
                    // كل حرف ليه delay بسيط عشان نحس بالتتابع حرف حرف
                    const delay = i * 28; // ms
                    return (



                      <span
                        key={i}
                        className="char"
                        style={{
                          opacity: 1,
                          transitionDelay: `${delay}ms`,
                          transform: "translateY(0)",
                        }}
                      >
                        {ch}
                      </span>



                    );
                  }

                  // لو السطر ده مش اللي عليه hover => نخلي الشفافية تتدرج (أقل من السطر الفعّال)
                  // الهدف: الحروف اللي على الشمال تكون أوضح شوية، واللي على اليمين أفتح (أصغر opacity)
                  // ratio من 0 .. 1 عبر طول السطر
                  const ratio = len > 1 ? i / (len - 1) : 0; // 0 for first char, 1 for last
                  // نحدد حد أقصى وأدنى للـopacity على الجمل غير الفعالة
                  const maxDim = 0.36; // أقصى وضوح في غير الفعّال (على الشمال)
                  const minDim = 0.08; // أدنى وضوح (على اليمين)
                  const computedOpacity = Math.max(
                    minDim,
                    maxDim - ratio * (maxDim - minDim)
                  );

                  // نعطي transitionDelay صغيرة لعكس الـstagger (عشان fade يحصل أيضاً مع تتابع)
                  const delay = i * 10;

                  return (
                    <span
                      key={i}
                      className="char"
                      style={{
                        opacity: computedOpacity,
                        transitionDelay: `${delay}ms`,
                        transform: "translateY(0)",
                      }}
                    >
                      {ch}
                    </span>

                  );
                })}
              </h2>

              {/* السطر يحوي خط تحت لفصل الأسطر (زي الصورة) */}
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
