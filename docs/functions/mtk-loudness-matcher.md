# MTK Loudness Matcher

---

## 1. 概述

**MTK Loudness Matcher** 是一款独立的响度工具，用于让 Wwise 工程里的声音"音量整齐"。它一边**实时听**你电脑播放的声音（系统输出或外部输入），一边把测得的 **LUFS / RMS / True Peak** 写回 Wwise 对应 Sound 对象的 **MakeUpGain / Volume / VolumeOffset**，让一批声音听感对齐到同一个目标响度。

**两种工作模式**：

- **Fixed Target** —— 给所有声音对齐到一个**固定 LUFS 目标值**（例如 -14 LUFS）
- **Reference** —— 把 B 列表的每个声音对齐到 A 列表对应那一行的响度（A 是参考，B 跟着 A 走）

**外加 Voice Mode**：专门处理 Wwise 多语言资源（Voices/Chinese、Voices/English…），自动按当前预览语言写入对应 **AudioFileSource** 的 VolumeOffset，绝对独立，不会意外覆盖或影响其他语言的音量设置。

**典型使用场景**：

- 工程里几十条 SFX 响度参差不齐，想统一到 -14 LUFS
- 配音换了一批新录音，想让新录音对齐到老录音
- 多语言配音工程，每种语言单独按当前语言资源做对齐

---

## 2. 打开方式

它是一个**独立的窗口程序**（不是 REAPER 插件），直接运行可执行文件即可。

启动后会自动连接你上次保存的音频设备和上次的所有设置（目标值、模式、Criteria、导出路径都会记住）。

---

## 3. 界面总览

```
┌─────────────────────────────────────────────────────────────┐
│  Device: System Default | 48000 Hz | 480 samples   Pin  ☰  │  ← 顶部状态栏
├─────────────────────────────────────────────────────────────┤
│  ▮▮▮▮▮▮▮▮░░░░░░  -18.2  LUFS-S                              │
│  ▮▮▮▮▮░░░░░░░░░  -22.0  RMS                                 │  ← Meter 卡片
│  ▮▮▮▮▮▮░░░░░░░░  -20.5  LUFS-M                              │
│  ▮▮▮▮▮▮▮░░░░░░░  -3.8   TP                                  │
│  -60  -48 -36 -24 -12  0  +3                                │
│                       LUFS-I       -16.3 LUFS               │  ← 主显槽
│                         [ Reset ]                           │
├─────────────────────────────────────────────────────────────┤
│  Wwise (WAAPI)                           [ Connect ]        │
│  Connected: Wwise 2023.1.10                                 │
├─────────────────────────────────────────────────────────────┤
│  Mode: [Fixed Target ▾]            Adjust: [MakeUpGain ▾]   │  ← 参数卡片
│  Target LUFS: [-14.0] Tolerance:[0.5]  Max Duration:[30]    │
│  ─────────────────────────────────────────────────────      │
│  ☐ Voice Mode   ☑ Auto-Verify                                │
├─────────────────────────────────────────────────────────────┤
│  [Measure] ∞ [Match]    [Sync]    [Stop]                    │  ← 操作按钮
├─────────────────────────────────────────────────────────────┤
│              [ Fetch Selected ]                             │
│                                                             │
│   Sound_01            -12.0  -18.3  +4.3                    │
│   Sound_02             0.0  -14.1  +0.1                    │  ← 对象列表
│   Sound_03            -6.0  -10.5  -3.5                    │
└─────────────────────────────────────────────────────────────┘
```

五个主要区域：

| 区域 | 内容 |
|---|---|
| **顶部状态栏** | 当前音频设备、Pin（窗口置顶）、☰（Audio Settings） |
| **Meter 卡片** | 实时响度仪表，主显槽显示当前 Criteria 对应的值 |
| **WAAPI 区** | Wwise 连接状态、Connect/Disconnect 按钮 |
| **参数卡片** | 模式选择、目标值、容差、采集时长、Voice Mode、Auto-Verify |
| **操作 + 列表** | Measure/Match/Sync/Stop + Fetch 来的 Wwise 对象清单 |

---

## 4. 顶部：设备 & Meter

### 4.1 Audio Settings（☰ 按钮）

点 **☰** 弹窗，里面有：

