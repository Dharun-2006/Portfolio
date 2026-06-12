import { useEffect, useRef, useState } from 'react'

export default function StatsCard({ icon, label, value, color, glowColor, delay = 0 }) {
  const [count,   setCount]   = useState(0)
  const [hovered, setHovered] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!value) return
    clearInterval(intervalRef.current)

    const steps    = 60
    const duration = 1500
    const step     = value / steps
    let current    = 0

    const start = () => {
      intervalRef.current = setInterval(() => {
        current += step
        if (current >= value) {
          setCount(value)
          clearInterval(intervalRef.current)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
    }

    const t = setTimeout(start, delay)
    return () => { clearTimeout(t); clearInterval(intervalRef.current) }
  }, [value, delay])

  return (
    <div
      className="animate-on-scroll flex flex-col gap-4 p-6 rounded-2xl cursor-default"
      style={{
        background:    hovered ? `rgba(${glowColor},0.1)` : 'rgba(255,255,255,0.04)',
        border:        `1px solid ${hovered ? `rgba(${glowColor},0.5)` : 'rgba(37,99,235,0.2)'}`,
        backdropFilter:'blur(16px)',
        boxShadow:     hovered ? `0 0 25px rgba(${glowColor},0.35), 0 10px 40px rgba(${glowColor},0.15)` : 'none',
        transform:     hovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
        transition:    'all 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{
          background: `rgba(${glowColor},0.12)`,
          border:     `1px solid rgba(${glowColor},0.3)`,
          color,
          boxShadow:  hovered ? `0 0 16px rgba(${glowColor},0.55)` : 'none',
          transition: 'all 0.3s ease',
        }}>
        {icon}
      </div>

      {/* Count + label */}
      <div>
        <p className="text-3xl font-black font-mono leading-none"
          style={{
            color,
            textShadow: hovered ? `0 0 20px rgba(${glowColor},0.8)` : 'none',
            transition: 'text-shadow 0.3s ease',
          }}>
          {count.toLocaleString()}
        </p>
        <p className="text-xs font-semibold uppercase tracking-widest mt-1.5" style={{ color: '#3B82F6' }}>
          {label}
        </p>
      </div>
    </div>
  )
}
