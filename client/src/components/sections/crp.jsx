import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Zap,
  Users,
  BarChart2,
  FileText,
  DollarSign,
} from "lucide-react";
import solutionImage from "../../assets/solution.jpg";
import { CheckCircle, Puzzle, Layers3, Headset, ToggleLeft } from "lucide-react";


export default function CRPDefinition() {
  const features = [
    {
      icon: <LayoutDashboard className="w-6 h-6 text-white" />,
      title: "Projets & chantiers",
      desc: "Planification et suivi des ressources par projet",
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "Devis & facturation",
      desc: "Génération automatique et suivi des paiements",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-white" />,
      title: "Comptabilité automatisée",
      desc: "Rapprochement bancaire et exports comptables",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Achats & fournisseurs",
      desc: "Gestion des commandes et relations fournisseurs",
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-white" />,
      title: "KPIs & pilotage",
      desc: "Tableaux de bord personnalisables en temps réel",
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "RH & notes de frais",
      desc: "Gestion des équipes et dépenses professionnelles",
    },
  ];

 const whyMemo = [
  {
    icon: <Puzzle className="w-5 h-5 text-white" />,
    text: "Solution sur cahier des charges",
  },
  {
    icon: <ToggleLeft className="w-5 h-5 text-white" />,
    text: "Modules activables à la carte",
  },
  {
    icon: <Layers3 className="w-5 h-5 text-white" />,
    text: "Sans abonnement, sans engagement",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-white" />,
    text: "Jusqu'à 3x moins cher qu'un ERP sur mesure",
  },
  {
    icon: <Headset className="w-5 h-5 text-white" />,
    text: "Support technique illimité",
  },
];
  return (
    <section className="py-24 px-4 md:px-12 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto">
        {/* Titre principal */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-[#ef5d81]">MEMO</span> CRP : L'essentiel sans la complexité
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            La puissance d'un ERP couplée à l'agilité d'un CRM, spécialement conçu pour les PME
          </p>
        </motion.div>

        {/* Définition CRP */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-10 mb-20 hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ef5d81] to-[#fca07a] flex items-center justify-center text-white text-2xl font-bold mr-6">
              ?
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Qu'est-ce qu'un CRP ?</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Un <strong>CRP (Customer Resource Planning)</strong> allie la puissance d'un ERP à l'agilité d'un CRM.
                MEMO centralise les processus métiers, s'adapte à vos méthodes de travail, et reste simple à utiliser.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pourquoi choisir MEMO */}
        <motion.div
  id="pourquoi-memo"
  className="mb-24"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3, duration: 0.6 }}
>
  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
    Pourquoi choisir <span className="text-[#ef5d81]">MEMO</span> ?
  </h2>

  <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
    {/* Cartes à gauche */}
    <div className="w-full lg:w-1/2 flex flex-col gap-5">
      {whyMemo.map((item, i) => (
        <motion.div
          key={i}
          className="flex items-center bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ef5d81] to-[#fca07a] flex items-center justify-center mr-4">
            {item.icon}
          </div>
          <h3 className="text-md font-semibold text-gray-800">{item.text}</h3>
        </motion.div>
      ))}
    </div>

    {/* Image à droite */}
     <motion.div
                  whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative  lg:w-1/2 w-full aspect-[4/3] max-h-[600px] md:max-h-[600px]"
                >
                  <img
                    src={solutionImage}
                    alt="CRP MEMO Office Scene"
                    className="w-full h-full object-cover rounded-xl shadow-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                  />
                </motion.div>
              
  </div>
</motion.div>



        {/* Fonctionnalités clés */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Fonctionnalités clés</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col text-center items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ef5d81] to-[#fca07a] flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
