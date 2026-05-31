export const navItems = [
  {
    label: '首页',
    to: '/'
  },
  {
    label: '工程实践',
    to: '/engineering',
    children: [
      { label: '数据开发', to: '/engineering?category=data-dev' },
      { label: '数仓建模', to: '/engineering?category=warehouse' },
      { label: 'SQL 优化', to: '/engineering?category=sql' },
      { label: '项目经验', to: '/engineering?category=projects' }
    ]
  },
  {
    label: 'AI 工程',
    to: '/ai',
    children: [
      { label: 'Agent', to: '/ai?category=agent' },
      { label: 'Skills', to: '/ai?category=skills' },
      { label: '大模型部署', to: '/ai?category=llm-deployment' },
      { label: 'AI 工具链', to: '/ai?category=ai-toolchain' },
      { label: '学习资料', to: '/ai?category=learning' }
    ]
  },
  {
    label: '市场研究',
    to: '/trading',
    children: [
      { label: '宏观地图', to: '/macro?category=macro-map' },
      { label: '指标策略', to: '/trading?category=strategy' },
      { label: 'Order Flow', to: '/trading?category=order-flow' },
      { label: '交易复盘', to: '/trading?category=review' },
      { label: '风控', to: '/trading?category=risk' },
      { label: '交易工具', to: '/trading?category=trading-tools' },
      { label: '交易 Agent 实验室', to: '/trading/agent-lab' }
    ]
  },
  {
    label: '工具构建',
    to: '/tools',
    children: [
      { label: '开发工具', to: '/tools?category=dev' },
      { label: '数据工具', to: '/tools?category=data' },
      { label: '效率插件', to: '/tools?category=productivity' }
    ]
  },
  {
    label: '关于',
    to: '/about'
  }
]
