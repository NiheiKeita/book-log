import { describe, expect, it } from 'vitest'
import type { UserBook } from '~/types/books'
import { countPublicBooks } from './hooks'

describe('countPublicBooks', () => {
    it('counts the number of public books', () => {
        const books: UserBook[] = [
            { id: 1, is_public: true, book: { id: 1, isbn13: '978', title: 'A' } },
            { id: 2, is_public: false, book: { id: 2, isbn13: '979', title: 'B' } },
            { id: 3, is_public: true, book: { id: 3, isbn13: '980', title: 'C' } },
        ]

        expect(countPublicBooks(books)).toBe(2)
    })
})
