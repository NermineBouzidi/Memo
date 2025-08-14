import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Mail, Clock, CheckCircle, Plus, Send, X, User } from 'lucide-react';
import LiveChatFab from '../components/LiveChatFab'; // Nous allons le déplacer
import image360f from '../assets/360f.png';
import wsm from '../assets/wsm.png';


import axios from 'axios';


export default function Support() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyError, setReplyError] = useState(null);
  const [replySuccess, setReplySuccess] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  
  
  const MAX_RETRIES = 2;

  // Fallback API URL if VITE_API_URL is undefined
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  


  useEffect(() => {
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('Using API_URL:', API_URL);
    if (user?._id) {
      console.log('Fetching tickets for user:', user._id);
      const fetchTickets = async (retry = 0) => {
        try {
          const token = localStorage.getItem('token');
          console.log('Fetching tickets with token:', token?.slice(0, 10) + '...');
          console.log('GET URL:', `${API_URL}/api/support/${user._id}`);
          const response = await axios.get(`${API_URL}/api/support/${user._id}`, {
            headers: { 'x-token': token },
          });
          console.log('Fetched tickets:', response.data);
          setTickets(Array.isArray(response.data.tickets) ? response.data.tickets : []);
          setRetryCount(0);
        } catch (error) {
          console.error('Error fetching tickets:', {
            message: error.message,
            code: error.code,
            url: error.config?.url,
            status: error.response?.status,
            responseData: error.response?.data,
          });
          if (error.message.includes('Network Error') && retry < MAX_RETRIES) {
            console.log(`Retrying fetch (${retry + 1}/${MAX_RETRIES})...`);
            setTimeout(() => fetchTickets(retry + 1), 2000);
            return;
          }
          setError(
            error.message.includes('Network Error')
              ? `Cannot connect to the server at ${API_URL}. Please ensure the backend is running and try again.`
              : error.response?.status === 404
              ? 'API endpoint not found. Please check if the backend is running at the correct URL.'
              : error.response?.status === 401
              ? 'Authentication failed. Please log in again.'
              : `Failed to fetch tickets: ${error.response?.data?.message || error.message}`
          );
        }
      };
      fetchTickets();
    }
  }, [user, API_URL]);

  const handleSubmit = async (retry = 0) => {
    if (!message.trim()) {
      setError('Message is required.');
      return;
    }
    setIsSending(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      console.log('Sending ticket with token:', token?.slice(0, 10) + '...');
      console.log('POST URL:', `${API_URL}/api/support`);
      const response = await axios.post(
        `${API_URL}/api/support`,
        {
          userId: user?._id || 'anonymous',
          message,
          userEmail: user?.email || 'anonymous@habile-solutions.com',
        },
        {
          headers: { 'x-token': token },
        }
      );
      console.log('Ticket created:', response.data);
      setSuccess(true);
      setMessage('');
      setRetryCount(0);
      
      // Refresh tickets
      if (user?._id) {
        const ticketsResponse = await axios.get(`${API_URL}/api/support/${user._id}`, {
          headers: { 'x-token': token },
        });
        setTickets(Array.isArray(ticketsResponse.data.tickets) ? ticketsResponse.data.tickets : []);
      }
    } catch (error) {
      console.error('Error sending ticket:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        status: error.response?.status,
        responseData: error.response?.data,
      });
      if (error.message.includes('Network Error') && retry < MAX_RETRIES) {
        console.log(`Retrying (${retry + 1}/${MAX_RETRIES})...`);
        setTimeout(() => handleSubmit(retry + 1), 2000);
        return;
      }
      setError(
        error.message.includes('Network Error')
          ? `Cannot connect to the server at ${API_URL}. Please ensure the backend is running and try again.`
          : error.response?.status === 404
          ? 'API endpoint not found. Please check if the backend is running at the correct URL.'
          : error.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : `Failed to send ticket: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setReplyContent('');
    setReplyError(null);
    setReplySuccess(null);
  };

  const closeTicketView = () => {
    setSelectedTicket(null);
    setReplyContent('');
    setReplyError(null);
    setReplySuccess(null);
  };

  const handleReplySubmit = async (retry = 0) => {
    if (!selectedTicket || !replyContent.trim()) {
      setReplyError('Reply cannot be empty.');
      return;
    }
    if (!selectedTicket._id.match(/^[0-9a-fA-F]{24}$/)) {
      setReplyError('Invalid ticket ID.');
      return;
    }
    setReplyError(null);
    setReplySuccess(null);
    try {
      const token = localStorage.getItem('token');
      console.log('Sending reply to:', `${API_URL}/api/support/${selectedTicket._id}/reply`);
      console.log('Selected ticket ID:', selectedTicket._id);
      console.log('Reply content:', replyContent);
      console.log('Token:', token?.slice(0, 10) + '...');
      const response = await axios.post(
        `${API_URL}/api/support/${selectedTicket._id}/reply`,
        { reply: replyContent },
        { headers: { 'x-token': token } }
      );
      console.log('Reply response:', response.data);
      setTickets((prev) =>
        prev.map((t) =>
          t._id === selectedTicket._id
            ? {
                ...t,
                status: response.data.ticket.status,
                replies: response.data.ticket.replies || t.replies,
              }
            : t
        )
      );
      setSelectedTicket((prev) => ({
        ...prev,
        status: response.data.ticket.status,
        replies: response.data.ticket.replies || prev.replies,
      }));
      setReplyContent('');
      setReplySuccess('Reply sent successfully. The support team has been notified.');
    } catch (error) {
      console.error('Error sending reply:', {
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
        url: error.config?.url,
      });
      if (error.message.includes('Network Error') && retry < MAX_RETRIES) {
        console.log(`Retrying reply (${retry + 1}/${MAX_RETRIES})...`);
        setTimeout(() => handleReplySubmit(retry + 1), 2000);
        return;
      }
      setReplyError(
        error.message.includes('Network Error')
          ? `Cannot connect to the server at ${API_URL}. Please ensure the backend is running and try again.`
          : error.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : error.response?.status === 403
          ? 'You are not authorized to reply to this ticket.'
          : error.response?.status === 404
          ? 'Ticket not found.'
          : `Failed to send reply: ${error.response?.data?.message || error.message}`
      );
    }
  };





  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col py-10 px-4 md:px-10 transition duration-300  relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-red-500/10 to-pink-600/10 rounded-full blur-3xl animate-float-slow top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl animate-float-medium top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 z-0" />
      </div>

      <h1 className="text-4xl font-bold mb-10 text-center text-red-500 drop-shadow-[0_0_15px_rgba(255,26,26,0.5)] animate-fade-in">
        <MessageCircle className="inline mr-2" /> Support En direct MEMO
      </h1>

      <div className="flex flex-col md:flex-row gap-8 text-center relative z-10">
        {/* Left Section - Maintenance and Support Details */}
        <div className="w-full">
          <p className="text-4xs font-bold mb-10 text-center text-black-500 mb-4 animate-fade-in">
            Notre équipe est à votre disposition pour garantir la performance de MEMO.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence>
              {[
                {
                  title: 'Maintenance Corrective',
                  description: 'Résolution rapide des bugs pour assurer la stabilité de MEMO (devis, factures, suivi). Soumettez un ticket pour signaler un problème.',
                  icon: <CheckCircle className="text-[#ff1a1a]" />,
                },
                {
                  title: 'Maintenance Préventive',
                  description: 'Surveillance proactive et mises à jour pour éviter les interruptions. Créez un ticket pour demander une vérification.',
                  icon: <Clock className="text-[#ff1a1a]" />,
                },
                {
                  title: 'Maintenance Évolutive',
                  description: 'Nouvelles fonctionnalités adaptées à vos besoins, comme des KPI avancés. Soumettez une demande via un ticket.',
                  icon: <Plus className="text-[#ff1a1a]" />,
                },
                {
                  title: 'Hébergement Sécurisé',
                  description: 'Infrastructure cloud fiable avec sauvegardes quotidiennes et sécurité renforcée. Signalez tout problème d’hébergement via un ticket.',
                  icon: <Mail className="text-[#ff1a1a]" />,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-200 border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-[#ff1a1a]">
                      {item.title}
                    </h2>
                    {item.icon}
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

            {/* Trusted Clients */}
           
            
          </div>
        

        {/* Right Section - Contact Form */}
        
      </div>

      {/* Ticket View Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white border border-gray-200 text-gray-900"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Ticket #{selectedTicket._id.slice(-6)}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeTicketView}
                    className="text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <div className="border-b pb-4 mb-4 border-gray-200">
                  <div className="flex items-start">
                    <User className="w-6 h-6 text-[#ff1a1a] mr-4" />
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>Email:</strong> {selectedTicket.userEmail}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Status:</strong> {selectedTicket.status}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Created:</strong> {formatDate(selectedTicket.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-900">
                    <strong>Message:</strong> {selectedTicket.message}
                  </p>
                </div>
                {selectedTicket.replies && selectedTicket.replies.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Replies</h3>
                    {selectedTicket.replies.map((reply, index) => (
                      <div key={index} className="mt-2 p-3 rounded-lg bg-gray-100">
                        <p className="text-sm text-gray-600">
                          <strong>{reply.sender}:</strong> {reply.content}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(reply.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-t pt-4 border-gray-200">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Send Reply</h3>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your reply here..."
                    className="w-full p-3 border rounded-lg min-h-[100px] border-gray-200 text-gray-900"
                  />
                  <div className="flex justify-end gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeTicketView}
                      className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-900"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReplySubmit(0)}
                      disabled={!replyContent.trim()}
                      className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                        replyContent.trim()
                          ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                          : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      Send Reply
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes rotate { to { transform: rotate(360deg); } }
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes fadeOut { 
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); } 
        }
        .animate-float-slow { animation: float 12s ease-in-out infinite; }
        .animate-float-medium { animation: float 8s ease-in-out infinite reverse; }
        .animate-rotate-slow { animation: rotate 20s linear infinite; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fade-out { animation: fadeOut 0.5s ease-in forwards; }
      `}</style>
      {user && <LiveChatFab key={user._id} />}
    </div>
  );
}