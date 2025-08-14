import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { FileText, Download, Mail, Upload, X } from 'lucide-react';

const FactureAdmin = () => {
  const { theme } = useTheme();
  const [acceptedDevis, setAcceptedDevis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const [emailStatus, setEmailStatus] = useState({});
  const [uploading, setUploading] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentDevis, setCurrentDevis] = useState(null);

  useEffect(() => {
    const fetchAcceptedDevis = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/devis/accepted-devis`);
        setAcceptedDevis(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Échec de la récupération des devis acceptés');
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedDevis();
  }, []);

  const handleFileChange = (e, devis) => {
    setCurrentDevis(devis);
    setSelectedFile(e.target.files[0]);
  };

  const uploadFacture = async () => {
    if (!selectedFile || !currentDevis) return;

    try {
      setUploading(prev => ({ ...prev, [currentDevis._id]: true }));
      
      const formData = new FormData();
      formData.append('facture', selectedFile);
      
      const response = await axios.post(
        `${API_URL}/api/devis/upload-facture/${currentDevis._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setAcceptedDevis(prev => 
        prev.map(devis => 
          devis._id === currentDevis._id 
            ? { ...devis, factureUrl: response.data.factureUrl } 
            : devis
        )
      );
      
      setSelectedFile(null);
      setCurrentDevis(null);
    } catch (err) {
      console.error('Erreur lors du téléchargement de la facture:', err);
      alert('Échec du téléchargement de la facture');
    } finally {
      setUploading(prev => ({ ...prev, [currentDevis._id]: false }));
    }
  };

  const generateFacture = async (devisId) => {
    try {
      setEmailStatus(prev => ({ ...prev, [devisId]: 'sending' }));
      
      const response = await axios.post(
        `${API_URL}/api/devis/generate-invoice/${devisId}`
      );
      
      setAcceptedDevis(prev => 
        prev.map(devis => 
          devis._id === devisId 
            ? { ...devis, invoiced: true, factureUrl: response.data.pdfUrl } 
            : devis
        )
      );
      
      setEmailStatus(prev => ({ ...prev, [devisId]: 'sent' }));
      setTimeout(() => {
        setEmailStatus(prev => ({ ...prev, [devisId]: null }));
      }, 3000);
      
      alert('Facture envoyée au client !');
    } catch (err) {
      console.error('Erreur lors de l\'envoi de la facture:', err);
      setEmailStatus(prev => ({ ...prev, [devisId]: 'error' }));
      alert('Échec de l\'envoi de la facture');
    }
  };

  const downloadPdf = async (id, reference) => {
    try {
      const response = await fetch(`${API_URL}/api/devis/download-facture/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Échec du téléchargement du PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reference || 'facture'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      alert('Échec du téléchargement du PDF');
    }
  };

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
        {/* Header */}
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
            }`}>Génération des Factures</h1>
          </div>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Générez des factures pour les devis acceptés
          </p>
        </motion.div>

        {/* Accepted Devis List */}
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
          {acceptedDevis.length === 0 ? (
            <div className={`p-8 text-center ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="flex flex-col items-center justify-center">
                <FileText className={`w-12 h-12 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                } mb-2`} />
                <p className="text-lg">Aucun devis accepté trouvé</p>
                <p className="text-sm mt-1">Les clients n'ont pas encore accepté de devis</p>
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
                      Client
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Montant
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Date d'Acceptation
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
                  {acceptedDevis.map((devis) => (
                    <tr
                      key={devis._id}
                      className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                    >
                      <td className={`px-6 py-4 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        {devis.reference}
                      </td>
                      <td className={`px-6 py-4 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {devis.userId?.name || 'Client Inconnu'}
                        {devis.userId?.company && (
                          <span className={`block text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {devis.userId.company}
                          </span>
                        )}
                      </td>
                      <td className={`px-6 py-4 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {devis.montant} €
                      </td>
                      <td className={`px-6 py-4 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {new Date(devis.updatedAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          devis.factureUrl
                            ? theme === 'dark'
                              ? "bg-green-900/30 text-green-400"
                              : "bg-green-100 text-green-800"
                            : theme === 'dark'
                              ? "bg-yellow-900/30 text-yellow-400"
                              : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {devis.factureUrl ? 'Facture Prête' : 'Aucune Facture'}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        {!devis.invoiced ? (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => generateFacture(devis._id)}
                              className={theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-900'}
                              title="Générer la Facture"
                              disabled={emailStatus[devis._id] === 'generating' || emailStatus[devis._id] === 'sending'}
                            >
                              <div className={theme === 'dark' 
                                ? 'bg-indigo-900/30 p-2 rounded-lg hover:bg-indigo-800' 
                                : 'bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100'
                              }>
                                <Mail className="w-4 h-4" />
                              </div>
                            </button>
                            {emailStatus[devis._id] === 'generating' && (
                              <span className={`text-xs ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                              }`}>Génération...</span>
                            )}
                            {emailStatus[devis._id] === 'sent' && (
                              <span className={`text-xs ${
                                theme === 'dark' ? 'text-green-400' : 'text-green-600'
                              }`}>Envoyé !</span>
                            )}
                            {emailStatus[devis._id] === 'error' && (
                              <span className={`text-xs ${
                                theme === 'dark' ? 'text-red-400' : 'text-red-600'
                              }`}>Erreur</span>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => downloadPdf(devis._id, devis.reference)}
                            className={theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}
                            title="Télécharger la Facture"
                          >
                            <div className={theme === 'dark' 
                              ? 'bg-blue-900/30 p-2 rounded-lg hover:bg-blue-800' 
                              : 'bg-blue-50 p-2 rounded-lg hover:bg-blue-100'
                            }>
                              <Download className="w-4 h-4" />
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

export default FactureAdmin;