import { useEffect, useRef, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import GameWidget from './components/GameWidget'
import Loader from './components/Loader'
import SwipeBack from './components/SwipeBack'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import GitHubActivity from './components/GitHubActivity'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded]   = useState(false)
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const handleDone = useCallback(() => setLoaded(true), [])

  /* ── Custom cursor ── */
  useEffect(() => {
    const move = (e) => {
      if (dotRef.current)  { dotRef.current.style.left  = e.clientX + 'px'; dotRef.current.style.top  = e.clientY + 'px' }
      if (ringRef.current) { ringRef.current.style.left = e.clientX + 'px'; ringRef.current.style.top = e.clientY + 'px' }
    }
    const grow = () => { if (ringRef.current) { ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.6)'; ringRef.current.style.borderColor = 'rgba(0,240,255,0.8)' } }
    const shrink = () => { if (ringRef.current) { ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)'; ringRef.current.style.borderColor = 'rgba(0,240,255,0.5)' } }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  /* ── Scroll animations (re-trigger on scroll up too) ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
        else e.target.classList.remove('visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {!loaded && <Loader onDone={handleDone} />}
      {/* Custom cursor */}
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />

      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <GitHubActivity />
        <Contact />
        <Footer />
      </div>
      <SwipeBack />
      <GameWidget />
    </>
  )
}
