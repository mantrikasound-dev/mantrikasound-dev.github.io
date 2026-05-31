# 【合集】Markers - 从 Item 生成 Marker / Region

把**选中的 Item** 转成 Marker 或 Region。基本玩法是「一个 Item 生成一个」：Region 盖住 Item 的起止（开始 = Item 起点，结束 = Item 末尾），Marker 则只在 Item 起点打一个不带长度的点。每个变体在「Region 还是 Marker」「带不带名字」上有所不同。

---

## 各变体

| Action List 显示名 | 生成什么 | 命名 |
| --- | --- | --- |
| `Markers - Create Regions From Items (remove extensions)` | 每个 Item 一个 Region（盖住起止） | 取 Item 名 |
| `Markers - Create Regions From Items (no name)` | 每个 Item 一个 Region（盖住起止） | 留空 |
| `Markers - Create Markers From Items (remove extensions)` | 每个 Item 起点打一个 Marker | 取 Item 名 |
| `Markers - Create Markers From Items (no name)` | 每个 Item 起点打一个 Marker | 留空 |
| `Markers - Create Region From Items and Edit...` | 所有 Item 合成**一个**大 Region | 弹框手填 |

---

## 命名规则（带名字的两个变体）

名字按优先级取第一个非空的：

1. Item 的 **Notes**（只取第一行）
2. Active Take 的名字
3. 都没有就**留空**

名字若带常见音视频文件后缀会**自动去掉**，其它后缀原样保留。

---

## Edit 版的不同

`...and Edit...` 跟上面「一个 Item 一个」的逻辑不一样：

- 选了 Item：取**所有选中 Item 的最左起点到最右末尾**当作范围，多个 Item 只合成**一个**大 Region。
- 没选 Item 但有**时间选区**：用时间选区当范围。
- Item、时间选区都没有：弹提示，不做事。
- 建好后立刻**弹出 REAPER 自带的 Region 编辑框**，名字 / 颜色都在那里填。

---

## 注意

- 没选 Item 时弹提示，不做事（Edit 版另有时间选区兜底，见上）。
- 除 Edit 版外，多个 Item **各建各的，不合并**。
- 操作是一次 Undo。
