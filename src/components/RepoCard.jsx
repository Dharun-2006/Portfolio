import { useState } from 'react'
import { FiStar, FiGitBranch, FiExternalLink, FiClock } from 'react-icons/fi'

const LANG_COLORS = {
  Python:     '#3572A5',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  HTML:       '#E34C26',
  CSS:        '#563D7C',
  Java:       '#B07219',
  C:          '#555555',
  'C++':      '#F34B7D',
  Jupyter:    '#DA5B0B',
  default:    '#2563EB',
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export default function RepoCard({ name, description, language, stargazers_count, forks_count, updated_at, html_url, index }) {
  const [hovered, setHovered] = useState(false)
  const langColor = LANG_COLORS[language] || LANG_COLORS.default

  return (
    <a href={html_url} target="_blank" rel="noreferrer"
      className="animate-on-scroll flex flex-col gap-3 p-5 rounded-xl"
      style={{
        background: hovered ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(0,240,255,0.4)' : 'rgba(37,99,235,0.2)'}`,
        backdropFilter: 'blur(16px)',
        boxShadow: hovered ? '0 0 25px rgba(37,99,235,0.35), 0 10px 40px rgba(0,240,255,0.1)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        transitionDelay: `${index * 0.08}s`,
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Name row */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold leading-snug" style={{ color: hovered ? '#00F0FF' : '#DBEAFE', transition: 'color 0.3s ease' }}>
          {name}
        </h4>
        <FiExternalLink size={14} style={{ color: '#3B82F6', flexShrink: 0, marginTop: 2 }} />
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed flex-1" style={{ color: '#93C5FD' }}>
        {description || 'No description provided.'}
      </p>

      {/* Footer row */}
      <div className="flex items-center gap-4 flex-wrap">
        {language && (
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#DBEAFE' }}>
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: langColor, boxShadow: `0 0 6px ${langColor}` }} />
            {language}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs" style={{ color: '#60A5FA' }}>
          <FiStar size={11} /> {stargazers_count}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: '#60A5FA' }}>
          <FiGitBranch size={11} /> {forks_count}
        </span>
        <span className="flex items-center gap-1 text-xs ml-auto" style={{ color: '#3B82F6' }}>
          <FiClock size={11} /> {timeAgo(updated_at)}
        </span>
      </div>
    </a>
  )
}
