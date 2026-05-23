<script setup>
import HomeContentCarousel from '@/components/home/HomeContentCarousel.vue'
import HomeGlobalTrendSection from '@/components/home/HomeGlobalTrendSection.vue'

defineProps({
  section: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <HomeContentCarousel
    v-if="section.layoutType === 'CONTENT_CAROUSEL'"
    :section="section"
    :items="section.items"
    :display-count="section.displayCount"
  />
  <HomeGlobalTrendSection
    v-else-if="section.layoutType === 'MAP_PREVIEW'"
    :section="section"
  />
</template>
