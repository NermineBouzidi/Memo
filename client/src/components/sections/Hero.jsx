import { useState, useEffect } from "react";
import { ArrowRight, ArrowDown, ChevronDown, ChevronUp, Target, Users, Lightbulb, Rocket, Settings, Brain, DollarSign, Receipt, Sparkles, BarChart2, Clock, ShieldCheck, Zap, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

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

const stats = [
  { value: "95%", label: "Satisfaction clients", icon: <Sparkles className="text-yellow-500" /> },
  { value: "40%", label: "Gain de temps", icon: <Clock className="text-blue-500" /> },
  { value: "30%", label: "Augmentation productivité", icon: <BarChart2 className="text-green-500" /> },
  { value: "100%", label: "Sécurité des données", icon: <ShieldCheck className="text-purple-500" /> }
];

export default function Hero() {
  const [expanded, setExpanded] = useState(Array(services.length).fill(false));
  const [currentImage, setCurrentImage] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const images = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const apiUrl = 'http://localhost:8080'; // URL fixe pour test
        console.log("Fetching messages from:", `${apiUrl}/api/messages`);
        const response = await axios.get(`${apiUrl}/api/messages`, { withCredentials: true });
        setMessages(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error.message, error.response ? error.response.data : '');
      }
    };
    fetchMessages();
  }, []);

  const toggleExpand = (idx) => {
    setExpanded((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      content: newMessage,
      sender: "user",
    };

    console.log("Tentative d'envoi:", messageData);
    try {
      const apiUrl = 'http://localhost:8080'; // URL fixe pour test
      console.log("Envoi vers:", `${apiUrl}/api/messages`);
      const response = await axios.post(`${apiUrl}/api/messages`, messageData, { withCredentials: true });
      console.log("Réponse du serveur:", response.data);
      setMessages([...messages, response.data.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error.message, error.response ? error.response.data : '');
    }
  };

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-blue-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 dark:bg-blue-800 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 dark:bg-orange-800 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 dark:bg-purple-800 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Header */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 text-center py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6">
            <Zap className="mr-2" size={18} />
            <span>Nouvelle version disponible</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">PEGASIO</span> - Votre Partenaire Digital
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            La plateforme intelligente qui révolutionne la gestion de vos projets avec des outils intégrés et une interface intuitive conçue pour booster votre productivité.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 shadow-lg flex items-center gap-2"
              aria-label="Commencer gratuitement"
            >
              Commencer gratuitement
              <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border-2 border-red-600 text-red-600 px-8 py-4 rounded-full hover:bg-red-50 transition-all duration-300 shadow-lg flex items-center gap-2"
              aria-label="Voir la démo"
            >
              Voir la démo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Floating stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl px-4"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                {stat.icon}
                <span className="ml-2 text-sm">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Content Sections with Images */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Produit détaillé */}
        <div className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
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
                
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Gestion de projets", "CRM intégré", "Comptabilité", "Facturation", "Analytics"].map((feature, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={images[currentImage]}
                    alt="Application de gestion de projets"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${currentImage === index ? 'bg-red-600 w-6' : 'bg-gray-300'}`}
                      aria-label={`Aller à la diapositive ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="absolute -bottom-4 -right-4 bg-red-600 text-white p-4 rounded-xl shadow-lg z-10">
                  <span className="font-bold text-2xl">CRP MEMO</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Nos Services Section */}
        <div id="nos-services" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">Nos Services</span>
              <ArrowDown size={28} className="text-blue-600 animate-bounce" />
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Une suite complète d'outils pour optimiser la gestion de votre entreprise
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-900/10 dark:to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
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
                    <AnimatePresence>
                      {expanded[idx] && (
                        <motion.ul 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 list-disc list-inside text-base text-gray-600 dark:text-gray-400 space-y-1 overflow-hidden"
                        >
                          {service.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 font-medium transition-colors group w-full justify-center bg-blue-50 dark:bg-blue-900/20 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 mt-2"
                    onClick={() => toggleExpand(idx)}
                    aria-expanded={expanded[idx]}
                    aria-controls={`service-details-${idx}`}
                    aria-label={expanded[idx] ? `Réduire les détails de ${service.title}` : `Lire plus sur ${service.title}`}
                  >
                    {expanded[idx] ? "Réduire" : "Lire plus"}
                    {expanded[idx] ? (
                      <ChevronUp size={18} className="transition-transform" />
                    ) : (
                      <ChevronDown size={18} className="transition-transform" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Qui sommes-nous */}
        <div id="qui-sommes-nous" className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Équipe collaborative"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold">Notre équipe</h3>
                  <p className="text-blue-200">Experts en gestion de projets</p>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg z-10">
                  <Users size={32} />
                </div>
              </motion.div>
            </div>
            <div className="order-2">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
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
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300">Habile Solutions SAS</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paris, France</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800">
                    <h4 className="font-bold text-purple-800 dark:text-purple-300">Pegasio International</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tunis, Tunisie</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Pourquoi choisir Pegasio */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full mr-4">
                    <Lightbulb className="text-green-600 dark:text-green-400" size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Pourquoi choisir Pegasio ?
                  </h2>
                </div>
                <ul className="space-y-4">
                  {[
                    "Une expertise reconnue dans les secteurs du BTP, immobilier, énergie et services",
                    "Une équipe passionnée par l'innovation et la performance",
                    "Un accompagnement personnalisé et une écoute attentive",
                    "Une solution flexible et évolutive adaptée aux besoins spécifiques",
                    "Des résultats concrets et mesurables pour votre entreprise"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="ml-3 text-gray-700 dark:text-gray-300 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <div className="order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Innovation and teamwork"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">Innovation & Performance</h3>
                  <p className="text-blue-200">Notre engagement pour votre réussite</p>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-green-600 text-white p-4 rounded-xl shadow-lg z-10">
                  <Rocket size={32} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-red-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à transformer votre gestion de projets ?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Rejoignez des centaines d'entreprises qui ont déjà optimisé leurs processus avec PEGASIO.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center gap-2 font-bold"
              aria-label="Essai gratuit 30 jours"
            >
              Essai gratuit 30 jours
              <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 shadow-lg flex items-center gap-2"
              aria-label="Contactez-nous"
            >
              Contactez-nous
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Chat Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
          aria-label="Ouvrir le chat"
        >
          <MessageCircle size={24} />
        </motion.button>

        {/* Chat Window */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-20 right-6 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-red-600 p-4 flex justify-between items-center">
                <h3 className="text-white font-bold text-lg">Support Pegasio</h3>
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Fermer le chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="p-4 h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                {messages.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Bienvenue ! Comment pouvons-nous vous aider aujourd'hui ?</p>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className={`mt-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <p className={`text-sm rounded-lg p-2 max-w-[75%] ${
                        msg.sender === 'user' 
                          ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}>
                        {msg.content}
                        <span className="block text-xs opacity-70 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Tapez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  aria-label="Envoyer le message"
                >
                  Envoyer
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}