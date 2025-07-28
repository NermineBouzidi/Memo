import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import Highlights from '../components/sections/Highlights';
import ProductDefinition from '../components/sections/ProductDefinition';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import INPISection from '../components/sections/INPISection';
import QuEstCeQuUnCRP from '../components/sections/QuEstCeQuUnCRP';
import Etapes from '../components/sections/Etapes';
import Tarifs from '../components/sections/Tarifs';

export default function Home() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
  <>
  <div>
      <Navbar />
      <Hero />
      <QuEstCeQuUnCRP/>
      <Highlights />
      <ProductDefinition />
      <Etapes/>
      <Tarifs/>
      <INPISection/>
    </div>
 
</>

  );
}