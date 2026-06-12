import { FiBookOpen, FiAward } from 'react-icons/fi'

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">

        <h2 className="section-title animate-on-scroll">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="section-line animate-on-scroll" />

        <div className="grid md:grid-cols-2 gap-8">

          {/* Summary card */}
          <div className="glass neon-card p-8 space-y-5 animate-on-scroll"
            style={{ border: '1px solid rgba(37,99,235,0.2)' }}>

            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'rgba(37,99,235,0.15)', color: '#2563EB', border: '1px solid rgba(37,99,235,0.35)',
                         boxShadow: '0 0 15px rgba(37,99,235,0.3)' }}>
                <FiBookOpen />
              </span>
              <h3 className="text-xl font-bold" style={{ color: '#DBEAFE' }}>Summary</h3>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: '#93C5FD' }}>
              I am a Final Year Computer Science Engineering student at{' '}
              <span className="font-semibold" style={{ color: '#DBEAFE' }}>SRM Institute of Science and Technology</span>{' '}
              with a strong interest in Data Analytics, Data Science, Machine Learning, and Software Development.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#93C5FD' }}>
              I enjoy transforming raw data into meaningful insights and building solutions that solve real-world problems.
              My experience includes projects in Weed Detection using Deep Learning, Drug Classification and Analytics,
              Parking Management Systems, and Data Science applications.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#93C5FD' }}>
              I am actively seeking opportunities in Data Analytics, Data Science, Business Intelligence, and Software Development.
            </p>

            {/* Glow divider */}
            <div className="glow-divider" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['Data Analytics', 'Machine Learning', 'Python', 'SQL', 'Snowflake'].map(t => (
                <span key={t} className="neon-badge">{t}</span>
              ))}
            </div>
          </div>

          {/* Education card */}
          <div className="glass neon-card p-8 space-y-5 animate-on-scroll"
            style={{ border: '1px solid rgba(37,99,235,0.2)', transitionDelay: '0.15s' }}>

            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.3)',
                         boxShadow: '0 0 15px rgba(0,240,255,0.25)' }}>
                <FiAward />
              </span>
              <h3 className="text-xl font-bold" style={{ color: '#DBEAFE' }}>Education</h3>
            </div>

            <div className="pl-5 space-y-2" style={{ borderLeft: '2px solid rgba(37,99,235,0.5)' }}>
              <p className="font-bold" style={{ color: '#DBEAFE' }}>Bachelor of Technology (B.Tech)</p>
              <p className="text-sm" style={{ color: '#93C5FD' }}>Computer Science Engineering</p>
              <p className="text-sm" style={{ color: '#93C5FD' }}>SRM Institute of Science and Technology</p>
              <p className="text-xs font-mono" style={{ color: '#3B82F6' }}>Expected Graduation: 2027</p>
              <span className="inline-block mt-3 px-4 py-1.5 rounded-lg text-xs font-bold"
                style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.4)',
                         color: '#00F0FF', boxShadow: '0 0 12px rgba(37,99,235,0.3)' }}>
                Expected Graduation: 2027
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {[{ label: 'Graduation', value: 2027 }].map(({ label, value }) => (
                <div key={label} className="text-center p-4 rounded-xl transition-all duration-300"
                  style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.18)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,240,255,0.4)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(37,99,235,0.35)'
                    e.currentTarget.style.background = 'rgba(37,99,235,0.14)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(37,99,235,0.18)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.background = 'rgba(37,99,235,0.07)'
                  }}
                >
                  <p className="text-2xl font-extrabold gradient-text">{value}</p>
                  <p className="text-xs mt-1 font-medium" style={{ color: '#60A5FA' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
