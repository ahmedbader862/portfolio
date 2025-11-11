import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import LetIsWork from "../../components/LetIsWork/LetIsWork";

function ContactP() {
  return (
    <>
     <Hero 
      backgroundImage="/src/assets/Images/"
      Title="Let's work together"
      normalTitle="CONTACT ME"
      normalSubtitle="Let’s connect:I’d love to hear about your project and how we can work together."
    />

     <Contact/>
    <LetIsWork/>

    </>
   
  );
}

export default ContactP;