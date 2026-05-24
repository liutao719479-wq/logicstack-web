<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CategoryTabs from '@/components/content/CategoryTabs.vue'
import InnerPageHeader from '@/components/content/InnerPageHeader.vue'
import TextToolCard from '@/components/content/TextToolCard.vue'
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
  <section class="page-shell hao-page editorial-channel-page">
    <div class="container hao-page-container hao-channel-container">
      <InnerPageHeader
        kicker="TOOL NOTES"
        title="工具构建"
        description="把开发与数据处理中反复发生的小问题，整理成能够随手使用的轻量工具。"
      >
        <CategoryTabs
          :items="toolCategories"
          :active-value="activeCategory"
          label="工具分类"
          @select="selectCategory"
        />
      </InnerPageHeader>

      <section class="tool-directory">
        <header class="hao-channel-section-header">
          <h2>{{ activeCategory ? '分类工具' : '全部工具' }}</h2>
          <span>{{ visibleTools.length }} 项工具</span>
        </header>
        <div class="tool-directory-grid">
          <TextToolCard v-for="tool in visibleTools" :key="tool.name" :tool="tool" />
        </div>
      </section>

      <aside class="tools-note">
        <span>说明</span>
        <p>当前仅展示工具目录与入口，后续可逐项接入交互实现和数据服务。</p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.tool-directory-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: clamp(30px, 4vw, 54px);
}

.tools-note {
  display: flex;
  gap: 22px;
  margin-top: clamp(58px, 7vw, 82px);
  padding-top: 23px;
  border-top: 1px solid var(--border-color);
}

.tools-note span {
  flex: none;
  color: var(--ls-text-muted);
  font-size: 12px;
  letter-spacing: 0.13em;
}

.tools-note p {
  max-width: 590px;
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.8;
}

@media (max-width: 920px) {
  .tool-directory-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .tool-directory-grid {
    grid-template-columns: 1fr;
  }

  .tools-note {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
