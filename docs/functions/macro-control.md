# Macro 用户手册

---

## 1. 概述

**Macro** 是 Mantrika Tools 的"宏控参数"工具。一个宏对应**一个旋钮**，旋钮背后可以**同时挂多个 FX 参数（或 send 音量）**。拧一下旋钮，所有被挂上的参数会按你预设的方向和幅度一起动。

它解决的是这种需求：

- 一个"Brightness"旋钮同时推 EQ 高频 + Reverb wet + Saturator drive
- 一个"Intensity"旋钮把 compressor 推得更狠的同时拉低 reverb mix
- 一个"Send Wet"旋钮统一控制多条 send 的音量

```
       ┌──────────────┐
       │  Macro Knob  │
       │     0..1     │
       └──────┬───────┘
              │
   ┌──────────┼──────────┬──────────┐
   ▼          ▼          ▼          ▼
 EQ High   Reverb Wet  Drive    Send Vol
 +0.6 ↑    +0.4 ↑     +0.8 ↑   −0.3 ↓
```

每条 target 各自带一个**方向 + 幅度**（amount，−1 到 +1）：正值跟着旋钮往上推，负值反向；amount 越大推得越远。

**关键概念一句话**：

| 概念 | 含义 |
| --- | --- |
| **Macro** | 一个旋钮（0..1，中点 0.5 = 不调制）。最多 8 个。 |
| **Target** | 被这个宏控制的 FX 参数 或 send 音量。一个宏可挂多条 target。 |
| **Baseline** | 绑定瞬间记下的"当前参数值"。旋钮回到中点 0.5 时所有 target 自动回到 baseline。 |
| **Amount** | 这条 target 跟着宏走多远、朝哪个方向（−1..+1，0 = 这条 target 不动）。 |
| **Envelope 模式** | 把宏镜像到一条隐藏 track 上的 JSFX，让你在 REAPER 里画 envelope / 录 automation 来驱动宏。 |

---

## 2. 打开方式

| 入口 | 路径 |
| --- | --- |
| 菜单 | `Extensions → MantrikaTools → MTK Macro` |
| Action List | **`mantrika : Macro - Param Control`** |

---

## 3. 界面总览

```
┌──────────────────────────────────────────────────────────────┐
│ + Add         ↻ │ Macro Name (可编辑)                        │
│ ┌────────────┐  │                                            │
│ │ ● Macro 1  │  │           ┌───────────┐                    │
│ │   EQ · Rev │  │           │           │                    │
│ │ ● Macro 2  │  │           │  大旋钮    │                    │
│ │   Drive    │  │           │   0..1    │                    │
│ │ ○ Macro 3  │  │           │           │                    │
│ │   (inactive)  │           └───────────┘                    │
│ │            │  │                                            │
│ └────────────┘  │  [ + Bind FX ]   [ + Bind Send ]           │
│                 │                                            │
│ Envelope: OFF   │  Targets ────────────────────────          │
│                 │  ┌────────────────────────────────┐        │
│ Preset ▾        │  │ EQ Freq · Track 1  ⇄ ↻ ✕      │        │
│                 │  │ ───────●─────────── (slider)  │        │
│                 │  ├────────────────────────────────┤        │
│                 │  │ Reverb Wet · Track 1  ⇄ ↻ ✕   │        │
│                 │  │ ─────●───────────── (slider)  │        │
│                 │  └────────────────────────────────┘        │
└──────────────────────────────────────────────────────────────┘
   ← 左侧 200px：宏列表 + 全局按钮          右侧：选中宏的详情面板
```

| 区域 | 内容 |
| --- | --- |
| **左侧顶部** | `+ Add`（新建宏） / `↻`（刷新名字） |
| **左侧中段** | 宏列表（最多 8 个），每行显示宏名 + 控制的参数预览 + 状态点 |
| **左侧底部** | `Envelope: ON/OFF`（envelope 模式总开关） / `Preset ▾`（保存/加载） |
| **右侧顶部** | 当前选中宏的**名字编辑框** |
| **右侧中段** | **大旋钮**（macro value，0..1） |
| **右侧 Bind 行** | `+ Bind FX`（绑 FX 参数） / `+ Bind Send`（绑 send 音量） |
| **右侧 Targets 区** | 这个宏当前挂的所有 target 列表，每条一行 |

