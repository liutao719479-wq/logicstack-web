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
const channelMeta = computed(() => ({
  engineering: { label: '工程实践', route: '/engineering' },
  ai: { label: 'AI 工程', route: '/ai' },
  trading: { label: '市场研究', route: '/trading' }
}[article.value.channel] || { label: '文章列表', route: '/engineering' }))
const tableOfContents = computed(() => {
  const headings = article.value.content
    .map((block, index) => block.type === 'heading'
      ? { id: `section-${index}`, text: block.text }
      : null)
    .filter(Boolean)

  return headings.length ? headings : [{ id: 'article-summary', text: '文章摘要' }]
})
</script>

<template>
  <article class="page-shell hao-page article-page">
    <div class="article-container hao-page-container">
      <router-link class="article-back" :to="channelMeta.route">
        <span aria-hidden="true">&larr;</span>
        返回{{ channelMeta.label }}
      </router-link>

      <header class="article-header">
        <div class="article-labels">
          <span>{{ article.category }}</span>
          <span>{{ channelMeta.label }}</span>
        </div>
        <h1>{{ article.title }}</h1>
        <p id="article-summary" class="article-excerpt">{{ article.excerpt }}</p>
        <div class="metadata">
          <span>{{ article.author }}</span>
          <time :datetime="article.date">{{ article.date }}</time>
          <span>{{ article.readTime }}</span>
        </div>
      </header>

      <div class="article-layout">
        <main class="article-body">
          <template v-for="(block, index) in article.content" :key="`${block.type}-${index}`">
            <h2 v-if="block.type === 'heading'" :id="`section-${index}`">{{ block.text }}</h2>
            <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>
            <blockquote v-else-if="block.type === 'quote'">
              <p>{{ block.text }}</p>
              <cite v-if="block.source">{{ block.source }}</cite>
            </blockquote>
            <ul v-else-if="block.type === 'list'">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ul>
            <figure v-else-if="block.type === 'image'">
              <img :src="block.src" :alt="block.alt" loading="lazy">
              <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
            </figure>
            <div v-else-if="block.type === 'code'" class="code-block">
              <div class="code-toolbar">
                <span>{{ block.title || '示例代码' }}</span>
                <span>{{ block.language }}</span>
              </div>
              <pre><code>{{ block.code }}</code></pre>
            </div>
          </template>

          <footer class="article-tags">
            <span v-for="tag in article.tags" :key="tag"># {{ tag }}</span>
          </footer>
        </main>

        <aside class="article-sidebar">
          <nav class="toc" aria-label="文章目录">
            <span class="toc-title">目录</span>
            <a v-for="item in tableOfContents" :key="item.id" :href="`#${item.id}`">
              {{ item.text }}
            </a>
          </nav>
        </aside>
      </div>

      <nav class="article-pagination" aria-label="文章翻页">
        <router-link v-if="previousArticle" :to="`/articles/${previousArticle.slug}`">
          <span>&larr; 上一篇</span>
          <strong>{{ previousArticle.title }}</strong>
        </router-link>
        <span v-else />
        <router-link v-if="nextArticle" :to="`/articles/${nextArticle.slug}`" class="next">
          <span>下一篇 &rarr;</span>
          <strong>{{ nextArticle.title }}</strong>
        </router-link>
      </nav>

      <section v-if="relatedArticles.length" class="related">
        <header>
          <span class="page-kicker">RELATED NOTES</span>
          <h2>相关文章</h2>
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
  width: min(1144px, calc(100% - 48px));
  margin: 0 auto;
}

.article-back {
  display: flex;
  width: min(1096px, 100%);
  align-items: center;
  gap: 9px;
  margin: 0 auto 38px;
  color: var(--ls-text-muted);
  font-size: 13px;
  transition: color 0.2s ease;
}

.article-back:hover,
.toc a:hover {
  color: var(--ls-text);
}

.article-header {
  width: min(1096px, 100%);
  margin: 0 auto 58px;
}

.article-labels,
.metadata,
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--ls-text-muted);
  font-size: 12px;
}

.article-labels {
  margin-bottom: 18px;
  letter-spacing: 0.12em;
}

.article-labels span + span::before {
  margin-right: 12px;
  color: var(--border-color-strong);
  content: "/";
}

.article-header h1 {
  max-width: 820px;
  color: var(--text-primary);
  font-size: clamp(42px, 4.2vw, 50px);
  font-weight: 560;
  letter-spacing: -0.035em;
  line-height: 1.2;
}

.article-excerpt {
  max-width: 800px;
  margin-top: 23px;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.85;
}

.metadata {
  gap: 15px;
  margin-top: 25px;
}

