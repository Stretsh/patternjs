export const quantifiers = {
  optional(token) {
    return groupIfNeeded(token) + '?'
  },

  oneOrMore(token) {
    return groupIfNeeded(token) + '+'
  },

  zeroOrMore(token) {
    return groupIfNeeded(token) + '*'
  },

  exactly(token, n) {
    return groupIfNeeded(token) + `{${n}}`
  },
}

function groupIfNeeded(token) {
  return token.length > 1 && !token.startsWith('(') ? `(?:${token})` : token
}
