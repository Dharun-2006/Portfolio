import { useState, useEffect } from 'react'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving]   = useState(false)

  useEffect(() => {
    // Increment progress from 0 → 100 over ~2.2s
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 4 + 1.5
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        // Brief pause at 100% then trigger exit
        setTimeout(() => setLeaving(true), 400)
        setTimeout(() => onDone(), 1100)
      }
      setProgress(Math.min(Math.floor(current), 100))
    }, 50)
    return () => clearInterval(interval)
  }, [onDone])

  // SVG circle math
  const size   = 160
  const stroke = 5
  const r      = (size - stroke) / 2
  const circ   = 2 * Math.PI * r
  const offset = circ - (progress / 100) * circ

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-[99999] transition-all duration-700"
      style={{
        background: 'linear-gradient(to bottom right, #030712, #0A1A3A)',
        opacity: leaving ? 0 : 1,
        transform: leaving ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: leaving ? 'none' : 'all',
      }}
    >
      {/* Background blobs */}
      <div className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{ top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{ bottom: '-5%', right: '-5%', background: 'radial-gradient(circle, rgba(0,240,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Circular loader */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>

        {/* Outer decorative ring */}
        <div className="absolute rounded-full"
          style={{ inset: -12, border: '1px solid rgba(37,99,235,0.15)', borderRadius: '50%' }} />
        <div className="absolute rounded-full"
          style={{ inset: -22, border: '1px solid rgba(0,240,255,0.06)', borderRadius: '50%' }} />

        {/* SVG progress ring */}
        <svg width={size} height={size} className="absolute" style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="rgba(37,99,235,0.15)" strokeWidth={stroke}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke="url(#loaderGrad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
          <defs>
            <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#2563EB" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow dot at progress tip */}
        <div className="absolute rounded-full"
          style={{
            width: 10, height: 10,
            background: '#00F0FF',
            boxShadow: '0 0 12px rgba(0,240,255,1), 0 0 24px rgba(0,240,255,0.6)',
            top: stroke / 2 - 5 + 'px',
            left: '50%',
            transform: `translateX(-50%) rotate(${(progress / 100) * 360}deg)`,
            transformOrigin: `0 ${r + stroke / 2}px`,
          }}
        />

        {/* Inner content */}
        <div className="flex flex-col items-center justify-center gap-1 z-10">
          {/* Percentage */}
          <span className="text-3xl font-black font-mono"
            style={{ background: 'linear-gradient(90deg,#2563EB,#00F0FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {progress}%
          </span>
        </div>
      </div>

      {/* Name + tagline below ring */}
      <div className="mt-10 flex flex-col items-center gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight"
          style={{ background: 'linear-gradient(90deg,#2563EB,#60A5FA,#00F0FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Dharun Prakash V
        </h1>
        <p className="text-xs tracking-widest uppercase font-medium" style={{ color: '#3B82F6' }}>
          Portfolio Loading...
        </p>

        {/* Animated dots */}
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map(i => (
            <span key={i} className="w-1.5 h-1.5 rounded-full"
              style={{
                background: '#2563EB',
                animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1.2); opacity: 1; background: #00F0FF;
                           box-shadow: 0 0 8px rgba(0,240,255,0.8); }
        }
      `}</style>
    </div>
  )
}
