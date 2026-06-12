import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'

const socials = [
  { icon: <FiGithub />,   href: 'https://github.com/Dharun-2006',                      label: 'GitHub'   },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/dharunprakashvadivel8356b52a1', label: 'LinkedIn' },
  { icon: <FiMail />,     href: 'mailto:dharunvadivel09@gmail.com',                   label: 'Email'    },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* ── Animated gradient blobs ── */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none animate-blob"
        style={{ top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none animate-blob-delay"
        style={{ bottom: '0%', right: '-5%', background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute w-[300px] h-[300px] rounded-full pointer-events-none animate-blob-delay2"
        style={{ top: '40%', left: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="section flex flex-col-reverse md:flex-row items-center gap-14 md:gap-20 w-full">

        {/* ── Text side ── */}
        <div className="flex-1 text-center md:text-left space-y-7">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.4)', color: '#00F0FF' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Open to Opportunities
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight" style={{ color: '#DBEAFE' }}>
            Hi, I'm{' '}
            <span className="shimmer-text">Dharun Prakash V</span>
          </h1>

          {/* Role */}
          <p className="text-base md:text-lg font-medium tracking-wide" style={{ color: '#93C5FD' }}>
            Aspiring Data Analyst | Data Science Enthusiast
          </p>

          {/* Tagline */}
          <blockquote className="text-sm italic pl-4 max-w-md mx-auto md:mx-0 leading-relaxed"
            style={{ borderLeft: '2px solid rgba(37,99,235,0.6)', color: '#60A5FA' }}>
            Final Year Computer Science Engineering student at SRM Institute of Science and Technology passionate about Data Analytics, Machine Learning, Python Development, and building intelligent data-driven solutions.
          </blockquote>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              View Projects
            </button>
            <a href="mailto:dharunvadivel09@gmail.com" className="btn-outline">
              Hire Me
            </a>
            <a href="https://drive.google.com/uc?export=download&id=1SoOGuWwxCP_zy0-wVcEXmBXRS7WgqQMJ" target="_blank" rel="noreferrer" className="btn-outline">
              Resume
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-3 justify-center md:justify-start">
            {socials.map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="w-11 h-11 flex items-center justify-center rounded-xl text-lg transition-all duration-300"
                style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.3)', color: '#93C5FD' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#00F0FF'
                  e.currentTarget.style.borderColor = 'rgba(0,240,255,0.6)'
                  e.currentTarget.style.background = 'rgba(37,99,235,0.18)'
                  e.currentTarget.style.boxShadow = '0 0 18px rgba(0,240,255,0.4)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#93C5FD'
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)'
                  e.currentTarget.style.background = 'rgba(37,99,235,0.08)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Avatar side ── */}
        <div className="flex-shrink-0 animate-float">
          <div className="relative w-52 h-52 md:w-64 md:h-64">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full animate-glow-pulse"
              style={{ background: 'linear-gradient(135deg,#2563EB,#00F0FF)', padding: '2.5px' }}>
              <div className="w-full h-full rounded-full" style={{ background: '#030712' }} />
            </div>
            {/* Second decorative ring */}
            <div className="absolute rounded-full pointer-events-none"
              style={{ inset: '-8px', border: '1px solid rgba(37,99,235,0.2)', borderRadius: '50%' }} />
            <div className="absolute rounded-full pointer-events-none"
              style={{ inset: '-16px', border: '1px solid rgba(0,240,255,0.08)', borderRadius: '50%' }} />
            {/* Photo */}
            <img
              src="/profile_face.jpeg"
              alt="Dharun Prakash V"
              className="absolute rounded-full object-cover object-center"
              style={{ top: '6px', left: '3px', width: 'calc(100% - 6px)', height: 'calc(100% - 6px)' }}
            />
            {/* Status dot */}
            <span className="absolute bottom-3 right-3 w-4 h-4 rounded-full border-2"
              style={{ background: '#00F0FF', borderColor: '#030712', boxShadow: '0 0 12px rgba(0,240,255,0.9)' }} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-all duration-200"
        style={{ color: '#3B82F6' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#00F0FF'; e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(0,240,255,0.8))' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#3B82F6'; e.currentTarget.style.filter = 'none' }}
        aria-label="Scroll down"
      >
        <FiArrowDown size={22} />
      </button>
    </section>
  )
}
