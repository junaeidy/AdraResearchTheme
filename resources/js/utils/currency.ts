/**
 * Format number to Indonesian Rupiah currency
 */
export function formatRupiah(amount: number | undefined | null): string {
    const value = amount && !isNaN(amount) ? amount : 0;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

/**
 * Format number to Indonesian number format without currency symbol
 */
export function formatNumber(amount: number | undefined | null): string {
    const value = amount && !isNaN(amount) ? amount : 0;
    return new Intl.NumberFormat('id-ID').format(value);
}

/**
 * Alias for formatRupiah (for compatibility)
 */
export const formatCurrency = formatRupiah;
