<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HaoGlobalBackground from '@/components/layout/HaoGlobalBackground.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'

const route = useRoute()
const isHome = computed(() => route.name === 'home')
const isMacro = computed(() => route.name === 'macro')
</script>

<template>
  <div class="app-shell" :class="{ 'is-macro': isMacro }">
    <HaoGlobalBackground v-if="!isHome && !isMacro" />
    <SiteHeader v-if="!isHome" />
    <div class="site-main" :class="{ 'hao-inner-main': !isHome }">
      <router-view />
    </div>
    <SiteFooter v-if="!isHome" />
  </div>
</template>

<style scoped>
.app-shell.is-macro {
  background: #000;
}

:global(:root[data-theme="day"]) .app-shell.is-macro {
  background: var(--page-bg);
}
</style>
