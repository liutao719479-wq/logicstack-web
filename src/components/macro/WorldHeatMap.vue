<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts/core'
import { TooltipComponent, VisualMapComponent } from 'echarts/components'
import { MapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { countryNameAliases, getCountryNameZh } from '@/data/countryNameMap'

echarts.use([TooltipComponent, VisualMapComponent, MapChart, CanvasRenderer])

const props = defineProps({
  metric: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: 'default'
  },
  scheme: {
    type: String,
    default: 'night'
  }
})

const chartRef = ref()
const status = ref('loading')
let chart
let resizeObserver

function setOptions() {
  if (!chart) return

  const { data, label, note, scale, title, unit, year } = props.metric
  const isHomeTrend = props.variant === 'home-trend'
  const isHomeTrendNight = isHomeTrend && props.scheme === 'night'
  const isDay = props.scheme === 'day'
  const metricLabel = isHomeTrend ? title.replace('热图', '') : label
  const mapData = isHomeTrend
    ? data.flatMap((country) => [
        country,
        ...(countryNameAliases[country.name] || []).map((alias) => ({
          ...country,
          name: alias,
          countryName: getCountryNameZh(alias)
        }))
      ])
    : data
  const homeTrendColors = isHomeTrendNight
    ? ['#1d1740', '#382483', '#5330b7', '#794dc9', '#bba8ee']
    : ['#eeeaf8', '#d3c7ed', '#ad93dc', '#8061c6', '#4c2ba3']
  const macroColors = isDay
    ? ['#edf1f4', '#c5d3d6', '#93afb1', '#557b81', '#304c54']
    : ['#1a272e', '#405c63', '#718785', '#aa906d', '#ab665b']

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
      trigger: 'item',
      backgroundColor: isHomeTrend
        ? (isHomeTrendNight ? '#111016' : '#171e23')
        : (isDay ? '#ffffff' : '#111016'),
      borderColor: isHomeTrend
        ? 'rgba(155, 120, 230, 0.24)'
        : 'rgba(206, 214, 217, 0.14)',
      padding: [12, 15],
      textStyle: { color: isHomeTrend || !isDay ? '#edf0ef' : '#27313a', fontSize: 13 },
      formatter(params) {
        const countryName = isHomeTrend
          ? getCountryNameZh(params.name)
          : params.data?.countryName || params.name
        if (!Number.isFinite(params.value)) {
          return `<strong>${countryName}</strong><br/>暂无数据`
        }

        return `<strong>${countryName}</strong><br/>${metricLabel}：${params.value.toFixed(1)}${unit}<br/>年份：${year}`
      }
    },
    visualMap: {
      show: !isHomeTrend,
      type: 'continuous',
      min: scale.min,
      max: scale.max,
      calculable: false,
      orient: 'horizontal',
      left: 22,
      bottom: 12,
      itemWidth: 118,
      itemHeight: 7,
      text: [`${scale.max}${unit}`, `${scale.min}${unit}`],
      textGap: 10,
      textStyle: { color: isDay ? '#67717a' : '#727d80', fontSize: 11 },
      inRange: {
        color: isHomeTrend
          ? homeTrendColors
          : macroColors
      }
    },
    series: [
      {
        name: title,
        type: 'map',
        map: 'logicstack-world',
        roam: !isHomeTrend,
        scaleLimit: isHomeTrend ? undefined : { min: 1, max: 5 },
        center: isHomeTrend ? undefined : [12, 22],
        zoom: isHomeTrend ? 1 : 1.08,
        left: isHomeTrend ? '6%' : undefined,
        right: isHomeTrend ? '6%' : undefined,
        top: isHomeTrend ? '5%' : undefined,
        bottom: isHomeTrend ? '5%' : undefined,
        data: mapData,
        nameProperty: 'name',
        selectedMode: false,
        silent: false,
        emphasis: {
          label: { show: false },
          itemStyle: {
            areaColor: isHomeTrend ? homeTrendColors[3] : (isDay ? '#7f9fa3' : '#a9bbb8'),
            borderColor: isHomeTrendNight || !isDay ? '#141020' : '#ffffff',
            borderWidth: 1
          }
        },
        select: { disabled: true },
        itemStyle: {
          areaColor: isHomeTrend ? homeTrendColors[0] : (isDay ? '#edf1f4' : '#162128'),
          borderColor: isHomeTrendNight || !isDay ? '#07060d' : '#ffffff',
          borderWidth: 0.65
        }
      }
    ],
    graphic: isHomeTrend ? [] : [
      {
        type: 'text',
        left: 22,
        top: 16,
        style: {
          text: note,
          fill: '#727d80',
          font: '12px Inter, sans-serif'
        }
      }
    ]
  }, true)
}

onMounted(async () => {
  chart = echarts.init(chartRef.value)
  resizeObserver = new ResizeObserver(() => {
    chart?.resize()
    if (props.variant === 'home-trend' && status.value === 'ready') setOptions()
  })
  resizeObserver.observe(chartRef.value)

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}maps/world.json`)
    if (!response.ok) throw new Error('World map asset failed to load.')

    echarts.registerMap('logicstack-world', await response.json())
    status.value = 'ready'
    setOptions()
  } catch (error) {
    status.value = 'error'
    console.error(error)
  }
})

watch(() => [props.metric, props.variant, props.scheme], () => {
  if (status.value === 'ready') setOptions()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chart?.dispose()
})
</script>

<template>
  <div class="map-shell" :class="{ 'is-home-trend': variant === 'home-trend' }">
    <div ref="chartRef" class="world-map" aria-label="世界宏观指标热图"></div>
    <p v-if="status === 'loading'" class="map-status">地图数据加载中...</p>
    <p v-else-if="status === 'error'" class="map-status">地图资源加载失败</p>
  </div>
</template>

<style scoped>
.map-shell {
  position: relative;
}

.world-map {
  width: 100%;
  height: min(570px, 58vw);
  min-height: 380px;
}

.map-shell.is-home-trend .world-map {
  height: clamp(620px, 42vw, 700px);
  min-height: 0;
}

.map-status {
  position: absolute;
  inset: 50% auto auto 50%;
  color: var(--ls-text-muted);
  font-size: 13px;
  transform: translate(-50%, -50%);
}

@media (max-width: 1024px) {
  .map-shell.is-home-trend .world-map {
    height: 460px;
  }
}

@media (max-width: 680px) {
  .world-map {
    height: 400px;
    min-height: 0;
  }

  .map-shell.is-home-trend .world-map {
    height: 305px;
  }
}
</style>
