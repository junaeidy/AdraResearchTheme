<?php

namespace App\Services;

use ReCaptcha\ReCaptcha;

class RecaptchaService
{
    private $recaptcha;
    
    public function __construct()
    {
        $this->recaptcha = new ReCaptcha(config('services.recaptcha.secret_key'));
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
