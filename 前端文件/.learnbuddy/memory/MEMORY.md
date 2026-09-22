# 研宇宙前端项目 · 长期记忆

## 项目背景
- 产品：研宇宙（Research Universe）——面向高校科研的可信 AI 科研工作台（可行性分析 → 文献综述 → 数据分析 → 论文写作 → 选刊 → 模拟评审 → 成果导出）。
- 依据：MasterGo 设计稿（11 帧）+《产品功能与接口需求文档 v2.0》（约 90 接口）。当前环境不支持读图，前端实现以文档文字规格为准。
- 用户画像：会 JS，后端知识近零，偏好"从选型到部署"的具体可抄命令、本地先跑通再上服务器。

## 技术约定（已选定，勿随意改动）
- 框架：Vite + React 18 + React Router 6，纯 JSX（非 TS）。
- 样式：CSS 变量（src/styles/tokens.css 来自文档第 3 章）；全局类在 global.css。
- 图表：自写 SVG 组件（src/components/charts.jsx），不引三方图表库。
- 主色 #2E5FA3；顶栏高 56px；设计稿 1440×900。
- 路由：/login、/pricing、/dashboard、/projects/:id/{feasibility,literature,data,writing,journal,review,export,settings}。P0 不显示顶栏。
- 数据：src/mock/（data.js 示例数据 + api.js 模拟 REST）。接真后端只改 api.js。

## 坑
- 沙箱环境拦截 dist 删除 → vite.config 已设 emptyOutDir:false。
- 图表组件需对空数据兜底（charts.jsx 已处理）。