---

## 4. 宏的基本操作

### 4.1 新建宏

点左上角 **`+ Add`**。新宏会自动出现在列表里，默认名字 `Macro 1`、`Macro 2`…… 上限 **8 个**，到顶后 `+ Add` 按钮自动灰掉。

### 4.2 选中宏

左键单击列表中的任意一行。右侧详情面板会立即切到这个宏的内容。

### 4.3 改名

两种方式：

- **右键宏 → Rename** —— 自动聚焦到右侧名字编辑框并全选当前名字，直接打字覆盖
- **直接点右侧名字编辑框** —— 手动点击后编辑

### 4.4 改颜色

右键宏 → **Color** 子菜单。可以选 8 种预设颜色：

```
Red · Orange · Yellow · Green · Cyan · Blue · Purple · Pink
```

或选 **Auto (by position)**，恢复按列表位置自动配色。

颜色会同时影响左侧列表的状态点 + 右侧大旋钮的圆环色 + amount slider 的色调，方便你一眼分辨"现在动的是哪个宏"。

### 4.5 启用 / 禁用（Active 切换）

每行最右端有一颗**圆点**：

| 颜色 | 含义 |
| --- | --- |
| 宏自身的彩色 | ✅ 启用——拖旋钮会写到所有 target |
| 深灰 | ⛔ 禁用——拖旋钮不再写 target，参数停在当前位置 |

**单击这颗圆点**切换 active 状态。禁用的宏名字会变灰，但配置不会丢，重新启用即可恢复。

> 💡 用法：临时把某个宏"挂起"以免误碰，或者让它的 target 留在当前位置不动。

### 4.6 删除

右键宏 → **Delete**。删除不可撤销，但 target 的参数会停在被删瞬间的位置，不会自动回 baseline。

### 4.7 大旋钮（Macro Value）

右侧中央那个大旋钮，是这个宏的**当前位置**：

- **范围 0..1**，中点 **0.5 = 不调制**（所有 target 停在各自的 baseline）
- 越往上拧（→1.0）越按 amount 正方向推；越往下拧（→0.0）越往反方向推
- **双击旋钮** = 立刻回到 0.5（所有 target 立即回 baseline）
- **按住 Shift 再拖** = 进入精细模式，拖动同样的距离数值变化只有默认的 **1/6**，方便做小幅度的微调；松开 shift 重新点下去恢复默认拖动速度

---

## 5. 绑定 Target

一个宏新建出来时是空的——没有挂任何参数，拖旋钮什么也不动。需要先**绑 target**。

### 5.1 `+ Bind FX` —— 绑 FX 参数

这是最常用的方式：

```
┌─ 工作流 ──────────────────────────────────────────┐
│ 1. 在右侧选中要挂的宏                              │
│ 2. 点 [ + Bind FX ] 按钮 → 按钮变橙变 "Confirm Bind"│
│ 3. 切到 REAPER，在某个 FX 上动一下你想挂的参数    │
│ 4. 回来点 [ Confirm Bind ] → 参数被加进 Targets 列表│
└────────────────────────────────────────────────────┘
```

**绑定瞬间发生了什么**：

| 字段 | 自动填写 |
| --- | --- |
| **Baseline** | 该参数当前的归一化值——也就是说**当前位置 = 中点 = 不调制** |
| **Amount** | 默认 **0.5**（中等正向推力）；之后可以在 target row 里随便改 |

绑完后旋钮在中点（0.5），target 也停在 baseline——一切如初。把旋钮往上推，target 就开始动。

### 5.2 `+ Bind Send` —— 绑 send 音量

FX 参数路径用不到 send，所以单开一个按钮：

