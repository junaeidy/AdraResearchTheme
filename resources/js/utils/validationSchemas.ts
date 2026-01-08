import { z } from 'zod';

export const billingSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
    email: z.string().email('Invalid email address'),
    phone: z.string()
        .min(1, 'Phone is required')
        .max(20, 'Phone number is too long')
        .regex(/^[0-9\+\-\(\)\s]+$/, 'Invalid phone number format'),
    organization: z.string().max(255, 'Organization name is too long').optional(),
    country: z.string().min(1, 'Country is required'),
    address: z.string()
        .min(1, 'Address is required')
        .max(500, 'Address is too long'),
    city: z.string()
        .min(1, 'City is required')
        .max(100, 'City is too long'),
    postal_code: z.string()
        .max(10, 'Postal code is too long')
        .regex(/^[a-zA-Z0-9\s\-]*$/, 'Invalid postal code format')
        .optional(),
    notes: z.string().max(1000, 'Notes are too long').optional(),
});

export type BillingFormData = z.infer<typeof billingSchema>;

export const orderReviewSchema = z.object({
    terms_accepted: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
    }),
});

export type OrderReviewData = z.infer<typeof orderReviewSchema>;
