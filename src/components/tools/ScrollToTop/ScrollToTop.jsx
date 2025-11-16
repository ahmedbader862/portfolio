import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // نضيف delay أكبر عشان ينتهي الـ transition أولاً
    const timer = setTimeout(() => {
      // نزول لأول الصفحة باستخدام scrollIntoView
      document.body.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'start'
      });
    }, 1); // delay أكبر من 1700ms

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop