export const atoms = {
  literal(value) {
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return escaped
  },

  word() {
    return '\\w'
  },

  digit(count = 1) {
    if (count === 1) return '\\d'
    return Array(count).fill('\\d').join('')
  },

  space() {
    return '\\s'
  },

  newline() {
    return '\\n'
  },
}
