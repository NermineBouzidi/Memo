import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navbar
      "navbar.solution": "Solution",
      "navbar.solution.tooltip":
        "Discover the CRP approach, more agile than an ERP",
      "navbar.solution.submenu.qu_est_ce_qu_un_crp": "What is a CRP?",
      "navbar.solution.submenu.pourquoi_choisir_memo": "Why choose MEMO?",
      "navbar.solution.submenu.fonctionnalites_cles": "Key features",

      "navbar.pour_qui": "For whom?",
      "navbar.pour_qui.tooltip": "A personalized solution for your business",
      "navbar.pour_qui.submenu.pme_de_services": "Service SMEs",
      "navbar.pour_qui.submenu.btp_architecture": "Construction & Architecture",
      "navbar.pour_qui.submenu.agences_independants": "Agencies & Freelancers",
      "navbar.pour_qui.submenu.industrie_production": "Industry & Production",

      "navbar.resultats": "Results",
      "navbar.resultats.tooltip": "What our clients observe",

      "navbar.ressources": "Resources",
      "navbar.ressources.tooltip": "Understand MEMO before committing",
      "navbar.ressources.submenu.videos_demonstration": "Demo Videos",
      "navbar.ressources.submenu.faq": "FAQ",
      "navbar.ressources.submenu.tarification": "Pricing",
      
      "navbar.contact": "Contact",
      "navbar.contact.tooltip": "Contact us for more information",

      
      "navbar.moreMenu.yourSpace": "Your Space",
      "navbar.moreMenu.logout": "🔓 Logout",
      "navbar.moreMenu.login": "Login",
      "navbar.moreMenu.signup": "Create an Account",

      "navbar.mobile.demoRequest": "Request a Demo",
      "navbar.mobile.contactUs": "Contact Us",
      "navbar.mobile.yourSpace": "Your Space",
      "navbar.mobile.logout": "Logout",
      "navbar.mobile.login": "Login",
      "navbar.mobile.signup": "Create an Account",
      // Footer
      "footer.contact.description":
        "The platform that structures your management.",
      "footer.contact.email": "contact@habile-solutions.com",
      "footer.contact.phone": "+33 7 53 94 26 79",

      "footer.nav.title": "Navigation",
      "footer.nav.solution": "Solution",
      "footer.nav.pourQui": "Who is it for?",
      "footer.nav.resultats": "Results",
      "footer.nav.ressources": "Resources",
      "footer.nav.demo": "Request a demo",

      "footer.legal.title": "Legal",
      "footer.legal.mentions": "Legal Notice",
      "footer.legal.confidentialite": "Privacy Policy",
      "footer.legal.cgu": "Terms of Use",

      "footer.newsletter.title": "Newsletter",
      "footer.newsletter.subtitle":
        "Get our tips to optimize your business management.",
      "footer.newsletter.placeholder": "Your email",
      "footer.newsletter.cta": "Subscribe",

      "footer.trustedBy": "Trusted by",

      "footer.copyright": "© {{year}} MEMO — All rights reserved.",

      "footer.language.select": "🌐",
      "footer.language.fr": "French",
      "footer.language.en": "English",
      // Blog Page
      "blog.headerTag": "BLOG",
      "blog.title": "Our Blog",
      "blog.subtitle":
        "Discover our latest articles, tips, and news to optimize your business management",
      "blog.searchPlaceholder": "Search for an article...",
      "blog.categories.all": "All",
      "blog.categories.projectManagement": "Project Management",
      "blog.categories.crm": "CRM",
      "blog.categories.accounting": "Accounting",
      "blog.categories.innovation": "Innovation",
      "blog.categories.finance": "Finance",
      "blog.readTime": "read",
      "blog.readMore": "Read more",
      "blog.noResults": "No articles found",
      "blog.noResultsHint": "Try changing your search or filter criteria.",
      "blog.newsletterTitle": "Stay informed of our latest news",
      "blog.newsletterSubtitle": "Receive our articles directly in your inbox",
      "blog.newsletterEmailPlaceholder": "Your email address",
      "blog.subscribe": "Subscribe",
      // SavoirPlus Page
      "savoir.headerTag": "Help Center",
      "savoir.title": "How can we help you?",
      "savoir.subtitle":
        "Quickly find answers to your questions and discover all the secrets of CRP MEMO",
      "savoir.searchPlaceholder": "Search the documentation...",
      "savoir.quickActions.support": "Contact support",
      "savoir.quickActions.videos": "Video tutorials",
      "savoir.quickActions.api": "API documentation",
      "savoir.quickActions.community": "Community",
      "savoir.helpCategories.gettingStarted.title": "Getting Started",
      "savoir.helpCategories.gettingStarted.description":
        "Discover the basics of CRP MEMO",
      "savoir.helpCategories.projectManagement.title": "Project Management",
      "savoir.helpCategories.projectManagement.description":
        "Master all aspects of project management",
      "savoir.helpCategories.crm.title": "CRM & Clients",
      "savoir.helpCategories.crm.description":
        "Optimize your customer relationship",
      "savoir.helpCategories.billing.title": "Billing",
      "savoir.helpCategories.billing.description":
        "Manage your invoices and payments",
      "savoir.allArticles": "All articles",
      "savoir.featuredTitle": "Popular articles",
      "savoir.views": "views",
      "savoir.readArticle": "Read article",
      "savoir.noResults": "No articles found",
      "savoir.noResultsHint": "Try changing your search or filter criteria.",
      "savoir.supportTitle": "Can't find what you're looking for?",
      "savoir.supportSubtitle":
        "Our support team is here to help. Contact us directly for personalized assistance.",
      "savoir.supportButton": "Contact support",
      // Hero Section

      "heroCRPMemo.title": "CRP MEMO",
      "heroCRPMemo.subtitle":
        "The next-generation management tool designed for your business processes. Centralize your flows, automate accounting, and monitor in real time.",
      "heroCRPMemo.cta": "Book a free appointment",

      "heroCRPMemo.whatIs.title": "What is a CRP?",
      "heroCRPMemo.whatIs.intro":
        "A tailor-made solution to centralize and automate your business flows.",

      "heroCRPMemo.table.title": "Features",
      "heroCRPMemo.table.column.feature": "Features",
      "heroCRPMemo.table.column.crm": "CRM",
      "heroCRPMemo.table.column.erp": "ERP",
      "heroCRPMemo.table.column.crp": "CRP (MEMO)",

      "heroCRPMemo.table.row.0": "Business management",
      "heroCRPMemo.table.row.1": "Accounting",
      "heroCRPMemo.table.row.2": "Tailored to your business",
      "heroCRPMemo.table.row.3": "Custom interface",
      "heroCRPMemo.table.row.4": "Fast deployment",
      "heroCRPMemo.table.row.5": "No subscription license",

      "heroCRPMemo.cards.0.title": "Process-focused",
      "heroCRPMemo.cards.0.description": "MEMO adapts to your business.",
      "heroCRPMemo.cards.1.title": "All your flows in one tool",
      "heroCRPMemo.cards.1.description": "Complete process management.",
      "heroCRPMemo.cards.2.title": "Real-time monitoring",
      "heroCRPMemo.cards.2.description": "Custom dashboards.",
      "heroCRPMemo.cards.3.title": "Built with your teams",
      "heroCRPMemo.cards.3.description": "Tailor-made solution.",

      // Contact Section
      "contact.title": "Contact Us",
      "contact.description":
        "We would love to hear from you. Send us a message and we will get back to you as soon as possible.",
      "contact.socials.title": "Follow us",
      "contact.form.title": "Send us a message",
      "contact.form.name.label": "Full Name",
      "contact.form.name.placeholder": "Your name",
      "contact.form.email.label": "Email Address",
      "contact.form.email.placeholder": "your@email.com",
      "contact.form.subject.label": "Subject",
      "contact.form.subject.placeholder": "Subject of your message",
      "contact.form.message.label": "Message",
      "contact.form.message.placeholder": "Your message...",
      "contact.form.submit.button": "Send Message",

      //crp --------------------------------------

      "crp.title": "Your everyday life, reinvented with ",
      "crp.subtitle":
        "4 pillars designed to move your business forward, every day.",

      "crp.pillars.pillar1.label": "Pillar #1",
      "crp.pillars.pillar1.title": "All your feeds in one tool",
      "crp.pillars.pillar1.description":
        "Your quotes, invoices, site tracking, HR, documents, and budgets all in one place.",

      "crp.pillars.pillar2.label": "Pillar #2",
      "crp.pillars.pillar2.title": "Business Automation",
      "crp.pillars.pillar2.description":
        "No more follow-ups, double entries, or manual calculations: MEMO handles it for you.",

      "crp.pillars.pillar3.label": "Pillar #3",
      "crp.pillars.pillar3.title": "Collaboration without obstacles",
      "crp.pillars.pillar3.description":
        "Your teams communicate in real-time on projects, HR, or approvals, without emails or Excel.",

      "crp.pillars.pillar4.label": "Pillar #4",
      "crp.pillars.pillar4.title": "Real-time Monitoring",
      "crp.pillars.pillar4.description":
        "Track your margins, delays, expenses, and decisions to the second. Goal: profitability.",

      "crp.cta.text":
        "No need to adapt your methods to a tool. MEMO adapts to you.",
      "crp.cta.button": "See an instant demo",
      //--------------highlights-------------------

      "highlights.title": "Why choose ",
      "highlights.subtitle":
        "4 pillars designed to move your business forward, every day.",

      "highlights.pillar1.label": "Advantage #1",
      "highlights.pillar1.title": "Tailored to your business",
      "highlights.pillar1.description":
        "Each version of MEMO is fully designed around your company: its rules, habits, and priorities.",

      "highlights.pillar2.label": "Advantage #2",
      "highlights.pillar2.title": "Centralized management",
      "highlights.pillar2.description":
        "Quotes, invoices, suppliers, margin tracking, unpaid bills, collections... MEMO simplifies complexity.",

      "highlights.pillar3.label": "Advantage #3",
      "highlights.pillar3.title": "Real-time decisions",
      "highlights.pillar3.description":
        "Your dashboards grow with you: smart indicators, forecasts, and automatic alerts.",

      "highlights.pillar4.label": "Advantage #4",
      "highlights.pillar4.title": "Automated finance",
      "highlights.pillar4.description":
        "Automate your financial and budget management: bank sync, reconciliation, accurate tracking.",

      "highlights.cta.text1": "Not a generic solution. Not an ERP.",
      "highlights.cta.text2": "is built for you.",
      "highlights.cta.button": "Book a discovery call",
      //-------------- product definition -------------------
      "erpSection.title.highlight": "MEMO",
      "erpSection.title": "the power of an ERP without the constraints",
      "erpSection.subtitle":
        "A business software designed for your real-world needs: fast to deploy, cost-effective, secure, and 100% tailored.",
      "erpSection.feature.fastDeployment.title": "Fast Deployment",
      "erpSection.feature.fastDeployment.description":
        "Go live in just a few weeks without complex redevelopment.",
      "erpSection.feature.costSaving.title": "Proven Cost Saving",
      "erpSection.feature.costSaving.description":
        "A total cost of ownership (TCO) up to 60% lower than traditional ERPs.",
      "erpSection.feature.gdprSecurity.title": "Built-in GDPR Security",
      "erpSection.feature.gdprSecurity.description":
        "Robust architecture, secure hosting, guaranteed GDPR compliance.",
      //-------------------Video Demo ----------------------
      "videoDemo.title":
        "Take 2 minutes to see how MEMO boosts your performance",
      "videoDemo.subtitle":
        "Discover how MEMO structures, simplifies, and secures your business management: centralized control, task automation, and real-time visibility.",
      "videoDemo.cta": "Watch the demo",
      "videoDemo.alt": "Access the demo video",
      "videoDemo.resume":
        "A clear and practical demonstration of key features: project management, invoicing, client tracking, accounting, and reporting.",
      "videoDemo.banner":
        "MEMO in action – centralized management in 2 minutes",
      "videoDemo.modal.close": "Close video",
      //-------------Etapes -------------------

      "etapes.title": "Deployment",
      "etapes.subtitle":
        "A structured, fast, and tailor-made process to ensure alignment with your field challenges.",

      "etapes.steps.1.title": "Qualification",
      "etapes.steps.1.description":
        "Validation of needs, priorities and processes with a MEMO expert.",

      "etapes.steps.2.title": "Field immersion",
      "etapes.steps.2.description":
        "On-site visit to understand your organization and your daily challenges.",

      "etapes.steps.3.title":
        "Specifications",
      "etapes.steps.3.description":
        "Co-construction of a precise functional scope with your teams.",

      "etapes.steps.4.title": "Delivery V1",
      "etapes.steps.4.description":
        "First testable version and immediate adjustments based on feedback.",

      "etapes.steps.5.title": "Agile Iterations",
      "etapes.steps.5.description":
        "Quick ping-pong with your teams to refine the user experience.",

      "etapes.steps.6.title": "Production Go-Live",
      "etapes.steps.6.description":
        "Official deployment, user training, and support from day 1.",
      //------------------------tarifs -----------------------
      "pricing.title": "A cost structure designed for SMEs",
      "pricing.subtitle":
        "Clear investment, no surprise licensing, and full support: MEMO guarantees you total budget control.",

      "pricing.pack1.title": "Custom Design",
      "pricing.pack1.feature1": "✓ Detailed business analysis",
      "pricing.pack1.feature2": "✓ Tailored specifications",
      "pricing.pack1.feature3": "✓ Development adapted to your needs",
      "pricing.pack1.feature4": "✓ Change management support",
      "pricing.pack1.footer":
        "Single fixed price based on your functional scope",

      "pricing.pack2.title": "MEMO Software License",
      "pricing.pack2.feature1": "✓ Unlimited usage",
      "pricing.pack2.feature2": "✓ Updates included",
      "pricing.pack2.feature3": "✓ License ownership with no commitment",
      "pricing.pack2.footer": "Payment adjusted according to number of users",

      "pricing.pack3.title": "Support & Hosting",
      "pricing.pack3.feature1": "✓ Secure hosting",
      "pricing.pack3.feature2": "✓ Unlimited support",
      "pricing.pack3.feature3": "✓ 24/7 monitoring",
      "pricing.pack3.footer": "Transparent monthly subscription, no commitment",
      //----------------Btp ----------------------
        "btp.title": "Manage your construction sites, margins, subcontractors, and DGD",
  "btp.subtitle": "MEMO helps you better manage your construction projects, subcontractors, and DGD with ease.",
  "btp.card.title": "Monitor your sites and margins with precision",

  "btp.challenge.title": "Construction Sector Challenges",
  "btp.challenge.item1": "Scattered project tracking",
  "btp.challenge.item2": "Lack of control over margins",
  "btp.challenge.item3": "Manual tracking of DGD, subcontractors, and supplies",
  "btp.challenge.item4": "Delayed invoicing timelines",

  "btp.solution.title": "MEMO Solutions",
  "btp.solution.item1": "Project tracking: schedule, budget, and resources",
  "btp.solution.item2": "Net margin indicators per operation",
  "btp.solution.item3": "Simplified management of approvals, DGD, and deliveries",
  "btp.solution.item4": "Automatic generation of progress invoices",
  //--------------pme -------------------
  "pme.title": "MEMO structures your operations, from quotes to payment",
  "pme.subtitle": "Automate your entire management cycle within a unified and intuitive interface.",
  "pme.card.title": "Structure your operations from A to Z with MEMO",

  "pme.challenge.title": "SME Challenges",
  "pme.challenge.item1": "Time lost juggling multiple tools",
  "pme.challenge.item2": "Difficulty tracking real profit margins",
  "pme.challenge.item3": "Time-consuming administrative tasks",
  "pme.challenge.item4": "Risk of accounting errors",

  "pme.solution.title": "MEMO Solutions",
  "pme.solution.item1": "Automation of quotes, invoices, and reminders",
  "pme.solution.item2": "Real-time margin tracking",
  "pme.solution.item3": "Centralized HR, suppliers, and clients",
  "pme.solution.item4": "Integrated accounting with accountant export",

  //--------------agences -------------------
   "agences.title": "Track your assignments, centralize your documents, save time",
  "agences.subtitle": "MEMO simplifies managing your business: quotes, invoices, documents, and operations all in one smooth tool.",
  "agences.card.title": "Centralize assignments, documents, and clients",
  
  "agences.challenge.title": "Challenges for freelancers",
  "agences.challenge.item1": "Difficulty tracking active assignments",
  "agences.challenge.item2": "Time lost following up with clients",
  "agences.challenge.item3": "Documents scattered across different platforms",
  "agences.challenge.item4": "Lack of visibility on payments received",
  
  "agences.solution.title": "MEMO Solutions",
  "agences.solution.item1": "Consolidated view of assignments, deadlines, and statuses",
  "agences.solution.item2": "Automatic reminders for quotes and invoices",
  "agences.solution.item3": "Integrated document management: storage, sorting, sharing",
  "agences.solution.item4": "Simple and effective dashboards",
  
  "agences.cta": "Discover for freelancers",

  //--------------Industrie -------------------
  "industrie.title": "Control your flows, costs, and performance in real time",
  "industrie.subtitle": "MEMO gives you clear visibility over the production chain, from inventory to sales.",
  "industrie.card.title": "Master your flows, costs, and inventory",

  "industrie.challenge.title": "Industrial challenges",
  "industrie.challenge.item1": "Data scattered across unconnected tools",
  "industrie.challenge.item2": "No real-time visibility on production costs",
  "industrie.challenge.item3": "Manual inventory management",
  "industrie.challenge.item4": "Complexity of accounting reconciliations",

  "industrie.solution.title": "MEMO solutions",
  "industrie.solution.item1": "Integrated tracking of supplies and production",
  "industrie.solution.item2": "Automatic calculation of direct/indirect costs",
  "industrie.solution.item3": "Alerts on critical stock levels",
  "industrie.solution.item4": "Automatic reconciliation of orders/invoices/accounting",

  "industrie.cta": "See the industrial solution",

  //------------- crp definition -------------------
  "crpDefinition.title": "MEMO CRP: Power Without the Complexity",
  "crpDefinition.subtitle": "The power of an ERP combined with the agility of a CRM — tailored for SMEs",

  "crpDefinition.definition.title": "What is a CRP?",
  "crpDefinition.definition.description": "A CRP (Customer Resource Planning) combines the power of an ERP with the flexibility of a CRM. MEMO centralizes your business processes, adapts to your workflows, and stays easy to use.",

  "crpDefinition.why.title": "Why Choose MEMO?",
  "crpDefinition.why.item1": "Custom-built to your specifications",
  "crpDefinition.why.item2": "Modular features, activated as needed",
  "crpDefinition.why.item3": "No subscription, no long-term commitment",
  "crpDefinition.why.item4": "Up to 3x cheaper than custom ERPs",
  "crpDefinition.why.item5": "Unlimited technical support",

  "crpDefinition.features.title": "Key Features",
  "crpDefinition.features.item1.title": "Projects & Worksites",
  "crpDefinition.features.item1.desc": "Plan and track resources by project",
  "crpDefinition.features.item2.title": "Quotes & Invoicing",
  "crpDefinition.features.item2.desc": "Auto-generate quotes and track payments",
  "crpDefinition.features.item3.title": "Automated Accounting",
  "crpDefinition.features.item3.desc": "Bank reconciliation and export to accounting software",
  "crpDefinition.features.item4.title": "Purchases & Suppliers",
  "crpDefinition.features.item4.desc": "Manage orders and supplier relations",
  "crpDefinition.features.item5.title": "KPIs & Dashboards",
  "crpDefinition.features.item5.desc": "Custom real-time performance dashboards",
  "crpDefinition.features.item6.title": "HR & Expenses",
  "crpDefinition.features.item6.desc": "Manage teams and professional expenses",
  // reuslratt --------------------
  "results.title": "What our clients are seeing",
  "results.item1": "-42% in billing delays",
  "results.item2": "+100% visibility on profitability",
  "results.item3": "Fewer late payments",
  "results.item4": "Zero double entry",
  "results.item5": "Real-time KPIs, net margins per project",
  "results.cta": "See client testimonials",
  "results.image.alt": "MEMO office scene",

  //--------------------- sign up -------------------
  
  "signup.title": "Create an Account",
  "signup.name.label": "Full Name",
  "signup.name.placeholder": "Your name",
  "signup.email.label": "Email Address",
  "signup.email.placeholder": "your@email.com",
  "signup.password.label": "Password",
  "signup.password.placeholder": "••••••••",
  "signup.submit": "Sign Up",
  "signup.loading": "Signing up...",
  "signup.or": "or",
  "signup.google": "Sign up with Google",
  "signup.already": "Already have an account?",
  "signup.login": "Log In",
  "signup.home": "Home",

  "signup.error.title": "Input Error",
  "signup.error.text": "Please correct the fields highlighted in red.",
  "signup.error.generic": "An error occurred during signup",
  "signup.error.google": "Google authentication failed. Please try again.",
  "signup.success.unverified.title": "Signup Successful",
  "signup.success.unverified.text": "A verification email has been sent to your address.",
  "signup.success.verified": "Welcome!",
  "signup.google.success": "Successfully signed in",

  "validation.name.required": "Name is required",
  "validation.name.short": "Name must be at least 3 characters long",
  "validation.email.required": "Email address is required",
  "validation.email.invalid": "Please enter a valid email address",
  "validation.password.required": "Password is required",
  "validation.password.weak": "Password must be at least 6 characters, with an uppercase letter, a lowercase letter, a number, and a special character",

  //-------------login ------------------------------------
  
  "login.title": "Login",
  "login.email.label": "Email address",
  "login.email.placeholder": "your@email.com",
  "login.password.label": "Password",
  "login.password.placeholder": "••••••••",
  "login.rememberMe": "Remember me",
  "login.submit": "Sign in",
  "login.loading": "Signing in...",
  "login.or": "or",
  "login.google": "Sign in with Google",
  "login.noAccount": "Don't have an account?",
  "login.signup": "Sign up",
  "login.home": "Home",

  "login.error.title": "Input Error",
  "login.error.text": "Please correct the fields highlighted in red.",
  "login.error.server": "Incorrect email or password.",
  "login.error.google": "Google login failed. Please try again.",
  "login.error.google.generic": "Google authentication failed",

  "login.success": "Login successful",

  "validation.email.required": "Email is required.",
  "validation.email.invalid": "Please enter a valid email address.",
  "validation.password.required": "Password is required.",

  //--------------------- mentions legales ---------------
  "legal.title": "Legal Notice",
  
  "legal.sections.editor.title": "Site Publisher",
  "legal.sections.editor.content.0": "This site is published by:",
  "legal.sections.editor.content.1": "SALAMBO PROSERV",
  "legal.sections.editor.content.2": "SARL with a capital of €10,000",
  "legal.sections.editor.content.3": "Head office: 30 BOULEVARD DE SEBASTOPOL PARIS, 75004 PARIS France",
  "legal.sections.editor.content.4": "Email: info@salambo-proserv.com",
  "legal.sections.editor.content.5": "Phone: +33 7 53 94 26 79",
  "legal.sections.editor.content.6": "Publication Director: Khalil WERHANI",

  "legal.sections.hosting.title": "Hosting",
  "legal.sections.hosting.content.0": "The site is hosted by:",
  "legal.sections.hosting.content.1": "IONOS",
  "legal.sections.hosting.content.2": "Address: 7 Pl. de la Gare, 57200 Sarreguemines, France",
  "legal.sections.hosting.content.3": "Phone: +33 970 808 911",

  "legal.sections.ip.title": "Intellectual Property",
  "legal.sections.ip.content.0": "All elements (texts, images, logos, trademarks, etc.) present on this site are protected by the Intellectual Property Code. Any reproduction or use without prior authorization is prohibited.",

  //---------------- politique confidentilait-------------------------------
  
  "privacy.title": "Privacy Policy",

  "privacy.sections.dataCollection.title": "Data Collection",
  "privacy.sections.dataCollection.content": "We only collect the data strictly necessary for the use of our MEMO platform (name, first name, professional email, phone number, company data, etc.).",

  "privacy.sections.dataUsage.title": "Data Usage",
  "privacy.sections.dataUsage.content": "The data is used exclusively for: managing customer accounts, sending communications related to our services, commercial follow-up, and technical support.",

  "privacy.sections.cookies.title": "Cookies",
  "privacy.sections.cookies.content": "The site uses cookies to improve the user experience. You can configure your preferences in your browser at any time.",

  "privacy.sections.security.title": "Storage and Security",
  "privacy.sections.security.content": "Data is stored securely and retained only as long as necessary for the purposes for which it is processed.",

  "privacy.sections.rights.title": "Your Rights",
  "privacy.sections.rights.content": "In accordance with GDPR, you have the right to access, rectify, delete, and object to your data. To exercise these rights, please contact us at: contact@habile-solutions.com",

  //------------------- CGU -------------------------------
  "cgu.title": "Terms of Use",

  "cgu.articles.1.title": "Article 1 - Purpose",
  "cgu.articles.1.content": "These Terms of Use define the conditions of access and use of the MEMO platform offered by HABILE SOLUTION.",

  "cgu.articles.2.title": "Article 2 - Acceptance",
  "cgu.articles.2.content": "By accessing the site or using the MEMO platform, the user acknowledges having read, understood, and unreservedly accepted these Terms of Use.",

  "cgu.articles.3.title": "Article 3 - Access to the service",
  "cgu.articles.3.content": "Access to MEMO is reserved for professional users with a valid account. HABILE SOLUTION reserves the right to suspend or restrict access in case of non-compliance with the terms of use.",

  "cgu.articles.4.title": "Article 4 - User obligations",
  "cgu.articles.4.content": "The user agrees to provide accurate information during registration, keep their credentials confidential, and not use the platform for fraudulent or illegal purposes.",

  "cgu.articles.5.title": "Article 5 - Intellectual property",
  "cgu.articles.5.content": "All elements of the platform (codes, interfaces, content, visuals, etc.) are protected by intellectual property rights. Any unauthorized reproduction or distribution is strictly prohibited.",

  "cgu.articles.6.title": "Article 6 - Liability",
  "cgu.articles.6.content": "MEMO implements all reasonable means to ensure the availability and security of the service but cannot be held responsible for interruptions, failures, or data loss due to force majeure or misuse of the service.",

  "cgu.articles.7.title": "Article 7 - Modification of the Terms",
  "cgu.articles.7.content": "HABILE SOLUTION reserves the right to modify the Terms of Use at any time. Users will be informed of any major changes by email or notification on the platform.",

  "cgu.articles.8.title": "Article 8 - Applicable law",
  "cgu.articles.8.content": "These Terms of Use are governed by French law. In case of dispute, the parties will seek an amicable solution. Otherwise, the competent court will be that of HABILE SOLUTION’s registered office.",











    },
  },
  fr: {
    translation: {
      // Navbar
      "navbar.solution": "Solution",
      "navbar.solution.tooltip":
        "Découvrez l'approche CRP, plus agile qu'un ERP",
      "navbar.solution.submenu.qu_est_ce_qu_un_crp": "Qu'est-ce qu'un CRP ?",
      "navbar.solution.submenu.pourquoi_choisir_memo":
        "Pourquoi choisir MEMO ?",
      "navbar.solution.submenu.fonctionnalites_cles": "Fonctionnalités clés",

      "navbar.pour_qui": "Pour qui ?",
      "navbar.pour_qui.tooltip": "Une solution personnalisée pour votre métier",
      "navbar.pour_qui.submenu.pme_de_services": "PME de services",
      "navbar.pour_qui.submenu.btp_architecture": "BTP & architecture",
      "navbar.pour_qui.submenu.agences_independants": "Agences & indépendants",
      "navbar.pour_qui.submenu.industrie_production": "Industrie & production",

      "navbar.resultats": "Résultats",
      "navbar.resultats.tooltip": "Ce que nos clients constatent",

      "navbar.ressources": "Ressources",
      "navbar.ressources.tooltip": "Comprendre MEMO avant de s'engager",
      "navbar.ressources.submenu.videos_demonstration":
        "Vidéos de démonstration",
      "navbar.ressources.submenu.faq": "FAQ",
      "navbar.ressources.submenu.tarification": "Tarification",
      "navbar.contact": "Contact",
      "navbar.contact.tooltip": "Nous contacter pour en savoir plus",

      
      "navbar.moreMenu.yourSpace": "Votre espace",
      "navbar.moreMenu.logout": "🔓 Déconnexion",
      "navbar.moreMenu.login": "Connexion",
      "navbar.moreMenu.signup": "Créer un compte",

      "navbar.mobile.demoRequest": "Demander une démo",
      "navbar.mobile.contactUs": "Nous contacter",
      "navbar.mobile.yourSpace": "Votre espace",
      "navbar.mobile.logout": "Déconnexion",
      "navbar.mobile.login": "Connexion",
      "navbar.mobile.signup": "Créer un compte",
      // Footer
      "footer.contact.description":
        "La plateforme qui structure votre gestion.",
      "footer.contact.email": "contact@habile-solutions.com",
      "footer.contact.phone": "+33 7 53 94 26 79",

      "footer.nav.title": "Navigation",
      "footer.nav.solution": "Solution",
      "footer.nav.pourQui": "Pour qui ?",
      "footer.nav.resultats": "Résultats",
      "footer.nav.ressources": "Ressources",
      "footer.nav.demo": "Demander une démo",

      "footer.legal.title": "Légal",
      "footer.legal.mentions": "Mentions légales",
      "footer.legal.confidentialite": "Politique de confidentialité",
      "footer.legal.cgu": "CGU",

      "footer.newsletter.title": "Newsletter",
      "footer.newsletter.subtitle":
        "Recevez nos conseils pour optimiser votre gestion d’entreprise.",
      "footer.newsletter.placeholder": "Votre email",
      "footer.newsletter.cta": "S'inscrire",

      "footer.trustedBy": "Ils nous font confiance",

      "footer.copyright": "© {{year}} MEMO — Tous droits réservés.",

      "footer.language.select": "🌐",
      "footer.language.fr": "Français",
      "footer.language.en": "English",
      // Blog Page
      "blog.headerTag": "BLOG",
      "blog.title": "Notre Blog",
      "blog.subtitle":
        "Découvrez nos derniers articles, conseils et actualités pour optimiser la gestion de votre entreprise",
      "blog.searchPlaceholder": "Rechercher un article...",
      "blog.categories.all": "Tous",
      "blog.categories.projectManagement": "Gestion de Projets",
      "blog.categories.crm": "CRM",
      "blog.categories.accounting": "Comptabilité",
      "blog.categories.innovation": "Innovation",
      "blog.categories.finance": "Finance",
      "blog.readTime": "de lecture",
      "blog.readMore": "Lire la suite",
      "blog.noResults": "Aucun article trouvé",
      "blog.noResultsHint":
        "Essayez de modifier vos critères de recherche ou de filtrage.",
      "blog.newsletterTitle": "Restez informé de nos dernières actualités",
      "blog.newsletterSubtitle":
        "Recevez nos articles directement dans votre boîte mail",
      "blog.newsletterEmailPlaceholder": "Votre adresse email",
      "blog.subscribe": "S'abonner",
      // SavoirPlus Page
      "savoir.headerTag": "Centre d'aide",
      "savoir.title": "Comment pouvons-nous vous aider ?",
      "savoir.subtitle":
        "Trouvez rapidement les réponses à vos questions et découvrez tous les secrets de CRP MEMO",
      "savoir.searchPlaceholder": "Rechercher dans la documentation...",
      "savoir.quickActions.support": "Contacter le support",
      "savoir.quickActions.videos": "Tutoriels vidéo",
      "savoir.quickActions.api": "Documentation API",
      "savoir.quickActions.community": "Communauté",
      "savoir.helpCategories.gettingStarted.title": "Premiers pas",
      "savoir.helpCategories.gettingStarted.description":
        "Découvrez les bases de CRP MEMO",
      "savoir.helpCategories.projectManagement.title": "Gestion de projets",
      "savoir.helpCategories.projectManagement.description":
        "Maîtrisez tous les aspects de la gestion de projets",
      "savoir.helpCategories.crm.title": "CRM & Clients",
      "savoir.helpCategories.crm.description":
        "Optimisez votre relation client",
      "savoir.helpCategories.billing.title": "Facturation",
      "savoir.helpCategories.billing.description":
        "Gérez vos factures et paiements",
      "savoir.allArticles": "Tous les articles",
      "savoir.featuredTitle": "Articles populaires",
      "savoir.views": "vues",
      "savoir.readArticle": "Lire l'article",
      "savoir.noResults": "Aucun article trouvé",
      "savoir.noResultsHint":
        "Essayez de modifier vos critères de recherche ou de filtrage.",
      "savoir.supportTitle": "Vous ne trouvez pas ce que vous cherchez ?",
      "savoir.supportSubtitle":
        "Notre équipe de support est là pour vous aider. Contactez-nous directement pour obtenir une assistance personnalisée.",
      "savoir.supportButton": "Contacter le support",
      // Hero Section

      "heroCRPMemo.title": "CRP MEMO",
      "heroCRPMemo.subtitle":
        "L'outil de gestion nouvelle génération pensé pour vos processus métiers. Centralisez vos flux, automatisez la comptabilité et pilotez en temps réel.",
      "heroCRPMemo.cta": "Je prends un RDV gratuit",

      "heroCRPMemo.whatIs.title": "Qu'est-ce qu'un CRP ?",
      "heroCRPMemo.whatIs.intro":
        "Une solution sur mesure pour centraliser et automatiser vos flux métiers.",

      "heroCRPMemo.table.title": "Fonctionnalités",
      "heroCRPMemo.table.column.feature": "Fonctionnalités",
      "heroCRPMemo.table.column.crm": "CRM",
      "heroCRPMemo.table.column.erp": "ERP",
      "heroCRPMemo.table.column.crp": "CRP (MEMO)",

      "heroCRPMemo.table.row.0": "Gestion commerciale",
      "heroCRPMemo.table.row.1": "Comptabilité",
      "heroCRPMemo.table.row.2": "Adapté à votre métier",
      "heroCRPMemo.table.row.3": "Interface personnalisée",
      "heroCRPMemo.table.row.4": "Déploiement rapide",
      "heroCRPMemo.table.row.5": "Licence sans abonnement",

      "heroCRPMemo.cards.0.title": "Centré sur vos processus",
      "heroCRPMemo.cards.0.description": "MEMO s'adapte à votre métier.",
      "heroCRPMemo.cards.1.title": "Tous vos flux en un outil",
      "heroCRPMemo.cards.1.description": "Gestion complète des flux.",
      "heroCRPMemo.cards.2.title": "Pilotage temps réel",
      "heroCRPMemo.cards.2.description": "Tableaux de bord personnalisés.",
      "heroCRPMemo.cards.3.title": "Conçu avec vos équipes",
      "heroCRPMemo.cards.3.description": "Solution sur mesure.",
      // Contact Section
      "contact.title": "Contactez-nous",
      "contact.description":
        "Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.",
      "contact.socials.title": "Suivez-nous",
      "contact.form.title": "Envoyez-nous un message",
      "contact.form.name.label": "Nom complet",
      "contact.form.name.placeholder": "Votre nom",
      "contact.form.email.label": "Adresse email",
      "contact.form.email.placeholder": "votre@email.com",
      "contact.form.subject.label": "Sujet",
      "contact.form.subject.placeholder": "Sujet de votre message",
      "contact.form.message.label": "Message",
      "contact.form.message.placeholder": "Votre message...",
      "contact.form.submit.button": "Envoyer le message",
      //-----------crp-------------------------------

      "crp.title": "Votre quotidien, réinventé avec  ",
      "crp.subtitle":
        "4 piliers pour moderniser votre gestion au quotidien, de manière fluide, collaborative et automatisée.",

      "crp.pillars.pillar1.label": "Pilier #1",
      "crp.pillars.pillar1.title": "Tous vos flux en un outil",
      "crp.pillars.pillar1.description":
        "Vos devis, factures, suivis de chantier, RH, documents et budgets dans un seul espace.",

      "crp.pillars.pillar2.label": "Pilier #2",
      "crp.pillars.pillar2.title": "Automatisation métier",
      "crp.pillars.pillar2.description":
        "Plus besoin de relancer, saisir deux fois, ou calculer manuellement : MEMO gère pour vous.",

      "crp.pillars.pillar3.label": "Pilier #3",
      "crp.pillars.pillar3.title": "Collaboration sans obstacles",
      "crp.pillars.pillar3.description":
        "Vos équipes échangent en temps réel sur les projets, RH, ou validations, sans mail ni Excel.",

      "crp.pillars.pillar4.label": "Pilier #4",
      "crp.pillars.pillar4.title": "Pilotage en temps réel",
      "crp.pillars.pillar4.description":
        "Suivez vos marges, retards, dépenses, et décisions à la seconde près. Objectif : rentabilité.",

      "crp.cta.text":
        "Ne changez rien, sauf vos résultats. Parlons de votre quotidien avec MEMO.",
      "crp.cta.button": "Contactez-nous",

      //-------------------highlights-------------------

      "highlights.title": "Pourquoi choisir ",
      "highlights.subtitle":
        "4 piliers conçus pour faire progresser votre entreprise, au quotidien.",

      "highlights.pillar1.label": "Atout #1",
      "highlights.pillar1.title": "Sur-mesure métier",
      "highlights.pillar1.description":
        "Chaque version de MEMO est entièrement pensée pour votre entreprise : ses règles, ses habitudes, ses priorités.",

      "highlights.pillar2.label": "Atout #2",
      "highlights.pillar2.title": "Gestion centralisée",
      "highlights.pillar2.description":
        "Devis, factures, fournisseurs, suivi des marges, impayés, recouvrements...MEMO simplifie la complexité.",

      "highlights.pillar3.label": "Atout #3",
      "highlights.pillar3.title": "Décision en temps réel",
      "highlights.pillar3.description":
        "Vos tableaux de bord évoluent avec vous : indicateurs intelligents, prévisions, alertes automatiques.",

      "highlights.pillar4.label": "Atout #4",
      "highlights.pillar4.title": "Finance automatisée",
      "highlights.pillar4.description":
        "Automatisez la gestion financière et budgétaire : synchronisation bancaire, rapprochements, suivi précis.",

      "highlights.cta.text1": "Pas une solution générique. Pas un ERP.",
      "highlights.cta.text2": "est fait pour vous.",

      "highlights.cta.button": "Réserver un appel découverte",
      //------------- product defintiion -------------------
      "erpSection.title.highlight": "MEMO",
      "erpSection.title": "la puissance d’un ERP sans ses contraintes",
      "erpSection.subtitle":
        "Un logiciel métier pensé pour votre réalité terrain : rapide à déployer, économique, sécurisé et 100 % adapté.",
      "erpSection.feature.fastDeployment.title": "Déploiement rapide",
      "erpSection.feature.fastDeployment.description":
        "Go live en quelques semaines sans redéveloppement complexe.",
      "erpSection.feature.costSaving.title": "Économie prouvée",
      "erpSection.feature.costSaving.description":
        "Un coût total de possession (TCO) jusqu’à 60 % inférieur aux ERP classiques.",
      "erpSection.feature.gdprSecurity.title": "Sécurité RGPD intégrée",
      "erpSection.feature.gdprSecurity.description":
        "Architecture robuste, hébergement sécurisé, conformité RGPD assurée.",
      //------------------Video Demo ----------------------
      "videoDemo.title":
        "Prenez 2 minutes pour comprendre l’impact de MEMO sur votre performance",
      "videoDemo.subtitle":
        "Découvrez comment MEMO structure, simplifie et fiabilise la gestion de votre entreprise : pilotage centralisé, automatisation des tâches, visibilité temps réel.",
      "videoDemo.cta": "Voir la démonstration",
      "videoDemo.alt": "Accéder à la vidéo de démonstration",
      "videoDemo.resume":
        "Une démonstration claire et opérationnelle des fonctions clés : gestion de projet, facturation, suivi client, comptabilité et reporting.",
      "videoDemo.banner":
        "MEMO en action – la gestion centralisée en 2 minutes",
      "videoDemo.modal.close": "Fermer la vidéo",
      //-------------Etapes -------------------
      "etapes.title": "Déploiement",
      "etapes.subtitle":
        "Un processus clair, collaboratif et rapide pour une mise en œuvre réussie.",

      "etapes.steps.1.title": "Qualification",
      "etapes.steps.1.description":
        "Validation du besoin, des priorités et processus avec un expert MEMO.",

      "etapes.steps.2.title": "Immersion terrain",
      "etapes.steps.2.description":
        "Visite sur site pour comprendre votre organisation et vos enjeux quotidiens.",

      "etapes.steps.3.title": "cahier des charges",
      "etapes.steps.3.description":
        "Co-construction d’un périmètre fonctionnel précis avec vos équipes.",

      "etapes.steps.4.title": "Livraison d’une V1",
      "etapes.steps.4.description":
        "Première version testable et ajustements immédiats selon les retours.",

      "etapes.steps.5.title": "Itérations agiles",
      "etapes.steps.5.description":
        "Ping-pong rapide avec vos équipes pour peaufiner l'expérience utilisateur.",

      "etapes.steps.6.title": "Mise en production",
      "etapes.steps.6.description":
        "Déploiement officiel, formation des utilisateurs et support dès le jour 1.",

      //-------------------tarifs --------------------------

      "pricing.title": "Une structure de coûts pensée pour les PME",
      "pricing.subtitle":
        "Investissement clair, licence sans surprise, et support complet : MEMO vous garantit une maîtrise budgétaire totale.",

      "pricing.pack1.title": "Conception sur mesure",
      "pricing.pack1.feature1": "✓ Analyse métier détaillée",
      "pricing.pack1.feature2": "✓ Cahier des charges sur mesure",
      "pricing.pack1.feature3": "✓ Développement adapté à vos besoins",
      "pricing.pack1.feature4": "✓ Accompagnement au changement",
      "pricing.pack1.footer":
        "Forfait unique défini selon votre périmètre fonctionnel",

      "pricing.pack2.title": "Licence logicielle MEMO",
      "pricing.pack2.feature1": "✓ Utilisation illimitée",
      "pricing.pack2.feature2": "✓ Mises à jour incluses",
      "pricing.pack2.feature3": "✓ Propriété de la licence sans engagement",
      "pricing.pack2.footer": "Paiement adapté selon le nombre d'utilisateurs",

      "pricing.pack3.title": "Support & hébergement",
      "pricing.pack3.feature1": "✓ Hébergement sécurisé",
      "pricing.pack3.feature2": "✓ Support illimité",
      "pricing.pack3.feature3": "✓ Surveillance 24/7",
      "pricing.pack3.footer": "Abonnement mensuel transparent, sans engagement",
      //------------Btp -----------------------
      "btp.title": "Pilotez vos chantiers et vos marges avec ",
  "btp.subtitle": "MEMO vous aide à mieux gérer vos projets de construction, vos sous-traitants et vos DGD, en toute simplicité.",
 

  "btp.challenge.title": "Enjeux du BTP",
  "btp.challenge.item1": "Suivi des chantiers éparpillé",
  "btp.challenge.item2": "Manque de contrôle sur les marges",
  "btp.challenge.item3": "Suivi manuel des DGD, sous-traitants, approvisionnements",
  "btp.challenge.item4": "Délais de facturation trop longs",

  "btp.solution.title": "Solutions MEMO",
  "btp.solution.item1": "Suivi par chantier : planning, budget, ressources",
  "btp.solution.item2": "Indicateurs de marge nette par opération",
  "btp.solution.item3": "Gestion simplifiée des validations, DGD et livraisons",
  "btp.solution.item4": "Génération automatique des factures de situation" ,
  //--------------pme -------------------
   "pme.title": "Structurez vos opérations de A à Z avec MEMO",
  "pme.subtitle": "MEMO automatise votre cycle de gestion : devis, facturation, achats, RH... dans une seule interface.",
 

  "pme.challenge.title": "Enjeux des PME",
  "pme.challenge.item1": "Perte de temps à jongler entre plusieurs outils",
  "pme.challenge.item2": "Difficulté à suivre les marges réelles",
  "pme.challenge.item3": "Tâches administratives chronophages",
  "pme.challenge.item4": "Risques d'erreurs comptables",

  "pme.solution.title": "Solutions MEMO",
  "pme.solution.item1": "Automatisation des devis, factures et relances",
  "pme.solution.item2": "Suivi des marges en temps réel",
  "pme.solution.item3": "Centralisation RH, fournisseurs et clients",
  "pme.solution.item4": "Comptabilité intégrée avec export vers expert-comptable",

  //-----------------agence -------------------------------
    "agences.title": "Centralisez missions, documents et clients",
  "agences.subtitle": "MEMO simplifie la gestion de votre activité : devis, factures, documents et pilotage réunis dans un outil fluide.",
  
  "agences.challenge.title": "Enjeux des indépendants",
  "agences.challenge.item1": "Difficulté à suivre les missions actives",
  "agences.challenge.item2": "Perte de temps dans les relances clients",
  "agences.challenge.item3": "Documents dispersés sur différents supports",
  "agences.challenge.item4": "Manque de visibilité sur les encaissements",
  
  "agences.solution.title": "Solutions MEMO",
  "agences.solution.item1": "Vue consolidée des missions, échéances, statuts",
  "agences.solution.item2": "Relances automatiques des devis et factures",
  "agences.solution.item3": "GED intégrée : stockage, tri, partage",
  "agences.solution.item4": "Tableaux de bord simples et efficaces",
  
  "agences.cta": "Découvrir pour les indépendants",

  //-----------------industrie -------------------------------
  "industrie.title": "Maîtrisez vos flux, vos coûts, vos stocks",
  "industrie.subtitle": "MEMO vous donne une vision claire sur la chaîne de production, du stock aux ventes.",

  "industrie.challenge.title": "Enjeux industriels",
  "industrie.challenge.item1": "Données dispersées entre outils non connectés",
  "industrie.challenge.item2": "Pas de vision en temps réel sur les coûts de production",
  "industrie.challenge.item3": "Gestion des stocks manuelle",
  "industrie.challenge.item4": "Complexité des rapprochements comptables",

  "industrie.solution.title": "Solutions MEMO",
  "industrie.solution.item1": "Suivi intégré des approvisionnements et production",
  "industrie.solution.item2": "Calcul automatique des coûts directs/indirects",
  "industrie.solution.item3": "Alerte sur les seuils critiques de stock",
  "industrie.solution.item4": "Rapprochement automatique commandes/factures/compta",

  "industrie.cta": "Voir la solution industrielle",

  ///--------------------- crp defintion-----------------
  "crpDefinition.title": "MEMO CRP : L'essentiel sans la complexité",
  "crpDefinition.subtitle": "La puissance d'un ERP couplée à l'agilité d'un CRM, spécialement conçu pour les PME",

  "crpDefinition.definition.title": "Qu'est-ce qu'un CRP ?",
  "crpDefinition.definition.description": "Un CRP (Customer Resource Planning) allie la puissance d'un ERP à l'agilité d'un CRM. MEMO centralise les processus métiers, s'adapte à vos méthodes de travail, et reste simple à utiliser.",

  "crpDefinition.why.title": "Pourquoi choisir MEMO ?",
  "crpDefinition.why.item1": "Solution sur cahier des charges",
  "crpDefinition.why.item2": "Modules activables à la carte",
  "crpDefinition.why.item3": "Sans abonnement, sans engagement",
  "crpDefinition.why.item4": "Jusqu'à 3x moins cher qu'un ERP sur mesure",
  "crpDefinition.why.item5": "Support technique illimité",

  "crpDefinition.features.title": "Fonctionnalités clés",
  "crpDefinition.features.item1.title": "Projets & chantiers",
  "crpDefinition.features.item1.desc": "Planification et suivi des ressources par projet",
  "crpDefinition.features.item2.title": "Devis & facturation",
  "crpDefinition.features.item2.desc": "Génération automatique et suivi des paiements",
  "crpDefinition.features.item3.title": "Comptabilité automatisée",
  "crpDefinition.features.item3.desc": "Rapprochement bancaire et exports comptables",
  "crpDefinition.features.item4.title": "Achats & fournisseurs",
  "crpDefinition.features.item4.desc": "Gestion des commandes et relations fournisseurs",
  "crpDefinition.features.item5.title": "KPIs & pilotage",
  "crpDefinition.features.item5.desc": "Tableaux de bord personnalisables en temps réel",
  "crpDefinition.features.item6.title": "RH & notes de frais",
  "crpDefinition.features.item6.desc": "Gestion des équipes et dépenses professionnelles",

  //---- resultat ----------------------------
  "results.title": "Ce que nos clients constatent",
  "results.item1": "-42% de délai de facturation",
  "results.item2": "+100% de visibilité sur la rentabilité",
  "results.item3": "Moins de retard de paiement",
  "results.item4": "Zéro double saisie",
  "results.item5": "KPIs temps réel, marges nettes par dossier",
  "results.cta": "Voir les témoignages clients",
  "results.image.alt": "Scène de bureau CRP MEMO",
  //----------- signup ---------------------
  
  "signup.title": "Créer un compte",
  "signup.name.label": "Nom complet",
  "signup.name.placeholder": "Votre nom",
  "signup.email.label": "Adresse email",
  "signup.email.placeholder": "votre@email.com",
  "signup.password.label": "Mot de passe",
  "signup.password.placeholder": "••••••••",
  "signup.submit": "S'inscrire",
  "signup.loading": "Inscription en cours...",
  "signup.or": "ou",
  "signup.google": "S'inscrire avec Google",
  "signup.already": "Vous avez déjà un compte ?",
  "signup.login": "Connectez-vous",
  "signup.home": "Accueil",

  "signup.error.title": "Erreur de saisie",
  "signup.error.text": "Veuillez corriger les champs indiqués en rouge.",
  "signup.error.generic": "Une erreur est survenue lors de l'inscription",
  "signup.error.google": "Échec de l'authentification Google. Veuillez réessayer.",
  "signup.success.unverified.title": "Inscription réussie",
  "signup.success.unverified.text": "Un email de vérification a été envoyé à votre adresse.",
  "signup.success.verified": "Bienvenue !",
  "signup.google.success": "Connexion réussie",

  "validation.name.required": "Le nom est requis",
  "validation.name.short": "Le nom doit contenir au moins 3 caractères",
  "validation.email.required": "L'adresse email est requise",
  "validation.email.invalid": "Veuillez entrer un email valide",
  "validation.password.required": "Le mot de passe est requis",
  "validation.password.weak": "Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",

  //--------------------login-------------------------------
   "login.title": "Connexion",
  "login.email.label": "Adresse email",
  "login.email.placeholder": "votre@email.com",
  "login.password.label": "Mot de passe",
  "login.password.placeholder": "••••••••",
  "login.rememberMe": "Se souvenir de moi",
  "login.submit": "Se connecter",
  "login.loading": "Connexion...",
  "login.or": "ou",
  "login.google": "Se connecter avec Google",
  "login.noAccount": "Vous n'avez pas de compte ?",
  "login.signup": "Inscrivez-vous",
  "login.home": "Accueil",

  "login.error.title": "Erreur de saisie",
  "login.error.text": "Veuillez corriger les champs indiqués en rouge.",
  "login.error.server": "Email ou mot de passe incorrect.",
  "login.error.google": "Échec de la connexion Google. Veuillez réessayer.",
  "login.error.google.generic": "Échec de l'authentification Google",

  "login.success": "Connexion réussie",

  "validation.email.required": "L'adresse email est requise.",
  "validation.email.invalid": "Veuillez entrer un email valide.",
  "validation.password.required": "Le mot de passe est requis.",

  //--------------------mentions legales --------------------------------
  
  "legal.title": "Mentions Légales",
  
  "legal.sections.editor.title": "Éditeur du site",
  "legal.sections.editor.content.0": "Ce site est édité par :",
  "legal.sections.editor.content.1": "SALAMBO PROSERV",
  "legal.sections.editor.content.2": "SARL au capital de 10 000 €",
  "legal.sections.editor.content.3": "Siège social : 30 BOULEVARD DE SEBASTOPOL PARIS, 75004 PARIS France",
  "legal.sections.editor.content.4": "Email : info@salambo-proserv.com",
  "legal.sections.editor.content.5": "Téléphone : +33 7 53 94 26 79",
  "legal.sections.editor.content.6": "Directeur de la publication : Khalil WERHANI",

  "legal.sections.hosting.title": "Hébergement",
  "legal.sections.hosting.content.0": "Le site est hébergé par :",
  "legal.sections.hosting.content.1": "IONOS",
  "legal.sections.hosting.content.2": "Adresse : 7 Pl. de la Gare, 57200 Sarreguemines, France",
  "legal.sections.hosting.content.3": "Téléphone : +33 970 808 911",

  "legal.sections.ip.title": "Propriété intellectuelle",
  "legal.sections.ip.content.0": "L'ensemble des éléments (textes, images, logos, marques, etc.) présents sur ce site sont protégés par le Code de la propriété intellectuelle. Toute reproduction ou utilisation sans autorisation préalable est interdite.",

  //-----------------------politique de confidentialité -------------------

  "privacy.title": "Politique de Confidentialité",

  "privacy.sections.dataCollection.title": "Collecte des données",
  "privacy.sections.dataCollection.content": "Nous collectons uniquement les données strictement nécessaires à l'utilisation de notre plateforme MEMO (nom, prénom, email professionnel, téléphone, données d'entreprise, etc.).",

  "privacy.sections.dataUsage.title": "Utilisation des données",
  "privacy.sections.dataUsage.content": "Les données sont utilisées exclusivement pour : la gestion des comptes clients, l'envoi de communications liées à nos services, le suivi commercial et le support technique.",

  "privacy.sections.cookies.title": "Cookies",
  "privacy.sections.cookies.content": "Le site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez configurer vos préférences dans votre navigateur à tout moment.",

  "privacy.sections.security.title": "Conservation et sécurité",
  "privacy.sections.security.content": "Les données sont stockées de manière sécurisée et conservées pendant la durée strictement nécessaire au regard des finalités pour lesquelles elles sont traitées.",

  "privacy.sections.rights.title": "Vos droits",
  "privacy.sections.rights.content": "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition sur vos données. Pour exercer ces droits, contactez-nous à : contact@habile-solutions.com",

  //--------------- CGU-----------------------------
  
  "cgu.title": "Conditions Générales d'Utilisation",

  "cgu.articles.1.title": "Article 1 - Objet",
  "cgu.articles.1.content": "Les présentes CGU ont pour objet de définir les modalités d'accès et d'utilisation de la plateforme MEMO proposée par HABILE SOLUTION.",

  "cgu.articles.2.title": "Article 2 - Acceptation",
  "cgu.articles.2.content": "En accédant au site ou en utilisant la plateforme MEMO, l'utilisateur reconnaît avoir lu, compris et accepté sans réserve les présentes CGU.",

  "cgu.articles.3.title": "Article 3 - Accès au service",
  "cgu.articles.3.content": "L'accès à MEMO est réservé aux utilisateurs professionnels disposant d'un compte valide. HABILE SOLUTION se réserve le droit de suspendre ou de restreindre l'accès en cas de non-respect des conditions d'utilisation.",

  "cgu.articles.4.title": "Article 4 - Obligations de l'utilisateur",
  "cgu.articles.4.content": "L'utilisateur s'engage à fournir des informations exactes lors de son inscription, à conserver la confidentialité de ses identifiants, et à ne pas utiliser la plateforme à des fins frauduleuses ou illicites.",

  "cgu.articles.5.title": "Article 5 - Propriété intellectuelle",
  "cgu.articles.5.content": "Tous les éléments de la plateforme (codes, interfaces, contenus, visuels, etc.) sont protégés par des droits de propriété intellectuelle. Toute reproduction ou diffusion non autorisée est strictement interdite.",

  "cgu.articles.6.title": "Article 6 - Responsabilité",
  "cgu.articles.6.content": "MEMO met en œuvre tous les moyens raisonnables pour assurer la disponibilité et la sécurité du service, mais ne peut être tenu responsable en cas d'interruption, de défaillance ou de perte de données liée à un cas de force majeure ou à une mauvaise utilisation du service.",

  "cgu.articles.7.title": "Article 7 - Modification des CGU",
  "cgu.articles.7.content": "HABILE SOLUTION se réserve le droit de modifier les CGU à tout moment. Les utilisateurs seront informés de toute modification majeure par email ou notification sur la plateforme.",

  "cgu.articles.8.title": "Article 8 - Droit applicable",
  "cgu.articles.8.content": "Les présentes CGU sont soumises au droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, le tribunal compétent sera celui du siège de HABILE SOLUTION."








    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("i18nextLng") || "fr",
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;