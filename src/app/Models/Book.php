<?php

namespace App\Models;

use App\Support\TextNormalizer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
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

    public function userBooks(): HasMany
    {
        return $this->hasMany(UserBook::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_books')->withPivot('is_public')->withTimestamps();
    }
}
