// =========================================================
// 研宇宙 Mock API —— 模拟《需求文档 v2.0》第 5 章 REST 接口
// 统一返回 { code, data } ，异步任务返回 taskId。
// 后续对接真实后端时，仅替换本文件实现（fetch /api/v1/...）即可。
// =========================================================
import * as db from './data.js'

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))
const ok = (data) => ({ code: 0, data })
// 通用成功响应 code=0 见文档 5.1 错误码表
export const CODE = { SUCCESS: 0, PARAM: 40001, UNAUTH: 40101, FORBIDDEN: 40301, BLOCK: 40302, NOTFOUND: 40401, CONFLICT: 40901, RATE: 42901, SERVER: 50001 }

// ---------- 鉴权与账号（P0 / G5） ----------
export const auth = {
  sendSms: async () => { await delay(200); return ok({ sendId: 'sms_1a2b', ttl: 60 }) },
  login: async () => {
    await delay(400)
    return ok({
      accessToken: 'eyJ.demo.access',
      refreshToken: 'eyJ.demo.refresh',
      expiresIn: 7200,
      user: db.currentUser
    })
  },
  me: async () => { await delay(150); return ok(db.currentUser) },
  studentVerifyEmail: async () => { await delay(500); return ok({ verified: true }) },
  plans: async () => { await delay(150); return ok({ list: db.plans }) },
  quotaTable: async () => { await delay(150); return ok(db.quotaTable) }
}

// ---------- 工作台（P1） ----------
export const dashboard = {
  summary: async () => { await delay(150); return ok(db.dashboardSummary) },
  projects: async () => { await delay(200); return ok(db.projects) },
  progress: async () => { await delay(150); return ok({ inference: db.progressInference, stages: db.stageProgress }) },
  todos: async () => { await delay(150); return ok({ list: db.weekDone }) },
  ddl: async () => { await delay(150); return ok(db.ddlCalendar) }
}

export const notificationsApi = {
  list: async () => { await delay(150); return ok({ list: db.notifications, unread: db.notifications.filter((n) => n.unread).length }) }
}

// ---------- 项目与设置（P1 / P2-3） ----------
export const projectsApi = {
  list: async () => { await delay(200); return ok(db.projects) },
  detail: async (id) => { await delay(150); return ok(db.projects.find((p) => p.id === id) || db.projects[0]) },
  members: async () => { await delay(150); return ok(db.members) },
  versions: async () => { await delay(150); return ok(db.versions) },
  dataLevel: async () => { await delay(150); return ok(db.dataLevels) }
}

// ---------- 研究可行性分析（P2-1） ----------
export const feasibility = {
  researchGaps: async () => { await delay(200); return ok(db.researchGaps) },
  topReviews: async () => { await delay(200); return ok(db.topReviews) },
  trend: async () => { await delay(200); return ok(db.trend) },
  score: async () => { await delay(200); return ok(db.feasibilityScore) },
  confirmDirection: async () => { await delay(300); return ok({ ok: true }) }
}

export const databasesApi = {
  list: async (discipline) => { await delay(200); return ok(discipline ? db.databases.filter((d) => d.discipline === discipline) : db.databases) }
}

// ---------- 文献综述（P3） ----------
export const literature = {
  list: async () => { await delay(200); return ok({ total: 1284, list: db.literatureList }) },
  agentVerify: async () => { await delay(300); return ok(db.agentVerify) },
  toWriting: async () => { await delay(300); return ok({ ok: true }) }
}

// ---------- 数据分析（P4） ----------
export const dataApi = {
  health: async () => { await delay(200); return ok(db.dataHealth) },
  methods: async () => { await delay(200); return ok(db.candidateMethods) },
  analysis: async () => { await delay(300); return ok({ taskId: 't_5501', status: 'running' }) },
  reproducibleCode: async () => { await delay(200); return ok({ lang: 'python', code: db.reproducibleCode }) },
  robustness: async () => { await delay(200); return ok(db.robustness) },
  missingDistribution: async () => { await delay(200); return ok(db.missingDistribution) }
}

// ---------- 论文写作（P5） ----------
export const writing = {
  manuscript: async () => { await delay(200); return ok(db.manuscript) },
  citations: async () => { await delay(200); return ok(db.citations) },
  toJournal: async () => { await delay(300); return ok({ ok: true }) }
}

// ---------- 选刊 AI（P6） ----------
export const journal = {
  recommend: async () => { await delay(300); return ok(db.journalRecommend) },
  profile: async () => { await delay(200); return ok(db.journalProfile) },
  aiPolicy: async () => { await delay(150); return ok({ policy: db.journalAiPolicy }) },
  checklist: async () => { await delay(200); return ok({ list: db.journalChecklist, done: 5, total: 8 }) },
  exportCandidates: async () => { await delay(300); return ok({ ok: true }) }
}

// ---------- 模拟评审（P7） ----------
export const review = {
  simulate: async () => { await delay(300); return ok({ taskId: 'rv_1', status: 'running' }) },
  issues: async () => { await delay(200); return ok(db.reviewIssues) },
  suggestions: async () => { await delay(200); return ok(db.reviewSuggestions) },
  summary: async () => { await delay(150); return ok(db.reviewSummary) },
  export: async () => { await delay(300); return ok({ ok: true }) }
}

// ---------- 导出中心（P8） ----------
export const exportCenter = {
  materials: async () => { await delay(200); return ok(db.materials) },
  blockers: async () => { await delay(200); return ok({ list: db.exportBlockers, redCount: db.exportBlockers.length, unverified: 1, aiCoverage: 1.0 }) },
  aiUsageReport: async () => { await delay(200); return ok(db.aiUsageReport) },
  confirmBlocker: async () => { await delay(300); return ok({ ok: true }) }
}
