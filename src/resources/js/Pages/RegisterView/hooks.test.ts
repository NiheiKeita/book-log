import { describe, expect, it } from 'vitest'
import { canSubmit } from './hooks'

describe('canSubmit', () => {
    it('validates name, email, password, and confirmation', () => {
        expect(canSubmit('user', 'user@example.com', 'password123', 'password123')).toBe(true)
        expect(canSubmit('', 'user@example.com', 'password123', 'password123')).toBe(false)
        expect(canSubmit('user', '', 'password123', 'password123')).toBe(false)
        expect(canSubmit('user', 'user@example.com', 'short', 'short')).toBe(false)
        expect(canSubmit('user', 'user@example.com', 'password123', 'mismatch')).toBe(false)
    })
})
