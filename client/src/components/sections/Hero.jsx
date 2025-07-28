"use client"

import { useState } from "react"
import image360f from '../../assets/360f.png';
import wsm from '../../assets/wsm.jpg';

import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Settings,
  BarChart2,
  FileText,
  Users,
  CheckCircle,
  MessageCircle,
  Phone,
  Calendar,
  FileSpreadsheet,
  Database,
  DollarSign
} from "lucide-react"

const features = [
  {
    icon: <Settings size={32} className="text-blue-600" />,
    title: "Conception sur mesure",
    description: "Adaptée à l'activité et l'organisation de votre entreprise",
    details: [
      "Audit personnalisé de vos processus",
      "Développement spécifique à vos besoins",
      "Interface utilisateur optimisée pour votre secteur"
    ]
  },
  {
    icon: <FileSpreadsheet size={32} className="text-green-600" />,
    title: "Gestion intégrale",
    description: "Devis, facture, suivi de production, marge, gestion fournisseurs",
    details: [
      "Workflow complet de gestion commerciale",
      "Suivi des coûts en temps réel",
      "Gestion des impayés et recouvrement"
    ]
  },
  {
    icon: <BarChart2 size={32} className="text-purple-600" />,
    title: "Statistiques et KPI",
    description: "Tableaux de bord et indicateurs clés de performance",
    details: [
      "Reporting personnalisable",
      "Analyse des tendances",
      "Export des données pour analyse approfondie"
    ]
  },
  {
    icon: <DollarSign size={32} className="text-orange-600" />,
    title: "Suite comptable et financière",
    description: "Intégration complète avec votre comptabilité",
    details: [
      "Génération automatique des écritures",
      "Conformité fiscale",
      "Prévisionnel financier"
    ]
  }
]

const steps = [
  {
    icon: <Phone size={24} className="text-blue-600" />,
    title: "Premier contact",
    description: "Éligibilité et expression du besoin avec notre attachée commerciale"
  },
  {
    icon: <Users size={24} className="text-green-600" />,
    title: "Audit sur site",
    description: "Rencontre physique avec notre consultant MOA dans vos locaux"
  },
  {
    icon: <ClipboardList size={24} className="text-purple-600" />,
    title: "Cahier des charges",
    description: "Co-construction avec les key users de votre entreprise"
  },
  {
    icon: <CheckCircle size={24} className="text-orange-600" />,
    title: "Phase de test",
    description: "Validation de la première version par les utilisateurs clés"
  },
  {
    icon: <Database size={24} className="text-red-600" />,
    title: "Ajustements",
    description: "Itérations pour perfectionner la solution"
  },
  {
    icon: <FileText size={24} className="text-teal-600" />,
    title: "Livraison finale",
    description: "Déploiement en mode production dans toute l'entreprise"
  }
]

