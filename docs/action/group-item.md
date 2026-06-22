# 【合集】Item（媒体项）操作

针对工程里选中的 Item 的一组操作：裁剪、淡化、分割、微调音量音高、反转、跳转、清理静音、对齐、独奏试听、做无缝循环等。这是动作最多的一类，下面按功能分小节。

**共通约定**（各小节默认遵守，不再重复）：

- 一次可对**多个选中 Item** 同时操作，各 Item **各自独立**处理
- 每个操作都是**一次 Undo**，按一次 Ctrl+Z 整体还原
- 多数操作在没选 Item 时会提示先选

---

## 目录

1. [裁剪 Trim](#1-裁剪-trim)
2. [淡化 Fade & Crossfade](#2-淡化-fade--crossfade)
3. [分割 Split](#3-分割-split)
4. [音量·音高微调 Nudge](#4-音量音高微调-nudge)
5. [重置音量 Reset](#5-重置音量-reset)
6. [反转 Reverse](#6-反转-reverse)
7. [导航 Navigate](#7-导航-navigate)
8. [清理静音项 Cleanup Muted](#8-清理静音项-cleanup-muted)
9. [对齐到同名 Region](#9-对齐到同名-region)
10. [独奏并聚焦视图](#10-独奏并聚焦视图)
11. [零点交叉循环](#11-零点交叉循环)
12. [复制选中对象的名字](#12-复制选中对象的名字)
13. [用子 Item 名命名 Mirror](#13-用子-item-名命名-mirror)

---

## 1. 裁剪 Trim

把选中 Item 的一侧边缘剪到**当前播放光标**处——光标另一侧的内容被切掉，对应边缘对齐到光标。

| Action List 显示名 | 剪哪一侧 | 效果 |
| --- | --- | --- |
| **Item - Trim Selected Item Left** | 左边缘 | 把左边缘移到光标处，光标**左侧**那段不再发声，Item 起点向右收 |
| **Item - Trim Selected Item Right** | 右边缘 | 把右边缘移到光标处，光标**右侧**那段不再发声，Item 结尾向左收 |

---

## 2. 淡化 Fade & Crossfade

给 Item 加淡入、淡出，或在相邻 Item 之间做交叉淡化，让衔接更平滑。均调用 REAPER 原生功能。

| Action List 显示名 | 作用 | 范围 |
| --- | --- | --- |
| **Item - Fade In to Cursor** | 加一段淡入 | Item 起点 → 当前播放光标 |
| **Item - Fade Out to Cursor** | 加一段淡出 | 当前播放光标 → Item 结尾 |
| **Item - Crossfade in Time Selection** | 相邻 Item 交叉淡化 | 时间选区范围内 |

**Crossfade 用法**：先拉出一个**时间选区**，让它盖住两个相邻 Item 的搭接处，再触发本操作；两个 Item 在选区内一进一出交叉淡化。

---

## 3. 分割 Split

把选中的 Item 在指定位置切开。切割位置可以是编辑光标、Marker 或 Region 边界，三个变体**切完后的处理各不相同**。

| Action List 显示名 | 在哪里切 | 切完后处理 |
| --- | --- | --- |
| **Item - Split items at edit cursor** | 编辑光标处（有时间选区时改在选区 / Razor Edit 边界切） | 无时间选区时切完**取消所有 Item 选中**，避免只剩半边被选住 |
| **Item - Split Items at Markers** | 每个 Marker 的位置（只用 Marker，不含 Region） | 碎片**全部保留**，不删除 |
| **Item - Split Items at Region Boundaries** | 每个 Region 的起点和终点 | **删掉所有落在 Region 之外的碎片**，只留完整待在 Region 里的部分 |

**Region Boundaries 细节**：收集所有 Region 的起止点作为切割线（重叠的 Region 先合并，相邻不合并）；切完逐段判断，完整待在某个 Region 内的留下，没有任何 Region 罩住的删掉。适合按 Region 把一长条素材裁成一段段，Region 之间的空隙自动清掉。

**注意**：

- Markers / Region Boundaries 两个变体：没选 Item 会提示先选
- 工程里一个 Marker / Region 都没有时不动（Region 变体不会误删）
- 紧贴 Item 自身起止边界的切割线（Marker）会跳过，不产生多余空切

---

## 4. 音量·音高微调 Nudge

对选中 Item 做一档微调：音量 ±1 dB，或音高 ±1 半音。全部为**相对调整**（在当前值上叠加），反复触发可累加（如 +1、+2……）。音高分"保持时长"和"磁带式变速变调"两种方式，区别很重要。

| 类型 | Action List 显示名 | 改什么 | 时长 |
| --- | --- | --- | --- |
| 音量 +1 dB | **Item - Nudge Volume Up (+1 dB)** | Item 层音量，抬 1 dB | 不变 |
| 音量 -1 dB | **Item - Nudge Volume Down (-1 dB)** | Item 层音量，压 1 dB | 不变 |
| 音高 +1 半音 | **Item - Nudge Pitch Up (+1 semitone)** | 当前 Take 的独立音高偏移 | **不变** |
| 音高 -1 半音 | **Item - Nudge Pitch Down (-1 semitone)** | 当前 Take 的独立音高偏移 | **不变** |
| 变速变调 +1 半音 | **Item - Nudge Pitch Up via Playrate (+1 semitone)** | 当前 Take 的播放速率（加快，像磁带快放） | **变短** |
| 变速变调 -1 半音 | **Item - Nudge Pitch Down via Playrate (-1 semitone)** | 当前 Take 的播放速率（放慢，像磁带慢放） | **变长** |

**音量调整（±1 dB）**：在当前音量基础上抬高 / 压低 1 dB，不是设成固定值。**保留反相**（原来反相的仍反相）；**静音保持静音**（原本被压到 -∞ 的，再调仍是静音）。

**音高调整（±1 半音，时长不变）**：对每个 Item 的**当前 Take**，走 Take 的独立音高偏移做 ±1 半音，**不改播放速率**，所以 **Item 时长不变**。

**变速变调（±1 半音，磁带式，时长会变）**：靠加快 / 放慢播放速率改变音高——音高和时长一起变，升调变短、降调变长。本操作会自动按比例调整 Item 长度，保证音频内容不被裁切；会**强制关闭** Take 的"变速时保持音高"（Preserve pitch），让变调真正生效（会覆盖你在该 Take 上的相关设置）；并把 Take 的**独立音高偏移清零**，避免和变速调音叠加。

---

## 5. 重置音量 Reset

| Action List 显示名 | 行为 |
| --- | --- |
| **Item - Reset Item Volume (0 dB)** | 把选中 Item 的 **Item 层**音量重置回 0 dB（增益 1.0）。不影响 Take 音量、轨道音量、包络。 |

---

## 6. 反转 Reverse

把选中的 Item 反转（倒放）。两种变体的区别在于反转后 Item 的**摆位方式**。

| Action List 显示名 | 摆位方式 |
| --- | --- |
| **Item - Reverse Items with Fold Effect** | 像书页对折：反转后整段翻到原起点**左边**（新终点正好落在原来的起点上）。开关式操作，再按一次原样还原。 |
| **Item - Reverse Items in Place** | 位置和长度**原地不动**：内容倒放，但区段还盖在原来那块声音上，且保证倒放的还是同一段内容。 |

**with Fold Effect（对折反转）**：开关式操作，对每个 Item 独立判断——

- **还没折过** → 反转音频，并把 Item 平移到原起点左侧（新终点贴齐原起点），记下原始位置 / 长度 / 反转状态
- **已经折过** → 反转还原，位置 / 长度 / 起始偏移全部回到折叠前

用途：做"倒灌 / 吸入"类音效，想让反转后的尾巴正好接在原素材开头；一键来回切换正放和"对折反转"。

**in Place（就地反转）**：对每个 Item 反转音频后，**自动补偿** Item 在源素材里的取材位置，使得反转后取到的还是**原来那一段**的内容（只是倒过来播），而不是跳到素材别处；再把位置、长度还原到反转前。已考虑 Item 的播放速率。用途：想就地倒放某段，不希望 Item 跑位、不希望露出素材里别的部分。

---

## 7. 导航 Navigate

在**当前轨道**上沿播放光标跳到相邻的 Item：选中它、把光标移到它的起点。到头后循环。

| Action List 显示名 | 跳转方向 |
| --- | --- |
| **Item - Cycle Navigate to Next Item** | 跳到光标**右边**的下一个 Item；到末尾后循环回第一个。 |
| **Item - Cycle Navigate to Previous Item** | 跳到光标**左边**的上一个 Item；到开头后循环回最后一个。 |

**行为**：在第一个选中的轨道上按位置排列该轨 Item，找到对应方向上最近的那个，**只选中它**（取消其他选择），光标移到它的起点；已在尽头时循环到另一端。播放时跳转会先暂停，跳完自动从新位置继续播。

**注意**：

- 没选轨道时不动
- **录音中不跳转**
- 如果该轨道上有 **Mirror Item（镜像段落），只在这些 Mirror Item 之间跳**（优先）；否则在普通 Item 之间跳

---

## 8. 清理静音项 Cleanup Muted

找出被静音（Mute）的 Item，先全部选中让你看一眼，弹窗显示数量并询问是否删除。5 个变体的区别只在**搜索的作用范围**。

| Action List 显示名 | 作用范围 |
| --- | --- |
| **Item - Cleanup Muted - Entire Project** | **整个工程**的所有 Item。 |
| **Item - Cleanup Muted - Selected Items Only** | 仅**当前选中的 Item** 之内；没选中的不碰。 |
| **Item - Cleanup Muted - Overlapping Any Region** | 全工程中**与任意一个 Region 有重叠**的 Item（碰到 Region 边界内就算，不要求完整包含）。 |
| **Item - Cleanup Muted - On Folder Child Tracks** | 仅**所有 Folder 的子轨道**上（含嵌套内层轨道）；不在任何 Folder 里的普通轨道不碰。 |
| **Item - Cleanup Muted - On Selected Tracks** | 仅**当前选中的轨道**上；按轨道选择来定，跟 Item 选不选无关。 |

**行为**：在对应范围内找出静音 Item → **全部选中**让你先在工程里看一眼 → **弹窗显示数量并询问是否删除**。确认则删除；取消则不删，保持选中供你检查。

**注意**：对应范围内没有静音 Item 时会提示，什么都不做；其中 Overlapping Any Region 在工程里没有 Region 时也会提示，On Selected Tracks 在没选轨道时也会提示。

---

## 9. 对齐到同名 Region

| Action List 显示名 | 行为 |
| --- | --- |
| **Item - Align to Region by Matching Name** | 按 Item 的**文件名**找到同名的 Region，把 Item 的起点对齐到该 Region 的开头。 |

**行为**：先弹窗问你一个**要去掉的后缀**（默认 `-imported`，不需要可清空）；对每个选中 Item 取源文件名（不含扩展名），去掉该后缀得到一个名字，拿去工程里找**同名 Region**——找到就把 Item 移到该 Region 起点（**只动横向位置，不改轨道、不改长度**），找不到就不动并记进失败清单；完成后在控制台报告成功 / 失败数量。

**注意**：名字必须**完全相同**才算匹配（后缀只从结尾去掉一次）；只对齐起点，不改 Item 长度。用途：一批带统一后缀（如 `xxx-imported`）的导入素材，去掉后缀后各自归位到工程里早就标好的同名 Region 上。

---

## 10. 独奏并聚焦视图

| Action List 显示名 | 行为 |
| --- | --- |
| **Item - Solo Tracks of Selected Items and Focus the View** | 把选中 Item 所在轨道**独奏出来单独试听**，并把光标移到这些 Item 最前面（留提前量）方便立刻播放。再触发一次恢复原状。 |

**行为**：找出选中 Item 所在的所有轨道，**只独奏这些轨道**、其余静音；把播放光标移到最早那个 Item 的**起点前约 70 毫秒**（预卷）；同时选中这些轨道做视觉反馈；进入独奏前**记住原独奏状态**，用同一批 Item 再触发一次就**退出独奏、恢复原状**。

**细节**：已静音的 Item、或所在轨道（含上级 Folder）被静音的，**不计入**；Folder 开头轨的独奏状态会保留不被清掉；没选 Item 时若当前正处于本工具的独奏态就退出恢复，否则不动。用途：快速隔离某几个 Item 所在轨道试听，听完一键还原；反复 A/B 对照。

---

## 11. 零点交叉循环

| Action List 显示名 | 行为 |
| --- | --- |
| **Item - Create Zero Crossing Crossfade Loop (adaptive time selection)** | 把 Item 从中间**在过零点处切成两半，前后两半对调位置并叠加交叉淡化**，做成首尾衔接、可无缝循环的 Loop。 |

**行为**：对每个 Item，在中点附近找最近的**过零点**切成两段 → 把两段**前后对调**（原后半段移到开头，前半段接到后面）→ 在接缝处做**交叉淡化**，淡化长度约整段的 15%。这样原本在头尾的内容被搬到中间用交叉淡化抹平，循环播放时听不出接缝；在过零点切分可避免接缝处的咔哒声。

**两种模式（自动判断）**：

- **Item 模式**（默认）：没有有效时间选区、或时间选区刚好等于 Item 范围时，按整个 Item 处理
- **时间选区模式**：画了一段和 Item 范围不同的时间选区时，按选区长度做 Loop；用 Item 在选区两侧多出来的素材来喂交叉淡化，Loop 长度严格对齐选区。此模式下 Item 必须至少**完整盖住选区**，否则该 Item 跳过

**注意**：选区模式下没有 Item 盖住选区时会提示无可处理项。

---

## 12. 复制选中对象的名字

| Action List 显示名 | 行为 |
| --- | --- |
| **Item - Copy selected item/track/mirror name to clipboard** | 一键把当前选中对象的名字复制到**系统剪贴板**，之后用 `Ctrl+V` 粘到任何地方（重命名框、文本、表格皆可）。自动识别选中的是 **Item / 轨道 / Mirror**，取对应的名字。 |

**行为**：按**当前焦点**判断对象类型——焦点在 Item 区就取选中 **Item** 的名字，焦点在轨道面板就取选中**轨道**的名字；该上下文里没有选中对象时会**自动回退**到另一种，避免「明明选了却复制不到」。**多选**时把多个名字用逗号 `, ` 拼成一段一起复制。

各类对象的取名规则：

- **轨道** → 轨道名
- **普通 Item** → 当前 Take 名，并**剥掉媒体文件后缀**（`.wav`/`.mp3`/`.aif` 等常见音视频/工程后缀；只剥白名单后缀，`Drums 2.0`、`Hit_v1.5` 这种名字里正常的点号不会被误伤）
- **Mirror** → 取它的 Note 文字

**注意**：

- 选中 Mirror 时，**Mirror 下面属于它的内容 Item 不会被重复抓**（落在该 Mirror 的 Folder 子轨道 + 时间范围内的 Item 视为属于 Mirror）；但不属于任何 Mirror 的独立 Item 仍会照常复制
- 没有任何可复制内容时**静默不做事**，也不会清空剪贴板
- 纯读取 + 写剪贴板，**不改动工程**，无需 Undo

---

## 13. 用子 Item 名命名 Mirror

| Action List 显示名 | 行为 |
| --- | --- |
| **Item - Set mirror name from selected child item** | 选中 Mirror 下面的一个子 Item，用它的名字（剥后缀）**覆盖**所属 Mirror 的 Note，方向是 **子 Item 名 → Mirror Note**。 |

**用法**：某个 Mirror 段落里有好几个素材 Item，想直接用其中某一个的名字当这段 Mirror 的名字——选中 Mirror **下面**（其 Folder 子轨道 + 时间范围内）的**一个** Item，触发本操作。随即：

- 自动找出这个 Item 所属的 Mirror（按 Folder 子轨道 + 时间范围归属判断）
- 取该 Item 名字，**剥掉媒体文件后缀**（规则同上一节），**强制覆盖**写入该 Mirror 的 Note

**只在「恰好选中一个、且属于某个 Mirror 的 Item」时生效**，其余情况一律**无效、不做任何反应**：

- 选中了**多个** Item（哪怕同一 Mirror 下，或跨多个 Mirror 各选一个）
- 选中的 Item **不属于任何 Mirror**
- 选中的是 **Mirror 本身**，或选中 Item 的名字为空

写完 Note 是**一次 Undo**，可直接 Ctrl+Z 还原。与 `Assistants - Mirror - Apply Track Name to Mirror Notes`（轨道名 → Note，作用于整轨所有 Mirror）互补：这个更精细，针对**单个** Mirror、用**子 Item 名**命名。
