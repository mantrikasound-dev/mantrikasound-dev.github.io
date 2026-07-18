<script setup lang="ts">
// 博客首页卡片列表 —— 数据来自构建时的 blog.data.ts（自动扫描 docs/blog/*.md）
import { withBase } from 'vitepress'
import { data as posts } from '../blog.data'
</script>

<template>
  <div class="blog-index">
    <header class="blog-hero">
      <div class="blog-eyebrow">Notes &amp; Sediment</div>
      <h1 class="blog-hero-title">Reflect & Distill</h1>
      <p class="blog-hero-lede">
        Not quite tutorials, just casual notes on this system—waiting for time to weave them together.
      </p>
    </header>

    <ul class="blog-list">
      <li v-for="post in posts" :key="post.url" class="blog-card">
        <a :href="withBase(post.url)" class="blog-card-link">
          <div class="blog-card-meta">
            <span v-if="post.dateText" class="blog-card-date">{{ post.dateText }}</span>
            <span
              v-for="t in post.tags"
              :key="t"
              class="blog-card-tag"
            >{{ t }}</span>
          </div>
          <h2 class="blog-card-title">{{ post.title }}</h2>
          <p v-if="post.excerpt" class="blog-card-excerpt">{{ post.excerpt }}</p>
          <span class="blog-card-more">阅读 →</span>
        </a>
      </li>
    </ul>

    <p v-if="!posts.length" class="blog-empty">
      还没有文章。往 <code>docs/blog/</code> 扔一个 <code>.md</code> 就会出现在这里。
    </p>
  </div>
</template>

<style scoped>
.blog-index {
  max-width: 52rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
}

/* —— Hero —— */
.blog-hero {
  padding: 2.5rem 0 3rem;
  border-bottom: 1px solid var(--blog-line);
  margin-bottom: 2.5rem;
}
.blog-eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blog-sage);
  margin-bottom: 0.9rem;
}
.blog-hero-title {
  font-size: 2.6rem;
  font-weight: 720;
  letter-spacing: 0.04em;
  color: var(--blog-ink);
  line-height: 1.1;
  margin: 0 0 1rem;
}
.blog-hero-lede {
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--blog-ink-dim);
  max-width: 34rem;
  margin: 0;
}

/* —— 卡片列表 —— */
.blog-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.blog-card {
  border: 1px solid var(--blog-line);
  border-radius: var(--mtk-radius-lg);
  background: var(--blog-card);
  transition: border-color 0.22s var(--mtk-ease),
    background-color 0.22s var(--mtk-ease), transform 0.22s var(--mtk-ease);
}
.blog-card:hover {
  border-color: rgba(var(--blog-sage-rgb), 0.45);
  background: var(--blog-card-hi);
  transform: translateY(-2px);
}
.blog-card-link {
  display: block;
  padding: 1.5rem 1.7rem;
  text-decoration: none;
  color: inherit;
}

.blog-card-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.7rem;
}
.blog-card-date {
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: var(--blog-ink-faint);
  font-variant-numeric: tabular-nums;
}
.blog-card-tag {
  font-size: 0.72rem;
  padding: 0.12rem 0.6rem;
  border-radius: var(--mtk-radius-pill);
  background: rgba(var(--blog-sage-rgb), 0.12);
  color: var(--blog-sage-link);
  border: 1px solid rgba(var(--blog-sage-rgb), 0.2);
}

.blog-card-title {
  font-size: 1.28rem;
  font-weight: 640;
  letter-spacing: -0.01em;
  color: var(--blog-ink);
  margin: 0 0 0.55rem;
  line-height: 1.35;
  border: none;
  padding: 0;
}
.blog-card:hover .blog-card-title {
  color: #fff;
}
.blog-card-excerpt {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--blog-ink-dim);
  margin: 0 0 0.9rem;
}
.blog-card-more {
  font-size: 0.85rem;
  color: var(--blog-sage);
  opacity: 0.75;
  transition: opacity 0.2s;
}
.blog-card:hover .blog-card-more {
  opacity: 1;
}

.blog-empty {
  color: var(--blog-ink-dim);
  text-align: center;
  padding: 3rem 0;
}

@media (max-width: 640px) {
  .blog-hero-title {
    font-size: 2.1rem;
  }
  .blog-card-link {
    padding: 1.25rem 1.3rem;
  }
}
</style>
