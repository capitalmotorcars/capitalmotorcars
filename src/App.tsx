import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import CarLeasingMarltonNJPage from "./pages/local/CarLeasingMarltonNJPage";
import CarLeasingSpringfieldNJPage from "./pages/local/CarLeasingSpringfieldNJPage";
import BmwCarLeasePage from "./pages/local/BmwCarLeasePage";
import ChevySuburbanLeasePage from "./pages/local/ChevySuburbanLeasePage";
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

const legacyRedirects = [
  { from: "/get-started", to: "/quiz" },
  { from: "/ignite", to: "/" }
];

const blogSlugs = [
  'best-lease-deals-new-jersey',
  'auto-broker-vs-dealership-new-jersey',
  'bad-credit-car-lease-new-jersey',
  'zero-down-car-lease-new-jersey',
  'luxury-car-lease-new-jersey',
  'lease-return-process-explained-new-jersey',
  'how-to-lease-a-car-under-business-name',
  'leasing-cars-tax-benefits',
  'volvo-s60-reliability',
  'sales-taxes-demystified-your-car-lease-payments-explained',
  'how-to-negotiate-a-lease-deal',
  'gas-vs-hybrid-vs-electric-cars-which-one-is-right-for-me',
  'toyota-prius-reliability',
  'best-hatchback-cars',
  'kia-seltos-reliability-detailed-review',
  'audi-a3-reliability-guide',
  'what-does-a-zero-down-lease-really-mean',
  'choosing-a-car-for-a-college-student-read-this-first',
  'toyota-camry-reliability'
];

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
              <Route path="/services/credit" element={<FinancingPage />} />
              <Route path="/services/financing" element={<Navigate to="/services/credit" replace />} />
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
              <Route path="/car-lease-deals-new-jersey" element={<CarLeaseDealsNewJerseyPage />} />
              <Route path="/auto-leasing-new-jersey" element={<AutoLeasingNewJerseyPage />} />
              <Route path="/luxury-car-leasing-nj" element={<LuxuryCarLeasingNJPage />} />
              <Route path="/car-leasing-trenton-nj" element={<CarLeasingTrentonNJPage />} />
              <Route path="/car-leasing-edgewater-nj" element={<CarLeasingEdgewaterNJPage />} />
              <Route path="/car-leasing-marlton-nj" element={<CarLeasingMarltonNJPage />} />
              <Route path="/car-leasing-springfield-nj" element={<CarLeasingSpringfieldNJPage />} />

              {/* Static Blog Routes */}
              {blogSlugs.map((slug) => (
                <Route key={slug} path={`/${slug}`} element={<BlogPostPage />} />
              ))}

              {/* Legacy Blog Redirects */}
              {blogSlugs.map((slug) => (
                <Route key={`blog-${slug}`} path={`/blog/${slug}`} element={<Navigate to={`/${slug}`} replace />} />
              ))}

              <Route path="/bmw-car-lease" element={<BmwCarLeasePage />} />
              <Route path="/chevy-suburban-lease-deals" element={<ChevySuburbanLeasePage />} />
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

              {/* Legacy Redirects */}
              {legacyRedirects.flatMap(({ from, to }) => [
                <Route key={from} path={from} element={<Navigate to={to} replace />} />,
                <Route key={`${from}/`} path={`${from}/`} element={<Navigate to={to} replace />} />
              ])}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
