# Project Manager

---

## 1. 概述

**Project Manager** 是 Mantrika Tools 的Reaper工程管理工具，把分散在 REAPER 历史记录、磁盘各处的工程文件、自己整理的虚拟分类、收藏等等，统一在一个窗口里管理。可以快速搜索、打开、整理、备份你的所有 REAPER 工程。

**主要能力**：

- 📜 **历史记录**：自动读 REAPER 的最近工程列表（最多 200 条）
- 🔍 **磁盘扫描**：自定义扫描根目录，递归找出所有 `.rpp` 文件
- ⭐ **收藏夹**：把常用工程标星，单独成组
- 📁 **虚拟文件夹**：在不改变磁盘结构的前提下，把工程按你自己的逻辑分组（支持 3 级嵌套、拖拽归类、颜色标签）
- 📝 **项目备注**：给任何工程加注释
- 💾 **批量备份**：把工程 + 媒体文件 + 子工程一起打包到目标目录（自动整理路径）
- 🌐 **跨电脑迁移**：把配置 JSON 拷到新机器后，自动修复失效路径
- 🆕 **新建工程**：直接新建空白工程，或基于模板创建
- 🎚️ **FX Offline 模式**：打开工程时让所有 FX 处于离线状态（适合"先打开再修"的场景）

---

## 2. 打开方式

菜单入口：

```
Extensions → MantrikaTools → Project manager
```

或在 Action List 搜：

| Action 名称 | 用途 |
| --- | --- |
| **`mantrika : Synergy - Project Manager`** | 打开 / 关闭 Project Manager 窗口 |

---

## 3. 界面总览

![project manager](../assets/functions/project-manager-01.png)

四大区域：

| 区域 | 内容 |
|---|---|
| **顶部工具栏** | New Project / Search / Backup / Refresh / Advanced 菜单 |
| **左侧侧边栏** | 导航列表 + Virtual Folders 文件夹列表 + 文件夹操作按钮 + FX Offline 开关 |
| **主区域顶部** | 当前位置标题 / 返回上一级按钮 / Open in Tab / Show in Folder |
| **主区域表格** | 项目列表（可多选、可排序、可拖拽到虚拟文件夹） |

---

## 4. 顶部工具栏

### 4.1 New Project（分裂按钮）

蓝色按钮，左半为主按钮、右半为下拉箭头 ▼：

![project manager](../assets/functions/project-manager-02.png)

- **点击NewProject**：直接新建一个空白 REAPER 工程
- **点击 ▼**：弹出 **Template** 对话框，从 `ProjectTemplates` 文件夹列出所有 `.rpp` 模板，选一个并点 **Create** 即基于该模板新建工程

![project manager](../assets/functions/project-manager-03.png)

