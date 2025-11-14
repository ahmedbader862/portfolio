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
    title: "PREM'S PORTFOLIO",
    subtitle: 'Frontend Design, UI Development',
    image: '/src/assets/Images/chefs-2.jpg',
    description: 'Developed a personal portfolio website for Prem showcasing modern web development techniques.',
    details: 'Technologies used: React, CSS, HTML, JavaScript',
    projectLink: 'https://www.google.com'
  },
  {
    number: '02',
    title: 'TWO GOOD CO.',
    subtitle: 'Frontend Design, UI Development',
    image: '/src/assets/Images/my-photo.jpg',
    description: 'A recreation of the Two Good Co. e-commerce website with modern design principles.',
    details: 'Two Good Co. operates on a "buy one, gift one" model supporting charitable causes.',
    projectLink: 'https://example.com/project2'
  },
  {
    number: '03',
    title: "PREM'S PORTFOLIO",
    subtitle: 'Frontend Design, UI Development',
    image: '/src/assets/Images/chefs-2.jpg',
    description: 'Developed a personal portfolio website for Prem showcasing modern web development techniques.',
    details: 'Technologies used: React, CSS, HTML, JavaScript',
    projectLink: 'https://example.com/project2'
  },
  {
    number: '04',
    title: 'TWO GOOD CO.',
    subtitle: 'Frontend Design, UI Development',
    image: '/src/assets/Images/my-photo.jpg',
    description: 'A recreation of the Two Good Co. e-commerce website with modern design principles.',
    details: 'Two Good Co. operates on a "buy one, gift one" model supporting charitable causes.',
    projectLink: 'https://example.com/project2'
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
  const splitToLetters = useCallback((str) =>
    str.split("").map((ch) => (ch === " " ? "\u00A0" : ch)), []
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
            const titleLetters = splitToLetters(project.title);
            const subtitleLetters = splitToLetters(project.subtitle);

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
                    {subtitleLetters.map((letter, letterIndex) => {
                      const len = subtitleLetters.length;
                      const opacity = getLetterOpacity(index, letterIndex, len);
                      const delay = hovered === index
                        ? letterIndex * 28
                        : (hovered === null ? letterIndex * 8 : letterIndex * 10);

                      return (
                        <span
                          key={letterIndex}
                          className="char"
                          style={{
                            opacity,
                            transitionDelay: `${delay}ms`,
                            transform: "translateY(0)",
                          }}
                        >
                          {letter}
                        </span>
                      );
                    })}
                  </p>
                  <h2 className="project-title">
                    {titleLetters.map((letter, letterIndex) => {
                      const len = titleLetters.length;
                      const opacity = getLetterOpacity(index, letterIndex, len);
                      const delay = hovered === index
                        ? letterIndex * 28
                        : (hovered === null ? letterIndex * 8 : letterIndex * 10);

                      return (
                        <span
                          key={letterIndex}
                          className="char"
                          style={{
                            opacity,
                            transitionDelay: `${delay}ms`,
                            transform: "translateY(0)",
                          }}
                        >
                          {letter}
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
                        {titleLetters.map((letter, letterIndex) => {
                          const len = titleLetters.length;
                          const opacity = getLetterOpacity(index, letterIndex, len);
                          const delay = hovered === index
                            ? letterIndex * 28
                            : (hovered === null ? letterIndex * 8 : letterIndex * 10);

                          return (
                            <span
                              key={letterIndex}
                              className="char"
                              style={{
                                opacity,
                                transitionDelay: `${delay}ms`,
                                transform: "translateY(0)",
                              }}
                            >
                              {letter}
                            </span>
                          );
                        })}
                      </h2>
                    </div>
                    <p className="project-mobile-subtitle">
                      {subtitleLetters.map((letter, letterIndex) => {
                        const len = subtitleLetters.length;
                        const opacity = getLetterOpacity(index, letterIndex, len);
                        const delay = hovered === index
                          ? letterIndex * 28
                          : (hovered === null ? letterIndex * 8 : letterIndex * 10);

                        return (
                          <span
                            key={letterIndex}
                            className="char"
                            style={{
                              opacity,
                              transitionDelay: `${delay}ms`,
                              transform: "translateY(0)",
                            }}
                          >
                            {letter}
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