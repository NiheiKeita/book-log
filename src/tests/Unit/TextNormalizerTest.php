<?php

namespace Tests\Unit;

use App\Support\TextNormalizer;
use PHPUnit\Framework\TestCase;

class TextNormalizerTest extends TestCase
{
    /** @test */
    public function it_converts_full_width_and_uppercase_characters(): void
    {
        $this->assertSame('isbn1234', TextNormalizer::normalize(' ISBN１２３４ '));
    }

    /** @test */
    public function it_returns_empty_string_for_null_or_blank(): void
    {
        $this->assertSame('', TextNormalizer::normalize(null));
        $this->assertSame('', TextNormalizer::normalize('   '));
    }
}
