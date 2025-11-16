import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

export default function WorkP() {

  const projects = [
    {
      image: '/src/assets/Images/e-commerce.png',
      number: '01',
      title: "E-commerce",
      description: 'Quick Cart',
      link: 'https://react-project-nine-gules-20.vercel.app/',
    },
    {
      image: '/src/assets/Images/restaurant.png',
      number: '02',
      title: 'Tasty Bites',
      description: 'Restaurant',
      link: 'https://final-project-opal-nine.vercel.app/',
    },
    {
      image: '/src/assets/Images/naruto.jpg',
      number: '03',
      title: 'Your Project Will Be here',
      description: '',
      // link: '',
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


