<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'

const { isNight } = useTheme()
const heroDate = '2026.03.28'
const heroText = '真正的丰碑，从不立于坦途之上，而是铸就在狂风与烈火之间。'

const stars = [
  { left: '9%', top: '24%', delay: '1.4s', size: '2px' },
  { left: '18%', top: '49%', delay: '4.8s', size: '2px' },
  { left: '28%', top: '20%', delay: '2.7s', size: '3px' },
  { left: '36%', top: '37%', delay: '6.3s', size: '2px' },
  { left: '47%', top: '18%', delay: '0.5s', size: '2px' },
  { left: '55%', top: '31%', delay: '3.4s', size: '2px' },
  { left: '64%', top: '16%', delay: '7.2s', size: '2px' },
  { left: '71%', top: '45%', delay: '1.8s', size: '3px' },
  { left: '82%', top: '27%', delay: '5.5s', size: '2px' },
  { left: '89%', top: '58%', delay: '2.1s', size: '2px' },
  { left: '59%', top: '63%', delay: '4.2s', size: '2px' },
  { left: '23%', top: '68%', delay: '8s', size: '2px' }
]
</script>

<template>
  <div class="pl-container" :class="{ 'is-night': isNight }">
    <div class="pl-img pl-blur pl-visible" />
    <div class="pl-img pl-visible" />
    <div class="hao-cover-mask" />
    <div class="hao-cover-texture" />

    <div v-if="isNight" aria-hidden="true" class="hao-stars">
      <span
        v-for="(star, index) in stars"
        :key="index"
        class="hao-star"
        :style="{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay }"
      />
    </div>
    <div v-if="isNight" aria-hidden="true" class="hao-meteor-field">
      <span class="hao-meteor hao-meteor--one" />
      <span class="hao-meteor hao-meteor--two" />
    </div>
  </div>

  <div id="site-info">
    <h1 id="site-title">{{ heroDate }}</h1>
    <div id="site-subtitle">
      <span id="subtitle">{{ heroText }}</span>
      <span class="typed-cursor">|</span>
    </div>
  </div>

  <a aria-label="向下浏览" href="#home_top" id="scroll-down">
    <el-icon class="scroll-down-effects"><ArrowDown /></el-icon>
  </a>
</template>
