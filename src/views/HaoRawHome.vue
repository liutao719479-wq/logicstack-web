<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import HomeFeaturedStory from '@/components/home/HomeFeaturedStory.vue'
import HomeGlobalTrendSection from '@/components/home/HomeGlobalTrendSection.vue'
import HomeEngineeringBlock from '@/components/home/HomeEngineeringBlock.vue'
import HomeKnowledgeStreams from '@/components/home/HomeKnowledgeStreams.vue'
import { useHaoUniverse } from '@/composables/useHaoUniverse'
import { useTheme } from '@/composables/useTheme'
import { homeSections } from '@/data/homeSections'
import { navItems } from '@/data/navigation'
import '@/styles/hao-home-sections.css'
import '@/styles/hao-index-img-original.css'

const { isNight, theme, toggleTheme } = useTheme()
const { mountUniverse, unmountUniverse } = useHaoUniverse()
const HERO_BACKGROUND_STORAGE_KEY = 'logicstack-hero-background'
const heroBackgrounds = [
  '/images/mountain.jpg',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=3540&auto=format&fit=crop'
]
const savedHeroBackground = (() => {
  if (typeof window === 'undefined') return 0
  try {
    const value = Number.parseInt(window.localStorage.getItem(HERO_BACKGROUND_STORAGE_KEY) || '0', 10)
    return value >= 0 && value < heroBackgrounds.length ? value : 0
  } catch {
    return 0
  }
})()
const currentHeroBackgroundIndex = ref(savedHeroBackground)
const heroBackgroundStyle = computed(() => ({
  '--hero-background-image': `url("${heroBackgrounds[currentHeroBackgroundIndex.value]}")`
}))
const enabledSections = computed(() => homeSections.filter((section) => section.enabled))
const sectionMap = computed(() =>
  Object.fromEntries(enabledSections.value.map((section) => [section.sectionKey, section]))
)
const engineeringFeatureCards = computed(() => [
  {
    ...sectionMap.value.engineering?.items[0],
    logCode: 'LOG_042',
    streamLabel: '工程实践',
    tag: '#SYSTEMS',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmOIGkGtQ-xphT_8p0lMaotfHLPssvAMVEV-9pRHn4oja7fqI0diufXCbJYW2IIkxUeQ4Z_mTgVNuT09CNxGCaYgrZ0nxZA7ZLQGzcJaQztJdNdpT--gt5m0LrD1H1Q6KmyNLyJRPlcidxvCyHbdgNlLlX-NNsVFfj5W1YS1hhp6HbDBjWfvKrbDzGYXv8SVXVII-g3amvO4C5WkkDsbhrDQKW0cXftUf7aDdhr6yREab_ez2x--Zdl_dafCa0n47Nad_OYBczScY'
  },
  {
    ...sectionMap.value.ai?.items[0],
    logCode: 'LOG_041',
    streamLabel: 'AI 工程',
    tag: '#AGENT',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwH3SI1_PvW9HgqepI224MSMlcx8NoW612psiiYq1IKZBwD66y_AKB_V40FZk9bh-NNFBU4YecsRBNpBGszCB8MrDHqGAMC3TXRDt5aaMhoqWP7UF7uDN1Z8QKKSyx-L3WNAgIUPE-oEIPF3FVxPoPPNMVM1Z3QZrwGH--Xd-mXGGBHlswHLfV74b8NJitCr94L0MU_KAHMI_s3CwT0DCbheeibmk9ws6LxjwEiWGT_2HJqVYXcpQ-9GLxcOwYCLFRbE9ED6VHsBE'
  },
  {
    ...sectionMap.value.market?.items[0],
    logCode: 'LOG_040',
    streamLabel: '市场研究',
    tag: '#MACRO',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXVRh0ENU0vNzEZPQhBEYrAmPIYXCWc0qlYdo_GfBbcYCs-2dbr8ZStbFhCOz3gqo00wxW3xjaKkDW4cUJbvoc4Sn0d4J2V7DOQC_vI7BN1IWO2yfxLIUDsV1n3uAeUyfjlIRI--yA-ESrRSj9dYHmu1Fh6vPpOXtfe5qNEyLf7rrBPh7fhDGFfIIkMhDNg1hLsL2HGnJ7An0ant5zOoRyRHVVpn9H2NvUON3mFMlI7q3ECILdVjLGkoX3J3gK2ms6iNztRrFuK0w'
  }
].filter((item) => item.title))
const researchSections = computed(() =>
  ['engineering', 'ai', 'tools', 'market']
    .map((key) => sectionMap.value[key])
    .filter(Boolean)
)
const globalTrendSection = computed(() => sectionMap.value['global-trend'])
const featuredStory = computed(() => sectionMap.value.engineering?.items[0])

let previousTop = 0

function applyHaoTheme() {
  document.documentElement.dataset.theme = isNight.value ? 'dark' : 'light'
}

