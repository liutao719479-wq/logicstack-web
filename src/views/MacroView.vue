<script setup>
import { reactive } from 'vue'
import WorldHeatMap from '@/components/macro/WorldHeatMap.vue'
import { useTheme } from '@/composables/useTheme'
import { macroMetricMock, macroMetricTabs } from '@/data/macroMock'

const { isNight } = useTheme()
const metrics = macroMetricTabs
  .map((tab) => macroMetricMock[tab.key])
  .filter(Boolean)
  .map((metric) => ({
    ...metric,
    data: metric.mapData,
    topCountries: [...metric.countries]
      .filter((country) => typeof country.value === 'number')
      .sort((left, right) => right.value - left.value)
      .slice(0, 12)
  }))
const activeRanges = reactive({})
const failedFlags = reactive({})

function formatValue(value) {
  return Number(value).toFixed(2)
}

function setActiveRange(metricKey, range) {
  activeRanges[metricKey] = range
}

function getFlagUrl(country) {
  return country.iso2 ? `https://flagcdn.com/w40/${country.iso2.toLowerCase()}.png` : ''
}

function markFlagFailed(country) {
  failedFlags[country.iso2] = true
}

</script>

<template>
  <section class="page-shell hao-page macro-page">
    <div class="macro-container">
      <header class="page-intro">
        <span class="page-kicker">全球趋势</span>
        <h1 class="page-title">宏观地图</h1>
        <p class="page-description">
          用热力图观察全球宏观指标的区域分布。当前页面使用 mock 数据，为后续接入数据服务保留清晰结构。
        </p>
      </header>

      <nav class="metric-tabs" aria-label="全球趋势指标导航">
        <a v-for="tab in macroMetricTabs" :key="tab.key" :href="`#metric-${tab.key}`">
          <small>{{ tab.code }}</small>
          {{ tab.label }}
        </a>
      </nav>

      <div class="macro-map-list">
        <section
          v-for="metric in metrics"
          :id="`metric-${metric.key}`"
          :key="metric.key"
          class="macro-map-section"
        >
          <header class="map-heading">
            <div>
              <span class="page-kicker">GLOBAL DISTRIBUTION</span>
              <h2>{{ metric.title }}</h2>
              <p>{{ metric.description }}</p>
            </div>
            <div class="map-tags">
              <span>{{ metric.year }}</span>
              <span>Mock Data</span>
            </div>
          </header>

          <div class="macro-world-map">
            <WorldHeatMap
              :metric="metric"
              :scheme="isNight ? 'night' : 'day'"
              :color-stops="metric.colorStops"
              :active-range="activeRanges[metric.key]"
              dim-inactive
              mode="macro"
            />
          </div>

          <div class="macro-legend" @mouseleave="setActiveRange(metric.key, null)">
            <div class="macro-legend-bar">
              <button
                v-for="stop in metric.legend.stops"
                :key="`${stop.from}-${stop.to}`"
                type="button"
                :class="{ 'is-active': activeRanges[metric.key] === stop }"
                :style="{ backgroundColor: stop.color }"
                :aria-label="`${stop.from}${metric.unit} 至 ${stop.to}${metric.unit}`"
                @mouseenter="setActiveRange(metric.key, stop)"
                @focus="setActiveRange(metric.key, stop)"
                @blur="setActiveRange(metric.key, null)"
              />
            </div>
            <div class="macro-legend-ticks">
              <span v-for="tick in metric.legend.ticks" :key="tick">{{ tick }}{{ metric.unit }}</span>
            </div>
          </div>

          <div class="country-data">
            <header>
              <h3>{{ metric.listTitle }}</h3>
              <span>{{ metric.note }}</span>
            </header>
            <ul>
              <li
                v-for="country in metric.topCountries"
                :key="country.name"
              >
                <span class="country-name">
                  <img
                    v-if="country.iso2 && !failedFlags[country.iso2]"
                    :src="getFlagUrl(country)"
                    :alt="`${country.countryName}国旗`"
                    class="macro-country-flag-img"
                    loading="lazy"
                    @error="markFlagFailed(country)"
                  />
                  <span v-else class="macro-country-flag-fallback">
                    {{ country.flag || country.iso2 || country.code || '--' }}
                  </span>
                  {{ country.countryName }}
                </span>
                <strong>{{ formatValue(country.value) }}{{ metric.unit }}</strong>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.macro-page {
  background-color: #000;
  background-image: none;
}

