# CLAUDE.md — Ulkoläksyt

## Project
Mobile-first static web app for practising Finnish confirmation camp memorisation texts ("ulkoläksyt"). See PROJECT_BRIEF.md for full spec and Q&A.

## Stack
- Vite + vanilla JS (ES modules)
- No framework
- localStorage for progress
- Static output (dist/)

## File Layout
```
src/
  data/texts.js      ← canonical texts, pre-chunked, chunk type tags
  game.js            ← state machine (current text, position, streak, errors)
  distractors.js     ← phrase-structure-aware distractor selection
  ui.js              ← DOM rendering helpers
  style.css          ← mobile-first, holy + warm-humour aesthetic
index.html
vite.config.js
```

## Chunk Type Tags
Each chunk carries a `type` string (e.g. `"noun"`, `"verb"`, `"adj"`, `"prep"`, `"conj"`, `"adv"`, `"name"`) so distractors share the same syntactic slot and context alone doesn't reveal the answer.

## Distractor Rules
1. Pick 2 distractors from the full chunk pool (all texts).
2. Prefer chunks with matching `type`.
3. Never pick adjacent chunks from the same text (they'd be obvious continuations).
4. Never reuse the correct chunk or already-shown distractors in same round.

## Progress Schema (localStorage key: `ulkolaksyt_progress`)
```json
{
  "completed": ["isa_meidan", "joh_316"],
  "sessions": {
    "apostolinen": { "position": 12, "errors": 3 }
  }
}
```

## Style Notes
- Colour palette: warm parchment (#F5ECD7), deep burgundy (#6B1A2A), gold (#C9A84C), soft cream (#FFF8EE)
- Font: serif for text display, slightly rounded sans for UI
- Tone: reverent but not stuffy — small playful copy ("Oikein! Halleluja 🎺" etc.)
- Animations: gentle fade-in for correct chunks, brief shake + red flash for wrong ones

## Memo (corrections / things not to repeat)
<!-- Add bullet points here when user must correct or repeat something -->
