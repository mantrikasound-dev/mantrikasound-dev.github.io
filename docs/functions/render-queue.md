# Render Queue 用户手册

> 适用版本：Mantrika Tools（当前主线）

---

## 1. 概述

**Render Queue** 是一个**批量渲染管理台**，定位是"**把要渲染的东西攒成一张清单 → 配好格式和后处理 → 一键全渲出来**"。

它解决的是 REAPER 原生渲染的几个痛点：

- 想一次渲染多个 Region / 多个 Item，又想各自走不同的格式或响度，原生对话框要反复改、反复点。
- 想把"WAV 48k 给引擎用"和"OGG 给预览用"分两套配置同时产出。

Render Queue 把这些收进一个三栏窗口：**左边挑素材 → 中间排队列 → 右边配参数**，底部一行**输出路径 + 命名 + START RENDER**。配置会**自动存进工程**，下次打开还在。

> **关于参数范围**：这里的渲染参数和 REAPER 自带的 Render 面板几乎一一对应，只是针对**游戏音效渲染**的实际工作需求做了一些必要的精简。如果你发现某个 REAPER 原生选项是你的刚需、而这里没有提供，可以先改用 REAPER 自带的 Render 面板完成该次渲染，并**联系插件作者**——视情况会把对应的可配置项补进界面。

> 本手册只讲 Render Queue 这个窗口。"Quick Render"（选中 Item 一键渲染）是另一套独立功能，不在此文范围内。

---

## 2. 打开方式

菜单入口：

```
Extension -> MantrikaTools -> Render queue
```

或者 Action List（搜 "Render Queue"）：

| Action 名称 | 用途 |
| --- | --- |
| **`mantrika : Synergy - Render Queue`** | 切换显示 / 隐藏 Render Queue 窗口 |

窗口是一个独立的浮动窗（默认 1200×800），可以拖动、缩放，关掉再开会回到上次状态。

---

## 3. 界面总览

```
┌─────────────────────┬──────────────────────┬─────────────────────────┐
│  Asset Browser      │  Render Queue        │  Main Queue Settings  ☰ │
│  ┌────────────────┐ │  ● Queue1 ● Q2 [+]   │  □ Override Queue ...    │
│  │ Source Type: ▾ │ │  ─────────────────   │  ── Basic Options ──     │
│  │ [Search...] [x]│ │  Queue Pending: 3    │  Format:     [WAV ▾]     │
│  │ ⟳             │ │                      │  Sample Rate:[48000 ▾]   │
│  ├────────────────┤ │  • Footstep_01  ●    │  Channels:   [Mono ▾]    │
│  │ • Footstep_01 ●│ │  • Footstep_02  ●    │  ...                     │
│  │ • Footstep_02 ●│ │  • Sword_swing  ●    │  ── Postprocess ──       │
│  │ • Sword_swing ●│ │                      │  □ Normalize: -23 LU ... │
│  │ ...            │ │                      │  □ Fade Out:  100 ms ... │
│  ├────────────────┤ │  [Deselect][Remove]  │  ...                     │
│  │ Source Avail:12│ │  [Clear All]         │                          │
│  │[Deselect][Add▸]│ │                      │                          │
│  └────────────────┘ │                      │                          │
├─────────────────────┴──────────────────────┴─────────────────────────┤
│  Output & Naming                                                       │
│  Output Path:   [ D:\Render\...           ] [Browse]                   │
│  Naming Pattern:[ $region                 ] [Wildcards]                │
│  [ START RENDER ▼ ]   □ Auto hide window  □ Import back   Ready        │
└───────────────────────────────────────────────────────────────────────┘
   ↑ 左栏：挑素材        ↑ 中栏：排队列         ↑ 右栏：配参数
```

整个窗口的工作顺序就是**从左到右、最后到底部**：

| 区域 | 干什么 |
| --- | --- |
| **左栏 Asset Browser** | 挑你要渲染的素材（Region / Item），加进队列 |
| **中栏 Render Queue** | 看当前队列里有什么；可建多个队列分流不同配置 |
| **右栏 Config** | 给当前队列（或单个 Item）配格式、采样率、后处理 |
| **底部 Output & Naming** | 设输出文件夹、文件名规则，然后 **START RENDER** |

---

## 4. 最快上手（四步走）

```
1. 左栏选 Source Type（比如 "Master Mix - Regions"）→ 列表里出现所有 Region
2. 选中你要的几条 → 点 [Add Selected]，它们进入中栏队列
3. 右栏设好 Format / Sample Rate / 需要的后处理（淡出、响度归一化…）
4. 底部设输出文件夹 → 点 START RENDER（或直接按 Enter）
```

剩下的章节是把每一栏讲细。

---

