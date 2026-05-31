# Assistants - Region Flow - Bind Region Under Cursor to Selected Folder Track

一键把**当前选中的顶层 Folder** 改名对齐到**光标所在的 Region**，让它俩立刻在 Adaptive Regions（Region Flow）里配对上。

---

## 行为

1. 取**当前选中的那个顶层 Folder 轨**。
2. 取**编辑光标所在的 Region**。
3. 把 Folder 改名成这条 Region 的"**名字主干**"（去掉结尾的序号 / 版本号 / 扩展名等后缀）。
4. 立刻完成配对——Region 的边界、颜色马上对齐到这个 Folder 的内容上。

本质就是"帮你把 Folder 改成和 Region 同名"，省掉手动改名这一步。改完之后的跟随逻辑和 Adaptive Regions 平时一样。

---

## 用法

```
1. 选中一个顶层 Folder 轨道（有且只能选一个）
2. 把编辑光标移到某条 Region 的范围内
3. 跑这个 Action
```

---

## 不满足条件时会弹提示

- **没开 Adaptive Regions（Region Flow）总开关**
- **没有恰好选中一个顶层 Folder 轨**（没选、选多个、选的不是顶层 Folder 都不行）
- **光标不在任何 Region 范围内**
- **这条 Region 已经配对给别的 Folder**，或**这个 Folder 已经配对给别的 Region**（一对一关系）
- 去掉后缀后 Region 名是空的

操作是一次 Undo。

> Adaptive Regions / 名字主干配对是什么见 Adaptive Regions 用户手册。
