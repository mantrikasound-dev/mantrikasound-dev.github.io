<script setup lang="ts">
import { withBase } from 'vitepress'
import MtkBackdrop from './MtkBackdrop.vue'
import MtkNav from './MtkNav.vue'

// 卡片鼠标跟随光效
function onCardMove(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

// 声波条：钟形轮廓（中间高两端低）+ 每根加确定性抖动，
// 让相邻条错落闪烁、更灵动，而不是整块同步起伏。
const BARS = 64
function barStyle(n: number) {
  const t = (n - 1) / (BARS - 1)         // 0..1
  const bell = Math.sin(t * Math.PI)     // 中间 1，两端 0
  // 确定性伪随机（避免 Math.random），让每根条有自己的个性
  const j = (Math.sin(n * 12.9898) * 43758.5453) % 1
  const jitter = Math.abs(j)             // 0..1
  const base = 0.12 + bell * 0.78        // 高度基准更细瘦
  return {
    '--h': base.toFixed(3),
    '--lo': (0.25 + jitter * 0.25).toFixed(3),    // 每根收缩到的低点不同
    '--d': `${(-jitter * 1.4).toFixed(2)}s`,      // 负延迟：起步即错相，无整齐感
    '--dur': `${(0.7 + jitter * 0.7).toFixed(2)}s` // 0.7~1.4s，更快更跳
  } as Record<string, string>
}
</script>

<template>
  <div class="mtk-page mtk-landing">
    <MtkBackdrop />
    <MtkNav active="home" />

    <section class="hero">
      <h1 class="logo-text">Precision tools<br />for REAPER.</h1>
      <p class="tagline">Precision engineered plugins and extensions for sound designers.</p>

      <!-- 声波视觉：契合「声音设计」品牌的动态均衡器条 -->
      <div class="hero-visual" aria-hidden="true">
        <div class="wave">
          <span v-for="n in 64" :key="n" class="bar" :style="barStyle(n)"></span>
        </div>
        <div class="wave-glow"></div>
      </div>
    </section>

    <section class="products">
      <!-- 产品 1：MTK Offline Render（独立批量渲染工具） -->
      <a class="card" :href="withBase('/mtk-offline-render')" @mousemove="onCardMove">
        <div>
          <div class="card-header">
            <h2 class="card-title">MTK Offline Render</h2>
            <span class="badge">Free</span>
          </div>
          <p class="card-desc">
            Batch render utility for REAPER. Queue your projects, hit start, and let it handle the rest.
          </p>
        </div>
        <span class="card-link">View Details</span>
      </a>

      <!-- 产品 2：Mantrika Tools（REAPER Extension，详情页 → 文档） -->
      <a class="card" :href="withBase('/mantrika-tools')" @mousemove="onCardMove">
        <div>
          <div class="card-header">
            <h2 class="card-title">Mantrika Tools</h2>
            <span class="badge">In Development</span>
          </div>
          <p class="card-desc">
            A self-contained REAPER extension — workflow enhancements, creative functions, and dozens of actions.
          </p>
        </div>
        <span class="card-link">View Details</span>
      </a>
    </section>

    <footer>© 2026 Mantrika Sound</footer>
  </div>
</template>

<style scoped>
.hero {
  padding: 10rem 1rem 6rem;
  text-align: center;
  position: relative;
}

.logo-text {
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(180deg, #ffffff 0%, #666666 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: mtkFadeInUp 0.8s ease-out;
}

.tagline {
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
  animation: mtkFadeInUp 0.8s ease-out 0.1s both;
}

/* —— 声波 hero 视觉 —— */
.hero-visual {
  position: relative;
  margin: 4.5rem auto 0;
  width: min(560px, 80vw);
  height: 120px;
  animation: mtkFadeIn 1.2s ease-out 0.3s both;
}
.wave {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  /* 两端淡出，避免硬边 */
  mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
}
.bar {
  width: 2px;
  height: calc(var(--h) * 100%);
  border-radius: 2px;
  background: linear-gradient(
    180deg,
    var(--accent-glow) 0%,
    var(--accent) 60%,
    rgba(var(--mtk-accent-rgb), 0.25) 100%
  );
  transform-origin: center;
  will-change: transform, opacity;
  animation: mtkBar var(--dur, 1s) cubic-bezier(0.45, 0, 0.25, 1) var(--d, 0s)
    infinite alternate;
}
/* 中心光晕，让声波像在发光 */
.wave-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(
    40% 80% at 50% 50%,
    rgba(var(--mtk-accent-bright-rgb), 0.22),
    transparent 70%
  );
  filter: blur(14px);
  pointer-events: none;
}
/* 底部倒影分割线，呼应原本的细线 */
.hero-visual::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -1px;
  transform: translateX(-50%);
  width: 70%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-highlight), transparent);
}

@keyframes mtkBar {
  from { transform: scaleY(var(--lo, 0.4)); opacity: 0.55; }
  to   { transform: scaleY(1);              opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .bar { animation: none; }
}

.products {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background: var(--bg-glass);
  border: 1px solid var(--border-base);
  border-radius: var(--mtk-radius-lg);
  padding: 2rem;
  transition: all 0.3s var(--mtk-ease);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-decoration: none;
  animation: mtkFadeInUp 0.8s ease-out both;
}
.card:nth-child(1) { animation-delay: 0.2s; }
.card:nth-child(2) { animation-delay: 0.3s; }

.card:hover {
  transform: translateY(-2px);
  border-color: var(--border-highlight);
  background: var(--bg-glass-hover);
  box-shadow: var(--mtk-shadow-card);
}

/* 鼠标跟随光效 */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(var(--mtk-accent-rgb), 0.06),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.card:hover::before { opacity: 1; }

/* 顶部高光线 */
.card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.card:hover::after { opacity: 1; }

.card-header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}
.badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: var(--mtk-radius-pill);
  border: 1px solid var(--border-base);
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
}

.card-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.card-link {
  color: var(--text-primary);
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.2s;
  margin-top: auto;
}
.card:hover .card-link { opacity: 1; }
.card-link::after {
  content: '→';
  transition: transform 0.2s;
}
.card:hover .card-link::after { transform: translateX(3px); }

footer {
  margin-top: 6rem;
  padding: 3rem 0;
  text-align: center;
  color: #444;
  font-size: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

@keyframes mtkFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes mtkFadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .logo-text { font-size: 2.5rem; }
  .hero { padding-top: 8rem; }
}
</style>
