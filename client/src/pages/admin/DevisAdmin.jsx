import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Download,
  X
} from "lucide-react";
import { getAllUsers, deleteUser } from "../../api/users";
import { getAllDevis, createDevis, deleteDevis } from "../../api/devis";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";

const DevisAdmin = () => {
  const { theme } = useTheme();
  const [devis, setDevis] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    reference: '',
    montant: '',
    notes: '',
    pdfFile: null
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [usersRes, devisRes] = await Promise.all([
          getAllUsers(),
          getAllDevis()
        ]);
        setUsers(usersRes.data.users);
        setDevis(devisRes.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDevis = devis.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(devis.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Delete devis
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDevis(deleteId);
      const res = await getAllDevis();
      setDevis(res.data);
      // Reset to first page if current page becomes invalid
      if (currentPage > Math.ceil(res.data.length / itemsPerPage)) {
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Erreur de suppression:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pdfFile: e.target.files[0] });
  };

  // Handle new devis creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.userId || !formData.pdfFile) {
      alert('Veuillez sélectionner un utilisateur et télécharger un fichier PDF');
      return;
    }

    const data = new FormData();
    data.append('userId', formData.userId);
    data.append('reference', formData.reference);
    data.append('montant', formData.montant);
    data.append('notes', formData.notes);
    data.append('pdf', formData.pdfFile);

    try {
      const res = await createDevis(data);
      setDevis(prev => [res.data, ...prev]);
      setShowAddModal(false);
      setFormData({
        userId: '',
        reference: '',
        montant: '',
        notes: '',
        pdfFile: null
      });
      // Reset to first page to show the new devis
      setCurrentPage(1);
    } catch (error) {
      console.error('Erreur lors de la création du devis:', error);
    }
  };

  const openPdf = (url) => {
    window.open(url, '_blank');
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
      console.error('Erreur de téléchargement:', error);
      alert('Échec du téléchargement du PDF');
    }
  };

  return (
    <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="pt-16">
        {/* Header with action button */}
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <FileText className={`w-8 h-8 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h1 className={`text-2xl md:text-3xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>Gestion des Devis</h1>
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Gérez vos devis et estimations
              </p>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter un Devis</span>
            </button>
          </div>
        </motion.div>

        {/* Devis Table Card */}
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
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                  theme === 'dark' ? 'border-indigo-400' : 'border-indigo-500'
                }`}></div>
              </div>
            ) : (
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
                      Date
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Montant
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
                  {currentDevis.length === 0 ? (
                    <tr>
                      <td colSpan={6} className={`text-center p-8 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <div className="flex flex-col items-center justify-center">
                          <FileText className={`w-12 h-12 ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                          } mb-2`} />
                          <p className="text-lg">Aucun devis trouvé</p>
                          <p className="text-sm mt-1">Essayez d'ajouter un nouveau devis</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentDevis.map((item) => (
                      <tr
                        key={item._id}
                        className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                      >
                        <td className={`px-6 py-4 ${
                          theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                        }`}>
                          {item.reference}
                        </td>
                        <td className={`px-6 py-4 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {item.userId?.name || 'Inconnu'}
                        </td>
                        <td className={`px-6 py-4 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {new Date(item.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className={`px-6 py-4 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {item.montant} €
                        </td>
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
                            {item.status === 'approved' ? 'Approuvé' : 
                             item.status === 'pending' ? 'En attente' : 
                             item.status === 'rejected' ? 'Rejeté' : 'Inconnu'}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => downloadPdf(item._id, item.reference)}
                            className={theme === 'dark' ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-900'}
                            title="Télécharger le PDF"
                          >
                            <div className={theme === 'dark' ? 'bg-green-900/30 p-2 rounded-lg hover:bg-green-800' : 'bg-green-50 p-2 rounded-lg hover:bg-green-100'}>
                              <Download className="w-4 h-4" />
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(item._id)}
                            className={theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}
                            title="Supprimer le devis"
                          >
                            <div className={theme === 'dark' ? 'bg-red-900/30 p-2 rounded-lg hover:bg-red-800' : 'bg-red-50 p-2 rounded-lg hover:bg-red-100'}>
                              <Trash2 className="w-4 h-4" />
                            </div>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {devis.length > itemsPerPage && (
            <div className={`px-4 py-3 flex items-center justify-between sm:px-6 border-t ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, devis.length)}
                    </span>{" "}
                    sur <span className="font-medium">{devis.length}</span> devis
                  </span>
                  
                  <select
                    className={`ml-4 rounded-md text-sm py-1 px-2 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300'
                    }`}
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    {[5, 10, 20].map((size) => (
                      <option key={size} value={size}>
                        Afficher {size}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-md border text-sm font-medium ${
                      currentPage === 1
                        ? theme === 'dark'
                          ? "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : theme === 'dark'
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border ${
                            currentPage === number
                              ? theme === 'dark'
                                ? "bg-indigo-700 text-white border-indigo-600"
                                : "bg-indigo-600 text-white border-indigo-500"
                              : theme === 'dark'
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}
                  </div>
                  
                  <button
                    onClick={() =>
                      currentPage < totalPages && paginate(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-md border text-sm font-medium ${
                      currentPage === totalPages
                        ? theme === 'dark'
                          ? "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : theme === 'dark'
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <ConfirmationModal
            message="devis"
            itemId={deleteId}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}

        {/* Add Devis Modal */}
        {showAddModal && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
            theme === 'dark' ? 'bg-black/50' : 'bg-black/30'
          }`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`relative rounded-xl shadow-xl w-full max-w-md p-6 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              } border`}
            >
              <button
                onClick={() => setShowAddModal(false)}
                className={`absolute top-4 right-4 p-1 rounded-full ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <FileText className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                }`} />
                <h2 className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>Créer un Nouveau Devis</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Client
                  </label>
                  <select
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    required
                    className={`w-full rounded-lg px-3 py-2 text-sm border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Sélectionner un client</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Référence
                  </label>
                  <input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleInputChange}
                    required
                    className={`w-full rounded-lg px-3 py-2 text-sm border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Montant (€)
                  </label>
                  <input
                    type="number"
                    name="montant"
                    value={formData.montant}
                    onChange={handleInputChange}
                    required
                    className={`w-full rounded-lg px-3 py-2 text-sm border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full rounded-lg px-3 py-2 text-sm border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Fichier PDF *
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                    className={`w-full text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700`}
                  >
                    Créer le Devis
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevisAdmin;