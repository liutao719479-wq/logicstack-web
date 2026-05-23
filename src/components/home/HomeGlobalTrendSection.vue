<script setup>
import WorldHeatMap from '@/components/macro/WorldHeatMap.vue'
import { useTheme } from '@/composables/useTheme'
import { macroMetricMock } from '@/data/macroMock'

const props = defineProps({
  section: {
    type: Object,
    required: true
  }
})

const { isNight } = useTheme()
const metric = macroMetricMock[props.section.metricKey] || macroMetricMock.inflation
</script>

<template>
  <section class="home-global-trend-section" :class="{ 'is-night': isNight }">
    <header class="home-global-trend-header">
      <router-link class="home-global-trend-title" :to="section.moreLink">
        {{ section.title }} <span>&gt;</span>
      </router-link>
      <p>{{ section.subtitle }}</p>
    </header>

    <div class="home-global-trend-map">
      <WorldHeatMap :metric="metric" :scheme="isNight ? 'night' : 'day'" variant="home-trend" />
    </div>

    <div class="global-trend-legend" aria-hidden="true">
      <span>{{ metric.scale.min }}{{ metric.unit }}</span>
      <div class="global-trend-legend-bar" />
      <span>{{ metric.scale.max }}{{ metric.unit }}</span>
    </div>

    <router-link class="home-global-trend-more" :to="section.moreLink">
      {{ section.actionText }} <span>&gt;</span>
    </router-link>
  </section>
</template>
