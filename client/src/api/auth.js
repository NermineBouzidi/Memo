import axios from 'axios';

// Create a reusable Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  withCredentials: true,
  
});

// Configurez les intercepteurs pour gérer les erreurs
api.interceptors.request.use(config => {
  // Vous pouvez ajouter des en-têtes ici si nécessaire
  // Mais ne mettez pas d'authentification basique
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  return response;
}, error => {
  // Gestion centralisée des erreurs
  if (error.response && error.response.status === 401) {
    // Redirigez vers la page de login si nécessaire
    console.error('Non autorisé - Redirection vers login');
  }
  return Promise.reject(error);
});

//-------------------------------
//  SIGNUP
export const signupUser = async (userData) => {
  return  api.post('/signup', userData,{withCredentials:true});
};

//-------------------------------
//  VERIFY ACCOUNT WITH OTP
export const verifyAccountUser = async (otp) => {
  return api.post('/verify-account', { otp });
};

//-------------------------------
// LOGIN
export const loginUser = async (formdata) => {
  return api.post('/login', formdata);
};

//-------------------------------
// CHECK AUTHENTICATION
export const checkAuthUser = async () => {
  return api.post('/isAuth');
};

//-------------------------------
// LOGOUT
export const logoutUser = async () => {
  return api.get('/logout');
};

//-------------------------------
// RESEND VERIFY OTP
export const resendVerifyOtpUser = async () => {
  return api.post('/send-verify-otp');
};

//-------------------------------
// RESET PASSWORD FLOW
export const sendResetOtpUser = async (email) => {
  return api.post('/send-reset-otp', { email });
};

export const resetPasswordUser = async (formdata) => {
  return api.post('/reset-password', formdata);
};

export default api;