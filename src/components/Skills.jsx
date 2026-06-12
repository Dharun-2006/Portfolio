import { SiPython, SiJavascript, SiHtml5, SiMysql, SiTensorflow, SiOpencv, SiVscodium } from 'react-icons/si'
import { FaJava, FaBrain, FaCss3Alt } from 'react-icons/fa'
import { TbLetterC } from 'react-icons/tb'

const categories = [
  {
    title: 'Languages',
    emoji: '⌨️',
    skills: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'Java', icon: <FaJava /> },
      { name: 'C', icon: <TbLetterC /> },
      { name: 'C++', icon: <TbLetterC /> },
    ],
  },
  {
    title: 'Database',
    emoji: '🗄️',
    skills: [
      { name: 'SQL', icon: <SiMysql /> },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'JDBC', icon: <SiMysql /> },
    ],
  },
  {
    title: 'Data Science',
    emoji: '📊',
    skills: [
      { name: 'Machine Learning', icon: <FaBrain /> },
      { name: 'Data Analytics', icon: <SiTensorflow /> },
      { name: 'Data Visualization', icon: <SiHtml5 /> },
      { name: 'Pandas', icon: <SiPython /> },
      { name: 'NumPy', icon: <SiPython /> },
      { name: 'Scikit-Learn', icon: <SiPython /> },
    ],
  },
  {
    title: 'Tools',
    emoji: '🛠️',
    skills: [
      { name: 'RapidMiner', icon: <SiVscodium /> },
      { name: 'KNIME', icon: <SiVscodium /> },
      { name: 'VS Code', icon: <SiVscodium /> },
      { name: 'IntelliJ IDEA', icon: <SiVscodium /> },
      { name: 'Excel', icon: <FaCss3Alt /> },
      { name: 'Git', icon: <FaBrain /> },
      { name: 'Snowflake', icon: <SiMysql /> },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4" style={{ background: 'rgba(37,99,235,0.02)' }}>
      <div className="max-w-6xl mx-auto">

        <h2 className="section-title animate-on-scroll">
          My <span className="gradient-text">Skills</span>
        </h2>
        <div className="section-line animate-on-scroll" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ title, emoji, skills }, i) => (
            <div
              key={title}
              className="glass neon-card p-6 space-y-5 animate-on-scroll"
              style={{ border: '1px solid rgba(37,99,235,0.2)', transitionDelay: `${i * 0.08}s` }}
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="text-lg">{emoji}</span>
                <h3 className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#00F0FF', textShadow: '0 0 10px rgba(0,240,255,0.5)' }}>
                  {title}
                </h3>
              </div>

              {/* Divider */}
              <div className="glow-divider" />

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {skills.map(({ name, icon }) => (
                  <span key={name} className="neon-badge cursor-default">
                    <span style={{ color: '#2563EB' }}>{icon}</span>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
