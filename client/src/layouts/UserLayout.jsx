import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import LogOutConfirmationModal from "../components/LogOutConfirmationModal";
import AsideBarClient from "../pages/user/AsideBarClient";

const UserLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Largeurs sidebar et espace entre sidebar et contenu
  const sidebarWidthOpen = 280;
  const sidebarWidthClosed = 90;
  const space = 20;

  return (
    <div className="min-h-screen font-sans bg-white relative overflow-hidden text-gray-900 antialiased">
      <div className="flex">
        <AsideBarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Zone "hover gauche" pour rétracter la sidebar */}
        {sidebarOpen && (
          <div
            onMouseEnter={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: sidebarWidthOpen,
              width: space,
              height: '100vh',
              zIndex: 50,
              cursor: 'ew-resize',
              backgroundColor: 'transparent',
            }}
          />
        )}

        {/* Contenu principal avec marge gauche = largeur sidebar + espace */}
        <motion.main
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 130, damping: 16 }}
          className="flex-1 transition-all duration-300"
          style={{
            marginLeft: sidebarOpen ? sidebarWidthOpen + space : sidebarWidthClosed + space,
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </motion.main>
      </div>

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
