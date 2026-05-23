<script setup>
defineProps({
  eyebrow: String,
  title: { type: String, required: true },
  description: String,
  linkText: String,
  linkTo: String
})
</script>

<template>
  <header class="section-heading">
    <div>
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <p v-if="description" class="description">{{ description }}</p>
    </div>
    <router-link v-if="linkText && linkTo" class="text-link" :to="linkTo">
      {{ linkText }}
    </router-link>
  </header>
</template>

<style scoped>
.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 42px;
}

.eyebrow {
  margin-bottom: 10px;
  color: var(--ls-text-muted);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h2 {
  font-size: clamp(24px, 3.5vw, 30px);
  line-height: 1.2;
  font-weight: 400;
  letter-spacing: 0;
}

.description {
  margin-top: 12px;
  max-width: 550px;
  color: var(--ls-text-secondary);
  font-size: 14px;
}

@media (max-width: 560px) {
  .section-heading {
    align-items: start;
    flex-direction: column;
  }
}
</style>
