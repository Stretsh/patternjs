import { Pattern } from '../src/core/Pattern.js'

describe('Combinators', () => {
  test('then() does nothing but keeps chain readable', () => {
    const p = new Pattern().literal('a').then().literal('b')
    expect(p.toRegexString()).toBe('ab')
    expect(p.test('ab')).toBe(true)
  })

  test('before() lookahead', () => {
    const p = new Pattern()
      .literal('cat')
      .before('food') // must be followed by "food"

    expect(p.test('catfood')).toBe(true)
    expect(p.test('cat house')).toBe(false)
  })

  test('after() lookbehind', () => {
    const p = new Pattern()
      .after('big') // must be preceded by "big"
      .literal('cat')

    expect(p.test('bigcat')).toBe(true)
    expect(p.test('smallcat')).toBe(false)
  })

  test('combinators accept Pattern instances', () => {
    const next = new Pattern().literal('bar')
    const p = new Pattern().literal('foo').before(next)

    expect(p.test('foobar')).toBe(true)
    expect(p.test('foobaz')).toBe(false)
  })
})
