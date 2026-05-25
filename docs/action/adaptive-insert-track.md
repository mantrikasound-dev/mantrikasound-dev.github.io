# Assistants - Track - Adaptive - Insert Track (folder aware)

跟 REAPER 自带的"插入新轨道"行为基本一样，**但在 Folder 内部最后一条轨道之后插入时，新轨道会乖乖留在 Folder 里**，不会被弹到 Folder 外面。

---

## 为什么要有这个

REAPER 原生 `Track: Insert new track`有个情况：

```
▼ My Folder
   Track A
   Track B  ← 你最后选中这一条（Folder 的最后一条）
按 新建轨道快捷键 插入新轨道
▼ My Folder
   Track A
   Track B
新轨道  ← ⚠️ 跑到 Folder 外面去了！
```

这个 Action 解决的就是这个场景——让新轨道**留在 Folder 里**，自然成为 Folder 的新最后一条：

```
▼ My Folder
   Track A
   Track B
   新轨道  ← 还在 Folder 里
```

---

## 行为细节

- 最后触碰（Last Touched）的轨道**不是 Folder 最后一条**时 → 走 REAPER 原生 Insert 行为，跟 reaper原生完全等价
- 是 Folder 最后一条时 → 走特殊插入逻辑，让新轨道接管 Folder 关闭点，原来的最后一条变成倒数第二条
- 没有最后触碰的轨道时 → 也走原生 Insert
- 操作完后**新轨道处于选中状态**，跟原生行为一致

