import { useState, useEffect } from "react";
import image from '../assets/logo3.png';

const navItems = [
  { id: "accueil", label: "Accueil" },
  { id: "service", label: "Service" },
  { id: "blog", label: "Blog" },
  { id: "contacts", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("accueil");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100; // adjust offset

      let current = "accueil"; // default

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPos) {
          current = item.id;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={image} alt="Logo" className="h-24" />
      </a>

      {/* Nav Items */}
      <ul className="hidden md:flex gap-8 font-medium">
        {navItems.map(({ id, label }) => (
          <li
            key={id}
            className={`cursor-pointer ${
              active === id ? "text-red-600 font-bold" : "text-gray-400 hover:text-red-600"
            }`}
            onClick={() => scrollToSection(id)}
          >
            {label}
          </li>
        ))}
      </ul>

      {/* Button */}
      <div>
        <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
          Commencer
        </button>
      </div>
    </nav>
  );
}
