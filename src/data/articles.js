export const engineeringCategories = [
  { label: '全部', value: '' },
  { label: '数据开发', value: 'data-dev' },
  { label: '数仓建模', value: 'warehouse' },
  { label: 'SQL 优化', value: 'sql' },
  { label: '项目经验', value: 'projects' }
]

export const aiCategories = [
  { label: '全部', value: '' },
  { label: 'Agent', value: 'agent' },
  { label: 'Skills', value: 'skills' },
  { label: '大模型部署', value: 'llm-deployment' },
  { label: 'AI 工具链', value: 'ai-toolchain' },
  { label: '学习资料', value: 'learning' }
]

export const tradingCategories = [
  { label: '全部', value: '' },
  { label: '宏观地图', value: 'macro-map' },
  { label: '指标策略', value: 'strategy' },
  { label: 'Order Flow', value: 'order-flow' },
  { label: '交易复盘', value: 'review' },
  { label: '风控', value: 'risk' },
  { label: '交易工具', value: 'trading-tools' }
]

const sharedAuthor = 'LogicStack'

export const engineeringArticles = [
  {
    slug: 'lakehouse-modeling-layers',
    channel: 'engineering',
    category: '数仓建模',
    categoryKey: 'warehouse',
    title: '从 ODS 到 ADS：可演进的数据分层设计',
    excerpt: '在指标口径、复用成本与查询效率之间，建立清晰的数据生产路径。',
    author: sharedAuthor,
    date: '2026-05-18',
    readTime: '10 min',
    tags: ['Hive', 'Spark', '建模'],
    content: [
      { type: 'heading', text: '问题背景' },
      { type: 'paragraph', text: '当数据产品持续演进时，稳定的数据分层能够将业务口径、加工逻辑和展示需求分开管理。一个能长期维护的数仓，不是层数越多越好，而是每一层的责任足够清楚。' },
      { type: 'quote', text: '分层的意义不是堆出术语，而是让变化停留在最合适的位置。' },
      { type: 'heading', text: '层级职责' },
      { type: 'list', items: ['ODS 保留可追溯的原始数据与加载批次。', 'DWD 固化事实与维度关系，统一关键口径。', 'DWS 面向主题沉淀可复用聚合。', 'ADS 为报表或产品界面提供明确交付结果。'] },
      { type: 'code', language: 'sql', code: 'select\n  dt,\n  region_id,\n  sum(order_amount) as revenue\nfrom dwd_trade_order\nwhere dt = ${biz_date}\ngroup by dt, region_id;' },
      { type: 'heading', text: '后续扩展' },
      { type: 'paragraph', text: '接入真实数据服务后，文章中可以补充血缘关系图、指标版本记录和任务质量检查结果。' }
    ]
  },
  {
    slug: 'seatunnel-batch-pipeline',
    channel: 'engineering',
    category: '数据开发',
    categoryKey: 'data-dev',
    title: 'SeaTunnel 批量任务的配置治理思路',
    excerpt: '将重复的数据同步配置转换成稳定、可观察、可回滚的任务流程。',
    author: sharedAuthor,
    date: '2026-05-10',
    readTime: '8 min',
    tags: ['SeaTunnel', 'ETL'],
    content: [
      { type: 'heading', text: '配置为什么会失控' },
      { type: 'paragraph', text: '同步任务从几个增加到数百个以后，连接参数、字段转换和调度规则开始出现重复修改。治理的第一步，是将变化最频繁的参数抽离成统一模板。' },
      { type: 'list', items: ['连接信息由环境配置管理。', '任务定义只描述源表、目标表和字段策略。', '生成脚本负责校验并输出最终配置。'] },
      { type: 'code', language: 'hocon', code: 'env {\n  parallelism = 2\n}\nsource {\n  Jdbc { table_path = "ods_order" }\n}' },
      { type: 'paragraph', text: '统一配置后，告警、补数和版本回滚才有稳定的对象可以依赖。' }
    ]
  },
  {
    slug: 'sql-performance-practice',
    channel: 'engineering',
    category: 'SQL 优化',
    categoryKey: 'sql',
    title: '复杂报表 SQL 的性能排查路径',
    excerpt: '从执行计划、分区裁剪到中间结果复用，整理可靠的排查次序。',
    author: sharedAuthor,
    date: '2026-04-27',
    readTime: '12 min',
    tags: ['SQL', 'Performance'],
    content: [
      { type: 'heading', text: '先找到代价最大的步骤' },
      { type: 'paragraph', text: '优化报表 SQL 时，先确认扫描量、Join 倾斜与重复计算，而不是直接添加缓存或堆叠索引。' },
      { type: 'list', items: ['确认分区过滤是否真正下推。', '检查大表 Join 是否存在倾斜键。', '识别可以复用的中间聚合结果。'] },
      { type: 'code', language: 'sql', code: 'explain formatted\nselect customer_id, sum(amount)\nfrom fact_order\nwhere dt between \'2026-04-01\' and \'2026-04-30\'\ngroup by customer_id;' }
    ]
  },
  {
    slug: 'hive-small-files',
    channel: 'engineering',
    category: '数据开发',
    categoryKey: 'data-dev',
    title: 'Hive 小文件治理与任务资源调优',
    excerpt: '在长期运行的数据仓库中控制碎片、扫描成本与调度压力。',
    author: sharedAuthor,
    date: '2026-04-16',
    readTime: '9 min',
    tags: ['Hive', 'Storage'],
    content: [{ type: 'paragraph', text: '小文件治理需要同时关注写入策略、文件合并周期和下游查询模式，不能只在任务失败后临时处理。' }]
  },
  {
    slug: 'fact-table-dimensions',
    channel: 'engineering',
    category: '数仓建模',
    categoryKey: 'warehouse',
    title: '维度变化场景下的事实表设计',
    excerpt: '面对业务口径变化，如何保持指标可解释且便于追溯。',
    author: sharedAuthor,
    date: '2026-04-05',
    readTime: '7 min',
    tags: ['Modeling', 'DWD'],
    content: [{ type: 'paragraph', text: '缓慢变化维度并不只是建模题目，它决定了历史报表能否在口径变化之后仍然解释清楚。' }]
  },
  {
    slug: 'springboot-data-service',
    channel: 'engineering',
    category: '项目经验',
    categoryKey: 'projects',
    title: 'Spring Boot 数据接口的交付边界',
    excerpt: '将查询能力包装为稳定 API，并为图表和筛选器留出扩展空间。',
    author: sharedAuthor,
    date: '2026-03-22',
    readTime: '9 min',
    tags: ['Java', 'API'],
    content: [{ type: 'paragraph', text: '一个稳定的数据接口需要清晰的筛选参数、分页语义、错误契约与指标版本说明。' }]
  }
]

