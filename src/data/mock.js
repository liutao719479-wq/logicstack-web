export const directions = [
  {
    title: '工程实践',
    index: '01',
    route: '/engineering',
    description: '大数据开发、数仓建模、数据治理、SQL 优化与项目经验。',
    tags: ['Hive', 'Spark', 'Spring Boot']
  },
  {
    title: '工具构建',
    index: '02',
    route: '/tools',
    description: '开发、数据处理与效率提升相关的轻量免费工具。',
    tags: ['JSON', 'SQL', 'Productivity']
  },
  {
    title: '市场研究',
    index: '03',
    route: '/trading',
    description: '宏观地图、交易策略、订单流、风险管理与执行反思。',
    tags: ['Order Flow', 'Risk', 'Macro']
  },
  {
    title: '宏观地图',
    index: '04',
    route: '/macro',
    description: '用热图观察全球通胀、失业、GDP 与利率的变化。',
    tags: ['Inflation', 'GDP', 'Rates']
  }
]

export const articles = [
  {
    slug: 'lakehouse-modeling-layers',
    category: '数仓建模',
    title: '从 ODS 到 ADS：可演进的数据分层设计',
    excerpt: '在指标口径和查询成本之间建立清晰的数据生产路径。',
    date: '2026-05-18',
    readTime: '10 min',
    tags: ['Hive', 'Spark', '建模'],
    featured: true
  },
  {
    slug: 'seatunnel-batch-pipeline',
    category: '数据集成',
    title: 'SeaTunnel 批量任务的配置治理思路',
    excerpt: '将重复的数据同步配置转换成稳定、可观察的任务流程。',
    date: '2026-05-10',
    readTime: '8 min',
    tags: ['SeaTunnel', 'ETL']
  },
  {
    slug: 'sql-performance-practice',
    category: 'SQL 优化',
    title: '复杂报表 SQL 的性能排查路径',
    excerpt: '从执行计划、分区裁剪到中间结果复用的实践记录。',
    date: '2026-04-27',
    readTime: '12 min',
    tags: ['SQL', 'Performance']
  },
  {
    slug: 'springboot-data-service',
    category: 'Java',
    title: 'Spring Boot 数据服务接口的边界设计',
    excerpt: '面向可视化产品构建稳定的数据 API 与错误契约。',
    date: '2026-04-08',
    readTime: '9 min',
    tags: ['Java', 'API']
  },
  {
    slug: 'data-quality-rules',
    category: '数据治理',
    title: '数据质量规则如何进入日常交付链路',
    excerpt: '把质量检查从事后救火转化为流水线中的持续反馈。',
    date: '2026-03-21',
    readTime: '7 min',
    tags: ['治理', 'Quality']
  },
  {
    slug: 'vue-dashboard-architecture',
    category: '前端工程',
    title: '数据看板前端的模块化组织方式',
    excerpt: '为图表、筛选器与接口状态留出清晰的扩展空间。',
    date: '2026-03-12',
    readTime: '6 min',
    tags: ['Vue', 'ECharts']
  }
]

export const tools = [
  { name: 'JSON 格式化', type: '开发工具', category: 'dev', description: '校验、格式化与压缩 JSON 数据。', status: '可规划' },
  { name: 'SQL 格式化', type: '数据工具', category: 'data', description: '规范 SQL 排版并高亮常见结构。', status: '可规划' },
  { name: '时间戳转换', type: '开发工具', category: 'dev', description: '在时间戳与常用日期格式间转换。', status: '可规划' },
  { name: 'Excel 转 SQL', type: '数据工具', category: 'data', description: '从表格内容生成批量写入语句。', status: '设计中' },
  { name: '正则测试', type: '开发工具', category: 'dev', description: '快速校验表达式并查看匹配结果。', status: '可规划' },
  { name: '字段注释生成器', type: '效率插件', category: 'productivity', description: '根据字段定义生成结构化注释。', status: '设计中' }
]

export const tradingTools = [
  {
    name: 'XAUUSD 仓位计算器',
    type: '交易工具',
    category: 'market/trading-tools',
    description: '按止损距离与风险额度计算手数。',
    status: '设计中'
  },
  {
    name: '盈亏比计算器',
    type: '交易工具',
    category: 'market/trading-tools',
    description: '快速评估止损、止盈与风险回报。',
    status: '设计中'
  },
  {
    name: 'FTMO / Topstep 风控计算器',
    type: '交易工具',
    category: 'market/trading-tools',
    description: '根据账户限制计算风险预算与容错空间。',
    status: '规划中'
  }
]

export const macroIndicators = [
  { name: '全球通胀率热图', key: 'CPI', change: '-0.3%', description: '消费价格指数同比变化' },
  { name: '全球失业率热图', key: 'UNEMP', change: '+0.1%', description: '主要经济体就业压力' },
  { name: 'GDP 热图', key: 'GDP', change: '+1.8%', description: '季度经济增长表现' },
  { name: '利率热图', key: 'RATE', change: 'Hold', description: '央行政策利率动向' }
]

export const tradingResearch = [
  {
    slug: 'xauusd-london-session',
    market: 'XAUUSD',
    title: '伦敦盘突破后的回撤执行复盘',
    type: '交易复盘',
    date: '2026-05-20'
  },
  {
    slug: 'es-orderflow-absorption',
    market: 'ES',
    title: '订单流吸收信号与失效条件',
    type: '策略研究',
    date: '2026-05-12'
  },
  {
    slug: 'gc-risk-template',
    market: 'GC',
    title: '固定风险模板在黄金期货中的应用',
    type: '工具心得',
    date: '2026-04-30'
  }
]

export const projects = [
  { title: 'LogicStack 个人网站', area: 'Web Product', description: '知识、工具与研究内容的统一发布入口。', stack: ['Vue 3', 'Vite'] },
  { title: '全球宏观热图', area: 'Visualization', description: '以地理热图追踪主要宏观指标变化。', stack: ['ECharts', 'Data API'] },
  { title: '交易风控工具', area: 'Trading', description: '将仓位与盈亏计算沉淀成易用工具。', stack: ['Risk', 'Vue'] },
  { title: '数据治理项目经验', area: 'Data', description: '质量规则、元数据与指标治理方法库。', stack: ['Governance'] },
  { title: '地址标准化工具', area: 'Data Tool', description: '清洗地址文本并形成可匹配维度。', stack: ['Java', 'SQL'] },
  { title: 'SeaTunnel 批量任务脚本', area: 'ETL', description: '统一生成与调度数据同步任务配置。', stack: ['SeaTunnel'] }
]

export const articleBody = [
  {
    heading: '问题背景',
    paragraphs: [
      '数据产品持续演进时，稳定的数据分层能够把业务口径、加工逻辑和展示需求拆开管理。这里展示的是 mock 内容，后续可由文章 API 或 Markdown 内容服务替换。',
      'LogicStack 的内容模型将文章元信息与正文分离，列表可以保持轻量，而详情页按需拉取完整内容。'
    ]
  },
  {
    heading: '设计思路',
    paragraphs: [
      'ODS 层保留可追溯的原始数据，DWD 处理业务事实与维度一致性，DWS 形成主题汇总，ADS 面向具体指标与产品页面交付。',
      '每一层都应拥有明确的输入输出、质量检查与可观测指标，避免把复杂逻辑堆叠在可视化端。'
    ]
  },
  {
    heading: '后续扩展',
    paragraphs: [
      '接入后端后，可增加文章分类筛选、标签检索、Markdown 渲染和发布管理，同时维持前端卡片组件与路由结构不变。'
    ]
  }
]
