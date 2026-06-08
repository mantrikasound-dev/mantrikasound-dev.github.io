# Wwise Replace

> 适用版本：Mantrika Tools（当前主线） · 仅支持 Windows

---

## 1. 概述

**Wwise Replace** 是嵌在 REAPER 里、和 Wwise 联动的素材交付工具。一个窗口里完成：

- **把你刚渲染好的一批 WAV** 一键替换到 Wwise 工程的 **Originals** 目录
- **顺手让 Wwise 重新打 SoundBank**——不用切到 Wwise 手动点 Generate

**典型使用场景**：

- 在 REAPER 做完一批 SFX，立刻替换到 Wwise 工程并重打 Bank 试听
- Render Queue 跑完之后自动同步到 Wwise，免手工拖文件

---

## 2. 打开方式

在 REAPER Actions 列表搜索 `Wwise - Replace`（或 Toolbar 上的图标）打开。再执行一次就关闭窗口。

打开窗口后会自动加载上次的所有设置——选过的 wproj、选过的 Work Unit、源文件列表都在。

---

## 3. 界面总览

```
┌──────────────────────────────────────────────────────────────┐
│  Project: MyGame                  ● Wwise: On      ☰         │  ← 顶部
├──────────────────────────────────────────────────────────────┤
│  Target Settings                                       ↻     │
│  Work Unit:  [Search...]  [sfx_combat_swain        ▾]        │
│  Add Bank:   [Search...]  [Select...                ▾]       │  ← 目标设置
├──────────────────────────────────────────────────────────────┤
│  ▼ Source Files  (12 files, 10 found)            +    ↻      │  ← 源文件
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ▶  Swain_Q.wav                          OK         X   │  │
│  │ ▶  Swain_W.wav                          OK         X   │  │
│  │ ▶  Swain_E_new.wav                   Not found     X   │  │
│  └────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│  ▼ SoundBanks  (3 banks, 3 selected)                         │  ← Bank 列表
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ☑ Swain_SFX_Audio (auto)                              │  │
│  │ ☑ Swain_SFX_Events (auto)                             │  │
│  │ ☑ Master_UI                                            │  │
│  └────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│         [ Replace Only ]      [ Replace & Generate ]         │  ← 操作按钮
│  Generated 3 bank(s) in 12s                                  │
│  ████████████████████████████████████████████████████████    │  ← 状态/进度
└──────────────────────────────────────────────────────────────┘
```

五个主要区域：

| 区域 | 内容 |
|---|---|
| **顶部** | 当前 Wwise 工程名 · Wwise 连接状态 · ☰（设置菜单） |
| **Target Settings** | 选 Work Unit + 手动加 Bank，决定 Generate 时打哪些 Bank |
| **Source Files** | 你要送进 Wwise 的 WAV 列表，每行显示是否在 Originals 找到 |
| **SoundBanks** | 准备生成的 Bank 清单，按 Work Unit 自动找 + 可手动加 |
| **操作 + 状态** | Replace Only / Replace & Generate + 状态行 + 进度条 |

---

## 4. 顶部：工程 & 连接状态

### 4.1 选 Wwise 工程

点 **☰** 弹设置窗口，里面有：

| 选项 | 用途 |
|---|---|
| **Wwise Project** | 当前关联的 wproj 路径 |
| **Detect** | 让工具去问正在运行的 Wwise："你现在开着哪个工程？"——一键拿到路径 |
| **Browse...** | 自己选 wproj 文件 |
| ☑ **P4 Reconcile WAV** | 替换 WAV 后自动跑 `p4 reconcile`，通知 Perforce 文件已变更（非 P4 用户不用管） |
| ☑ **Bring Wwise to Front After Replace** | Replace 完后把 Wwise 窗口拉到最前面（懒得 Alt+Tab） |
| ☑ **Hide Window After Replace** | Replace 成功后自动隐藏本窗口——多数人的工作流就是 Replace + 切到 Wwise，留着窗口反而挡视线 |

> 💡 **wproj 是机器级配置**——选一次，REAPER 工程切换不会丢；换电脑或换工程才需重选。

### 4.2 Wwise 连接状态

右上角圆点 + 文字：

| 显示 | 含义 |
|---|---|
| 🟢 **Wwise: On** | 已连上正在运行的 Wwise，所有功能可用 |
| 🔴 **Wwise: Off** | Wwise 没开（或开了但没启用 WAAPI）。**Replace & Generate 不可用** |
| ⚪ **Checking...** | 正在探测 Wwise 状态 |

