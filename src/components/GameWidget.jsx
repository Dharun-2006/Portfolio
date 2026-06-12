import { useState, useEffect, useRef, useCallback } from 'react'
import { FiX, FiChevronLeft } from 'react-icons/fi'
import { BsController } from 'react-icons/bs'

/* ─────────────────────────────────────────
   SNAKE GAME
───────────────────────────────────────── */
const COLS = 20, ROWS = 20
const CELL = 14

function initSnake() {
  return { snake: [{ x: 10, y: 10 }], dir: { x: 1, y: 0 }, food: { x: 5, y: 5 }, score: 0, running: false, dead: false }
}

function SnakeGame() {
  const [state, setState] = useState(initSnake())
  const stateRef = useRef(state)
  stateRef.current = state
  const loopRef = useRef(null)

  const randomFood = (snake) => {
    let f
    do { f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) } }
    while (snake.some(s => s.x === f.x && s.y === f.y))
    return f
  }

  const tick = useCallback(() => {
    setState(prev => {
      if (!prev.running || prev.dead) return prev
      const head = { x: prev.snake[0].x + prev.dir.x, y: prev.snake[0].y + prev.dir.y }
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || prev.snake.some(s => s.x === head.x && s.y === head.y))
        return { ...prev, running: false, dead: true }
      const ate = head.x === prev.food.x && head.y === prev.food.y
      const newSnake = [head, ...prev.snake.slice(0, ate ? undefined : -1)]
      return { ...prev, snake: newSnake, food: ate ? randomFood(newSnake) : prev.food, score: ate ? prev.score + 1 : prev.score }
    })
  }, [])

  useEffect(() => {
    if (state.running) { loopRef.current = setInterval(tick, 120) }
    else clearInterval(loopRef.current)
    return () => clearInterval(loopRef.current)
  }, [state.running, tick])

  useEffect(() => {
    const onKey = (e) => {
      const map = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 } }
      if (!map[e.key]) return
      e.preventDefault()
      setState(prev => {
        const d = map[e.key]
        if (d.x === -prev.dir.x && d.y === -prev.dir.y) return prev
        return { ...prev, dir: d, running: true }
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const dirs = [
    { label: '▲', d: { x: 0, y: -1 }, cls: 'col-start-2' },
    { label: '◀', d: { x: -1, y: 0 }, cls: 'col-start-1 row-start-2' },
    { label: '▼', d: { x: 0, y: 1 },  cls: 'col-start-2 row-start-2' },
    { label: '▶', d: { x: 1, y: 0 },  cls: 'col-start-3 row-start-2' },
  ]

  const setDir = (d) => setState(prev => {
    if (d.x === -prev.dir.x && d.y === -prev.dir.y) return prev
    return { ...prev, dir: d, running: true }
  })

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-xs font-mono" style={{ color: '#00F0FF' }}>Score: {state.score}</span>
        <button onClick={() => setState(initSnake())}
          className="text-xs px-3 py-1 rounded-lg font-semibold transition-all duration-200"
          style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.4)', color: '#DBEAFE' }}>
          {state.dead ? 'Restart' : 'Reset'}
        </button>
      </div>

      {/* Canvas */}
      <div className="relative rounded-lg overflow-hidden"
        style={{ width: COLS * CELL, height: ROWS * CELL, background: 'rgba(3,7,18,0.9)', border: '1px solid rgba(37,99,235,0.3)' }}>
        {/* Grid dots */}
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => (
            <div key={`${r}-${c}`} className="absolute rounded-full"
              style={{ width: 2, height: 2, left: c * CELL + CELL / 2 - 1, top: r * CELL + CELL / 2 - 1, background: 'rgba(37,99,235,0.08)' }} />
          ))
        )}
        {/* Food */}
        <div className="absolute rounded-full"
          style={{ width: CELL - 2, height: CELL - 2, left: state.food.x * CELL + 1, top: state.food.y * CELL + 1,
                   background: '#00F0FF', boxShadow: '0 0 8px rgba(0,240,255,0.9)' }} />
        {/* Snake */}
        {state.snake.map((s, i) => (
          <div key={i} className="absolute rounded-sm"
            style={{ width: CELL - 1, height: CELL - 1, left: s.x * CELL, top: s.y * CELL,
                     background: i === 0 ? '#00F0FF' : '#2563EB',
                     boxShadow: i === 0 ? '0 0 6px rgba(0,240,255,0.8)' : 'none' }} />
        ))}
        {/* Overlay */}
        {(!state.running || state.dead) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: 'rgba(3,7,18,0.75)', backdropFilter: 'blur(4px)' }}>
            {state.dead && <p className="text-sm font-bold" style={{ color: '#00F0FF' }}>Game Over! Score: {state.score}</p>}
            {!state.dead && !state.running && <p className="text-xs" style={{ color: '#93C5FD' }}>Press arrow key or tap to start</p>}
          </div>
        )}
      </div>

      {/* D-pad */}
      <div className="grid grid-cols-3 grid-rows-2 gap-1">
        {dirs.map(({ label, d, cls }) => (
          <button key={label} onClick={() => setDir(d)}
            className={`${cls} w-9 h-9 rounded-lg text-sm font-bold flex items-center justify-center transition-all duration-150`}
            style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.35)', color: '#DBEAFE' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.35)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,99,235,0.15)'}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   MEMORY CARD GAME
───────────────────────────────────────── */
const EMOJIS = ['🤖', '🧠', '💡', '🚀', '🔥', '⚡', '🎯', '🌐']

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function initMemory() {
  const cards = shuffle([...EMOJIS, ...EMOJIS]).map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }))
  return { cards, flipped: [], moves: 0, won: false }
}

