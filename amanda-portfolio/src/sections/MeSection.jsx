import { useState } from 'react'

function PhotoWidget() {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <div className="me-photo-placeholder">🙋‍♀️</div>
  ) : (
    <img
      className="me-photo"
      src="/gradHeadshot.jpg"
      alt="Amaris"
      onError={() => setFailed(true)}
    />
  )
}

export default function MeSection() {
  return (
    <section id="me" className="me-split">

      {/* ── LEFT: sticky name + photo ── */}
      <div className="me-left">
        <div className="me-name">
          <span className="me-name__im">I'm</span>
          <span className="me-name__main">Amaris<span className="me-name__dot">.</span></span>
        </div>
        <PhotoWidget />
      </div>

      {/* ── RIGHT: scrolling chapters ── */}
      <div className="me-right">
        <div className="me-chapter">
          <p className="me-chapter__label">Me!</p>
          <p>
            At Duke, I studied <strong>Biomedical Engineering</strong> and{' '}
            <strong>Computer Science</strong> — extensively focused on health innovation, access, and policy as a <strong>Pratt Fellow</strong> and <strong>National Academy of Engineering Grand Challenges Scholar</strong>.
          </p>
        </div>

        <div className="me-chapter">
          <p className="me-chapter__label">What I'm Up To</p>
          <p>
            I'm passionate about developing strategic solutions for complex problems.
            I've worked across <strong>health</strong>,{' '}
            <strong>biotechnology</strong>, and{' '}
            <strong>consulting</strong>. Now at Beghou, I'm an associate consultant working on commercial excellence projects for pharmaceutical and biotech clients.
          </p>
        </div>

        <div className="me-chapter">
          <p className="me-chapter__label">After Hours</p>
          <p>
            You'll find me half-marathon training, at Solidcore, or making matcha lattes. Always happy to connect!
          </p>
        </div>
      </div>

    </section>
  )
}