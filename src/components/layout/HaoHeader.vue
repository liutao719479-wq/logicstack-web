<script setup>
import { ref } from 'vue'
import { Close, Grid, Menu, Moon, MoreFilled, Search, Sunny } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'
import { navItems } from '@/data/navigation'

const { isNight, toggleTheme } = useTheme()
const menuVisible = ref(false)

function closeMenu() {
  menuVisible.value = false
}
</script>

<template>
  <nav class="show" id="nav">
    <div id="nav-group">
      <div id="blog_name">
        <router-link aria-label="返回首页" class="back-home-button" to="/">
          <el-icon><Grid /></el-icon>
        </router-link>
        <router-link id="site-name" to="/">
          <span><i>[</i> LogicStack <i>]</i></span>
        </router-link>
      </div>

      <div id="page-name-mask">
        <div id="page-name">LogicStack</div>
      </div>

      <div id="menus">
        <div class="menus_items">
          <div v-for="item in navItems" :key="item.to" class="menus_item">
            <router-link class="site-page" :to="item.to">{{ item.label }}</router-link>
            <ul v-if="item.children?.length" class="menus_item_child vertical_nav hao-nav-dropdown">
              <li v-for="child in item.children" :key="child.to" class="recursion_menus_item">
                <router-link class="site-page child" :to="child.to">{{ child.label }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="nav-right">
        <div class="nav-button">
          <button aria-label="切换日夜主题" class="site-page" type="button" @click="toggleTheme">
            <el-icon><Sunny v-if="isNight" /><Moon v-else /></el-icon>
          </button>
        </div>
        <div class="nav-button nav-search">
          <button aria-label="搜索" class="site-page" type="button">
            <el-icon><Search /></el-icon>
          </button>
        </div>
        <div class="nav-button nav-more">
          <button aria-label="更多" class="site-page" type="button">
            <el-icon><MoreFilled /></el-icon>
          </button>
        </div>
        <div class="nav-button toggle-menu">
          <button aria-label="打开导航" class="site-page" type="button" @click="menuVisible = true">
            <el-icon><Menu /></el-icon>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <transition name="hao-menu">
    <div v-if="menuVisible" class="mobile-menu-mask" @click.self="closeMenu">
      <div class="mobile-menus">
        <button aria-label="关闭导航" class="mobile-close" type="button" @click="closeMenu">
          <el-icon><Close /></el-icon>
        </button>
        <router-link
          v-for="item in navItems"
          :key="item.to"
          class="mobile-site-page"
          :to="item.to"
          @click="closeMenu"
        >
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </transition>
</template>
