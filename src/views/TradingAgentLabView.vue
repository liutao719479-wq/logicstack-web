<script setup>
const labTags = ['价格行为', 'Skills', 'Python 回测', '统计评估', 'Agent 分析', '模拟验证']

const architecture = [
  '价格行为课程 / 个人交易经验 / 图例案例',
  '价格行为知识库 / Skills',
  '规则沉淀层',
  '确定性识别层',
  '回测引擎层',
  '统计评估层',
  'Agent 分析层',
  '研究报告层',
  '规则沉淀 / 个人网页展示 / 模拟盘验证'
]

const layers = [
  { code: '01', title: '知识输入', description: '价格行为课程、图例案例、个人交易经验。' },
  { code: '02', title: 'Skills 沉淀', description: '把微通道、wedge、二次入场、突破失败等技术整理成可复用的规则知识。' },
  { code: '03', title: '规则沉淀层', description: '把主观描述转成清晰的入场、止损、止盈、过滤条件。' },
  { code: '04', title: '确定性识别层', description: '用 Python 对 K 线结构和价格行为形态进行规则化识别。' },
  { code: '05', title: '回测引擎层', description: '模拟入场、止损、止盈、滑点、点差与交易成本。' },
  { code: '06', title: '统计评估层', description: '统计胜率、盈亏比、期望值、回撤、连续亏损、分时段表现。' },
  { code: '07', title: 'Agent 分析层', description: '让 Agent 解释回测结果，发现规律，提出优化方向。' },
  { code: '08', title: '研究报告层', description: '自动生成交易技术研究报告，沉淀为可复盘文档。' },
  { code: '09', title: '实战验证', description: '规则沉淀、个人网页展示、模拟盘验证，再决定是否进入真实交易。' }
]

const researchThemes = [
  { title: '微通道策略', description: '定义趋势延续中的结构条件、失效位置与执行边界。', status: '回测中' },
  { title: 'Wedge 反转', description: '整理三推动结构、上下文过滤与反转确认条件。', status: '规则定义中' },
  { title: '二次入场', description: '记录二次入场在不同趋势阶段中的可识别特征。', status: '学习中' },
  { title: '突破失败', description: '拆解假突破后的回归路径与风险控制方式。', status: '统计中' },
  { title: '回踩趋势线开仓', description: '比较趋势线回踩在不同波动环境中的表现。', status: '模拟验证中' },
  { title: 'Order Flow 辅助判断', description: '把吸收、失衡等观察限制在辅助确认的位置。', status: '已沉淀' }
]

const outputs = [
  '价格行为知识库',
  '策略规则库',
  'Python 回测脚本',
  '回测统计表',
  'Agent 分析报告',
  '交易复盘模板',
  '模拟盘验证记录'
]

const researchLogs = [
  { title: '微通道策略如何定义死规则', note: '从主观观察到可执行条件', to: '/articles/xauusd-micro-channel-execution' },
  { title: '价格行为技术为什么需要回测', note: '验证胜率、盈亏比与样本偏差', to: '/articles/risk-reward-and-win-rate' },
  { title: 'Agent 在交易研究中到底能做什么', note: '解释统计结果，而不是代替规则', to: '/articles/trading-plan-over-prediction' },
  { title: '用 Python 统计微通道策略的期望值', note: '让策略评价落到可复核的数据上', to: '/articles/xauusd-micro-channel-execution' },
  { title: '从亏损交易中提取规则缺陷', note: '把复盘结果反馈给规则库', to: '/articles/daily-loss-limit' }
]
</script>

