import { useId } from 'react'

const LED = '#E5C287'
const GLOW = '#F3D9A4'

// Комната в одноточечной перспективе; viewBox 1600×1000.
const CEILING = '0,0 1600,0 1120,300 480,300'
const FLOOR = '0,1000 1600,1000 1120,680 480,680'
const LEFT = '0,0 480,300 480,680 0,1000'
const RIGHT = '1600,0 1120,300 1120,680 1600,1000'

const SPOTS = [
  [330, 95, 20], [800, 95, 20], [1270, 95, 20],
  [520, 195, 13], [800, 195, 13], [1080, 195, 13],
  [640, 262, 8], [800, 262, 8], [960, 262, 8],
]

const CEILING_FILL = { matte: '#2A2B2E', satin: '#303134', gloss: '#1B1C1F', shadow: '#26272A', hero: '#232427' }

export default function LightScene({ variant = 'hero', className = '', label }) {
  const id = useId().replace(/:/g, '')
  const perimeter = variant === 'shadow' || variant === 'hero'
  const spots = variant !== 'shadow'
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }

  return (
    <svg className={className} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" {...a11y}>
      <defs>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={perimeter ? '#6B5A3C' : '#3A372F'} />
          <stop offset="0.45" stopColor="#1E1F22" />
          <stop offset="1" stopColor="#111214" />
        </linearGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#141517" />
          <stop offset="1" stopColor="#222326" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#141517" />
          <stop offset="1" stopColor="#222326" />
        </linearGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#17181A" />
          <stop offset="1" stopColor="#0B0C0D" />
        </linearGradient>
        <linearGradient id={`${id}sheen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GLOW} stopOpacity="0" />
          <stop offset="0.75" stopColor={GLOW} stopOpacity={variant === 'gloss' ? 0.3 : 0.14} />
          <stop offset="1" stopColor={GLOW} stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id={`${id}halo`}>
          <stop offset="0" stopColor={GLOW} stopOpacity="0.85" />
          <stop offset="0.3" stopColor={LED} stopOpacity="0.3" />
          <stop offset="1" stopColor={LED} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}blur`} x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="#0D0E10" />
      <polygon points={LEFT} fill={`url(#${id}s)`} />
      <polygon points={RIGHT} fill={`url(#${id}r)`} />
      <rect x="480" y="300" width="640" height="380" fill={`url(#${id}w)`} />
      <polygon points={FLOOR} fill={`url(#${id}f)`} />
      <polygon points={CEILING} fill={CEILING_FILL[variant]} />
      {variant === 'matte' ? null : <polygon points={CEILING} fill={`url(#${id}sheen)`} />}

      {variant === 'gloss' ? (
        <g opacity="0.5">
          <rect x="610" y="40" width="380" height="150" fill="#3B3830" />
          <path d="M610 190h380M690 40v150M910 40v150" stroke="#55503F" strokeWidth="2" />
        </g>
      ) : null}

      {spots
        ? SPOTS.map(([x, y, r]) => (
            <g key={`${x}-${y}`}>
              <ellipse cx={x} cy={y} rx={r * 5} ry={r * 2.4} fill={`url(#${id}halo)`} />
              <ellipse cx={x} cy={y} rx={r} ry={r * 0.42} fill={GLOW} />
            </g>
          ))
        : null}

      {perimeter ? (
        <g fill="none" strokeLinecap="square">
          <path d="M0 0 480 300H1120L1600 0" stroke={LED} strokeWidth="26" opacity="0.55" filter={`url(#${id}blur)`} />
          <path d="M0 0 480 300H1120L1600 0" stroke={GLOW} strokeWidth="3" />
        </g>
      ) : null}

      <g stroke="#F4F1EC" strokeOpacity="0.1" fill="none">
        <path d="M480 300V680M1120 300V680M480 680H1120M0 1000 480 680M1600 1000 1120 680" />
      </g>
    </svg>
  )
}
