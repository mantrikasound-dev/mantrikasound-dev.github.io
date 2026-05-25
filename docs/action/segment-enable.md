# Assistants - Segment - Enable Multi-Segment Switching

让一个 Item **像 Sampler 一样能在多段声音之间切换**。这是 Segment 全家桶的入口——先用它分析一遍，之后才能用 Next / Previous / Random 切换。

---

## 什么是 Segment

工具会用音频分析把 Item 里的源音频拆成若干个**段落（Segment）**——比如一段录的 5 声脚步，会被识别成 5 个 Segment。识别之后这些段落信息**记在 Item 上**（跟着 Item 走），后续的切换 / Split / 还原都拿这份数据用。

---

## 行为

执行后对每个选中的 Item：

1. **做一次音频分析**（带缓存，重复执行不会重跑）
2. 把 Item 几何剪成 **第 1 段（Segment 0）** 的形状——你会看到 Item 立刻"缩"成只剩第一段
3. 顺手加默认 **Fade In 1ms / Fade Out 50ms**，避免咔哒声

---

## 之后能干什么

- **Next / Previous / Random** 切换到其它段
- **Dynamic Split** 把所有段一次拆成独立 Item
- **Restore** 回到分析前的原始状态

---

## 注意

- 没选 Item 时**什么都不做**
- 同一个 Item 反复 Enable 不会重复分析；想强制重新检测请先 Restore 再 Enable
- 操作是一次 Undo
