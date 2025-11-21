<?php

namespace App\Http\Controllers\Books;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Http\Resources\UserBookResource;
use App\Models\Book;
use App\Services\UserBookSearchService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MyBooksController extends Controller
{
    public function __construct(private readonly UserBookSearchService $searchService) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $paginator = $this->searchService->search($user, $request->query('q'));
        $keywordDigits = preg_replace('/[^0-9]/', '', (string) $request->query('q', ''));
        $candidateBooks = [];
        if ($keywordDigits && strlen($keywordDigits) >= 4) {
            $candidateBooks = Book::where('isbn13', 'like', sprintf('%%%s%%', $keywordDigits))
                ->orderByDesc('created_at')
                ->limit(5)
                ->get();
        }

        return Inertia::render('MyBooksView', [
            'books' => [
                'data' => UserBookResource::collection($paginator->items())->resolve(),
                'meta' => [
                    'current_page' => $paginator->currentPage(),
                    'last_page' => $paginator->lastPage(),
                    'per_page' => $paginator->perPage(),
                    'total' => $paginator->total(),
                ],
            ],
            'filters' => [
                'q' => $request->query('q', ''),
            ],
            'candidates' => BookResource::collection($candidateBooks)->resolve(),
            'user' => [
                'name' => $user->name,
                'image_url' => $user->image_url,
                'public_page_url' => route('public.books', $user->id),
            ],
        ]);
    }
}