```
┌─ 工作流 ──────────────────────────────────────────┐
│ 1. 在 REAPER 里点一下要绑的**源 track**（确保它是 │
│    last-touched track）                            │
│ 2. 回 Macro 窗口点 [ + Bind Send ]                 │
│ 3. 弹出菜单，列出这个 track 的所有 send：          │
│       → Track 5                                   │
│       → Track 8 (FX Bus)                          │
│ 4. 选一条 send → 立刻加进 Targets 列表             │
└────────────────────────────────────────────────────┘
```

绑的是这条 send 的 **音量**（线性 gain），baseline 是当前 send volume。

- 选了的 track 上**没有 send** → 菜单显示 `(Track X has no sends)`，不能点
- 没选任何 track → 菜单显示 `(Select a track in REAPER first)`

---

## 6. Target 行详解

每条 target 占一行，长这样：

```
┌─────────────────────────────────────────────────────────┐
│ EQ Freq ▸ Track 1                       ⇄  ↻  ✕         │
│                                                         │
│  -1 ──────────●────────── +1  [+0.50]                   │
│         ↑      ↑                                        │
│      live needle  amount thumb                          │
└─────────────────────────────────────────────────────────┘
```

### 6.1 名字一栏

显示 `参数 ▸ 所属 track [▸ item 名]`。**鼠标悬停**会弹出完整 tooltip：

```
Param: EQ: Frequency 1
FX:    ReaEQ
Track: Drums
Item:  kick_loop.wav        ← 仅 TakeFX
(Double-click to show this FX in REAPER)
```

**双击行体**（不是按钮）→ 在 REAPER 里打开这条 target 所在的 FX 链并滚到对应 FX。方便快速定位"这个 target 到底是哪个 FX 上的参数"。

### 6.2 Amount 滑杆（−1 到 +1）

| 视觉元素 | 含义 |
| --- | --- |
| **中央竖线** | amount = 0（这条 target 不被宏影响） |
| **半透明色块** | 从中央延伸到 thumb 位置——表示"这条 target 能被推多远" |
| **thumb** | 当前 amount 值。彩色 = 宏自己的颜色 |
| **细亮竖线（live needle）** | macro.value 把这条 target 实际推到了哪里——拖大旋钮时它会**实时移动**，是判断"这条 target 现在变了多少"的直观信号 |

- **双击 amount 滑杆** = 回到默认值 **0.5**（跟新绑 target 时的初始 amount 一致）
- 正值 = 跟随宏正向，负值 = 反向
- 想"暂时不让这条 target 被宏影响"，手动把 amount 拖到 0 即可（保留绑定但不动）
- **按住 Shift 再拖** = 进入精细模式（跟大旋钮一致），数值变化幅度是默认的 1/6

### 6.3 三个图标按钮（行右端）

| 图标 | 名字 | 作用 |
| --- | --- | --- |
| **⇄** | Reverse | 一键把 amount 取反（正↔负方向翻转）。当前是负值时按钮"亮起"提示。 |
| **↻** | Re-capture baseline | 把这条 target 的 baseline 重新对齐到 REAPER 里参数的**当前实际值**。 |
| **✕** | Remove | 删除这条 target（不会动 FX 参数本身，参数停在当前位置）。 |

### 6.4 什么时候要 Re-capture baseline？

**触发场景**：你在 REAPER 里**手动**改过某个被宏控制的参数（不是通过宏，而是直接在 FX 界面拖了一下）。这时这个参数的"当前值"已经不等于 baseline 了——宏接管之后，下次旋钮回 0.5 会把它推回**老的 baseline**，可能不是你想要的"现在的状态"。

按一下 **↻**，告诉宏"把现在的位置当成新的 baseline"。

> 也可以右键 target → **Re-capture baseline**，效果相同。

### 6.5 右键 Target 行

弹出菜单：

| 项 | 作用 |
| --- | --- |
| **Re-capture baseline** | 同上 ↻ 按钮 |
| **Show in REAPER** | 同双击行体，打开 FX 链定位到这条 target |
| **Remove** | 同 ✕ 按钮 |