.metadata span + span::before,
.metadata time::before {
  margin-right: 15px;
  color: var(--border-color-strong);
  content: "·";
}

.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 800px) 240px;
  gap: 56px;
  width: min(1096px, 100%);
  margin: 0 auto;
}

.article-body {
  min-width: 0;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.95;
}

.article-body h2 {
  scroll-margin-top: 124px;
  margin: 64px 0 18px;
  color: var(--text-primary);
  font-size: 25px;
  font-weight: 560;
  letter-spacing: -0.02em;
  line-height: 1.4;
}

.article-body h2:first-child {
  margin-top: 0;
}

.article-body h3 {
  scroll-margin-top: 124px;
  margin: 40px 0 14px;
  color: var(--text-primary);
  font-size: 19px;
  font-weight: 560;
  line-height: 1.5;
}

.article-body p {
  margin: 0 0 20px;
}

.article-body ul {
  margin: 18px 0 27px;
  padding-left: 22px;
}

.article-body li {
  margin-bottom: 8px;
  padding-left: 5px;
}

.article-body li::marker {
  color: var(--ls-blue);
}

.article-body blockquote {
  margin: 31px 0;
  padding: 4px 0 4px 20px;
  border-left: 2px solid var(--ls-blue);
  color: var(--text-primary);
}

.article-body blockquote p {
  margin: 0;
}

.article-body cite {
  display: block;
  margin-top: 8px;
  color: var(--ls-text-muted);
  font-size: 13px;
  font-style: normal;
}

.article-body figure {
  margin: 34px 0;
}

.article-body img {
  display: block;
  width: 100%;
  max-height: 430px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  object-fit: cover;
}

.article-body figcaption {
  margin-top: 10px;
  color: var(--ls-text-muted);
  font-size: 12px;
  line-height: 1.7;
  text-align: center;
}

.code-block {
  max-width: 100%;
  overflow: hidden;
  margin: 31px 0;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--code-bg);
}

.code-toolbar {
  display: flex;
  justify-content: space-between;
  padding: 9px 15px;
  border-bottom: 1px solid var(--border-color);
  color: var(--ls-text-muted);
  font-size: 11px;
  letter-spacing: 0.06em;
}

.article-body pre {
  max-width: 100%;
  overflow-x: auto;
  margin: 0;
  padding: 19px 21px 21px;
}

.article-body code {
  color: var(--code-text);
  font-family: "JetBrains Mono", Consolas, monospace;
  font-size: 13px;
  line-height: 1.8;
}

.article-tags {
  margin-top: 52px;
  padding-top: 18px;
  border-top: 1px solid var(--border-color);
}

.article-sidebar {
  position: relative;
}

.toc {
  position: sticky;
  top: 124px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding-left: 18px;
  border-left: 1px solid var(--border-color);
}

.toc-title {
  margin-bottom: 3px;
  color: var(--text-primary);
  font-size: 12px;
  letter-spacing: 0.14em;
}

.toc a {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.65;
  transition: color 0.2s ease;
}

.article-pagination {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  width: min(1096px, 100%);
  margin: 86px auto 78px;
  padding-top: 22px;
  border-top: 1px solid var(--border-color);
}

.article-pagination a {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}

.article-pagination .next {
  text-align: right;
}

.article-pagination span {
  color: var(--ls-text-muted);
  font-size: 12px;
}

.article-pagination strong {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 450;
  line-height: 1.6;
}

.related header {
  margin-bottom: 20px;
}

.related {
  width: min(1096px, 100%);
  margin: 0 auto;
}

.related .page-kicker {
  margin-bottom: 5px;
}

.related h2 {
  color: var(--text-primary);
  font-size: 25px;
  font-weight: 450;
}

@media (max-width: 1040px) {
  .article-layout {
    display: block;
    width: min(800px, 100%);
    margin: 0 auto;
  }

  .article-header {
    width: min(800px, 100%);
  }

  .article-sidebar {
    display: none;
  }
}

@media (max-width: 680px) {
  .article-container {
    width: calc(100% - 32px);
  }

  .article-back {
    margin-bottom: 32px;
  }

  .article-header {
    margin-bottom: 38px;
  }

  .article-header h1 {
    font-size: 32px;
    line-height: 1.22;
  }

  .article-excerpt {
    font-size: 15px;
  }

  .article-body {
    font-size: 15px;
  }

  .article-body h2 {
    margin-top: 46px;
    font-size: 22px;
  }

  .article-pagination {
    grid-template-columns: 1fr;
    margin: 62px auto 56px;
  }

  .article-pagination .next {
    text-align: left;
  }
}
</style>
