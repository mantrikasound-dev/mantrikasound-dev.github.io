import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import NotFound from './components/NotFound.vue'
// 自托管 Inter（variable，覆盖全字重）—— 西文 UI 字体，CJK 仍走系统兜底
import '@fontsource-variable/inter'
import './tokens.css' // 设计 token（必须最先：mtk.css / docs.css 都引用它）
import './mtk.css'
import './docs.css'

// 扩展默认主题：文档页用 VitePress 默认外观，
// 自定义 layout（landing / offline-render）走品牌深色页面，
// 404 用品牌化页面替换原装。
export default {
  extends: DefaultTheme,
  Layout,
  NotFound
} satisfies Theme
