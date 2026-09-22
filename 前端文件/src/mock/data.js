// =========================================================
// 研宇宙 Mock 数据 —— 字段与示例值均来自《需求文档 v2.0》
// 仅用于前端演示，对应后端接口尚未实现
// =========================================================

export const currentUser = {
  id: 'u_1001',
  nickname: '陈同学',
  avatarText: '陈',
  major: '心理学',
  grade: '研二',
  studentVerified: true,
  email: 'chen@stu.example.edu.cn'
}

// 顶栏通知（铃铛红点计数）
export const notifications = [
  { id: 'n_1', title: '文献综述 2 条待项目确认', time: '10 分钟前', unread: true },
  { id: 'n_2', title: '「社交媒体与手机依赖」中期检查还剩 12 天', time: '1 小时前', unread: true },
  { id: 'n_3', title: '双 Agent 核验完成：26 篇文献通过', time: '昨天', unread: false }
]

// ---------- P1 工作台 ----------
export const dashboardSummary = {
  greeting: '早上好，陈同学',
  certBadge: '研究生认证待审',
  todoAggregate:
    '2 条文献综述待项目确认（导出中心），「社交媒体与手机依赖」距中期检查还有 12 天。'
}

export const projects = [
  {
    id: 'p_2001',
    name: '社交焦虑与手机依赖的关系研究',
    discipline: '心理学',
    design: 'data_driven',
    status: 'data_analysis',
    statusText: '数据分析中',
    progress: 0.45,
    dataLevel: 'L1',
    ddl: {
      proposal: '2026-09-25',
      midterm: '2026-11-15',
      submission: '2026-12-15',
      defense: '2027-03-20'
    },
    tags: ['心理学', '数据驱动', '2 小时前编辑', '中期检查距 12 天'],
    todoCount: 2,
    citationCount: 21,
    updatedAt: '2026-09-22T19:00:00+08:00'
  },
  {
    id: 'p_2002',
    name: '短视频使用对青少年注意力的影响',
    discipline: '心理学',
    design: 'data_driven',
    status: 'literature',
    statusText: '文献综述中',
    progress: 0.28,
    dataLevel: 'L1',
    ddl: { proposal: '2026-10-10', midterm: '2026-12-01', submission: '2027-01-10', defense: '2027-04-15' },
    tags: ['心理学', '数据驱动', '昨天编辑', '开题距 3 天'],
    todoCount: 5,
    citationCount: 12,
    updatedAt: '2026-09-21T10:00:00+08:00'
  },
  {
    id: 'p_2003',
    name: '正念干预对考试焦虑的随机对照实验',
    discipline: '心理学',
    design: 'experiment',
    status: 'writing',
    statusText: '论文写作中',
    progress: 0.62,
    dataLevel: 'L2',
    ddl: { proposal: '2026-08-20', midterm: '2026-10-15', submission: '2026-11-30', defense: '2027-02-28' },
    tags: ['心理学', '实验', '3 天前编辑'],
    todoCount: 1,
    citationCount: 34,
    updatedAt: '2026-09-19T14:00:00+08:00'
  }
]

export const ddlCalendar = [
  { key: 'proposal', label: '开题报告', date: '2026-09-25', daysLeft: 2 },
  { key: 'midterm', label: '中期检查', date: '2026-11-15', daysLeft: 12 },
  { key: 'submission', label: '论文提交', date: '2026-12-15', daysLeft: 42 },
  { key: 'defense', label: '学位答辩', date: '2027-03-20', daysLeft: 136 }
]

export const stageProgress = [
  { key: 'topic', label: '选题', done: true },
  { key: 'literature', label: '文献综述', done: true },
  { key: 'data', label: '数据分析', done: false },
  { key: 'writing', label: '论文写作', done: false },
  { key: 'defense', label: '模拟答辩', done: false }
]

export const progressInference = [
  { key: 'data', label: '数据', done: 3, total: 6 },
  { key: 'literature', label: '文献综述', done: 26, total: 30 },
  { key: 'model', label: '模型拟合', done: 1, total: 4 },
  { key: 'writing', label: '论文写作', done: 4, total: 8 },
  { key: 'defense', label: '答辩预备', done: 0, total: 3 }
]

