import React from 'react'

// 语义标签
export function Tag({ kind = '', children }) {
  return <span className={`tag ${kind ? 'tag-' + kind : ''}`}>{children}</span>
}

// 提示条
export function Alert({ kind = 'info', children }) {
  return <div className={`alert alert-${kind}`}>{children}</div>
}

// 进度条
export function Progress({ value }) {
  const pct = Math.round(value * 100)
  return (
    <div className="row gap-4" style={{ width: '100%' }}>
      <div className="progress flex-1"><span style={{ width: `${pct}%` }} /></div>
      <span className="text-sm muted" style={{ minWidth: 34, textAlign: 'right' }}>{pct}%</span>
    </div>
  )
}

// 页签
export function Tabs({ items, active, onChange }) {
  return (
    <div className="row" style={{ borderBottom: '1px solid var(--color-border)', gap: 0 }}>
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          style={{
            height: 40, padding: '0 16px', background: 'none', border: 'none',
            borderBottom: active === it.key ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: active === it.key ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            fontWeight: active === it.key ? 500 : 400, fontSize: 14, marginBottom: -1
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}

// 分段控件
export function Segmented({ items, active, onChange }) {
  return (
    <div className="row" style={{ background: 'var(--color-bg-subtle-2)', borderRadius: 'var(--radius-sm)', padding: 3, gap: 2 }}>
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          style={{
            border: 'none', background: active === it.key ? '#fff' : 'transparent',
            borderRadius: 'var(--radius-sm)', padding: '6px 12px', fontSize: 13,
            color: active === it.key ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
            fontWeight: active === it.key ? 500 : 400, boxShadow: active === it.key ? '0 1px 2px rgba(0,0,0,.06)' : 'none'
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}

// 步骤条
export function StepBar({ steps, activeIndex }) {
  return (
    <div className="row" style={{ gap: 0 }}>
      {steps.map((s, i) => {
        const done = i < activeIndex
        const active = i === activeIndex
        return (
          <React.Fragment key={s}>
            <div className="row gap-3">
              <span style={{
                width: 24, height: 24, borderRadius: 'var(--radius-full)', display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600,
                background: done || active ? 'var(--color-primary)' : '#fff',
                color: done || active ? '#fff' : 'var(--color-text-tertiary)',
                border: done || active ? 'none' : '1px solid var(--color-border)'
              }}>{done ? '✓' : i + 1}</span>
              <span style={{ fontSize: 13, color: active ? 'var(--color-primary)' : done ? 'var(--color-text-secondary)' : 'var(--color-text-muted)', fontWeight: active ? 500 : 400 }}>{s}</span>
            </div>
            {i < steps.length - 1 && <span style={{ flex: 1, height: 1, background: 'var(--color-border)', margin: '0 12px' }} />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// 代码块
export function CodeBlock({ code, lang = 'python' }) {
  return (
    <pre style={{
      background: 'var(--color-bg-subtle-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
      padding: '16px', fontSize: 12.5, lineHeight: '18px', color: 'var(--color-text-secondary)',
      overflowX: 'auto', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    }}>
      <code>{code}</code>
    </pre>
  )
}

// 状态徽标（项目状态枚举）
const statusMap = {
  topic: { text: '选题中', kind: 'info' },
  literature: { text: '文献综述中', kind: 'info' },
  data_analysis: { text: '数据分析中', kind: 'warning' },
  writing: { text: '论文写作中', kind: 'info' },
  revision: { text: '返修中', kind: 'warning' },
  archived: { text: '已归档', kind: 'muted' }
}
export function StatusBadge({ status }) {
  const m = statusMap[status] || { text: status, kind: 'muted' }
  return <Tag kind={m.kind}>{m.text}</Tag>
}

// 校验状态徽标（导出中心）
const verifyMap = {
  dual_agent_passed: { text: '双 Agent 已核验', kind: 'success' },
  desensitized: { text: '已脱敏与预处理', kind: 'info' },
  data_integrity_ok: { text: '数据完整性核查', kind: 'success' }
}
export function VerifyBadge({ status }) {
  const m = verifyMap[status] || { text: status, kind: 'muted' }
  return <Tag kind={m.kind}>{m.text}</Tag>
}

// 严重度徽标（评审）
const sevMap = { critical: { text: '严重', kind: 'danger' }, disputed: { text: '争议', kind: 'warning' }, style: { text: '风格', kind: 'info' } }
export function SeverityBadge({ severity }) {
  const m = sevMap[severity] || { text: severity, kind: 'muted' }
  return <Tag kind={m.kind}>{m.text}</Tag>
}
