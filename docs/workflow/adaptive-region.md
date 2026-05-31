# Adaptive Regions 用户手册

> 适用版本：Mantrika Tools（当前主线） · 需要 REAPER v7.62+

---

## 1. 概述

**Adaptive Regions** 是一个**后台自动跟随**的工作流功能，定位是"**让你自己画的 Region，边界自动跟着 Folder 里的真实声音内容走**"。

可以把它理解成 **Mirror 的"反方向"**：

- **Mirror**：系统在 Folder 上**自动生成**概览块（块是系统的，你不画）。
- **Adaptive Regions**：**Region 是你自己的**（你画、你命名、你删），系统只负责把它的**边界、颜色**一直对齐到对应 Folder 的实际内容上。

```
你画的 Region「footstep」 │   [══════════════]          │ ← Region 边界自动贴住下方内容
Folder「footstep」       │    ▓▓▓▓      ▓▓▓▓▓▓          │ ← 这个 Folder 里的素材
  ├ 子轨 A               │   ■■■■        ■■             │
  └ 子轨 B               │      ■■      ■■■■            │
                            └────内容范围────┘
```

它最适合**"先有 Region"**的工作流——比如素材整合迭代这类**中后期**场景：Region 早就画好排好了，你只想让它们的边界自己贴着素材长，不用一条条手动拉。

> **它和 "Mirror" 是互斥的**：两者都在接管 Folder 的概览，不能同时开。开 Adaptive Regions 时会自动把 Mirror 关掉。

> **这是一个没有独立窗口的功能**。它没有自己的界面，全部通过 **Preferences 里的两个开关**启用，启用后就在后台默默工作。所以本手册重点讲两件事：**怎么打开它、怎么让 Region 跟 Folder 对上**，以及**它到底帮你做了什么**。

---

## 2. 如何开始使用

### 2.1 打开开关

菜单入口（和 Mirror 在同一个地方）：

```
Extensions -> MantrikaTools -> Mantrika Options -> Preferences...
```

打开 Preferences 窗口后，找到 **`Adaptive Regions`** 这一节，勾上开关：

```
■ Adaptive Regions
  ☑ Enable Adaptive Regions (REAPER v7.62+)   ← 总开关，先勾这个
      ☑ Lock Left Boundary                    ← 子选项（见第 4 节）
```

> ⚠️ 需要 **REAPER v7.62 或更新版本**。这是因为它要用到新版才有的 Region 操作接口。

### 2.2 让 Region 自动跟上 Folder（核心：靠"名字"配对）

这是整个功能最关键的地方：**Region 和 Folder 是靠"名字"自动配对的**，你不需要手动去"绑定"。

规则只有一条：

> **当一个 Region 的名字，和某个顶层 Folder 轨道的名字"主干一致"时，它们就自动配对。** 之后这个 Region 的边界就会开始跟随那个 Folder 内的子内容。

所谓"主干一致"，是指**去掉结尾的序号、版本号、扩展名之后**名字相同。系统会自动忽略这些后缀：

| Region / 轨道 名字 | 系统看到的"主干" |
| --- | --- |
| `footstep` | `footstep` |
| `footstep_01` | `footstep`（去掉 `_01`） |
| `footstep-02` | `footstep`（去掉 `-02`） |
| `footstep_v2` | `footstep`（去掉版本号 `v2`） |
| `footstep.wav` | `footstep`（去掉扩展名） |
| `footstep_a` | `footstep`（去掉单字母后缀） |

所以一个最简单的上手流程是：

```
1. 建一个顶层 Folder 轨道，命名为 footstep，下面挂子轨、放素材
2. 在时间线上画一条 Region，命名为 footstep_01（或 footstep）
3. → 名字主干都是 footstep → 自动配对成功
4. → 这条 Region 的右边界，立刻贴到 footstep 这个 Folder 里素材的最右端
5. 之后你在 footstep 子轨里增删/移动素材，Region 右边界自动跟着变
```

> **完全自动、无需手点**：只要名字对得上，配对和跟随就在后台发生。你不用执行任何"绑定"操作。
> （如果你嫌改名麻烦，也有一个 Action 能一键把 Folder 改名对齐到光标处的 Region，见第 5 节。）

> **Adaptive Regions 现在是"每个工程各自记"的模式**：`Enable Adaptive Regions` 设的是**当前工程**的助手模式（Region / Mirror / 关），跟着工程文件（.rpp）一起保存；新建 / 没配过的工程按 Preferences 里 `Default Assistants Mode` 的全局默认进入。哪些 Region 被接管了，也跟工程一起保存，下次打开继续生效。

