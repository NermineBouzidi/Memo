import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkAuthUser, loginUser, logoutUser, signupUser,sendResetOtpUser,verifyAccountUser ,resetPasswordUser} from '../api/auth'; // Adjust the import path as necessary
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
   useEffect(() => {
    const init = async () => {
      // Skip auth check on public routes
      const publicRoutes = ['/', '/login', '/signup', '/forgot-password'];
      if (publicRoutes.includes(window.location.pathname)) {
        setLoading(false);
        return;
      }

      try {
        const res = await checkAuthUser();
        if (res.data.success) {
          setUser(res.data.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

   // Signup 
  const signup = async (formData) => {
    try {
      const res = await signupUser(formData);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // Login
  const login = async (formData) => {
    try {
      const res = await loginUser(formData);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // Verify email
  const verifyAccount = async (otp) => {
    try {
      const res = await verifyAccountUser(otp);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

   // Resend OTP
  const sendResetOtp = async (email) => {
    try {
      const res = await sendResetOtpUser(email);
      return res.data;
    } catch (err) {
      throw err;
    }
  };
   // Logout
  const logout = async () => {
    await logoutUser();
    setUser(null);
      setIsAuthenticated(false); // 🔴 You MUST call this to avoid protected redirect

  };
  //resetPassword
  const resetPassword = async (formData) => {
    try {
      const res = await resetPasswordUser(formData);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading , signup, sendResetOtp, resetPassword, verifyAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
