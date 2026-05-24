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
    <button type="button" class="launch">进入工具 <span>&gt;</span></button>
  </article>
</template>

<style scoped>
.tool-card {
  display: flex;
  min-height: 210px;
  flex-direction: column;
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
  margin-top: auto;
  border: 1px solid var(--ls-border);
  border-radius: 999px;
  padding: 6px 13px;
  color: var(--ls-text-secondary);
  background: var(--muted-bg);
  font-size: 13px;
}

.launch span {
  margin-left: 5px;
}
</style>
