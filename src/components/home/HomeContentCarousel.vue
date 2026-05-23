<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import HomeTradingViewCard from '@/components/home/HomeTradingViewCard.vue'

const props = defineProps({
  section: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  displayCount: {
    type: Number,
    default: 3
  }
})

const pageIndex = ref(0)
const visibleCount = ref(props.displayCount)

const pageCount = computed(() => Math.max(1, Math.ceil(props.items.length / visibleCount.value)))
const visibleItems = computed(() => {
  const start = pageIndex.value * visibleCount.value
  return props.items.slice(start, start + visibleCount.value)
})

function updateVisibleCount() {
  if (window.innerWidth <= 680) {
    visibleCount.value = 1
  } else if (window.innerWidth <= 1024) {
    visibleCount.value = Math.min(2, props.displayCount)
  } else {
    visibleCount.value = props.displayCount
  }
}

function nextPage() {
  pageIndex.value = (pageIndex.value + 1) % pageCount.value
}

function previousPage() {
  pageIndex.value = (pageIndex.value - 1 + pageCount.value) % pageCount.value
}

watch(visibleCount, () => {
  pageIndex.value = 0
})

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('resize', updateVisibleCount))
</script>

<template>
  <section class="home-channel" :data-section="section.sectionKey">
    <header class="home-channel-header">
      <div>
        <router-link class="home-channel-title" :to="section.moreLink">
          {{ section.title }} <span>&gt;</span>
        </router-link>
        <p>{{ section.subtitle }}</p>
      </div>
    </header>

    <div class="home-channel-track">
      <button
        v-if="pageCount > 1 && pageIndex > 0"
        class="home-channel-control home-channel-previous"
        type="button"
        :aria-label="`查看${section.title}上一组内容`"
        @click="previousPage"
      >
        &lt;
      </button>
      <div class="home-channel-grid">
        <HomeTradingViewCard
          v-for="item in visibleItems"
          :key="item.title"
          :item="item"
        />
      </div>
      <button
        v-if="pageCount > 1"
        class="home-channel-control home-channel-next"
        type="button"
        :aria-label="`查看${section.title}下一组内容`"
        @click="nextPage"
      >
        &gt;
      </button>
    </div>

    <div v-if="pageCount > 1" class="home-channel-pagination" aria-hidden="true">
      <span
        v-for="page in pageCount"
        :key="page"
        :class="{ active: page - 1 === pageIndex }"
      />
    </div>
  </section>
</template>
