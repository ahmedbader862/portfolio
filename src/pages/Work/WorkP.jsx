import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

export default function WorkP() {

  const projects = [
    {
      image: '/Images/e-commerce.png',
      number: '01',
      title: "QuickCart",
      subtitle: 'E-commerce Platform',
      description: 'Built QuickCart, a modern e-commerce SPA with React 18, Vite, Redux Toolkit, and Tailwind CSS, featuring full bilingual support (English/Arabic) and fully responsive, mobile-first design.\nImplemented rich product discovery: search, category/brand filtering, price range slider, sorting, grid/list views, and detailed product pages with zoomable image galleries.\nIntegrated RouteMisr REST API via Axios with interceptors; built authentication system using React Context, localStorage persistence, protected routes, and role-based access (customer/admin).\nEngineered global state with Redux Toolkit for cart (persistent add/update/remove, quantity, subtotal calculation), wishlist, language toggle, and UI preferences.\nDeveloped a fully functional admin dashboard with complete CRUD operations for products, categories, and brands, including form validation with Formik + Yup.\nEnhanced UX with AOS scroll animations, React Icons, React Toastify notifications, React Helmet Async for dynamic SEO metadata, and loading skeletons.\nConfigured advanced routing using React Router v6 with lazy loading, nested routes, and dedicated pages for home, products, product details, cart, wishlist, admin panel, and custom 404.\nDeployed on Vercel with ESLint, Prettier, component-driven architecture, and performance optimizations.',
      link: 'https://react-project-nine-gules-20.vercel.app/',
    },
    {
      image: '/Images/restaurant.png',
      number: '02',
      title: 'Tasty Bites',
      subtitle: 'Restaurant Management',
      description: 'Built a production-ready restaurant platform using React 19, Vite, Redux Toolkit, and Bootstrap, featuring a fully bilingual (EN/AR), theme-aware (light/dark), and responsive UI.\nImplemented end-to-end customer journeys: menu browsing, wishlist/cart management, table selection, reservations, real-time order tracking, checkout with PayPal & Cash on Delivery, coupon logic, and automatic order persistence/clearing in Firestore.n\n\n\nIntegrated Firebase Authentication, Firestore, Storage, and Realtime Database for secure authentication and real-time data sync across customer and admin panels.\nDeveloped a role-protected admin dashboard with full CRUD operations for menu items (including image uploads), orders, and reservations, plus interactive analytics charts and reporting.\nEngineered an AI-powered in-app chat widget backed by a Dockerized Node.js backend, vector database, and Hugging Face Inference API to deliver context-aware, menu-specific responses.\nEnsured high accessibility (a11y), consistent Toast/SweetAlert2 notifications, and seamless UX; deployed on Vercel with ESLint enforcement and component-driven architecture.',
      link: 'https://final-project-opal-nine.vercel.app/',
    },
    {
      image: '/Images/naruto.jpg',
      number: '03',
      title: 'Your Project Will Be here',
      subtitle: '',
      // link: '',
    },
   
 
  ];


  return (
   <div className="page">
     
     <Hero 
       backgroundImage="/Images/"
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


