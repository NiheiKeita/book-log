<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('TopView', [
            'googleLoginUrl' => route('auth.google'),
            'emailLoginUrl' => route('login'),
            'registerUrl' => route('register'),
        ]);
    }
}
