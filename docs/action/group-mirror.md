# 【合集】Assistants - Mirror

一组针对 **Mirror（镜像 Item）** 的 Action：手动套大字显示、清空、把 Mirror 烧成静态 Region、以及用轨道名给 Mirror 批量命名。（Mirror、Note、大字显示是什么见 Mirror 用户手册。）

---

## 各变体

| Action List 显示名 | 做什么 |
| --- | --- |
| `Assistants - Mirror - Apply Stretched Text to All Mirrors` | 给**工程里所有** Mirror 套大字显示 |
| `Assistants - Mirror - Apply Stretched Text to Selected Mirrors` | 只给**当前选中**的 Mirror 套大字显示 |
| `Assistants - Mirror - Clear All Mirrors` | 一键清空所有 Mirror 及其编组 |
| `Assistants - Mirror - Create Static Regions from Mirrors` | 把有 Note 的 Mirror 烧成不跟随的静态 Region |
| `Assistants - Mirror - Apply Track Name to Mirror Notes` | 把选中轨道名强制套给该轨所有 Mirror Note（≥2 个自动加 `_01/_02` 后缀） |

---

## 套大字显示（两个 Stretched Text）

把 Mirror 的 Note 文字放大铺满整块，远看也清楚。两个变体只差**作用范围**：一个处理全部 Mirror，一个只处理选中的 Mirror，其余不动。

共有规则：

- **只对写了 Note 的 Mirror 生效**：空 Note 的设了也没用（底层会忽略），自动跳过。
- 已经是大字模式的也跳过，不重复处理。
- `All` 版做完会弹提示告诉你处理了几个，一个都没需要处理时也提示。

这是大字显示的**手动一次性触发**，比常开的 `Auto Mirror Large Text Display` 开关省性能，推荐需要时点一下。`Selected` 版适合只想突出局部几段。操作是一次 Undo。

---

## `Assistants - Mirror - Clear All Mirrors`

一键把 Mirror 系统「重置」：

- 删掉工程里**全部 Mirror**。
- 清掉 Mirror 造成的轨道 Item 编组。

注意：只删 **Mirror 系统的东西**，你**自己画的 Region 不受影响**。Mirror 乱了、或想从头来过时用它。操作是一次 Undo。

---

## `Assistants - Mirror - Create Static Regions from Mirrors`

把有 Note 的 Mirror **「变成」成一批静态 Region**——按 Mirror 当前位置和长度生成 Region，之后这些 Region **不再跟着 Mirror 动**。

- 在 Mirror 当前覆盖的时间范围生成一条 **Region**。
- **Region 名 = Note 的第一行**（多行只取第一行）。
- 空 Note 的 Mirror 跳过。

**"静态"的含义**：这些 Region 在生成那一刻**按 Mirror 当前位置和长度定格**，之后**不受 Mirror 管理、不会再跟随 Mirror 动**——哪怕之后 `Clear All Mirrors` 或关掉 Mirror，它们也依然保留。适合「段落和命名都调满意了，想永久定格当前划分」的场景。操作是一次 Undo。

---

## `Assistants - Mirror - Apply Track Name to Mirror Notes`

和上面的「套大字」「烧 Region」不同，这个 Action 处理的是 **Mirror 的命名**，方向是 **轨道名 → Mirror Note**（拿轨道名去填 Mirror 的 Note）。

也可从 **Extensions 菜单** 或 **轨道右键菜单** 触发。

**适合的场景**：轨道**已经起好名了**，只想让这条轨上的 Mirror Note 直接套用轨道名、**不想再单独折腾每个 Mirror 的命名**。点一下，全轨 Mirror 命名一步到位。

作用于**所有选中轨道**，每条轨各自独立处理。对每条轨：

- **强制覆盖**——不管 Mirror Note 原来写了什么，一律用轨道名重写，不做合并、不做保留。
- **该轨 Mirror ≥ 2 个**：按时间线从左到右，在轨道名后依次加后缀 `_01`、`_02`……（两位补零，到第 100 个自然变三位）。**只支持 `_01 _02` 这种 `下划线 + 数字` 的后缀形式**，不支持字母（`_a/_b`）或其他分隔符。
- **该轨只有 1 个 Mirror**：不加后缀，Note 就等于轨道名本身。
- **轨道名为空**：把该轨所有 Mirror Note **全部清空**（连带不会出现 `_01` 这种空名带后缀的情况）。
- **该轨没有任何 Mirror**：**静默跳过**，不报错、不弹窗。

写完 Note 后会**顺带套大字显示**（同 `Apply Stretched Text`），保证出来的文字是放大版的。整个操作是一次 Undo。

> 它和常开的 `Auto Mirror Track Name`（方向相反：Mirror Note → 轨道名）不冲突：两边 basename 一致，`Note=Gun_01` 与 `轨名=Gun` 互相自洽收敛。
