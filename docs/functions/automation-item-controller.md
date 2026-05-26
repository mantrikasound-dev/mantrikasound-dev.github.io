# Automation Item Controller

> 适用版本：Mantrika Tools（当前主线）

---

## 1. 概述

**Automation Item Controller** 是给 REAPER **automation item（AI）** 用的批量操控面板，定位是"**框选一批 AI → 一次性改完**"。

它围绕四件事展开：

- **Randomize**：把 AI 的 baseline / amplitude / start offset / playrate **随机化**——让同批 AI 产生细微差异，避免机械感。
- **Batch Set**：把这几个属性**统一设成一个值**——常用于"全部归零 / 全部恢复 1.0×"等场景。
- **Gradient**：让这几个属性沿时间轴**从 A 渐变到 B**——做 fade in/out 一类的整体演化。
- **LFO + Shape**：在每个 AI 内部**生成 LFO 包络**（正弦 / 三角 / 方波 / 锯齿），或对已有的包络点做**频率歪斜 / 高低倾斜**的二次塑形。

> 改的对象始终是 **AI 自身的属性 和 AI 内部的 envelope point**，不会动到 track / item / 媒体文件。

---

## 2. 打开方式

| 入口 | 路径 |
| --- | --- |
| 菜单 | `Extension → MantrikaTools → Automation item controller` |
| Action List（搜 "Automation Items"） | **`mantrika : Automation Items - Show Controller`** |

---

## 3. 主窗口界面总览

窗口固定 400×420，顶部是 4 个 tab，底部是状态栏：

```
┌──────────────────────────────────────────────┐
│  [Randomize]  [Batch Set]  [Gradient]  [LFO] │  ← tab 切换
│ ──────────────────────────────────────────── │
│                                              │
│           （当前 tab 的控件区）              │
│                                              │
│             [ Action 按钮 ]                  │
│ ──────────────────────────────────────────── │
│              Ready / 上次结果                │  ← 居中状态文字
└──────────────────────────────────────────────┘
```

| 区域 | 说明 |
| --- | --- |
| **Tab 区** | 4 个功能互不影响，参数各自保留 |
| **控件区** | 每行通常是 `[checkbox] [滑杆/输入]`，勾上才参与本次操作 |
| **底部按钮** | 没勾任何 checkbox 时按钮会灰着不能点（LFO/Shape 例外，总是可点） |
| **状态文字** | 待机显示 `Ready`，执行后用 **绿色** 显示这次跑了多少条 |

> **小技巧**：几乎所有滑杆都支持 **右键点击 = 恢复默认值**。改坏了不用慢慢拖回去。

---

## 4. 共同前提 —— 谁是目标？

四个 tab **共用同一套选择规则**：

> **只处理"在 arrange 里被选中（高亮）的 automation item"。**
> 跨 track、跨 envelope 都行；只要 AI 处于选中态就会被纳入。

操作流程永远是这两步：

```
1. 在 Arrange 里框选 / 点选要处理的 automation item
2. 切到对应 tab，配置参数，点底部按钮
```

如果没有选中任何 AI，状态栏会显示 `No automation items found` 并且什么都不做。

---

## 5. Randomize —— 给一批 AI 上"各不相同"的随机值

适合"100 个 AI 都来自同一个 pool，但希望听起来有点参差"。

### 5.1 界面

```
☐ Baseline      [ Min: 0.00 ]  [ Max: 1.00 ]
☐ Amplitude     [ Min: -1.00]  [ Max: 1.00 ]
☐ Start Offset  [ Min: 0.00 ]  [ Max: 10.00 ]
☐ Playrate      [ Min: 0.50 ]  [ Max: 2.00 ]

☐ Use Seed      [    0    ]

         [  Randomize  ]
```

### 5.2 四个属性是什么

| 属性 | 取值范围 | 作用 |
| --- | --- | --- |
| **Baseline** | 0 ~ 1 | AI 在 envelope 上整体的"基准高度"（0 = envelope 最小值，1 = 最大值） |
| **Amplitude** | -1 ~ 1 | AI 内部点的纵向缩放（负值会上下翻转） |
| **Start Offset** | 0 ~ 10 秒 | AI 内容相对自身起点的位移（做"错峰"用） |
| **Playrate** | 0.1 ~ 4 | AI 内部时间轴的播放倍速 |

### 5.3 使用

```
1. 选好一批 AI
2. 勾上想要随机化的属性（可多选）
3. 拖左右两个滑杆设定随机区间
4. （可选）勾 "Use Seed" 并填一个种子，得到可复现的随机序列
5. 点 Randomize
```

