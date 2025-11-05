
import './Social.css'
import { motion, useMotionValue, useSpring } from "framer-motion";

function Social (){

    function SocialIcon({ href, children }) {
      const x = useMotionValue(0);
      const y = useMotionValue(0);
    
      const springX = useSpring(x, { stiffness: 150, damping: 12 });
      const springY = useSpring(y, { stiffness: 150, damping: 12 });
    
      const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);
    
        x.set(offsetX * 0.5);
        y.set(offsetY * 0.5);
        console.log('icon move', offsetX, offsetY);
      };   
    
      const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        // inform cursor to leave ring mode if it was enabled
        window.dispatchEvent(new CustomEvent('cursor-ring-off'));
      };
    
      const handleMouseEnter = (e) => {
        // compute center of the icon in viewport coordinates
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // choose a ring size slightly larger than the icon
        const size = Math.max(rect.width, rect.height) + 16;
        window.dispatchEvent(new CustomEvent('cursor-ring-on', { detail: { x: centerX, y: centerY, size } }));
      };
    
      return (
        <motion.li
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ x: springX, y: springY }}
        >
          <motion.a 
            href={href}
            target="_blank" 
            rel="noopener noreferrer"
          >
            {children}
          </motion.a>
        </motion.li>
      );
    }
    

 return (
  <>

     <div className="social-icons">
<ul>
<SocialIcon href="https://github.com/ahmedbader862">
  <svg 
    className="w-[40px] h-[40px] text-gray-800 dark:text-white" 
    aria-hidden="true" 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd"/>
  </svg>
</SocialIcon>

<SocialIcon href="https://www.linkedin.com/in/ahmed-bader-713b79308/">
  <svg 
    className="w-[40px] h-[40px] text-gray-800 dark:text-white" 
    aria-hidden="true" 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd"/>
    <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
  </svg>
</SocialIcon>

</ul>
   </div>


  </>
 );   
}
export default Social;