import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, BellRing, DollarSign, FileText, BarChart } from 'lucide-react';
import IllustrationMEMO from '../../assets/benefice.jpg'; // Adjust the path as necessary

const benefits = [
  {
    icon: <Clock className="w-5 h-5 text-white" />,
    title: '47 % de délais de formalités en moins',
    desc: 'Vos démarches sont traitées 2× plus vite',
  },
  {
    icon: <BellRing className="w-5 h-5 text-white" />,
    title: '100 % de relances automatisées',
    desc: 'Plus d’oublis ni de mails manuels',
  },
  {
    icon: <DollarSign className="w-5 h-5 text-white" />,
    title: 'Moins de retards de paiement',
    desc: 'Vos clients paient plus vite',
  },
  {
    icon: <FileText className="w-5 h-5 text-white" />,
    title: 'Zéro dossier perdu',
    desc: 'Suivi centralisé, documents sécurisés',
  },
  {
    icon: <BarChart className="w-5 h-5 text-white" />,
    title: 'Vision claire : CA, marge, indicateurs',
    desc: 'Décisions + rapides, + efficaces',
  },
];

const SectionGainsMEMO = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const textY = useTransform(scrollYProgress, [0, 1], ['40px', '-40px']);
  const illustrationY = useTransform(scrollYProgress, [0, 1], ['-40px', '40px']);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <motion.section
      ref={ref}
      className="w-full py-20 px-2 md:px-24 overflow-hidden"
      style={{ scale: sectionScale }}
    >
      {/* Titre centré */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="w-full text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1d]">
          Ce que <span className="text-[#f72585]">MEMO</span> vous fait réellement gagner
        </h2>
        <p className="text-[#444] mt-2 text-lg">
          Moins d'oublis. Moins de stress. Plus de cash et de visibilité.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative">
        {/* Fond quadrillage */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(#f72585_1px,transparent_1px)] [background-size:18px_18px] opacity-10 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Texte + Liste */}
        <motion.div style={{ y: textY }} className="flex-1 space-y-10 relative z-10">
          {/* Cartes style Results */}
          <div className="space-y-6">
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ef5d81] to-[#fca07a] flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e1e1e]">{item.title}</h3>
                  <p className="text-sm text-[#666]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          style={{ y: illustrationY }}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex-1 relative flex justify-center z-10"
        >
          <img
            src={IllustrationMEMO}
            alt="Illustration bénéfices MEMO"
            className="w-full max-w-md drop-shadow-xl"
          />

          {/* Badges */}
          <motion.div
            className="absolute top-4 right-0 flex flex-col gap-2"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
          >
            <motion.span
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs px-3 py-1 rounded-full"
              whileHover={{ scale: 1.1 }}
            >
              + de visibilité
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs px-3 py-1 rounded-full"
              whileHover={{ scale: 1.1 }}
            >
              + de cash
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs px-3 py-1 rounded-full"
              whileHover={{ scale: 1.1 }}
            >
              + de temps
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bouton CTA centré - déplacé en bas de la section */}
      <motion.div
        className="w-full text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <a
          href="#temoignages"
          className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 
                 text-white font-bold rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#f25287]/50
                 transition hover:scale-105"
        >
          Ils en parlent mieux que nous
        </a>
      </motion.div>
    </motion.section>
  );
};
export default SectionGainsMEMO;