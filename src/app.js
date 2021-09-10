import { WordAndDotGrammarTokenizer } from './WordAndDotGrammarTokenizer.js'

function tokenize (grammar, string) {
  let tokenizer
  if (grammar === 'WordAndDotGrammar') {
    tokenizer = new WordAndDotGrammarTokenizer(string)
    return tokenizer.matchingTokens
  }
}
const tokens = tokenize('WordAndDotGrammar', 'Detta är en mening.')
console.log(tokens)
