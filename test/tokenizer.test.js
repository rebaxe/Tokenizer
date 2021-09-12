import { Tokenizer } from '../src/Tokenizer.js'
import { expect } from 'chai'

describe('Test WordAndDotGrammar', () => {
  const tokenizer = new Tokenizer('WordAndDotGrammar', 'Detta är en mening.')
  it('Look at initial active token', () => {
    expect(tokenizer.activeToken.tokenType).equal('WORD')
    expect(tokenizer.activeToken.tokenValue).equal('Detta')
  })
  it('Move active token to next token', () => {
    tokenizer.getNextToken()
    expect(tokenizer.activeToken.tokenType).equal('WORD')
    expect(tokenizer.activeToken.tokenValue).equal('är')
  })
  it('Move active token to previous token', () => {
    tokenizer.getPreviousToken()
    expect(tokenizer.activeToken.tokenType).equal('WORD')
    expect(tokenizer.activeToken.tokenValue).equal('Detta')
  })
})

describe('Test ArithmeticGrammar', () => {
  const tokenizer = new Tokenizer('ArithmeticGrammar', '3 + 4')
  it('Look at initial active token', () => {
    expect(tokenizer.activeToken.tokenType).equal('NUMBER')
    expect(tokenizer.activeToken.tokenValue).equal(3)
  })
  it('Move active token to next token', () => {
    tokenizer.getNextToken()
    expect(tokenizer.activeToken.tokenType).equal('ADD')
    expect(tokenizer.activeToken.tokenValue).equal('+')
  })
  it('Move active token to previous token', () => {
    tokenizer.getPreviousToken()
    expect(tokenizer.activeToken.tokenType).equal('NUMBER')
    expect(tokenizer.activeToken.tokenValue).equal(3)
  })
})
