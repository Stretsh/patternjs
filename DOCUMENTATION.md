# PatternJS Documentation

## Overview

**PatternJS** is a human-readable pattern-matching system designed to replace regular expressions with an intuitive, sequential API. The project is currently in **Phase 1: Regex Interface**, where it serves as a friendly abstraction layer that compiles readable patterns into regular expressions.

## Core Philosophy

PatternJS transforms the cryptic syntax of regex into a natural, step-by-step pattern definition that mirrors human thinking:

**Instead of:** `^user_\d+$`  
**PatternJS:** `pattern().startOfLine().literal('user_').digit().oneOrMore().endOfLine()`

The system follows these principles:

- **Sequential flow:** Patterns are written step-by-step, mirroring human reasoning
- **Deterministic and parseable:** No free-form natural language; explicit instructions yield predictable results
- **Readable and explainable:** Patterns can be understood at a glance
- **Future-proof:** Currently compiles to regex, but designed to evolve into a native matching engine

## Current Architecture

### Core Components

The project is organized into modular components:

1. **`Pattern` class** (`src/core/Pattern.js`): Main API entry point
2. **Atoms** (`src/core/atoms.js`): Basic matching units (literal text, digits, words, etc.)
3. **Quantifiers** (`src/core/quantifiers.js`): Repetition modifiers (optional, oneOrMore, etc.)
4. **Boundaries** (`src/core/boundaries.js`): Positional constraints (start/end of line, word boundaries)
5. **Combinators** (`src/core/combinators.js`): Lookahead/lookbehind operations

### API Reference

#### Atoms (Basic Matching Units)

- `literal(value)` - Matches exact text (automatically escapes special characters)
- `word()` - Matches word characters (`\w` in regex)
- `digit(count = 1)` - Matches digits (`\d` in regex)
- `space()` - Matches whitespace (`\s` in regex)
- `newline()` - Matches newline characters (`\n`)

#### Quantifiers (Repetition)

- `optional()` - Makes the previous token optional (`?` in regex)
- `oneOrMore()` - Matches one or more occurrences (`+` in regex)
- `zeroOrMore()` - Matches zero or more occurrences (`*` in regex)
- `repeat(n)` - Matches exactly `n` occurrences (`{n}` in regex)

#### Boundaries (Positional Constraints)

- `startOfLine()` - Matches start of string/line (`^` in regex)
- `endOfLine()` - Matches end of string/line (`$` in regex)
- `wordBoundary()` - Matches word boundaries (`\b` in regex)
- `whole()` - Matches a complete word surrounded by whitespace or string boundaries

#### Combinators (Lookahead/Lookbehind)

- `then()` - Cosmetic method for readability (no-op)
- `before(regexOrPattern)` - Positive lookahead (`(?=...)` in regex)
- `after(regexOrPattern)` - Positive lookbehind (`(?<=...)` in regex)

#### Flags

- `caseInsensitive()` - Case-insensitive matching (`i` flag)
- `multiline()` - Multiline mode (`m` flag)
- `global()` - Global matching (`g` flag)

#### Compilation & Execution

- `toRegexString()` - Returns the compiled regex string
- `toRegex()` - Returns a JavaScript `RegExp` object
- `test(input)` - Tests if the pattern matches the input string

## Current Implementation Status

### ✅ Implemented Features

1. **Atoms**: All basic atoms are implemented and tested
   - `literal()`, `word()`, `digit()`, `space()`, `newline()`

2. **Quantifiers**: All quantifiers are implemented
   - `optional()`, `oneOrMore()`, `zeroOrMore()`, `repeat(n)`
   - Automatic grouping for complex tokens

3. **Boundaries**: Basic boundaries implemented
   - `startOfLine()`, `endOfLine()`, `wordBoundary()`, `whole()`

4. **Combinators**: Lookahead/lookbehind implemented
   - `before()`, `after()`, `then()`
   - Accepts both regex strings and Pattern instances

5. **Flags**: All standard flags implemented
   - `caseInsensitive()`, `multiline()`, `global()`
   - Flag deduplication logic

6. **Core Pattern Class**: Main API is functional
   - Method chaining
   - Token accumulation
   - Regex compilation

### ⚠️ Known Issues

1. **Test Failures**: Some tests are currently failing:
   - `boundaries.test.js`: `digit(3)` method doesn't exist (should use `digit().repeat(3)`)
   - `whole.test.js`: `whole()` implementation may need refinement
   - `usecase_cat_digits.test.js`: Pattern matching issues

