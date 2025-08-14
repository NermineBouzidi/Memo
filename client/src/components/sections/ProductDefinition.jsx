import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Bolt, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const features = [
  {
    icon: <Bolt className="w-8 h-8 text-[#f25287]" />,        // Pinkish color
    title: 'erpSection.feature.fastDeployment.title',
    description: 'erpSection.feature.fastDeployment.description',
  },
  {
    icon: <DollarSign className="w-8 h-8 text-[#ffa500]" />,  // Orange color
    title: 'erpSection.feature.costSaving.title',
    description: 'erpSection.feature.costSaving.description',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#3b82f6]" />, // Blue color
    title: 'erpSection.feature.gdprSecurity.title',
    description: 'erpSection.feature.gdprSecurity.description',
  },
];

const ErpSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4 md:px-10 xl:px-28">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          <span className="bg-gradient-to-r from-[#f25287] to-[#ffa4b6] bg-clip-text text-transparent">{t('erpSection.title.highlight')}</span>, {t('erpSection.title')}
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          {t('erpSection.subtitle')}
        </p>

        <div className="mt-20 flex flex-row gap-6 justify-center flex-wrap">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4 bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-xl px-6 py-8 text-center hover:shadow-md max-w-xs"
            >
              <div>{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{t(feature.title)}</h3>
              <p className="text-sm text-gray-600">{t(feature.description)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ErpSection;