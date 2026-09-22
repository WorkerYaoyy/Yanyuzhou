import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tag, Tabs, Alert } from '../components/ui.jsx'
import { journal } from '../mock/api.js'

const TABS = ['数据范围', '文献证据', '手机数据', '匹配度', '中介效应', '分区推荐']

export default function Journal() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [tab, setTab] = useState('quartile')
  const [list, setList] = useState([])
  const [profile, setProfile] = useState(null)
  const [policy, setPolicy] = useState('')
  const [checklist, setChecklist] = useState({ list: [], done: 5, total: 8 })

  useEffect(() => {
    journal.recommend().then((r) => { setList(r.data.items); setActive(r.data.items[0].journalId) })
    journal.aiPolicy().then((r) => setPolicy(r.data.policy))
    journal.checklist().then((r) => setChecklist(r.data))
  }, [])

  function setActive(journalId) {
    journal.profile(journalId).then((r) => setProfile(r.data))
  }

  return (
    <div className="page-content">
      <div className="row between" style={{ marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600 }}>选刊 AI</h1>
          <p className="text-sm muted" style={{ marginTop: 4 }}>稿题：社交焦虑与手机依赖的关系研究 · 基于 350 样本 Bootstrap 中介分析</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => journal.recommend()}>重新匹配</button>
      </div>
      <Tabs items={TABS.map((t) => ({ key: t === '分区推荐' ? 'quartile' : t, label: t }))} active={tab} onChange={setTab} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start', marginTop: 16 }}>
        {/* 左：推荐期刊 */}
        <div>
          <div className="block-title" style={{ marginBottom: 12 }}>推荐期刊 · 共 {list.length} 本</div>
          <div className="col gap-5">
            {list.map((j) => (
              <div key={j.journalId} className="card" style={{ padding: 18 }}>
                <div className="row between" style={{ marginBottom: 6 }}>
                  <span className="text-sm fw-600">{j.name}</span>
                  <div className="row gap-2">
                    <Tag kind="info">{j.quartile}</Tag><Tag kind="info">{j.casQuartile}</Tag>
                  </div>
                </div>
                <div className="text-xs tertiary" style={{ marginBottom: 6 }}>{j.publisher} · IF {j.impactFactor}</div>
                <div className="row between">
                  <span className="text-sm">匹配度 <b style={{ color: 'var(--color-primary)' }}>{Math.round(j.matchScore * 100)}%</b> · {j.scope}</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => setActive(j.journalId)}>查看画像 ›</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右栏 */}
        <div className="col gap-7">
          {profile && (
            <div className="card" style={{ padding: 16 }}>
              <div className="block-title" style={{ marginBottom: 12 }}>期刊画像 · {profile.name}</div>
              <table className="data-table">
                <tbody>
                  {[['收录年份', profile.indexedYears], ['出版社', profile.publisher], ['收录学科', profile.subjects.join('、')], ['审稿周期', `${profile.reviewWeeks} 周`], ['接收率', profile.acceptRate], ['影响因子', profile.impactFactor], ['五年影响因子', profile.fiveYearIF], ['版面费', profile.apc], ['索引', profile.index.join('、')], ['排名', profile.rank]].map(([k, v]) => (
                    <tr key={k}><td style={{ width: 100, color: 'var(--color-text-muted)' }}>{k}</td><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="card" style={{ padding: 16 }}>
            <div className="block-title" style={{ marginBottom: 8 }}>声明 AI 使用策略</div>
            <p className="text-sm muted">{policy}</p>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div className="row between" style={{ marginBottom: 10 }}>
              <span className="block-title">投稿前检查清单</span>
              <span className="text-sm" style={{ color: 'var(--color-primary)' }}>{checklist.done}/{checklist.total} 完成</span>
            </div>
            <div className="col gap-4">
              {checklist.list.map((c) => (
                <div key={c.key} className="row gap-3">
                  <span style={{ color: c.status === 'done' ? 'var(--color-success)' : 'var(--color-warning)', fontWeight: 700 }}>{c.status === 'done' ? '✓' : '○'}</span>
                  <span className="text-sm">{c.label}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 12 }} onClick={() => navigate(`/projects/${id}/export`)}>生成投稿报告（跳转导出中心）</button>
          </div>
        </div>
      </div>

      <Alert kind="info" >本页仅提供投稿决策辅助，不确保「保证录用 / 大概率必中」等承诺；所有第三方统计指标来源为公开可查。
        <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => journal.exportCandidates()}>导出候选包 ›</button>
      </Alert>
    </div>
  )
}