function handleScroll() {
  const header = document.getElementById('page-header')
  const currentTop = window.scrollY || document.documentElement.scrollTop
  if (!header) return

  if (currentTop > 0) {
    header.classList.add('nav-fixed')
    header.classList.toggle('nav-visible', currentTop < previousTop)
  } else {
    header.classList.remove('nav-fixed', 'nav-visible')
  }
  previousTop = currentTop
}

function scrollDown() {
  document.getElementById('home_top')?.scrollIntoView({ behavior: 'smooth' })
}

function switchHeroBackground() {
  currentHeroBackgroundIndex.value = (currentHeroBackgroundIndex.value + 1) % heroBackgrounds.length
  try {
    window.localStorage.setItem(HERO_BACKGROUND_STORAGE_KEY, String(currentHeroBackgroundIndex.value))
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

const stopThemeWatch = watch(isNight, applyHaoTheme, { immediate: true })

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  mountUniverse()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  stopThemeWatch()
  unmountUniverse()
  document.documentElement.dataset.theme = theme.value === 'night' ? 'night' : 'day'
})
</script>

<template>
  <div class="page" id="body-wrap">
    <link rel="stylesheet" href="/hao-assets/icon/iconfont.css" />
    <link rel="stylesheet" href="/hao-assets/zhheo/zhheoblog.css" />
    <link rel="stylesheet" href="/hao-assets/zhheo/custom.css" />
    <link rel="stylesheet" href="/hao-assets/css/fullPage.css" />

    <header class="full_page" id="page-header">
      <nav class="show" id="nav">
        <div id="nav-group">
          <div id="blog_name">
            <div class="back-home-button" tabindex="-1">
              <i class="back-home-button-icon haofont hao-icon-apps-fill" style="font-size: 1rem" />
            </div>
            <router-link id="site-name" to="/" title="返回博客主页">
              <span>[ LogicStack ]</span>
            </router-link>
          </div>

          <div id="menus">
            <div class="menus_items">
              <div v-for="menu in navItems" :key="menu.to" class="menus_item">
                <router-link class="site-page" :to="menu.to">
                  <span>{{ menu.label }}</span>
                </router-link>
                <ul v-if="menu.children?.length" class="menus_item_child vertical_nav hao-nav-dropdown">
                  <li v-for="child in menu.children" :key="child.to" class="recursion_menus_item">
                    <router-link class="site-page child" :to="child.to">
                      <span>{{ child.label }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div id="nav-right">
            <div class="nav-button" id="darkmode_button">
              <a class="console_switchbutton" href="#" title="切换模式 - 日夜交替，黑白互换。" @click.prevent="toggleTheme">
                <i class="haofont hao-icon-moon-clear-fill" style="font-size: 1rem" />
              </a>
            </div>
            <div class="nav-button" id="hero-background-button">
              <a class="console_switchbutton" href="#" title="切换背景图" @click.prevent="switchHeroBackground">
                <i class="haofont hao-icon-screen" style="font-size: 1rem" />
              </a>
            </div>
            <div class="nav-button" id="search-button">
              <a class="site-page social-icon search" href="#" title="站内搜索" @click.prevent>
                <i class="haofont hao-icon-search--line" />
              </a>
            </div>
            <div class="nav-button" id="nav-console">
              <a class="console_switchbutton" href="#" title="显示中控台" @click.prevent>
                <i class="haofont hao-icon-dashboard" />
              </a>
            </div>
            <div id="toggle-menu">
              <a class="site-page"><i class="haofont hao-icon-bars" /></a>
            </div>
          </div>
        </div>
      </nav>

      <div class="pl-container" :style="heroBackgroundStyle">
        <div class="pl-img pl-blur pl-visible" />
        <div class="pl-img pl-visible" />
        <video class="video" />
      </div>

      <div id="site-info">
        <p class="hero-prototype-label">ESTABLISHED IN 2026</p>
        <h1 class="hero-prototype-title" id="site-title">沉浸式的智识避难所</h1>
        <p class="hero-prototype-description" id="site-subtitle">
          这里拒绝瞬息万变的繁杂信息，我们专注于代码的精准、AI的深度以及市场的静默规律。
        </p>
      </div>
      <div id="scroll-down" @click="scrollDown">
        <i class="haofont hao-icon-angle-down scroll-down-effects" />
      </div>
    </header>

    <canvas v-show="isNight" id="universe" height="880" width="1312" />

    <div id="home_top" />

    <main class="layout home-content-shell home-sections-layout" id="content-inner">
      <HomeEngineeringBlock :items="engineeringFeatureCards" />
      <HomeKnowledgeStreams :sections="researchSections" />
      <HomeGlobalTrendSection v-if="globalTrendSection" :section="globalTrendSection" />
      <HomeFeaturedStory v-if="featuredStory" :item="featuredStory" />
    </main>

    <footer class="home-quiet-footer" id="footer">
      <div id="footer-wrap">
        <div class="home-footer-brand">LogicStack</div>
        <p>记录数据工程、AI 工程、市场研究与工具构建的实践过程。</p>
        <div class="copyright">&copy; 2026 LogicStack</div>
      </div>
    </footer>
  </div>
</template>
