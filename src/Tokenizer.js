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
    this._activeTokenIndex = 0
    this._activeToken = {}
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

  get currentActiveToken () {
    return this._activeToken
  }

  set currentActiveToken (value) {
    this._activeToken = value
  }

  /**
   * Analyzes a string for tokens according to the given grammar.
   *
   * @returns {Array} - An array of objects containing the matching tokens with token type and token value.
   */
  tokenize () {
    if (!this._isOnlySpaces()) {
      this._analyzeString()
    }
    this._addEndToken()
    this._updateActiveToken()
  }

  _analyzeString () {
    while (this.stringToAnalyze.length > 0) {
      let newToken = ''
      let newTokenType = ''

      for (let j = 0; j < this._grammarType.length; j++) {
        this.stringToAnalyze = this.stringToAnalyze.trim()
        const currentMatch = this._findMatches(this._grammarType[j])
        if (currentMatch.length > newToken.length) {
          newToken = currentMatch
          newTokenType = this._grammarType[j].tokenType
        }
      }
      this._handleNoMatch(newToken)
      this.stringToAnalyze = this.stringToAnalyze.slice(newToken.length)
      this._addToken(newTokenType, newToken)
    }
  }

  _isOnlySpaces () {
    const regExp = /\S/
    return !regExp.test(this.stringToAnalyze)
  }

  _findMatches (grammar) {
    let match = ''
    for (let i = 0; i < this.stringToAnalyze.length; i++) {
      const currentCharacter = this.stringToAnalyze[i]
      if (grammar.tokenRegExp.test(currentCharacter)) {
        match += currentCharacter
      } else {
        return match
      }
    }
    return match
  }

  _addToken (type, value) {
    this.identifiedMatchingTokens.push({ tokenType: type, tokenValue: value })
  }

  _addEndToken () {
    const endToken = { tokenType: 'END', tokenValue: '' }
    this.identifiedMatchingTokens.push(endToken)
  }

  _handleNoMatch (match) {
    if (match.length === 0) {
      throw new Error('Found tokens that did not match')
    }
  }

  _updateActiveToken () {
    this.currentActiveToken = this.identifiedMatchingTokens[this._activeTokenIndex]
  }

  /**
   * Move active token to the next matching token.
   */
  moveToNextToken () {
    // Only allow to get next token as long as active token is not the last match.
    if (this._activeTokenIndex < (this.identifiedMatchingTokens.length - 1)) {
      this._activeTokenIndex++
    }
    this._updateActiveToken()
  }

  /**
   * Move active token to previous matching token.
   */
  moveToPreviousToken () {
    // Only allow to get previous token as long as active token is not the first match.
    if (this._activeTokenIndex > 0) {
      this._activeTokenIndex--
    }
    this._updateActiveToken()
  }
}
