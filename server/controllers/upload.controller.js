import Document from '../models/Document.js';
export const uploadDocument = async (req, res) => {
  const { clientId, type, url, name } = req.body;
  const doc = await Document.create({ clientId, type, url, name });
  res.json(doc);
};
