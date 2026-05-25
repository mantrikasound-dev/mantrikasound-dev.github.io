# Assistants - Folder - Adaptive - Create Folder

自适应版的"建 Folder"。**优先看你选的 Item**，没选 Item 才退回看选中的轨道。

---

## 选了 Item 时

针对每条轨道判断**"是要整条搬过去，还是只抽几段"**：

- **这条轨道上的 Item 你全选了** → **整条轨道**移进新 Folder（最省事，原轨道直接搬走）
- **只选了部分 Item** → **复制一条新轨道**只装你选中的那些 Item，原轨道上对应 Item 删除
- 原轨道因此变空 + 它的父 Folder 也变空时，会**自动清理掉**这些空壳

涉及到 **Mirror Item**（Folder 上的镜像段落）时也能识别：选了 Mirror，对应时间范围内的 Item 会跟着一起进新 Folder；嵌套 Mirror 会做去重避免重复打包。

---

## 没选 Item，但选了轨道时

行为等同于 `Assistants - Folder - Create Folder From Selected Track`：把选中轨道（含子级）打包成新 Folder，含同样的聚拢、嵌套保留、`mantrika-main` 路由。

---

## 都没选

什么都不做。

---

## 附带的自动行为

- 触发**自动上色**（如果你开了自动上色规则）
- 刷新 **Mirror 同步**

操作本身是一次 Undo，按一次 Ctrl+Z 能整个还原。

---

## 什么时候用它

- 想**从几条轨道里各挑几段 Item** 单独打包，原轨道保留
- 手上的是 **Mirror Item** / 涉及 Folder 镜像

只想整条轨道一起进 Folder 时，用 `Assistants - Folder - Create Folder From Selected Track` 更直接。