export const weekDone = [
  { label: '完成文献核验 26 篇', status: 'pass' },
  { label: '导出可复现代码包（Python）', status: 'pass' },
  { label: '提交数据分析体检报告', status: 'pass' },
  { label: '更新研究可行性评分', status: 'pending' }
]

// ---------- P2-1 研究可行性分析 ----------
export const researchGaps = [
  { id: 'g1', conclusion: '现有研究多聚焦横截面相关，缺乏纵向追踪与因果推断。', source: 'Zhang et al.', year: 2023, cited: 412 },
  { id: 'g2', conclusion: '手机依赖的测量工具不统一，自评量表信效度参差。', source: 'Li & Wang', year: 2022, cited: 287 },
  { id: 'g3', conclusion: '社交媒体使用与社交焦虑的方向性尚未明确，可能存在双向效应。', source: 'Chen', year: 2024, cited: 156 }
]

export const topReviews = [
  { id: 'r1', title: 'The relationship between smartphone use and mental health: A meta-analysis', cited: 1820, doi: '10.1037/rev0000312', journal: 'Psychological Bulletin', year: 2023 },
  { id: 'r2', title: 'Problematic social media use and anxiety symptoms in adolescents', cited: 934, doi: '10.1016/j.chb.2022.107341', journal: 'Computers in Human Behavior', year: 2022 },
  { id: 'r3', title: 'A systematic review of phone dependency scales', cited: 612, doi: '10.1080/10447318.2021.1988', journal: 'Int. J. Human-Computer Interaction', year: 2021 },
  { id: 'r4', title: 'Longitudinal links between social anxiety and social media', cited: 388, doi: '10.1037/abn0000712', journal: 'J. Abnormal Psychology', year: 2024 }
]

// 逐年趋势（基于 1,284 篇真实文献）
export const trend = [
  { year: 2021, value: 188 },
  { year: 2022, value: 241 },
  { year: 2023, value: 296 },
  { year: 2024, value: 332 },
  { year: 2025, value: 227 }
]

export const feasibilityScore = {
  total: 5,
  dimensions: [
    { key: 'literature_quality', label: '文献质量', score: 4.2, text: '核心文献 1,284 篇，高被引占比 12.5%' },
    { key: 'data_availability', label: '数据可得性', score: 3.5, text: '公开数据集 6 个，另有问卷 350 份，样本量偏小' },
    { key: 'design_complexity', label: '方案复杂度', score: 3.0, text: '涉及多变量，需统一量表' }
  ]
}

export const databases = [
  { id: 'db1', name: 'Open Psychological Data', tags: ['一键直接导入'], note: 'APA 开放数据集仓库', discipline: '心理学' },
  { id: 'db2', name: 'OSF', tags: ['一键直接导入'], note: '开放科学框架，多预注册项目', discipline: '心理学' },
  { id: 'db3', name: 'PsycINFO', tags: ['需自行申请'], note: 'APA 文摘库，需机构权限', discipline: '心理学' },
  { id: 'db4', name: 'CCSM', tags: ['一键直接导入'], note: '中国综合社会调查', discipline: '社会科学' },
  { id: 'db5', name: 'CGSS', tags: ['需自行申请'], note: '中国 generalised 社会调查', discipline: '社会科学' },
  { id: 'db6', name: 'UCI ML', tags: ['一键直接导入'], note: '经典机器学习数据集', discipline: '计算机' },
  { id: 'db7', name: 'PubMed Open', tags: ['开放获取'], note: '开放获取生物医学文献与元数据', discipline: '医学' },
  { id: 'db8', name: 'figshare', tags: ['一键直接导入'], note: '科研数据仓储', discipline: '人文艺术' },
  { id: 'db9', name: 'ICPSR', tags: ['需自行申请'], note: '社会科学行为数据存档', discipline: '社会科学' },
  { id: 'db10', name: 'Kaggle Datasets', tags: ['一键直接导入'], note: '社区公开数据集', discipline: '计算机' },
  { id: 'db11', name: 'OECD Data', tags: ['提供 API'], note: '经合组织开放数据', discipline: '经济学' },
  { id: 'db12', name: 'World Bank Open', tags: ['提供 API'], note: '世界银行开放数据', discipline: '经济学' },
  { id: 'db13', name: 'CNKI', tags: ['需自行申请'], note: '中国知网学术数据', discipline: '人文艺术' },
  { id: 'db14', name: 'Mendeley Data', tags: ['一键直接导入'], note: 'Elsevier 科研数据仓库', discipline: '医学' }
]

