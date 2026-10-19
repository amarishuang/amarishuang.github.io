import { useState, useEffect } from 'react'

const EXPERIENCE_GROUPS = [
  { id: 'work',     label: 'Work & Internships' },
  { id: 'research', label: 'Research Experience' },
]

// what the jump bar links to, in order
const ANCHORS = [
  { id: 'all', label: 'All' },
  ...EXPERIENCE_GROUPS,
  { id: 'projects', label: 'Projects' },
]

const CATEGORY_TAGS = {
  research: 'Research Experience',
  work:     'Work Experience',
  projects: 'Project',
}

// `category` is one id or a list of them; a card shows up under each one it names.
const catsOf = p => (Array.isArray(p.category) ? p.category : [p.category])
const hasCat = (p, id) => catsOf(p).includes(id)

// ── ADD YOUR LINKS & IMAGES HERE ─────────────────────────────────────────────
// image: put a file in /public/work/sacmgmt.png etc, or leave null for emoji
// links: array of { label, href } — pink pills. An href starting with
//   http(s):// just opens in a new tab; a local file path (e.g.
//   /deliverables/foo.pdf) opens a preview modal (PDF/image inline,
//   PPTX/DOC/XLS via Office viewer) with Open/Download actions
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'beghou', category: 'work', emoji: '💊', color: '#8E4164',
    image: null,
    title: 'Beghou Consulting',
    meta: 'Associate Consultant · Life Sciences Strategy · 2026–Present',
    desc: 'Built a HIPAA-compliant data pipeline on AWS and Databricks for patient access and value assessment in a national oncology drug launch. Also worked a field effectiveness reporting engagement for a large pharmaceutical client, informing how they allocate commercial resources.',
    links: [],
  },
  {
    id: 'gehrke', category: ['work', 'research'], emoji: '🦟', color: '#6B4430',
    image: null,
    title: 'MIT IMES, Gehrke Lab',
    meta: 'Research Associate · Diagnostics · 2025–2026',
    desc: 'Addressed a gap in commercially viable diagnostics for Rocio and Powassan virus by leading 0-to-1 development and product iteration of two accessible, high-sensitivity lateral flow tests, from concept through clinical validation. Enabled two publications by translating diagnostic data into technical presentations for academic and industry collaborators.',
    links: [],
  },
  {
    id: 'chilkoti', category: 'research', emoji: '🧬', color: '#E08BA8',
    image: null,
    title: 'Duke University, Chilkoti Group',
    meta: 'Pratt Research Fellow · Protein Engineering · 2023–2025',
    desc: 'Led cross-functional development of point-of-care diagnostics for Ebola and Ricin, translating protein engineering, AlphaFold and thermodynamic modeling into microfluidic product design. Cut evaluation time 70% with an automated Python analysis pipeline, streamlining testing across 100+ prototype iterations to deliver a Department of Defense-funded prototype, and won over $13,000 in competitive grants and fellowships.',
    links: [],
  },
  {
    id: 'chatterjee', category: 'research', emoji: '🧪', color: '#8B5E42',
    image: null,
    title: 'Duke University, Chatterjee Lab',
    meta: 'Molecular Engineering Researcher · 2022–2023',
    desc: 'Engineered computationally designed bivalent peptides that bind oncogenic proteins and recruit E3 ubiquitin ligases for targeted post-translational regulation. Also developed an initial CRISPR-Cas9 base editor assay for high-throughput screening of PAM motifs using a GFP-promoter and puromycin selection strategy.',
    links: [],
  },
  {
    id: 'ramanujam', category: 'research', emoji: '💡', color: '#C2628A',
    image: null,
    title: "Duke Center for Global Women's Health Technologies",
    meta: 'Bass Connections Researcher · Engineering Education · 2023–2025',
    desc: "Co-designed a research study evaluating an engineering curriculum's impact on students' STEM identity and community engagement. Built the theoretical framework through an extensive literature review, navigated IRB approval, and pilot tested the study. Presented at BMES 2024 and the Bass Connections Showcases, and co-authored a peer-reviewed paper in the ASEE Conference Proceedings.",
    links: [
      { label: 'Read the paper', href: 'https://doi.org/10.18260/1-2--56729' },
    ],
  },
  {
    id: 'jax', category: 'work', emoji: '🖥️', color: '#A3785B',
    image: null,
    title: 'The Jackson Laboratory, Chuang Lab',
    meta: 'Computational Biology Intern · Machine Learning · 2022',
    desc: 'Implemented Convolutional Neural Networks and Vision Transformers to analyze morphological features in Cutaneous T-Cell Lymphoma histopathology images, reaching ~97% accuracy on tumor tile classification. Presented in an oral platform talk at the JAX Summer Symposium.',
    links: [],
  },
  {
    id: 'ncick', category: 'work', emoji: '🍎', color: '#8E4164',
    image: null,
    title: 'North Carolina Integrated Care for Kids',
    meta: 'Health Policy Intern · Public Health · 2022–2025',
    desc: 'Conducted 25+ physician interviews to identify unmet needs and financing mechanisms for scaling food insecurity programs nationwide, informing North Carolina Medicaid’s transformation strategy and an Academic Pediatrics publication. Co-first-authored a manuscript, in preparation, on an implementation science and human-centered design framework for co-designing scalable multi-sector workflows in complex care systems.',
    links: [],
  },
  {
    id: 'protgpt2-cas9', category: 'projects', emoji: '🧫', color: '#E08BA8',
    image: null,
    title: 'Generative Cas9 Design with ProtGPT2',
    meta: 'Computational Protein Design · Deep Learning',
    desc: 'An end-to-end pipeline that generates novel Cas9 sequences and predicts their function. ProtGPT2 produces candidate Cas9 amino acid sequences, which are encoded with VHSE physicochemical descriptors and fed to a CNN that predicts PAM specificity from the embedding. Generation alone produces sequences nobody can evaluate — pairing it with a property predictor makes the output actionable.',
    links: [],
  },
  {
    id: 'diffusion-cas9', category: 'projects', emoji: '🌀', color: '#7A4F37',
    image: null,
    title: 'Structure-First Cas9 Variant Generation',
    meta: 'Computational Protein Design · Diffusion Models',
    desc: 'Diffusion-based structure generation paired with inverse folding, benchmarked against the sequence-only approach. A contact-map-guided diffusion model generated novel Cas9 backbones, ProteinMPNN recovered sequences likely to fold into them, and a binary classifier screened outputs for Cas9 family membership. Running this alongside the ProtGPT2 pipeline gave a direct comparison of structure-conditioned versus sequence-only design.',
    links: [],
  },
  {
    id: 'tf-motif', category: 'projects', emoji: '🧷', color: '#B35A7E',
    image: null,
    title: 'Motif-Conditioned Transcription Factor Design',
    meta: 'Computational Protein Design · Sequence Models',
    desc: 'Seq2seq models trained to generate DNA binding domains from a target motif on a 26,000-sequence dataset curated from FootPrintDB. Built and compared two architectures — a DNABert encoder with a T5 decoder versus a pure T5 encoder-decoder — to test whether nucleotide-pretrained encoding improved conditioning. Validated with PCA and t-SNE clustering against real TF families, plus an SVM classifier.',
    links: [],
  },
  {
    id: 'query-engine', category: 'projects', emoji: '🗂️', color: '#9A6B4C',
    image: null,
    title: 'Query Execution Internals',
    meta: 'Database Systems · Python',
    desc: 'Implemented SQL operators and heap-based TopK retrieval from scratch. Built ORDER BY, LIMIT and OFFSET operators plus a TopK merge sort using heaps, which avoids sorting an entire relation when only a small result page is needed — the common case for paginated queries over large tables.',
    links: [],
  },
  {
    id: 'ny-hospital', category: 'projects', emoji: '🏥', color: '#C2628A',
    image: null,
    title: 'Urban vs. Rural Hospitalization Outcomes in New York State',
    meta: 'Data Science · Random Forests',
    desc: 'Random forest modeling on statewide hospitalization data to rank predictors of health severity. Tested whether residency type predicts severity of outcomes, using feature importance to identify the strongest contributors and frame recommendations around rural access.',
    links: [],
  },
  {
    id: 'brazil-air', category: 'projects', emoji: '🌫️', color: '#D3799A',
    image: null,
    title: 'Air Pollution and Health Burden in Brazil',
    meta: 'Data Science · Environmental Health',
    desc: 'Merged WHO monitoring data with regional hospitalization records to isolate pollutant-specific health effects. Applied regression modeling and hypothesis testing to separate the effects of individual pollutants and identify the demographic groups carrying disproportionate risk.',
    links: [],
  },
  {
    id: 'exam-table', category: 'projects', emoji: '🛠️', color: '#5C3A28',
    image: null,
    title: 'Gynecology Examination Table for a Peruvian Hospital',
    meta: 'Hardware & Design · Capstone · CAD',
    desc: 'A CAD-designed prototype built under a $200 budget, designed for patient comfort and screening accessibility in an under-resourced clinical setting. Won the capstone competition and advanced to field testing. I served as primary client contact, running stakeholder coordination and owning technical documentation through the full development cycle.',
    links: [
      { label: 'View the poster', href: '/deliverables/WA8_poster.pdf' },
    ],
  },
]

