<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class EmailLoginTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'google_sub' => null,
        ]);

        $response = $this->post('/login', [
            'email' => 'user@example.com',
            'password' => 'password',
        ]);

        $response->assertRedirect(route('me.books'));
        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function login_fails_with_wrong_password(): void
    {
        User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'google_sub' => null,
        ]);

        $response = $this->from('/login')->post('/login', [
            'email' => 'user@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }
}
