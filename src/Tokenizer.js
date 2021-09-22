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

  // set identifiedMatchingTokens(tokens) {
  //   this._matchingTokens = [...this.analyzeString()]
  // }

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
  analyzeString () {
    for (let i = 0; i < this._grammarType.length; i++) {
      this._compareToGrammarType(this._grammarType[i])

      // for (let j = 0; j < this.stringToAnalyze.length; j++) {
      //   if (grammar.tokenRegExp.test(this.stringToAnalyze[j])) {
      //     word += this.stringToAnalyze[j]
      //     console.log('Match')
      //   } else {
      //     if (word.length) {
      //       this._matchingTokens.push({ tokenType: grammar.tokenType, tokenValue: word })
      //       if (word.length > longestWord.length) {
      //         longestWord = word
      //       }
      //       this.stringToAnalyze.slice(word.length)
      //       word = ''
      //     }
      //   }
      // }

      // if (word.length) {
      //   this._matchingTokens.push({ tokenType: this._grammarType[i].tokenType, tokenValue: word })
      //   word = ''
      // }
    }
    this._addEndToken()
    this.currentActiveToken = this.identifiedMatchingTokens[this._activeTokenIndex]
    console.log(this.identifiedMatchingTokens)
  }

  _compareToGrammarType (grammar) {
    let word = ''
    for (let j = 0; j < this.stringToAnalyze.length; j++) {
      if (grammar.tokenRegExp.test(this.stringToAnalyze[j])) {
        word += this.stringToAnalyze[j]
      } else {
        if (word.length) {
          this.identifiedMatchingTokens.push({ tokenType: grammar.tokenType, tokenValue: word })
          word = ''
        }
      }
    }
    if (word.length) {
      this.identifiedMatchingTokens.push({ tokenType: grammar.tokenType, tokenValue: word })
    }
  }

  _findLongestWord () {
    let longestWord = ''
    for (let i = 0; i < this.identifiedMatchingTokens.length; i++) {
      if (this.identifiedMatchingTokens[i].tokenValue > longestWord) {
        longestWord = this.identifiedMatchingTokens[i].tokenValue
      }
    }
    return longestWord
  }

  _addEndToken () {
    const endToken = { tokenType: 'END', tokenValue: '' }
    this.identifiedMatchingTokens.push(endToken)
  }

  /**
   * Move active token to the next matching token.
   *
   * @returns {object} The object with the current active token.
   */
  moveToNextToken () {
    // Only allow to get next token as long as active token is not the last match.
    if (this._activeTokenIndex < (this.identifiedMatchingTokens.length - 1)) {
      this._activeTokenIndex++
    }
    this.currentActiveToken = this.identifiedMatchingTokens[this._activeTokenIndex]
    // return this.currentActiveToken
  }

  /**
   * Move active token to previous matching token.
   *
   * @returns {object} The object with the current active token.
   */
  moveToPreviousToken () {
    // Only allow to get previous token as long as active token is not the first match.
    if (this._activeTokenIndex > 0) {
      this._activeTokenIndex--
    }
    this.currentActiveToken = this.identifiedMatchingTokens[this._activeTokenIndex]
    // return this.currentActiveToken
  }
}
