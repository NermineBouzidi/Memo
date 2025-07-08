import { useCart } from "../contexts/cartContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

export default function VoirPanier() {
  const { cartItems, addToCart, removeFromCart, clearCart, handleRemove } = useCart();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen py-10 px-6 md:px-16 bg-gray-100 dark:bg-black text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-600 dark:text-red-400">
        Votre Panier
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Votre panier est vide.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div
                  key={item.produit._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-red-600">
                      {item.produit.name}
                    </h2>
                    <button
                      onClick={() => handleRemove(item.produit._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Supprimer le produit"
                    >
                      <Trash2 />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.produit._id)}
                      className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-red-100 transition"
                      aria-label="Diminuer quantité"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium">{item.quantite}</span>
                    <button
                      onClick={() => addToCart(item.produit)}
                      className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-green-100 transition"
                      aria-label="Augmenter quantité"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="mt-2 text-sm">
                    Prix unitaire :{" "}
                    <span className="text-green-600 font-bold">
                      {item.produit.price} TND
                    </span>
                  </p>

                  <motion.p
                    animate={{ color: ["#000", "#0070f3", "#000"] }}
                    transition={{ duration: 0.5 }}
                    className="mt-1 text-sm"
                  >
                    Total :{" "}
                    <span className="text-blue-600 font-bold">
                      {(item.produit.price * item.quantite).toFixed(2)} TND
                    </span>
                  </motion.p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap justify-between gap-4">
            <motion.button
              onClick={clearCart}
              whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center flex-1 md:flex-none bg-red-500 text-white py-2 px-5 rounded shadow-md cursor-pointer select-none"
            >
              <Trash2 className="mr-2" size={20} />
              Vider le panier
            </motion.button>

            <motion.button
              onClick={() => {}}
              whileHover={{ scale: 1.07, backgroundColor: "#16a34a" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: [
                  "0 0 0 0 rgba(34,197,94, 0.7)",
                  "0 0 10px 10px rgba(34,197,94, 0)",
                  "0 0 0 0 rgba(34,197,94, 0.7)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="flex items-center justify-center flex-1 md:flex-none bg-green-500 text-white py-2 px-5 rounded shadow-md cursor-pointer select-none"
            >
              <ShoppingCart className="mr-2" size={20} />
              Passer à la caisse
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}
