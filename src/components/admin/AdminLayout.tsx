import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { JsonLd, createBreadcrumbItemsFromPath, createBreadcrumbSchema } from '@/components/JsonLd';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { LogOut, LayoutDashboard, Settings, User, Car, FileText } from 'lucide-react';


interface AdminLayoutProps {
    children?: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    async function handleLogout() {
        await logout();
        navigate('/admin/login');
    }

    const navItems = [
        { path: '/admin/deals', label: 'Deals', icon: LayoutDashboard },
        { path: '/admin/vehicles', label: 'Vehicles', icon: Car },
        { path: '/admin/blogs', label: 'Blog', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-black text-foreground overflow-x-hidden relative">
            <JsonLd data={createBreadcrumbSchema(createBreadcrumbItemsFromPath(location.pathname))} />
            {/* Ambient Background - Matching Site Theme */}
            <div
                className="absolute inset-0 
                bg-[radial-gradient(circle_at_30%_40%,hsl(214_77%_55%_/_0.08),transparent_60%)]
                dark:bg-[radial-gradient(circle_at_30%_40%,hsl(214_77%_55%_/_0.12),transparent_60%)] pointer-events-none fixed"
                aria-hidden
            />
            <div
                className="absolute inset-0 
                bg-[radial-gradient(ellipse_90%_60%_at_75%_80%,hsl(220_65%_60%_/_0.08),transparent_60%)]
                dark:bg-[radial-gradient(ellipse_90%_60%_at_75%_80%,hsl(220_65%_60%_/_0.12),transparent_60%)] pointer-events-none fixed"
                aria-hidden
            />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo/Title */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]">
                                <span className="font-black text-white text-lg tracking-tighter">CM</span>
                            </div>
                            <div>
                                <h1 className="hidden md:block text-lg font-black text-white tracking-tight uppercase">Command Center</h1>
                                <p className="hidden md:block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Capital Motor Cars</p>
                            </div>
                        </motion.div>

                        {/* Navigation (Desktop) */}
                        <nav className="flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname.startsWith(item.path);
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => navigate(item.path)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200",
                                            isActive
                                                ? "bg-white/10 text-white shadow-inner"
                                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <item.icon className={cn("w-4 h-4", isActive ? "text-accent" : "opacity-70")} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* User Info & Logout */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-white uppercase tracking-wider">Admin</p>
                                <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">{user?.email}</p>
                            </div>
                            <Button
                                onClick={handleLogout}
                                variant="ghost"
                                size="icon"
                                className="hover:bg-red-500/10 hover:text-red-400 transition-colors rounded-xl"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children || <Outlet />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
