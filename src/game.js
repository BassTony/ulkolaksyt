import { TEXTS, ALL_CHUNKS } from './data/texts.js'

const STORAGE_KEY = 'ulkolaksyt_progress'

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? { completed: [], sessions: {} }
  } catch {
    return { completed: [], sessions: {} }
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

/** Pick 2 distractors for a given correct chunk, avoiding obvious neighbours */
function pickDistractors(correctChunk, textId, usedIds) {
  const avoid = new Set([correctChunk.id, ...usedIds])
  // Track display texts to avoid showing identical text in the same round
  const avoidTexts = new Set([correctChunk.text])

  // Prefer same type, from any text, not adjacent in same text
  const sameType = ALL_CHUNKS.filter(c => {
    if (avoid.has(c.id)) return false
    if (avoidTexts.has(c.text)) return false
    if (c.type !== correctChunk.type) return false
    // Avoid adjacent chunks in same text
    if (c.textId === textId) {
      const text = TEXTS.find(t => t.id === textId)
      const idx = text.chunks.findIndex(x => x.id === correctChunk.id)
      const cidx = text.chunks.findIndex(x => x.id === c.id)
      if (Math.abs(idx - cidx) <= 2) return false
    }
    return true
  })

  // Fallback pool: different type but from different text, still no duplicate text
  const fallback = ALL_CHUNKS.filter(c => {
    if (avoid.has(c.id)) return false
    if (avoidTexts.has(c.text)) return false
    if (c.textId === textId) return false
    return true
  })

  const pool = sameType.length >= 2 ? sameType : [...sameType, ...fallback]

  const chosen = []
  const seen = new Set()
  const shuffled = pool.sort(() => Math.random() - 0.5)
  for (const c of shuffled) {
    if (seen.has(c.id)) continue
    if (avoidTexts.has(c.text)) continue   // guard against duplicates in chosen
    seen.add(c.id)
    avoidTexts.add(c.text)
    chosen.push(c)
    if (chosen.length === 2) break
  }
  return chosen
}

/** Shuffle an array in place */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function createGame(textId) {
  const textDef = TEXTS.find(t => t.id === textId)
  if (!textDef) throw new Error(`Unknown text: ${textId}`)

  const progress = loadProgress()
  const session = progress.sessions[textId] ?? { position: 0, errors: 0, erroneousChunks: 0 }

  const state = {
    textId,
    textDef,
    position: session.position,
    errors: session.errors,
    erroneousChunks: session.erroneousChunks ?? 0,
    round: null,      // { correct, choices: [{chunk, state:'idle'|'wrong'}], hadError: bool }
    finished: false,
  }

  function persist() {
    const p = loadProgress()
    p.sessions[textId] = {
      position: state.position,
      errors: state.errors,
      erroneousChunks: state.erroneousChunks,
    }
    if (state.finished) {
      const wasAlreadyCompleted = p.completed.includes(textId)
      if (!wasAlreadyCompleted) {
        p.completed.push(textId)
        // Record attempt score (first-attempt accuracy) — keep last 5
        const score = (textDef.chunks.length - state.erroneousChunks) / textDef.chunks.length
        if (!p.history) p.history = {}
        if (!p.history[textId]) p.history[textId] = []
        p.history[textId].push(Math.round(score * 100))
        if (p.history[textId].length > 5) p.history[textId].shift()
      }
    }
    saveProgress(p)
  }

  function buildRound() {
    if (state.position >= textDef.chunks.length) {
      state.finished = true
      state.round = null
      persist()
      return
    }

    const correct = textDef.chunks[state.position]
    const distractors = pickDistractors(correct, textId, [])
    const choices = shuffle([
      { chunk: correct, state: 'idle' },
      ...distractors.map(c => ({ chunk: c, state: 'idle' })),
    ])

    state.round = { correct, choices, hadError: false }
  }

  function attempt(chunkId) {
    if (!state.round) return 'no_round'
    const choice = state.round.choices.find(c => c.chunk.id === chunkId)
    if (!choice || choice.state === 'wrong') return 'already_wrong'

    if (chunkId === state.round.correct.id) {
      if (state.round.hadError) state.erroneousChunks++
      state.position++
      persist()
      buildRound()
      return 'correct'
    } else {
      choice.state = 'wrong'
      state.round.hadError = true
      state.errors++
      persist()
      return 'wrong'
    }
  }

  function reset() {
    state.position = 0
    state.errors = 0
    state.erroneousChunks = 0
    state.finished = false
    const p = loadProgress()
    delete p.sessions[textId]
    p.completed = p.completed.filter(id => id !== textId)
    saveProgress(p)
    buildRound()
  }

  // Initialise first round
  buildRound()

  return { state, attempt, reset, buildRound }
}

export function getProgress() {
  return loadProgress()
}

/** Moving average of last-5 attempt scores (0–100) for a given text. Returns null if no history. */
export function getMovingAverage(textId) {
  const p = loadProgress()
  const hist = p.history?.[textId]
  if (!hist || hist.length === 0) return null
  return Math.round(hist.reduce((a, b) => a + b, 0) / hist.length)
}

export function getTexts() {
  return TEXTS
}
