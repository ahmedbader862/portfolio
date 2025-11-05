import { motion, useMotionValue, useSpring } from "framer-motion";
import "./Navbar.css";

const links = [
  { label: "HOME", href: "#home" },
  { label: "WORKS", href: "#works" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-left">© Code by Karan</div>

        <nav className="nav-center">
          <ul className="nav-list">
            {links.map((link) => (
              <NavLink key={link.href} {...link} />
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

function NavLink({ label, href }) {
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
    <motion.li
      className="nav-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      <a href={href} className="nav-link">
        {label}
        <motion.span
          className="nav-dot"
          layoutId="nav-dot"
          whileHover={{ scale: 1 }}
          initial={{ scale: 0 }}
        />
      </a>
    </motion.li>
  );
}
