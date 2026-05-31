# Check for Updates

检查 MantrikaTools 是否有新版本。触发后弹出一个小窗，告诉你**当前版本**和**线上最新版本**，有更新的话可以一键下载安装。

---

## 怎么用

1. 触发这个 Action → 弹出窗口，先显示 **"Checking for updates..."**
2. 几秒后联网查完，窗口给出结果：

| 显示 | 含义 | 你能做什么 |
|---|---|---|
| **You're up to date** | 已是最新 | 可点 **Reinstall** 重新装一遍当前版本 |
| **New version available!** | 有新版本 | 点 **Update Now** 一键下载安装 |
| **Update failed. Please try again.** | 联网 / 检查失败 | 点 **Retry** 重试 |

窗口还会显示**更新日志**（这版改了什么），以及一个 **View on GitHub** 链接，可跳到发布页自己看。

---

## 一键更新流程

点 **Update Now**（或 Reinstall）后：

1. 按钮变 **"Downloading..."**，下面出现进度条
2. 自动下载新版本及配套资源文件并就位
3. 完成后提示 **"Update ready! Restart REAPER to apply."**
4. **重启 REAPER** 即生效

---

## 注意

- 检查和下载都**需要联网**
- 更新**下载完不会立刻生效，必须重启 REAPER**
- 顶部始终标着 `Current: 当前版本  |  Latest: 最新版本`，一眼对比
- 这个窗口可反复打开/关闭，再次触发会重新检查一次
