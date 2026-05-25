# Assistants - Segment - Dynamic Split

把选中的 Item **按检测到的 Segment 边界一刀刀切开**，变成多个独立的 Item，每个 Item 装一段；中间的**静音间隙会被删除**。

类似 REAPER 自带的 Dynamic Split，但用的是 Segment 的边界（带能量锚点、瞬态识别）。

---

## 行为

对每个选中的 Item：

1. 用 Segment 数据找出当前 Item 可见范围内**所有段落的边界**（已分析过的直接复用，没分析过自动跑一次）
2. 在每个边界点切开 Item，得到一串新 Item
3. **判断每段中心点**是否落在某个 Segment 内：
   - 落在 → 保留（这是一个有效的 Segment Item）
   - 落不在（说明是段与段之间的静音） → **删掉**

最后你得到的就是一串纯净的 Segment Item，原 Item 的源音频、Fade 等设置都正确继承到每一段上。

---

## 用途

- 一长条录的"5 声脚步"切成 5 个独立 Item，方便单独调音量 / 移位置 / 复用
- 准备做随机化触发：拆完直接送 Macro Control / Qi 之类的工具批量随机

---

## 注意

- 没选 Item / 当前可见范围内一个段都没有时**不动**
- 多个 Item 一起跑时，每个 Item 独立切分
- 操作是一次 Undo——能整个还原
