<script setup>
import { useCardTilt } from '@/composables/useCardTilt'

defineProps({
  items: {
    type: Array,
    required: true
  }
})

const { handleTiltMove, resetTilt } = useCardTilt()
</script>

<template>
  <section class="prototype-section home-trend-width-peer home-engineering-block">
    <header class="prototype-section-heading with-action">
      <div>
        <h2>工程实践</h2>
        <p>Recent technical explorations and logic notes.</p>
      </div>
      <router-link class="prototype-explore-link" to="/engineering">
        查看更多 <span>&gt;</span>
      </router-link>
    </header>

    <div class="engineering-insight-grid">
      <router-link
        v-for="item in items"
        :key="item.logCode"
        class="prototype-glass insight-card"
        :to="item.targetUrl"
        @mousemove="handleTiltMove"
        @mouseleave="resetTilt"
      >
        <div class="insight-image-shell">
          <img :src="item.image" :alt="item.title" />
          <div class="insight-image-overlay" />
          <span class="insight-log">{{ item.logCode }}</span>
        </div>
        <div class="insight-card-copy">
          <span class="insight-stream">{{ item.streamLabel }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <footer>
            <time>{{ item.date }}</time>
            <span>{{ item.tag }}</span>
          </footer>
        </div>
      </router-link>
    </div>
  </section>
</template>
