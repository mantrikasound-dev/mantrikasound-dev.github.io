# 【合集】Misc（杂项）

一组互相独立的实用小工具。

---

## 一、Toggle Monitor Dim（监听降一档）

**Action List 显示名：Misc - Dim - Toggle Monitor Dim (monitoring FX)**

一键把**监听音量降一档**，再按一次恢复。专门压监听响度，**不动工程里的任何音量**，导出/渲染完全不受影响。

### 行为

- 第一次触发：在 Master 的 Monitor（监听）FX 链里自动挂一个音量平滑器，并把监听降低一个固定 dB 值
- 之后每次触发：在「降一档」和「恢复」之间来回切换
- 降低的 dB 值在 **Preferences** 里配置（默认 -15 dB）

### 注意

- 只影响 Master 的 **Monitoring FX**——也就是你耳朵听到的电平，不进工程信号链，不影响渲染
- 切到「降低」状态时，这个 Action 会显示为**亮起（开）**状态，方便你一眼看出现在是不是压着的
- 第一次会弹一个提示告诉你已加上、降了多少 dB

---

## 二、Enable LFO for Last Touched Parameter（为最后触碰的参数开 LFO）

**Action List 显示名：Misc - LFO - Enable for Last Touched Parameter**

给你**最后碰过的那个参数**打开 LFO 调制，并弹出参数调制面板，省去手动右键找入口。

### 用法

1. 先动一下你想调制的参数（拖一下旋钮/推子，让它成为「最后触碰」的参数）
2. 触发本 Action

随即：

- 给这个参数**启用 LFO 调制**
- 自动打开 **参数调制（Parameter Modulation）面板**，方便你接着调 LFO 速率、形状、幅度

### 注意

- Track FX 和 Take FX 上的参数都支持
- 只对**最后触碰**的那一个参数生效；之前没动过任何参数时不做事
- 只负责「开 LFO + 打开面板」，LFO 的具体波形和参数还是你自己在面板里调

---

## 三、Locate Source Files in Explorer（在文件管理器里定位源文件）

**Action List 显示名：Misc - Locate Source Files in Explorer**

在系统文件管理器里**定位选中 Item 的源音频文件**——直接打开文件所在文件夹并选中该文件。

### 行为

- 对每个选中 Item，找到其源音频文件，在文件管理器里把它定位出来
- **同一个文件只打开一次**（多个 Item 指向同一源文件不会重复弹窗）
- 找到几个不同的源文件，就定位几个

### 注意

- 没选 Item 时**不做事**
- 只处理音频源；**MIDI** 不算源文件，会跳过
- 当需要打开的不同文件**超过 3 个**时，会先弹窗问你要不要继续，避免一下子刷出一堆窗口
