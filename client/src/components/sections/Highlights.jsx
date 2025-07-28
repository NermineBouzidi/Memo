import React from "react";
import { motion } from "framer-motion";
import { Paintbrush, Settings, BarChart2, Calculator } from "lucide-react";

const highlights = [
  {
    title: "Conception sur mesure",
    description:
      "Adaptée à l'activité et organisation de l'entreprise. Chaque solution est pensée pour répondre aux spécificités de votre métier et de vos processus.",
    icon: Paintbrush,
    gradient: "from-pink-500 to-orange-400",
  },
  {
    title: "Gestion intégrale",
    description:
      "Devis, facture, suivi de production, marge, suivi des coûts, gestion fournisseurs, suivi impayé et recouvrement. Tout en un seul endroit.",
    icon: Settings,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Statistiques et KPI",
    description:
      "Tableaux de bord en temps réel, analyses poussées et indicateurs personnalisés pour piloter votre activité avec précision.",
    icon: BarChart2,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Suite comptable",
    description:
      "Module comptable et financier intégré pour une gestion complète de vos finances d'entreprise et un suivi budgétaire optimal.",
    icon: Calculator,
    gradient: "from-green-500 to-blue-500",
  },
];

export default function Highlights() {
  return (
    <section className="py-20 font-outfit">
            <div className="container mx-auto px-4">

      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold mb-3"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Les 4 points forts de <span className="text-pink-500">MEMO</span>
        </motion.h1>
        <motion.p
          className="text-gray-600 text-base sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Découvrez pourquoi MEMO se distingue comme la solution de gestion idéale
          pour votre entreprise
        </motion.p>
      </div>

        <div className="grid md:grid-cols-2 gap-8">
        {highlights.map(({ title, description, icon: Icon, gradient }, index) => (
          <motion.article
            key={index}
            className="flex space-x-5 bg-white border border-transparent rounded-lg p-6 shadow-sm hover:shadow-md transition"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * index, duration: 0.6, ease: "easeOut" }}
          >
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-tr ${gradient} flex items-center justify-center text-white`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          </motion.article>
        ))}
      </div>
      </div>
    </section>
  );
}
