<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ToolCard from '@/components/cards/ToolCard.vue'
import { toolCategories, tools } from '@/data/tools'

const route = useRoute()
const router = useRouter()
const activeCategory = computed(() => String(route.query.category || ''))
const visibleTools = computed(() =>
  activeCategory.value ? tools.filter((tool) => tool.category === activeCategory.value) : tools
)

function selectCategory(value) {
  router.replace({ path: '/tools', query: value ? { category: value } : {} })
}
</script>

<template>
  <section class="page-shell hao-page">
    <div class="container hao-page-container">
      <header class="page-intro">
        <span class="page-kicker">日常工具</span>
        <h1 class="page-title">工具构建</h1>
        <p class="page-description">将高频而琐碎的操作变为快速、清晰、可靠的小工具。</p>
      </header>
      <div class="toolbar glass-card">
        <div class="group-tabs">
          <button
            v-for="group in toolCategories"
            :key="group.value"
            :class="{ active: activeCategory === group.value }"
            type="button"
            @click="selectCategory(group.value)"
          >
            {{ group.label }}
          </button>
        </div>
        <el-input class="search" placeholder="搜索工具（功能预留）" />
      </div>
      <div class="grid grid--three">
        <ToolCard v-for="tool in visibleTools" :key="tool.name" :tool="tool" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 28px;
  padding: 15px 19px;
}

.group-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  color: var(--ls-text-muted);
  font-size: 14px;
}

.group-tabs button {
  border: 0;
  padding: 4px 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
}

.group-tabs .active {
  color: var(--ls-primary-soft);
}

.search {
  width: 240px;
}

.search :deep(.el-input__wrapper) {
  background: var(--input-bg);
  box-shadow: 0 0 0 1px var(--ls-border) inset;
}

@media (max-width: 700px) {
  .toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .search {
    width: 100%;
  }
}
</style>
