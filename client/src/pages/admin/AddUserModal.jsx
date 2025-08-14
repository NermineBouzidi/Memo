import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { createUser } from "../../api/users";

const AddUserModal = ({ isOpen, onClose, onUserAdded }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await createUser(formData);
      onUserAdded(res.data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Échec de la création de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${theme === 'dark' ? 'bg-gray-900 bg-opacity-75' : 'bg-black bg-opacity-50'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg leading-6 font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ajouter un Nouveau Client
            </h3>
            
            {error && (
              <div className={`mb-4 p-3 rounded-md ${theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'}`}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nom Complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Adresse Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Mot de Passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className={`w-full px-3 py-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="role" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Rôle
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:col-start-2 sm:text-sm ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  {loading ? 'Création...' : 'Créer l\'Utilisateur'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className={`mt-3 w-full inline-flex justify-center rounded-md border px-4 py-2 text-base font-medium shadow-sm sm:mt-0 sm:col-start-1 sm:text-sm ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;