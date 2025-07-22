import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Target,
  Users,
  Lightbulb,
  Rocket,
  Settings,
  Brain,
  DollarSign,
  Receipt,
  Sparkles,
  BarChart2,
  Clock,
  ShieldCheck,
  Zap,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DemoVideo from "../../assets/Demo.mp4";

const services = [
  {
    icon: (
      <Settings className="text-orange-600 dark:text-orange-400" size={32} />
    ),
    emoji: "🔧",
    title: "Gestion de Projets / Job Manager",
    preview:
      "Pilotage de projets, chantiers, missions, jobs (TPE/PME, BTP, agences, etc.). Suivi en temps réel de la performance de l'entreprise et des collaborateurs.",
    details: [
      "Gestion multi-entités avec transversalité des fonctionnalités",
      "Génération d'écritures comptables liées aux projets",
      "Centralisation des informations projet : délais, coûts, livrables, marges",
      "Module de planification, affectation des ressources et contrôle qualité",
      "Suivi budgétaire et analytique par job/projet",
    ],
  },
  {
    icon: <Brain className="text-blue-600 dark:text-blue-400" size={32} />,
    emoji: "🧠",
    title: "CRM (Gestion de la relation client)",
    preview:
      "Gestion des prospects et des clients. Suivi des devis, commandes, contrats. Pipeline commercial visuel et interactif.",
    details: [
      "Relances automatiques et historiques des interactions",
      "Intégration directe avec la facturation et la comptabilité",
      "Uniformisation des process commerciaux",
    ],
  },
  {
    icon: (
      <DollarSign className="text-green-600 dark:text-green-400" size={32} />
    ),
    emoji: "💰",
    title: "Comptabilité & Finance",
    preview:
      "Génération d'écritures comptables automatiques (ventes, achats, provisions). Synchronisation des données avec les outils comptables.",
    details: [
      "Analyse financière par projet, client, équipe ou entité",
      "Préparation à la facturation électronique (obligatoire en 2027)",
      "GED intégrée (gestion documentaire numérique)",
      "Réduction des délais de facturation et de paiement",
    ],
  },
  {
    icon: (
      <Receipt className="text-purple-600 dark:text-purple-400" size={32} />
    ),
    emoji: "🧾",
    title: "Facturation & Paiements",
    preview:
      "Facturation automatisée à partir des bons de commande ou livrables. Historique des paiements, alertes sur les impayés.",
    details: [
      "Modèles de factures paramétrables",
      "Export des données vers plateformes fiscales",
      "Réduction du cycle facturation → encaissement",
    ],
  },
];

const stats = [
  {
    value: "95%",
    label: "Satisfaction clients",
    icon: <Sparkles className="text-yellow-500" />,
  },
  {
    value: "40%",
    label: "Gain de temps",
    icon: <Clock className="text-blue-500" />,
  },
  {
    value: "30%",
    label: "Augmentation productivité",
    icon: <BarChart2 className="text-green-500" />,
  },
  {
    value: "100%",
    label: "Sécurité des données",
    icon: <ShieldCheck className="text-purple-500" />,
  },
];

export default function Hero() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(Array(services.length).fill(false));
  const [currentImage, setCurrentImage] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const images = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleExpand = (idx) => {
    setExpanded((expanded) => expanded.map((v, i) => (i === idx ? !v : v)));
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMsg = {
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Aucun token d'authentification trouvé");

      const response = await fetch("http://localhost:8080/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          content: newMessage,
          sender: "user",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.aiMessage?.content) {
        setMessages((prev) => [
          ...prev,
          {
            content: data.aiMessage.content,
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Erreur détaillée:", {
        message: error.message,
        stack: error.stack,
      });

      let errorMessage = "Erreur de communication avec le serveur";
      if (error.message.includes("401"))
        errorMessage = "Session expirée - Veuillez vous reconnecter";
      else if (error.message.includes("network"))
        errorMessage = "Problème de connexion réseau";

      setMessages((prev) => [
        ...prev,
        {
          content: errorMessage,
          sender: "system",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-white min-h-screen"
    >
      {/* Background Shapes */}
  <div className="absolute inset-0 z-0 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-[#ccd1e1] via-[#E9F1FB] to-transparent opacity-30 blur-2xl" />
</div>



 {/* ----------------------------------Hero Header----------------------------------------------------------------- */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4  py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-12 gap-10"
        >
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6">
              <Zap className="mr-2" size={18} />
              <span>{t("hero.newVersionAvailable")}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                {t("hero.title")}
              </span>{" "}
              - {t("hero.partner")}
            </h1>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-xl">
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#ff4e50] to-[#ff7a5c] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 shadow-lg flex items-center gap-2"
                >
                  {t("hero.cta.startFree")}
                  <ArrowRight size={20} />
                </motion.button>
              </Link>

              
            </div>
          </div>

          {/* Right Video */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="aspect-w-16 aspect-h-9 w-full max-w-xl rounded-2xl overflow-hidden shadow-lg ml-12">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[350px] object-cover"
                src={DemoVideo}
              />
            </div>
          </div>
        </motion.div>
</div>
    </section>
  );
}
