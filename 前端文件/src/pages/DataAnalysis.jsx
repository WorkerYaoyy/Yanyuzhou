import React, { useState, useEffect } from 'react'
import { Tag, StepBar, CodeBlock, Alert } from '../components/ui.jsx'
import { BarChart } from '../components/charts.jsx'
import { dataApi } from '../mock/api.js'

const STEPS = ['数据导入', '数据体检', '方法选择', '分析结果']

export default function DataAnalysis() {
  const [health, setHealth] = useState(null)
  const [methods, setMethods] = useState([])
  const [selectedMethod, setSelectedMethod] = useState('group_regression_bootstrap')
  const [code, setCode] = useState(null)
  const [robustness, setRobustness] = useState([])
  const [missing, setMissing] = useState([])
  const [running, setRunning] = useState(false)

  useEffect(() => {
    dataApi.health().then((r) => setHealth(r.data))
    dataApi.methods().then((r) => setMethods(r.data))
    dataApi.reproducibleCode().then((r) => setCode(r.data))
    dataApi.robustness().then((r) => setRobustness(r.data))
    dataApi.missingDistribution().then((r) => setMissing(r.data))
  }, [])

  function runAnalysis() {
    setRunning(true)
    dataApi.analysis().then(() => setRunning(false))
  }

  return (
    <div className="page-content">
      <div className="row between" style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600 }}>数据分析</h1>
        <span className="text-sm tertiary">数据版本 v2 · 350 行 × 42 列 · 1 个数据集</span>
      </div>
      <div style={{ marginBottom: 20 }}>
        <StepBar steps={STEPS} activeIndex={2} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24, alignItems: 'start' }}>
        {/* 左列 */}
        <div className="col gap-7">
          {/* 候选方法 */}
          <div>
            <div className="block-title" style={{ marginBottom: 12 }}>候选统计方法清单</div>
            <div className="col gap-5">
              {methods.map((m) => (
                <div key={m.key} className="card" style={{ padding: 18, borderColor: m.recommended ? 'var(--color-primary)' : 'var(--color-border)' }}>
                  <div className="row between" style={{ marginBottom: 8 }}>
                    <span className="text-sm fw-600">{m.name}</span>
                    <div className="row gap-2">{m.recommended && <Tag kind="primary">推荐</Tag>}</div>
                  </div>
                  <div className="text-xs tertiary" style={{ marginBottom: 6 }}>适用：{m.scenario}</div>
                  <div className="row gap-8 text-xs" style={{ marginBottom: 8 }}>
                    <span style={{ color: 'var(--color-success)' }}>优点：{m.pros}</span>
                    <span style={{ color: 'var(--color-warning)' }}>缺点：{m.cons}</span>
                    <span className="tertiary">成本：{m.cost}</span>
                  </div>
                  <label className="row gap-3" style={{ fontSize: 13 }}>
                    <input type="radio" name="method" checked={selectedMethod === m.key} onChange={() => setSelectedMethod(m.key)} />
                    选择此方法
                  </label>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 14 }} disabled={running} onClick={runAnalysis}>
              {running ? '分析中…' : '确认选择并执行'}
            </button>
          </div>

          {/* 数据体检 */}
          <div className="card" style={{ padding: 18 }}>
            <div className="block-title" style={{ marginBottom: 12 }}>数据体检报告</div>
            {health && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
                  {[['样本数', health.rowCount], ['变量数', health.columnCount], ['缺失率', `${(health.missingRate * 100).toFixed(1)}%`], ['异常值', health.outlierCount]].map(([k, v]) => (
                    <div key={k} style={{ background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
                      <div className="text-xs tertiary">{k}</div>
                      <div style={{ fontSize: 20, fontWeight: 600 }}>{v}</div>
                    </div>
                  ))}
                </div>
                {health.problemVariables.map((pv) => (
                  <Alert key={pv.name} kind="warning">{pv.name}：{pv.issue === 'all_missing' ? `完全缺失已剔除（率 ${(pv.rate * 100).toFixed(1)}%）` : `${pv.issue}（${pv.count} 例）`}</Alert>
                ))}
              </>
            )}
          </div>

          {/* 数据导入 */}
          <div className="card" style={{ padding: 18 }}>
            <div className="block-title" style={{ marginBottom: 10 }}>数据导入</div>
            <div className="row wrap gap-2" style={{ marginBottom: 10 }}>
              {['CSV', 'XLSX', 'SPSS .sav', 'Stata .dta', '公共数据库'].map((f) => <Tag key={f}>{f}</Tag>)}
            </div>
            <div className="text-sm muted" style={{ marginBottom: 6 }}>已导入文件：survey_350.csv（字段自动识别 42 列）</div>
            <button className="btn btn-secondary btn-sm">+ 上传数据集</button>
          </div>
        </div>

        {/* 右列 */}
        <div className="col gap-7">
          <div className="card" style={{ padding: 18 }}>
            <div className="block-title" style={{ marginBottom: 10 }}>可复现代码</div>
            <div className="row gap-3" style={{ marginBottom: 10 }}>
              <Tag kind="primary">Python</Tag><Tag>R</Tag>
            </div>
            {code && <CodeBlock code={code.code} />}
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="block-title" style={{ marginBottom: 10 }}>稳健性检验</div>
            <div className="col gap-5">
              {robustness.map((r) => (
                <div key={r.method} className="row between">
                  <span className="text-sm">{r.method}</span>
                  <Tag kind={r.status === 'done' ? 'success' : 'warning'}>{r.status === 'done' ? '已完成' : '待执行'}</Tag>
                </div>
              ))}
            </div>
            <div className="text-xs tertiary" style={{ marginTop: 8 }}>正则和系数群样本差异（n=14）待执行</div>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 10 }}>查看检验表</button>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="block-title" style={{ marginBottom: 10 }}>缺失值分布</div>
            <BarChart data={missing} />
          </div>
        </div>
      </div>
    </div>
  )
}
