import { useState } from 'react';
import {
  User, LayoutDashboard, LogOut, Menu,
  Package, MessageCircle, ShoppingBag, X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LogOutConfirmationModal from './LogOutConfirmationModal';

const Sidebar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Desktop sidebar expand/collapse
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile drawer toggle

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/' },
    { label: 'Users', icon: User, path: '/admin/users' },
    { label: 'Products', icon: Package, path: '/admin/products' },
    { label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { label: 'Messages', icon: MessageCircle, path: '/admin/messages' },
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <div
      className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white h-full flex flex-col shadow-2xl transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } ${isMobile ? 'fixed top-0 left-0 z-40 h-screen' : ''}`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg flex-shrink-0">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          {isOpen && (
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-indigo-200 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-xs text-gray-400">Management System</p>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} className="text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1 px-2 pt-4">
        {navItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={path}
            to={path}
            onClick={() => isMobile && setMobileOpen(false)}
            className={`flex items-center gap-4 p-3 rounded-lg hover:bg-indigo-900/50 group transition-all ${
              location.pathname === path ? 'bg-indigo-900' : ''
            }`}
          >
            <div className={`p-2 rounded-lg ${
              location.pathname === path
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            {isOpen && (
              <span className="font-medium text-gray-200 group-hover:text-white">
                {label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="mt-auto border-t border-gray-700 p-4">
        {isOpen && currentUser && (
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-600 rounded-full p-2">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-200">{currentUser.name}</p>
              <p className="text-xs text-gray-400 truncate max-w-[160px]">
                {currentUser.email}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-4 p-3 rounded-lg w-full hover:bg-red-900/50 transition-all group"
        >
          <div className="p-2 rounded-lg bg-gray-700 text-red-400 group-hover:bg-red-600 group-hover:text-white">
            <LogOut className="w-5 h-5" />
          </div>
          {isOpen && (
            <span className="font-medium text-gray-200 group-hover:text-white">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar (medium screens and up) */}
      <div className="hidden md:block">
        <div className="relative h-screen">
          {/* Collapse button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-5 -right-3 bg-indigo-600 hover:bg-indigo-700 rounded-full p-1 z-10 shadow-lg transition-all"
          >
            <Menu
              className={`w-5 h-5 text-white transition-transform ${
                isOpen ? 'rotate-90' : ''
              }`}
            />
          </button>
          <SidebarContent />
        </div>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <SidebarContent isMobile />
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
          />
        </>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogOutConfirmationModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