// ---------- P3 文献综述 ----------
export const literatureList = [
  { id: 'l_88', title: 'The relationship between smartphone use and mental health: A meta-analysis', authors: 'Zhang, L. et al.', journal: 'Psychological Bulletin', year: 2023, quartile: 'JCR Q1', doi: '10.1037/rev0000312', doiVerified: true, type: 'article', conclusion: '手机使用时长与抑郁/焦虑呈小到中等正相关，但因果方向不确定。', tags: ['meta-analysis', 'mental health'], focus: '样本异质性较大', selected: true },
  { id: 'l_91', title: 'Problematic social media use and anxiety symptoms in adolescents', authors: 'Li, H. & Wang, Y.', journal: 'Computers in Human Behavior', year: 2022, quartile: 'JCR Q1', doi: '10.1016/j.chb.2022.107341', doiVerified: true, type: 'article', conclusion: '问题性社交媒体使用可显著预测青少年焦虑症状（β=0.31）。', tags: ['adolescent', 'anxiety'], focus: '横截面设计', selected: true },
  { id: 'l_77', title: 'A non-peer-reviewed preprint on screen time and sleep', authors: 'Anonymous', journal: 'OSF Preprints', year: 2025, quartile: '-', doi: '', doiVerified: false, type: 'preprint', conclusion: '屏幕时间与睡眠时长负相关（未经同行评审）。', tags: ['preprint', 'sleep'], focus: '未同行评审', selected: false },
  { id: 'l_64', title: 'Longitudinal links between social anxiety and social media', authors: 'Chen, M.', journal: 'J. Abnormal Psychology', year: 2024, quartile: 'JCR Q1', doi: '10.1037/abn0000712', doiVerified: true, type: 'article', conclusion: '社交焦虑与社交媒体使用存在双向纵向关联。', tags: ['longitudinal'], focus: '样本偏年轻', selected: true }
]

export const agentVerify = {
  status: 'running',
  agentA: { name: '内容一致性', consistency: 0.96, issues: 1 },
  agentB: { name: 'DOI 真实性', consistency: 0.99 },
  result: { pass: 1, doubt: 2, fail: 1 },
  details: [{ litId: 'l_88', level: 'fail', reason: '第 8 条引用数据不实' }]
}

// ---------- P4 数据分析 ----------
export const dataHealth = {
  reportDate: '2026-09-22T09:14:00+08:00',
  rowCount: 350,
  columnCount: 42,
  missingRate: 0.018,
  outlierCount: 7,
  problemVariables: [
    { name: 'social_support', issue: 'all_missing', rate: 0.9902, excluded: true },
    { name: 'grade', issue: 'no_variance', count: 2 }
  ]
}

export const candidateMethods = [
  { key: 'group_regression_bootstrap', name: '分组回归 + Bootstrap 中介', recommended: true, scenario: '检验不同群体中介效应差异', pros: '稳健、可直接给置信区间', cons: '计算量中等', cost: '约 3 分钟' },
  { key: 'sem', name: '结构方程模型 SEM', recommended: false, scenario: '多潜变量复杂路径', pros: '拟合整体模型', cons: '样本量要求高', cost: '约 6 分钟' },
  { key: 'process_model_7', name: 'PROCESS Model 7', recommended: false, scenario: '有调节的中介', pros: '易于解释', cons: '仅点估计', cost: '约 2 分钟' }
]

export const reproducibleCode = `import statsmodels.api as sm
from sklearn.utils import resample

# Bootstrap 中介效应（分组回归）
def bootstrap_mediation(X, M, Y, seed=42, n=5000):
    rng = np.random.default_rng(seed)
    effs = []
    for _ in range(n):
        idx = rng.integers(0, len(X), len(X))
        a = sm.OLS(M[idx], sm.add_constant(X[idx])).fit().params[1]
        b = sm.OLS(Y[idx], sm.add_constant(M[idx])).fit().params[1]
        effs.append(a * b)
    return np.percentile(effs, [2.5, 97.5])`

