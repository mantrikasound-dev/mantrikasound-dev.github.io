# Simple Rename 用户手册

> 适用版本：Mantrika Tools（当前主线）

---

## 1. 概述

**Simple Rename** 是 Mantrika Tools 提供的极简快速重命名工具，定位是"**打开即用、回车即生效**"。
它把最常用的三种重命名需求压缩进一个横条窗口：

- 一次性把一组对象**统一改名**
- 给一组对象**按列表逐个改名**
- 带**顺序编号**批量改名

适用对象：

| 对象类型                          | 支持                   |
| ----------------------------- | -------------------- |
| **Items**                     | ✅                    |
| **Mirror**                    | ✅                    |
| **Tracks**                    | ✅                    |
| **Items + Mirror 混合**（含折叠组场景） | ✅                    |
| Regions / Markers             | ❌ 请使用Advanced Rename |

**选区识别规则**：只要选区里有任何 item（含 Mirror），Simple Rename 就**只处理 item**；只有完全没选 item 时才会处理选中的 track。所以想给轨道改名，请先取消所有 item 选择。

---

## 2. 打开方式

菜单入口：

```
Extensions → MantrikaTools → Rename tool (simple)
```

或在 Action List 搜：

| Action 名称 | 用途 |
| --- | --- |
| **`mantrika : Synergy - Simple Rename`** | 打开 / 关闭 Simple Rename 窗口 |

---

## 3. 界面总览

```
┌────┬─────────────────────────────────────────┬──────┬───────┐
│ ⠿  │  (大输入框)                              │ List │  01   │
└────┴─────────────────────────────────────────┴──────┴───────┘
 拖拽    可输入文本 / 逗号分隔的名字列表          模式切换  编号切换
 手柄
```

| 区域          | 说明                                          |
| ----------- | ------------------------------------------- |
| **左侧拖拽手柄**  | 显示 Mantrika logo。按住可拖动窗口——这里是窗口**唯一**的拖拽区。  |
| **大输入框**    | 所有名字 / 名字列表都在这里输入。按 **Enter** 执行重命名。        |
| **List 按钮** | 三态切换，控制输入框里的内容如何被解释（详见 §5）。                 |
| **01 按钮**   | 三态切换，控制是否在末尾追加 `_01 _02 _03 ...` 编号（详见 §6）。 |

---

## 4. 基础用法 —— 全部改成同一个名字

最常见的场景：把选中的 N 个对象**全部改成同一个名字**。

**操作步骤**：

1. 在 REAPER 里选中要重命名的对象。
2. 打开 Simple Rename 窗口。
3. 保持 **List: OFF**、**01: OFF**（默认即如此）。
4. 在输入框输入想要的名字，例如 `Footsteps`。
5. 按 **Enter**。

**结果**：所有选中的对象都被改名为 `Footsteps`。

> Simple Rename **不会**因为"改完会出现重复名字"而拒绝执行。如果你就是想让 10 个 item 都叫 `Footsteps`，它会老实照做。需要避免重复时，请加上 Numbering（§6）。

---

## 5. List 模式 —— 按列表逐个改名

如果你想给选中的对象**分别**指定不同的名字（而不是统一改成一个），打开 List 模式。

每次点击 List 按钮，状态循环：

```
OFF  →  ON  →  Group by Track  →  OFF
灰        绿              橙
```

### 4.1 List: ON —— 一对一

按钮颜色：**抹茶绿**。

**输入约定**：在输入框中用**英文逗号** `,` 分隔多个名字；每个名字前后的空白会自动去除；空名字会被跳过。

**举例**：选中 3 个 items，输入：

```
Punch, Kick, Slap
```

按 Enter 后：

| 位置         | 新名字     |
| ---------- | ------- |
| 第 1 个 item | `Punch` |
| 第 2 个 item | `Kick`  |
| 第 3 个 item | `Slap`  |

**对象的顺序**由"先按轨道再按时间"规则决定（同一时间线上、上面的轨道排在前面）。

