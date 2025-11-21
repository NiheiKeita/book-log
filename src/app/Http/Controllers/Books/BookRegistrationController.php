<?php

namespace App\Http\Controllers\Books;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\UserBook;
use App\Services\BookLookupService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BookRegistrationController extends Controller
{
    public function __construct(private readonly BookLookupService $bookLookupService)
    {
    }

    public function create(Request $request): Response
    {
        return Inertia::render('books/register', [
            'prefillIsbn' => $request->input('isbn13'),
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'isbn13' => ['required', 'string'],
        ]);

        try {
            $book = $this->bookLookupService->findOrCreate($validated['isbn13']);
        } catch (\RuntimeException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 404);
        }

        return response()->json([
            'book' => new BookResource($book),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'book_id' => ['required', 'exists:books,id'],
        ]);

        $user = Auth::user();
        $userBook = UserBook::firstOrCreate(
            [
                'user_id' => $user->id,
                'book_id' => $validated['book_id'],
            ],
            ['is_public' => false],
        );
        $userBook->load('book');

        $status = $userBook->wasRecentlyCreated ? 201 : 200;

        return response()->json([
            'message' => $userBook->wasRecentlyCreated ? '登録しました。' : 'この本はすでに登録済みです。',
            'userBookId' => $userBook->id,
            'book' => new BookResource($userBook->book),
            'is_public' => $userBook->is_public,
        ], $status);
    }
}
