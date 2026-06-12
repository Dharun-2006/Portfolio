import { useState, useEffect } from 'react'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'

const links = ['About', 'Skills', 'Projects', 'Achievements', 'GitHub', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.toLowerCase()))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: 'rgba(3,7,18,0.88)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(37,99,235,0.2)',
        boxShadow: '0 4px 30px rgba(37,99,235,0.12)',
        padding: '12px 0',
      } : { padding: '20px 0' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-bold tracking-tight shimmer-text"
        >
          DP<span style={{ WebkitTextFillColor: 'white' }}>.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l.toLowerCase())}
                className="text-sm font-medium relative group transition-all duration-200"
                style={{ color: active === l.toLowerCase() ? '#00F0FF' : '#DBEAFE' }}
              >
                {l}
                {/* Active underline */}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 rounded transition-all duration-300"
                  style={{
                    width: active === l.toLowerCase() ? '100%' : '0%',
                    background: 'linear-gradient(90deg,#2563EB,#00F0FF)',
                    boxShadow: active === l.toLowerCase() ? '0 0 10px rgba(0,240,255,0.8)' : 'none',
                  }}
                />
                {/* Hover underline */}
                <span className="absolute -bottom-1 left-0 h-0.5 rounded w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg,#2563EB,#00F0FF)', opacity: 0.4 }} />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-2xl transition-colors duration-200"
          style={{ color: '#DBEAFE' }}
          onClick={() => setOpen(!open)}
        >
          {open ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mx-4 mt-2 glass-strong p-4 flex flex-col gap-2">
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              className="text-left text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
              style={{ color: active === l.toLowerCase() ? '#00F0FF' : '#DBEAFE' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
