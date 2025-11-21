import { atoms } from './atoms.js'
import { boundaries } from './boundaries.js'
import { combinators } from './combinators.js'
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

  repeat(n) {
    return this._applyQuantifier(quantifiers.repeat, n)
  }



  // ----- Boundaries -----
  startOfLine() {
    this.tokens.push(boundaries.startOfLine())
    return this
  }

  endOfLine() {
    this.tokens.push(boundaries.endOfLine())
    return this
  }

  wordBoundary() {
    this.tokens.push(boundaries.wordBoundary())
    return this
  }

  whole() {
    if (this.tokens.length === 0) {
      throw new Error('No token to enforce with whole()')
    }

    const token = this.tokens.pop()

    const wrapped = `(?:^|\\s)(?:${token})(?:\\s|$)`
    this.tokens.push(wrapped)
    return this
  }

  // ----- Combinators -----
  then() {
    return this
  }

  before(other) {
    const regex = other instanceof Pattern ? other.toRegexString() : other
    this.tokens.push(combinators.before(regex))
    return this
  }

  after(other) {
    const regex = other instanceof Pattern ? other.toRegexString() : other
    this.tokens.push(combinators.after(regex))
    return this
  }

  // ----- Flags -----
  caseInsensitive() {
    if (!this.flags.includes('i')) this.flags += 'i'
    return this
  }

  multiline() {
    if (!this.flags.includes('m')) this.flags += 'm'
    return this
  }

  global() {
    if (!this.flags.includes('g')) this.flags += 'g'
    return this
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
