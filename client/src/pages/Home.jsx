import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import Highlights from '../components/sections/Highlights';
import ProductDefinition from '../components/sections/ProductDefinition';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import INPISection from '../components/sections/INPISection';
import QuEstCeQuUnCRP from '../components/sections/QuEstCeQuUnCRP';
import Etapes from '../components/sections/Etapes';
import Tarifs from '../components/sections/Tarifs';
import Contact from '../components/sections/Contact';
import VideoDemo from '../components/sections/VideoDemo';
import Chatbot from '../components/sections/chatbot';
import React, { useState } from 'react';
import Support from './Support';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { CalendarPlus, MessageCircle } from 'lucide-react';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleDemoClick = () => {
    navigate('/demo');
  };

  return (
    <>
      <div className="relative">
        <Navbar />
        <Hero />
        <div className="relative"><div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#121458] to-transparent opacity-10"></div></div>
        <QuEstCeQuUnCRP />
        <div className="relative"><div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#121458] to-transparent opacity-10"></div></div>
        <Highlights />
        <div className="relative"><div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#121458] to-transparent opacity-10"></div></div>
        <ProductDefinition />
        <div className="relative"><div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#121458] to-transparent opacity-10"></div></div>
        <VideoDemo />
        <div className="relative"><div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#121458] to-transparent opacity-10"></div></div>
        <Etapes />
        <div className="relative"><div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#121458] to-transparent opacity-10"></div></div>
        <Tarifs />
        {/* No separator after Tarifs since it's the last section before the floating buttons */}
        
        <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: [0, -8, 0],
            }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.5,
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative group"
            whileHover={{ y: 0 }}
          >
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-3 py-2 bg-white text-sm font-medium text-gray-900 rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-gray-100">
              Prendre rendez-vous
              <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-gray-100"></div>
            </div>
            <motion.button
              onClick={handleDemoClick}
              className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl bg-gradient-to-r from-pink-500 to-orange-400 hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Réserver une démonstration"
            >
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-300/70 via-transparent to-transparent"></div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: [1, 1.3], opacity: [0.7, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <CalendarPlus className="w-8 h-8 text-white transition-transform group-hover:rotate-[-5deg] group-hover:scale-110" strokeWidth={2} />
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.8 }}
          >
            <motion.button
              onClick={toggleChat}
              className="flex items-center justify-center w-14 h-14 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-7 h-7 text-white" strokeWidth={2} />
            </motion.button>
          </motion.div>
        </div>
        <Chatbot isChatOpen={isChatOpen} toggleChat={toggleChat} />
      </div>
    </>
  );
}