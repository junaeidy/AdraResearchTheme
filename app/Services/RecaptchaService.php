<?php

namespace App\Services;

use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestMethod;
use ReCaptcha\RequestParameters;
use Illuminate\Support\Facades\Http;

class CurlRequestMethod implements RequestMethod
{
    /**
     * Submit the request with the specified parameters.
     *
     * @param RequestParameters $params Request parameters
     * @return string Body of the reCAPTCHA response
     */
    public function submit(RequestParameters $params)
    {
        $response = Http::asForm()->post(
            'https://www.google.com/recaptcha/api/siteverify',
            $params->toArray()
        );
        
        return $response->body();
    }
}

class RecaptchaService
{
    private $recaptcha;
    
    public function __construct()
    {
        $this->recaptcha = new ReCaptcha(
            config('services.recaptcha.secret_key'),
            new CurlRequestMethod()
        );
    }
    
    public function verify(string $token, string $action, float $minimumScore = 0.5): bool
    {
        if (!config('services.recaptcha.enabled')) {
            return true; // Skip in development
        }
        
        $resp = $this->recaptcha->setExpectedAction($action)
            ->setScoreThreshold($minimumScore)
            ->verify($token, request()->ip());
        
        return $resp->isSuccess();
    }
}
