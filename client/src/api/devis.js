import axios from 'axios';

const API_URL = 'https://memo-s8cg.onrender.com/api/devis';

export const getAllDevis = async () => {
  try {
    const response = await axios.get(`${API_URL}/getdevis`);
    return response;
  } catch (error) {
    console.error('Error fetching devis:', error);
    throw error;
  }
};

export const createDevis = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/postdevis`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    console.error('Error creating devis:', error);
    throw error;
  }
};

export const deleteDevis = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deletedevis/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting devis:', error);
    throw error;
  }
};