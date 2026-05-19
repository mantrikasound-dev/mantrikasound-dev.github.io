# Preferences 用户手册

> 适用版本：Mantrika Tools

---

## 1. 概述

**Preferences**（偏好设置）是 Mantrika Tools 的总控面板，用来开关和调节那些"装上后自动在后台跑"的辅助行为，例如：

- 鼠标 / 选区联动
- Item Auto Transient 检测
- Mirror Segments
- Adaptive Regions
- 通过 FX Search 功能或者 Radial Menu 插入FX后弹窗策略
- Monitor Dim Action衰减量
- 文件夹轨道的自动配色

所有开关都是**实时生效**——勾选 / 拖动后立即应用，无需 OK 或 Apply 按钮，关闭窗口即可。

界面分为两大类（左侧导航）：

| 面板             | 内容                                |
| -------------- | --------------------------------- |
| **Assistants** | 全部行为类辅助功能（占绝大多数）。                 |
| **Appearance** | 视觉相关：目前主要是 Auto Track Colors。     |

---

## 2. 打开方式

在 REAPER顶部菜单： Extension -> Mantrika Tools -> Mantrika Options -> Preference。

窗口尺寸约 650×700，左侧是导航按钮，右侧是可滚动的设置区——内容较长，请用滚轮浏览。

---

## 3. Assistants 面板

### 3.1 Selection Enhance（选区增强）

| 选项                              | 作用                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| **Sync Track Selection to Items** | 选中 item 时，自动把它所在的 track 也选中。适合"我点哪个 item 就操作哪条轨"的工作流。 |
| **Adaptive FX Insert Focus**      | 开启以后，在Arrange View 中点击Track，并没有选中item时，直接执行insert FX 快捷键时，会自动把FX 挂在Track本身上：<br />有 item 选中时仍会insert 到 item上。简单说就是"该插哪就插哪"。 |

---

### 3.2 Auto Transient Detection（自动 Transient 检测）

| 选项                                | 作用                                             |
| ----------------------------------- | ------------------------------------------------ |
| **Enable Auto Transient Detection** | 选中音频 item 时，自动在波形上检测并标出瞬态点。 |

> 仅作用于选中的音频 item，背景常驻；不影响未选中的素材。

---

### 3.3 Mirror Segments（镜像段）

Mirror Segments 是 MTK 的核心工作流之一：在折叠的 folder track 上自动镜像生成与子轨内容对应的"段 item"，方便整段拖拽 / 命名 / 切分。

| 选项                                       | 作用                                                                                       |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Enable Mirror Segment**                | Mirror 总开关。关闭后下面所有子选项一并失效（灰显）。                                                          |
| **Auto Create Regions**                  | 给顶层 folder 的镜像段同步创建时间线 Region。**需要 REAPER v7.62+**。                                     |
| **Auto Sync Segment Names**              | 顺序段会自动编号 / 加字母（如 `_01 _02` / `_A _B`），不用每个手动改。                                          |
| **Auto Track Name from Mirrors**         | 用镜像段的 basename 反推 folder track 名字——给一段镜像改完名，folder 名也跟着变。                               |
| **Auto Mirror Large Text Display**       | 自动给镜像段开启 REAPER 的 stretched text 显示。**性能较重**（折叠组多时可能掉帧），更推荐用对应的 Action 临时切换，而不是在这里常开。   |
| **Include Automation Items** (实验性)       | 把 Automation Items 也纳入镜像段。**当前体验不稳定**，仅供尝鲜。                                             |

**联动关系**：

- Mirror 总开关关闭 → 所有子选项灰显。
- `Auto Sync Segment Names` 关闭 → `Auto Mirror Large Text Display` 一并自动关闭并灰显（因为后者依赖前者）。

---

### 3.4 Adaptive Regions（自适应区域）

| 选项                                        | 作用                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| **Enable Adaptive Regions** (REAPER v7.62+) | folder 内子轨内容变化时，对应的 Region 边界自动跟随调整。    |
| **Lock Left Boundary**                      | 只让右边界跟随内容变化，左边界保持不动。适合"以某个时间点为锚、向后扩展"的游戏音效思路。 |

> ⚠️ **Adaptive Regions 与 Mirror Segments 互斥**——同时只能开一个。在 Preferences 里打开其中一个，另一个会自动关闭。

---

### 3.5 Actions & Modifiers（动作与鼠标修饰键）

#### Item Grouping (Action 1156)

| 按钮                            | 作用                                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| **Enable Item Grouping** / **Item Grouping: Auto-Enabled** | 把 REAPER 自带的 Action 1156（Toggle item grouping override）固定为"每个工程一打开就开启"状态。**Mirror 模式 + 折叠组拖动**强依赖它，建议长期开启。 |

按钮颜色变绿 + 文案变成 "Auto-Enabled" 即代表已激活。

#### Mouse Modifier Presets

| 按钮                          | 作用                                                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| **Apply Mouse Modifiers**   | 一键把 Mantrika 推荐的双击 / Modifier 配置写入 REAPER 的 Mouse Modifiers。                                  |
| **Restore Original**        | 还原成你应用之前的状态。                                                                                  |

- 已应用时，Apply 按钮变灰、文案改为 "Mouse Modifiers: Applied"，Restore 按钮启用；反之亦然。两按钮永远只有一个可点。
- 若写入失败（极少见），会弹窗提示，可手动在 REAPER 的 Mouse Modifiers 设置里配置。

---

### 3.6 FX Insertion Behavior（FX 插入后的窗口策略）

控制通过 **Radial Menu** 和 **FX Search** 插入插件后，FX 窗口如何出现。

