import Navbar from '../components/Navbar';
import Contact from '../components/sections/Contact';
import Hero from '../components/sections/Hero';
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-red-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-red-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

  <Navbar />
  <Hero />
  <Contact />
</div>

  );
}