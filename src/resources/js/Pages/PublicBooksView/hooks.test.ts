import { describe, expect, it } from 'vitest'
import { summarizeBooks } from './hooks'

describe('summarizeBooks', () => {
    it('handles zero books', () => {
        expect(summarizeBooks(0)).toBe('公開中の本はまだありません')
    })

    it('handles plural', () => {
        expect(summarizeBooks(3)).toContain('3冊')
    })
})
