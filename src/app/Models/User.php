<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    /** @phpstan-use \Illuminate\Database\Eloquent\Factories\HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'google_sub',
        'password',
        'image_url',
        'tel',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

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
     * @return BelongsToMany<Book, static>
     */
    public function books(): BelongsToMany
    {
        /** @var BelongsToMany<Book, static> $relation */
        $relation = $this->belongsToMany(Book::class, 'user_books')->withPivot('is_public')->withTimestamps();

        return $relation;
    }
}
