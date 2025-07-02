import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UserHome from "./pages/user/UserHome";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyResetOtp from "./pages/VerifyResetOtp";


import ResetPasswordFlow from "./pages/ResetPasswordFlow";

import { Users } from "lucide-react";

import Blog from "./pages/Blog";
import SavoirPlus from "./pages/SavoirPlus";
import Home from "./pages/Home";



function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
 

    <Route path="/signup" element={
      <ProtectedRoute requireAuth={false}>
        <Signup />
      </ProtectedRoute>
    } />

    <Route path="/login" element={
      <ProtectedRoute requireAuth={false}>
        <Login />
      </ProtectedRoute>
    } />
      <Route path="/" element={<Home />} />

    <Route path="/verify-account" element={<VerifyAccount />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
     <Route path="/reset-pass-flow" element={<ResetPasswordFlow />} />
    <Route path="/blog" element={<Blog />} />
          <Route path="/savoir-plus" element={<SavoirPlus />} />

    <Route path="*" element={<NotFound />} />

    {/* Admin Routes */}
    <Route path="/admin" element={
      <ProtectedRoute requireAuth={true} allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    }>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<Users />} />
    </Route>

    {/* User Routes */}
    <Route path="/home" element={
      <ProtectedRoute requireAuth={true} allowedRoles={['user']}>
        <UserLayout />
      </ProtectedRoute>
    }>
      <Route index element={<UserHome />} />
    </Route>
          </Routes>

  
</BrowserRouter>

    </>
  );
}

export default App;