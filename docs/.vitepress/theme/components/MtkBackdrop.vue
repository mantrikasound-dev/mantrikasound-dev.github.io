<script setup lang="ts">
// 落地页 / 详情页共享的背景层：纯色底 + 网格 + 噪点 + 顶部光晕。
// 全部 fixed + 负 z-index，铺在内容之后；噪点在最上层做半透明叠加。
</script>

<template>
  <div class="mtk-bg-base"></div>
  <div class="grid-bg"></div>
  <div class="ambient-light"></div>
  <svg class="noise" width="100%" height="100%">
    <filter id="mtkNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#mtkNoise)" />
  </svg>
</template>

<style scoped>
.mtk-bg-base {
  position: fixed;
  inset: 0;
  background: var(--bg-root);
  z-index: -3;
  pointer-events: none;
}

.grid-bg {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%);
  pointer-events: none;
  z-index: -2;
}

.ambient-light {
  position: fixed;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: min(1600px, 130vw);
  height: 1300px;
  background: radial-gradient(50% 60% at 50% 38%, rgba(90, 100, 250, 0.12) 0%, transparent 100%);
  filter: blur(90px);
  z-index: -1;
  pointer-events: none;
}

.noise {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.035;
}
</style>