export const aiArticles = [
  {
    slug: 'agent-workflow-executor',
    channel: 'ai',
    category: 'Agent',
    categoryKey: 'agent',
    title: 'Agent 是什么：从自动化助手到工作流执行者',
    excerpt: '理解 Agent 如何组织上下文、工具调用与可审阅的执行步骤。',
    author: 'LogicStack AI',
    date: '2026-05-22',
    readTime: '9 min',
    tags: ['Agent', 'Workflow'],
    content: [
      { type: 'heading', text: '从回答到执行' },
      { type: 'paragraph', text: '一个可用的 Agent 不只是生成文字，它要能够理解目标、选择工具、读取结果并在风险边界内继续推进。' },
      { type: 'list', items: ['明确任务目标与停止条件。', '为工具调用定义参数和权限边界。', '将结果留给人审阅或回滚。'] },
      { type: 'code', language: 'js', code: 'const result = await agent.run({\n  task: "summarize pipeline failures",\n  tools: ["logs", "docs"]\n})' }
    ]
  },
  {
    slug: 'skills-repeatable-workflows',
    channel: 'ai',
    category: 'Skills',
    categoryKey: 'skills',
    title: 'Skills 如何沉淀重复工作流',
    excerpt: '把高频任务整理成稳定能力，为协作和迭代留下边界。',
    author: 'LogicStack AI',
    date: '2026-05-16',
    readTime: '7 min',
    tags: ['Skills', 'Practice'],
    content: [{ type: 'paragraph', text: 'Skill 的价值在于把反复讲解的过程变成可检查、可修改、可迁移的工作说明。' }]
  },
  {
    slug: 'local-llm-deployment',
    channel: 'ai',
    category: '大模型部署',
    categoryKey: 'llm-deployment',
    title: '本地部署大模型的几种方案',
    excerpt: '对比推理框架、模型尺寸和适合个人研究的部署方式。',
    author: 'LogicStack AI',
    date: '2026-05-08',
    readTime: '11 min',
    tags: ['LLM', 'Deploy'],
    content: [{ type: 'paragraph', text: '本地部署的取舍围绕显存、吞吐、上下文长度和运维复杂度展开，应从实际任务倒推模型方案。' }]
  },
  {
    slug: 'model-toolchain-contracts',
    channel: 'ai',
    category: 'AI 工具链',
    categoryKey: 'ai-toolchain',
    title: '让模型可靠调用开发工具的接口设计',
    excerpt: '从参数校验到失败回退，整理工具调用中的工程约束。',
    author: 'LogicStack AI',
    date: '2026-04-29',
    readTime: '8 min',
    tags: ['Tools', 'API'],
    content: [{ type: 'paragraph', text: '工具接口越明确，模型越容易在失败时说明原因，而不是给出看似完成的错误结论。' }]
  },
  {
    slug: 'rag-retrieval-notes',
    channel: 'ai',
    category: '学习资料',
    categoryKey: 'learning',
    title: 'RAG 项目中的文档切分与召回观察',
    excerpt: '从小实验开始，记录知识库质量如何影响回答稳定性。',
    author: 'LogicStack AI',
    date: '2026-04-20',
    readTime: '10 min',
    tags: ['RAG', 'Vector'],
    content: [{ type: 'paragraph', text: '高质量检索从文档整理开始，切分粒度、元数据和评测问题集同样重要。' }]
  },
  {
    slug: 'llm-reading-path',
    channel: 'ai',
    category: '学习资料',
    categoryKey: 'learning',
    title: '大模型应用开发的阅读路线',
    excerpt: '以工程问题为线索，安排概念、部署与实践资料。',
    author: 'LogicStack AI',
    date: '2026-04-08',
    readTime: '6 min',
    tags: ['Learning', 'LLM'],
    content: [{ type: 'paragraph', text: '从一个能够交付的小应用出发，再向模型能力、评测与部署系统深入，会比只积累术语更有效。' }]
  }
]

