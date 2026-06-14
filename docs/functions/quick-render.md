# Quick Render 用户手册

> 适用版本：需 REAPER v7.37+

---

## 1. 概述

**Quick Render 解决的核心痛点：REAPER 原生没有"跨轨道快速 glue 多个 item 并烘焙 FX"的一键功能。**

具体来说：

- 原生的 **Glue items** 只能在**单条轨道内**把 item 粘成一个，而且**不会**把轨道 / 母线上的 FX 印进音频。
- 想把**跨多个轨道**选中的一堆 item 合并成**一个带 FX 的音频文件**，原生只能去 Render 对话框手动设成 "selected media items (via master) / as one file"，每次改参数、点好几下。

Quick Render 把这件事压缩成「**选中 → 一键**」：把你选中的（**可跨轨**）item，**经Master合并渲染成一个文件**（Item + Track + 母线 FX 一并烘焙进去），还能选择**直接导回工程原位**。

它由**两部分**组成，配合使用：

| 部分 | 是什么 | 干什么 |
| --- | --- | --- |
| **Quick Render Config 窗口** | 一个小配置窗（500×740） | 调好你常用的渲染参数，存成**预设（Preset）**，并指定一个**默认预设** |
| **Quick Render 一键 Action** | 一个 REAPER Action（可绑快捷键） | 不开任何窗口，直接用**默认预设**把当前选中的（可跨轨）item **合并渲染**出来 |

一句话理解：**在窗口里配一次、设为默认 → 之后选中 item 按一下快捷键，就合并渲染（带 FX）出来。**

> **和 Render Queue 的区别**：Render Queue 是"攒一张清单、批量产出**多个独立文件**"的管理台，适合用于最终完工以后的整体导出；Quick Render 是"把跨轨选中的 item **合并成一个带 FX 的文件**、一键完成"的轻量工具。两者互相独立，按需选用。

> **关于参数范围**：Quick Render 窗口只暴露**最常用**的一小撮参数（足够覆盖日常游戏音效的快速导出）。如果你需要更细的格式控制（OGG/MP4、淡入淡出、去静音、抖动等），请改用功能更全的 **Render Queue**；若某个 REAPER 原生选项是你的刚需而两边都没有，可先用 REAPER 自带 Render 面板完成，并**联系插件作者**补进界面。

---

## 2. 打开方式

Quick Render 提供两个 Action（在 REAPER 的 Action List 里搜 "Quick Render" 即可找到）：

| Action 名称 | 用途 |
| --- | --- |
| **`mantrika : Synergy - Quick Render Config`** | 切换显示 / 隐藏 **Quick Render Config 配置窗口** |
| **`mantrika : Synergy - Quick Render (use user's default preset)`** | **一键渲染**：用默认预设直接渲染当前选中的 item（不开窗口） |

> 建议把第二个 **一键渲染 Action 绑定一个快捷键**（在 Action List 里选中它 → Add… → 按下你想要的组合键）。这是 Quick Render 真正的爽点：选中 item → 按键 → 渲完。

---

## 3. 工作主线（先看这张图）

```
        ┌─────────────────────────────┐
        │  Quick Render Config 窗口    │
        │  1. 调参数（格式/后处理/输出）│
        │  2. 存成 Preset              │
        │  3. 点 ★ 设为默认            │
        └──────────────┬──────────────┘
                       │  默认预设存下来了
                       ▼
        ┌─────────────────────────────┐
        │  以后任何时候：              │
        │  选中 item → 按一键快捷键    │
        │  → 用默认预设渲染选中 item   │
        └─────────────────────────────┘
```

第一次用花两分钟在窗口里配好默认预设；之后日常工作基本只用那个一键快捷键。

---

## 4. 界面总览（Config 窗口）

```
┌───────────────────────────────────────────────┐
│ Configure your preferences, or proceed ...     │  ← 提示语
│                                                │
│ [ ★ MyPreset            ▾ ] [★][S][R][X][+]   │  ← 预设栏
│ ──────────────────────────────────────────────│
│ ┌─ Format ──────────────────────────────────┐ │  ← 蓝
│ │ Sample Rate [48000 ▾]  Bit Depth [24 bit▾]│ │
│ │ Channels    [Mono  ▾]  Render Speed [...▾]│ │
│ ├─ Advance ─────────────────────────────────┤ │  ← 橙
│ │ □ Auto Bypass Master FX                   │ │
│ │ □ Auto Close Render Dialog                │ │
│ │ □ Import Back to Project                   │ │
│ │ □ 2nd Pass Render                          │ │
│ ├─ Postprocess ─────────────────────────────┤ │  ← 绿
│ │ □ Tail [1000] ms                          │ │
│ │ □ Normalize  Type[LUFS-I▾] Target[-23.0]  │ │
│ │ □ Limiter    Ceiling[-0.1]dB □ True Peak  │ │
│ ├─ Output ──────────────────────────────────┤ │  ← 紫
│ │ Naming [ $item                          ] │ │
│ │ Path   □ Use Project Media Path           │ │
│ │        [ D:\Render\...        ] [Browse]  │ │
│ └────────────────────────────────────────────┘ │
│ ──────────────────────────────────────────────│
│ [          Try Quick Render          ]        │  ← 立即试渲
└───────────────────────────────────────────────┘
```

