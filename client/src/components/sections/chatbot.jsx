import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Home, MessageSquare, HelpCircle, ArrowLeft, Mail, Phone, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import chatbotData from "../sections/qaData";

export default function Chatbot({ isChatOpen, toggleChat }) {
  const [messages, setMessages] = useState([]);
  const [chatMode, setChatMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [askedQuestions, setAskedQuestions] = useState(new Set());
  const [welcomeSent, setWelcomeSent] = useState(false);
  const [expertChatMode, setExpertChatMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);
  const messageRefs = useRef({});
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen && !welcomeSent) {
      const welcomeMsg = {
        content: chatbotData.welcome_message,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
      setWelcomeSent(true);
    }

    if (!isChatOpen) {
      setWelcomeSent(false);
      setMessages([]);
      setChatMode(false);
      setSelectedCategory(null);
      setAskedQuestions(new Set());
      setExpertChatMode(false);
      setSearchQuery("");
    }
  }, [isChatOpen, welcomeSent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "")
      .trim();
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() && chatMode) {
      const query = searchQuery.trim();
      const normalizedQuery = normalizeText(query);

      // Utiliser chatbotData.search pour trouver une correspondance
      const result = chatbotData.search(query);
      if (result) {
        const { question, answer } = result;
        if (!askedQuestions.has(question)) {
          const userMsg = {
            content: question,
            sender: "user",
            timestamp: new Date(),
          };
          const aiMsg = {
            content: answer,
            sender: "ai",
            timestamp: new Date(),
            questionKey: question,
          };
          setMessages((prev) => [...prev, userMsg, aiMsg]);
          setAskedQuestions((prev) => new Set(prev).add(question));
          setSearchQuery("");
          setTimeout(scrollToBottom, 100);
        } else {
          const targetEl = messageRefs.current[question];
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            scrollToBottom();
          }
        }
        return;
      }

      // Si aucune correspondance exacte, afficher un message d'erreur
      const notFoundMsg = {
        content: "Je n'ai pas trouvé de réponse à votre recherche. Essayez avec d'autres mots-clés ou contactez un conseiller.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, notFoundMsg]);
      setSearchQuery("");
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleActionClick = (action) => {
    if (action === "message") {
      setChatMode(true);
      if (!welcomeSent) {
        const aiMsg = {
          content: chatbotData.welcome_message,
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setWelcomeSent(true);
      }
    } else if (action === "faq") {
      window.open("https://www.example.com/faq", "_blank");
    }
  };

  const handleQuickReplyClick = (payload) => {
    if (payload === "contact") {
      setExpertChatMode(true);
      setChatMode(true);
      setSelectedCategory(null);
      setAskedQuestions(new Set());
      setSearchQuery("");
      const expertMsg = {
        content: "Vous êtes maintenant en conversation avec un expert. Choisissez un moyen de contact ci-dessous.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, expertMsg]);
      return;
    }

    setSelectedCategory(payload);
    const categoryMsg = {
      content: `Vous avez sélectionné : ${chatbotData.quick_replies.find((q) => q.payload === payload).label}`,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, categoryMsg]);
  };

  const handleQuestionClick = (question, answer) => {
    if (askedQuestions.has(question)) {
      const targetEl = messageRefs.current[question];
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        scrollToBottom();
      }
      return;
    }

    const userMsg = {
      content: question,
      sender: "user",
      timestamp: new Date(),
    };
    const aiMsg = {
      content: answer,
      sender: "ai",
      timestamp: new Date(),
      questionKey: question,
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setAskedQuestions((prev) => new Set(prev).add(question));
    setTimeout(scrollToBottom, 100);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setExpertChatMode(false);
    const backMsg = {
      content: "Retour aux options principales",
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, backMsg]);
  };

  const handleNavClick = (type) => {
    if (type === "home") {
      setChatMode(false);
      setSelectedCategory(null);
      setAskedQuestions(new Set());
      setWelcomeSent(false);
      setMessages([]);
      setExpertChatMode(false);
      setSearchQuery("");
      const welcomeMsg = {
        content: chatbotData.welcome_message,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    } else if (type === "conversations") {
      setExpertChatMode(true);
      setChatMode(true);
      setSelectedCategory(null);
      setAskedQuestions(new Set());
      setSearchQuery("");
      const expertMsg = {
        content: "Vous êtes maintenant en conversation avec un expert. Choisissez un moyen de contact ci-dessous.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([expertMsg]);
    } else if (type === "help") {
      navigate("/dashboard/centredaide");
    }
  };

  const handleEmailExpert = () => {
    const subject = encodeURIComponent("Demande d'assistance d'un expert - CRP MEMO");
    const body = encodeURIComponent("Bonjour,\n\nJe souhaite obtenir de l'aide d'un expert concernant : [veuillez décrire votre demande].\n\nCordialement,\n[Votre nom]");
    window.open(`mailto:info@salambo-proserv.com?subject=${subject}&body=${body}`, "_blank");
  };

  const handleCallExpert = () => {
    window.location.href = "tel:+33753942679";
  };

  // Filtrer les questions en fonction des mots-clés et des questions
  const filteredQuestions = Object.values(chatbotData.reponses)
    .flat()
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      const normalizedQuery = normalizeText(searchQuery);
      const queryWords = normalizedQuery.split(/\s+/);
      const normalizedQuestion = normalizeText(item.question);
      const questionWords = normalizedQuestion.split(/\s+/);
      const keywords = item.keywords.map(normalizeText);

      // Vérifier si la requête correspond à la question ou à un mot-clé
      return (
        queryWords.some((word) => normalizedQuestion.includes(word)) ||
        queryWords.some((word) => questionWords.includes(word)) ||
        queryWords.some((word) => keywords.some((keyword) => keyword.includes(word))) ||
        keywords.some((keyword) => normalizedQuery.includes(keyword))
      );
    });

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50"
        aria-label="Ouvrir le chat"
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-20 right-6 w-96 max-h-[80vh] bg-white rounded-xl shadow-2xl border border-gray-300 z-50 overflow-hidden flex flex-col"
          >
            <div className="bg-gradient-to-r from-pink-600 to-orange-400 p-4 flex justify-between items-center">
  {/* Logo + Titre */}
  <div className="flex items-center space-x-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 12h1a3 3 0 013 3v1a3 3 0 01-3 3h-1m-4 0H6a3 3 0 01-3-3v-1a3 3 0 013-3h1m4-8a4 4 0 014 4v4a4 4 0 01-8 0V8a4 4 0 014-4z"
      />
    </svg>
    <h3 className="text-white font-bold text-lg tracking-wide">
      Assistance Client
    </h3>
  </div>

  {/* Bouton de fermeture */}
  <button
    onClick={toggleChat}
    className="text-white hover:text-gray-300 transition-colors text-xl font-bold"
  >
    &times;
  </button>
</div>


            <div className="p-4 overflow-y-auto bg-gray-50 flex-1 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-300">
              {!chatMode ? (
                <>
                  <div className="bg-pink-100 p-4 rounded-lg mb-4 shadow-md">
                    <h2 className="text-xl font-bold text-pink-800 mb-2">CRP MEMO</h2>
                    <p className="text-lg font-medium text-gray-800">{messages[0]?.content || chatbotData.welcome_message}</p>
                  </div>

                  <div className="p-2 mb-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="Rechercher une question..."
                        className="w-full p-2 pl-8 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        aria-label="Rechercher une question"
                      />
                      <Search className="absolute left-2 top-2 text-gray-400" size={18} />
                    </div>
                  </div>

                  {searchQuery && (
                    <div className="p-3 border-t border-gray-300 bg-gray-100 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-300 rounded-lg shadow-sm">
                      {filteredQuestions.length > 0 ? (
                        filteredQuestions.map((item, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ backgroundColor: "#fce7f3" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleQuestionClick(item.question, item.answer)}
                            className="w-full text-left py-2 px-3 text-gray-800 text-sm font-medium hover:bg-pink-100 rounded-md transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                          >
                            {item.question}
                          </motion.button>
                        ))
                      ) : (
                        <p className="text-gray-600 text-sm px-3 py-2 italic">Aucune question correspondante.</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2 mt-2">
                    {[
                      { label: "Envoyer-nous un message", action: "message" },
                    ].map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleActionClick(action.action)}
                        className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-pink-600 transition-colors duration-300 flex justify-between items-center"
                      >
                        {action.label}
                        <span className="text-white">➔</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700">Découvrez CRP MEMO : demandez une démo personnalisée !</p>
                    <a
                      href="info@salambo-proserv.com"
                      className="text-pink-600 text-sm hover:underline mt-1 block"
                    >
                      Demander une démo
                    </a>
                  </div>
                </>
              ) : expertChatMode ? (
                <>
                  <AnimatePresence>
                    {messages.map((msg, idx) => (
                      <motion.div
                        ref={(el) => {
                          if (msg.sender === "ai" && msg.questionKey) {
                            messageRefs.current[msg.questionKey] = el;
                          }
                        }}
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className={`mt-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg p-3 shadow ${
                            msg.sender === "user" ? "bg-orange-100 text-orange-900" : "bg-pink-100 text-pink-900"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          <span className="block text-xs opacity-60 mt-1 text-right select-none">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />

                  <div className="p-4 border-t border-gray-300 bg-gray-100 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-300 mt-4">
                    <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Contactez un Expert</h4>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleEmailExpert}
                        className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 px-4 rounded-lg flex items-center justify-between transition-colors duration-300 hover:bg-pink-600 shadow-sm"
                        aria-label="Contacter un expert par email"
                      >
                        <span begrepen span className="text-sm font-medium">Contacter par email</span>
                        <Mail size={18} className="text-white" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleCallExpert}
                        className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 px-4 rounded-lg flex items-center justify-between transition-colors duration-300 hover:bg-pink-600 shadow-sm"
                        aria-label="Appeler un expert"
                      >
                        <span className="text-sm font-medium">Appeler 07 53 94 26 79</span>
                        <Phone size={18} className="text-white" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-2 mt-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="Rechercher une question..."
                        className="w-full p-2 pl-8 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        aria-label="Rechercher une question"
                      />
                      <Search className="absolute left-2 top-2 text-gray-400" size={18} />
                    </div>
                  </div>

                  {searchQuery && (
                    <div className="p-3 border-t border-gray-200 bg-white max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-300 rounded-lg shadow-sm">
                      {filteredQuestions.length > 0 ? (
                        filteredQuestions.map((item, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ backgroundColor: "#fce7f3" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleQuestionClick(item.question, item.answer)}
                            className="w-full text-left py-2 px-3 text-gray-800 text-sm font-medium hover:bg-pink-100 rounded-md transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                          >
                            {item.question}
                          </motion.button>
                        ))
                      ) : (
                        <p className="text-gray-600 text-sm px-3 py-2 italic">Aucune question correspondante.</p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <AnimatePresence>
                    {messages.map((msg, idx) => (
                      <motion.div
                        ref={(el) => {
                          if (msg.sender === "ai" && msg.questionKey) {
                            messageRefs.current[msg.questionKey] = el;
                          }
                        }}
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className={`mt-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg p-3 shadow ${
                            msg.sender === "user" ? "bg-orange-100 text-orange-900" : "bg-pink-100 text-pink-900"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          <span className="block text-xs opacity-60 mt-1 text-right select-none">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />

                  <div className="p-4 border-t border-gray-300 bg-gray-100 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-300 mt-4">
                    <div className="flex items-center mb-3">
                      {selectedCategory && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleBackClick}
                          className="mr-2 text-pink-600 hover:text-pink-700"
                          aria-label="Retour aux options principales"
                        >
                          <ArrowLeft size={20} />
                        </motion.button>
                      )}
                      <p className="text-sm font-semibold text-gray-700">
                        {selectedCategory ? "Questions associées :" : "Questions rapides :"}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-3">
                      {!searchQuery || filteredQuestions.length === 0 ? (
                        !selectedCategory ? (
                          chatbotData.quick_replies.map((q, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleQuickReplyClick(q.payload)}
                              className="relative rounded-lg py-2 px-4 text-left font-medium shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md bg-white before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-pink-400 before:to-orange-300 before:opacity-20 before:-z-10"
                            >
                              {q.label}
                            </motion.button>
                          ))
                        ) : (
                          chatbotData.reponses[selectedCategory].map((q, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: askedQuestions.has(q.question) ? 1 : 1.03 }}
                              whileTap={{ scale: askedQuestions.has(q.question) ? 1 : 0.97 }}
                              onClick={() => handleQuestionClick(q.question, q.answer)}
                              className={`relative rounded-lg py-2 px-4 text-left font-medium shadow-md transition-transform transform ${
                                askedQuestions.has(q.question) ? "opacity-60 cursor-pointer bg-gray-200" : "hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md bg-white"
                              } before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-pink-400 before:to-orange-300 before:opacity-20 before:-z-10`}
                            >
                              {q.question}
                            </motion.button>
                          ))
                        )
                      ) : (
                        filteredQuestions.map((item, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleQuestionClick(item.question, item.answer)}
                            className="relative rounded-lg py-2 px-4 text-left font-medium shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md bg-white before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-pink-400 before:to-orange-300 before:opacity-20 before:-z-10"
                          >
                            {item.question}
                          </motion.button>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="p-2 mt-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="Rechercher une question..."
                        className="w-full p-2 pl-8 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        aria-label="Rechercher une question"
                      />
                      <Search className="absolute left-2 top-2 text-gray-400" size={18} />
                    </div>
                  </div>

                  {searchQuery && filteredQuestions.length > 0 && (
                    <div className="p-3 border-t border-gray-200 bg-white max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-300 rounded-lg shadow-sm">
                      {filteredQuestions.map((item, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ backgroundColor: "#fce7f3" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuestionClick(item.question, item.answer)}
                          className="w-full text-left py-2 px-3 text-gray-800 text-sm font-medium hover:bg-pink-100 rounded-md transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                        >
                          {item.question}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="bg-white p-2 border-t border-gray-200 flex justify-around">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNavClick("home")}
                className="text-pink-600 flex flex-col items-center"
                aria-label="Accueil"
              >
                <Home size={20} />
                <span className="text-xs">Accueil</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNavClick("conversations")}
                className="text-pink-600 flex flex-col items-center"
                aria-label="Conversations"
              >
                <MessageSquare size={20} />
                <span className="text-xs">Conversations</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNavClick("help")}
                className="text-pink-600 flex flex-col items-center"
                aria-label="Aide"
              >
                <HelpCircle size={20} />
                <span className="text-xs">Aide</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}