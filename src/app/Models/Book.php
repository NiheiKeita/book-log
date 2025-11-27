<?php

namespace App\Models;

use App\Support\TextNormalizer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    /** @phpstan-use \Illuminate\Database\Eloquent\Factories\HasFactory<\Database\Factories\BookFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'isbn13',
        'title',
        'title_normalized',
        'author',
        'author_normalized',
        'publisher',
        'published_year',
        'image_url',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::saving(function (Book $book): void {
            $book->title_normalized = TextNormalizer::normalize($book->title);
            $book->author_normalized = TextNormalizer::normalize($book->author);
        });
    }

    /**
     * @return HasMany<UserBook, static>
     */
    public function userBooks(): HasMany
    {
        /** @var HasMany<UserBook, static> $relation */
        $relation = $this->hasMany(UserBook::class);

        return $relation;
    }

    /**
     * @return BelongsToMany<User, static>
     */
    public function users(): BelongsToMany
    {
        /** @var BelongsToMany<User, static> $relation */
        $relation = $this->belongsToMany(User::class, 'user_books')->withPivot('is_public')->withTimestamps();

        return $relation;
    }
}
