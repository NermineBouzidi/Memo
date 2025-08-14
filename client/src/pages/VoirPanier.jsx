import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../src/contexts/AuthContext';
import { useTheme } from "../../src/contexts/ThemeContext";
import { FileText, Download, CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const VoirPanier = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    if (!user?._id) return;

    const fetchClientInvoices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/api/invoices/client-invoices/${user._id}`
        );
        setInvoices(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Échec du chargement des factures');
      } finally {
        setLoading(false);
      }
    };

    fetchClientInvoices();
  }, [user?._id]);

  const downloadPdf = async (invoiceId, reference) => {
    try {
      // Tentative d'ouverture dans un nouvel onglet
      const previewWindow = window.open(`${API_URL}/api/invoices/download/${invoiceId}`, '_blank');
      
      // Si bloqué, on télécharge directement
      if (!previewWindow || previewWindow.closed || typeof previewWindow.closed === 'undefined') {
        const response = await axios.get(`${API_URL}/api/invoices/download/${invoiceId}`, {
          responseType: 'blob',
          withCredentials: true
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Facture_${reference || 'facture'}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (error) {
      console.error('Erreur de téléchargement :', error);
      alert(`Échec du téléchargement du PDF : ${error.response?.data?.message || error.message}`);
    }
  };

  const handlePayment = (invoiceId) => {
    // Redirection vers un paiement test Stripe
    window.open('https://buy.stripe.com/test_00wfZa7Dr9Ti85r3fD24002', '_blank');
    
    // Simulation d'un paiement réussi
    setTimeout(() => {
      setInvoices(prev => 
        prev.map(inv => 
          inv._id === invoiceId ? { ...inv, status: 'payée' } : inv
        )
      );
    }, 2000);
  };

  if (loading) {
    return (
      <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${
        theme === 'dark' ? '' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="flex justify-center items-center h-64">
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
            theme === 'dark' ? 'border-indigo-400' : 'border-indigo-500'
          }`}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="pt-16">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-2xl shadow-lg mb-8 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700' 
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
          } border`}
        >
          <div className="flex items-center space-x-3">
            <FileText className={`w-8 h-8 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h1 className={`text-2xl md:text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>Mes Factures</h1>
          </div>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Consultez et payez vos factures
          </p>
        </motion.div>

        {/* Liste des factures */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border`}
        >
          {invoices.length === 0 ? (
            <div className={`p-8 text-center ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="flex flex-col items-center justify-center">
                <FileText className={`w-12 h-12 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                } mb-2`} />
                <p className="text-lg">Aucune facture trouvée</p>
                <p className="text-sm mt-1">Vous n'avez pas encore de factures</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-indigo-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Référence
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Montant
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Date d'échéance
                    </th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Statut
                    </th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
                }`}>
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice._id}
                      className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                    >
                      <td className={`px-6 py-4 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        {invoice.reference}
                      </td>
                      <td className={`px-6 py-4 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {invoice.amount} €
                      </td>
                      <td className={`px-6 py-4 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          {invoice.status === 'payée' ? (
                            <CheckCircle className={`w-4 h-4 mr-2 ${
                              theme === 'dark' ? 'text-green-400' : 'text-green-600'
                            }`} />
                          ) : invoice.status === 'en attente' ? (
                            <Clock className={`w-4 h-4 mr-2 ${
                              theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                            }`} />
                          ) : (
                            <XCircle className={`w-4 h-4 mr-2 ${
                              theme === 'dark' ? 'text-red-400' : 'text-red-600'
                            }`} />
                          )}
                          <span className={`capitalize ${
                            invoice.status === 'payée' 
                              ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                              : invoice.status === 'en attente'
                                ? theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                                : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        {invoice.status !== 'payée' && (
                          <button
                            onClick={() => handlePayment(invoice._id)}
                            className={theme === 'dark' ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-900'}
                            title="Payer la facture"
                          >
                            <div className={theme === 'dark' 
                              ? 'bg-green-900/30 p-2 rounded-lg hover:bg-green-800' 
                              : 'bg-green-50 p-2 rounded-lg hover:bg-green-100'
                            }>
                              <CreditCard className="w-4 h-4" />
                            </div>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VoirPanier;
