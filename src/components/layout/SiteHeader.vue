<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { navItems } from '@/data/navigation'

const { toggleTheme } = useTheme()
const route = useRoute()
const scrolled = ref(false)
const menuVisible = ref(false)

function updateScrollState() {
  scrolled.value = window.scrollY > 8
}

function closeMenu() {
  menuVisible.value = false
}

function isPrimaryNavActive(item) {
  return item.to === '/trading' && route.path.startsWith('/trading/')
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScrollState))
</script>

<template>
  <header class="hao-inner-header" :class="{ 'is-scrolled': scrolled }">
    <nav class="show" id="nav">
      <div id="nav-group">
        <div id="blog_name">
          <router-link aria-label="返回首页" class="back-home-button" to="/">
            <i class="back-home-button-icon haofont hao-icon-apps-fill" />
          </router-link>
          <router-link id="site-name" to="/">
            <span>[ LogicStack ]</span>
          </router-link>
        </div>

        <div id="menus">
          <div class="menus_items">
            <div v-for="item in navItems" :key="item.to" class="menus_item">
              <router-link class="site-page" :class="{ 'router-link-active': isPrimaryNavActive(item) }" :to="item.to">
                {{ item.label }}
              </router-link>
              <ul v-if="item.children?.length" class="menus_item_child vertical_nav hao-nav-dropdown">
                <li v-for="child in item.children" :key="child.to" class="recursion_menus_item">
                  <router-link class="site-page child" :to="child.to">{{ child.label }}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="nav-right">
          <div class="nav-button" id="darkmode_button">
            <a class="console_switchbutton" title="切换模式 - 日夜交替，黑白互换。" @click.prevent="toggleTheme">
              <i class="haofont hao-icon-moon-clear-fill" />
            </a>
          </div>
          <div class="nav-button" id="search-button">
            <a class="site-page" title="站内搜索"><i class="haofont hao-icon-search--line" /></a>
          </div>
          <div class="nav-button" id="nav-console">
            <a class="console_switchbutton" title="显示中控台"><i class="haofont hao-icon-dashboard" /></a>
          </div>
          <div id="toggle-menu">
            <a class="site-page" @click="menuVisible = true"><i class="haofont hao-icon-bars" /></a>
          </div>
        </div>
      </div>
    </nav>

    <transition name="inner-menu">
      <div v-if="menuVisible" class="inner-mobile-mask" @click.self="closeMenu">
        <nav class="inner-mobile-nav">
          <a class="inner-mobile-close" @click="closeMenu"><i class="haofont hao-icon-xmark" /></a>
          <router-link v-for="item in navItems" :key="item.to" :to="item.to" @click="closeMenu">
            {{ item.label }}
          </router-link>
        </nav>
      </div>
    </transition>
  </header>
</template>
