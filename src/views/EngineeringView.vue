<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleCard from '@/components/cards/ArticleCard.vue'
import { engineeringArticles, engineeringCategories } from '@/data/articles'

const route = useRoute()
const router = useRouter()
const activeCategory = computed(() => String(route.query.category || ''))
const visibleArticles = computed(() =>
  activeCategory.value
    ? engineeringArticles.filter((article) => article.categoryKey === activeCategory.value)
    : engineeringArticles
)

function selectCategory(value) {
  router.replace({ path: '/engineering', query: value ? { category: value } : {} })
}
</script>

<template>
  <section class="page-shell hao-page">
    <div class="container hao-page-container">
      <header class="page-intro">
        <span class="page-kicker">工程随笔</span>
        <h1 class="page-title">工程实践</h1>
        <p class="page-description">沉淀数据开发、数据治理、后端服务与前端数据产品中的工程方法。</p>
      </header>
      <div class="filters" aria-label="文章分类">
        <button
          v-for="filter in engineeringCategories"
          :key="filter.value"
          :class="{ active: activeCategory === filter.value }"
          type="button"
          @click="selectCategory(filter.value)"
        >
          {{ filter.label }}
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
