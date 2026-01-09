import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    organization?: string;
    country?: string;
    phone?: string;
    role: 'admin' | 'customer';
}

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    parent_id?: number;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    product_type: 'plugin' | 'theme';
    category_id: number;
    category?: ProductCategory;
    license_scope: 'installation' | 'journal';
    description: string;
    short_description?: string;
    features?: string[];
    version: string;
    compatibility?: string;
    price: number;
    sale_price?: number | null;
    is_active: boolean;
    is_featured: boolean;
    image?: string;
    download_url?: string;
    demo_url?: string;
    screenshots?: string[];
    documentation_url?: string;
    changelog?: any;
    average_rating: number;
    review_count: number;
    created_at: string;
    updated_at: string;
}

export interface License {
    id: number;
    license_key: string;
    product_id: number;
    product?: Product;
    user_id: number;
    order_id?: number;
    type: 'single-site' | 'single-journal' | 'multi-site' | 'multi-journal' | 'unlimited';
    duration: '1-year' | '2-years' | 'lifetime';
    scope: 'installation' | 'journal';
    max_activations: number;
    activated_count: number;
    status: 'pending' | 'active' | 'expired' | 'suspended';
    activated_at?: string;
    expires_at?: string;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    user_id: number;
    user?: User;
    order_number: string;
    subtotal: number;
    tax: number;
    discount: number;
    total_amount: number;
    status: 'pending' | 'awaiting_verification' | 'processing' | 'completed' | 'cancelled' | 'payment_rejected';
    payment_status: 'unpaid' | 'pending_verification' | 'paid' | 'rejected';
    payment_method: string;
    bank_account_id?: number;
    bank_account?: BankAccount;
    payment_deadline?: string;
    notes?: string;
    admin_notes?: string;
    items?: OrderItem[];
    payment_proof?: PaymentProof;
    licenses?: License[];
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    product?: Product;
    product_name: string;
    product_version: string;
    license_type: string;
    license_duration: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface PaymentProof {
    id: number;
    order_id: number;
    bank_name: string;
    account_number: string;
    account_name: string;
    transfer_amount: number;
    transfer_date: string;
    proof_image: string;
    notes?: string;
    status: 'pending' | 'verified' | 'rejected';
    verified_by?: number;
    verified_at?: string;
    rejection_reason?: string;
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: number;
    product_id: number;
    user_id: number;
    user?: User;
    rating: number;
    comment?: string;
    is_verified_purchase: boolean;
    created_at: string;
    updated_at: string;
}

export interface BankAccount {
    id: number;
    bank_name: string;
    account_number: string;
    account_name: string;
    branch?: string;
    logo?: string;
    is_active: boolean;
    sort_order: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    recaptcha?: {
        siteKey: string;
    };
    flash?: {
        success?: string;
        error?: string;
        info?: string;
    };
    ziggy: Config & { location: string };
};
