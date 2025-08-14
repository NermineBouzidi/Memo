import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import{ CalendarCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// ===== Icônes SVG =====
const HomeIcon = ({ size = 22, className = '' }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const UserIcon = ({ size = 22, className = '' }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
    <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const FileTextIcon = ({ size = 22, className = '' }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const CreditCardIcon = ({ size = 22, className = '' }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const GraduationCapIcon = ({ size = 22, className = '' }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
    <path d="M22 10l-10-5-10 5 10 5 10-5z"></path>
    <path d="M6 12v5c3 1 9 1 12 0v-5"></path>
  </svg>
);

const HelpCircleIcon = ({ size = 22, className = '' }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12" y2="17"></line>
  </svg>
);

// ===== Composant NavItem =====
const NavItem = ({ icon: IconComponent, text, active, to, onClick, sidebarOpen, theme }) => (
  <Link to={to} className="block" onClick={onClick}>
    <div className={`flex items-center p-4 my-2 mx-3 rounded-xl transition-all duration-300
      ${active ? 'bg-gradient-to-r from-red-600 to-red-600 text-white shadow-lg' :
        theme === 'dark' 
          ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-900/50 hover:to-red-800/50' 
          : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500/50 hover:to-red-600/50'}
      hover:scale-[1.02] hover:shadow-md`}>
      <div className="mr-3 relative"
        style={{
          transform: active ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
        }}>
        <IconComponent className={`${active ? 'text-white' : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} drop-shadow-md`} />
      </div>
      <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-out
        ${sidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
        {text}
      </span>
    </div>
  </Link>
);

// ===== Composant Sidebar =====
const AsideBarClient = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const activeTab = location.pathname.split('/').pop() || 'dashboard';
  const { theme } = useTheme();
  const [hoverRight, setHoverRight] = useState(false);
  const effectiveOpen = sidebarOpen || hoverRight;
  const { user } = useAuth(); // Assuming you have an auth context
  const userEmail = user?.email || '';
  const userId= user?._id || '';

  const menuItems = [
    { icon: HomeIcon, text: "Dashboard", to: "/home/dashboard" },
    
   { 
      icon: CalendarCheck, 
      text: "Mes RDV", 
      to: `/home/rdv-client/${encodeURIComponent(userEmail)}` 
    },
    { icon: FileTextIcon, text: "Mes Devis", to: `/home/documents/client-devis/${user._id}` },
    { icon: CreditCardIcon, text: "Paiement", to: "/home/paiements" },
    
    { icon: HelpCircleIcon, text: "Support", to: "/home/support" }
  ];
   
   

  const handleItemClick = () => {
    if (!sidebarOpen) setSidebarOpen(true);
  };

  return (
    <div
  className={`fixed top-16 left-0 h-[calc(100%-4rem)] z-40 flex flex-col backdrop-blur-sm border-r transition-colors duration-300 ${
    theme === 'dark' 
      ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border-gray-700' 
      : 'bg'
  }`}
  style={{
    width: effectiveOpen ? 280 : 90,
    transition: 'width 0.3s ease',
  }}
>
  {/* Logo / espace réservé */}
  <div className={` flex items-center justify-center border-b ${theme === 'dark' ? 'border-gray-700' : 'border-red-200'}`}>
    <div className={effectiveOpen ? 'h-40' : 'h-20'} />
  </div>

  {/* Menu */}
  <nav className="mt-1 flex-1 overflow-y-auto px-2 pb-4">
    {menuItems.map((item) => (
      <NavItem
        key={item.text}
        icon={item.icon}
        text={item.text}
        active={activeTab === item.to.split('/').pop()}
        to={item.to}
        onClick={handleItemClick}
        sidebarOpen={effectiveOpen}
        theme={theme}
      />
    ))}
  </nav>

  {/* Zone hover */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: 5,
      height: '100%',
      cursor: 'ew-resize',
      zIndex: 100,
    }}
    onMouseEnter={() => setHoverRight(true)}
    onMouseLeave={() => setHoverRight(false)}
  />
</div>

  );
};

export default AsideBarClient;
