import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './mtk.css'

// 扩展默认主题：文档页用 VitePress 默认外观，
// 自定义 layout（landing / offline-render）走品牌深色页面。
export default {
  extends: DefaultTheme,
  Layout
} satisfies Theme
