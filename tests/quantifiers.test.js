import { Pattern } from '../src/core/Pattern.js'

describe('Quantifiers', () => {
  test('optional() makes token optional', () => {
    const p = new Pattern().literal('cat').optional()
    expect(p.test('cat')).toBe(true)
    expect(p.test('')).toBe(true)
  })

  test('oneOrMore() repeats token one or more times', () => {
    const p = new Pattern().digit().oneOrMore()
    expect(p.test('5')).toBe(true)
    expect(p.test('123')).toBe(true)
    expect(p.test('')).toBe(false)
  })

  test('zeroOrMore() allows empty match', () => {
    const p = new Pattern().space().zeroOrMore()
    expect(p.test('   ')).toBe(true)
    expect(p.test('')).toBe(true)
  })

  test('exactly(n) repeats exact count', () => {
    const p = new Pattern().digit().exactly(3)
    expect(p.test('123')).toBe(true)
    expect(p.test('12')).toBe(false)
    expect(p.test('1234')).toBe(false)
  })

  test('throws if quantifier used without token', () => {
    const p = new Pattern()
    expect(() => p.oneOrMore()).toThrow()
  })
})
