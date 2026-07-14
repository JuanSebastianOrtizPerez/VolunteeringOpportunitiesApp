/**
 * Gively logo — circular laurel wreath crest with a heart at center.
 * Inspired by the attached badge/emblem reference.
 */
interface Props {
  size?: number
  className?: string
}

export default function GivelyLogo({ size = 40, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle background */}
      <circle cx="40" cy="40" r="38" fill="#166534" />
      <circle cx="40" cy="40" r="36" fill="#15803d" />
      <circle cx="40" cy="40" r="32" fill="#166534" />

      {/* Inner cream fill */}
      <circle cx="40" cy="40" r="26" fill="#f0fdf4" />

      {/* ── Left laurel branch ── */}
      {/* Each leaf is a rotated ellipse + stem */}
      {[
        { cx: 20, cy: 56, rx: 4.5, ry: 2.2, angle: -55 },
        { cx: 17, cy: 48, rx: 4.5, ry: 2.2, angle: -75 },
        { cx: 16, cy: 40, rx: 4.5, ry: 2.2, angle: -90 },
        { cx: 17, cy: 32, rx: 4.5, ry: 2.2, angle: -105 },
        { cx: 20, cy: 24, rx: 4.5, ry: 2.2, angle: -125 },
        { cx: 25, cy: 18, rx: 4.5, ry: 2.2, angle: -145 },
      ].map((l, i) => (
        <ellipse
          key={`ll${i}`}
          cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
          fill="#22c55e"
          transform={`rotate(${l.angle} ${l.cx} ${l.cy})`}
        />
      ))}

      {/* ── Right laurel branch ── */}
      {[
        { cx: 60, cy: 56, rx: 4.5, ry: 2.2, angle: 55 },
        { cx: 63, cy: 48, rx: 4.5, ry: 2.2, angle: 75 },
        { cx: 64, cy: 40, rx: 4.5, ry: 2.2, angle: 90 },
        { cx: 63, cy: 32, rx: 4.5, ry: 2.2, angle: 105 },
        { cx: 60, cy: 24, rx: 4.5, ry: 2.2, angle: 125 },
        { cx: 55, cy: 18, rx: 4.5, ry: 2.2, angle: 145 },
      ].map((l, i) => (
        <ellipse
          key={`rl${i}`}
          cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
          fill="#22c55e"
          transform={`rotate(${l.angle} ${l.cx} ${l.cy})`}
        />
      ))}

      {/* Bottom bow / tie */}
      <path d="M32 64 Q40 68 48 64 Q40 70 32 64Z" fill="#16a34a" />
      {/* Small berries at base */}
      <circle cx="36" cy="65" r="2" fill="#dc2626" />
      <circle cx="40" cy="67" r="2" fill="#dc2626" />
      <circle cx="44" cy="65" r="2" fill="#dc2626" />

      {/* ── Center heart ── */}
      <path
        d="M40 52 C40 52 28 44 28 36 C28 31 32 28 36 30 C38 31 40 33 40 33 C40 33 42 31 44 30 C48 28 52 31 52 36 C52 44 40 52 40 52Z"
        fill="#dc2626"
      />
      {/* Heart highlight */}
      <path
        d="M33 32 C31 33 30 36 31 38"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Top star accent */}
      <path
        d="M40 12 L41.2 15.5 L45 15.5 L42 17.7 L43.2 21.2 L40 19 L36.8 21.2 L38 17.7 L35 15.5 L38.8 15.5 Z"
        fill="#fbbf24"
      />
    </svg>
  )
}
