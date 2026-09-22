import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tag, Tabs, Segmented, Alert } from '../components/ui.jsx'
import { writing } from '../mock/api.js'

const SAMPLE_BODY = `引言

近年来，智能手机与社交媒体的普及引发了对"手机依赖"与"社交焦虑"关系的广泛关注[1]。已有研究多聚焦横截面相关，缺乏纵向追踪[2]。本研究基于 350 名大学生样本，采用 Bootstrap 中介模型探讨二者关系[3]。`

export default function Writing() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [tab, setTab] = useState('full')
  const [citationStyle, setCitationStyle] = useState('APA 7')
  const [manuscript, setManuscript] = useState(null)
  const [citations, setCitations] = useState([])
  const [body, setBody] = useState(SAMPLE_BODY)

  useEffect(() => {
    writing.manuscript().then((r) => setManuscript(r.data))
    writing.citations().then((r) => setCitations(r.data))
  }, [])

  return (
    <div className="page-content">
      <div className="row between" style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600 }}>论文写作</h1>
        <Tabs items={[{ key: 'full', label: 'AI 全文生成' }, { key: 'abstract', label: 'AI 摘要写作' }, { key: 'classic', label: '传统模式' }]} active={tab} onChange={setTab} />
      </div>

      <div className="row gap-4" style={{ marginBottom: 16 }}>
        <span className="text-sm muted">引用部分从已核验文献池选择</span>
        <Segmented items={[{ key: 'edit', label: '编辑' }, { key: 'preview', label: '预览切换' }]} active="edit" onChange={() => {}} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 320px', gap: 20, alignItems: 'start' }}>
        {/* 左：写作大纲 */}
        <div className="card" style={{ padding: 16 }}>
          <div className="block-title" style={{ marginBottom: 12 }}>写作大纲</div>
          <div className="col gap-4">
            {manuscript?.sections.map((s) => (
              <div key={s.id} className="col gap-2">
                <span className="text-sm fw-600">{s.title}</span>
                <span className="text-xs tertiary">{s.wordCount} 字 · 引用 {s.citationCount}</span>
              </div>
            ))}
          </div>
          <div className="col gap-3" style={{ marginTop: 14 }}>
            <button className="btn btn-ghost btn-sm">生成大纲</button>
            <button className="btn btn-secondary btn-sm">重置大纲</button>
          </div>
        </div>

        {/* 中：正文编辑器 */}
        <div className="card" style={{ padding: 16 }}>
          <input className="input" style={{ fontWeight: 600, fontSize: 16, marginBottom: 12, border: 'none', paddingLeft: 0 }} defaultValue={manuscript?.title || ''} />
          <textarea className="input" style={{ minHeight: 360, lineHeight: '22px' }} value={body} onChange={(e) => setBody(e.target.value)} />
          <div className="row wrap gap-2" style={{ marginTop: 10 }}>
            {['重写', '智能扩写', '降重', '学术化改写'].map((a) => (
              <button key={a} className="btn btn-secondary btn-sm" disabled={!body.trim()}>{a}</button>
            ))}
            <span className="text-xs tertiary" style={{ marginLeft: 'auto' }}>仅选中部分应用 AI</span>
          </div>
          <hr className="divider" />
          <div className="row gap-8 text-sm muted">
            <span>字数 {body.length}</span>
            <span>引用 {citations.length}</span>
            <span>AI 生成内容占比 {Math.round((manuscript?.aiGeneratedRatio || 0) * 100)}%（已同步生成）</span>
          </div>
        </div>

        {/* 右：引用引擎 / AI 声明 / Zotero */}
        <div className="col gap-7">
          <div className="card" style={{ padding: 16 }}>
            <div className="block-title" style={{ marginBottom: 10 }}>引用引擎（CSL）</div>
            <Segmented items={[{ key: 'APA 7', label: 'APA 7' }, { key: 'GB/T 7714', label: 'GB/T 7714' }]} active={citationStyle} onChange={setCitationStyle} />
            <div className="col gap-4" style={{ marginTop: 12 }}>
              <span className="text-xs tertiary">已核验 {citations.length} 篇 · 自动同步</span>
              {citations.map((c, i) => (
                <div key={c.id} className="text-sm" style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>[{i + 1}]</span>
                  <span>{c.source}</span>
                </div>
              ))}
            </div>
          </div>

          <Alert kind="info">《心理学报》要求披露 AI 使用情况、禁止 AIGC 直接结论等投稿约束提醒。</Alert>

          <div className="card" style={{ padding: 16 }}>
            <div className="block-title" style={{ marginBottom: 10 }}>Zotero 联动</div>
            <div className="text-xs tertiary" style={{ marginBottom: 10 }}>OAuth 授权 zotero.org · 双向同步（Better BibTeX）</div>
            <button className="btn btn-ghost btn-sm">授权同步</button>
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: 20, justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={() => navigate(`/projects/${id}/journal`)}>完成初稿，进入选刊 ›</button>
      </div>
    </div>
  )
}
