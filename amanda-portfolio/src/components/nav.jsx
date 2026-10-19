import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'me',   label: 'Me' },
  { id: 'work', label: 'Experience' },
]

// Resume viewer — renders the PDF at RESUME_PDF inline, with an Open/Download
// fallback for browsers that won't embed a PDF.
const RESUME_PDF = '/APM_2026_AmarisHuangResume.pdf'

function ResumeModal({ onClose }) {

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="resume-modal" onClick={onClose}>
      <div className="resume-modal__panel" onClick={e => e.stopPropagation()}>
        <div className="resume-modal__bar">
          <span className="resume-modal__title">📄 Resume</span>
          <div className="resume-modal__actions">
            <a href={RESUME_PDF} target="_blank" rel="noreferrer" className="resume-modal__link">Open PDF ↗</a>
            <a href={RESUME_PDF} download className="resume-modal__link">Download ↓</a>
            <button className="resume-modal__close" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        <div className="resume-modal__scroll">
          <embed src={RESUME_PDF} type="application/pdf" className="deliverable-embed" />
        </div>
      </div>
    </div>
  )
}

export default function Nav() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const [active, setActive] = useState('me')

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="pillnav">
        {SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={e => go(e, s.id)}
            className={active === s.id ? 'pillnav__link pillnav__link--active' : 'pillnav__link'}
          >
            {s.label}
          </a>
        ))}
        <button className="pillnav__link pillnav__resume" onClick={() => setResumeOpen(true)}>
          Resume
        </button>
      </nav>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </>
  )
}
