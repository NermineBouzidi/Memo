import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, MoreHorizontal, HelpCircle, Mail, LogIn, UserPlus, User } from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      setDropdownOpen(null);
      setShowMoreMenu(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setDropdownOpen(null);
    setShowMoreMenu(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      id: "solution",
      label: t("navbar.solution"),
      tooltip: t("navbar.solution.tooltip"),
      submenu: [
        {
          title: t("navbar.solution.submenu.qu_est_ce_qu_un_crp"),
          path: "/crp#crp"
        },
        {
          title: t("navbar.solution.submenu.pourquoi_choisir_memo"),
          path: "/crp#pourquoi-memo"
        },
        {
          title: t("navbar.solution.submenu.fonctionnalites_cles"),
          path: "/crp#fonctionnalites"
        }
      ]
    },
    {
      id: "pour-qui",
      label: t("navbar.pour_qui"),
      tooltip: t("navbar.pour_qui.tooltip"),
      path: "/pour-qui", 
      submenu: [
        {
          title: t("navbar.pour_qui.submenu.pme_de_services"),
          path: "/pme-services"
        },
        {
          title: t("navbar.pour_qui.submenu.btp_architecture"),
          path: "/btp-architecture"
        },
        {
          title: t("navbar.pour_qui.submenu.agences_independants"),
          path: "/agences-independants"
        },
        {
          title: t("navbar.pour_qui.submenu.industrie_production"),
          path: "/industrie-production"
        }
      ]
    },
    {
      id: "ressources",
      label: t("navbar.ressources"),
      tooltip: t("navbar.ressources.tooltip"),
      submenu: [
        {
          title: t("navbar.ressources.submenu.videos_demonstration"),
          path: "/videos"
        },
        {
          title: t("navbar.ressources.submenu.faq"),
          path: "/faq"
        },
        {
          title: t("navbar.ressources.submenu.tarification"),
          path: "/tarifs"
        },
      ]
    },
    {
      id: "resultats",
      label: t("navbar.resultats"),
      tooltip: t("navbar.resultats.tooltip"),
      path: "/resultats"
    },
    
    {
      id: "contact",
      label: t("navbar.contact"),
      tooltip: t("navbar.contact.tooltip"),
      path: "/contact"
    },
  
  ];

  const moreMenuItems = [
    ...(isAuthenticated
      ? [
          { icon: <User size={18} />, label: t("navbar.moreMenu.yourSpace"), path: "/home/dashboard" },
          { 
            label: t("navbar.moreMenu.logout"), 
            action: () => {
              logout();
              setShowMoreMenu(false);
              navigate("/login");
            } 
          }
        ]
      : [
          { icon: <LogIn size={18} />, label: t("navbar.moreMenu.login"), path: "/login" },
          { icon: <UserPlus size={18} />, label: t("navbar.moreMenu.signup"), path: "/signup" }
        ]
    )
  ];

  return (
    <>
      <style>
        {`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-slide-up { animation: fadeSlideUp 0.3s ease-out forwards; }
        `}
      </style>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-gradient-to-r from-pink-300 to-orange-300 shadow-lg" : "bg-white shadow-inner"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-16" src={logo} alt="MEMO" />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  {item.submenu ? (
                    <button
                      onClick={() => setDropdownOpen(item.id)}
                      onMouseEnter={() => setDropdownOpen(item.id)}
                      className="flex items-center font-medium text-gray-800 hover:text-red-600 transition-colors"
                    >
                      {item.label}
                      <ChevronDown size={16} className="ml-1" />
                      
                      {item.tooltip && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                          <div className="absolute -bottom-1 left-1/2 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45 -translate-x-1/2"></div>
                          {item.tooltip}
                        </div>
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center font-medium text-gray-800 hover:text-red-600 transition-colors"
                    >
                      {item.label}
                      
                      {item.tooltip && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                          <div className="absolute -bottom-1 left-1/2 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45 -translate-x-1/2"></div>
                          {item.tooltip}
                        </div>
                      )}
                    </Link>
                  )}

                  {dropdownOpen === item.id && item.submenu && (
                    <div 
                      className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 animate-fade-slide-up"
                      onMouseLeave={() => setDropdownOpen(null)}
                    >
                      {item.id === "solution" && (
                        <div className="space-y-1">
                          {item.submenu.map((sub, idx) => (
                            <div key={idx} className="hover:bg-pink-50 p-2 rounded-lg transition-colors">
                              <Link to={sub.path} className="block">
                                <h3 className="font-semibold text-gray-900">{sub.title}</h3>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.id === "pour-qui" && (
                        <div className="grid grid-cols-1 gap-2">
                          {item.submenu.map((sub, idx) => (
                            <Link 
                              to={sub.path} 
                              key={idx}
                              className="hover:bg-pink-50 p-2 rounded-lg transition-colors"
                            >
                              <h3 className="font-semibold text-gray-900">{sub.title}</h3>
                            </Link>
                          ))}
                        </div>
                      )}

                      {item.id === "ressources" && (
                        <div className="space-y-1">
                          {item.submenu.map((sub, idx) => (
                            <Link 
                              to={sub.path}
                              key={idx}
                              className="block hover:bg-pink-50 p-2 rounded-lg transition-colors"
                            >
                              <h3 className="font-semibold text-gray-900">{sub.title}</h3>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="relative">
                <button 
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <MoreHorizontal size={20} />
                </button>
                
                {showMoreMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-1 animate-fade-slide-up">
                    {moreMenuItems.map((item, idx) => (
                      item.action ? (
                        <button
                          key={idx}
                          onClick={item.action}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-pink-50 transition-colors w-full text-left"
                        >
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          key={idx}
                          to={item.path}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                          onClick={() => setShowMoreMenu(false)}
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.label}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <MoreHorizontal size={24} />
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.id} className="relative">
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => setDropdownOpen(dropdownOpen === item.id ? null : item.id)}
                          className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-pink-50"
                        >
                          <span>{item.label}</span>
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform ${dropdownOpen === item.id ? 'transform rotate-180' : ''}`}
                          />
                        </button>
                        {dropdownOpen === item.id && (
                          <div className="pl-4 space-y-1 mt-1">
                            {item.submenu.map((sub, idx) => (
                              <Link
                                key={idx}
                                to={sub.path}
                                className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-red-600 hover:bg-pink-50"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-pink-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                
                <Link
                  to="/demo"
                  className="block w-full text-center px-4 py-2 mt-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("navbar.mobile.demoRequest")}
                </Link>

                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link
                    to="/contact"
                    className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:text-red-600 hover:bg-pink-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Mail size={18} className="mr-2" />
                    {t("navbar.mobile.contactUs")}
                  </Link>
                  
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/home/dashboard"
                        className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:text-red-600 hover:bg-pink-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User size={18} className="mr-2" />
                        {t("navbar.mobile.yourSpace")}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                          navigate("/login");
                        }}
                        className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:text-red-600 hover:bg-pink-50 w-full"
                      >
                        <LogIn size={18} className="mr-2" />
                        {t("navbar.mobile.logout")}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:text-red-600 hover:bg-pink-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn size={18} className="mr-2" />
                        {t("navbar.mobile.login")}
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:text-red-600 hover:bg-pink-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserPlus size={18} className="mr-2" />
                        {t("navbar.mobile.signup")}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}