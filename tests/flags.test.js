import { Pattern } from '../src/core/Pattern.js'

describe('Flags', () => {
  test('caseInsensitive() sets i flag', () => {
    const p = new Pattern()
      .literal('cat')
      .caseInsensitive()

    expect(p.test('CAT')).toBe(true)
    expect(p.test('Cat')).toBe(true)
    expect(p.test('dog')).toBe(false)
  })

  test('multiline() affects ^ and $', () => {
    const p = new Pattern()
      .startOfLine()
      .literal('foo')
      .endOfLine()
      .multiline()

    const input = 'bar\nfoo\nbaz'
    expect(p.test(input)).toBe(true)
  })

  test('global() allows repeated matches (via match)', () => {
    const p = new Pattern()
      .digit()
      .global()

    const results = 'a1b2c3'.match(p.toRegex())
    expect(results).toEqual(['1', '2', '3'])
  })

  test('flags accumulate without duplicates', () => {
    const p = new Pattern()
      .global()
      .global()
      .multiline()
      .caseInsensitive()
      .caseInsensitive()

    expect(p.flags).toBe('gmI'.toLowerCase()) // order not important, but no dupes
  })
})
