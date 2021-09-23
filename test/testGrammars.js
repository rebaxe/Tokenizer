export const wordAndDotGrammar = [{
  tokenType: 'WORD',
  tokenRegExp: /^[\w|åäöÅÄÖ]+/
}, {
  tokenType: 'DOT',
  tokenRegExp: /\./
}]

export const arithmeticGrammar = [{
  tokenType: 'NUMBER',
  tokenRegExp: /^.*[0-9]|\./
}, {
  tokenType: 'ADD',
  tokenRegExp: /^\+/
}, {
  tokenType: 'MUL',
  tokenRegExp: /^\*/
}]
