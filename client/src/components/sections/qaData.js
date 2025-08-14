const chatbotData = {
  welcome_message: "👋 Bonjour et bienvenue ! Je suis là pour répondre à vos questions sur CRP MEMO.",
  quick_replies: [
    { label: "À propos de CRP MEMO", payload: "about" },
    { label: "Fonctionnalités", payload: "features" },
    { label: "Avantages", payload: "benefits" },
    { label: "Tarification", payload: "pricing" },
    { label: "Mise en œuvre", payload: "implementation" },
    { label: "Public cible", payload: "target" },
    { label: "Détails techniques", payload: "technical" },
    { label: "Personnalisation", payload: "customization" },
    { label: "Marque & Contact", payload: "trademark" },
    { label: "SWOT", payload: "swot" },
  ],
  reponses: {
    about: [
      {
        question: "Qu’est-ce que CRP MEMO ?",
        keyword: "questcecrpmemo",
        answer: "CRP MEMO est une solution hybride entre un logiciel standard (type SAGE) et une solution sur mesure (type SAP), ajustée aux besoins métiers.",
        keywords: [
          // Mot-clé principal
          "questcecrpmemo",
          // Variations de la question
          "qu'est-ce que CRP MEMO",
          "CRP MEMO c'est quoi",
          "définition CRP MEMO",
          "qu'est-ce que le CRP MEMO",
          // Termes spécifiques
          "logiciel hybride",
          "solution sur mesure",
          "besoins métiers",
          // Termes généraux et synonymes
          "présentation CRP MEMO",
          "CRP MEMO logiciel",
          "description CRP MEMO",
          // Phrases naturelles
          "CRP MEMO explication",
          "qu’est-ce que fait CRP MEMO",
          "à quoi sert CRP MEMO"
        ]
      },
      {
        question: "Quels sont les points forts du produit ?",
        keyword: "pointsforts",
        answer: "Sur-mesure, prix compétitif, expertise métier, délai court, GED intégrée, service client réactif, évolutivité, tarification au forfait.",
        keywords: [
          // Mot-clé principal
          "pointsforts",
          // Variations de la question
          "avantages CRP MEMO",
          "points forts produit",
          "atouts CRP MEMO",
          // Termes spécifiques
          "sur-mesure",
          "prix compétitif",
          "expertise métier",
          "GED intégrée",
          "service client réactif",
          "évolutivité",
          "tarification forfait",
          // Termes généraux et synonymes
          "qualités CRP MEMO",
          "bénéfices produit",
          "forces CRP MEMO",
          // Phrases naturelles
          "pourquoi choisir CRP MEMO",
          "avantages du logiciel",
          "points forts CRP MEMO"
        ]
      },
    ],
    features: [
      {
        question: "Quelles sont les fonctionnalités clés de CRP MEMO ?",
        keyword: "fonctionnalitescles",
        answer: "Suivi temps réel, génération d’écritures comptables, gestion RH, stocks, notes de frais, KPIs, préparation à la facturation électronique.",
        keywords: [
          // Mot-clé principal
          "fonctionnalitescles",
          // Variations de la question
          "fonctions CRP MEMO",
          "caractéristiques CRP MEMO",
          "outils CRP MEMO",
          // Termes spécifiques
          "suivi temps réel",
          "écritures comptables",
          "gestion RH",
          "gestion stocks",
          "notes de frais",
          "KPIs",
          "facturation électronique",
          // Termes généraux et synonymes
          "features CRP MEMO",
          "capacités logiciel",
          "fonctionnalités logiciel",
          // Phrases naturelles
          "ce que fait CRP MEMO",
          "outils proposés CRP MEMO",
          "fonctions principales"
        ]
      },
    ],
    benefits: [
      {
        question: "Quels sont les bénéfices pour les clients ?",
        keyword: "beneficesclients",
        answer: "Amélioration rentabilité, réduction délais paiement, centralisation des données, simplification administrative, accompagnement sur mesure.",
        keywords: [
          // Mot-clé principal
          "beneficesclients",
          // Variations de la question
          "avantages pour clients",
          "bénéfices CRP MEMO",
          "gains pour entreprise",
          // Termes spécifiques
          "amélioration rentabilité",
          "réduction délais paiement",
          "centralisation données",
          "simplification administrative",
          "accompagnement sur mesure",
          // Termes généraux et synonymes
          "intérêts CRP MEMO",
          "valeur ajoutée",
          "avantages utilisateurs",
          // Phrases naturelles
          "pourquoi choisir CRP MEMO",
          "bénéfices utilisateurs",
          "avantages pour entreprise"
        ]
      },
    ],
    pricing: [
      {
        question: "Quel est le modèle de tarification ?",
        keyword: "modeletarification",
        answer: "Conception au forfait, utilisation sans récurrence, maintenance mensuelle faible, assistance illimitée sans engagement.",
        keywords: [
          // Mot-clé principal
          "modeletarification",
          // Variations de la question
          "tarifs CRP MEMO",
          "coût CRP MEMO",
          "prix logiciel",
          // Termes spécifiques
          "conception forfait",
          "utilisation sans récurrence",
          "maintenance mensuelle",
          "assistance illimitée",
          // Termes généraux et synonymes
          "modèle de prix",
          "tarification CRP MEMO",
          "budget CRP MEMO",
          // Phrases naturelles
          "frais d'utilisation",
          "coût usage CRP MEMO",
          "tarifs logiciel CRP MEMO"
        ]
      },
    ],
    implementation: [
      {
        question: "Comment CRP MEMO est-il mis en place dans mon entreprise ?",
        keyword: "miseoeuvre",
        answer: "La mise en œuvre inclut une phase pilote, une collaboration avec votre équipe MOA, et une intégration des processus métier, réalisée dans un délai court.",
        keywords: [
          // Mot-clé principal
          "miseoeuvre",
          // Variations de la question
          "mise en place CRP MEMO",
          "implémentation logiciel",
          "déploiement CRP MEMO",
          // Termes spécifiques
          "phase pilote",
          "collaboration MOA",
          "intégration processus métier",
          "délai court",
          // Termes généraux et synonymes
          "installation CRP MEMO",
          "processus mise en œuvre",
          "intégration logiciel",
          // Phrases naturelles
          "comment installer CRP MEMO",
          "déploiement CRP MEMO entreprise",
          "mise en œuvre logiciel"
        ]
      },
    ],
    target: [
      {
        question: "À qui s’adresse CRP MEMO ?",
        keyword: "publiccible",
        answer: "Aux TPE/PME, associations, cabinets d’architecture, agences web, BTP, sécurité, entre 2 et 100 salariés et jusqu’à 50M€ de CA annuel.",
        keywords: [
          // Mot-clé principal
          "publiccible",
          // Variations de la question
          "cible CRP MEMO",
          "qui utilise CRP MEMO",
          "clients CRP MEMO",
          // Termes spécifiques
          "TPE PME",
          "associations",
          "cabinets architecture",
          "agences web",
          "BTP",
          "sécurité",
          "2 à 100 salariés",
          "50M€ CA annuel",
          // Termes généraux et synonymes
          "audience CRP MEMO",
          "utilisateurs cibles",
          "entreprises concernées",
          // Phrases naturelles
          "profils clients CRP MEMO",
          "qui peut utiliser CRP MEMO",
          "entreprises adaptées CRP MEMO"
        ]
      },
    ],
    technical: [
      {
        question: "Qui développe et héberge CRP MEMO ?",
        keyword: "developpementhebergement",
        answer: "PEGASIO INTERNATIONAL / EQUITY BUSINESS, avec des équipes en Tunisie et Ukraine (OVH, DigitalOcean, Maligun, Brevo).",
        keywords: [
          // Mot-clé principal
          "developpementhebergement",
          // Variations de la question
          "qui développe CRP MEMO",
          "hébergement CRP MEMO",
          "serveurs CRP MEMO",
          // Termes spécifiques
          "PEGASIO INTERNATIONAL",
          "EQUITY BUSINESS",
          "équipes Tunisie",
          "équipes Ukraine",
          "OVH",
          "DigitalOcean",
          "Maligun",
          "Brevo",
          // Termes généraux et synonymes
          "développeurs logiciel",
          "infrastructure CRP MEMO",
          "qui héberge CRP MEMO",
          // Phrases naturelles
          "équipe technique CRP MEMO",
          "serveurs utilisés CRP MEMO",
          "développement logiciel CRP MEMO"
        ]
      },
    ],
    customization: [
      {
        question: "CRP MEMO peut-il être adapté à mon entreprise ?",
        keyword: "adaptation",
        answer: "Oui, 30-40 % de ses fonctionnalités peuvent être personnalisées en collaboration avec votre équipe MOA.",
        keywords: [
          // Mot-clé principal
          "adaptation",
          // Variations de la question
          "personnalisation CRP MEMO",
          "adaptation entreprise",
          "sur mesure CRP MEMO",
          // Termes spécifiques
          "30-40 % fonctionnalités",
          "collaboration MOA",
          "personnalisation fonctionnalités",
          // Termes généraux et synonymes
          "customisation logiciel",
          "ajustement CRP MEMO",
          "modifications possibles",
          // Phrases naturelles
          "personnaliser CRP MEMO",
          "adapter logiciel entreprise",
          "sur mesure logiciel CRP MEMO"
        ]
      },
    ],
    trademark: [
      {
        question: "Quel est le statut de la marque CRP MEMO ?",
        keyword: "statutmarque",
        answer: "CRP MEMO est une marque française enregistrée (n° 5012862) déposée le 08-12-2023 auprès de l'INPI.",
        keywords: [
          // Mot-clé principal
          "statutmarque",
          // Variations de la question
          "marque CRP MEMO",
          "enregistrement marque",
          "statut juridique marque",
          // Termes spécifiques
          "marque française",
          "n° 5012862",
          "08-12-2023",
          "INPI",
          // Termes généraux et synonymes
          "propriété marque",
          "marque déposée",
          "détails marque",
          // Phrases naturelles
          "statut légal CRP MEMO",
          "enregistrement INPI",
          "marque CRP MEMO détails"
        ]
      },
      {
        question: "Comment puis-je contacter le support CRP MEMO ?",
        keyword: "contactsupport",
        answer: "Vous pouvez nous écrire à contact@hable-solutions.com ou appeler au 07 67 27 65 22.",
        keywords: [
          // Mot-clé principal
          "contactsupport",
          // Variations de la question
          "contacter support",
          "assistance CRP MEMO",
          "joindre support",
          // Termes spécifiques
          "contact@hable-solutions.com",
          "07 67 27 65 22",
          "email support",
          "numéro support",
          // Termes généraux et synonymes
          "service client",
          "contact équipe",
          "support client",
          // Phrases naturelles
          "appeler support CRP MEMO",
          "email assistance CRP MEMO",
          "contacter équipe CRP MEMO"
        ]
      },
    ],
    swot: [
      {
        question: "Quels sont les points forts (SWOT) ?",
        keyword: "pointsfortsswot",
        answer: "Interface simple, délai court, adaptation comptable, GED, consulting, flexibilité, plateforme en ligne, réactivité, expertise.",
        keywords: [
          // Mot-clé principal
          "pointsfortsswot",
          // Variations de la question
          "forces SWOT",
          "atouts SWOT",
          "points forts CRP MEMO",
          // Termes spécifiques
          "interface simple",
          "délai court",
          "adaptation comptable",
          "GED",
          "consulting",
          "flexibilité",
          "plateforme en ligne",
          "réactivité",
          "expertise",
          // Termes généraux et synonymes
          "avantages SWOT",
          "qualités SWOT",
          "bénéfices SWOT",
          // Phrases naturelles
          "forces CRP MEMO",
          "atouts logiciel CRP MEMO",
          "points forts analyse SWOT"
        ]
      },
      {
        question: "Quelles sont les faiblesses ?",
        keyword: "faiblesses",
        answer: "Notoriété faible, marché restreint à la gestion de projets, structure en mode start-up.",
        keywords: [
          // Mot-clé principal
          "faiblesses",
          // Variations de la question
          "faiblesses CRP MEMO",
          "points faibles",
          "limites CRP MEMO",
          // Termes spécifiques
          "notoriété faible",
          "marché gestion projets",
          "structure start-up",
          // Termes généraux et synonymes
          "défauts logiciel",
          "inconvénients CRP MEMO",
          "faiblesse SWOT",
          // Phrases naturelles
          "restrictions CRP MEMO",
          "limites logiciel CRP MEMO",
          "points faibles SWOT"
        ]
      },
      {
        question: "Quelles sont les opportunités ?",
        keyword: "opportunites",
        answer: "Dématérialisation, facturation électronique 2027, marché TPE, croissance du besoin en gestion externalisée.",
        keywords: [
          // Mot-clé principal
          "opportunites",
          // Variations de la question
          "opportunités CRP MEMO",
          "perspectives CRP MEMO",
          "possibilités marché",
          // Termes spécifiques
          "dématérialisation",
          "facturation électronique 2027",
          "marché TPE",
          "gestion externalisée",
          // Termes généraux et synonymes
          "chances CRP MEMO",
          "opportunités de croissance",
          "avenirs CRP MEMO",
          // Phrases naturelles
          "potentiel marché CRP MEMO",
          "opportunités logiciel",
          "croissance CRP MEMO"
        ]
      },
      {
        question: "Quelles sont les menaces ?",
        keyword: "menaces",
        answer: "Concurrents puissants (SAGE, Salesforce), IA, réputation du pays de dev.",
        keywords: [
          // Mot-clé principal
          "menaces",
          // Variations de la question
          "menaces CRP MEMO",
          "risques CRP MEMO",
          "dangers marché",
          // Termes spécifiques
          "concurrents SAGE",
          "concurrents Salesforce",
          "IA concurrence",
          "réputation pays développement",
          // Termes généraux et synonymes
          "menaces SWOT",
          "obstacles CRP MEMO",
          "risques concurrentiels",
          // Phrases naturelles
          "concurrence CRP MEMO",
          "dangers logiciel CRP MEMO",
          "risques marché CRP MEMO"
        ]
      },
    ],
  },
};