---

## 3. 它到底帮你做了什么

配对成功后（这条 Region 进入"**被接管**"状态），系统会持续做下面几件事，全自动、实时：

### 3.1 右边界自动贴住内容

- Region 的**右边界**永远等于对应 Folder 里**所有素材的最右端**。
- 子轨里素材一动、一增删，右边界**马上跟着重新对齐**，不用手动刷新。

### 3.2 左边界默认不动（可切换）

- **默认情况下，左边界保持你画的位置不变**，只动右边界。
- 这符合直觉：你画 Region 时通常会精心定好"从哪开始"，结尾才是希望它自己长的。
- 如果你希望**左边界也自动贴到内容最左端**，关掉 `Lock Left Boundary` 子选项即可（见第 4 节）。

### 3.3 颜色自动同步 Folder

- 被接管的 Region 的**颜色会跟随对应 Folder 轨道的颜色**。
- 改了 Folder 颜色，Region 颜色跟着变，一眼就能看出哪条 Region 对应哪个 Folder。

### 3.4 静音的内容不算数

- 子轨里**被 mute 的素材 / 整条 mute 的轨道**不计入内容范围（等于"这段没声音"），不会把 Region 边界撑大。

### 3.5 失配 / 删除时自动退出

- 你**改了名字让它们不再配对**，或**解散了那个 Folder**，或**删掉了 Region**——系统都会检测到，**自动把这条 Region 从接管名单里移除**（并把之前同步上去的颜色清掉）。干净退出，不留垃圾。

---

## 4. 子选项：Lock Left Boundary（锁定左边界）

这个开关在 `Enable Adaptive Regions` 下方，**默认开启**。

| 状态 | 行为 |
| --- | --- |
| **开（默认）** | 只自动调整**右边界**；左边界**保持你画的位置**不变。 |
| **关** | 左、右边界**都**自动贴到内容的最左 / 最右端。 |

```
Lock Left Boundary 开（默认）：
   你画的位置 ┃                      ┃ ← 这头会自己长
             [════════════════]
              ▓▓▓▓▓      ▓▓▓▓▓
              左边界钉死       右边界跟随

Lock Left Boundary 关：
             ┃                      ┃ ← 两头都自己贴
             [════════════════]
              ▓▓▓▓▓      ▓▓▓▓▓
              两端都贴着内容
```

> 简单说：**想要 Region 的起点完全由你掌控 → 保持开启**；**想要 Region 完全自动包裹内容（两头都贴）→ 关掉它**。

---

## 5. 配套 Action：一键把 Folder 对齐到 Region

正常情况下你**靠改名**就能让 Region 和 Folder 配对（见 2.2）。但如果你嫌一个个改 Folder 名字麻烦，可以用这个 Action 让它们**一键对上**：

| Action 名称（在 Action List 里搜 `Region Flow` 或 `Bind`） | 作用 |
| --- | --- |
| **`Assistants - Region Flow - Bind Region Under Cursor to Selected Folder Track`** | 把**当前选中的顶层 Folder**，改名对齐到**光标所在 Region**，并立即配对 |

用法：

```
1. 选中一个顶层 Folder 轨道（有且只能选一个）
2. 把编辑光标移到某条 Region 的时间范围内
3. 跑这个 Action
4. → 该 Folder 被改名成 Region 的"名字主干" → 立刻配对、立刻对齐边界和颜色
```

> 它做的本质就是"**帮你把 Folder 改成和 Region 同名**"，省掉手动改名这一步。改完名之后，跟随逻辑和第 3 节完全一样。

如果条件不满足，它会弹提示告诉你原因，常见的有：

- 没开 Adaptive Regions 总开关；
- 没有**恰好选中一个**顶层 Folder 轨道；
- 光标**不在任何 Region 范围内**；
- 这条 Region 已经配对给别的 Folder 了 / 这个 Folder 已经配对给别的 Region 了（一对一关系）。

---

## 6. 和 Render Queue 的配合

被 Adaptive Regions 接管的 Region，会在 **Render Queue** 的素材列表里（`Master Mix - Regions` 那一类）行尾**标一个小圆点徽标**，让你一眼看出"这条 Region 是被自动跟随管理着的"。