| Track FX / Take or Item FX 单选项 | 含义                              |
| ------------------------------ | ------------------------------- |
| **Don't show**                 | 插入后不弹任何窗口。适合先批量装链，再统一调参。        |
| **Show FX chain**              | 弹出 FX Chain 窗口（默认，推荐）。          |
| **Show floating window**       | 直接以浮动窗形式显示插件 UI。适合只调一个插件 GUI 的人。 |

Track FX 与 Take/Item FX 各自独立设置，互不影响。

---

### 3.7 Monitor（监听衰减）

| 项目             | 作用                                                                                |
| -------------- | --------------------------------------------------------------------------------- |
| **Dim Level**  | Monitor Dim Action 切换时的衰减量。范围 `-60.0 dB ~ 0.0 dB`，步进 0.5 dB；松手即生效。               |

> 默认值 `-15.0 dB`。如果调过想恢复，可手动拖回 -15。

---

## 4. Appearance 面板

### 4.1 Auto Track Colors（自动轨道配色）

让 folder track 在创建 / 重整时自动获得合理的配色，省去手动一条条设色。

| 选项                                | 作用                                                                                |
| --------------------------------- | --------------------------------------------------------------------------------- |
| **Enable Auto Track Colors**      | 总开关。关闭后下面所有子选项灰显。                                                                 |

#### Apply Mode（着色范围）

| 单选项                  | 作用                              |
| -------------------- | ------------------------------- |
| **Folder Only**      | 只给 folder track 本身上色，子轨保持原样。    |
| **Folder + Children**| folder 与其所有子轨道一起着同一色系。          |

#### Saturation Mode（饱和度收敛方向）

控制饱和度调低时，颜色"往哪边走"。

| 单选项               | 作用                                  |
| ----------------- | ----------------------------------- |
| **Toward Gray**   | 降饱和时颜色向**灰**靠近（更柔和，适合深色主题）。         |
| **Toward White** | 降饱和时颜色向**白**靠近（更清淡，适合浅色主题）。         |

#### 三个微调滑杆

| 滑杆               | 范围               | 含义                                          |
| ---------------- | ---------------- | ------------------------------------------- |
| **Saturation**   | `0.0 ~ 1.0`      | 整体饱和度系数。1.0 = 原色；越小越接近所选 Saturation Mode 端点。 |
| **Brightness**   | `0.0 ~ 1.0`      | 整体明度系数。1.0 = 原色；越小越暗。                       |
| **Hue Shift**    | `-180° ~ +180°`  | 整体色相旋转。0 = 不旋转。                             |

> 滑杆均**松手即生效**——拖动过程中不会反复刷新，松开鼠标 / 用方向键调完后才提交。

#### Reset 按钮

一键把三个滑杆恢复到默认（饱和度 1.0、明度 1.0、色相 0°）。不会影响开关本身或 Apply Mode / Saturation Mode 选择。

---

## 5. 注意事项

### 5.1 全部即时生效

没有 OK / Apply 按钮——勾选、单选、滑杆松手时数据会立刻写入并应用。直接关闭窗口即可。

### 5.2 子选项的灰显是有意为之

`Mirror Segments`、`Adaptive Regions`、`Auto Track Colors` 三个分区的总开关关闭后，对应子选项会变成半透明（不可点）。这是用来提示"现在没在生效"，不是 bug。

### 5.3 Mirror 与 Adaptive Regions 互斥

同时只能开一个，参见 §3.4。

### 5.4 Auto Mirror Large Text Display 的性能取舍

折叠组数量大时，开启该项可能影响 UI 帧率。推荐改用对应 Action 临时切换，常态下保持关闭。

### 5.5 Auto Create Regions / Adaptive Regions 需要 REAPER v7.62+

低于此版本时，勾选了也不会生效——请先升级 REAPER。

### 5.6 Mouse Modifiers 的状态由 MTK 跟踪

一旦点过 Apply，Apply 按钮会变灰、Restore 按钮启用，反之亦然。任何时候只有一个能点——这是为了避免重复应用或重复还原。

---

## 6. 故障排查

| 现象                                       | 可能原因                                | 解决                                                     |
| ---------------------------------------- | ----------------------------------- | ------------------------------------------------------ |
| 勾上 Mirror 后没有镜像段生成                       | 当前工程没有合规的 folder 结构                 | 在 folder track 子轨上放 item 再观察                           |
| 开 Adaptive Regions 时 Mirror 自动关掉了        | 两者互斥（预期行为）                          | 见 §3.4                                                 |
| Mirror 子项一直灰显                            | Mirror 总开关未勾                        | 先勾上 Enable Mirror Segment                              |
| Auto Mirror Large Text Display 灰显         | `Auto Sync Segment Names` 未勾        | 先勾上 Auto Sync Segment Names                            |
| Auto Track Colors 滑杆拖了没反应                | Enable 总开关未勾                        | 先勾上 Enable Auto Track Colors                           |
| Apply Mouse Modifiers 弹错误窗               | REAPER Mouse Modifiers 写入失败（极少见）    | 按弹窗提示在 REAPER 内手动配置；或查看 REAPER 控制台日志                   |
| Item Grouping 按钮一直显示 "Enable" 而不是绿色      | 还没点过 / 设置未保存成功                     | 再点一次按钮，看到 "Item Grouping: Auto-Enabled" 即成功            |
| FX 插入后没弹窗                                | Track FX / Take FX 选成了 "Don't show" | 改回 "Show FX chain" 或 "Show floating window"            |
| Monitor Dim 没有衰减效果                       | Dim Level 调到 0 dB                   | 拖到负值，例如 -15 dB                                         |