export const robustness = [
  { method: 'SEM + 分组回归', status: 'done', diff: 'n=14 组间差异显著 (p<.05)' },
  { method: 'PROCESS Model 7', status: 'pending', diff: '待执行' }
]

export const missingDistribution = [
  { name: 'social_support', rate: 99.0, allMissing: true },
  { name: 'grade', rate: 2.0, allMissing: false },
  { name: 'income', rate: 6.5, allMissing: false },
  { name: 'sleep_hours', rate: 4.1, allMissing: false },
  { name: 'exercise', rate: 8.8, allMissing: false }
]

// ---------- P5 论文写作 ----------
export const manuscript = {
  id: 'ms_1',
  title: '社交焦虑与手机依赖的关系研究',
  abstract: '本研究基于 350 名大学生样本，采用 Bootstrap 中介模型探讨……',
  aiGeneratedRatio: 0.42,
  citationStyle: 'APA 7',
  version: 3,
  wordCount: 6840,
  citationCount: 12,
  sections: [
    { id: 's1', level: 1, title: '引言', wordCount: 920, citationCount: 3 },
    { id: 's2', level: 1, title: '研究背景', wordCount: 760, citationCount: 2 },
    { id: 's3', level: 1, title: '研究空白', wordCount: 540, citationCount: 2 },
    { id: 's4', level: 1, title: '文献综述', wordCount: 1480, citationCount: 4 },
    { id: 's5', level: 1, title: '研究方法', wordCount: 1120, citationCount: 1 },
    { id: 's6', level: 1, title: '结果', wordCount: 1180, citationCount: 0 },
    { id: 's7', level: 1, title: '讨论与结论', wordCount: 840, citationCount: 0 }
  ]
}

export const citations = [
  { id: 'c1', title: 'The relationship between smartphone use and mental health', source: 'Zhang, L. (2023)', doi: '10.1037/rev0000312', verified: true },
  { id: 'c2', title: 'Problematic social media use and anxiety symptoms', source: 'Li, H. (2022)', doi: '10.1016/j.chb.2022.107341', verified: true },
  { id: 'c3', title: 'Longitudinal links between social anxiety and social media', source: 'Chen, M. (2024)', doi: '10.1037/abn0000712', verified: true }
]

// ---------- P6 选刊 AI ----------
export const journalRecommend = {
  total: 5,
  items: [
    { journalId: 'j_1', name: 'Computers in Human Behavior', quartile: 'JCR Q1', casQuartile: '中科院 1 区', impactFactor: 8.9, publisher: 'Elsevier', matchScore: 0.94, scope: '人类与新兴媒体交互，涵盖行为科学/心理/社科' },
    { journalId: 'j_2', name: 'Journal of Behavioral Addictions', quartile: 'JCR Q1', casQuartile: '中科院 2 区', impactFactor: 6.7, publisher: 'Akadémiai Kiadó', matchScore: 0.89, scope: '行为成瘾与手机依赖方向' },
    { journalId: 'j_3', name: '心理科学进展', quartile: 'CSSCI', casQuartile: '中科院 2 区', impactFactor: 2.4, publisher: '中科院心理所', matchScore: 0.81, scope: '国内心理学综述类期刊' },
    { journalId: 'j_4', name: 'BMC Psychology', quartile: 'JCR Q2', casQuartile: '中科院 3 区', impactFactor: 3.4, publisher: 'Springer', matchScore: 0.77, scope: '开放获取综合心理学期刊' },
    { journalId: 'j_5', name: 'Addictive Behaviors', quartile: 'JCR Q1', casQuartile: '中科院 2 区', impactFactor: 4.6, publisher: 'Elsevier', matchScore: 0.72, scope: '成瘾行为机制与干预' }
  ]
}

