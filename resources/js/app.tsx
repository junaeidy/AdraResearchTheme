import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Toaster } from 'react-hot-toast';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        // Try to get from Inertia props first, fallback to env
        const recaptchaSiteKey = (props.initialPage.props.recaptcha?.siteKey as string) || 
                                 import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
        
        const AppWithProvider = () => (
            <GoogleReCaptchaProvider
                reCaptchaKey={recaptchaSiteKey}
                scriptProps={{
                    async: true,
                    defer: true,
                    appendTo: 'head',
                }}
            >
                <App {...props} />
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#FFFFFF',
                            color: '#333333',
                        },
                        success: {
                            duration: 3000,
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            duration: 4000,
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </GoogleReCaptchaProvider>
        );

        if (import.meta.env.SSR) {
            hydrateRoot(el, <AppWithProvider />);
            return;
        }

        createRoot(el).render(<AppWithProvider />);
    },
    progress: {
        color: '#3949AB',
        showSpinner: true,
    },
});