| 选项 | 用途 |
|---|---|
| **Driver Type** | 选驱动协议（Windows Audio / WASAPI / ASIO …） |
| **Device** | 选具体设备。`[Out] System Default` 表示**捕获系统输出**（Loopback，最常用）；其他 `[Out] xxx` 是指定输出设备的 Loopback；`[In] xxx` 是物理输入口 |
| **Input** | 选择具体的输入声道对（立体声对） |
| **Match Criteria** | **核心选择**：用哪个数值做匹配的"那个数"（详见 §4.3） |
| ☑ **Export CSV Report after Match** | 每次 Match 完成后弹窗问要不要导出报告 |
| **Browse...** | 自定义 CSV 报告导出目录（不选 = 桌面） |

> 💡 **最常用配置**：`Device = [Out] System Default`，这样不管你切换什么外接耳机/音箱，工具永远跟着系统当前输出走。

### 4.2 Meter 卡片

Meter 区一共显示 **5 条信息**：

| 显示 | 含义 |
|---|---|
| **LUFS-I** | 从上次 Reset 开始的累计积分响度（EBU R128 含 gating） |
| **LUFS-S** | Short-term，3 秒滑动窗口 |
| **LUFS-M** | Momentary，400ms 滑动窗口 |
| **RMS** | 多通道合并后的平均 RMS 电平 |
| **TP** | True Peak（4x 过采样真峰值） |

四条横条 + 一条底部"主显槽"。**主显槽**显示的就是**当前 Match Criteria 选中的那一种**——它在上面横条里的位置被腾出来，提到下方放大显示。

> 💡 每条横条右侧数字 = max-hold（自上次 Reset 起的最大值），主显槽数字也是 max-hold。

**Reset 按钮** —— 一键归零所有 max-hold 和 LUFS-I 累计。

**自动 Reset**：连了 Wwise 后，每当检测到 Wwise Transport 从"停止"变成"播放"，Meter 自动 Reset，所以你只要在 Wwise 里点播放，就会从头开始重新。

### 4.3 Match Criteria（响度匹配标准）

在 Audio Settings (☰) 弹窗中，通过该下拉框决定工具以哪种"听觉维度"作为对齐的基准：

| 匹配标准 (Criteria) | 技术定义 | 最适用的音频资产类型 |
|---|---|---|
| **LUFS-M (Momentary Max)** | **瞬时响度最大值**：捕捉 400ms 窗口内的声学能量峰值 | 适合**短促、高瞬态**的音效（如：UI 提示音、枪击爆破点、受击反馈） |
| **LUFS-S (Short-term Max)** | **短期响度最大值**：捕捉 3 秒滑动窗口内的声学能量峰值 | 适合**中等长度的动态声音**（如：技能连招、非持续性的环境偶发声） |
| **LUFS-I (Integrated)** | **整体积分响度**：计算从播放到停止全程的感知响度平均值 | 适合**长时长的完整片段**（如：多语言配音语句、音乐、线性过场动画） |
| **RMS (Average)** | **平均能量电平**：纯物理维度的均方根电平计算，与人耳听觉曲线无关 | 适合**持续性循环音效**（如：赛车引擎、机械轰鸣、Drones / 环境氛围 Loops） |

> 💡 选择会影响：列表里"测得 LUFS"那一列显示的数值 + Match 计算的基准。**切换后已测的数据不会丢**——只是重新挑出对应的那个数显示和计算。

---

## 5. WAAPI 连接

WAAPI 区只有一行：

- **Connect** —— 连接到本机正在运行的 Wwise（默认走 `127.0.0.1:8080`，需要 Wwise 里开启 WAAPI）
- **Disconnect** —— 断开

连接成功后右上角会显示版本号；断开时所有 Wwise 相关按钮都会变灰。

---

## 6. 参数卡片

三层：

### 6.1 第一层：模式 + 写入哪个属性

| 控件 | 选项 |
|---|---|
| **Mode** | `Fixed Target` 或 `Reference` |
| **Adjust** | `MakeUpGain` 或 `Volume`（普通模式）；Voice Mode 下被强制锁为 `VolumeOffset` 且不可改 |

> 💡 **MakeUpGain vs Volume**：MakeUpGain 是 Sound 对象的"输出增益"槽，专门用来做响度补偿，不影响推子；Volume 是 Sound 的主推子。一般推荐 **MakeUpGain**，因为它独立于设计师的混音决策。

### 6.2 第二层：数值参数

