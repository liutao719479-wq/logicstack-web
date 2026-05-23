<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleCard from '@/components/cards/ArticleCard.vue'
import ToolCard from '@/components/cards/ToolCard.vue'
import { tradingArticles, tradingCategories } from '@/data/articles'
import { tradingTools } from '@/data/tools'

const route = useRoute()
const router = useRouter()
const activeCategory = computed(() => String(route.query.category || ''))
const visibleArticles = computed(() => {
  if (!activeCategory.value || activeCategory.value === 'trading-tools' || activeCategory.value === 'macro-map') {
    return tradingArticles
  }
  return tradingArticles.filter((article) => article.categoryKey === activeCategory.value)
})

function selectCategory(value) {
  router.replace({ path: '/trading', query: value ? { category: value } : {} })
}
</script>

<template>
  <section class="page-shell hao-page">
    <div class="container hao-page-container">
      <header class="page-intro">
        <span class="page-kicker">市场手记</span>
        <h1 class="page-title">市场研究</h1>
        <p class="page-description">记录市场结构、执行过程与风险管理，关注能够重复验证的判断。</p>
      </header>
      <div class="market-row" aria-label="市场研究分类">
        <button
          v-for="category in tradingCategories"
          :key="category.value"
          :class="{ active: activeCategory === category.value }"
          type="button"
          @click="selectCategory(category.value)"
        >
          {{ category.label }}
        </button>
      </div>
      <div class="trading-layout">
        <div>
          <div class="subsection-title">
            <span class="page-kicker">研究文章</span>
            <h2>观点与复盘</h2>
          </div>
          <div class="entries">
            <ArticleCard v-for="study in visibleArticles" :key="study.slug" :article="study" />
          </div>
        </div>
        <aside class="principles glass-card">
          <span class="page-kicker">复盘框架</span>
          <h2>研究框架</h2>
          <p>市场上下文</p>
          <p>计划与风险预算</p>
          <p>执行记录与偏差</p>
          <p>复盘结论与改进</p>
        </aside>
      </div>
      <section class="trading-tools">
        <header class="trading-tools-heading">
          <span class="page-kicker">交易工具</span>
          <h2>风险与执行辅助</h2>
        </header>
        <div class="grid grid--three">
          <ToolCard v-for="tool in tradingTools" :key="tool.name" :tool="tool" />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.market-row {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 33px;
}

.market-row button {
  padding: 8px 16px;
  border: 1px solid var(--ls-border);
  border-radius: 999px;
  color: var(--ls-text-secondary);
  background: var(--muted-bg);
  cursor: pointer;
}

.market-row .active {
  border-color: var(--border-color-strong);
  color: var(--ls-primary-soft);
  background: var(--active-bg);
}

.trading-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  align-items: start;
  gap: 24px;
}

.entries {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.subsection-title {
  margin-bottom: 18px;
}

.subsection-title .page-kicker {
  margin-bottom: 5px;
}

.subsection-title h2 {
  font-size: 23px;
  font-weight: 400;
}

.principles {
  position: sticky;
  top: calc(var(--ls-header-height) + 28px);
  padding: 27px;
}

.principles h2 {
  margin-bottom: 21px;
  font-size: 22px;
  font-weight: 400;
}

.principles p {
  border-top: 1px solid var(--ls-border);
  padding: 13px 0;
  color: var(--ls-text-secondary);
  font-size: 14px;
}

.trading-tools {
  margin-top: 52px;
}

.trading-tools-heading {
  margin-bottom: 22px;
}

.trading-tools-heading h2 {
  font-size: 22px;
  font-weight: 400;
}

@media (max-width: 820px) {
  .trading-layout {
    grid-template-columns: 1fr;
  }

  .entries {
    grid-template-columns: 1fr;
  }

  .principles {
    position: static;
  }
}
</style>
