import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import image from "../assets/logo.png";
import {
  User,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/cartContext";

const navItems = [
  { id: "accueil", label: "Accueil" },
  {
    id: "produits",
    label: "Produits",
    submenu: [{ id: "categories", label: "Catégories" }],
  },
  { id: "tarifs", label: "Tarifs" },
  { id: "a-propos", label: "À propos", scrollTo: "qui-sommes-nous" },
  {
    id: "ressources",
    label: "Ressources",
    submenu: [
      { id: "blogs", label: "Blogs", path: "/blog" },
      { id: "avis-client", label: "Avis Client", path: "/avis-client" },
      { id: "guide-utilisation", label: "Guide d'utilisation", path: "/guide" },
      { id: "faq", label: "FAQ", path: "/faq" },
      { id: "en-savoir-plus", label: "En savoir plus", path: "/savoir-plus" },
    ],
  },
  { id: "contacts", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [removingItems, setRemovingItems] = useState([]);
  const [isClearing, setIsClearing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { cartItems, itemCount, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    if (itemCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      let current = "accueil";
      const sectionsToCheck = navItems.filter((item) => !item.submenu);
      for (const item of sectionsToCheck) {
        const sectionId = item.scrollTo || item.id;
        const section = document.getElementById(sectionId);
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

  const scrollToSection = (id, customScrollTo = null) => {
    const sectionId = customScrollTo || id;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const handleItemClick = (item) => {
    if (item.submenu) {
      setDropdownOpen(dropdownOpen === item.id ? null : item.id);
    } else {
      scrollToSection(item.id, item.scrollTo);
    }
  };

  const handleSubmenuClick = (parentId, submenuItem) => {
    if (submenuItem.path) {
      navigate(submenuItem.path);
    } else if (submenuItem.id === "categories") {
      navigate("/categories");
    }
    setDropdownOpen(null);
    setMenuOpen(false);
  };

  // Supprimer un produit avec animation et shake bouton
  const handleRemoveWithAnimation = (produitId) => {
    setRemovingItems((prev) => [...prev, produitId]);
    // Shake bouton pour feedback immédiat
    const btn = document.getElementById(`remove-btn-${produitId}`);
    if (btn) {
      btn.classList.add("shake");
      setTimeout(() => btn.classList.remove("shake"), 400);
    }
    setTimeout(() => {
      removeFromCart(produitId);
      setRemovingItems((prev) => prev.filter((id) => id !== produitId));
    }, 600);
  };

  // Vider le panier avec pulse animation sur bouton
  const handleClearCartWithAnimation = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 700);
  };

  return (
    <>
      <style>
        {`
          /* Animations clés */
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
          }
          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.6); box-shadow: 0 0 8px rgba(255,0,0,0.6); }
            100% { transform: scale(1); box-shadow: none; }
          }
          @keyframes fadeSlideIn {
            0% { opacity: 0; transform: translateX(30px) scale(0.9); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes fadeSlideOutRotate {
            0% { opacity: 1; transform: translateX(0) rotate(0deg) scale(1); }
            100% { opacity: 0; transform: translateX(-40px) rotate(-15deg) scale(0.8); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: none; }
            50% { transform: scale(1.1); box-shadow: 0 0 12px rgba(220,20,60,0.8); }
          }
          @keyframes fadeZoomIn {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeZoomOut {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.9); }
          }

          /* Classes animations */
          .animate-shake {
            animation: shake 0.5s ease;
          }
          .animate-pop {
            animation: pop 0.7s ease;
          }
          .fade-slide-in {
            animation: fadeSlideIn 0.5s ease forwards;
          }
          .fade-slide-out-rotate {
            animation: fadeSlideOutRotate 0.6s ease forwards;
          }
          .pulse {
            animation: pulse 1.2s ease infinite;
          }
          .fade-zoom-in {
            animation: fadeZoomIn 0.4s ease forwards;
          }
          .fade-zoom-out {
            animation: fadeZoomOut 0.4s ease forwards;
          }
          .shake {
            animation: shake 0.4s ease;
          }

          /* Styles désactivation */
          .disabled {
            pointer-events: none;
            opacity: 0.6;
          }
        `}
      </style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-md px-6 md:px-12 py-2 flex items-center justify-between transition-colors duration-300">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={image}
            alt="Logo"
            className="h-24 w-auto md:h-24 drop-shadow-lg transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 items-center bg-gray-100 dark:bg-[#161616] rounded-full px-10 py-2 border border-gray-300 dark:border-gray-600 shadow-sm">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <div
                className={`cursor-pointer text-sm md:text-base transition-colors duration-300 flex items-center gap-1 ${
                  active === item.id
                    ? "text-red-600 font-semibold"
                    : "text-gray-700 dark:text-white hover:text-red-600"
                }`}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
                {item.submenu && <ChevronDown size={16} />}
              </div>

              {item.submenu && dropdownOpen === item.id && (
                <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 min-w-48 py-2 z-50">
                  {item.submenu.map((submenuItem) => (
                    <button
                      key={submenuItem.id}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 transition-colors"
                      onClick={() => handleSubmenuClick(item.id, submenuItem)}
                    >
                      {submenuItem.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right actions (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Panier avec animation et compteur */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative"
            aria-label="Afficher le panier"
          >
            <ShoppingCart
              size={24}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } ${isAnimating ? "animate-pop" : ""}`}
            />
            {itemCount > 0 && (
              <span
                className={`absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold ${
                  isAnimating ? "animate-pop shadow-lg" : ""
                }`}
              >
                {itemCount}
              </span>
            )}
          </button>

          {/* Bouton bascule thème */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#161616] text-gray-700 dark:text-gray-200 hover:text-red-600 hover:border-red-400 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/signup"
            className="flex items-center space-x-2 cursor-pointer transition-colors duration-200 hover:text-red-600 text-gray-600 dark:text-gray-300"
          >
            <User size={20} />
            <span className="font-medium">Créer un compte</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 dark:text-white hover:text-red-600 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu (responsive) */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-black shadow-lg border-t border-gray-300 dark:border-gray-700 z-40">
          <ul className="flex flex-col gap-3 p-4">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <div
                  className={`cursor-pointer text-base flex items-center justify-between px-3 py-2 rounded ${
                    active === item.id
                      ? "bg-red-100 dark:bg-red-900 text-red-600 font-semibold"
                      : "text-gray-700 dark:text-white hover:text-red-600"
                  }`}
                  onClick={() =>
                    item.submenu
                      ? setDropdownOpen(dropdownOpen === item.id ? null : item.id)
                      : scrollToSection(item.id, item.scrollTo)
                  }
                >
                  <span>{item.label}</span>
                  {item.submenu && <ChevronDown size={16} />}
                </div>
                {item.submenu && dropdownOpen === item.id && (
                  <ul className="pl-6 bg-gray-100 dark:bg-gray-800 rounded-b-md">
                    {item.submenu.map((submenuItem) => (
                      <li key={submenuItem.id}>
                        <button
                          className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-600 transition-colors"
                          onClick={() => handleSubmenuClick(item.id, submenuItem)}
                        >
                          {submenuItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Panier déroulant */}
      {showCart && (
        <div
          className={`fixed top-20 right-4 w-80 max-h-[60vh] bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-lg p-4 overflow-auto z-[1000] fade-zoom-in`}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-bold mb-4 text-red-600 dark:text-red-400">
            Votre Panier
          </h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">Votre panier est vide.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.produit._id}
                  className={`mb-4 border-b dark:border-gray-600 pb-2 flex justify-between items-center transition-all duration-500 ease-in-out ${
                    removingItems.includes(item.produit._id)
                      ? "fade-slide-out-rotate"
                      : "fade-slide-in"
                  }`}
                  aria-live="polite"
                >
                  <div>
                    <p
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      {item.produit.name}
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      Quantité : {item.quantite}
                    </p>
                    <p className="text-sm text-red-600">
                      Prix : {item.produit.price} TND
                    </p>
                  </div>
                  <button
                    id={`remove-btn-${item.produit._id}`}
                    onClick={() => handleRemoveWithAnimation(item.produit._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    aria-label={`Supprimer ${item.produit.name} du panier`}
                    disabled={isClearing}
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCartWithAnimation}
              className={`mb-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition ${
                isClearing ? "pulse disabled" : ""
              }`}
              disabled={isClearing}
              aria-label="Vider le panier"
            >
              Vider le panier
            </button>
          )}

          <button
            onClick={() => setShowCart(false)}
            className="mt-4 w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Fermer
          </button>
        </div>
      )}
    </>
  );
}
