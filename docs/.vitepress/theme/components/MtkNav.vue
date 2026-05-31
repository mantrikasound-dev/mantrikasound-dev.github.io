<script setup lang="ts">
import { withBase } from 'vitepress'

// active: 'home' | 'render' | 'docs' —— 高亮当前页对应的入口
defineProps<{ active?: string }>()

const links = [
  { key: 'home', text: 'Home', href: '/' },
  { key: 'tools', text: 'Mantrika Tools', href: '/mantrika-tools' },
  { key: 'render', text: 'Offline Render', href: '/mtk-offline-render' }
]
</script>

<template>
  <nav class="mtk-nav">
    <a :href="withBase('/')" class="nav-logo">
      <span class="nav-logo-main">MANTRIKA</span>
      <span class="nav-logo-sub">SOUND</span>
    </a>
    <div class="nav-links">
      <a
        v-for="l in links"
        :key="l.key"
        :href="withBase(l.href)"
        :class="{ active: active === l.key }"
      >{{ l.text }}</a>
    </div>
  </nav>
</template>

<style scoped>
.mtk-nav {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(5, 5, 5, 0.6);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-base);
  z-index: 100;
  animation: mtkNavFade 0.6s ease-out;
}

.nav-logo {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  display: flex;
  gap: 0.4em;
}
.nav-logo-main { color: var(--text-primary); }
.nav-logo-sub { color: var(--text-secondary); font-weight: 500; }

.nav-links { display: flex; gap: 2rem; }
.nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}
.nav-links a:hover,
.nav-links a.active { color: var(--text-primary); }

@keyframes mtkNavFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 600px) {
  .mtk-nav { padding: 1rem 1.2rem; }
  .nav-links { gap: 1.1rem; }
  .nav-links a { font-size: 0.78rem; }
}
</style>
