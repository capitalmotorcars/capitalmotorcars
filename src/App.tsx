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


const BMWBrandPage = lazy(() => import('./pages/brands/BMWBrandPage'));
const MercedesBenzBrandPage = lazy(() => import('./pages/brands/MercedesBenzBrandPage'));
const AudiBrandPage = lazy(() => import('./pages/brands/AudiBrandPage'));
const LexusBrandPage = lazy(() => import('./pages/brands/LexusBrandPage'));
const PorscheBrandPage = lazy(() => import('./pages/brands/PorscheBrandPage'));
const AcuraBrandPage = lazy(() => import('./pages/brands/AcuraBrandPage'));
const AlfaRomeoBrandPage = lazy(() => import('./pages/brands/AlfaRomeoBrandPage'));
const AstonMartinBrandPage = lazy(() => import('./pages/brands/AstonMartinBrandPage'));
const BentleyBrandPage = lazy(() => import('./pages/brands/BentleyBrandPage'));
const CadillacBrandPage = lazy(() => import('./pages/brands/CadillacBrandPage'));
const InfinitiBrandPage = lazy(() => import('./pages/brands/InfinitiBrandPage'));
const JaguarBrandPage = lazy(() => import('./pages/brands/JaguarBrandPage'));
const LamborghiniBrandPage = lazy(() => import('./pages/brands/LamborghiniBrandPage'));
const LandRoverBrandPage = lazy(() => import('./pages/brands/LandRoverBrandPage'));
const LincolnBrandPage = lazy(() => import('./pages/brands/LincolnBrandPage'));
const MaseratiBrandPage = lazy(() => import('./pages/brands/MaseratiBrandPage'));
const VolvoBrandPage = lazy(() => import('./pages/brands/VolvoBrandPage'));
const ToyotaBrandPage = lazy(() => import('./pages/brands/ToyotaBrandPage'));
const HondaBrandPage = lazy(() => import('./pages/brands/HondaBrandPage'));
const FordBrandPage = lazy(() => import('./pages/brands/FordBrandPage'));
const ChevroletBrandPage = lazy(() => import('./pages/brands/ChevroletBrandPage'));
const VolkswagenBrandPage = lazy(() => import('./pages/brands/VolkswagenBrandPage'));
const HyundaiBrandPage = lazy(() => import('./pages/brands/HyundaiBrandPage'));
const KiaBrandPage = lazy(() => import('./pages/brands/KiaBrandPage'));
const NissanBrandPage = lazy(() => import('./pages/brands/NissanBrandPage'));
const BuickBrandPage = lazy(() => import('./pages/brands/BuickBrandPage'));
const ChryslerBrandPage = lazy(() => import('./pages/brands/ChryslerBrandPage'));
const DodgeBrandPage = lazy(() => import('./pages/brands/DodgeBrandPage'));
const FiatBrandPage = lazy(() => import('./pages/brands/FiatBrandPage'));
const GenesisBrandPage = lazy(() => import('./pages/brands/GenesisBrandPage'));
const GMCBrandPage = lazy(() => import('./pages/brands/GMCBrandPage'));
const JeepBrandPage = lazy(() => import('./pages/brands/JeepBrandPage'));
const MazdaBrandPage = lazy(() => import('./pages/brands/MazdaBrandPage'));
const MiniBrandPage = lazy(() => import('./pages/brands/MiniBrandPage'));
const MitsubishiBrandPage = lazy(() => import('./pages/brands/MitsubishiBrandPage'));
const RamBrandPage = lazy(() => import('./pages/brands/RamBrandPage'));
const SubaruBrandPage = lazy(() => import('./pages/brands/SubaruBrandPage'));
const CarKeyReplacementPage = lazy(() => import("./pages/services/CarKeyReplacementPage"));

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
  'lease-wear-and-tear-charges-nj',
  'leasing-fees-explained-in-detail-everything-you-need-to-know',
  'wheel-squeaks-when-driving',
  'auto-leasing-cheat-codes-multiple-security-deposits',
  'toyota-sienna-reliability-guide',
  'the-lease-return-checklist-7-things-to-expect-when-returning-your-lease',
  'top-5-things-most-leasing-companies-dont-want-you-to-know-about-leasing-a-car',
  'one-pay-leasing-pros-and-cons',
  'mazda-cx-9-reliability-detailed-review',
  '7-upgrades-to-turn-your-suv-into-a-high-tech-dream-car',
  'should-i-lease-a-car-as-a-pet-owner',
  'roadside-assistance-which-automaker-does-it-best',
  '5-tips-leasing-car-2026',
  'bmw-x1-reliability-performance-review',
  'bad-credit-car-lease-approval-guide',
  'the-money-factor-do-you-know-where-your-lease-rates-come-from',
  'car-lease-end-overview-what-to-do-when-your-lease-is-up',
  'best-car-lease-deals-july-2026',
  'is-leasing-a-car-a-scam-reddit',
  'lease-vs-buy-reddit-2026',
  'how-to-negotiate-a-car-lease-reddit',
  'ev-leasing-new-jersey-guide-2026',
  'top-5-luxury-suvs-to-lease-2026',
  'how-to-get-out-of-a-car-lease-early',
  'leasing-a-car-with-bad-credit-nj',
  'why-lease-a-hybrid-car-2026',
  'end-of-lease-options-explained',
  'high-mileage-car-lease-guide',
  'car-skidding-in-winter',
  'road-trip-2026-the-ultimate-packing-guide',
  'audi-a4-reliability-long-term-performance-and-durability',
  'got-bad-credit-heres-how-to-get-approved-for-a-car-lease',
  'returning-your-lease-car-to-the-dealership-how-to-prepare-and-what-you-need-to-know',
  'car-key-not-working-in-ignition',
  'are-jeeps-reliable',
  'hyundai-sonata-reliability',
  'negotiate-the-best-car-lease-deal'
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
                <Route path="/services/car-key-replacement" element={<CarKeyReplacementPage />} />
                <Route path="/brand/bmw" element={<BMWBrandPage />} />
                <Route path="/brand/mercedes-benz" element={<MercedesBenzBrandPage />} />
                <Route path="/brand/audi" element={<AudiBrandPage />} />
                <Route path="/brand/lexus" element={<LexusBrandPage />} />
                <Route path="/brand/porsche" element={<PorscheBrandPage />} />
                <Route path="/brand/acura" element={<AcuraBrandPage />} />
                <Route path="/brand/alfa-romeo" element={<AlfaRomeoBrandPage />} />
                <Route path="/brand/aston-martin" element={<AstonMartinBrandPage />} />
                <Route path="/brand/bentley" element={<BentleyBrandPage />} />
                <Route path="/brand/cadillac" element={<CadillacBrandPage />} />
                <Route path="/brand/infiniti" element={<InfinitiBrandPage />} />
                <Route path="/brand/jaguar" element={<JaguarBrandPage />} />
                <Route path="/brand/lamborghini" element={<LamborghiniBrandPage />} />
                <Route path="/brand/land-rover" element={<LandRoverBrandPage />} />
                <Route path="/brand/lincoln" element={<LincolnBrandPage />} />
                <Route path="/brand/maserati" element={<MaseratiBrandPage />} />
                <Route path="/brand/volvo" element={<VolvoBrandPage />} />
                <Route path="/brand/toyota" element={<ToyotaBrandPage />} />
                <Route path="/brand/honda" element={<HondaBrandPage />} />
                <Route path="/brand/ford" element={<FordBrandPage />} />
                <Route path="/brand/chevrolet" element={<ChevroletBrandPage />} />
                <Route path="/brand/volkswagen" element={<VolkswagenBrandPage />} />
                <Route path="/brand/hyundai" element={<HyundaiBrandPage />} />
                <Route path="/brand/kia" element={<KiaBrandPage />} />
                <Route path="/brand/nissan" element={<NissanBrandPage />} />
                <Route path="/brand/buick" element={<BuickBrandPage />} />
                <Route path="/brand/chrysler" element={<ChryslerBrandPage />} />
                <Route path="/brand/dodge" element={<DodgeBrandPage />} />
                <Route path="/brand/fiat" element={<FiatBrandPage />} />
                <Route path="/brand/genesis" element={<GenesisBrandPage />} />
                <Route path="/brand/gmc" element={<GMCBrandPage />} />
                <Route path="/brand/jeep" element={<JeepBrandPage />} />
                <Route path="/brand/mazda" element={<MazdaBrandPage />} />
                <Route path="/brand/mini" element={<MiniBrandPage />} />
                <Route path="/brand/mitsubishi" element={<MitsubishiBrandPage />} />
                <Route path="/brand/ram" element={<RamBrandPage />} />
                <Route path="/brand/subaru" element={<SubaruBrandPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/credit-application/data-security" element={<CreditApplicationDataSecurityPage />} />
                <Route path="/lease-calculator" element={<LeaseCalculatorPage />} />
                <Route path="/comparisons/bmw-x5-vs-audi-q7-lease" element={<BmwX5VsAudiQ7Page />} />
                <Route path="/comparisons/bmw-x5-vs-mercedes-gle-lease" element={<BmwX5VsMercedesGLEPage />} />
                <Route path="/comparisons/audi-q5-vs-bmw-x3-lease" element={<AudiQ5VsBmwX3Page />} />
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
                  <Route index element={<Navigate to="/admin/deals" replace />} />
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
