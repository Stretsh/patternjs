import { Pattern } from '../src/core/Pattern.js'

describe('whole()', () => {
  test('matches a whole word between whitespaces', () => {
    const p = new Pattern().literal('John').whole()

    expect(p.test('John')).toBe(true)
    expect(p.test('Hello John world')).toBe(true)
  })

  test('does NOT match inside other words', () => {
    const p = new Pattern().literal('John').whole()

    expect(p.test('Johnny')).toBe(false)
    expect(p.test('LongJohn')).toBe(false)
  })

  test('does NOT match when surrounded by punctuation or symbols', () => {
    const p = new Pattern().literal('John').whole()

    expect(p.test("'John'")).toBe(false)
    expect(p.test('@John%')).toBe(false)
    expect(p.test('(John)')).toBe(false)
  })

  test('only matches standalone numeric tokens', () => {
    const p = new Pattern().digit(3).whole()

    expect(p.test('345')).toBe(true)
    expect(p.test(' 345 ')).toBe(true)

    expect(p.test('2345')).toBe(false)
    expect(p.test('cat 3456')).toBe(false)
    expect(p.test('cat345')).toBe(false)
  })

  test('matches exactly once in complex text', () => {
    const text =
      "John was sent his new password 'dread123', but he keeps typing '@dread123$%'. Since dread123 is simple, it should work."

    const p = new Pattern()
      .literal('dread123')
      .whole()
      .global()

    const matches = text.match(p.toRegex())

    expect(matches).toEqual([' dread123 '])
  })
})