// Fonction pour normaliser le texte (supprimer accents, ponctuation, et convertir en minuscules)
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^\w\s]/g, "") // Supprimer la ponctuation
    .trim();
}

// Création du mapping de mots-clés
chatbotData.keywordMapping = {};

// Parcourir toutes les catégories et questions pour construire le mapping
for (const category in chatbotData.reponses) {
  for (const questionObj of chatbotData.reponses[category]) {
    // Ajouter le mot-clé principal
    chatbotData.keywordMapping[normalizeText(questionObj.keyword)] = {
      question: questionObj.question,
      answer: questionObj.answer,
      keyword: questionObj.keyword,
    };
    
    // Ajouter tous les mots-clés de la liste keywords
    for (const keyword of questionObj.keywords) {
      const normalizedKeyword = normalizeText(keyword);
      chatbotData.keywordMapping[normalizedKeyword] = {
        question: questionObj.question,
        answer: questionObj.answer,
        keyword: questionObj.keyword,
      };
    }
    
    // Ajouter la question elle-même comme mot-clé
    const normalizedQuestion = normalizeText(questionObj.question);
    chatbotData.keywordMapping[normalizedQuestion] = {
      question: questionObj.question,
      answer: questionObj.answer,
      keyword: questionObj.keyword,
    };
  }
}

