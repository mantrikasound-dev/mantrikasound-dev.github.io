# Mirror 用户手册

> 适用版本：Mantrika Tools（当前主线）

---

## 1. 概述

**Mirror** 是一个**后台自动跟随**的工作流功能，定位是"**在 Folder Track上，自动生成一排概览块，实时反映这个 Folder 里所有子轨道'有声音的地方'**"。

Mirror 的做法是：**在 Folder 轨道上，自动放一排"Mirror"（Empty item）**，每一段正好盖住它下面所有子轨内容的时间范围。子轨里的素材一移动、一增删，这排Mirror就**实时跟着变**——你不用做任何操作，它自己跟。

```
Folder「Footsteps」 │  ▓▓▓▓▓▓       ▓▓▓▓        ▓▓▓▓▓▓▓   │ ← Mirror（自动生成、自动跟随）
  ├ 子轨 A          │  ■■■■          ■■           ■■■■■   │
  └ 子轨 B          │     ■■■       ■■■           ■■      │
                       └─并集─┘    └并集┘       └──并集──┘
```

> **它和 "Adaptive Regions" 是互斥的**：两者都在接管 Folder 的概览，不能同时开。开 Mirror 时会自动把 Adaptive Regions 关掉。

> **这是一个没有独立窗口的功能**。它没有自己的界面，全部通过 **Preferences 里的几个开关**启用，启用后就在后台默默工作。所以本手册重点讲两件事：**怎么打开它**，以及**每个开关到底干什么**。

---

## 2. 如何开始使用

### 2.1 打开开关

菜单入口：

```
Extensions -> MantrikaTools -> Mantrika Options -> Preferences...
```

（也可以在 Action List 搜 **`Preferences...`**）

打开 Preferences 窗口后，找到 **`Mirror Segments`** 这一节，勾上第一个开关：

```
■ Mirror Segments
  ☑ Enable Mirror Segment          ← 总开关，先勾这个
      ☐ Auto Create Regions
      ☐ Auto Sync Segment Names
      ☐ Auto Track Name from Mirrors
      ☐ Auto Mirror Large Text Display
      ☐ Include Automation Items (Experimental)
```

下面那一排是**子功能**，按需勾选（见第 4 节）。总开关不开时，子功能是灰的。

### 2.2 让Mirror出现

开关开好后，回到工程：

```
1. 建一个 Folder 轨道（父轨），下面挂上几条子轨
2. 在子轨上放一些 item（素材）
3. → Folder 轨道上自动出现Mirror，盖住子轨内容的时间范围
```

之后你在子轨里**移动、缩放、增删 item**，Folder 上的Mirror都会**自动跟着调整**。不需要手动刷新。

> 开关状态会**记进配置**，下次开 REAPER 还是开着的。Mirror本身存在工程里，跟工程一起保存。

---

## 3. 核心概念

只有三个概念，理解了就全懂了。

### 3.1 Mirror

- 它是 Folder 轨道上的一个**Empty item**，长度 = 它下方所有子轨 item 的**时间并集**（重叠的会合并成一段）。
- **完全自动**：该建的时候建、该伸缩的时候伸缩、内容没了就删。你不用管它。
- 子轨里**被 mute 的 item / 整条 mute 的 Track**不计入并集（等于"这段没声音"）。

### 3.2 Note —— 给Mirror起名字（重点）

Mirror默认是没名字的。你可以给它写一段 **Note（文字）**，方法很简单：

```
1、点击空 item上的气泡按钮（取决于你用的主题） → 弹出文字编辑框 → 输入文字；
2、或者选中使用Simple Rename 或者 Advance Rename；
```

这段 Note 是整个 Mirror 系统的**核心元数据**，一处书写、多处复用：

| 你写的 Note | 会被用到哪里 |
| --- | --- |
| 生成 Region 时 | 当作 **Region 的名字**（见 4.1） |
| 推导轨道名时 | 当作 **Folder 轨道的名字来源**（见 4.3） |
| 大字显示时 | 在 item 上**放大显示**这段文字（见第 5 节） |
| 自动序号时 | 作为序列命名的**模板**（见 4.2） |

> 简单说：**想让Mirror"有意义"，就给它写 Note。** 后面那些自动化功能，几乎都是围着这段 Note 转的；
> 并且Mirror Note 还能兼顾Render时的file name；

### 3.3 Mute = 冻结（Freeze）

如果你**把某个Mirror mute 掉**，它就被"**冻结**"了：

- 冻结的Mirror**不再自动跟随**子轨内容（不会被移动、不会被删除）。
- 相当于把这一段"**钉死**"在当前位置。
- 想恢复自动跟随？**取消 mute** 即可。

