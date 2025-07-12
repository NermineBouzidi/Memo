import { useCart } from "../contexts/cartContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

export default function VoirPanier() {
  const { cartItems, addToCart, removeFromCart, clearCart, handleRemove } = useCart();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen py-10 px-6 md:px-16 bg-black text-white transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#ff1a1a] drop-shadow-[0_0_15px_#ff1a1a]">
        Votre Panier
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-400">
          Votre panier est vide.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.produit._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#1a1a1a] rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-[#ff1a1a]">
                      {item.produit.name}
                    </h2>
                    <button
                      onClick={() => handleRemove(item.produit._id)}
                      className="text-[#ff1a1a] hover:text-red-400 transition"
                      title="Supprimer le produit"
                    >
                      <Trash2 />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.produit._id)}
                      className="p-1 bg-gray-800 text-white rounded hover:bg-[#ff1a1a]/20 transition"
                      aria-label="Diminuer quantité"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-md">{item.quantite}</span>
                    <button
                      onClick={() => addToCart(item.produit)}
                      className="p-1 bg-gray-800 text-white rounded hover:bg-[#ff1a1a]/20 transition"
                      aria-label="Augmenter quantité"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="mt-3 text-sm">
                    Prix unitaire :{" "}
                    <span className="text-[#ff1a1a] font-bold">
                      {item.produit.price} TND
                    </span>
                  </p>

                  <motion.p
                    animate={{ color: ["#fff", "#ff1a1a", "#fff"] }}
                    transition={{ duration: 0.8 }}
                    className="mt-1 text-sm font-semibold"
                  >
                    Total :{" "}
                    <span className="text-[#ff1a1a] drop-shadow-[0_0_5px_#ff1a1a]">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center flex-1 md:flex-none bg-[#ff1a1a] hover:bg-red-600 text-white py-2 px-5 rounded-lg shadow-lg transition"
            >
              <Trash2 className="mr-2" size={20} />
              Vider le panier
            </motion.button>

            <motion.button
              onClick={() => {}}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: [
                  "0 0 0 0 rgba(255,26,26, 0.7)",
                  "0 0 10px 10px rgba(255,26,26, 0)",
                  "0 0 0 0 rgba(255,26,26, 0.7)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="flex items-center justify-center flex-1 md:flex-none bg-[#ff1a1a] hover:bg-red-600 text-white py-2 px-5 rounded-lg shadow-lg transition"
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