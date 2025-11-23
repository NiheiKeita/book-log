<?php

namespace App\Services;

use App\Models\User;
use App\Support\TextNormalizer;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserBookSearchService
{
    /**
     * @return LengthAwarePaginator<int, UserBook>
     */
    public function search(User $user, ?string $keyword = null, int $perPage = 20): LengthAwarePaginator
    {
        $query = $user->userBooks()->with('book')->orderByDesc('created_at');
        $normalized = TextNormalizer::normalize($keyword);
        $isbnDigits = $keyword ? preg_replace('/[^0-9]/', '', $keyword) : '';

        if ($normalized !== '' || ($isbnDigits && strlen($isbnDigits) >= 4)) {
            $like = $normalized !== '' ? sprintf('%%%s%%', $normalized) : null;
            $isbnLike = $isbnDigits && strlen($isbnDigits) >= 4 ? sprintf('%%%s%%', $isbnDigits) : null;

            $query->whereHas('book', function ($bookQuery) use ($like, $isbnLike) {
                $bookQuery->where(function ($inner) use ($like, $isbnLike) {
                    $applied = false;
                    if ($like) {
                        $inner->where('title_normalized', 'like', $like)
                            ->orWhere('author_normalized', 'like', $like);
                        $applied = true;
                    }
                    if ($isbnLike) {
                        if ($applied) {
                            $inner->orWhere('isbn13', 'like', $isbnLike);
                        } else {
                            $inner->where('isbn13', 'like', $isbnLike);
                        }
                    }
                });
            });
        }

        return $query->paginate($perPage)->withQueryString();
    }
}
