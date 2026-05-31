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
  { label: '交易观点', value: 'strategy' },
  { label: 'Order Flow', value: 'order-flow' },
  { label: '交易复盘', value: 'review' },
  { label: '风控', value: 'risk' },
  { label: '交易工具', value: 'trading-tools' }
]

const sharedAuthor = 'LogicStack'

function createMockContent({ context, focus, checklist, closing, code }) {
  return [
    { type: 'heading', text: '为什么需要整理' },
    { type: 'paragraph', text: context },
    { type: 'heading', text: '实践中的关键点' },
    { type: 'paragraph', text: focus },
    { type: 'list', items: checklist },
    ...(code ? [{ type: 'code', ...code }] : []),
    { type: 'heading', text: '留下可复用的记录' },
    { type: 'paragraph', text: closing }
  ]
}

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
      { type: 'image', src: '/images/mountain.jpg', alt: '山脉与云层组成的深色风景', caption: '复杂系统也需要清晰的层次。图片用于演示文章详情页的宽幅配图展示。' },
      { type: 'heading', text: '层级职责' },
      { type: 'list', items: ['ODS 保留可追溯的原始数据与加载批次。', 'DWD 固化事实与维度关系，统一关键口径。', 'DWS 面向主题沉淀可复用聚合。', 'ADS 为报表或产品界面提供明确交付结果。'] },
      { type: 'code', language: 'sql', title: 'ads_region_revenue.sql', code: 'select\n  dt,\n  region_id,\n  sum(order_amount) as revenue\nfrom dwd_trade_order\nwhere dt = ${biz_date}\ngroup by dt, region_id;' },
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
      { type: 'code', language: 'hocon', title: 'seatunnel.conf', code: 'env {\n  parallelism = 2\n}\nsource {\n  Jdbc { table_path = "ods_order" }\n}' },
      { type: 'paragraph', text: '统一配置后，告警、补数和版本回滚才有稳定的对象可以依赖。' },
      { type: 'heading', text: '版本与回滚' },
      { type: 'paragraph', text: '每次配置发布都保留版本号、生成结果和执行批次。出现异常时，先恢复上一份稳定配置，再单独定位字段映射或连接参数的变化。' },
      { type: 'heading', text: '上线前检查' },
      { type: 'paragraph', text: '上线前通过小批量数据验证字段数量、空值比例和目标表分区，避免把配置问题带入正式调度。' }
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
      { type: 'code', language: 'sql', code: 'explain formatted\nselect customer_id, sum(amount)\nfrom fact_order\nwhere dt between \'2026-04-01\' and \'2026-04-30\'\ngroup by customer_id;' },
      { type: 'heading', text: '按层次收敛问题' },
      { type: 'paragraph', text: '先处理扫描范围，再检查数据倾斜，最后考虑物化中间结果。按成本从高到低排查，通常比零散修改参数更容易得到稳定收益。' },
      { type: 'heading', text: '记录优化前后的差异' },
      { type: 'paragraph', text: '保留执行计划、运行时长和输入分区数量，让下一次排查能够沿用已有结论。' }
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
    content: createMockContent({
      context: '小文件治理需要同时关注写入策略、文件合并周期和下游查询模式，不能只在任务失败后临时处理。',
      focus: '治理动作应从产生源头开始。高频微批写入、分区粒度过细和任务并行度不合理，都会让文件数量在不知不觉中累积。',
      checklist: ['按分区记录文件数量与平均大小。', '为高频写入任务设置合并周期。', '结合下游查询窗口调整分区策略。'],
      closing: '把文件数量趋势加入日常巡检后，资源调优就不再只是一次性的救火动作。'
    })
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
    content: createMockContent({
      context: '缓慢变化维度并不只是建模题目，它决定了历史报表能否在口径变化之后仍然解释清楚。',
      focus: '设计事实表时，需要明确记录事件发生时使用的维度版本，区分当前状态查询和历史状态还原。',
      checklist: ['为维度记录生效时间与失效时间。', '事实表保留可追溯的维度键。', '对口径变化提供回溯说明。'],
      closing: '历史数据可以被重新解释，但不能失去当时的上下文。'
    })
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
    content: createMockContent({
      context: '一个稳定的数据接口需要清晰的筛选参数、分页语义、错误契约与指标版本说明。',
      focus: '接口不是把 SQL 包一层 HTTP。交付前要先约定查询边界、返回结构和异常情况下的反馈方式。',
      checklist: ['限制时间范围与分页大小。', '统一错误码和空结果语义。', '为指标字段附带版本说明。'],
      closing: '清楚的接口边界能够减少前后端反复确认，也让后续扩展更从容。'
    })
  },
  {
    slug: 'hive-partition-quality-checks',
    channel: 'engineering',
    category: '数据开发',
    categoryKey: 'data-dev',
    title: 'Hive 分区表的数据质量检查方案',
    excerpt: '从分区完整性、数据量波动和关键字段空值率建立基础巡检。',
    author: sharedAuthor,
    date: '2026-03-15',
    readTime: '9 min',
    tags: ['Hive', 'Quality'],
    content: createMockContent({
      context: '离线任务成功结束，并不等于当天数据已经可以放心交付。分区缺失、数据量骤降和关键字段空值都会悄悄影响下游。',
      focus: '质量检查应和调度批次绑定，让每次产出都留下可以追溯的检查结果。',
      checklist: ['确认目标分区存在且可读取。', '比较近七天数据量波动。', '检查主键重复与核心字段空值。'],
      closing: '先建立少量可靠规则，再根据真实故障逐步补充，比一次铺开大量告警更有效。'
    })
  },
  {
    slug: 'mysql-to-hive-offline-sync',
    channel: 'engineering',
    category: '数据开发',
    categoryKey: 'data-dev',
    title: 'MySQL 到 Hive 的离线同步实践',
    excerpt: '整理全量初始化、增量抽取和补数过程中的关键约束。',
    author: sharedAuthor,
    date: '2026-03-06',
    readTime: '10 min',
    tags: ['MySQL', 'Hive', 'ETL'],
    content: createMockContent({
      context: '从业务库同步到 Hive，看似只是搬运数据，实际需要处理增量边界、删除语义和历史补数。',
      focus: '同步任务要明确每张表的抽取字段、更新时间来源和目标分区方式，避免所有表共用一份模糊模板。',
      checklist: ['记录抽取窗口和源端最大更新时间。', '区分新增、更新与逻辑删除。', '补数任务使用独立批次标识。'],
      closing: '同步链路越清楚，下游越容易解释某一天的数据为什么发生变化。'
    })
  },
  {
    slug: 'address-normalization-pipeline',
    channel: 'engineering',
    category: '项目经验',
    categoryKey: 'projects',
    title: '地址清洗与标准化的工程实践',
    excerpt: '将模糊文本拆解为可校验、可回溯的结构化地址。',
    author: sharedAuthor,
    date: '2026-02-24',
    readTime: '11 min',
    tags: ['Cleaning', 'Rule Engine'],
    content: createMockContent({
      context: '地址文本常常混合简称、错别字、冗余描述和缺失层级。单次正则替换很难支撑长期迭代。',
      focus: '更稳妥的方式是把解析拆成预处理、行政区匹配、详细地址提取和置信度校验几个步骤。',
      checklist: ['保留原始文本和清洗版本。', '为每条规则记录命中原因。', '低置信度结果进入人工复核。'],
      closing: '规则可以不断增加，但每一次修正都应保留来源，避免清洗逻辑变成无法解释的黑盒。'
    })
  },
  {
    slug: 'metric-definition-governance',
    channel: 'engineering',
    category: '数仓建模',
    categoryKey: 'warehouse',
    title: '指标口径管理如何避免重复建设',
    excerpt: '从命名、计算逻辑和使用场景整理可复用的指标资产。',
    author: sharedAuthor,
    date: '2026-02-11',
    readTime: '8 min',
    tags: ['Metrics', 'Governance'],
    content: createMockContent({
      context: '不同报表里出现名称相近、算法略有差异的指标，会让分析结果难以对齐，也增加维护成本。',
      focus: '指标管理首先要回答业务含义、统计周期、过滤条件和责任人，而不是急着建立复杂平台。',
      checklist: ['为指标保留清晰中文名称与唯一编码。', '记录计算 SQL 和适用范围。', '变更时保留版本与影响清单。'],
      closing: '指标资产真正有价值的地方，是让新的需求优先复用已有结论。'
    })
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
      { type: 'code', language: 'js', title: 'agent-runner.js', code: 'const result = await agent.run({\n  task: "summarize pipeline failures",\n  tools: ["logs", "docs"]\n})' },
      { type: 'heading', text: '控制执行边界' },
      { type: 'paragraph', text: 'Agent 的价值不在于自动执行得越多越好，而在于知道哪些步骤可以直接完成，哪些操作必须等待确认。' },
      { type: 'heading', text: '从小工作流开始' },
      { type: 'paragraph', text: '先选择输入明确、结果可检查的任务，例如整理日志或生成检查清单，再逐步增加工具调用。' }
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
    content: createMockContent({
      context: 'Skill 的价值在于把反复讲解的过程变成可检查、可修改、可迁移的工作说明。',
      focus: '一个可用的 Skill 应说明适用场景、输入信息、执行步骤和停止条件，避免只留下抽象原则。',
      checklist: ['写清任务触发条件。', '列出需要读取的上下文。', '为高风险步骤保留人工确认。'],
      closing: '当流程可以被复盘和调整时，个人经验才真正变成可持续积累的能力。'
    })
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
    content: createMockContent({
      context: '本地部署的取舍围绕显存、吞吐、上下文长度和运维复杂度展开，应从实际任务倒推模型方案。',
      focus: '个人环境更适合先从模型尺寸、量化方式和推理框架三个变量做小规模验证。',
      checklist: ['确认显存与内存上限。', '记录首 token 延迟和生成速度。', '用真实任务比较不同模型效果。'],
      closing: '部署方案没有唯一答案，稳定运行并满足自己的任务需求更重要。'
    })
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
    content: createMockContent({
      context: '工具接口越明确，模型越容易在失败时说明原因，而不是给出看似完成的错误结论。',
      focus: '参数命名、类型约束、错误消息和权限边界都会影响模型调用工具时的稳定性。',
      checklist: ['使用结构化参数而不是自由文本。', '返回可判断的错误类型。', '将写入操作和查询操作分开授权。'],
      closing: '良好的工具契约不仅服务模型，也会让普通调用方更容易调试。'
    })
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
    content: createMockContent({
      context: '高质量检索从文档整理开始，切分粒度、元数据和评测问题集同样重要。',
      focus: '切分不是把文本机械截短。标题层级、段落关系和文档来源都应进入检索上下文。',
      checklist: ['保留文档来源和更新时间。', '按语义段落切分内容。', '用固定问题集观察召回变化。'],
      closing: '先把召回结果看明白，再调整生成提示词，定位问题会更直接。'
    })
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
    content: createMockContent({
      context: '从一个能够交付的小应用出发，再向模型能力、评测与部署系统深入，会比只积累术语更有效。',
      focus: '阅读路线可以围绕一个实际问题展开：如何输入上下文、如何调用工具、如何检查结果、如何控制成本。',
      checklist: ['先理解模型输入输出边界。', '再实践检索和工具调用。', '最后补充评测与部署知识。'],
      closing: '学习资料的价值在于帮助完成下一次实践，而不是增加术语收藏。'
    })
  },
  {
    slug: 'prompt-sop-stable-execution',
    channel: 'ai',
    category: 'Skills',
    categoryKey: 'skills',
    title: 'Prompt + SOP：让 AI 执行更稳定',
    excerpt: '把模糊期待拆成明确步骤，让输出更容易检查与复用。',
    author: 'LogicStack AI',
    date: '2026-03-29',
    readTime: '8 min',
    tags: ['Prompt', 'SOP'],
    content: createMockContent({
      context: '只给一句提示词，模型很容易在复杂任务中遗漏步骤。把任务写成 SOP，可以显著降低输出波动。',
      focus: 'SOP 不需要很长，但应明确输入、步骤顺序、输出格式和检查条件。',
      checklist: ['先描述目标和可用材料。', '按顺序列出执行步骤。', '要求输出自检结果。'],
      closing: '稳定执行来自清晰约束，而不是不断堆叠语气更强的提示词。'
    })
  },
  {
    slug: 'ai-assisted-data-development',
    channel: 'ai',
    category: 'AI 工具链',
    categoryKey: 'ai-toolchain',
    title: 'AI 工具链如何辅助数据开发',
    excerpt: '从 SQL 草稿、质量检查到故障记录，梳理适合交给 AI 的环节。',
    author: 'LogicStack AI',
    date: '2026-03-18',
    readTime: '9 min',
    tags: ['AI Tools', 'Data'],
    content: createMockContent({
      context: '数据开发中有大量规则明确但容易重复的工作，适合让 AI 参与生成初稿和检查清单。',
      focus: 'AI 更适合承担可验证的辅助任务，而不是绕过数据口径直接给出最终结论。',
      checklist: ['根据表结构生成 SQL 初稿。', '整理字段映射和质量规则。', '汇总任务日志中的异常线索。'],
      closing: '把验证步骤保留在人手中，AI 才会成为可靠的工作增量。'
    })
  },
  {
    slug: 'trading-review-agent',
    channel: 'ai',
    category: 'Agent',
    categoryKey: 'agent',
    title: '如何让 AI 帮你做交易复盘',
    excerpt: '将截图、计划与执行记录整理为可复查的复盘输入。',
    author: 'LogicStack AI',
    date: '2026-03-03',
    readTime: '10 min',
    tags: ['Agent', 'Review'],
    content: createMockContent({
      context: '交易复盘最容易被情绪带偏。AI 可以帮助整理记录，但前提是输入里包含计划、执行和结果，而不是只有盈亏数字。',
      focus: '复盘 Agent 应优先识别是否遵守计划，再总结重复出现的错误模式。',
      checklist: ['记录入场理由和失效条件。', '标注是否按计划止损。', '按周汇总偏离计划的次数。'],
      closing: 'AI 可以协助整理证据，但不能替代交易者为自己的决策负责。'
    })
  },
  {
    slug: 'rag-system-foundations',
    channel: 'ai',
    category: '学习资料',
    categoryKey: 'learning',
    title: 'RAG 系统的基础架构设计',
    excerpt: '从文档入库、检索召回到答案生成理解知识库链路。',
    author: 'LogicStack AI',
    date: '2026-02-18',
    readTime: '11 min',
    tags: ['RAG', 'Architecture'],
    content: createMockContent({
      context: 'RAG 系统把外部知识放入模型上下文，核心链路包括文档处理、向量检索、结果排序和答案生成。',
      focus: '初版系统不必追求复杂组件，先确保每个回答都能回到清楚的来源片段。',
      checklist: ['为文档建立稳定标识。', '保留召回片段和相似度。', '回答中提供来源信息。'],
      closing: '能观察每一步输入输出，才有机会持续改进知识库效果。'
    })
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
    content: createMockContent({
      context: '事件风险管理的重点不是预测数字，而是提前决定在信息公布前后承担多少不确定性。',
      focus: '把重要数据发布时间写入交易计划，可以避免在波动突然放大时临时做决定。',
      checklist: ['标记当天的重要数据和讲话。', '提前定义暂停交易的时间窗口。', '波动恢复后再重新评估结构。'],
      closing: '日历不是预测工具，而是一份风险提醒。'
    })
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
      { type: 'quote', text: '信号不是理由，完整的风险边界才是交易计划。' },
      { type: 'heading', text: '吸收与失效' },
      { type: 'paragraph', text: '主动成交持续出现但价格无法继续推进时，可以观察是否存在吸收。若价格随后快速穿过观察区域，原有判断应立即失效。' },
      { type: 'heading', text: '放回市场结构中' },
      { type: 'paragraph', text: '订单流信号只有放在关键位置附近才更有意义。入场前仍需明确止损位置和单笔风险。' }
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
    content: createMockContent({
      context: '复盘不是为某次盈亏寻找解释，而是记录计划是否被正确执行，以及下一次如何减少随意性。',
      focus: '一份有效复盘要区分计划内亏损和计划外操作。前者属于策略样本，后者才是需要优先修正的问题。',
      checklist: ['保存入场前后的截图。', '写下止损和目标位置。', '标记是否临时改变计划。'],
      closing: '复盘的目标不是证明自己判断正确，而是让下一次执行更稳定。'
    })
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
    content: createMockContent({
      context: '风险预算应先于交易机会存在，它决定了策略在连续失败时是否仍有执行空间。',
      focus: '资金账户通常同时约束单日亏损和总体回撤。每笔风险需要为连续失败留出余地。',
      checklist: ['先计算当日可用亏损额度。', '限制连续亏损后的交易次数。', '触及停止线后不再增加风险。'],
      closing: '风险预算不是束缚，而是让策略有足够样本继续运行。'
    })
  },
  {
    slug: 'xauusd-micro-channel-execution',
    channel: 'trading',
    category: '指标策略',
    categoryKey: 'strategy',
    title: 'XAUUSD 微通道策略的执行要点',
    excerpt: '观察连续推进、回踩深度和失效位置，减少追价式入场。',
    author: 'Market Notes',
    date: '2026-04-21',
    readTime: '8 min',
    tags: ['XAUUSD', 'Price Action'],
    content: createMockContent({
      context: '微通道反映价格持续推进的节奏，但连续 K 线本身并不构成无条件入场理由。',
      focus: '执行时更值得关注回踩深度、前方空间和失效位置是否清楚。',
      checklist: ['确认推进方向与更大周期一致。', '等待回踩而不是追逐末端。', '止损放在结构失效位置之外。'],
      closing: '策略越简单，越需要用执行规则过滤冲动交易。'
    })
  },
  {
    slug: 'trading-plan-over-prediction',
    channel: 'trading',
    category: '交易复盘',
    categoryKey: 'review',
    title: '交易计划为什么比预测更重要',
    excerpt: '将关注点从猜测方向转向条件、风险和应对方案。',
    author: 'Market Notes',
    date: '2026-04-12',
    readTime: '7 min',
    tags: ['Plan', 'Review'],
    content: createMockContent({
      context: '预测很容易让人执着于单一方向，而市场会不断提供新的信息。',
      focus: '交易计划应写清什么条件下参与、判断何时失效，以及单笔愿意承担多少风险。',
      checklist: ['入场前写下必要条件。', '提前确定失效位置。', '没有机会时允许空仓。'],
      closing: '计划不是为了控制市场，而是为了控制自己的响应方式。'
    })
  },
  {
    slug: 'orderflow-is-not-universal',
    channel: 'trading',
    category: 'Order Flow',
    categoryKey: 'order-flow',
    title: 'Order Flow 不是万能指标',
    excerpt: '理解成交数据能说明什么，以及它无法替代哪些判断。',
    author: 'Market Notes',
    date: '2026-03-30',
    readTime: '9 min',
    tags: ['Order Flow', 'Context'],
    content: createMockContent({
      context: '订单流让成交过程更加可见，但它不会自动给出市场方向，也无法替代位置判断。',
      focus: '同一种失衡信号出现在区间中央和关键边缘，交易意义可能完全不同。',
      checklist: ['先确认市场结构。', '再观察主动成交是否持续。', '为每个信号定义失效条件。'],
      closing: '把订单流当成观察工具，而不是答案生成器，使用起来会更稳定。'
    })
  },
  {
    slug: 'daily-loss-limit',
    channel: 'trading',
    category: '风控',
    categoryKey: 'risk',
    title: '账户风控：单日最大亏损如何限制',
    excerpt: '把抽象回撤规则转换为日内停止线和单笔风险额度。',
    author: 'Market Notes',
    date: '2026-03-17',
    readTime: '8 min',
    tags: ['Risk', 'Daily Loss'],
    content: createMockContent({
      context: '单日最大亏损不是最后一道提醒，而应在开盘前就转换成明确的执行限制。',
      focus: '可以把当日预算拆成若干次尝试，并在连续亏损后主动降低频率。',
      checklist: ['设置日内硬停止线。', '限定单笔最大风险。', '连续亏损后暂停并复查。'],
      closing: '守住当天的边界，才能让下一次机会仍然存在。'
    })
  },
  {
    slug: 'risk-reward-and-win-rate',
    channel: 'trading',
    category: '风控',
    categoryKey: 'risk',
    title: '盈亏比和胜率的真实关系',
    excerpt: '用样本和期望值理解策略，不再孤立追求某一个数字。',
    author: 'Market Notes',
    date: '2026-03-02',
    readTime: '8 min',
    tags: ['R:R', 'Statistics'],
    content: createMockContent({
      context: '高胜率并不必然意味着策略稳定，高盈亏比也不代表执行体验轻松。',
      focus: '评估策略时需要同时观察胜率、平均盈利、平均亏损和连续亏损长度。',
      checklist: ['按固定规则记录样本。', '计算平均盈利与平均亏损。', '关注最大连续亏损次数。'],
      closing: '只有放回一组真实样本里，盈亏比和胜率才有实际意义。'
    })
  },
  {
    slug: 'market-structure-trade-management',
    channel: 'trading',
    category: '指标策略',
    categoryKey: 'strategy',
    title: '市场结构变化下的进出场管理',
    excerpt: '根据推进、回踩和结构失效调整交易管理方式。',
    author: 'Market Notes',
    date: '2026-02-16',
    readTime: '10 min',
    tags: ['Structure', 'Execution'],
    content: createMockContent({
      context: '市场从趋势转为区间，或从区间进入突破阶段时，原有的持仓管理方式需要同步调整。',
      focus: '管理仓位时应观察结构是否仍支持最初逻辑，而不是只盯着浮动盈亏。',
      checklist: ['入场时记录最初结构依据。', '结构破坏时优先减少风险。', '不要因为短期波动随意移动止损。'],
      closing: '进出场管理是一套响应规则，不是盘中不断更换观点。'
    })
  }
]

export const allArticles = [...engineeringArticles, ...aiArticles, ...tradingArticles]

export function getArticleBySlug(slug) {
  return allArticles.find((article) => article.slug === slug)
}

export function getRelatedArticles(article, count = 3) {
  return allArticles
    .filter((item) => item.slug !== article.slug && item.channel === article.channel)
    .sort((a, b) => Number(b.categoryKey === article.categoryKey) - Number(a.categoryKey === article.categoryKey))
    .slice(0, count)
}
