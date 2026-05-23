<script setup>
import { computed, ref, watch } from 'vue'
import WorldHeatMap from '@/components/macro/WorldHeatMap.vue'
import { macroMetricMock, macroMetricTabs } from '@/data/macroMock'
import { fetchMacroMetric } from '@/services/macro'

const activeKey = ref('inflation')
const activeMetric = ref(macroMetricMock.inflation)
const loading = ref(false)

const ranking = computed(() =>
  [...activeMetric.value.data]
    .sort((left, right) => right.value - left.value)
    .slice(0, 8)
)

async function loadMetric(key) {
  loading.value = true
  try {
    activeMetric.value = await fetchMacroMetric(key)
  } finally {
    loading.value = false
  }
}

watch(activeKey, loadMetric, { immediate: true })
</script>

<template>
  <section class="page-shell hao-page macro-page">
    <div class="container hao-page-container">
      <header class="page-intro">
        <span class="page-kicker">全球趋势</span>
        <p class="page-description">
          以全球热图观察宏观指标的地域分布。当前为 mock 数据，数据请求层已预留后端接口切换位置。
        </p>
      </header>

      <nav class="metric-tabs" aria-label="宏观指标切换">
        <button
          v-for="tab in macroMetricTabs"
          :key="tab.key"
          type="button"
          :class="{ active: activeKey === tab.key }"
          @click="activeKey = tab.key"
        >
          <small>{{ tab.code }}</small>
          {{ tab.label }}
        </button>
      </nav>

      <div class="map-layout">
        <section class="map-card glass-card">
          <header class="map-heading">
            <div>
              <span class="page-kicker">全球分布</span>
              <h2>{{ activeMetric.title }}</h2>
            </div>
            <div class="map-tags">
              <span class="chip">{{ activeMetric.year }}</span>
              <span class="chip">{{ loading ? '加载中' : 'Mock Data' }}</span>
            </div>
          </header>
          <WorldHeatMap :metric="activeMetric" />
        </section>

        <aside class="ranking-card glass-card">
          <header>
            <span class="page-kicker">数据排序</span>
            <h2>国家排名</h2>
            <p>按{{ activeMetric.label }}从高到低</p>
          </header>
          <ol>
            <li v-for="(country, index) in ranking" :key="country.name">
              <span class="rank">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="country">{{ country.countryName }}</span>
              <strong>{{ country.value.toFixed(1) }}{{ activeMetric.unit }}</strong>
            </li>
          </ol>
          <p class="source">数据源位置预留 / {{ activeMetric.year }} / MOCK</p>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.macro-page .page-intro {
  margin-bottom: 38px;
}

.metric-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 22px;
}

.metric-tabs button {
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 140px;
  padding: 13px 18px;
  border: 1px solid transparent;
  border-radius: 12px;
  color: var(--ls-text-secondary);
  background: rgba(12, 18, 24, 0.54);
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: all 0.22s ease;
}

.metric-tabs small {
  color: var(--ls-text-muted);
  font-size: 10px;
  letter-spacing: 0.15em;
}

.metric-tabs button:hover,
.metric-tabs .active {
  border-color: rgba(213, 219, 222, 0.18);
  color: var(--ls-text);
  background: rgba(30, 37, 43, 0.64);
}

.metric-tabs .active small {
  color: var(--ls-text-secondary);
}

.map-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  align-items: start;
  gap: 18px;
}

.map-card {
  overflow: hidden;
  padding: 28px 27px 12px;
  background: rgba(8, 13, 19, 0.72);
}

.map-heading {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 18px;
}

.map-heading .page-kicker,
.ranking-card .page-kicker {
  margin-bottom: 7px;
}

.map-heading h2,
.ranking-card h2 {
  font-size: 22px;
  font-weight: 400;
}

.map-tags {
  display: flex;
  gap: 7px;
}

.ranking-card {
  padding: 28px 23px 20px;
  background: rgba(10, 15, 21, 0.68);
}

.ranking-card header {
  margin-bottom: 20px;
}

.ranking-card header p {
  margin-top: 7px;
  color: var(--ls-text-muted);
  font-size: 13px;
}

ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: 34px 1fr auto;
  align-items: center;
  min-height: 49px;
  border-top: 1px solid var(--ls-border);
  font-size: 14px;
}

.rank {
  color: var(--ls-text-muted);
  font-size: 11px;
}

.country {
  color: var(--ls-text-secondary);
}

strong {
  color: var(--ls-text);
  font-weight: 400;
}

.source {
  margin-top: 19px;
  color: var(--ls-text-muted);
  font-size: 11px;
  letter-spacing: 0.08em;
}

@media (max-width: 960px) {
  .metric-tabs {
    overflow-x: auto;
    padding-bottom: 5px;
  }

  .metric-tabs button {
    flex: none;
  }

  .map-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .map-card {
    padding: 20px 14px 8px;
  }

  .map-heading {
    flex-direction: column;
    padding: 0 7px;
  }
}
</style>
