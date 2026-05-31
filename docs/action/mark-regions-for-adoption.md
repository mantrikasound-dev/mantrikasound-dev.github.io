# Assistants - Mark Regions For Adoption

把工程里**你自己的 Region 标成橙色，排进"待收养"队列**——之后新长出来的 Mirror（镜像 Item）会自动继承这些 Region 的名字。

---

## 行为

- 扫描工程里**所有不是 Mirror 系统创建**的 Region，把它们标成**橙色**，排进"待收养"队列。
- 已经被 Mirror 系统管理的 Region **不动**（不会被重复标记）。
- 队列是**覆盖式**更新：已经被收养掉的会自动从队列里清掉。
- 工程里**没有可收养的 Region** 时，弹提示告诉你（只有非本插件创建的 Region 才能被标记）。

---

## 怎么用（配合 Mirror）

```
1. 把 Region 命名好
2. 跑这个 Action → 目标 Region 变橙，排进待收养队列
3. 建 Folder + 子轨素材，让 Folder 上长出 Mirror
4. → 新 Mirror 自动吃掉与它时间重叠的橙色 Region：名字写进 Mirror 的 Note，
     老 Region 退化成普通 Marker
```

> **顺序很关键**：收养只在 Mirror **新建那一刻**发生。已经存在的老 Mirror 不会回头收养，所以一定要**先标记 Region，再让 Mirror 长出来**。

---

## 注意

- 这个 Action 本身只做"标橙、排队"；真正的名字继承发生在之后 Mirror 新建时。
- 在 Action List 里搜 **`Adopt`** 或 **`Regions`**，**搜 `Mirror` 找不到它**。
- 它是一次性批量整理，**不支持 Undo**。

> 完整的收养流程（橙色 Region → Mirror 继承名字 → 老 Region 变 Marker）见 Mirror 用户手册的"Region 收养"一节。
