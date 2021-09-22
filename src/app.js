// import { ArithmeticGrammarTokenizer } from './ArithmeticGrammarTokenizer.js'
import { Tokenizer } from './Tokenizer.js'
// import { WordAndDotGrammarTokenizer } from './WordAndDotGrammarTokenizer.js'

function tokenize (grammar, string) {
  const tokenizer = new Tokenizer(grammar, string)
  tokenizer.analyzeString()
  console.log(tokenizer.identifiedMatchingTokens)
  tokenizer.moveToNextToken()
  console.log(tokenizer.currentActiveToken)
}

const wordAndDotGrammar = [{
  tokenType: 'WORD',
  tokenRegExp: /^[\w|åäöÅÄÖ]+/
}, {
  tokenType: 'DOT',
  tokenRegExp: /\./
}]

const arithmethicGrammar = [{
  tokenType: 'NUMBER',
  tokenRegExp: /^[0-9]+(\.([0-9])+)?/
}, {
  tokenType: 'ADD',
  tokenRegExp: /^\+/
}, {
  tokenType: 'MUL',
  tokenRegExp: /^\*/
}]

// tokenize(wordAndDotGrammar, 'Hej svejs.')
tokenize(arithmethicGrammar, '3 + 4')
