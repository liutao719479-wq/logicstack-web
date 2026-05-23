<script setup>
defineProps({ tool: { type: Object, required: true } })
</script>

<template>
  <article class="tool-card glass-card">
    <div class="tool-head">
      <span class="tool-type">{{ tool.type }}</span>
      <span class="chip">{{ tool.status }}</span>
    </div>
    <h3>{{ tool.name }}</h3>
    <p>{{ tool.description }}</p>
    <button type="button" class="launch">即将开放</button>
  </article>
</template>

<style scoped>
.tool-card {
  padding: 25px 23px;
}

.tool-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 23px;
}

.tool-type {
  color: var(--ls-text-muted);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h3 {
  margin-bottom: 9px;
  font-size: 18px;
  font-weight: 400;
}

p {
  min-height: 48px;
  margin-bottom: 22px;
  color: var(--ls-text-secondary);
  font-size: 13px;
}

.launch {
  border: 0;
  padding: 0;
  color: var(--ls-text-muted);
  background: transparent;
  font-size: 13px;
}
</style>