.macro-container {
  width: min(calc(100% - 48px), 1440px);
  margin: 0 auto;
}

.macro-page .page-intro {
  max-width: 780px;
  margin-bottom: 34px;
}

.metric-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 54px;
}

.metric-tabs a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-secondary);
  background: var(--muted-bg);
  font-size: 13px;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.metric-tabs a:hover {
  border-color: var(--border-color-strong);
  color: var(--text-primary);
  background: var(--active-bg);
}

.metric-tabs small {
  color: var(--ls-text-muted);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.macro-map-list {
  display: flex;
  flex-direction: column;
  gap: clamp(76px, 8vw, 112px);
}

.macro-map-section {
  scroll-margin-top: 92px;
  padding-top: 28px;
  border-top: 1px solid var(--border-color);
}

.map-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 8px;
}

.map-heading .page-kicker {
  margin-bottom: 7px;
}

.map-heading h2 {
  color: var(--text-primary);
  font-size: clamp(23px, 2vw, 28px);
  font-weight: 500;
}

.map-heading p {
  max-width: 680px;
  margin-top: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}

.map-tags {
  display: flex;
  flex: none;
  gap: 7px;
}

.map-tags span {
  padding: 4px 9px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--ls-text-muted);
  font-size: 11px;
}

.macro-world-map {
  width: calc(100vw - 128px);
  max-width: 1760px;
  margin: 32px 0 0 50%;
  transform: translateX(-50%);
}

.macro-world-map :deep(.map-shell) {
  width: 100%;
}

.macro-world-map :deep(.world-map) {
  height: clamp(620px, 42vw, 700px);
  min-height: 0;
}

.macro-legend {
  width: 400px;
  max-width: 80%;
  margin: 14px auto 0;
  color: rgba(214, 208, 231, 0.8);
  font-size: 11px;
}

.macro-legend-bar {
  display: flex;
  gap: 2px;
  height: 6px;
}

.macro-legend-bar button {
  min-width: 0;
  flex: 1;
  padding: 0;
  border: 0;
  border-radius: 1px;
  cursor: pointer;
  opacity: 0.94;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.macro-legend-bar button:hover,
.macro-legend-bar button:focus-visible,
.macro-legend-bar button.is-active {
  opacity: 1;
  outline: none;
  transform: scaleY(1.55);
}

.macro-legend-ticks {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.country-data {
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid var(--border-color);
}

.country-data header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 10px;
}

.country-data h3 {
  color: var(--text-primary);
  font-size: 17px;
  font-weight: 500;
}

.country-data header span {
  color: var(--ls-text-muted);
  font-size: 12px;
}

.country-data ul {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0 40px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.country-data li {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 11px 0;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 13.5px;
  transition: opacity 0.18s ease;
}

.country-name {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
}

.macro-country-flag-img,
.macro-country-flag-fallback {
  width: 22px;
  height: 16px;
  flex: none;
  border-radius: 2px;
}

.macro-country-flag-img {
  object-fit: cover;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
}

.macro-country-flag-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: var(--ls-text-muted);
  background: var(--muted-bg);
  font-size: 9px;
  line-height: 1;
  white-space: nowrap;
}

.country-data strong {
  flex: none;
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 500;
}

:global(:root[data-theme="day"]) .macro-legend {
  color: #554e66;
}

:global(:root[data-theme="day"]) .macro-page {
  background-color: var(--page-bg);
  background-image: none;
}

@media (max-width: 1100px) {
  .country-data ul {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .country-data ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1024px) {
  .macro-world-map {
    width: calc(100vw - 48px);
  }

  .macro-world-map :deep(.world-map) {
    height: 460px;
  }
}

@media (max-width: 680px) {
  .macro-container {
    width: calc(100% - 32px);
  }

  .metric-tabs {
    gap: 8px;
    margin-bottom: 42px;
  }

  .metric-tabs a {
    padding: 8px 11px;
  }

  .macro-map-list {
    gap: 68px;
  }

  .macro-world-map {
    width: calc(100vw - 24px);
  }

  .macro-world-map :deep(.world-map) {
    height: 305px;
  }

  .map-heading,
  .country-data header {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .macro-legend {
    max-width: calc(100% - 18px);
  }

  .country-data ul {
    grid-template-columns: 1fr;
  }
}
</style>
