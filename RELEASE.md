# Mall för inlämning laboration 1, 1dv610

## Checklista
  - [x] I min tokeniserare finns inga tokentyper eller reg-exp. Dessa finns i mitt testprojekt eftersom de skapas utav användaren.
  - [x] Jag har skrivit all kod och reflektioner själv. Jag har inte använt mig av andras kod för att lösa uppgiften.
  - [x] Mina testresultat är skrivna utifrån utförd testning ( och inte teoretiskt, det bör fungera :) )
  - [x] De enda statiska metoder eller funktioner utanför klasser som jag har är för att starta upp min testapplikation ex main(java).
  - [x] De enda bibliotek och färdiga klasser som används är sådana som måste användas (eller som används för att testa modulen).

## Egenskattning och mål
  - [ ] Jag är inte klar eftersom jag vet att jag saknar något. Då skall du inte lämna in!
  - [ ] Jag eftersträvar med denna inlämning godkänt betyg (E-D)
    - [ ] De flesta testfall fungerar
    - [ ] Koden är förberedd på Återanvändning
    - [ ] All kod samt historik finns i git 
    - [ ] Kodkvaliterskraven är ifyllda
    - [ ] Reflektion är skriven
  - [x] Jag eftersträvar med denna inlämning högre betyg (C-B) och anser mig uppfylla alla extra krav för detta. 
    - [x] Samtliga testfall är skrivna
    - [x] Egna testfall för Maximal munch och kantfall
    - [x] Testfall är automatiserade
    - [ ] Det finns en tydlig beskrivning i hur modulen skall användas (i git)
    - [x] Kodkvalitetskraven är varierade 
  - [ ] Jag eftersträvar med denna inlämning högsta betyg (A) 

Förtydligande: Examinator kommer sätta betyg oberoende på vad ni anser. 

## Återanvändning
*Beskriv hur du anpassat din kod och instruktioner för att någon annan programmerare skall kunna använda din tokenizer. Om du skrivit instruktioner för din användare länka till dessa. Om inte beskriv här hur någon skall göra för att använda din kod med sin egen grammatik.*
Följande instruktioner är hämtat från repositoriets readme-fil: 

### How to use the tokenizer:
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

### Methods
`tokenize()`
The method that analyzes the given string according to the given grammar.
If the string contains characters that does not match the given grammar - an error will be thrown.

`currentActiveToken`
Returns the current active token.
The last token is always END.

`moveToNextToken()`
Moves active token one step forward. Does not return a token.
You can not move past the END token.

`moveToPreviousToken()`
Moves active token one step backwards. Does not return a token.
You can not move past the first token.

### Examples
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

// Analyze your string for tokens.
tokenizer.tokenize()

// Get the active token:
const activeToken = tokenizer.currentActiveToken

// Get the next token:
tokenizer.moveToNextToken()
const nextActiveToken = tokenizer.currentActiveToken()

// Get the previous token:
tokenizer.moveToPreviousToken()
const previousActiveToken = tokenizer.currentActiveToken()

