import { useState } from 'react';
import { User, LayoutDashboard, LogOut, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LogOutConfirmationModal from './LogOutConfirmationModal';

const Sidebar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Users', icon: User, path: '/admin/users' },
  ];

  return (
    <div 
      className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen p-4 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      } flex flex-col shadow-2xl relative`}
    >
      {/* Collapse button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="absolute top-5 -right-3 bg-indigo-600 hover:bg-indigo-700 rounded-full p-1 z-10 shadow-lg transition-all"
      >
        {isOpen ? (
          <Menu className="w-5 h-5 text-white transform rotate-90" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Logo/Brand */}
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-700">
        <div className="bg-indigo-600 p-2 rounded-lg flex-shrink-0">
          <LayoutDashboard className="w-6 h-6" />
        </div>
        {isOpen && (
          <div className="overflow-hidden transition-all">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-indigo-200 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-400">Management System</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:bg-indigo-900/50 group ${
              location.pathname === path 
                ? 'bg-indigo-900 shadow-md' 
                : ''
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
      <div className="mt-auto pt-4 border-t border-gray-700">
        {isOpen && currentUser && (
          <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-gray-800/50">
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

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <LogOutConfirmationModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;