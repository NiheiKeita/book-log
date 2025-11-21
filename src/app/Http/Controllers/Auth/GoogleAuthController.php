<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
        } catch (Exception $exception) {
            report($exception);
            return redirect()->route('top')->with('authError', 'Googleログインに失敗しました。時間をおいて再度お試しください。');
        }

        $user = User::updateOrCreate(
            ['google_sub' => $googleUser->getId()],
            [
                'name' => $googleUser->getName() ?: $googleUser->getNickname() ?: 'No name',
                'email' => $googleUser->getEmail() ?? sprintf('%s@example.com', $googleUser->getId()),
                'image_url' => $googleUser->getAvatar(),
                'password' => Hash::make(Str::random(32)),
                'email_verified_at' => now(),
            ],
        );

        Auth::login($user, true);

        return redirect()->route('me.books');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('top');
    }
}
