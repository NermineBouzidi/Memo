import React from "react";
import { motion } from "framer-motion";
import { Building, HardHat, PenTool, Factory } from "lucide-react";

const sectors = [
  {
    icon: <Building className="w-8 h-8 text-white" />,
    title: "PME de services",
    description: "MEMO structure vos opérations, du devis au paiement",
    bg: "white",
    link: "/pme-services",
  },
  {
    icon: <HardHat className="w-8 h-8 text-white" />,
    title: "BTP & architecture",
    description: "Gérez vos chantiers, marges, sous-traitants et DGD",
    bg: "white",
    link: "/btp-architecture",
  },
  {
    icon: <PenTool className="w-8 h-8 text-white" />,
    title: "Agences & indépendants",
    description: "Suivez vos missions, centralisez vos documents, gagnez du temps",
    bg: "white",
    link: "/agences-independants",
  },
  {
    icon: <Factory className="w-8 h-8 text-white" />,
    title: "Industrie & production",
    description: "Contrôlez vos flux, vos coûts et votre performance en temps réel",
    bg: "white",
    link: "/industrie-production",
  },
];

export default function PourQui() {
  return (
    <section className="py-24 px-4 md:px-12 bg-[#f9fafb]" id="pour-qui">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Pour qui?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
            Une solution personnalisée pour votre métier
        </motion.p>
      </div>

      {/* Tableau des secteurs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {sectors.map((sector, i) => (
          <motion.div
            key={i}
            className={`${sector.bg} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i, duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center text-center flex-grow min-h-[110px]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ef5d81] to-[#fca07a] flex items-center justify-center mb-4">
                {sector.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a1a1a] whitespace-nowrap">{sector.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{sector.description}</p>
            </div>
            <div className="flex justify-center">
              <a
                href={sector.link}
                className="text-[#ef5d81] font-medium hover:text-[#d04a6d] transition-colors"
              >
                En savoir plus
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}