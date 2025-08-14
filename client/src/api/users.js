import axios from 'axios';

const api = axios.create({
  baseURL: 'https://memo-s8cg.onrender.com/api/users', // ✅ Change if your backend runs on a different port or subdomain
  withCredentials: true, // 🧠 Sends/receives cookies like preAuthToken and token
});

//-----------GET ALL USERS (requires admin token cookie)
export const getAllUsers = async (userData) => {
  // userData: { name, email, password }
  return await api.get('/get-all-users', userData);
};


//  GET USER BY ID (requires admin token cookie)
export const getUserById = async (id) => {  
  return await api.get(`/get-user-by-id/${id}`);
}

// DELETE USER BY ID (requires admin token cookie)
export const deleteUser = async (id) => {
  return await api.delete(`/delete-user/${id}`);
}

export const createUser = async (userData) => {
  return await api.post('/create-user', userData);
}
export const updateUser = async (id, userData) => {
  return await api.patch(`/update-user/${id}`, userData);
};
export default api;