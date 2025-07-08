import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

// Layouts & Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Contexts
import { CartProvider } from "./contexts/cartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyResetOtp from "./pages/VerifyResetOtp";
import ResetPasswordFlow from "./pages/ResetPasswordFlow";
import EmailStep from "./pages/test/EmailStep";
import OtpStep from "./pages/test/OtpStep";
import NewPasswordStep from "./pages/test/NewPasswordStep";
import NotFound from "./pages/NotFound";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UserHome from "./pages/user/UserHome";

import Categories from "./pages/Categories";
import Blog from "./pages/Blog";
import SavoirPlus from "./pages/SavoirPlus";
import Home from "./pages/Home";
import VoirPanier from "./pages/VoirPanier";
import Faq from "./pages/Faq";
import AvisClients from "./pages/AvisClients";
import GuideUtilisation from "./pages/GuideUtilisation";

function AppContent() {
  const location = useLocation();

  const noNavFooterPaths = [
    "/login",
    "/signup",
    "/verify-account",
    "/forgot-password",
    "/reset-password",
    "/verify-reset-otp",
    "/reset-pass-flow",
    "/emailstep",
    "/otpstep",
    "/nouveaupass",
    "/home", // Authenticated user home
  ];

  const hideNavFooter = noNavFooterPaths.includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main className={hideNavFooter ? "" : "pt-28"}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/savoir-plus" element={<SavoirPlus />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/avis-clients" element={<AvisClients />} />
          <Route path="/guide-utilisation" element={<GuideUtilisation />} />
          <Route path="/voir-panier" element={<VoirPanier />} />

          {/* Auth-related pages */}
          <Route
            path="/signup"
            element={
              <ProtectedRoute requireAuth={false}>
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
          <Route path="/reset-pass-flow" element={<ResetPasswordFlow />} />
          <Route path="/emailstep" element={<EmailStep />} />
          <Route path="/otpstep" element={<OtpStep />} />
          <Route path="/nouveaupass" element={<NewPasswordStep />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAuth={true} allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
          </Route>

          {/* User routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute requireAuth={true} allowedRoles={["user"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserHome />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideNavFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