// Fonction de recherche optimisée
chatbotData.search = function (query) {
  const normalizedQuery = normalizeText(query);
  
  // 1. Recherche exacte du mot-clé ou de la question
  if (chatbotData.keywordMapping[normalizedQuery]) {
    return {
      question: chatbotData.keywordMapping[normalizedQuery].question,
      answer: chatbotData.keywordMapping[normalizedQuery].answer,
    };
  }

  // 2. Recherche par correspondance partielle stricte
  let bestMatch = null;
  let maxScore = 0;
  
  for (const keyword in chatbotData.keywordMapping) {
    const normalizedKeyword = normalizeText(keyword);
    
    // Calculer un score basé sur la correspondance
    let score = 0;
    if (normalizedQuery === normalizedKeyword) {
      score = 100; // Correspondance exacte
    } else if (normalizedQuery.includes(normalizedKeyword)) {
      score = 80 + (normalizedKeyword.length / normalizedQuery.length) * 20; // Contient le mot-clé
    } else if (normalizedKeyword.includes(normalizedQuery)) {
      score = 60 + (normalizedQuery.length / normalizedKeyword.length) * 20; // Mot-clé contient la requête
    }
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = {
        question: chatbotData.keywordMapping[keyword].question,
        answer: chatbotData.keywordMapping[keyword].answer,
      };
    }
  }

  if (bestMatch && maxScore >= 60) {
    return bestMatch;
  }

  // 3. Recherche par mots individuels si pas de correspondance stricte
  const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 2);
  let wordMatch = null;
  let maxWordScore = 0;

  for (const keyword in chatbotData.keywordMapping) {
    const normalizedKeyword = normalizeText(keyword);
    const keywordWords = normalizedKeyword.split(/\s+/).filter(word => word.length > 2);
    
    // Compter les mots communs
    const commonWords = queryWords.filter(word => keywordWords.includes(word));
    const wordScore = commonWords.length * 30; // Score basé sur le nombre de mots communs
    
    if (wordScore > maxWordScore) {
      maxWordScore = wordScore;
      wordMatch = {
        question: chatbotData.keywordMapping[keyword].question,
        answer: chatbotData.keywordMapping[keyword].answer,
      };
    }
  }

  if (wordMatch && maxWordScore >= 30) {
    return wordMatch;
  }

  // 4. Si aucune correspondance, retourner null
  return null;
};

export default chatbotData;