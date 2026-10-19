// A faceted origami "lucky star". Straight fold-lines with alternating light/
// dark faces + a lit highlight and a shadowed base give the folded-paper look.
// Pass light/dark/stroke to recolor it. (Mirrored in public/favicon.svg.)
export default function PaperStar({ size = 40, light = '#F2A9C0', dark = '#E08BA8', stroke = '#B35A7E', className = '' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      {/* folded facets */}
      <path d="M32 32 L32 2 L40.82 19.86 Z"        fill={light} />
      <path d="M32 32 L40.82 19.86 L60.53 22.73 Z" fill={dark} />
      <path d="M32 32 L60.53 22.73 L46.27 36.64 Z" fill={light} />
      <path d="M32 32 L46.27 36.64 L49.63 56.27 Z" fill={dark} />
      <path d="M32 32 L49.63 56.27 L32 47 Z"        fill={light} />
      <path d="M32 32 L32 47 L14.37 56.27 Z"        fill={dark} />
      <path d="M32 32 L14.37 56.27 L17.73 36.64 Z"  fill={light} />
      <path d="M32 32 L17.73 36.64 L3.47 22.73 Z"   fill={dark} />
      <path d="M32 32 L3.47 22.73 L23.18 19.86 Z"   fill={light} />
      <path d="M32 32 L23.18 19.86 L32 2 Z"         fill={dark} />
      {/* lit top point + shadowed base for a 3D fold */}
      <path d="M32 32 L23.18 19.86 L32 2 L40.82 19.86 Z" fill="#FFFFFF" opacity="0.22" />
      <path d="M32 32 L14.37 56.27 L32 47 L49.63 56.27 Z" fill="#000000" opacity="0.12" />
      <path
        d="M32 2 L40.82 19.86 L60.53 22.73 L46.27 36.64 L49.63 56.27 L32 47 L14.37 56.27 L17.73 36.64 L3.47 22.73 L23.18 19.86 Z"
        fill="none" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round"
      />
    </svg>
  )
}
