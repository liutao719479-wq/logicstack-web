<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer])

const chartRef = ref()
let chart
let resizeObserver

const chartOptions = {
  grid: { left: 22, right: 16, top: 32, bottom: 25, containLabel: true },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#102230',
    borderColor: 'rgba(135, 164, 183, 0.18)',
    textStyle: { color: '#edf4f5' }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    axisLine: { lineStyle: { color: '#263b49' } },
    axisTick: { show: false },
    axisLabel: { color: '#647d8d' }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#647d8d', formatter: '{value}%' },
    splitLine: { lineStyle: { color: 'rgba(135, 164, 183, 0.10)' } }
  },
  series: [
    {
      data: [4.1, 3.8, 3.9, 3.5, 3.3, 3.1],
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: { color: '#879896', width: 2 },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(135, 152, 150, 0.18)' },
            { offset: 1, color: 'rgba(135, 152, 150, 0)' }
          ]
        }
      }
    }
  ]
}

onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption(chartOptions)
  resizeObserver = new ResizeObserver(() => chart?.resize())
  resizeObserver.observe(chartRef.value)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chart?.dispose()
})
</script>

<template>
  <div ref="chartRef" class="chart"></div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 320px;
}
</style>
