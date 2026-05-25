# Assistants - Segment - Restore Original Item

把 Segment 处理过的 Item **彻底还原**到分析之前的原始状态——清掉 Segment 数据、恢复几何、清掉自动加的 Fade。

---

## 行为

对每个选中的 Item：

1. **清掉 Segment 数据**（Item 上记录的段落信息全部抹除）
2. **恢复原始几何**——Item 长度 / 起始偏移回到分析前
3. **清掉 Fade In / Fade Out**（即使是你手动改过的值也会清掉）
4. **清掉 Reverse Fold 状态**（如果之前用 `Reverse Items with Fold Effect` 处理过）

---

## 什么时候用

- 不想再用 Segment 切换，想回到普通 Item
- Segment 检测的分段不理想，想清掉重新 Enable（重新分析一次）
- 之前折腾过 Reverse Fold 也一并清理

---

## 注意

- 没选 Item 时**不做事**
- ⚠️ 会**清掉 Fade**，包括你后期手动调过的值——介意的话用之前自己记一下 Fade 值，或靠 Undo 退回去
- 操作是一次 Undo
