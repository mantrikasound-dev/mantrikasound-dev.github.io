# Element Split 用户手册

> 适用版本：Mantrika Tools（当前主线）

---

## 1. 概述

**Element Split** 是 Mantrika Tools 里给 **media item** 用的"声音元素拆分"工具，定位是"**选中 item → 把这条声音里的某种元素抠出来**"。

它做的事是：把每个选中的 audio item 用某种算法拆成两层（比如 attack vs. tail、tonal vs. noise），按需把其中一层或两层渲成新文件，**自动新建一条/两条同轨道下方的输出轨道**摆好。原始 item 完全不动。

它有两种使用姿势：

- **Quick 模式**：5 行 × 2 列共 10 个"目的导向"按钮（Punch / Body / Drone / Rhythm / Center / Width / Tonal / Noise / Event / Bed）。点哪个就抠哪个，参数全部用默认值。**单击立即开始处理**。
- **Algorithm 模式**：手动挑算法、调参、可以**单 item 试听**两层，确认满意了再点 Process 批处理。

所有处理都是**批量并行**——一次能跑很多个 item。

---

## 2. 打开方式

菜单入口：

```
Extensions → Mantrika Tools → Element split
```

Action（在 Action List 搜 "Element Split"）：

| Action 名称 | 用途 |
| --- | --- |
| **`mantrika : Process - Element Split`** | 开 / 关 Element Split 窗口 |

---

## 3. 主窗口界面总览

打开后窗口右上角有一颗 **Quick / Algorithm** 切换按钮：

```
Algorithm 模式（默认）              Quick 模式
┌──────────────────────────────┐    ┌──────────────────────────────┐
│ Element Split   [⟳] [Quick]  │    │ Element Split   [⟳] [Algo..] │
│ Mode: [ Transient / Sustain ▾]│    │ ┌──────────┐ ┌────────────┐  │
│ Trans Strength: ──────●── 50%│    │ │  Punch   │ │   Body     │  │
│ Trans Tail:     ──●────── 15%│    │ ├──────────┤ ├────────────┤  │
│ ☐ Show Advanced              │    │ │ Center   │ │   Width    │  │
│ ☑ Stereo Link                │    │ ├──────────┤ ├────────────┤  │
│ ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭ │    │ │  Drone   │ │  Rhythm    │  │
│           Ready to preview   │    │ ├──────────┤ ├────────────┤  │
│ ☐ Route to Track             │    │ │  Tonal   │ │   Noise    │  │
│ [ ▶ Transient ]              │    │ ├──────────┤ ├────────────┤  │
│ [ ▶ Sustain   ]              │    │ │  Event   │ │   Bed      │  │
│   [ Process ]   [ Cancel ]   │    │ └──────────┘ └────────────┘  │
└──────────────────────────────┘    │  (单击按钮立即处理)           │
                                    └──────────────────────────────┘
```

| 区域 | 说明 |
| --- | --- |
| **右上 `Quick / Algorithm` 按钮** | 在两套 UI 间切换；状态持久化，下次打开沿用 |
| **`⟳` 刷新按钮**（Algorithm 模式） | 当前选区变化后，刷新预听按钮可用状态（≥1 选中 item 时才可单 item 试听） |
| **Mode 下拉**（Algorithm 模式） | 5 种算法二选一，详见 §5 |
| **进度条 / 状态文字** | 处理中显示进度计数；完成后变绿（成功）或红（失败 / 取消） |
| **Process** | 跑批处理；处理中按钮变成 **Cancel**，可随时中断 |
| **Cancel**（Algorithm 模式） | 关窗（同时自动取消正在跑的处理与试听） |

> Algorithm 模式的窗口高度会跟着 Mode 自动调整；Transient 模式打开 **Show Advanced** 时窗口会显著拉长。

---

## 4. Quick 模式 —— 一键抠元素

Quick 模式是"我不想调参，我只想要 punch / body / 中心声 …"这种语义的快捷通道。

```
1. 选中一个或多个 audio item（Quick 模式不要求只选 1 个）
2. （如果还没切到 Quick）右上 [Quick] 按下
3. 点你想要的按钮
4. 等进度条跑完
```

