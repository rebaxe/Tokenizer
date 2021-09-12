import { arithmethicAnalysis } from './ArithmeticGrammar.js'
import { wordAndDotAnalysis } from './WordAndDotGrammar.js'

/**
 * Module for the type tokenizer.
 */

/**
 * Represents a tokenizer.
 *
 * @class
 */
export class Tokenizer {
  constructor (grammar, string) {
    this.stringToAnalyze = string
    this.grammarType = grammar
    this.matchingTokens = this.analyzeString()
    this.activeTokenIndex = 0
    this.activeToken = this.matchingTokens[this.activeTokenIndex]
  }

  get identifiedMatchingTokens () {
    return this._matchingTokens
  }

  // set identifiedMatchingTokens(tokens) {
  //   this._matchingTokens = [...this.analyzeString()]
  // }

  get activeToken () {
    return this._activeToken
  }

  set activeToken (token) {
    this._activeToken = token
  }

  /**
   * Analyzes a string for tokens according to the given grammar.
   *
   * @returns {Array} - An array of objects containing the matching tokens with token type and token value.
   */
  analyzeString () {
    if (this.grammarType === 'WordAndDotGrammar') {
      return wordAndDotAnalysis(this.stringToAnalyze)
    } else if (this.grammarType === 'ArithmeticGrammar') {
      return arithmethicAnalysis(this.stringToAnalyze)
    }
  }

  /**
   * Move active token to the next matching token.
   */
  getNextToken () {
    this.activeTokenIndex++
    this.activeToken = this.matchingTokens[this.activeTokenIndex]
    // TODO: add error handling/exception when trying to access token after "END."
  }

  /**
   * Move active token to previous matching token.
   */
  getPreviousToken () {
    this.activeTokenIndex--
    this.activeToken = this.matchingTokens[this.activeTokenIndex]
  // TODO: add error handling/exception when trying to access token before first.
  }
}
