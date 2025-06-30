import { useState, useEffect } from "react";
import image from "../assets/logo.png";
import { User, Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

const navItems = [
  { id: "accueil", label: "Accueil" },
  { id: "service", label: "Service" },
  { id: "product", label: "Produit " },
  { id: "blog", label: "Blog" },
  { id: "contacts", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      let current = "accueil";

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPos) {
          current = item.id;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-md px-6 md:px-12 py-2 flex items-center justify-between transition-colors duration-300">
      {/* Logo */}
      <a href="/" className="flex items-center space-x-2">
        <img
          src={image}
          alt="Logo"
          className="h-12 w-auto md:h-14 drop-shadow-lg transition-all duration-300"
        />
      </a>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 items-center bg-gray-100 dark:bg-[#161616] rounded-full px-10 py-2 border border-gray-300 dark:border-gray-600 shadow-sm">
        {navItems.map(({ id, label }) => (
          <li
            key={id}
            className={`cursor-pointer text-sm md:text-base transition-colors duration-300 ${
              active === id
                ? "text-red-600 font-semibold"
                : "text-gray-700 dark:text-white hover:text-red-600"
            }`}
            onClick={() => scrollToSection(id)}
          >
            {label}
          </li>
        ))}
      </ul>

      {/* Account Section (Desktop) */}
      <Link
  to="/signup"
  className="hidden md:flex items-center space-x-2 cursor-pointer transition-colors duration-200 hover:text-red-600 text-gray-600 dark:text-gray-300"
>
  <User size={20} />
  <span className="font-medium">Créer un compte</span>
</Link>


      {/* Hamburger Button (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 dark:text-white hover:text-red-600 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#111] shadow-md border-t border-gray-200 dark:border-gray-700 flex flex-col px-6 py-4 z-40 md:hidden transition-all duration-300">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              className={`text-left py-2 text-sm font-medium border-b ${
                active === id
                  ? "text-red-600 font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:text-red-600"
              }`}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          ))}

          <div className="flex items-center gap-2 mt-4 cursor-pointer text-gray-700 dark:text-gray-200 hover:text-red-600 transition-colors">
            <User size={20} />
            <span className="font-medium">Créer un compte</span>
          </div>
        </div>
      )}
    </nav>
  );
}
