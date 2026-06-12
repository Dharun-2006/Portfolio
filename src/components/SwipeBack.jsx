import { useState, useEffect, useRef } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

export default function SwipeBack() {
  const [pull, setPull] = useState(0)
  const [side, setSide] = useState('left')

  const touchStartX  = useRef(null)
  const touchStartY  = useRef(null)
  const hideTimer    = useRef(null)
  const wheelAccum   = useRef(0)
  const wheelTimer   = useRef(null)
  const wheelFired   = useRef(false)
  const touchFired   = useRef(false)

  const TOUCH_TRIGGER = 120
  const WHEEL_TRIGGER = 200

  // Push a dummy state so history.back() has somewhere to go
  useEffect(() => {
    if (window.history.state?.portfolioDummy) return
    window.history.pushState({ portfolioDummy: true }, '')
  }, [])

  const goBack = () => {
    setPull(100)
    setTimeout(() => {
      window.history.back()
      setTimeout(() => setPull(0), 600)
    }, 300)
  }

  const resetPull = () => {
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setPull(0), 500)
  }

  useEffect(() => {
    /* ── Touch ── */
    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
      touchFired.current  = false
      clearTimeout(hideTimer.current)
    }

    const onTouchMove = (e) => {
      if (touchStartX.current === null) return
      const dx  = e.touches[0].clientX - touchStartX.current
      const dy  = e.touches[0].clientY - touchStartY.current
      if (Math.abs(dy) > Math.abs(dx) * 1.3) return
      const abs = Math.abs(dx)
      if (abs > 40) {
        setSide(dx > 0 ? 'left' : 'right')
        setPull(Math.min((abs / TOUCH_TRIGGER) * 100, 100))
      }
    }

    const onTouchEnd = (e) => {
      if (touchStartX.current === null) return
      const dx  = e.changedTouches[0].clientX - touchStartX.current
      const dy  = e.changedTouches[0].clientY - touchStartY.current
      if (Math.abs(dx) > Math.abs(dy) * 0.8 && Math.abs(dx) >= TOUCH_TRIGGER && !touchFired.current) {
        touchFired.current = true
        goBack()
      } else {
        resetPull()
      }
      touchStartX.current = null
    }

    /* ── Trackpad two-finger swipe ── */
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) * 0.6) return
      if (Math.abs(e.deltaX) < 8) return

      wheelAccum.current += e.deltaX
      const abs = Math.abs(wheelAccum.current)
      setSide(wheelAccum.current > 0 ? 'right' : 'left')
      setPull(Math.min((abs / WHEEL_TRIGGER) * 100, 100))
      clearTimeout(hideTimer.current)

      if (abs >= WHEEL_TRIGGER && !wheelFired.current) {
        wheelFired.current = true
        goBack()
      }

      clearTimeout(wheelTimer.current)
      wheelTimer.current = setTimeout(() => {
        wheelAccum.current = 0
        wheelFired.current = false
        resetPull()
      }, 180)
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove',  onTouchMove,  { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })
    window.addEventListener('wheel',      onWheel,      { passive: true })

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('wheel',      onWheel)
      clearTimeout(hideTimer.current)
      clearTimeout(wheelTimer.current)
    }
  }, [])

  if (pull === 0) return (
    <>
      <div className="fixed top-0 left-0 h-full w-1 z-[9990] pointer-events-none"
        style={{ background: 'linear-gradient(180deg,transparent,rgba(37,99,235,0.25),transparent)' }} />
      <div className="fixed top-0 right-0 h-full w-1 z-[9990] pointer-events-none"
        style={{ background: 'linear-gradient(180deg,transparent,rgba(37,99,235,0.25),transparent)' }} />
    </>
  )

  const isLeft  = side === 'left'
  const opacity = Math.min(pull / 60, 1)
  const offset  = Math.min(pull / 100, 1) * 20
  const circ    = 2 * Math.PI * 14
  const dashOff = circ * (1 - pull / 100)
  const isReady = pull >= 100

  return (
    <>
      {/* Edge strips */}
      <div className="fixed top-0 left-0 h-full w-1 z-[9990] pointer-events-none"
        style={{ background: 'linear-gradient(180deg,transparent,rgba(37,99,235,0.25),transparent)' }} />
      <div className="fixed top-0 right-0 h-full w-1 z-[9990] pointer-events-none"
        style={{ background: 'linear-gradient(180deg,transparent,rgba(37,99,235,0.25),transparent)' }} />

      {/* Back indicator */}
      <div className="fixed top-1/2 z-[9995] pointer-events-none"
        style={{
          [isLeft ? 'left' : 'right']: `${offset}px`,
          transform: 'translateY(-50%)',
          opacity,
          transition: 'opacity 0.1s ease',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            flexDirection: isLeft ? 'row' : 'row-reverse',
            background: isReady
              ? 'linear-gradient(135deg,rgba(37,99,235,0.55),rgba(0,240,255,0.3))'
              : 'rgba(3,7,18,0.9)',
            border: `1px solid ${isReady ? 'rgba(0,240,255,0.8)' : 'rgba(37,99,235,0.5)'}`,
            backdropFilter: 'blur(20px)',
            boxShadow: isReady
              ? '0 0 30px rgba(0,240,255,0.55),0 0 60px rgba(37,99,235,0.3)'
              : '0 0 18px rgba(37,99,235,0.35)',
            transition: 'all 0.2s ease',
          }}
        >
          {/* Static arrow */}
          <div style={{ color: isReady ? '#00F0FF' : '#60A5FA',
            filter: isReady ? 'drop-shadow(0 0 8px rgba(0,240,255,1))' : 'none' }}>
            {isLeft ? <FiArrowLeft size={20} /> : <FiArrowRight size={20} />}
          </div>

          {/* Label or spinning circle */}
          {!isReady ? (
            <span className="text-xs font-bold tracking-wide whitespace-nowrap" style={{ color: '#DBEAFE' }}>
              Go Back
            </span>
          ) : (
            /* Spinning ring with arrow inside */
            <div className="relative flex items-center justify-center flex-shrink-0"
              style={{ width: 34, height: 34 }}>
              <svg width={34} height={34} className="absolute"
                style={{ animation: 'spinRing 0.65s linear infinite' }}>
                <circle cx={17} cy={17} r={13} fill="none"
                  stroke="url(#rg)" strokeWidth={2.5} strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 13 * 0.75} ${2 * Math.PI * 13 * 0.25}`}
                />
                <defs>
                  <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#00F0FF" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ color: '#00F0FF', filter: 'drop-shadow(0 0 6px rgba(0,240,255,1))' }}>
                {isLeft ? <FiArrowLeft size={13} /> : <FiArrowRight size={13} />}
              </div>
            </div>
          )}

          {/* Fill progress ring */}
          <svg width={32} height={32} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
            <circle cx={16} cy={16} r={14} fill="none"
              stroke="rgba(37,99,235,0.2)" strokeWidth={2.5} />
            <circle cx={16} cy={16} r={14} fill="none"
              stroke="url(#sg)" strokeWidth={2.5} strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={dashOff}
              style={{ transition: 'stroke-dashoffset 0.05s linear' }}
            />
            <defs>
              <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#2563EB" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
