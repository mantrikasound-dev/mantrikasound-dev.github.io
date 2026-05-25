# Wwise - Import Selected WAV to REAPER

> 仅支持 Windows · 需要 Wwise 在运行

把你在 **Wwise Project Explorer 里选中的对象**对应的源 WAV，一键拖回 REAPER 当前轨道。

---

## 怎么用

```
1. Wwise 里选中要导入的对象（Sound / Container / Folder / Work Unit 都行）
2. REAPER 里选中一条目标 Track，把光标放到想插入的时间位置
3. 执行 Action：Wwise - Import Selected WAV to REAPER
```

工具会自动：

- 把 wav **按 Wwise Project Explorer 显示顺序**依次插入到当前轨道
- 从光标位置开始排列，每个 item 之间留 **0.5 秒**间隔
- 容器对象（ActorMixer / RandomSequence / SwitchContainer / BlendContainer / Folder / WorkUnit）会**递归**拿出里面所有的 Sound

---

## 文件存到哪

复制到 **当前 REAPER 工程目录** 下：

```
<你的rpp所在目录>/ImportFromWwise/<今天日期>/
```

例如：`MyProject/ImportFromWwise/2026-05-24/Swain_Q.wav`

**为什么要复制**：Wwise 的 Originals 是工程交付资产，直接挂上去你一改就破坏了原文件。先复制一份到 REAPER 工程旁，改也只改副本。

---

## 智能判重

同一批 wav 反复导入时：

- **文件完全相同**（大小 + 修改时间都一致）→ **跳过复制**，直接复用磁盘上那份
- **文件有差异**（Wwise 那边的源被更新了）→ 自动加后缀避免覆盖：`Swain_Q.wav` → `Swain_Q_1.wav` → `Swain_Q_2.wav` ...

这样多次导入同一批不会产生重复文件，但 Wwise 那边更新过的版本也不会被旧副本掩盖。

---

## 前置条件

| 条件 | 不满足时 |
|---|---|
| Wwise 在运行且启用了 WAAPI | 弹窗 "Cannot connect to Wwise" |
| Wwise 里选中了至少一个对象 | 弹窗 "No objects selected in Wwise" |
| REAPER 工程已保存（rpp 存在磁盘上） | 弹窗 "Please SAVE the Reaper project first!" |
| REAPER 里选中了一条 Track | 弹窗 "Select a track first." |

---

## 注意事项

- **一次选超过 100 个** Sound 会弹窗确认——防止你不小心选了整个 Work Unit 把上千个文件全导进来
- 选中的对象里**没有可解析的 Sound** 时（如选了纯 Event / Bus）→ 弹窗 "No WAV files found"
- 容器递归只取 **Sound** 类型的子对象，其他类型（如子 Event）会被忽略
