import React from 'react'

// 折线图（逐年趋势）
export function LineChart({ data, width = 520, height = 200, color = 'var(--color-primary)' }) {
  if (!data || data.length === 0) {
    return <div className="text-xs tertiary" style={{ height, display: 'flex', alignItems: 'center' }}>加载中…</div>
  }
  const padL = 36
  const padB = 28
  const padT = 16
  const padR = 12
  const w = width - padL - padR
  const h = height - padT - padB
  const max = Math.max(...data.map((d) => d.value)) * 1.1
  const min = 0
  const xStep = data.length > 1 ? w / (data.length - 1) : w
  const pts = data.map((d, i) => {
    const x = padL + i * xStep
    const y = padT + h - ((d.value - min) / (max - min || 1)) * h
    return { x, y, ...d }
  })
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const area = `${path} L ${pts[pts.length - 1].x.toFixed(1)} ${padT + h} L ${pts[0].x.toFixed(1)} ${padT + h} Z`
  const gridYs = [0, 0.25, 0.5, 0.75, 1]
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-label="趋势折线图">
      {gridYs.map((g) => {
        const y = padT + h - g * h
        return (
          <g key={g}>
            <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="var(--color-border)" strokeWidth="1" />
            <text x={4} y={y + 4} fontSize="10" fill="var(--color-text-tertiary)">{Math.round(max * g)}</text>
          </g>
        )
      })}
      <path d={area} fill={color} opacity="0.08" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="#fff" stroke={color} strokeWidth="2" />
          <text x={p.x} y={p.y - 10} fontSize="11" fontWeight="600" fill="var(--color-text-secondary)" textAnchor="middle">{p.value}</text>
          <text x={p.x} y={height - 8} fontSize="11" fill="var(--color-text-muted)" textAnchor="middle">{p.year}</text>
        </g>
      ))}
    </svg>
  )
}

// 横向条形图（缺失值分布）
export function BarChart({ data, width = 420, height, color = 'var(--color-primary)' }) {
  if (!data || data.length === 0) {
    return <div className="text-xs tertiary">加载中…</div>
  }
  const rowH = 34
  const labelW = 110
  const valW = 44
  const barAreaW = width - labelW - valW
  const max = Math.max(...data.map((d) => d.rate), 100)
  const h = height || data.length * rowH + 8
  return (
    <svg viewBox={`0 0 ${width} ${h}`} width="100%" role="img" aria-label="条形图">
      {data.map((d, i) => {
        const y = i * rowH + 8
        const bw = (d.rate / max) * barAreaW
        return (
          <g key={d.name}>
            <text x={0} y={y + 16} fontSize="12" fill="var(--color-text-secondary)">{d.name}</text>
            <rect x={labelW} y={y + 6} width={barAreaW} height="14" rx="3" fill="var(--color-bg-subtle-2)" />
            <rect x={labelW} y={y + 6} width={bw} height="14" rx="3" fill={d.allMissing ? 'var(--color-danger)' : color} />
            <text x={width - valW} y={y + 16} fontSize="12" fontWeight="600" fill={d.allMissing ? 'var(--color-danger)' : 'var(--color-text-secondary)'} textAnchor="end">{d.rate}%</text>
          </g>
        )
      })}
    </svg>
  )
}
