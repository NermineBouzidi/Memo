
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Home, Users, Settings, Menu, X, LogOut } from "lucide-react";

const AdminLayout = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Simple logout for now - you can integrate with your auth system later
    navigate('/login');
  };

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: Home },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActivePath = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-red-500/20 to-pink-600/20 opacity-50 rounded-full blur-3xl animate-pulse top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-pink-500/20 to-red-600/20 opacity-30 rounded-full blur-3xl animate-pulse bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 z-0" />
      
      <div className="flex relative z-10">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-gray-800 dark:text-white hover:bg-white/20 transition-all duration-300"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="h-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border-r border-white/20 p-6">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <div className="mt-2 h-1 w-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      group flex items-center px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-red-500/20 to-pink-600/20 text-red-500 dark:text-pink-400 border border-red-500/30' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/10 hover:text-red-500 dark:hover:text-pink-400 border border-transparent hover:border-white/20'
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-600/10 rounded-xl"></div>
                    )}
                    <Icon size={20} className="mr-3 relative z-10" />
                    <span className="font-medium relative z-10">{item.label}</span>
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Logout button */}
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 border border-transparent hover:border-red-500/30 group"
              >
                <LogOut size={20} className="mr-3" />
                <span className="font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Content wrapper with glass effect */}
            <div className="bg-white/30 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl min-h-[calc(100vh-4rem)] p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Confirmer la déconnexion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
