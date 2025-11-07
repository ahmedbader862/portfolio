// NavButton.jsx (مثال للتشغيل)
import { useNavigate } from 'react-router-dom';
import { useTransitionOverlay } from '../../hooks/useTransition';
import { useRef, useEffect } from 'react';
import CardNav from './../tools/CardNav/CardNav';

const NavButton = () => {
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

  const handleNavigation = (href, title) => {
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

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Works', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <CardNav
      items={items}
      baseColor="#0b0b0b"
      onItemClick={handleNavigation}
    />
  );
};
export default NavButton;