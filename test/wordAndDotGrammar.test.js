import { Tokenizer } from '../src/Tokenizer.js'
import { expect } from 'chai'
import { wordAndDotGrammar } from './testGrammars.js'
import { runTokenizer } from '../src/app.js'

describe('Word-And-Dot Grammar Tests', () => {
  it('TC1 - Tokenizer should identify WORD', () => {
    const tokenizer = runTokenizer(wordAndDotGrammar, 'a')
    // const tokenizer = new Tokenizer(wordAndDotGrammar, 'a')
    tokenizer.tokenize()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('a')
  })
  it('TC2 - Tokenizer should move to next token and identify WORD', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a aa')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('aa')
  })
  it('TC3 - Tokenizer should move to next token and identify DOT', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a.b')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('DOT')
    expect(tokenizer.currentActiveToken.tokenValue).equal('.')
  })
  it('TC4 - Tokenizer should move two steps forward and identify WORD', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a.b')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('b')
  })
  it('TC5 - Tokenizer should move two steps forward and handle white space', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'aa. b')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('b')
  })
  it('TC6 - Tokenizer should move two steps forward, one step backwards and identify DOT', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a. b')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToPreviousToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('DOT')
    expect(tokenizer.currentActiveToken.tokenValue).equal('.')
  })
  it('TC7 - Tokenizer should handle an empty string', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, '')
    tokenizer.tokenize()
    expect(tokenizer.currentActiveToken.tokenType).equal('END')
    expect(tokenizer.currentActiveToken.tokenValue).equal('')
  })
  it('TC8 - Tokenizer should handle a string with only white spaces', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, ' ')
    tokenizer.tokenize()
    expect(tokenizer.currentActiveToken.tokenType).equal('END')
    expect(tokenizer.currentActiveToken.tokenValue).equal('')
  })
  it('TC9 - Tokenizer should have END as last token', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('END')
    expect(tokenizer.currentActiveToken.tokenValue).equal('')
  })
  it('TC10 - Tokenizer should not move past first token', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, 'a')
    tokenizer.tokenize()
    tokenizer.moveToPreviousToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('a')
  })
  it('TC11 - Tokenizer should throw error when hitting unvalid tokens', () => {
    const tokenizer = new Tokenizer(wordAndDotGrammar, '!')
    expect(() => tokenizer.tokenize()).to.throw(Error, 'Found tokens that did not match')
  })
})
