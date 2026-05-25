# Phase Aligner 用户手册

> 适用版本：Mantrika Tools（当前主线）

---

## 1. 概述

**Phase Aligner** 是 Mantrika Tools 里给 **多个时间重叠的 media item** 用的相位对齐工具，定位是"**多麦/多 take 同源素材一起加载 → 算 → 一键对齐**"。

它解决两类典型问题：

- **多麦克风录同一声源**（鼓 in/out、snare top/bottom、人声主副麦…）之间有几毫秒到几十毫秒的时间差，叠加时相位抵消、声音变薄。
- **多个 take 想叠出更厚的层**，但相互之间错开几个采样，听感糊、不齐。

它做两件事：

- **测**：分析每个 item 相对参考 item 的**时间延迟**和**极性**，给出相关性 / 叠加增益指标。
- **改**：把你勾选的 item 的 **position 微调对齐**、极性反相。改的是 item 自身位置和 极性，不渲染、不破坏波形。

整个流程围绕"一组**有时间重叠**的 item"展开——选好它们，Load → Analyze → 勾 Fix → Apply。

---

## 2. 打开方式

菜单入口：

```
Extensions → Mantrika Tools → Phase aligner
```

或在 Action List 搜：

| Action 名称 | 用途 |
| --- | --- |
| **`mantrika : Process - Phase Aligner`** | 打开 / 关闭 Phase Aligner 窗口 |

---

## 3. 主窗口界面总览

```
┌───────────────────────────────────────────────────────────┐
│  Phase Aligner                                            │
│                                                           │
│  [ Phase Align ▾ ]                                        │  ← 模式
│                                                           │
│  Max Delay: [——●——————]  50 ms      [Load]  [Analyze]    │
│                                                           │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Fix │ Ref │ Name        │ Delay    │ Phase │ Corr   │ │
│  │  ☐  │  ◉  │ KickIn      │ REF      │       │        │ │
│  │  ☐  │  ○  │ KickOut     │ +2.31 ms │   ✓   │ 0.872  │ │
│  │  ☐  │  ○  │ KickSub     │ -0.84 ms │   ⚠   │ 0.553  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                           │
│              Analysis complete: 2 results                 │  ← 状态
│                                                           │
│             [Select All]  [ Apply ]  [ Close ]            │
└───────────────────────────────────────────────────────────┘
```

| 区域 | 说明 |
| --- | --- |
| **模式选择** | `Phase Align` 或 `Max Energy`，两种用途不同（见第 5 节） |
| **Max Delay** | 允许的最大对齐位移；Phase Align 默认 50ms，Max Energy 默认 10ms |
| **Focus**（仅 Max Energy） | 关注哪个频段对齐：Sub Bass / Low / Mid / Full |
| **Load** | 把当前 Arrange 里的选中 item 加载到表格 |
| **Analyze** | 分析所有 item 相对 Reference 的偏移 |
| **Fix 列** | 勾上的 item 在 Apply 时会被对齐 |
| **Ref 列** | 单选——指定哪个 item 当参考（不动） |
| **状态栏** | 加载/分析进度与结果 |
| **Select All** | 一键全勾 / 全取消（自动跳过低相关项） |
| **Apply** | 真正执行对齐：调 position、必要时翻极性 |

> **Reference item 在 Arrange 上会临时变成深蓝色**，方便你确认参考是谁。关闭窗口或切换参考时颜色自动还原。

---

## 4. 基础用法 —— 三步搞定

```
1. 在 Arrange 里框选所有要对齐的 item（必须 ≥ 2 个，且时间上有重叠）
2. 打开 Phase Aligner → 点 Load
3. 在 Ref 列点一个圆圈，把它设为参考
4. 点 Analyze
5. 看 Delay / Phase / Corr 列的结果
6. 勾 Fix 列要修复的行（或点 Select All）
7. 点 Apply
```

**Apply 做了什么：**

- 把每条勾上的 item 的 **position 沿时间轴平移**，让它和 Reference 对齐。
- 如果检测到极性反相（Phase 列显示 ⚠），自动把该 take 的 volume 取反一次（等效翻极性）。

> Apply 后窗口会**自动再跑一次 Analyze**，让你立刻看到对齐效果——理想情况下所有 Delay 会变成接近 0、Phase 全 ✓。

> Apply 改的是 **item position + 极性**，原始音频文件不动。想撤销直接 **Ctrl+Z** 一次。

---

## 5. 两种模式怎么选

### 5.1 Phase Align（默认）

**适合**：同一声源的多个传感器/take 之间对齐（多麦录鼓、多 take 叠人声、立体声左右麦匹配…）

- 用**互相关**找出 item 相对参考的时间偏移。
- 极性判断基于波形形状对比。
- Max Delay 范围更大（最高 200ms），适合传感器距离较远的场景。
- 表格的最后一列叫 **Corr**，显示 0.0~1.0 的相关系数。

**Corr 的读法：**

| 值 | 含义 |
| --- | --- |
| 高（≥ 0.7） | 强相关，结果可信，可放心 Apply |
| 中（0.3 ~ 0.7） | 弱相关，能修，但听一下再决定 |
| 低（< 0.3，灰色） | 太弱——多半不是同源素材；该行的 Fix 复选框会被禁用 |

### 5.2 Max Energy

**适合**：你不在乎相位"对齐"的几何意义，只想让多个 item 叠加后**响一点 / 不抵消**（典型场景：贝斯 DI + 麦克风、kick 子频段对齐、合成层叠时的能量最大化）