export const journalProfile = {
  journalId: 'j_1',
  name: 'Computers in Human Behavior',
  indexedYears: '1995–2025',
  publisher: 'Elsevier',
  subjects: ['心理学', '传播学', '人机交互'],
  reviewWeeks: 8,
  acceptRate: '0.21',
  impactFactor: 8.9,
  fiveYearIF: 9.3,
  apc: '¥ 12,000（OA 可选）',
  index: ['SSCI', 'JCR Q1'],
  rank: 'HCI 领域 Q1'
}

export const journalAiPolicy = '期刊要求披露 AI 辅助使用情况；不接受 AIGC 直接生成的结论与研究数据；方法章节须说明 AI 工具名称与用途。'

export const journalChecklist = [
  { key: 'format', label: '格式合规', status: 'done' },
  { key: 'ref', label: '参考文献格式（APA 7）', status: 'done' },
  { key: 'words', label: '字数限制', status: 'done' },
  { key: 'figure', label: '图表规范', status: 'pending' },
  { key: 'ai', label: 'AI 使用说明文件齐备', status: 'done' },
  { key: 'ethics', label: '伦理数据引用检查声明', status: 'pending' },
  { key: 'cover', label: '投稿信（Cover Letter）', status: 'pending' },
  { key: 'org', label: '作者贡献声明', status: 'pending' }
]

// ---------- P7 模拟评审 ----------
export const reviewIssues = [
  { id: 'i1', code: 'H1', severity: 'critical', title: '方法论：中介效应未报告 Bootstrap 置信区间', description: 'PROCESS 输出仅点估计，缺少 95% CI，结论稳健性存疑。', suggestion: '改用 Bootstrap 5,000 次重采样并报告 [2.5%, 97.5%] 区间。' },
  { id: 'i2', code: 'H2', severity: 'critical', title: '统计：social_support 变量完全缺失却进入模型', description: '该变量被纳入却在体检报告标记 all_missing，存在逻辑矛盾。', suggestion: '从模型中剔除 social_support 或说明为何保留。' },
  { id: 'i3', code: 'D1', severity: 'disputed', title: '争议点：因果方向推断依据不足', description: '审稿人可能质疑横截面数据支持因果结论。', suggestion: '将措辞由“导致”改为“相关/关联”，并讨论方向性。' },
  { id: 'i4', code: 'S1', severity: 'style', title: '风格：引言过长，建议压缩至 1 页', description: '引言占全文 14%，超出期刊建议。', suggestion: '合并研究背景与研究空白小节。' },
  { id: 'i5', code: 'S2', severity: 'style', title: '风格：图表标题缺少缩写说明', description: '图 2 出现未定义缩写 SAS。', suggestion: '在图注或缩略语表中补充定义。' }
]

export const reviewSuggestions = [
  { code: 'H1', path: '方法 → 数据分析：补充 Bootstrap 95% CI（n=5000）。' },
  { code: 'H2', path: '方法 → 变量：剔除 social_support 或在局限中声明。' },
  { code: 'D1', path: '讨论：弱化因果表述，增加方向性讨论。' },
  { code: 'S1', path: '引言：压缩至 1 页以内。' },
  { code: 'S2', path: '图注：补充 SAS 缩写定义。' }
]

export const reviewSummary = { accepted: 3, disputed: 2, ignored: 1, corpus: 312 }

// ---------- P8 导出中心 ----------
export const materials = [
  { id: 'm1', name: '结构化文献综述', type: 'structured_review', generatedAt: '2026-09-22 18:40', size: '1.2 MB', verifyStatus: 'dual_agent_passed', formats: ['md', 'docx', 'pdf'] },
  { id: 'm2', name: '数据体检报告', type: 'data_health_report', generatedAt: '2026-09-22 09:14', size: '320 KB', verifyStatus: 'data_integrity_ok', formats: ['pdf'] },
  { id: 'm3', name: '分析结果包', type: 'analysis_package', generatedAt: '2026-09-21 22:10', size: '4.7 MB', verifyStatus: 'dual_agent_passed', formats: ['md', 'pdf'] },
  { id: 'm4', name: '论文初稿', type: 'manuscript_draft', generatedAt: '2026-09-22 16:02', size: '880 KB', verifyStatus: 'desensitized', formats: ['docx', 'pdf'] },
  { id: 'm5', name: '可复现代码（Python/R）', type: 'reproducible_code', generatedAt: '2026-09-21 22:30', size: '56 KB', verifyStatus: 'data_integrity_ok', formats: ['zip'] },
  { id: 'm6', name: '投稿报告', type: 'submission_package', generatedAt: '2026-09-22 17:50', size: '640 KB', verifyStatus: 'dual_agent_passed', formats: ['pdf'] },
  { id: 'm7', name: '双 Agent 核验明细', type: 'structured_review', generatedAt: '2026-09-22 18:30', size: '210 KB', verifyStatus: 'dual_agent_passed', formats: ['md', 'pdf'] },
  { id: 'm8', name: '引用文献包', type: 'structured_review', generatedAt: '2026-09-22 15:20', size: '1.8 MB', verifyStatus: 'dual_agent_passed', formats: ['docx', 'pdf'] }
]

