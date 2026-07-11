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
const HTMLSitemapPage = lazy(() => import("./pages/HTMLSitemapPage"));

// Category Pages
const SUVCategoryPage = lazy(() => import("./pages/categories/SUVCategoryPage"));
const ElectricVehicleEVCategoryPage = lazy(() => import("./pages/categories/ElectricVehicleEVCategoryPage"));
const TruckCategoryPage = lazy(() => import("./pages/categories/TruckCategoryPage"));
const LuxuryCarCategoryPage = lazy(() => import("./pages/categories/LuxuryCarCategoryPage"));
const MinivanCategoryPage = lazy(() => import("./pages/categories/MinivanCategoryPage"));

const BmwX5VsAudiQ7Page = lazy(() => import("./pages/comparisons/BmwX5VsAudiQ7Page"));
const BmwLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/BmwLeaseDealsJerseyCityPage"));
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

// Mass local lease-deal pages (brand x city)
const AudiLeaseDealsAlpinePage = lazy(() => import("./pages/local/AudiLeaseDealsAlpinePage"));
const AudiLeaseDealsCherryHillPage = lazy(() => import("./pages/local/AudiLeaseDealsCherryHillPage"));
const AudiLeaseDealsEdgewaterPage = lazy(() => import("./pages/local/AudiLeaseDealsEdgewaterPage"));
const AudiLeaseDealsEnglewoodPage = lazy(() => import("./pages/local/AudiLeaseDealsEnglewoodPage"));
const AudiLeaseDealsFortLeePage = lazy(() => import("./pages/local/AudiLeaseDealsFortLeePage"));
const AudiLeaseDealsHaddonfieldPage = lazy(() => import("./pages/local/AudiLeaseDealsHaddonfieldPage"));
const AudiLeaseDealsHobokenPage = lazy(() => import("./pages/local/AudiLeaseDealsHobokenPage"));
const AudiLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/AudiLeaseDealsJerseyCityPage"));
const AudiLeaseDealsMarltonPage = lazy(() => import("./pages/local/AudiLeaseDealsMarltonPage"));
const AudiLeaseDealsMontclairPage = lazy(() => import("./pages/local/AudiLeaseDealsMontclairPage"));
const AudiLeaseDealsMoorestownPage = lazy(() => import("./pages/local/AudiLeaseDealsMoorestownPage"));
const AudiLeaseDealsMorristownPage = lazy(() => import("./pages/local/AudiLeaseDealsMorristownPage"));
const AudiLeaseDealsParamusPage = lazy(() => import("./pages/local/AudiLeaseDealsParamusPage"));
const AudiLeaseDealsPrincetonPage = lazy(() => import("./pages/local/AudiLeaseDealsPrincetonPage"));
const AudiLeaseDealsRidgewoodPage = lazy(() => import("./pages/local/AudiLeaseDealsRidgewoodPage"));
const AudiLeaseDealsSaddleRiverPage = lazy(() => import("./pages/local/AudiLeaseDealsSaddleRiverPage"));
const AudiLeaseDealsShortHillsPage = lazy(() => import("./pages/local/AudiLeaseDealsShortHillsPage"));
const AudiLeaseDealsSummitPage = lazy(() => import("./pages/local/AudiLeaseDealsSummitPage"));
const AudiLeaseDealsTenaflyPage = lazy(() => import("./pages/local/AudiLeaseDealsTenaflyPage"));
const AudiLeaseDealsWestfieldPage = lazy(() => import("./pages/local/AudiLeaseDealsWestfieldPage"));
const BMWLeaseDealsAlpinePage = lazy(() => import("./pages/local/BMWLeaseDealsAlpinePage"));
const BMWLeaseDealsCherryHillPage = lazy(() => import("./pages/local/BMWLeaseDealsCherryHillPage"));
const BMWLeaseDealsEdgewaterPage = lazy(() => import("./pages/local/BMWLeaseDealsEdgewaterPage"));
const BMWLeaseDealsEnglewoodPage = lazy(() => import("./pages/local/BMWLeaseDealsEnglewoodPage"));
const BMWLeaseDealsFortLeePage = lazy(() => import("./pages/local/BMWLeaseDealsFortLeePage"));
const BMWLeaseDealsHaddonfieldPage = lazy(() => import("./pages/local/BMWLeaseDealsHaddonfieldPage"));
const BMWLeaseDealsHobokenPage = lazy(() => import("./pages/local/BMWLeaseDealsHobokenPage"));
const BMWLeaseDealsMarltonPage = lazy(() => import("./pages/local/BMWLeaseDealsMarltonPage"));
const BMWLeaseDealsMontclairPage = lazy(() => import("./pages/local/BMWLeaseDealsMontclairPage"));
const BMWLeaseDealsMoorestownPage = lazy(() => import("./pages/local/BMWLeaseDealsMoorestownPage"));
const BMWLeaseDealsMorristownPage = lazy(() => import("./pages/local/BMWLeaseDealsMorristownPage"));
const BMWLeaseDealsParamusPage = lazy(() => import("./pages/local/BMWLeaseDealsParamusPage"));
const BMWLeaseDealsPrincetonPage = lazy(() => import("./pages/local/BMWLeaseDealsPrincetonPage"));
const BMWLeaseDealsRidgewoodPage = lazy(() => import("./pages/local/BMWLeaseDealsRidgewoodPage"));
const BMWLeaseDealsSaddleRiverPage = lazy(() => import("./pages/local/BMWLeaseDealsSaddleRiverPage"));
const BMWLeaseDealsShortHillsPage = lazy(() => import("./pages/local/BMWLeaseDealsShortHillsPage"));
const BMWLeaseDealsSummitPage = lazy(() => import("./pages/local/BMWLeaseDealsSummitPage"));
const BMWLeaseDealsTenaflyPage = lazy(() => import("./pages/local/BMWLeaseDealsTenaflyPage"));
const BMWLeaseDealsWestfieldPage = lazy(() => import("./pages/local/BMWLeaseDealsWestfieldPage"));
const FordLeaseDealsAlpinePage = lazy(() => import("./pages/local/FordLeaseDealsAlpinePage"));
const FordLeaseDealsCherryHillPage = lazy(() => import("./pages/local/FordLeaseDealsCherryHillPage"));
const FordLeaseDealsEdgewaterPage = lazy(() => import("./pages/local/FordLeaseDealsEdgewaterPage"));
const FordLeaseDealsEnglewoodPage = lazy(() => import("./pages/local/FordLeaseDealsEnglewoodPage"));
const FordLeaseDealsFortLeePage = lazy(() => import("./pages/local/FordLeaseDealsFortLeePage"));
const FordLeaseDealsHaddonfieldPage = lazy(() => import("./pages/local/FordLeaseDealsHaddonfieldPage"));
const FordLeaseDealsHobokenPage = lazy(() => import("./pages/local/FordLeaseDealsHobokenPage"));
const FordLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/FordLeaseDealsJerseyCityPage"));
const FordLeaseDealsMarltonPage = lazy(() => import("./pages/local/FordLeaseDealsMarltonPage"));
const FordLeaseDealsMontclairPage = lazy(() => import("./pages/local/FordLeaseDealsMontclairPage"));
const FordLeaseDealsMoorestownPage = lazy(() => import("./pages/local/FordLeaseDealsMoorestownPage"));
const FordLeaseDealsMorristownPage = lazy(() => import("./pages/local/FordLeaseDealsMorristownPage"));
const FordLeaseDealsParamusPage = lazy(() => import("./pages/local/FordLeaseDealsParamusPage"));
const FordLeaseDealsPrincetonPage = lazy(() => import("./pages/local/FordLeaseDealsPrincetonPage"));
const FordLeaseDealsRidgewoodPage = lazy(() => import("./pages/local/FordLeaseDealsRidgewoodPage"));
const FordLeaseDealsSaddleRiverPage = lazy(() => import("./pages/local/FordLeaseDealsSaddleRiverPage"));
const FordLeaseDealsShortHillsPage = lazy(() => import("./pages/local/FordLeaseDealsShortHillsPage"));
const FordLeaseDealsSummitPage = lazy(() => import("./pages/local/FordLeaseDealsSummitPage"));
const FordLeaseDealsTenaflyPage = lazy(() => import("./pages/local/FordLeaseDealsTenaflyPage"));
const FordLeaseDealsWestfieldPage = lazy(() => import("./pages/local/FordLeaseDealsWestfieldPage"));
const HondaLeaseDealsAlpinePage = lazy(() => import("./pages/local/HondaLeaseDealsAlpinePage"));
const HondaLeaseDealsCherryHillPage = lazy(() => import("./pages/local/HondaLeaseDealsCherryHillPage"));
const HondaLeaseDealsEdgewaterPage = lazy(() => import("./pages/local/HondaLeaseDealsEdgewaterPage"));
const HondaLeaseDealsEnglewoodPage = lazy(() => import("./pages/local/HondaLeaseDealsEnglewoodPage"));
const HondaLeaseDealsFortLeePage = lazy(() => import("./pages/local/HondaLeaseDealsFortLeePage"));
const HondaLeaseDealsHaddonfieldPage = lazy(() => import("./pages/local/HondaLeaseDealsHaddonfieldPage"));
const HondaLeaseDealsHobokenPage = lazy(() => import("./pages/local/HondaLeaseDealsHobokenPage"));
const HondaLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/HondaLeaseDealsJerseyCityPage"));
const HondaLeaseDealsMarltonPage = lazy(() => import("./pages/local/HondaLeaseDealsMarltonPage"));
const HondaLeaseDealsMontclairPage = lazy(() => import("./pages/local/HondaLeaseDealsMontclairPage"));
const HondaLeaseDealsMoorestownPage = lazy(() => import("./pages/local/HondaLeaseDealsMoorestownPage"));
const HondaLeaseDealsMorristownPage = lazy(() => import("./pages/local/HondaLeaseDealsMorristownPage"));
const HondaLeaseDealsParamusPage = lazy(() => import("./pages/local/HondaLeaseDealsParamusPage"));
const HondaLeaseDealsPrincetonPage = lazy(() => import("./pages/local/HondaLeaseDealsPrincetonPage"));
const HondaLeaseDealsRidgewoodPage = lazy(() => import("./pages/local/HondaLeaseDealsRidgewoodPage"));
const HondaLeaseDealsSaddleRiverPage = lazy(() => import("./pages/local/HondaLeaseDealsSaddleRiverPage"));
const HondaLeaseDealsShortHillsPage = lazy(() => import("./pages/local/HondaLeaseDealsShortHillsPage"));
const HondaLeaseDealsSummitPage = lazy(() => import("./pages/local/HondaLeaseDealsSummitPage"));
const HondaLeaseDealsTenaflyPage = lazy(() => import("./pages/local/HondaLeaseDealsTenaflyPage"));
const HondaLeaseDealsWestfieldPage = lazy(() => import("./pages/local/HondaLeaseDealsWestfieldPage"));
const JeepLeaseDealsAlpinePage = lazy(() => import("./pages/local/JeepLeaseDealsAlpinePage"));
const JeepLeaseDealsCherryHillPage = lazy(() => import("./pages/local/JeepLeaseDealsCherryHillPage"));
const JeepLeaseDealsEdgewaterPage = lazy(() => import("./pages/local/JeepLeaseDealsEdgewaterPage"));
const JeepLeaseDealsEnglewoodPage = lazy(() => import("./pages/local/JeepLeaseDealsEnglewoodPage"));
const JeepLeaseDealsFortLeePage = lazy(() => import("./pages/local/JeepLeaseDealsFortLeePage"));
const JeepLeaseDealsHaddonfieldPage = lazy(() => import("./pages/local/JeepLeaseDealsHaddonfieldPage"));
const JeepLeaseDealsHobokenPage = lazy(() => import("./pages/local/JeepLeaseDealsHobokenPage"));
const JeepLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/JeepLeaseDealsJerseyCityPage"));
const JeepLeaseDealsMarltonPage = lazy(() => import("./pages/local/JeepLeaseDealsMarltonPage"));
const JeepLeaseDealsMontclairPage = lazy(() => import("./pages/local/JeepLeaseDealsMontclairPage"));
const JeepLeaseDealsMoorestownPage = lazy(() => import("./pages/local/JeepLeaseDealsMoorestownPage"));
const JeepLeaseDealsMorristownPage = lazy(() => import("./pages/local/JeepLeaseDealsMorristownPage"));
const JeepLeaseDealsParamusPage = lazy(() => import("./pages/local/JeepLeaseDealsParamusPage"));
const JeepLeaseDealsPrincetonPage = lazy(() => import("./pages/local/JeepLeaseDealsPrincetonPage"));
const JeepLeaseDealsRidgewoodPage = lazy(() => import("./pages/local/JeepLeaseDealsRidgewoodPage"));
const JeepLeaseDealsSaddleRiverPage = lazy(() => import("./pages/local/JeepLeaseDealsSaddleRiverPage"));
const JeepLeaseDealsShortHillsPage = lazy(() => import("./pages/local/JeepLeaseDealsShortHillsPage"));
const JeepLeaseDealsSummitPage = lazy(() => import("./pages/local/JeepLeaseDealsSummitPage"));
const JeepLeaseDealsTenaflyPage = lazy(() => import("./pages/local/JeepLeaseDealsTenaflyPage"));
const JeepLeaseDealsWestfieldPage = lazy(() => import("./pages/local/JeepLeaseDealsWestfieldPage"));
const LandRoverLeaseDealsAlpinePage = lazy(() => import("./pages/local/LandRoverLeaseDealsAlpinePage"));
const LandRoverLeaseDealsCherryHillPage = lazy(() => import("./pages/local/LandRoverLeaseDealsCherryHillPage"));
const LandRoverLeaseDealsEdgewaterPage = lazy(() => import("./pages/local/LandRoverLeaseDealsEdgewaterPage"));
const LandRoverLeaseDealsEnglewoodPage = lazy(() => import("./pages/local/LandRoverLeaseDealsEnglewoodPage"));
const LandRoverLeaseDealsFortLeePage = lazy(() => import("./pages/local/LandRoverLeaseDealsFortLeePage"));
const LandRoverLeaseDealsHaddonfieldPage = lazy(() => import("./pages/local/LandRoverLeaseDealsHaddonfieldPage"));
const LandRoverLeaseDealsHobokenPage = lazy(() => import("./pages/local/LandRoverLeaseDealsHobokenPage"));
const LandRoverLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/LandRoverLeaseDealsJerseyCityPage"));
const LandRoverLeaseDealsMarltonPage = lazy(() => import("./pages/local/LandRoverLeaseDealsMarltonPage"));
const LandRoverLeaseDealsMontclairPage = lazy(() => import("./pages/local/LandRoverLeaseDealsMontclairPage"));
const LandRoverLeaseDealsMoorestownPage = lazy(() => import("./pages/local/LandRoverLeaseDealsMoorestownPage"));
const LandRoverLeaseDealsMorristownPage = lazy(() => import("./pages/local/LandRoverLeaseDealsMorristownPage"));
const LandRoverLeaseDealsParamusPage = lazy(() => import("./pages/local/LandRoverLeaseDealsParamusPage"));
const LandRoverLeaseDealsPrincetonPage = lazy(() => import("./pages/local/LandRoverLeaseDealsPrincetonPage"));
const LandRoverLeaseDealsRidgewoodPage = lazy(() => import("./pages/local/LandRoverLeaseDealsRidgewoodPage"));
const LandRoverLeaseDealsSaddleRiverPage = lazy(() => import("./pages/local/LandRoverLeaseDealsSaddleRiverPage"));
const LandRoverLeaseDealsShortHillsPage = lazy(() => import("./pages/local/LandRoverLeaseDealsShortHillsPage"));
const LandRoverLeaseDealsSummitPage = lazy(() => import("./pages/local/LandRoverLeaseDealsSummitPage"));
const LandRoverLeaseDealsTenaflyPage = lazy(() => import("./pages/local/LandRoverLeaseDealsTenaflyPage"));
const LandRoverLeaseDealsWestfieldPage = lazy(() => import("./pages/local/LandRoverLeaseDealsWestfieldPage"));
const LexusLeaseDealsAlpinePage = lazy(() => import("./pages/local/LexusLeaseDealsAlpinePage"));
const LexusLeaseDealsCherryHillPage = lazy(() => import("./pages/local/LexusLeaseDealsCherryHillPage"));
const LexusLeaseDealsEdgewaterPage = lazy(() => import("./pages/local/LexusLeaseDealsEdgewaterPage"));
const LexusLeaseDealsEnglewoodPage = lazy(() => import("./pages/local/LexusLeaseDealsEnglewoodPage"));
const LexusLeaseDealsFortLeePage = lazy(() => import("./pages/local/LexusLeaseDealsFortLeePage"));
const LexusLeaseDealsHaddonfieldPage = lazy(() => import("./pages/local/LexusLeaseDealsHaddonfieldPage"));
const LexusLeaseDealsHobokenPage = lazy(() => import("./pages/local/LexusLeaseDealsHobokenPage"));
const LexusLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/LexusLeaseDealsJerseyCityPage"));
const LexusLeaseDealsMontclairPage = lazy(() => import("./pages/local/LexusLeaseDealsMontclairPage"));
const LexusLeaseDealsMoorestownPage = lazy(() => import("./pages/local/LexusLeaseDealsMoorestownPage"));
const LexusLeaseDealsMorristownPage = lazy(() => import("./pages/local/LexusLeaseDealsMorristownPage"));
const LexusLeaseDealsParamusPage = lazy(() => import("./pages/local/LexusLeaseDealsParamusPage"));
const LexusLeaseDealsPrincetonPage = lazy(() => import("./pages/local/LexusLeaseDealsPrincetonPage"));
const LexusLeaseDealsRidgewoodPage = lazy(() => import("./pages/local/LexusLeaseDealsRidgewoodPage"));
const LexusLeaseDealsSaddleRiverPage = lazy(() => import("./pages/local/LexusLeaseDealsSaddleRiverPage"));
const LexusLeaseDealsShortHillsPage = lazy(() => import("./pages/local/LexusLeaseDealsShortHillsPage"));
const LexusLeaseDealsSummitPage = lazy(() => import("./pages/local/LexusLeaseDealsSummitPage"));
const LexusLeaseDealsTenaflyPage = lazy(() => import("./pages/local/LexusLeaseDealsTenaflyPage"));
const LexusLeaseDealsWestfieldPage = lazy(() => import("./pages/local/LexusLeaseDealsWestfieldPage"));
const MercedesBenzLeaseDealsAlpinePage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsAlpinePage"));
const MercedesBenzLeaseDealsCherryHillPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsCherryHillPage"));
const MercedesBenzLeaseDealsEdgewaterPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsEdgewaterPage"));
const MercedesBenzLeaseDealsEnglewoodPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsEnglewoodPage"));
const MercedesBenzLeaseDealsFortLeePage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsFortLeePage"));
const MercedesBenzLeaseDealsHaddonfieldPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsHaddonfieldPage"));
const MercedesBenzLeaseDealsHobokenPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsHobokenPage"));
const MercedesBenzLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsJerseyCityPage"));
const MercedesBenzLeaseDealsMarltonPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsMarltonPage"));
const MercedesBenzLeaseDealsMontclairPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsMontclairPage"));
const MercedesBenzLeaseDealsMoorestownPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsMoorestownPage"));
const MercedesBenzLeaseDealsMorristownPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsMorristownPage"));
const MercedesBenzLeaseDealsParamusPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsParamusPage"));
const MercedesBenzLeaseDealsPrincetonPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsPrincetonPage"));
const MercedesBenzLeaseDealsRidgewoodPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsRidgewoodPage"));
const MercedesBenzLeaseDealsSaddleRiverPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsSaddleRiverPage"));
const MercedesBenzLeaseDealsShortHillsPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsShortHillsPage"));
const MercedesBenzLeaseDealsSummitPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsSummitPage"));
const MercedesBenzLeaseDealsTenaflyPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsTenaflyPage"));
const MercedesBenzLeaseDealsWestfieldPage = lazy(() => import("./pages/local/MercedesBenzLeaseDealsWestfieldPage"));
const PorscheLeaseDealsAlpinePage = lazy(() => import("./pages/local/PorscheLeaseDealsAlpinePage"));
const PorscheLeaseDealsCherryHillPage = lazy(() => import("./pages/local/PorscheLeaseDealsCherryHillPage"));
const PorscheLeaseDealsEdgewaterPage = lazy(() => import("./pages/local/PorscheLeaseDealsEdgewaterPage"));
const PorscheLeaseDealsEnglewoodPage = lazy(() => import("./pages/local/PorscheLeaseDealsEnglewoodPage"));
const PorscheLeaseDealsFortLeePage = lazy(() => import("./pages/local/PorscheLeaseDealsFortLeePage"));
const PorscheLeaseDealsHaddonfieldPage = lazy(() => import("./pages/local/PorscheLeaseDealsHaddonfieldPage"));
const PorscheLeaseDealsHobokenPage = lazy(() => import("./pages/local/PorscheLeaseDealsHobokenPage"));
const PorscheLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/PorscheLeaseDealsJerseyCityPage"));
const PorscheLeaseDealsMarltonPage = lazy(() => import("./pages/local/PorscheLeaseDealsMarltonPage"));
const PorscheLeaseDealsMontclairPage = lazy(() => import("./pages/local/PorscheLeaseDealsMontclairPage"));
const PorscheLeaseDealsMoorestownPage = lazy(() => import("./pages/local/PorscheLeaseDealsMoorestownPage"));
const PorscheLeaseDealsMorristownPage = lazy(() => import("./pages/local/PorscheLeaseDealsMorristownPage"));
const PorscheLeaseDealsParamusPage = lazy(() => import("./pages/local/PorscheLeaseDealsParamusPage"));
const PorscheLeaseDealsPrincetonPage = lazy(() => import("./pages/local/PorscheLeaseDealsPrincetonPage"));
const PorscheLeaseDealsRidgewoodPage = lazy(() => import("./pages/local/PorscheLeaseDealsRidgewoodPage"));
const PorscheLeaseDealsSaddleRiverPage = lazy(() => import("./pages/local/PorscheLeaseDealsSaddleRiverPage"));
const PorscheLeaseDealsShortHillsPage = lazy(() => import("./pages/local/PorscheLeaseDealsShortHillsPage"));
const PorscheLeaseDealsSummitPage = lazy(() => import("./pages/local/PorscheLeaseDealsSummitPage"));
const PorscheLeaseDealsTenaflyPage = lazy(() => import("./pages/local/PorscheLeaseDealsTenaflyPage"));
const PorscheLeaseDealsWestfieldPage = lazy(() => import("./pages/local/PorscheLeaseDealsWestfieldPage"));
const ToyotaLeaseDealsAlpinePage = lazy(() => import("./pages/local/ToyotaLeaseDealsAlpinePage"));
const ToyotaLeaseDealsCherryHillPage = lazy(() => import("./pages/local/ToyotaLeaseDealsCherryHillPage"));
const ToyotaLeaseDealsEdgewaterPage = lazy(() => import("./pages/local/ToyotaLeaseDealsEdgewaterPage"));
const ToyotaLeaseDealsEnglewoodPage = lazy(() => import("./pages/local/ToyotaLeaseDealsEnglewoodPage"));
const ToyotaLeaseDealsFortLeePage = lazy(() => import("./pages/local/ToyotaLeaseDealsFortLeePage"));
const ToyotaLeaseDealsHaddonfieldPage = lazy(() => import("./pages/local/ToyotaLeaseDealsHaddonfieldPage"));
const ToyotaLeaseDealsHobokenPage = lazy(() => import("./pages/local/ToyotaLeaseDealsHobokenPage"));
const ToyotaLeaseDealsJerseyCityPage = lazy(() => import("./pages/local/ToyotaLeaseDealsJerseyCityPage"));
const ToyotaLeaseDealsMarltonPage = lazy(() => import("./pages/local/ToyotaLeaseDealsMarltonPage"));
const ToyotaLeaseDealsMontclairPage = lazy(() => import("./pages/local/ToyotaLeaseDealsMontclairPage"));
const ToyotaLeaseDealsMoorestownPage = lazy(() => import("./pages/local/ToyotaLeaseDealsMoorestownPage"));
const ToyotaLeaseDealsMorristownPage = lazy(() => import("./pages/local/ToyotaLeaseDealsMorristownPage"));
const ToyotaLeaseDealsParamusPage = lazy(() => import("./pages/local/ToyotaLeaseDealsParamusPage"));
const ToyotaLeaseDealsPrincetonPage = lazy(() => import("./pages/local/ToyotaLeaseDealsPrincetonPage"));
const ToyotaLeaseDealsRidgewoodPage = lazy(() => import("./pages/local/ToyotaLeaseDealsRidgewoodPage"));
const ToyotaLeaseDealsSaddleRiverPage = lazy(() => import("./pages/local/ToyotaLeaseDealsSaddleRiverPage"));
const ToyotaLeaseDealsShortHillsPage = lazy(() => import("./pages/local/ToyotaLeaseDealsShortHillsPage"));
const ToyotaLeaseDealsSummitPage = lazy(() => import("./pages/local/ToyotaLeaseDealsSummitPage"));
const ToyotaLeaseDealsTenaflyPage = lazy(() => import("./pages/local/ToyotaLeaseDealsTenaflyPage"));
const ToyotaLeaseDealsWestfieldPage = lazy(() => import("./pages/local/ToyotaLeaseDealsWestfieldPage"));
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
  'bmw-x5-reliability-guide',
  'porsche-macan-maintenance-costs',
  'mercedes-gle-reliability-issues',
  'lexus-rx350-reliability-guide',
  'range-rover-sport-reliability',
  'jeep-grand-cherokee-reliability',
  'honda-crv-maintenance-costs',
  'ford-explorer-reliability-issues',
  'chevy-silverado-1500-reliability',
  'vw-tiguan-maintenance-guide',
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
                <Route path="/sitemap" element={<HTMLSitemapPage />} />
                <Route path="/locations" element={<HTMLSitemapPage />} />
                <Route path="/suv-lease-deals" element={<SUVCategoryPage />} />
                <Route path="/ev-lease-deals" element={<ElectricVehicleEVCategoryPage />} />
                <Route path="/truck-lease-deals" element={<TruckCategoryPage />} />
                <Route path="/luxury-car-lease-deals" element={<LuxuryCarCategoryPage />} />
                <Route path="/minivan-lease-deals" element={<MinivanCategoryPage />} />
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
                {/* Mass Local Pages */}
                <Route path="/bmw-lease-deals-paramus" element={<BMWLeaseDealsParamusPage />} />
                <Route path="/mercedes-benz-lease-deals-paramus" element={<MercedesBenzLeaseDealsParamusPage />} />
                <Route path="/audi-lease-deals-paramus" element={<AudiLeaseDealsParamusPage />} />
                <Route path="/porsche-lease-deals-paramus" element={<PorscheLeaseDealsParamusPage />} />
                <Route path="/lexus-lease-deals-paramus" element={<LexusLeaseDealsParamusPage />} />
                <Route path="/land-rover-lease-deals-paramus" element={<LandRoverLeaseDealsParamusPage />} />
                <Route path="/jeep-lease-deals-paramus" element={<JeepLeaseDealsParamusPage />} />
                <Route path="/honda-lease-deals-paramus" element={<HondaLeaseDealsParamusPage />} />
                <Route path="/toyota-lease-deals-paramus" element={<ToyotaLeaseDealsParamusPage />} />
                <Route path="/ford-lease-deals-paramus" element={<FordLeaseDealsParamusPage />} />
                <Route path="/bmw-lease-deals-hoboken" element={<BMWLeaseDealsHobokenPage />} />
                <Route path="/mercedes-benz-lease-deals-hoboken" element={<MercedesBenzLeaseDealsHobokenPage />} />
                <Route path="/audi-lease-deals-hoboken" element={<AudiLeaseDealsHobokenPage />} />
                <Route path="/porsche-lease-deals-hoboken" element={<PorscheLeaseDealsHobokenPage />} />
                <Route path="/lexus-lease-deals-hoboken" element={<LexusLeaseDealsHobokenPage />} />
                <Route path="/land-rover-lease-deals-hoboken" element={<LandRoverLeaseDealsHobokenPage />} />
                <Route path="/jeep-lease-deals-hoboken" element={<JeepLeaseDealsHobokenPage />} />
                <Route path="/honda-lease-deals-hoboken" element={<HondaLeaseDealsHobokenPage />} />
                <Route path="/toyota-lease-deals-hoboken" element={<ToyotaLeaseDealsHobokenPage />} />
                <Route path="/ford-lease-deals-hoboken" element={<FordLeaseDealsHobokenPage />} />
                <Route path="/mercedes-benz-lease-deals-jersey-city" element={<MercedesBenzLeaseDealsJerseyCityPage />} />
                <Route path="/audi-lease-deals-jersey-city" element={<AudiLeaseDealsJerseyCityPage />} />
                <Route path="/porsche-lease-deals-jersey-city" element={<PorscheLeaseDealsJerseyCityPage />} />
                <Route path="/lexus-lease-deals-jersey-city" element={<LexusLeaseDealsJerseyCityPage />} />
                <Route path="/land-rover-lease-deals-jersey-city" element={<LandRoverLeaseDealsJerseyCityPage />} />
                <Route path="/jeep-lease-deals-jersey-city" element={<JeepLeaseDealsJerseyCityPage />} />
                <Route path="/honda-lease-deals-jersey-city" element={<HondaLeaseDealsJerseyCityPage />} />
                <Route path="/toyota-lease-deals-jersey-city" element={<ToyotaLeaseDealsJerseyCityPage />} />
                <Route path="/ford-lease-deals-jersey-city" element={<FordLeaseDealsJerseyCityPage />} />
                <Route path="/bmw-lease-deals-edgewater" element={<BMWLeaseDealsEdgewaterPage />} />
                <Route path="/mercedes-benz-lease-deals-edgewater" element={<MercedesBenzLeaseDealsEdgewaterPage />} />
                <Route path="/audi-lease-deals-edgewater" element={<AudiLeaseDealsEdgewaterPage />} />
                <Route path="/porsche-lease-deals-edgewater" element={<PorscheLeaseDealsEdgewaterPage />} />
                <Route path="/lexus-lease-deals-edgewater" element={<LexusLeaseDealsEdgewaterPage />} />
                <Route path="/land-rover-lease-deals-edgewater" element={<LandRoverLeaseDealsEdgewaterPage />} />
                <Route path="/jeep-lease-deals-edgewater" element={<JeepLeaseDealsEdgewaterPage />} />
                <Route path="/honda-lease-deals-edgewater" element={<HondaLeaseDealsEdgewaterPage />} />
                <Route path="/toyota-lease-deals-edgewater" element={<ToyotaLeaseDealsEdgewaterPage />} />
                <Route path="/ford-lease-deals-edgewater" element={<FordLeaseDealsEdgewaterPage />} />
                <Route path="/bmw-lease-deals-short-hills" element={<BMWLeaseDealsShortHillsPage />} />
                <Route path="/mercedes-benz-lease-deals-short-hills" element={<MercedesBenzLeaseDealsShortHillsPage />} />
                <Route path="/audi-lease-deals-short-hills" element={<AudiLeaseDealsShortHillsPage />} />
                <Route path="/porsche-lease-deals-short-hills" element={<PorscheLeaseDealsShortHillsPage />} />
                <Route path="/lexus-lease-deals-short-hills" element={<LexusLeaseDealsShortHillsPage />} />
                <Route path="/land-rover-lease-deals-short-hills" element={<LandRoverLeaseDealsShortHillsPage />} />
                <Route path="/jeep-lease-deals-short-hills" element={<JeepLeaseDealsShortHillsPage />} />
                <Route path="/honda-lease-deals-short-hills" element={<HondaLeaseDealsShortHillsPage />} />
                <Route path="/toyota-lease-deals-short-hills" element={<ToyotaLeaseDealsShortHillsPage />} />
                <Route path="/ford-lease-deals-short-hills" element={<FordLeaseDealsShortHillsPage />} />
                <Route path="/bmw-lease-deals-englewood" element={<BMWLeaseDealsEnglewoodPage />} />
                <Route path="/mercedes-benz-lease-deals-englewood" element={<MercedesBenzLeaseDealsEnglewoodPage />} />
                <Route path="/audi-lease-deals-englewood" element={<AudiLeaseDealsEnglewoodPage />} />
                <Route path="/porsche-lease-deals-englewood" element={<PorscheLeaseDealsEnglewoodPage />} />
                <Route path="/lexus-lease-deals-englewood" element={<LexusLeaseDealsEnglewoodPage />} />
                <Route path="/land-rover-lease-deals-englewood" element={<LandRoverLeaseDealsEnglewoodPage />} />
                <Route path="/jeep-lease-deals-englewood" element={<JeepLeaseDealsEnglewoodPage />} />
                <Route path="/honda-lease-deals-englewood" element={<HondaLeaseDealsEnglewoodPage />} />
                <Route path="/toyota-lease-deals-englewood" element={<ToyotaLeaseDealsEnglewoodPage />} />
                <Route path="/ford-lease-deals-englewood" element={<FordLeaseDealsEnglewoodPage />} />
                <Route path="/bmw-lease-deals-fort-lee" element={<BMWLeaseDealsFortLeePage />} />
                <Route path="/mercedes-benz-lease-deals-fort-lee" element={<MercedesBenzLeaseDealsFortLeePage />} />
                <Route path="/audi-lease-deals-fort-lee" element={<AudiLeaseDealsFortLeePage />} />
                <Route path="/porsche-lease-deals-fort-lee" element={<PorscheLeaseDealsFortLeePage />} />
                <Route path="/lexus-lease-deals-fort-lee" element={<LexusLeaseDealsFortLeePage />} />
                <Route path="/land-rover-lease-deals-fort-lee" element={<LandRoverLeaseDealsFortLeePage />} />
                <Route path="/jeep-lease-deals-fort-lee" element={<JeepLeaseDealsFortLeePage />} />
                <Route path="/honda-lease-deals-fort-lee" element={<HondaLeaseDealsFortLeePage />} />
                <Route path="/toyota-lease-deals-fort-lee" element={<ToyotaLeaseDealsFortLeePage />} />
                <Route path="/ford-lease-deals-fort-lee" element={<FordLeaseDealsFortLeePage />} />
                <Route path="/bmw-lease-deals-alpine" element={<BMWLeaseDealsAlpinePage />} />
                <Route path="/mercedes-benz-lease-deals-alpine" element={<MercedesBenzLeaseDealsAlpinePage />} />
                <Route path="/audi-lease-deals-alpine" element={<AudiLeaseDealsAlpinePage />} />
                <Route path="/porsche-lease-deals-alpine" element={<PorscheLeaseDealsAlpinePage />} />
                <Route path="/lexus-lease-deals-alpine" element={<LexusLeaseDealsAlpinePage />} />
                <Route path="/land-rover-lease-deals-alpine" element={<LandRoverLeaseDealsAlpinePage />} />
                <Route path="/jeep-lease-deals-alpine" element={<JeepLeaseDealsAlpinePage />} />
                <Route path="/honda-lease-deals-alpine" element={<HondaLeaseDealsAlpinePage />} />
                <Route path="/toyota-lease-deals-alpine" element={<ToyotaLeaseDealsAlpinePage />} />
                <Route path="/ford-lease-deals-alpine" element={<FordLeaseDealsAlpinePage />} />
                <Route path="/bmw-lease-deals-saddle-river" element={<BMWLeaseDealsSaddleRiverPage />} />
                <Route path="/mercedes-benz-lease-deals-saddle-river" element={<MercedesBenzLeaseDealsSaddleRiverPage />} />
                <Route path="/audi-lease-deals-saddle-river" element={<AudiLeaseDealsSaddleRiverPage />} />
                <Route path="/porsche-lease-deals-saddle-river" element={<PorscheLeaseDealsSaddleRiverPage />} />
                <Route path="/lexus-lease-deals-saddle-river" element={<LexusLeaseDealsSaddleRiverPage />} />
                <Route path="/land-rover-lease-deals-saddle-river" element={<LandRoverLeaseDealsSaddleRiverPage />} />
                <Route path="/jeep-lease-deals-saddle-river" element={<JeepLeaseDealsSaddleRiverPage />} />
                <Route path="/honda-lease-deals-saddle-river" element={<HondaLeaseDealsSaddleRiverPage />} />
                <Route path="/toyota-lease-deals-saddle-river" element={<ToyotaLeaseDealsSaddleRiverPage />} />
                <Route path="/ford-lease-deals-saddle-river" element={<FordLeaseDealsSaddleRiverPage />} />
                <Route path="/bmw-lease-deals-ridgewood" element={<BMWLeaseDealsRidgewoodPage />} />
                <Route path="/mercedes-benz-lease-deals-ridgewood" element={<MercedesBenzLeaseDealsRidgewoodPage />} />
                <Route path="/audi-lease-deals-ridgewood" element={<AudiLeaseDealsRidgewoodPage />} />
                <Route path="/porsche-lease-deals-ridgewood" element={<PorscheLeaseDealsRidgewoodPage />} />
                <Route path="/lexus-lease-deals-ridgewood" element={<LexusLeaseDealsRidgewoodPage />} />
                <Route path="/land-rover-lease-deals-ridgewood" element={<LandRoverLeaseDealsRidgewoodPage />} />
                <Route path="/jeep-lease-deals-ridgewood" element={<JeepLeaseDealsRidgewoodPage />} />
                <Route path="/honda-lease-deals-ridgewood" element={<HondaLeaseDealsRidgewoodPage />} />
                <Route path="/toyota-lease-deals-ridgewood" element={<ToyotaLeaseDealsRidgewoodPage />} />
                <Route path="/ford-lease-deals-ridgewood" element={<FordLeaseDealsRidgewoodPage />} />
                <Route path="/bmw-lease-deals-tenafly" element={<BMWLeaseDealsTenaflyPage />} />
                <Route path="/mercedes-benz-lease-deals-tenafly" element={<MercedesBenzLeaseDealsTenaflyPage />} />
                <Route path="/audi-lease-deals-tenafly" element={<AudiLeaseDealsTenaflyPage />} />
                <Route path="/porsche-lease-deals-tenafly" element={<PorscheLeaseDealsTenaflyPage />} />
                <Route path="/lexus-lease-deals-tenafly" element={<LexusLeaseDealsTenaflyPage />} />
                <Route path="/land-rover-lease-deals-tenafly" element={<LandRoverLeaseDealsTenaflyPage />} />
                <Route path="/jeep-lease-deals-tenafly" element={<JeepLeaseDealsTenaflyPage />} />
                <Route path="/honda-lease-deals-tenafly" element={<HondaLeaseDealsTenaflyPage />} />
                <Route path="/toyota-lease-deals-tenafly" element={<ToyotaLeaseDealsTenaflyPage />} />
                <Route path="/ford-lease-deals-tenafly" element={<FordLeaseDealsTenaflyPage />} />
                <Route path="/bmw-lease-deals-cherry-hill" element={<BMWLeaseDealsCherryHillPage />} />
                <Route path="/mercedes-benz-lease-deals-cherry-hill" element={<MercedesBenzLeaseDealsCherryHillPage />} />
                <Route path="/audi-lease-deals-cherry-hill" element={<AudiLeaseDealsCherryHillPage />} />
                <Route path="/porsche-lease-deals-cherry-hill" element={<PorscheLeaseDealsCherryHillPage />} />
                <Route path="/lexus-lease-deals-cherry-hill" element={<LexusLeaseDealsCherryHillPage />} />
                <Route path="/land-rover-lease-deals-cherry-hill" element={<LandRoverLeaseDealsCherryHillPage />} />
                <Route path="/jeep-lease-deals-cherry-hill" element={<JeepLeaseDealsCherryHillPage />} />
                <Route path="/honda-lease-deals-cherry-hill" element={<HondaLeaseDealsCherryHillPage />} />
                <Route path="/toyota-lease-deals-cherry-hill" element={<ToyotaLeaseDealsCherryHillPage />} />
                <Route path="/ford-lease-deals-cherry-hill" element={<FordLeaseDealsCherryHillPage />} />
                <Route path="/bmw-lease-deals-marlton" element={<BMWLeaseDealsMarltonPage />} />
                <Route path="/mercedes-benz-lease-deals-marlton" element={<MercedesBenzLeaseDealsMarltonPage />} />
                <Route path="/audi-lease-deals-marlton" element={<AudiLeaseDealsMarltonPage />} />
                <Route path="/porsche-lease-deals-marlton" element={<PorscheLeaseDealsMarltonPage />} />
                <Route path="/land-rover-lease-deals-marlton" element={<LandRoverLeaseDealsMarltonPage />} />
                <Route path="/jeep-lease-deals-marlton" element={<JeepLeaseDealsMarltonPage />} />
                <Route path="/honda-lease-deals-marlton" element={<HondaLeaseDealsMarltonPage />} />
                <Route path="/toyota-lease-deals-marlton" element={<ToyotaLeaseDealsMarltonPage />} />
                <Route path="/ford-lease-deals-marlton" element={<FordLeaseDealsMarltonPage />} />
                <Route path="/bmw-lease-deals-moorestown" element={<BMWLeaseDealsMoorestownPage />} />
                <Route path="/mercedes-benz-lease-deals-moorestown" element={<MercedesBenzLeaseDealsMoorestownPage />} />
                <Route path="/audi-lease-deals-moorestown" element={<AudiLeaseDealsMoorestownPage />} />
                <Route path="/porsche-lease-deals-moorestown" element={<PorscheLeaseDealsMoorestownPage />} />
                <Route path="/lexus-lease-deals-moorestown" element={<LexusLeaseDealsMoorestownPage />} />
                <Route path="/land-rover-lease-deals-moorestown" element={<LandRoverLeaseDealsMoorestownPage />} />
                <Route path="/jeep-lease-deals-moorestown" element={<JeepLeaseDealsMoorestownPage />} />
                <Route path="/honda-lease-deals-moorestown" element={<HondaLeaseDealsMoorestownPage />} />
                <Route path="/toyota-lease-deals-moorestown" element={<ToyotaLeaseDealsMoorestownPage />} />
                <Route path="/ford-lease-deals-moorestown" element={<FordLeaseDealsMoorestownPage />} />
                <Route path="/bmw-lease-deals-haddonfield" element={<BMWLeaseDealsHaddonfieldPage />} />
                <Route path="/mercedes-benz-lease-deals-haddonfield" element={<MercedesBenzLeaseDealsHaddonfieldPage />} />
                <Route path="/audi-lease-deals-haddonfield" element={<AudiLeaseDealsHaddonfieldPage />} />
                <Route path="/porsche-lease-deals-haddonfield" element={<PorscheLeaseDealsHaddonfieldPage />} />
                <Route path="/lexus-lease-deals-haddonfield" element={<LexusLeaseDealsHaddonfieldPage />} />
                <Route path="/land-rover-lease-deals-haddonfield" element={<LandRoverLeaseDealsHaddonfieldPage />} />
                <Route path="/jeep-lease-deals-haddonfield" element={<JeepLeaseDealsHaddonfieldPage />} />
                <Route path="/honda-lease-deals-haddonfield" element={<HondaLeaseDealsHaddonfieldPage />} />
                <Route path="/toyota-lease-deals-haddonfield" element={<ToyotaLeaseDealsHaddonfieldPage />} />
                <Route path="/ford-lease-deals-haddonfield" element={<FordLeaseDealsHaddonfieldPage />} />
                <Route path="/bmw-lease-deals-princeton" element={<BMWLeaseDealsPrincetonPage />} />
                <Route path="/mercedes-benz-lease-deals-princeton" element={<MercedesBenzLeaseDealsPrincetonPage />} />
                <Route path="/audi-lease-deals-princeton" element={<AudiLeaseDealsPrincetonPage />} />
                <Route path="/porsche-lease-deals-princeton" element={<PorscheLeaseDealsPrincetonPage />} />
                <Route path="/lexus-lease-deals-princeton" element={<LexusLeaseDealsPrincetonPage />} />
                <Route path="/land-rover-lease-deals-princeton" element={<LandRoverLeaseDealsPrincetonPage />} />
                <Route path="/jeep-lease-deals-princeton" element={<JeepLeaseDealsPrincetonPage />} />
                <Route path="/honda-lease-deals-princeton" element={<HondaLeaseDealsPrincetonPage />} />
                <Route path="/toyota-lease-deals-princeton" element={<ToyotaLeaseDealsPrincetonPage />} />
                <Route path="/ford-lease-deals-princeton" element={<FordLeaseDealsPrincetonPage />} />
                <Route path="/bmw-lease-deals-morristown" element={<BMWLeaseDealsMorristownPage />} />
                <Route path="/mercedes-benz-lease-deals-morristown" element={<MercedesBenzLeaseDealsMorristownPage />} />
                <Route path="/audi-lease-deals-morristown" element={<AudiLeaseDealsMorristownPage />} />
                <Route path="/porsche-lease-deals-morristown" element={<PorscheLeaseDealsMorristownPage />} />
                <Route path="/lexus-lease-deals-morristown" element={<LexusLeaseDealsMorristownPage />} />
                <Route path="/land-rover-lease-deals-morristown" element={<LandRoverLeaseDealsMorristownPage />} />
                <Route path="/jeep-lease-deals-morristown" element={<JeepLeaseDealsMorristownPage />} />
                <Route path="/honda-lease-deals-morristown" element={<HondaLeaseDealsMorristownPage />} />
                <Route path="/toyota-lease-deals-morristown" element={<ToyotaLeaseDealsMorristownPage />} />
                <Route path="/ford-lease-deals-morristown" element={<FordLeaseDealsMorristownPage />} />
                <Route path="/bmw-lease-deals-westfield" element={<BMWLeaseDealsWestfieldPage />} />
                <Route path="/mercedes-benz-lease-deals-westfield" element={<MercedesBenzLeaseDealsWestfieldPage />} />
                <Route path="/audi-lease-deals-westfield" element={<AudiLeaseDealsWestfieldPage />} />
                <Route path="/porsche-lease-deals-westfield" element={<PorscheLeaseDealsWestfieldPage />} />
                <Route path="/lexus-lease-deals-westfield" element={<LexusLeaseDealsWestfieldPage />} />
                <Route path="/land-rover-lease-deals-westfield" element={<LandRoverLeaseDealsWestfieldPage />} />
                <Route path="/jeep-lease-deals-westfield" element={<JeepLeaseDealsWestfieldPage />} />
                <Route path="/honda-lease-deals-westfield" element={<HondaLeaseDealsWestfieldPage />} />
                <Route path="/toyota-lease-deals-westfield" element={<ToyotaLeaseDealsWestfieldPage />} />
                <Route path="/ford-lease-deals-westfield" element={<FordLeaseDealsWestfieldPage />} />
                <Route path="/bmw-lease-deals-summit" element={<BMWLeaseDealsSummitPage />} />
                <Route path="/mercedes-benz-lease-deals-summit" element={<MercedesBenzLeaseDealsSummitPage />} />
                <Route path="/audi-lease-deals-summit" element={<AudiLeaseDealsSummitPage />} />
                <Route path="/porsche-lease-deals-summit" element={<PorscheLeaseDealsSummitPage />} />
                <Route path="/lexus-lease-deals-summit" element={<LexusLeaseDealsSummitPage />} />
                <Route path="/land-rover-lease-deals-summit" element={<LandRoverLeaseDealsSummitPage />} />
                <Route path="/jeep-lease-deals-summit" element={<JeepLeaseDealsSummitPage />} />
                <Route path="/honda-lease-deals-summit" element={<HondaLeaseDealsSummitPage />} />
                <Route path="/toyota-lease-deals-summit" element={<ToyotaLeaseDealsSummitPage />} />
                <Route path="/ford-lease-deals-summit" element={<FordLeaseDealsSummitPage />} />
                <Route path="/bmw-lease-deals-montclair" element={<BMWLeaseDealsMontclairPage />} />
                <Route path="/mercedes-benz-lease-deals-montclair" element={<MercedesBenzLeaseDealsMontclairPage />} />
                <Route path="/audi-lease-deals-montclair" element={<AudiLeaseDealsMontclairPage />} />
                <Route path="/porsche-lease-deals-montclair" element={<PorscheLeaseDealsMontclairPage />} />
                <Route path="/lexus-lease-deals-montclair" element={<LexusLeaseDealsMontclairPage />} />
                <Route path="/land-rover-lease-deals-montclair" element={<LandRoverLeaseDealsMontclairPage />} />
                <Route path="/jeep-lease-deals-montclair" element={<JeepLeaseDealsMontclairPage />} />
                <Route path="/honda-lease-deals-montclair" element={<HondaLeaseDealsMontclairPage />} />
                <Route path="/toyota-lease-deals-montclair" element={<ToyotaLeaseDealsMontclairPage />} />
                <Route path="/ford-lease-deals-montclair" element={<FordLeaseDealsMontclairPage />} />

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
                <Route path="/audi-lease-specials-paramus" element={<Navigate replace to="/audi-lease-deals-paramus" />} />
                <Route path="/mercedes-benz-leasing-edgewater" element={<Navigate replace to="/mercedes-benz-lease-deals-edgewater" />} />
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
