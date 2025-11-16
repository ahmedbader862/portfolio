import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import './Projects.css';
import CircleButton from '../tools/CircleButton/CircleButton';
import Social from '../Social/Social';
import SplitText from '../tools/TextEffect/TextEffect';
import useHoverFade from '../../hooks/useHoverFade';
import { usePointer } from '../../hooks/usePointer';

// Constants
const HIDE_DELAY_MS = 120;
const PREVIEW_WIDTH = 360;
const PREVIEW_HEIGHT = 240;
const MAX_TRANSLATE = 60;

// Static project data
const PROJECTS_DATA = [
  {
    number: '01',
    title: "E-commerce",
    subtitle: 'Quick Cart',
    image: '/src/assets/Images/e-commerce.png',
    projectLink: 'https://react-project-nine-gules-20.vercel.app/'
  },
  {
    number: '02',
    title: 'Restaurant',
    subtitle: 'Tasty Bites',
    image: '/src/assets/Images/restaurant.png',
    projectLink: 'https://final-project-opal-nine.vercel.app/'
  },
  {
    number: '03',
    title: 'Let’s Go',
    subtitle: 'Your Project Will Be here',
    image: '/src/assets/Images/naruto.jpg',
    projectLink: ''
  },
];

const Projects = () => {
  // Refs
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const previewRef = useRef(null);

  // State
  const [previewHovered, setPreviewHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Memoized projects data
  const projects = useMemo(() => PROJECTS_DATA, []);

  // Custom hooks
  const { hovered, getLetterOpacity, handleMouseEnter: hoverEnter, handleMouseLeave: hoverLeave } = useHoverFade(projects);
  const { x, y } = usePointer();

 // Utility functions
const splitToWords = useCallback((str) =>
  str.split(/(\s+)/).filter(word => word.length > 0), []
);

  // DOM update function using RAF for performance
  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = previewRef.current;
      if (!el || !sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();

      // Calculate position
      let left = x - sectionRect.left - 150;
      let top = y - sectionRect.top - PREVIEW_HEIGHT / 16;

      // Constrain to bounds
      const minLeft = 10;
      const maxLeft = sectionRect.width - PREVIEW_WIDTH - 10;
      left = Math.max(minLeft, Math.min(maxLeft, left));

      // Calculate transform
      const relativeX = (x - sectionRect.left) / sectionRect.width;
      const translateX = (relativeX - 0.5) * MAX_TRANSLATE * 2;
      const opacity = visible ? 1 : 0;

      // Direct DOM manipulation for performance
      el.style.left = `${Math.round(left)}px`;
      el.style.top = `${Math.round(top)}px`;
      el.style.transform = `translate3d(${translateX}px, -50%, 0)`;
      el.style.opacity = `${opacity}`;
    });
  }, [x, y, visible]);

  // Update preview background and accessibility attributes
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    // Update background image based on hovered project
    if (hovered !== null && projects[hovered]?.image) {
      el.style.backgroundImage = `url(${projects[hovered].image})`;
    } else {
      el.style.backgroundImage = 'none';
    }

    // Update accessibility attributes
    el.setAttribute('aria-hidden', visible ? 'false' : 'true');

    // Use inert property for better accessibility (experimental)
    try {
      if ('inert' in HTMLElement.prototype) {
        el.inert = !visible;
      }
    } catch (error) {
      // Ignore errors for unsupported browsers
    }
  }, [hovered, visible, projects]);

  // Check if mobile/tablet on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Global cursor behavior - فقط في desktop
  useEffect(() => {
    const cursor = document.querySelector('.global-cursor');
    if (cursor && !isMobile) {
      cursor.style.display = visible ? 'none' : 'block';
    } else if (cursor && isMobile) {
      // في mobile دائماً نظهر الـ cursor
      cursor.style.display = 'block';
    }
  }, [visible, isMobile]);

  // Event handlers
  const handleMouseEnter = useCallback((index) => (e) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    hoverEnter(index)();
    setVisible(true);
    scheduleUpdate();
  }, [hoverEnter, scheduleUpdate]);

  const handleMouseMove = useCallback((index) => (e) => {
    scheduleUpdate();
  }, [scheduleUpdate]);

  const handleMouseLeave = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    hideTimeoutRef.current = setTimeout(() => {
      if (!previewHovered) {
        hoverLeave();
        setVisible(false);

        const el = previewRef.current;
        if (el) el.style.opacity = '0';
      }
      hideTimeoutRef.current = null;
    }, HIDE_DELAY_MS);
  }, [previewHovered, hoverLeave]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <hr />
      <section
        className="projects-section"
        ref={sectionRef}
        onMouseLeave={handleMouseLeave}
      >
        <div className="header-row">
          <div className="left-column">
            <p>Featured</p>

            <SplitText
              text="PROJECTS"
              tag="h2"
              className="section-title"
              delay={40}
              duration={0.7}
              splitType="chars"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
            />

            <SplitText
              text="Please explore my selected projects below."
              tag="p"
              className="description"
              delay={40}
              duration={0.7}
              splitType="chars"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
            />
            <br />

            <SplitText
              text="Click on each one for an overview."
              tag="p"
              className="description"
              delay={40}
              duration={0.7}
              splitType="chars"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
            />
          </div>

          <div className="right-column">
            <CircleButton one="ALL" two="PROJECTS" />
          </div>
        </div>

        <hr />

        <div className="projects-list">
        {projects.map((project, index) => {
  const titleWords = splitToWords(project.title);
  const subtitleWords = splitToWords(project.subtitle);

  return (
    <div
      key={index}
      className="project-item"
      onMouseEnter={handleMouseEnter(index)}
      onMouseMove={handleMouseMove(index)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Desktop Layout: رقم + subtitle + title على نفس الصف */}
      <div className="project-content">
        <span className="project-number"  >{project.number}</span>
        <p className="project-subtitle">
          {subtitleWords.map((word, wordIndex) => {
            const wordStartIndex = subtitleWords.slice(0, wordIndex).join('').length;
            
            return (
              <span key={wordIndex} className="word">
                {word.split('').map((ch, charIndex) => {
                  const globalIndex = wordStartIndex + charIndex;
                  const len = project.subtitle.replace(/\s+/g, '').length;
                  const opacity = getLetterOpacity(index, globalIndex, len);
                  const delay = hovered === index
                    ? globalIndex * 28
                    : (hovered === null ? globalIndex * 8 : globalIndex * 10);

                  return (
                    <span
                      key={charIndex}
                      className="char"
                      style={{
                        opacity,
                        transitionDelay: `${delay}ms`,
                        transform: "translateY(0)",
                      }}
                    >
                      {ch === ' ' ? '\u00A0' : ch}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </p>
        <h2 className="project-title">
          {titleWords.map((word, wordIndex) => {
            const wordStartIndex = titleWords.slice(0, wordIndex).join('').length;
            
            return (
              <span key={wordIndex} className="word">
                {word.split('').map((ch, charIndex) => {
                  const globalIndex = wordStartIndex + charIndex;
                  const len = project.title.replace(/\s+/g, '').length;
                  const opacity = getLetterOpacity(index, globalIndex, len);
                  const delay = hovered === index
                    ? globalIndex * 28
                    : (hovered === null ? globalIndex * 8 : globalIndex * 10);

                  return (
                    <span
                      key={charIndex}
                      className="char"
                      style={{
                        opacity,
                        transitionDelay: `${delay}ms`,
                        transform: "translateY(0)",
                      }}
                    >
                      {ch === ' ' ? '\u00A0' : ch}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </h2>
      </div>

      {/* Mobile Layout: صورة + معلومات (بدون تكرار) */}
      <div className="project-mobile-content">
        <div className="project-mobile-image">
          <img 
            src={projects[index]?.image} 
            alt={project.title}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* زر View Project على الصورة في mobile */}
          {projects[index]?.projectLink && (
            <a
              href={projects[index].projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-mobile-view-btn"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span className="view-text">VIEW</span>
              <span className="project-text">PROJECT</span>
            </a>
          )}
        </div>
        <div className="project-mobile-info">
          <div className="project-mobile-header">
            <span className="project-mobile-number">{project.number}</span>
            <h2 className="project-mobile-title">
              {titleWords.map((word, wordIndex) => {
                const wordStartIndex = titleWords.slice(0, wordIndex).join('').length;
                
                return (
                  <span key={wordIndex} className="word">
                    {word.split('').map((ch, charIndex) => {
                      const globalIndex = wordStartIndex + charIndex;
                      const len = project.title.replace(/\s+/g, '').length;
                      const opacity = getLetterOpacity(index, globalIndex, len);
                      const delay = hovered === index
                        ? globalIndex * 28
                        : (hovered === null ? globalIndex * 8 : globalIndex * 10);

                      return (
                        <span
                          key={charIndex}
                          className="char"
                          style={{
                            opacity,
                            transitionDelay: `${delay}ms`,
                            transform: "translateY(0)",
                          }}
                        >
                          {ch === ' ' ? '\u00A0' : ch}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </h2>
          </div>
          <p className="project-mobile-subtitle">
            {subtitleWords.map((word, wordIndex) => {
              const wordStartIndex = subtitleWords.slice(0, wordIndex).join('').length;
              
              return (
                <span key={wordIndex} className="word">
                  {word.split('').map((ch, charIndex) => {
                    const globalIndex = wordStartIndex + charIndex;
                    const len = project.subtitle.replace(/\s+/g, '').length;
                    const opacity = getLetterOpacity(index, globalIndex, len);
                    const delay = hovered === index
                      ? globalIndex * 28
                      : (hovered === null ? globalIndex * 8 : globalIndex * 10);

                    return (
                      <span
                        key={charIndex}
                        className="char"
                        style={{
                          opacity,
                          transitionDelay: `${delay}ms`,
                          transform: "translateY(0)",
                        }}
                      >
                        {ch === ' ' ? '\u00A0' : ch}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
})}
        </div>

        {/* Project preview with direct DOM manipulation for performance */}
        <div
          ref={previewRef}
          className="project-preview"
          onMouseEnter={() => {
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
              hideTimeoutRef.current = null;
            }
            setPreviewHovered(true);
            setVisible(true);
          }}
          onMouseLeave={() => {
            setPreviewHovered(false);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

            hideTimeoutRef.current = setTimeout(() => {
              hoverLeave();
              setVisible(false);
              if (previewRef.current) previewRef.current.style.opacity = '0';
              hideTimeoutRef.current = null;
            }, HIDE_DELAY_MS);
          }}
        >
          {hovered !== null && projects[hovered]?.projectLink && (
            <a
              href={projects[hovered].projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="view-project-btn"
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            >
              <span className="view-text">VIEW</span>
              <span className="project-text">PROJECT</span>
            </a>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;