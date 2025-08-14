import Client from '../models/Client.js';
export const getAllClients = async (req, res) => {
  const clients = await Client.find().populate('documents');
  res.json(clients);
};
export const updateClientStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await Client.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updated);
};
export const updateClientAmount = async (req, res) => {
  const { id } = req.params;
  const { amountToPay } = req.body;
  const updated = await Client.findByIdAndUpdate(id, { amountToPay }, { new: true });
  res.json(updated);
};
