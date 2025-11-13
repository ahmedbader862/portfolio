import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointer } from '../../../hooks/usePointer';
import './Cursor.css';

export default function Cursor() {
  // نعمل قيم متغيرة للـ x و y
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { x: cx, y: cy } = usePointer();

  // نعمل انسيابية بالـ spring (زي الـ easeOut)
  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });

  // أضف state جديد لتتبع لون المؤشر
const [isHoveringCircle, setIsHoveringCircle] = useState(false);

// أضف useEffect للاستماع للـ events
useEffect(() => {
    const onHoverCircle = () => setIsHoveringCircle(true);
    const onLeaveCircle = () => setIsHoveringCircle(false);

    window.addEventListener('cursor-hover-circle', onHoverCircle);
    window.addEventListener('cursor-leave-circle', onLeaveCircle);
    
    return () => {
        window.removeEventListener('cursor-hover-circle', onHoverCircle);
        window.removeEventListener('cursor-leave-circle', onLeaveCircle);
    };
}, []);
  

  useEffect(() => {
    x.set(cx);
    y.set(cy);
  }, [cx, cy, x, y]);

  // ring mode state: when true the cursor becomes a hollow ring centered on an icon
  const [ringMode, setRingMode] = useState(false);
  const [ringSize, setRingSize] = useState(20);

  useEffect(() => {
    const onRingOn = (e) => {
      const d = e.detail || {};
      const sx = typeof d.x === 'number' ? d.x : 0;
      const sy = typeof d.y === 'number' ? d.y : 0;
      const size = typeof d.size === 'number' ? d.size : 56;
      // move cursor to icon center and enable ring mode
      x.set(sx);
      y.set(sy);
      setRingSize(size);
      setRingMode(true);
    };

    const onRingOff = () => {
      // disable ring mode (cursor will resume following mouse by mousemove listener)
      setRingMode(false);
      setRingSize(20);
    };

    window.addEventListener('cursor-ring-on', onRingOn);
    window.addEventListener('cursor-ring-off', onRingOff);
    return () => {
      window.removeEventListener('cursor-ring-on', onRingOn);
      window.removeEventListener('cursor-ring-off', onRingOff);
    };
  }, [x, y]);
  return (
    <motion.div
      className="global-cursor"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        // size and appearance change when in ring mode
        width: ringMode ? ringSize : 20,
        height: ringMode ? ringSize : 20,
        background: ringMode ? 'transparent' : (isHoveringCircle ? '#000000' : 'red'),
        border: ringMode ? '2px solid red' : 'none',
        boxSizing: 'border-box',
        color: ringMode ? 'red' : 'inherit',
      }}
    />
  );
}
