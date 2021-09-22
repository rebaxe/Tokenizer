import { Tokenizer } from '../src/Tokenizer.js'
import { expect } from 'chai'
import { wordAndDotGrammar, arithmethicGrammar } from '../src/grammars.js'

// const wordAndDotGrammar = [{
//   tokenType: 'WORD',
//   tokenRegExp: /^[\w|åäöÅÄÖ]+/
// }, {
//   tokenType: 'DOT',
//   tokenRegExp: /\./
// }]

describe('WordAndDotGrammar', () => {
  it('TC1', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a')
    tokenizer.analyzeString()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('a')
  })
  it('TC2', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a aa')
    tokenizer.analyzeString()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('aa')
  })
  it('TC3', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a.b')
    tokenizer.analyzeString()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('DOT')
    expect(tokenizer.currentActiveToken.tokenValue).equal('.')
  })
  it('TC4', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a.b')
    tokenizer.analyzeString()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('b')
  })
  it('TC5', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'aa. b')
    tokenizer.analyzeString()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('b')
  })
  it('TC6', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a. b')
    tokenizer.analyzeString()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToPreviousToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('DOT')
    expect(tokenizer.currentActiveToken.tokenValue).equal('.')
  })
  it('TC7', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, '')
    tokenizer.analyzeString()
    expect(tokenizer.currentActiveToken.tokenType).equal('END')
    expect(tokenizer.currentActiveToken.tokenValue).equal('')
  })
  it('TC8', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, ' ')
    tokenizer.analyzeString()
    expect(tokenizer.currentActiveToken.tokenType).equal('END')
    expect(tokenizer.currentActiveToken.tokenValue).equal('')
  })
  it('TC9', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a')
    tokenizer.analyzeString()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('END')
    expect(tokenizer.currentActiveToken.tokenValue).equal('')
  })
  it('TC10', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a')
    tokenizer.analyzeString()
    tokenizer.moveToPreviousToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('a')
  })
  it('TC11', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, '!')
    // TO DO: Should throw an exception
  })
})

describe('ArithmeticGrammar', () => {
  it('TC12', () => {
    const tokenizer = new Tokenizer(arithmethicGrammar, '3')
    tokenizer.analyzeString()
    expect(tokenizer.currentActiveToken.tokenType).equal('NUMBER')
    expect(tokenizer.currentActiveToken.tokenValue).equal('3')
  })
  it('TC13', () => {
    const tokenizer = new Tokenizer(arithmethicGrammar, '3.14')
    tokenizer.analyzeString()
    expect(tokenizer.currentActiveToken.tokenType).equal('NUMBER')
    expect(tokenizer.currentActiveToken.tokenValue).equal('3.14')
  })
  it('TC14', () => {
    const tokenizer = new Tokenizer(arithmethicGrammar, '3 + 54 * 4')
    tokenizer.analyzeString()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('MUL')
    expect(tokenizer.currentActiveToken.tokenValue).equal('*')
  })
  it('TC15', () => {
    const tokenizer = new Tokenizer(arithmethicGrammar, '3+5 # 4')
    tokenizer.analyzeString()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    // TO DO: should throw exception

    // expect(tokenizer.currentActiveToken.tokenType).equal('MUL')
    // expect(tokenizer.currentActiveToken.tokenValue).equal('*')
  })
  it('TC16', () => {
    const tokenizer = new Tokenizer(arithmethicGrammar, '3.0+54.1 + 4.2')
    tokenizer.analyzeString()
    tokenizer.moveToNextToken()
    tokenizer.moveToPreviousToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('ADD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('+')
  })
})
