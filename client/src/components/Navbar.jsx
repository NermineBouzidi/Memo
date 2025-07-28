import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown, User, MessageCircle, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import image from "../../public/assets/logo-crp-memo.png";
import Lottie from "lottie-react";
import userIconAnimation from "../assets/userIcon.json";

const navItems = [
  { id: "accueil", label: "Accueil" },
  { id: "produit", label: "Le produit" },
  { id: "fonctionnalites", label: "Fonctionnalités" },
  { id: "etapes", label: "Processus" },
  { id: "tarifs", label: "Offres" },
  { id: "support", label: "Support", path: "/support" }
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [active, setActive] = useState(pathname === "/support" ? "support" : "accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [lineStyle, setLineStyle] = useState({ width: 0, left:0 })
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const navRef = useRef(null);

  useEffect(() => {
    if (pathname === "/support") {
      setActive("support");
      
      if (navRef.current) {
        const supportButton = Array.from(navRef.current.children).find(
          (child) => child.dataset.id === "support"
        );
        if (supportButton) {
          const { offsetLeft, offsetWidth } = supportButton;
          setLineStyle({
            width: offsetWidth,
            left: offsetLeft
          });
        }
      }
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      let current = "accueil";
      
      for (const item of navItems) {
        if (item.path) continue;
        
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      
      setActive(current);
      
      if (navRef.current) {
        const activeButton = Array.from(navRef.current.children).find(
          (child) => child.dataset.id === current
        );
        if (activeButton) {
          const { offsetLeft, offsetWidth } = activeButton;
          setLineStyle({ width: offsetWidth, left: offsetLeft });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    }
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
      setActive(item.id);
    } else {
      setActive(item.id);
      scrollToSection(item.id);
    }
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  return (
    <>
      <style>
        {`
          .animate-fade-slide-up {
            animation: fadeSlideUp 0.3s ease-out forwards;
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .hover-glow:hover {
            box-shadow: 0 0 12px rgba(0, 102, 255, 0.4);
            transform: scale(1.02);
          }
        `}
      </style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 md:px-12 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={image}
            alt="CRP-MEMO Logo"
            className="h-16 w-auto md:h-20 transition-all duration-300"
          />
        </Link>

        <div className="hidden md:block relative">
          <ul ref={navRef} className="flex gap-8 items-center px-2 py-2 relative">
            {navItems.map((item) => (
              <li key={item.id} className="relative" data-id={item.id}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`cursor-pointer text-sm md:text-base transition-all duration-300 py-2 px-1 ${
                      active === item.id || pathname === item.path
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`cursor-pointer text-sm md:text-base transition-all duration-300 py-2 px-1 ${
                      active === item.id
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Ligne bleue visible sur toutes les pages */}
          <div 
            className="absolute bottom-0 h-1 bg-blue-600 transition-all duration-300 ease-out"
            style={{
              width: `${lineStyle.width}px`,
              left: `${lineStyle.left}px`,
            }}
          />
        </div>

        {/* Right actions (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/contact" 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition hover-glow"
          >
            <MessageCircle size={18} />
            Contact commercial
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(dropdownOpen === "user" ? null : "user")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition hover-glow"
              >
                <div className="flex items-center gap-1">
                  <Lottie
                    animationData={userIconAnimation}
                    loop
                    autoplay
                    className="w-8 h-8 cursor-pointer"
                  />
                  <ChevronDown
                    size={16}
                    className="text-gray-800 transition-transform duration-200 group-hover:rotate-180"
                  />
                </div>
              </button>

              {dropdownOpen === "user" && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-slide-up">
                  <button
                    onClick={() => {
                      setDropdownOpen(null);
                      navigate("/home/dashboard");
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition hover-glow"
                  >
                    👤 Votre espace
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(null);
                      logout();
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition hover-glow"
                  >
                    🔓 Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signup"
              className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition hover-glow"
            >
              <User size={18} />
              <span>Créer un compte</span>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-blue-600 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
          <ul className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`w-full block text-left px-4 py-3 rounded-lg ${
                      active === item.id || pathname === item.path
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      active === item.id
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      handleItemClick(item);
                      setMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}

            <li className="border-t border-gray-200 mt-2 pt-2">
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="w-full block text-left px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-2"
              >
                Contact commercial
              </Link>
              
              {user ? (
                <>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/dashboard");
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition mb-2"
                  >
                    👤 Tableau de bord
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    🔓 Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full block text-left px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  ✍️ Créer un compte
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}