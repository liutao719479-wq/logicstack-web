<script setup>
defineProps({ article: { type: Object, required: true } })
</script>

<template>
  <article class="article-card glass-card">
    <div class="article-meta">
      <span class="category">{{ article.category }}</span>
      <span>{{ article.date }}</span>
    </div>
    <router-link :to="`/articles/${article.slug}`">
      <h3>{{ article.title }}</h3>
    </router-link>
    <p>{{ article.excerpt }}</p>
    <div class="article-footer">
      <span>{{ article.author }} · {{ article.readTime }}</span>
      <router-link class="text-link" :to="`/articles/${article.slug}`">阅读</router-link>
    </div>
  </article>
</template>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  min-height: 210px;
  padding: 26px 23px;
}

.article-meta,
.article-footer {
  display: flex;
  justify-content: space-between;
  color: var(--ls-text-muted);
  font-size: 12px;
}

.category {
  color: var(--ls-text-secondary);
}

h3 {
  margin: 20px 0 12px;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.48;
}

p {
  flex: 1;
  margin-bottom: 22px;
  color: var(--ls-text-secondary);
  font-size: 13px;
}
</style>