```

## Beskrivning av min kod
Min kod använder sig av tre klasser: Tokenizer, Token och Grammar. 
Tokenizer är själv tokeniseraren till vilken det skickas in två argument - en array med Grammar-objekt och en sträng. Tokenizer kommer sedan gå igenom strängen och jämföra den emot de reguljära uttryck som givits i grammatiken. Utefter de matchningar som finns i strängen skapas då instanser av Token som sedan lagras i en array.

Tokenizer har fyra publika metoder: 
- tokenize: initierar sjäva analysen av strängen och orkestrerar flödet
- currentActiveToken: en getter som returnerar det Token-objekt som förnuvarande är valt som aktivt
- moveToNextToken: väljer nästa token som aktivt, metoden returnerar ingenting
- moveToPreviousToken: väljer föregående token som aktivt, metoden returnerar ingenting

## Hur jag testat
Jag har använt mig av Mocha och Chai för att köra automatiska tester.
Tidigt i processen skrev jag automatiska tester som jag sedan har kunnat köra regelbundet under tiden jag skrivit koden. På det viset har jag kunnat köra tester, skriva kod och sen se om testerna gå igenom och på så vis försäkrat mig om att koden fungerat.


### Testfall
Lista de enskilda testfallen. **Fetmarkera** sådant som du själv fyllt i. En rad per testfall.

| Namn      | Grammatik | Sträng | Sekvens | Förväntat Aktivt Token | PASS/FAIL |
| --------- | --------- | ------ | ------- | ------------ | --------- |
|  TC1      |wordAndDot |"a"     |[]       | WORD("a")    | PASS      |
|  TC2      |wordAndDot |"a aa"  |[>]      | WORD("aa")   | PASS      |
|  TC3      |wordAndDot |"a.b"   |[>]      | DOT(".")     | PASS      |
|  TC4      |wordAndDot |"a.b"   |[>>]     | **WORD("b")**| PASS      |
|  TC5      |wordAndDot |"aa. b" |**[>>>]**| WORD("b")    | PASS      |
|  TC6      |wordAndDot |"a .b"  |[>><]    | DOT(".")     | PASS      |
|  TC7      |wordAndDot |""      |[]       | END          | PASS      |
|  TC8      |wordAndDot |" "     |[]       | **END**      | PASS      |
|  TC9      |wordAndDot |"a"     |**[>]**  | END          | PASS      |
|  TC10     |wordAndDot |"a"     |[<]      | **WORD("a")**| PASS      |
|  TC11     |wordAndDot |"!"     |[]       | Error        | PASS      |
|  TC12     |arithmetic |"3"     |[]       | NUMBER("3")  | PASS      |
|  TC13     |arithmetic |"3.14"  |[]       | NUMBER("3.14")| PASS      |
|  TC14     |arithmetic |"3 + 54 * 4"|[>>>]| MUL("*")     | PASS      |
|  TC15     |arithmetic |"3+5 # 4"|[>>>]   | **Error**    | PASS      |
|  TC16     |arithmetic |"3.0+54.1+4.2"|[><>>>]| ADD("+") | PASS      |

Du kan tillföra kommentarer om din tokeniserare skiljer sig något från standard. 

### Testfall för högre betyg

Lista de enskilda testfallen. En rad per testfall.
| Namn      | Grammatik | Sträng | Sekvens | Förväntat Aktivt Token | PASS/FAIL |
| --------- | --------- | ------ | ------- | ------------ | --------- |
|  TC17 - Tokenizer should move one step forward and identify SUB  |advancedArithmetic| "3 - 1" | [>] |SUB("-") | PASS |
|  TC18 - Tokenizer should identify LEFTPAR | advancedArithmetic| "(3 + 4) * 54" | [] |LEFTPAR("(") | PASS |
|  TC19 - Tokenizer should move four steps forward and identify RIGHTPAR |advancedArithmetic| "(3 + 4) * 54" | [] |RIGHTPAR(")") | PASS |
|  TC20 - Tokenizer should identify DIV |advancedArithmetic| "14 / 2" | [] |DIV("/") | PASS |
|  TC21 - Tokenizer should not move past END | wordAndDot | "b" | [>] | END | PASS |
|  TC22 - Tokenizer should not move past first token | wordAndDot | "b" | [<] | WORD("b") | PASS |
|  TC23 - Tokenizer should choose longest match | maximalMunch | "3.14" | [] | FLOAT("3.14") | PASS |
|           |           |        |         |              |           |

## Kodkvalitetskrav
### Namngivning

| Namn och förklaring  | Reflektion                                   |
| -------------------  | ---------------------------------------------|
| ```Tokenizer``` - namn på huvudklassen. | **Class names**: Ett klassnamn ska vara ett substantiv.  |
| ```Tokenizer.tokenize()``` - namn på metoden som kör och orkestrerar själva tokenizern. | **Use Problem Domain Names**: Detta metodnamn har jag haft svårast att "förklara" varför jag döpt som jag gjort. Men det jag landade i är att jag har utgått ifrån problemdomänen. Metoden är den som kör igång och orkestrerar sjävlva tokeniseringen genom att anropa tokeniserarens olika metoder i rätt ordning. Så min tanke är att tokeniserarens uppgift är att tokenisera en sträng och därmed blev namnet tokenize. |
| ```Tokenizer.currentActiveToken``` - namn på en getter som returnerar det token som är aktivt.  | **Add meaningful context**: Även om jag här kanske inte lägger till ett prefix som föreslaget i boken, väljer jag att ge namnet currentActiveToken och inte bara det kortare currentActive. I modulens nuvarande utseende finns inte något annat som skulle kunna vara aktivt, men jag tycker detta tillför en tydlighet där läsaren inte ens behöver fundera på vad det är som är aktivt utan det är tydligt att det handlar om ett token. |
| ```Tokenizer.moveToNextToken()``` - namn på metod som flyttar aktivt token ett steg framåt. |  **Method names**: Metoder namnges med verb. |
| ```Tokenizer.moveToPreviousToken()``` - namn på metod som flyttar aktivt token ett steg bakåt. | **Use Intention-Revealing Names**: Namngivningen tycker jag antyder tydligt på vilken funktionalitet som metoden utför. Förflyttning till föregående token. Namnet har genomgått några iterationer för att uppfylla detta krav - från början hade jag med 'get' i namnet, ngt som jag sedan arbetat bort för att inte missleda läsaren till att tro att funktionen returnerar något. För ännu större tydlighet hade namnet kunnat vara 'moveActiveTokenToPrevoiusToken'. |

### Funktioner

| Metodnamn och förklaring  | Reflektion                                   |
| -------------------  | ---------------------------------------------|
| ```Tokenizer._compareStringToGrammar()```: en metod som utför själva analysen av strängen. |  **Command Query Separation**:  Denna metod returnerar ingenting, utan håller sig till att utföra ngt och då ändra state hos objektet. <br><br> Detta är en metod som jag försökt att bryta ner i mindre delar, men tillslut nådde en punkt där jag inte kunde göra det utan att bryta mot andra regler för funktioner med komplexa funktionsanrop och returvärden som följd. Detta är tokeniserarens viktigaste metod som håller huvuddelen av logiken för själva analysen av strängen och i nuläget är beroende av tillgång till två lokala variabler. Dessa skulle jag ha kunnat göra om till ett objekt för att endast ha ett argument att skicka vidare. <br><br>**Blocks and Indenting**: Enligt boken ska en funktion ha maximalt en eller två indenteringar. Denna metod har alltså två indenteringar nu, från att tidigare varit mer komplex. Jag tycker fortfarande att metoden är lite svår att läsa med två indenteringar, men som ovan nämnt har jag inte lyckats hitta ett bra sätt att förenkla den. |
| ```Tokenizer._findMatchingToken(grammar)```: en metod som jämför strängen som ska analyseras mot en given grammatik och returnerar en sträng med matchande tecken. | **Function arguments**: En monodiadisk funktion. <br> Genom JSDOC-kommentar förtydligas att detta argument ska vara av typen object.|
| ```Tokenizer.tokenize()```: metoden som kör och orkestrerar själva tokenizern. | **Small**: genom att bryta ut de olika steg som skall genomföras vid tokenisering av strängen till egna funktioner har jag kunnat korta ner denna metod till endast fyra rader.<br>**One Level of Abstraction**: i denna metod anropas andra metoder i tur och ordning, all kod i metoden håller en och samma höga abstraktionsnivå vilket gör den tydlig att läas och följa. |
|```Tokenizer.moveToNextToken()```: en metod som flyttar aktivt token ett steg framåt. | **Do one thing**: funktionen gör helt enkelt en sak - uppdaterar det token som är aktivt till nästa (om det är möjligt). |
| ```Tokenizer.moveToPreviousToken()```: en metod som flyttar aktivt token ett steg framåt. | **Function arguments**: Funktionen tar inga argument. Genom att använda variabler som kan nås av alla metoder i objektet behöver inga argument skickas med till funktionen och detta bidrar till en högre abstraktion.

## Laborationsreflektion
Överlag har namngivning varit något jag reflekterat mycket över i den här uppgiften. Oavsett om metoder är publika eller ej har jag verkligen försökt att ha en åtanke med varje namn som jag givit mina klasser, variabler och metoder. Om jag tänker tillbaka på tidigare kod jag skrivit har jag absolut även då försökt att välja namn som säger något eller passar in i sammanhanget - men genom att verkligen ha det som en del av uppgiften har namngivningen lyfts till en ny nivå i mitt kodskrivande. Det kommer jag ta med mig. 

Vad gäller utformningen av metoderna i min kod har jag ofta börjat skriva en större funktion varifrån jag sedan refaktorerat ut mindre funktioner. Jag har verkligen tänkt över att applicera command query separation för metoderna. Tidigare har jag främst försökt bryta ut delar av funktioner för sådana uppgifter som utförs flera gånger, dvs enligt DRY-principen. Men genom att nu se till att funktioner inte kan BÅDE returnera och ändra ett state upplever jag också förbättrat kvalitén av min kod avsevärt. 

Metoden ```Tokenizer._compareStringToGrammars``` är jag inte nöjd med. Jag tycker koden är lite svår att läsa då det är en for-loop med en if-sats i. Raderna är ganska långa och metoder anropas med flera argument. Alla metoder som anropas har inte de mest förklarande namnen, t ex _applyMaximalMunch och _handleNoMatch. När själva tokeniseraren ska återanvändas av en annan programmerare kommer detta inte spela någon roll eftersom ingen av dessa metoder är publika - men om en annan programmerare skulle underhålla min kod hade namnen behövt vara mer förklarande. 

Jag upplever själv att min kod är "snyggare" - vilket såklart är ett luddigt begrepp i sammahanget - i slutet av denna uppgift än tidigare. Men det kanske just är detta som säger att koden har genomarbetats mer ur ett kvalitetsperspektiv. Koden känns relativt lätt att följa och läsa. 
