<script setup>
import { computed } from 'vue'
import { useCardTilt } from '@/composables/useCardTilt'

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
})

const { handleTiltMove, resetTilt } = useCardTilt()
const sectionMap = computed(() =>
  Object.fromEntries(props.sections.map((section) => [section.sectionKey, section]))
)
const knowledgeLinks = computed(() => [
  { ...sectionMap.value.engineering?.items[1], badge: 'ETL' },
  { ...sectionMap.value.ai?.items[0], badge: 'AGENT' },
  { ...sectionMap.value.ai?.items[4], badge: 'RAG' }
].filter((item) => item.title))
const marketLinks = computed(() => (sectionMap.value.market?.items || []).slice(0, 3))
const tools = computed(() => (sectionMap.value.tools?.items || []).slice(0, 6))

const toolMarks = ['{ }', 'SQL', 'T', 'XLS', '.*', 'DB']
</script>

<template>
  <section class="prototype-section home-trend-width-peer home-knowledge-streams">
    <header class="prototype-section-heading">
      <h2>研究领域</h2>
    </header>

    <div class="knowledge-stream-layout">
      <div class="knowledge-left-column">
        <article
          class="prototype-glass knowledge-list-card"
          @mousemove="handleTiltMove"
          @mouseleave="resetTilt"
        >
          <div class="knowledge-card-header">
            <h3><span class="knowledge-icon">&gt;_</span> 工程实践 &amp; AI 工程</h3>
            <span class="knowledge-code">ACTIVE_FLOW: 12</span>
          </div>
          <div class="knowledge-entry-list">
            <router-link v-for="item in knowledgeLinks" :key="item.title" :to="item.targetUrl">
              <span>{{ item.title }}</span>
              <small>{{ item.badge }}</small>
            </router-link>
          </div>
        </article>

        <article
          class="prototype-glass tool-stream-card"
          @mousemove="handleTiltMove"
          @mouseleave="resetTilt"
        >
          <div class="knowledge-card-header">
            <h3><span class="knowledge-icon">+</span> 工具构建</h3>
          </div>
          <div class="tool-stream-grid">
            <router-link
              v-for="(tool, index) in tools"
              :key="tool.title"
              class="prototype-glass tool-stream-entry"
              :to="tool.targetUrl"
              @mousemove.stop="handleTiltMove"
              @mouseleave.stop="resetTilt"
            >
              <span>{{ toolMarks[index] }}</span>
              <small>{{ tool.title }}</small>
            </router-link>
          </div>
        </article>
      </div>

      <article
        v-if="sectionMap.market"
        class="prototype-glass market-stream-card"
        @mousemove="handleTiltMove"
        @mouseleave="resetTilt"
      >
        <div class="knowledge-card-header">
          <h3><span class="knowledge-icon">~</span> 市场研究</h3>
          <div class="stream-dots" aria-hidden="true"><span /><span /></div>
        </div>
        <div class="market-entry-list">
          <router-link
            v-for="(item, index) in marketLinks"
            :key="item.title"
            :class="{ active: index === 0 }"
            :to="item.targetUrl"
          >
            <time>{{ item.date }} 09:20</time>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </router-link>
        </div>
        <router-link class="market-stream-more" to="/trading">
          查看市场研究 <span>&gt;</span>
        </router-link>
      </article>
    </div>
  </section>
</template>
