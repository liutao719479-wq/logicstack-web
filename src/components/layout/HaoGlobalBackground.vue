<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useHaoUniverse } from '@/composables/useHaoUniverse'

const { isNight } = useTheme()
const { mountUniverse, unmountUniverse } = useHaoUniverse()

onMounted(mountUniverse)
onBeforeUnmount(unmountUniverse)
</script>

<template>
  <div class="hao-global-background" :class="{ 'is-night': isNight }" aria-hidden="true">
    <div class="hao-global-image" />
    <div class="hao-global-mask" />
    <div class="hao-global-texture" />
    <canvas v-show="isNight" id="universe" height="880" width="1312" />
  </div>
</template>

<style scoped>
.hao-global-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.hao-global-image,
.hao-global-mask,
.hao-global-texture {
  position: absolute;
  inset: 0;
}

.hao-global-image {
  background: #273743 url("/images/mountain.jpg") center center / cover no-repeat;
  filter: brightness(0.98) saturate(0.88);
  transform: scale(1.02);
  transition: filter 0.45s ease;
}

.hao-global-mask {
  background: linear-gradient(180deg, rgba(19, 27, 34, 0.3), rgba(10, 15, 21, 0.7) 35%, rgba(8, 13, 19, 0.86));
  transition: background 0.45s ease;
}

.hao-global-texture {
  opacity: 0.12;
  background-image: repeating-linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.18) 0,
    rgba(255, 255, 255, 0.18) 1px,
    transparent 1px,
    transparent 3px
  );
  mix-blend-mode: soft-light;
}

.is-night .hao-global-image {
  filter: brightness(0.56) saturate(0.88);
}

.is-night .hao-global-mask {
  background: linear-gradient(180deg, rgba(6, 10, 17, 0.55), rgba(5, 9, 16, 0.8) 36%, rgba(5, 8, 14, 0.93));
}

#universe {
  position: fixed;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