### 6.6 失效的 target

如果一条 target 所在的 FX 被删了 / 整条 track 没了 / 工程结构发生重大变化，那条 target 会显示成：

```
[invalid] ReaEQ / EQ: Frequency 1
```

文字变灰，amount 推它也没用。两种处理：

1. **改回来**：在 REAPER 里恢复那个 FX / track，然后按左上角 **↻ Refresh** 按钮，target 会自动重新对齐
2. **删掉**：✕ 按钮直接干掉

---

## 7. 左上角的 ↻ Refresh 按钮

挨着 `+ Add` 按钮的小图标。作用：**重新从 REAPER 读所有 target 的 track / FX / 参数名**。

什么时候要用：

- 重排了 track 顺序，target row 上的 track 名看起来过时
- 给 FX 改了名字、给 track 改了名字
- 工程刚加载完，发现一些 target 显示成 `(track)` `(fx)` 这种占位符
- 一些 target 之前被标 `[invalid]`，你修复了底层结构想让它们恢复

> Refresh 只重读名字、重新校验 target 是否有效，**不会**误删你的 target——找不到底层 FX 时只会标 invalid。

---

## 8. Envelope 模式（左下角 `Envelope: ON/OFF` 按钮）

### 8.1 这是什么

默认情况下，宏的旋钮只在 Macro 窗口内有效——拖一下，参数就动一下，不留 automation 痕迹。

**Envelope 模式打开后**，Macro 会在工程里创建一条名为 **`MTK Macros`** 的 track，挂上 8 个 slider 的 JSFX（叫 MTKMacros）。每个宏对应一个 slider，旋钮和 slider **双向同步**：

```
   你在 Macro 窗口拖旋钮 ──→ JSFX slider 跟着动 ──→ REAPER 把它当 automation
                                                 录到 envelope 里

   你在 REAPER 给 slider 画 envelope ──→ 60Hz timer 读 slider ──→ 宏的 target
                                                                跟着 envelope 走
```

> 简单说：**Envelope ON = 让宏能被画 envelope / 录 automation 控制；Envelope OFF = 宏只是个手动旋钮**。

### 8.2 怎么打开

点左下 `Envelope: OFF` 按钮，文字变 `Envelope: ON` 并变绿。再点一次关掉。

打开后如果工程里有宏，会自动创建 / 找到 `MTK Macros` track 并挂好 JSFX；关闭后停止写入，但 track 不会自动删（你可以手动删，需要时再开会重建）。

### 8.3 状态是工程级的

Envelope ON/OFF 跟随工程持久化：

- A 工程开启 → 保存关闭重开仍是开启
- 切换到 B 工程（B 没开）→ 自动切到关闭
- **不会**因为切工程就把 A 的状态污染到 B

### 8.4 常见用法

```
工作流 A：录自动化
1. 打开 Envelope: ON
2. 选中 "MTK Macros" track 上 MTKMacros JSFX 的 Macro 1 slider
3. 在 REAPER 工具栏开启 "Touch / Latch" automation 录制模式
4. 播放 → 在 Macro 窗口拖旋钮 → REAPER 自动把动作录到 envelope 上
5. 停止 → 改成 Read 模式 → 回放时旋钮自动跟着 envelope 走

工作流 B：画 envelope
1. 打开 Envelope: ON
2. 在 "MTK Macros" track 上找到对应宏的 slider 的 envelope lane
3. 直接用 envelope point 画曲线
4. 播放时所有挂在这个宏上的 target 跟着曲线动
```

> ⚠️ Envelope OFF 时，`+ Add` 一个宏**不会**创建 `MTK Macros` track——这是有意的，避免没用 envelope 的工程多一条莫名其妙的 track。需要 envelope 时再开开关即可。

---

## 9. 预设系统（左下角 `Preset ▾`）

可以把"一组 FX + 这些 FX 上的宏配置"打包存成 preset，下次在别的工程 / 别的 track 上一键还原。

