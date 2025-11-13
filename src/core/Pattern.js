import { atoms } from './atoms.js'
import { quantifiers } from './quantifiers.js'

export class Pattern {
  constructor() {
    this.tokens = []
    this.flags = ''
  }

  add(token) {
    this.tokens.push(token)
    return this
  }

  // ----- Atoms -----
  literal(value) {
    return this.add(atoms.literal(value))
  }

  word() {
    return this.add(atoms.word())
  }

  digit() {
    return this.add(atoms.digit())
  }

  space() {
    return this.add(atoms.space())
  }

  newline() {
    return this.add(atoms.newline())
  }

  // -----Quantifiers -----

  _applyQuantifier(fn, n) {
    if (this.tokens.length === 0)
      throw new Error('No token to quantify')

    const last = this.tokens.pop()
    const quantified = fn(last, n)
    this.tokens.push(quantified)
    return this
  }

  optional() {
    return this._applyQuantifier(quantifiers.optional)
  }

  oneOrMore() {
    return this._applyQuantifier(quantifiers.oneOrMore)
  }

  zeroOrMore() {
    return this._applyQuantifier(quantifiers.zeroOrMore)
  }

  exactly(n) {
    return this._applyQuantifier(quantifiers.exactly, n)
  }

  // ----- Compilation -----
  toRegexString() {
    return this.tokens.join('')
  }

  toRegex() {
    return new RegExp(this.toRegexString(), this.flags)
  }

  test(input) {
    return this.toRegex().test(input)
  }
}
