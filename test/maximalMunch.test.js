import { expect } from 'chai'
import { maximalMunch } from './testGrammars.js'
import { runTokenizer } from '../src/app.js'

describe('Maximal Munch Rule Tests', () => {
  it('TC23 - Tokenizer should choose longest match', () => {
    const tokenizer = runTokenizer(maximalMunch, '3.14')
    tokenizer.tokenize()
    expect(tokenizer.currentActiveToken.tokenType).equal('FLOAT')
    expect(tokenizer.currentActiveToken.tokenValue).equal('3.14')
  })
})
