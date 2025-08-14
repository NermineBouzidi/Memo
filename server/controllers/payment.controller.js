import Stripe from 'stripe';
import Client from '../models/Client.js';
import Payment from '../models/Payment.js';
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createCheckout = async (req, res) => {
  const { clientId } = req.body;
  const client = await Client.findById(clientId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: { name: `Paiement MEMO - ${client.name}` },
        unit_amount: client.amountToPay * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: process.env.FRONTEND_URL + '/confirmation',
    cancel_url: process.env.FRONTEND_URL + '/annule',
  });

  await Payment.create({ clientId, amount: client.amountToPay, stripeSessionId: session.id });
  res.json({ url: session.url });
};
