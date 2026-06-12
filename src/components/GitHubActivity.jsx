import { useEffect, useState, useCallback } from 'react'
import { FiGithub, FiStar, FiGitBranch, FiUsers, FiBook, FiRefreshCw, FiExternalLink, FiClock } from 'react-icons/fi'

const USERNAME = 'Dharun-2006'

const LANG_COLORS = {
  Python:     '#3572A5',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  HTML:       '#E34C26',
  CSS:        '#563D7C',
  Java:       '#B07219',
  C:          '#555555',
  'C++':      '#F34B7D',
  default:    '#2563EB',
}

function timeAgo(dateStr) {
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export default function GitHubActivity() {
  const [stats,   setStats]   = useState(null)
  const [langs,   setLangs]   = useState([])
  const [repos,   setRepos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${USERNAME}`),
        fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
      ])
      if (!userRes.ok)  throw new Error(`User API: ${userRes.status}`)
      if (!reposRes.ok) throw new Error(`Repos API: ${reposRes.status}`)

      const user     = await userRes.json()
      const allRepos = await reposRes.json()

      if (user.message)              throw new Error(user.message)
      if (!Array.isArray(allRepos))  throw new Error('Invalid repos response')

      // Stats
      setStats({
        repos:     user.public_repos,
        stars:     allRepos.reduce((s, r) => s + r.stargazers_count, 0),
        forks:     allRepos.reduce((s, r) => s + r.forks_count, 0),
        followers: user.followers,
      })

      // Languages
      const map = {}
      allRepos.forEach(r => { if (r.language) map[r.language] = (map[r.language] || 0) + 1 })
      const total = Object.values(map).reduce((a, b) => a + b, 0)
      setLangs(
        Object.entries(map)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count, pct: total ? Math.round((count / total) * 100) : 0 }))
      )

      // Recent repos (include forks too since account is small)
      setRepos(allRepos.slice(0, 5))

    } catch (e) {
      setError(e.message || 'Failed to load GitHub data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const statCards = stats ? [
    { icon: <FiBook size={20}/>,      label: 'Repositories', value: stats.repos,     color: '#60A5FA', glow: '37,99,235'   },
    { icon: <FiStar size={20}/>,      label: 'Total Stars',  value: stats.stars,     color: '#FCD34D', glow: '252,211,77'  },
    { icon: <FiGitBranch size={20}/>, label: 'Total Forks',  value: stats.forks,     color: '#34D399', glow: '52,211,153'  },
    { icon: <FiUsers size={20}/>,     label: 'Followers',    value: stats.followers, color: '#C084FC', glow: '192,132,252' },
  ] : []

  return (
    <section id="github" className="py-24 px-4" style={{ background: 'rgba(37,99,235,0.02)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4"
          style={{ animation: 'fadeInUp 0.5s ease forwards' }}>
          <FiGithub size={28} style={{ color: '#00F0FF', filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.8))' }} />
          <h2 className="section-title mb-0">Live <span className="gradient-text">GitHub Activity</span></h2>
        </div>
        <div className="section-line" style={{ animation: 'fadeInUp 0.5s ease 0.1s forwards', opacity: 0 }} />

        {/* Profile pill */}
        <div className="flex justify-center mb-10"
          style={{ animation: 'fadeInUp 0.5s ease 0.2s forwards', opacity: 0 }}>
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.35)', color: '#60A5FA', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(0,240,255,0.6)'; e.currentTarget.style.color='#00F0FF'; e.currentTarget.style.boxShadow='0 0 18px rgba(0,240,255,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(37,99,235,0.35)'; e.currentTarget.style.color='#60A5FA'; e.currentTarget.style.boxShadow='none' }}
          >
            <FiGithub size={13}/> github.com/{USERNAME}
          </a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="w-12 h-12 rounded-full" style={{ border: '2px solid rgba(37,99,235,0.2)', borderTopColor: '#2563EB', borderRightColor: '#00F0FF', animation: 'ghSpin 0.8s linear infinite' }} />
            <p className="text-sm" style={{ color: '#3B82F6' }}>Fetching live GitHub data...</p>
            <style>{`@keyframes ghSpin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="p-5 rounded-2xl text-center max-w-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <p className="text-sm font-semibold" style={{ color: '#FCA5A5' }}>⚠ {error}</p>
              <p className="text-xs mt-1" style={{ color: '#6B7280' }}>GitHub allows 60 unauthenticated requests/hour.</p>
            </div>
            <button onClick={fetchAll} className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold"
              style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.4)', color: '#60A5FA', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color='#00F0FF'; e.currentTarget.style.background='rgba(37,99,235,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.color='#60A5FA'; e.currentTarget.style.background='rgba(37,99,235,0.15)' }}
            >
              <FiRefreshCw size={14}/> Retry
            </button>
          </div>
        )}

        {/* Dashboard */}
        {!loading && !error && stats && (
          <div style={{ animation: 'fadeInUp 0.6s ease forwards' }}>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {statCards.map(({ icon, label, value, color, glow }, i) => (
                <StatCard key={label} icon={icon} label={label} value={value} color={color} glow={glow} delay={i * 120} />
              ))}
            </div>

            {/* ── Recent Repos only ── */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#2563EB', boxShadow: '0 0 8px rgba(37,99,235,0.9)', animation: 'pulse 2s infinite' }} />
                  <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#00F0FF' }}>Recent Repositories</h3>
                </div>
                {repos.map((repo, i) => <RepoRow key={repo.id} repo={repo} delay={i * 80} />)}
              </div>
          </div>
        )}

        <style>{`
          @keyframes fadeInUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        `}</style>
      </div>
    </section>
  )
}

