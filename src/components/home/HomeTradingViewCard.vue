<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <router-link class="home-tv-card" :to="item.targetUrl">
    <div class="home-tv-cover" :class="`home-tv-cover--${item.cover}`">
      <span>{{ item.category }}</span>
    </div>
    <div class="home-tv-body">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
      <div class="home-tv-meta">
        <span>{{ item.author }}</span>
        <time>{{ item.date }}</time>
      </div>
    </div>
  </router-link>
</template>