### 4.2 List: Group by Track —— 按轨道分组

按钮颜色：**琥珀橙**。

这是给 Items / Mirror 设计的特殊模式，用于"**同一个 track 上的所有 items 共享同一个名字，不同 track 用不同名字**"的场景。

**输入约定**：用逗号分隔，每个名字对应一个 **track**（按 track 在选区中**首次出现**的顺序——通常就是从上到下的轨道顺序）。

**举例**：选中 6 个 items，分布如下：

```
Track A:  itemA1, itemA2, itemA3
Track B:  itemB1, itemB2
Track C:  itemC1
```

输入：

```
Foley, Voice, FX
```

按 Enter 后：

```
Track A:  Foley,  Foley,  Foley
Track B:  Voice,  Voice
Track C:  FX
```

**各对象类型下 Group by Track 的实际行为**：

| 选中的对象                 | Group by Track 行为                                      |
| --------------------- | ------------------------------------------------------ |
| **Items**             | ✅ 真正按所属 track 分组                                       |
| **Mirror**            | ✅ 同上（Mirror 按所挂的折叠 track 分组）                           |
| **Items + Mirror 混合** | ✅ 同上                                                   |
| **Tracks**            | ⚠️ **退化为 List: ON**——每个 track 之间天然不可分组，行为与 List: ON 一致 |

> 在 Tracks 上 List 按钮显示橙色不是 bug，而是这些对象之间天然没有"分组"关系。橙色与绿色在 Tracks 上效果完全相同。

### 4.3 输入框边框颜色 —— 实时数量提示

只要 List 模式打开，输入框边框会**实时**对比"你输入的名字数量"与"要改的对象数量"：

| 边框颜色        | 含义             | 能否执行           |
| ----------- | -------------- | -------------- |
| 🟦 淡蓝（细）    | List 关闭、或输入框为空 | —              |
| 🟩 **绿（粗）** | 数量精确匹配         | ✅ 可以按 Enter 执行 |
| 🟧 橙（粗）     | 输入的名字**比对象多**  | ❌ 按 Enter 无反应  |
| 🟥 红（粗）     | 输入的名字**比对象少**  | ❌ 按 Enter 无反应  |

**重要：橙 / 红 状态下按 Enter 是"静默拒绝"** —— 不报错、不弹窗、什么也不发生。这是有意为之的保护，避免漏掉对象或让出现多余名字。

> 调整方法：直接编辑输入框，或者去 REAPER 里增删选区，边框颜色会**立刻**刷新。

**Group by Track 模式下数量怎么算？**

- **Items / Mirror 上**：算"涉及的**唯一 track 数**"，而**不是** item 数。所以 6 个 item 在 3 个 track 上时，你只需要输入 3 个名字就是绿色。
- **Tracks 上**：算选中的 track 数，跟 List: ON 一样。

---

## 6. Numbering 模式 —— 追加顺序编号

`01` 按钮支持三态切换：

```
OFF  →  ON  →  Reset on Change  →  OFF
灰        绿               橙
```

编号格式**固定**为 `_NN`：

- 从 `_01` 开始
- 宽度 2 位补零（`_01 _02 ... _09 _10`）
- 超过 99 自然递增成 `_100 _101 ...`（不再补零，正常累加）

### 5.1 Numbering: ON —— 全局连续编号

按钮颜色：**抹茶绿**。

编号在所有对象之间**连续递增**，跟生成的名字本身是否相同**无关**。

**举例 1**：选中 4 个 items，输入 `Hit`，List: OFF、Numbering: ON：

```
Hit_01
Hit_02
Hit_03
Hit_04
```

**举例 2**：同时配合 List: ON，输入 `Punch, Kick, Slap`：

```
Punch_01
Kick_02
Slap_03
```

### 5.2 Numbering: Reset on Change —— 名字变化时重置

按钮颜色：**琥珀橙**。

**当生成的名字与前一个不同时，编号会重新从 `_01` 开始**。这个模式专门搭配 **List: Group by Track**（或其他会产生连续重复名的情况）使用。

