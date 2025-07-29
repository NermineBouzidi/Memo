import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import MD5 from "crypto-js/md5";

const TAWKTO_CONFIG = {
  propertyId: '6887477fc99c121929b65a9c',
  widgetId: '1j186uig9',
  secretHash: import.meta.env.VITE_TAWKTO_SECRET_HASH
};

export default function LiveChatFab() {
  const { user } = useAuth();
  const location = useLocation();
  const [tawkInitialized, setTawkInitialized] = useState(false);
  const isSupportPage = location.pathname.includes('/support');

  const initializeTawk = () => {
    if (tawkInitialized || !user?._id) return;

    // Nettoyage préalable
    if (window.Tawk_API) {
      window.Tawk_API.hideWidget();
      delete window.Tawk_API;
    }

    const scriptId = `tawkto-script-${user._id}`;
    const existingScript = document.getElementById(scriptId);
    if (existingScript) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.src = `https://embed.tawk.to/${TAWKTO_CONFIG.propertyId}/${TAWKTO_CONFIG.widgetId}`;
    script.async = true;
    script.id = scriptId;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      configureTawkTo(user);
      setTawkInitialized(true);
    };

    document.body.appendChild(script);
  };

  const configureTawkTo = (currentUser) => {
    if (!window.Tawk_API || !currentUser?._id) return;

    const hash = MD5(currentUser._id + TAWKTO_CONFIG.secretHash).toString();

    // Réinitialisation complète de la session
   window.Tawk_API.onLoad = function() {
  const hash = MD5(currentUser._id + TAWKTO_CONFIG.secretHash).toString();

  window.Tawk_API.setVisitorData({
    name: currentUser.name || currentUser.email?.split('@')[0] || 'Visiteur',
    email: currentUser.email || 'no-email@example.com',
    hash: hash
  });

  window.Tawk_API.setAttributes({
    userId: currentUser._id.toString(),
    userRole: currentUser.role || 'user',
    lastLogin: new Date().toISOString()
  });
};

  };

  useEffect(() => {
    if (isSupportPage && user?._id) {
      initializeTawk();
      return () => {
        if (window.Tawk_API) {
          window.Tawk_API.hideWidget();
        }
      };
    } else {
      const tawkScripts = document.querySelectorAll('[id^="tawkto-script-"]');
      tawkScripts.forEach(script => script.remove());
      setTawkInitialized(false);
    }
  }, [isSupportPage, user]);

  const handleChatOpen = () => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle();
    } else {
      initializeTawk();
      setTimeout(handleChatOpen, 500);
    }
  };

  if (!isSupportPage || !user) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleChatOpen}
      className="fixed bottom-5 right-6 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg z-50"
    >
      💬 Support en direct
    </motion.button>
  );
}