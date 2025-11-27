import { describe, expect, it } from 'vitest'
import { isIsbnComplete, sanitizeIsbn } from './hooks'

describe('sanitizeIsbn', () => {
    it('removes non numeric characters and trims to 13 digits', () => {
        expect(sanitizeIsbn('978-1234-5678-901')).toBe('9781234567890')
    })
})

describe('isIsbnComplete', () => {
    it('returns true when the string contains 13 digits', () => {
        expect(isIsbnComplete('9781234567890')).toBe(true)
        expect(isIsbnComplete('978123')).toBe(false)
    })
})
