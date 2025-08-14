import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { updateUser } from "../../api/users";

const EditUserModal = ({ isOpen, onClose, user, onUserUpdated }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    isAccountVerified: false
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        isAccountVerified: user.isAccountVerified || false
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(user._id, formData);
      onUserUpdated(res.data.user);
      onClose();
    } catch (err) {
      console.error("Erreur de mise à jour:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${
      theme === 'dark' ? 'bg-gray-900/80' : 'bg-gray-500/80'
    }`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25 }}
          className={`inline-block align-bottom rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="px-6 py-4">
            <h3 className={`text-lg leading-6 font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Modifier l'Utilisateur
            </h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label htmlFor="role" className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Rôle
                </label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'border-gray-300'
                  }`}
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isAccountVerified"
                  id="isAccountVerified"
                  checked={formData.isAccountVerified}
                  onChange={handleChange}
                  className={`h-4 w-4 rounded ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-indigo-400'
                      : 'border-gray-300 text-indigo-600'
                  }`}
                />
                <label htmlFor="isAccountVerified" className={`ml-2 block text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Compte Vérifié
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 rounded-md ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md ${
                    theme === 'dark'
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Enregistrer les Modifications
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditUserModal;