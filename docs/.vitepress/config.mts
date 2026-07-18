import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ============================================================
//  博客侧边栏自动生成
//  ------------------------------------------------------------
//  扫描 docs/blog/*.md（排除 index），轻量解析 frontmatter 的
//  title / date，按日期倒序列出。你只管扔 .md —— 侧栏自动更新。
//  （不引第三方，正则解析首个 --- 块即可满足 title/date 需求）
// ============================================================
function readFrontmatter(raw: string): Record<string, string> {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return {}
  const out: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/)
    if (kv) out[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, '')
  }
  return out
}

function getBlogSidebar() {
  const blogDir = fileURLToPath(new URL('../blog', import.meta.url))
  let files: string[] = []
  try {
    files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md') && f !== 'index.md')
  } catch {
    return []
  }
  const items = files
    .map((f) => {
      const fm = readFrontmatter(fs.readFileSync(path.join(blogDir, f), 'utf-8'))
      return {
        text: fm.title || f.replace(/\.md$/, ''),
        link: `/blog/${f.replace(/\.md$/, '')}`,
        date: fm.date || ''
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .map(({ text, link }) => ({ text, link }))

  return [
    {
      text: 'Blog',
      items: [{ text: '← 全部文章', link: '/blog/' }, ...items]
    }
  ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: "MantrikaTools",
  description: "A REAPER plugin suite for game audio",

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }]
  ],

  // 构建时自动生成 sitemap.xml（覆盖落地页、详情页与全部文档）
  sitemap: {
    hostname: 'https://mantrikasound.com'
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // 左上角品牌 Logo（显示在标题文字左侧）
    logo: '/mantrika_icon.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Mantrika Tools', link: '/mantrika-tools' },
      { text: 'Guide', link: '/guide/quick-start' },
      { text: 'Workflow', link: '/workflow/adaptive-region' },
      { text: 'Functions', link: '/functions/auto-transient-detection' },
      { text: 'Action', link: '/action/group-item' },
      { text: 'Offline Render', link: '/mtk-offline-render' },
      { text: 'Blog', link: '/blog/' }
    ],

    // 按路径分区的侧边栏：插件套件一套，MTK Offline Render 一套，博客一套，互不混。
    sidebar: {
      // 博客（自动生成，按日期倒序）
      '/blog/': getBlogSidebar(),

      // MTK Offline Render（独立产品）
      '/mtk-offline-render/': [
        {
          text: 'MTK Offline Render',
          collapsed: false,
          items: [
            { text: 'Overview & Download', link: '/mtk-offline-render' },
            { text: 'User Guide', link: '/mtk-offline-render/guide' }
          ]
        }
      ],

      // 插件套件（默认分区，兜底匹配）
      '/': [
        {
          text: 'Guide',
          collapsed: false,
          items: [
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Preferences', link: '/guide/preference' }
          ]
        },
        {
          text: 'Workflow',
          collapsed: false,
          items: [
            { text: 'Adaptive Regions', link: '/workflow/adaptive-region' },
            { text: 'Mirror', link: '/workflow/mirror-segment' }
          ]
        },
        {
          text: 'Functions',
          collapsed: false,
          items: [
            { text: 'Auto Transient Detection', link: '/functions/auto-transient-detection' },
            { text: 'Radial Menu', link: '/functions/radial-menu' },
            { text: 'FX Search', link: '/functions/fx-search' },
            { text: 'Item Hub', link: '/functions/item-hub' },
            { text: 'Loudness Meter', link: '/functions/loudness-meter' },
            { text: 'Loudness Analyze', link: '/functions/loudness-quick' },
            { text: 'Automation Item Controller', link: '/functions/automation-item-controller' },
            { text: 'Sample Broker', link: '/functions/sample-broker' },
            { text: 'Project Manager', link: '/functions/project-manager' },
            { text: 'Pro Scan', link: '/functions/pro-scan' },
            { text: 'Qi', link: '/functions/qi' },
            { text: 'Macro', link: '/functions/macro-control' },
            { text: 'Phase Aligner', link: '/functions/phase-aligner' },
            { text: 'Element Split', link: '/functions/element-split' },
            { text: 'Spectral Forge', link: '/functions/spectral-forge' },
            // TODO: Ling Sampler（待补文档后放开） link: '/functions/ling-sampler'
            { text: 'Simple Rename', link: '/functions/simple-rename' },
            { text: 'Advanced Rename', link: '/functions/advanced-rename' },
            { text: 'Render Queue', link: '/functions/render-queue' },
            { text: 'Quick Render', link: '/functions/quick-render' },
            { text: 'Action Automation', link: '/functions/action-automation' },
            { text: 'Wwise Replace', link: '/functions/wwise-replace' }
            // 暂不收录：MTK Loudness Matcher → /functions/mtk-loudness-matcher
          ]
        },
        {
          text: 'Action',
          collapsed: false,
          items: [
            {
              text: 'Media Operations',
              collapsed: true,
              items: [
                { text: 'Item Operations', link: '/action/group-item' },
                { text: 'Take Operations', link: '/action/group-take' },
                { text: 'Track Operations', link: '/action/group-track' },
                { text: 'Segment', link: '/action/group-segment' },
                { text: 'FX Management', link: '/action/group-fx' },
                { text: 'Automation Items', link: '/action/group-automation-items' }
              ]
            },
            {
              text: 'Assistants',
              collapsed: true,
              items: [
                { text: 'Mirror', link: '/action/group-mirror' },
                { text: 'DC Double-Click Enhancements', link: '/action/group-assistants-dc' },
                { text: 'Adaptive · Create Folder', link: '/action/adaptive-create-folder' },
                { text: 'Adaptive · Insert Track', link: '/action/adaptive-insert-track' },
                { text: 'Create Folder From Tracks', link: '/action/create-folder-from-tracks' },
                { text: 'Dissolve Folder', link: '/action/dissolve-folder' },
                { text: 'Mark Regions For Adoption', link: '/action/mark-regions-for-adoption' },
                { text: 'Region Flow Bind', link: '/action/region-flow-bind' }
              ]
            },
            {
              text: 'Editing & Interaction',
              collapsed: true,
              items: [
                { text: 'Under Mouse', link: '/action/group-under-mouse' },
                { text: 'Razor Eraser', link: '/action/group-razor-eraser' },
                { text: 'Playback Solo', link: '/action/group-playback-solo' },
                { text: 'Prune', link: '/action/group-prune' }
              ]
            },
            {
              text: 'Markers · Subproject',
              collapsed: true,
              items: [
                { text: 'Markers From Items', link: '/action/group-markers-create-from-items' },
                { text: 'Subproject', link: '/action/group-subproject' }
              ]
            },
            {
              text: 'Others',
              collapsed: true,
              items: [
                { text: 'Qi Presets', link: '/action/group-qi-presets' },
                { text: 'Spectral Transition', link: '/action/process-spectral-transition' },
                { text: 'Internal Record', link: '/action/record-internal-from-items' },
                { text: 'Wwise Import', link: '/action/wwise-import-to-reaper' },
                { text: 'Envelope Display Mode', link: '/action/envelope-toggle-display-mode' },
                { text: 'Misc', link: '/action/group-misc' },
                { text: 'Check for Updates', link: '/action/check-for-updates' }
              ]
            }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mantrikasound-dev' }
    ],

    outline: { label: 'On this page' }
  }
})
