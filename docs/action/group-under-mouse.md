# 【合集】Under Mouse（鼠标位置操作）

这一组 action 都以**鼠标光标当前所在的位置**为作用点：把鼠标停在某个对象上触发，就对鼠标下的那个东西生效，不用先去点选。

凡是涉及"批量"的变体，规则一致：

- **鼠标下的东西没被选中** → 只对这一个生效
- **鼠标下的东西已被选中** → 对**所有选中的**一起生效

---

## 一、鼠标位置编辑 Item

以**鼠标光标的横向位置**为作用点，对鼠标下的 Item 做 Trim、Split、Fade。切口/作用点只看鼠标的横向位置，跟纵向（鼠标具体停在哪条轨道）无关。

| Action List 显示名 | 作用 |
| --- | --- |
| **Under Mouse - Item - Trim Items Left** | 以鼠标横向位置为切点，把鼠标位置**左边**的部分切掉、删除，只留右边 |
| **Under Mouse - Item - Trim Items Right** | 以鼠标横向位置为切点，把鼠标位置**右边**的部分切掉、删除，只留左边 |
| **Under Mouse - Item - Split Items** | 在鼠标横向位置把 Item 切成两段，两段都**保持选中**（方便接着拖动或继续处理），不删掉任何一段 |
| **Under Mouse - Item - Fade In** | 加一段 **Fade In**，从 Item 起点淡到鼠标横向位置。淡入长度 = 鼠标位置 − Item 起点；鼠标超出 Item 末端时，淡入封顶到整段 Item 长度 |
| **Under Mouse - Item - Fade Out** | 加一段 **Fade Out**，从鼠标横向位置淡到 Item 末端。淡出长度 = Item 末端 − 鼠标位置；鼠标在 Item 起点之前时，淡出封顶到整段 Item 长度 |

### Fade 的额外规则

仅 **Fade In** / **Fade Out** 两个变体：

- **Fade In**：鼠标在 Item 起点之前（淡入长度为 0 或负）时，这个 Item 跳过、不处理
- **Fade Out**：鼠标在 Item 末端之后（淡出长度为 0 或负）时，这个 Item 跳过、不处理
- **会互相挤压**：新淡入/淡出和已有的另一侧 Fade 加起来超过整段长度时，会自动把另一侧 Fade 缩短让位；缩到极短时直接清零

### 注意

- 鼠标下没有 Item 时**不做事**
- 每次操作是一次 Undo，按一次 Ctrl+Z 可整个还原

---

## 二、Universal Toggle（万能开关）

**Action List 显示名：Under Mouse - Adaptive - Universal Toggle**

一个**万能开关**：根据**鼠标光标**停在什么东西上，自动切换对应的状态。一个快捷键管很多个"开/关"按钮，不用记一堆。

### 鼠标停在哪，就切什么

按从上到下的优先级判断鼠标下是什么：

- **Item 上** → 切换该 Item 的 **Mute**
- **浮动的 FX 窗口** → 切换那个 FX 的 **Bypass**
- **TCP 上的 FX 参数 / Send 控件** → 模拟 Shift+点击（等同你按住 Shift 点它）
- **TCP 的 FX 按钮 / FX Bypass 按钮** → 切换轨道整体 **FX Bypass**
- **TCP 的录音待命（RecArm）按钮** → 切换 **录音待命**
- **TCP 的相位（Phase）按钮** → 切换 **相位反转**
- **Envelope 控制面板的 Arm / Bypass 按钮**，或包络面板其它区域 → 切换该 **Envelope 的 Arm / 激活状态**
- **Arrange 里的 Envelope 线上**：鼠标正好压在某个 Automation Item 上 → 切换那个 **Automation Item 的 Mute**；否则切换该 **Envelope 的激活状态**
- **Arrange 里普通轨道的空白处** → 切换该 **Track 的 Mute**
- **Arrange 里 Fixed Lane 轨道** → 切换鼠标所在那条 **Lane 的 Solo**（Solo ↔ 全部播放）

### 选中时批量、没选中时单个

对 Item Mute、Track Mute、FX Bypass、RecArm、Phase 这几类：

- **鼠标下的东西已被选中** → 对**所有选中的** Item / Track 一起切
- **鼠标下的东西没被选中** → 只切它自己

切到 Mirror（Workflow Folder 的镜像）Item 时，会连带把它范围内的子 Item 一起切。

### 注意

- 鼠标下什么都没有时**不做事**
- 操作是一次 Undo

---

## 三、Duplicate（万能复制）

**Action List 显示名：Under Mouse - Adaptive - Duplicate Selected Thing**

一个**万能复制**：根据**鼠标光标**停在什么区域上，自动复制对应的东西。

### 鼠标停在哪，就复制什么

- **轨道控制区（TCP）/ 混音台（MCP）/ 包络控制面板（envcp）上** → 复制选中的**轨道**
- **Arrange 里的 Envelope 线上**：
  - 有选中的 **Automation Item** → 复制选中的 Automation Item
  - 否则有选中的**包络点** → 把选中的点整体复制一份，接在原来这串点的右边（按这串点的跨度往后偏移），复制出来的点处于选中状态
- **Arrange 普通区域** → 复制选中的 **Item**（前提是当前有选中 Item）

### 注意

- 包络点只选中**一个**时不复制（复制会叠在原位，没意义），静默跳过
- Arrange 里没有选中 Item 时不复制
- 复制轨道 / Automation Item / Item 走 REAPER 原生复制，复制包络点是一次 Undo
