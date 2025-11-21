<?php

namespace App\Http\Controllers\Books;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserBookResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicBooksController extends Controller
{
    public function show(Request $request, User $user): Response
    {
        $userBooks = $user->userBooks()
            ->where('is_public', true)
            ->with('book')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('PublicBooksView', [
            'owner' => [
                'id' => $user->id,
                'name' => $user->name,
                'image_url' => $user->image_url,
            ],
            'books' => UserBookResource::collection($userBooks)->toArray($request),
        ]);
    }
}
