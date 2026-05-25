# Spectral Forge 用户手册

> 适用版本：Mantrika Tools（当前主线）

---

## 1. 概述

**Spectral Forge** 是 Mantrika Tools 里给 **两个 media item 配对**用的频谱合成工具，定位是"**选两条声音 → 让它们以某种方式融合 → 出一条新声音**"。

每次跑会把你选的两个 item 当成 **Source**（提供频谱"身份"）和 **Target**（提供频谱"形状"或"轨迹"），按选定算法合成一条新的 WAV，放到工程目录的 `SpectralForge/` 下，并**自动新建一条同名输出轨道**摆好新 item。原始两个 item 不动。

三种合成算法：

- **Morph (OT)**：基于 Optimal Transport 的频谱滑动，沿"频率轨迹"在 Source 和 Target 之间插值。
- **Cross-Synthesis**：从一条取**频谱包络**、另一条取**激励**，合出"用 A 的音色说 B 的话"。
- **Mosaic**：在 Source 频谱里**逐帧搜索**最像 Target 帧的片段，拼出"听起来像 Source、但走 Target 节奏 / 走向"的结果。

每个算法都可以**先 Preview 试听**再决定要不要 Process 落地。

---

## 2. 打开方式

菜单入口：

```
Extensions → Mantrika Tools → Spectral forge
```

Action（在 Action List 搜 "Spectral"）：

| Action 名称 | 用途 |
| --- | --- |
| **`mantrika : Process - Spectral Forge`** | 开 / 关 Spectral Forge 窗口（toggle） |
| **`mantrika : Process - Create Spectral Transition for Overlapping Items`** | 兄弟 action：对**已经有交叠的**两个 item，在交叠区域生成一段"音色过渡"item 贴上去；无需打开主窗口 |

---

## 3. 主窗口界面总览

```
┌──────────────────────────────────────────────┐
│ Spectral Forge                               │
│ Mode:   [ Morph (OT)              ▾]         │
│                                              │
│ Source:  my_metal_clank                      │  ← 青蓝色（item 也被染色）
│             [ ⇅ ]  [ ⟳ ]                     │
│ Target:  ambient_wash                        │  ← 橙红色
│                                              │
│ Interpolation:  ──────●────── 50 %           │  ← 算法相关参数
│ OT Strength:    ─────────●─── 80 %           │
│                                              │
│ ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭ │  ← 进度条
│           Ready                              │  ← 状态文字
│                                              │
│ ☐ Route to Track                             │
│ [ ▶ Preview ]                                │
│   [ Process ]   [ Cancel ]                   │
└──────────────────────────────────────────────┘
```

| 控件 | 说明 |
| --- | --- |
| **Mode** | 三种算法二选一，详见 §5 |
| **Source / Target 标签** | 当前配对的两个 item 的 take 名（去掉扩展名）。`---` = 还没选好 |
| **`⇅` Swap** | 互换 Source 和 Target（颜色、文字同步交换）|
| **`⟳` Reload** | 按当前 REAPER 选区**重新检测** Source/Target |
| **算法参数旋钮** | 跟着 Mode 切换；详见 §5 |
| **Route to Track** | 试听是否走 **Source item 所在轨道**的 FX 链 |
| **▶ Preview** | 后台合成一遍，**只播不存文件**；播放中点同按钮（`■ Stop`）停 |
| **Process** | 后台合成 + 写盘 + 自动建轨道插 item；运行中按钮变 **Cancel** |
| **Cancel** | 关窗（同时自动取消正在跑的处理与试听，并把 item 颜色还原） |

> 窗口高度会随 Mode 自动调整。

---

## 4. 选 item 的规矩

```
1. 在 Arrange 里选中 恰好 2 个 audio item（必须 audio，MIDI / 空 take 会被拒）
2. 触发 "Process - Spectral Forge" 打开窗口
3. 窗口会自动配对 Source / Target，并把两个 item 染色：
     · Source = 青蓝色（#4A7A8A）
     · Target = 橙红色（#A35A3D）
4. 染色让你在 Arrange 里一眼分清楚谁是谁
```

**自动配对的规则**：

| 情况 | 谁是 Source |
| --- | --- |
| 两个 item 在**不同轨道** | 轨道**靠上**的那个 |
| 两个 item 在**同一轨道** | 位置**靠前**的那个 |

不满意？点 **`⇅`** 直接互换。

> **关窗 / 处理成功 / Cancel 后，会自动把两个 item 的颜色还原为原始色**，不会留下青蓝 / 橙红污染。