const LEADERSHIP = [
  { name: 'Biomedical Engineering Society',     role: 'VP of Outreach · 2024–2025',          emoji: '🩺' },
  { name: 'UNICEF',                             role: 'VP of Communications · 2022–2025',    emoji: '🌍' },
  { name: 'Duke Technology Scholars',           role: 'Scholar',                             emoji: '✨' },
  { name: 'Duke Housing & Residence Life',      role: 'Resident Assistant · 2022–2024',      emoji: '🏠' },
  { name: 'EGR 105: Computing for Engineers',   role: 'Teaching Assistant · 2024–2025',      emoji: '💻' },
  { name: 'Kode with Klossy',                   role: 'Summer Instructor Assistant',         emoji: '👩🏻‍💻' },
  { name: "Global Women's Health Technologies", role: 'Ignite Research Mentor · 2022–2025',  emoji: '💡' },
]

const HONORS = [
  { name: 'NAE Grand Challenge Scholar',           note: 'Global program addressing the National Academy of Engineering’s Grand Challenges through research, entrepreneurship, global engagement, and service.' },
  { name: 'Departmental Distinction in BME',       note: 'Graduated with distinction for independent research and a distinguished written thesis.' },
  { name: 'Pratt Research Fellowship',             note: 'Competitive undergraduate fellowship for immersive, faculty-mentored engineering research.' },
  { name: "Dean's List with Distinction",          note: 'Recognized for academic excellence in the engineering curriculum.' },
  { name: 'Lord Foundation Grant',                 note: "Funded access to Duke's Shared Materials Instrumentation Facility for advanced materials characterization." },
  { name: 'Jackson Laboratory Summer Scholar',     note: 'A 10-week research fellowship in genetics and biomedical research, funded through the National Cancer Institute.' },
]

