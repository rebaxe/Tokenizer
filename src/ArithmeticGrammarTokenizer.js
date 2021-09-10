import { Tokenizer } from './Tokenizer.js'

export class ArithmeticGrammarTokenizer extends Tokenizer {
  constructor (string) {
    super(string)
    this.numberRegExp = /^[0-9]+(\.([0-9])+)?/
    this.matchingTokens = this.analyzeStringForTokens()
  }

  /**
   * Analyzes a string to find matching tokens.
   */
  analyzeStringForTokens () {
    const tokens = []
    let number = ''
    for (let i = 0; i < this.stringToAnalyze.length; i++) {
      if (this.numberRegExp.test(this.stringToAnalyze[i])) {
        number += this.stringToAnalyze[i]
      } else if (this.stringToAnalyze[i] === ' ') {
        if (number.length) {
          tokens.push({ NUMBER: Number(number) })
          number = ''
        }
      } else if (this.stringToAnalyze[i] === '.') {
        number += this.stringToAnalyze[i]
      } else if (this.stringToAnalyze[i] === '+') {
        if (number.length) {
          tokens.push({ NUMBER: Number(number) })
          number = ''
        }
        tokens.push({ ADD: '+' })
      } else if (this.stringToAnalyze[i] === '*') {
        if (number.length) {
          tokens.push({ NUMBER: Number(number) })
          number = ''
        }
        tokens.push({ MUL: '*' })
      }
      /* else {
        if (number.length) {
          tokens.push({ NUMBER: Number(number) })
          number = ''
        }
      } */
    }
    if (number.length) {
      tokens.push({ NUMBER: Number(number) })
      number = ''
    }
    tokens.push({ END: '' })
    return tokens
  }
}
