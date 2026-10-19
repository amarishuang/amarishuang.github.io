import { useEffect } from 'react'
import PageStars from '../components/PageStars'
import MeSection from '../sections/MeSection'
import WorkSection from '../sections/WorkSection'

export default function Home() {
  useEffect(() => {
    // scroll-reveal for sections
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.onepage .reveal-up').forEach(el => io.observe(el))

    return () => io.disconnect()
  }, [])

  return (
    <main className="onepage">
      <PageStars stars={[
        { size: 72, top: '7%',  left: '4%',  dur: '6s',   spin: '13s' },
        { size: 58, top: '20%', right: '3%', dur: '7s',   spin: '15s', delay: '1.2s' },
        { size: 54, top: '43%', left: '5%',  dur: '6.8s', spin: '12s', delay: '0.6s' },
        { size: 62, top: '58%', right: '2%', dur: '6.5s', spin: '14s', delay: '0.4s' },
        { size: 66, top: '75%', left: '5%',  dur: '7.2s', spin: '13s', delay: '1s'   },
        { size: 56, top: '90%', right: '4%', dur: '6.4s', spin: '12s', delay: '0.8s' },
      ]} />

      {/* ── ME ── */}
      <MeSection />

      {/* ── WORK ── */}
      <WorkSection />

    </main>
  )
}
