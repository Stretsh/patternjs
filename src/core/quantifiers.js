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

  repeat(token, n) {
    return groupIfNeeded(token) + `{${n}}`
  },
}

function groupIfNeeded(token) {
  const single = /^\\[dwsn]$/
  if (!single.test(token)) {
    if (!token.startsWith('(?:')) {
      return `(?:${token})`
    }
  }
  return token
}
