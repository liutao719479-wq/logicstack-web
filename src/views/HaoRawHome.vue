<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import HomeSectionRenderer from '@/components/home/HomeSectionRenderer.vue'
import { useHaoUniverse } from '@/composables/useHaoUniverse'
import { useTheme } from '@/composables/useTheme'
import { homeSections } from '@/data/homeSections'
import { navItems } from '@/data/navigation'
import '@/styles/hao-home-sections.css'
import '@/styles/hao-index-img-original.css'

const { isNight, theme, toggleTheme } = useTheme()
const { mountUniverse, unmountUniverse } = useHaoUniverse()
const visibleSections = computed(() =>
  homeSections.filter((section) => section.enabled).sort((left, right) => left.sortOrder - right.sortOrder)
)

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

      <div class="pl-container">
        <div class="pl-img pl-blur pl-visible" />
        <div class="pl-img pl-visible" />
        <video class="video" />
      </div>

      <div id="site-info">
        <h1 id="site-title">2026.03.28</h1>
        <div id="site-subtitle">
          <span id="subtitle">真正的丰碑，从不立于坦途之上，而是铸就在狂风与烈火之间。</span>
          <span aria-hidden="true" class="typed-cursor typed-cursor--blink">|</span>
        </div>
      </div>
      <div id="scroll-down" @click="scrollDown">
        <i class="haofont hao-icon-angle-down scroll-down-effects" />
      </div>
    </header>

    <canvas v-show="isNight" id="universe" height="880" width="1312" />

    <div id="home_top" />

    <main class="layout home-content-shell home-sections-layout" id="content-inner">
      <div class="home-fullscreen-section home-sections-stream">
        <HomeSectionRenderer v-for="section in visibleSections" :key="section.sectionKey" :section="section" />
      </div>
    </main>

    <footer id="footer">
      <div id="footer-wrap">
        <div class="copyright">&copy; 2026 LogicStack</div>
      </div>
    </footer>
  </div>
</template>