| 控件 | 含义 |
|---|---|
| **Target LUFS** | 目标响度值（仅 Fixed Target 模式可见，Reference 模式自动从 A 列表读） |
| **Tolerance** | 容差（dB）。测得值与目标差小于这个数的对象，**直接跳过不写**，避免无意义的微调和验证误报 |
| **Max Duration (s)** | 单个对象的最长测量时长。Wwise 一旦播完会提前停止；这是保险线 |

> 💡 **Tolerance 推荐 0.3 ~ 1.0**。太严格会反复触发"还差 0.1dB 写一次"的无意义操作。

### 6.3 第三层：全局开关

| 开关 | 行为 |
|---|---|
| ☑ **Voice Mode** | 启用 Wwise 多语言模式（详见 §10） |
| ☑ **Auto-Verify** | Match 写完后**自动重测一遍**验证有没有写到位。差值仍超容差的对象，列表里行首会变红显示 `[!]`，状态栏报告 `VERIFY FAILED` |

> 💡 **Auto-Verify 在什么情况下会失败**：通常是因为目标 Sound 经过一条**带限制器/压缩器/总线效果**的链路，写多大的增益都被效果器吃掉了。这是**预期的提醒**——告诉你这个 Sound 单独调 Gain 没用，得改下游的处理链。

---

## 7. 操作按钮（中间四个）

| 按钮 | 行为 |
|---|---|
| **Measure** | 让 Wwise 自动播放选中对象，工具同时听并记录响度。**没选中 = 测全部**（会先弹确认框） |
| **∞ (Link)** | 切换"测完即配"。亮起后，**Measure 跑完会自动接着 Match**——一键到底 |
| **Match** | 把测得的差值写回 Wwise（MakeUpGain/Volume/VolumeOffset）。**没选中 = 配全部** |
| **Sync** | 从 Wwise 读回**当前**属性值（如果你在 Wwise 手动动过推子，按 Sync 就能让工具知道）。详见 §8.1 |
| **Stop** | 中断当前 Measure/Match 任务 |

### 7.1 颜色含义

| 颜色 | 含义 |
|---|---|
| 蓝色 Measure | 测量动作 |
| 绿色 Match | 写入动作 |
| 红色 Stop | 中断 |
| 灰色 Sync | 读取动作（无破坏性） |
| 青色 ∞ | 链式 Measure → Match |

---

## 8. 对象列表

无论 Fixed 还是 Reference 模式，列表每一行都长这样：

```
Sound_Name      [当前值]  [测得 LUFS]  [Delta]
```

| 列 | 含义 |
|---|---|
| **名字** | Wwise Sound 对象的名字；行首 `[!]` = 验证失败，绿色 = 已被 Match 过 |
| **当前值** | 当前 Wwise 里的 MakeUpGain / Volume / VolumeOffset 值（单位 dB） |
| **测得 LUFS** | 上次 Measure 测到的响度。`---` = 还没测 |
| **Delta** | 需要写入的差值。**未匹配状态**才显示：黄色 = +、蓝色 = −、灰色 = ≈0 |

### 8.1 Sync：推子联动

按一次 **Sync**，工具会：

1. 从 Wwise 重新读取所有对象的当前属性值（MakeUpGain / Volume）
2. 如果某个对象的值**变了**（比如你在 Wwise 里手动推了 +3dB），工具会**自动把列表里那行的"测得 LUFS"也跟着 +3dB**

逻辑很简单：**Wwise 推子动了多少 dB，这个 Sound 实际播出来就响了多少 dB**——所以列表里的预测值跟着平移，等于免去你重新 Measure 一遍。

> 💡 Sync 同时会把"已 Match"的绿色标记清掉——因为既然你手动动过了，前一次 Match 的状态就不再可信。
>
> ⚠️ 这是**线性的数学平移**，不是真的重新听一遍。如果你的 Sound 经过限制器/压缩器等**非线性**链路，Sync 后的预测可能和实际有偏差——这种情况建议直接重新 Measure。

### 8.2 右键菜单

**Fixed Target 列表**：

| 菜单 | 行为 |
|---|---|
| **Delete Selected** | 从列表移除（不影响 Wwise） |

**Reference 列表（A 或 B）**：

| 菜单 | 行为 |
|---|---|
| **Remove** | 从这一边删除并上移；另一边不动，尾部补 `[Empty]` 对齐 |
| **Insert Empty Above** | 在当前行上方插入一个 `[Empty]` 占位（用于手动调整配对） |
| **Delete Pair (A & B)** | 整行删——A、B 都消失 |

