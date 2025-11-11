import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

export default function WorkP() {

  const projects = [
    {
      image: '/src/assets/Images/my-photo.jpg',
      number: '01',
      title: "Prem's Portfolio",
      description: 'Frontend design, UI development',
      link: 'https://prem-portfolio-teal.vercel.app/',
    },
    {
      image: '/src/assets/Images/my-photo.jpg',
      number: '02',
      title: 'Two Good Co.',
      description: 'Frontend design, UI development',
      link: 'https://imkaranks.github.io/two-good-co-clone/',
    },
    {
      image: '/src/assets/Images/my-photo.jpg',
      number: '03',
      title: 'Quietsphere',
      description: 'Social media, UI design',
      link: 'https://quietsphere.onrender.com/',
    },
    {
      image: '/src/assets/Images/my-photo.jpg',
      number: '04',
      title: 'Flappy Versus',
      description: 'Game design, interactive UI, Multiplayer',
      link: 'https://github.com/imkaranks/multiplayer-flappy-bird',
    },
    {
      image: '/src/assets/Images/my-photo.jpg',
      number: '05',
      title: 'Metaverse 2D',
      description: 'Virtual UI, interactive design',
      link: '',
    },
  ];


  return (
   <div className="page">
     
     <Hero 
       backgroundImage="/src/assets/Images/"
       Title="My works"
       normalTitle="PROJECTS"
       normalSubtitle="Showcasing my work: a collection of projects that blend creativity, functionality, and user-centered design."
     />
     
     <section className="projects-section">
  <div className="projects-container">
    {projects.map((p, i) => (
      <ProjectCard key={i} project={p} index={i} />
    ))}
  </div>
</section>


    </div>
  );
}


