<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HaoGlobalBackground from '@/components/layout/HaoGlobalBackground.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'

const route = useRoute()
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <div class="app-shell">
    <HaoGlobalBackground v-if="!isHome" />
    <SiteHeader v-if="!isHome" />
    <div class="site-main" :class="{ 'hao-inner-main': !isHome }">
      <router-view />
    </div>
    <SiteFooter v-if="!isHome" />
  </div>
</template>
