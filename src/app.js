import { ArithmeticGrammarTokenizer } from './ArithmeticGrammarTokenizer.js'
import { WordAndDotGrammarTokenizer } from './WordAndDotGrammarTokenizer.js'

function tokenize (grammar, string) {
  let tokenizer
  if (grammar === 'WordAndDotGrammar') {
    tokenizer = new WordAndDotGrammarTokenizer(string)
    console.log(tokenizer.activeToken)
    return tokenizer.matchingTokens
  } else if (grammar === 'ArithmeticGrammar') {
    tokenizer = new ArithmeticGrammarTokenizer(string)
    console.log(tokenizer.activeToken)
    tokenizer.getNextToken()
    console.log(tokenizer.activeToken)
    tokenizer.getPreviousToken()
    console.log(tokenizer.activeToken)
    return tokenizer.matchingTokens
  }
}
// const tokens = tokenize('WordAndDotGrammar', 'Detta är en mening.')
const tokens = tokenize('ArithmeticGrammar', '3 * 4')
console.log(tokens)