---

## 4. 子功能开关详解

下面这些开关，都在 `Enable Mirror Segment` 下方。**默认全部关闭**，按需开。

### 4.1 Auto Create Regions（自动生成 Region）

勾上后，**最顶层的 Folder**（不是嵌套在别的 Folder 里的）上的每一个Mirror，都会在时间线上**自动生成一条对应的 Region**：

- **Region 的名字** = Mirror的 Note（没写 Note 就叫 `Mirror Region`）。
- **Region 跟Mirror实时同步**：Mirror位置/长度变，Region 跟着变；Note 改了，Region 名字跟着改。
- **Region 颜色**跟随 Folder 轨道的颜色（颜色同步需要 REAPER v7.62+）。
- 你**手动拖动 Region**时，它会**自动吸附回**Mirror的位置（以Mirror为准）。
- **关掉这个开关**时，会自动**清理掉所有由它生成的 Region**（只删它自己建的，不碰你手画的）。

> 这条非常适合"**用 Folder 圈好声音段 → 自动得到一排带名字的 Region → 直接拿去 Render Queue 批量渲染**"的工作流。

### 4.2 Auto Sync Segment Names（自动同步段名 / 序号）

勾上后，对于**连续的、命名有规律的**Mirror，会自动帮你**接着编号**：

- 数字序列：`footstep_01`、`footstep_02`、`footstep_03`…（保留前导零的位数）
- 字母序列：`swing_a`、`swing_b`、`swing_c`…

你只要给序列开头的那个Mirror写好 Note（比如 `footstep_01`），后面同名的就会**自动续号**，省得一条条手敲。

### 4.3 Auto Track Name from Mirrors（用Mirror命名轨道）

勾上后，会**反过来用Mirror的 Note 给 Folder 轨道起名**：

- 取 Note 的"**主干**"（去掉结尾的数字、字母后缀和分隔符）作为 Folder 轨道名。
- 例：Mirror叫 `footstep_01`，Folder 轨道就会被命名为 `footstep`。

### 4.4 Auto Mirror Large Text Display（自动大字显示）

勾上后，所有Mirror的 Note 会以**放大/拉伸文字**的样式显示在 item 上，远看也清楚。详见第 5 节。

> ⚠️ **这个"自动"模式比较吃性能**（每次同步都要处理）。相对来说，**更推荐用第 6 节的 Action 手动触发，自动刷一下**，而不是常开这个开关。
>

### 4.5 Include Automation Items（实验性：纳入自动化 item）

勾上后，子轨上的 **Automation Item** 的时间范围也会被算进Mirror的并集里（默认只看普通的 media item）。

> ⚠️ **实验性功能，可能不太稳**。不确定要不要用就别开。

---

## 5. 大字 Note（拉伸文字显示）

REAPER 默认在空 item 上显示的文字很小。**大字显示**会把Mirror的 Note **放大铺满整个 item**，让你在 Arrange 区一眼就能读到每一段叫什么。

```
普通显示：  │footstep_01      │   ← 文字小，挤在角落
大字显示：  │  FOOTSTEP_01    │   ← 文字放大铺满，远看也清楚
```

两个前提：

1. **只对写了 Note 的 Mirror生效**。空 Note 的 item 设了也没用（REAPER 底层会忽略）。
2. 触发方式二选一：
   - **常开自动**：勾 `Auto Mirror Large Text Display`（吃性能，见 4.4）。
   - **手动触发**（推荐）：用下面的 Action，需要的时候点一下就行。

---

## 6. 配套 Actions

这几个 Action 在 Action List 里搜 **`Mirror`** 就能找到，也可以绑快捷键。它们是对Mirror的**一次性批量操作**：

| Action 名称（Action List 里搜） | 作用 |
| --- | --- |
| **`Assistants - Mirror - Apply Stretched Text to All Mirrors`** | 给**工程里所有**Mirror一次性套上大字显示 |
| **`Assistants - Mirror - Apply Stretched Text to Selected Mirrors`** | 只给**当前选中**的Mirror套大字显示 |
| **`Assistants - Mirror - Clear All Mirrors`** | **一键清空**所有Mirror及其关联 Region（见第 8 节） |
| **`Assistants - Mirror - Create Static Regions from Mirrors`** | 把有 Note 的Mirror**"烧录"成静态 Region** |

关于最后一个 **Create Static Regions**：

- 它根据**有 Note 的Mirror**，生成一批 **Region**（Region 名 = Note 第一行）。
- 关键区别：这些 Region 是**静态的**——**不**受 Mirror 系统管理、**不**会再跟着Mirror动。

