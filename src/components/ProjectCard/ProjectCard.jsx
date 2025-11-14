import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './ProjectCard.css';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1, // عشان الكاردات تطلع ورا بعض مش مرة واحدة
      }
    );
  }, [index]);

  return (
    <div className="project-card-wrapper" ref={cardRef}>
      <div className="project-card" role="button" aria-label={`View details of ${project.title}`}>
        <div className="">
          <div className="img-wrap">
            <img
              className="project-img"
              src={project.image}
              alt={`Preview of ${project.title}`}
              loading="lazy"
            />
          </div>

          <div className="project-header">
            <h3 className="project-title">
              <span>{project.title}</span>
            </h3>
            <span className="project-number">{project.number}</span>
          </div>

          <p className="project-description">{project.description}</p>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute-link"
        ></a>
      </div>
    </div>
  );
}

export default ProjectCard;