> 💡 想往模板库里加自己的模板？把 `.rpp` 文件丢到 REAPER 资源路径下的 `ProjectTemplates\` 文件夹即可，PM 下次打开下拉就能看到。

### 4.2 Search（搜索框）

![project manager](../assets/functions/project-manager-04.png)

中间空旷的输入框，占位提示 "Search projects..."：

- **输入即时搜索**——每按一个键都会实时过滤
- 搜索范围 = 所有视图的项目（历史 + 扫描）
- 支持模糊匹配，多个关键词用空格分隔
- 清空搜索框 = 回到 History Projects 视图

### 4.3 Backup（备份按钮）

![project manager](../assets/functions/project-manager-05.png)

把当前 **选中的项目** 备份到目标目录。详见 §9 项目备份。

### 4.4 Refresh（刷新按钮）

强制重新扫描 REAPER 历史记录（无视缓存）+ 重新检测所有项目的存在性 / 修改时间。

![project manager](../assets/functions/project-manager-06.png)

> ⚠️ **Refresh 只刷新 REAPER 历史 + 状态**——**不会扫描磁盘**。要发现新增的本地工程，请到 **Advanced → Manage Scan Paths** 重新扫描。

### 4.5 Advanced 设置菜单 ☰

![project manager](../assets/functions/project-manager-07.png)

打开高级菜单，详见 §13。

---

## 5. 左侧导航

### 5.1 顶部固定三项

![project manager](../assets/functions/project-manager-08.png)

| 项 | 含义 |
|---|---|
| **Scanned Projects (N)** | 你配置的扫描路径下找到的所有工程 |
| **History Projects (N)** | REAPER 自身的最近工程列表（最多 200 条） |
| **Favorites (N)** | 标星的工程 |

括号里的数字是当前过滤条件下的项目数（受 Show Deleted / Show Subprojects / Hide Excluded 影响）。

### 5.2 Virtual Folders（虚拟文件夹）区

下面是 **Virtual Folders** 标题栏 + 它管辖的所有文件夹列表。

**标题条行为**：

![project manager](../assets/functions/project-manager-10.png)

![project manager](../assets/functions/project-manager-09.png)

- 左侧 **▶ / ▼ 箭头**：单击展开 / 折叠下面的文件夹列表
- 主体文字：单击 = 跳到 Virtual Folders 根视图（在右侧主区域以卡片形式列出所有顶层文件夹）
- 右键 = 同时展开第一层文件夹并跳到根视图

### 5.3 文件夹

![project manager](../assets/functions/project-manager-11.png)

- **三级嵌套**：最多 3 级（达到上限后 New 按钮会禁用）
- **颜色标签**：每个顶层文件夹按创建顺序自动分配调色板颜色（12 色循环），子文件夹继承父颜色——便于快速辨认
- **数字徽章**：每个文件夹后括号显示包含的项目数
- **单击文件夹** = 切换到该文件夹视图

### 5.4 New / Rename / Delete 按钮

侧边栏中部三个文件夹操作按钮（**仅在 Virtual Folders 视图下出现**）：

![project manager](../assets/functions/project-manager-12.png)

| 按钮 | 行为 |
|---|---|
| **New** | 弹输入框输入名称 → 创建新文件夹。若当前选中了文件夹则作为父文件夹，否则建顶层 |
| **Rename** | 重命名当前选中的文件夹 |
| **Delete** | 删除当前选中的文件夹（**会弹二次确认**，确认后跳回 History） |

> ⚠️ 点 Delete 后会弹一个确认对话框，写明要删的文件夹名 + 是否含子文件夹/项目；默认按钮是 Cancel，按 Esc 或 Enter 都是取消，**只有明确点 Delete 按钮**才真的执行。文件夹被删后，里面的项目并不会从磁盘消失——只是不再属于该虚拟分类。

### 5.5 FX Offline 开关

侧边栏最底部的复选框：

![project manager](../assets/functions/project-manager-13.png)

- **勾选** → 之后所有"打开工程"的操作（打开过程中，建议**不要操控键盘**）会让 REAPER **加载工程时把所有 FX 设为离线**
- **取消勾选** → 正常打开

> 💡 **使用场景**：工程使用了大量重 CPU 的 FX / 第三方插件不在身上，先把工程开起来再决定要载入哪些 FX。

### 5.6 主区域顶部行（当前位置 / 返回按钮）

主区域顶部一行显示你目前在看哪个视图：

![project manager](../assets/functions/project-manager-14.png)

- **← 返回按钮**：仅在子文件夹视图下出现，点它回到上一级
- **当前位置标题**：粗体显示当前所在文件夹的名字 + 项目数，例如 "客户A (12)"
- **Open in Tab** / **Show in Folder**：右侧的快捷按钮，对当前选中项生效

---

## 6. 项目列表（主表格）

### 6.1 列定义

![project manager](../assets/functions/project-manager-15.png)

| 列               | 含义        | 默认显示       |
|-----------------|-----------|------------|
| **★**           | 收藏星（点击切换） | 总是         |
| **Name**        | 项目名（无扩展名） | 总是         |
| **Path**        | 完整文件路径    | 是（可隐藏）     |
| **Modified**    | 最后修改时间    | 是（可隐藏）     |
| **Note**        | 项目备注      | 是（可隐藏）     |
| **Deleted**     | 被删除的工程    | 默认不显示（可隐藏） |
| **Subprojects** | 子工程       | 默认不显示（可隐藏）     |

可隐藏的三列通过 **Advanced 菜单** 切换显示。

![project manager](../assets/functions/project-manager-17.png)

![project manager](../assets/functions/project-manager-16.png)

**视觉编码**：

- ⭐ 黄星 = 已收藏；☆ 灰星 = 未收藏
- `[Sub]` 绿色前缀 = 子工程（有 `.rpp-PROX` 文件）
- `[X]` 红色前缀 + 灰字 + 删除线 = 磁盘上文件已不存在（默认隐藏，开 Show Deleted 才显示）
- 📁 蓝色文件夹图标 = 虚拟文件夹（在 Virtual Folders 根视图中出现）
- 悬停行 = 深灰高亮；选中行 = 蓝色高亮

### 6.2 选择行为

| 操作 | 行为 |
|---|---|
| 单击 | 仅选中本行（清除其它选择） |
| **Ctrl** / **Cmd** + 单击 | 切换该行选中（多选） |
| **Shift** + 单击 | 选区扩展（从上次选中到当前） |
| 双击项目 | **打开该工程** |
| 双击文件夹 | 进入该文件夹视图 |
| 右键 | 弹出右键菜单（详见 §7） |

> ⚠️ 双击打开工程后 1 秒内的重复双击会被忽略（防止快速点两下意外打开两次）。

### 6.3 排序

点击任意列头切换排序方向（升序 ↔ 降序）

### 6.4 列宽

拖动列分隔线调整列宽，**列宽会自动持久化**到用户配置中——重启 PM 仍然是你调过的样子。第一次手动调过后，PM 不再自动按可见列数重新分配宽度（完全尊重你的设置）。

### 6.5 拖拽到虚拟文件夹

按住选中行往左侧 Virtual Folders 区拖：

- 拖拽时鼠标旁会出现一个浮动 chip（显示 "← 项目名" 或 "← 项目名 (+N)" 多选时）
- 把项目拖到 Virtual Folders 标题条上 → 停留 **400ms** 自动展开下面的文件夹列表
- 拖到某个文件夹上 → 该文件夹高亮 + 左侧出现青色指示条
- 拖到关闭的文件夹上停留 400ms → 自动展开该文件夹
- 拖出 / 取消 → 因拖拽临时展开的文件夹自动折叠回去
- 松开 → 项目加入该文件夹（同一个顶层文件夹及其子文件夹范围内只能存在一个位置，自动从原位置移除）

---

## 7. 项目右键菜单

右键单击表格里的项目：

![project manager](../assets/functions/project-manager-18.png)

| 项 | 行为 |
|---|---|
| **Open** | 打开第一个选中项目（FX Offline 开关生效） |
| **Open in Tab** | 为每个选中项目都新建 tab 再打开 |
| **Show in Folder** | 在系统文件管理器中定位该文件（Windows 高亮选中，macOS Reveal） |
| **Edit Note** | 弹 NoteDialog 编辑该工程的备注（**仅单选可用**） |
| **Add to Favorites** / **Remove from Favorites** | 切换收藏状态 |
| **Add to Folder ▸** | 子菜单递归列出所有虚拟文件夹——选哪个就加进哪个 |
| **Remove from This Folder** | 仅在当前是虚拟文件夹视图时显示，从该文件夹移除 |
| **Backup...** | 弹备份对话框（详见 §9） |

> 💡 **Add to Folder ▸ 子菜单的小细节**：有子文件夹的项会变成嵌套子菜单，子菜单顶部多一项 **"(Add Here)"**——选这个表示加到父文件夹本身。

---

## 8. Virtual Folders（虚拟文件夹）工作流

Virtual Folders 是 Project Manager 的核心整理工具，**不会移动磁盘文件**——只在内部记录"哪些工程属于哪个虚拟分组"。

### 8.1 基本概念

- **3 级嵌套**：最多 `Group → SubGroup → SubSubGroup`，再深就建不出来
- **同一个顶层文件夹下不重复**：把项目加到某个子文件夹时，如果它已经在**同一个顶层文件夹及其下的任意子文件夹**里，会**自动从原位置移除**——保证一个项目在同一个顶层分组里只出现一次
- **不同顶层文件夹可共存**：项目可以同时存在于两个**独立的顶层文件夹**里
- **颜色标签**：顶层文件夹自动着色，子文件夹继承父色

### 8.2 创建虚拟文件夹

1. 单击侧边栏 **Virtual Folders** 区任意位置或箭头展开
2. 想建顶层：直接点 **New** 按钮
3. 想建子文件夹：先单击选中父文件夹，再点 **New**
4. 输入名称 → 确定

### 8.3 添加项目到文件夹

三种方法，任挑一个：

- **拖拽**（最直观）：从右侧表格拖项目到左侧文件夹节点
- **右键菜单**：右键项目 → Add to Folder ▸ 选目标文件夹

![project manager](../assets/functions/project-manager-19.png)

- **多选拖拽**：Ctrl&Shift 多选后整批拖过去

### 8.4 从文件夹移除项目

进入该文件夹视图 → 选中项目 → 右键 → **Remove from This Folder**。

![project manager](../assets/functions/project-manager-20.png)

> ⚠️ "移除"只是从虚拟文件夹的清单里删，磁盘文件和别的虚拟文件夹都不受影响。
>
> ⚠️ 注意区分：**Remove from This Folder** 是把项目从文件夹里拿出来；侧边栏左下角的 **Delete** 按钮是删整个文件夹本身（会弹二次确认）——两个是不同操作，别点错。

### 8.5 Virtual Folders 根视图

单击 Virtual Folders 标题条主体（不是箭头），主区域切换到"根视图"——把所有顶层文件夹当成"文件夹卡片"在表格里列出来，双击进入。这等于把顶层文件夹也当成一种"分类"来浏览。

---

## 9. 项目备份

把工程文件 + 它引用的媒体文件 + 子工程 + 它们的依赖，一起整理到一个目标目录。备份过程会自动重写 `.rpp` 里的媒体路径，**备份后的工程可以独立打开、独立迁移**。

### 9.1 触发备份

两种入口都会弹出 **Backup** 对话框：

- 顶部工具栏的 **Backup** 按钮（备份当前选中的项目）
- 右键菜单的 **Backup...**

### 9.2 Backup 对话框

![project manager](../assets/functions/project-manager-21.png)

**字段说明**：

| 字段 | 用途 |
|---|---|
| **Target Directory** | 备份的目标根目录（必填）。点 Browse 选系统文件夹 |
| **Create subfolder for each project** | 见 §9.3 |
| **项目列表** | 每行左侧灰色显示原文件名，右侧输入框可自定义本次备份的名字 |

### 9.3 Create subfolder 开关的区别

这个开关只决定一件事：**要不要给每个备份单独包一个文件夹**。下面的"媒体如何摆放"是这个选择带出来的连带结果，不是另一个独立设置。

**ON（默认）：每个工程独立成一个文件夹**

每个备份各自进自己的文件夹，`.rpp` 和它的 `Media/`、`Subproject Archive/` 都装在里面，是一个能整包拎走、独立打开、独立迁移的单元：

```
TargetDir/
├── ProjectA/
│   ├── ProjectA.rpp
│   ├── Media/
│   │   ├── voice.wav
│   │   └── drums.wav
│   └── Subproject Archive/    ← 仅当该工程含有效子工程时才创建（与本开关无关）
│       └── SubProj1/
│           ├── SubProj1.rpp
│           └── Media/
└── ProjectB/
    └── ...