> 还有一个**相关但不在这组里**的 Action：**`Assistants - Mark Regions For Adoption`**——让 Mirror **接管你已经画好的 Region**（把命名继承过去）。它的用法单独见 **第 7 节**。
> 注意：它在 Action List 里要搜 **`Adopt`** 或 **`Regions`**，**搜 `Mirror` 找不到它**。

---

## 7. Region 收养（让 Mirror 接管已有 Region）

前面讲的都是 **Mirror → Region**（Mirror 派生出 Region）。**收养是反方向**：你手上**已经有一批 Region**（自己画的，或用 Action「mantrika : Markers - Create Regions From Items (remove extensions)」批量生成的，命名都对），想让 **Mirror 把它们接管过来**——继承命名、之后归 Mirror 统一管理。

> 典型场景：游戏音频迭代。先导入一批命名规范的素材 → 用 Action「mantrika : Markers - Create Regions From Items (remove extensions)」一键出一排带名 Region → 现在希望 Mirror 直接**继承**这些名字，而不是再一条条手敲 Note。

### 7.1 怎么用

```
1. 把 Region 命名好
2. 跑 Action：Assistants - Mark Regions For Adoption  → 目标 Region 变「橙色」，排进待收养队列
3. 建好 Folder + 子轨素材，让 Folder 上长出 Mirror
4. → 新 Mirror 自动吃掉与它「时间重叠」的橙色 Region：名字写进 Mirror Note，老 Region 退化成普通 Marker
5.（开了 Auto Create Regions 时）Mirror 用继承来的名字，派生出一条自己管理的新 Region
```

**第 2 步的 Action**（`Assistants - Mark Regions For Adoption`）做的事：

- 扫描工程里**所有不是 Mirror 创建**的 Region，把它们标成 **橙色**，排进"待收养"队列。
- 已经被 Mirror 系统管理的 Region **不动**（不会被重复标记）。
- 工程里没有可收养的 Region 时，会弹个提示框告诉你。

**第 4 步的"收养"**（在 Mirror 新建那一刻自动发生）具体做三件事：

| 步骤 | 动作 |
| --- | --- |
| 1 | Region 的**名字** → 写进 Mirror 的 **Note** |
| 2 | 原来那个 **Region** → 变成一个**普通空 Marker**（位置留着，名字清空） |
| 3 | （需 `Auto Create Regions` 开）Mirror 用继承的名字**派生一条自己的新 Region** |

### 7.2 几个关键点

- **靠时间重叠匹配**：Mirror 和 Region 只要时间上有**任意重叠**就算命中，不要求严格对齐。一个 Region **先到先得**，被一个 Mirror 收养。
- **收养只在 Mirror「新建」那一刻发生**：已经存在的老 Mirror **不会**回头去收养。所以正确顺序是**先标记 Region，再让 Mirror 长出来**。如果 Mirror 已经在了，可以改动子轨内容让它重建，或先 `Clear All Mirrors` 再重新生成。
- **名字继承不挑开关**：上面表里的第 1、2 步（Region 名 → Note、老 Region → Marker）跟 `Auto Create Regions` **无关**，开不开都做；只有第 3 步「再派生一条受管 Region」需要 `Auto Create Regions` 开着。
- **橙色 = "待收养"的视觉标记**：标记后 Region 变橙，方便你一眼看出哪些在排队。被收养掉的 Region 已经变成 Marker，不会再被二次收养。
- **不支持 Undo**：它是一次性的批量整理操作。

---

## 8. 清理

Mirror 大部分清理都是**自动**的，但也有手动的总闸。

### 8.1 自动清理（后台默默做）

- **孤立Mirror**：如果一条轨道**不再是 Folder**（比如你解散了文件夹），它上面残留的Mirror会被**自动删除**。
- **孤儿 Region**：开了 Auto Region 时，没有任何Mirror再引用的"managed Region"会被**自动回收**。
- **关 Auto Region 开关** → 自动删掉所有它生成的 Region。
- **关 Mirror 总开关** → 清掉 Mirror 造成的轨道编组（item grouping）。

### 8.2 手动清理（一键归零）

想彻底清干净，用 Action：

```
Assistants - Mirror - Clear All Mirrors
```

它会**逆序删除工程里所有Mirror + 它们关联的 Region + 清掉相关编组**，相当于一次"重置"。当Mirror乱了、或者你想从头来过时用它。

> 注意：`Clear All Mirrors` 删的是 Mirror 系统的东西（Mirror + 它管理的 Region）。你**手动画的 Region** 不受影响。