### 8.3 键盘 Delete

列表里选中行后按 **Delete** 或 **Backspace** = 等同 **Remove**（单边删除）。

---

## 9. 两种模式的工作流

### 9.1 Fixed Target 模式

把所有声音对齐到一个固定值（例如 -14 LUFS）。

```
1. Mode = Fixed Target
2. Target LUFS = -14
3. Adjust = MakeUpGain
4. 在 Wwise 里选中要对齐的 Sound 对象 → 点 Fetch Selected
5. 不选中任何行 → 点 Measure → 弹确认框 → OK
   （工具自动让 Wwise 逐个播放并测量）
6. Measure 完，列表里每行都有了 LUFS 和 Delta
7. 点 Match → 一次性写回所有差值
   （Auto-Verify 默认开着，会自动重测一遍）
8. 看状态栏：" Matched: 12 ok, 0 failed | 1 VERIFY FAILED"
   → [!] 行说明被下游效果器卡住了，需要单独排查
```

**快捷版**：把 ∞ 按钮点亮，第 5 步直接出结果——Measure 跑完自动接着 Match。

### 9.2 Reference 模式：1 对 1 对齐

把 B 列表的每条声音，对齐到 A 列表**同一行**的响度。

```
1. Mode = Reference
2. 在 Wwise 里选中"参考"声音 → 点 Fetch A
3. 在 Wwise 里选中"要调整的"声音 → 点 Fetch B
4. 此时 A 和 B 列表上下两个分屏并排显示
5. （可选）点 Auto Align → 工具按名字相似度自动配对
6. （可选）拖拽 / Insert Empty 手动微调配对
7. 点 Measure → 同时测 A 和 B
8. 点 Match → 把 B 写到与对应 A 同响度
```

“智能对齐逻辑：工具会自动识别资产名称中的文本结构与数字编号，进行智能模糊配对。如果两组资产命名差异过大，工具会将其视作无法匹配并留空，方便你后续手动微调。”

### 9.3 Lock A 按钮

A 列表上方有个 **A (Reference)  [Unlocked]** 按钮。点亮后变 **[LOCKED]**，列表背景变粉。

锁定后：A 列表**完全冻结**——不能拖拽、不能删除、不能 Insert Empty、Auto Align 也不会动 A。

> 💡 用途：A 是黄金参考、不能动；只让 B 这边去适配。

### 9.4 CSV 配对模板

**Export CSV** —— 把当前 A / B 配对导出成一份 CSV（两列：Reference Path、Target Path），可以在 Excel 里手动编辑配对关系。

**Import CSV Map** —— 把编辑好的 CSV 读回来，工具会按 Path 在当前 A、B 列表里找对应对象重新对齐。找不到的会显示成 `[Missing] xxx`（行首红字）。

**`[Empty]` 在 CSV 里是有效值**——表示"这一行就是空的"，重新 Import 时会还原成空行。

> ⚠️ Import 时如果 CSV 还在 Excel 里开着，会读取失败——**先关 Excel**。

### 9.5 列表同步滚动

Reference 模式下 A、B 两个列表的滚动是**联动的**——拖动其中一个，另一个跟着滚。

### 9.6 拖拽重排

列表行支持鼠标拖拽：

| 操作 | 行为 |
|---|---|
| **左键拖拽** | 移动到目标位置（其他行让位） |
| **Alt + 拖拽** | 复制一份到目标位置（不删原位置） |

拖动时会有一条**黄色横线**指示松手后的插入位置。

---

## 10. Voice Mode（多语言配音）

针对 Wwise **Voices** 文件夹结构：

```
Voices/
  Chinese/      ← 中文配音 wav
  English/      ← 英文配音 wav
  Japanese/     ← 日文配音 wav
```

**普通模式**写的是 **Sound 对象**的 MakeUpGain/Volume——对**所有语言**生效。

**Voice Mode** 写的是 **AudioFileSource** 对象的 **VolumeOffset**——只对**当前 Wwise 预览语言**生效。

### 10.1 启用 Voice Mode

1. 勾选 ☑ **Voice Mode**
2. Adjust 自动锁为 `VolumeOffset`
3. 参数卡片右侧出现 **Language: Chinese** 之类的提示（实时跟踪 Wwise 的当前语言）
4. Fetch / Measure / Match 流程和普通模式一样

