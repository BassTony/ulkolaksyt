# Ulkoläksyt — Project Brief

## Discovery Q&A

**Q1: Which texts should be included?**
Canonical set (hard-coded for now, architecture must allow easy additions):
- Isä meidän (Lord's Prayer)
- Apostolinen uskontunnustus (Apostles' Creed)
- Kymmenen käskyä (Ten Commandments)
- Joh. 3:16 (pienoisevankeliumi)
- Matt. 28:18–20 (Kaste- ja lähetyskäsky)
- Herran siunaus

**Q2: Languages?**
Finnish only for now.

**Q3: Distractor source for wrong answer alternatives?**
Both same-text chunks and cross-text chunks.

**Q4: Progress tracking across sessions?**
Yes — via localStorage.

**Q5: Text selection?**
User chooses which text to practice from a menu.

**Q6: Layout priority?**
Mobile-first.

**Q7: Build tooling?**
Build step acceptable.

**Q8: Visual style?**
Extremely holy with a warm humouristic twist.

---

## Game Mechanics (agreed)

- Texts are pre-split into 1–3 word chunks along phrase/syntactic boundaries.
- Each chunk is tagged with a syntactic type so distractors match phrase structure.
- Upper pane: builds the text piece by piece as user selects correctly.
- Lower pane: 3 choices (1 correct + 2 distractors).
- Wrong selection: chunk crossed out in red with error symbol; user continues from remaining 2.
- Correct selection: chunk joins the upper pane; 3 fresh choices appear.
- Session-level progress (current position) and long-term completion state both stored in localStorage.

---

## Tech Stack

- **Bundler:** Vite (vanilla JS, no framework)
- **Language:** JS (ES modules), HTML, CSS
- **Persistence:** localStorage
- **Output:** fully static (can be served from any CDN / GitHub Pages)
