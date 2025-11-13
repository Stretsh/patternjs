export const atoms = {
  literal(value) {
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return escaped
  },

  word() {
    return '\\w'
  },

  digit() {
    return '\\d'
  },

  space() {
    return '\\s'
  },

  newline() {
    return '\\n'
  },
}
