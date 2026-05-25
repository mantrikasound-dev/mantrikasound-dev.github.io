# Assistants - Folder - Create Folder From Selected Track

把当前**选中的所有轨道**打包进一个新建的 Folder。

---

## 行为细节

- 选中的轨道**不连续**也没关系——会被自动聚拢到一起再打包
- 选了 **Folder 开头轨**会自动连同它的所有子轨道一起进
- 如果你选的轨道**原本就在某个父 Folder 里**，新 Folder 会嵌进同一个父级，不会被弹到顶层
- 工程顶层有名为 **`mantrika-main`** 的轨道时，新顶层 Folder 会自动给它建一条 Send 并关掉 Master Send（团队约定的预母带路由，没这条轨就不会做这步）

---

## 附带的自动行为

- 触发**自动上色**（如果你开了自动上色规则）
- 刷新 **Mirror 同步**（让 Folder 上的 Mirror Item 立即跟上变化）

操作本身是一次 Undo，按一次 Ctrl+Z 能整个还原。

---

## 什么时候用它，什么时候用别的

只会按"整条轨道"维度打包。如果你想**从几条轨道里各挑几段 Item 单独打包**（保留原轨道不动），用 `Assistants - Folder - Adaptive - Create Folder`。
