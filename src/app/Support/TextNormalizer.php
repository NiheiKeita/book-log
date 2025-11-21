<?php

namespace App\Support;

class TextNormalizer
{
    public static function normalize(?string $value): string
    {
        if ($value === null) {
            return '';
        }

        $normalized = trim($value);
        if ($normalized === '') {
            return '';
        }

        $normalized = mb_convert_kana($normalized, 'asKV', 'UTF-8');
        return mb_strtolower($normalized, 'UTF-8');
    }
}
