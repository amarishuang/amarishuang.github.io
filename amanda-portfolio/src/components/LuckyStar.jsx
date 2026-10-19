import { useState, useEffect } from 'react'

// A little paper lucky star tucked in the corner. Click it and it "unfolds"
// into a hidden note with ways to get in touch — a friendly easter egg.
export default function LuckyStar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        className="lucky-star"
        onClick={() => setOpen(true)}
        aria-label="Open the hidden note — ways to reach me"
        title="psst… open me ✦"
      >
        <img src="/stars/DNA.png" alt="" width={62} />
      </button>

      {open && (
        <div className="starnote" onClick={() => setOpen(false)}>
          <div className="starnote__card" onClick={e => e.stopPropagation()}>
            <div className="starnote__star"><img src="/stars/DNA.png" alt="" width={64} /></div>
            <p className="starnote__msg">let's connect!</p>

            <div className="starnote__links">
              <a className="starnote__link" href="mailto:amaris03@mit.edu">
                <span className="starnote__link-ic">✉️</span> amaris03@mit.edu
              </a>
              <a className="starnote__link" href="https://linkedin.com/in/amarishuang" target="_blank" rel="noreferrer">
                <span className="starnote__link-ic">in</span> LinkedIn ↗
              </a>
              <a className="starnote__link" href="/APM_2026_AmarisHuangResume.pdf" target="_blank" rel="noreferrer">
                <span className="starnote__link-ic">📄</span> Resume ↗
              </a>
            </div>

            <button className="starnote__btn starnote__btn--close" onClick={() => setOpen(false)}>close</button>
          </div>
        </div>
      )}
    </>
  )
}
