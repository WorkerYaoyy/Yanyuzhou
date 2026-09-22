import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Tag } from '../components/ui.jsx'
import { projectsApi } from '../mock/api.js'

const ROLE_TEXT = { owner: '第一作者 / 所有者', mentor: '导师', collaborator: '协作学生' }

export default function ProjectSettings() {
  const { id } = useParams()
  const [detail, setDetail] = useState(null)
  const [members, setMembers] = useState([])
  const [versions, setVersions] = useState([])
  const [dataLevels, setDataLevels] = useState([])
  const [dataLevel, setDataLevel] = useState('L1')

  useEffect(() => {
    projectsApi.detail(id).then((r) => setDetail(r.data))
    projectsApi.members().then((r) => setMembers(r.data))
    projectsApi.versions().then((r) => setVersions(r.data))
    projectsApi.dataLevel().then((r) => setDataLevels(r.data))
  }, [id])

  if (!detail) return <div className="page-content"><p className="muted">加载中…</p></div>

  return (
    <div className="page-content">
      <div className="row between" style={{ marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600 }}>{detail.name}</h1>
          <p className="text-sm muted" style={{ marginTop: 4 }}>
            {detail.discipline} · {detail.design === 'data_driven' ? '数据驱动' : '实验'} · 创建于 {detail.updatedAt.slice(0, 10)}
          </p>
        </div>
        <button className="btn btn-primary">保存更改</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        {/* 左列 */}
        <div className="col gap-7">
          <div className="card">
            <div className="block-title" style={{ marginBottom: 14 }}>项目信息</div>
            <div className="col gap-5">
              <div><label className="text-sm muted">项目名称</label><input className="input" defaultValue={detail.name} /></div>
              <div><label className="text-sm muted">学科领域</label><input className="input" defaultValue={detail.discipline} /></div>
              <div><label className="text-sm muted">驱动路线</label>
                <select className="input"><option>数据驱动</option><option>实验</option></select>
              </div>
              <div>
                <label className="text-sm muted" style={{ display: 'block', marginBottom: 6 }}>DDL 节点</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
                  {[['开题', detail.ddl.proposal], ['中期', detail.ddl.midterm], ['论文', detail.ddl.submission], ['答辩', detail.ddl.defense]].map(([k, v]) => (
                    <div key={k}><span className="text-xs tertiary">{k}</span><input className="input" defaultValue={v} /></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="row between" style={{ marginBottom: 14 }}>
              <span className="block-title">成员管理</span>
              <button className="btn btn-ghost btn-sm">邀请成员</button>
            </div>
            <table className="data-table">
              <thead><tr><th>成员</th><th>角色</th><th>权限</th></tr></thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td><Tag kind={m.role === 'owner' ? 'primary' : m.role === 'mentor' ? 'info' : 'muted'}>{ROLE_TEXT[m.role]}</Tag></td>
                    <td>{m.permissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="block-title" style={{ marginBottom: 14 }}>版本历史（最近 3 个月）</div>
            <div className="col gap-4">
              {versions.map((v) => (
                <div key={v.id} className="row between" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 10 }}>
                  <div className="col gap-2">
                    <span className="text-sm fw-600">{v.no} · {v.summary}</span>
                    <span className="text-xs tertiary">{v.operator} · {v.time}</span>
                  </div>
                  <button className="btn btn-secondary btn-sm">回滚</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右列：数据分级 */}
        <div className="card">
          <div className="block-title" style={{ marginBottom: 14 }}>选择您的数据类型</div>
          <div className="col gap-4">
            {dataLevels.map((dl) => (
              <label key={dl.key} className="row gap-3" style={{ border: '1px solid', borderColor: dataLevel === dl.key ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: 'var(--radius-sm)', padding: 12, cursor: 'pointer' }}>
                <input type="radio" name="dl" checked={dataLevel === dl.key} onChange={() => setDataLevel(dl.key)} />
                <div className="col gap-2">
                  <span className="text-sm fw-600">{dl.label}</span>
                  <span className="text-xs tertiary">{dl.note}</span>
                </div>
              </label>
            ))}
          </div>
          <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 14 }}>保存设定</button>
          <hr className="divider" />
          <p className="text-xs tertiary">数据级别同步影响：P4 数据导入拦截、导出校验、确认红色须在导出中心完成等。</p>
        </div>
      </div>
    </div>
  )
}
