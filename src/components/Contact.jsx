import { useState } from 'react'
import { FaUser, FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { MdSubject } from 'react-icons/md'

const contactItems = [
  {
    icon: <FaEnvelope size={18} />,
    label: 'Email',
    value: 'dharunvadivel09@gmail.com',
    href: 'mailto:dharunvadivel09@gmail.com',
    iconBg: 'rgba(37,99,235,0.2)',
    iconBorder: 'rgba(37,99,235,0.5)',
    iconColor: '#60A5FA',
    hoverGlow: 'rgba(37,99,235,0.4)',
  },
  {
    icon: <FaLinkedin size={18} />,
    label: 'LinkedIn',
    value: 'dharunprakashvadivel8356b52a1',
    href: 'https://www.linkedin.com/in/dharunprakashvadivel8356b52a1',
    iconBg: 'rgba(0,119,181,0.2)',
    iconBorder: 'rgba(0,119,181,0.5)',
    iconColor: '#38BDF8',
    hoverGlow: 'rgba(0,119,181,0.4)',
  },
  {
    icon: <FaGithub size={18} />,
    label: 'GitHub',
    value: 'Dharun-2006',
    href: 'https://github.com/Dharun-2006',
    iconBg: 'rgba(255,255,255,0.08)',
    iconBorder: 'rgba(255,255,255,0.2)',
    iconColor: '#DBEAFE',
    hoverGlow: 'rgba(255,255,255,0.15)',
  },
  {
    icon: <FaMapMarkerAlt size={18} />,
    label: 'Location',
    value: 'Chennai, Tamil Nadu, India',
    href: null,
    iconBg: 'rgba(0,240,255,0.12)',
    iconBorder: 'rgba(0,240,255,0.35)',
    iconColor: '#00F0FF',
    hoverGlow: 'rgba(0,240,255,0.3)',
  },
]

const inputBase = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(37,99,235,0.25)',
  borderRadius: '10px',
  color: '#DBEAFE',
  outline: 'none',
  width: '100%',
  transition: 'all 0.25s ease',
  fontSize: '14px',
}

function NeonInput({ icon, placeholder, type = 'text', name, value, onChange, as }) {
  const [focused, setFocused] = useState(false)
  const focusStyle = focused ? {
    borderColor: 'rgba(0,240,255,0.6)',
    boxShadow: '0 0 0 3px rgba(37,99,235,0.15), 0 0 15px rgba(0,240,255,0.15)',
    background: 'rgba(37,99,235,0.07)',
  } : {}

  const sharedProps = {
    name,
    value,
    onChange,
    placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: { ...inputBase, ...focusStyle, padding: as === 'textarea' ? '12px 12px 12px 40px' : '11px 12px 11px 40px' },
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Icon */}
      <span style={{
        position: 'absolute', left: 12, top: as === 'textarea' ? 13 : '50%',
        transform: as === 'textarea' ? 'none' : 'translateY(-50%)',
        color: focused ? '#00F0FF' : '#3B82F6',
        transition: 'color 0.25s ease', fontSize: 14, zIndex: 1,
      }}>
        {icon}
      </span>
      {as === 'textarea'
        ? <textarea {...sharedProps} rows={5} style={{ ...sharedProps.style, resize: 'none' }} />
        : <input {...sharedProps} type={type} />
      }
    </div>
  )
}

function ContactCard({ icon, label, value, href, iconBg, iconBorder, iconColor, hoverGlow }) {
  const [hovered, setHovered] = useState(false)
  const content = (
    <div
      className="flex items-center gap-4 p-4 rounded-xl animate-on-scroll"
      style={{
        background: hovered ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? `rgba(0,240,255,0.35)` : 'rgba(37,99,235,0.18)'}`,
        boxShadow: hovered ? `0 8px 30px ${hoverGlow}` : 'none',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        cursor: href ? 'pointer' : 'default',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon circle */}
      <span className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{
          background: iconBg,
          border: `1px solid ${iconBorder}`,
          color: iconColor,
          boxShadow: hovered ? `0 0 14px ${hoverGlow}` : 'none',
          transition: 'all 0.3s ease',
        }}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#3B82F6' }}>{label}</p>
        <p className="text-sm font-medium truncate" style={{ color: hovered ? '#00F0FF' : '#DBEAFE', transition: 'color 0.3s ease' }}>{value}</p>
      </div>
    </div>
  )
  return href ? <a href={href} target="_blank" rel="noreferrer">{content}</a> : content
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [btnHover, setBtnHover] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const { name, email, subject, message } = form
    const mailto = `mailto:dharunvadivel09@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.location.href = mailto
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">

        <h2 className="section-title animate-on-scroll">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <div className="section-line animate-on-scroll" />

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── LEFT: Contact Form ── */}
          <div className="animate-on-scroll rounded-2xl p-8 flex flex-col gap-6"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(37,99,235,0.25)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 40px rgba(37,99,235,0.1)',
            }}>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.4)',
                         color: '#00F0FF', boxShadow: '0 0 12px rgba(37,99,235,0.3)' }}>
                <FaPaperPlane size={16} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: '#DBEAFE' }}>Send a Message</h3>
                <p className="text-xs" style={{ color: '#3B82F6' }}>I'll get back to you soon</p>
              </div>
            </div>

            {/* Divider */}
            <div className="glow-divider" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#3B82F6' }}>Name</label>
                  <NeonInput icon={<FaUser />} placeholder="Your name" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#3B82F6' }}>Email</label>
                  <NeonInput icon={<FaEnvelope />} placeholder="your@email.com" type="email" name="email" value={form.email} onChange={handleChange} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#3B82F6' }}>Subject</label>
                <NeonInput icon={<MdSubject />} placeholder="What's this about?" name="subject" value={form.subject} onChange={handleChange} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#3B82F6' }}>Message</label>
                <NeonInput icon={<FaEnvelope />} placeholder="Write your message here..." name="message" value={form.message} onChange={handleChange} as="textarea" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white mt-1"
                style={{
                  background: btnHover ? 'linear-gradient(90deg,#00F0FF,#2563EB)' : 'linear-gradient(90deg,#2563EB,#00F0FF)',
                  transform: btnHover ? 'scale(1.03)' : 'scale(1)',
                  boxShadow: btnHover ? '0 0 25px rgba(37,99,235,0.7), 0 0 50px rgba(0,240,255,0.3)' : '0 0 15px rgba(37,99,235,0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
              >
                <FaPaperPlane size={14} style={{ transform: btnHover ? 'rotate(15deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                {sent ? '✓ Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* ── RIGHT: Contact Info ── */}
          <div className="animate-on-scroll flex flex-col gap-6" style={{ transitionDelay: '0.15s' }}>

            <div className="rounded-2xl p-8 flex flex-col gap-6"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(37,99,235,0.25)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(37,99,235,0.1)',
              }}>

              {/* Header */}
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#DBEAFE' }}>Contact Information</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#93C5FD' }}>
                  I'm currently open to internships, collaborations, and exciting projects.
                  Feel free to reach out — I'd love to connect and build something great together!
                </p>
              </div>

              <div className="glow-divider" />

              {/* Contact items */}
              <div className="flex flex-col gap-3">
                {contactItems.map(item => (
                  <ContactCard key={item.label} {...item} />
                ))}
              </div>

              <div className="glow-divider" />

              {/* Availability badge */}
              <div className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)' }}>
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse"
                  style={{ background: '#00F0FF', boxShadow: '0 0 8px rgba(0,240,255,0.9)' }} />
                <p className="text-sm font-semibold" style={{ color: '#DBEAFE' }}>
                  Available for opportunities &amp; collaborations
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
