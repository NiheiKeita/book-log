<?php

namespace App\Http\Controllers\Books;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserBookResource;
use App\Services\UserBookSearchService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MyBooksController extends Controller
{
    public function __construct(private readonly UserBookSearchService $searchService)
    {
    }

    public function index(Request $request): Response
    {
        $user = $request->user();
        $paginator = $this->searchService->search($user, $request->query('q'));

        return Inertia::render('me/books', [
            'books' => [
                'data' => UserBookResource::collection($paginator->items())->toArray($request),
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
            'user' => [
                'name' => $user->name,
                'image_url' => $user->image_url,
                'public_page_url' => route('public.books', $user->id),
            ],
        ]);
    }
}
