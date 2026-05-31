# 【合集】Automation Items - Adaptive

按轨道上 Item 的位置，在该轨道的 Envelope（包络）上自动建出对应的 Automation Item；以及一键清空。

---

## 各变体

| Action List 显示名 | 做什么 |
| --- | --- |
| `Automation Items - Adaptive - Create From Track Items (no loop)` | 按 Item 位置生成 Automation Item，**不循环**（拉长不会重复内容） |
| `Automation Items - Adaptive - Create From Track Items (looped)` | 同上，但**开启循环**（拉长会重复源内容） |
| `Automation Items - Adaptive - Clear All Automation Items` | 删掉 Envelope 上的**所有 Automation Item** |

两个 Create 只差**循环开关**，其它逻辑完全一样。

---

## 作用对象（三个变体通用，按优先级）

1. 当前**选中了某条 Envelope** → 只在这条 Envelope 上操作。
2. 否则按**选中的轨道**处理，给每条轨道上的**所有** Envelope 都操作。

没选 Envelope、也没选轨道时，不做事。

---

## Create：范围怎么取

每条轨道（或 Envelope 所在轨道）按这个顺序找 Item：

1. 该轨道上**选中的 Item**。
2. 没有选中的，就用该轨道上**全部 Item**。
3. 轨道是个 Folder 头且自己一个 Item 都没有 → 自动收**子轨道的 Item**（跳过静音轨道、静音 Item）。

每个 Item 占一段，**重叠的段会合并**成一段，再据此建 Automation Item。建完会先**取消选中**原有的 Automation Item，再**自动选中新建的**这批。

---

## Clear：清的范围

只删 Automation Item，**Envelope 本身和上面手画的点不动**。

---

## 注意

- Create：轨道上没有 Envelope，或找不到任何 Item，安静跳过。
- 操作是一次 Undo。
