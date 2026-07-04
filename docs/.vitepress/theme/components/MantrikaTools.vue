<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'
import MtkBackdrop from './MtkBackdrop.vue'
import MtkNav from './MtkNav.vue'
import MtkFooter from './MtkFooter.vue'

// Paddle Overlay Checkout 配置。两个值都填好后，购买按钮自动启用：
// - PADDLE_CLIENT_TOKEN：后台 Developer tools → Authentication → Client-side tokens。
//   sandbox 的 token 以 test_ 开头、live 以 live_ 开头，代码按前缀自动切环境。
// - PADDLE_PRICE_ID：后台 Catalog → Products → 价格条目的 ID，以 pri_ 开头。
// 两者都留空时按钮显示为「即将发布」的占位状态。
const PRICE = '$149'
const PADDLE_CLIENT_TOKEN = 'live_a4123d3b2ba7c6a36d1097078a4'
const PADDLE_PRICE_ID = 'pri_01kwcsv54v902sb5j1cqdx1ej7'

const buyEnabled = Boolean(PADDLE_CLIENT_TOKEN && PADDLE_PRICE_ID)
const paddleReady = ref(false)

// 本页同时是 Paddle 的 default payment link：Paddle.js 加载后，
// 邮件里带 ?_ptxn= 参数的链接打开本页会自动弹出对应交易的结账窗口。
onMounted(() => {
  if (!buyEnabled) return
  const script = document.createElement('script')
  script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js'
  script.async = true
  script.onload = () => {
    const Paddle = (window as any).Paddle
    if (!Paddle) return
    if (PADDLE_CLIENT_TOKEN.startsWith('test_')) Paddle.Environment.set('sandbox')
    Paddle.Initialize({ token: PADDLE_CLIENT_TOKEN })
    paddleReady.value = true
  }
  document.head.appendChild(script)
})

function openCheckout() {
  if (!paddleReady.value) return
  ;(window as any).Paddle.Checkout.open({
    items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }]
  })
}

// 详情页 —— 功能分类与侧边栏真实结构一致。
const features = [
  {
    name: 'Workflow',
    desc: 'Region-driven, adaptive editing flows like Adaptive Regions and Mirror that keep large sessions in sync as you cut.',
    link: '/workflow/adaptive-region'
  },
  {
    name: 'Functions',
    desc: 'A growing toolkit: transient detection, radial menus, FX search, loudness metering, phase alignment, spectral editing and more.',
    link: '/functions/auto-transient-detection'
  },
  {
    name: 'Actions',
    desc: 'Dozens of focused actions for items, takes, tracks, markers, subprojects and razor edits — wired for muscle memory.',
    link: '/action/group-item'
  }
]

const docLinks = [
  { text: 'Quick Start', link: '/guide/quick-start' },
  { text: 'Workflow', link: '/workflow/adaptive-region' },
  { text: 'Functions', link: '/functions/auto-transient-detection' },
  { text: 'Actions', link: '/action/group-item' }
]
</script>

<template>
  <div class="mtk-page mtk-tools">
    <MtkBackdrop />
    <MtkNav active="tools" />

    <div class="container">
      <header class="header">
        <div class="eyebrow">REAPER Extension</div>
        <h1 class="title">Mantrika Tools</h1>
        <p class="lede">
          A self-contained REAPER extension that streamlines sound design workflows —
          no external scripts, libraries, or dependencies. Just install and go.
        </p>
        <div class="hero-actions">
          <button
            v-if="buyEnabled"
            type="button"
            class="cta primary"
            :disabled="!paddleReady"
            @click="openCheckout"
          >
            Buy now — {{ PRICE }}
          </button>
          <button v-else type="button" class="cta primary buy-soon" disabled>
            Buy — {{ PRICE }} · Coming soon
          </button>
          <a :href="withBase('/guide/quick-start')" class="cta ghost">
            <svg viewBox="0 0 24 24" class="cta-ico"><path d="M4 5h11a3 3 0 013 3v11a2 2 0 00-2-2H4V5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M20 5H9a3 3 0 00-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"/></svg>
            Read the Docs
          </a>
        </div>
        <p class="price-note">
          One-time purchase. Secure checkout {{ buyEnabled ? 'powered' : 'will be powered' }} by
          <a href="https://www.paddle.com" target="_blank" rel="noopener">Paddle</a>.
        </p>
        <div class="meta-row">
          <span class="chip">REAPER Extension</span>
          <span class="chip">Zero dependencies</span>
          <span class="chip">High performance</span>
          <span v-if="!buyEnabled" class="chip chip-soon">Coming Soon</span>
        </div>
      </header>

      <section class="section">
        <p>
          Mantrika Tools is a native REAPER extension built for game audio and sound
          design. It bundles workflow enhancements, creative utilities, and a deep
          catalog of actions into a single package that installs cleanly via ReaPack —
          with nothing else to configure.
        </p>
      </section>

      <section class="section">
        <h2 class="section-title">What's inside</h2>
        <div class="feature-grid">
          <a
            v-for="f in features"
            :key="f.name"
            :href="withBase(f.link)"
            class="feature"
          >
            <h3 class="feature-name">{{ f.name }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
            <span class="feature-link">Explore</span>
          </a>
        </div>
      </section>

      <section id="docs" class="section doc-area">
        <div class="doc-info">
          <h2>Start with the documentation <span>Installation, guides, and a reference for every tool. Your license key and download link are delivered by email after purchase.</span></h2>
        </div>
        <div class="doc-list">
          <a
            v-for="d in docLinks"
            :key="d.link"
            :href="withBase(d.link)"
            class="doc-row"
          >
            <span class="doc-row-text">{{ d.text }}</span>
            <span class="doc-row-arrow">→</span>
          </a>
        </div>
      </section>

      <a :href="withBase('/')" class="back-link">← Back to Home</a>
    </div>

    <MtkFooter />
  </div>
</template>

<style scoped>
.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  position: relative;
}

