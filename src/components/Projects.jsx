import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    num: '01',
    title: 'Parking Management System',
    description: 'Developed a smart parking management application using Java and MySQL that enables users to book parking slots, manage vehicle records, calculate parking charges based on entry and exit time, and generate transaction records efficiently.',
    tech: ['Java', 'MySQL', 'JDBC'],
    bar: 'linear-gradient(90deg,#2563EB,#00F0FF)',
  },
  {
    num: '02',
    title: 'MT-AHNet – Weed Detection in Soybean Crops',
    description: 'Developed a deep learning-based crop segmentation and weed detection model to accurately identify and separate crop regions from agricultural field images for precision farming.',
    tech: ['Python', 'Deep Learning', 'Computer Vision', 'OpenCV'],
    bar: 'linear-gradient(90deg,#00F0FF,#2563EB)',
  },
  {
    num: '03',
    title: 'Drug Classification and Analytics',
    description: 'Engineered a data pipeline in Snowflake to manage patient records with SQL-based cleaning and transformation, while predicting prescribed drug categories using machine learning.',
    tech: ['Python', 'Snowflake', 'SQL', 'Machine Learning'],
    bar: 'linear-gradient(90deg,#3B82F6,#00F0FF)',
  },
]

function ProjectCard({ num, title, description, tech, bar, delay }) {
  return (
    <div
      className="glass neon-card flex flex-col overflow-hidden animate-on-scroll w-full"
      style={{ border: '1px solid rgba(37,99,235,0.2)', transitionDelay: `${delay}s` }}
    >
      {/* Top accent bar */}
      <div className="h-[3px] w-full flex-shrink-0" style={{ background: bar }} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Number + icon */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-black font-mono select-none"
            style={{ color: 'rgba(0,240,255,0.55)', lineHeight: 1, textShadow: '0 0 12px rgba(0,240,255,0.4)' }}>
            {num}
          </span>
          <a href="https://github.com/Dharun-2006" target="_blank" rel="noreferrer"
            aria-label="GitHub" className="transition-all duration-200" style={{ color: '#3B82F6' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#00F0FF'; e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(0,240,255,0.8))' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#3B82F6'; e.currentTarget.style.filter = 'none' }}
          >
            <FiCode size={18} />
          </a>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold leading-snug" style={{ color: '#DBEAFE' }}>{title}</h3>

        {/* Description */}
        <p className="text-xs leading-relaxed flex-1" style={{ color: '#93C5FD' }}>{description}</p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1">
          {tech.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', color: '#93C5FD' }}>
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a href="https://github.com/Dharun-2006" target="_blank" rel="noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 w-fit"
          style={{ color: '#2563EB' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#00F0FF'; e.currentTarget.style.textShadow = '0 0 10px rgba(0,240,255,0.7)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#2563EB'; e.currentTarget.style.textShadow = 'none' }}
        >
          <FiGithub size={12} />
          View on GitHub
          <FiExternalLink size={10} style={{ opacity: 0.7 }} />
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const left  = projects.filter((_, i) => i % 2 === 0)
  const right = projects.filter((_, i) => i % 2 !== 0)

  // Animated line
  const sectionRef = useRef(null)
  const [lineH, setLineH] = useState(0)   // 0–100 %

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const winH  = window.innerHeight
      // start drawing when top of section hits bottom of viewport
      // finish when bottom of section hits top of viewport
      const total  = rect.height + winH
      const passed = winH - rect.top
      const pct    = Math.min(Math.max((passed / total) * 100, 0), 100)
      setLineH(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="projects" className="py-24 px-4" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">

        <h2 className="section-title animate-on-scroll">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <div className="section-line animate-on-scroll" />

        {/* ── Desktop: 2-column with center divider ── */}
        <div className="hidden md:flex gap-0 items-stretch">

          {/* Left column */}
          <div className="flex-1 flex flex-col gap-10 pr-8">
            {left.map((p, i) => (
              <ProjectCard key={p.num} {...p} delay={i * 0.12} />
            ))}
          </div>

          {/* Center dividing line — animates top to bottom on scroll */}
          <div className="flex flex-col items-center flex-shrink-0" style={{ width: '20px', alignSelf: 'stretch' }}>
            {/* Top glow cap */}
            <div className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: '#00F0FF', boxShadow: '0 0 14px rgba(0,240,255,1)', marginTop: '24px' }} />
            {/* Track (grey background) */}
            <div className="relative flex-1" style={{ width: '2px', background: 'rgba(37,99,235,0.15)', borderRadius: '2px' }}>
              {/* Animated fill — grows from top */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${lineH}%`,
                background: 'linear-gradient(180deg, #00F0FF, #2563EB, #00F0FF)',
                boxShadow: '0 0 8px rgba(0,240,255,0.7)',
                borderRadius: '2px',
                transition: 'height 0.4s ease-out',
              }} />
            </div>
            {/* Bottom glow cap */}
            <div className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                background: '#2563EB',
                boxShadow: '0 0 14px rgba(37,99,235,1)',
                marginBottom: '24px',
                opacity: lineH >= 95 ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }} />
          </div>

          {/* Right column */}
          <div className="flex-1 flex flex-col gap-10 pl-8 pt-16">
            {right.map((p, i) => (
              <ProjectCard key={p.num} {...p} delay={i * 0.12 + 0.06} />
            ))}
          </div>
        </div>

        {/* ── Mobile: single column ── */}
        <div className="flex md:hidden flex-col gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.num} {...p} delay={i * 0.08} />
          ))}
        </div>

      </div>
    </section>
  )
}
