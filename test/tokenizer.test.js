import { Tokenizer } from '../src/Tokenizer.js'
import { expect } from 'chai'

describe('WordAndDotGrammar', () => {
  const tokenizer = new Tokenizer('WordAndDotGrammar', 'Detta är en mening.')
  it('Initial active token', () => {
    expect(tokenizer.activeToken.tokenType).equal('WORD')
    expect(tokenizer.activeToken.tokenValue).equal('Detta')
  })
  it('Move active token to next token', () => {
    const activeToken = tokenizer.getNextToken()
    expect(activeToken.tokenType).equal('WORD')
    expect(activeToken.tokenValue).equal('är')
  })
  it('Move active token to previous token', () => {
    const activeToken = tokenizer.getPreviousToken()
    expect(activeToken.tokenType).equal('WORD')
    expect(activeToken.tokenValue).equal('Detta')
  })
  it('Last token is END', () => {
    let activeToken
    for (let i = 0; i < tokenizer.matchingTokens.length - 1; i++) {
      activeToken = tokenizer.getNextToken()
    }
    expect(activeToken.tokenType).equal('END')
    expect(activeToken.tokenValue).equal('')
  })
  it('Not possible move past last token', () => {
    const activeToken = tokenizer.getNextToken()
    expect(activeToken.tokenType).equal('END')
    expect(activeToken.tokenValue).equal('')
  })
})

describe('ArithmeticGrammar', () => {
  const tokenizer = new Tokenizer('ArithmeticGrammar', '3 + 4')
  it('Initial active token', () => {
    expect(tokenizer.activeToken.tokenType).equal('NUMBER')
    expect(tokenizer.activeToken.tokenValue).equal(3)
  })
  it('Move active token to next token', () => {
    const activeToken = tokenizer.getNextToken()
    expect(activeToken.tokenType).equal('ADD')
    expect(activeToken.tokenValue).equal('+')
  })
  it('Move active token to previous token', () => {
    const activeToken = tokenizer.getPreviousToken()
    expect(activeToken.tokenType).equal('NUMBER')
    expect(activeToken.tokenValue).equal(3)
  })
  it('Last token is END', () => {
    let activeToken
    for (let i = 0; i < tokenizer.matchingTokens.length - 1; i++) {
      activeToken = tokenizer.getNextToken()
    }
    expect(activeToken.tokenType).equal('END')
    expect(activeToken.tokenValue).equal('')
  })
  it('Not possible move past last token', () => {
    const activeToken = tokenizer.getNextToken()
    expect(activeToken.tokenType).equal('END')
    expect(activeToken.tokenValue).equal('')
  })
})
