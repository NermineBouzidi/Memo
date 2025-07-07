import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useAuth();

  // Ref pour mémoriser l'ancien état d'authentification
  const wasAuthenticated = useRef(isAuthenticated);

  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) {
        // Pas connecté → charger panier local
        const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
        setCartItems(localCart);
        return;
      }

      try {
        // Connecté → fusionner panier local + récupérer panier serveur
        const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
        if (localCart.length > 0) {
          await axios.post(
            "http://localhost:8080/api/panier/merge",
            { items: localCart },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          localStorage.removeItem("guest_cart");
        }

        const res = await axios.get("http://localhost:8080/api/panier", {
          withCredentials: true,
        });
        setCartItems(res.data.items || []);
      } catch (error) {
        console.error("Erreur chargement/fusion panier :", error);
        setCartItems([]);
      }
    };

    fetchCart();
  }, [isAuthenticated]);

  // Détecte déconnexion et recharge panier local
  useEffect(() => {
    if (wasAuthenticated.current && !isAuthenticated) {
      // Utilisateur vient de se déconnecter → charger panier local
      const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      setCartItems(localCart);
    }
    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated]);

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const existing = localCart.find((item) => item._id === product._id);

      let updatedCart;
      if (existing) {
        updatedCart = localCart.map((item) =>
          item._id === product._id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      } else {
        updatedCart = [...localCart, { ...product, quantite: 1 }];
      }

      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/panier/add",
        { produitId: product._id, quantite: 1 },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartItems(res.data.items);
    } catch (error) {
      console.error("Erreur ajout panier :", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) {
      const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const updatedCart = localCart
        .map((item) =>
          item._id === productId ? { ...item, quantite: item.quantite - 1 } : item
        )
        .filter((item) => item.quantite > 0);

      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/panier/decrement",
        { produitId: productId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartItems(res.data.items);
    } catch (error) {
      console.error("Erreur décrémentation panier :", error);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      localStorage.removeItem("guest_cart");
      setCartItems([]);
      return;
    }

    try {
      const res = await axios.delete("http://localhost:8080/api/panier/vider", {
        withCredentials: true,
      });
      setCartItems(res.data.items || []);
    } catch (error) {
      console.error("Erreur vidage panier :", error);
    }
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantite, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
