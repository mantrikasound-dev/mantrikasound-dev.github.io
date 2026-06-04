<script setup lang="ts">
/*
  Hero 声波视觉 —— canvas 绘制的「频谱条」。
  关键点：每根条的高度由多条不同频率 / 速度的行波叠加而成，
  整体轮廓会持续流动、变形、永不重复，而不是固定钟形里各自上下跳。
*/
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let cssW = 0
let cssH = 0

// 读取品牌色（带兜底，SSR / 取不到时也不崩）
function readColors() {
  const s = getComputedStyle(document.documentElement)
  const base = s.getPropertyValue('--mtk-accent-rgb').trim() || '94, 106, 226'
  const bright = s.getPropertyValue('--mtk-accent-bright-rgb').trim() || '122, 133, 255'
  return { base, bright }
}
let colors = { base: '94, 106, 226', bright: '122, 133, 255' }

function resize() {
  const el = canvas.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  cssW = rect.width
  cssH = rect.height
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.round(cssW * dpr)
  el.height = Math.round(cssH * dpr)
  ctx = el.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

// 多条行波叠加 → 准周期、非重复的有机电平（每个频段都在跳）
function levelAt(x: number, t: number) {
  const w =
    0.55 * Math.sin(x * 5.7 - t * 2.1) +
    0.30 * Math.sin(x * 11.3 + t * 1.5 + 1.3) +
    0.18 * Math.sin(x * 19.1 - t * 3.4 + 2.1) +
    0.12 * Math.sin(x * 31.0 + t * 4.6)
  // 归一到 0..1
  const n = (w / 1.15 + 1) / 2
  return Math.max(0, Math.min(1, n))
}

// —— 老式频谱表参数 —— //
const COLS = 38           // 频段（柱）数
const SEGS = 15           // 每柱的 LED 段数
const COL_GAP = 0.34      // 柱间距占比
const SEG_GAP = 0.30      // 段间距占比
const PEAK_FALL = 0.004   // 峰值点每帧回落速度（越小停越久）

// 峰值保持状态（每柱一个，跨帧保留）
let peaks: number[] = []

// 颜色：随高度从主色渐变到高亮，顶部最「烫」
function segColor(ratio: number, alpha: number) {
  const r1 = colors.base.split(',').map((v) => parseFloat(v))
  const r2 = colors.bright.split(',').map((v) => parseFloat(v))
  const k = ratio * ratio // 越往上越偏高亮
  const r = Math.round(r1[0] + (r2[0] - r1[0]) * k)
  const g = Math.round(r1[1] + (r2[1] - r1[1]) * k)
  const b = Math.round(r1[2] + (r2[2] - r1[2]) * k)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function draw(time: number) {
  if (!ctx) return
  const t = time / 1000
  ctx.clearRect(0, 0, cssW, cssH)

  if (peaks.length !== COLS) peaks = new Array(COLS).fill(0)

  const baseline = cssH - 1            // 柱子从底部往上长
  const usableH = cssH * 0.94
  const colCell = cssW / COLS
  const colW = colCell * (1 - COL_GAP)
  const segCell = usableH / SEGS
  const segH = segCell * (1 - SEG_GAP)
  const radius = Math.min(colW / 2, 1.5)

  for (let c = 0; c < COLS; c++) {
    const x = c / (COLS - 1) // 0..1
    const win = Math.pow(Math.sin(Math.PI * x), 0.35) // 两端略矮，中段更满
    const level = Math.min(1, levelAt(x, t) * win + 0.04)
    const litExact = level * SEGS
    const lit = Math.ceil(litExact)
    const colX = c * colCell + (colCell - colW) / 2

    // 峰值保持：取当前与回落后的较大值
    peaks[c] = Math.max(peaks[c] - PEAK_FALL, level)
    const peakSeg = Math.min(SEGS - 1, Math.round(peaks[c] * SEGS - 0.5))

    for (let s = 0; s < SEGS; s++) {
      const ratio = s / (SEGS - 1)
      const segBottom = baseline - s * segCell
      const y = segBottom - segH
      const on = s < lit

      ctx.beginPath()
      roundedRect(colX, y, colW, segH, radius)
      if (on) {
        // 点亮的段：随高度变亮 + 辉光
        ctx.shadowColor = segColor(ratio, 0.6)
        ctx.shadowBlur = 4 + ratio * 8
        ctx.fillStyle = segColor(ratio, 0.92)
      } else {
        // 熄灭的段：极淡的「暗 LED」底
        ctx.shadowBlur = 0
        ctx.fillStyle = `rgba(${colors.base}, 0.06)`
      }
      ctx.fill()
    }

    // 峰值保持点：悬在顶上、缓慢回落的一格
    if (peakSeg >= lit - 1 && peaks[c] > 0.05) {
      const segBottom = baseline - peakSeg * segCell
      const y = segBottom - segH
      ctx.beginPath()
      roundedRect(colX, y, colW, segH, radius)
      ctx.shadowColor = `rgba(${colors.bright}, 0.9)`
      ctx.shadowBlur = 10
      ctx.fillStyle = `rgba(${colors.bright}, 0.95)`
      ctx.fill()
    }
  }
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1

  raf = requestAnimationFrame(draw)
}

function roundedRect(x: number, y: number, w: number, h: number, r: number) {
  if (!ctx) return
  const rr = Math.min(r, w / 2, h / 2)
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
}

// 静态一帧（用于 prefers-reduced-motion）
function drawStatic() {
  draw(0)
  cancelAnimationFrame(raf)
}

let onResize: () => void
onMounted(() => {
  colors = readColors()
  resize()
  onResize = () => resize()
  window.addEventListener('resize', onResize)

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) drawStatic()
  else raf = requestAnimationFrame(draw)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  if (onResize) window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div class="hero-visual" aria-hidden="true">
    <canvas ref="canvas" class="wave-canvas"></canvas>
    <div class="wave-glow"></div>
  </div>
</template>

<style scoped>
.hero-visual {
  position: relative;
  margin: 4.5rem auto 0;
  width: min(560px, 80vw);
  height: 130px;
  animation: mtkFadeIn 1.2s ease-out 0.3s both;
}
.wave-canvas {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  /* 两端淡出，避免硬边 */
  mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
}
/* 中心光晕，让声波像在发光 */
.wave-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(
    55% 80% at 50% 80%,
    rgba(var(--mtk-accent-bright-rgb), 0.18),
    transparent 72%
  );
  filter: blur(16px);
  pointer-events: none;
}
/* 底部分割线，呼应原本的细线 */
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

@keyframes mtkFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
