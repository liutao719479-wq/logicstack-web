<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CategoryTabs from '@/components/content/CategoryTabs.vue'
import EditorialArticleCard from '@/components/content/EditorialArticleCard.vue'
import FeaturedArticle from '@/components/content/FeaturedArticle.vue'
import InnerPageHeader from '@/components/content/InnerPageHeader.vue'
import { aiArticles, aiCategories } from '@/data/articles'

const route = useRoute()
const router = useRouter()
const activeCategory = computed(() => String(route.query.category || ''))
const visibleArticles = computed(() =>
  activeCategory.value
    ? aiArticles.filter((article) => article.categoryKey === activeCategory.value)
    : aiArticles
)
const featuredArticle = computed(() => visibleArticles.value[0])
const archiveArticles = computed(() => visibleArticles.value.slice(1))

function selectCategory(value) {
  router.replace({ path: '/ai', query: value ? { category: value } : {} })
}
</script>

<template>
  <section class="page-shell hao-page editorial-channel-page">
    <div class="container hao-page-container hao-channel-container">
      <InnerPageHeader
        kicker="AI NOTES"
        title="AI 工程"
        description="记录 Agent、Skills、大模型部署与工具调用的工程实践，关注真正能够重复运行的流程。"
      >
        <CategoryTabs
          :items="aiCategories"
          :active-value="activeCategory"
          label="AI 工程分类"
          @select="selectCategory"
        />
      </InnerPageHeader>

      <FeaturedArticle
        v-if="featuredArticle"
        :article="featuredArticle"
        eyebrow="正在研究"
      />

      <section v-if="archiveArticles.length" class="channel-archive">
        <header class="hao-channel-section-header">
          <h2>{{ activeCategory ? '相关内容' : '实践笔记' }}</h2>
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
