import { Tokenizer } from './Tokenizer.js'
import { wordAndDotGrammar, arithmethicGrammar } from './grammars.js'

/**
 * A function to run the program.
 *
 * @param {Array<object>} grammar An array containing objects with grammar definitions.
 * @param {string} string A string to tokenize.
 */
function runTokenizer (grammar, string) {
  const tokenizer = new Tokenizer(grammar, string)
  tokenizer.tokenize()
  console.log(tokenizer.matchingTokenSet)
}

try {
  runTokenizer(wordAndDotGrammar, 'aa a.b')
  // tokenize(arithmethicGrammar, '3.0+54.1 + 4.2 5')
} catch (error) {
  console.log(error.message)
}
