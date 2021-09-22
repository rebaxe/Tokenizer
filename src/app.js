import { Tokenizer } from './Tokenizer.js'
import { wordAndDotGrammar, arithmethicGrammar } from './grammars.js'

function tokenize (grammar, string) {
  const tokenizer = new Tokenizer(grammar, string)
  tokenizer.tokenize()
  console.log(tokenizer.identifiedMatchingTokens)
}

try {
  tokenize(wordAndDotGrammar, ' ')
  // tokenize(arithmethicGrammar, '3.0+54.1 + 4.2 5')
} catch (error) {
  console.log(error.message)
}
