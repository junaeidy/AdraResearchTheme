import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useCallback } from 'react';

export function useRecaptcha() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    
    const getToken = useCallback(async (action: string): Promise<string> => {
        if (!executeRecaptcha) {
            throw new Error('reCAPTCHA not initialized. Please refresh the page.');
        }
        
        try {
            const token = await executeRecaptcha(action);
            
            if (!token) {
                throw new Error('Failed to generate reCAPTCHA token');
            }
            return token;
        } catch (error) {
            throw new Error('reCAPTCHA verification failed. Please refresh the page and try again.');
        }
    }, [executeRecaptcha]);
    
    return { getToken };
}