窗口从上到下分四块（设置区用四种淡色块区分）：

| 区域 | 干什么 |
| --- | --- |
| **顶部 预设栏** | 选 / 存 / 改 / 删预设，设默认 |
| **Format（蓝）** | 采样率、位深、声道、渲染速度 |
| **Advance（橙）** | 母线 FX 旁通、自动关对话框、回导工程、两遍渲染 |
| **Postprocess（绿）** | 尾音、响度归一化、限幅 |
| **Output（紫）** | 文件命名、输出路径 |
| **底部按钮** | `Try Quick Render` —— 用当前窗口里的参数立即试渲一次 |

---

## 5. 最快上手（首次配置）

```
1. 运行 Action「Synergy - Quick Render Config」打开窗口
2. 点预设栏右边的 [+]，从当前参数新建一个预设
3. 调 Format / Postprocess / Output 到你常用的样子
4. 点 [S] 把改动存回该预设
5. 点 [★] 把它设为默认（名字前会出现 ★）
6. 在工程里选中要渲的 item → 点底部 [Try Quick Render] 验证一次
7. 满意后，给「Synergy - Quick Render (use user's default preset)」绑个快捷键
   → 以后选中 item 按一下就渲
```

---

## 6. 顶部：预设栏（Preset）

预设栏 = 一个**下拉框** + 五个**小按钮**。

### 6.1 预设下拉框

点开下拉，预设分两组显示：

- **Factory**：内置预设，**不可改名/删除/覆盖**（见第 9 节）。
- **User**：你自己建的预设，可随意编辑。
- 名字前带 **★** 的是当前**默认预设**；没选任何预设时显示 `No Preset`。

**点选一个预设**，它的全部参数会立刻**载入**到下面的设置区（你看到的就是它的内容）。

### 6.2 五个按钮（从左到右）

| 按钮 | 名称 | 作用 | 何时灰掉 |
| --- | --- | --- | --- |
| **★** | Set as Default | 把当前选中的预设设为**默认**（一键 Action 用的就是它） | 它已经是默认时 |
| **S** | Save to Preset | 把**当前设置区的参数**保存回选中的预设 | 没选预设 / 选的是 Factory 预设 |
| **R** | Rename | 给选中的预设改名（弹出输入框，回车确认） | 没选预设 / 选的是 Factory 预设 |
| **X** | Delete | 删除选中的预设 | 没选预设 / 选的是 Factory 预设 |
| **+** | New Preset | 用**当前设置区参数**新建一个 User 预设（自动取名 `Preset N`） | 永不灰掉 |

> **记得点 S 保存**：在设置区改了参数后，改动是在"工作区"里。要让它留在预设里，必须点 **S**（或先点 **+** 新建）。否则切换到别的预设、关掉窗口，未保存的改动会丢。
>
> **默认预设要手动设**：新建预设后**不会**自动成为默认，需要你点一下 **★**。没有任何默认预设时，一键 Action 会提示你"先去 Config 窗口设一个默认"。

---

## 7. 设置区四块详解

### 7.1 Format（格式 · 蓝）

| 项 | 可选值 | 说明 |
| --- | --- | --- |
| **Sample Rate** | 44100 / 48000 / 96000 | 采样率（Hz） |
| **Bit Depth** | 16 bit / 24 bit / 32 bit FP | 位深（输出 WAV 的精度） |
| **Channels** | Mono / Stereo | 声道 |
| **Render Speed** | Full-Speed Offline / 1x Offline / Online Render / Offline Render (Idle) / 1x Offline Render (Idle) | 渲染速度模式，一般用默认 `Full-Speed Offline` 最快 |

### 7.2 Advance（高级 · 橙）

四个勾选项：

| 选项 | 作用 |
| --- | --- |
| **Auto Bypass Master FX** | 渲染时**临时旁通母线（Master）上的 FX**，渲完自动恢复。想要不被母线效果染色的"干"素材时勾上 |
| **Auto Close Render Dialog** | 渲染完成后**自动关闭** REAPER 的渲染对话框，省一次点击 |
| **Import Back to Project** | 渲染完把产出的文件**作为新轨道导回工程**，并放到源 item 所在轨道附近 |
| **2nd Pass Render** | **两遍渲染**（第二遍用于更精确的响度/限幅；渲染 Loop 类素材时也常有奇效） |

### 7.3 Postprocess（后处理 · 绿）

每项都是"勾选框 + 参数"，不勾就不生效：