/* ── Stat Card ── */
function StatCard({ icon, label, value, color, glow, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl cursor-default"
      style={{
        background:     hovered ? `rgba(${glow},0.1)` : 'rgba(255,255,255,0.04)',
        border:         `1px solid ${hovered ? `rgba(${glow},0.5)` : 'rgba(37,99,235,0.2)'}`,
        backdropFilter: 'blur(16px)',
        boxShadow:      hovered ? `0 0 25px rgba(${glow},0.35)` : 'none',
        transform:      hovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
        transition:     'all 0.3s ease',
        animation:      `fadeInUp 0.5s ease ${delay}ms both`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `rgba(${glow},0.12)`, border: `1px solid rgba(${glow},0.3)`, color, boxShadow: hovered ? `0 0 14px rgba(${glow},0.5)` : 'none', transition: 'all 0.3s' }}>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-black font-mono leading-none" style={{ color, textShadow: hovered ? `0 0 20px rgba(${glow},0.8)` : 'none', transition: 'text-shadow 0.3s' }}>
          <CountUp value={value} color={color} delay={delay} />
        </p>
        <p className="text-xs font-semibold uppercase tracking-widest mt-1.5" style={{ color: '#3B82F6' }}>{label}</p>
      </div>
    </div>
  )
}

/* ── Repo Row ── */
function RepoRow({ repo, delay }) {
  const [hovered, setHovered] = useState(false)
  const langColor = LANG_COLORS[repo.language] || LANG_COLORS.default
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer"
      className="flex flex-col gap-3 p-5 rounded-xl"
      style={{
        background:     hovered ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.04)',
        border:         `1px solid ${hovered ? 'rgba(0,240,255,0.4)' : 'rgba(37,99,235,0.2)'}`,
        backdropFilter: 'blur(16px)',
        boxShadow:      hovered ? '0 0 25px rgba(37,99,235,0.3)' : 'none',
        transform:      hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:     'all 0.3s ease',
        textDecoration: 'none',
        animation:      `fadeInUp 0.5s ease ${delay}ms both`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold" style={{ color: hovered ? '#00F0FF' : '#DBEAFE', transition: 'color 0.3s' }}>
          {repo.name}
        </h4>
        <FiExternalLink size={13} style={{ color: '#3B82F6', flexShrink: 0, marginTop: 2 }} />
      </div>
      <p className="text-xs leading-relaxed" style={{ color: '#93C5FD' }}>
        {repo.description || 'No description provided.'}
      </p>
      <div className="flex items-center gap-4 flex-wrap">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#DBEAFE' }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColor, boxShadow: `0 0 5px ${langColor}` }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs" style={{ color: '#60A5FA' }}>
          <FiStar size={11}/> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: '#60A5FA' }}>
          <FiGitBranch size={11}/> {repo.forks_count}
        </span>
        <span className="flex items-center gap-1 text-xs ml-auto" style={{ color: '#3B82F6' }}>
          <FiClock size={11}/> {timeAgo(repo.updated_at)}
        </span>
      </div>
    </a>
  )
}

function CountUp({ value, color, delay = 0 }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (value === undefined || value === null) return
    const steps = 50
    let current = 0
    const inc = value / steps
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        current += inc
        if (current >= value) { setCount(value); clearInterval(iv) }
        else setCount(Math.floor(current))
      }, 1200 / steps)
    }, delay + 300)
    return () => clearTimeout(t)
  }, [value, delay])
  return <span style={{ color }}>{count.toLocaleString()}</span>
}
