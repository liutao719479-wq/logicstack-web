<script setup>
import { macroIndicators } from '@/data/mock'

const mapCells = [
  { x: 12, y: 35, tone: 'cold' }, { x: 20, y: 29, tone: 'cool' },
  { x: 31, y: 40, tone: 'neutral' }, { x: 43, y: 26, tone: 'warm' },
  { x: 51, y: 33, tone: 'hot' }, { x: 61, y: 30, tone: 'warm' },
  { x: 70, y: 42, tone: 'cool' }, { x: 79, y: 50, tone: 'neutral' },
  { x: 37, y: 56, tone: 'cool' }, { x: 55, y: 56, tone: 'hot' },
  { x: 67, y: 63, tone: 'warm' }, { x: 84, y: 68, tone: 'cold' }
]
</script>

<template>
  <div class="macro-preview glass-card">
    <div class="map-panel">
      <div class="panel-head">
        <div>
          <span class="label">宏观数据观察</span>
          <h3>全球通胀率热图</h3>
        </div>
        <span class="chip">Mock Data</span>
      </div>
      <div class="world-grid">
        <span
          v-for="(cell, index) in mapCells"
          :key="index"
          class="cell"
          :class="`cell--${cell.tone}`"
          :style="{ left: `${cell.x}%`, top: `${cell.y}%` }"
        ></span>
        <div class="grid-lines"></div>
      </div>
      <div class="legend">
        <span>低</span><i></i><i></i><i></i><i></i><span>高</span>
      </div>
    </div>
    <div class="indicator-list">
      <router-link v-for="indicator in macroIndicators" :key="indicator.key" to="/macro" class="indicator">
        <div>
          <span class="key">{{ indicator.key }}</span>
          <p>{{ indicator.name }}</p>
        </div>
        <strong>{{ indicator.change }}</strong>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.macro-preview {
  display: grid;
  grid-template-columns: 1.5fr 0.9fr;
  overflow: hidden;
  background: rgba(17, 24, 30, 0.38);
}

.map-panel {
  padding: 30px;
  border-right: 1px solid var(--ls-border);
}

.panel-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.label {
  color: var(--ls-text-muted);
  font-size: 10px;
  letter-spacing: 0.2em;
}

h3 {
  margin-top: 8px;
  font-size: 21px;
  font-weight: 400;
}

.world-grid {
  position: relative;
  height: 255px;
  margin-top: 25px;
  border-radius: 12px;
  background:
    radial-gradient(ellipse at 46% 48%, rgba(64, 76, 79, 0.18), transparent 54%),
    rgba(10, 16, 21, 0.74);
  overflow: hidden;
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(146, 154, 156, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(146, 154, 156, 0.07) 1px, transparent 1px);
  background-size: 46px 46px;
}

.cell {
  position: absolute;
  z-index: 1;
  width: clamp(28px, 6vw, 54px);
  height: clamp(16px, 3vw, 29px);
  border-radius: 28px;
  filter: blur(0.1px);
}

.cell--cold { background: rgba(78, 100, 109, 0.65); }
.cell--cool { background: rgba(94, 126, 127, 0.62); }
.cell--neutral { background: rgba(150, 133, 99, 0.58); }
.cell--warm { background: rgba(166, 113, 85, 0.62); }
.cell--hot { background: rgba(166, 89, 79, 0.68); }

.legend {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 17px;
  color: var(--ls-text-muted);
  font-size: 12px;
}

.legend i {
  width: 31px;
  height: 5px;
  border-radius: 4px;
  background: #556f79;
}

.legend i:nth-of-type(2) { background: #738e8d; }
.legend i:nth-of-type(3) { background: var(--ls-gold); }
.legend i:nth-of-type(4) { background: var(--ls-danger); }

.indicator-list {
  display: flex;
  flex-direction: column;
  padding: 14px 0;
}

.indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  gap: 12px;
  padding: 18px 24px;
}

.indicator + .indicator {
  border-top: 1px solid var(--ls-border);
}

.indicator:hover {
  background: rgba(28, 53, 65, 0.2);
}

.key {
  color: var(--ls-text-muted);
  font-size: 10px;
  letter-spacing: 0.18em;
}

.indicator p {
  margin-top: 6px;
  color: var(--ls-text-secondary);
  font-size: 13px;
}

.indicator strong {
  color: var(--ls-text);
  font-size: 14px;
  font-weight: 400;
}

@media (max-width: 840px) {
  .macro-preview {
    grid-template-columns: 1fr;
  }

  .map-panel {
    border-right: 0;
    border-bottom: 1px solid var(--ls-border);
  }
}
</style>
