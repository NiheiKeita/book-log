<?php

namespace Tests\Unit;

use App\Models\Book;
use App\Models\User;
use App\Models\UserBook;
use App\Services\UserBookSearchService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserBookSearchServiceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_returns_books_that_match_keyword_with_normalization(): void
    {
        $user = User::factory()->create();
        $book = Book::factory()->create(['title' => 'DDDを実践する']);
        $other = Book::factory()->create(['title' => 'Clean Architecture']);

        UserBook::factory()->create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        UserBook::factory()->create([
            'user_id' => $user->id,
            'book_id' => $other->id,
        ]);

        /** @var UserBookSearchService $service */
        $service = $this->app->make(UserBookSearchService::class);
        $result = $service->search($user, 'ｄｄｄ');

        $this->assertCount(1, $result->items());
        $this->assertSame('DDDを実践する', $result->items()[0]->book->title);
    }
}