> 注意：预设保存的**不只是宏数据**——还包括宏所控制的整条 FX chain 文本块。这意味着加载 preset 时连 FX 一起注入到目标 track / take 上。

### 9.1 Save Preset

点 `Preset ▾` → **Save Preset...** 打开 Save 对话框：

```
┌─ Save Macro Preset ──────────────────────────────────┐
│  [ Track: Drums ] [ Take: kick_loop.wav ]            │  ← 选 source
│                                                      │
│  Macros to include                                   │
│  ┌────────────────────────────────────────────────┐ │
│  │ ☑ Brightness   touches: ReaEQ, ReaXcomp        │ │
│  │ ☑ Intensity    touches: ReaComp                 │ │
│  │ ☐ Send Wet     (has send target — can't save)   │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  [ Only FX touched ] [ All FX in chain ]            │  ← FX 范围
│  Includes: ReaEQ, ReaXcomp, ReaComp                  │
│  ─────────────────────────────────────────────────── │
│  [ Preset name           ]                           │
│  [ Description (optional)              ]             │
│                                                      │
│                              [ Save ] [ Cancel ]     │
└──────────────────────────────────────────────────────┘
```

**Source（最上面那一段）**：决定从哪儿取 FX chain。

- **Track**：当前 last-touched 或第一个选中的 track（不会选到 `MTK Macros` 这条自己的管理 track）
- **Take**：当前选中 item 的 active take
- 两个都可用时让你选；只有一个可用时自动选中

**Macros to include**：列出当前工程里所有"目标在这条 source 上"的宏，让你勾要不要打包。

- 灰显的项不可勾——常见原因是该宏有 send target（preset 系统暂不带 send）或 target 不在当前 source 上
- 默认全勾可勾的

**FX 范围（segmented）**：

| 选项 | 含义 |
| --- | --- |
| **Only FX touched** | 只打包被勾选宏触及的那些 FX，FX 链经过裁剪 |
| **All FX in chain** | 把 source 上的**整条 FX 链**全打包，target FX 索引按原 chain 位置存 |

下方实时显示当前 preset 将包含哪些 FX，让你直观看见范围。

**Preset name / Description**：必填名字，描述可选。名字会做安全化处理用作文件名被保存。

**重名冲突**：如果同名 preset 已存在，会弹确认框：

```
A preset named "XXX" already exists.
Overwrite it?
   [ Overwrite ]   [ Cancel ]
```

### 9.2 Load Preset

点 `Preset ▾` → **Load Preset...** 打开 Load 对话框：

```
┌─ Load Macro Preset ──────────────────────────────────┐
│ ┌────────────────────────────────────────────────┐  │
│ │ Drum Bus              [3 macros]               │  │
│ │   Compressor & EQ bundle  [2026-04-12 ...]     │  │
│ │ ─────────────────────────────────────────────  │  │
│ │ Vocal Wide                          [1 macro]  │  │
│ │   ...                                          │  │
│ └────────────────────────────────────────────────┘  │
│ ─────────────────────────────────────────────────── │
│ Apply to  [ Track: Drums 2 ] [ Take: (none) ]       │
│ Mode      [ Replace ] [ Append ]                    │
│           Replace overwrites the existing FX chain  │
│           (including param automation envelopes).   │
│                                                     │
│                            [ Load ] [ Cancel ]      │
└──────────────────────────────────────────────────────┘
```

**列表**：所有已保存的 preset。每行右上角的徽章显示这个 preset 带了几个宏。

**Apply to**：选目标 track 或 take（同样不会选到 `MTK Macros` 自己）。

**Mode（segmented）**：

| 模式 | 行为 |
| --- | --- |
| **Replace** | **整段覆盖**目标的 FX 链。⚠️ 包括既有 FX 参数上的 automation envelope 一并消失。 |
| **Append** | 在目标 FX 链**末尾追加** preset 里的 FX，既有 envelope 不动。 |

> 🟠 Replace 模式下方会有一行橙色警告文字，明确告诉你"会清掉现有 envelope"——这是 preset 系统**最容易踩的坑**。

