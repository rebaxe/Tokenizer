import { Tokenizer } from './Tokenizer.js'
import { wordAndDotGrammar, arithmeticGrammar } from '../test/testGrammars.js'
import { Grammar } from './Grammar.js'

/**
 * A function to run the program.
 *
 * @param {Array<object>} grammar An array containing objects with grammar definitions.
 * @param {string} string A string representing the string to be tokenized.
 * @returns {Tokenizer} Returns an instance of the type Tokenizer.
 */
export function runTokenizer (grammar, string) {
  const grammars = Array.from(grammar, g => new Grammar(g))
  return new Tokenizer(grammars, string)
}

try {
  const tokenizer = runTokenizer(wordAndDotGrammar, 'aa a.b')
  tokenizer.tokenize()
  console.log(tokenizer.matchingTokenSet)
} catch (error) {
  console.log(error.message)
}
