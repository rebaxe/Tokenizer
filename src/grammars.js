export const wordAndDotGrammar = [{
  tokenType: 'WORD',
  tokenRegExp: /^[\w|åäöÅÄÖ]+/
}, {
  tokenType: 'DOT',
  tokenRegExp: /\./
}]

export const arithmethicGrammar = [{
  tokenType: 'NUMBER',
  tokenRegExp: /^.*[0-9]|\./
}, {
  tokenType: 'ADD',
  tokenRegExp: /^\+/
}, {
  tokenType: 'MUL',
  tokenRegExp: /^\*/
}]
