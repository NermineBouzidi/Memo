import userModel from "../models/userModel.js";
import commandeModel from "../models/commandeModel.js";
import paiementModel from "../models/paiementModel.js";

export const getClientDashboard = async (req, res) => {
  try {
    // 1. Récupérer l'utilisateur connecté
    const user = await userModel.findById(req.userId)
      .select('-password -__v')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // 2. Récupérer les commandes de l'utilisateur
    const commandes = await commandeModel.find({ userId: req.userId })
      .sort({ dateCommande: -1 })
      .limit(5)
      .lean();

    // 3. Récupérer les paiements
    const paiements = await paiementModel.find({ userId: req.userId }).lean();

    // 4. Calculs dynamiques
    const montantTotal = paiements.reduce((acc, p) => acc + (p.montant || 0), 0);
    const totalOrders = commandes.length;
    const commandesLivrees = commandes.filter(cmd => cmd.statut === 'Livré').length;
    const commandesAnnulees = commandes.filter(cmd => cmd.statut === 'Annulé').length;

    const tauxSatisfaction = totalOrders > 0 ? Math.round((commandesLivrees / totalOrders) * 100) : 0;
    const tauxUtilisation = totalOrders * 10; // Exemple arbitraire

    // 5. Graphique simplifié (mois en dur ou à générer dynamiquement)
    const performanceData = [
      { name: 'Jan', utilisation: 60, satisfaction: 75 },
      { name: 'Fév', utilisation: 70, satisfaction: 80 },
      { name: 'Mar', utilisation: 80, satisfaction: 85 },
      { name: 'Avr', utilisation: 65, satisfaction: 82 },
      { name: 'Mai', utilisation: tauxUtilisation, satisfaction: tauxSatisfaction },
      { name: 'Juin', utilisation: tauxUtilisation + 5, satisfaction: tauxSatisfaction + 2 },
    ];

    // 6. Produits favoris = derniers produits commandés
    const favoriteProducts = commandes.map(cmd => ({
      name: cmd.produits?.[0]?.nom || "Produit inconnu",
      lastOrder: new Date(cmd.dateCommande).toLocaleDateString('fr-FR'),
      status: cmd.statut
    }));

    // 7. Envoi des données
    res.status(200).json({
      success: true,
      data: {
        user: {
          name: user.name,
          wishlistItems: user.wishlist?.length || 0,
          loyaltyPoints: user.fidelite || 0,
          pendingOrders: commandes.filter(cmd => cmd.statut === "En cours").length,
          totalOrders,
        },
        performanceData,
        favoriteProducts
      }
    });

  } catch (error) {
    console.error("Erreur Dashboard :", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du tableau de bord"
    });
  }
};