```

适合：**初次完整备份**、归档。

> 📌 注意：`Subproject Archive/` 是否出现，取决于这个工程**本身有没有子工程**，跟 Create subfolder 开关是两码事——别把这两个"是否建文件夹"混为一谈。

**OFF：不包文件夹，所有备份平铺、共享一个 `Media/`**

所有工程的 `.rpp` 直接落在目标根目录，因为没有各自的文件夹隔离，媒体只能倒进**同一个** `Media/`。正因为是共享目录，复制时会做**差异同步**——目标 `Media/` 里已有的同名文件直接跳过、不重复拷：

```
TargetDir/
├── ProjectA.rpp
├── ProjectB.rpp
├── ProjectC.rpp
└── Media/
    ├── voice.wav        ← 已存在的同名文件不重复复制；不同源的同名文件自动加 _2、_3 后缀
    ├── drums.wav
    └── ...
```

适合：**多个共享素材库的工程一起备份**——共用一份 `Media/`，已经在目标里的素材不会被重复拷进来。

### 9.4 自定义备份名

每行右侧的输入框可以改本次备份的名字：

- Create subfolder = ON：决定子文件夹名（同时 `.rpp` 也跟着改名）
- Create subfolder = OFF：决定输出 `.rpp` 的文件名
- **冲突自动加时间戳**：如果目标已存在同名，自动追加 `_bak_MMDD_HHMM`，不会覆盖你已有的备份

### 9.5 Backup 进度对话框

确认后弹出进度窗口：

![project manager](../assets/functions/project-manager-22.png)

```
┌─ Backing up projects... ───────────────────┐
│  Backing up: 2 / 5                         │
│  Project: My Track v3                      │
│                                            │
│  ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░  45%                 │
│                                            │
│              [ Cancel ]                    │
└────────────────────────────────────────────┘
```

- 项目级进度（X / Y）+ 单工程内文件级子进度，进度条平滑滑动
- **Cancel 按钮**可随时中止；中止后会等当前文件复制完，标题变 "Cancelling..."

### 9.6 完成对话框

备份结束后窗口变成总结：

![project manager](../assets/functions/project-manager-23.png)

```
┌─ Backup completed! ────────────────────────┐
│  Successfully backed up: 5 projects        │
│  Failed: 0                                 │
│  Total size: 248.3 MB                      │
│  Location: D:\Backups\2026-05-19           │
│                                            │
│  ⚠ Some files were missing. See            │
│    MISSING_FILES.txt in each project.      │
│                                            │
│      [ Open Folder ]    [ Close ]          │
└────────────────────────────────────────────┘
```

- **Open Folder** 在系统文件管理器中打开目标目录
- 如果有丢失的媒体文件，会在备份目录里生成一份 **MISSING_FILES.txt** 报告，列出找不到的所有路径和上下文，附操作建议

### 9.7 智能查找媒体文件

备份引擎不会因为 `.rpp` 里的相对路径"凑巧"找不到就放弃，它会按以下顺序找：

1. `.rpp` 里记录的原始路径（绝对或相对）
2. 工程 `.rpp` 同目录
3. 同目录下的 `media files / Media / audio / Audio / media` 子文件夹

都找不到才记为缺失文件。

### 9.8 子工程递归

如果工程里嵌套了子工程（Subproject），备份引擎会**递归把所有子工程都打包**到 `Subproject Archive/` 下，并自动重写主工程里的路径。子工程内部又嵌套子工程也会一路打包到底（自动防循环引用）。

### 9.9 同源去重

如果同一个素材在工程里被切成 N 个 item（`.rpp` 里有 N 个引用），备份只会复制**一份**到 Media 目录，所有引用都指向这个同一个目标文件——节省空间且加快备份。

---

## 10. 扫描路径管理（Manage Scan Paths）

通过 **Advanced → Manage Scan Paths...** 打开，是配置 "Scanned Projects" 数据来源的唯一入口。

![project manager](../assets/functions/project-manager-24.png)

**按钮**：

| 按钮 | 行为 |
|---|---|
| **+ Add Path** | 弹系统文件夹选择器；新增后即时预览该路径下找到几个 `.rpp` |
| **Remove** | 移除选中的路径（仅有选中行时可用） |
| **Refresh** | 立即对所有现有路径重新统计项目数 |
| **Confirm & Scan** | 关闭对话框 → 弹扫描进度窗口 → 后台扫描所有路径 |

### 10.1 扫描进度对话框

```
┌─ Scanning for projects... ────────┐
│  Found: 248 projects              │
│                                   │
│  ▓▓░░▓▓░░▓▓░░  (marquee)          │
│                                   │
│           [ Cancel ]              │
└───────────────────────────────────┘
```

- **进度条**（来回滑动的动画）
- 实时显示已发现的工程数
- **Cancel** 随时中止；完成后变 **Close**

### 10.2 自动清理

删除某个扫描路径后，该路径下的工程会自动从 Scanned Projects 列表中消失——**不需要再扫一次**。

---

## 11. 排除路径管理（Exclude Paths）

跟 Scan Paths 配对的功能：**Advanced → Manage Exclude Paths...**

![project manager](../assets/functions/project-manager-25.png)

任何被加进排除路径的目录（含子目录），里面的工程都会被标记为"已排除"。开启 **Advanced → Hide Excluded Projects** 后这些工程会从所有视图中隐藏。

> 💡 **典型用途**：扫描 `D:\Music` 时把 `D:\Music\Backups` 排除掉，避免把备份目录里的 `.rpp` 当成正经工程列出来。

---

## 12. 跨电脑迁移（Path Relocate）

把 PM 配置文件 (`project_manager.json`) 从机器 A 拷到机器 B 后，里面记录的工程路径几乎全部失效（盘符、目录结构都变了）。**Path Relocate** 工具用来一次性把所有失效路径修复到新机器上的实际位置。

### 12.1 工作流

1. **先在新机器上扫一次磁盘**（必须）
   - Advanced → Manage Scan Paths → 添加新机器的工程根目录 → Confirm & Scan
   - 等扫描完成
2. **再打开 Path Relocate 对话框**
   - Advanced → **Path Relocate...**
   - 打开时会先强制刷新一次磁盘（2-3 秒），然后分析

### 12.2 Path Relocate 对话框

```
┌─ Path Relocate ─────────────────────────────────────────────┐
│  Auto-matched: 23   Needs choice: 5   Not found: 2          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ [AUTO]  Old: D:\Old\ProjectA.rpp                  ☑   │  │
│  │         New: E:\NewLocation\ProjectA.rpp              │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ [CHOOSE] Old: D:\Old\Demo.rpp                     ☐   │  │
│  │         [Choose: E:\New1\Demo.rpp        ▼]           │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ [MISSING] Old: D:\Old\Lost.rpp                        │  │
│  │  (no matching .rpp in scanned projects — kept as-is)  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  [ Select All ] [ Deselect All ]    [ Cancel ] [ Apply ]    │
└─────────────────────────────────────────────────────────────┘
```

每行有一个**徽章**指示状态：

| 徽章 | 颜色 | 含义 | 默认 |
|---|---|---|---|
| **AUTO** | 绿色 | 唯一最优候选，可放心自动替换 | 默认勾选 |
| **CHOOSE** | 橙色 | 多个候选并列，需要你亲自选 | 默认不勾选——选了候选后才会自动启用 |
| **MISSING** | 灰色 | 扫描结果里没有同名 `.rpp`，无法找到 | 无 toggle，保留原值 |

### 12.3 Apply 后

按 Apply 时会：

1. 自动备份当前 JSON 到 `project_manager.json.bak.YYYYMMDD-HHMMSS`（如果备份失败则中止，不修改数据）
2. 应用所有勾选的映射到：**虚拟文件夹**、**收藏夹**、**项目备注**
3. 弹出结果提示框，显示更新条目数和备份文件路径

---

## 13. Advanced 菜单（设置菜单 ☰）

工具栏最右的菜单按钮，弹出一个分组的浮动面板：

![project manager](../assets/functions/project-manager-26.png)

### 13.1 视图过滤组

| 项 | 默认 | 行为 |
|---|---|---|
| **Show Deleted Projects** | OFF | 显示磁盘上已不存在的工程（红色 [X] 标签 + 删除线 + 灰字） |
| **Show Subprojects** | ON | 显示子工程（[Sub] 绿色标签） |

### 13.2 列显隐组

| 项 | 默认 |
|---|---|
| **Show Path Column** | ON |
| **Show Modified Column** | ON |
| **Show Note Column** | ON |

关闭列后，剩余列会按比例自动加宽——除非你之前手动调过列宽。

### 13.3 行为组

| 项 | 默认 | 行为 |
|---|---|---|
| **Auto-hide after opening project** | OFF | 打开工程后 100ms 自动隐藏 PM 窗口（Open / Open in Tab 都生效） |
| **Hide Excluded Projects** | OFF | 隐藏 Exclude Paths 下的所有工程 |

### 13.4 管理按钮

| 按钮 | 用途 |
|---|---|
| **Manage Exclude Paths...** | 见 §11 |
| **Manage Scan Paths...** | 见 §10 |
| **Path Relocate...** | 见 §12 |

> 💡 所有 Advanced 菜单的开关状态都会持久化——重启 REAPER 后依然记得你上次的设置。

---

## 14. 项目备注

每个工程都能加一段备注，显示在 Note 列里。

**入口**：
- 右键项目 → **Edit Note**
- 仅单选时可用

**对话框**：

![project manager](../assets/functions/project-manager-27.png)

![project manager](../assets/functions/project-manager-28.png)

- 留空 + Save = 删除该工程的备注
- 备注列里超过 30 字符会用 "..." 截断显示，但完整备注仍然保存

---

## 15. 快捷键与典型行为

### 15.1 鼠标行为

| 操作 | 行为 |
|---|---|
| 单击项目 | 选中 |
| **Ctrl/Cmd** + 单击 | 多选切换 |
| **Shift** + 单击 | 范围多选 |
| 双击项目 | 打开（FX Offline 开关生效） |
| 双击文件夹 | 进入该文件夹 |
| 右键项目 | 弹出右键菜单 |
| 拖拽项目 | 拖到 Virtual Folders 文件夹上归类 |
| 拖拽列分隔线 | 调整列宽（自动持久化） |
| 单击列头 | 排序 |

### 15.2 鼠标进入窗口时自动刷新

鼠标进入 PM 窗口时，会自动重新扫描一次 REAPER 历史，——这样在 REAPER 里打开了新工程后，切回 PM 就能看到。

### 15.3 默认视图

每次打开 PM 默认显示 **History Projects** 视图。

---

## 16. 典型工作流

### 工作流 A：第一次配置 PM

```
1. 打开 PM (Extensions → MantrikaTools → Project manager)
2. Advanced → Manage Scan Paths
3. + Add Path → 选你的工程根目录（可加多个）
4. Confirm & Scan，等扫描进度跑完
5. 侧边栏点 Scanned Projects → 看到所有工程
```

### 工作流 B：建立你自己的分类体系

```
1. 侧边栏展开 Virtual Folders → New 建顶层文件夹（如 "客户A"）
2. 在 "客户A" 下 New 子文件夹 "项目1"、"项目2"
3. 在右侧表格找到对应工程
4. 拖到对应虚拟文件夹（多选 Ctrl 选中后批量拖）
5. 完成
```

### 工作流 C：备份整套工程交付

```
1. 选中所有要交付的工程（Ctrl 多选）
2. 顶栏 Backup 按钮
3. Target Directory: 选 D:\Delivery\2026-05-19
4. ☑ Create subfolder for each project（推荐）
5. 可选：在右侧给每个工程改个对外的备份名
6. Backup → 等待进度跑完
7. 完成后 Open Folder 查看
8. 如果有 MISSING_FILES.txt 出现，按报告里的建议处理
```

### 工作流 D：跨电脑迁移

```
机器 A（旧）:
1. 关闭 REAPER
2. 找到 project_manager.json (在 MantrikaTools 配置目录)
3. 拷贝到机器 B

