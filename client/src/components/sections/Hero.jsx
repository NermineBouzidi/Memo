import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import backgroundImage from "../../assets/logo.png"; // Replace with your actual image

export default function HeroCRPMemo() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-outfit">
     <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="Portal CRP MEMO" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
      </div>

      {/* Dark Overlay */}

      {/* Hero Content */}
   <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">      
            <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-[#f1647c]"
        >
          CRP MEMO
        </motion.h1>
        

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-gray-700"
        >
          Le logiciel de gestion sur mesure qui révolutionne votre entreprise. <br />
          Entre standardisation et personnalisation, découvrez une solution unique adaptée à votre métier.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <a
            href="#"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg shadow-md text-lg font-semibold hover:opacity-90 transition duration-300"
          >
            Découvrir MEMO
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 text-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Demander une démo
          </a>
        </motion.div>
      </div>
      </div>

      {/* Scroll Indicator (centered like original) */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-pink-400 animate-bounce rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
