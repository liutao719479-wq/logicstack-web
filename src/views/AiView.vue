<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleCard from '@/components/cards/ArticleCard.vue'
import { aiArticles, aiCategories } from '@/data/articles'

const route = useRoute()
const router = useRouter()
const activeCategory = computed(() => String(route.query.category || ''))
const visibleArticles = computed(() =>
  activeCategory.value
    ? aiArticles.filter((article) => article.categoryKey === activeCategory.value)
    : aiArticles
)

function selectCategory(value) {
  router.replace({ path: '/ai', query: value ? { category: value } : {} })
}
</script>

<template>
  <section class="page-shell hao-page ai-page">
    <div class="container hao-page-container">
      <header class="page-intro">
        <span class="page-kicker">AI NOTES</span>
        <h1 class="page-title">AI 工程</h1>
        <p class="page-description">记录 Agent、Skills、大模型部署与 AI 工具链的学习和实践。</p>
      </header>

      <div class="filters" aria-label="AI 工程分类">
        <button
          v-for="category in aiCategories"
          :key="category.value"
          :class="{ active: activeCategory === category.value }"
          type="button"
          @click="selectCategory(category.value)"
        >
          {{ category.label }}
        </button>
      </div>

      <div class="grid grid--three">
        <ArticleCard v-for="article in visibleArticles" :key="article.slug" :article="article" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 34px;
}

.filters button {
  padding: 8px 18px;
  border: 1px solid var(--ls-border);
  border-radius: 999px;
  color: var(--ls-text-secondary);
  background: var(--muted-bg);
  cursor: pointer;
}

.filters .active {
  border-color: var(--border-color-strong);
  color: var(--ls-primary-soft);
  background: var(--active-bg);
}
</style>
