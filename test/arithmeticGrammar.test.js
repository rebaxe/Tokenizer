import { Tokenizer } from '../src/Tokenizer.js'
import { expect } from 'chai'
import { arithmeticGrammar } from './testGrammars.js'
import { runTokenizer } from '../src/app.js'

describe('Arithmetic Grammar Tests', () => {
  it('TC12 - Tokenizer should identify NUMBER', () => {
    const tokenizer = runTokenizer(arithmeticGrammar, '3')
    tokenizer.tokenize()
    expect(tokenizer.currentActiveToken.tokenType).equal('NUMBER')
    expect(tokenizer.currentActiveToken.tokenValue).equal('3')
  })
  it('TC13 - Tokenizer should handle decimals', () => {
    const tokenizer = runTokenizer(arithmeticGrammar, '3.14')
    tokenizer.tokenize()
    expect(tokenizer.currentActiveToken.tokenType).equal('NUMBER')
    expect(tokenizer.currentActiveToken.tokenValue).equal('3.14')
  })
  it('TC14 - Tokenizer should move three steps forward and identify MUL', () => {
    const tokenizer = runTokenizer(arithmeticGrammar, '3 + 54 * 4')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('MUL')
    expect(tokenizer.currentActiveToken.tokenValue).equal('*')
  })
  it('TC15 - Tokenizer should throw error when hitting unvalid tokens', () => {
    const tokenizer = runTokenizer(arithmeticGrammar, '3+5 # 4')
    expect(() => tokenizer.tokenize()).to.throw(Error, 'Found tokens that did not match')
  })
  it('TC16 - Tokenizer should move one step forward, one backwards, three forward and then identify ADD', () => {
    const tokenizer = runTokenizer(arithmeticGrammar, '3.0+54.1 + 4.2')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    tokenizer.moveToPreviousToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('ADD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('+')
  })
})
