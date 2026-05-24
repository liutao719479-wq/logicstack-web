<script setup>
const footerLinks = [
  { label: '工程实践', to: '/engineering' },
  { label: 'AI 工程', to: '/ai' },
  { label: '市场研究', to: '/trading' },
  { label: '工具构建', to: '/tools' },
  { label: '关于', to: '/about' }
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner container">
      <div>
        <router-link class="footer-brand" to="/">LogicStack</router-link>
        <p class="footer-note">记录数据工程、AI 工程、市场研究与工具构建的实践过程。</p>
      </div>
      <div class="footer-nav">
        <router-link v-for="link in footerLinks" :key="link.to" :to="link.to">
          {{ link.label }}
        </router-link>
      </div>
    </div>
    <div class="copyright container">© 2026 LogicStack. Built for knowledge and practice.</div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--ls-border);
  padding: 46px 0 24px;
  background: var(--page-bg);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding-bottom: 42px;
}

.footer-brand {
  display: block;
  margin-bottom: 10px;
  font-size: 19px;
  font-weight: 400;
  color: var(--ls-text);
}

.footer-note {
  max-width: 390px;
  color: var(--ls-text-secondary);
  font-size: 14px;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 16px 28px;
  max-width: 380px;
  color: var(--ls-text-secondary);
  font-size: 14px;
}

.footer-nav a:hover {
  color: var(--ls-primary-soft);
}

.copyright {
  border-top: 1px solid var(--ls-border);
  padding-top: 22px;
  color: var(--ls-text-muted);
  font-size: 12px;
}

@media (max-width: 680px) {
  .footer-inner {
    flex-direction: column;
    padding-bottom: 30px;
  }
}
</style>