function MemoryGame() {
  const [state, setState] = useState(initMemory())
  const lockRef = useRef(false)

  const flip = (id) => {
    if (lockRef.current) return
    setState(prev => {
      const card = prev.cards.find(c => c.id === id)
      if (!card || card.flipped || card.matched || prev.flipped.length === 2) return prev
      const newFlipped = [...prev.flipped, id]
      const newCards = prev.cards.map(c => c.id === id ? { ...c, flipped: true } : c)
      if (newFlipped.length === 2) {
        const [a, b] = newFlipped.map(fid => newCards.find(c => c.id === fid))
        lockRef.current = true
        if (a.emoji === b.emoji) {
          const matched = newCards.map(c => newFlipped.includes(c.id) ? { ...c, matched: true } : c)
          const won = matched.every(c => c.matched)
          setTimeout(() => { lockRef.current = false; setState(p => ({ ...p, cards: matched, flipped: [], won })) }, 400)
        } else {
          setTimeout(() => {
            lockRef.current = false
            setState(p => ({ ...p, cards: p.cards.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c), flipped: [] }))
          }, 800)
        }
        return { ...prev, cards: newCards, flipped: newFlipped, moves: prev.moves + 1 }
      }
      return { ...prev, cards: newCards, flipped: newFlipped }
    })
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-xs font-mono" style={{ color: '#00F0FF' }}>Moves: {state.moves}</span>
        <button onClick={() => { lockRef.current = false; setState(initMemory()) }}
          className="text-xs px-3 py-1 rounded-lg font-semibold"
          style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.4)', color: '#DBEAFE' }}>
          New Game
        </button>
      </div>

      {state.won && (
        <p className="text-sm font-bold" style={{ color: '#00F0FF', textShadow: '0 0 10px rgba(0,240,255,0.7)' }}>
          🎉 You won in {state.moves} moves!
        </p>
      )}

      <div className="grid grid-cols-4 gap-2">
        {state.cards.map(card => (
          <button key={card.id} onClick={() => flip(card.id)}
            className="w-14 h-14 rounded-xl text-2xl flex items-center justify-center transition-all duration-300 font-bold"
            style={{
              background: card.flipped || card.matched ? 'rgba(37,99,235,0.25)' : 'rgba(37,99,235,0.08)',
              border: card.matched ? '1px solid rgba(0,240,255,0.6)' : '1px solid rgba(37,99,235,0.3)',
              boxShadow: card.matched ? '0 0 12px rgba(0,240,255,0.4)' : 'none',
              transform: card.flipped || card.matched ? 'rotateY(0deg)' : 'rotateY(90deg)',
              color: card.flipped || card.matched ? 'white' : 'transparent',
            }}>
            {card.flipped || card.matched ? card.emoji : '?'}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   REACTION TIME TEST
───────────────────────────────────────── */
function ReactionGame() {
  const [phase, setPhase] = useState('idle') // idle | waiting | ready | result
  const [reactionTime, setReactionTime] = useState(null)
  const [best, setBest] = useState(null)
  const timerRef = useRef(null)
  const startRef = useRef(null)

  const start = () => {
    setPhase('waiting')
    setReactionTime(null)
    const delay = 1500 + Math.random() * 3000
    timerRef.current = setTimeout(() => { setPhase('ready'); startRef.current = Date.now() }, delay)
  }

  const click = () => {
    if (phase === 'waiting') {
      clearTimeout(timerRef.current)
      setPhase('idle')
      setReactionTime('too-early')
      return
    }
    if (phase === 'ready') {
      const ms = Date.now() - startRef.current
      setReactionTime(ms)
      setBest(b => b === null ? ms : Math.min(b, ms))
      setPhase('result')
    }
    if (phase === 'idle' || phase === 'result') start()
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const bgColor = phase === 'waiting' ? 'rgba(37,99,235,0.15)' : phase === 'ready' ? 'rgba(0,240,255,0.2)' : 'rgba(37,99,235,0.08)'
  const borderColor = phase === 'ready' ? 'rgba(0,240,255,0.7)' : 'rgba(37,99,235,0.3)'

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs text-center" style={{ color: '#93C5FD' }}>
        Click when the box turns <span style={{ color: '#00F0FF' }}>cyan</span>. Don't click too early!
      </p>

      <button onClick={click}
        className="w-full h-36 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 font-bold"
        style={{ background: bgColor, border: `2px solid ${borderColor}`,
                 boxShadow: phase === 'ready' ? '0 0 30px rgba(0,240,255,0.5)' : 'none' }}>
        {phase === 'idle'    && <><span className="text-3xl">⚡</span><span className="text-sm" style={{ color: '#DBEAFE' }}>Click to Start</span></>}
        {phase === 'waiting' && <><span className="text-3xl animate-pulse">⏳</span><span className="text-sm" style={{ color: '#93C5FD' }}>Wait for it...</span></>}
        {phase === 'ready'   && <><span className="text-3xl">🟢</span><span className="text-lg font-black" style={{ color: '#00F0FF' }}>CLICK NOW!</span></>}
        {phase === 'result'  && reactionTime !== 'too-early' && (
          <><span className="text-3xl">🎯</span>
            <span className="text-2xl font-black gradient-text">{reactionTime}ms</span>
            <span className="text-xs" style={{ color: '#93C5FD' }}>Click to try again</span>
          </>
        )}
        {phase === 'idle' && reactionTime === 'too-early' && (
          <><span className="text-3xl">❌</span><span className="text-sm" style={{ color: '#93C5FD' }}>Too early! Click to retry</span></>
        )}
      </button>

      {best && (
        <p className="text-xs font-mono" style={{ color: '#00F0FF' }}>
          🏆 Best: {best}ms &nbsp;·&nbsp;
          <span style={{ color: best < 200 ? '#00F0FF' : best < 300 ? '#60A5FA' : '#93C5FD' }}>
            {best < 200 ? 'Superhuman!' : best < 300 ? 'Great!' : best < 400 ? 'Average' : 'Keep trying!'}
          </span>
        </p>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN WIDGET
───────────────────────────────────────── */
const GAMES = [
  { id: 'snake',    label: 'Snake',         emoji: '🐍', component: SnakeGame    },
  { id: 'memory',   label: 'Memory Cards',  emoji: '🃏', component: MemoryGame   },
  { id: 'reaction', label: 'Reaction Test', emoji: '⚡', component: ReactionGame },
]

export default function GameWidget() {
  const [open, setOpen]       = useState(false)
  const [active, setActive]   = useState(null)

  const ActiveGame = active ? GAMES.find(g => g.id === active)?.component : null

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-3">

      {/* Panel */}
      {open && (
        <div className="glass-strong rounded-2xl overflow-hidden flex flex-col"
          style={{ width: 340, maxHeight: '80vh', border: '1px solid rgba(37,99,235,0.35)',
                   boxShadow: '0 0 40px rgba(37,99,235,0.3), 0 0 80px rgba(0,240,255,0.1)' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(37,99,235,0.2)', background: 'rgba(37,99,235,0.08)' }}>
            <div className="flex items-center gap-2">
              {active && (
                <button onClick={() => setActive(null)}
                  className="transition-colors duration-200 mr-1" style={{ color: '#3B82F6' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#00F0FF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#3B82F6'}>
                  <FiChevronLeft size={18} />
                </button>
              )}
              <BsController size={16} style={{ color: '#00F0FF' }} />
              <span className="text-sm font-bold" style={{ color: '#DBEAFE' }}>
                {active ? GAMES.find(g => g.id === active)?.label : 'Mini Games'}
              </span>
            </div>
            <button onClick={() => { setOpen(false); setActive(null) }}
              className="transition-colors duration-200" style={{ color: '#3B82F6' }}
              onMouseEnter={e => e.currentTarget.style.color = '#00F0FF'}
              onMouseLeave={e => e.currentTarget.style.color = '#3B82F6'}>
              <FiX size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-5 flex-1">
            {!active ? (
              /* Game selector */
              <div className="flex flex-col gap-3">
                <p className="text-xs text-center mb-2" style={{ color: '#60A5FA' }}>
                  Take a break — pick a game!
                </p>
                {GAMES.map(({ id, label, emoji }) => (
                  <button key={id} onClick={() => setActive(id)}
                    className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 group"
                    style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.18)'; e.currentTarget.style.borderColor = 'rgba(0,240,255,0.4)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.08)'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)'; e.currentTarget.style.transform = 'translateX(0)' }}
                  >
                    <span className="text-3xl">{emoji}</span>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#DBEAFE' }}>{label}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#60A5FA' }}>
                        {id === 'snake'    && 'Classic snake — eat & grow'}
                        {id === 'memory'   && 'Flip & match emoji pairs'}
                        {id === 'reaction' && 'Test your reaction speed'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <ActiveGame />
            )}
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={() => { setOpen(o => !o); if (open) setActive(null) }}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: open ? 'linear-gradient(135deg,#2563EB,#00F0FF)' : 'rgba(37,99,235,0.15)',
          border: '2px solid rgba(37,99,235,0.5)',
          boxShadow: open ? '0 0 25px rgba(37,99,235,0.7), 0 0 50px rgba(0,240,255,0.3)' : '0 0 15px rgba(37,99,235,0.3)',
          color: '#DBEAFE',
        }}
        onMouseEnter={e => { if (!open) { e.currentTarget.style.background = 'rgba(37,99,235,0.3)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(37,99,235,0.6)'; e.currentTarget.style.transform = 'scale(1.1)' } }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.background = 'rgba(37,99,235,0.15)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(37,99,235,0.3)'; e.currentTarget.style.transform = 'scale(1)' } }}
        aria-label="Mini Games"
      >
        <BsController size={24} />
      </button>
    </div>
  )
}
