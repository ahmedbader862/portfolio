import { useEffect, useMemo, useRef, useState } from 'react';
import { PointerContext } from './PointerContext';

export function PointerProvider({ children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const stateRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (e) => {
      stateRef.current.x = e.clientX;
      stateRef.current.y = e.clientY;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: stateRef.current.x, y: stateRef.current.y });
        rafRef.current = null;
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const value = useMemo(() => pos, [pos]);
  return <PointerContext.Provider value={value}>{children}</PointerContext.Provider>;
}


