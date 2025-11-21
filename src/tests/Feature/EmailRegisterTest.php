<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmailRegisterTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_register_with_email_and_password(): void
    {
        $response = $this->post('/register', [
            'name' => 'New User',
            'email' => 'new@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertRedirect(route('me.books'));
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'new@example.com',
            'name' => 'New User',
        ]);
    }

    /** @test */
    public function registration_requires_unique_email(): void
    {
        User::factory()->create(['email' => 'duplicate@example.com']);

        $response = $this->from('/register')->post('/register', [
            'name' => 'New User',
            'email' => 'duplicate@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertRedirect('/register');
        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }
}
