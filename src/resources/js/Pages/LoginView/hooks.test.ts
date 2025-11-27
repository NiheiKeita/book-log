import { describe, expect, it } from 'vitest'
import { canSubmit } from './hooks'

describe('canSubmit', () => {
    it('requires email and password of at least 8 chars', () => {
        expect(canSubmit('user@example.com', 'password')).toBe(true)
        expect(canSubmit('', 'password')).toBe(false)
        expect(canSubmit('user@example.com', 'short')).toBe(false)
    })
})
