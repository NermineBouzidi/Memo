import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Couleurs pour les graphiques
const COLORS = {
  'Approuvé': '#28A745',
  'Rejeté': '#DC3545',
  'Reporté': '#17A2B8',
  'Terminé': '#6710f2d0',
  'En attente': '#f26d00ff',
  'total': '#6C757D'
};

const Dashboard = () => {
  const { theme } = useTheme();
  const [rdvStats, setRdvStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    postponed: 0,
    completed: 0
  });
  
  const [devisStats, setDevisStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0
  });
  
  const [userStats, setUserStats] = useState({
    total: 0,
    admins: 0,
    users: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Récupérer les stats des RDV
        const rdvResponse = await axios.get(`${API_URL}/api/demo/rdv/stats`);
        setRdvStats(rdvResponse.data);
        
        // Récupérer les stats des devis
        const devisResponse = await axios.get(`${API_URL}/api/devis/stats`);
        setDevisStats(devisResponse.data);
        
        // Récupérer les stats des utilisateurs
        const userResponse = await axios.get(`${API_URL}/api/users/stats`, {
          withCredentials: true
        });
        setUserStats(userResponse.data.stats);
        
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des stats:', err);
        setError('Échec du chargement des statistiques');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Préparer les données pour les graphiques des RDV
  const rdvBarChartData = [
    { name: 'Approuvé', value: rdvStats.approved, color: COLORS.approved },
    { name: 'Rejeté', value: rdvStats.rejected, color: COLORS.rejected },
    { name: 'Reporté', value: rdvStats.postponed, color: COLORS.postponed },
    { name: 'Terminé', value: rdvStats.completed, color: COLORS.completed }
  ];

  const rdvPieChartData = [
    { name: 'Approuvé', value: rdvStats.approved },
    { name: 'Rejeté', value: rdvStats.rejected },
    { name: 'Reporté', value: rdvStats.postponed },
    { name: 'Terminé', value: rdvStats.completed }
  ];

  // Préparer les données pour les graphiques des devis
 const devisBarChartData = [
  { name: 'Approuvé', value: devisStats.approved },
  { name: 'Rejeté', value: devisStats.rejected },
  { name: 'En attente', value: devisStats.pending }
];

  const devisPieChartData = [
    { name: 'En attente', value: devisStats.pending },
    { name: 'Approuvé', value: devisStats.approved },
    { name: 'Rejeté', value: devisStats.rejected }
  ];

  if (loading) return (
    <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="pt-16 flex justify-center items-center h-full">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          theme === 'dark' ? 'border-indigo-400' : 'border-indigo-500'
        }`}></div>
      </div>
    </div>
  );

  if (error) return (
    <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="pt-16 flex justify-center items-center h-full">
        <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
        }`}>
          Erreur : {error}
        </div>
      </div>
    </div>
  );

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
          <div className="flex flex-col">
            <h1 className={`text-2xl md:text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            } mb-2`}>Vue d'ensemble du tableau de bord</h1>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Analysez vos statistiques et performances
            </p>
          </div>
        </motion.div>

        {/* Graphiques */}
        <div className="space-y-8">
          {/* Graphiques des RDV */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border`}
          >
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>Répartition des statuts des rendez-vous</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Graphique en camembert */}
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-md font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Pourcentage des statuts</h3>
                  <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
  data={rdvPieChartData}
  cx="50%"
  cy="50%"
  labelLine={false}
  outerRadius={100}
  fill="#8884d8"
  dataKey="value"
  nameKey="name"
  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
>
  {rdvPieChartData.map((entry, index) => (
    <Cell 
      key={`rdv-pie-cell-${index}`} 
      fill={COLORS[entry.name]}  // Use the name directly to get the color
    />
  ))}
</Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                            borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
                            borderRadius: '0.5rem',
                          }}
                          itemStyle={{ color: theme === 'dark' ? '#F3F4F6' : '#111827' }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Graphiques des devis */}
          {/* Graphiques des devis */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
  className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200'
  } border`}
>
  <div className="p-6">
    <h2 className={`text-xl font-semibold mb-4 ${
      theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
    }`}>Répartition des statuts des devis</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
      {/* Graphique à barres */}
      <div className={`p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <h3 className={`text-md font-medium mb-3 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>Nombre par statut</h3>
        <div style={{ height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={devisBarChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4B5563' : '#E5E7EB'} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: theme === 'dark' ? '#D1D5DB' : '#4B5563' }} 
              />
              <YAxis 
                tick={{ fill: theme === 'dark' ? '#D1D5DB' : '#4B5563' }} 
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
                  borderRadius: '0.5rem',
                }}
                itemStyle={{ color: theme === 'dark' ? '#F3F4F6' : '#111827' }}
              />
              <Legend />
              <Bar dataKey="value" name="Nombre" fill="#8884d8">
                {devisBarChartData.map((entry, index) => (
                  <Cell 
                    key={`devis-cell-${index}`} 
                    fill={COLORS[entry.name]}  // Use the COLORS object with the status name
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
</motion.div>

          {/* Graphique des montants des devis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border`}
          >
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>Aperçu des montants des devis</h2>
              
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div style={{ height: '350px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { name: 'En attente', amount: devisStats.pendingAmount || 0 },
                        { name: 'Approuvé', amount: devisStats.approvedAmount || 0 },
                        { name: 'Rejeté', amount: devisStats.rejectedAmount || 0 },
                        { name: 'Total', amount: devisStats.totalAmount || 0 }
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4B5563' : '#E5E7EB'} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: theme === 'dark' ? '#D1D5DB' : '#4B5563' }} 
                      />
                      <YAxis 
                        tick={{ fill: theme === 'dark' ? '#D1D5DB' : '#4B5563' }} 
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()} €`, 'Montant']}
                        contentStyle={{
                          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                          borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
                          borderRadius: '0.5rem',
                        }}
                        itemStyle={{ color: theme === 'dark' ? '#F3F4F6' : '#111827' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Graphique des utilisateurs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border`}
          >
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>Répartition des utilisateurs</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Graphique en camembert */}
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-md font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Rôles des utilisateurs</h3>
                  <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Administrateurs', value: userStats.admins },
                            { name: 'Utilisateurs', value: userStats.users }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell key="cell-admins" fill="#FF8042" />
                          <Cell key="cell-users" fill="#0088FE" />
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                            borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
                            borderRadius: '0.5rem',
                          }}
                          itemStyle={{ color: theme === 'dark' ? '#F3F4F6' : '#111827' }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;