.header {
  margin-bottom: 4.5rem;
  animation: mtkFadeInUp 0.8s ease-out;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-glow);
  margin-bottom: 1.1rem;
}
.eyebrow::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-glow);
  box-shadow: 0 0 10px rgba(var(--mtk-accent-bright-rgb), 0.8);
}

.title {
  font-size: clamp(2.5rem, 6vw, 3.4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.1rem;
  padding-bottom: 0.12em;
  background: linear-gradient(180deg, #fff, #888);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lede {
  max-width: 32rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  border-radius: var(--mtk-radius);
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.25s var(--mtk-ease);
}
.cta-ico { width: 17px; height: 17px; }
.cta.primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 10px 28px -10px var(--glow-primary);
}
.cta.primary:hover {
  background: var(--accent-glow);
  transform: translateY(-2px);
  box-shadow: 0 14px 34px -10px rgba(var(--mtk-accent-bright-rgb), 0.45);
}
.cta.ghost {
  border-color: var(--border-base);
  background: var(--bg-glass);
  color: var(--text-primary);
}
.cta.ghost:hover {
  border-color: var(--border-highlight);
  background: var(--bg-glass-hover);
  transform: translateY(-2px);
}
/* 占位购买按钮：售价已定、链接未接入时的「即将发布」状态 */
.cta.buy-soon {
  cursor: not-allowed;
  background: var(--bg-glass);
  color: var(--text-primary);
  border-color: rgba(var(--mtk-accent-rgb), 0.4);
  box-shadow: none;
  font-family: inherit;
}
.cta.buy-soon:hover { transform: none; }

.price-note {
  margin: 0 0 2rem;
  font-size: 0.82rem;
  color: var(--text-secondary);
}
.price-note a {
  color: var(--accent-glow);
  text-decoration: none;
}
.price-note a:hover { text-decoration: underline; }

.meta-row {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
}
.chip {
  font-size: 0.74rem;
  color: var(--text-secondary);
  padding: 0.28rem 0.7rem;
  border: 1px solid var(--border-base);
  border-radius: var(--mtk-radius-pill);
  background: var(--mtk-w-03);
}
.chip-soon {
  color: rgb(var(--mtk-accent-rgb));
  border-color: rgba(var(--mtk-accent-rgb), 0.4);
  background: rgba(var(--mtk-accent-rgb), 0.08);
}

.section {
  margin-bottom: 3.5rem;
  animation: mtkFadeInUp 0.8s ease-out both;
}
.section:nth-of-type(1) { animation-delay: 0.1s; }
.section:nth-of-type(2) { animation-delay: 0.2s; }
.section:nth-of-type(3) { animation-delay: 0.3s; }

.section-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.05rem;
  color: var(--text-primary);
  margin-bottom: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.section-title::before {
  content: '';
  width: 3px;
  height: 1.05em;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--accent-glow), var(--accent));
}

.section p {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.7;
}

/* —— 功能卡片网格 —— */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
.feature {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.4rem;
  border: 1px solid var(--border-base);
  border-radius: var(--mtk-radius-lg);
  background: var(--bg-glass);
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s var(--mtk-ease);
}
.feature::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(var(--mtk-accent-bright-rgb), 0.4), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.feature:hover {
  transform: translateY(-2px);
  border-color: var(--border-highlight);
  background: var(--bg-glass-hover);
  box-shadow: var(--mtk-shadow-card);
}
.feature:hover::after { opacity: 1; }

.feature-name {
  font-size: 1rem;
  font-weight: 650;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.feature-desc {
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
}
.feature-link {
  margin-top: auto;
  font-size: 0.82rem;
  color: var(--accent-glow);
  opacity: 0.85;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.feature-link::after {
  content: '→';
  transition: transform 0.2s;
}
.feature:hover .feature-link { opacity: 1; }
.feature:hover .feature-link::after { transform: translateX(3px); }

/* —— 文档 CTA 卡片（替代下载卡片）—— */
.doc-area {
  border: 1px solid var(--border-base);
  border-radius: var(--mtk-radius-lg);
  background: var(--bg-glass);
  padding: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 0;
  position: relative;
  overflow: hidden;
}
.doc-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(var(--mtk-accent-bright-rgb), 0.4), transparent);
}
.doc-info h2 {
  font-size: 1.15rem;
  font-weight: 650;
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 0.5rem;
}
.doc-info h2 span {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--text-secondary);
}

.doc-list {
  display: flex;
  flex-direction: column;
}
.doc-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-base);
  text-decoration: none;
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: color 0.2s, padding 0.2s var(--mtk-ease);
}
.doc-row:last-child { border-bottom: none; }
.doc-row-arrow {
  color: var(--text-secondary);
  transition: transform 0.2s var(--mtk-ease), color 0.2s;
}
.doc-row:hover { color: var(--accent-glow); padding-left: 0.3rem; }
.doc-row:hover .doc-row-arrow { transform: translateX(3px); color: var(--accent-glow); }

.back-link {
  display: inline-block;
  margin-top: 2.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
  animation: mtkFadeIn 0.8s ease-out 0.4s both;
}
.back-link:hover { color: var(--text-primary); }

@keyframes mtkFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes mtkFadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .doc-area { grid-template-columns: 1fr; gap: 2rem; }
}
</style>
