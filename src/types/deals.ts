export interface LeaseDeal {
    id: string;
    make: string;
    model: string;
    year: number;
    trim?: string;
    monthly_price: number;
    down_payment: number;
    lease_term: number; // in months
    highlights?: string;
    image_url?: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DealFormData {
    make: string;
    model: string;
    year: number;
    trim?: string;
    monthly_price: number;
    down_payment: number;
    lease_term: number;
    highlights?: string;
    image_url?: string;
    is_active?: boolean;
}

export interface AdminUser {
    id: string;
    email: string;
    name?: string;
    created_at: string;
    last_login?: string;
}

export interface DealAuditLog {
    id: string;
    deal_id?: string;
    action: 'created' | 'updated' | 'deleted' | 'reordered';
    admin_id?: string;
    changes?: Record<string, any>;
    created_at: string;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    success: boolean;
}
