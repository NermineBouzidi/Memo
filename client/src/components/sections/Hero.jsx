import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  BarChart,
  Users,
  Zap,
  CalendarClock,
} from "lucide-react";
import officeImage from "../../assets/DemoPreview.jpg";

export default function HeroCRPMemo() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);

  // Use translations for comparisonData features
  const comparisonData = [
    { feature: t("heroCRPMemo.table.row.0"), CRM: true, ERP: true, CRP: true },
    { feature: t("heroCRPMemo.table.row.1"), CRM: false, ERP: true, CRP: t("Automatisée") || "Automatisée" },
    { feature: t("heroCRPMemo.table.row.2"), CRM: false, ERP: false, CRP: true },
    { feature: t("heroCRPMemo.table.row.3"), CRM: false, ERP: false, CRP: true },
    { feature: t("heroCRPMemo.table.row.4"), CRM: true, ERP: false, CRP: true },
    { feature: t("heroCRPMemo.table.row.5"), CRM: false, ERP: false, CRP: true },
  ];

  return (
    <>
      {/* Hero principal (plein écran) */}
      <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden font-outfit">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-20" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex-1 text-center md:text-left"
            >
              <h1
                className="text-5xl md:text-6xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-6"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {t("heroCRPMemo.title")}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed mx-auto md:mx-0">
                {t("heroCRPMemo.subtitle")}
              </p>
              <a
                href="demo"
                className="mt-8 inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full shadow-lg text-base font-semibold hover:opacity-90 transition duration-300"
              >
                {t("heroCRPMemo.cta")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: 30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1 }}
              className="flex-1 perspective-1000"
            >
              <motion.div
                whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full max-h-[600px]"
              >
                <img
                  src={officeImage}
                  alt="CRP MEMO Office Scene"
                  className="w-full h-full object-contain rounded-xl shadow-2xl transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section "Qu'est-ce qu'un CRP ?" */}
      <section id="crp-info" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-semibold text-gray-800 mb-4 text-center"
          >
            {t("heroCRPMemo.whatIs.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-gray-600 mb-8 leading-relaxed text-center max-w-3xl mx-auto"
          >
            {t("heroCRPMemo.whatIs.intro")}
          </motion.p>

          {/* Table Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          >
            
          </motion.p>

          {/* Table Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-4xl overflow-x-auto rounded-lg shadow-lg bg-white">
              <table className="min-w-full text-sm border border-gray-200">
                <thead className="bg-gradient-to-r from-pink-100 to-orange-100 text-gray-800">
                  <tr>
                    <th className="px-6 py-4 font-medium text-left">{t("heroCRPMemo.table.column.feature")}</th>
                    <th className="px-4 py-4 text-center">{t("heroCRPMemo.table.column.crm")}</th>
                    <th className="px-4 py-4 text-center">{t("heroCRPMemo.table.column.erp")}</th>
                    <th className="px-4 py-4 text-center">{t("heroCRPMemo.table.column.crp")}</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.05, duration: 0.2 }}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3 font-medium text-gray-700">{row.feature}</td>
                      <td className="px-4 py-3 text-center">
                        {row.CRM ? <CheckCircle className="w-4 h-4 text-green-600 mx-auto" /> : <span className="text-red-600">✗</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.ERP ? <CheckCircle className="w-4 h-4 text-green-600 mx-auto" /> : <span className="text-red-600">✗</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.CRP === true ? (
                          <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-green-700 text-sm font-medium">{row.CRP}</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}