**点一下这行文字**就能立即重新探测——你开/关了 Wwise，点一下立刻更新状态。

> 💡 让 Wwise 启用连接：Wwise → User Preferences → 勾上 **Enable Wwise Authoring API**。

---

## 5. Target Settings：Work Unit 和 SoundBanks

### 5.1 选 Work Unit

**Work Unit** 是 Wwise 工程里的 Actor-Mixer 子单元（每个 `.wwu` 文件一个）。选中它之后，工具做两件事：

1. 只在这个 wwu 声明的音频源里查找你的 WAV（Source Files 列表的 OK/Not found 由此决定）
2. 根据 wwu 名字自动找关联的 SoundBank 填进 SoundBanks 列表

**搜索框** 支持模糊搜，找到目标就点下拉框选。

> 💡 **自动匹配 Bank 的规则**有两条：
> 1. **Bank 名和 wwu 名完全相同**（最常见的命名约定）
> 2. **`sfx_` 前缀特例**：wwu 名是 `sfx_ABCD_aaa53` 时，自动把 Bank 名里独立出现 `ABCD_aaa53` 的全部勾上（如 `ABCD_aaa53_sfx_audio` / `ABCD_aaa53_sfx_events`）
>
> 命名不符合这两条规则的，自己用 **Add Bank** 手动加（搜索框在 Work Unit 那行下面）。

### 5.2 重扫整个工程（↻）

**Target Settings** 标题右边的 ↻ 按钮——**重新扫描整个 Wwise 工程结构**（所有 wwu + 所有 Bank）。

什么时候用：**Wwise 里加/删了 wwu，或者改了 Bank 名**，工具列表跟不上时点一下。

> ⚠️ 大工程（2000+ Bank）这一步可能十几秒，过程中窗口会显示 Loading。不要频繁点。

### 5.3 SoundBanks 列表

| 操作 | 行为 |
|---|---|
| 勾/取消勾选 | 决定这次 Generate 打不打这个 Bank |
| **(auto)** 标记 | 表示这条是按 Work Unit 自动加进来的，不能从列表里删——除非换 wwu |
| **Add Bank** 搜索框 | 手动加任意 Bank（标记为非 auto） |
| 右键 → **Remove** | 删手动加的那条（auto 的删不掉） |
| 右键 → **Clear All Manual** | 一次性清掉所有手动加的 |

---

## 6. Source Files：要替换的 WAV

### 6.1 加文件的四种方式

| 方式 | 行为 |
|---|---|
| **拖拽**（最快） | 直接把 WAV 文件或整个文件夹拖到列表里——文件夹**递归**收所有子目录的 .wav |
| **右键 → Browse Files** | 选一个或多个 WAV，**追加**到当前列表（同名文件覆盖路径） |
| **右键 → Browse Folder** | 选一个文件夹，把**顶层**的 .wav **覆盖**整个列表（不递归——要递归请用拖拽或 Watch Folder） |
| **Watch Folder** | 设个监控目录，递归扫描，每次点 ↻ 重建列表（详见 6.3） |

### 6.2 列表上的信息

每行显示：

```
▶  文件名                              OK / Not found     X
```

| 元素 | 含义 |
|---|---|
| **▶ / ❚❚ 按钮** | 试听这个 WAV（再点暂停） |
| **文件名** | 源文件的名字 |
| **状态** | **OK**（绿）= 在当前 Work Unit 关联的 Originals 里找到了同名文件，可以替换；**Not found**（黄）= 找不到对应文件，**这条不会被替换** |
| **X 按钮** | 从列表移除（不影响磁盘上的文件） |
| **行排序** | OK 在前，Not found 在后，方便一眼看出"哪些会真生效" |

> 💡 **Not found 怎么办**：先确认是不是 wwu 没选对——切换到正确的 Work Unit 后状态会自动刷新；如果 Wwise 里压根没这条音频，先在 Wwise 把它建出来（Import），再回来 Replace。

### 6.3 Watch Folder（监控渲染输出目录）

每次都拖一遍文件太烦？设一个**渲染输出目录**让工具自动盯：

**Source Files** 标题右边的 **+** 按钮 → 弹菜单 → **Set Watch Folder...** 选目录。

> 💡 **首次设完不会自动扫**，要手动点 ↻；之后每次重新打开窗口会自动扫一次。

之后流程：