每个 AI 都会在 `[Min, Max]` 区间内独立取一个新值。

> **不勾 Use Seed = 每次跑都不一样**（用纳秒时间戳做种子）。
> 想复现"那次 magic 的结果"，记得当时把 seed 也勾着。
> Min 拖到比 Max 大也没事，工具会自动调过来。

---

## 6. Batch Set —— 一键把同一个值刷到所有选中 AI

适合"把所有 AI 的 playrate 都改回 1.0×"这类整齐划一的操作。

### 6.1 界面

```
☐ Baseline      [        0.50         ]
☐ Amplitude     [        0.00         ]
☐ Start Offset  [        0.00         ]
☐ Playrate      [        1.00         ]

         [  Apply Batch  ]
```

每行一个固定值滑杆，没有区间概念。

### 6.2 使用

```
1. 选好一批 AI
2. 勾上要改的属性
3. 把滑杆拖到目标值
4. 点 Apply Batch
```

> **常用快捷场景**：
> - 想"撤掉随机化"：勾全部 4 项，每项右键复位，再 Apply Batch。
> - 想统一恢复 playrate 1.0×：只勾 Playrate，值 = 1.00，Apply。

---

## 7. Gradient —— 让一批 AI 沿时间轴渐变

适合"前面的 AI 安静、后面的 AI 大声"或"做一个跨多个 AI 的整体 fade"。

### 7.1 界面

```
☐ Baseline
   From:  [        0.00         ]
   To:    [        1.00         ]

☐ Amplitude
   ...

Mode: [ Linear ▼ ]      ← Linear / Ease In / Ease Out / Ease In-Out

         [  Apply Gradient  ]
```

勾上的属性才会展开 From / To 两个滑杆。

### 7.2 渐变发生在哪个维度？

**不是在单个 AI 内部渐变，而是跨多个 AI 沿时间排开。**

工具会按每个 AI 的**起始位置**排序，最靠左的拿 From 值，最靠右的拿 To 值，中间的按曲线插值。

```
时间轴 →
[AI1] [AI2] [AI3] [AI4] [AI5]
 0%    25%   50%   75%  100%   ← Linear
```

### 7.3 Mode 怎么选

| Mode | 形状 | 用途 |
| --- | --- | --- |
| **Linear** | 直线 | 等距、机械 |
| **Ease In** | 慢起后冲 | 开头变化小，后段加剧 |
| **Ease Out** | 急起后稳 | 开头变化大，后段平 |
| **Ease In-Out** | S 形 | 两端缓，中间快 |

### 7.4 使用

```
1. 选好沿时间轴排开的多个 AI（一个 AI 没意义）
2. 勾要渐变的属性
3. 填好 From 和 To
4. 选一个 Mode
5. 点 Apply Gradient
```

> From / To **可以反着填**——填 From=1.0 / To=0.0 就是从大渐小。

---

## 8. LFO + Shape —— 在 AI 内部生成 / 改造包络点

这是唯一一个**真的去写 envelope point** 的 tab，前面三个都只改 AI 容器属性。LFO 区在上半，Shape 区在下半。

### 8.1 LFO Generator —— 从零生成包络

会**清空 AI 内现有的点**，按设定写入一条 LFO 波形。

```
Wave Type:  [ Sine ▼ ]    ← Sine / Triangle / Square / Saw Up / Saw Down
Cycles:     [   4 cycles   ]    ← 整段 AI 里塞几个完整周期，1~100
Phase:      [     0.00     ]    ← 相位偏移，0~1（0 = 不偏）
Freq Skew:  [      0       ]    ← -100 ~ 100，频率歪斜
Tilt:       [      0       ]    ← -100 ~ 100，高低倾斜

         [  Generate LFO  ]
```

**Wave Type**：

| 类型 | 形状 |
| --- | --- |
| Sine | 平滑正弦（贝塞尔点） |
| Triangle | 三角波（线性点） |
| Square | 方波（阶梯点） |
| Saw Up | 锯齿上升 |
| Saw Down | 锯齿下降 |

**Freq Skew**：把周期在时间轴上重新分布。

- **正值** → 前面的周期密、后面的稀（"前紧后松"）。
- **负值** → 反过来（"前松后紧"）。
- **0** → 等分。

**Tilt**：让波峰 / 波谷沿时间往一端逐渐拉向极值。

- **正值** → 波谷逐渐被抬高到 max（整体从对称变成"贴顶"）。
- **负值** → 波峰逐渐被压低到 min（整体从对称变成"贴底"）。
- **0** → 标准对称波。

