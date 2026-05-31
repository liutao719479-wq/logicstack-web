export const toolCategories = [
  { label: '全部工具', value: '' },
  { label: '开发工具', value: 'dev' },
  { label: '数据工具', value: 'data' },
  { label: '效率插件', value: 'productivity' }
]

export const tools = [
  { name: 'JSON 格式化', type: '开发工具', category: 'dev', description: '校验、格式化与压缩 JSON 数据。', status: '准备中' },
  { name: 'SQL 格式化', type: '数据工具', category: 'data', description: '规范 SQL 排版并高亮常见结构。', status: '准备中' },
  { name: '时间戳转换', type: '开发工具', category: 'dev', description: '在时间戳与常用日期格式间转换。', status: '准备中' },
  { name: 'Excel 转 SQL', type: '数据工具', category: 'data', description: '从表格内容生成批量写入语句。', status: '设计中' },
  { name: '正则测试', type: '开发工具', category: 'dev', description: '快速校验表达式并查看匹配结果。', status: '准备中' },
  { name: '字段注释生成器', type: '效率插件', category: 'productivity', description: '根据字段定义生成结构化注释。', status: '设计中' },
  { name: '批量文本处理', type: '效率插件', category: 'productivity', description: '按行去重、排序并完成常见文本替换。', status: '规划中' },
  { name: '字段类型映射', type: '数据工具', category: 'data', description: '快速转换 MySQL、Hive 与 Java 字段类型。', status: '设计中' },
  { name: 'URL 参数解析', type: '开发工具', category: 'dev', description: '拆解查询参数并查看编码后的实际内容。', status: '规划中' },
  { name: 'CSV 数据预览', type: '数据工具', category: 'data', description: '轻量查看分隔符、表头和样例数据。', status: '规划中' }
]

export const tradingTools = [
  {
    name: 'XAUUSD 仓位计算器',
    type: '交易工具',
    category: 'trading-tools',
    description: '按止损距离与账户风险额度计算交易手数。',
    status: '规划中'
  },
  {
    name: '盈亏比计算器',
    type: '交易工具',
    category: 'trading-tools',
    description: '快速评估止损、止盈与计划的风险回报。',
    status: '规划中'
  },
  {
    name: 'FTMO / Topstep 风控计算器',
    type: '交易工具',
    category: 'trading-tools',
    description: '根据账户限制规划风险预算与容错空间。',
    status: '规划中'
  }
]
