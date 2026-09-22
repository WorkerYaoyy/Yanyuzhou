import React, { useState, useEffect } from 'react'
import { Tag, Alert, VerifyBadge } from '../components/ui.jsx'
import { exportCenter } from '../mock/api.js'

export default function ExportCenter() {
  const [materials, setMaterials] = useState([])
  const [blockers, setBlockers] = useState([])
  const [compliance, setCompliance] = useState(null)
  const [aiUsage, setAiUsage] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    exportCenter.materials().then((r) => setMaterials(r.data))
    exportCenter.blockers().then((r) => setBlockers(r.data))
    exportCenter.aiUsageReport().then((r) => setAiUsage(r.data))
  }, [])

  useEffect(() => {
    if (!blockers) return
    exportCenter.blockers().then((r) => setCompliance(r.data))
  }, [blockers])

  function confirmBlocker() {
    exportCenter.confirmBlocker().then(() => setConfirmed(true))
  }

  return (
    <div className="page-content">
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>导出中心</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        {/* 左列 */}
        <div className="col gap-7">
          <div className="card">
            <div className="block-title" style={{ marginBottom: 12 }}>产物导出 · 共 {materials.length} 项</div>
            <div className="col gap-4">
              {materials.map((m) => (
                <div key={m.id} className="row between" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 10 }}>
                  <div className="col gap-2">
                    <span className="text-sm fw-600">{m.name}</span>
                    <div className="row gap-3">
                      <VerifyBadge status={m.verifyStatus} />
                      <span className="text-xs tertiary">{m.generatedAt} · {m.size}</span>
                    </div>
                  </div>
                  <div className="row gap-2">
                    {m.formats.map((f) => <button key={f} className="btn btn-secondary btn-sm">{f.toUpperCase()}</button>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 红色阻断卡 */}
          {blockers.length > 0 && !confirmed && (
            <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: 'var(--radius-md)', padding: 16 }}>
              <div className="row gap-3" style={{ marginBottom: 8 }}>
                <Tag kind="danger">红色阻断</Tag>
                <span className="text-sm fw-600" style={{ color: 'var(--color-danger)' }}>存在无法校验的判情</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-danger)', marginBottom: 10 }}>{blockers[0].description}</p>
              <div className="row gap-3">
                <button className="btn btn-secondary btn-sm">上传文稿 PDF</button>
                <button className="btn btn-primary btn-sm" onClick={confirmBlocker}>我已确认，允许导出</button>
              </div>
            </div>
          )}

          <div className="card">
            <div className="block-title" style={{ marginBottom: 10 }}>《AI 使用情况说明》一键生成</div>
            <p className="text-xs tertiary" style={{ marginBottom: 10 }}>依据《人工智能生成合成内容标识办法》与 GB 45438-2025</p>
            <div className="col gap-4">
              {aiUsage?.items.map((it, i) => (
                <div key={i} className="row gap-3">
                  <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>✓</span>
                  <span className="text-sm">{it}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }} onClick={() => exportCenter.aiUsageReport()}>生成校验报告</button>
          </div>
        </div>

        {/* 右列：合规校验 */}
        <div className="card">
          <div className="block-title" style={{ marginBottom: 12 }}>导出合规校验</div>
          <div className="col gap-7">
            <div>
              <div className="row between text-sm" style={{ marginBottom: 4 }}><span>红色阻断条目数</span><span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>{confirmed ? 0 : compliance?.redCount ?? 1}</span></div>
              <div className="progress"><span style={{ width: confirmed ? '0%' : '100%', background: 'var(--color-danger)' }} /></div>
            </div>
            <div>
              <div className="row between text-sm" style={{ marginBottom: 4 }}><span>未核验文献数</span><span style={{ fontWeight: 600 }}>{compliance?.unverified ?? 1}</span></div>
            </div>
            <div>
              <div className="row between text-sm" style={{ marginBottom: 4 }}><span>AI 标识完整性</span><span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{Math.round((compliance?.aiCoverage ?? 1) * 100)}%</span></div>
              <div className="progress"><span style={{ width: `${(compliance?.aiCoverage ?? 1) * 100}%`, background: 'var(--color-success)' }} /></div>
            </div>
          </div>
          {confirmed && <Alert kind="success" >已确认放行，可导出。</Alert>}
        </div>
      </div>

      <Alert kind="info" >所有 AI 生成内容均不可移除核验标识；导出时自动携带标注记录与生成记录。
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }} disabled={blockers.length > 0 && !confirmed}>导出已选产物</button>
      </Alert>
    </div>
  )
}