> Volume envelope 比较特殊：Tilt 会在 dB 空间里算（更符合听感），底限是当前 center 下方 30 dB。

### 8.2 Shape —— 对已有点做塑形

**不清空、不重新生成**，而是读取 AI 现有的所有点，按 Freq Skew 重新分配时间位置，再按 Tilt 重塑幅度，最后写回去。

```
Freq Skew:  [      0       ]    ← 同 LFO 的 Freq Skew
Tilt:       [      0       ]    ← 同 LFO 的 Tilt

         [  Apply Shape  ]
```

两个参数语义和 LFO 完全一致；区别只在于"作用于谁"：

| | 作用对象 | 是否清空旧点 |
| --- | --- | --- |
| **LFO Generate** | 整段 AI 从头开始生成 | ✅ 会清空 |
| **Shape Apply** | 读现有点再改 | ❌ 不清空 |

> Shape 也能用在**你手画的 envelope** 上，不一定要先用 LFO 生成。
> 两个参数都是 0 时点 Apply 不会做任何事，状态栏会提示 `No shaping applied (both params are 0)`。

### 8.3 使用

```
全新生成：
  1. 选 AI
  2. LFO 区选波形、周期、可选 phase / skew / tilt
  3. Generate LFO
  4. 不满意可以反复点（每次都会先清空）

对已有包络塑形：
  1. 选 AI（里面要有点，不管是 LFO 生成的还是手画的）
  2. Shape 区调 Freq Skew / Tilt
  3. Apply Shape
```

---

## 9. 通用技巧

| 操作 | 行为 |
| --- | --- |
| 任意滑杆 **右键** | 复位到默认值 |
| 切换 tab | 参数互不影响，各自保留 |
| 没勾任何属性 | Randomize / Batch Set / Gradient 按钮灰掉（LFO / Shape 总是可点） |
| 没选中 AI | 按钮还是可点，但执行后会显示 `No automation items found` |
| 执行操作后 | 均支持 Ctrl+Z 撤销（进入 REAPER 标准撤销栈） |
| 关闭窗口 | 不会自动取消正在跑的操作；操作本身都是瞬时的，不需要担心 |

---

## 10. 典型工作流

### 工作流 A：100 个相同的 ducking AI，希望听起来不机械

```
1. 选中全部 AI
2. Randomize → 勾 Baseline、Amplitude、Start Offset
3. 各属性的 Min/Max 拉一个不那么夸张的区间（比如 Baseline 0.4~0.6）
4. Randomize
```

要"那次的味道"复现，下次记得勾 Use Seed 用同一个种子。

### 工作流 B：把一整条 envelope 上所有 AI 的 playrate 拉回 1.0

```
1. 选中全部 AI
2. Batch Set → 只勾 Playrate
3. Playrate 滑杆右键 → 恢复到 1.0
4. Apply Batch
```

### 工作流 C：5 个 AI 做整体淡入

```
1. 选中这 5 个（要按时间顺序排在一条线上）
2. Gradient → 勾 Baseline，From=0, To=1
3. Mode = Ease In
4. Apply Gradient
```

### 工作流 D：给 volume envelope 做一段呼吸感的 LFO

```
1. 在 volume envelope 上拖出一段 AI 并选中
2. LFO → Wave Type=Sine, Cycles=8, Phase=0
3. Generate LFO
4. 觉得"喘气太均匀"→ Shape → Freq Skew=30, Apply Shape
5. 觉得"后半段要逐渐压下来"→ Shape → Tilt=-50, Apply Shape
```

每一步都可以反复点直到满意。

---

## 11. 故障排查

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 按钮灰着点不动 | 一个属性 checkbox 都没勾 | 至少勾一项 |
| `No automation items found` | arrange 里没选中任何 AI | 先去选中 AI 再回来点按钮 |
| Randomize 看起来"没动" | Min 和 Max 设得太接近 / 都是 0 | 拉开区间；或确认属性 checkbox 真的勾上了 |
| Gradient 看起来"全是同一个值" | 只选了 1 个 AI | Gradient 需要至少 2 个 AI 才有意义 |
| LFO 跑完发现波形"挤在一头" | Freq Skew 不是 0 | 右键 Freq Skew 复位 |
| Shape 跑完没反应 | Freq Skew 和 Tilt 都是 0 | 至少调一个非 0 值 |
| 不小心 Generate LFO 覆盖了手画的点 | LFO 会先清空 AI 内现有点 | Ctrl+Z 撤销 |
| Volume LFO 的波谷"听上去太死" | dB 空间底限是 center-30dB | 这是设计；想要更深的谷只能换 envelope 或叠 Tilt |

---