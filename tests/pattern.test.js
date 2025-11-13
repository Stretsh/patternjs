import { Pattern } from '../src/core/Pattern'

test('Pattern compiles and tests basic literals', () => {
  const p = new Pattern().add('abc')
  expect(p.test('abc')).toBe(true)
  expect(p.test('xzy')).toBe(false)
})
