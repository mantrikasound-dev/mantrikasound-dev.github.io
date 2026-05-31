# 【合集】FX 管理

一组针对 FX 的工具：清理用不上的 FX、打开或关掉 FX 窗口、检查输出为单声道的 FX。处理 Item 时一律只看每个 Item 的**当前 Take**，其它 Take 上的 FX 不动。

---

## 清理用不上的 FX

把工程里**用不上的 FX** 永久删除，只删命中的那几个，正常工作的 FX 一律保留。

清理分两套**互相独立的判定**：

- **Bypassed（被旁通）**：手动旁通、暂时不出声但仍正常加载的 FX
- **Failed（加载失败）**：插件找不到、装不进来、在 FX Chain 里显示为离线/红色的空壳

被旁通 ≠ 加载失败：一个被旁通的 FX 只要还能正常加载，就**不算**失败；同理失败的 FX 也不会被当成旁通来清。两套要分别用对应的 Action。

| Action List 显示名 | 判定 | 作用范围 |
| --- | --- | --- |
| FX - Cleanup Bypassed FX (entire project) | Bypassed | 每条 Track 的 FX Chain + 每个 Item 当前 Take 的 FX + **Master** 的 FX Chain |
| FX - Cleanup Bypassed FX (entire project exclude master) | Bypassed | 每条 Track 的 FX Chain + 每个 Item 当前 Take 的 FX，**跳过 Master**（Master 一律不动） |
| FX - Cleanup Bypassed FX (selected tracks) | Bypassed | 仅选中 Track 自己的 FX Chain，**不碰**这些 Track 上的 Item FX |
| FX - Cleanup Bypassed FX (selected items) | Bypassed | 仅选中 Item 的**当前 Take** FX，**不碰**任何 Track 的 FX Chain |
| FX - Cleanup Failed FX (entire project) | Failed | 每条 Track 的 FX Chain + 每个 Item 当前 Take 的 FX + **Master** 的 FX Chain |

**行为**

- 先弹窗告诉你找到多少个命中的 FX，**确认后**才删除；没找到就提示一下、什么都不做
- 只删命中的那几个 FX，其它的保留不动
- 仅 Bypassed 清理：如果某条 Track 的**整条 FX Chain 被关掉**（Chain 总开关 off），那这条链里的 FX 会**全部**当作旁通删掉
- 仅 selected 范围：没选中对应的 Track / Item 就什么都找不到

**注意**

- 删除不可恢复地改动工程，但操作是一次 Undo，按一次 Ctrl+Z 能整个还原
- 失败 FX 通常意味着换了机器/缺插件。删掉之后这些 FX 的设置就找不回来了，确认机器上确实不会再装这些插件再删

---

## 显示 FX Chain 窗口

为选中的对象打开它们的 **FX Chain 窗口**。

| Action List 显示名 | 作用范围 |
| --- | --- |
| FX - Show FX Chain Window (selected tracks) | 选中的每条 Track |
| FX - Show FX Chain Window (selected items) | 选中的每个 Item（当前 Take） |
| FX - Show FX Chain Window (selected tracks and items) | 选中的 Track 和选中的 Item（当前 Take），一起处理 |

**行为**

- 只打开 **FX Chain 窗口本身**，**不打开**各个 FX 的独立浮动窗口
- 涉及 Track 的变体里，选中 Master 也会一起打开它的 FX Chain

---

## 隐藏 FX 窗口

关掉选中对象（或整个工程）的所有 FX 窗口。这是 Show 的反操作，**比 Show 多关浮动窗口**：Show 只开 FX Chain 窗口，而 Hide 既关 **FX Chain 窗口**、也关每个 FX 的**独立浮动窗口**。

| Action List 显示名 | 作用范围 |
| --- | --- |
| FX - Hide FX Windows (selected tracks) | 选中的每条 Track |
| FX - Hide FX Windows (selected items) | 选中的每个 Item（当前 Take） |
| FX - Hide FX Windows (selected tracks and items) | 选中的 Track 和选中的 Item（当前 Take），一起处理 |
| FX - Hide All FX Windows (entire project) | **整个工程**：每条 Track、每个 Item（当前 Take）、以及 **Master**，不用先选任何东西 |

**行为**

- 既关 **FX Chain 窗口**，也关每个 FX 的**独立浮动窗口**
- 涉及 Track 的变体里，选中 Master 也会一起关
- `Hide All` 把屏幕上散落的 FX 窗口一次清空，常用于打开过一堆 FX 之后整理桌面

**注意**

- 只有 Hide 提供"整个工程"这个范围（即 `FX - Hide All FX Windows (entire project)`），**没有**对应的整个工程 Show（避免一次弹出成百上千个窗口卡死）

---

## 报告 Mono FX

扫描**整个工程**，把所有**输出为单声道（Mono）的 FX** 列出来，打印到 REAPER 的控制台窗口。

| Action List 显示名 | 作用范围 |
| --- | --- |
| FX - Report Mono FX | 每条 Track 的 FX Chain、每个 Item 当前 Take 上的 FX、**Master** 的 FX Chain，以及 Master 上的 **Monitor FX** |

**行为**

- 判定标准：FX 的**输出只有 1 个声道**就算 Mono FX。常见于忘了改成立体声的 FX，会把信号塌成单声道
- 报告里每条会标出它在哪：Track 编号和名字、是 Track FX 还是某个 Item 的 FX、FX 的名字
- 结尾给出总数；一个都没有就提示 No mono FX found

**注意**

- 这是**只读检查**，只看不改，不删不动任何 FX，也不产生 Undo
- 结果在 REAPER 控制台输出，照着报告自己去对应的 FX 上处理
