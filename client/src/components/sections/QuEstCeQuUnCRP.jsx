import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Zap, Users, BarChart2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const highlights = [
  {
    label: "crp.pillars.pillar1.label",
    title: "crp.pillars.pillar1.title",
    description: "crp.pillars.pillar1.description",
    icon: <LayoutDashboard className="w-8 h-8 text-white" />,
    bg: "white",
    link: "/centralisation",
    gradient: "from-[#ef5d81] to-[#fca07a]",
  },
  {
    label: "crp.pillars.pillar2.label",
    title: "crp.pillars.pillar2.title",
    description: "crp.pillars.pillar2.description",
    icon: <Zap className="w-8 h-8 text-white" />,
    bg: "white",
    link: "/automatisation",
    gradient: "from-[#ef5d81] to-[#fca07a]",
  },
  {
    label: "crp.pillars.pillar3.label",
    title: "crp.pillars.pillar3.title",
    description: "crp.pillars.pillar3.description",
    icon: <Users className="w-8 h-8 text-white" />,
    bg: "white",
    link: "/collaboration",
    gradient: "from-[#ef5d81] to-[#fca07a]",
  },
  {
    label: "crp.pillars.pillar4.label",
    title: "crp.pillars.pillar4.title",
    description: "crp.pillars.pillar4.description",
    icon: <BarChart2 className="w-8 h-8 text-white" />,
    bg: "white",
    link: "/pilotage",
    gradient: "from-[#ef5d81] to-[#fca07a]",
  },
];

export default function QuEstCeQuUnCRP() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4 md:px-12" id="crp">
      {/* Title */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {t("crp.title")} <span className="text-[#ef5d81]">MEMO</span>
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-1xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {t("crp.subtitle")}
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {highlights.map((highlight, i) => (
          <motion.div
            key={i}
            className={`${highlight.bg} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i, duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center text-center flex-grow min-h-[110px]">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${highlight.gradient} flex items-center justify-center mb-4`}
              >
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a1a1a] whitespace-nowrap">
                {t(highlight.title)}
              </h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {t(highlight.description)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <motion.div
          className="text-lg md:text-xl text-gray-700 mb-4 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t("crp.cta.text")}
        </motion.div>
        <motion.a
          href="#demo"
          className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 
                     text-white font-bold rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#f25287]/50
                     transition"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {t("crp.cta.button")}
        </motion.a>
      </div>
    </section>
  );
}