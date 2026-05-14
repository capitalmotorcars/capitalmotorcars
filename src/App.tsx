import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import BrandsPage from "./pages/BrandsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CreditApplicationPage from "./pages/CreditApplicationPage";
import CreditApplicationDataSecurityPage from "./pages/CreditApplicationDataSecurityPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import QuizPage from "./pages/QuizPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import CarLeaseDealsNewJerseyPage from "./pages/local/CarLeaseDealsNewJerseyPage";
import AutoLeasingNewJerseyPage from "./pages/local/AutoLeasingNewJerseyPage";
import LuxuryCarLeasingNJPage from "./pages/local/LuxuryCarLeasingNJPage";
import CarLeasingTrentonNJPage from "./pages/local/CarLeasingTrentonNJPage";
import CarLeasingEdgewaterNJPage from "./pages/local/CarLeasingEdgewaterNJPage";
import BmwCarLeasePage from "./pages/local/BmwCarLeasePage";
import CarLeasingPage from "./pages/services/CarLeasingPage";
import FinancingPage from "./pages/services/FinancingPage";
import TradeInPage from "./pages/services/TradeInPage";
import TradeInValuePage from "./pages/TradeInValuePage";
import WearAndTearPage from "./pages/services/WearAndTearPage";
import WheelRepairPage from "./pages/services/WheelRepairPage";
import DetailingPage from "./pages/services/DetailingPage";
import NotFound from "./pages/NotFound";

// Vehicle type pages
import VehicleDetailsPage from "./pages/vehicles/VehicleDetailsPage";

// Admin pages
import LoginPage from "./pages/admin/LoginPage";
import DealsPage from "./pages/admin/DealsPage";
import { VehicleTypesPage } from "./pages/admin/VehicleTypesPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import BlogPostsPage from "./pages/admin/BlogPostsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" storageKey="capital-motor-theme" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/car-leasing" element={<CarLeasingPage />} />
              <Route path="/services/financing" element={<FinancingPage />} />
              <Route path="/services/trade-in" element={<TradeInPage />} />
              <Route path="/trade-in-value" element={<TradeInValuePage />} />
              <Route path="/services/wear-and-tear" element={<WearAndTearPage />} />
              <Route path="/services/wheel-repair" element={<WheelRepairPage />} />
              <Route path="/services/detailing" element={<DetailingPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/credit-application/data-security" element={<CreditApplicationDataSecurityPage />} />
              <Route path="/credit-application" element={<CreditApplicationPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/car-lease-deals-new-jersey" element={<CarLeaseDealsNewJerseyPage />} />
              <Route path="/auto-leasing-new-jersey" element={<AutoLeasingNewJerseyPage />} />
              <Route path="/luxury-car-leasing-nj" element={<LuxuryCarLeasingNJPage />} />
              <Route path="/car-leasing-trenton-nj" element={<CarLeasingTrentonNJPage />} />
              <Route path="/car-leasing-edgewater-nj" element={<CarLeasingEdgewaterNJPage />} />
              <Route path="/best-lease-deals-new-jersey" element={<BlogPostPage />} />
              <Route path="/auto-broker-vs-dealership-new-jersey" element={<BlogPostPage />} />
              <Route path="/bad-credit-car-lease-new-jersey" element={<BlogPostPage />} />
              <Route path="/zero-down-car-lease-new-jersey" element={<BlogPostPage />} />
              <Route path="/luxury-car-lease-new-jersey" element={<BlogPostPage />} />
              <Route path="/bmw-car-lease" element={<BmwCarLeasePage />} />
              {/* Dynamic Vehicle Details Loop */}
              <Route path="/vehicles/:slug" element={<VehicleDetailsPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="deals" element={<DealsPage />} />
                <Route path="vehicles" element={<VehicleTypesPage />} />
                <Route path="blogs" element={<BlogPostsPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
