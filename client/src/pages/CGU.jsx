import { motion } from 'framer-motion';
import { FileText, ClipboardCheck, Key, Shield, Lock, Scale, Mail, BookOpen } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CGU() {
  const { t } = useTranslation();

  const articles = [
    {
      icon: <FileText size={20} />,
      title: t("cgu.articles.1.title"),
      content: t("cgu.articles.1.content")
    },
    {
      icon: <ClipboardCheck size={20} />,
      title: t("cgu.articles.2.title"),
      content: t("cgu.articles.2.content")
    },
    {
      icon: <Key size={20} />,
      title: t("cgu.articles.3.title"),
      content: t("cgu.articles.3.content")
    },
    {
      icon: <Shield size={20} />,
      title: t("cgu.articles.4.title"),
      content: t("cgu.articles.4.content")
    },
    {
      icon: <BookOpen size={20} />,
      title: t("cgu.articles.5.title"),
      content: t("cgu.articles.5.content")
    },
    {
      icon: <Scale size={20} />,
      title: t("cgu.articles.6.title"),
      content: t("cgu.articles.6.content")
    },
    {
      icon: <Mail size={20} />,
      title: t("cgu.articles.7.title"),
      content: t("cgu.articles.7.content")
    },
    {
      icon: <Lock size={20} />,
      title: t("cgu.articles.8.title"),
      content: t("cgu.articles.8.content")
    }
  ];

  return (
    <div className="bg-white py-16 px-4 md:px-12">
      <motion.main 
        className="container mx-auto px-4 py-12 max-w-4xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-6">
            {t("cgu.title")}
          </h1>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="space-y-7">
              {articles.map((article, index) => (
                <motion.div 
                  key={index}
                  className="border-l-2 border-gray-800 pl-4 py-1"
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-gray-800 rounded-full p-2">
                      {React.cloneElement(article.icon, { className: "text-white" })}
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-gray-800 mb-1.5">
                        {article.title}
                      </h2>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {article.content}
                      </p>
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