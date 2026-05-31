# 【合集】Prune - 修剪与清场

一组「删 Item 并顺手清空轨」的工具：删除或移动 Item 后，把因此**变空的轨道**一并清掉，让工程不留空壳轨。共有五个变体。

---

## 五个变体对照

| Action List 里的精确显示名 | 对 Item 做什么 | 是否级联删空轨 |
|---|---|---|
| **Prune - Delete Selected Items (cleanup empty tracks)** | 删除选中的 Item | 是 |
| **Prune - Crop Project to Selection (keep only selected items)** | 删除**未选中**的 Item，只保留选中的 | 是 |
| **Prune - Extract & Purge Up (move items up, delete empty source tracks)** | 选中 Item 各自**上移一轨** | 是（删原轨道） |
| **Prune - Extract & Purge Down (move items down, delete empty source tracks)** | 选中 Item 各自**下移一轨** | 是（删原轨道） |
| **Prune - Delete Selected Items with Envelope Points** | 删除选中 Item，并清掉其时间范围内的自动化点 | **否**，轨道一律保留 |

---

## 什么算「空轨道」

除「Delete Selected Items with Envelope Points」外，其余四个变体的级联删轨判定一致，很严格——只有同时满足以下全部条件才会被删：

- 轨道上**没有任何 Item**
- 没有 FX
- 没有 Send、没有 Receive
- 不是 Folder 的开头轨（带着子轨道的 Folder 父轨不会被删）

只要还挂着 FX、路由或者是 Folder 父轨，就算没 Item 也**保留**。

---

## 共有行为

- 删轨道时会**保护 Master，绝不删**
- 操作是一次 Undo，一次 Ctrl+Z 可整个还原

---

## 各变体差异

### Delete Selected Items（删选中 + 清空轨）

1. 删除所有选中的 Item
2. 检查这些 Item 原来所在的轨道，只要因此变空就一并删掉

- 没选 Item 时**不做事**
- 操作完保留你原来的轨道选择

### Crop Project to Selection（反向修剪，只留选中）

1. 删除工程里**所有未选中的 Item**（选中的原样保留）
2. 检查被清空的轨道，只要因此变空就一并删掉

- 没选任何 Item 时会弹窗提醒你**先选至少一个 Item**，不会清空整个工程

### Extract & Purge Up（上移 + 清原轨）

1. 选中的 Item 各自上移一轨（等同 REAPER 原生的「Item 上移一轨」）
2. 检查它们原来所在的轨道，只要因此变空就删掉

- 没选 Item 时**不做事**
- 选中的 Item 已经全在**第一轨**（没法再往上）时，**不做事**

### Extract & Purge Down（下移 + 清原轨）

和 Extract & Purge Up 完全对称，只是方向朝下。

1. 选中的 Item 各自下移一轨（等同 REAPER 原生的「Item 下移一轨」）
2. 检查它们原来所在的轨道，只要因此变空就删掉

- 没选 Item 时**不做事**

### Delete Selected Items with Envelope Points（删选中 + 抹自动化）

删掉选中的 Item，同时清掉这些 Item **时间范围内的自动化点**，连带把藏在 Item 底下的 Envelope 笔触一起抹干净。对每个选中 Item：

1. 清掉它所在轨道上、**落在该 Item 时间范围内的所有 Envelope 点**（覆盖该轨道的每一条 Envelope）
2. 删掉 Item 本身

- 没选 Item 时**不做事**
- 和其它 Prune 不同：本 Action **不会**级联删除变空的轨道，**轨道一律保留**
- 只清掉落在 Item 时间范围内的自动化点，范围外的点不动
- 一次 Ctrl+Z 可整个还原（包括被清掉的自动化点）