机器 B（新）:
1. 把 project_manager.json 放到对应目录
2. 打开 REAPER → Project Manager
3. Advanced → Manage Scan Paths → 添加新机器的工程根目录 → Confirm & Scan
4. 等扫描完成
5. Advanced → Path Relocate → 等分析
6. 检查每行：
   - AUTO 默认勾选，没问题就保留
   - CHOOSE 点下拉选正确候选
   - MISSING 找不到，保留原值
7. Apply → 弹出更新报告
8. 关闭后所有虚拟文件夹/收藏/备注都指向新机器上的正确路径
```

### 工作流 E：快速搜索打开工程

```
1. 顶栏 Search 框
2. 输入关键词（多个关键词空格分隔，每个都要匹配）
3. 表格实时过滤
4. 双击想要的工程 → 直接打开
```

### 工作流 F：用 FX Offline 打开高负载工程

```
1. 侧边栏底部勾选 ☑ FX Offline
2. 双击工程或右键 Open
3. REAPER 加载时所有 FX 都是离线状态
4. 在 REAPER 里再手动启用你需要的 FX
5. 用完想恢复正常模式：回 PM 取消勾选 FX Offline
```

### 工作流 G：清理"已删除"工程

```
1. Advanced → ☑ Show Deleted Projects
2. 表格里所有 [X] 红色标签的就是磁盘上已经删除的
3. 选中它们 → 右键 → Remove from Favorites / Remove from This Folder
4. 完成后再关掉 Show Deleted Projects 开关
```

---

## 17. 注意事项 

### 17.1 Refresh 不会扫描磁盘

工具栏的 Refresh 按钮只刷新 REAPER 历史和现有项目的状态。**要发现新增工程必须走 Manage Scan Paths**。

### 17.2 Delete Folder 会连子文件夹一起删

侧边栏的 Delete 按钮会弹二次确认对话框，确认后会**连同所有子文件夹一起删**。对话框会写明要删的文件夹名 + 是否含子文件夹，默认按钮是 Cancel（Esc / Enter 都是取消），只有明确点 Delete 才真的执行——但删之前仍然请确认选的是对的那个。磁盘上的项目文件不受影响。

### 17.3 虚拟文件夹最多 3 级

达到 3 级后 New 按钮会禁用。无法绕过。

### 17.4 同一个顶层文件夹下项目不重复

把项目加到顶层文件夹 A 下的某个子文件夹时，如果它已经在 A 或 A 的别的子文件夹里，会自动从原位置移除。如果需要"一个项目同时在两处"，得放到**两个不同的顶层文件夹**里。

### 17.5 Backup 不会覆盖现有同名目录

Create subfolder = ON 下，如果目标位置已经有同名子文件夹，PM 会自动给本次备份追加时间戳（`_bak_MMDD_HHMM`）。所以多次备份同一个工程不会互相覆盖。

### 17.6 Create subfolder = OFF 时的差异复制

不创建子文件夹（Create subfolder = OFF）时，因为所有工程共享一个 `Media/`，已经在目标 Media 里的同名文件**不会**被重新复制。但如果你改过这个文件的内容、又想用新版本，请先手动删掉目标里的旧版本。

### 17.7 Path Relocate 必须先扫描

Path Relocate 把 `Scanned Projects` 作为候选池来匹配。如果新机器上一次都没扫过，会看到一片 MISSING，对话框顶部会有橙色提示。

### 17.8 Path Relocate 自动备份 JSON

Apply 前自动备份 `project_manager.json` 到同目录的 `.bak.<时间戳>`。如果备份失败（磁盘满 / 没权限）会中止 Apply，不修改任何数据。

### 17.9 FX Offline 是会话级开关

PM 窗口关掉再打开会**记住**这个开关状态。改了之后下次打开仍然是离线模式——不需要的时候记得取消。

### 17.10 Auto Hide 在 Open in Tab 时也生效

如果 Auto Hide 开着，"Open in Tab" 一批工程后窗口也会自动隐藏——需要时按菜单或快捷键重新打开。

### 17.11 子工程在备份里独立保存

`[Sub]` 标签的工程是被某主工程引用的子工程。直接备份子工程时，PM 把它当主工程对待——不会自动找谁引用了它，只备份它自己和它依赖的媒体。

### 17.12 Path / Modified / Note 列对文件夹空白

虚拟文件夹在表格里只显示名字，路径、修改时间、备注三列都是空的——这正常。

---

## 18. 故障排查

| 现象 | 可能原因 | 解决 |
|---|---|---|
| 扫描后表格还是空 | 没切到 Scanned Projects 视图 | 侧边栏单击 Scanned Projects |
| 扫描根本没找到工程 | 路径下其实没 `.rpp` 文件，或全部在被 Exclude 的子目录里 | 检查 Manage Scan Paths 的预览计数；检查 Exclude Paths |
| 工程显示成灰色删除线 | 磁盘上文件已不存在 | 找回文件，或在右键菜单删除收藏/移出文件夹 |
| Search 搜不到 | 关键词太严 / 大小写敏感问题 | 减少关键词、确认拼写；空格分多个关键词都要命中 |
| Backup 弹出但 OK 按钮灰着 | 还没选目标目录 | 点 Browse 选目录 |
| Backup 完了 MISSING_FILES.txt 一堆 | 工程引用的媒体真的找不到 | 按 txt 里的建议手动补 |
| Backup 进度卡在 0% | 第一个工程很大、单文件正在拷 | 等待——子进度条会推进 |
| 拖项目到文件夹没反应 | 拖到了 Virtual Folders 标题条但不是节点 | 拖到具体的文件夹节点上松开 |
| 子文件夹建不出来 | 已达 3 级嵌套上限 | 这是硬限制——重新组织你的分类结构 |
| Path Relocate 全是 MISSING | 还没扫描磁盘 | 先 Manage Scan Paths → Confirm & Scan |
| Path Relocate 推荐错了 | 候选差距 ≤ 1 段时不确定 | 那一行会是 CHOOSE 让你手选；如果误判成 AUTO 可以取消勾选 |
| 列宽调过后变得很挤 | 手动调过后不再自动重新分配 | 再次手动拖列分隔线调到舒服为止 |
| Create subfolder=OFF 备份后 Media 里没新文件 | 同名文件已经存在被跳过 | 删除目标里的旧版本再重新备份 |
| 切换 FX Offline 后还是正常加载 FX | 过程中操作了键盘 | 重新双击打开，打开过程中不要操作键盘 |
| 右键菜单的 Add to Folder 列表很长 | 虚拟文件夹太多 | 滚动子菜单；或先在侧边栏定位再单击文件夹直接归类 |