**右键 preset 行**可以**删除**，会再弹一次"Delete preset 'XXX'? This cannot be undone."确认。

---

## 10. 颜色与状态的视觉规则

为了一眼分辨多个宏在动，Macro 在视觉上做了几层编码：

| 视觉元素 | 跟着什么变 |
| --- | --- |
| **左侧列表行右端的圆点** | 宏的颜色（启用时彩色 / 禁用时深灰） |
| **大旋钮的圆环 + 指针** | **当前选中宏**的颜色 |
| **Targets 区里 amount slider 的 thumb 和填充色** | **当前选中宏**的颜色 |
| **aount slider 上的细亮 needle** | 跟随 `macro.value` 实时移动 |

切换不同宏 → 整个右侧面板的色彩**统一变成那个宏的颜色**，避免在 8 个宏之间切换时混淆"现在动的是哪个宏的哪条 target"。

---

## 11. 多个宏控同一参数

如果两条 target 指向**同一个 FX 参数**（例如 Macro A 和 Macro B 都挂了 EQ Freq），它们的写值是**互相覆盖**的——**最后动的那个赢**。

不会做加权混合、不会 sum。

---

## 12. 数据存哪里

| 数据类型 | 存储位置 |
| --- | --- |
| 宏配置（每个工程的宏列表 / target / amount / value 等） | **跟随工程**保存（REAPER 工程态） |
| Envelope ON/OFF 开关 | **跟随工程**保存 |
| `MTK Macros` track + MTKMacros JSFX | 写入到工程，作为普通 track 存在 |
| Macro Preset 文件 | 用户配置目录下的 `MacroPresets/` 子文件夹，`.macropreset` 后缀，**跨工程共享** |

切换工程 → 自动重新加载该工程的宏配置。

---

## 13. 典型工作流

### 工作流 A：建一个"Brightness"宏

```
1. + Add → 拿到 Macro 1
2. 双击列表行改名 "Brightness"
3. 在 REAPER 里点开某个 ReaEQ → 拖一下高频 band 的 freq
4. 回到 Macro 窗口 → + Bind FX → Confirm Bind
   → ReaEQ Freq 进了 Targets 列表
5. 再去 ReaXcomp 拖一下 threshold
6. + Bind FX → Confirm Bind
   → ReaXcomp Threshold 也进了 Targets
7. 给两条 target 各自调 amount（例如 Freq +0.6，Threshold −0.3）
8. 拖大旋钮 → 一只手就能同时把高频抬起来 + 压缩松一点
```

### 工作流 B：用 envelope 自动化一个宏

```
1. 建好宏 + 绑好 target
2. 点 Envelope: OFF → 变 Envelope: ON
3. 切到 REAPER：MTK Macros track 出现在最上面
4. 选中 MTKMacros JSFX 上对应你那个宏的 slider
5. 在 track 上画 envelope（或用 Touch 模式录 automation）
6. 播放 → envelope 推 slider → 宏的 target 跟着 envelope 一起动
```

### 工作流 C：给"Send Wet"宏控制多条 reverb send

```
1. + Add → 改名 "Send Wet"
2. 点中第一条要控制的 source track（保证它是 last-touched）
3. + Bind Send → 弹菜单选 → Reverb Bus → 进 Targets
4. 选第二条 source track
5. + Bind Send → 同上选 Reverb Bus → 第二条 send 进 Targets
6. 两条 amount 都给 +0.7
7. 拖宏旋钮 → 所有 reverb send 一起开/关
```

### 工作流 D：保存一套"鼓"为预设

```
1. 在 Drum Bus track 上配好 ReaEQ + Compressor + 几个宏
2. Preset ▾ → Save Preset...
3. Source 选 Track: Drum Bus
4. 勾选要打包的宏
5. FX 范围选 "Only FX touched"（裁剪掉无关 FX）
6. 起名 "Drum Bus Default" → Save
7. 下次新工程里：
   选中 Drum Bus → Preset ▾ → Load Preset... → 选 Drum Bus Default
   → Mode: Replace（如果是空 track）→ Load
   FX 链 + 宏配置一键还原
```

