import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Composants communs
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ReviewList from "./components/ReviewList";

// Pages générales
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyResetOtp from "./pages/VerifyResetOtp";
import ResetPasswordFlow from "./pages/ResetPasswordFlow";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import SavoirPlus from "./pages/SavoirPlus";
import Home from "./pages/Home";

// Étapes réinitialisation
import EmailStep from "./pages/test/EmailStep";
import OtpStep from "./pages/test/OtpStep";
import NewPasswordStep from "./pages/test/NewPasswordStep";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// Pages Admin
import AdminDashboard from "./pages/admin/Dashboard";
import { Users } from "lucide-react";

// Pages Utilisateur
import UserHome from "./pages/user/UserHome";
import DashboardClient from "./pages/user/DashboardClient";
import Paiements from "./pages/user/Paiements";
import MesDocuments from "./pages/user/MesDocuments";
import MesCommandes from "./pages/user/MesCommandes"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pages publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          <ProtectedRoute requireAuth={false}>
            <Signup />
          </ProtectedRoute>
        } />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
        <Route path="/reset-pass-flow" element={<ResetPasswordFlow />} />
        <Route path="/emailstep" element={<EmailStep />} />
        <Route path="/otpstep" element={<OtpStep />} />
        <Route path="/nouveaupass" element={<NewPasswordStep />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/savoir-plus" element={<SavoirPlus />} />
        <Route path="/reviewlist" element={<ReviewList />} />
        <Route path="*" element={<NotFound />} />

        {/* Routes Admin (protégées) */}
        <Route path="/admin" element={
          <ProtectedRoute requireAuth={true} allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* Routes Utilisateur (protégées) */}
        <Route path="/home" element={
          <ProtectedRoute requireAuth={true} allowedRoles={['user']}>
            <UserLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardClient />} />
          <Route path="dashboard" element={<DashboardClient />} />
          <Route path="commandes" element={<MesCommandes />} />
          <Route path="paiements" element={<Paiements />} />
          <Route path="documents" element={<MesDocuments />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
