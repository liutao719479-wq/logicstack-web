<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>

<template>
  <div class="home-feature-block">
    <router-link v-for="item in items" :key="item.title" :to="item.link || '/'">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </router-link>
  </div>
</template>
