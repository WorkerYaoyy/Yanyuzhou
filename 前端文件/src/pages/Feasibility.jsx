import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tag, Tabs, Segmented, Alert } from '../components/ui.jsx'
import { LineChart } from '../components/charts.jsx'
import { feasibility, databasesApi } from '../mock/api.js'
import { researchGaps, topReviews } from '../mock/data.js'

const DISCIPLINES = [
  { key: 'all', label: '全部' },
  { key: '计算机', label: '计算机' },
  { key: '心理学', label: '心理学' },
  { key: '医学', label: '医学' },
  { key: '社会科学', label: '社会科学' },
  { key: '经济学', label: '经济学' },
  { key: '人文艺术', label: '人文艺术' }
]

export default function Feasibility() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [tab, setTab] = useState('report')
  const [disc, setDisc] = useState('all')
  const [score, setScore] = useState(null)
  const [trend, setTrend] = useState([])
  const [dbs, setDbs] = useState([])
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    feasibility.score().then((r) => setScore(r.data))
    feasibility.trend().then((r) => setTrend(r.data))
    loadDatabases('all')
  }, [])

  function loadDatabases(d) {
    setDisc(d)
    databasesApi.list(d === 'all' ? null : d).then((r) => setDbs(r.data))
  }

  return (
    <div className="page-content">
      <div className="row between" style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600 }}>研究可行性分析</h1>
        <Tabs items={[{ key: 'report', label: '生成分析报告' }, { key: 'input', label: '研究方向输入' }]} active={tab} onChange={setTab} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 24, alignItems: 'start' }}>
        {/* 左列 */}
        <div className="col gap-7">
          <div className="card">
            <div className="block-title" style={{ marginBottom: 14 }}>研究不足与展望（原文摘要）</div>
            <div className="col gap-5">
              {researchGaps.map((g) => (
                <div key={g.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 12 }}>
                  <div className="text-sm" style={{ marginBottom: 6 }}>{g.conclusion}</div>
                  <div className="row gap-4 text-xs tertiary">
                    <span>{g.source}</span><span>· {g.year}</span><span>· 被引 {g.cited}</span>
                    <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setExpanded((e) => ({ ...e, [g.id]: !e[g.id] }))}>
                      {expanded[g.id] ? '收起' : '展开'}
                    </button>
                  </div>
                  {expanded[g.id] && <p className="text-sm muted" style={{ marginTop: 8 }}>原文结论的完整摘要与上下文说明（演示占位）。</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="block-title" style={{ marginBottom: 14 }}>高被引综述精选（原文摘要）· 共 4 篇</div>
            <div className="col gap-5">
              {topReviews.map((r) => (
                <div key={r.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 12 }}>
                  <div className="row gap-4" style={{ marginBottom: 4 }}>
                    <span className="text-sm fw-600">{r.title}</span>
                    <Tag kind="success">DOI 已验证</Tag>
                  </div>
                  <div className="row gap-4 text-xs tertiary">
                    <span>{r.journal}</span><span>· {r.year}</span><span>· 被引 {r.cited}</span>
                    <a href="#" style={{ marginLeft: 'auto' }}>链接 ›</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="block-title" style={{ marginBottom: 14 }}>近年社会焦虑的研究趋势 2021–2025</div>
            <div className="text-xs tertiary" style={{ marginBottom: 8 }}>基于 1,284 篇真实文献的年度趋势</div>
            <LineChart data={trend} />
          </div>
        </div>

        {/* 右列 */}
        <div className="col gap-7">
          <div className="card">
            <div className="block-title" style={{ marginBottom: 12 }}>自拟选题三维可行性评分（总分 {score?.total ?? 5} 分）</div>
            <div className="col gap-7">
              {score?.dimensions.map((d) => (
                <div key={d.key}>
                  <div className="row between" style={{ marginBottom: 6 }}>
                    <span className="text-sm fw-600">{d.label}</span>
                    <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-primary)' }}>{d.score.toFixed(1)}</span>
                  </div>
                  <div className="progress"><span style={{ width: `${(d.score / 5) * 100}%` }} /></div>
                  <div className="text-xs tertiary" style={{ marginTop: 4 }}>{d.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="block-title" style={{ marginBottom: 12 }}>公共数据库导航 · 共 {dbs.length} 个库</div>
            <div style={{ marginBottom: 12 }}>
              <Segmented items={DISCIPLINES} active={disc} onChange={loadDatabases} />
            </div>
            <div className="col gap-4">
              {dbs.map((db) => (
                <div key={db.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
                  <div className="row between" style={{ marginBottom: 4 }}>
                    <span className="text-sm fw-600">{db.name}</span>
                    <div className="row gap-2">
                      {db.tags.map((t, i) => <Tag key={i} kind={t.includes('直接') ? 'success' : 'info'}>{t}</Tag>)}
                    </div>
                  </div>
                  <div className="text-xs tertiary">{db.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="block-title" style={{ marginBottom: 10 }}>我要自己收数据</div>
            <div className="col gap-4 text-sm muted">
              <span>· 数据采集设置</span>
              <span>· 量表来源与校对</span>
              <span>· 自动追踪</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部流转 */}
      <div className="row between" style={{ marginTop: 24, padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-weak-bg)' }}>
        <span className="text-sm">已确认纳入文献 <b>1,284</b> 篇</span>
        <button className="btn btn-primary" onClick={() => navigate(`/projects/${id}/literature`)}>确认方向，进入文献综述 ›</button>
      </div>
    </div>
  )
}
