/**
 * Analyses a string for word and dot tokens.
 *
 * @param {string} string - A string representing the string to be analyzed.
 * @returns {Array} - An array containing the matching tokens.
 */
export function wordAndDotAnalysis (string) {
  const regExp = /^[\w|åäöÅÄÖ]+/
  const tokens = []
  let word = ''
  for (let i = 0; i < string.length; i++) {
    if (regExp.test(string[i])) {
      word += string[i]
    } else if (string[i] === '.') {
      tokens.push({ tokenType: 'WORD', tokenValue: word })
      word = ''
      tokens.push({ tokentype: 'DOT', tokenValue: '.' })
    } else {
      if (word.length) {
        tokens.push({ tokenType: 'WORD', tokenValue: word })
        word = ''
      }
    }
  }
  tokens.push({ okenType: 'END', tokenValue: '' })
  return tokens
}
