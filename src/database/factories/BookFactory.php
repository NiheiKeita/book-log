<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    public function definition(): array
    {
        $isbn = '978' . fake()->numerify('##########');

        return [
            'isbn13' => $isbn,
            'title' => fake()->sentence(3),
            'author' => fake()->name(),
            'publisher' => fake()->company(),
            'published_year' => (string) fake()->numberBetween(1990, 2024),
            'image_url' => fake()->imageUrl(),
        ];
    }
}