const OFFICE_EXTS = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx']
const IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'webp']

function fileKind(href) {
  const ext = href.split('.').pop().toLowerCase()
  if (ext === 'pdf') return 'pdf'
  if (IMAGE_EXTS.includes(ext)) return 'image'
  if (OFFICE_EXTS.includes(ext)) return 'office'
  return 'other'
}

// Office Online's viewer needs a publicly reachable URL, so PPTX/DOC/XLS
// previews only render on the deployed site — not on localhost.
function DeliverableModal({ link, onClose }) {
  const kind = fileKind(link.href)
  const absoluteUrl = new URL(link.href, window.location.origin).href
  const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(absoluteUrl)}`

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
          <span className="resume-modal__title">📄 {link.label}</span>
          <div className="resume-modal__actions">
            <a href={link.href} target="_blank" rel="noreferrer" className="resume-modal__link">Open ↗</a>
            <a href={link.href} download className="resume-modal__link">Download ↓</a>
            <button className="resume-modal__close" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        <div className="resume-modal__scroll">
          {kind === 'pdf' && (
            <embed src={link.href} type="application/pdf" className="deliverable-embed" />
          )}
          {kind === 'image' && (
            <img src={link.href} alt={link.label} className="resume-img" />
          )}
          {kind === 'office' && (
            <iframe src={officeViewerUrl} title={link.label} className="deliverable-embed" />
          )}
          {kind === 'other' && (
            <div className="resume-modal__placeholder">
              <p>Preview isn't available for this file type.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ p, onPreview, compact = false }) {
  const [imgFailed, setImgFailed] = useState(false)
  // compact cards (the projects grid) keep the description folded away until
  // the card is pressed, so the section stays scannable
  const [open, setOpen] = useState(false)
  const showDesc = !compact || open

  const links = (p.links || []).filter(l => l.href)

  return (
    <article className={`wcard ${compact ? 'wcard--compact' : ''} ${open ? 'is-open' : ''}`}>
      {/* ── image / emoji header ── */}
      <div className="wcard__img-wrap" style={{ '--card-color': p.color }}>
        {p.image && !imgFailed ? (
          <img
            src={p.image}
            alt={p.title}
            className="wcard__img"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="wcard__emoji">{p.emoji}</span>
        )}
      </div>

      {/* ── body ── */}
      <div className="wcard__body">
        <span className="wcard__tag">{catsOf(p).map(c => CATEGORY_TAGS[c]).join(" · ")}</span>

        {compact ? (
          <button
            type="button"
            className="wcard__toggle"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span>
              <h3 className="wcard__title">{p.title}</h3>
              <p className="wcard__meta">{p.meta}</p>
            </span>
            <span className="wcard__chev" aria-hidden="true">{open ? '−' : '+'}</span>
          </button>
        ) : (
          <>
            <h3 className="wcard__title">{p.title}</h3>
            <p className="wcard__meta">{p.meta}</p>
          </>
        )}

        {showDesc && <p className="wcard__desc">{p.desc}</p>}

        {/* ── links ── */}
        {links.length > 0 && showDesc && (
          <div className="wcard__links">
            {links.map(link => (
              /^https?:\/\//.test(link.href) ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="wcard__pill"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  type="button"
                  className="wcard__pill"
                  onClick={() => onPreview(link)}
                >
                  {link.label}
                </button>
              )
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function WorkSection() {
  const [previewLink, setPreviewLink] = useState(null)
  const [inView, setInView] = useState('')

  // The bar jumps to a group rather than filtering: everything stays on the
  // page, so picking one heading never hides the others.
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setInView(e.target.dataset.group) }),
      { rootMargin: '-20% 0px -70% 0px' }
    )
    ANCHORS.forEach(a => {
      const el = document.getElementById(`group-${a.id}`)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const jump = id => document.getElementById(`group-${id}`)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <section id="work" className="section work-section">
        <div id="group-all" data-group="all" className="section__head">
          <h2 className="section__title">experience <span className="star">✶</span></h2>
          <p className="section__sub">Roles I've held across industry, research and public health.</p>
        </div>

        <div className="work-filters">
          {ANCHORS.map(a => (
            <button
              key={a.id}
              className={`work-filter ${inView === a.id ? 'work-filter--active' : ''}`}
              onClick={() => jump(a.id)}
            >
              {a.label}
            </button>
          ))}
        </div>

        {EXPERIENCE_GROUPS.map(g => (
          <div key={g.id} id={`group-${g.id}`} data-group={g.id} className="work-group">
            <h3 className="work-group__heading">{g.label}</h3>
            <div className="wcard-grid wcard-grid--compact">
              {PROJECTS.filter(p => hasCat(p, g.id)).map(p => (
                <ProjectCard key={`${g.id}-${p.id}`} p={p} onPreview={setPreviewLink} compact />
              ))}
            </div>
          </div>
        ))}

        <div className="volunteer">
          <h3 className="volunteer__heading">leadership &amp; teaching <span className="star">☆</span></h3>
          <div className="volunteer__grid">
            {LEADERSHIP.map((v, i) => (
              <div key={i} className="volunteer__card">
                <span className="volunteer__emoji">{v.emoji}</span>
                <div>
                  <p className="volunteer__name">{v.name}</p>
                  <p className="volunteer__role">{v.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="volunteer">
          <h3 className="volunteer__heading">honors &amp; awards <span className="star">☆</span></h3>
          <ul className="honors__list">
            {HONORS.map((h, i) => (
              <li key={i} className="honors__item">
                <p className="honors__name">{h.name}</p>
                <p className="honors__note">{h.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PROJECTS: its own band, visually separate from experience ── */}
      <section id="projects" className="section projects-band">
        <div id="group-projects" data-group="projects" className="projects-band__inner">
          <div className="section__head">
            <h2 className="section__title">projects <span className="star">✦</span></h2>
            <p className="section__sub">Things I've built on my own — computational biology, data and hardware.</p>
          </div>

          <div className="wcard-grid wcard-grid--compact">
            {PROJECTS.filter(p => hasCat(p, 'projects')).map(p => (
              <ProjectCard key={p.id} p={p} onPreview={setPreviewLink} compact />
            ))}
          </div>
        </div>
      </section>

      {previewLink && <DeliverableModal link={previewLink} onClose={() => setPreviewLink(null)} />}
    </>
  )
}