```
1. 在 REAPER 里渲染一批 WAV 到这个目录
2. 回到 Wwise Replace 窗口，点 ↻ 刷新
3. 列表自动用这个目录里所有 .wav 覆盖
4. 点 Replace & Generate
```

**Watch Folder 的规则**：

- **递归扫描**子文件夹里的 .wav 也算
- **同名取最新**：不同子目录里有同名文件时，留 mtime 最新的那个（避免你拿到旧渲染版本）
- **完全覆盖**：每次 ↻ 都把列表清空重建——别担心累积脏数据
- 跟 **Render Queue 模块** 联动：Render Queue 跑完渲染会自动把 Watch Folder 设到对应目录并刷新一次

**+ 按钮菜单**还能：

| 菜单项 | 行为 |
|---|---|
| **Current: ...** | 显示当前设的目录（截断显示） |
| **Change Watch Folder...** | 换一个目录 |
| **Clear Watch Folder** | 取消监控（列表保留不清） |

### 6.4 右键菜单完整清单

| 菜单 | 行为 |
|---|---|
| **Undo** | 撤销上一次列表变更（最多 10 步） |
| **Browse Files** | 追加文件 |
| **Browse Folder** | 覆盖整个列表 |
| **Show File Folder** | 在资源管理器里打开当前行所在目录 |
| **Remove** | 删当前行 |
| **Clear All** | 清空所有 |

**Ctrl+Z** 也能 Undo（窗口需要先获得焦点）。

---

## 7. 操作按钮

| 按钮 | 行为 |
|---|---|
| **Replace Only** | 只复制 WAV 到 Originals 目录，**不**让 Wwise 生成 Bank。适合你想自己进 Wwise 检查或继续调 |
| **Replace & Generate** | 复制 WAV → 让 Wwise 立即重新打选中的所有 Bank。一气呵成 |

### 7.1 执行细节

- **Replace Only 不需要 Wwise 在运行**——纯粹的文件复制
- **Replace & Generate 必须 Wwise 在运行**（右上角是 🟢）
- **安全替换**：写入时先在旁边写一份临时文件，整个写完才替换掉原文件——中途断电 / 程序崩溃 / 文件被占用都不会让你 Wwise 工程里原来的 wav 丢失
- 只有状态是 **OK** 的行会被真的替换；**Not found** 的行直接跳过
- Replace & Generate 会**强制更新被替换 wav 的修改时间**，确保 Wwise 把它们识别成"有变更"并重新转换缓存——避免你看到的 BNK 和实际不一致
- 开了 **Hide Window After Replace** 时，**Replace Only** 成功后窗口会自动隐藏（绿色成功提示先闪一下再消失）；若同时开了 **Bring Wwise to Front**，会先把 Wwise 切到前台、再隐藏本窗口，焦点不会被抢回 REAPER

### 7.2 状态行颜色

复制 / 生成完成后，状态行会显示结果：

| 颜色 | 含义 |
|---|---|
| 灰 | 空闲 / 提示 / 进行中 |
| 绿 | 成功 |
| 黄 | 没有改动（Wwise 判定 wav 内容没变 / Bank 无需重打） |
| 红 | 失败（看消息内容定位原因） |

进度条只在生成期间显示，表示"忙着"，不是真实百分比。

---

## 8. 折叠和窗口大小

**Source Files** 和 **SoundBanks** 的标题栏都可以点击折叠（▼/▶ 切换）。

- 单边折叠：另一边自动撑满空间
- 两边都折叠：窗口自动缩到只剩按钮的小窄条，方便挂在屏幕角落
- 任一边展开：窗口恢复默认大小

---

## 9. 配置持久化（自动保存）

工具的配置分成两类：

### 9.1 跟着 REAPER 工程走（rpp 内）

每次操作后**自动写入**当前 REAPER 工程：

- 选中的 Work Unit
- Source Files 列表
- SoundBanks 列表（含勾选状态、手动加的条目）
- Watch Folder 路径

REAPER 会把工程标记为"已修改"，**你 Ctrl+S 保存 rpp 时**这些数据才会真正落盘。

**好处**：rpp 备份 / 另存到其他电脑，这些配置一起带走。

> ⚠️ rpp 没保存过（New Project 状态）时这部分配置只在 REAPER 内存里——关 REAPER 不保存就丢。状态栏会提示。

### 9.2 全局配置（机器级）

- wproj 路径
- P4 Reconcile WAV 开关
- Bring Wwise to Front 开关
- Hide Window After Replace 开关

