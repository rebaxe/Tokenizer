# Tokenizer
## How to use the tokenizer:
Import initTokenizer from the app.js file. You can then get a tokenizer object by calling initTokenizer and provide it with two arguments:
1. An array of objects containing the token type and a regular expression. The objects should be formatted like this:
```javascript
const grammarObject = {
  tokenType: 'NUMBER',
  tokenRegExp: /^.*[0-9]/
}
```
2. A string you wish to analyze for matching tokens.

You can then call the methods below on your Tokenizer-object.
## Public interface
### Methods
`currentActiveToken`
Returns the current active token.
The last token is always END.

`moveToNextToken()`
Moves active token one step forward. Does not return a token.
You can not move past the END token.

`moveToPreviousToken()`
Moves active token one step backwards. Does not return a token.
You can not move past the first token.

## Examples

```javascript
import { initTokenizer } from '<filepath>'

const grammars = [{
  tokenType: 'WORD',
  tokenRegExp: /^[\w|åäöÅÄÖ]+/
}, {
  tokenType: 'DOT',
  tokenRegExp: /\./
}]

const tokenizer = initTokenizer(grammars, 'Hello world.')

// To get the active token:

const activeToken = tokenizer.currentActiveToken

// If you wish to get the next token:
tokenizer.moveToNextToken()
const nextActiveToken = tokenizer.currentActiveToken()

// If you wish to get the previous token:
tokenizer.moveToPreviousToken()
const nextActiveToken = tokenizer.currentActiveToken()

```