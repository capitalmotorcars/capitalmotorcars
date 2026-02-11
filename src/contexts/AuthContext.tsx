import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, login as authLogin, logout as authLogout } from '@/services/authService';
import type { AdminUser } from '@/types/deals';

interface AuthContextType {
    user: AdminUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        checkUser();
    }, []);

    async function checkUser() {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error('Error checking auth:', error);
        } finally {
            setLoading(false);
        }
    }

    async function login(email: string, password: string) {
        const result = await authLogin({ email, password });

        if (result.success && result.user) {
            setUser(result.user);
            return { success: true };
        }

        return { success: false, error: result.error };
    }

    async function logout() {
        await authLogout();
        setUser(null);
    }

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