## 5. 左栏：Asset Browser（挑素材）

### 5.1 Source Type —— 先决定"渲染什么"

最上方的 **Source Type:** 下拉决定整个列表抓取哪一类素材，共四种（每种有自己的颜色圆点）：

| 选项 | 颜色 | 渲染的是 |
| --- | --- | --- |
| **Master Mix - Regions** | 青 | 按每个 **Region** 通过Master 渲染 |
| **Via Master - Mirror Items** | 橙 | 经母线的**Mirror Item** |
| **Via Master - Selected Items** | 紫 | 经母线渲染你当前在工程里**选中的 Item** |
| **Via Master - Selected Mirrors** | 粉 | 经母线渲染**选中的有命名的Mirror Item** |

> 最常用的是 **Master Mix - Regions**：在工程里用 Region 圈好每段声音，这里就能一次性把它们全渲成独立文件。

### 5.2 搜索与刷新

- **搜索框**（占位提示 `Search (e.g. drums NOT kick)`）：输入关键字过滤列表，支持 `AND NOT OR` 这类逻辑（如 `drums NOT kick` = 含 drums 但不含 kick）。右边 **`x`** 清空搜索。
- **`⟳` 刷新按钮**：重新扫描工程里的素材。
  - 素材**超过 150 个**时会自动停掉"自动刷新"以免卡顿，按钮提示变为 `Auto-refresh disabled (too many items, >150)`——这时手动点一下 `⟳` 即可刷新。

### 5.3 加入队列

选好素材后，把它们送进中栏队列有三种方式：

| 方式 | 说明 |
| --- | --- |
| **选中 → 点底部按钮** | 按钮文字随状态变：选了几条显示 **`Add Selected (N)`**；没选则是 **`Add All to Queue`**（把整张过滤后的列表全加） |
| **拖拽** | 直接把列表里的素材拖到中栏队列区 |
| **双击** | 双击一条素材会**跳转到它在工程时间线上的位置**，方便先确认是不是这一条 |

底部 **`Source Available: N`** 显示当前类型下可用素材数量；**`Deselect All`** 取消所有选中。

> **按钮变灰的两种情况**：
> - **`Requires New Queue`**：你选的素材类型和当前队列的类型不一致（每个队列只装同一种 Source Type，见 6.2）。新建一个队列再加即可。
> - **`Already Added`**：选中的素材已经全在当前队列里了。

---

## 6. 中栏：Render Queue（排队列）

### 6.1 队列里的内容

中栏顶部是标题 **Render Queue**，下面 **`Queue Pending: N items`** 实时显示当前队列待渲染条数。

队列为空时显示提示：

```
Queue is empty
Drag from Asset Browser or use Add button
```

每一条目显示素材名 + 类型颜色圆点。底部三个按钮：

| 按钮 | 作用 |
| --- | --- |
| **Deselect All** | 取消队列里的选中 |
| **Remove Item** | 移除选中的条目（没选时灰掉） |
| **Clear All** | 清空整个队列（空队列时灰掉） |

### 6.2 多队列 —— 用 Tab 分流不同配置

队列标题上方是一排 **Tab**，每个 Tab 是一个独立队列，**最多 5 个**。这是 Render Queue 的核心玩法：

> **一个队列 = 一套配置 + 一种 Source Type**。
> 想同时产出"WAV 给引擎"和"OGG 给预览"，就开两个队列，各配各的，一次 START RENDER 全部渲出。

Tab 的操作：

| 操作 | 行为 |
| --- | --- |
| **点 Tab** | 切换到该队列（右栏配置随之切换） |
| **Tab 上的圆点** | 表示该队列的**启用状态**；点它可开关。**禁用的队列不参与渲染** |
| **右键 Tab** | 弹出菜单：**Enable / Disable**（启用/停用）、**Rename**（改名）、**Delete**（删除） |
| **`[+]` 按钮** | 新建队列（已有 5 个时灰掉） |

> 每个队列在加入第一条素材时，就**锁定**了那条素材的 Source Type；之后只能往里加同类型的素材（这就是左栏出现 `Requires New Queue` 的原因）。

---

## 7. 右栏：Config（配参数）

右栏是渲染参数面板。标题会随当前选择变化：

- 没选条目时：**`<队列名> Queue Settings`**（默认显示 `Main Queue Settings`）——此时编辑的是**整个队列**的配置。
- 选中**单个**条目时：标题变成该条目名 + `Settings`，并出现 **Override** 开关（见 7.1）。
- 选中**多个**条目时：标题显示 `[N items selected]`，配置表单禁用（多选不支持改配置）。

右上角 **`☰`** 按钮是 **Presets**（预设管理，见第 8 节）。

### 7.1 Override —— 给单个 Item 开小灶

