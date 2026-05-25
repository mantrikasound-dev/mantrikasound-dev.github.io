# Assistants - Segment - Switch to Random Segment (transient-aware)

把选中的 Item **随机切到另一个 Segment**，带瞬态对齐——新段的起点会对齐到旧段的瞬态位置上，听起来不突兀。

需要先用 `Assistants - Segment - Enable Multi-Segment Switching` 启用过；没启用会自动先分析一次再切。

---

## 行为

对每个选中的 Item：

1. 随机选一个**和当前段不同**的段
2. **瞬态对齐**：如果当前段含可见的瞬态点，新段会被摆到让自己的瞬态对齐到旧段瞬态所在的时间线位置——保持节奏感
3. Item 变成新段的形状，Fade 等设置保留

---

## 注意

- 没选 Item / 只有 1 段时**不动**
- 多个 Item 一起跑时，每个 Item 独立随机，结果互不影响
- 反复执行会持续给你不同的段
- 操作是一次 Undo
