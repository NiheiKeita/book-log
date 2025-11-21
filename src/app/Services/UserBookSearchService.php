<?php

namespace App\Services;

use App\Models\User;
use App\Support\TextNormalizer;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserBookSearchService
{
    public function search(User $user, ?string $keyword = null, int $perPage = 20): LengthAwarePaginator
    {
        $query = $user->userBooks()->with('book')->orderByDesc('created_at');
        $normalized = TextNormalizer::normalize($keyword);
        if ($normalized !== '') {
            $like = sprintf('%%%s%%', $normalized);
            $query->whereHas('book', function ($bookQuery) use ($like) {
                $bookQuery
                    ->where('title_normalized', 'like', $like)
                    ->orWhere('author_normalized', 'like', $like)
                    ->orWhere('isbn13', 'like', $like);
            });
        }

        return $query->paginate($perPage)->withQueryString();
    }
}
