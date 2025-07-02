import { ArrowRight, Target, Users, Lightbulb, Rocket, Settings, Brain, DollarSign, Receipt } from "lucide-react";

export default function Hero() {
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
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Une suite complète d'outils pour optimiser la gestion de votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Gestion de Projets */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-full mr-4">
                  <Settings className="text-orange-600 dark:text-orange-400" size={32} />
                </div>
                <div>
                  <span className="text-2xl mb-2 block">🔧</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Gestion de Projets / Job Manager
                  </h3>
                </div>
              </div>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• Pilotage de projets, chantiers, missions, jobs (TPE/PME, BTP, agences, etc.)</p>
                <p>• Suivi en temps réel de la performance de l'entreprise et des collaborateurs</p>
                <p>• Gestion multi-entités avec transversalité des fonctionnalités</p>
                <p>• Génération d'écritures comptables liées aux projets</p>
                <p>• Centralisation des informations projet : délais, coûts, livrables, marges</p>
                <p>• Module de planification, affectation des ressources et contrôle qualité</p>
                <p>• Suivi budgétaire et analytique par job/projet</p>
              </div>
            </div>

            {/* CRM */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-full mr-4">
                  <Brain className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <div>
                  <span className="text-2xl mb-2 block">🧠</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    CRM (Gestion de la relation client)
                  </h3>
                </div>
              </div>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• Gestion des prospects et des clients</p>
                <p>• Suivi des devis, commandes, contrats</p>
                <p>• Pipeline commercial visuel et interactif</p>
                <p>• Relances automatiques et historiques des interactions</p>
                <p>• Intégration directe avec la facturation et la comptabilité</p>
                <p>• Uniformisation des process commerciaux</p>
              </div>
            </div>

            {/* Comptabilité & Finance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full mr-4">
                  <DollarSign className="text-green-600 dark:text-green-400" size={32} />
                </div>
                <div>
                  <span className="text-2xl mb-2 block">💰</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Comptabilité & Finance
                  </h3>
                </div>
              </div>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• Génération d'écritures comptables automatiques (ventes, achats, provisions)</p>
                <p>• Synchronisation des données avec les outils comptables</p>
                <p>• Analyse financière par projet, client, équipe ou entité</p>
                <p>• Préparation à la facturation électronique (obligatoire en 2027)</p>
                <p>• GED intégrée (gestion documentaire numérique)</p>
                <p>• Réduction des délais de facturation et de paiement</p>
              </div>
            </div>

            {/* Facturation & Paiements */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-full mr-4">
                  <Receipt className="text-purple-600 dark:text-purple-400" size={32} />
                </div>
                <div>
                  <span className="text-2xl mb-2 block">🧾</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Facturation & Paiements
                  </h3>
                </div>
              </div>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• Facturation automatisée à partir des bons de commande ou livrables</p>
                <p>• Historique des paiements, alertes sur les impayés</p>
                <p>• Modèles de factures paramétrables</p>
                <p>• Export des données vers plateformes fiscales</p>
                <p>• Réduction du cycle facturation → encaissement</p>
              </div>
            </div>
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
                <li>Une équipe passionnée par l’innovation et la performance</li>
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
