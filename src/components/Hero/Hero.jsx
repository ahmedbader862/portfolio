import React, { useEffect, useState, useContext } from 'react';
import './Hero.css';
import ScrollButton from '../tools/ScrollButton/ScrollButton';
import Social from '../Social/Social';
import { ScrollContext } from '../../context/ScrollContext';

function Hero({
  backgroundImage = '/src/assets/Images/my-photo.jpg',
  normalTitle = 'MORE THAN\nJUST A CODE',
  normalSubtitle = "There's a story behind every interaction. Find it."
}) {

  // Get scroll context for background scaling only
  const { scrollYProgress } = useContext(ScrollContext);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update scroll progress
  useEffect(() => {
    if (scrollYProgress) {
      const unsubscribe = scrollYProgress.on('change', (value) => {
        setScrollProgress(value);
      });
      return unsubscribe;
    }
  }, [scrollYProgress]);

  // Calculate transforms based on scroll progress
  const backgroundScale = 1 + (scrollProgress * .5); // Scale from 1 to 1.1
  const textScale = 1 - (scrollProgress * .5); // Scale from 1 to 0.95

  return (
    <>
      <header 
        className='Hero' 
        style={{ 
          '--background-scale': backgroundScale,
          '--background-image': `url(${backgroundImage})`
        }}
      >
        <div 
          className="hero-content"
          style={{
            transform: `scale(${textScale})`
          }}
        >
          <div className='normal'>
          <h1>
              {normalTitle.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < normalTitle.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p>{normalSubtitle}</p>
          </div>
          
        </div>
        <div className="Social-Hero">
            <Social/>
          </div>
        <ScrollButton/>
      </header>
    </>
  );
}

export default Hero;