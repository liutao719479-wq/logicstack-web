<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CategoryTabs from '@/components/content/CategoryTabs.vue'
import InnerPageHeader from '@/components/content/InnerPageHeader.vue'
import TextToolCard from '@/components/content/TextToolCard.vue'
import { tradingArticles, tradingCategories } from '@/data/articles'
import { tradingTools } from '@/data/tools'

const route = useRoute()
const router = useRouter()
const activeCategory = computed(() => String(route.query.category || ''))
const showResearchOverview = computed(() => !activeCategory.value || activeCategory.value === 'macro-map')
const showArticles = computed(() =>
  !activeCategory.value || !['macro-map', 'trading-tools'].includes(activeCategory.value)
)
const showTools = computed(() => !activeCategory.value || activeCategory.value === 'trading-tools')
const visibleArticles = computed(() =>
  activeCategory.value
    ? tradingArticles.filter((article) => article.categoryKey === activeCategory.value)
    : tradingArticles
)
const observationArticles = computed(() => [
  'es-orderflow-absorption',
  'xauusd-micro-channel-execution',
  'daily-loss-limit'
].map((slug) => tradingArticles.find((article) => article.slug === slug)).filter(Boolean))

function selectCategory(value) {
  router.replace({ path: '/trading', query: value ? { category: value } : {} })
}
</script>

<template>
  <section class="page-shell hao-page editorial-channel-page trading-page">
    <div class="container hao-page-container hao-channel-container">
      <InnerPageHeader
        kicker="MARKET NOTES"
        title="市场研究"
        description="记录宏观趋势、订单流、执行复盘与风险控制的研究过程。"
      >
        <CategoryTabs
          :items="tradingCategories"
          :active-value="activeCategory"
          label="市场研究分类"
          @select="selectCategory"
        />
      </InnerPageHeader>

      <section v-if="showResearchOverview" class="trading-focus">
        <router-link class="macro-entry" to="/macro">
          <div>
            <span class="page-kicker">GLOBAL MACRO MAP</span>
            <h2>宏观地图</h2>
            <p>用热力图观察全球通胀、失业、GDP、利率等指标的区域分布。</p>
          </div>
          <span class="macro-action">进入宏观地图 <i>&gt;</i></span>
        </router-link>

        <aside class="market-observations">
          <header>
            <span class="page-kicker">RECENT OBSERVATIONS</span>
            <h2>市场观察</h2>
          </header>
          <div class="observation-list">
            <router-link
              v-for="article in observationArticles"
              :key="article.slug"
              :to="`/articles/${article.slug}`"
            >
              <span>{{ article.category }}</span>
              <h3>{{ article.title }}</h3>
              <time>{{ article.date }}</time>
            </router-link>
          </div>
        </aside>
      </section>

      <router-link v-if="!activeCategory" class="agent-lab-entry" to="/trading/agent-lab">
        <div>
          <span class="page-kicker">TRADING AGENT LAB</span>
          <h2>交易 Agent 实验室</h2>
          <p>围绕价格行为、微通道、回测统计与 Agent 分析，构建可验证的交易研究流程。</p>
        </div>
        <span class="agent-lab-entry-action">进入实验室 <i>&gt;</i></span>
      </router-link>

      <section v-if="showArticles" class="trading-research">
        <header class="hao-channel-section-header">
          <div>
            <span class="page-kicker">RESEARCH ARCHIVE</span>
            <h2>{{ activeCategory ? '分类研究' : '研究文章' }}</h2>
          </div>
          <span>{{ visibleArticles.length }} 篇记录</span>
        </header>
        <div class="research-list">
          <article v-for="article in visibleArticles" :key="article.slug" class="research-entry">
            <div class="research-entry-meta">
              <span>{{ article.category }}</span>
              <time>{{ article.date }}</time>
            </div>
            <router-link :to="`/articles/${article.slug}`">
              <h3>{{ article.title }}</h3>
              <p>{{ article.excerpt }}</p>
            </router-link>
            <footer>
              <div class="research-tags">
                <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
              </div>
              <small>{{ article.readTime }}</small>
            </footer>
          </article>
        </div>
      </section>

      <section v-if="showTools" class="trading-tools" :class="{ 'is-primary': activeCategory === 'trading-tools' }">
        <header class="hao-channel-section-header trading-tools-heading">
          <div>
            <span class="page-kicker">TRADING TOOLS</span>
            <h2>交易工具</h2>
          </div>
          <p>用于计划、风险控制与复盘的轻量入口</p>
        </header>
        <div class="market-tool-grid">
          <TextToolCard v-for="tool in tradingTools" :key="tool.name" :tool="tool" />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.trading-focus {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: clamp(22px, 3vw, 38px);
  margin-bottom: clamp(34px, 4vw, 52px);
}

