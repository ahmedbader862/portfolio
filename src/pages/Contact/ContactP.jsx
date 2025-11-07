import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import LetIsWork from "../../components/LetIsWork/LetIsWork";

function ContactP() {
  return (
    <>
     <Hero 
      backgroundImage="/src/assets/Images/mask.svg"
      normalTitle="CONTACT ME"
      normalSubtitle="Ready to start your next project?"
    />

     <Contact/>
    <LetIsWork/>

    </>
   
  );
}

export default ContactP;