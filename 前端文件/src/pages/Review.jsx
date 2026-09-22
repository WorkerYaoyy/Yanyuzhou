import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tag, Alert, SeverityBadge } from '../components/ui.jsx'
import { review } from '../mock/api.js'

const GROUP_LABEL = { critical: '硬伤（方法论 / 统计 / 逻辑错误）', disputed: '争议点（审稿人可能质疑）', style: '风格建议（表达与结构）' }

export default function Review() {
  const navigate = useNavigate()
  const [issues, setIssues] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [summary, setSummary] = useState(null)
  const [adopted, setAdopted] = useState({})

  useEffect(() => {
    review.issues().then((r) => setIssues(r.data))
    review.suggestions().then((r) => setSuggestions(r.data))
    review.summary().then((r) => setSummary(r.data))
  }, [])

  function adopt(i, action) {
    setAdopted((a) => ({ ...a, [i]: action }))
  }

  const groups = ['critical', 'disputed', 'style']

  return (
    <div className="page-content">
      <div className="row between" style={{ marginBottom: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600 }}>模拟评审</h1>
          <p className="text-sm muted" style={{ marginTop: 4 }}>评审对象：社交焦虑与手机依赖的关系研究 · 目标期刊：Computers in Human Behavior</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => review.simulate()}>重新校检</button>
      </div>
      <Alert kind="info">校审摘要：已学习同领域评审协议 48 篇；真实审稿意见语料 312 条；校审完成 09:05</Alert>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start', marginTop: 16 }}>
        {/* 左：问题卡分组 */}
        <div className="col gap-7">
          {groups.map((g) => {
            const items = issues.filter((i) => i.severity === g)
            if (!items.length) return null
            return (
              <div key={g}>
                <div className="block-title" style={{ marginBottom: 10 }}>{GROUP_LABEL[g]}</div>
                <div className="col gap-5">
                  {items.map((it) => (
                    <div key={it.id} className="card" style={{ padding: 16 }}>
                      <div className="row gap-3" style={{ marginBottom: 6 }}>
                        <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, fontSize: 13, color: 'var(--color-primary)' }}>{it.code}</span>
                        <SeverityBadge severity={it.severity} />
                        <span className="text-sm fw-600">{it.title}</span>
                      </div>
                      <div className="text-sm muted" style={{ marginBottom: 4 }}>{it.description}</div>
                      <div className="text-xs tertiary" style={{ marginBottom: 10 }}>建议：{it.suggestion}</div>
                      <div className="row gap-3">
                        <button className={`btn btn-sm ${adopted[it.id] === 'fix' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => adopt(it.id, 'fix')}>提交建议并修改</button>
                        <button className={`btn btn-sm ${adopted[it.id] === 'dispute' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => adopt(it.id, 'dispute')}>标记争议</button>
                        <button className="btn btn-sm btn-secondary" onClick={() => adopt(it.id, 'rebuttal')}>生成回应</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* 右栏 */}
        <div className="col gap-7">
          <div className="card" style={{ padding: 16 }}>
            <div className="block-title" style={{ marginBottom: 10 }}>修改建议</div>
            <div className="col gap-4">
              {suggestions.map((s) => (
                <div key={s.code} className="row gap-3">
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, fontSize: 13, color: 'var(--color-primary)' }}>{s.code}</span>
                  <span className="text-sm">{s.path}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>查看全部 8 条修改路径</button>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div className="block-title" style={{ marginBottom: 10 }}>Rebuttal 辅助</div>
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => review.export()}>生成完整 Rebuttal 草稿</button>
          </div>

          <Alert kind="warning">本次模拟评审未改文字（32 条）…请人工确认</Alert>
        </div>
      </div>

      <div className="row between" style={{ marginTop: 20, padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-weak-bg)' }}>
        <span className="text-sm">
          修改概览：已采纳 {summary?.accepted ?? 3} · 标记争议 {summary?.disputed ?? 2} · 忽略 {summary?.ignored ?? 1} · 校审语料 {summary?.corpus ?? 312} 条
        </span>
        <button className="btn btn-primary" onClick={() => review.export()}>输出修改稿与 Rebuttal 草稿 ›</button>
      </div>
    </div>
  )
}
