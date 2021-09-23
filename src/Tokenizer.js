/**
 * Module for the type tokenizer.
 */

/**
 * Represents a tokenizer.
 *
 * @class
 */
export class Tokenizer {
  /**
   * Creates an instance of Tokenizer.
   *
   * @param {Array<object>} grammar An array of objects containing grammar definitions.
   * @param {string} string The string to be tokenized.
   */
  constructor (grammar, string) {
    this._string = string
    this._grammarType = grammar
    this._matchingTokens = []
    this._activeTokenIndex = 0
    this._activeToken = {}
  }

  /**
   * Gets stringToAnalyze.
   *
   * @returns {string} The string to be analyzed.
   * @memberof Tokenizer
   */
  get stringToAnalyze () {
    return this._string
  }

  /**
   * Sets stringToAnalyze.
   *
   * @memberof Tokenizer
   */
  set stringToAnalyze (value) {
    this._string = value
  }

  /**
   * Gets matchingTokenSet.
   *
   * @returns {Array<object>} An array containing matching tokens.
   * @memberof Tokenizer
   */
  get matchingTokenSet () {
    return this._matchingTokens
  }

  /**
   * Sets matchingTokenSet.
   *
   * @memberof Tokenizer
   */
  set matchingTokenSet (value) {
    this._matchingTokens = value
  }

  /**
   * Gets currentActiveToken.
   *
   * @returns {object} An object representing the current active token.
   * @memberof Tokenizer
   */
  get currentActiveToken () {
    return this._activeToken
  }

  /**
   * Sets currentActiveToken.
   *
   * @memberof Tokenizer
   */
  set currentActiveToken (value) {
    this._activeToken = value
  }

  /**
   * Initializes tokenization.
   */
  tokenize () {
    if (!this._isOnlySpaces()) {
      this._analyzeString()
    }
    this._addEndToken()
    this._updateActiveToken()
  }

  /**
   * Analyzes a string for matching token according to given grammar.
   */
  _analyzeString () {
    while (this.stringToAnalyze.length > 0) {
      let newTokenValue = ''
      let newTokenType = ''

      for (let i = 0; i < this._grammarType.length; i++) {
        this.stringToAnalyze = this.stringToAnalyze.trim()
        const currentMatch = this._findMatches(this._grammarType[i])
        if (currentMatch.length > newTokenValue.length) {
          newTokenValue = currentMatch
          newTokenType = this._grammarType[i].tokenType
        }
      }
      this._handleNoMatch(newTokenValue)
      this.stringToAnalyze = this.stringToAnalyze.slice(newTokenValue.length)
      this._addToken(newTokenType, newTokenValue)
    }
  }

  /**
   * Checks if a string contains only white spaces.
   *
   * @returns {boolean} Represents if a string contains only white spaces or not.
   */
  _isOnlySpaces () {
    const regExp = /\S/
    return !regExp.test(this.stringToAnalyze)
  }

  /**
   * Checks if the string matches the current grammar.
   *
   * @param {object} grammar An object representing the current grammar.
   *
   * @returns {string} a string representing the matching string.
   */
  _findMatches (grammar) {
    let match = ''
    for (let i = 0; i < this.stringToAnalyze.length; i++) {
      if (grammar.tokenRegExp.test(this.stringToAnalyze[i])) {
        match += this.stringToAnalyze[i]
      } else {
        return match
      }
    }
    return match
  }

  /**
   * Adds a token to found matching tokens.
   *
   * @param {string} type A string representing the token type.
   * @param {string} value A string representing the token value.
   */
  _addToken (type, value) {
    this.matchingTokenSet.push({ tokenType: type, tokenValue: value })
  }

  /**
   * Adds an end token.
   */
  _addEndToken () {
    const endToken = { tokenType: 'END', tokenValue: '' }
    this.matchingTokenSet.push(endToken)
  }

  /**
   * Throws an error if no match was found.
   *
   * @param {string} match A string representing the match.
   * @throws {Error}
   */
  _handleNoMatch (match) {
    if (match.length === 0) {
      throw new Error('Found tokens that did not match')
    }
  }

  /**
   * Updates which token that is currently active.
   */
  _updateActiveToken () {
    this.currentActiveToken = this.matchingTokenSet[this._activeTokenIndex]
  }

  /**
   * Moves active token to the next matching token.
   */
  moveToNextToken () {
    // Only allow to get next token as long as active token is not the last match.
    if (this._activeTokenIndex < (this.matchingTokenSet.length - 1)) {
      this._activeTokenIndex++
    }
    this._updateActiveToken()
  }

  /**
   * Moves active token to previous matching token.
   */
  moveToPreviousToken () {
    // Only allow to get previous token as long as active token is not the first match.
    if (this._activeTokenIndex > 0) {
      this._activeTokenIndex--
    }
    this._updateActiveToken()
  }
}
