// ============================================================
//  博客文章数据加载器（构建时执行）
//  ------------------------------------------------------------
//  扫描 docs/blog/*.md，读取每篇 frontmatter，生成按日期倒序的
//  文章列表。BlogIndex.vue 首页卡片列表直接消费它。
//  你以后只管往 docs/blog/ 扔 .md —— 列表自动更新，无需改配置。
// ============================================================
import { createContentLoader } from 'vitepress'

export interface BlogPost {
  url: string
  title: string
  date: string // 原始 YYYY-MM-DD
  dateText: string // 展示用（如 2026 · 07 · 18）
  excerpt: string
  tags: string[]
}

declare const data: BlogPost[]
export { data }

function fmtDate(raw?: string): string {
  if (!raw) return ''
  // 统一成 “YYYY · MM · DD”，小清新一点
  const m = String(raw).match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/)
  if (!m) return String(raw)
  const [, y, mo, d] = m
  return `${y} · ${mo.padStart(2, '0')} · ${d.padStart(2, '0')}`
}

export default createContentLoader('blog/*.md', {
  excerpt: true,
  transform(raw): BlogPost[] {
    return raw
      // 排除博客首页自身
      .filter((page) => page.url !== '/blog/' && page.url !== '/blog')
      .map((page) => {
        const fm = page.frontmatter
        return {
          url: page.url,
          title: fm.title ?? '未命名',
          date: fm.date ?? '',
          dateText: fmtDate(fm.date),
          // excerpt 优先用 frontmatter.excerpt，其次用正文首段（去 HTML 标签）
          excerpt:
            fm.excerpt ??
            (page.excerpt
              ? page.excerpt.replace(/<[^>]+>/g, '').trim().slice(0, 160)
              : ''),
          tags: Array.isArray(fm.tags) ? fm.tags : []
        }
      })
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  }
})
