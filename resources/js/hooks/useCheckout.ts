import { useForm } from '@inertiajs/react';
import { BillingFormData, OrderReviewData } from '@/utils/validationSchemas';

export function useCheckout() {
    const submitBilling = (data: BillingFormData) => {
        const form = useForm(data);
        
        form.post(route('checkout.billing.store'), {
            onSuccess: () => {
                // Will redirect to review page
            },
            onError: (errors) => {
                console.error('Billing submission failed:', errors);
            },
        });
        
        return form;
    };
    
    const placeOrder = (data: OrderReviewData) => {
        const form = useForm(data);
        
        form.post(route('checkout.order.store'), {
            onSuccess: () => {
                // Will redirect to payment page
            },
            onError: (errors) => {
                console.error('Order creation failed:', errors);
            },
        });
        
        return form;
    };
    
    return { submitBilling, placeOrder };
}
