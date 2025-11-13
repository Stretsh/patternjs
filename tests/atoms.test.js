import { Pattern } from '../src/core/Pattern.js'

describe('Atoms', () => {
  test('literal() matches exact text', () => {
    const p = new Pattern().literal('abc')
    expect(p.test('abc')).toBe(true)
    expect(p.test('abcd')).toBe(true)
    expect(p.test('zabc')).toBe(true)
    expect(p.test('xyz')).toBe(false)
  })

  test('digit() matches digits', () => {
    const p = new Pattern().digit()
    expect(p.test('5')).toBe(true)
    expect(p.test('a')).toBe(false)
  })

  test('word() matches letters or digits', () => {
    const p = new Pattern().word()
    expect(p.test('A')).toBe(true)
    expect(p.test('7')).toBe(true)
    expect(p.test('-')).toBe(false)
  })

  test('space() matches whitespace', () => {
    const p = new Pattern().space()
    expect(p.test(' ')).toBe(true)
    expect(p.test('\t')).toBe(true)
    expect(p.test('a')).toBe(false)
  })

  test('newline() matches newlines', () => {
    const p = new Pattern().newline()
    expect(p.test('\n')).toBe(true)
    expect(p.test('a')).toBe(false)
  })
})
