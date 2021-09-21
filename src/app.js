// import { ArithmeticGrammarTokenizer } from './ArithmeticGrammarTokenizer.js'
import { Tokenizer } from './Tokenizer.js'
// import { WordAndDotGrammarTokenizer } from './WordAndDotGrammarTokenizer.js'

function tokenize (grammar, string) {
  const tokenizer = new Tokenizer(grammar, string)
  tokenizer.analyzeString()
  console.log(tokenizer.identifiedMatchingTokens)
}

const wordAndDotGrammar = [{
  tokenType: 'WORD',
  tokenRegExp: /^[\w|åäöÅÄÖ]+/
}, {
  tokenType: 'DOT',
  tokenRegExp: /\./
}]
tokenize(wordAndDotGrammar, 'Hej svejs.')
