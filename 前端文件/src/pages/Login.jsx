import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tag, Alert } from '../components/ui.jsx'
import { auth } from '../mock/api.js'

// P0 登录与认证 —— 左品牌区 + 右认证区（固定 480px），无顶栏
export default function Login() {
  const navigate = useNavigate()
  const [account, setAccount] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(0)
  const [studentEmail, setStudentEmail] = useState('')
  const [studentVerified, setStudentVerified] = useState(false)
  const [logging, setLogging] = useState(false)
  const inputs = useRef([])

  useEffect(() => {
    if (countdown <= 0) return
    const t = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000)
    return () => clearInterval(t)
  }, [countdown])

  const codeFilled = code.every((c) => c !== '')
  const canLogin = account.trim() && codeFilled

  function sendCode() {
    if (!account.trim() || countdown > 0) return
    auth.sendSms()
    setCountdown(60)
  }

  function setDigit(i, v) {
    if (!/^[0-9]?$/.test(v)) return
    const next = [...code]
    next[i] = v
    setCode(next)
    if (v && i < 5) inputs.current[i + 1]?.focus()
    if (next.every((c) => c !== '') && account.trim()) doLogin(next.join(''))
  }

  async function doLogin(codeStr) {
    setLogging(true)
    await auth.login()
    setLogging(false)
    navigate('/dashboard')
  }

  function verifyStudent() {
    if (!/.+\.edu(\.cn)?$/.test(studentEmail)) return
    auth.studentVerifyEmail().then(() => setStudentVerified(true))
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', minHeight: '100vh' }}>
      {/* 左：品牌区 */}
      <div style={{ background: 'var(--color-primary-weak-bg)', padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="row gap-3" style={{ marginBottom: 40 }}>
          <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--color-primary)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20 }}>研</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--color-text-primary)' }}>研宇宙</div>
            <div style={{ fontSize: 9, letterSpacing: 1, color: 'var(--color-primary)', fontWeight: 500 }}>RESEARCH UNIVERSE</div>
          </div>
        </div>
        <h1 style={{ fontSize: 34, lineHeight: '44px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 12 }}>
          可信的 AI 科研工作台
        </h1>
        <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', marginBottom: 32 }}>
          引用可溯源 · 分析可复现 · 过程可交代
        </p>
        <div className="col gap-5" style={{ marginBottom: 'auto' }}>
          {['双 Agent 核验 · 引用与论断一致率 ≥ 99%', '分析可复现 · 沙箱执行 + Python / R 代码包导出', '全流程留痕 · 一键导出《AI 使用情况说明》'].map((t) => (
            <div key={t} className="row gap-3" style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
              <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>✓</span>{t}
            </div>
          ))}
        </div>
        <p className="text-xs tertiary" style={{ marginTop: 32 }}>
          L1 / L2 数据默认不进入任何训练集；敏感字段强制脱敏后方可继续。
        </p>
      </div>

      {/* 右：认证区 */}
      <div style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
        {/* 登录卡 */}
        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>登录 / 注册</h2>
          <label className="text-sm muted" style={{ display: 'block', marginBottom: 6 }}>手机号或邮箱</label>
          <div className="row gap-3" style={{ marginBottom: 16 }}>
            <input className="input" style={{ flex: 1 }} placeholder="手机号或邮箱" value={account} onChange={(e) => setAccount(e.target.value)} />
            <button className="btn btn-ghost btn-sm" style={{ whiteSpace: 'nowrap' }} disabled={!account.trim() || countdown > 0} onClick={sendCode}>
              {countdown > 0 ? `${countdown}s 后重发` : '发送验证码'}
            </button>
          </div>

          <label className="text-sm muted" style={{ display: 'block', marginBottom: 6 }}>6 位验证码</label>
          <div className="row gap-3" style={{ marginBottom: 20 }}>
            {code.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputs.current[i] = el)}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Backspace' && !d && i > 0) inputs.current[i - 1]?.focus() }}
                maxLength={1}
                inputMode="numeric"
                style={{ width: 44, height: 44, textAlign: 'center', fontSize: 16, borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
              />
            ))}
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }} disabled={!canLogin || logging} onClick={() => doLogin(code.join(''))}>
            {logging ? '登录中…' : '登录 / 注册'}
          </button>

          <div className="row" style={{ alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <span style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
            <span className="text-xs tertiary">其他方式</span>
            <span style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
          </div>
          <div className="row gap-3">
            <button className="btn btn-secondary" style={{ flex: 1 }}>微信快捷登录</button>
            <button className="btn btn-secondary" style={{ flex: 1 }}>学信网快捷核验</button>
          </div>
          <p className="text-xs tertiary" style={{ marginTop: 16 }}>
            登录即表示同意<a href="#">《用户协议》</a>与<a href="#">《学术诚信使用规范》</a>
          </p>
        </div>

        {/* 学生认证卡 */}
        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 24, marginTop: 20 }}>
          <div className="row between" style={{ marginBottom: 14 }}>
            <span className="block-title">学生认证</span>
            <Tag kind={studentVerified ? 'success' : 'warning'}>{studentVerified ? '已核验' : '未核验'}</Tag>
          </div>
          <div className="row gap-3" style={{ marginBottom: 12 }}>
            <input className="input" style={{ flex: 1 }} placeholder="教育邮箱（.edu / .edu.cn）" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
            <button className="btn btn-ghost btn-sm" style={{ whiteSpace: 'nowrap' }} onClick={verifyStudent}>认证</button>
          </div>
          <p className="text-xs tertiary" style={{ marginBottom: 12 }}>没有教育邮箱？<a href="#">改用学信网在线验证报告核验</a></p>
          {studentVerified && <Alert kind="success">学生身份已核验，权益已同步至定价与额度系统</Alert>}
        </div>

        <p className="text-xs tertiary" style={{ marginTop: 16 }}>
          认证失效（毕业 / 邮箱注销）后 90 天宽限期内平滑降级，不会锁死你的数据。
        </p>
      </div>
    </div>
  )
}
