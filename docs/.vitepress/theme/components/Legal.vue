<script setup lang="ts">
import { Content, withBase } from 'vitepress'
import MtkBackdrop from './MtkBackdrop.vue'
import MtkNav from './MtkNav.vue'
import MtkFooter from './MtkFooter.vue'
</script>

<template>
  <div class="mtk-page mtk-legal">
    <MtkBackdrop />
    <MtkNav />

    <article class="legal-container">
      <Content class="legal-body" />
      <a :href="withBase('/')" class="back-link">← Back to Home</a>
    </article>

    <MtkFooter />
  </div>
</template>

<style scoped>
.legal-container {
  max-width: 760px;
  margin: 0 auto;
  padding: 9rem 2rem 4rem;
  animation: mtkFadeIn 0.6s ease-out;
}

/* 长文法律页：在品牌深色背景上保证可读性 */
.legal-body :deep(h1) {
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}
.legal-body :deep(h2) {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 2.5rem 0 0.8rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.legal-body :deep(h3) {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1.6rem 0 0.5rem;
}
.legal-body :deep(p),
.legal-body :deep(li) {
  color: var(--text-secondary);
  line-height: 1.75;
  font-size: 0.96rem;
}
.legal-body :deep(ul),
.legal-body :deep(ol) {
  padding-left: 1.4rem;
  margin: 0.6rem 0;
}
.legal-body :deep(li) { margin: 0.35rem 0; }
.legal-body :deep(a) {
  color: rgb(var(--mtk-accent-rgb));
  text-decoration: none;
  border-bottom: 1px solid rgba(var(--mtk-accent-rgb), 0.4);
}
.legal-body :deep(a:hover) { border-bottom-color: rgb(var(--mtk-accent-rgb)); }
.legal-body :deep(strong) { color: var(--text-primary); }
.legal-body :deep(.legal-updated) {
  color: var(--text-secondary);
  opacity: 0.7;
  font-size: 0.85rem;
  margin-bottom: 2rem;
}
.legal-body :deep(hr) {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin: 2rem 0;
}

.back-link {
  display: inline-block;
  margin-top: 3rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.back-link:hover { color: var(--text-primary); }

@keyframes mtkFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .legal-container { padding: 7rem 1.2rem 3rem; }
  .legal-body :deep(h1) { font-size: 1.9rem; }
}
</style>
