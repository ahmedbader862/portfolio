import { useMemo } from 'react';
import { ScrollContext } from './ScrollContext';
import { useScroll, useVelocity } from 'motion/react';

export function ScrollProvider({ children, containerRef }) {
  const options = containerRef ? { container: containerRef } : {};
  const { scrollY, scrollYProgress } = useScroll(options);
  const scrollVelocity = useVelocity(scrollY);

  const value = useMemo(() => ({ scrollY, scrollYProgress, scrollVelocity }), [
    scrollY,
    scrollYProgress,
    scrollVelocity,
  ]);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}






