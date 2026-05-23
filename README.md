# LogicStack Web

LogicStack 的前端第一版，面向数据工程、交易研究与宏观数据可视化内容展示。首页采用暗色沉浸式 Hero 和 CSS 山景背景，便于后续替换为自有背景图。

## 技术栈

- Vue 3 + Vite
- Vue Router
- Element Plus（按需引入）
- Axios
- ECharts（宏观页世界地图热图与 mock 指标数据）

## 启动

```bash
npm install
npm run dev
```

Windows PowerShell 如果因执行策略无法运行 `npm.ps1`，可使用：

```powershell
npm.cmd install
npm.cmd run dev
```

构建生产版本：

```bash
npm run build
```

## 目录结构

```text
public/
  maps/          运行时加载的本地世界地图 GeoJSON
src/
  components/
    cards/       通用内容卡片
    common/      区块标题等基础组件
    home/        首页 Hero
    layout/      Header 与 Footer
    macro/       宏观预览及 ECharts 地图/图表
  data/          当前 mock 内容数据与宏观指标数据
  router/        页面路由
  services/      Axios 请求实例
  styles/        全局主题变量及基础样式
  views/         页面组件
```

## 页面

- `/` 首页
- `/engineering` 工程实践
- `/articles/:slug` 文章详情
- `/tools` 在线工具箱
- `/trading` 交易研究
- `/macro` 宏观地图
- `/projects` 实战项目
- `/about` 关于

## 替换 Hero 背景

目前 Hero 在 `src/components/home/HeroSection.vue` 中使用 CSS 渐变和图形层生成山景氛围。后续加入自有背景图时，可在 `.hero` 或 `.sky` 中增加 `background-image: url(...)`，保留 `.hero-noise` 作为暗色遮罩以维持文字可读性。

## 后端接入建议

1. 使用 Spring Boot 提供 `/api/articles`、`/api/tools`、`/api/projects`、`/api/trading` 与 `/api/macro/*` 等 REST 接口。
2. MySQL 分表保存文章元信息/正文、工具配置、项目条目及宏观指标时序数据；正文也可以保存 Markdown 内容。
3. 前端在 `.env` 中配置 `VITE_API_BASE_URL`，`src/services/http.js` 已提供 Axios 实例。
4. 将 `src/data/mock.js` 的数据读取逐步替换为页面中的 API 请求；在迁移期间可保留 mock 数据作为接口失败降级或开发演示数据。
5. 宏观地图的数据入口位于 `src/services/macro.js`；设置 `VITE_USE_MOCK_DATA=false` 后会请求 `/api/macro/metrics/:metricKey`，响应结构沿用 `src/data/macroMock.js` 即可映射到 ECharts 世界地图系列。
