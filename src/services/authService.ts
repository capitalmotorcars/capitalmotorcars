import { supabase } from '@/lib/supabase';
import type { AdminUser } from '@/types/deals';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user?: AdminUser;
    error?: string;
    success: boolean;
}

/**
 * Login with email and password
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        });

        if (error) {
            return { success: false, error: error.message };
        }

        if (!data.user) {
            return { success: false, error: 'Login failed' };
        }

        // Update last login timestamp
        await supabase
            .from('admin_users')
            .update({ last_login: new Date().toISOString() })
            .eq('email', credentials.email);

        return {
            success: true,
            user: {
                id: data.user.id,
                email: data.user.email!,
                created_at: data.user.created_at,
            },
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Login failed',
        };
    }
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
    await supabase.auth.signOut();
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return null;

        return {
            id: user.id,
            email: user.email!,
            created_at: user.created_at,
        };
    } catch {
        return null;
    }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
}

/**
 * Refresh the current session
 */
export async function refreshSession(): Promise<boolean> {
    try {
        const { data, error } = await supabase.auth.refreshSession();
        return !error && !!data.session;
    } catch {
        return false;
    }
}
