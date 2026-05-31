# 【合集】Playback - 从鼠标位置播放并隔离声音（按住/松开）

这一组 action 都是"对讲机"式的试听按键：**按住**快捷键，从**鼠标光标**所在的横向位置开始播放，并临时隔离声音（只听鼠标下的内容）；**松开**快捷键，播放停止、所有状态恢复原样。

共同行为：

- **按住**：编辑光标跳到鼠标横向位置开始播放，做相应的隔离，鼠标变成喇叭光标
- **松开**：停止播放，**取消刚才的隔离、还原播放状态**——之前在播放就继续播、之前暂停就回到暂停、之前停着就保持停着

---

## 各变体差异

| Action List 显示名 | 隔离对象 | 隔离方式 |
| --- | --- | --- |
| **Playback - Play from Mouse and Solo Track (adaptive/hold shortcut key)** | 鼠标下的**轨道** | 把鼠标下的轨道设为 Solo。**Fixed Lane 轨道**：只 Solo 鼠标停的那条 Lane（该 Lane 没有 Item 时退回为整条轨道 Solo） |
| **Playback - Play from Mouse and Solo Item - Compatible (adaptive/hold shortcut key)** | 鼠标下的 **Item** | 把目标 Item 所在轨道设为 Solo，并把**同轨道上其它 Item 临时 Mute** 来实现"只听这一个"，逻辑老实、兼容性最好 |
| **Playback - Play from Mouse and Solo Item - Recommendation (adaptive/hold shortcut key)** | 鼠标下的 **Item** | 把目标 Item 设为选中，调用 REAPER 原生 **Play (solo selected items)**，隔离全交给原生机制，更轻快 |

### 选中与否

- **目标已被选中** → 隔离/听**所有选中的轨道（或 Item）**
- **目标没被选中** → 只隔离/听它一个；Item 两个变体会临时把它设为唯一选中，松开后还原回你原来的选区

### Item 两个变体的额外退化规则

- **鼠标下没有 Item 但有轨道** → 自动退化成 Solo Track 行为（按是否选中决定 Solo 一条还是多条）
- 鼠标下是 Mirror（Workflow Folder 镜像）Item 时，不按 Item 处理，退化为按轨道处理
- **Compatible 变体**：鼠标下是 Fixed Lane 轨道时，Solo 目标 Item 所在的 Lane
- **Recommendation 变体**：如果目标 Item 或它的轨道当前是 Mute 的，会**临时解 Mute** 好让你听到，松开后还原

---

## Compatible vs Recommendation 怎么选

两者都是"听鼠标下的 Item"，区别只在隔离手段：

- **Recommendation（推荐）版**走 REAPER 原生的"只播放选中 Item"机制，更轻快
- **Compatible（兼容）版**靠手动 Mute 同轨其它 Item 来隔离，逻辑老实、各种工程都吃得消

**优先用推荐版，遇到行为不对再换兼容版。**

---

## 注意

- 鼠标必须在 **Arrange 区域**内（轨道控制区、混音台、标尺上不触发）
- 鼠标下没有轨道时不触发
- **正在录音时不触发**
- 松开后所有 Solo / Mute / 播放状态自动恢复，整个过程**不会在 Undo 历史里留下痕迹**（按 Ctrl+Z 看不到它）
