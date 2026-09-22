import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { currentUser, notifications } from '../mock/data.js'

const DEFAULT_PROJECT = 'p_2001'

// 主导航项 → 目标路由 + 匹配的 active 路径前缀
const NAV_ITEMS = [
  { key: 'dashboard', label: '工作台', to: '/dashboard', match: ['/dashboard'] },
  { key: 'intro', label: '论文引言', to: `/projects/${DEFAULT_PROJECT}/feasibility`, match: ['/feasibility', '/literature', '/settings'] },
  { key: 'data', label: '数据统计', to: `/projects/${DEFAULT_PROJECT}/data`, match: ['/data'] },
  { key: 'writing', label: '论文写作', to: `/projects/${DEFAULT_PROJECT}/writing`, match: ['/writing', '/journal'] },
  { key: 'review', label: '论文评审', to: `/projects/${DEFAULT_PROJECT}/review`, match: ['/review'] }
]

function isActive(item, pathname) {
  return item.match.some((m) => pathname.includes(m))
}

export default function TopNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [bellOpen, setBellOpen] = useState(false)
  const bellRef = useRef(null)
  const unread = notifications.filter((n) => n.unread).length

  useEffect(() => {
    function onClick(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <header style={{
      height: 'var(--nav-height)', borderBottom: '1px solid var(--color-border)',
      display: 'flex', alignItems: 'center', padding: '0 var(--page-padding-x)',
      position: 'sticky', top: 0, background: '#fff', zIndex: 50, gap: 8
    }}>
      {/* Logo */}
      <NavLink to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 24, textDecoration: 'none' }}>
        <span style={{ width: 30, height: 30, borderRadius: 'var(--radius-sm)', background: 'var(--color-primary)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>研</span>
        <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--color-text-primary)' }}>研宇宙</span>
      </NavLink>

      {/* 主导航 */}
      <nav className="row" style={{ height: '100%' }}>
        {NAV_ITEMS.map((it) => {
          const active = isActive(it, location.pathname)
          return (
            <NavLink key={it.key} to={it.to} style={{
              height: '100%', display: 'inline-flex', alignItems: 'center', padding: '0 14px',
              color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              fontWeight: active ? 500 : 400, fontSize: 14, textDecoration: 'none',
              borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent'
            }}>
              {it.label}
            </NavLink>
          )
        })}
      </nav>

      {/* 右侧工具区 */}
      <div className="flex-1" />
      <div className="row gap-6" style={{ position: 'relative' }} ref={bellRef}>
        <button
          onClick={() => setBellOpen((v) => !v)}
          style={{ position: 'relative', width: 34, height: 34, borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}
          aria-label="通知"
        >
          🔔
          {unread > 0 && (
            <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 'var(--radius-full)', background: 'var(--color-danger)', color: '#fff', fontSize: 10, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>
          )}
        </button>
        {bellOpen && (
          <div style={{ position: 'absolute', right: 0, top: 44, width: 320, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: '0 8px 24px rgba(0,0,0,.12)', zIndex: 60 }}>
            <div style={{ padding: '12px 16px', fontWeight: 600, borderBottom: '1px solid var(--color-border)' }}>通知</div>
            {notifications.map((n) => (
              <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: 'var(--radius-full)', background: n.unread ? 'var(--color-danger)' : 'var(--color-border)', marginTop: 6, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13 }}>{n.title}</div>
                  <div className="text-xs tertiary">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate(`/projects/${DEFAULT_PROJECT}/export`)}
          style={{ height: 30, padding: '0 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-primary-weak-bg)', color: 'var(--color-primary)', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          ⬇ 导出中心
        </button>

        <div className="row gap-3">
          <span style={{ width: 32, height: 32, borderRadius: 'var(--radius-full)', background: 'var(--color-primary)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>{currentUser.avatarText}</span>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{currentUser.nickname}</div>
            <div className="text-xs tertiary">{currentUser.major} · {currentUser.grade}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
