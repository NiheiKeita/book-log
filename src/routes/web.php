<?php

use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Books\BookRegistrationController;
use App\Http\Controllers\Books\MyBooksController;
use App\Http\Controllers\Books\PublicBooksController;
use App\Http\Controllers\Books\UserBookVisibilityController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingController::class)->name('top');

Route::get('/auth/google', [GoogleAuthController::class, 'redirect'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');
Route::post('/logout', [GoogleAuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/books/register', [BookRegistrationController::class, 'create'])->name('books.register');
    Route::post('/books/search', [BookRegistrationController::class, 'search'])->name('books.search');
    Route::post('/user-books', [BookRegistrationController::class, 'store'])->name('user-books.store');

    Route::get('/me/books', [MyBooksController::class, 'index'])->name('me.books');
    Route::patch('/user-books/{userBook}/visibility', [UserBookVisibilityController::class, 'update'])->name('user-books.visibility');
});

Route::get('/u/{user}', [PublicBooksController::class, 'show'])->name('public.books');
