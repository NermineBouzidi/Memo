import React from 'react';
import { Sparkles, Clock, BarChart2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Highlights = () => {
  const highlights = [
    {
      icon: <Sparkles className="w-7 h-7 text-white" />,
      title: 'Satisfaction clients',
      value: '95%',
      description: 'de nos clients sont satisfaits'
    },
    {
      icon: <Clock className="w-7 h-7 text-white" />,
      title: 'Gain de temps',
      value: '40%',
      description: 'de réduction du temps de traitement'
    },
    {
      icon: <BarChart2 className="w-7 h-7 text-white" />,
      title: 'Productivité accrue',
      value: '30%',
      description: 'd’augmentation de la productivité'
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-white" />,
      title: 'Sécurité des données',
      value: '100%',
      description: 'de sécurité garantie'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Pourquoi choisir notre solution ?
          </h2>
          
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff4e50] to-[#ff7a5c] blur-[5px] opacity-50"></div>
                <div className="relative z-10 bg-gradient-to-r from-[#ff4e50] to-[#ff7a5c] w-16 h-16 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <div className="mt-4 text-3xl font-semibold text-gray-900">{item.value}</div>
              <h3 className="text-lg font-medium text-gray-800 mt-2">{item.title}</h3>
              <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