窗口打开后想换 item？在 REAPER 里重新选两个 → 回到窗口点 **`⟳`**。

---

## 5. 三种算法详解

### 5.1 Morph (OT) —— 频谱滑动插值

**用途**：把 Source 的频谱**沿频率轴**滑向 Target 的频谱。相比简单的 crossfade，OT（Optimal Transport）会把每条谱线"滑动"到对应位置，听起来更连续，常用于做声音变形 / morph 效果。

| 控件 | 范围 | 说明 |
| --- | --- | --- |
| **Interpolation** | 0–100 % | 0% = 完全是 Source；100% = 完全是 Target；50% = 正中间 |
| **OT Strength** | 0–100 % | 0% = 退化为普通 crossfade；100% = 完全的频谱滑动；中间值是两种行为的混合 |

**怎么调**：先把 Interpolation 拖到 50% 听一遍，再调 OT Strength 决定"过渡感"——OT 高时听起来更像滑动 / 变形，低时更像两条声音的叠加。

适合：把 A 声音逐步变成 B 声音、做声音之间的"中间态"。

---

### 5.2 Cross-Synthesis —— 包络 × 激励

**用途**：从 Target 取**频谱包络**（音色"形状"），从 Source 取**激励**（残差 / 谁在说），把两者乘起来。直观结果："**用 A 的音色说 B 的话**"。

| 控件 | 范围 | 说明 |
| --- | --- | --- |
| **Envelope Detail** | 0–100 % | 0% = 平滑包络（只保留粗略音色染色）；100% = 精细包络（保留较多 formant 细节） |

**Source / Target 角色**：

- **Source** 提供 **excitation**（驱动信号、能量分布）
- **Target** 提供 **envelope**（音色染色 / formant 形状）
- 想换角色？按 **`⇅`** 互换

适合：声码器风格效果、人声染色、把节奏型素材"穿"上某种音色外衣。

---

### 5.3 Mosaic —— 频谱拼贴

**用途**：把 Source 切成若干小帧，**逐帧**去匹配 Target 当前帧最像哪一帧，把匹配到的 Source 帧串起来。听感是"**用 Source 的素材库重新拼出 Target 的走向**"。

| 控件 | 范围 | 说明 |
| --- | --- | --- |
| **Continuity** | 0–100 % | 0% = 每帧独立选最像的（容易跳）；100% = 强连续性（倾向选靠近上一帧的，更连贯） |
| **Source Blend** | 0–100 % | 0% = 纯拼贴；100% = 完全等同 Source 频谱；中间 = 拼贴结果与 Source 的频谱混合 |
| **Random** | 0–100 % | 0% = 完全确定（同样输入永远同样输出）；100% = 最大随机性，在候选帧里随机抽 |

**关于随机种子**：

- **Preview** 每次都用新随机种子 → 多按几次 Preview 可以试出"随机变奏"
- 一旦你按了 **Process**，会用**最近一次 Preview 的种子**（如果有），所以**听到的就是你将得到的**
- 如果从未 Preview 就直接 Process，会用一个新种子

适合：声音设计里的"用 A 的纹理重做 B"、生成有 Source 颗粒感的变体。

---

## 6. 试听与处理流程

### 6.1 Preview

```
1. 选好 Source/Target、Mode、参数
2. 点 [▶ Preview]
3. 等几秒 → 状态显示 "Previewing..." → 听结果
4. 中途想停 → 同按钮变 [■ Stop]，点一下即停
```

| 选项 | 行为 |
| --- | --- |
| **Route to Track**（持久化开关） | 关：试听走 REAPER 主输出（干声） |
|  | 开：试听**通过 Source item 所在轨道的 FX 链**，方便比对插件链后的效果 |

试听**不写文件、不动 item**。改参数想听新结果，再点一次 Preview。

### 6.2 Process（落地）

```
1. 试听满意后，点 [ Process ]
2. 状态变 "Processing..."，按钮变 Cancel
3. 完成 → 状态变 "Forge complete"
```

**输出落点**：

- WAV 文件：`<工程目录>/SpectralForge/<source>_<target>_<Mode>.wav`（重名自动加序号）
- 自动**在 Source 所在轨道的下方**新建一条轨道，命名为 `<source> x <target>`
- 新 item 摆在 **Source item 的时间位置**，长度跟随合成结果
- 沿用 Source 的播放 gain
- 完成后把焦点自动还给 REAPER 主窗口

---

## 7. 状态反馈

状态栏会告诉你结果：

