<script setup>
defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <article class="project glass-card">
    <span class="area">{{ project.area }}</span>
    <h3>{{ project.title }}</h3>
    <p>{{ project.description }}</p>
    <div class="stack">
      <span v-for="item in project.stack" :key="item" class="chip">{{ item }}</span>
    </div>
  </article>
</template>

<style scoped>
.project {
  display: flex;
  min-height: 178px;
  flex-direction: column;
  padding: 25px 23px;
}

.area {
  color: var(--ls-text-muted);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h3 {
  margin: 18px 0 9px;
  font-size: 18px;
  font-weight: 400;
}

p {
  margin-bottom: 18px;
  color: var(--ls-text-secondary);
  font-size: 13px;
}

.stack {
  display: flex;
  gap: 7px;
  margin-top: auto;
}
</style>
