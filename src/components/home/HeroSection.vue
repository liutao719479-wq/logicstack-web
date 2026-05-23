<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'

const now = new Date()
const heroDate = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0')
].join('.')

const { isNight } = useTheme()
const particles = [
  { x: 8, y: 25, size: 2, delay: '0s' },
  { x: 16, y: 48, size: 2, delay: '2.6s' },
  { x: 24, y: 31, size: 1, delay: '4.1s' },
  { x: 34, y: 22, size: 2, delay: '1.7s' },
  { x: 42, y: 51, size: 2, delay: '5.2s' },
  { x: 50, y: 27, size: 2, delay: '3.1s' },
  { x: 59, y: 40, size: 1, delay: '0.9s' },
  { x: 67, y: 22, size: 2, delay: '4.4s' },
  { x: 75, y: 55, size: 2, delay: '1.3s' },
  { x: 83, y: 30, size: 1, delay: '3.8s' },
  { x: 91, y: 46, size: 2, delay: '2.2s' }
]
</script>

<template>
  <section class="hero" :class="{ 'night-mode': isNight, 'day-mode': !isNight }">
    <div class="hero-image"></div>
    <div class="hero-mask"></div>
    <div class="hero-grain"></div>
    <div v-if="isNight" class="stars" aria-hidden="true">
      <span
        v-for="(particle, index) in particles"
        :key="index"
        :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          animationDelay: particle.delay
        }"
      ></span>
    </div>
    <div v-if="isNight" class="meteor" aria-hidden="true"></div>

    <div class="site-info">
      <time class="site-title" :datetime="heroDate.replaceAll('.', '-')">{{ heroDate }}</time>
      <p class="site-subtitle">真正的丰碑，从不立于坦途之上，而是铸就在狂风与烈火之间。</p>
    </div>

    <a class="scroll-down" href="#directions" aria-label="向下浏览">
      <el-icon><ArrowDown /></el-icon>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 620px;
  overflow: hidden;
  background: #15212b;
}

.hero-image,
.hero-mask,
.hero-grain,
.stars,
.meteor {
  position: absolute;
  inset: 0;
}

.hero-image {
  background: #20313d url("/images/mountain.jpg") center / cover no-repeat;
  animation:
    blur-to-clear 2s cubic-bezier(0.62, 0.21, 0.25, 1) both,
    cover-scale 1.5s cubic-bezier(0.62, 0.21, 0.25, 1) both;
  transition: filter 0.55s ease;
}

.hero-mask {
  z-index: 1;
  transition: background 0.55s ease;
}

.day-mode .hero-mask {
  background: linear-gradient(180deg, rgba(12, 18, 23, 0.05), rgba(8, 14, 19, 0.22));
}

.night-mode .hero-image {
  filter: brightness(0.64) saturate(0.86);
}

.night-mode .hero-mask {
  background:
    linear-gradient(180deg, rgba(7, 12, 17, 0.24), rgba(6, 12, 18, 0.6)),
    radial-gradient(ellipse at center, transparent 22%, rgba(6, 12, 18, 0.28) 100%);
}

.hero-grain {
  z-index: 2;
  opacity: 0.12;
  pointer-events: none;
  background-image: repeating-linear-gradient(
    118deg,
    rgba(255, 255, 255, 0.22) 0,
    rgba(255, 255, 255, 0.22) 1px,
    transparent 1px,
    transparent 4px
  );
}

.day-mode .hero-grain {
  opacity: 0.055;
}

.stars {
  z-index: 3;
  pointer-events: none;
}

.stars span {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: rgba(235, 226, 150, 0.7);
  box-shadow: 0 0 6px rgba(235, 226, 150, 0.35);
  animation: star-blink 7.4s ease-in-out infinite;
}

.stars span:nth-child(3n) {
  background: rgba(204, 214, 247, 0.7);
  box-shadow: 0 0 7px rgba(204, 214, 247, 0.34);
}

.meteor {
  z-index: 3;
  top: 16%;
  right: 18%;
  left: auto;
  width: 96px;
  height: 1px;
  opacity: 0;
  border-radius: 50px;
  background: linear-gradient(90deg, transparent, rgba(240, 244, 244, 0.52));
  transform: rotate(-28deg);
  animation: meteor-pass 30s ease-out 9s infinite;
}

.site-info {
  position: absolute;
  z-index: 4;
  top: 43%;
  width: 100%;
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.94);
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}

.site-title {
  display: block;
  margin: 0 auto 13px;
  font-family: "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  font-size: clamp(34px, 3.2vw, 46px);
  font-weight: 700;
  line-height: 1.2;
}

.site-subtitle {
  font-size: clamp(16px, 1.55vw, 22px);
  font-weight: 400;
  line-height: 1.9;
  letter-spacing: 0.035em;
}

.scroll-down {
  position: absolute;
  z-index: 4;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 62px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 30px;
}

.scroll-down :deep(svg) {
  animation: arrow-float 1.55s ease-in-out infinite;
}

@keyframes blur-to-clear {
  from { filter: blur(36px); opacity: 1; }
  to { filter: blur(0); opacity: 1; }
}

@keyframes cover-scale {
  from { transform: scale(1.35) translateZ(0); opacity: 0; }
  to { transform: scale(1) translateZ(0); opacity: 1; }
}

@keyframes star-blink {
  0%, 100% { opacity: 0.16; transform: scale(0.88); }
  52% { opacity: 0.72; transform: scale(1.1); }
}

@keyframes meteor-pass {
  0%, 89% { opacity: 0; transform: rotate(-28deg) translate3d(0, 0, 0); }
  90% { opacity: 0.52; }
  94% { opacity: 0; transform: rotate(-28deg) translate3d(-290px, 0, 0); }
  100% { opacity: 0; transform: rotate(-28deg) translate3d(-290px, 0, 0); }
}

@keyframes arrow-float {
  0%, 100% { transform: translateY(0); opacity: 0.62; }
  50% { transform: translateY(7px); opacity: 0.95; }
}

@media (max-width: 768px) {
  .hero {
    min-height: 100svh;
  }

  .hero-image {
    background-position: 56% center;
  }

  .site-info {
    top: 42%;
  }

  .site-subtitle {
    font-size: 15px;
    line-height: 2;
  }

  .stars span:nth-child(n + 8),
  .meteor {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-image,
  .stars span,
  .meteor,
  .scroll-down :deep(svg) {
    animation: none;
  }
}
</style>
