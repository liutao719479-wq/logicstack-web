export const homeSectionLayoutTypes = {
  CONTENT_CAROUSEL: 'CONTENT_CAROUSEL',
  MAP_PREVIEW: 'MAP_PREVIEW',
  PROJECT_GRID: 'PROJECT_GRID'
}

export const homeSections = [
  {
    sectionKey: 'engineering',
    title: '工程实践',
    subtitle: '数据链路、建模与交付中的工程记录。',
    layoutType: homeSectionLayoutTypes.CONTENT_CAROUSEL,
    enabled: true,
    sortOrder: 10,
    moreText: '工程实践',
    moreLink: '/engineering',
    displayCount: 3,
    categories: [
      { label: '数据开发', value: 'data-dev' },
      { label: '数仓建模', value: 'warehouse' },
      { label: 'SQL 优化', value: 'sql' },
      { label: '项目经验', value: 'projects' }
    ],
    items: [
      {
        title: '从 ODS 到 ADS：可演进的数据分层设计',
        description: '在指标口径与查询成本之间，建立清楚的数据生产路径。',
        category: '数仓建模',
        cover: 'warehouse',
        author: 'LogicStack',
        date: '2026-05-18',
        tags: ['Hive', 'Spark'],
        targetUrl: '/articles/lakehouse-modeling-layers'
      },
      {
        title: 'SeaTunnel 批量任务的配置治理思路',
        description: '将重复的数据同步配置整理为稳定、可观察的任务流程。',
        category: '数据开发',
        cover: 'pipeline',
        author: 'LogicStack',
        date: '2026-05-10',
        tags: ['SeaTunnel', 'ETL'],
        targetUrl: '/articles/seatunnel-batch-pipeline'
      },
      {
        title: '复杂报表 SQL 的性能排查路径',
        description: '从执行计划到中间结果复用，整理可靠的排查次序。',
        category: 'SQL 优化',
        cover: 'sql',
        author: 'LogicStack',
        date: '2026-04-27',
        tags: ['SQL', 'Performance'],
        targetUrl: '/articles/sql-performance-practice'
      },
      {
        title: 'Hive 小文件治理与任务资源调优',
        description: '在长期运行的数据仓库中控制碎片、扫描成本与调度压力。',
        category: '数据开发',
        cover: 'lake',
        author: 'LogicStack',
        date: '2026-04-16',
        tags: ['Hive', 'Storage'],
        targetUrl: '/engineering?category=data-dev'
      },
      {
        title: '维度变化场景下的事实表设计',
        description: '面对业务口径变化，如何保持指标可解释且便于追溯。',
        category: '数仓建模',
        cover: 'dimension',
        author: 'LogicStack',
        date: '2026-04-05',
        tags: ['Modeling', 'DWD'],
        targetUrl: '/engineering?category=warehouse'
      },
      {
        title: 'Spring Boot 数据接口的交付边界',
        description: '把查询能力包装成稳定接口，并为后续可视化留出空间。',
        category: '项目经验',
        cover: 'service',
        author: 'LogicStack',
        date: '2026-03-22',
        tags: ['Java', 'API'],
        targetUrl: '/engineering?category=projects'
      }
    ]
  },
  {
    sectionKey: 'ai',
    title: 'AI 工程',
    subtitle: 'Agent、Skills 与模型工具链的学习实践。',
    layoutType: homeSectionLayoutTypes.CONTENT_CAROUSEL,
    enabled: true,
    sortOrder: 20,
    moreText: 'AI 工程',
    moreLink: '/ai',
    displayCount: 3,
    categories: [
      { label: 'Agent', value: 'agent' },
      { label: 'Skills', value: 'skills' },
      { label: '大模型部署', value: 'llm-deployment' },
      { label: 'AI 工具链', value: 'ai-toolchain' },
      { label: '学习资料', value: 'learning' }
    ],
    items: [
      {
        title: 'Agent 是什么：从自动化助手到工作流执行者',
        description: '理解 Agent 如何组织工具、上下文与可重复执行的步骤。',
        category: 'Agent',
        cover: 'agent',
        author: 'LogicStack AI',
        date: '2026-05-22',
        tags: ['Agent', 'Workflow'],
        targetUrl: '/ai?category=agent'
      },
      {
        title: 'Skills 如何沉淀重复工作流',
        description: '把高频任务写成清晰能力，为协作和迭代留下边界。',
        category: 'Skills',
        cover: 'skills',
        author: 'LogicStack AI',
        date: '2026-05-16',
        tags: ['Skills', 'Practice'],
        targetUrl: '/ai?category=skills'
      },
      {
        title: '本地部署大模型的几种方案',
        description: '对比推理框架、模型尺寸和适合个人研究的部署方式。',
        category: '大模型部署',
        cover: 'model',
        author: 'LogicStack AI',
        date: '2026-05-08',
        tags: ['LLM', 'Deploy'],
        targetUrl: '/ai?category=llm-deployment'
      },
      {
        title: '让模型可靠调用开发工具的接口设计',
        description: '从参数校验到失败回退，整理工具调用中的工程约束。',
        category: 'AI 工具链',
        cover: 'toolchain',
        author: 'LogicStack AI',
        date: '2026-04-29',
        tags: ['Tools', 'API'],
        targetUrl: '/ai?category=ai-toolchain'
      },
      {
        title: 'RAG 项目中的文档切分与召回观察',
        description: '从一组小实验开始，记录知识库质量如何影响回答。',
        category: '项目案例',
        cover: 'rag',
        author: 'LogicStack AI',
        date: '2026-04-20',
        tags: ['RAG', 'Vector'],
        targetUrl: '/ai'
      },
      {
        title: '大模型应用开发的阅读路线',
        description: '以工程问题为线索，安排概念、部署与实践资料。',
        category: '学习资料',
        cover: 'reading',
        author: 'LogicStack AI',
        date: '2026-04-08',
        tags: ['Learning', 'LLM'],
        targetUrl: '/ai?category=learning'
      }
    ]
  },
  {
    sectionKey: 'market',
    title: '交易观点',
    subtitle: '指标、订单流与交易执行中的观察。',
    layoutType: homeSectionLayoutTypes.CONTENT_CAROUSEL,
    enabled: true,
    sortOrder: 30,
    moreText: '交易观点',
    moreLink: '/trading',
    displayCount: 3,
    categories: [
      { label: '宏观地图', value: 'macro-map' },
      { label: '指标策略', value: 'strategy' },
      { label: 'Order Flow', value: 'order-flow' },
      { label: '交易复盘', value: 'review' },
      { label: '风控', value: 'risk' },
      { label: '交易工具', value: 'trading-tools' }
    ],
    items: [
      {
        title: '交易计划中如何使用宏观事件日历',
        description: '把宏观发布时间与波动窗口纳入执行准备。',
        category: '指标策略',
        cover: 'macro-map',
        author: 'Market Notes',
        date: '2026-05-20',
        tags: ['Macro', 'Plan'],
        targetUrl: '/trading?category=strategy'
      },
      {
        title: 'ES 订单流吸收信号与失效条件',
        description: '把价格推进与主动成交并置，识别信号的有效边界。',
        category: 'Order Flow',
        cover: 'order-flow',
        author: 'Market Notes',
        date: '2026-05-12',
        tags: ['ES', 'Flow'],
        targetUrl: '/trading?category=order-flow'
      },
      {
        title: 'XAUUSD 伦敦盘突破后的执行复盘',
        description: '记录入场条件、止损边界和一次偏离计划的决策。',
        category: '交易复盘',
        cover: 'gold',
        author: 'Market Notes',
        date: '2026-05-09',
        tags: ['XAUUSD', 'Review'],
        targetUrl: '/trading?category=review'
      },
      {
        title: 'XAUUSD 仓位计算器',
        description: '按账户风险与止损距离快速计算交易仓位。',
        category: '交易工具',
        cover: 'risk-tool',
        author: 'LogicStack Tools',
        date: '2026-04-30',
        tags: ['Risk', 'XAUUSD'],
        targetUrl: '/trading?category=trading-tools'
      },
      {
        title: '盈亏比计算器',
        description: '在执行之前评估目标空间、止损距离和计划质量。',
        category: '交易工具',
        cover: 'ratio',
        author: 'LogicStack Tools',
        date: '2026-04-25',
        tags: ['R:R', 'Plan'],
        targetUrl: '/trading?category=trading-tools'
      },
      {
        title: 'FTMO / Topstep 风控预算工具',
        description: '围绕每日亏损限制和账户规则规划风险额度。',
        category: '风控',
        cover: 'funded',
        author: 'LogicStack Tools',
        date: '2026-04-15',
        tags: ['Funded', 'Risk'],
        targetUrl: '/trading?category=trading-tools'
      }
    ]
  },
  {
    sectionKey: 'global-trend',
    title: '全球趋势',
    subtitle: '用数据观察全球通胀、失业、GDP 与利率变化。',
    layoutType: homeSectionLayoutTypes.MAP_PREVIEW,
    enabled: true,
    sortOrder: 40,
    moreText: '全球趋势',
    moreLink: '/macro',
    displayCount: 1,
    categories: [],
    actionText: '查看更多全球趋势',
    metricKey: 'inflation',
    items: []
  },
  {
    sectionKey: 'tools',
    title: '工具构建',
    subtitle: '面向开发、数据处理与效率提升的小工具。',
    layoutType: homeSectionLayoutTypes.CONTENT_CAROUSEL,
    enabled: true,
    sortOrder: 50,
    moreText: '工具构建',
    moreLink: '/tools',
    displayCount: 3,
    categories: [
      { label: '开发工具', value: 'dev' },
      { label: '数据工具', value: 'data' },
      { label: '效率插件', value: 'productivity' }
    ],
    items: [
      {
        title: 'JSON 格式化',
        description: '校验、整理并快速查看 JSON 数据结构。',
        category: '开发工具',
        cover: 'json',
        author: 'LogicStack Tools',
        date: '2026-05-14',
        tags: ['JSON', 'Format'],
        targetUrl: '/tools?category=dev'
      },
      {
        title: 'SQL 格式化',
        description: '让复杂查询重新具有易读的结构与缩进。',
        category: '数据工具',
        cover: 'sql-tool',
        author: 'LogicStack Tools',
        date: '2026-05-06',
        tags: ['SQL', 'Data'],
        targetUrl: '/tools?category=data'
      },
      {
        title: '时间戳转换',
        description: '在时间戳和常用日期格式之间便捷互转。',
        category: '开发工具',
        cover: 'timestamp',
        author: 'LogicStack Tools',
        date: '2026-04-25',
        tags: ['Time', 'Dev'],
        targetUrl: '/tools?category=dev'
      },
      {
        title: 'Excel 转 SQL',
        description: '从表格数据批量生成可校验的写入语句。',
        category: '数据工具',
        cover: 'excel',
        author: 'LogicStack Tools',
        date: '2026-04-13',
        tags: ['Excel', 'SQL'],
        targetUrl: '/tools?category=data'
      },
      {
        title: '正则测试',
        description: '快速测试表达式并观察每一段匹配结果。',
        category: '开发工具',
        cover: 'regex',
        author: 'LogicStack Tools',
        date: '2026-04-02',
        tags: ['Regex', 'Test'],
        targetUrl: '/tools?category=dev'
      },
      {
        title: '字段注释生成器',
        description: '将字段定义转换为统一、可复用的数据说明。',
        category: '效率插件',
        cover: 'dictionary',
        author: 'LogicStack Tools',
        date: '2026-03-21',
        tags: ['Schema', 'Productivity'],
        targetUrl: '/tools?category=productivity'
      }
    ]
  },
  {
    sectionKey: 'projects',
    title: '实战项目',
    subtitle: '持续演进的项目记录。',
    layoutType: homeSectionLayoutTypes.PROJECT_GRID,
    enabled: false,
    sortOrder: 60,
    moreText: '实战项目',
    moreLink: '/projects',
    displayCount: 3,
    categories: [],
    items: []
  }
]
