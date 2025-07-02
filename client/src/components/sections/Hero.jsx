import { useState } from "react";
import { ArrowRight, ArrowDown, ChevronDown, ChevronUp, Target, Users, Lightbulb, Rocket, Settings, Brain, DollarSign, Receipt } from "lucide-react";

const services = [
  {
    icon: <Settings className="text-orange-600 dark:text-orange-400" size={32} />,
    emoji: "🔧",
    title: "Gestion de Projets / Job Manager",
    preview: "Pilotage de projets, chantiers, missions, jobs (TPE/PME, BTP, agences, etc.). Suivi en temps réel de la performance de l'entreprise et des collaborateurs.",
    details: [
      "Gestion multi-entités avec transversalité des fonctionnalités",
      "Génération d'écritures comptables liées aux projets",
      "Centralisation des informations projet : délais, coûts, livrables, marges",
      "Module de planification, affectation des ressources et contrôle qualité",
      "Suivi budgétaire et analytique par job/projet"
    ]
  },
  {
    icon: <Brain className="text-blue-600 dark:text-blue-400" size={32} />,
    emoji: "🧠",
    title: "CRM (Gestion de la relation client)",
    preview: "Gestion des prospects et des clients. Suivi des devis, commandes, contrats. Pipeline commercial visuel et interactif.",
    details: [
      "Relances automatiques et historiques des interactions",
      "Intégration directe avec la facturation et la comptabilité",
      "Uniformisation des process commerciaux"
    ]
  },
  {
    icon: <DollarSign className="text-green-600 dark:text-green-400" size={32} />,
    emoji: "💰",
    title: "Comptabilité & Finance",
    preview: "Génération d'écritures comptables automatiques (ventes, achats, provisions). Synchronisation des données avec les outils comptables.",
    details: [
      "Analyse financière par projet, client, équipe ou entité",
      "Préparation à la facturation électronique (obligatoire en 2027)",
      "GED intégrée (gestion documentaire numérique)",
      "Réduction des délais de facturation et de paiement"
    ]
  },
  {
    icon: <Receipt className="text-purple-600 dark:text-purple-400" size={32} />,
    emoji: "🧾",
    title: "Facturation & Paiements",
    preview: "Facturation automatisée à partir des bons de commande ou livrables. Historique des paiements, alertes sur les impayés.",
    details: [
      "Modèles de factures paramétrables",
      "Export des données vers plateformes fiscales",
      "Réduction du cycle facturation → encaissement"
    ]
  }
];

export default function Hero() {
  const [expanded, setExpanded] = useState(Array(services.length).fill(false));

  const toggleExpand = idx => {
    setExpanded(expanded => expanded.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-blue-900"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
      </div>

      {/* Hero Header */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 text-center py-20">
        <div className="max-w-4xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Bienvenue sur PEGASIO
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10">
            La plateforme intelligente pour gérer vos projets efficacement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
              Commencer
              <ArrowRight size={20} />
            </button>
            <button className="bg-white border-2 border-red-600 text-red-600 px-8 py-4 rounded-full hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              En savoir plus
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections with Images */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Produit détaillé */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full mr-4">
                  <Target className="text-red-600 dark:text-red-400" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Produit détaillé
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                CRP MEMO est une application web innovante conçue pour répondre aux besoins spécifiques des TPE/PME dans la gestion de projets, chantiers et missions ponctuelles. Contrairement aux outils traditionnels souvent segmentés entre CRM (orientés commercial) ou job managers (orientés production), MEMO fusionne les deux univers.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mt-4">
                Il permet à un agent projet de piloter l'ensemble du cycle opérationnel : lancement, facturation, suivi comptable et financier. Cet outil hybride propose une flexibilité fonctionnelle avec 60 à 70 % de modules standards ajustables et 30 à 40 % de spécifiques métiers.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Application de gestion de projets"
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-red-600 text-white p-4 rounded-xl shadow-lg">
                  <span className="font-bold text-2xl">CRP MEMO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nos Services Section */}
        <div id="nos-services" className="mb-20 animate-fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
              Nos Services
              <ArrowDown size={28} className="text-blue-600 animate-bounce" />
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Une suite complète d'outils pour optimiser la gestion de votre entreprise
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group relative overflow-hidden"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 dark:from-blue-900/20 dark:via-orange-900/20 dark:to-purple-900/20 p-4 rounded-full mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <span className="text-2xl mb-2 block">{service.emoji}</span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
                  {service.preview}
                  {expanded[idx] && (
                    <ul className="mt-3 list-disc list-inside text-base text-gray-600 dark:text-gray-400 space-y-1 animate-fade-in">
                      {service.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 font-medium transition-colors group w-full justify-center bg-blue-50 dark:bg-blue-900/20 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 mt-2"
                  onClick={() => toggleExpand(idx)}
                  aria-expanded={expanded[idx]}
                  aria-controls={`service-details-${idx}`}
                >
                  {expanded[idx] ? "Réduire" : "Lire plus"}
                  {expanded[idx] ? (
                    <ChevronUp size={18} className="transition-transform" />
                  ) : (
                    <ChevronDown size={18} className="transition-transform" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Qui sommes-nous */}
        <div id="qui-sommes-nous" className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Équipe collaborative"
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg">
                  <Users size={32} />
                </div>
              </div>
            </div>
            <div className="order-2">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full mr-4">
                  <Users className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Qui sommes-nous ?
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                Le projet CRP MEMO est porté par deux partenaires stratégiques. Habile Solutions SAS, basée à Paris, est détentrice de la marque CRP MEMO et en assure la distribution.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mt-4">
                Pegasio International / Equity Business, basée à Tunis, est le partenaire exclusif en charge du développement informatique. Cette collaboration allie expertise métier, excellence technologique, et proximité client pour offrir une solution performante et évolutive.
              </p>
            </div>
          </div>
        </div>

        {/* Pourquoi choisir Pegasio */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full mr-4">
                  <Lightbulb className="text-green-600 dark:text-green-400" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Pourquoi choisir Pegasio ?
                </h2>
              </div>
              <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 text-lg">
                <li>Une expertise reconnue dans les secteurs du BTP, immobilier, énergie et services</li>
                <li>Une équipe passionnée par l'innovation et la performance</li>
                <li>Un accompagnement personnalisé et une écoute attentive</li>
                <li>Une solution flexible et évolutive adaptée aux besoins spécifiques</li>
                <li>Des résultats concrets et mesurables pour votre entreprise</li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Innovation and teamwork"
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-green-600 text-white p-4 rounded-xl shadow-lg">
                  <Rocket size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}