这条非常适合的工作流：**Region 边界自己贴着素材长好 → 直接进 Render Queue 按 Region 批量渲染**，不用担心边界没对齐导致渲染多/少一截。
（Render Queue 用法见 `render-queue.md`）

---

## 7. 和 Mirror 怎么选

两者解决的是**同一个问题的两个方向**，二选一即可（开一个会自动关掉另一个）。

| | **Mirror** | **Adaptive Regions** |
| --- | --- | --- |
| 谁是"主"？ | Folder 上的概览块（系统生成） | **Region（你自己画、自己命名）** |
| 谁来建概览段？ | 系统**自动建** | **你来画 Region** |
| 谁来删？ | 系统自动管 | **你删 Region，系统跟着退出** |
| 怎么配对？ | 子轨有内容就自动盖 | **靠"名字主干一致"** |
| 适合阶段 | 从零搭结构、边做边看 | **中后期：命名/Region 已定，做整合迭代** |
| 典型场景 | 用 Folder 概览声音结构 | 3A 占位 wav、Wwise 绑定、素材整合 |

> 一句话：**喜欢"先有 Folder、让系统帮我标段落" → 用 Mirror**；**喜欢"我自己画 Region 排好版、让边界自己贴素材" → 用 Adaptive Regions**。

---

## 8. 典型工作流

### 工作流 A：Region 先行，边界自动贴素材

```
1. Preferences → 勾 Enable Adaptive Regions
2. 建顶层 Folder「footstep」，挂子轨
3. 画好一排 Region，命名 footstep_01 / footstep_02 …（主干都是 footstep）
4. 往子轨里填素材
5. → 每条 Region 的右边界自动贴住对应内容；颜色同步 Folder
6. 之后随便改素材，边界实时跟随
```

### 工作流 B：已有命名规范的 Region，让边界"自愈"

```
1. 工程里已经有一批画好、命名规范的 Region
2. 建 / 命名好同名主干的顶层 Folder，往里填素材
3. 勾 Enable Adaptive Regions
4. → 名字对得上的 Region 自动被接管，边界对齐到素材
（嫌改 Folder 名麻烦时：选中 Folder + 光标放进 Region，跑第 5 节的 Bind Action 一键对齐）
```

### 工作流 C：贴好边界 → 直接批量渲染

```
1. 开 Adaptive Regions，Region 边界都自动贴好素材
2. 打开 Render Queue，用 "Master Mix - Regions" 选取这些 Region
3. → 被接管的 Region 带小徽标，边界已对齐，放心批量渲染
```

---

## 9. 注意事项与排查

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 勾了开关但 Region 不跟随 | Region 名字和 Folder 名字"主干"对不上 | 让两者主干一致（见 2.2 的对照表），或用 Bind Action 一键对齐 |
| 总开关 / 子选项是灰的或勾不上 | REAPER 版本低于 v7.62 | 升级到 REAPER v7.62+ |
| 子选项 `Lock Left Boundary` 是灰的 | `Enable Adaptive Regions` 总开关没开 | 先勾总开关 |
| 只动右边界，左边界不动 | 这是默认行为（`Lock Left Boundary` 开着） | 想两头都动就关掉 `Lock Left Boundary`（见第 4 节） |
| 配的是**子 Folder** 里的内容，没反应 | 只有**顶层 Folder** 参与配对 | 把要配对的 Folder 放到顶层 |
| Region 边界没把某段素材算进去 | 那段素材或所在轨道被 mute 了 | 取消 mute；mute 的内容不计入范围（见 3.4） |
| 开 Adaptive Regions 后 Mirror 自己关了 | 两者互斥，开一个会自动停掉另一个 | 正常行为；二选一 |
| Bind Action 报"select exactly one folder" | 没选中、或选了多个、或选的不是顶层 Folder | 只选一个顶层 Folder 轨道再跑 |
| Bind Action 报"cursor not within any region" | 编辑光标不在任何 Region 范围内 | 把光标移进目标 Region 再跑 |
| Bind Action 报"already bound" | 该 Region 或该 Folder 已经配对给别的对象了 | 一对一关系；先解除已有配对，或换一个对象 |
| 删了 Region / 解散了 Folder 后有残留 | （会自动处理）系统会把失配项移出接管名单 | 等一次自动同步即可，无需手动清理（见 3.5） |
| 在 Action List 搜 `Mirror` 找不到这个 Action | 它属于 `Region Flow` 那一组 | 改搜 `Region Flow` 或 `Bind` |

---
