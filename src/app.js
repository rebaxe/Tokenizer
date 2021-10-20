import { Tokenizer } from './Tokenizer.js'

/**
 * A function to run the program.
 *
 * @param {Array<object>} grammar An array containing objects with grammar definitions.
 * @param {string} string A string representing the string to be tokenized.
 * @returns {Tokenizer} Returns an instance of the type Tokenizer.
 */
export function initTokenizer (grammar, string) {
    return new Tokenizer(grammar, string)
}
