<?php

namespace App\Http\Controllers\Books;

use App\Http\Controllers\Controller;
use App\Models\UserBook;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserBookVisibilityController extends Controller
{
    public function update(Request $request, UserBook $userBook): JsonResponse
    {
        $this->authorizeOwnership($request, $userBook);

        $validated = $request->validate([
            'is_public' => ['required', 'boolean'],
        ]);

        $userBook->update([
            'is_public' => $validated['is_public'],
        ]);

        return response()->json([
            'id' => $userBook->id,
            'is_public' => $userBook->is_public,
        ]);
    }

    private function authorizeOwnership(Request $request, UserBook $userBook): void
    {
        if ($request->user()->id !== $userBook->user_id) {
            abort(403, 'この本を編集する権限がありません。');
        }
    }
}
