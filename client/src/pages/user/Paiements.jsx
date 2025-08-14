import React from 'react';
import { Card, Table, Tag, Button } from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip, Legend, BarElement } from 'chart.js';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const getColors = (theme) => ({
  primary: {
    darkText: theme === 'dark' ? '#E0E0E0' : '#333333',
    blue: theme === 'dark' ? '#3B82F6' : '#2563EB',
    green: theme === 'dark' ? '#10B981' : '#059669',
    red: theme === 'dark' ? '#EF4444' : '#DC2626',
  },
  secondary: {
    background: theme === 'dark' ? '#1A1A1A' : '#F8F8F8',
    cardBg: theme === 'dark' ? '#2D2D2D' : '#FFFFFF',
  }
});

const Paiements = () => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  // Simulated payment data
  const paymentData = [
    { id: "#0012", date: "15/06/2024", amount: "750.00", status: "Payé", method: "Carte Bancaire" },
    { id: "#0011", date: "15/05/2024", amount: "750.00", status: "Payé", method: "Virement" },
    { id: "#0010", date: "15/04/2024", amount: "750.00", status: "En retard", method: "Virement" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Payé": return theme === 'dark' ? 'green' : 'success';
      case "En retard": return theme === 'dark' ? 'red' : 'error';
      default: return theme === 'dark' ? 'gray' : 'default';
    }
  };

  // Payment form submission
  const handlePayment = () => {
    console.log("Initier le processus de paiement");
    // Ici vous intégrerez Stripe ou autre solution de paiement
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: colors.secondary.background }}
    >
      <div className="pt-24 px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`p-8 rounded-2xl shadow-lg mb-10 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h1 className={`text-3xl font-extrabold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Gestion des Paiements
          </h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Effectuez de nouveaux paiements et consultez l'historique
          </p>
        </motion.div>

        {/* Payment Button - Always visible */}
        <div className="mb-10 text-center">
          <Button 
            type="primary" 
            size="large"
            onClick={handlePayment}
            className={`${
              theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
            } hover:scale-105 transition-transform`}
          >
            Effectuer un paiement
          </Button>
        </div>

        {/* Transactions history */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card
            title="Historique des transactions"
            className={`shadow-lg ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}
          >
            <Table
              dataSource={paymentData}
              columns={[
                {
                  title: 'ID',
                  dataIndex: 'id',
                  key: 'id',
                },
                {
                  title: 'Date',
                  dataIndex: 'date',
                  key: 'date',
                },
                {
                  title: 'Montant (€)',
                  dataIndex: 'amount',
                  key: 'amount',
                  render: text => <span className="font-bold">{text}</span>
                },
                {
                  title: 'Statut',
                  dataIndex: 'status',
                  key: 'status',
                  render: status => (
                    <Tag color={getStatusColor(status)}>
                      {status}
                    </Tag>
                  )
                },
                {
                  title: 'Méthode',
                  dataIndex: 'method',
                  key: 'method',
                }
              ]}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Paiements;