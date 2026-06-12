import { useState } from 'react'
import { FiAward, FiStar } from 'react-icons/fi'

const achievements = [
  {
    icon: <FiAward size={28} />,
    title: 'Altair Data Science Certification',
    description: 'Completed a data science certification from Altair covering analytics, predictive modeling, and business intelligence workflows.',
    tag: 'Certification',
    link: 'https://drive.google.com/file/d/1pkwfoFd-su6cJFgIfXzMafGkbJKwjEdW/view?usp=sharing',
    hoverBg:          'linear-gradient(135deg, rgba(252,211,77,0.18), rgba(251,191,36,0.08))',
    hoverBorder:      'rgba(252,211,77,0.7)',
    hoverShadow:      '0 0 30px rgba(252,211,77,0.4), 0 20px 50px rgba(252,211,77,0.2)',
    hoverIconBg:      'rgba(252,211,77,0.2)',
    hoverIconBorder:  'rgba(252,211,77,0.6)',
    hoverIconColor:   '#FCD34D',
    hoverIconGlow:    '0 0 20px rgba(252,211,77,0.7)',
    hoverTagBg:       'rgba(252,211,77,0.15)',
    hoverTagBorder:   'rgba(252,211,77,0.5)',
    hoverTagColor:    '#FCD34D',
    hoverTitle:       '#FDE68A',
    hoverText:        '#FEF3C7',
    hoverDivider:     'linear-gradient(90deg,transparent,rgba(252,211,77,0.6),rgba(251,191,36,0.6),transparent)',
  },
  {
    icon: <FiStar size={28} />,
    title: 'Java for Beginners – Navin Reddy',
    description: 'Completed a certification in Java programming fundamentals, object-oriented design, and application development workflows.',
    tag: 'Certification',
    link: 'https://drive.google.com/file/d/1Hriw7-4M7XVg-gV4EY2pQxlfqpoV7jVr/view?usp=drive_link',
    hoverBg:          'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(37,99,235,0.08))',
    hoverBorder:      'rgba(59,130,246,0.7)',
    hoverShadow:      '0 0 30px rgba(59,130,246,0.4), 0 20px 50px rgba(59,130,246,0.2)',
    hoverIconBg:      'rgba(59,130,246,0.2)',
    hoverIconBorder:  'rgba(59,130,246,0.6)',
    hoverIconColor:   '#60A5FA',
    hoverIconGlow:    '0 0 20px rgba(59,130,246,0.7)',
    hoverTagBg:       'rgba(59,130,246,0.12)',
    hoverTagBorder:   'rgba(59,130,246,0.5)',
    hoverTagColor:    '#60A5FA',
    hoverTitle:       '#BFDBFE',
    hoverText:        '#DBEAFE',
    hoverDivider:     'linear-gradient(90deg,transparent,rgba(59,130,246,0.6),rgba(37,99,235,0.6),transparent)',
  },
  {
    icon: <FiStar size={28} />,
    title: 'AI & ML Certification',
    description: 'Completed a certification in Artificial Intelligence and Machine Learning, including model building, evaluation, and data-driven automation.',
    tag: 'Certification',
    link: 'https://drive.google.com/file/d/1m0fUzE9rxGx6_P3HRJBKrXM7NKNaFKeQ/view?usp=sharing',
    hoverBg:          'linear-gradient(135deg, rgba(168,85,247,0.18), rgba(124,58,237,0.08))',
    hoverBorder:      'rgba(168,85,247,0.7)',
    hoverShadow:      '0 0 30px rgba(168,85,247,0.4), 0 20px 50px rgba(168,85,247,0.2)',
    hoverIconBg:      'rgba(168,85,247,0.2)',
    hoverIconBorder:  'rgba(168,85,247,0.6)',
    hoverIconColor:   '#C084FC',
    hoverIconGlow:    '0 0 20px rgba(168,85,247,0.7)',
    hoverTagBg:       'rgba(168,85,247,0.12)',
    hoverTagBorder:   'rgba(168,85,247,0.5)',
    hoverTagColor:    '#C084FC',
    hoverTitle:       '#DDD6FE',
    hoverText:        '#E9D5FF',
    hoverDivider:     'linear-gradient(90deg,transparent,rgba(168,85,247,0.6),rgba(124,58,237,0.6),transparent)',
  },
]

// Default (idle) styles
const idle = {
  bg:         'rgba(255,255,255,0.04)',
  border:     'rgba(37,99,235,0.2)',
  shadow:     'none',
  iconBg:     'rgba(37,99,235,0.1)',
  iconBorder: 'rgba(37,99,235,0.3)',
  iconColor:  '#3B82F6',
  iconGlow:   'none',
  tagBg:      'rgba(37,99,235,0.1)',
  tagBorder:  'rgba(37,99,235,0.3)',
  tagColor:   '#60A5FA',
  title:      '#DBEAFE',
  text:       '#93C5FD',
  divider:    'linear-gradient(90deg,transparent,rgba(37,99,235,0.5),rgba(0,240,255,0.5),transparent)',
}

function AchievementCard({ icon, title, description, tag, link, ...hover }) {
  const [hovered, setHovered] = useState(false)
  const s = hovered ? {
    bg:         hover.hoverBg,
    border:     hover.hoverBorder,
    shadow:     hover.hoverShadow,
    iconBg:     hover.hoverIconBg,
    iconBorder: hover.hoverIconBorder,
    iconColor:  hover.hoverIconColor,
    iconGlow:   hover.hoverIconGlow,
    tagBg:      hover.hoverTagBg,
    tagBorder:  hover.hoverTagBorder,
    tagColor:   hover.hoverTagColor,
    title:      hover.hoverTitle,
    text:       hover.hoverText,
    divider:    hover.hoverDivider,
  } : idle

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-5 p-8 rounded-2xl animate-on-scroll"
      style={{
        background:    s.bg,
        border:        `1px solid ${s.border}`,
        boxShadow:     s.shadow,
        backdropFilter: 'blur(16px)',
        transform:     hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        transition:    'all 0.35s ease',
        cursor:        'pointer',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon + tag */}
      <div className="flex items-start justify-between">
        <span className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: s.iconBg,
            border:     `1px solid ${s.iconBorder}`,
            color:      s.iconColor,
            boxShadow:  s.iconGlow,
            transition: 'all 0.35s ease',
          }}>
          {icon}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-bold"
          style={{
            background: s.tagBg,
            border:     `1px solid ${s.tagBorder}`,
            color:      s.tagColor,
            transition: 'all 0.35s ease',
          }}>
          {tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold leading-snug"
        style={{ color: s.title, transition: 'color 0.35s ease' }}>
        {title}
      </h3>

      {/* Divider */}
      <div style={{ height: 1, background: s.divider, transition: 'background 0.35s ease' }} />

      {/* Description */}
      <p className="text-sm leading-relaxed"
        style={{ color: s.text, transition: 'color 0.35s ease' }}>
        {description}
      </p>

      {/* View Certificate link */}
      <div className="flex items-center gap-1 text-xs font-semibold mt-auto"
        style={{ color: hovered ? s.tagColor : '#3B82F6', transition: 'color 0.35s ease' }}>
        View Certificate ↗
      </div>
    </a>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-4" style={{ background: 'rgba(37,99,235,0.02)' }}>
      <div className="max-w-6xl mx-auto">

        <h2 className="section-title animate-on-scroll">
          <span className="gradient-text">Achievements</span>
        </h2>
        <div className="section-line animate-on-scroll" />

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {achievements.map((a, i) => (
            <AchievementCard key={a.title} {...a} />
          ))}
        </div>
      </div>
    </section>
  )
}
