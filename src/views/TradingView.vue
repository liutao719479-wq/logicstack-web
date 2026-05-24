<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CategoryTabs from '@/components/content/CategoryTabs.vue'
import EditorialArticleCard from '@/components/content/EditorialArticleCard.vue'
import FeaturedArticle from '@/components/content/FeaturedArticle.vue'
import InnerPageHeader from '@/components/content/InnerPageHeader.vue'
import TextToolCard from '@/components/content/TextToolCard.vue'
import { tradingArticles, tradingCategories } from '@/data/articles'
import { tradingTools } from '@/data/tools'

const route = useRoute()
const router = useRouter()
const activeCategory = computed(() => String(route.query.category || ''))
const showMacroEntry = computed(() => !activeCategory.value || activeCategory.value === 'macro-map')
const showArticles = computed(() =>
  !activeCategory.value || !['macro-map', 'trading-tools'].includes(activeCategory.value)
)
const showTools = computed(() => !activeCategory.value || activeCategory.value === 'trading-tools')
const visibleArticles = computed(() => {
  if (!activeCategory.value) {
    return tradingArticles
  }
  return tradingArticles.filter((article) => article.categoryKey === activeCategory.value)
})
const featuredArticle = computed(() => visibleArticles.value[0])
const archiveArticles = computed(() => visibleArticles.value.slice(1))

function selectCategory(value) {
  router.replace({ path: '/trading', query: value ? { category: value } : {} })
}
</script>

<template>
  <section class="page-shell hao-page editorial-channel-page">
    <div class="container hao-page-container hao-channel-container">
      <InnerPageHeader
        kicker="MARKET NOTES"
        title="市场研究"
        description="记录宏观观察、指标策略、订单流与交易执行，关注能够被复核的风险边界。"
      >
        <CategoryTabs
          :items="tradingCategories"
          :active-value="activeCategory"
          label="市场研究分类"
          @select="selectCategory"
        />
      </InnerPageHeader>

      <router-link v-if="showMacroEntry" class="macro-entry" to="/macro">
        <div>
          <span class="page-kicker">全球趋势</span>
          <h2>宏观地图</h2>
          <p>观察全球通胀、失业、GDP 与利率分布，为市场研究保留更长的时间尺度。</p>
        </div>
        <span class="macro-action">查看地图 &gt;</span>
      </router-link>

      <section v-if="showArticles && featuredArticle" class="trading-research">
        <FeaturedArticle :article="featuredArticle" eyebrow="重点研究" />
        <div v-if="archiveArticles.length">
          <header class="hao-channel-section-header">
            <h2>{{ activeCategory ? '相关研究' : '市场观察' }}</h2>
            <span>{{ archiveArticles.length }} 篇记录</span>
          </header>
          <div class="hao-editorial-grid">
            <EditorialArticleCard
              v-for="study in archiveArticles"
              :key="study.slug"
              :article="study"
            />
          </div>
        </div>
      </section>

      <section v-if="showTools" class="trading-tools" :class="{ 'is-primary': activeCategory === 'trading-tools' }">
        <header class="hao-channel-section-header trading-tools-heading">
          <div>
            <span class="page-kicker">交易工具</span>
            <h2>风险与执行辅助</h2>
          </div>
          <p>仅作为前端入口预览</p>
        </header>
        <div class="market-tool-grid">
          <TextToolCard v-for="tool in tradingTools" :key="tool.name" :tool="tool" />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.macro-entry {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(24px, 5vw, 56px);
  margin-bottom: clamp(48px, 6vw, 68px);
  padding: 27px 0 29px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.macro-entry .page-kicker {
  margin-bottom: 5px;
}

.macro-entry h2 {
  margin-bottom: 8px;
  color: var(--text-primary);
  font-size: 25px;
  font-weight: 430;
}

.macro-entry p {
  max-width: 620px;
  color: var(--text-secondary);
  font-size: 14px;
}

.macro-action {
  flex: none;
  color: var(--text-secondary);
  font-size: 14px;
}

.trading-tools {
  margin-top: clamp(66px, 8vw, 92px);
}

.trading-tools.is-primary {
  margin-top: 0;
}

.trading-tools-heading {
  margin-bottom: 10px;
}

.trading-tools-heading .page-kicker {
  display: block;
  margin-bottom: 5px;
}

.trading-tools-heading p {
  color: var(--ls-text-muted);
  font-size: 12px;
}

.market-tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: clamp(30px, 4vw, 54px);
}

@media (max-width: 820px) {
  .macro-entry {
    align-items: start;
    flex-direction: column;
  }

  .market-tool-grid {
    grid-template-columns: 1fr;
  }
}
</style>
