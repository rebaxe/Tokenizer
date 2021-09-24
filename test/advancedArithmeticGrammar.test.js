import { expect } from 'chai'
import { advancedArithmeticGrammar } from './testGrammars.js'
import { runTokenizer } from '../src/app.js'

describe('Advanced Arithmetic Grammar Tests', () => {
  it('TC17 - Tokenizer should move one step forward and identify SUB', () => {
    const tokenizer = runTokenizer(advancedArithmeticGrammar, '3 - 1')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('SUB')
    expect(tokenizer.currentActiveToken.tokenValue).equal('-')
  })
  it('TC18 - Tokenizer should identify PAR', () => {
    const tokenizer = runTokenizer(advancedArithmeticGrammar, '(3 + 4) * 54')
    tokenizer.tokenize()
    expect(tokenizer.currentActiveToken.tokenType).equal('PAR')
    expect(tokenizer.currentActiveToken.tokenValue).equal('(')
  })
  it('TC19 - Tokenizer should move four steps forward and identify PAR', () => {
    const tokenizer = runTokenizer(advancedArithmeticGrammar, '(3 + 4) * 54')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('PAR')
    expect(tokenizer.currentActiveToken.tokenValue).equal(')')
  })
  it('TC20 - Tokenizer should identify DIV', () => {
    const tokenizer = runTokenizer(advancedArithmeticGrammar, '14 / 2')
    tokenizer.tokenize()
    tokenizer.moveToNextToken()
    expect(tokenizer.currentActiveToken.tokenType).equal('DIV')
    expect(tokenizer.currentActiveToken.tokenValue).equal('/')
  })
})
