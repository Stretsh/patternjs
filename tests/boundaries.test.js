import { Pattern } from '../src/core/Pattern.js'

describe('Boundaries', () => {
  test('startOfLine and endOfLine enforce full-string match', () => {
    const p = new Pattern()
      .startOfLine()
      .digit(3)
      .endOfLine()

    expect(p.test('123')).toBe(true)
    expect(p.test('012')).toBe(true)

    expect(p.test('1234')).toBe(false)
    expect(p.test('x123')).toBe(false)
  })

  test('wordBoundary matches word edges', () => {
    const p = new Pattern()
      .wordBoundary()
      .literal('cat')
      .wordBoundary()

    expect(p.test('cat')).toBe(true)
    expect(p.test('a cat b')).toBe(true)

    expect(p.test('scatter')).toBe(false)
  })
})