这些不跟 rpp 走，存在 MantrikaTools 的全局配置里。

---

## 10. 典型工作流

### 工作流 A：渲染完一批 SFX，立即替换并打 Bank

```
1. 在 REAPER 渲染一批 WAV 到某个文件夹
2. 拖整个文件夹到 Source Files 列表
3. 检查 OK / Not found —— 全 OK 最好
4. SoundBanks 默认已经自动选好了相关 Bank
5. 点 Replace & Generate
6. 等状态栏出现 "Generated N bank(s)" → 在 Wwise 试听
```

### 工作流 B：Watch Folder 一键流

```
1. Source Files 标题旁点 + → 设 Watch Folder 为你的渲染目录
2. 之后每次渲染完，点 ↻
   → 列表自动用最新一批 .wav 覆盖
3. 点 Replace & Generate
4. 长期使用：什么都不用调，每次只点两下
```

### 工作流 C：Render Queue 全自动

```
1. 用 Render Queue 模块跑一批渲染
2. Render Queue 跑完会自动把 Wwise Replace 的 Watch Folder 设到对应目录并刷新
3. 你只需要回到 Wwise Replace 点 Replace & Generate
```

---

## 11. 注意事项

### 11.1 Replace 是真的覆盖磁盘文件

写入 Originals 是**直接覆盖**的物理操作。**用 P4/SVN/Git 管 wproj 的团队**：建议开 **P4 Reconcile WAV**，工具会自动通知版本控制；不开的话被覆盖的 wav 你得自己去 reconcile。

### 11.2 切换 REAPER 工程不会乱

工具在后台监听 REAPER 工程切换：

- 切到另一个 rpp（包括 Tab 切换）→ 自动读那个 rpp 里存的配置
- **Generate 期间你切走**：Wwise 那边的生成会继续完成（你切回原工程或直接到 Wwise 里能看到结果），但工具不再把生成状态写到当前新工程的状态行——避免污染

### 11.3 多个 Wwise 实例同时开着

**Replace Only + Bring to Front** 功能会按"工程名匹配"找窗口——只激活与你配的 wproj 名字对得上的那个 Wwise，不会激活错。

### 11.4 试听后文件被锁

试听一个 WAV 后，Windows 会给文件加共享读锁。如果你想立刻在外部覆盖这个文件、却失败提示"被占用"：

- 再点一下 ▶ 按钮停止试听
- 或者直接关闭 Wwise Replace 窗口（窗口隐藏会自动释放锁）

### 11.5 Wwise 切换工程或重启后

工具会检测到 Wwise 断开，状态自动变 🔴 Wwise: Off。重新启动 Wwise 并点一下右上角的 ● 文字即可重新探测。

---

## 12. 故障排查

| 现象 | 可能原因 | 解决 |
|---|---|---|
| Wwise: Off 一直不变 | Wwise 没启用 WAAPI | Wwise → User Preferences → 勾 Enable Wwise Authoring API，重启 Wwise |
| Detect 提示 "Wwise not running" | Wwise 还没开 / WAAPI 没启用 | 先开 Wwise，确认 WAAPI 选项打开 |
| Source 列表全是 Not found | 选错了 Work Unit / 文件名跟 Wwise 里的不一致 | 切到正确的 Work Unit；或先在 Wwise 里 Import 这些 wav 建出 Sound 对象再回来 |
| SoundBanks 列表空 | 自动匹配规则没命中 | 用 "Add Bank" 手动加 |
| Replace 报 "Failed to copy" | 源文件被其它程序占用 / 目标只读 | 关闭占用程序；目标 wav 不要设只读 |
| Replace & Generate 卡很久 | 选了几十上百个 Bank，正常现象 | 等。10 分钟内会超时报错 |
| 状态显示 "No changes detected" | 你送的 wav 和 Originals 里的一模一样 | 正常——确认你的渲染真的更新过了 |
| 切了 wproj 后 Bank 列表还是旧的 | 旧的索引没刷新 | 点 Target Settings 旁的 ↻ 重扫 |
| Render Queue 渲染完没自动同步 | Watch Folder 未启用 | Wwise Replace 里先 Set Watch Folder 一次（之后 Render Queue 会自动接管） |
| Ctrl+Z 没反应 | 焦点在 REAPER 主窗口上 | 先点一下 Wwise Replace 窗口让它获得焦点 |
| 折叠后窗口尺寸变小拉不开 | 设计如此 | 展开任一区域窗口会自动恢复默认大小 |
