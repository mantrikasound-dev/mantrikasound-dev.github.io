<script setup lang="ts">
import { withBase } from 'vitepress'

// 品牌页统一页脚：版权 + 法律页链接（Paddle 审核要求隐私/条款/退款可达）
const legal = [
  { text: 'Privacy Policy', href: '/privacy-policy' },
  { text: 'Terms of Service', href: '/terms-of-service' },
  { text: 'Refund Policy', href: '/refund-policy' }
]
</script>

<template>
  <footer class="mtk-footer">
    <nav class="mtk-footer-links">
      <a
        v-for="l in legal"
        :key="l.href"
        :href="withBase(l.href)"
      >{{ l.text }}</a>
    </nav>
    <p class="mtk-footer-copy">© 2026 Mantrika Sound. All rights reserved.</p>
  </footer>
</template>

<style scoped>
.mtk-footer {
  text-align: center;
  padding: 4rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.mtk-footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}
.mtk-footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.82rem;
  transition: color 0.2s;
}
.mtk-footer-links a:hover { color: var(--text-primary); }

.mtk-footer-copy {
  color: #444;
  font-size: 0.8rem;
  margin: 0;
}

@media (max-width: 600px) {
  .mtk-footer-links { gap: 1rem; }
}
</style>
