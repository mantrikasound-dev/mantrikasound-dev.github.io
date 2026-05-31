# 【合集】Take 操作

针对多 take Item 的一组操作：把多个 Item 合并成一个多 take Item、在 Take 之间循环切换、裁掉或删除 Take、把 Take 拆成独立 Item，以及重置 Take 音量。

以下所有 action 都会**自动跳过 Mirror Item**（保持原样、不被误改），并且都是**一次 Undo**——按一次 Ctrl+Z 即可整个还原。

---

## Take - Implode Selected Items as Takes (multi-take item)

把**多个选中的 Item 合并进一个多 take Item**——每个原 Item 变成一个 Take，叠在同一个位置。

- 至少选 **2 个 Item** 才有意义，少于 2 个不做事
- 合并后所有 Item 变成**一个 Item**，停在**最上方轨道、最早时间**那个 Item 的位置
- Take 的先后顺序按**轨道从上到下、同轨再按时间从左到右**排列
- 每个 Take 都**保留各自原来的内容起点**，合并后切到哪个 Take，看到的还是它原本的那段
- 合并后 Item 的长度 = **所有 Take 里最长的那个**

---

## Take - Cycle Active Take (1->2->3->1) / Take - Cycle Active Take Reverse (1->3->2->1)

把选中**多 take Item** 的当前 Take 步进一个，到末尾后循环。提供正向、反向两个方向。

| Action List 显示名 | 切换方向 |
| --- | --- |
| **Take - Cycle Active Take (1->2->3->1)** | 往**后**切一个（1→2→3→1），切到最后一个后再按循环回第一个。 |
| **Take - Cycle Active Take Reverse (1->3->2->1)** | 往**前**切一个（1→3→2→1），在第一个 Take 上再按循环到最后一个。方向与正向相反。 |

- 对每个选中 Item **各自独立**步进，互不影响
- 只有 **1 个 Take** 的 Item 不做事
- 会**自动跳过空 Take 槽**，落在对应方向上下一个真正有内容的 Take 上
- 到达该方向尽头后再按，循环到另一端

---

## Take - Crop to Active Take (delete other takes)

把选中 Item 里**当前 Take 以外的其他 Take 全部删掉**，只留下当前这个，变回单 take Item。

- 以**当前 Take** 为准，其余 Take 一律剔除
- 剔除后会把 Item 尾巴**收齐到当前 Take 的实际可播放长度**——如果原来 Item 比这个 Take 内容长，多出来的空尾巴会被裁掉（只缩不拉长）

---

## Take - Delete Active Take (other take becomes active)

删掉选中 Item 的**当前 Take**，原来排在后面的 Take 顶上来成为新的当前 Take。

- 删掉当前 Take 后，剩下的 Take 自动接管当前位置
- 如果 Item 只剩**一个 Take**，删掉这个 Take 等于**整个 Item 被删除**

---

## Take - Explode Takes into Separate Items

把**多 take Item** 拆成**多个单 take Item，全部留在同一条轨道上**，一个挨一个排开。

对每个选中的多 take Item：

- 每个 Take 拆成**一个独立 Item**，留在**原来的轨道**上
- **当前 Take** 占住原 Item 的位置；其余 Take 依次往后排
- Item 之间留 **1 秒固定间隔**
- 每个新 Item 长度按各自 Take 的**实际可播放长度**摆正，内容起点归零
- 拆出来的 Item 会**清掉 Fade**（淡入淡出）
- 拆完后**新 Item 全部处于选中状态**
- 只处理**多 take Item**；单 take Item 会被跳过

---

## Take - Reset Active Take Volume (0 dB / polarity preserved)

把选中 Item 当前 Take 的音量重置回 **0 dB**（增益归 1.0）。

- **保留反相极性**——原本反相的 Take 重置后仍保持反相
