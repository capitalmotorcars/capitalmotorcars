import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import BrandsPage from "./pages/BrandsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CreditApplicationPage from "./pages/CreditApplicationPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import QuizPage from "./pages/QuizPage";
import CarLeasingPage from "./pages/services/CarLeasingPage";
import FinancingPage from "./pages/services/FinancingPage";
import TradeInPage from "./pages/services/TradeInPage";
import WearAndTearPage from "./pages/services/WearAndTearPage";
import WheelRepairPage from "./pages/services/WheelRepairPage";
import DetailingPage from "./pages/services/DetailingPage";
import NotFound from "./pages/NotFound";

// Vehicle type pages
import VehicleDetailsPage from "./pages/vehicles/VehicleDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" storageKey="capital-motor-theme" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/car-leasing" element={<CarLeasingPage />} />
            <Route path="/services/financing" element={<FinancingPage />} />
            <Route path="/services/trade-in" element={<TradeInPage />} />
            <Route path="/services/wear-and-tear" element={<WearAndTearPage />} />
            <Route path="/services/wheel-repair" element={<WheelRepairPage />} />
            <Route path="/services/detailing" element={<DetailingPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/credit-application" element={<CreditApplicationPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/quiz" element={<QuizPage />} />

            {/* Dynamic Vehicle Details Loop */}
            <Route path="/vehicles/:slug" element={<VehicleDetailsPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
