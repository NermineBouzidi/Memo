import { BrowserRouter, Routes, Route, useLocation,Navigate } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopMotion from "./components/ScrollToTopMotion";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyResetOtp from "./pages/VerifyResetOtp";
//import ResetPasswordFlow from "./pages/ResetPasswordFlow";
import EmailStep from "./pages/test/EmailStep";
import OtpStep from "./pages/test/OtpStep";
import NewPasswordStep from "./pages/test/NewPasswordStep";

import { CartProvider } from "./contexts/cartContext";

import Categories from "./pages/Categories";
import Blog from "./pages/Blog";
import SavoirPlus from "./pages/SavoirPlus";
import Home from "./pages/Home";
import VoirPanier from "./pages/VoirPanier";
import Faq from "./pages/Faq";
import AvisClients from "./pages/AvisClients";
import GuideUtilisation from "./pages/GuideUtilisation";
import Support  from "./pages/Support";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
// Pages Utilisateur
import UserHome from "./pages/user/UserHome";
import ClientDashboard from "./pages/user/DashboardClient";
import Paiements from "./pages/VoirPanier";
import MesDocuments from "./pages/user/MesDocuments";
import MesCommandes from "./pages/user/MesCommandes";
import SupportInbox from "./pages/admin/SupportInbox";
import SupportTickets from './pages/admin/SupportTickets';
// ...


import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import QuEstCeQuUnCRP from "./components/sections/crp";
import Etapes from "./components/sections/Etapes";
import Tarifs from "./components/sections/Tarifs";
import Contact from "./components/sections/Contact";
import VideoDemo from "./components/sections/VideoDemo";
import Highlights from "./components/sections/Highlights";
import Prod from "./components/sections/ProductDefinition";
import PourQui from "./components/sections/PourQui";
import PMEServices from "./components/sections/PMEServices";  
import BTPArchitecture from "./components/sections/BTPArchitecture";
import AgencesIndependants from "./components/sections/AgencesIndependants";
import IndustrieProduction from "./components/sections/industries";
import ResultsPage from "./components/sections/resultat";
import DemoPage from "./pages/DemoPage";
import MentionsLegales from "./pages/MentionsLégales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import CGU from "./pages/CGU";
import DemandeRdvAdmin from "./pages/admin/DemandeRdvAdmin";
import RdvClient from "./pages/user/RdvClient";
import DevisAdmin from "./pages/admin/DevisAdmin";
import FactureAdmin from "./pages/admin/FactureAdmin";

function AppContent() {
  const location = useLocation();

  const noNavFooterPaths = [
    "/login",
    "/signup",
    "/verify-account",
    "/forgot-password",
    "/reset-password",
    "/verify-reset-otp",
   // "/reset-pass-flow",
    "/emailstep",
    "/otpstep",
    "/nouveaupass",
    "/home/dashboard",
    "/home/commandes",
    "/home/paiements",
    "/home/documents",
    "/admin",
    "/admin/",
    "/admin/users",
    "/admin/messages",
    "/admin/products",
    "/admin/support",
    "/admin/demandes-rdv",
    "/admin/devis",
    "/admin/facture"
    
 
    
  ];

  const hideNavFooter = noNavFooterPaths.includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Navbar />}
<main className={!hideNavFooter && location.pathname !== "/" ? "" : ""}>

  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/savoir-plus" element={<SavoirPlus />} />
           <Route path="/faq" element={<Faq/>} />
              <Route path="/avis-clients" element={<AvisClients/>} />
              <Route path="/guide-utilisation" element={<GuideUtilisation/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/crp" element={<QuEstCeQuUnCRP />} />
          <Route path="/pourquoi-memo" element={<Highlights />} />
          <Route path="/etapes" element={<Etapes />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/video-demo" element={<VideoDemo />} />
          <Route path="/fonctionnalites" element={<Prod />} />
          <Route path="/pour-qui" element={<PourQui />} />
          <Route path="/pme-services" element={<PMEServices />} />
          <Route path="/btp-architecture" element={<BTPArchitecture />} />
          <Route path="/agences-independants" element={<AgencesIndependants />} />

          <Route path="/industrie-production" element={<IndustrieProduction />} />
          <Route path="/resultats" element={<ResultsPage />} />
             <Route path="/demo" element={<DemoPage />} />
             <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/cgu" element={<CGU />} />


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
         {/*  <Route path="/reset-pass-flow" element={<ResetPasswordFlow />} /> */}
          <Route path="/emailstep" element={<EmailStep />} />
          <Route path="/otpstep" element={<OtpStep />} />
          <Route path="/nouveaupass" element={<NewPasswordStep />} />
          <Route path="/voir-panier" element={<VoirPanier />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin Routes */}
       <Route
  path="/admin/*"
  element={
    <ProtectedRoute requireAuth={true} allowedRoles={['admin']}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="users" element={<Users />} />
  <Route path="messages" element={<SupportInbox />} />
  <Route path="products" element={<Products />} />
  <Route path="support" element={<SupportTickets/> } />
  <Route path="demandes-rdv" element={<DemandeRdvAdmin />} />
   <Route path="devis" element={<DevisAdmin />} />
   <Route path="facture" element={<FactureAdmin />} />
   

  devis-facture

</Route>

          
<Route 
  path="/home" 
  element={
    <ProtectedRoute>
      <UserLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<ClientDashboard />} />
  <Route path="commandes" element={<MesCommandes />} />
  <Route path="paiements" element={<Paiements />} />
  <Route path="documents/client-devis/:id" element={<MesDocuments />} />
  <Route path="rdv-client/:email" element={<RdvClient />} />

  <Route path="support" element={<Support/>} />

  
</Route>
        </Routes>
      </main>
      {!hideNavFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTopMotion />
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