### 10.2 Voice Mode 注意点

- **Language 显示的是 Wwise 当前的预览语言**——你在 Wwise 切换 Reference Language，这里会自动跟上
- 当前语言是 `SFX` / `Mixed` / `External` 这种非语音语言时，Match 会**拒绝执行**并提示
- **Sync 按钮在 Voice Mode 下不可用**（VolumeOffset 属于音频源（Source）层级的属性，而非 Sound 对象层级。）
- 不同 Sound 在不同语言下的资源是**独立的** ——切换语言后再 Measure，本质上是在测另一批 wav
- Fetch 后每个 Sound 会自动展开为对应语言的 AudioFileSource，**找不到对应语言资源的 Sound 会被跳过**

---

## 11. 状态栏与颜色

WAAPI 状态栏（Connect 下方那行）会实时反馈：

| 颜色 | 含义 |
|---|---|
| 灰色 | 空闲 / 提示性消息 |
| 蓝色 | 正在工作（Measuring / Matching） |
| 紫色 | 正在 Verify 重测 |
| 绿色 | 成功完成 |
| 黄色 | 被用户中断 |
| 红色 | 失败 / 错误 / Verify 失败 |

---

## 12. CSV 报告导出

在 Audio Settings 里勾选 **Export CSV Report after Match** 后，每次 Match 完成都会弹窗问要不要导出。

**Fixed Target 报告字段**：Name、Path、LUFS-I、Target、Delta、Old Value、New Value

**Reference 报告字段**：Pair、Role（Reference/Target）、Name、Path、LUFS-I、Target、Delta、Old Value、New Value

报告文件名 = `LoudnessReport_2026-05-23_143052.csv`，存储位置 = Audio Settings 里指定的目录（默认桌面）。

---

## 13. 典型工作流

### 工作流 A：一批 SFX 统一到 -14 LUFS

```
1. 连接 Wwise
2. Mode = Fixed Target, Target = -14, Tolerance = 0.5
3. Wwise 里选中要处理的 SFX → Fetch Selected
4. 点亮 ∞ → 点 Measure → 喝口水
5. 列表全绿 = 完成。看 [!] 行有没有 → 处理 Verify 失败
```

### 工作流 B：让新一批配音对齐到老配音

```
1. Mode = Reference
2. Wwise 选中"老配音"参考集合 → Fetch A
3. Wwise 选中"新配音"目标集合 → Fetch B
4. Auto Align → 看配对结果
5. 拖拽 / 右键 Insert Empty 修正错配
6. Lock A（防手误改 A）
7. Measure → Match
```

### 工作流 C：中文配音单独对齐到 -16 LUFS（其他语言不动）

```
1. Wwise 切换 Reference Language → Chinese
2. 勾选 ☑ Voice Mode → 看到 "Language: Chinese"
3. Mode = Fixed Target, Target = -16
4. Wwise 选中配音 Sound → Fetch Selected
5. Measure → Match
   → 只有中文 VolumeOffset 被写入；英文/日文资源完全不动
```

### 工作流 D：A/B 测试不同 Target 值

```
1. 测一次：Target = -14 → Match
2. 听感觉太响
3. Sync（把 Wwise 当前值读回来）
4. 改 Target = -16
5. 列表里的 Delta 自动重算
6. 再 Match → 写新差值
```

### 工作流 E：手动改了 Wwise 推子，重新做匹配

```
1. 你在 Wwise 里手动把 Sound_03 推了 +3 dB
2. 回到工具，点 Sync
   → 列表里 Sound_03 的"当前值"更新为新值
   → "测得 LUFS"自动 +3dB
   → 绿色 Match 标记清除（因为已经不再"对齐"）
3. 再 Match → 工具按新基准重新计算并写入
```

---

## 14. 注意事项

### 14.1 Measure 是真的在"听"

工具不读取 Wwise 的内部分析，而是通过你电脑的音频设备**实时听**播放出来的声音。所以：

- 你必须**听到声音**才能测到响度——耳机插对、系统音量别静音
- 系统里挂的任何后期处理（EQ、系统音量…）都会被测进去——**关掉它们**，建议**系统音量100%**
- `[Out] System Default` 是最稳妥的选择，跟随系统当前输出设备走

