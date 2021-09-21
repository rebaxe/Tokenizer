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
    this._string = string
    this._grammarType = grammar
    this._matchingTokens = []
    // this._activeTokenIndex = 0
    // this._activeToken = this.matchingTokens[this.activeTokenIndex]
  }

  get stringToAnalyze () {
    return this._string
  }

  set stringToAnalyze (value) {
    this._string = value
  }

  get identifiedMatchingTokens () {
    return this._matchingTokens
  }

  set identifiedMatchingTokens (value) {
    this._matchingTokens = value
  }

  // set identifiedMatchingTokens(tokens) {
  //   this._matchingTokens = [...this.analyzeString()]
  // }

  // get activeToken () {
  //   return this._activeToken
  // }

  // set activeToken (token) {
  //   this._activeToken = token
  // }

  /**
   * Analyzes a string for tokens according to the given grammar.
   *
   * @returns {Array} - An array of objects containing the matching tokens with token type and token value.
   */
  analyzeString () {
    let word = ''
    let grammar = ''
    for (let i = 0; i < this._grammarType.length; i++) {
      grammar = this._grammarType[i].tokenType
      for (let j = 0; j < this.stringToAnalyze.length; j++) {
        if (this._grammarType[i].tokenRegExp.test(this.stringToAnalyze[j])) {
          word += this.stringToAnalyze[j]
          console.log('Match')
        } else {
          if (word.length) {
            this._matchingTokens.push({ tokenType: this._grammarType[i].tokenType, tokenValue: word })
            word = ''
          }
          console.log('No match')
        }
      }
      if (word.length) {
        this._matchingTokens.push({ tokenType: this._grammarType[i].tokenType, tokenValue: word })
        word = ''
      }
    }
    console.log(this._matchingTokens)
  }

  /**
   * Move active token to the next matching token.
   *
   * @returns {object} The object with the current active token.
   */
  getNextToken () {
    // Only allow to get next token as long as active token is not the last match.
    if (this.activeTokenIndex < (this.matchingTokens.length - 1)) {
      this.activeTokenIndex++
    }
    this.activeToken = this.matchingTokens[this.activeTokenIndex]
    return this.activeToken
  }

  /**
   * Move active token to previous matching token.
   *
   * @returns {object} The object with the current active token.
   */
  getPreviousToken () {
    // Only allow to get previous token as long as active token is not the first match.
    if (this.activeTokenIndex > 0) {
      this.activeTokenIndex--
    }
    this.activeToken = this.matchingTokens[this.activeTokenIndex]
    return this.activeToken
  }
}