10 个按钮的含义：

| 按钮 | 抠出来的内容 | 用的算法 | 适合 |
| --- | --- | --- | --- |
| **Punch** | 瞬态 / 攻击 | Transient | 鼓点 attack、武器击发头 |
| **Body** | 持续 / 尾巴 | Sustain | 鼓体回响、动作尾音 |
| **Drone** | 持续音调内容 | HPSS harmonic | 长音、嗡声、共振 |
| **Rhythm** | 打击 / 节奏内容 | HPSS percussive | 节奏型片段（去掉持续音）|
| **Center** | 中央 / 单声内容 | Mid | 主体声源、对白 |
| **Width** | 立体声宽度 / 环境 | Side | 空间感、混响、宽响 |
| **Tonal** | 窄带峰 / 纯音 | TonalNoise tonal | 单频啸叫、口哨、电流 |
| **Noise** | 宽带 / 噪声纹理 | TonalNoise noise | 风、电气底噪、嘶声 |
| **Event** | 高于环境底的事件 | Foreground/Ambient fg | 场景中的"动作"、点缀 |
| **Bed** | 持续环境垫 | Foreground/Ambient amb | 环境录音里的恒定底层 |

> **Center / Width** 要求 item 是立体声，否则会失败。其它按钮单声道 item 也可用。

Quick 模式下窗口没有 Preview，也没有 Process / Cancel——按按钮即处理，关窗即取消。

---

## 5. Algorithm 模式 —— 五种算法详解

切到 Algorithm 模式后，从 **Mode** 下拉选一种算法。每种算法都会输出两层（`Layer 1` / `Layer 2`），你可以分别**试听**这两层，再决定要不要 Process。

### 5.1 Transient / Sustain（瞬态 / 持续）

**用途**：把声音的"打击头"和"尾巴"分开。最常用，适合鼓、武器、脚步、撞击。

| 模式 | 控件 | 说明 |
| --- | --- | --- |
| **Simple**（默认） | **Trans Strength** | 攻击力捕获强度。越高，瞬态层抓得越多越激进 |
|  | **Trans Tail** | 尾巴长度。越低，瞬态层只保留干净的 attack |
| **Advanced**（勾 Show Advanced） | **Fast Attack** (0.5–5 ms) | 快包络攻击时间。越小越能抓尖锐瞬态 |
|  | **Slow Attack** (10–50 ms) | 慢包络攻击时间。越大，瞬态层会带更多 sustain 成分 |
|  | **Release** (10–100 ms) | 包络释放时间。越大瞬态尾越平滑 |
|  | **Smoothing** (1–20 ms) | mask 平滑，抑制 artifact |
|  | **Sensitivity** (1–15) | 检测灵敏度。越高越激进 |
| **公共** | **Stereo Link**（默认开） | 多声道用同一份 mask，避免立体声像漂移 |

> **Show Advanced** 勾开时，会按当前 Simple 的两个旋钮把 5 个 Advanced 参数**算一遍当起点**，之后你可以单独细调。

---

### 5.2 Mid / Side（中 / 侧）

**用途**：从立体声里把"中央成分"和"两侧成分"分开。对**单声道 item 没意义**。

| 控件 | 范围 | 说明 |
| --- | --- | --- |
| **Mid Gain** | -12 ~ +12 dB | 输出 Mid 层时的增益偏移 |
| **Side Gain** | -12 ~ +12 dB | 输出 Side 层时的增益偏移 |

适合：抽出对白中心声、把环境录音的两侧空间感单独拎出来当 Reverb 素材。

---

### 5.3 Harmonic / Percussive（HPSS，谐波 / 打击）

**用途**：在频谱上"按方向"分。**谐波层**保留时间上稳定、频率上窄的内容（音调、长音）；**打击层**保留时间上短暂、频率上宽的内容（瞬态、咔哒、噪声）。

| 控件 | 范围 | 说明 |
| --- | --- | --- |
| **Harmonic Len** | 3–31 frames（奇数） | 时间方向中值滤波长度。越大谐波层越纯，但容易丢短音 |
| **Percussive Len** | 3–31 frames（奇数） | 频率方向中值滤波长度。越大能抓更宽频的瞬态 |
| **Mask Power** | 1–8 | Wiener mask 锐度。1 软（残留多），2 默认，更高更接近硬切 |

