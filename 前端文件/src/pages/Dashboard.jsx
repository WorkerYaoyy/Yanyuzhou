import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tag, Alert, Progress, StatusBadge } from '../components/ui.jsx'
import { dashboard, projectsApi } from '../mock/api.js'

export default function Dashboard() {
  const navigate = useNavigate()
  const [summary, setSummary] = useState(null)
  const [projects, setProjects] = useState([])
  const [ddl, setDdl] = useState([])
  const [stages, setStages] = useState([])
  const [inference, setInference] = useState([])
  const [week, setWeek] = useState([])

  useEffect(() => {
    dashboard.summary().then((r) => setSummary(r.data))
    projectsApi.list().then((r) => setProjects(r.data))
    dashboard.ddl().then((r) => setDdl(r.data))
    dashboard.progress().then((r) => { setStages(r.data.stages); setInference(r.data.inference) })
    dashboard.todos().then((r) => setWeek(r.data.list))
  }, [])

  return (
    <div className="page-content">
      {/* 顶部问候 */}
      <div className="row between" style={{ marginBottom: 24 }}>
        <div>
          <div className="row gap-4">
            <h1 style={{ fontSize: 24, fontWeight: 600 }}>{summary?.greeting}</h1>
            <Tag kind="warning">{summary?.certBadge}</Tag>
          </div>
          <p className="text-sm muted" style={{ marginTop: 6 }}>{summary?.todoAggregate}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* 主区：我的项目 */}
        <div>
          <div className="row between" style={{ marginBottom: 16 }}>
            <h2 className="card-title" style={{ margin: 0 }}>我的项目</h2>
            <button className="btn btn-primary btn-sm">+ 新建项目</button>
          </div>
          <div className="col gap-5">
            {projects.map((p) => (
              <div key={p.id} className="card" style={{ padding: 20 }}>
                <div className="row between" style={{ marginBottom: 10 }}>
                  <div className="row gap-4">
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{p.name}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/projects/${p.id}/feasibility`)}>进入项目 ›</button>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Progress value={p.progress} />
                </div>
                <div className="row wrap gap-3">
                  {p.tags.map((t, i) => <Tag key={i}>{t}</Tag>)}
                </div>
                <div className="row gap-8 text-xs tertiary" style={{ marginTop: 10 }}>
                  <span>待办 {p.todoCount}</span>
                  <span>引用 {p.citationCount}</span>
                  <span>数据级别 {p.dataLevel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧栏 */}
        <div className="col gap-5">
          {/* DDL 倒计时 */}
          <div className="card" style={{ padding: 20 }}>
            <div className="block-title" style={{ marginBottom: 12 }}>DDL 倒计时</div>
            <div className="col gap-5">
              {ddl.map((d) => (
                <div key={d.key} className="row between">
                  <span className="text-sm">{d.label}</span>
                  <span className="text-sm" style={{ color: d.daysLeft <= 12 ? 'var(--color-danger)' : 'var(--color-text-secondary)', fontWeight: 500 }}>
                    {d.daysLeft} 天 · {d.date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 阶段进度 */}
          <div className="card" style={{ padding: 20 }}>
            <div className="block-title" style={{ marginBottom: 12 }}>阶段进度</div>
            <div className="col gap-4">
              {stages.map((s) => (
                <div key={s.key} className="row gap-3">
                  <span style={{ width: 16, height: 16, borderRadius: 'var(--radius-full)', background: s.done ? 'var(--color-success)' : '#fff', border: s.done ? 'none' : '1px solid var(--color-border)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{s.done ? '✓' : ''}</span>
                  <span className="text-sm" style={{ color: s.done ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <Alert kind="warning">中期检查剩余 12 天；文献综述已逾期 3 天，建议优先处理 20 篇待读。</Alert>

          {/* 进度推演 */}
          <div className="card" style={{ padding: 20 }}>
            <div className="block-title" style={{ marginBottom: 12 }}>项目进度推演</div>
            <div className="col gap-4">
              {inference.map((it) => (
                <div key={it.key} className="row between">
                  <span className="text-sm">{it.label}</span>
                  <span className="text-sm muted">{it.done}/{it.total}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 本周完成 */}
          <div className="card" style={{ padding: 20 }}>
            <div className="block-title" style={{ marginBottom: 12 }}>本周已完成</div>
            <div className="col gap-4">
              {week.map((w, i) => (
                <div key={i} className="row gap-3">
                  <span style={{ color: w.status === 'pass' ? 'var(--color-success)' : 'var(--color-warning)', fontWeight: 700 }}>{w.status === 'pass' ? '✓' : '○'}</span>
                  <span className="text-sm">{w.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
