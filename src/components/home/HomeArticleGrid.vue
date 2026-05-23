<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>

<template>
  <div class="home-article-grid">
    <router-link v-for="item in items" :key="item.slug" class="home-article" :to="item.link">
      <div class="home-article-meta">
        <span>{{ item.category }}</span>
        <time>{{ item.date }}</time>
      </div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.excerpt }}</p>
      <div class="home-article-tags">
        <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
      </div>
    </router-link>
  </div>
</template>
