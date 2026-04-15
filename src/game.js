import { TEXTS, ALL_CHUNKS } from './data/texts.js'

const STORAGE_KEY = 'ulkolaksyt_progress'

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? { completed: [], sessions: {}, history: {} }
  } catch {
    return { completed: [], sessions: {}, history: {} }
  }
}

function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

// ── Distractor selection ──────────────────────────────────────────────────────

function pickDistractors(correctChunk, textId) {
  const avoidIds   = new Set([correctChunk.id])
  const avoidTexts = new Set([correctChunk.text])

  const sameType = ALL_CHUNKS.filter(c => {
    if (avoidIds.has(c.id) || avoidTexts.has(c.text)) return false
    if (c.type !== correctChunk.type) return false
    if (c.textId === textId) {
      const text = TEXTS.find(t => t.id === textId)
      const idx  = text.chunks.findIndex(x => x.id === correctChunk.id)
      const cidx = text.chunks.findIndex(x => x.id === c.id)
      if (Math.abs(idx - cidx) <= 2) return false
    }
    return true
  })

  const fallback = ALL_CHUNKS.filter(c => {
    if (avoidIds.has(c.id) || avoidTexts.has(c.text)) return false
    if (c.textId === textId) return false
    return true
  })

  const pool     = sameType.length >= 2 ? sameType : [...sameType, ...fallback]
  const shuffled = pool.sort(() => Math.random() - 0.5)
  const chosen   = []

  for (const c of shuffled) {
    if (avoidIds.has(c.id) || avoidTexts.has(c.text)) continue
    avoidIds.add(c.id)
    avoidTexts.add(c.text)
    chosen.push(c)
    if (chosen.length === 2) break
  }
  return chosen
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// ── Game factory ──────────────────────────────────────────────────────────────

export function createGame(textId) {
  const textDef = TEXTS.find(t => t.id === textId)
  if (!textDef) throw new Error(`Unknown text: ${textId}`)

  const progress = loadProgress()
  const session  = progress.sessions[textId] ?? { position: 0, errors: 0, erroneousChunks: 0 }

  const state = {
    textId,
    textDef,
    position:        session.position,
    errors:          session.errors,
    erroneousChunks: session.erroneousChunks ?? 0,
    startTime:       null,   // set on first attempt
    round:           null,   // { correct, choices:[{chunk, state}], hadError }
    finished:        false,
  }

  // ── Persistence ─────────────────────────────────────────────────────────────

  function persist(completionSeconds = null) {
    const p = loadProgress()
    p.sessions[textId] = {
      position:        state.position,
      errors:          state.errors,
      erroneousChunks: state.erroneousChunks,
    }

    if (state.finished) {
      const wasComplete = p.completed.includes(textId)
      if (!wasComplete) {
        p.completed.push(textId)

        if (!p.history)           p.history = {}
        if (!p.history[textId])   p.history[textId] = { scores: [], times: [], bestPerfect: null }

        const h     = p.history[textId]
        const score = Math.round(
          ((textDef.chunks.filter(c => !c.fixed).length - state.erroneousChunks)
            / textDef.chunks.filter(c => !c.fixed).length) * 100
        )
        h.scores.push(score)
        if (h.scores.length > 5) h.scores.shift()

        if (completionSeconds !== null) {
          h.times.push(completionSeconds)
          if (h.times.length > 5) h.times.shift()

          if (state.erroneousChunks === 0) {
            if (h.bestPerfect === null || completionSeconds < h.bestPerfect) {
              h.bestPerfect = completionSeconds
            }
          }
        }
      }
    }
    saveProgress(p)
  }

  // ── Round building ───────────────────────────────────────────────────────────

  function buildRound() {
    // Auto-skip fixed chunks (commandment numbers etc.)
    while (
      state.position < textDef.chunks.length &&
      textDef.chunks[state.position].fixed
    ) {
      state.position++
    }

    if (state.position >= textDef.chunks.length) {
      state.finished = true
      state.round    = null
      return   // persist is called from attempt() with timing
    }

    const correct    = textDef.chunks[state.position]
    const distractors = pickDistractors(correct, textId)
    const choices    = shuffle([
      { chunk: correct, state: 'idle' },
      ...distractors.map(c => ({ chunk: c, state: 'idle' })),
    ])
    state.round = { correct, choices, hadError: false }
  }

  // ── Attempt ──────────────────────────────────────────────────────────────────

  function attempt(chunkId) {
    if (!state.round) return { result: 'no_round' }
    const choice = state.round.choices.find(c => c.chunk.id === chunkId)
    if (!choice || choice.state === 'wrong') return { result: 'already_wrong' }

    // Record start time on very first interaction
    if (!state.startTime) state.startTime = Date.now()

    if (chunkId === state.round.correct.id) {
      if (state.round.hadError) state.erroneousChunks++
      state.position++
      buildRound()

      if (state.finished) {
        const secs = Math.round((Date.now() - state.startTime) / 1000)
        persist(secs)
        return { result: 'correct', completionSeconds: secs }
      }
      persist()
      return { result: 'correct', completionSeconds: null }
    } else {
      choice.state        = 'wrong'
      state.round.hadError = true
      state.errors++
      persist()
      return { result: 'wrong', completionSeconds: null }
    }
  }

  // ── Restart (back to menu — keeps history & completed) ───────────────────────

  function restart() {
    state.position        = 0
    state.errors          = 0
    state.erroneousChunks = 0
    state.finished        = false
    state.startTime       = null
    const p = loadProgress()
    delete p.sessions[textId]
    saveProgress(p)
    buildRound()
  }

  // ── Reset (retry — clears completed so badge resets) ─────────────────────────

  function reset() {
    restart()
    const p = loadProgress()
    p.completed = p.completed.filter(id => id !== textId)
    saveProgress(p)
    buildRound()
  }

  buildRound()
  return { state, attempt, restart, reset }
}

// ── Public helpers ────────────────────────────────────────────────────────────

export function getProgress() { return loadProgress() }
export function getTexts()    { return TEXTS }

export function getMovingAverage(textId) {
  const h = loadProgress().history?.[textId]
  if (!h?.scores?.length) return null
  return Math.round(h.scores.reduce((a, b) => a + b, 0) / h.scores.length)
}

/** Moving average of last-5 completion times in seconds, or null. */
export function getAverageTime(textId) {
  const h = loadProgress().history?.[textId]
  if (!h?.times?.length) return null
  return Math.round(h.times.reduce((a, b) => a + b, 0) / h.times.length)
}

/** Fastest perfect-run time in seconds, or null. */
export function getBestPerfectTime(textId) {
  return loadProgress().history?.[textId]?.bestPerfect ?? null
}