---

## 9. 典型工作流

### 工作流 A：用 Folder 概览声音结构

```
1. Preferences → 勾 Enable Mirror Segment
2. 工程里建 Folder，挂子轨，子轨放素材
3. → Folder 上自动出现Mirror，一眼看清"哪段有内容"
4. 折叠 Folder 也不影响——Mirror就是那个折叠后的概览条
```

### 工作流 B：Folder 段落 → 自动 Region → 批量渲染

```
1. 勾 Enable Mirror Segment + Auto Create Regions
2. 用子轨内容把每段声音圈好，Folder 上自动生成Mirror
3. 双击每个Mirror，写好 Note（= 这段的名字）
4. → 时间线上自动出现一排带名字的 Region
5. 打开 Render Queue，用 "Master Mix - Regions" 一次性全渲
```
（Render Queue 用法见 `render-queue.md`）

### 工作流 C：批量命名 + 大字概览

```
1. 勾 Enable + Auto Sync Segment Names
2. 给序列第一个Mirror写 footstep_01
3. → 后面同类的自动续号 footstep_02 / 03 …
4. 跑一次 Action：Apply Stretched Text to All Mirrors
5. → Arrange 区每段都大字显示名字，结构一目了然
```

### 工作流 D：把当前划分"定格"成永久 Region

```
1. 段落和 Note 都调满意了
2. 跑 Action：Create Static Regions from Mirrors
3. → 得到一批不再变动的静态 Region
4. （可选）之后 Clear All Mirrors / 关掉 Mirror，静态 Region 依然保留
```

### 工作流 E：把已有的 Region 交给 Mirror 接管

```
1. 已经有一批命名好的 Region（手画的，或 REAPER「根据 item 名创建 Region」生成的）
2. 勾 Enable Mirror Segment + Auto Create Regions
3. 跑 Action：Assistants - Mark Regions For Adoption  → 这些 Region 变橙
4. 建 Folder，挂子轨，在对应位置放上素材 → Folder 上长出 Mirror
5. → Mirror 自动继承重叠 Region 的名字（写进 Note）；老 Region 退化成 Marker
6. → Mirror 用这个名字派生出自己管理的新 Region，之后统一归 Mirror 跟随
```
（详见第 7 节；注意"先标记、再让 Mirror 长出来"的顺序）

---

## 10. 注意事项与排查

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 勾了开关但 Folder 上没出现Mirror | 子轨里没有 item；或那条轨道其实不是 Folder | 确认是真正的 Folder 轨（有子轨），且子轨上有素材 |
| 子选项开关是灰的 | `Enable Mirror Segment` 总开关没开 | 先勾总开关 |
| 某个Mirror怎么编辑都不动 / 不跟随了 | 它被 mute 了，处于"冻结"状态 | 取消 mute 即可恢复自动跟随（见 3.3） |
| 没有自动生成 Region | 没开 Auto Region；或该 Folder 是**嵌套子 Folder**（只有顶层 Folder 才生成 Region） | 勾 Auto Create Regions；把要出 Region 的 Folder 放到顶层 |
| Region 名字是 `Mirror Region` | 对应Mirror没写 Note | 主动给Mirror写上 Note（见 3.2） |
| 大字显示设了没反应 | 该Mirror Note 为空 | 先写 Note，再套大字 |
| 开 Mirror 后 Adaptive Regions 自己关了 | 两者互斥，开 Mirror 会自动停掉 Adaptive Regions | 正常行为；二选一 |
| 自动大字显示让工程变卡 | 常开的自动大字模式较吃性能 | 关掉 `Auto Mirror Large Text Display`，改用 Action 手动触发 |
| 解散 Folder 后留下一些空 item | （会自动处理）孤立Mirror会被自动清除 | 等一次同步即可；或跑 Clear All Mirrors |
| Action List 里搜不到 Mark Regions For Adoption | 它不在 `Mirror` 那一组 | 改搜 `Adopt` 或 `Regions`（见第 7 节） |
| 跑了收养 Action，Region 也变橙了，但 Mirror 没继承名字 | 收养只在 Mirror **新建**时发生，老 Mirror 不会回头收养 | 先标记 Region，再让 Mirror 长出来；已有 Mirror 可改子轨触发重建，或先 Clear All Mirrors 再重建 |
| 收养后只剩 Marker + Mirror 有了 Note，但没生成新的受管 Region | 没开 `Auto Create Regions`（名字继承会做，但派生新 Region 需要它） | 勾上 Auto Create Regions |

---
