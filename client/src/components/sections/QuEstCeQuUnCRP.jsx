import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Settings,
  Users,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: <Building2 className="w-8 h-8 text-white" />,
    title: "Gestion Intégrée",
    description: "Centralisez tous vos processus métier dans une solution unique",
  },
  {
    icon: <Settings className="w-8 h-8 text-white" />,
    title: "Automatisation",
    description: "Automatisez vos tâches répétitives et gagnez en efficacité",
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Collaboration",
    description: "Facilitez la communication entre vos équipes",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    title: "Performance",
    description: "Suivez vos KPI en temps réel et optimisez vos résultats",
  },
];

export default function QuEstCeQuUnCRP() {
  return (
    <section className="py-28 px-6 md:px-12 bg-white text-gray-800">
      {/* Title and Description */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Qu’est-ce qu’un <span className="text-[#ef5d81]">CRP</span> ?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Un CRP (Customer Resource Planning) est un système de gestion intégré qui optimise tous les
          processus de votre entreprise, de la conception à la facturation, en passant par la production
          et le suivi client.
        </motion.p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * index, duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#ef718f] to-[#fca07a] flex items-center justify-center shadow-lg">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600 text-base">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