export default function Hero() {
  const [expandedFeatures, setExpandedFeatures] = useState(Array(features.length).fill(false))
  const [showDemo, setShowDemo] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isChatVisible, setIsChatVisible] = useState(false);


  const toggleFeature = (index) => {
    setExpandedFeatures(prev => prev.map((v, i) => i === index ? !v : v))
  }

  return (
    <div className="min-h-screen bg-white pt-20"> {/* Ajout de pt-20 pour compenser la navbar fixe */}
    {/* Hero Section - Version optimisée */}
<section id="accueil" className="relative bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Contenu texte - Gauche */}
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          <span className="text-blue-600">MEMO</span> - Votre ERP sur mesure
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600">
          La solution tout-en-un pour optimiser la gestion de votre entreprise avec une approche personnalisée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link 
            to="/demo"
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-3 rounded-full flex items-center justify-center font-medium shadow-sm hover:shadow-md"
          >
            Demander une démo
            <ArrowRight className="ml-2" size={18} />
          </Link>
          
          <Link 
            to="/contact"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all px-6 py-3 rounded-full flex items-center justify-center font-medium"
          >
            <Phone className="mr-2" size={18} />
            Expert disponible
          </Link>
        </div>
      </div>

      {/* Zone vidéo - Droite */}
      <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
        <div 
          className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video flex items-center justify-center cursor-pointer hover:shadow-lg transition-all border border-gray-200"
          onClick={() => setShowDemo(true)}
        >
          {/* Placeholder vidéo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="relative inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 rounded-full transition-opacity"></div>
              </div>
              <p className="text-gray-500 mt-3 font-medium">Découvrez MEMO en action</p>
            </div>
          </div>
          
          {/* Badge durée */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
            2:45
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => setShowDemo(true)}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center text-sm"
          >
            Voir toutes les fonctionnalités
            <ArrowRight className="ml-1" size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CRP Definition */}
      <section id="produit" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Qu'est-ce qu'un CRP ?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Un Centre de Ressources Partagées (CRP) est une solution ERP modulaire conçue pour centraliser et optimiser 
              la gestion de tous les départements de votre entreprise. MEMO offre une plateforme unifiée adaptée 
              spécifiquement aux besoins des PME.
            </p>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-left">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Les avantages clés :</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Intégration parfaite entre tous vos services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Réduction des doublons et des erreurs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Accès en temps réel aux données critiques</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Les 4 piliers de MEMO</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une solution complète conçue pour répondre à tous vos besoins métiers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-3 rounded-full mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedFeatures[index] && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-16 mt-2 space-y-2 text-gray-600 overflow-hidden"
                    >
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span> {detail}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                <button 
                  onClick={() => toggleFeature(index)}
                  className="mt-4 text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                >
                  {expandedFeatures[index] ? (
                    <>
                      Voir moins <ChevronUp className="ml-1" size={16} />
                    </>
                  ) : (
                    <>
                      Voir plus <ChevronDown className="ml-1" size={16} />
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">MEMO en détails</h2>
              <p className="text-lg text-gray-600 mb-6">
                Notre solution ERP sur mesure s'adapte à la structure unique de votre entreprise pour offrir une gestion 
                unifiée et optimisée de toutes vos opérations.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Interface intuitive conçue pour vos équipes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Modules interconnectés pour une vue globale</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Évolutivité garantie pour accompagner votre croissance</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Démonstration en vidéo</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Gestion commerciale",
                    "Suivi de production",
                    "Tableaux de bord",
                    "Module comptable"
                  ].map((title, i) => (
                    <div 
                      key={i}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition cursor-pointer flex items-center"
                      onClick={() => setShowDemo(true)}
                    >
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <FileText className="text-blue-600" size={18} />
                      </div>
                      <span className="font-medium text-gray-700">{title}</span>
                    </div>
                  ))}
                </div>
                <button 
                  className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                  onClick={() => setShowDemo(true)}
                >
                  Voir toutes les démos <ArrowRight className="ml-2" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="etapes" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Les étapes pour obtenir votre MEMO sur mesure</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un processus clair et transparent pour une solution parfaitement adaptée
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
            
            <div className="grid md:grid-cols-2 gap-y-10 gap-x-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative ${index % 2 === 0 ? 'md:text-right' : 'md:text-left md:mt-20'}`}
                >
                  <div className={`flex ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <div className={`max-w-md ${index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'}`}>
                      <div className={`flex items-center ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {index % 2 === 0 && (
                          <div className="hidden md:flex absolute left-1/2 -ml-4 h-8 w-8 rounded-full bg-blue-600 items-center justify-center text-white">
                            {index + 1}
                          </div>
                        )}
                        <div className="bg-white p-3 rounded-full shadow-sm border border-gray-200">
                          {step.icon}
                        </div>
                        {index % 2 !== 0 && (
                          <div className="hidden md:flex absolute left-1/2 -ml-4 h-8 w-8 rounded-full bg-blue-600 items-center justify-center text-white">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-gray-900">{step.title}</h3>
                      <p className="mt-2 text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos offres</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une tarification transparente adaptée à votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Conception</h3>
              <p className="text-gray-600 mb-6">Développement sur mesure de votre solution</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Audit complet de vos besoins</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Développement spécifique</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Formation des utilisateurs</span>
                </li>
              </ul>
              <button className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition">
                Demander un devis
              </button>
            </div>

            <div className="border-2 border-blue-600 rounded-xl p-6 shadow-lg relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-medium">
                Recommandé
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">DUL</h3>
              <p className="text-gray-600 mb-6">Droits d'utilisation logicielle</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Licence perpétuelle</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Mises à jour majeures incluses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Support technique de base</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                En savoir plus
              </button>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Maintenance</h3>
              <p className="text-gray-600 mb-6">Hébergement et support continu</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Hébergement sécurisé</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Maintenance corrective et évolutive</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Sauvegardes automatiques</span>
                </li>
              </ul>
              <button className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition">
                Options disponibles
              </button>
              
            </div>
          </div>
        </div>
        
      </section>

      
      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Démonstration de MEMO</h3>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>Vidéo de démonstration</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Gestion commerciale",
                    "Suivi de production",
                    "Tableaux de bord",
                    "Module comptable"
                  ].map((title, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-700">{title}</p>
                      <p className="text-sm text-gray-500 mt-1">2 min {i+1}5 sec</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}