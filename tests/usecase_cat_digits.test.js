import { Pattern } from '../src/core/Pattern.js'

describe('Use case: "cat XXX" with exactly 3 digits, case-sensitive', () => {
  test('finds all lowercase "cat <3 digits>" occurrences', () => {
    const text =
      'Cat 123 is looking at cat 345, but notices that cat 3456 is also watching cat 123, and at the same time cat 2.'

    const pattern = new Pattern()
      .literal('cat')
      .space()
      .digit(3).whole()
      .global()

    const regex = pattern.toRegex()
    const matches = text.match(regex)

    expect(matches).toEqual(['cat 345', 'cat 123'])
  })
})
