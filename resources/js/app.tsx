import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

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
            </GoogleReCaptchaProvider>
        );

        if (import.meta.env.SSR) {
            hydrateRoot(el, <AppWithProvider />);
            return;
        }

        createRoot(el).render(<AppWithProvider />);
    },
    progress: {
        color: '#4B5563',
    },
});
