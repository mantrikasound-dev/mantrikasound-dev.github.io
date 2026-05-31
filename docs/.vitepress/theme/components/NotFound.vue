<script setup lang="ts">
import { withBase } from 'vitepress'
import MtkBackdrop from './MtkBackdrop.vue'
import MtkNav from './MtkNav.vue'
</script>

<template>
  <div class="mtk-page mtk-404">
    <MtkBackdrop />
    <MtkNav />

    <section class="nf">
      <div class="code">404</div>
      <h1 class="nf-title">Signal lost.</h1>
      <p class="nf-desc">
        The page you’re looking for has drifted out of range or never existed.
      </p>
      <div class="nf-actions">
        <a class="btn primary" :href="withBase('/')">Back to Home</a>
        <a class="btn ghost" :href="withBase('/guide/quick-start')">Read the Docs</a>
      </div>
    </section>

    <footer>© 2026 Mantrika Sound</footer>
  </div>
</template>

<style scoped>
.nf {
  min-height: 70vh;
  padding: 12rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 巨大的渐变 404，呼应落地页标题质感 */
.code {
  font-size: clamp(5rem, 18vw, 11rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, #ffffff 0%, #2a2a2a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}
/* 品牌色辉光衬底 */
.code::after {
  content: '404';
  position: absolute;
  inset: 0;
  z-index: -1;
  color: var(--accent);
  filter: blur(38px);
  opacity: 0.35;
}

.nf-title {
  margin-top: 1.5rem;
  font-size: 1.6rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.nf-desc {
  margin-top: 0.75rem;
  max-width: 460px;
  color: var(--text-secondary);
  font-size: 1rem;
}

.nf-actions {
  margin-top: 2.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.4rem;
  border-radius: var(--mtk-radius);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s var(--mtk-ease);
  border: 1px solid transparent;
}
.btn.primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 8px 24px -8px var(--glow-primary);
}
.btn.primary:hover {
  background: var(--accent-glow);
  transform: translateY(-2px);
}
.btn.ghost {
  border-color: var(--border-base);
  color: var(--text-primary);
  background: var(--bg-glass);
}
.btn.ghost:hover {
  border-color: var(--border-highlight);
  background: var(--bg-glass-hover);
  transform: translateY(-2px);
}

footer {
  padding: 3rem 0;
  text-align: center;
  color: #444;
  font-size: 0.8rem;
}

@media (max-width: 600px) {
  .nf { padding-top: 9rem; }
}
</style>
