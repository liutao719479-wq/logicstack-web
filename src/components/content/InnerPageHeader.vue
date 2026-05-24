<script setup>
defineProps({
  kicker: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <header class="inner-page-header">
    <span class="page-kicker">{{ kicker }}</span>
    <h1 class="page-title">{{ title }}</h1>
    <p class="page-description">{{ description }}</p>
    <slot />
  </header>
</template>

<style scoped>
.inner-page-header {
  max-width: 860px;
  margin-bottom: clamp(44px, 6vw, 64px);
}

.inner-page-header .page-kicker {
  margin-bottom: 17px;
}

.inner-page-header .page-title {
  margin-bottom: 18px;
  font-size: clamp(34px, 4.6vw, 48px);
  font-weight: 450;
  letter-spacing: -0.04em;
  line-height: 1.16;
}

.inner-page-header .page-description {
  max-width: 670px;
  font-size: 16px;
  line-height: 1.9;
}

@media (max-width: 680px) {
  .inner-page-header {
    margin-bottom: 38px;
  }

  .inner-page-header .page-title {
    font-size: 31px;
  }
}
</style>
