import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/products', // ✅ Change if your backend runs on a different port or subdomain
  withCredentials: true, // 🧠 Sends/receives cookies like preAuthToken and token
});

//-----------GET ALL Products (requires admin token cookie)
export const getAllProducts = async (productData) => {
  return await api.get('/get-all-products', productData);
};


//  GET product BY ID (requires admin token cookie)
export const getProductById = async (id) => {  
  return await api.get(`/get-product-by-id/${id}`);
}

// DELETE product BY ID (requires admin token cookie)
export const deleteProduct = async (id) => {
  return await api.delete(`/delete-product/${id}`);
}

export const createProduct = async (productData) => {
  return await api.post('/create-product', productData);
}
export const updateProduct = async (id, productData) => {
  return await api.put(`/update-product/${id}`, productData);
}
export default api;

