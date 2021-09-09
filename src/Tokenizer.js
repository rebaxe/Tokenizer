/**
 * Module for the type tokenizer.
 */

/**
 * Represents a tokenizer.
 *
 * @class
 */
export class Tokenizer {
  constructor (string) {
    this.stringToAnalyze = string
    this.matchingTokens = []
    this.regExp = /^[\w|åäöÅÄÖ]+/
  }

  get identifiedMatchingTokens () {
    return this._matchingTokens
  }

  set identifiedMatchingTokens(tokens) {
    this._matchingTokens = [...tokens]
  }

  analyzeStringForTokens () {
    const tokens = []
    let word = ''
    for (let i = 0; i < this.stringToAnalyze.length; i++) {
      if (this.regExp.test(this.stringToAnalyze[i])) {
        word += this.stringToAnalyze[i]
      } else if (this.stringToAnalyze[i] === '.') {
        tokens.push({ WORD: word })
        word = ''
        tokens.push({ DOT: '.' })
      } else {
        if (word.length) {
          tokens.push({ WORD: word })
          word = ''
        }
      }
    }
    tokens.push({ END: '' })
    this.matchingTokens = tokens
  }
  // getNextToken () {

  // }
}
