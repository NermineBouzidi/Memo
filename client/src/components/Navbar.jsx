import { useState, useEffect } from "react";
import image from "../assets/logo.png";
import { User, Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

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
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-lg px-6 md:px-12 py-2 flex items-center justify-between transition-colors duration-300"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={image}
          alt="Logo"
          className="h-12 w-auto md:h-14 drop-shadow-lg"
        />
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 items-center bg-gray-100 dark:bg-[#161616] rounded-full px-10 py-2 border border-gray-300 dark:border-gray-600 shadow-sm">
        {navItems.map(({ id, label }) => (
          <li
            key={id}
            className={`cursor-pointer text-sm md:text-base relative group transition-colors duration-300 ${
              active === id ? "text-red-600 font-bold" : "text-gray-700 dark:text-white hover:text-red-600"
            }`}
            onClick={() => scrollToSection(id)}
          >
            {label}
            {active === id && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-full"
              />
            )}
          </li>
        ))}
      </ul>

      {/* Account Section (Desktop) */}
      <Link
        to="/signup"
        className="hidden md:flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 relative"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-red-400 to-pink-500 opacity-30"
        ></motion.div>
        <User size={20} className="relative z-10" />
        <span className="font-medium relative z-10">Créer un compte</span>
      </Link>

      {/* Hamburger Button (Mobile) */}
      <div className="md:hidden z-20">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 dark:text-white hover:text-red-600 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-[#111] shadow-md border-t border-gray-200 dark:border-gray-700 flex flex-col px-6 py-4 z-10 md:hidden"
          >
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                className={`text-left py-2 text-sm font-medium border-b ${
                  active === id ? "text-red-600 font-semibold" : "text-gray-700 dark:text-gray-200 hover:text-red-600"
                }`}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}

            <Link
              to="/signup"
              className="mt-4 flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-red-600"
            >
              <User size={20} />
              <span className="font-medium">Créer un compte</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
