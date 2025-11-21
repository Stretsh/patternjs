export const combinators = {
  then() {
    // cosmetic
    return ''
  },

  before(regexString) {
    return `(?=${regexString})`
  },

  after(regexString) {
    return `(?<=${regexString})`
  }
}