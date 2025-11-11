import './AboutP.css'
import Hero from "../../components/Hero/Hero";
import TextEffect from "../../components/tools/TextEffect/TextEffect";
import TextOpacity from "../../components/tools/TextOpacity/TextOpacity";
import CircleButton from "../../components/tools/CircleButton/CircleButton";
import LetIsWork from '../../components/LetIsWork/LetIsWork';
import Footer from '../../components/Footer/Footer';
import CircularGallery from '../../components/tools/CircularGallery/CircularGallery'

export default function AboutP() {

  const myImages = [
    { image: "/src/assets/Images/chefs-2.jpg", text: "مشروعي الأول" },
    { image: "/src/assets/Images/my-photo.jpg", text: "Frontend" },
    { image: "/src/assets/Images/chefs-2.jpg", text: "Frontend" },
  ];

  return (
    <div className="About-page">
      <Hero
        backgroundImage="/src/assets/Images/"
        Title = "AHMED BADR"
        normalTitle="About ME"
        normalSubtitle="Get to know me:My journey,approach,and passion for creating impactful web experiences"
      />
      
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <TextEffect
              text="Hello"
              tag="h2"
              className="about-title"
              splitType="chars"
              delay={100}
              duration={0.6}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
            />
            
            <div className="about-text">
              <TextOpacity
                text="I'm Karan Sethi, a frontend developer with a passion for creating beautiful, user-friendly web experiences. I believe that great design and seamless functionality go hand-in-hand to tell a compelling story online."
                className="about-paragraph"
              />
              <TextOpacity
                text="I specialize in building websites that look great, work smoothly, and are easy for users to navigate. My focus is on making sure every interaction feels intuitive and enjoyable, no matter the device or screen size."
                className="about-paragraph"
              />
              <TextOpacity
                text="If you're looking for a frontend developer who cares about both the details and the bigger picture, I'd love to help bring your next project to life. Let's create something that resonates with your audience!"
                className="about-paragraph"
              />
            </div>
            
            <div className="about-button">
              <CircleButton one="Explore" two="my works" />
            </div>
          </div>
          
          <div className="about-image">
            <picture>
              <source media="(orientation: landscape)" srcSet="/src/assets/Images/my-photo.jpg" />
              <source media="(orientation: portrait)" srcSet="/src/assets/Images/my-photo.jpg" />
              <img 
                src="/src/assets/Images/my-photo.jpg" 
                alt="Karan Sethi - Frontend Developer" 
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </section>


      <div style={{ height: '600px', position: 'relative' }}>
      <CircularGallery
        items={myImages}
        bend={3}
        textColor="#ffffff"
        borderRadius={0.05}
        font="bold 28px Bebas Neue"
      />
     </div>



    <LetIsWork/>
    
      



    </div>
  );
}


