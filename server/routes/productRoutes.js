import express from 'express';
import userAuth from '../middleware/userAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';
import Product from "../models/productModel.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
const productRouter = express.Router();

productRouter.post('/create-product', userAuth, requireAdmin, createProduct);
productRouter.get('/get-all-products', userAuth, requireAdmin, getAllProducts);
productRouter.get('/get-product/:id', userAuth, requireAdmin, getProductById);
productRouter.put('/update-product/:id', userAuth, requireAdmin, updateProduct);
productRouter.delete('/delete-product/:id', userAuth, requireAdmin, deleteProduct);  




  

export default productRouter;