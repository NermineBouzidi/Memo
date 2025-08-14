
import { motion } from 'framer-motion';
import { Shield, Lock, Cookie, Database, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PolitiqueConfidentialite() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: <Shield className="text-gray-900" size={20} />,
      title: t("privacy.sections.dataCollection.title"),
      content: t("privacy.sections.dataCollection.content")
      
    },
    {
      icon: <Database className="text-gray-900" size={20} />,
      title: t("privacy.sections.dataUsage.title"),
      content: t("privacy.sections.dataUsage.content")
    },
    {
      icon: <Cookie className="text-gray-900" size={20} />,
      title: t("privacy.sections.cookies.title"),
      content: t("privacy.sections.cookies.content")
    },
    {
      icon: <Lock className="text-gray-900" size={20} />,
      title: t("privacy.sections.security.title"),
      content: t("privacy.sections.security.content")
    },
    {
      icon: <UserCheck className="text-gray-900" size={20} />,
      title: t("privacy.sections.rights.title"),
      content: t("privacy.sections.rights.content")
    }
  ];

  return (
    <div className="bg-white py-16 px-4 md:px-12">
      <motion.main
        className="container mx-auto px-4 py-12 max-w-5xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-5xl font-medium text-gray-800 mb-8">
            {t("privacy.title")}
          </h1>
         
          <div className="bg-white rounded-lg p-6 md:p-8">
            <div className="space-y-7">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="border-l border-gray-300 pl-4 py-1"
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5">{section.icon}</div>
                    <div>
                      <h2 className="text-lg font-normal text-gray-900 mb-1.5">
                        {section.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}