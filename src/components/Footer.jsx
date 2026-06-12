import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const socials = [
  { icon: <FiGithub size={16} />,   href: 'https://github.com/Dharun-2006',                      label: 'GitHub'   },
  { icon: <FiLinkedin size={16} />, href: 'https://www.linkedin.com/in/dharunprakashvadivel8356b52a1', label: 'LinkedIn' },
  { icon: <FiMail size={16} />,     href: 'mailto:dharunvadivel09@gmail.com',                     label: 'Email'    },
]

export default function Footer() {
  return (
    <footer className="py-10 px-4 text-center">
      <div className="glow-divider mb-8 max-w-6xl mx-auto" />

      <div className="flex justify-center gap-3 mb-5">
        {socials.map(({ icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300"
            style={{ color: '#3B82F6', border: '1px solid rgba(37,99,235,0.2)', background: 'rgba(37,99,235,0.06)' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#00F0FF'
              e.currentTarget.style.borderColor = 'rgba(0,240,255,0.5)'
              e.currentTarget.style.background = 'rgba(37,99,235,0.15)'
              e.currentTarget.style.boxShadow = '0 0 14px rgba(0,240,255,0.4)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#3B82F6'
              e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)'
              e.currentTarget.style.background = 'rgba(37,99,235,0.06)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {icon}
          </a>
        ))}
      </div>

      <p className="text-xs" style={{ color: '#1D4ED8' }}>
        Designed &amp; Built by{' '}
        <span className="gradient-text font-bold">Dharun Prakash V</span>
        {' '}· {new Date().getFullYear()}
      </p>
    </footer>
  )
}