---

## 14. 注意事项

### 14.1 Bind FX 必须真的动一下参数

`+ Bind FX` 工作流的第三步是"在 REAPER 里动一下参数"。**只点开 FX 界面、只选中 FX 都不算**——必须真的让参数值发生变化（哪怕一次再改回来也行）。不动而直接 Confirm，绑上的可能是上一次 last-touched 的参数。

### 14.2 多宏控同一参数不会叠加

详见 §11。最后写的赢，没有混合模式。

### 14.3 Replace 模式会清掉现有 automation

Load Preset 用 Replace 模式时，目标 FX 链整段被覆盖——包括现有 FX 参数上画好的 envelope。如果你想保留 envelope，请用 **Append**。

### 14.4 Envelope OFF 时新建宏不会建 track

只在 ON 状态下 `+ Add` 才会确保 `MTK Macros` track 存在。OFF 状态下工程里看不到任何痕迹。需要 envelope 时打开开关即可补上。

### 14.5 删除宏不会回归 target 参数

右键 → Delete 后，该宏挂的所有 FX 参数会**停在当前位置**，不会自动回 baseline。如果想让它们先回 baseline 再删，先把旋钮拖回 0.5。

### 14.6 失效的 target 不会自动消失

底层 FX / track 被删时，target 会标 `[invalid]` 但保留在列表里——给你机会修复底层结构后让它复活（按 ↻ Refresh）。确认不需要了再手动 ✕ 删掉。

### 14.7 8 个上限是硬上限

JSFX 只有 8 个 slider，所以宏数量上限是 8。到顶后 `+ Add` 自动灰掉。

### 14.8 MTK Macros track 不要手动删

可以删，但下次开 envelope / `+ Add` 时会自动重建。删之前要意识到：track 上画的 envelope **会一起消失**。

### 14.9 Preset 保存不带 send

带有 send target 的宏在 Save Preset 对话框里会被标灰，不能勾选——预设系统目前只打包 FX chain + FXParam target，send target 不会跨工程传送。

### 14.10 `MTK Macros` track 不会出现在 Preset 的 source / target 选项里

为了避免把宏管理 track 自己当成 source / target 引发循环混乱，Preset 对话框会自动跳过它。

---

## 15. 故障排查

| 现象 | 可能原因 | 解决 |
| --- | --- | --- |
| 拖旋钮 target 不动 | 宏被禁用（圆点是深灰） | 点圆点切回启用 |
| 拖旋钮 target 不动 | amount = 0 | 拖 amount slider 到非 0 值 |
| 拖旋钮 target 不动 | target 标 `[invalid]` | 修复底层 FX/track 后按 ↻ Refresh |
| Confirm Bind 后绑错了参数 | 没在 REAPER 里动那个参数 | 重新动一下目标参数再 Confirm |
| target 行的 track / FX 名显示成 `(track)` `(fx)` | 名字缓存过期 | 按左上角 ↻ Refresh |
| 旋钮回中点 target 却没回原值 | 中间手动改过 target 参数 | 按 target 行的 ↻ 重新校准 baseline |
| `+ Bind Send` 弹 `(no sends)` | 选的 track 没 send | 选有 send 的 track |
| `+ Bind Send` 弹 `(Select a track first)` | 没有 last-touched track | 在 REAPER 里点一下要绑的 track |
| Envelope 开了但 slider 不动 | 工程刚切换还在 settle | 稍等一下 / 点 ↻ Refresh |
| `+ Add` 按钮变灰 | 宏数已达 8 个上限 | 删掉用不上的宏 |
| Load Preset 后 envelope 没了 | Replace 模式覆盖了 FX 链 | 换 Append 模式 / 提前备份 envelope |
| Preset 里某个宏勾不上 | 该宏有 send target，preset 不支持 | 拆分宏：把 FX 部分和 send 部分分开 |

