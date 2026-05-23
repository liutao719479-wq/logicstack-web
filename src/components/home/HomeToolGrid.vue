<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>

<template>
  <div class="home-tool-grid">
    <router-link v-for="item in items" :key="item.name" class="home-tool" :to="item.link">
      <span class="home-tool-type">{{ item.type }}</span>
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
    </router-link>
  </div>
</template>
