<?php

namespace Tests\Unit;

use App\Services\BookLookupService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class BookLookupServiceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_book_record_from_openbd_response(): void
    {
        Http::fake([
            'https://api.openbd.jp/*' => Http::response([
                [
                    'summary' => [
                        'title' => 'サンプル本',
                        'author' => '山田 太郎',
                        'publisher' => '技術評論社',
                        'pubdate' => '20220101',
                        'cover' => 'https://example.com/image.jpg',
                    ],
                ],
            ], 200),
            'https://www.googleapis.com/*' => Http::response([], 200),
        ]);

        /** @var BookLookupService $service */
        $service = $this->app->make(BookLookupService::class);
        $book = $service->findOrCreate('9781234567890');

        $this->assertSame('サンプル本', $book->title);
        $this->assertDatabaseHas('books', [
            'isbn13' => '9781234567890',
            'title' => 'サンプル本',
            'publisher' => '技術評論社',
            'published_year' => '2022',
        ]);
    }
}
