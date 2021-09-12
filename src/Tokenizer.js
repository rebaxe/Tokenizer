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
    this._activeToken = this.matchingTokens[this.activeTokenIndex]
  }

  analyzeString() {
    if (this.grammarType === 'WordAndDotGrammar') {
      return wordAndDotAnalysis(this.stringToAnalyze)
    } else if (this.grammarType === 'ArithmeticGrammar') {
      return arithmethicAnalysis(this.stringToAnalyze)
    }
  }

  getNextToken () {
    this.activeTokenIndex++
    this.activeToken = this.matchingTokens[this.activeTokenIndex]
    // this._activeToken.tokenType = Object.keys(this.matchingTokens[this.activeTokenIndex])[0]
    // this._activeToken.tokenValue = Object.values(this.matchingTokens[this.activeTokenIndex])[0]
  }

  getPreviousToken () {
    this.activeTokenIndex--
    this.activeToken = this.matchingTokens[this.activeTokenIndex]
    // this._activeToken.tokenType = Object.keys(this.matchingTokens[this.activeTokenIndex])[0]
    // this._activeToken.tokenValue = Object.values(this.matchingTokens[this.activeTokenIndex])[0]
  }
}
