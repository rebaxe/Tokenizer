import { Tokenizer } from '../src/Tokenizer.js'
import { expect } from 'chai'

const wordAndDotGrammar = [{
  tokenType: 'WORD',
  tokenRegExp: /^[\w|åäöÅÄÖ]+/
}, {
  tokenType: 'DOT',
  tokenRegExp: /\./
}]

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
  // it('Not possible to move past first token', () => {
  //   const activeToken = tokenizer.getPreviousToken()
  //   expect(activeToken.tokenType).equal('WORD')
  //   expect(activeToken.tokenValue).equal('Detta')
  // })
  // it('Last token is END', () => {
  //   let activeToken
  //   for (let i = 0; i < tokenizer.matchingTokens.length - 1; i++) {
  //     activeToken = tokenizer.getNextToken()
  //   }
  //   expect(activeToken.tokenType).equal('END')
  //   expect(activeToken.tokenValue).equal('')
  // })
  // it('Not possible move past last token', () => {
  //   const activeToken = tokenizer.getNextToken()
  //   expect(activeToken.tokenType).equal('END')
  //   expect(activeToken.tokenValue).equal('')
  // })
})

// describe('ArithmeticGrammar', () => {
//   const tokenizer = new Tokenizer('ArithmeticGrammar', '3 + 4')
//   it('Initial active token', () => {
//     expect(tokenizer.activeToken.tokenType).equal('NUMBER')
//     expect(tokenizer.activeToken.tokenValue).equal(3)
//   })
//   it('Move active token to next token', () => {
//     const activeToken = tokenizer.getNextToken()
//     expect(activeToken.tokenType).equal('ADD')
//     expect(activeToken.tokenValue).equal('+')
//   })
//   it('Move active token to previous token', () => {
//     const activeToken = tokenizer.getPreviousToken()
//     expect(activeToken.tokenType).equal('NUMBER')
//     expect(activeToken.tokenValue).equal(3)
//   })
//   it('Not possible to move past first token', () => {
//     const activeToken = tokenizer.getPreviousToken()
//     expect(activeToken.tokenType).equal('NUMBER')
//     expect(activeToken.tokenValue).equal(3)
//   })
//   it('Last token is END', () => {
//     let activeToken
//     for (let i = 0; i < tokenizer.matchingTokens.length - 1; i++) {
//       activeToken = tokenizer.getNextToken()
//     }
//     expect(activeToken.tokenType).equal('END')
//     expect(activeToken.tokenValue).equal('')
//   })
//   it('Not possible move past last token', () => {
//     const activeToken = tokenizer.getNextToken()
//     expect(activeToken.tokenType).equal('END')
//     expect(activeToken.tokenValue).equal('')
//   })
// })
