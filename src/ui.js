import {
  createGame, getProgress, getTexts,
  getMovingAverage, getAverageTime, getBestPerfectTime,
} from './game.js'

let currentGame   = null
let timerInterval = null
let wasOverAverage = false

// ── Formatting helpers ────────────────────────────────────────────────────────

function fmtTime(secs) {
  if (secs === null || secs === undefined) return '—'
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${s}s`
}

// ── Screens ───────────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  document.getElementById(id).classList.add('active')
}

// ── Timer ─────────────────────────────────────────────────────────────────────

const timerEl = document.getElementById('timer')

function startTimer() {
  wasOverAverage = false
  timerEl.className = 'timer timer-visible'
  timerEl.textContent = '0s'
  timerInterval = setInterval(tickTimer, 500)
}

function stopTimer() {
  clearInterval(timerInterval)
  timerInterval = null
  timerEl.className = 'timer'   // hide
}

function tickTimer() {
  if (!currentGame?.state.startTime) return
  const elapsed = Math.round((Date.now() - currentGame.state.startTime) / 1000)
  timerEl.textContent = fmtTime(elapsed)

  const avg = getAverageTime(currentGame.state.textId)
  if (avg === null) return

  if (elapsed > avg && !wasOverAverage) {
    wasOverAverage = true
    timerEl.classList.remove('timer-green')
    timerEl.classList.add('timer-red', 'timer-sparkle')
    timerEl.addEventListener('animationend', () => {
      timerEl.classList.remove('timer-sparkle')
    }, { once: true })
  } else if (elapsed <= avg && !wasOverAverage) {
    timerEl.classList.add('timer-green')
    timerEl.classList.remove('timer-red')
  }
}

// ── Menu ──────────────────────────────────────────────────────────────────────

export function renderMenu() {
  stopTimer()
  const progress = getProgress()
  const texts    = getTexts()
  const list     = document.getElementById('text-list')
  list.innerHTML = ''

  texts.forEach(text => {
    const done       = progress.completed.includes(text.id)
    const inProgress = !done && (progress.sessions[text.id]?.position > 0)
    const avg        = getMovingAverage(text.id)
    const avgTime    = getAverageTime(text.id)
    const best       = getBestPerfectTime(text.id)

    let badgeText
    if (avg !== null) {
      const parts = [`${avg}%`, `⌀ ${fmtTime(avgTime)}`]
      if (best !== null) parts.push(`✦ ${fmtTime(best)}`)
      badgeText = parts.join(' · ')
    } else if (done) {
      badgeText = '✓ Valmis'
    } else if (inProgress) {
      badgeText = 'jatkuu…'
    } else {
      badgeText = 'Aloita'
    }

    const btn = document.createElement('button')
    btn.className = 'text-btn' + (done ? ' done' : '') + (inProgress ? ' in-progress' : '')
    btn.innerHTML = `
      <span class="text-btn-title">${text.title}</span>
      ${text.subtitle ? `<span class="text-btn-sub">${text.subtitle}</span>` : ''}
      <span class="text-btn-badge">${badgeText}</span>
    `
    btn.addEventListener('click', () => startPractice(text.id))
    list.appendChild(btn)
  })

  showScreen('screen-menu')
}

// ── Practice ──────────────────────────────────────────────────────────────────

function startPractice(textId) {
  currentGame = createGame(textId)
  renderPractice()
  showScreen('screen-practice')
  startTimer()
}

function renderPractice() {
  const { state }   = currentGame
  const { textDef, position } = state

  document.getElementById('practice-title').textContent    = textDef.title
  document.getElementById('practice-subtitle').textContent = textDef.subtitle ?? ''

  // Count only interactive chunks for progress
  const interactive = textDef.chunks.filter(c => !c.fixed)
  const doneCount   = textDef.chunks
    .slice(0, position)
    .filter(c => !c.fixed).length
  const pct = Math.round((doneCount / interactive.length) * 100)
  document.getElementById('progress-fill').style.width = pct + '%'
  document.getElementById('progress-label').textContent = `${doneCount} / ${interactive.length}`

  // Upper pane
  const upper = document.getElementById('upper-pane')
  upper.innerHTML = ''

  // buildRound() guarantees position always lands on a non-fixed chunk.
  // Render everything up to and including position; skip everything after.
  textDef.chunks.forEach((chunk, i) => {
    if (i > position) return   // nothing shown beyond the active slot

    const span = document.createElement('span')

    if (chunk.fixed) {
      span.className   = 'chunk chunk-number'
      span.textContent = chunk.text + ' '
    } else if (i < position) {
      span.className   = 'chunk confirmed'
      span.textContent = chunk.text + ' '
    } else {
      // i === position — the pending slot
      span.className   = 'chunk pending'
      span.setAttribute('aria-label', 'valitse seuraava pala')
    }
    upper.appendChild(span)
  })

  renderChoices()
}

function updateScrollHints() {
  const upper = document.getElementById('upper-pane')
  const up    = document.getElementById('scroll-hint-up')
  const down  = document.getElementById('scroll-hint-down')
  if (!upper || !up || !down) return
  const canUp   = upper.scrollTop > 2
  const canDown = upper.scrollTop + upper.clientHeight < upper.scrollHeight - 2
  up.classList.toggle('visible', canUp)
  down.classList.toggle('visible', canDown)
}

function scrollUpperToBottom() {
  const upper = document.getElementById('upper-pane')
  if (!upper) return
  requestAnimationFrame(() => {
    upper.scrollTop = upper.scrollHeight
    updateScrollHints()
  })
}

function renderChoices() {
  const { state } = currentGame
  const lower     = document.getElementById('lower-pane')
  lower.innerHTML = ''

  if (!state.round) return

  state.round.choices.forEach(({ chunk, state: cs }) => {
    const btn = document.createElement('button')
    btn.className   = 'choice-btn' + (cs === 'wrong' ? ' wrong' : '')
    btn.disabled    = cs === 'wrong'
    btn.dataset.id  = chunk.id
    btn.innerHTML   = cs === 'wrong'
      ? `<span class="wrong-icon">✗</span> <s>${chunk.text}</s>`
      : chunk.text

    btn.addEventListener('click', () => handleChoice(chunk.id, btn))
    lower.appendChild(btn)
  })

  scrollUpperToBottom()
}

function handleChoice(chunkId, btn) {
  const { result: outcome, completionSeconds } = currentGame.attempt(chunkId)

  if (outcome === 'no_round' || outcome === 'already_wrong') return

  if (outcome === 'correct') {
    btn.classList.add('correct')
    btn.textContent = '✓ ' + btn.textContent

    if (currentGame.state.finished) {
      // Disable remaining choices immediately to prevent double-clicks
      document.querySelectorAll('.choice-btn').forEach(b => { b.disabled = true })
      stopTimer()
      renderFinishedPuzzle()
      setTimeout(() => {
        renderCompletion(completionSeconds)
        showScreen('screen-completion')
      }, 900)
    } else {
      setTimeout(() => renderPractice(), 450)
    }
  } else if (outcome === 'wrong') {
    btn.classList.add('wrong', 'shake')
    btn.disabled  = true
    btn.innerHTML = `<span class="wrong-icon">✗</span> <s>${btn.textContent}</s>`
    btn.addEventListener('animationend', () => btn.classList.remove('shake'), { once: true })
  }
}

function renderFinishedPuzzle() {
  const { textDef } = currentGame.state
  const upper = document.getElementById('upper-pane')
  upper.innerHTML = ''

  textDef.chunks.forEach(chunk => {
    const span = document.createElement('span')
    if (chunk.fixed) {
      span.className   = 'chunk chunk-number'
      span.textContent = chunk.text + ' '
    } else {
      span.className   = 'chunk confirmed'
      span.textContent = chunk.text + ' '
    }
    upper.appendChild(span)
  })

  const marker = document.createElement('span')
  marker.className   = 'chunk completion-marker'
  marker.textContent = '✓'
  upper.appendChild(marker)

  const interactive = textDef.chunks.filter(c => !c.fixed).length
  document.getElementById('progress-fill').style.width     = '100%'
  document.getElementById('progress-label').textContent    = `${interactive} / ${interactive}`

  marker.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

// ── Completion ────────────────────────────────────────────────────────────────

const HALLELUJAHS = [
  'Halleluja! 🎺 Enkeli riemuitsee!',
  'Loistava! Paavi olisi ylpeä.',
  'Ulkoläksy hallussa! Konfirmaatio lähestyy.',
  'Mahtavaa! Jumala hymyilee tänään.',
  'Bravissimo! Taivaassa juhlistetaan.',
]

function renderCompletion(completionSeconds) {
  const { textId, errors, textDef } = currentGame.state
  const msg     = HALLELUJAHS[Math.floor(Math.random() * HALLELUJAHS.length)]
  const avg     = getMovingAverage(textId)
  const avgTime = getAverageTime(textId)
  const best    = getBestPerfectTime(textId)

  document.getElementById('completion-title').textContent = textDef.title + ' — opittu!'
  document.getElementById('completion-msg').textContent   = msg

  const lines = [`Virheitä: ${errors}`]
  if (completionSeconds !== null) lines.push(`Aika: ${fmtTime(completionSeconds)}`)
  if (avg !== null)               lines.push(`Tarkkuuskeskiarvo (5): ${avg}%`)
  if (avgTime !== null)           lines.push(`Aikakeskiarvo (5): ${fmtTime(avgTime)}`)
  if (best !== null)              lines.push(`Paras virheettömän suoritus: ${fmtTime(best)}`)

  document.getElementById('completion-errors').innerHTML =
    lines.map(l => `<span>${l}</span>`).join('')

  // Build full text content (hidden until toggled)
  const fulltext = document.getElementById('completion-fulltext')
  fulltext.hidden = true
  document.getElementById('btn-show-fulltext').textContent = 'Katso koko teksti ↓'
  fulltext.innerHTML = textDef.chunks
    .map(c => c.fixed
      ? `<span class="ft-number">${c.text}</span> `
      : c.text + ' ')
    .join('')
}

// ── Scroll hint wiring ────────────────────────────────────────────────────────

document.getElementById('upper-pane').addEventListener('scroll', updateScrollHints)

// ── Navigation ────────────────────────────────────────────────────────────────

document.getElementById('btn-back').addEventListener('click', () => {
  currentGame?.restart()
  renderMenu()
})

document.getElementById('btn-completion-menu').addEventListener('click', () => {
  currentGame?.restart()
  renderMenu()
})

document.getElementById('btn-completion-retry').addEventListener('click', () => {
  currentGame.reset()
  renderPractice()
  showScreen('screen-practice')
  startTimer()
})

document.getElementById('btn-show-fulltext').addEventListener('click', () => {
  const box = document.getElementById('completion-fulltext')
  const btn = document.getElementById('btn-show-fulltext')
  const open = box.hidden
  box.hidden = !open
  btn.textContent = open ? 'Sulje teksti ↑' : 'Katso koko teksti ↓'
})

// ── Keyboard shortcuts ─────────────────────────────────────────────────────────

document.addEventListener('keydown', e => {
  if (!document.getElementById('screen-practice').classList.contains('active')) return
  const map = { '1': 0, '2': 1, '3': 2 }
  if (e.key in map) {
    const btns = document.querySelectorAll('.choice-btn')
    btns[map[e.key]]?.click()
  }
})
