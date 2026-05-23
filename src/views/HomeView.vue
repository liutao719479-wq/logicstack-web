<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HaoHero from '@/components/home/HaoHero.vue'
import HaoHeader from '@/components/layout/HaoHeader.vue'
import { articles, macroIndicators, tools } from '@/data/mock'
import '@/styles/hao-home.css'

const navFixed = ref(false)
const navVisible = ref(false)
let previousScrollTop = 0

function handleScroll() {
  const currentTop = window.scrollY

  if (currentTop <= 0) {
    navFixed.value = false
    navVisible.value = false
  } else {
    navFixed.value = true
    navVisible.value = currentTop < previousScrollTop
  }

  previousScrollTop = currentTop
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <div class="hao-home page" id="body-wrap">
    <header id="page-header" class="full_page" :class="{ 'nav-fixed': navFixed, 'nav-visible': navVisible }">
      <HaoHeader />
      <HaoHero />
    </header>

    <div id="home_top">
      <div class="home-intro">记录数据工程、交易系统与宏观数据可视化的实践过程。</div>
    </div>

    <main class="hao-layout" id="content-inner">
      <section class="recent-post-area">
        <div class="hao-section-title">
          <h2>最新文章</h2>
          <router-link to="/engineering">全部文章</router-link>
        </div>
        <div id="recent-posts">
          <router-link
            v-for="article in articles.slice(0, 4)"
            :key="article.slug"
            class="recent-post-item"
            :to="`/articles/${article.slug}`"
          >
            <span class="post-meta">{{ article.category }} / {{ article.date }}</span>
            <h3>{{ article.title }}</h3>
            <p>{{ article.excerpt }}</p>
          </router-link>
        </div>
      </section>

      <aside id="aside-content">
        <section class="card-widget">
          <h2>在线工具箱</h2>
          <router-link v-for="tool in tools.slice(0, 4)" :key="tool.name" class="widget-link" to="/tools">
            <span>{{ tool.name }}</span>
            <small>{{ tool.type }}</small>
          </router-link>
          <router-link class="widget-more" to="/tools">查看全部工具</router-link>
        </section>

        <section class="card-widget">
          <h2>宏观地图</h2>
          <router-link
            v-for="indicator in macroIndicators"
            :key="indicator.key"
            class="widget-link"
            to="/macro"
          >
            <span>{{ indicator.name }}</span>
            <small>{{ indicator.key }}</small>
          </router-link>
          <router-link class="widget-more" to="/macro">进入全球热图</router-link>
        </section>
      </aside>
    </main>
  </div>
</template>
