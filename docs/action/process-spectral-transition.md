# Process - Create Spectral Transition for Overlapping Items

对**同一轨道上已经交叠**的 Item，在它们的交叠区域**生成一段"音色过渡" Item 贴上去**，让前一条声音平滑变成后一条——无需打开 Spectral Forge 窗口，一键完成。

> 这是 Spectral Forge 的兄弟动作。算法原理、Source/Target 角色、相关概念详见 **Spectral Forge 用户手册（spectral-forge.md）**。

---

## 怎么用

1. 在**同一条轨道**上选中**至少 2 个相互交叠**的 audio Item（按时间先后排列）
2. 触发这个 Action
3. 自动在每一处交叠区域生成一段过渡 Item，并贴回时间线

每对相邻 Item 的交叠区都会各生成一段过渡。

---

## 行为细节

- 选中的 Item **必须都在同一轨道**，否则提示后中止
- 不支持 **MIDI** Item（会提示）
- 交叠**至少要 100ms** 才算有效，太短的交叠会被跳过；一处有效交叠都没有时会提示 "No valid overlaps found"
- 生成时会：把前一条 Item 在交叠区域略作收尾、后一条略作起头，中间插入合成出的**过渡 Item**，并自动加好交叉 Fade，让三段衔接顺滑
- 过渡 Item 沿用前一条 Item 的音量
- 合成出的音频文件写到工程的 `SpectralForge/` 目录下

---

## 注意

- 时间选区 / 轨道选择不重要，**关键是选中的那几个交叠 Item**
- 整个操作是**一次 Undo**，按一次 Ctrl+Z 可整体还原
- 想要更多控制（自己选算法、试听、调参数），改用 Spectral Forge 主窗口，见 spectral-forge.md
