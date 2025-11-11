import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircleButton from "../tools/CircleButton/CircleButton";
import "./Footer.css";
import useMotionHover from "../../hooks/useMotionHover";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const separatorRef = useRef(null); // السطر اللي عليه الزرار
  const buttonWrapperRef = useRef(null); // العنصر اللي هيتحرك (motion.div) - هنا نحط ref لقياس البوتون
  const [maxX, setMaxX] = useState(0);

  const { handleMouseMove: emailMouseMove, handleMouseLeave: emailMouseLeave, style: emailStyle } = useMotionHover(100, 12, 0.3);
  const { handleMouseMove: phoneMouseMove, handleMouseLeave: phoneMouseLeave, style: phoneStyle } = useMotionHover(100, 12, 0.3);

  // نراقب scroll بالنسبة للـ separator element نفسه
  // offsets: لما top of separator يلتقي bottom of viewport => progress 0
  //          لما bottom of separator يلتقي top of viewport => progress 1
  const { scrollYProgress: sepProgress } = useScroll({
    target: separatorRef,
    offset: ["start end", "end start"],
  });

  // نحول الـ progress (0..1) لـ x بالـ px
  const x = useTransform(sepProgress, [0, 0.5], [0, maxX]);

  // نحدد maxX بناءً على عرض السطر وعرض الزر
  useEffect(() => {
    function updateSizes() {
      const lineEl = separatorRef.current;
      const btnWrap = buttonWrapperRef.current;
      if (!lineEl || !btnWrap) return;

      const lineRect = lineEl.getBoundingClientRect();
      const btnRect = btnWrap.getBoundingClientRect();

      // إحنا بنبدأ من المنتصف (x = 0 يمثل منتصف السطر). عشان نوصل لليمن، المسافة = (نص عرض السطر - نصف عرض الزر) - margin
      const margin = 8; // مسافة بسيطة من الطرف
      const computedMax = Math.max(0, (lineRect.width / 2) - (btnRect.width / 2) - margin);

      setMaxX(Math.round(computedMax));
    }

    // حساب أولي
    updateSizes();

    // إعادة الحساب على الريسايز (لو تغير عرض الشاشة)
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  return (
    <motion.footer className="footer" ref={footerRef}>
      <div className="footer-main-section">
      <div className="footer-main-left">
          <h2 className="footer-heading">
            <span className="glitch-text">GOT AN INTERESTING PROJECT?</span>
            <span className="glitch-text">I CAN HELP YOU.</span>
          </h2>
          <div className="contact-fields">
            
            <motion.div 
              className="contact-field"
              onMouseMove={emailMouseMove}
              onMouseLeave={emailMouseLeave}
              style={emailStyle}
            >
              ahmed.mohamad.badr@gmail
            </motion.div>

            
            <motion.div 
              className="contact-field"
              onMouseMove={phoneMouseMove}
              onMouseLeave={phoneMouseLeave}
              style={phoneStyle}
            >
              01017906954
            </motion.div>
          </div>
        </div>
      </div>

      {/* separator line */}
      <div className="footer-separator-line" ref={separatorRef}>
        {/* motion wrapper يتحكم في x (بالـ px) */}
        <motion.div
          ref={buttonWrapperRef}
          style={{ x }}
          className="separator-button-wrapper"
        >
          <CircleButton
            one="GET"
            two="IN TOUCH"
            page="/contact"
            title="CONTACT"
          />
        </motion.div>
      </div>

      <div className="footer-links-section">
        <div className="footer-link-group">
          <h3 className="footer-link-heading">Connect with me</h3>
          <a href="#" className="footer-link">
            In @imkaran
          </a>
        </div>
        <div className="footer-link-group">
          <h3 className="footer-link-heading">Follow me</h3>
          <a href="#" className="footer-link footer-social-links">
            .github
          </a>
          <a href="#" className="footer-link footer-social-links">
            .linkedin
          </a>
        </div>
        <div className="footer-link-group">
          <h3 className="footer-link-heading">Say hello</h3>
          <a href="#" className="footer-link">
            karan@test.com
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
