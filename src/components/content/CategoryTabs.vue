<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  activeValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: '内容分类'
  }
})

const emit = defineEmits(['select'])
</script>

<template>
  <nav class="category-tabs" :aria-label="label">
    <button
      v-for="item in items"
      :key="item.value"
      class="category-tab"
      :class="{ active: activeValue === item.value }"
      type="button"
      @click="emit('select', item.value)"
    >
      {{ item.label }}
    </button>
  </nav>
</template>

<style scoped>
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 9px 26px;
  margin-top: 34px;
}

.category-tab {
  position: relative;
  border: 0;
  padding: 4px 0 10px;
  color: var(--text-secondary);
  background: transparent;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.category-tab::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: transparent;
  content: "";
  transition: background 0.2s ease;
}

.category-tab:hover,
.category-tab.active {
  color: var(--text-primary);
}

.category-tab.active::after {
  background: var(--border-color-strong);
}
</style>
