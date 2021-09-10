import { Tokenizer } from './Tokenizer.js'

export class WordAndDotGrammarTokenizer extends Tokenizer {
  constructor (string) {
    super(string)
    this.regExp = /^[\w|åäöÅÄÖ]+/
    this.matchingTokens = this.analyzeStringForTokens()
  }

  /**
   * Analyzes a string to find matching tokens.
   */
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
    return tokens
  }
}
