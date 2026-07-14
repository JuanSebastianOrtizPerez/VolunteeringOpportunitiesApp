/**
 * Decorative vine & leaves background — SVG-based, fixed behind all content.
 * Two corner vines (top-left, bottom-right) with animated leaves.
 * Opacity is low so it never competes with content readability.
 */
interface Props {
  opacity?: number
}

export default function VineBg({ opacity = 0.07 }: Props) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Top-left vine ── */}
        <g className="vine-sway">
          {/* Main stem */}
          <path
            d="M0 0 C60 80 40 160 90 220 C140 280 80 360 130 440 C180 520 120 600 180 680"
            stroke="#166534"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Tendril curls */}
          <path d="M90 220 C110 200 130 210 120 230 C115 240 105 235 108 225" stroke="#15803d" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M130 440 C150 420 170 430 160 450 C155 460 145 455 148 445" stroke="#15803d" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Leaves along the stem */}
          {[
            { x: 45, y: 60, r: -45, s: 1.2 },
            { x: 75, y: 120, r: 30, s: 1 },
            { x: 95, y: 200, r: -60, s: 1.3 },
            { x: 115, y: 280, r: 45, s: 0.9 },
            { x: 100, y: 340, r: -30, s: 1.1 },
            { x: 140, y: 420, r: 50, s: 1.2 },
            { x: 120, y: 500, r: -40, s: 1 },
            { x: 160, y: 580, r: 35, s: 1.1 },
            { x: 140, y: 640, r: -55, s: 0.9 },
          ].map((leaf, i) => (
            <g key={`tl${i}`} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}>
              <ellipse cx="0" cy="0" rx="14" ry="6" fill="#22c55e" />
              <path d="M-14 0 L14 0" stroke="#15803d" strokeWidth="0.8" />
            </g>
          ))}
        </g>

        {/* ── Bottom-right vine ── */}
        <g className="vine-sway-r">
          <path
            d="M1440 900 C1380 820 1400 740 1350 680 C1300 620 1360 540 1310 460 C1260 380 1320 300 1260 220"
            stroke="#166534"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Tendril curls */}
          <path d="M1350 680 C1330 700 1310 690 1320 670 C1325 660 1335 665 1332 675" stroke="#15803d" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M1310 460 C1290 480 1270 470 1280 450 C1285 440 1295 445 1292 455" stroke="#15803d" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Leaves */}
          {[
            { x: 1395, y: 840, r: 135, s: 1.2 },
            { x: 1365, y: 780, r: 150, s: 1 },
            { x: 1345, y: 700, r: 120, s: 1.3 },
            { x: 1325, y: 620, r: 135, s: 0.9 },
            { x: 1340, y: 560, r: 150, s: 1.1 },
            { x: 1300, y: 480, r: 130, s: 1.2 },
            { x: 1320, y: 400, r: 145, s: 1 },
            { x: 1280, y: 320, r: 125, s: 1.1 },
            { x: 1300, y: 260, r: 140, s: 0.9 },
          ].map((leaf, i) => (
            <g key={`br${i}`} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}>
              <ellipse cx="0" cy="0" rx="14" ry="6" fill="#22c55e" />
              <path d="M-14 0 L14 0" stroke="#15803d" strokeWidth="0.8" />
            </g>
          ))}
        </g>

        {/* ── Scattered floating leaves ── */}
        {[
          { x: 300, y: 150, r: 20 },
          { x: 800, y: 100, r: -30 },
          { x: 1100, y: 200, r: 45 },
          { x: 200, y: 500, r: -25 },
          { x: 600, y: 600, r: 35 },
          { x: 1000, y: 700, r: -40 },
          { x: 400, y: 800, r: 50 },
          { x: 850, y: 400, r: -15 },
        ].map((leaf, i) => (
          <g key={`fl${i}`} className="leaf-drift" transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`} style={{ animationDelay: `${i * 0.7}s` }}>
            <ellipse cx="0" cy="0" rx="10" ry="4.5" fill="#16a34a" />
            <path d="M-10 0 L10 0" stroke="#15803d" strokeWidth="0.6" />
          </g>
        ))}

        {/* ── Small berries accents ── */}
        {[
          { x: 95, y: 205 }, { x: 135, y: 425 }, { x: 1345, y: 685 }, { x: 1305, y: 465 },
        ].map((b, i) => (
          <g key={`b${i}`}>
            <circle cx={b.x} cy={b.y} r="2.5" fill="#dc2626" />
            <circle cx={b.x + 5} cy={b.y + 3} r="2" fill="#dc2626" />
          </g>
        ))}
      </svg>
    </div>
  )
}
