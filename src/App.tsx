import { lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Eagerly loaded: homepage (critical path) + NotFound (needed for every miss)
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

// All other pages lazy-loaded so the initial bundle stays small
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const BrandsPage = lazy(() => import("./pages/BrandsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CreditApplicationPage = lazy(() => import("./pages/CreditApplicationPage"));
const CreditApplicationDataSecurityPage = lazy(() => import("./pages/CreditApplicationDataSecurityPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const TradeInValuePage = lazy(() => import("./pages/TradeInValuePage"));

// Local pages
const CarLeaseDealsNewJerseyPage = lazy(() => import("./pages/local/CarLeaseDealsNewJerseyPage"));
const AutoLeasingNewJerseyPage = lazy(() => import("./pages/local/AutoLeasingNewJerseyPage"));
const LuxuryCarLeasingNJPage = lazy(() => import("./pages/local/LuxuryCarLeasingNJPage"));
const CarLeasingTrentonNJPage = lazy(() => import("./pages/local/CarLeasingTrentonNJPage"));
const CarLeasingEdgewaterNJPage = lazy(() => import("./pages/local/CarLeasingEdgewaterNJPage"));
const CarLeasingMarltonNJPage = lazy(() => import("./pages/local/CarLeasingMarltonNJPage"));
const CarLeasingSpringfieldNJPage = lazy(() => import("./pages/local/CarLeasingSpringfieldNJPage"));
const BmwCarLeasePage = lazy(() => import("./pages/local/BmwCarLeasePage"));
const ChevySuburbanLeasePage = lazy(() => import("./pages/local/ChevySuburbanLeasePage"));

// Service pages
const CarLeasingPage = lazy(() => import("./pages/services/CarLeasingPage"));
const FinancingPage = lazy(() => import("./pages/services/FinancingPage"));
const TradeInPage = lazy(() => import("./pages/services/TradeInPage"));
const WearAndTearPage = lazy(() => import("./pages/services/WearAndTearPage"));
const WheelRepairPage = lazy(() => import("./pages/services/WheelRepairPage"));
const DetailingPage = lazy(() => import("./pages/services/DetailingPage"));

// Vehicle pages
const VehicleDetailsPage = lazy(() => import("./pages/vehicles/VehicleDetailsPage"));

// Admin pages
const LoginPage = lazy(() => import("./pages/admin/LoginPage"));
const DealsPage = lazy(() => import("./pages/admin/DealsPage"));
const VehicleTypesPage = lazy(() => import("./pages/admin/VehicleTypesPage").then(m => ({ default: m.VehicleTypesPage })));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout").then(m => ({ default: m.AdminLayout })));
const BlogPostsPage = lazy(() => import("./pages/admin/BlogPostsPage"));

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
            <Suspense fallback={null}>
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
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
