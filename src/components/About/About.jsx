import React from "react";
import "./About.css";
import SplitText from "../tools/TextEffect/TextEffect";
import TextOpacity from "../tools/TextOpacity/TextOpacity";
import AnimatedButton from '../tools/AnimatedButton/AnimatedButton';

export default function About() {
  const text = `Passionate about creating seamless, visually engaging web experiences. I design with purpose, building websites that are both beautiful and intuitive.`;

  return (
    <section className="about">
      <div className="about-left">
        <SplitText
          text="ABOUT ME"
          tag="h2"
          className="left-title"
          delay={40}
          duration={0.5}
          splitType="chars"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />

        <div className="about-left-lines">
          <SplitText
            text="FRONT END DEVELOPER"
            tag="p"
            className="about-line"
            delay={25}
            duration={0.6}
            splitType="chars"
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
          />
          <br />
          <SplitText
            text="BASED IN INDIA"
            tag="p"
            className="about-line"
            delay={28}
            duration={0.6}
            splitType="chars"
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
      </div>

      <div className="about-right">
        <p className="about-text" aria-hidden>
          {text}
        </p>

        <TextOpacity
          text={text}
          minOpacity={0.3}
          maxOpacity={1}
          className="animated-line"
        />

          <AnimatedButton 
          text="READ MORE" 
          onClick={() => {/* Add your read more functionality */}}
          ariaLabel="Read more about me"
          initialOpacity={15}
          type="button"
          className="read-more"
        />
      </div>
    </section>
  );
}
