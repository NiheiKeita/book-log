<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailLoginController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('LoginView', [
            'status' => session('status'),
            'googleLoginUrl' => route('auth.google'),
            'registerUrl' => route('register'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('me.books'));
    }
}