**举例**：6 个 items 分布在 3 个 track 上，List: **Group by Track** + Numbering: **Reset on Change**，输入 `Foley, Voice, FX`：

```
Track A:  Foley_01, Foley_02, Foley_03
Track B:  Voice_01, Voice_02
Track C:  FX_01
```

每跨越一个 track（名字变了），编号就重置回 `_01`。

> ⚠️ 在 **List: ON** 下用 Reset on Change 是没问题的，但因为 List: ON 下每个名字都不一样，**每个对象都会触发重置**，结果是所有对象都拿到 `_01`。**Reset on Change 默认搭配会产生重复名的模式使用**。

---

## 7. List + Numbering 组合速查

下表以"6 个 items / 分布在 3 个 track 上 (3+2+1)"为统一样例：

| List               | Numbering           | 输入               | 结果                                                         |
| ------------------ | ------------------- | ------------------ | ------------------------------------------------------------ |
| OFF                | OFF                 | `Boom`             | `Boom, Boom, Boom, Boom, Boom, Boom`                         |
| OFF                | ON                  | `Boom`             | `Boom_01 ... Boom_06`                                        |
| OFF                | Reset on Change     | `Boom`             | `Boom_01 ... Boom_06`（名字始终未变，无重置机会）            |
| ON                 | OFF                 | `A, B, C, D, E, F` | `A, B, C, D, E, F`                                           |
| ON                 | ON                  | `A, B, C, D, E, F` | `A_01, B_02, C_03, D_04, E_05, F_06`                         |
| ON                 | Reset on Change     | `A, B, C, D, E, F` | `A_01, B_01, C_01, D_01, E_01, F_01`（每个都触发重置）       |
| Group by Track     | OFF                 | `Foley, Voice, FX` | `Foley, Foley, Foley, Voice, Voice, FX`                      |
| Group by Track     | ON                  | `Foley, Voice, FX` | `Foley_01, Foley_02, Foley_03, Voice_04, Voice_05, FX_06`    |
| **Group by Track** | **Reset on Change** | `Foley, Voice, FX` | **`Foley_01, Foley_02, Foley_03, Voice_01, Voice_02, FX_01`** |

---

## 8. 操作细节

### 7.1 Enter = 执行

输入框获得焦点时，按 **Enter** 直接执行重命名。窗口里没有"OK"按钮，也不需要鼠标点击什么——所有操作都围绕回车键设计。

### 7.2 执行被静默拒绝的三种情况

以下情况下按 Enter **什么都不会发生**（不报错、不弹窗）：

1. 没有选中任何对象。
2. 输入框为空。
3. List 模式打开 + 数量不精确匹配（边框是橙或红）。

### 7.3 成功反馈

重命名执行成功后：

- 输入框边框会**短暂亮绿闪烁并淡出**，持续约 **0.6 秒**。
- 焦点自动回到输入框，方便你立刻进行下一轮操作。
- 自动刷新，准备好处理下一次选区。
- REAPER中的Undo History 会产生一条记录，描述为 **"MTK Simple Rename"**。

### 7.4 自动跟随选区变化

窗口打开期间，Simple Rename **约每 100ms** 检查一次 REAPER 选区是否变化。一旦变化，会自动刷新内部数据、重新评估边框颜色提示——你无需手动"刷新"。

### 7.5 拖动窗口

只有**左侧 logo 手柄区**可以拖动整个窗口。输入框和按钮区会拦截鼠标用于自身交互——这是预期行为。

### 7.6 Undo

每一次成功的回车执行都会生成一条 REAPER 撤销记录，描述为 **"MTK Simple Rename"**。用 `Ctrl+Z` 可正常撤销。

> 如果回车后实际没有任何对象的名字发生变化（例如新名字恰好与原名字一致），不会写入撤销记录。

---

## 9. 典型工作流

### 工作流 A：把 5 段脚步声统一编号