.agent-lab-entry {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 24px;
  margin-bottom: clamp(64px, 8vw, 96px);
  padding: clamp(20px, 2.4vw, 28px) 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  text-decoration: none;
  transition: border-color 180ms ease, padding-left 180ms ease;
}

.agent-lab-entry:hover {
  padding-left: 12px;
  border-color: var(--ls-border-active);
}

.agent-lab-entry .page-kicker {
  display: block;
  margin-bottom: 8px;
}

.agent-lab-entry h2 {
  margin: 0;
  font-size: clamp(22px, 2vw, 28px);
  font-weight: 480;
}

.agent-lab-entry p {
  max-width: 720px;
  margin: 10px 0 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}

.agent-lab-entry-action {
  color: var(--ls-primary-soft);
  font-size: 13px;
  white-space: nowrap;
}

.agent-lab-entry-action i {
  margin-left: 5px;
  font-style: normal;
}

.macro-entry,
.market-observations {
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.macro-entry {
  display: flex;
  min-height: 280px;
  flex-direction: column;
  justify-content: space-between;
  padding: 27px 0 25px;
}

.macro-entry .page-kicker,
.market-observations .page-kicker,
.trading-research .page-kicker,
.trading-tools .page-kicker {
  margin-bottom: 7px;
}

.macro-entry h2,
.market-observations h2 {
  color: var(--text-primary);
  font-size: 27px;
  font-weight: 450;
}

.macro-entry p {
  max-width: 610px;
  margin-top: 12px;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.85;
}

.macro-action {
  color: var(--ls-primary-soft);
  font-size: 14px;
}

.macro-action i {
  margin-left: 7px;
  font-style: normal;
}

.market-observations {
  padding: 27px 0 6px;
}

.observation-list {
  margin-top: 14px;
}

.observation-list a {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 4px 16px;
  padding: 12px 0;
  border-top: 1px solid var(--border-color);
}

.observation-list span,
.observation-list time {
  color: var(--ls-text-muted);
  font-size: 11px;
}

.observation-list h3 {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 450;
  line-height: 1.55;
}

.observation-list a:hover h3 {
  color: var(--text-primary);
}

.trading-research .hao-channel-section-header,
.trading-tools-heading {
  margin-bottom: 18px;
}

.trading-research .hao-channel-section-header .page-kicker {
  display: block;
}

.research-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(30px, 5vw, 68px);
}

.research-entry {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 20px 0 18px;
  border-top: 1px solid var(--border-color);
}

.research-entry-meta,
.research-entry footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--ls-text-muted);
  font-size: 12px;
}

.research-entry-meta span {
  color: var(--text-secondary);
}

.research-entry h3 {
  margin: 15px 0 8px;
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 470;
  line-height: 1.5;
}

.research-entry p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}

.research-entry footer {
  margin-top: auto;
  padding-top: 20px;
}

.research-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.research-tags span {
  padding: 3px 7px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--ls-text-muted);
  font-size: 10px;
}

.trading-tools {
  margin-top: clamp(66px, 8vw, 96px);
}

.trading-tools.is-primary {
  margin-top: 0;
}

.trading-tools-heading .page-kicker {
  display: block;
}

.trading-tools-heading p {
  color: var(--ls-text-muted);
  font-size: 12px;
}

.market-tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 920px) {
  .trading-focus {
    grid-template-columns: 1fr;
  }

  .macro-entry {
    min-height: 220px;
  }

  .market-tool-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .agent-lab-entry {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .research-list,
  .market-tool-grid {
    grid-template-columns: 1fr;
  }

  .trading-tools-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }
}
</style>
