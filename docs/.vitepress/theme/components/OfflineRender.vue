<script setup lang="ts">
import { withBase } from 'vitepress'
import MtkBackdrop from './MtkBackdrop.vue'
import MtkNav from './MtkNav.vue'

const WIN_DL = 'https://github.com/mantrikasound-dev/mantrikatools-OfflineRender-Tool/releases/latest/download/MTKOfflineRender-win.zip'
const MAC_DL = 'https://github.com/mantrikasound-dev/mantrikatools-OfflineRender-Tool/releases/latest/download/MTKOfflineRender-mac.zip'
const DOC_URL = 'https://github.com/mantrikasound-dev/mantrikatools-OfflineRender-Tool/blob/main/docs/USER_GUIDE.md'
</script>

<template>
  <div class="mtk-page mtk-render">
    <MtkBackdrop />
    <MtkNav active="render" />

    <div class="container">
      <header class="header">
        <h1 class="title">MTK Offline Render</h1>
        <div class="meta-row">
          <span>Windows &amp; macOS</span>
          <span>Free Utility</span>
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
        <a :href="DOC_URL" target="_blank" rel="noopener" class="doc-link">View Documentation →</a>
      </section>

      <section class="section download-area">
        <div class="download-info">
          <h2>MTK Offline Render. <span>A fast batch export utility for REAPER.</span></h2>
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

    <footer>© 2026 Mantrika Sound</footer>
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
  margin-bottom: 4rem;
  animation: mtkFadeInUp 0.8s ease-out;
}

.title {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  /* 渐变裁剪文字时给字底留白，避免字底被吃掉 */
  padding-bottom: 0.12em;
  background: linear-gradient(180deg, #fff, #666);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.meta-row {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  align-items: center;
}

.section {
  margin-bottom: 3.5rem;
  animation: mtkFadeInUp 0.8s ease-out both;
}
.section:nth-of-type(1) { animation-delay: 0.1s; }
.section:nth-of-type(2) { animation-delay: 0.2s; }
.section:nth-of-type(3) { animation-delay: 0.3s; }

.section-title {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 500;
}
.section p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.inline-link { color: var(--accent); text-decoration: none; }
.inline-link:hover { text-decoration: underline; }
.inline-code {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85em;
}

.download-area {
  border-top: 1px solid var(--border-base);
  border-bottom: 1px solid var(--border-base);
  padding: 3rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  margin-bottom: 0;
}

.download-info { padding-top: 0.4rem; }
.download-info h2 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.download-info h2 span { font-weight: 400; color: var(--text-secondary); }

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
  padding: 0.4rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-base);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.2s;
}
.download-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--border-highlight);
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
  box-shadow: 0 0 8px rgba(94, 106, 210, 0.6), 0 0 16px rgba(94, 106, 210, 0.3);
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

footer {
  text-align: center;
  padding: 4rem 0;
  color: #333;
  font-size: 0.8rem;
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
  .download-area { grid-template-columns: 1fr; gap: 2rem; }
}
</style>
