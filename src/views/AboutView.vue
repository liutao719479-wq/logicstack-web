<template>
  <section class="page-shell hao-page">
    <div class="container hao-page-container about-layout">
      <header class="page-intro">
        <span class="page-kicker">LogicStack</span>
        <h1 class="page-title">关于</h1>
        <p class="page-description">
          LogicStack 是一个记录数据工程、AI 工程、市场研究与工具构建实践过程的个人站。
        </p>
      </header>
      <div class="about-panels">
        <article class="glass-card">
          <h2>用数据理解世界</h2>
          <p>记录数据工程与宏观观察中的方法、问题和判断，让事实与过程都可以被回看。</p>
        </article>
        <article class="glass-card">
          <h2>用代码构建工具</h2>
          <p>把高频工作中的重复动作整理为轻量工具，也持续记录 AI 工具链的实际使用方式。</p>
        </article>
        <article class="glass-card">
          <h2>用复盘沉淀系统</h2>
          <p>市场研究只记录观察、执行和风险管理过程，不构成任何投资建议。</p>
        </article>
        <article class="glass-card contact">
          <span class="page-kicker">联系</span>
          <h2>保持连接</h2>
          <p>邮箱与社交链接位置已预留，可在发布时补充真实联系信息。</p>
          <span class="placeholder">hello@logicstack.dev</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 58px;
}

.about-panels {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.about-panels article {
  padding: 31px;
}

.about-panels h2 {
  margin-bottom: 12px;
  font-size: 22px;
  font-weight: 400;
}

.about-panels p {
  color: var(--ls-text-secondary);
  font-size: 14px;
  line-height: 1.9;
}

.placeholder {
  display: block;
  margin-top: 22px;
  color: var(--ls-primary-soft);
}

@media (max-width: 840px) {
  .about-layout {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
