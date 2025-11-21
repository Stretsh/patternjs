import { Pattern } from '../src/core/Pattern.js'

describe('repeat(n)', () => {
  test('repeat applies quantifier', () => {
    const p = new Pattern().literal('ha').repeat(3)
    expect(p.test('hahaha')).toBe(true)
    expect(p.test('haha')).toBe(false)
  })
})