| 显示文字 | 含义 |
| --- | --- |
| `Select 2 items to process` / `Select 2 audio items` | 待机 / 选择不合规 |
| `Selection reloaded` | 你点了 `⟳` 重新检测 |
| `Selected items are no longer valid` | 你在窗口打开后**删/移**过 source/target item |
| `Processing...` / `Processing preview...` | 后台合成中 |
| `Previewing...` / `Preview ended` / `Preview stopped` | 试听阶段 |
| `Forge complete` | Process 成功，新 item 已就位 |
| `Process failed: <reason>` / `Preview failed: <reason>` | 失败，原因显示 |
| `Failed to read source/target audio` | 准备阶段读音频失败 |
| `Failed to create output directory` | 写不出 SpectralForge 目录（工程未保存？磁盘只读？） |

---

## 8. 偏好持久化

| 项目 | 是否持久化 |
| --- | --- |
| 上次选的 Mode | ✅ |
| Route to Track 开关 | ✅ |
| 算法旋钮值 | ❌（每次开窗回默认） |
| 上次的随机种子 | ❌（仅在同一会话内、Process 跟随 Preview 时复用） |

> 想"快速重置参数"——旋钮上**右键 / 双击**通常回默认值（MTK_Slider 行为）。

---

## 9. 键盘 / 鼠标速查

| 操作 | 行为 |
| --- | --- |
| 触发 `Process - Spectral Forge` | 打开 / 关闭窗口 |
| **Enter** | 等同点 Process |
| Process 按钮（处理中） | 变成 Cancel，点击中止 |
| Preview 按钮（播放中） | 变成 `■ Stop`，点击停止 |
| `⇅` Swap | 互换 Source / Target（含染色） |
| `⟳` Reload | 按当前 REAPER 选区重新配对 |
| 关闭窗口（X / Cancel） | 自动取消处理 + 停止试听 + 还原 item 颜色 |

---

## 10. 典型工作流

### 工作流 A：把金属撞击逐步变成持续氛围

```
1. 选 metal_clank（短）和 ambient_wash（长）这两个 item
2. 打开 Spectral Forge
3. 检查 Source = metal_clank（青蓝），Target = ambient_wash（橙红）
   若反了 → ⇅
4. Mode = Morph (OT)
5. Preview 试 Interpolation = 30 / 50 / 70 各听一次
6. 满意 → Process
```

### 工作流 B：用合成器音色"说话"

```
1. 选 vocal_phrase（要"说的话"）和 synth_pad（提供"音色"）
2. 打开窗口
3. 让 Source = vocal_phrase（提供激励），Target = synth_pad（提供包络）
   ——按上面"轨道靠上 / 位置靠前 = Source"的规则摆 item，或直接 ⇅
4. Mode = Cross-Synthesis
5. Envelope Detail 在 30–60% 之间试
6. Process
```

### 工作流 C：用一段石头摩擦素材重做风声走向

```
1. 选 stone_scrape（Source 素材库）和 wind_long（Target 走向）
2. Source = stone_scrape；Target = wind_long
3. Mode = Mosaic
4. Continuity 调到 60–80%（避免帧间跳）
5. Preview 几次（每次都会换种子）→ 听到喜欢的版本 → 直接 Process
   ★ Process 会复用刚才那次 Preview 的种子，所以听到什么就出什么
```

---

## 11. 故障排查

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| Source / Target 显示 `---` | 选区里 audio item ≠ 2 个，或包含 MIDI | 重新选恰好 2 个 audio item，按 `⟳` |
| 状态显示 `Selected items are no longer valid` | 你删了或移走了已配对的 item | 重新选 item，按 `⟳` |
| 状态显示 `Failed to read source/target audio` | item 源文件不可读 / 损坏 | 检查源文件、take 是否有效 |
| 状态显示 `Failed to create output directory` | 工程未保存 / 工程目录只读 | 先保存工程，确认写权限 |
| Preview 听感和 Process 出来不一致（Mosaic） | 你 Process 前**改了 Random 旋钮**或**关窗后又开** | 流程是 Preview → 立刻 Process，中间别改 Random |
| Process 后没看到新 item | 看 Source item 所在轨道**下方一条**新建轨道；可能被滚动条遮住 | 在 TCP 里翻到 Source 轨道下面找 |
| 关窗后 item 颜色还在 | 极少数情况（程序异常退出） | 选中 item → Item Properties 清自定义色 |
| Process 卡住 | 巨型 item（数分钟）合成本就慢，进度条是 indeterminate | 等；或 Cancel 后换短一些的素材 |

---
