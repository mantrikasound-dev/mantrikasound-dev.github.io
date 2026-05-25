# Assistants - Segment - Switch to Next Segment

把选中的 Item 切到**下一个 Segment**（循环，最后一个会回到第一个）。

需要先用 `Assistants - Segment - Enable Multi-Segment Switching` 启用过；如果还没启用，这个 Action 会自动先帮你分析一次再切。

---

## 行为

对每个选中的 Item：

1. 根据 Item 当前几何**自动判断它现在显示的是第几段**
2. 切到 `(当前段 + 1) % 总段数` —— 到了最后一段会**循环回第 1 段**
3. Item 几何变成新段的形状，Fade 等设置保留

---

## 注意

- 没选 Item / 只有 1 段 / 检测失败时**不动**
- 多个 Item 一起执行时，每个 Item 各自独立判断当前段并切换
- 操作是一次 Undo
- 想反方向走用 `Switch to Previous Segment`，想跳着走用 `Switch to Random Segment`
