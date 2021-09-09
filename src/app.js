import { Tokenizer } from './Tokenizer.js'

const tokenizer = new Tokenizer('Hej Berit.')

tokenizer.analyzeStringForTokens()

console.log(tokenizer.matchingTokens)
