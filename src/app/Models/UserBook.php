<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserBook extends Model
{
    /** @phpstan-use \Illuminate\Database\Eloquent\Factories\HasFactory<\Database\Factories\UserBookFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'book_id',
        'is_public',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'is_public' => 'boolean',
    ];

    /**
     * @return BelongsTo<User, static>
     */
    public function user(): BelongsTo
    {
        /** @var BelongsTo<User, static> $relation */
        $relation = $this->belongsTo(User::class);

        return $relation;
    }

    /**
     * @return BelongsTo<Book, static>
     */
    public function book(): BelongsTo
    {
        /** @var BelongsTo<Book, static> $relation */
        $relation = $this->belongsTo(Book::class);

        return $relation;
    }
}