### 14.2 Auto-Verify 只是"再听一遍复查"

Auto-Verify 的本质很简单：Match 写完后，把这批 Sound **再播一次重新测量**，看实际响度有没有真的到目标。重测后差值仍然超过 Tolerance 的，就在行首标 `[!]`。

**为什么会复查失败**，原因有很多——常见的几种：

- 下游链路里挂了**限制器 / 压缩器 / 总线效果**，把你写的 Gain 吃掉了
- 动态范围特别大的声音，单次测量本身有点不稳
- 容差设得太严

`[!]` 标记只是提醒你"这条没对齐到"，**不代表写入失败**——值已经写到 Wwise 了，只是听感上没达到目标，需要你自己判断是放过它、调下游、还是放宽 Tolerance。

### 14.3 Tolerance 不要设得太小

设 0.0 = 几乎每次都要写。建议 **0.3 ~ 1.0**，符合实际听感分辨率。

### 14.4 Reference 模式 A、B 行数对不齐时会自动补空行

只要两边总行数不一样，工具会在短的那边尾部填 `[Empty]` 占位。这些空行**不参与配对、不影响测量**，纯粹是视觉对齐。

### 14.5 Voice Mode 的 Adjust 锁定是设计意图

VolumeOffset 是 AudioFileSource 唯一的"按源补偿"槽。普通模式的 MakeUpGain / Volume 是 Sound 级，会影响所有语言。所以 Voice Mode 强制锁定 VolumeOffset，避免污染其他语言资源。

### 14.6 Sync 会清掉 Match 的绿色标记

Sync 一执行，工具就认为你**已经在 Wwise 手动调过了**，前一次 Match 的"状态完美"不再可信，所以绿色去掉、重新进入"待 Match"状态。

### 14.7 ∞ 链式模式的容差跳过逻辑

测完后自动 Match 时，差值小于 Tolerance 的对象会被**跳过**——不算失败，状态栏报告 `skipped` 数量。

### 14.8 Lock A 真的会拦截一切

锁定时即使按 Delete 键也不会删 A 行，会弹"Action Blocked"提示框。这是为了防止误操作毁掉黄金参考。

---

## 15. 故障排查

| 现象 | 可能原因 | 解决 |
|---|---|---|
| Meter 完全没反应 | 设备没选对 / 系统输出在别的设备 | 打开 Audio Settings 选 `[Out] System Default` |
| Meter 一直 `---` | Wwise 没播放 / 系统设备不输出 | 在 Wwise 里点播放试听 |
| Measure 后 LUFS = -inf / 极低 | Wwise 没真的播出来 / 音量太小 | 确认 Wwise 试听音量、确认系统音量不是 0 |
| Match 不写入 / 状态栏报 0 ok | Tolerance 太大，所有差值都被认为"已经够了" | 把 Tolerance 调小 |
| Auto-Verify 一直失败 | 下游有限制器吃掉了增益 | 检查 Master 总线和插入效果链 |
| Sync 后绿色 Match 标记消失 | 这是预期行为 | 不是 bug，按需重新 Match |
| Voice Mode 提示 "invalid language" | Wwise 当前预览语言是 SFX / Mixed | 在 Wwise 切到具体语言 |
| Voice Mode Fetch 后某些 Sound 没出现 | 这些 Sound 在当前语言下没有 AudioFileSource | 正常行为，工具自动跳过 |
| Import CSV 失败 | CSV 还在 Excel 里打开 | 关闭 Excel 再试 |
| Auto Align 配对错乱 | 名字差异太大、相似度较低 | 手动拖拽 / Insert Empty 微调 |
| 连不上 Wwise | Wwise 没开 / WAAPI 端口被占 | 确认 Wwise 已启动并启用了 WAAPI，或者可能多个Wwise |
| 切换 Wwise 工程后 Fetch 不出新对象 | WAAPI 连接被旧工程占着 | Disconnect → Connect 重连 |
| 列表行不见了 | 用 Delete 键删过 | 重新 Fetch 即可 |
| Reference 模式 B 列表 Match 报错"missing A reference" | 对应行的 A 没测过 | 先 Measure A，或两边一起 Measure |
| Stop 按下后还在跑 | 工具正在与 Wwise 传输数据，请稍候；连接仍挂载在旧的 Wwise 工程上，请断开并重新连接 | 等当前一个对象处理完，会立即停下 |