- 在 Max Delay 窗口内**穷举**位移，挑使叠加能量最大的偏移量。
- 多出 **Focus** 频段选择——只在指定频段评估能量，对低频对齐尤其有用（贝斯/kick）。
- Ref 列变成 **Lock**（🔒）——这条 item 不动，其余围着它转。
- 表格最后一列变成 **Gain (dB)**：

| 值 | 含义 | 颜色 |
| --- | --- | --- |
| ≥ +2.5 dB | 叠加显著变响，强烈推荐 Apply | 绿 |
| 0 ~ +2.5 dB | 略有改善 | 黄 |
| < 0 dB | 对齐后反而更轻——建议不勾这条 | 红 |

> 切换模式后**之前的分析结果会被清空**，必须重新点 Analyze。

---

## 6. 表格列含义速查

| 列 | Phase Align 模式 | Max Energy 模式 |
| --- | --- | --- |
| **Fix** | 勾上则 Apply 时会被对齐 | 同左 |
| **Ref** | 单选圆点 ◉/○，指定参考 item | 单选 🔒/·，指定锁定 item |
| **Name** | take 名 | 同左 |
| **Delay** | 相对参考的时间偏移；`REF` = 参考本人 | 同左；`LOCK` = 锁定本人 |
| **Phase** | ✓ 极性正常 / ⚠ 反相（Apply 会自动翻） | 同左 |
| **Corr / Gain** | 相关系数 0~1（< 0.3 灰，不可修） | 叠加增益 dB（颜色编码见 5.2） |

---

## 7. 哪些 item 会被加载

点 Load 时，从 Arrange 的选中 item 里筛选：

| 类型 | 是否加载 |
| --- | --- |
| 选中 ≥ 2 个 audio item | ✅ |
| **与至少一个其他选中 item 时间重叠**（> 10ms） | ✅ |
| 选中数量 < 2 | ❌ 状态显示 `Select at least 2 items` |
| 没有时间重叠的 item | ❌ 状态显示 `No overlapping items found` |
| MIDI take | ❌ 静默跳过 |
| 没 active take | ❌ 静默跳过 |

> **重叠才有意义**——两段在时间上完全不重叠的素材，谈不上"对齐"。

---

## 8. 状态反馈

主窗口下方状态条会告诉你结果：

| 显示文字 | 含义 |
| --- | --- |
| `N items loaded` | 加载成功 |
| `Select at least 2 items` | 选区里 audio item 不到 2 个 |
| `No overlapping items found` | 选的 item 时间上不重叠 |
| `Analysis complete: K results` | K 条有效结果（绿） |
| `Low correlation - items may not share a common source` | 全部相关性都很低，可能不是同源 |
| `No valid analysis results` | 所有 item 都没算出有效结果 |
| `Fixed K items` | Apply 完成（绿） |
| `Selection changed, click Load to refresh` | 你在 Arrange 里改变了选区，需要 Reload |
| `Mode changed, re-analyze required` | 切了模式，需重新 Analyze |
| `Reference changed, re-analyze required` | 换了参考，需重新 Analyze |

---

## 9. 典型工作流

### 工作流 A：鼓多麦相位对齐（最常见）

```
1. 选中 KickIn + KickOut + KickSub 三条 item
2. 打开 Phase Aligner → Load
3. 默认 Phase Align 模式
4. 把 KickIn 设为 Ref（声音最直接的那条做参考）
5. Analyze
6. 看 Corr 列：> 0.7 都很可信
7. Select All → Apply
8. 听一下叠加效果——低频应该明显更扎实
```

### 工作流 B：贝斯 DI + 麦克风让叠加最响

```
1. 选中 BassDI + BassMic
2. Load → 切到 Max Energy 模式
3. Focus 选 Low（200Hz）
4. 把 BassDI 设为 Lock（保持不动）
5. Analyze
6. 看 Gain 列——只勾 ≥ 0 dB 的行（红色的别勾）
7. Apply
```

### 工作流 C：人声多 take 叠层

```
1. 选所有要叠的 vocal take
2. Load → Phase Align 模式
3. Ref 选听感最好的主 take
4. Max Delay 调小一点（10~20ms，take 本身差异不会太大）
5. Analyze → Select All → Apply
```

---

## 10. 故障排查

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| Load 提示 `Select at least 2 items` | 选区里 audio item 不到 2 个 | 多选几个 |
| Load 提示 `No overlapping items found` | 选了 item 但时间上不重叠 | 把它们拖到时间重叠的区间，或换素材 |
| Analyze 后所有行都灰着，Fix 框点不动 | Phase Align 模式下相关性全 < 0.3，多半不是同源 | 换 Max Energy 模式试试，或确认选对了 |
| 状态显示 `Selection changed, click Load to refresh` | 你在 Arrange 里改了选区 / 删了某条 item | 点一下 Load 重新加载 |
| Apply 后听感更糟（Max Energy 模式） | 勾了 Gain 为负的行 | Ctrl+Z 撤销，重选时跳过红色行 |
| Reference item 颜色变深蓝了 | 这是窗口给的临时高亮 | 切换 Ref 或关闭窗口会自动还原 |
| 找不到极性反相的 item | Phase 列看 ⚠ 图标（橙色） | Apply 时会自动翻极性，不需要手动处理 |
| 想撤销整次对齐 | Ctrl+Z 一次 | Apply 是一个 undo block |

---

## 
