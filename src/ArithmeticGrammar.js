/**
 * Analyses a string for arithmethic tokens.
 *
 * @param {string} string - A string representing the string to be analyzed.
 * @returns {Array} - An array containing the matching tokens.
 */
export function arithmethicAnalysis (string) {
  const numberRegExp = /^[0-9]+(\.([0-9])+)?/
  const tokens = []
  let number = ''
  for (let i = 0; i < string.length; i++) {
    if (numberRegExp.test(string[i])) {
      number += string[i]
    } else if (string[i] === ' ') {
      if (number.length) {
        tokens.push({ tokenType: 'NUMBER', tokenValue: Number(number) })
        number = ''
      }
    } else if (string[i] === '.') {
      number += string[i]
    } else if (string[i] === '+') {
      if (number.length) {
        tokens.push({ tokenType: 'NUMBER', tokenValue: Number(number) })
        number = ''
      }
      tokens.push({ tokenType: 'ADD', tokenValue: '+' })
    } else if (string[i] === '*') {
      if (number.length) {
        tokens.push({ tokenType: 'NUMBER', tokenValue: Number(number) })
        number = ''
      }
      tokens.push({ tokentype: 'MUL', tokenValue: '*' })
    }
    /* else {
      if (number.length) {
        tokens.push({ NUMBER: Number(number) })
        number = ''
      }
    } */
  }
  if (number.length) {
    tokens.push({ tokenType: 'NUMBER', tokenValue: Number(number) })
    number = ''
  }
  tokens.push({ tokenType: 'END', tokenValue: '' })
  return tokens
}
