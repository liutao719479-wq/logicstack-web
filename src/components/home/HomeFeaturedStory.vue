<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="home-curated-section home-trend-width-peer home-featured-story">
    <header class="home-curated-heading">
      <div>
        <h2>精选深度文章</h2>
        <p>从一次具体实践出发，写下完整的方法与思考。</p>
      </div>
    </header>

    <router-link class="home-featured-card" :to="item.targetUrl">
      <div class="home-featured-cover home-tv-cover" :class="`home-tv-cover--${item.cover}`" />
      <div class="home-featured-copy">
        <span class="home-featured-label">{{ item.category }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <div class="home-featured-link">
          阅读全文 <span>&gt;</span>
        </div>
      </div>
    </router-link>
  </section>
</template>
