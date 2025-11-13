### Goal

Create a **human-readable pattern-matching system** that can initially serve as a **friendly interface to regular expressions**, but later evolve into its own **regex-free matching engine**.  
The focus is on **lightweight, intuitive pattern definition** for everyday text searching — “find me this in that” — without the cryptic syntax of regex.

### Core Idea

Humans think of text matching as a sequence of expectations:

> “Start at the beginning, look for this word, then a space, then some digits, then stop.”

The system should reflect that natural sequential logic. Instead of dense symbolic patterns, it should read like ordered steps.  
Example (conceptual):

```js
pattern()
   .startOfLine()
   .literal('user_')
   .digits().oneOrMore()
   .endOfLine()
```

### Principles

- **Sequential flow:** patterns are written step by step, mirroring human reasoning.
- **Deterministic and parseable:** no free-form natural language, so results are predictable.
- **Readable and explainable:** the pattern can be expressed or exported in YAML or Markdown form.
- **Future-proof:** initially compiles to regex, later can use a custom JS matching engine.
- **Human control:** no AI or fuzzy language parsing — explicit instructions yield explicit results.

### Long-Term Vision

**Phase 1 — Regex Interface:**  
Build the API that converts a readable pattern sequence into a valid regular expression and executes it.
    
**Phase 2 — Native Matcher:**  
Replace regex compilation with a purpose-built pattern engine implemented in pure JavaScript.
    
**Phase 3 — Universal Syntax:**  
Define a language-neutral format (e.g., YAML/Markdown form) so patterns can be shared, parsed, and ported.
    

### Design Vocabulary (initial)

- **Atoms:** `literal()`, `word()`, `digit()`, `space()`, `newline()`
- **Quantifiers:** `.optional()`, `.oneOrMore()`, `.zeroOrMore()`, `.exactly(n)`
- **Boundaries:** `.startOfLine()`, `.endOfLine()`, `.wordBoundary()`
- **Combinators:** `.then()`, `.before()`, `.after()`
- **Captures:** `.captureAs(name)`
- **Flags:** case sensitivity, multiline, global

### Ownership and Development Strategy

The project will be developed as an **independent open-source initiative** (Apache 2 licence).

### Summary of Key Decisions

- Target audience: developers and advanced users who need human-readable text patterning.
- Approach: method chaining syntax (code-friendly, easily serialisable).
- Implementation language: JavaScript (pure, no low-level code required).
- Near-term goal: functional regex abstraction.
- Long-term goal: independent, composable text-matching engine.