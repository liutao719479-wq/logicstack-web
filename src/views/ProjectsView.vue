<script setup>
import ProjectCard from '@/components/cards/ProjectCard.vue'
import { projects } from '@/data/mock'
</script>

<template>
  <section class="page-shell hao-page">
    <div class="container hao-page-container">
      <header class="page-intro">
        <span class="page-kicker">实践记录</span>
        <h1 class="page-title">实战项目</h1>
        <p class="page-description">将技术心得与研究需求落实为真正可使用、可迭代的产品。</p>
      </header>
      <div class="grid grid--three">
        <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
      </div>
    </div>
  </section>
</template>
