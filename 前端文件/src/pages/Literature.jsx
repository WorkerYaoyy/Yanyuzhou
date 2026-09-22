import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tag, Tabs, Alert } from '../components/ui.jsx'
import { literature } from '../mock/api.js'

export default function Literature() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [tab, setTab] = useState('search')
  const [total, setTotal] = useState(1284)
  const [list, setList] = useState([])
  const [verify, setVerify] = useState(null)

  useEffect(() => {
    literature.list().then((r) => { setTotal(r.data.total); setList(r.data.list) })
    literature.agentVerify().then((r) => setVerify(r.data))
  }, [])

  const selected = list.filter((l) => l.selected).length

  return (
    <div className="page-content">
      <div className="row between" style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600 }}>文献综述</h1>
        <Tabs items={[{ key: 'hot', label: '研究热点' }, { key: 'verify', label: '双 Agent 核验' }, { key: 'review', label: '综述生成' }, { key: 'search', label: '检索' }]} active={tab} onChange={setTab} />
      </div>

      {/* 检索框 */}
      <div className="row gap-4" style={{ marginBottom: 12 }}>
        <input className="input" style={{ flex: 1 }} placeholder="自然语言检索：如 “手机依赖 与 社交焦虑 中介效应”" />
        <select className="input" style={{ width: 120 }}><option>相关度</option><option>时间</option><option>被引</option></select>
        <select className="input" style={{ width: 120 }}><option>全部时间</option><option>2021-</option></select>
        <select className="input" style={{ width: 110 }}><option>全部学科</option><option>心理学</option></select>
        <select className="input" style={{ width: 100 }}><option>全部分区</option><option>Q1</option></select>
      </div>
      <div className="row between" style={{ marginBottom: 12 }}>
        <span className="text-sm muted">共 <b>{total.toLocaleString()}</b> 条检索结果</span>
      </div>
      <Alert kind="info">中英文混合来源，本页默认以英文文献为主（中文占比 4%）。注册并登录后可在中文库导出。</Alert>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start', marginTop: 16 }}>
        {/* 左：文献卡列表 */}
        <div className="col gap-5">
          {list.map((l) => (
            <div key={l.id} className="card" style={{ padding: 18 }}>
              <div className="row gap-4" style={{ marginBottom: 4 }}>
                <span className="text-sm fw-600">{l.title}</span>
                {l.doiVerified && <Tag kind="success">DOI 已验证</Tag>}
                {l.type === 'preprint' && <Tag kind="warning">未经同行评审</Tag>}
              </div>
              <div className="text-xs tertiary" style={{ marginBottom: 8 }}>{l.authors} · {l.journal} · {l.year} · {l.quartile}</div>
              <div className="text-sm muted" style={{ marginBottom: 8 }}>结论：{l.conclusion}</div>
              <div className="row wrap gap-2" style={{ marginBottom: 6 }}>
                {l.tags.map((t, i) => <Tag key={i}>{t}</Tag>)}
              </div>
              <div className="row between">
                <span className="text-xs tertiary">关注点：{l.focus}</span>
                <button className={`btn btn-sm ${l.selected ? 'btn-secondary' : 'btn-ghost'}`}>{l.selected ? '已选 ✓' : '加入文献集'}</button>
              </div>
            </div>
          ))}
        </div>

        {/* 右栏 */}
        <div className="col gap-7">
          <div className="card" style={{ padding: 18 }}>
            <div className="row between" style={{ marginBottom: 12 }}>
              <span className="block-title">已选文献集</span>
              <span className="text-sm" style={{ color: 'var(--color-primary)' }}>{selected} 篇</span>
            </div>
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>生成结构化综述</button>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="block-title" style={{ marginBottom: 12 }}>双 Agent 核验进度</div>
            {verify && (
              <>
                <div className="col gap-5">
                  <div>
                    <div className="row between text-sm" style={{ marginBottom: 4 }}><span>Agent A · {verify.agentA.name}</span><span>{Math.round(verify.agentA.consistency * 100)}%</span></div>
                    <div className="progress"><span style={{ width: `${verify.agentA.consistency * 100}%` }} /></div>
                  </div>
                  <div>
                    <div className="row between text-sm" style={{ marginBottom: 4 }}><span>Agent B · {verify.agentB.name}</span><span>{Math.round(verify.agentB.consistency * 100)}%</span></div>
                    <div className="progress"><span style={{ width: `${verify.agentB.consistency * 100}%` }} /></div>
                  </div>
                </div>
                <div className="row gap-3" style={{ marginTop: 12 }}>
                  <Tag kind="success">通过 {verify.result.pass}</Tag>
                  <Tag kind="warning">存疑 {verify.result.doubt}</Tag>
                  <Tag kind="danger">失败 {verify.result.fail}</Tag>
                </div>
                <div className="row gap-3" style={{ marginTop: 10 }}>
                  {verify.details.map((d) => <Tag key={d.litId} kind="danger">{d.litId}: {d.reason}</Tag>)}
                </div>
              </>
            )}
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="block-title" style={{ marginBottom: 10 }}>知识库问答</div>
            <input className="input" placeholder="基于已读文献提问…" style={{ marginBottom: 10 }} />
            <div className="col gap-3">
              <button className="btn btn-secondary btn-sm">生成领域认知综述</button>
              <button className="btn btn-secondary btn-sm">生成可读文献包（PDF）</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row between" style={{ marginTop: 24, padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-weak-bg)' }}>
        <span className="text-sm">26 条文献已通过至 Agent 核验</span>
        <button className="btn btn-primary" onClick={() => navigate(`/projects/${id}/writing`)}>导入写作 ›</button>
      </div>
    </div>
  )
}