适合：从音乐 / 复合声音里把"持续音"和"节奏 / 击打"分开。

---

### 5.4 Tonal / Noise（音调 / 噪声）

**用途**：把"清晰的频率峰"和"宽带噪声"分开。和 HPSS 不同——这里看的是**单帧**频谱里的峰是否突出于本地噪声底。

| 控件 | 范围 | 说明 |
| --- | --- | --- |
| **Peak Width** | 3–31 bins（奇数） | 估计本地噪声底时的频率邻域宽度。越宽对宽峰排除越好；越窄分辨率越高 |
| **Peak Threshold** | 0–30 dB | 一个 bin 比本地噪声底高多少才算 tonal。越高越严，越低漏越多 |
| **Mask Power** | 1–8 | mask 锐度，1 软 / 4 默认 / 更高更接近二值 |

适合：从录音里抠 50 Hz 嗡、口哨；或者反过来留下纯噪声去做风/底噪素材。

---

### 5.5 Foreground / Ambient（前景 / 环境）

**用途**：用一段较长的时间窗估"环境底"，把任何**显著超过它**的事件抠成 foreground，剩下的归 ambient。和 HPSS 的差别在于它是**时间维度**的判别。

| 控件 | 范围 | 说明 |
| --- | --- | --- |
| **Ambient Time** | 0.5–10 s | 估环境底用的时间窗。越长越严（只有真正稳态的才算环境）；越短越接近 HPSS |
| **Threshold** | 0–30 dB | 一帧要高出环境底多少 dB 才算 foreground |
| **Mask Power** | 1–8 | mask 锐度 |

适合：从环境录音里挑出有意思的"事件"（鸟叫、车过、人声片段），或者反过来留下干净的"环境垫"做 ambience。

---

## 6. 单 item 试听（Algorithm 模式专属）

Algorithm 模式下，状态栏下方有两颗预听按钮，名字会跟着算法变（如 `▶ Transient` / `▶ Sustain`、`▶ Mid` / `▶ Side`、…）。

```
1. 选中 恰好 1 个 audio item（多选 / 0 选都会被拒绝）
2. 选算法、调好参数
3. 点 [▶ Layer1] 或 [▶ Layer2] 听该层
4. 再次点同一按钮 = 停止；点另一颗 = 切换到另一层
```

| 选项 | 行为 |
| --- | --- |
| **Route to Track**（开关，持久化） | 关：试听走 REAPER 主输出，听到的是干声 |
|  | 开：试听**通过该 item 所在轨道的 FX 链 / 路由**，方便比对插件链后的效果 |

> 试听只是临时合成，**不会落地任何文件、不会动 item**。改了参数想听新结果，再点一次按钮即可。
> 试听完按 Process 跑批，会**自动停掉试听**再开始处理。

---

## 7. 处理结果与输出

按 Process 后，每个原始轨道下方会**自动新建 1 或 2 条同名规则的输出轨道**，命名带后缀（如 `Punch` / `Body` / `Drone` / …）。

- 每个选中 item 处理出的两层文件，**按原 item 的时间位置**摆在对应输出轨道上
- 保留：原 item 的 fade、take volume / pan、声道模式、item volume
- **原始 item 不动**，可以随时和输出层对照
- Quick 模式同时点过多个按钮的情况下，每按一次按钮都是**独立批次**——多按几次就会出多套轨道
- 处理结束后，**焦点会自动还给 REAPER 主窗口**，可以直接接着操作

---

## 8. 状态反馈

状态栏会告诉你结果：

| 显示文字 | 含义 |
| --- | --- |
| `Select an item to process` | 待机 |
| `Ready to preview` / `Select 1 item to preview` | 切完模式或刷新选区后的提示 |
| `Starting...` / `Processing N/M items...` | 正在跑（多线程并行） |
| `Split complete: K/N items` | 完成，K 条成功 |
| `Processing cancelled` | 你点了 Cancel 或关了窗 |
| `No audio items selected` / `No valid audio items` | 选区里没有合法 audio item |
| `No elements selected` | Quick 模式没按按钮就被触发 |
| `Processing preview...` / `Previewing...` / `Preview ended` / `Preview stopped` | 试听状态 |
| `Failed to read audio` / `Preview failed` | 试听准备 / 处理失败 |

