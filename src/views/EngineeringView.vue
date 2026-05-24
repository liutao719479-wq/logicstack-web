<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CategoryTabs from '@/components/content/CategoryTabs.vue'
import EditorialArticleCard from '@/components/content/EditorialArticleCard.vue'
import FeaturedArticle from '@/components/content/FeaturedArticle.vue'
import InnerPageHeader from '@/components/content/InnerPageHeader.vue'
import { engineeringArticles, engineeringCategories } from '@/data/articles'

const route = useRoute()
const router = useRouter()
const activeCategory = computed(() => String(route.query.category || ''))
const visibleArticles = computed(() =>
  activeCategory.value
    ? engineeringArticles.filter((article) => article.categoryKey === activeCategory.value)
    : engineeringArticles
)
const featuredArticle = computed(() => visibleArticles.value[0])
const archiveArticles = computed(() => visibleArticles.value.slice(1))

function selectCategory(value) {
  router.replace({ path: '/engineering', query: value ? { category: value } : {} })
}
</script>

<template>
  <section class="page-shell hao-page editorial-channel-page">
    <div class="container hao-page-container hao-channel-container">
      <InnerPageHeader
        kicker="工程随笔"
        title="工程实践"
        description="沉淀数据开发、数仓建模与交付过程中的方法，把复杂链路整理成可复用的经验。"
      >
        <CategoryTabs
          :items="engineeringCategories"
          :active-value="activeCategory"
          label="工程实践分类"
          @select="selectCategory"
        />
      </InnerPageHeader>

      <FeaturedArticle
        v-if="featuredArticle"
        :article="featuredArticle"
        eyebrow="重点阅读"
      />

      <section v-if="archiveArticles.length" class="channel-archive">
        <header class="hao-channel-section-header">
          <h2>{{ activeCategory ? '相关内容' : '最近更新' }}</h2>
          <span>{{ archiveArticles.length }} 篇记录</span>
        </header>
        <div class="hao-editorial-grid">
          <EditorialArticleCard
            v-for="article in archiveArticles"
            :key="article.slug"
            :article="article"
          />
        </div>
      </section>
    </div>
  </section>
</template>