默认情况下，队列里所有条目共用队列配置。如果某一条想单独走不同设置：

```
1. 在中栏点中那一条（单选）
2. 右栏出现 □ Override Queue Settings 开关
3. 勾上 → 配置表单解锁，这一条的改动只作用于它自己
```

开关**橙色 = 未覆写**（跟随队列），**绿色 = 已覆写**（独立配置）；被覆写的条目在标题里带 `[Override]` 标记。

> 注意：**输出路径和命名规则始终是队列级别的**，Override 不会改它们——只覆写格式 / 后处理这类参数。

### 7.2 Basic Options（基础）

| 项 | 说明 |
| --- | --- |
| **Format** | 输出格式：WAV / OGG Vorbis / OGG Opus / MP4 (H.264/AAC)。选不同格式时下方会出现对应的细节面板（如 WAV 的位深） |
| **Sample Rate** | 采样率，8000 ~ 192000 Hz |
| **Channels** | 声道：Mono / Stereo / 4 / 6 / 8 |
| **Render Speed** | 渲染速度模式（Full-Speed Offline / 1x Offline / Online / Offline idle 等） |
| **Resample** | 重采样算法，从 Point Sampling 到 `r8brain free (highest quality, fast)` |
| **Dither** | `Dither master` 抖动；`Noise shape` 噪声整形（需先开抖动） |

### 7.3 Advance（高级）

| 项 | 说明 |
| --- | --- |
| **2nd Pass Render** | 两遍渲染（第二遍用于精确响度/限幅，或者渲染游戏音效Loop素材时这个功能有奇效） |
| **Use hardware sample rate for FX** | 用硬件采样率处理 FX |

### 7.4 Postprocess（后处理）

每一项都是"勾选框 + 参数"，不勾就不生效：

| 项 | 参数 | 说明 |
| --- | --- | --- |
| **Tail** | `[ ] ms` | 在每段末尾追加一段尾音长度（默认 1000 ms） |
| **Normalize** | `[值] [LU/dB] [类型▾]` | 响度归一化。类型可选 **LUFS-I / LUFS-M max / LUFS-S max / Peak / True Peak / RMS-I**；选 LUFS 系单位显示 `LU`，其余显示 `dB` |
| **Limiter** | `[值] dB [Peak/True Peak▾]` | 限幅到指定上限（默认 -0.1 dB） |
| **Fade In** | `[ ] ms [曲线▾]` | 淡入。曲线：Linear / Fast Start / Fast End / Slow Start/End / Sharp Curve |
| **Fade Out** | `[ ] ms [曲线▾]` | 淡出，曲线同上 |
| **Trim leading silence** | `threshold [ ] dB` | 砍掉开头低于阈值的静音（默认 -60 dB） |
| **Trim trailing silence** | `threshold [ ] dB` | 砍掉结尾的静音 |

---

## 8. 预设（Presets）

点右栏的 **`☰`** 打开 **Queue Preset Manager**，把一整套配置存下来反复用。

| 操作 | 怎么做 |
| --- | --- |
| **存预设** | 在 `Enter preset name...` 输入名字 → 点 **Save** |
| **应用预设** | 点列表里的预设行，配置立刻套到当前队列 |
| **设默认** | 点行内的 **Default**（再点 **Unset** 取消）。设为默认的预设会**自动套用到新建队列** |
| **删预设** | 点行尾的 **✕** |

没有任何预设时列表显示 `No presets saved yet`。

---

## 9. 底部：Output & Naming + 渲染

### 9.1 输出路径

- **Output Path** 输入框 + **Browse** 按钮。点 Browse 弹出快捷选择：
  - **`⌂ Current Project Folder (Same as .RPP)`** —— 直接用工程所在文件夹
  - **`⧉ Open System Dialog...`** —— 打开系统文件夹选择框
  - 下方列出**最近用过的路径**（没有则显示 `No recent paths`）

### 9.2 命名规则与通配符

- **Naming Pattern** 输入框（默认 `$region`）决定输出文件名。
- 点 **Wildcards** 打开通配符面板，里面按类别（Region / Item / 时间 / 工程信息等）列出可插入的标记，点一下就插进命名框。
- 面板里还能选**分隔符**（`Separator:` → **None / `_` / `-`**），以及 **`↺ Reset to Default`** 把命名重置回当前 Source Type 的默认值。

> 例：`$region` → 输出文件名就是各 Region 的名字；`$project_$region` → 工程名 + 下划线 + Region 名。

### 9.3 START RENDER

底部那颗大按钮就是渲染触发：

| 情况 | 按钮文字 | 渲染范围 |
| --- | --- | --- |
| 没选中条目 | **`START RENDER`**（蓝） | 所有**启用**的队列，全渲 |
| 选中了条目 | **`RENDER SELECTED`** / **`RENDER SELECTED (N)`**（橙） | 只渲选中的那些条目 |

