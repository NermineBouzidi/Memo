import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Download, FileText, X, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

const MesDocuments = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [devis, setDevis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const traduireStatut = (status) => {
    switch (status) {
      case 'approved':
        return 'Approuvé';
      case 'pending':
        return 'En attente';
      case 'rejected':
        return 'Rejeté';
      default:
        return 'Inconnu';
    }
  };

  const downloadPdf = async (id, reference) => {
    try {
      const response = await fetch(`${API_URL}/api/devis/download-devis/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Échec du téléchargement du PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reference || 'devis'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur de téléchargement :', error);
      alert('Échec du téléchargement du PDF');
    }
  };

  const updateDevisStatus = async (id, status) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/devis/update-status/${id}`,
        { status },
        { withCredentials: true }
      );

      if (response.data) {
        setDevis(prevDevis =>
          prevDevis.map(item =>
            item.id === id ? { ...item, status } : item
          )
        );
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error);
      alert('Échec de la mise à jour du statut');
    }
  };

  useEffect(() => {
    if (!user?._id) return;

    const fetchClientDevis = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/api/devis/client-devis/${user._id}`
        );

        if (response.data && Array.isArray(response.data.devis)) {
          setDevis(response.data.devis);
        } else {
          setError('Format de réponse API inattendu');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des devis :', err);
        setError(err.response?.data?.message || 'Échec de la récupération des devis');
      } finally {
        setLoading(false);
      }
    };

    fetchClientDevis();
  }, [user?._id, API_URL]);

  if (loading) {
    return (
      <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
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
            }`}>Mes devis</h1>
          </div>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Consultez tous les devis envoyés par notre équipe
          </p>
        </motion.div>

        {/* Liste des devis */}
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
          {devis.length === 0 ? (
            <div className={`p-8 text-center ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="flex flex-col items-center justify-center">
                <FileText className={`w-12 h-12 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                } mb-2`} />
                <p className="text-lg">Aucun devis trouvé</p>
                <p className="text-sm mt-1">Votre administrateur ne vous a pas encore envoyé de devis</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-indigo-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Référence</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Date</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Montant</th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Statut</th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
                }`}>
                  {devis.map((item) => (
                    <tr
                      key={item.id}
                      className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                    >
                      <td className={`px-6 py-4 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                      }`}>{item.reference}</td>
                      <td className={`px-6 py-4 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{new Date(item.date).toLocaleDateString()}</td>
                      <td className={`px-6 py-4 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{item.montant} €</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === 'approved'
                            ? theme === 'dark'
                              ? "bg-green-900/30 text-green-400"
                              : "bg-green-100 text-green-800"
                            : item.status === 'pending'
                              ? theme === 'dark'
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-yellow-100 text-yellow-800"
                              : theme === 'dark'
                                ? "bg-red-900/30 text-red-400"
                                : "bg-red-100 text-red-800"
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            item.status === 'approved'
                              ? theme === 'dark' 
                                ? "bg-green-400" 
                                : "bg-green-500"
                              : item.status === 'pending'
                                ? theme === 'dark'
                                  ? "bg-yellow-400"
                                  : "bg-yellow-500"
                                : theme === 'dark'
                                  ? "bg-red-400"
                                  : "bg-red-500"
                          }`}></span>
                          {traduireStatut(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        <button
                          onClick={() => updateDevisStatus(item.id, 'approved')}
                          className={theme === 'dark' ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-900'}
                          title="Accepter le devis"
                          disabled={item.status === 'approved'}
                        >
                          <div className={theme === 'dark' 
                            ? 'bg-green-900/30 p-2 rounded-lg hover:bg-green-800' 
                            : 'bg-green-50 p-2 rounded-lg hover:bg-green-100'
                          }>
                            <Check className="w-4 h-4" />
                          </div>
                        </button>

                        <button
                          onClick={() => updateDevisStatus(item.id, 'rejected')}
                          className={theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}
                          title="Refuser le devis"
                          disabled={item.status === 'rejected'}
                        >
                          <div className={theme === 'dark' 
                            ? 'bg-red-900/30 p-2 rounded-lg hover:bg-red-800' 
                            : 'bg-red-50 p-2 rounded-lg hover:bg-red-100'
                          }>
                            <X className="w-4 h-4" />
                          </div>
                        </button>

                        <button
                          onClick={() => downloadPdf(item.id, item.reference)}
                          className={theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}
                          title="Télécharger le PDF"
                        >
                          <div className={theme === 'dark' 
                            ? 'bg-blue-900/30 p-2 rounded-lg hover:bg-blue-800' 
                            : 'bg-blue-50 p-2 rounded-lg hover:bg-blue-100'
                          }>
                            <Download className="w-4 h-4" />
                          </div>
                        </button>
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

export default MesDocuments;