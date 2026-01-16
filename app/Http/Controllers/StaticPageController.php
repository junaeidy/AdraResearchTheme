<?php

namespace App\Http\Controllers;

use App\Rules\SafeString;
use App\Rules\SecureEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaticPageController extends Controller
{
    /**
     * Display the About Us page.
     */
    public function aboutUs(): Response
    {
        return Inertia::render('Static/AboutUs');
    }

    /**
     * Display the Contact page.
     */
    public function contact(): Response
    {
        return Inertia::render('Static/Contact');
    }

    /**
     * Handle contact form submission.
     */
    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', new SafeString()],
            'email' => ['required', new SecureEmail()],
            'subject' => ['required', 'string', 'max:255', new SafeString()],
            'message' => ['required', 'string', 'max:5000', new SafeString(true)],
        ]);

        // TODO: Implement email sending or save to database
        // For now, we'll just return success
        // You can integrate this with Laravel's mail system later

        return redirect()->back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }

    /**
     * Display the Privacy Policy page.
     */
    public function privacyPolicy(): Response
    {
        return Inertia::render('Static/PrivacyPolicy');
    }

    /**
     * Display the Terms of Service page.
     */
    public function termsOfService(): Response
    {
        return Inertia::render('Static/TermsOfService');
    }

    /**
     * Display the Cookie Policy page.
     */
    public function cookiePolicy(): Response
    {
        return Inertia::render('Static/CookiePolicy');
    }

    /**
     * Display the FAQ page.
     */
    public function faq(): Response
    {
        return Inertia::render('Static/FAQ');
    }
}
