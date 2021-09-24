import { expect } from 'chai'
import { wordAndDotGrammar } from './testGrammars.js'
import { runTokenizer } from '../src/app.js'

describe('Edge Cases Tests', () => {
  it('TC21 - Tokenizer should not move past END', () => {
    const tokenizer = runTokenizer(wordAndDotGrammar, 'b')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('END')
    expect(tokenizer.currentActiveToken.tokenValue).equal('')
  })
  it('TC22 - Tokenizer should not move past first token', () => {
    const tokenizer = runTokenizer(wordAndDotGrammar, 'b')
    tokenizer.tokenize()
    tokenizer.moveToPreviousToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('WORD')
    expect(tokenizer.currentActiveToken.tokenValue).equal('b')
  })
})
