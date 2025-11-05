// Footer.jsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircleButton from "../tools/CircleButton/CircleButton";
import "./Footer.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


gsap.registerPlugin(ScrollTrigger);

export default function Footer() {

 

  return (
    <motion.footer className="footer" >
      
      <div className="footer-main-section">
        <div className="footer-main-left">
          <h2 className="footer-heading">
            <span className="glitch-text">GOT AN INTERESTING PROJECT?</span>
            <span className="glitch-text">I CAN HELP YOU.</span>
          </h2>
          <div className="contact-fields">
            <div className="contact-field">karansethil23@test.com</div>
            <div className="contact-field">9876543210</div>
          </div>
        </div>

        <div className="footer-main-right">
          <CircleButton one="GET IN" two="TOUCH" />
        </div>


        
      </div>

      <div className="footer-separator-line"></div>

      <div className="footer-links-section">
        <div className="footer-link-group">
          <h3 className="footer-link-heading">Connect with me</h3>
          <a href="#" className="footer-link">In @imkaran</a>
        </div>
        <div className="footer-link-group">
          <h3 className="footer-link-heading">Follow me</h3>
          <a href="#" className="footer-link footer-social-links">.github .linkedin .twitter</a>
        </div>
        <div className="footer-link-group">
          <h3 className="footer-link-heading">Say hello</h3>
          <a href="#" className="footer-link">karan@test.com</a>
        </div>
      </div>
    </motion.footer>
  );
}