补充技巧：

- **按 `Enter`** 等同于点 START RENDER。
- **按住 `Shift` 点按钮（或 `Shift+Enter`）**：即使当前选中了条目，也强制**渲染所有启用队列**（按钮提示里也写了这条）。
- 渲染开始前，焦点会自动交还给 REAPER，由 REAPER 自己的渲染进度窗负责显示进度。

### 9.4 两个开关

| 开关 | 作用 |
| --- | --- |
| **Auto hide window** | 渲染完成后自动隐藏 Render Queue 窗口（默认开） |
| **Import back** | 渲染完成后把产出文件导回工程 |

最右边的**状态文字**（`Ready` / `Selected: ...` / `Ready - N tasks pending`）实时反馈当前状态和待渲染数量。

### 9.5 渲染设置（按钮右侧的 `▼`）

START RENDER 右边的小三角 **`▼`** 打开几个全局开关：

| 开关 | 说明 |
| --- | --- |
| **Auto Close REAPER Render Dialog** | 渲染完自动关掉 REAPER 的渲染对话框 |
| **Auto Overwrite Existing Files** | 输出文件已存在时，先删旧文件再渲。⚠️ 渲染中途中止会导致原文件丢失 |
| **Auto Sync Wwise Replace**（仅 Windows） | 渲染后自动把输出文件夹设为 Wwise Replace 的 watch folder 并刷新（仅当所有产出在同一文件夹时生效） |

> 开启 **Auto Overwrite** 后，渲染前会先探测目标文件能否删除；若有文件**被其他程序占用**，会弹窗中止渲染并告诉你是哪个文件——关掉占用它的程序再来。

---

## 10. 典型工作流

### 工作流 A：把工程里所有 Region 渲成独立 WAV

```
1. 工程里用 Region 圈好每段声音
2. 左栏 Source Type 选 "Master Mix - Regions" → 列表出现所有 Region
3. 点 [Add All to Queue] 全部入队
4. 右栏：Format = WAV，Sample Rate = 48000，Channels 按需
5. 命名框填 $region，输出选 [Current Project Folder]
6. START RENDER（或按 Enter）
```

### 工作流 B：同一批素材同时产出两种格式

```
1. 队列1：加好素材，配 WAV 48k（给引擎）
2. 点 [+] 建队列2，加同一批素材，配 OGG（给预览）
3. 两个 Tab 的圆点都保持启用
4. 不选任何条目，直接 START RENDER → 两套配置一次全渲
```

### 工作流 C：整批统一配置，但某一条要单独处理

```
1. 队列里所有条目走默认（比如归一化 -23 LUFS）
2. 单选那条特殊的 → 勾 □ Override Queue Settings（变绿）
3. 只给它改成 -16 LUFS / 加个 Fade Out
4. START RENDER → 这条按它自己的来，其余按队列来
```

### 工作流 D：存一套常用配置反复用

```
1. 把格式 / 采样率 / 后处理调到你常用的样子
2. 点 ☰ → 输入名字 → Save
3. 点该预设的 Default 设为默认
4. 以后每次 [+] 新建队列，都会自动套这套配置
```

---

## 11. 故障排查

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 左栏列表是空的 | 当前 Source Type 下没有素材；或工程没 Region / 没选 Item | 换 Source Type；或先在工程里建好 Region / 选好 Item，再点 `⟳` |
| `Add` 按钮显示 **Requires New Queue** 且灰掉 | 选的素材类型和当前队列已锁定的类型不一致 | 点 `[+]` 新建一个队列，再把这类素材加进去 |
| `Add` 按钮显示 **Already Added** | 选中的素材已全在当前队列 | 正常，无需操作 |
| 点了 `⟳` 也不自动更新 | 素材超过 150 个，自动刷新已关 | 每次手动点 `⟳` 刷新 |
| START RENDER 灰着点不动 | 没有可渲染的条目，或所有队列都被禁用 | 往队列加素材；检查 Tab 圆点是否启用 |
| 右栏配置改不了 | 选中了多个条目（多选禁用配置）；或选中单条但没开 Override | 取消选中改队列配置；或单选后勾 Override |
| 渲染中途弹窗中止，说文件被占用 | 开了 Auto Overwrite，但目标文件正被别的程序锁着 | 关掉占用该文件的程序（播放器/引擎），再渲 |
| 渲染完窗口自己消失了 | `Auto hide window` 开着（默认行为） | 想保持打开就取消勾选 |
| 改了配置担心丢失 | （不会发生）配置会自动存进工程 | 关窗、重开、换工程后再回来都在 |

---
