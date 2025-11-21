<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserBook;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserBookVisibilityTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_toggle_visibility_of_their_book(): void
    {
        $userBook = UserBook::factory()->create(['is_public' => false]);

        $this->actingAs($userBook->user);
        $response = $this->patchJson(route('user-books.visibility', $userBook), [
            'is_public' => true,
        ]);

        $response->assertOk()->assertJson([
            'id' => $userBook->id,
            'is_public' => true,
        ]);

        $this->assertDatabaseHas('user_books', [
            'id' => $userBook->id,
            'is_public' => true,
        ]);
    }

    /** @test */
    public function it_prevents_other_users_from_updating_visibility(): void
    {
        $userBook = UserBook::factory()->create();
        $other = User::factory()->create();

        $this->actingAs($other);
        $response = $this->patchJson(route('user-books.visibility', $userBook), [
            'is_public' => false,
        ]);

        $response->assertForbidden();
    }
}
