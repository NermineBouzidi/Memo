import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import image from "../assets/logo.png";
import { User, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const navItems = [
    { id: "accueil", label: t("navbar.home") },
    {
      id: "produits",
      label: t("navbar.products"),
      submenu: [
        { id: "categories", label: t("navbar.categories") }
      ]
    },
    { id: "tarifs", label: t("navbar.pricing") },
    { id: "a-propos", label: t("navbar.about"), scrollTo: "qui-sommes-nous" },
    {
      id: "ressources",
      label: t("navbar.resources"),
      submenu: [
        { id: "blogs", label: t("navbar.blogs"), path: "/blog" },
        { id: "avis-client", label: t("navbar.clientReviews"), path: "/avis-clients" },
        { id: "guide-utilisation", label: t("navbar.userGuide"), path: "/guide-utilisation" },
        { id: "faq", label: t("navbar.faq"), path: "/faq" },
        { id: "en-savoir-plus", label: t("navbar.learnMore"), path: "/savoir-plus" }
      ]
    },
    { id: "contacts", label: t("navbar.contact") },
  ];

  const [active, setActive] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      let current = "accueil";

      const sectionsToCheck = navItems.filter(item => !item.submenu);

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
      setMenuOpen(false);
      setDropdownOpen(null);
    } else {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
        setMenuOpen(false);
        setDropdownOpen(null);
      }
    }
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
    }
    setDropdownOpen(null);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-md px-6 md:px-12 py-2 flex items-center justify-between transition-colors duration-300">
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={image}
          alt="Logo"
          className="h-20 w-auto md:h-20 drop-shadow-lg transition-all duration-300"
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

      {/* Desktop Account Link & Theme Toggle */}
      <div className="hidden md:flex items-center space-x-4">
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

      {/* Mobile Hamburger Icon */}
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
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                className={`w-full text-left py-2 text-sm font-medium border-b flex items-center justify-between ${
                  active === item.id
                    ? "text-red-600 font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-red-600"
                }`}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
                {item.submenu && <ChevronDown size={16} />}
              </button>

              {item.submenu && dropdownOpen === item.id && (
                <div className="pl-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-md mt-1">
                  {item.submenu.map((submenuItem) => (
                    <button
                      key={submenuItem.id}
                      className="w-full text-left py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => handleSubmenuClick(item.id, submenuItem)}
                    >
                      {submenuItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#161616] text-gray-700 dark:text-gray-200 hover:text-red-600 hover:border-red-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              to="/signup"
              className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:text-red-600 transition-colors"
            >
              <User size={20} />
              <span className="font-medium">Créer un compte</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}