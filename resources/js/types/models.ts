export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
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
    short_description: string;
    features: string[];
    version: string;
    compatibility: string;
    price: number;
    sale_price: number | null;
    is_active: boolean;
    is_featured: boolean;
    image: string;
    screenshots: string[];
    demo_url?: string;
    documentation_url?: string;
    changelog: ChangelogEntry[];
    average_rating: number;
    review_count: number;
    rating_average: number;
    rating_count: number;
    reviews?: Review[];
    created_at: string;
    updated_at: string;
}

export interface ChangelogEntry {
    version: string;
    date: string;
    changes: string[];
}

export interface Review {
    id: number;
    product_id: number;
    user_id: number;
    user?: User;
    rating: number;
    comment: string;
    is_verified_purchase: boolean;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'customer';
    avatar?: string;
    phone?: string;
    organization?: string;
    country?: string;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    id: number;
    product_id: number;
    product: Product;
    license_type: LicenseType;
    license_duration: LicenseDuration;
    price: number;
    quantity: number;
    total: number;
    created_at: string;
    updated_at: string;
}

export type LicenseType = 
    | 'single-site' 
    | 'single-journal' 
    | 'multi-site' 
    | 'multi-journal' 
    | 'unlimited';

export type LicenseDuration = 
    | '1-year' 
    | '2-years' 
    | 'lifetime';

export interface LicenseTypeOption {
    value: LicenseType;
    label: string;
    description: string;
    max_activations: number | null;
}

export interface LicenseDurationOption {
    value: LicenseDuration;
    label: string;
    multiplier: number;
    savings?: string;
}

export interface Order {
    id: number;
    user_id: number;
    order_number: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
    payment_method: string;
    payment_status: 'pending' | 'paid' | 'failed';
    subtotal: number;
    tax: number;
    total: number;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    product_name: string;
    product_version: string;
    license_type: LicenseType;
    license_duration: LicenseDuration;
    price: number;
    quantity: number;
    subtotal: number;
    created_at: string;
    updated_at: string;
}
