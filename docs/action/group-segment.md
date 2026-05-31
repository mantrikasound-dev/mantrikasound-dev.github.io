# 【合集】Segment（音频分段切换）

Segment 让一个 Item **像 Sampler 一样能在多段声音之间切换**。

工具会用音频分析把 Item 里的源音频拆成若干个**段落（Segment）**——比如一段录的 5 声脚步，会被识别成 5 个 Segment。识别之后这些段落信息**记在 Item 上**（跟着 Item 走），后续的**切换 / 随机 / 拆分 / 还原**都拿这份数据用。

整套 Segment 工具包含：先用 **Enable** 分析并启用，之后可以 **Next / Previous** 在段间切换、**Random** 随机切换、**Dynamic Split** 把所有段拆成独立 Item，或用 **Restore** 彻底还原。

> 共同说明：除特别注明外，每个 Action **没选 Item 时什么都不做**；**多个 Item 一起执行时，每个 Item 各自独立处理**；**每次执行都是一次 Undo**。除 Enable / Restore 外的 Action，如果 Item 还没分析过，会**自动先帮你分析一次**再执行。

---

## 启用并分析

**REAPER Action List 显示名：** `Assistants - Segment - Enable Multi-Segment Switching`

这是 Segment 全家桶的入口——先用它分析一遍，之后才能用 Next / Previous / Random 切换。

执行后对每个选中的 Item：

1. **做一次音频分析**（带缓存，重复执行不会重跑）
2. 把 Item 几何剪成 **第 1 段（Segment 0）** 的形状——你会看到 Item 立刻"缩"成只剩第一段
3. 顺手加默认 **Fade In 1ms / Fade Out 50ms**，避免咔哒声

注意：

- 同一个 Item 反复 Enable 不会重复分析；想强制重新检测请先 Restore 再 Enable

---

## 切到下一段

**REAPER Action List 显示名：** `Assistants - Segment - Switch to Next Segment`

把选中的 Item 切到**下一个 Segment**（循环，最后一个会回到第一个）。

对每个选中的 Item：

1. 根据 Item 当前几何**自动判断它现在显示的是第几段**
2. 切到 `(当前段 + 1) % 总段数` —— 到了最后一段会**循环回第 1 段**
3. Item 几何变成新段的形状，Fade 等设置保留

注意：

- 只有 1 段 / 检测失败时**不动**
- 想反方向走用 `Switch to Previous Segment`，想跳着走用 `Switch to Random Segment`

---

## 切到上一段

**REAPER Action List 显示名：** `Assistants - Segment - Switch to Previous Segment`

把选中的 Item 切到**上一个 Segment**（循环，第一个会跳到最后一个）。

对每个选中的 Item：

1. 根据 Item 当前几何**自动判断它现在显示的是第几段**
2. 切到 `(当前段 - 1)`——已经在第 1 段时**循环到最后一段**
3. Item 几何变成新段的形状，Fade 等设置保留

注意：

- 只有 1 段 / 检测失败时**不动**

---

## 随机切换（带瞬态对齐）

**REAPER Action List 显示名：** `Assistants - Segment - Switch to Random Segment (transient-aware)`

把选中的 Item **随机切到另一个 Segment**，带瞬态对齐——新段的起点会对齐到旧段的瞬态位置上，听起来不突兀。

对每个选中的 Item：

1. 随机选一个**和当前段不同**的段
2. **瞬态对齐**：如果当前段含可见的瞬态点，新段会被摆到让自己的瞬态对齐到旧段瞬态所在的时间线位置——保持节奏感
3. Item 变成新段的形状，Fade 等设置保留

注意：

- 只有 1 段时**不动**
- 反复执行会持续给你不同的段

---

## Dynamic Split（按段拆成独立 Item）

**REAPER Action List 显示名：** `Assistants - Segment - Dynamic Split`

把选中的 Item **按检测到的 Segment 边界一刀刀切开**，变成多个独立的 Item，每个 Item 装一段；中间的**静音间隙会被删除**。

类似 REAPER 自带的 Dynamic Split，但用的是 Segment 的边界（带能量锚点、瞬态识别）。

对每个选中的 Item：

1. 用 Segment 数据找出当前 Item 可见范围内**所有段落的边界**（已分析过的直接复用，没分析过自动跑一次）
2. 在每个边界点切开 Item，得到一串新 Item
3. **判断每段中心点**是否落在某个 Segment 内：
   - 落在 → 保留（这是一个有效的 Segment Item）
   - 落不在（说明是段与段之间的静音） → **删掉**

最后你得到的就是一串纯净的 Segment Item，原 Item 的源音频、Fade 等设置都正确继承到每一段上。

用途：

- 一长条录的"5 声脚步"切成 5 个独立 Item，方便单独调音量 / 移位置 / 复用
- 准备做随机化触发：拆完直接送 Macro Control / Qi 之类的工具批量随机

注意：

- 当前可见范围内一个段都没有时**不动**

---

## 还原原始 Item

**REAPER Action List 显示名：** `Assistants - Segment - Restore Original Item`

把 Segment 处理过的 Item **彻底还原**到分析之前的原始状态——清掉 Segment 数据、恢复几何、清掉自动加的 Fade。

对每个选中的 Item：

1. **清掉 Segment 数据**（Item 上记录的段落信息全部抹除）
2. **恢复原始几何**——Item 长度 / 起始偏移回到分析前
3. **清掉 Fade In / Fade Out**（即使是你手动改过的值也会清掉）
4. **清掉 Reverse Fold 状态**（如果之前用 `Reverse Items with Fold Effect` 处理过）

什么时候用：

- 不想再用 Segment 切换，想回到普通 Item
- Segment 检测的分段不理想，想清掉重新 Enable（重新分析一次）
- 之前折腾过 Reverse Fold 也一并清理

注意：

- ⚠️ 会**清掉 Fade**，包括你后期手动调过的值——介意的话用之前自己记一下 Fade 值，或靠 Undo 退回去
