<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Support\Facades\Http;
use RuntimeException;

/**
 * @phpstan-type BookMetadata array{
 *     title: ?string,
 *     author: ?string,
 *     publisher: ?string,
 *     published_year: ?string,
 *     image_url: ?string
 * }
 */

class BookLookupService
{
    public function findOrCreate(string $isbn13): Book
    {
        $normalizedIsbn = $this->normalizeIsbn($isbn13);
        $book = Book::where('isbn13', $normalizedIsbn)->first();
        if ($book) {
            return $book;
        }

        $metadata = $this->fetchMetadata($normalizedIsbn);
        if (!$metadata) {
            throw new RuntimeException('書籍情報を取得できませんでした。');
        }

        return Book::create(array_merge($metadata, ['isbn13' => $normalizedIsbn]));
    }

    /**
     * @return BookMetadata|null
     */
    private function fetchMetadata(string $isbn13): ?array
    {
        $openbd = $this->fetchFromOpenBd($isbn13);
        $google = null;

        if ($openbd) {
            if (!empty($openbd['image_url'])) {
                return $openbd;
            }
            $google = $this->fetchFromGoogleBooks($isbn13, false);
            if ($google) {
                return array_merge($openbd, array_filter($google, fn($value) => $value !== null));
            }
        }

        return $openbd ?? $this->fetchFromGoogleBooks($isbn13);
    }

    /**
     * @return BookMetadata|null
     */
    private function fetchFromOpenBd(string $isbn13): ?array
    {
        $response = Http::timeout(10)->get('https://api.openbd.jp/v1/get', [
            'isbn' => $isbn13,
        ]);

        if ($response->failed()) {
            return null;
        }

        $body = $response->json();
        $summary = $body[0]['summary'] ?? null;
        if (!$summary) {
            return null;
        }

        $title = $summary['title'] ?? null;
        $author = $summary['author'] ?? null;
        $publisher = $summary['publisher'] ?? null;
        $published = $summary['pubdate'] ?? null;

        return $this->buildPayload(
            $title,
            $author,
            $publisher,
            $published ? substr($published, 0, 4) : null,
            $summary['cover'] ?? null,
        );
    }

    /**
     * @return BookMetadata|null
     */
    private function fetchFromGoogleBooks(string $isbn13, bool $requireTitle = true): ?array
    {
        $response = Http::timeout(10)->get('https://www.googleapis.com/books/v1/volumes', [
            'q' => sprintf('isbn:%s', $isbn13),
        ]);

        if ($response->failed()) {
            return null;
        }

        $body = $response->json();
        if (($body['totalItems'] ?? 0) < 1) {
            return null;
        }

        $volume = $body['items'][0] ?? null;
        $volumeInfo = $volume['volumeInfo'] ?? null;
        if (!$volumeInfo) {
            return null;
        }

        $authors = $volumeInfo['authors'] ?? [];

        return $this->buildPayload(
            $volumeInfo['title'] ?? null,
            $authors ? implode(', ', $authors) : null,
            $volumeInfo['publisher'] ?? null,
            $this->extractYear($volumeInfo['publishedDate'] ?? null),
            $this->resolveGoogleImageUrl($volume),
            $requireTitle,
        );
    }

    private function extractYear(?string $value): ?string
    {
        if (!$value) {
            return null;
        }

        $matches = [];
        if (preg_match('/(\\d{4})/', $value, $matches)) {
            return $matches[1];
        }

        return null;
    }

    /**
     * @return BookMetadata|null
     */
    private function buildPayload(
        ?string $title,
        ?string $author,
        ?string $publisher,
        ?string $publishedYear,
        ?string $imageUrl,
        bool $requireTitle = true
    ): ?array {
        $safeTitle = $title ? trim($title) : null;
        if ($requireTitle && !$safeTitle) {
            return null;
        }

        return [
            'title' => $safeTitle,
            'author' => $author,
            'publisher' => $publisher,
            'published_year' => $publishedYear,
            'image_url' => $imageUrl,
        ];
    }

    private function normalizeIsbn(string $isbn13): string
    {
        $digits = preg_replace('/[^0-9]/', '', $isbn13);
        if (!$digits || strlen($digits) !== 13) {
            throw new RuntimeException('ISBN13 を正しく入力してください。');
        }

        return $digits;
    }

    /**
     * @param array<string, mixed>|null $volume
     */
    private function resolveGoogleImageUrl(?array $volume): ?string
    {
        if (!$volume) {
            return null;
        }

        $imageLinks = $volume['volumeInfo']['imageLinks'] ?? [];
        $imageUrl = $imageLinks['thumbnail'] ?? ($imageLinks['smallThumbnail'] ?? null);
        if ($imageUrl) {
            return $imageUrl;
        }

        $volumeId = $volume['id'] ?? null;
        if ($volumeId) {
            return sprintf(
                'https://books.google.com/books/content?id=%s&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                urlencode($volumeId),
            );
        }

        return null;
    }
}
