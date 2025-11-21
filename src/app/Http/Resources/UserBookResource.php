<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\UserBook */
class UserBookResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'is_public' => $this->is_public,
            'book' => (new BookResource($this->book))->toArray($request),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
