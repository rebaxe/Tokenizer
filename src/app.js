import { Tokenizer } from './Tokenizer.js'
import { wordAndDotGrammar, arithmethicGrammar } from './grammars.js'

function tokenize (grammar, string) {
  const tokenizer = new Tokenizer(grammar, string)
  tokenizer.analyzeString()
  console.log(tokenizer.identifiedMatchingTokens)
}

// tokenize(wordAndDotGrammar, 'Hej svejs.')
tokenize(arithmethicGrammar, '3 + 4')
