import { motion as Motion, useMotionValue, useSpring } from "framer-motion";
import { Link, useNavigate, useLocation } from 'react-router-dom'; // احتفظ بـ useLocation هنا للـ Navbar إذا لزم الأمر
import { useTransitionOverlay } from '../../hooks/useTransition';
import { useRef, useEffect } from 'react';
import "./Navbar.css";
import useMotionHover from '../../hooks/useMotionHover'; // أضف ده
import AnimatedButton from '../tools/AnimatedButton/AnimatedButton';

const links = [
  { label: "HOME", href: "/", title: 'Home', isRoute: true },
  { label: "WORKS", href: "/work", title: 'Work', isRoute: true },
  { label: "ABOUT", href: "/about", title: 'About', isRoute: true },
  { label: "CONTACT", href: "/contact", title: 'Contact', isRoute: true }
];

export default function Navbar() {
  const navigate = useNavigate();
  // أزل const location = useLocation(); من هنا إذا لم يكن مطلوبًا في Navbar نفسه
  const { open, close, durationMs } = useTransitionOverlay();
  const navigateTimeoutRef = useRef(null);

  // Cleanup عند unmount
  useEffect(() => {
    return () => {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, []);

  // Function to download CV
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV/Ahmed Mohamed Badr (2).pdf'; // Path relative to public folder
    link.download = 'Ahmed_Mohamed_Badr_CV.pdf'; // Custom filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onClick = (e, href, title, isRoute) => {
    if (!isRoute) return; // السماح للـhash الافتراضي
    e.preventDefault();
    
    // لو نفس الصفحة، مفيش تأثير - نعمل navigate بس
    if (window.location.pathname === href) {
      navigate(href);
      return;
    }
    
    // إلغاء أي timeout سابق
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current);
      navigateTimeoutRef.current = null;
    }
    
    // لو صفحة مختلفة: نفتح الدائرة من تحت لتغطي الشاشة
    open(title);
    
    // ننتظر حتى تكتمل حركة open() (100% من المدة) قبل navigate و close
    navigateTimeoutRef.current = setTimeout(() => {
      navigate(href);
      // بعد navigate مباشرة نبدأ close
      requestAnimationFrame(() => {
        close();
      });
      navigateTimeoutRef.current = null;
    }, durationMs);
  };
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-left">© Code by Karan</div>

        <nav className="nav-center">
          <ul className="nav-list">
            {links.map((link) => (
              <NavLink key={link.href} {...link} onClick={onClick} /> // أزل location من هنا
            ))}
          </ul>
        </nav>

        <div className="nav-right">
          <AnimatedButton
            text="Download CV"
            onClick={downloadCV}
            ariaLabel="Download CV file"
          />
        </div>
      </div>
    </header>
  );
}

function NavLink({ label, href, title, isRoute, onClick }) {
  const location = useLocation(); // انقل useLocation هنا داخل NavLink
  const isActive = location.pathname === href; // تحديد الرابط الحالي
  const { handleMouseMove, handleMouseLeave, style } = useMotionHover(150, 12, 0.5);

  return (
    <Motion.li
      className="nav-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style} // بدلاً من style={{ x: springX, y: springY }}
    >
      <a href={href} className="nav-link" onClick={(e) => onClick(e, href, title, isRoute)}>
        {label}
        <Motion.span
          className="nav-dot"
          animate={{ scale: isActive ? 1 : 0 }} // غير initial إلى animate للتحديث التلقائي
          transition={{ duration: 0.3 }} // أضف انتقال سلس
          // أزل whileHover و layoutId عشان النقطة تبقى ثابتة
        />
      </a>
    </Motion.li>
  );
}
