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

export const advancedArithmeticGrammar = [{
  tokenType: 'NUMBER',
  tokenRegExp: /^.*[0-9]|\./
}, {
  tokenType: 'ADD',
  tokenRegExp: /^\+/
}, {
  tokenType: 'SUB',
  tokenRegExp: /^\-/
}, {
  tokenType: 'MUL',
  tokenRegExp: /^\*/
}, {
  tokenType: 'DIV',
  tokenRegExp: /^\//
}, {
  tokenType: 'PAR',
  tokenRegExp: /^\(|\)/
}]

export const maximalMunch = [{
  tokenType: 'NUMBER',
  tokenRegExp: /^.*[0-9]/
}, {
  tokenType: 'FLOAT',
  tokenRegExp: /^.*[0-9]|\./
}]

