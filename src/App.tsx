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
const LeaseCalculatorPage = lazy(() => import("./pages/LeaseCalculatorPage"));
const BmwX5VsAudiQ7Page = lazy(() => import("./pages/comparisons/BmwX5VsAudiQ7Page"));
const BmwLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/BmwLeaseDealsJerseyCityPage"));
const TeslaLeasingHobokenPage = lazy(() => import("./pages/local/TeslaLeasingHobokenPage"));
const AudiLeaseSpecialsParamusPage = lazy(() => import("./pages/local/AudiLeaseSpecialsParamusPage"));
const MercedesBenzLeasingEdgewaterPage = lazy(() => import("./pages/local/MercedesBenzLeasingEdgewaterPage"));
const LexusLeaseDealsMarltonPage = lazy(() => import("./pages/local/LexusLeaseDealsMarltonPage"));
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
const CarLeasingParamusNJPage = lazy(() => import("./pages/local/CarLeasingParamusNJPage"));
const CarLeasingHobokenNJPage = lazy(() => import("./pages/local/CarLeasingHobokenNJPage"));
const BmwCarLeasePage = lazy(() => import("./pages/local/BmwCarLeasePage"));
const ChevySuburbanLeasePage = lazy(() => import("./pages/local/ChevySuburbanLeasePage"));

const CarLeasingJerseyCityNJPage = lazy(() => import("./pages/local/CarLeasingJerseyCityNJPage"));
// New comparison pages
const BmwX5VsMercedesGLEPage = lazy(() => import("./pages/comparisons/BmwX5VsMercedesGLEPage"));
const AudiQ5VsBmwX3Page = lazy(() => import("./pages/comparisons/AudiQ5VsBmwX3Page"));
const TeslaModelYVsBmwIXPage = lazy(() => import("./pages/comparisons/TeslaModelYVsBmwIXPage"));
const HondaCRVVsToyotaRAV4Page = lazy(() => import("./pages/comparisons/HondaCRVVsToyotaRAV4Page"));

// New service pages
const LeaseReturnPage = lazy(() => import("./pages/services/LeaseReturnPage"));
const LeaseTransferPage = lazy(() => import("./pages/services/LeaseTransferPage"));
const EarlyLeaseExitPage = lazy(() => import("./pages/services/EarlyLeaseExitPage"));

// New hub pages
const CarLeasingNewJerseyPage = lazy(() => import("./pages/local/CarLeasingNewJerseyPage"));
const CarLeasingBergenCountyPage = lazy(() => import("./pages/local/CarLeasingBergenCountyPage"));
const CarLeasingHudsonCountyPage = lazy(() => import("./pages/local/CarLeasingHudsonCountyPage"));
const CarLeasingEssexCountyPage = lazy(() => import("./pages/local/CarLeasingEssexCountyPage"));
const CarLeasingUnionCountyPage = lazy(() => import("./pages/local/CarLeasingUnionCountyPage"));
const CarLeasingMiddlesexCountyPage = lazy(() => import("./pages/local/CarLeasingMiddlesexCountyPage"));
const CarLeasingMorrisCountyPage = lazy(() => import("./pages/local/CarLeasingMorrisCountyPage"));
const CarLeasingMonmouthCountyPage = lazy(() => import("./pages/local/CarLeasingMonmouthCountyPage"));

