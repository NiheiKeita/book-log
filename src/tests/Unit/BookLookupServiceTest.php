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

    /** @test */
    public function it_falls_back_to_google_when_openbd_has_no_cover(): void
    {
        Http::fake([
            'https://api.openbd.jp/*' => Http::response([
                [
                    'summary' => [
                        'title' => 'サンプル本',
                        'author' => '山田 太郎',
                        'publisher' => '技術評論社',
                        'pubdate' => '20220101',
                        'cover' => null,
                    ],
                ],
            ], 200),
            'https://www.googleapis.com/*' => Http::response([
                'totalItems' => 1,
                'items' => [
                    [
                        'volumeInfo' => [
                            'imageLinks' => [
                                'thumbnail' => 'https://example.com/cover.jpg',
                            ],
                        ],
                    ],
                ],
            ], 200),
        ]);

        /** @var BookLookupService $service */
        $service = $this->app->make(BookLookupService::class);
        $book = $service->findOrCreate('9781234567891');

        $this->assertSame('https://example.com/cover.jpg', $book->image_url);
    }

    /** @test */
    public function it_uses_google_content_endpoint_when_image_links_absent(): void
    {
        Http::fake([
            'https://api.openbd.jp/*' => Http::response(null, 404),
            'https://www.googleapis.com/*' => Http::response([
                'totalItems' => 1,
                'items' => [
                    [
                        'id' => 'exampleVolume',
                        'volumeInfo' => [
                            'title' => 'Volume Title',
                            'authors' => ['Author'],
                        ],
                    ],
                ],
            ], 200),
        ]);

        /** @var BookLookupService $service */
        $service = $this->app->make(BookLookupService::class);
        $book = $service->findOrCreate('9781234567892');

        $this->assertSame(
            'https://books.google.com/books/content?id=exampleVolume&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            $book->image_url,
        );
    }
}
