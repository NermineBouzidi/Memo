// ---------------- Navbar.jsx ----------------
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/logo.png'; // Adjust the path as necessary

export default function Navbar() {
  const [isProduitOpen, setProduitOpen] = useState(false);
  const [isRessourcesOpen, setRessourcesOpen] = useState(false);
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let produitTimeout, ressourcesTimeout, accountTimeout;

  return (
    <nav className={`fixed z-50 px-6 py-2 flex items-center justify-between transition-all duration-300 ${
      isScrolled ? 'top-0 left-0 right-0 bg-white  rounded-none shadow-md' : 'top-6 left-16 right-16 bg-white/10  rounded-3xl shadow-md'
    }`}>
      <div className="flex items-center">
        <img src={image} alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-800">
        <li className="hover:text-[#ff625a] hover:border-b-2 hover:border-[#ff625a] pb-1 transition-all duration-200">
          <Link to="/">Accueil</Link>
        </li>
       
        <li
          className="relative group"
          onMouseEnter={() => {
            clearTimeout(produitTimeout);
            setProduitOpen(true);
          }}
          onMouseLeave={() => {
            produitTimeout = setTimeout(() => setProduitOpen(false), 200);
          }}
        >
          <button className="hover:text-[#ff625a] hover:border-b-2 hover:border-[#ff625a] pb-1 transition-all duration-200">Produit</button>
          {isProduitOpen && (
            <ul
              className="absolute top-full left-0 mt-2 bg-white text-gray-700 shadow-md rounded-md py-2 px-4 space-y-1 text-left w-40"
              onMouseEnter={() => clearTimeout(produitTimeout)}
              onMouseLeave={() => {
                produitTimeout = setTimeout(() => setProduitOpen(false), 200);
              }}
            >
              <li className="hover:text-[#ff625a] hover:underline px-2 py-1 rounded transition-all">
                <Link to="/categories">Catégories</Link>
              </li>
            </ul>
          )}
        </li>
         <li className="hover:text-[#ff625a] hover:border-b-2 hover:border-[#ff625a] pb-1 transition-all duration-200">
          <Link to="/">Tarifs</Link>
        </li>
        <li
          className="relative group"
          onMouseEnter={() => {
            clearTimeout(ressourcesTimeout);
            setRessourcesOpen(true);
          }}
          onMouseLeave={() => {
            ressourcesTimeout = setTimeout(() => setRessourcesOpen(false), 200);
          }}
        >
          <button className="hover:text-[#ff625a] hover:border-b-2 hover:border-[#ff625a] pb-1 transition-all duration-200">Ressources</button>
          {isRessourcesOpen && (
            <ul
              className="absolute top-full left-0 mt-2 bg-white text-gray-700 shadow-md rounded-md py-2 px-4 space-y-1 text-left w-52"
              onMouseEnter={() => clearTimeout(ressourcesTimeout)}
              onMouseLeave={() => {
                ressourcesTimeout = setTimeout(() => setRessourcesOpen(false), 200);
              }}
            >
              <li className="hover:text-[#ff625a] hover:underline px-2 py-1 rounded transition-all">
                <Link to="/blog">Blogs</Link>
              </li>
              <li className="hover:text-[#ff625a] hover:underline px-2 py-1 rounded transition-all">
                <Link to="/avis-clients">Avis Client</Link>
              </li>
              <li className="hover:text-[#ff625a] hover:underline px-2 py-1 rounded transition-all">
                <Link to="/guide-utilisation">Guide d'utilisation</Link>
              </li>
              <li className="hover:text-[#ff625a] hover:underline px-2 py-1 rounded transition-all">
                <Link to="/faq">FAQ</Link>
              </li>
              <li className="hover:text-[#ff625a] hover:underline px-2 py-1 rounded transition-all">
                <Link to="/savoir-plus">En savoir plus</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-4 text-gray-800 relative">
        <div
          className="relative group"
          onMouseEnter={() => {
            clearTimeout(accountTimeout);
            setAccountOpen(true);
          }}
          onMouseLeave={() => {
            accountTimeout = setTimeout(() => setAccountOpen(false), 200);
          }}
        >
          <button className="hover:text-[#ff625a] hover:border-b-2 hover:border-[#ff625a] pb-1 transition-all duration-200">Créer un compte</button>
          {isAccountOpen && (
            <ul
              className="absolute top-full right-0 mt-2 bg-white text-gray-700 shadow-md rounded-md py-2 px-4 space-y-1 w-40"
              onMouseEnter={() => clearTimeout(accountTimeout)}
              onMouseLeave={() => {
                accountTimeout = setTimeout(() => setAccountOpen(false), 200);
              }}
            >
              <li className="hover:text-red-600 hover:underline px-2 py-1 rounded transition-all">
                <Link to="/login">Se connecter</Link>
              </li>
            </ul>
          )}
        </div>
        <Link to="/panier"  className="hover:text-red-600 transition-colors">
          <ShoppingCart size={20} className="hover:scale-110 transition-transform" />
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-lg md:hidden p-4 space-y-3">
          <Link to="/" className="block hover:underline">Accueil</Link>
          <div>
            <p className="font-medium">Produit</p>
            <ul className="pl-4">
              <li><Link to="/categories" className="block hover:underline">Catégories</Link></li>
              <li><Link to="/tarifs" className="block hover:underline">Tarifs</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Ressources</p>
            <ul className="pl-4">
              <li><Link to="/blogs" className="block hover:underline">Blogs</Link></li>
              <li><Link to="/avis" className="block hover:underline">Avis Client</Link></li>
              <li><Link to="/guide" className="block hover:underline">Guide d'utilisation</Link></li>
              <li><Link to="/faq" className="block hover:underline">FAQ</Link></li>
              <li><Link to="/en-savoir-plus" className="block hover:underline">En savoir plus</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-800">Compte </p>
            <ul className="pl-4">
              <li><Link to="/login" className="block hover:underline">Se connecter</Link></li>
            </ul>
          </div>
          <Link to="/panier" className="block hover:underline">Panier</Link>
        </div>
      )}
    </nav>
  );
}