```
1. 选中 5 个脚步声 items
2. List: OFF, Numbering: ON
3. 输入:  Footsteps_Wood
4. Enter
```

**结果**：`Footsteps_Wood_01 ... Footsteps_Wood_05`

---

### 工作流 B：给 6 个不同动作命名

```
1. 选中 6 个动作 items
2. List: ON, Numbering: OFF
3. 输入:  Punch, Kick, Slap, Smack, Throw, Slam
4. Enter
```

**结果**：6 个 items 各自得到对应的名字。

---

### 工作流 C：按 track 给一批 take 素材编组并编号 ⭐ 推荐组合

最常见的角色分类场景：

```
1. 选中多 track 上的所有 take items：
   - Track A: 玩家动作 6 个
   - Track B: NPC 动作 4 个
   - Track C: 环境音 2 个
2. List: Group by Track, Numbering: Reset on Change
3. 输入:  Player, NPC, Ambient
4. Enter
```

**结果**：

```
Track A:  Player_01 ... Player_06
Track B:  NPC_01    ... NPC_04
Track C:  Ambient_01, Ambient_02
```

---

### 工作流 D：给 3 条轨道改名

```
1. 取消所有 item 选择（重要：有 item 选中时不会处理 track）
2. 选中 3 条轨道
3. List: ON, Numbering: OFF
4. 输入:  Vocal, Drums, Bass
5. Enter
```

**结果**：三条轨道分别改名为 `Vocal` / `Drums` / `Bass`。

---

### 工作流 E：在原名字基础上做修改

❌ Simple Rename **不支持**这种需求。

Simple Rename 是**覆盖式**重命名——它写入的就是输入框里的字面内容，**不会**保留对象原名字。
如果你的需求是：

- 在原名字基础上加前缀 / 后缀
- 查找 & 替换原名字中的某段
- 大小写转换（UPPER / lower / Title）
- 清理冗余空格 / 特殊字符
- 与 UCS 命名规范交互

请改用 **Advanced Rename**——它是基于规则链的高级重命名工具。

---

## 10. 注意事项

### 9.1 这是"覆盖式"重命名

输入框里写的就是最终结果，**不会**保留对象的原名字。需要"基于原名字处理"请用 Advanced Rename（见 §9-E）。

### 9.2 不会自动避免重名

Simple Rename 不会因为"改完会出现重复名字"而拒绝执行。重名是允许的、也是常见的（一组同类素材本就该叫同样的名字）。如果你不想要重名，请打开 Numbering。

### 9.3 Group by Track 在 Tracks 上无独立效果

详见 §5.2 末尾的提示。按钮变橙不会出错，但行为与 List: ON 完全相同。

### 9.4 Items 选中优先于 Tracks 选中

只要选区里有任何 item（含 Mirror），就只处理 item。想给 track 改名时，请**先取消所有 item 选择**。

### 9.5 不处理 Regions / Markers

Simple Rename **不**支持 Region / Marker 的重命名。请使用 Region Work Flow 或 Advanced Rename。

---

## 11. 故障排查

| 现象                                          | 可能原因                 | 解决                                           |
| --------------------------------------------- | ------------------------ | ---------------------------------------------- |
| 按 Enter 无反应                               | 输入框为空               | 输入内容                                       |
| 按 Enter 无反应                               | 没有选中对象             | 在 REAPER 里先选对象                           |
| 按 Enter 无反应                               | List 模式下边框是橙 / 红 | 调整输入数量或选区数量，让边框变绿             |
| 想改轨道却没生效                              | 同时选了 item            | 取消所有 item 选择                             |
| Group by Track 按钮橙色但效果跟 List: ON 一样 | 当前选中的是 tracks      | 这是预期行为，见 §5.2                          |
| 输入框无法输入                                | 焦点不在输入框           | 点击输入框，或重新打开窗口（打开时会自动聚焦） |
| 想改 region / marker 但找不到入口             | Simple Rename 不支持     | 用  Advanced Rename                            |

