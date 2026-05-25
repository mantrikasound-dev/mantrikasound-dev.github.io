# Loudness Analyze 用户手册

> 适用版本：Mantrika Tools（当前主线）

---

## 1. 概述

**Loudness** 是 Mantrika Tools 里给 **media item** 用的响度工具，定位是"**选中 item → 一键搞定**"。

它能做两件事：

- **测响度**：把 item 的 LUFS-I / LUFS-S Max / LUFS-M Max / Range 算出来，以 **take marker** 形式直接打在 item 上。
- **拉响度**：把 item 的音量调到你指定的 LUFS-I 目标值。改的是 item volume（`D_VOL`），不渲染、不破坏波形。

整个流程围绕"item 选区"展开——选好 item，触发 action，剩下交给它。

---

## 2. 打开方式

菜单入口：

Extension -> Mantrika Tools -> Loudness -> Analyze & normalize （主ui入口）

Extension -> Mantrika Tools -> Loudness -> Normalize selected to -23LUFS -I

Extension -> Mantrika Tools -> Loudness -> Normalize selected to median LUFS-I

| Action 名称（在 Action List 搜 "Loudness"） | 用途 |
| --- | --- |
| **`mantrika : Loudness - Analyze and Add Markers / Normalize to Target LUFS`** | 打开主窗口，自由选 marker 组合 / 自由设 target |
| **`mantrika : Loudness - Normalize Selected Items to -23 LUFS`** | 一键把所选 item 拉到 **-23 LUFS**（广播标准） |
| **`mantrika : Loudness - Normalize Selected Items to Median LUFS`** | 一键把所选 item **拉平到中位数响度**（多素材音量统一） |

后两个是"省点击"的快捷通道，内部走的是同一套分析逻辑。

---

## 3. 主窗口界面总览

触发 `Loudness - Analyze and Add Markers / Normalize to Target LUFS` 打开主窗口：

```
┌──────────────────────────────────────────────┐
│ Select markers to add:                       │  ← 第一段：测响度
│   ☐ LUFS-I (Integrated)                      │
│   ☐ LUFS-S (Short-term Max)                  │
│   ☐ LUFS-M (Momentary Max)                   │
│   ☐ Range (LU)                               │
│                                              │
│ Normalize:                                   │  ← 第二段：拉响度
│   ☐ Normalize to target LUFS-I              │
│   [ -16.0 ]  LUFS                            │
│                                              │
│ ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭ │  ← 进度条
│              Ready to analyze                │  ← 状态文字
│                                              │
│          [  Apply  ]    [  Close  ]          │
└──────────────────────────────────────────────┘
```

| 区域 | 说明 |
| --- | --- |
| **Markers 区** | 勾哪个就在 item 上打哪个 marker，可任意组合 |
| **Normalize 区** | 勾上后才能改 target；目标值范围 **-60.0 ~ 0.0 LUFS** |
| **进度条 / 状态** | 分析时显示进度与计数，完成后变绿（成功）或红（失败） |
| **Apply** | 跑分析；分析进行中按钮变 **Cancel**，可随时中断 |

> **重要：Markers 和 Normalize 二选一。**
> 勾任意 marker 会自动取消 normalize；反之亦然。
> 想"先打 marker 看一眼，再 normalize"，请分两次跑。

---

## 4. 基础用法 —— 三个典型操作

### 4.1 给 item 打响度标记

```
1. 在 Arrange 里选中一个或多个 item
2. 触发 "Loudness - Analyze and Add Markers / Normalize..."
3. 勾上想要的 marker（比如只勾 LUFS-I）
4. 点 Apply
```

**结果**：每个选中 item 的 active take 上多出对应 take marker，形如：

```
LUFS-I: -18.3
```

橙色，位置贴在 take 起点（受 snap offset 和 start offset 校正）。

> 重复执行会**先删掉旧的响度 marker 再写新的**——不会越打越多。

---

### 4.2 把 item 拉到指定 LUFS

```
1. 选中要归一的 item
2. 触发主窗口 action
3. 勾 "Normalize to target LUFS-I"
4. 在输入框填 target，比如 -16.0
5. 点 Apply
```

**结果**：每个 item 的 volume 被调整，让其 LUFS-I 落在 target。

> Normalize 改的是 **item volume**，原始音频文件不动。想撤销就 Ctrl+Z，或手动把 item volume 拖回 0 dB。

---

### 4.3 一键操作（不用开窗口）

| 场景 | 用哪个 Action |
| --- | --- |
| 给一批素材打成广播标准 -23 LUFS | `Loudness - Normalize Selected Items to -23 LUFS` |
| 一批素材音量不齐想拉平 | `Loudness - Normalize Selected Items to Median LUFS` |

两个 action 都会**短暂闪一下主窗口**显示进度，完成后自动关闭。

