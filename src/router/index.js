import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HaoRawHome.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/engineering',
    name: 'engineering',
    component: () => import('@/views/EngineeringView.vue'),
    meta: { title: '工程实践' }
  },
  {
    path: '/ai',
    name: 'ai',
    component: () => import('@/views/AiView.vue'),
    meta: { title: 'AI 工程' }
  },
  {
    path: '/articles/:slug',
    name: 'article-detail',
    component: () => import('@/views/ArticleDetailView.vue'),
    meta: { title: '文章详情' }
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/views/ToolsView.vue'),
    meta: { title: '工具构建' }
  },
  {
    path: '/trading/agent-lab',
    name: 'trading-agent-lab',
    component: () => import('@/views/TradingAgentLabView.vue'),
    meta: { title: '交易 Agent 实验室' }
  },
  {
    path: '/trading',
    name: 'trading',
    component: () => import('@/views/TradingView.vue'),
    meta: { title: '市场研究' }
  },
  {
    path: '/macro',
    name: 'macro',
    component: () => import('@/views/MacroView.vue'),
    meta: { title: '宏观地图' }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: '实战项目' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'LogicStack'} | LogicStack`
})

export default router
