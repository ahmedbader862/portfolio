import { useMotionValue, useSpring } from "framer-motion";

/**
 * Hook مشترك للـ hover animation effects
 * @param {number} stiffness - قوة الـ spring (default: 150)
 * @param {number} damping - قوة التخميد (default: 12)
 * @param {number} moveFactor - عامل الحركة (default: 0.5)
 * @returns {Object} - { x, y, springX, springY, handleMouseMove, handleMouseLeave, style }
 */
const useMotionHover = (stiffness = 150, damping = 12, moveFactor = 0.5) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    x.set(offsetX * moveFactor);
    y.set(offsetY * moveFactor);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    x,
    y,
    springX,
    springY,
    handleMouseMove,
    handleMouseLeave,
    style: { x: springX, y: springY }
  };
};

export default useMotionHover;
