// 服務卡片插圖：每張都是手畫 SVG，只用網站色票（ink / honey / paper）。
const INK = '#16140f'
const HONEY = '#f2b705'
const HONEY_SOFT = '#fbe7a6'
const LINE = '#e6dfcf'
const PAPER = '#faf7f0'
const MUTED = '#b9b2a2'

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 400 190" role="img" aria-label={label} className="block h-auto w-full">
      <rect width="400" height="190" rx="14" fill={PAPER} />
      {children}
    </svg>
  )
}

/** 行政流程數位化：雜亂的試算表 → 整齊的排課表 */
function Workflow() {
  const rows = [0, 1, 2, 3, 4]
  return (
    <Frame label="雜亂的試算表整理成清楚的排課表">
      {/* messy sheet, slightly rotated */}
      <g transform="rotate(-6 95 95)">
        <rect x="38" y="36" width="118" height="118" rx="6" fill="#fff" stroke={LINE} strokeWidth="2" />
        {rows.map(r => (
          <line key={r} x1="38" x2="156" y1={58 + r * 20} y2={58 + r * 20} stroke={LINE} strokeWidth="1.5" />
        ))}
        <line x1="78" x2="78" y1="36" y2="154" stroke={LINE} strokeWidth="1.5" />
        <line x1="117" x2="117" y1="36" y2="154" stroke={LINE} strokeWidth="1.5" />
        <path d="M46 70c8-4 14 4 22 0M86 90c6-5 14 3 22-2M48 110c10-3 14 3 24-1M88 130c7-4 12 4 20 0" stroke={MUTED} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="132" cy="108" r="9" fill="none" stroke="#d9534f" strokeWidth="2" />
      </g>
      {/* sticky note */}
      <rect x="128" y="24" width="38" height="34" rx="3" fill={HONEY_SOFT} transform="rotate(8 147 41)" />
      {/* arrow */}
      <path d="M184 95h34" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M212 87l9 8-9 8" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* clean schedule */}
      <rect x="236" y="30" width="134" height="130" rx="10" fill={INK} />
      {['一', '二', '三', '四', '五'].map((d, i) => (
        <text key={d} x={256 + i * 24} y="52" fontSize="10" fill="#fff" fillOpacity=".55" textAnchor="middle">
          {d}
        </text>
      ))}
      {[
        [0, 0, 2],
        [1, 1, 1],
        [2, 0, 1],
        [3, 2, 2],
        [4, 1, 1],
        [2, 3, 1],
        [0, 3, 1]
      ].map(([c, r, h], i) => (
        <rect
          key={i}
          x={246 + c * 24}
          y={62 + r * 22}
          width="20"
          height={h * 22 - 4}
          rx="4"
          fill={i % 3 === 0 ? HONEY : i % 3 === 1 ? HONEY_SOFT : '#fff'}
          fillOpacity={i % 3 === 2 ? 0.85 : 1}
        />
      ))}
    </Frame>
  )
}

/** 自動化生產流程：板材上的排料與切割路徑 */
function Factory() {
  return (
    <Frame label="板材上自動排好的零件與切割路徑">
      {/* plate */}
      <rect x="40" y="34" width="250" height="124" rx="4" fill="#e9e4d8" stroke="#cfc7b5" strokeWidth="2" />
      {/* nested parts */}
      <g fill="#fff" stroke={INK} strokeWidth="2">
        <rect x="52" y="46" width="70" height="46" rx="3" />
        <path d="M130 46h56v22h-30v24h-26z" />
        <circle cx="216" cy="69" r="23" />
        <rect x="248" y="46" width="30" height="100" rx="3" />
        <path d="M52 100h46v46H52zM106 100h70v20h-24v26h-46z" />
        <rect x="184" y="100" width="56" height="46" rx="23" />
      </g>
      <g fill={HONEY}>
        <rect x="160" y="124" width="16" height="22" rx="2" />
      </g>
      {/* cutting path */}
      <path d="M122 92l8-24M186 68l7-8M239 69l9-12M98 123l8-12M176 123l8-12" stroke={HONEY} strokeWidth="2" strokeDasharray="3 4" fill="none" />
      {/* cutter head */}
      <g transform="translate(300 52)">
        <rect x="0" y="0" width="64" height="38" rx="8" fill={INK} />
        <rect x="26" y="38" width="12" height="14" fill={INK} />
        <path d="M32 52l-6 10h12z" fill={HONEY} />
        <circle cx="14" cy="19" r="4" fill={HONEY} />
        <rect x="26" y="15" width="28" height="8" rx="4" fill="#fff" fillOpacity=".25" />
      </g>
      <path d="M332 114c-10 18-24 22-42 20" stroke={INK} strokeWidth="2" strokeDasharray="2 5" fill="none" strokeLinecap="round" />
      {/* efficiency tag */}
      <g transform="translate(304 134)">
        <rect width="70" height="26" rx="13" fill={HONEY} />
        <text x="35" y="17.5" fontSize="11" fontWeight="700" fill={INK} textAnchor="middle">
          省料排版
        </text>
      </g>
    </Frame>
  )
}

