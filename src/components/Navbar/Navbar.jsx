import { motion as Motion, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useTransitionOverlay } from '../../hooks/useTransition';
import { useRef, useEffect } from 'react';
import "./Navbar.css";

const links = [
  { label: "HOME", href: "/", title: 'Home', isRoute: true },
  { label: "WORKS", href: "/work", title: 'Work', isRoute: true },
  { label: "ABOUT", href: "/about", title: 'About', isRoute: true },
];

export default function Navbar() {
  const navigate = useNavigate();
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
              <NavLink key={link.href} {...link} onClick={onClick} />
            ))}
          </ul>
        </nav>

        <div className="nav-right">
          <a className="btn-pill" href="#contact">
            CONTACT
          </a>
        </div>
      </div>
    </header>
  );
}

function NavLink({ label, href, title, isRoute, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // smooth الحركة
  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    // نخليها تتحرك بنسبة بسيطة من المسافة
    x.set(offsetX * 0.5);
    y.set(offsetY * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Motion.li
      className="nav-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      <a href={href} className="nav-link" onClick={(e) => onClick(e, href, title, isRoute)}>
        {label}
        <Motion.span
          className="nav-dot"
          layoutId="nav-dot"
          whileHover={{ scale: 1 }}
          initial={{ scale: 0 }}
        />
      </a>
    </Motion.li>
  );
}
