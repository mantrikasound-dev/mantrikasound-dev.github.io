import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "MantrikaTools",
  description: "A REAPER plugin suite for game audio",

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // 构建时自动生成 sitemap.xml（覆盖落地页、详情页与全部文档）
  sitemap: {
    hostname: 'https://mantrikasound.com'
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Mantrika Tools', link: '/mantrika-tools' },
      { text: 'Guide', link: '/guide/quick-start' },
      { text: 'Workflow', link: '/workflow/adaptive-region' },
      { text: 'Functions', link: '/functions/auto-transient-detection' },
      { text: 'Action', link: '/action/group-item' },
      { text: 'Offline Render', link: '/mtk-offline-render' }
    ],

    // 按路径分区的侧边栏：插件套件一套，MTK Offline Render 一套，互不混。
    sidebar: {
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
            { text: 'Wwise Replace', link: '/functions/wwise-replace' }
            // 暂不收录：MTK Loudness Matcher → /functions/mtk-loudness-matcher
          ]
        },
        {
          text: 'Action',
          collapsed: false,
          items: [
            {
              text: '媒体操作',
              collapsed: true,
              items: [
                { text: 'Item 操作', link: '/action/group-item' },
                { text: 'Take 操作', link: '/action/group-take' },
                { text: 'Track 操作', link: '/action/group-track' },
                { text: 'Segment 分段', link: '/action/group-segment' },
                { text: 'FX 管理', link: '/action/group-fx' },
                { text: 'Automation Items', link: '/action/group-automation-items' }
              ]
            },
            {
              text: 'Assistants',
              collapsed: true,
              items: [
                { text: 'Mirror', link: '/action/group-mirror' },
                { text: 'DC 双击增强', link: '/action/group-assistants-dc' },
                { text: 'Adaptive · Create Folder', link: '/action/adaptive-create-folder' },
                { text: 'Adaptive · Insert Track', link: '/action/adaptive-insert-track' },
                { text: 'Create Folder From Tracks', link: '/action/create-folder-from-tracks' },
                { text: 'Dissolve Folder', link: '/action/dissolve-folder' },
                { text: 'Mark Regions For Adoption', link: '/action/mark-regions-for-adoption' },
                { text: 'Region Flow Bind', link: '/action/region-flow-bind' }
              ]
            },
            {
              text: '编辑与交互',
              collapsed: true,
              items: [
                { text: 'Under Mouse', link: '/action/group-under-mouse' },
                { text: 'Razor Eraser', link: '/action/group-razor-eraser' },
                { text: 'Playback Solo', link: '/action/group-playback-solo' },
                { text: 'Prune 修剪清场', link: '/action/group-prune' }
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
              text: '其他',
              collapsed: true,
              items: [
                { text: 'Qi Presets', link: '/action/group-qi-presets' },
                { text: 'Spectral Transition', link: '/action/process-spectral-transition' },
                { text: 'Internal Record', link: '/action/record-internal-from-items' },
                { text: 'Wwise Import', link: '/action/wwise-import-to-reaper' },
                { text: 'Envelope Display Mode', link: '/action/envelope-toggle-display-mode' },
                { text: 'Misc 杂项', link: '/action/group-misc' },
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

    // ---- 中文界面文案（以后切英文时可整段删除/改回默认）----
    outline: { label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '语言'
  }
})
