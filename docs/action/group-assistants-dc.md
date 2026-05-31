# 【合集】Assistants - DC - 双击行为增强

一组**双击（DC）行为增强** Action，用来替代 REAPER 的默认双击。建议**绑到鼠标双击的修饰键**（双击 TCP、Item 或 Automation Item 时触发）。它们各做各的事，下面分别说明。

各 Action 在 REAPER Action List 里的精确显示名见每节小标题。

---

## `Assistants - DC - Toggle Folder Collapse / Select Items`

看**当前选中的轨道**是哪种，做两件不同的事：

- 选中的是 **Folder 开头轨** → **切换它的折叠/展开**。
- 选中的是**普通轨道** → **选中这条轨道上的全部 Item**。

最适合**绑到 TCP 的双击**：双击 Folder 头就开合文件夹，双击普通轨就一键选光它的所有 Item。

注意：没选中任何轨道时不做事；Folder 折叠状态变化会同步刷新对应的 Mirror 编组；操作是一次 Undo。

---

## `Assistants - DC - Select All Automation Items`

把**当前选中的那条 Envelope（包络）上的全部 Automation Item** 一次性选中。它上面有几个就全选几个。这条 Envelope 上没有 Automation Item，或没选中任何 Envelope 时不做事。

适合**绑到 Automation Item 的双击**：双击其中一个就把同一条 Envelope 上的全部选上，方便整体移动 / 复制 / 删除。操作是一次 Undo。

---

## `Assistants - DC - Enhanced Meida Item`

增强的「双击 Item」行为：先看你点的是不是 **Mirror（镜像 Item）**，再决定怎么处理（优先用唯一选中的那个，否则取鼠标位置下的那个）：

- 是 **Mirror** → **折叠 / 展开它所在的 Folder**（点 Mirror 概览条就能开合文件夹）。
- 不是 Mirror → 按 Item 类型走 REAPER 默认双击行为：
  - **子工程（Subproject）** → 打开子工程
  - **Click / 时间码源** → 打开源属性
  - **MIDI** → 打开 MIDI 编辑器
  - **普通有素材的 Item** → 进入源编辑 / 编辑器
  - **空 Item** → 打开 Item 属性

**绑到 Item 的双击**：平时各类 Item 行为和原来一致，唯独双击 Folder 上的 Mirror 概览条时变成开合文件夹。操作是一次 Undo。（Mirror 是什么见 Mirror 用户手册。）

---

## `Assistants - DC - Enhanced TCP Select`

增强的「双击 TCP」行为，按点中的轨道类型智能批量选中：

- 是 **Folder 轨**（顶层或子 Folder 都算）→ 先清空选择，再**选中这个 Folder 及它下面的全部子轨**。
- 是 **Folder 里的子轨** → 先清空，再**选中它所属的整个 Folder（含全部同级子轨）**。
- 是**普通独立轨** → **选中工程里所有轨道**。

**绑到 TCP 的双击**：双击 Folder 头或它的任意子轨就一键圈选整个文件夹；双击孤立轨则全选所有轨。方便整组移动 / 上色。操作是一次 Undo。

---

## `Assistants - DC - Jump to and Focus View on Items of Selected Track`

把视图**跳到并对焦**当前选中轨道的内容，以**第一条选中的轨道**为准：

1. **纵向**：滚动 TCP 让这条轨居中。
2. **横向**：
   - 轨道**自己有 Item** → 缩放到框住这条轨上所有 Item 的范围。
   - 轨道**自己没 Item 但是 Folder 头** → 缩放到框住它**所有子轨内容的时间并集**。
3. 把编辑光标放到内容起点**前一点点**（留一丢丢预滚）。

适合**绑到轨道名 / TCP 的双击**：选中某条轨（或 Folder 头）双击一下，视图立刻跳过去、缩放到刚好看清全部内容。

注意：没选中轨道时不做事；选中的是没 Item 的普通轨（也不是 Folder）也不做事；这是纯视图操作，**不改动任何 Item / 轨道，不进 Undo**。