| 项 | 参数 | 说明 |
| --- | --- | --- |
| **Tail** | `[ ] ms` | 在每段末尾追加一段尾音长度（默认 1000 ms），避免混响/延迟被切掉 |
| **Normalize** | `Type [▾]` + `Target` | 响度归一化。**Type** 可选 `LUFS-I / LUFS-M max / LUFS-S max / Peak / True Peak / RMS-I`；**Target** 填目标值（默认 -23.0） |
| **Limiter** | `Ceiling [ ] dB` + `□ True Peak` | 限幅到指定上限（默认 -0.1 dB）；勾 **True Peak** 用真峰值模式 |

### 7.4 Output（输出 · 紫）

| 项 | 说明 |
| --- | --- |
| **Naming** | 合并出的那个文件的命名规则（默认 `$item` —— 用选中 item 的名字命名）。支持 REAPER 的命名通配符，如 `$item`、`$datetime` 等，可自由组合 |
| **Use Project Media Path** | 勾上后，输出路径**自动跟随当前工程的媒体目录**（手填路径框会变灰、停用）。换工程时路径自动更新 |
| **Path + Browse** | 不勾上面那项时，手动指定输出文件夹：直接在框里输入路径，或点 **Browse** 弹出系统选择框 |

> 命名示例：`$item` → 文件名就是 item 名；`$item_$datetime` → item 名 + 时间戳。

---

## 8. 底部：Try Quick Render（立即试渲）

底部那颗蓝色大按钮 **`Try Quick Render`**，作用是**用当前设置区里的参数**立即渲染一次——**不依赖**默认预设，方便你边调边试。

使用前提：

- 先在工程里**选中要渲的 item**（窗口本身不强制，但渲染需要有选中的素材）。
- **Output Path 不能为空**，否则会弹窗提醒 `Please set an output path.`。

> 它和一键 Action 的区别：`Try Quick Render` 用的是**窗口里当前显示的参数**（适合调试）；一键 Action 用的是你**设为默认的那个预设**（适合日常）。

---

## 9. 内置预设：Render in Place

Factory 组里自带一个开箱即用的预设 **`Render in Place`**，专为"原地渲染替换"场景调好：

- 格式：**WAV / 32 bit FP / 96000 Hz / Stereo**，**两遍渲染**
- 命名：`$datetime`（时间戳，避免重名覆盖）
- 已勾：**Auto Bypass Master FX**、**Auto Close Render Dialog**、**Import Back to Project**、**Use Project Media Path**

效果就是：选中 item → 一键 → 高质量渲出 → 自动导回工程、放在原位附近、输出落在工程媒体目录。想直接用它，把它设为默认（**★**）即可。

> 它是内置预设，**不能改名/删除/覆盖**。如果想在它的基础上微调，先选中它（参数会载入设置区），再点 **[+]** 另存为一个你自己的 User 预设。

---

## 10. 典型工作流

### 工作流 A：配一个常用预设 + 绑快捷键（推荐的日常姿势） 

```
1. 打开 Config 窗口 → [+] 新建预设
2. 调好 WAV / 48000 / 24bit、需要的归一化和限幅、命名 $item
3. [S] 保存 → [★] 设为默认
4. 给「Quick Render (use user's default preset)」绑快捷键
5. 以后：选中 item → 按快捷键 → 渲完，再不开窗口
```

### 工作流 B：直接用内置 Render in Place

```
1. 打开 Config 窗口 → 下拉选 Factory 里的「Render in Place」
2. 点 [★] 设为默认
3. 选中 item → 一键 Action → 高质量渲出并自动导回工程
```

### 工作流 C：临时换一套参数渲一次（不动默认预设）

```
1. 打开 Config 窗口，直接在设置区改成这次想要的参数
2. 选中 item → 点底部 [Try Quick Render]
3. 不点 S，关窗即可——默认预设不受影响
```

### 工作流 D：多套常用配置来回切

```
1. 建好几个预设（比如「引擎WAV48k」「预览参考」各一个）
2. 要用哪套，下拉选中它 → [★] 设为默认
3. 一键 Action 始终跟着当前默认走
```

---

## 11. 故障排查

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 窗口中间一片红字 `REAPER v7.37+ Required` | REAPER 版本过低 | 升级 REAPER 到 7.37 或更高 |
| 一键 Action 弹 `No items selected.` | 渲染前没有选中任何 item | 先在工程里选中要渲的 item，再按 |
| 一键 Action 弹 `No default preset found...` | 还没设默认预设 | 打开 Config 窗口，选一个预设点 **★** 设为默认 |
| 点 `Try Quick Render` 弹 `Please set an output path.` | 输出路径为空 | 在 Output 里填路径，或勾 **Use Project Media Path** |
| 改了参数，切个预设就没了 | 改动只在工作区，没保存 | 改完点 **[S]** 存回预设，或点 **[+]** 另存为新预设 |
| **S / R / X** 按钮点不动（灰） | 当前选中的是 Factory 内置预设（不可编辑） | 先 **[+]** 另存为 User 预设，再编辑那一个 |
| 渲出来的声音被母线效果染色了 | 没旁通母线 FX | 勾上 **Auto Bypass Master FX** |
| 渲完没在工程里看到结果 | 没开回导 | 勾上 **Import Back to Project** |

---