export const exportBlockers = [
  { id: 'b1', type: 'unverified_reference', severity: 'red', description: '存在 1 条参考文献无法验证 DOI（l_77 预印本），需人工确认。' }
]

export const aiUsageReport = {
  coverage: 1.0,
  items: [
    '平台名称与版本与申明时间轴线',
    '原始提问与生成内容记录',
    '双 Agent 核验结果摘要',
    '主体确认应用记录',
    '开源代码引用清单（含许可证）',
    'P7 评审记录（校审语料 312 条）',
    '待核验项自动标注（当前 14 条）'
  ]
}

// ---------- G5 定价 ----------
export const plans = [
  { key: 'student', name: '学生版', price: 19, unit: '/月', desc: '适合大学生', popular: false, current: false, cta: '当前套餐', benefits: ['文献检索 200 次/月', '综述生成 20 篇/月', '双 Agent 核验 50 次/月', '沙箱算力 60 分钟/月', '导出 10 次/月'] },
  { key: 'pro', name: '专业版', price: 49, unit: '/月', desc: '适合硕士/博士/科研人员', popular: true, current: false, cta: '升级到专业版', benefits: ['文献检索 1000 次/月', '综述生成 100 篇/月', '双 Agent 核验 300 次/月', '沙箱算力 300 分钟/月', '导出 50 次/月', 'AI 模拟评审额度'] },
  { key: 'team', name: '团队版', price: 129, unit: '/月/成员', desc: '课题组/实验室', popular: false, current: false, cta: '联系销售', benefits: ['团队空间与权限管理', '共享语料库', '审计日志', '专属客服', '按成员计费'] }
]

export const quotaTable = {
  dimensions: [
    { key: 'literature_search', label: '文献检索次数' },
    { key: 'review_generation', label: '综述生成' },
    { key: 'agent_verification', label: '双 Agent 核验' },
    { key: 'sandbox_minutes', label: '沙箱算力（分钟）' },
    { key: 'export_count', label: '导出次数' }
  ],
  rows: {
    student: [200, 20, 50, 60, 10],
    pro: [1000, 100, 300, 300, 50],
    team: ['不限', 500, 1000, 1000, 200]
  }
}

// ---------- P2-3 项目设置 ----------
export const members = [
  { id: 'mb1', name: '陈同学', role: 'owner', roleText: '第一作者 / 所有者', permissions: '全部权限' },
  { id: 'mb2', name: '王教授', role: 'mentor', roleText: '导师', permissions: '查看 / 改状态 / 评论' },
  { id: 'mb3', name: '李同学', role: 'collaborator', roleText: '协作学生', permissions: '可编辑产物' }
]

export const versions = [
  { id: 'v1', no: 'v3', operator: '陈同学', time: '2026-09-22 19:00', summary: '更新数据分析章节' },
  { id: 'v2', no: 'v2', operator: '陈同学', time: '2026-09-21 10:30', summary: '导入写作大纲' },
  { id: 'v3', no: 'v1', operator: '陈同学', time: '2026-09-20 08:00', summary: '创建项目' }
]

export const dataLevels = [
  { key: 'L0', label: 'L0 公开', note: '可公开共享，无脱敏要求。' },
  { key: 'L1', label: 'L1 个人', note: '脱敏后仅项目成员可见（当前）。' },
  { key: 'L2', label: 'L2 敏感', note: '强制脱敏 + 加密 + 水印溯源。' }
]
