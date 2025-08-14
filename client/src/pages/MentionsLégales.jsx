
import { motion } from 'framer-motion';
import { Building, Server, Copyright } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MentionsLegales() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: <Building className="text-white w-5 h-5" />,
      title: t("legal.sections.editor.title"),
      content: [
        { text: t("legal.sections.editor.content.0"), highlight: false },
        { text: t("legal.sections.editor.content.1"), highlight: true },
        { text: t("legal.sections.editor.content.2"), highlight: false },
        { text: t("legal.sections.editor.content.3"), highlight: true },
        { text: t("legal.sections.editor.content.4"), highlight: true },
        { text: t("legal.sections.editor.content.5"), highlight: true },
        { text: t("legal.sections.editor.content.6"), highlight: false }
      ]
    },
    {
      icon: <Server className="text-white w-5 h-5" />,
      title: t("legal.sections.hosting.title"),
      content: [
        { text: t("legal.sections.hosting.content.0"), highlight: false },
        { text: t("legal.sections.hosting.content.1"), highlight: true },
        { text: t("legal.sections.hosting.content.2"), highlight: true },
        { text: t("legal.sections.hosting.content.3"), highlight: true }
      ]
    },
    {
      icon: <Copyright className="text-white w-5 h-5" />,
      title: t("legal.sections.ip.title"),
      content: [
        {
          text: t("legal.sections.ip.content.0"),
          highlight: false
        }
      ]
    }
  ];

  return (
    <div className="bg-white py-20 px-4 md:px-12">
      <motion.main
        className="max-w-4xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {t("legal.title")}
        </h1>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-gray-800 rounded-full p-2">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">
                    {section.title}
                  </h2>
                  <div className="space-y-1.5 text-gray-600 text-sm leading-relaxed">
                    {section.content.map((line, i) => (
                      <p
                        key={i}
                        className={line.highlight ? "font-medium text-gray-800" : ""}
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
