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
        <div className="nav-left">© Code by Ahmed</div>

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

{/* <button className="inline-flex cursor-pointer items-center gap-x-2 border border-transparent font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-(--clr-accent) transition-colors text-(--clr-neutral-dark) bg-(--clr-neutral-light) hover:bg-(--clr-neutral-light)/70 px-6 py-2 text-sm relative overflow-hidden group [&amp;&gt;*&gt;*]:transition-transform [&amp;&gt;*&gt;*]:duration-300 [&amp;&gt;*&gt;*]:translate-y-0 hover:[&amp;&gt;*&gt;*]:-translate-y-full focus-visible:[&amp;&gt;*&gt;*]:-translate-y-full active:[&amp;&gt;*&gt;*]:-translate-y-full rounded-full uppercase max-md:hidden" data-text="Contact"><span data-text="Contact" className="relative inline-block overflow-hidden before:content-[attr(data-text)] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:justify-center before:flex-1 before:flex before:items-center before:translate-y-full before:transition-transform before:duration-300 group-hover:before:translate-y-0 group-focus-visible:before:translate-y-0 group-active:before:translate-y-0"><span className="inline-block">Contact</span></span></button> */}

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
