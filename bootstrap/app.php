<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\CheckMaintenance::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\SecurityHeaders::class,
        ]);

        $middleware->alias([
            'recaptcha' => \App\Http\Middleware\VerifyRecaptcha::class,
            'throttle.inertia' => \App\Http\Middleware\ThrottleRequestsWithInertia::class,
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
            'cart.not.empty' => \App\Http\Middleware\EnsureCartNotEmpty::class,
            'billing.info' => \App\Http\Middleware\EnsureBillingInfo::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function ($response, $exception, $request) {
            if (in_array($response->getStatusCode(), [403, 404, 419, 500, 503])) {
                $status = $response->getStatusCode();
                
                $errorPages = [
                    403 => 'Errors/403',
                    404 => 'Errors/404',
                    419 => 'Errors/419',
                    500 => 'Errors/500',
                    503 => 'Errors/503',
                ];

                return inertia($errorPages[$status])
                    ->toResponse($request)
                    ->setStatusCode($status);
            }

            return $response;
        });
    })->create();