<template>
  <section class="page-shell hao-page agent-lab-page">
    <div class="container hao-page-container hao-channel-container">
      <header class="lab-hero">
        <router-link class="lab-back" to="/trading">&lt; 返回市场研究</router-link>
        <span class="page-kicker">TRADING AGENT LAB</span>
        <h1>交易 Agent 实验室</h1>
        <p>用规则、回测和 Agent 分析，把价格行为技术沉淀成可验证的研究系统。</p>
        <div class="lab-tags" aria-label="实验室研究标签">
          <span v-for="tag in labTags" :key="tag">{{ tag }}</span>
        </div>
      </header>

      <section class="lab-section architecture-section" aria-labelledby="architecture-title">
        <header class="lab-section-heading">
          <span class="page-kicker">SYSTEM ARCHITECTURE</span>
          <h2 id="architecture-title">整体架构</h2>
          <p>从知识输入开始，逐层转成可以识别、回测、评估和复盘的研究流程。</p>
        </header>
        <ol class="architecture-flow">
          <li v-for="(item, index) in architecture" :key="item">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ item }}</strong>
          </li>
        </ol>
      </section>

      <section class="lab-section" aria-labelledby="layers-title">
        <header class="lab-section-heading">
          <span class="page-kicker">RESEARCH PIPELINE</span>
          <h2 id="layers-title">流程分层说明</h2>
        </header>
        <div class="layer-grid">
          <article v-for="layer in layers" :key="layer.code" class="layer-card">
            <span>{{ layer.code }}</span>
            <h3>{{ layer.title }}</h3>
            <p>{{ layer.description }}</p>
          </article>
        </div>
      </section>

      <section class="lab-section" aria-labelledby="themes-title">
        <header class="lab-section-heading">
          <span class="page-kicker">CURRENT TOPICS</span>
          <h2 id="themes-title">当前研究主题</h2>
        </header>
        <div class="theme-grid">
          <article v-for="theme in researchThemes" :key="theme.title" class="theme-card">
            <div>
              <h3>{{ theme.title }}</h3>
              <span>{{ theme.status }}</span>
            </div>
            <p>{{ theme.description }}</p>
          </article>
        </div>
      </section>

      <section class="lab-section lab-bottom-grid">
        <div aria-labelledby="outputs-title">
          <header class="lab-section-heading">
            <span class="page-kicker">OUTPUTS</span>
            <h2 id="outputs-title">研究产物</h2>
          </header>
          <ul class="output-list">
            <li v-for="output in outputs" :key="output">{{ output }}</li>
          </ul>
        </div>

        <div aria-labelledby="logs-title">
          <header class="lab-section-heading">
            <span class="page-kicker">RESEARCH LOG</span>
            <h2 id="logs-title">研究日志</h2>
          </header>
          <div class="log-list">
            <router-link v-for="log in researchLogs" :key="log.title" :to="log.to">
              <div>
                <h3>{{ log.title }}</h3>
                <p>{{ log.note }}</p>
              </div>
              <span>&gt;</span>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.agent-lab-page {
  color: var(--text-primary);
}

.lab-hero {
  max-width: 900px;
  padding: clamp(28px, 5vw, 64px) 0 clamp(64px, 9vw, 112px);
}

.lab-back {
  display: block;
  width: fit-content;
  margin-bottom: 36px;
  color: var(--ls-text-muted);
  font-size: 12px;
  text-decoration: none;
}

.lab-back:hover,
.log-list a:hover h3 {
  color: var(--ls-primary-soft);
}

.lab-hero .page-kicker,
.lab-section-heading .page-kicker {
  display: block;
  margin-bottom: 9px;
}

.lab-hero h1 {
  margin: 0;
  font-size: clamp(36px, 6vw, 68px);
  font-weight: 520;
  letter-spacing: -0.05em;
}

.lab-hero p {
  max-width: 760px;
  margin: 22px 0 0;
  color: var(--text-secondary);
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.85;
}

.lab-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 30px;
}

.lab-tags span,
.theme-card span {
  padding: 5px 10px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--ls-text-muted);
  font-size: 11px;
}

.lab-section {
  margin-bottom: clamp(74px, 10vw, 124px);
}

.lab-section-heading {
  margin-bottom: 28px;
}

.lab-section-heading h2 {
  margin: 0;
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 500;
}

.lab-section-heading p {
  max-width: 680px;
  margin: 12px 0 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}

.architecture-flow {
  display: grid;
  gap: 20px;
  max-width: 850px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.architecture-flow li {
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 66px;
  padding: 14px 20px;
  border: 1px solid var(--border-color);
  background: var(--muted-bg);
}

.architecture-flow li:not(:last-child)::after {
  position: absolute;
  bottom: -21px;
  left: 50%;
  width: 1px;
  height: 20px;
  background: var(--border-color);
  content: '';
}

.architecture-flow span,
.layer-card > span {
  color: var(--ls-primary-soft);
  font-family: "IBM Plex Mono", monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
}

.architecture-flow strong {
  font-size: 15px;
  font-weight: 470;
  line-height: 1.65;
}

.layer-grid,
.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.layer-card,
.theme-card {
  padding: 20px;
  border: 1px solid var(--border-color);
  background: var(--glass-card-bg);
}

.layer-card h3,
.theme-card h3,
.log-list h3 {
  margin: 10px 0 0;
  font-size: 16px;
  font-weight: 490;
}

.layer-card p,
.theme-card p,
.log-list p {
  margin: 11px 0 0;
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.75;
}

.theme-card > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.theme-card h3 {
  margin: 0;
}

.lab-bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: clamp(40px, 7vw, 96px);
}

.output-list {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.output-list li,
.log-list a {
  border-top: 1px solid var(--border-color);
}

.output-list li {
  padding: 15px 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.output-list li::before {
  margin-right: 11px;
  color: var(--ls-primary-soft);
  content: '+';
}

.log-list a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  color: var(--text-primary);
  text-decoration: none;
}

.log-list h3 {
  margin: 0;
  transition: color 160ms ease;
}

.log-list p {
  margin-top: 5px;
}

.log-list a > span {
  color: var(--ls-primary-soft);
}

@media (max-width: 920px) {
  .layer-grid,
  .theme-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lab-bottom-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .layer-grid,
  .theme-grid {
    grid-template-columns: 1fr;
  }

  .architecture-flow li {
    gap: 13px;
    padding: 13px 15px;
  }
}
</style>
