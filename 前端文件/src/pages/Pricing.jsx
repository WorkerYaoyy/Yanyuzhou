import React, { useState, useEffect } from 'react'
import { Tag, Alert } from '../components/ui.jsx'
import { auth } from '../mock/api.js'

export default function Pricing() {
  const [plans, setPlans] = useState([])
  const [quota, setQuota] = useState(null)

  useEffect(() => {
    auth.plans().then((r) => setPlans(r.data.list))
    auth.quotaTable().then((r) => setQuota(r.data))
  }, [])

  return (
    <div className="page-content">
      <Alert kind="success" >已认证学生：学生版 ¥19/月（含送 Agent 模拟额度）；学生权益已生效 <a href="#" style={{ marginLeft: 8 }}>查看认证 ›</a></Alert>

      <h1 style={{ fontSize: 24, fontWeight: 600, textAlign: 'center', margin: '32px 0 8px' }}>选择适合你的套餐</h1>
      <p className="text-sm muted" style={{ textAlign: 'center', marginBottom: 28 }}>面向高校科研的可信 AI 科研工作台</p>

      {/* 套餐卡 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'stretch' }}>
        {plans.map((p) => (
          <div key={p.key} className="card" style={{ padding: 24, borderColor: p.popular ? 'var(--color-primary)' : 'var(--color-border)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {p.popular && <span style={{ position: 'absolute', top: 16, right: 16 }}><Tag kind="primary">最受欢迎</Tag></span>}
            <div className="block-title" style={{ marginBottom: 4 }}>{p.name}</div>
            <div className="text-xs tertiary" style={{ marginBottom: 12 }}>{p.desc}</div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 34, fontWeight: 600, color: 'var(--color-primary)' }}>¥{p.price}</span>
              <span className="text-sm tertiary"> {p.unit}</span>
            </div>
            <div className="col gap-4" style={{ marginBottom: 20, flex: 1 }}>
              {p.benefits.map((b, i) => (
                <div key={i} className="row gap-3"><span style={{ color: 'var(--color-success)', fontWeight: 700 }}>✓</span><span className="text-sm">{b}</span></div>
              ))}
            </div>
            <button className={`btn ${p.popular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>{p.cta}</button>
          </div>
        ))}
      </div>

      {/* 额度公示表 */}
      {quota && (
        <div className="card" style={{ marginTop: 32, padding: 24 }}>
          <div className="block-title" style={{ marginBottom: 4 }}>额度公示表</div>
          <p className="text-xs tertiary" style={{ marginBottom: 16 }}>每月 1 日 00:00 重置</p>
          <table className="data-table" style={{ border: '1px solid var(--color-border)' }}>
            <thead>
              <tr>
                <th>维度</th><th>学生版</th><th>专业版</th><th>团队版</th>
              </tr>
            </thead>
            <tbody>
              {quota.dimensions.map((d, i) => (
                <tr key={d.key}>
                  <td>{d.label}</td>
                  <td>{quota.rows.student[i]}</td>
                  <td>{quota.rows.pro[i]}</td>
                  <td>{quota.rows.team[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Alert kind="info" style={{ marginTop: 20 }}>
        超额处理方式：默认连续不中断但排队降级；可开启超额付费按量计费并实时提醒；次月 1 日重置，不作补偿、不结转。
      </Alert>
    </div>
  )
}
