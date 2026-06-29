<script setup lang="ts">
import { withBase } from 'vitepress'
import MtkBackdrop from './MtkBackdrop.vue'
import MtkNav from './MtkNav.vue'
import MtkFooter from './MtkFooter.vue'

const WIN_DL = 'https://github.com/mantrikasound-dev/mantrikatools-OfflineRender-Tool/releases/latest/download/MTKOfflineRender-win.zip'
const MAC_DL = 'https://github.com/mantrikasound-dev/mantrikatools-OfflineRender-Tool/releases/latest/download/MTKOfflineRender-mac.zip'
</script>

<template>
  <div class="mtk-page mtk-render">
    <MtkBackdrop />
    <MtkNav active="render" />

    <div class="container">
      <header class="header">
        <div class="eyebrow">Free Utility</div>
        <h1 class="title">MTK Offline Render</h1>
        <p class="lede">
          A fast, standalone batch render utility for REAPER — queue your projects,
          hit start, and walk away.
        </p>
        <div class="hero-actions">
          <a href="#download" class="cta primary">
            <svg viewBox="0 0 24 24" class="cta-ico"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Download
          </a>
          <a :href="withBase('/mtk-offline-render/guide')" class="cta ghost">Documentation</a>
        </div>
        <div class="meta-row">
          <span class="chip">Windows</span>
          <span class="chip">macOS</span>
          <span class="chip">No install</span>
        </div>
      </header>

      <section class="section">
        <p>
          Skip the manual grind of opening REAPER and configuring each project. This standalone tool
          leverages REAPER's native CLI tool for clean, centralized batch rendering—no plugins, no junk
          files, no history clutter.
        </p>
      </section>

      <section class="section">
        <h2 class="section-title">Installation — Windows</h2>
        <ul class="step-list">
          <li>Download the archive from the release channel.</li>
          <li>Extract to a directory of your choice (e.g., C:\Tools\MTK).</li>
          <li>Run the executable (MTK Offline Render.exe). No installation required.</li>
          <li>
            Windows SmartScreen may show a warning—this is normal for new, unsigned software. As a free
            tool, we're unable to afford a code signing certificate. Rest assured, the software is safe and
            verified on
            <a href="https://www.virustotal.com" target="_blank" rel="noopener" class="inline-link">VirusTotal</a>.
            Simply click "More info" → "Run anyway" to proceed.
          </li>
        </ul>
      </section>

      <section class="section">
        <h2 class="section-title">Installation — macOS</h2>
        <ul class="step-list">
          <li>Download and extract the archive.</li>
          <li>Double-click MTK Offline Render.app to run.</li>
          <li>
            On first launch, macOS will show an "unidentified developer" warning. To resolve:<br />
            <strong>Option A:</strong> Go to System Settings → Privacy &amp; Security → Click "Open Anyway".<br />
            <strong>Option B:</strong> Run in Terminal:
            <code class="inline-code">xattr -cr ~/Downloads/"MTK Offline Render.app"</code> (adjust path as needed).
          </li>
        </ul>
        <a :href="withBase('/mtk-offline-render/guide')" class="doc-link">View Documentation →</a>
      </section>

      <section id="download" class="section download-area">
        <div class="download-info">
          <h2>Get the app <span>Free for Windows &amp; macOS. No account, no install.</span></h2>
        </div>
        <div class="download-list">
          <div class="download-row">
            <div class="download-platform">
              <svg viewBox="0 0 24 24"><path d="M3 5.557l7.357-1.002v7.102H3V5.557zm0 12.886l7.357 1.002v-7.088H3v6.086zm8.143 1.124L22 21v-8.643h-10.857v7.21zm0-14.134v7.218H22V3l-10.857 1.433z" /></svg>
              Windows
            </div>
            <a :href="WIN_DL" class="download-btn">Download</a>
          </div>
          <div class="download-row">
            <div class="download-platform">
              <svg viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
              macOS
            </div>
            <a :href="MAC_DL" class="download-btn">Download</a>
          </div>
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

/* 顶部小标签：品牌色圆点 + 字母间距 */
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
  /* 渐变裁剪文字时给字底留白，避免字底被吃掉 */
  padding-bottom: 0.12em;
  background: linear-gradient(180deg, #fff, #888);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lede {
  max-width: 30rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* hero 主操作按钮 */
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
/* 标题前的品牌色短竖条 */
.section-title::before {
  content: '';
  width: 3px;
  height: 1.05em;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--accent-glow), var(--accent));
}
.section p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.inline-link { color: var(--accent); text-decoration: none; }
.inline-link:hover { text-decoration: underline; }
.inline-code {
  background: var(--mtk-w-10);
  padding: 2px 6px;
  border-radius: var(--mtk-radius-xs);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85em;
}

.download-area {
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
/* 卡片顶部品牌高光线 */
.download-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(var(--mtk-accent-bright-rgb), 0.4), transparent);
}

.download-info h2 {
  font-size: 1.15rem;
  font-weight: 650;
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 0.5rem;
}
.download-info h2 span {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--text-secondary);
}

.download-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.download-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-base);
}
.download-row:last-child { border-bottom: none; }

.download-platform {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-primary);
  font-size: 0.95rem;
}
.download-platform svg {
  width: 18px;
  height: 18px;
  fill: var(--text-secondary);
}

.download-btn {
  padding: 0.45rem 1.1rem;
  background: var(--mtk-w-10);
  border: 1px solid var(--border-base);
  border-radius: var(--mtk-radius-sm);
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s var(--mtk-ease);
}
.download-btn:hover {
  background: rgba(var(--mtk-accent-rgb), 0.22);
  border-color: rgba(var(--mtk-accent-bright-rgb), 0.5);
  color: #fff;
}

.step-list {
  list-style: none;
  border-left: 1px solid var(--border-base);
  padding-left: 1.5rem;
}
.step-list li {
  position: relative;
  padding-bottom: 1.5rem;
  color: var(--text-secondary);
}
.step-list li::before {
  content: '';
  position: absolute;
  left: -1.8rem;
  top: 6px;
  width: 9px;
  height: 9px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(var(--mtk-accent-rgb), 0.6),
    0 0 16px rgba(var(--mtk-accent-rgb), 0.3);
}
.step-list li:last-child { padding-bottom: 0; }

.doc-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: var(--accent);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}
.doc-link:hover { color: var(--text-primary); }

.back-link {
  display: inline-block;
  margin-top: 2rem;
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
  .download-area { grid-template-columns: 1fr; gap: 2rem; }
}
</style>
