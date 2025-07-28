import React from "react";
import { Palette, Shield, Wrench } from "lucide-react";

const tarifs = [
  {
      icon: Palette,
      title: "La Conception",
      description: "Développement sur mesure de votre solution MEMO adaptée à votre métier et organisation",
      features: [
        "Analyse métier approfondie",
        "Cahier des charges personnalisé", 
        "Développement spécifique",
        "Tests et validation",
        "Formation des équipes"
      ],
      note: "Tarification au forfait selon le périmètre défini"
    },
    {
      icon: Shield,
      title: "Les DUL (Droits d'Utilisation Logicielle)",
      description: "Licence d'utilisation perpétuelle de votre solution MEMO sans contrainte de durée",
      features: [
        "Droits perpétuels",
        "Aucune récurrence",
        "Utilisation illimitée",
        "Mises à jour incluses",
        "Propriété de la licence"
      ],
      note: "Investissement unique selon le nombre d'utilisateurs"
    },
    {
      icon: Wrench,
      title: "Maintenance & Hébergement",
      description: "Support technique, hébergement sécurisé et évolutions de votre solution MEMO",
      features: [
        "Hébergement sécurisé",
        "Support technique illimité",
        "Sauvegardes automatiques",
        "Mises à jour sécurité",
        "Monitoring 24/7"
      ],
      note: "Tarif mensuel fixe, aucun engagement de durée"
    }
  ];

export default function Tarifs() {
  return (
    <div className="bg-white text-gray-900 font-[Inter] min-h-screen">
     

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <section className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Structure de <span className="text-pink-500">coûts</span> transparente
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Une approche claire et prévisible pour votre budget, avec des tarifs au forfait sans surprise
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {tarifs.map((card, idx) => (
            <article
              key={idx}
              className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300"
            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 text-white">
<card.icon className="w-8 h-8 text-white" />              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{card.title}</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs">{card.description}</p>
              <ul className="text-gray-900 text-sm mb-6 space-y-2 max-w-xs text-left">
                {card.features.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-pink-100 text-pink-600 text-xs sm:text-sm font-semibold rounded-md py-3 px-6 max-w-xs">
                {card.note}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
