import './CircleButton.css'
import { motion, useMotionValue, useSpring } from "framer-motion";

function CircleButton({one , two}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 12 });
    const springY = useSpring(y, { stiffness: 150, damping: 12 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);

        x.set(offsetX * 0.1);
        y.set(offsetY * 0.1);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div 
            className="circle-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
        >
          <button className="circle">
            <span>{one}</span>
            <span>{two}</span>
          </button>
        </motion.div>
    );
}
export default CircleButton;