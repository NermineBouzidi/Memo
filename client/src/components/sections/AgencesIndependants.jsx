import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import agencesImage from '../../assets/Agences&Indépendants.png';

export default function AgencesIndependants() {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const imageContainerRef = useRef(null);

  const challenges = [
    "agences.challenge.item1",
    "agences.challenge.item2",
    "agences.challenge.item3",
    "agences.challenge.item4"
  ];

  const solutions = [
    "agences.solution.item1",
    "agences.solution.item2",
    "agences.solution.item3",
    "agences.solution.item4"
  ];

  // Match image container height to card height
  useEffect(() => {
    const updateHeight = () => {
      if (cardRef.current && imageContainerRef.current) {
        const cardHeight = cardRef.current.getBoundingClientRect().height;
        imageContainerRef.current.style.height = `${cardHeight}px`;
      }
    };

    // Delay to ensure rendering is complete
    const timer = setTimeout(updateHeight, 0);
    window.addEventListener('resize', updateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <section className="py-24 px-4 md:px-12 bg-[#f9fafb]">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {t("agences.title")}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 max-w-1xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {t("agences.subtitle")}
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto">
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div ref={imageContainerRef} className="relative w-full">
            <img 
              src={agencesImage} 
              alt={t("agences.title")} 
              className="rounded-2xl shadow-lg w-full h-full object-cover hover:shadow-xl transition-all duration-300"
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div ref={cardRef} className="bg-white rounded-2xl shadow-sm px-8 py-10 hover:shadow-lg transition-all duration-300">
            <motion.h2
              className="text-3xl font-bold mb-8 text-gray-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
            </motion.h2>
            
            <div className="mb-10">
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ef5d81] to-[#fca07a] flex items-center justify-center text-white text-xl font-bold mr-4">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 tracking-tight">{t("agences.challenge.title")}</h3>
              </motion.div>
              <ul className="space-y-4 pl-16">
                {challenges.map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start text-lg text-black-700"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i*0.1, duration: 0.5 }}
                  >
                    <span className="text-[#ef5d81] mr-3">•</span>
                    <span>{t(item)}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ef5d81] to-[#fca07a] flex items-center justify-center text-white text-xl font-bold mr-4">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 tracking-tight">{t("agences.solution.title")}</h3>
              </motion.div>
              <ul className="space-y-4 pl-16">
                {solutions.map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start text-lg text-black-700"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i*0.1, duration: 0.5 }}
                  >
                    <span className="text-[#ef5d81] mr-3">•</span>
                    <span>{t(item)}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}