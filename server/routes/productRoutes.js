import express from 'express';
import userAuth from '../middleware/userAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
const productRoute = express.Router();

productRoute.post('/create-product', userAuth, requireAdmin, createProduct);
productRoute.get('/get-all-products', userAuth, requireAdmin, getAllProducts);
productRoute.get('/get-product/:id', userAuth, requireAdmin, getProductById);
productRoute.put('/update-product/:id', userAuth, requireAdmin, updateProduct);
productRoute.delete('/delete-product/:id', userAuth, requireAdmin, deleteProduct);  




export default productRoute;