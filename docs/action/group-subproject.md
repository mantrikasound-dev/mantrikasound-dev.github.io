# 【合集】Subproject（子工程）

这组 action 围绕 REAPER 子工程展开：把选中轨道的内容打包成独立子工程、在子工程里跳回父工程、把子工程渲染回父工程、设定决定渲染范围的 =START / =END marker，以及切进子工程时自动同步光标位置。

子工程靠一对 **=START / =END marker** 标识，它们同时决定渲染范围。下面所有判断"是不是子工程"都看有没有这对 marker。除特别说明外，每个 action 都是一次 Undo。

---

## 创建

把**选中轨道上的内容**打包成一个 Subproject（子工程）Item——选中轨道的 Item 被收进一个独立工程里，父工程里留下一个承载它的 Subproject Item。

| Action List 里的精确显示名 | 行为 |
|---|---|
| **Subproject - Create Subproject From Selected** | 把选中轨道内容打包成子工程，父工程留下承载它的 Subproject Item |

- 必须先**选中至少一条轨道**，否则提示并不做事
- 工程**必须先保存过**（要拿到工程目录），否则提示先保存
- 弹窗让你**输入子工程名字**（默认用第一条选中轨道的名字自动清理后填好）；点 Cancel 则取消
- 在工程目录下建一个 **`Subproject Archive` 文件夹**，把生成的子工程按你输入的名字单独存进一个子目录（重名会自动加 `_1`、`_2` 后缀，不会覆盖）
- 子工程的 **=START / =END marker 自动贴合实际内容范围**（不留多余空白）
- 父工程里那个 Subproject Item **几何对齐到内容**——长度精确、清掉 Fade、起始偏移归零；承载它的**轨道改名**为子工程名
- 如果选中轨道的内容是**分段的（中间有空隙）**，生成的 Subproject Item 会按空隙**自动切成多段**，跳过空白部分，每段落在原来内容所在的位置
- 子工程的视图会自动缩放对齐到内容、光标移到内容开头，方便你直接进去编辑

---

## 跳回父工程

在子工程里执行——**跳回包含它的父工程**，并自动选中、缩放定位到对应的那个 Subproject Item。

| Action List 里的精确显示名 | 行为 |
|---|---|
| **Subproject - Jump to Parent Project** | 跳回父工程，清空原有选择后只选中并缩放定位到对应 Subproject Item，把它所在 Track 滚到视图中间 |

- 只在**当前是子工程**时生效；否则不做事
- 父工程必须**已经打开**（在工程标签页里），否则找不到、不跳转
- 一个子工程被多个 Item 引用时，跳到**第一个找到的**

---

## 渲染

把打开的子工程逐个**保存并渲染**一遍，让父工程里的 Subproject Item 听到的是最新内容。共三个变体，区别在于**渲染范围**和**是否修复父工程里 Item 的几何**。

| Action List 里的精确显示名 | 渲染范围 | 是否修复 Item 几何 | 完成后停在 |
|---|---|---|---|
| **Subproject - Render all Subprojects (auto save)** | 所有打开的子工程 | **否**，只渲染，父工程 Item 长度 / 切分保持不动 | 执行前所在的工程 |
| **Subproject - Render all Subprojects and Fix Main Item (auto save)** | 所有打开的子工程 | **是**，修正父工程里每个 Subproject Item | 父工程 |
| **Subproject - Render and Sync Selected Main Items (auto save)** | 仅**选中的** Subproject Item 对应的子工程 | **是**，只修正这些选中 Item | 当前工程 |

共有行为：

- 自动找出目标子工程（带 =START / =END marker 的工程标签页），逐个**保存并渲染**；**会自动保存**每个子工程
- 即使你在 REAPER 里关了"自动渲染"，这里也会**强制渲染**

各变体差异：

- **Render all Subprojects（只渲染）**：渲染所有打开的子工程，渲完切回你执行前所在的工程；**只渲染，不修复 Item 几何**——父工程里 Subproject Item 的长度 / 切分保持不动。没有打开的子工程时静默返回。如果你改了子工程的内容长度、或增删了分段，想让父工程的 Item 跟着对齐，请用下面带 Fix / Sync 的版本。

- **Render all Subprojects and Fix Main Item（渲染并修复全部）**：渲染后切到父工程**修正所有 Subproject Item**——Item 数和子工程内容分段数**一致**时按各段对齐每个 Item 的长度和起始偏移；**不一致**时（你在子工程里增删了分段）以最靠前的那个 Item 为基准重建、按分段重新切分，**其余 Item 上的改动（音量、FX 等）会丢失**。修正时一律清掉 Fade、Snap 偏移，操作完停在父工程。分段数对不上时会丢掉非基准 Item 的处理，介意的话先确认子工程分段没乱。

- **Render and Sync Selected Main Items（只渲染并同步选中）**：从选中 Item 里自动挑出 Subproject Item（普通 Item 忽略），逐个对应的子工程保存并渲染，渲完**修正这些选中 Item 的几何**对齐子工程内容——分段数**一致**时按各段对齐长度和起始偏移；**不一致**时**弹窗提示**结构变化并询问是否继续，继续则以最靠前的 Item 为基准重建、重新切分（**其余 Item 上的改动会丢失**），点取消则跳过这个子工程。修正时一律清掉 Fade、Snap 偏移。没选中任何 Subproject Item 时提示并不做事。涉及的子工程**必须已经打开**（在工程标签页里），否则会列出未打开的子工程名并中止。

---

## 设 START & END marker

把子工程的 **=START / =END marker** 设到指定范围的两端，决定渲染范围。共两个变体，区别在于**范围从哪里取**。

| Action List 里的精确显示名 | 范围来源 |
|---|---|
| **Subproject - Set START and END markers to Time Selection** | 当前**时间选区**的起点和终点 |
| **Subproject - Set START and END markers to Items** | Item 的范围（选中优先，无选中取全部 Item） |

共有行为：

- =START 设到范围起点、=END 设到范围终点（**不留余量**）
- 已经有同名 marker 就**移动到新位置**，没有就新建
- 当前工程**没有 =START / =END marker** 时会弹窗提示"这可能是父工程"，确认后才继续

各变体差异：

- **Set markers to Time Selection（按时间选区）**：=START / =END 设到时间选区起点和终点；**没有时间选区**（或选区无效）时不做事。
- **Set markers to Items（按 Item 智能贴合）**：有选中 Item 时取所有**选中 Item** 的最左起点到最右终点；没选中任何 Item 时自动取工程里**全部 Item** 的范围；工程里**一个 Item 都没有**时不做事。

---

## 光标同步

开关型 Action。打开后，每当你**从父工程切换进一个子工程**，子工程里的播放光标会自动跳到**父工程光标对应的位置**，方便你接着同一处往下编辑。

| Action List 里的精确显示名 | 行为 |
|---|---|
| **Subproject - Toggle Auto-Sync Cursor from Parent** | 开关型；打开后切进子工程时把光标同步到父工程对应位置 |

- 这是个**开关**：执行一次打开，再执行一次关闭（菜单 / 工具栏上会显示当前是否点亮）；这是个常驻开关，不影响 Undo
- 打开期间，**切到子工程标签页**那一刻：拿父工程当前光标位置，换算成相对子工程 =START 的偏移，把子工程的播放光标设到对应位置
- 只在**切进子工程**时同步，是"**父 → 子**"单向；切回父工程不反向同步
- 父工程光标要落在那个 Subproject Item 范围附近（允许前后约 1 秒余量）才同步，离得太远不动
- 子工程必须带 =START marker 才有参照点
