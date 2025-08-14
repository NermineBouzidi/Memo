import React from "react";
import { motion } from "framer-motion";
import { Paintbrush, Settings, BarChart2, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";

const highlights = [
  {
    label: "highlights.pillar1.label",
    title: "highlights.pillar1.title",
    description: "highlights.pillar1.description",
    icon: <Paintbrush className="w-8 h-8 text-white" />,
    bg: "white",
    gradient: "from-[#ef5d81] to-[#fca07a]",
  },
  {
    label: "highlights.pillar2.label",
    title: "highlights.pillar2.title",
    description: "highlights.pillar2.description",
    icon: <Settings className="w-8 h-8 text-white" />,
    bg: "white",
    link: "/gestion-centralisee",
    gradient: "from-[#ef5d81] to-[#fca07a]",
  },
  {
    label: "highlights.pillar3.label",
    title: "highlights.pillar3.title",
    description: "highlights.pillar3.description",
    icon: <BarChart2 className="w-8 h-8 text-white" />,
    bg: "white",
    link: "/decision-temps-reel",
    gradient: "from-[#ef5d81] to-[#fca07a]",
  },
  {
    label: "highlights.pillar4.label",
    title: "highlights.pillar4.title",
    description: "highlights.pillar4.description",
    icon: <Calculator className="w-8 h-8 text-white" />,
    bg: "white",
    link: "/finance-automatisee",
    gradient: "from-[#ef5d81] to-[#fca07a]",
  },
];

export default function Highlights() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4 md:px-12">
      <div className="max-w-5xl mx-auto text-center mb-16">
    
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {t("highlights.title")} <span className="text-[#ef5d81]">MEMO</span> ?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-1xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {t("highlights.subtitle")}
        </motion.p>
      </div>

      {/* Tableau des highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {highlights.map((highlight, i) => (
          <motion.div
            key={i}
            className={`${highlight.bg} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i, duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center text-center flex-grow">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${highlight.gradient} flex items-center justify-center mb-4`}
              >
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a1a1a] whitespace-nowrap">
                {t(highlight.title)}
              </h3>
              <p className="text-gray-600 text-sm mb-4 px-auto leading-relaxed">
                {t(highlight.description)}
              </p>
            </div>
            <div className="flex justify-center"></div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
       
        <motion.div
          className="text-lg md:text-xl text-gray-700 mb-6 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t("highlights.cta.text1")}{" "}
          
            <span className="text-[#ef5d81] font-semibold">MEMO</span> {t("highlights.cta.text2")}
          
        </motion.div>
        <motion.a
          href="#contact"
          className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 
                     text-white font-bold rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#f25287]/50
                     transition"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {t("highlights.cta.button")}
        </motion.a>
      </div>
    </section>
  );
}