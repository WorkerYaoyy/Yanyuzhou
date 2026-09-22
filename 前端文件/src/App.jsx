import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import TopNav from './components/TopNav.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Feasibility from './pages/Feasibility.jsx'
import Literature from './pages/Literature.jsx'
import DataAnalysis from './pages/DataAnalysis.jsx'
import Writing from './pages/Writing.jsx'
import Journal from './pages/Journal.jsx'
import Review from './pages/Review.jsx'
import ExportCenter from './pages/ExportCenter.jsx'
import Pricing from './pages/Pricing.jsx'
import ProjectSettings from './pages/ProjectSettings.jsx'

function AppLayout({ children }) {
  const location = useLocation()
  // P0 登录页不显示顶栏；其余页面（含定价页）显示统一顶栏
  const showNav = location.pathname !== '/login'
  return (
    <div className="page">
      {showNav && <TopNav />}
      {children}
    </div>
  )
}

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/:id/feasibility" element={<Feasibility />} />
        <Route path="/projects/:id/literature" element={<Literature />} />
        <Route path="/projects/:id/data" element={<DataAnalysis />} />
        <Route path="/projects/:id/writing" element={<Writing />} />
        <Route path="/projects/:id/journal" element={<Journal />} />
        <Route path="/projects/:id/review" element={<Review />} />
        <Route path="/projects/:id/export" element={<ExportCenter />} />
        <Route path="/projects/:id/settings" element={<ProjectSettings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  )
}