> **Median 模式至少要选 2 个 audio item** 才有意义，少于 2 个会弹提示框拒绝执行。

---

## 5. Marker 区四个选项的含义

| 选项 | 写出的 marker 文本 | 直观理解 |
| --- | --- | --- |
| **LUFS-I (Integrated)** | `LUFS-I: -18.3` | 整个 item 的**平均**响度（最常用） |
| **LUFS-S (Short-term Max)** | `LUFS-S: -12.1` | 3 秒滑窗里**最响**的那段 |
| **LUFS-M (Momentary Max)** | `LUFS-M: -8.5` | 400ms 短窗里**最响**的瞬间 |
| **Range (LU)** | `Range-LU: 7.2` | 整段动态范围跨度 |

平时挑一两个常用的就够，全勾会让 take 顶上挤一排 marker。

---

## 6. 状态反馈

主窗口下方的状态条会告诉你结果：

| 显示文字 | 含义 |
| --- | --- |
| `Ready to analyze` | 待机 |
| `Preparing...` / `Processing N/M items...` | 正在跑（多线程并行） |
| `Analyzed K/N items` | 只打了 marker，K 条成功 |
| `Normalized K/N items` | 只 normalize 了，K 条成功 |
| `Analyzed & Normalized K/N items` | 程序触发的两步合并显示 |
| `No audio items selected` | 选区里没有合法 audio item |
| `Analysis cancelled` | 你点了 Cancel |

> **MIDI item / 空 item / 视频 item 会被静默跳过**，不计入"成功数"。

---

## 7. 偏好持久化

主窗口里的选择每次成功执行后会自动保存，下次打开沿用：

| 项目 | 是否持久化 |
| --- | --- |
| 4 个 marker checkbox 的勾选 | ✅ |
| Normalize 开关 | ✅ |
| Target LUFS 数值 | ✅ |
| 上次跑出的状态文字 | ❌（每次重开是 "Ready to analyze"） |

> 只有 Apply **成功执行**才会保存——点开窗口看一眼就关掉，不会污染设定。

---

## 8. 键盘 / 鼠标速查

| 操作 | 行为 |
| --- | --- |
| 触发主窗口 action | 打开窗口 |
| **Enter** | 等同点 Apply |
| Apply 按钮（分析中） | 变成 Cancel，点击中止 |
| Target LUFS 输入框 | 只接受数字、`.` 和 `-`，超出 -60~0 会自动 clamp |
| 关闭窗口（X / Close） | 自动取消正在跑的分析 |

---

## 9. 典型工作流

### 工作流 A：游戏 SFX 素材交付前一键拉到 -23 LUFS

```
1. 全选要交付的 item
2. 触发 "Loudness - Normalize Selected Items to -23 LUFS"
3. 等几秒看到 "Normalized N/N items" 即完成
```

### 工作流 B：脚步声 / 武器声等一组素材音量不齐

```
1. 全选这一组 item
2. 触发 "Loudness - Normalize Selected Items to Median LUFS"
3. 所有 item 会被拉到组内中位数响度
```

适合做"先把一组声压感拉齐，再统一推 fader"。

### 工作流 C：审听时想看每个 item 多响

```
1. 选 item
2. 触发主窗口 action
3. 只勾 LUFS-I（足够日常用）
4. Apply
5. 在 Arrange 里直接看每个 item 顶上的 marker 数字
```

打过 marker 后不影响后续 normalize——再跑一次 normalize 时会把旧 marker 删干净。

---

## 10. 故障排查

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| Apply 按钮灰着不能点 | 没选 item / marker 和 normalize 都没勾 | 选 item，并至少勾一项 |
| 状态显示 `No audio items selected` | 选了 item 但都是 MIDI / 视频 / 空 take | 换 audio item 再试 |
| Item 上没出现 marker | 选了 normalize 而不是 marker；二者互斥 | 勾 marker 那一组再 Apply |
| Median 模式拒绝执行 | 选区里 audio item 少于 2 个 | 至少选 2 个 audio item |
| Normalize 后音量没变 | 该 item 本身已接近 target；或 LUFS-I 太低（≤-70）测不出 | 检查源素材是否过于安静或近乎静音 |
| Item 上 marker 越打越多 | （不会发生）插件会先删旧的同名 marker | — |
| 想撤销 Normalize | Ctrl+Z 一次，或手动改回 item volume | — |

---

## 11. 与其他模块的关系

| 关联模块 | 说明 |
| --- | --- |
| **Loudness Meter**（`Loudness - Lightweight Meter`） | 是**实时电平表**，看的是 master / 当前播放流；本模块测的是已存在的 item，二者目的不同。 |
| **Render Queue / Quick Render** | 渲染时的 LUFS 归一化是写到**渲出新文件**里；本模块只改 item volume，原始文件不动。需要前者请走渲染流程。 |

---
