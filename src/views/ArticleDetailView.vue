<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ArticleCard from '@/components/cards/ArticleCard.vue'
import { allArticles, getArticleBySlug, getRelatedArticles } from '@/data/articles'

const route = useRoute()
const article = computed(() => getArticleBySlug(String(route.params.slug)) || allArticles[0])
const relatedArticles = computed(() => getRelatedArticles(article.value))
const channelArticles = computed(() => allArticles.filter((item) => item.channel === article.value.channel))
const currentIndex = computed(() =>
  channelArticles.value.findIndex((item) => item.slug === article.value.slug)
)
const previousArticle = computed(() => channelArticles.value[currentIndex.value - 1])
const nextArticle = computed(() => channelArticles.value[currentIndex.value + 1])
const channelRoute = computed(() => ({
  engineering: '/engineering',
  ai: '/ai',
  trading: '/trading'
}[article.value.channel] || '/engineering'))
</script>

<template>
  <article class="page-shell hao-page article-page">
    <div class="article-container hao-page-container">
      <router-link class="back text-link" :to="channelRoute">返回栏目</router-link>
      <header class="article-header">
        <span class="page-kicker">{{ article.category }}</span>
        <h1>{{ article.title }}</h1>
        <p>{{ article.excerpt }}</p>
        <div class="metadata">
          <span>{{ article.author }}</span>
          <span>{{ article.date }}</span>
          <span>{{ article.readTime }}</span>
          <span v-for="tag in article.tags" :key="tag" class="chip">{{ tag }}</span>
        </div>
      </header>
      <div class="article-body glass-card">
        <template v-for="(block, index) in article.content" :key="`${block.type}-${index}`">
          <h2 v-if="block.type === 'heading'">{{ block.text }}</h2>
          <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>
          <blockquote v-else-if="block.type === 'quote'">{{ block.text }}</blockquote>
          <ul v-else-if="block.type === 'list'">
            <li v-for="item in block.items" :key="item">{{ item }}</li>
          </ul>
          <pre v-else-if="block.type === 'code'"><code :data-language="block.language">{{ block.code }}</code></pre>
        </template>
      </div>

      <nav class="article-pagination" aria-label="文章翻页">
        <router-link v-if="previousArticle" :to="`/articles/${previousArticle.slug}`">
          <span>上一篇</span>
          <strong>{{ previousArticle.title }}</strong>
        </router-link>
        <span v-else />
        <router-link v-if="nextArticle" :to="`/articles/${nextArticle.slug}`" class="next">
          <span>下一篇</span>
          <strong>{{ nextArticle.title }}</strong>
        </router-link>
      </nav>

      <section v-if="relatedArticles.length" class="related">
        <header>
          <span class="page-kicker">相关阅读</span>
          <h2>继续阅读</h2>
        </header>
        <div class="grid grid--three">
          <ArticleCard v-for="item in relatedArticles" :key="item.slug" :article="item" />
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>
.article-container {
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
}

.back {
  margin-bottom: 40px;
}

.article-header {
  max-width: 820px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 40px;
}

.article-header h1 {
  margin-bottom: 18px;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 560;
  line-height: 1.23;
  letter-spacing: -0.05em;
}

.article-header p {
  color: var(--ls-text-secondary);
  font-size: 17px;
}

.metadata {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 13px;
  margin-top: 28px;
  color: var(--ls-text-muted);
  font-size: 13px;
}

.article-body {
  width: min(820px, 100%);
  margin: 0 auto;
  padding: clamp(24px, 6vw, 54px);
}

.article-body h2 {
  margin: 40px 0 17px;
  font-size: 23px;
  font-weight: 520;
}

.article-body h2:first-child {
  margin-top: 0;
}

.article-body p {
  margin-bottom: 15px;
  color: var(--ls-text-secondary);
  font-size: 15px;
  line-height: 2;
}

.article-body blockquote {
  margin: 26px 0;
  padding: 14px 22px;
  border-left: 2px solid var(--border-color-strong);
  color: var(--ls-text-secondary);
  background: var(--muted-bg);
}

.article-body ul {
  margin: 15px 0 28px;
  padding-left: 23px;
  color: var(--ls-text-secondary);
  line-height: 2;
}

.article-body pre {
  overflow-x: auto;
  margin: 27px 0;
  padding: 22px 24px;
  border: 1px solid var(--ls-border);
  border-radius: 12px;
  color: var(--code-text);
  background: var(--code-bg);
}

.article-body code {
  font-family: "JetBrains Mono", Consolas, monospace;
  font-size: 13px;
  line-height: 1.75;
}

.article-pagination {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: min(820px, 100%);
  margin: 24px auto 66px;
}

.article-pagination a {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 22px;
  border: 1px solid var(--ls-border);
  border-radius: var(--ls-radius-md);
  background: var(--card-bg);
}

.article-pagination .next {
  text-align: right;
}

.article-pagination span {
  color: var(--ls-text-muted);
  font-size: 12px;
}

.article-pagination strong {
  color: var(--ls-text);
  font-size: 14px;
  font-weight: 400;
}

.related header {
  margin-bottom: 22px;
}

.related header .page-kicker {
  margin-bottom: 5px;
}

.related h2 {
  font-size: 24px;
  font-weight: 400;
}

@media (max-width: 680px) {
  .article-pagination {
    grid-template-columns: 1fr;
    margin-bottom: 48px;
  }
}
</style>