---

## 9. 偏好持久化

窗口里的少量选择会跨会话保留：

| 项目 | 是否持久化 |
| --- | --- |
| Quick / Algorithm 模式 | ✅ |
| Algorithm 模式选的算法 | ✅ |
| Route to Track 开关 | ✅ |
| 各算法的旋钮值 | ❌（每次开窗回默认） |
| Show Advanced 勾选 | ❌（每次开窗回默认） |

> 想"快速重置参数"——旋钮上**右键 / 双击** 通常会回到默认值（MTK_Slider 行为）。

---

## 10. 键盘 / 鼠标速查

| 操作 | 行为 |
| --- | --- |
| 触发 `Process - Element Split` | 打开 / 关闭窗口 |
| **Enter** | 等同点 Process（Quick 模式无效——Quick 必须点具体按钮） |
| Process 按钮（处理中） | 变成 Cancel，点击中止 |
| 关闭窗口（X / Cancel） | 自动取消正在跑的处理和试听 |
| 试听按钮再次点击同一层 | 停止 |
| 试听按钮点另一层 | 切换到另一层 |

---

## 11. 典型工作流

### 工作流 A：一批击打类 SFX 想拿到干净的 attack

```
1. 选中这些 item
2. 切到 Quick 模式 → 点 [Punch]
3. 等批处理完成
4. 原轨道下方多出一条名为 "Punch" 的轨道，里面是各 item 的瞬态层
```

想同时拿到 tail：再点一次 [Body]——会再出一条 "Body" 轨道。

### 工作流 B：环境录音里提一些有趣的事件

```
1. 选中环境录音 item，切到 Algorithm 模式
2. Mode 选 Foreground / Ambient
3. 试听 [▶ Foreground] 检查能不能听到想要的事件
4. 不满意 → 调 Ambient Time / Threshold 再试
5. 满意 → 按 Process
```

适合从长音频里挖素材。

### 工作流 C：单声道对白里去口哨啸叫

```
1. 选中目标 item，切到 Algorithm 模式
2. Mode 选 Tonal / Noise
3. 试听 [▶ Tonal] 听被抓的啸叫纯不纯
4. Peak Threshold 调到只抓最明显的峰
5. Process → "Noise" 层就是想要的去啸叫版本
```

### 工作流 D：从立体声环境里抽两侧做 Reverb 素材

```
1. 选中立体声环境 item
2. Quick 模式 → [Width]
3. 输出轨道里的 Side 层即可丢进 Reverb 当 IR 或层垫
```

---

## 12. 故障排查

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 试听按钮灰着不能点 | 当前不是恰好 1 个选中 item | 选 1 个，或点 `⟳` 刷新 |
| 状态显示 `Select 1 item to preview` | 同上 | 同上 |
| 状态显示 `No audio items selected` | 选区里都是 MIDI / 视频 / 空 take | 换 audio item 再试 |
| Quick 模式点了 Center / Width 没结果 | item 是单声道 | 用立体声 item，或换别的按钮 |
| 输出轨道里 item 数量比预期少 | 部分 item 处理失败（成功 K/N 计数显示） | 检查源文件是否可读；看是否选了适合该 item 的算法 |
| Process 没反应 | 还在 Cancel 收尾，或没选 item | 等一下状态变回 Ready；确认 ≥1 audio item |
| 试听听感跟最终 Process 不一致 | 试听**不走** REAPER 主输出 FX；Route to Track 关时也不走轨道 FX | 开 Route to Track 比对；或直接 Process 后听 |
| 想撤销整批 | Ctrl+Z 一次 | 整批是一个 undo block |

---

## 13. 与其他模块的关系

| 关联模块 | 说明 |
| --- | --- |
| **Spectral Forge** | 频谱编辑工具，做精细谱面修改；和 Element Split 互补——前者改谱，后者拆层。 |

---
