<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="editorial-article">
    <div class="editorial-meta">
      <span>{{ article.category }}</span>
      <time>{{ article.date }}</time>
    </div>
    <router-link class="editorial-link" :to="`/articles/${article.slug}`">
      <h3>{{ article.title }}</h3>
      <p>{{ article.excerpt }}</p>
    </router-link>
    <footer>
      <span>{{ article.author }}</span>
      <span>{{ article.readTime }}</span>
    </footer>
  </article>
</template>

<style scoped>
.editorial-article {
  display: flex;
  min-height: 218px;
  flex-direction: column;
  padding: 20px;
  border: 1px solid var(--glass-card-border);
  border-radius: 12px;
  background: var(--glass-card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.22s ease, background-color 0.22s ease;
}

.editorial-article:hover {
  border-color: var(--glass-card-border-hover);
  background: var(--glass-card-bg-hover);
}

.editorial-meta,
.editorial-article footer {
  display: flex;
  justify-content: space-between;
  color: var(--ls-text-muted);
  font-size: 12px;
}

.editorial-meta span {
  color: var(--text-secondary);
}

.editorial-link {
  flex: 1;
}

.editorial-link h3 {
  margin: 18px 0 10px;
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 450;
  line-height: 1.48;
  transition: color 0.2s ease;
}

.editorial-link:hover h3 {
  color: var(--ls-primary-soft);
}

.editorial-link p {
  max-width: 470px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}

.editorial-article footer {
  margin-top: auto;
  padding-top: 25px;
}
</style>
