import { useMemo } from 'react'
import { planPoints, spotPositions } from '../lib/plan.js'

const W = 100
const H = 72

export default function RoomPlan({ area, spots, corners, areaMax }) {
  const points = useMemo(() => planPoints(corners, W, H), [corners])
  const lights = useMemo(() => spotPositions(spots, points, W, H), [spots, points])
  const scale = 0.52 + 0.48 * Math.sqrt(area / areaMax)
  const path = `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')}Z`

  return (
    <svg
      viewBox="-14 -14 128 100"
      className="h-full w-full"
      role="img"
      aria-label={`План потолка: ${area} м², углов — ${corners}, светильников — ${spots}`}
    >
      <g stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.2">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={`v${i}`} d={`M${-14 + i * 10.667} -14V86`} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <path key={`h${i}`} d={`M-14 ${-14 + i * 11.11}H114`} />
        ))}
      </g>
      <g className="plan-room" style={{ transform: `scale(${scale.toFixed(3)})` }}>
        <path d={path} fill="rgba(229,194,135,0.1)" stroke="currentColor" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
        {points.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 1} y={y - 1} width="2" height="2" fill="currentColor" />
        ))}
        {lights.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="2.6" fill="#E5C287" opacity="0.28" />
            <circle cx={x} cy={y} r="0.9" fill="#B98A3E" />
          </g>
        ))}
      </g>
    </svg>
  )
}
