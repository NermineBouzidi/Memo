import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Calendar, 
  FileText, 
  DollarSign, 
  CheckCircle, 
  Clock,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DashboardClient = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    rdvs: 0,
    pendingRdvs: 0,
    approvedRdvs: 0,
    quotes: 0,
    pendingQuotes: 0,
    approvedQuotes: 0,
    invoices: 0,
    paidInvoices: 0,
    pendingInvoices: 0,
    totalAmountDue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // Schémas de couleurs améliorés pour les deux thèmes
  const COLORS = {
    dark: {
      primary: '#818cf8',
      primaryDark: '#6366f1',
      primaryDarker: '#4f46e5',
      success: '#10b981',
      successLight: '#34d399',
      danger: '#ef4444',
      dangerLight: '#f87171',
      chart: ['#818cf8', '#4f46e5', '#312e81', '#a78bfa', '#7c3aed'],
      pie: ['#818cf8', '#4f46e5', '#a78bfa'],
      payment: ['#10b981', '#ef4444']
    },
    light: {
      primary: '#6366f1',
      primaryDark: '#4f46e5',
      primaryDarker: '#4338ca',
      success: '#34d399',
      successLight: '#10b981',
      danger: '#f87171',
      dangerLight: '#ef4444',
      chart: ['#a5b4fc', '#6366f1', '#4338ca', '#c4b5fd', '#8b5cf6'],
      pie: ['#a5b4fc', '#6366f1', '#c4b5fd'],
      payment: ['#34d399', '#f87171']
    }
  };

  useEffect(() => {
    if (!user?._id) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        
        const rdvResponse = await axios.get(
          `${API_URL}/api/demo/client-rdvs-by-email/${encodeURIComponent(user.email)}`
        );
        
        const quoteResponse = await axios.get(
          `${API_URL}/api/devis/client-devis/${user._id}`
        );
        
        const invoiceResponse = await axios.get(
          `${API_URL}/api/invoices/client-invoices/${user._id}`
        );

        const rdvs = rdvResponse.data?.rdvs || [];
        const pendingRdvs = rdvs.filter(rdv => rdv.status === 'pending').length;
        const approvedRdvs = rdvs.filter(rdv => rdv.status === 'approved').length;

        const quotes = quoteResponse.data?.devis || [];
        const pendingQuotes = quotes.filter(quote => quote.status === 'pending').length;
        const approvedQuotes = quotes.filter(quote => quote.status === 'approved').length;

        const invoices = invoiceResponse.data || [];
        const paidInvoices = invoices.filter(invoice => invoice.status === 'paid').length;
        const pendingInvoices = invoices.filter(invoice => invoice.status === 'pending').length;
        const totalAmountDue = invoices
          .filter(invoice => invoice.status === 'pending')
          .reduce((sum, invoice) => sum + invoice.amount, 0);

        setStats({
          rdvs: rdvs.length,
          pendingRdvs,
          approvedRdvs,
          quotes: quotes.length,
          pendingQuotes,
          approvedQuotes,
          invoices: invoices.length,
          paidInvoices,
          pendingInvoices,
          totalAmountDue
        });
      } catch (err) {
        console.error('Erreur lors de la récupération des statistiques:', err);
        setError(err.response?.data?.message || 'Échec de la récupération des données du tableau de bord');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?._id, user?.email, API_URL]);

  // Données pour les graphiques
  const appointmentData = [
    { name: 'Total', value: stats.rdvs },
    { name: 'Approuvés', value: stats.approvedRdvs },
    { name: 'En attente', value: stats.pendingRdvs }
  ];

  const quoteData = [
    { name: 'Total', value: stats.quotes },
    { name: 'Approuvés', value: stats.approvedQuotes },
    { name: 'En attente', value: stats.pendingQuotes }
  ];

  const invoiceData = [
    { name: 'Total', value: stats.invoices },
    { name: 'Payées', value: stats.paidInvoices },
    { name: 'En attente', value: stats.pendingInvoices }
  ];

  const paymentData = [
    { name: 'Payées', value: stats.paidInvoices },
    { name: 'Dues', value: stats.pendingInvoices }
  ];

  const StatCard = ({ icon, title, value, link, theme }) => {
    const IconComponent = icon;
    return (
      <motion.div 
        whileHover={{ y: -5 }}
        className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' 
            : 'bg-white hover:bg-gray-50 border-gray-200'
        } border`}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${
            theme === 'dark' 
              ? 'bg-gray-700 text-indigo-400' 
              : 'bg-indigo-50 text-indigo-600'
          }`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}>{title}</h3>
            <p className={`text-2xl font-bold mt-1 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>{value}</p>
          </div>
        </div>
        {link && (
          <Link 
            to={link} 
            className={`mt-4 text-sm font-medium flex items-center ${
              theme === 'dark' 
                ? 'text-indigo-400 hover:text-indigo-300' 
                : 'text-indigo-600 hover:text-indigo-800'
            }`}
          >
            Voir tout
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </motion.div>
    );
  };

  const CustomTooltip = ({ active, payload, label, theme }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <p className={`font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
          }`}>{payload[0].payload.name}</p>
          <p className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>
            {payload[0].value} {label === 'Montant dû' ? '€' : ''}
          </p>
        </div>
      );
    }
    return null;
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
          <h1 className={`text-2xl md:text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>Tableau de bord client</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Aperçu de vos rendez-vous, devis et factures
          </p>
        </motion.div>

        {/* Section des graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Graphique des rendez-vous */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl shadow-lg ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border`}
          >
            <div className="flex items-center mb-4 space-x-2">
              <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h2 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Rendez-vous</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={appointmentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === 'dark' ? '#4b5563' : '#e5e7eb'} 
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} 
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} 
                  />
                  <Tooltip 
                    content={<CustomTooltip theme={theme} />} 
                  />
                  <Bar 
                    dataKey="value" 
                    name="Rendez-vous"
                    fill={COLORS[theme].primary}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Graphique des devis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl shadow-lg ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border`}
          >
            <div className="flex items-center mb-4 space-x-2">
              <FileText className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h2 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Devis</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={quoteData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {quoteData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[theme].pie[index % COLORS[theme].pie.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip theme={theme} />} 
                  />
                  <Legend 
                    wrapperStyle={{
                      color: theme === 'dark' ? '#fff' : '#000'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Deuxième rangée de graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graphique des factures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl shadow-lg ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border`}
          >
            <div className="flex items-center mb-4 space-x-2">
              <DollarSign className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h2 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Factures</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={invoiceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === 'dark' ? '#4b5563' : '#e5e7eb'} 
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} 
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} 
                  />
                  <Tooltip 
                    content={<CustomTooltip theme={theme} />} 
                  />
                  <Bar 
                    dataKey="value" 
                    name="Factures"
                    fill={COLORS[theme].primaryDark}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Graphique du statut des paiements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-6 rounded-xl shadow-lg ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border`}
          >
            <div className="flex items-center mb-4 space-x-2">
              <CheckCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h2 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Statut des paiements</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? COLORS[theme].success : COLORS[theme].danger} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip theme={theme} />} 
                  />
                  <Legend 
                    wrapperStyle={{
                      color: theme === 'dark' ? '#fff' : '#000'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;