2. **Missing Export**: `src/index.js` is incomplete (only imports Pattern, doesn't export)

### ❌ Missing Features for Phase 1 (Regex Interface)

#### Critical Missing Features

1. **Captures/Named Groups** ⚠️
   - **Status**: Mentioned in README but not implemented
   - **Required**: `.captureAs(name)` method to create named capture groups
   - **Regex equivalent**: `(?<name>...)` or `(?:...)` with named groups
   - **Use case**: Extracting specific parts of matches

2. **Match/Extract Methods** ⚠️
   - **Status**: Only `test()` exists
   - **Required**:
     - `match(input)` - Return all matches
     - `exec(input)` - Execute and return match details
     - `replace(input, replacement)` - Replace matches
   - **Use case**: Actually using matched data, not just testing

3. **Character Classes** ⚠️
   - **Status**: Not implemented
   - **Required**:
     - `anyOf(chars)` - Character class `[abc]`
     - `noneOf(chars)` - Negated character class `[^abc]`
     - `range(start, end)` - Character range `[a-z]`
   - **Use case**: Matching specific character sets

4. **Alternation** ⚠️
   - **Status**: Not implemented
   - **Required**: `or(pattern)` or `either(pattern1, pattern2)`
   - **Regex equivalent**: `(pattern1|pattern2)`
   - **Use case**: Matching one of several alternatives

5. **Negative Lookahead/Lookbehind** ⚠️
   - **Status**: Only positive lookahead/lookbehind exists
   - **Required**:
     - `notBefore(pattern)` - Negative lookahead `(?!...)`
     - `notAfter(pattern)` - Negative lookbehind `(?<!...)`
   - **Use case**: Matching patterns that are NOT followed/preceded by something

6. **Additional Atoms** ⚠️
   - **Status**: Basic atoms exist, but more are needed
   - **Required**:
     - `any()` - Match any character `.`
     - `tab()` - Match tab character `\t`
     - `whitespace()` - Match any whitespace (already have `space()`)
     - `nonWord()` - Match non-word characters `\W`
     - `nonDigit()` - Match non-digit characters `\D`
     - `nonWhitespace()` - Match non-whitespace `\S`

7. **Quantifier Ranges** ⚠️
   - **Status**: Only exact repeat exists
   - **Required**:
     - `between(min, max)` - Match between min and max occurrences `{min,max}`
     - `atLeast(n)` - Match at least n occurrences `{n,}`
     - `atMost(n)` - Match at most n occurrences `{0,n}`

8. **Non-Greedy Quantifiers** ⚠️
   - **Status**: All quantifiers are greedy
   - **Required**: Lazy versions of quantifiers
   - **Regex equivalent**: `+?`, `*?`, `??`, `{n}?`
   - **Use case**: Matching shortest possible sequences

9. **Backreferences** ⚠️
   - **Status**: Not implemented
   - **Required**: Reference previously captured groups
   - **Regex equivalent**: `\1`, `\2`, etc. or `\k<name>`
   - **Use case**: Matching repeated patterns

10. **Pattern Composition** ⚠️
    - **Status**: Basic composition exists (Pattern instances in combinators)
    - **Required**: Better pattern composition utilities
    - **Use case**: Building reusable pattern components

#### Nice-to-Have Features

1. **Pattern Validation**: Validate patterns before compilation
2. **Pattern Explanation**: Human-readable explanation of what a pattern does
3. **Pattern Visualization**: Visual representation of pattern structure
4. **Export to YAML/Markdown**: Serialize patterns to human-readable formats (mentioned in README)
5. **Pattern Import**: Load patterns from serialized formats
6. **Error Messages**: Better error messages for invalid patterns
7. **Pattern Debugging**: Debug mode to see regex compilation steps

## Module Structure

```
src/
├── core/
│   ├── Pattern.js      # Main Pattern class
│   ├── atoms.js        # Basic matching units
│   ├── quantifiers.js  # Repetition modifiers
│   ├── boundaries.js   # Positional constraints
│   └── combinators.js  # Lookahead/lookbehind
├── utils/              # (empty - for future utilities)
└── index.js            # (incomplete - needs exports)
```

## Testing Status

- **Total Tests**: 28 tests across 9 test suites
- **Passing**: 25 tests
- **Failing**: 3 tests (boundaries, whole, usecase_cat_digits)
- **Coverage**: Good coverage of implemented features

## Usage Examples

### Basic Pattern Matching

```javascript
import { Pattern } from './src/core/Pattern.js'

// Match "user_" followed by one or more digits
const pattern = new Pattern().literal('user_').digit().oneOrMore()

pattern.test('user_123') // true
pattern.test('user_abc') // false
```

### With Boundaries

```javascript
// Match exactly "cat" as a whole word
const pattern = new Pattern().wordBoundary().literal('cat').wordBoundary()

pattern.test('cat') // true
pattern.test('a cat b') // true
pattern.test('scatter') // false
```

### With Quantifiers

```javascript
// Match optional "http://" followed by domain
const pattern = new Pattern()
  .literal('http://')
  .optional()
  .word()
  .oneOrMore()
  .literal('.com')

pattern.test('example.com') // true
pattern.test('http://example.com') // true
```

### With Flags

```javascript
// Case-insensitive matching
const pattern = new Pattern().literal('hello').caseInsensitive()

pattern.test('Hello') // true
pattern.test('HELLO') // true
```

## Next Steps for Phase 1 Completion

### Priority 1: Critical Missing Features

1. Implement captures/named groups (`.captureAs(name)`)
2. Add `match()`, `exec()`, and `replace()` methods
3. Implement character classes (`anyOf`, `noneOf`, `range`)
4. Add alternation (`or()` or `either()`)
5. Add negative lookahead/lookbehind

### Priority 2: Important Features

6. Add more atoms (`.any()`, `.tab()`, `.nonWord()`, etc.)
7. Implement quantifier ranges (`between()`, `atLeast()`, `atMost()`)
8. Add non-greedy quantifiers
9. Implement backreferences

### Priority 3: Polish & Enhancement

10. Fix existing test failures
11. Complete `src/index.js` exports
12. Add pattern validation
13. Add pattern explanation/visualization
14. Implement YAML/Markdown export (mentioned in README)

## Migration Path

Once Phase 1 is complete, the project can move to:

- **Phase 2**: Replace regex compilation with native JavaScript matching engine
- **Phase 3**: Universal syntax format (YAML/Markdown) for pattern portability

## Conclusion

PatternJS is a well-structured project with a solid foundation. The core API is functional and intuitive. To complete Phase 1 (Regex Interface), the main gaps are:

1. **Captures** - Essential for extracting matched data
2. **Match/Extract methods** - Needed to actually use matches
3. **Character classes and alternation** - Common regex patterns
4. **Negative lookahead/lookbehind** - Complete the combinator set
5. **Additional atoms and quantifiers** - Cover more regex use cases

The project is approximately **60-70% complete** for Phase 1, with the core architecture and most basic features in place.
