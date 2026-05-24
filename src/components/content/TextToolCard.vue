<script setup>
defineProps({
  tool: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="text-tool-card">
    <div class="text-tool-topline">
      <span class="text-tool-type">{{ tool.type }}</span>
      <small>{{ tool.status }}</small>
    </div>
    <h3>{{ tool.name }}</h3>
    <p>{{ tool.description }}</p>
    <a class="text-tool-link" href="#" @click.prevent>
      进入工具 <span>&gt;</span>
    </a>
  </article>
</template>

<style scoped>
.text-tool-card {
  display: flex;
  min-height: 210px;
  flex-direction: column;
  padding: 20px;
  border: 1px solid var(--glass-card-border);
  border-radius: 12px;
  background: var(--glass-card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.22s ease, background-color 0.22s ease;
}

.text-tool-card:hover {
  border-color: var(--glass-card-border-hover);
  background: var(--glass-card-bg-hover);
}

.text-tool-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.text-tool-type {
  color: var(--text-secondary);
  font-size: 12px;
  letter-spacing: 0.08em;
}

.text-tool-topline small {
  color: var(--ls-text-muted);
  font-size: 11px;
}

h3 {
  margin-bottom: 11px;
  color: var(--text-primary);
  font-size: 21px;
  font-weight: 440;
}

p {
  min-height: 51px;
  margin-bottom: 25px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}

.text-tool-link {
  margin-top: auto;
  color: var(--text-secondary);
  font-size: 14px;
  transition: color 0.2s ease;
}

.text-tool-link span {
  margin-left: 6px;
}

.text-tool-link:hover {
  color: var(--text-primary);
}
</style>
