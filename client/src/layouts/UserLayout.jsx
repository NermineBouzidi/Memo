import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import LogOutConfirmationModal from "../components/LogOutConfirmationModal";
import logo from "../assets/logo4.png"; // 🖼 Make sure path is correct

// Pré-génère étoiles une fois (500 étoiles pour un effet dense)
const generateStars = (count) => {
  let stars = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2200);
    const y = Math.floor(Math.random() * 2200);
    const size = +(Math.random() * 1.7).toFixed(2);
    const opacity = +(Math.random() * 0.8 + 0.15).toFixed(2);
    stars += `${x}px ${y}px rgba(255,255,255,${opacity}) ${size}px,`;
  }
  return stars.slice(0, -1);
};
const initialStars = generateStars(500);

const navLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        className="w-5 h-5 inline-block mr-1 -mb-[2px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
        <path d="M21 21H3v-7h18v7z" />
      </svg>
    ),
  },
  {
    to: "/profile",
    label: "Profil",
    icon: (
      <svg
        className="w-5 h-5 inline-block mr-1 -mb-[2px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a8 8 0 0113 0" />
      </svg>
    ),
  },
];

const UserLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [stars, setStars] = useState(initialStars);

  // Regénérer les étoiles lentement pour effet dynamique (optionnel)
  useEffect(() => {
    const interval = setInterval(() => setStars(generateStars(500)), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Variants réutilisables pour nav et boutons
  const itemVariants = {
    hidden: { y: 25, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 130, damping: 15, duration: 0.5 },
    },
    hover: {
      scale: 1.06,
      color: "#ff6b6b",
      textShadow: "0 0 15px rgba(255, 107, 107, 0.8)",
      transition: { duration: 0.25, ease: "easeOut" },
    },
    tap: { scale: 0.97, transition: { duration: 0.12 } },
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.25, originX: 0 } },
    hover: { scaleX: 1, transition: { duration: 0.25, originX: 0 } },
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-black via-black to-[#800000] relative overflow-hidden text-gray-100 antialiased">

      {/* Background Stars Layer */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          boxShadow: stars,
          transformOrigin: "center",
        }}
        animate={{
          y: ["0%", "8%"],
          x: ["0%", "5%"],
          opacity: [0.85, 1, 0.85],
          rotate: [0, 0.1, 0],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
          repeatType: "mirror",
        }}
      />
      {/* Overlay for contrast */}
      <div className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-[12px]" />

      {/* Header Navbar */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="sticky top-0 z-50 bg-black/90 border-b border-gray-800 backdrop-blur-lg px-6 py-4 shadow-lg flex justify-center"
      >
        <nav className="flex items-center justify-between w-full max-w-7xl">
          {/* Logo */}
          <Link
            to="/dashboard"
            aria-label="Accueil Pegasio"
            className="flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400 rounded"
          >
            <motion.svg
              whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 300, damping: 12 }}
              className="w-11 h-11 text-red-400 group-focus-visible:ring-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </motion.svg>
            
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-8">
            {navLinks.map(({ to, label, icon }) => {
              const isActive = location.pathname === to;
              return (
                <motion.li
                  key={to}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <Link
                    to={to}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center text-lg font-semibold px-3 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400 transition-colors ${
                      isActive ? "text-red-400" : "text-gray-300 hover:text-red-400"
                    }`}
                  >
                    {icon}
                    <span>{label}</span>
                    {/* Underline animation */}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 rounded"
                      variants={underlineVariants}
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      whileHover="visible"
                    />
                  </Link>
                </motion.li>
              );
            })}

            {/* Logout button */}
            <motion.li
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#ff4d4d",
                boxShadow: "0 0 15px rgba(255,77,77,0.75)",
                color: "#fff",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full"
            >
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-2 px-5 py-2 font-bold bg-red-600 rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400 transition-colors"
                aria-label="Se déconnecter"
              >
                <motion.svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  whileHover={{ x: [0, 3, -3, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatType: "mirror" }}
                  aria-hidden="true"
                  role="img"
                >
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </motion.svg>
                <span>Déconnexion</span>
              </button>
            </motion.li>
          </ul>
        </nav>
      </motion.header>

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 130, damping: 16 }}
        className="flex-grow p-8 md:p-12 overflow-y-auto"
      >
        <motion.section
          className="max-w-7xl mx-auto bg-black/75 rounded-3xl backdrop-blur-lg p-10 border border-red-500 text-white transform-gpu"
          style={{
            boxShadow: "0 0 15px 4px rgba(255, 80, 80, 0.8)", // glow lumineux permanent
          }}
          whileHover={{
            boxShadow: "0 0 50px 6px rgba(255, 107, 107, 0.9), 0 0 30px rgba(0,0,0,0.9)",
            y: -5,
            transition: { duration: 0.3 },
          }}
        >
          <Outlet />
        </motion.section>
      </motion.main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-6 border-t border-gray-800 text-gray-400 text-center select-none text-sm"
        aria-label="Pied de page"
      >
        <motion.div
          animate={{
            opacity: [0.7, 1, 0.7],
            textShadow: [
              "0 0 5px transparent",
              "0 0 15px rgba(255, 107, 107, 0.5)",
              "0 0 5px transparent",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        >
          &copy; {new Date().getFullYear()} Pegasio. Tous droits réservés.
        </motion.div>
      </motion.footer>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <LogOutConfirmationModal
            onConfirm={handleLogout}
            onCancel={() => setShowLogoutModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserLayout;
