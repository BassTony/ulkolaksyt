import { createGame, getProgress, getTexts, getMovingAverage } from './game.js'

let currentGame = null

// ── Screens ──────────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  document.getElementById(id).classList.add('active')
}

// ── Menu screen ───────────────────────────────────────────────────────────────

export function renderMenu() {
  const progress = getProgress()
  const texts = getTexts()
  const list = document.getElementById('text-list')
  list.innerHTML = ''

  texts.forEach(text => {
    const done = progress.completed.includes(text.id)
    const inProgress = !done && progress.sessions[text.id]?.position > 0
    const avg = getMovingAverage(text.id)

    let badgeText
    if (avg !== null) {
      badgeText = `${avg}% keskiarvo`
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

// ── Practice screen ───────────────────────────────────────────────────────────

function startPractice(textId) {
  currentGame = createGame(textId)
  renderPractice()
  showScreen('screen-practice')
}

function renderPractice() {
  const { state } = currentGame
  const { textDef, position } = state

  // Header
  document.getElementById('practice-title').textContent = textDef.title
  document.getElementById('practice-subtitle').textContent = textDef.subtitle ?? ''

  // Progress bar
  const pct = Math.round((position / textDef.chunks.length) * 100)
  document.getElementById('progress-fill').style.width = pct + '%'
  document.getElementById('progress-label').textContent = `${position} / ${textDef.chunks.length}`

  // Upper pane — confirmed chunks + pending slot
  const upper = document.getElementById('upper-pane')
  upper.innerHTML = ''

  textDef.chunks.forEach((chunk, i) => {
    const span = document.createElement('span')
    if (i < position) {
      span.className = 'chunk confirmed'
      span.textContent = chunk.text + ' '
    } else if (i === position) {
      span.className = 'chunk pending'
      span.textContent = '___'
    } else {
      span.className = 'chunk future'
      span.textContent = '··· '
    }
    upper.appendChild(span)
  })

  // Lower pane — choices
  renderChoices()
}

function renderChoices() {
  const { state } = currentGame
  const lower = document.getElementById('lower-pane')
  lower.innerHTML = ''

  if (!state.round) return

  state.round.choices.forEach(({ chunk, state: cs }) => {
    const btn = document.createElement('button')
    btn.className = 'choice-btn' + (cs === 'wrong' ? ' wrong' : '')
    btn.disabled = cs === 'wrong'
    btn.dataset.id = chunk.id
    btn.innerHTML = cs === 'wrong'
      ? `<span class="wrong-icon">✗</span> <s>${chunk.text}</s>`
      : chunk.text

    btn.addEventListener('click', () => handleChoice(chunk.id, btn))
    lower.appendChild(btn)
  })

  // Scroll to bottom so new choices are always visible
  requestAnimationFrame(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  })
}

function handleChoice(chunkId, btn) {
  const result = currentGame.attempt(chunkId)

  if (result === 'correct') {
    btn.classList.add('correct')
    btn.textContent = '✓ ' + btn.textContent

    if (currentGame.state.finished) {
      // Show last chunk in upper pane + completion marker, then navigate
      renderFinishedPuzzle()
      setTimeout(() => {
        renderCompletion()
        showScreen('screen-completion')
      }, 900)
    } else {
      setTimeout(() => renderPractice(), 450)
    }
  } else if (result === 'wrong') {
    btn.classList.add('wrong')
    btn.disabled = true
    btn.innerHTML = `<span class="wrong-icon">✗</span> <s>${btn.textContent}</s>`
    btn.classList.add('shake')
    btn.addEventListener('animationend', () => btn.classList.remove('shake'), { once: true })
  }
}

/** Render the upper pane with every chunk confirmed and a ✓ completion marker appended */
function renderFinishedPuzzle() {
  const { textDef } = currentGame.state
  const upper = document.getElementById('upper-pane')
  upper.innerHTML = ''

  textDef.chunks.forEach(chunk => {
    const span = document.createElement('span')
    span.className = 'chunk confirmed'
    span.textContent = chunk.text + ' '
    upper.appendChild(span)
  })

  const marker = document.createElement('span')
  marker.className = 'chunk completion-marker'
  marker.textContent = '✓'
  upper.appendChild(marker)

  // Update progress bar to 100%
  document.getElementById('progress-fill').style.width = '100%'
  document.getElementById('progress-label').textContent =
    `${textDef.chunks.length} / ${textDef.chunks.length}`

  // Scroll the marker into view
  marker.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

// ── Completion screen ─────────────────────────────────────────────────────────

const HALLELUJAHS = [
  'Halleluja! 🎺 Enkeli riemuitsee!',
  'Loistava! Paavi olisi ylpeä.',
  'Ulkoläksy hallussa! Konfirmaatio lähestyy.',
  'Mahtavaa! Jumala hymyilee tänään.',
  'Bravissimo! Taivaassa juhlistetaan.',
]

function renderCompletion() {
  const msg = HALLELUJAHS[Math.floor(Math.random() * HALLELUJAHS.length)]
  document.getElementById('completion-msg').textContent = msg
  document.getElementById('completion-title').textContent =
    currentGame.state.textDef.title + ' — opittu!'

  const avg = getMovingAverage(currentGame.state.textId)
  document.getElementById('completion-errors').textContent =
    avg !== null
      ? `Virheitä: ${currentGame.state.errors} · Viiden kerran keskiarvo: ${avg}%`
      : `Virheitä: ${currentGame.state.errors}`
}

// ── Back button ────────────────────────────────────────────────────────────────

document.getElementById('btn-back').addEventListener('click', () => {
  renderMenu()
})

document.getElementById('btn-completion-menu').addEventListener('click', () => {
  renderMenu()
})

document.getElementById('btn-completion-retry').addEventListener('click', () => {
  currentGame.reset()
  renderPractice()
  showScreen('screen-practice')
})

// ── Keyboard shortcuts ─────────────────────────────────────────────────────────

document.addEventListener('keydown', e => {
  if (!document.getElementById('screen-practice').classList.contains('active')) return
  const map = { '1': 0, '2': 1, '3': 2 }
  if (e.key in map) {
    const btns = document.querySelectorAll('.choice-btn:not([disabled])')
    btns[map[e.key]]?.click()
  }
})