// Make/Model pages
const Bmw3SeriesLeasePage = lazy(() => import("./pages/models/Bmw3SeriesLeasePage"));
const Bmw5SeriesLeasePage = lazy(() => import("./pages/models/Bmw5SeriesLeasePage"));
const BmwX3LeasePage = lazy(() => import("./pages/models/BmwX3LeasePage"));
const BmwX5LeasePage = lazy(() => import("./pages/models/BmwX5LeasePage"));
const MercedesCClassLeasePage = lazy(() => import("./pages/models/MercedesCClassLeasePage"));
const MercedesEClassLeasePage = lazy(() => import("./pages/models/MercedesEClassLeasePage"));
const MercedesGleLeasePage = lazy(() => import("./pages/models/MercedesGleLeasePage"));
const AudiA4LeasePage = lazy(() => import("./pages/models/AudiA4LeasePage"));
const AudiQ5LeasePage = lazy(() => import("./pages/models/AudiQ5LeasePage"));
const TeslaModel3LeasePage = lazy(() => import("./pages/models/TeslaModel3LeasePage"));
const TeslaModelYLeasePage = lazy(() => import("./pages/models/TeslaModelYLeasePage"));
const LexusRxLeasePage = lazy(() => import("./pages/models/LexusRxLeasePage"));
const ToyotaRav4LeasePage = lazy(() => import("./pages/models/ToyotaRav4LeasePage"));
const HondaCrvLeasePage = lazy(() => import("./pages/models/HondaCrvLeasePage"));
const HyundaiIoniq6LeasePage = lazy(() => import("./pages/models/HyundaiIoniq6LeasePage"));

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
  'toyota-camry-reliability',
  'how-to-lease-a-car-new-jersey-new-york',
  'best-suv-lease-deals-new-jersey',
  'ev-lease-specials-new-jersey',
  'bmw-lease-specials-new-jersey',
  'best-car-lease-deals-june-2026',
  'hidden-fees-in-car-leasing-dealership-secrets',
  'why-nj-brokers-beat-route-22-dealerships',
  'lease-wear-and-tear-charges-nj'
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
                <Route path="/services/lease-return" element={<LeaseReturnPage />} />
                <Route path="/services/lease-transfer" element={<LeaseTransferPage />} />
                <Route path="/services/early-lease-exit" element={<EarlyLeaseExitPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/credit-application/data-security" element={<CreditApplicationDataSecurityPage />} />
                <Route path="/lease-calculator" element={<LeaseCalculatorPage />} />
                <Route path="/comparisons/bmw-x5-vs-audi-q7-lease" element={<BmwX5VsAudiQ7Page />} />
                <Route path="/comparisons/bmw-x5-vs-mercedes-gle-lease" element={<BmwX5VsMercedesGLEPage />} />
                <Route path="/comparisons/audi-q5-vs-bmw-x3-lease" element={<AudiQ5VsBmwX3Page />} />
                <Route path="/comparisons/tesla-model-y-vs-bmw-ix-lease" element={<TeslaModelYVsBmwIXPage />} />
                <Route path="/comparisons/honda-cr-v-vs-toyota-rav4-lease" element={<HondaCRVVsToyotaRAV4Page />} />
                <Route path="/credit-application" element={<CreditApplicationPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/car-leasing-new-jersey" element={<CarLeasingNewJerseyPage />} />
                <Route path="/car-leasing-bergen-county-nj" element={<CarLeasingBergenCountyPage />} />
                <Route path="/car-leasing-hudson-county-nj" element={<CarLeasingHudsonCountyPage />} />
                <Route path="/car-leasing-essex-county-nj" element={<CarLeasingEssexCountyPage />} />
                <Route path="/car-leasing-union-county-nj" element={<CarLeasingUnionCountyPage />} />
                <Route path="/car-leasing-middlesex-county-nj" element={<CarLeasingMiddlesexCountyPage />} />
                <Route path="/car-leasing-morris-county-nj" element={<CarLeasingMorrisCountyPage />} />
                <Route path="/car-leasing-monmouth-county-nj" element={<CarLeasingMonmouthCountyPage />} />
                {/* Make/Model pages */}
                <Route path="/bmw-3-series-lease-nj" element={<Bmw3SeriesLeasePage />} />
                <Route path="/bmw-5-series-lease-nj" element={<Bmw5SeriesLeasePage />} />
                <Route path="/bmw-x3-lease-nj" element={<BmwX3LeasePage />} />
                <Route path="/bmw-x5-lease-nj" element={<BmwX5LeasePage />} />
                <Route path="/mercedes-c-class-lease-nj" element={<MercedesCClassLeasePage />} />
                <Route path="/mercedes-e-class-lease-nj" element={<MercedesEClassLeasePage />} />
                <Route path="/mercedes-gle-lease-nj" element={<MercedesGleLeasePage />} />
                <Route path="/audi-a4-lease-nj" element={<AudiA4LeasePage />} />
                <Route path="/audi-q5-lease-nj" element={<AudiQ5LeasePage />} />
                <Route path="/tesla-model-3-lease-nj" element={<TeslaModel3LeasePage />} />
                <Route path="/tesla-model-y-lease-nj" element={<TeslaModelYLeasePage />} />
                <Route path="/lexus-rx-lease-nj" element={<LexusRxLeasePage />} />
                <Route path="/toyota-rav4-lease-nj" element={<ToyotaRav4LeasePage />} />
                <Route path="/honda-crv-lease-nj" element={<HondaCrvLeasePage />} />
                <Route path="/hyundai-ioniq6-lease-nj" element={<HyundaiIoniq6LeasePage />} />
                <Route path="/car-lease-deals-new-jersey" element={<CarLeaseDealsNewJerseyPage />} />
                <Route path="/auto-leasing-new-jersey" element={<AutoLeasingNewJerseyPage />} />
                <Route path="/luxury-car-leasing-nj" element={<LuxuryCarLeasingNJPage />} />
                <Route path="/car-leasing-trenton-nj" element={<CarLeasingTrentonNJPage />} />
                <Route path="/car-leasing-edgewater-nj" element={<CarLeasingEdgewaterNJPage />} />
                <Route path="/car-leasing-marlton-nj" element={<CarLeasingMarltonNJPage />} />
                <Route path="/car-leasing-springfield-nj" element={<CarLeasingSpringfieldNJPage />} />
                <Route path="/car-leasing-paramus-nj" element={<CarLeasingParamusNJPage />} />
                <Route path="/car-leasing-hoboken-nj" element={<CarLeasingHobokenNJPage />} />
                <Route path="/car-leasing-jersey-city-nj" element={<CarLeasingJerseyCityNJPage />} />
                <Route path="/bmw-lease-deals-jersey-city" element={<BmwLeaseDealsJerseyCityPage />} />
                <Route path="/tesla-leasing-hoboken" element={<TeslaLeasingHobokenPage />} />
                <Route path="/audi-lease-specials-paramus" element={<AudiLeaseSpecialsParamusPage />} />
                <Route path="/mercedes-benz-leasing-edgewater" element={<MercedesBenzLeasingEdgewaterPage />} />
                <Route path="/lexus-lease-deals-marlton" element={<LexusLeaseDealsMarltonPage />} />

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
