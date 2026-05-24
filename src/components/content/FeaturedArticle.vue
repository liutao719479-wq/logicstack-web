<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  },
  eyebrow: {
    type: String,
    default: '最近更新'
  }
})
</script>

<template>
  <router-link class="featured-article" :to="`/articles/${article.slug}`">
    <div class="featured-copy">
      <span class="featured-eyebrow">{{ eyebrow }} / {{ article.category }}</span>
      <h2>{{ article.title }}</h2>
      <p>{{ article.excerpt }}</p>
    </div>
    <div class="featured-aside">
      <span>{{ article.author }}</span>
      <time>{{ article.date }}</time>
      <span>{{ article.readTime }}</span>
      <strong>阅读全文 <i>&gt;</i></strong>
    </div>
  </router-link>
</template>

<style scoped>
.featured-article {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 190px;
  gap: clamp(30px, 5vw, 78px);
  margin-bottom: clamp(52px, 7vw, 76px);
  padding: clamp(24px, 3vw, 34px);
  border: 1px solid var(--glass-card-border);
  border-radius: 12px;
  background: var(--glass-card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.22s ease, background-color 0.22s ease;
}

.featured-article:hover {
  border-color: var(--glass-card-border-hover);
  background: var(--glass-card-bg-hover);
}

.featured-eyebrow {
  display: inline-flex;
  margin-bottom: 21px;
  color: var(--ls-text-muted);
  font-size: 11px;
  letter-spacing: 0.15em;
}

.featured-copy h2 {
  max-width: 730px;
  margin-bottom: 16px;
  color: var(--text-primary);
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 470;
  letter-spacing: -0.035em;
  line-height: 1.4;
}

.featured-copy p {
  max-width: 630px;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.9;
}

.featured-aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding-top: 35px;
  color: var(--ls-text-muted);
  font-size: 12px;
}

.featured-aside strong {
  margin-top: auto;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 400;
}

.featured-aside i {
  margin-left: 7px;
  font-style: normal;
}

.featured-article:hover .featured-copy h2,
.featured-article:hover .featured-aside strong {
  color: var(--ls-primary-soft);
}

@media (max-width: 680px) {
  .featured-article {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .featured-aside {
    flex-flow: row wrap;
    gap: 8px 16px;
    padding-top: 0;
  }

  .featured-aside strong {
    flex-basis: 100%;
    margin-top: 8px;
  }
}
</style>