export const tradingArticles = [
  {
    slug: 'macro-calendar-execution',
    channel: 'trading',
    category: '指标策略',
    categoryKey: 'strategy',
    title: '交易计划中如何使用宏观事件日历',
    excerpt: '把宏观数据发布时间与波动窗口纳入执行准备。',
    author: 'Market Notes',
    date: '2026-05-20',
    readTime: '8 min',
    tags: ['Macro', 'Plan'],
    content: [{ type: 'paragraph', text: '事件风险管理的重点不是预测数字，而是提前决定在信息公布前后承担多少不确定性。' }]
  },
  {
    slug: 'es-orderflow-absorption',
    channel: 'trading',
    category: 'Order Flow',
    categoryKey: 'order-flow',
    title: 'ES 订单流吸收信号与失效条件',
    excerpt: '将价格推进与主动成交并置，识别信号的有效边界。',
    author: 'Market Notes',
    date: '2026-05-12',
    readTime: '10 min',
    tags: ['ES', 'Order Flow'],
    content: [
      { type: 'heading', text: '观察对象' },
      { type: 'paragraph', text: '订单流只是一种观察执行过程的方法，不能离开位置、波动与风险计划单独使用。' },
      { type: 'quote', text: '信号不是理由，完整的风险边界才是交易计划。' }
    ]
  },
  {
    slug: 'xauusd-london-session',
    channel: 'trading',
    category: '交易复盘',
    categoryKey: 'review',
    title: 'XAUUSD 伦敦盘突破后的执行复盘',
    excerpt: '记录入场条件、止损边界和一次偏离计划的决策。',
    author: 'Market Notes',
    date: '2026-05-09',
    readTime: '7 min',
    tags: ['XAUUSD', 'Review'],
    content: [{ type: 'paragraph', text: '复盘不是为某次盈亏寻找解释，而是记录计划是否被正确执行，以及下一次如何减少随意性。' }]
  },
  {
    slug: 'risk-budget-for-funded',
    channel: 'trading',
    category: '风控',
    categoryKey: 'risk',
    title: '资金账户规则下的日内风险预算',
    excerpt: '将每日回撤限制转换成可以执行的单笔风险范围。',
    author: 'Market Notes',
    date: '2026-04-30',
    readTime: '6 min',
    tags: ['Risk', 'Funded'],
    content: [{ type: 'paragraph', text: '风险预算应先于交易机会存在，它决定了策略在连续失败时是否仍有执行空间。' }]
  }
]

export const allArticles = [...engineeringArticles, ...aiArticles, ...tradingArticles]

export function getArticleBySlug(slug) {
  return allArticles.find((article) => article.slug === slug)
}

export function getRelatedArticles(article, count = 3) {
  return allArticles
    .filter((item) => item.slug !== article.slug && item.channel === article.channel)
    .slice(0, count)
}
