import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import NotFound from './components/NotFound.vue'
import BlogIndex from './components/BlogIndex.vue'
// 自托管 Inter（variable，覆盖全字重）—— 西文 UI 字体，CJK 仍走系统兜底
import '@fontsource-variable/inter'
import './tokens.css' // 设计 token（必须最先：mtk.css / docs.css 都引用它）
import './mtk.css'
import './docs.css'
import './blog.css' // 博客换肤（暖灰 + 鼠尾草绿），作用域限定 .blog-post

// 扩展默认主题：文档页用 VitePress 默认外观，
// 自定义 layout（landing / offline-render）走品牌深色页面，
// 404 用品牌化页面替换原装。
export default {
  extends: DefaultTheme,
  Layout,
  NotFound,
  enhanceApp({ app }) {
    // 全局注册，供 docs/blog/index.md 在正文里直接用 <BlogIndex />
    app.component('BlogIndex', BlogIndex)
  }
} satisfies Theme
