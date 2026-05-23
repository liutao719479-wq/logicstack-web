<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>

<template>
  <div class="home-project-grid">
    <router-link v-for="item in items" :key="item.title" class="home-project" :to="item.link">
      <span class="home-project-area">{{ item.area }}</span>
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
      <div class="home-project-stack">
        <span v-for="tag in item.stack" :key="tag">{{ tag }}</span>
      </div>
    </router-link>
  </div>
</template>