/** AI 智慧化解決方案：回答附上資料來源 */
function AI() {
  return (
    <Frame label="AI 助理根據文件內容回答問題">
      {/* documents */}
      <g>
        <rect x="44" y="58" width="78" height="100" rx="6" fill="#fff" stroke={LINE} strokeWidth="2" transform="rotate(-8 83 108)" />
        <rect x="52" y="44" width="78" height="100" rx="6" fill="#fff" stroke={INK} strokeWidth="2" />
        <rect x="62" y="58" width="40" height="6" rx="3" fill={INK} />
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x="62" y={74 + i * 12} width={i === 2 ? 34 : 56} height="4" rx="2" fill={MUTED} />
        ))}
        <rect x="58" y="94" width="66" height="14" rx="3" fill={HONEY} fillOpacity=".35" />
      </g>
      {/* link */}
      <path d="M130 101c40 0 46 38 92 38" stroke={HONEY} strokeWidth="2" strokeDasharray="3 5" fill="none" />
      <circle cx="130" cy="101" r="4" fill={HONEY} />
      {/* question */}
      <g>
        <rect x="190" y="30" width="172" height="40" rx="14" fill={INK} />
        <path d="M344 70l10 10 2-10z" fill={INK} />
        <rect x="204" y="44" width="96" height="5" rx="2.5" fill="#fff" fillOpacity=".8" />
        <rect x="204" y="55" width="62" height="5" rx="2.5" fill="#fff" fillOpacity=".45" />
      </g>
      {/* answer */}
      <g>
        <rect x="160" y="92" width="200" height="72" rx="14" fill="#fff" stroke={LINE} strokeWidth="2" />
        <rect x="174" y="106" width="150" height="5" rx="2.5" fill={INK} fillOpacity=".75" />
        <rect x="174" y="117" width="120" height="5" rx="2.5" fill={INK} fillOpacity=".4" />
        <rect x="174" y="128" width="136" height="5" rx="2.5" fill={INK} fillOpacity=".4" />
        <rect x="174" y="142" width="58" height="14" rx="7" fill={HONEY_SOFT} />
        <path d="M181 149h6" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <rect x="191" y="147" width="32" height="4" rx="2" fill={INK} fillOpacity=".6" />
      </g>
    </Frame>
  )
}

/** 邊緣運算與系統整合：現場設備串到同一個中樞 */
function Edge() {
  const hub = { x: 200, y: 95 }
  const nodes = [
    { x: 74, y: 52, kind: 'camera' },
    { x: 74, y: 140, kind: 'sensor' },
    { x: 326, y: 52, kind: 'cloud' },
    { x: 326, y: 140, kind: 'server' }
  ]
  return (
    <Frame label="攝影機、感測器、伺服器與雲端串接到同一個中樞">
      {nodes.map(n => (
        <path
          key={n.kind}
          d={`M${n.x} ${n.y}C${(n.x + hub.x) / 2} ${n.y} ${(n.x + hub.x) / 2} ${hub.y} ${hub.x} ${hub.y}`}
          stroke={INK}
          strokeOpacity=".35"
          strokeWidth="2"
          strokeDasharray="4 5"
          fill="none"
        />
      ))}
      {/* data packets */}
      <circle cx="140" cy="72" r="4" fill={HONEY} />
      <circle cx="258" cy="120" r="4" fill={HONEY} />
      <circle cx="252" cy="70" r="4" fill={HONEY} />
      {/* hub */}
      <path d="M200 58l32 18.5v37L200 132l-32-18.5v-37z" fill={INK} />
      <path d="M200 76l16 9.25v18.5L200 113l-16-9.25v-18.5z" fill={HONEY} />
      {/* camera */}
      <g transform="translate(46 32)">
        <rect width="56" height="40" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
        <circle cx="28" cy="20" r="10" fill={INK} />
        <circle cx="28" cy="20" r="4" fill={HONEY} />
      </g>
      {/* sensor */}
      <g transform="translate(46 120)">
        <rect width="56" height="40" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
        <path d="M12 26l8-10 7 7 8-12 9 15" stroke={HONEY} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* cloud */}
      <g transform="translate(298 32)">
        <rect width="56" height="40" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
        <path d="M18 28h22a7 7 0 0 0 0-14 10 10 0 0 0-19-2 7 7 0 0 0-3 16z" fill={INK} />
      </g>
      {/* server */}
      <g transform="translate(298 120)">
        <rect width="56" height="40" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
        <rect x="12" y="10" width="32" height="8" rx="2" fill={INK} />
        <rect x="12" y="22" width="32" height="8" rx="2" fill={INK} />
        <circle cx="38" cy="14" r="1.8" fill={HONEY} />
        <circle cx="38" cy="26" r="1.8" fill={HONEY} />
      </g>
    </Frame>
  )
}

const ART: Record<string, () => React.ReactNode> = {
  workflow: Workflow,
  factory: Factory,
  ai: AI,
  edge: Edge
}

export default function ServiceArt({ name }: { name: string }) {
  const Art = ART[name]
  return Art ? <Art /> : null
}
