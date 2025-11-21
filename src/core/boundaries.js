export const boundaries = {
    startOfLine() {
      return '^'
    },

    endOfLine() {
      return '$'
    },

    wordBoundary() {
      return '\\b'
    },
}