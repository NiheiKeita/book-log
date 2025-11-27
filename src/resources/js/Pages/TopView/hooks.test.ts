import { describe, expect, it } from 'vitest'
import { formatHeroMessage } from './hooks'

describe('formatHeroMessage', () => {
    it('returns a message encouraging login when user is logged out', () => {
        expect(formatHeroMessage(false)).toContain('Google')
    })

    it('returns a message for signed-in users', () => {
        expect(formatHeroMessage(true)).toContain('登録済み')
    })
})
