# Quick Start

> 适用版本：Mantrika Tools 任意版本

---

## 1. 概述

**Mantrika Tools** 是一套针对REAPER工作流的Extension程序。不依赖任何外部extension、library、Scripts等，完全独立并且自包含。

一共有3种安装方式：

- 通过Reapack；
- 下载快捷安装包并运行脚本；
- 手动安装；

---

## 2. 通过Reapack

1. 打开Reapack；

2. 选择 Import repositories；

3. 复制粘贴Reapack Link；

   https://github.com/qhtchestnut/Mantrika-Tools-Release/raw/master/index.xml

4. 点击OK；

5. 重启REAPER；

---

## 3. 通过安装包

1. 任意位置解压zip；
2. 双击Mantrika install-win x64.bat 或者 Mantrika install-arm64.sh；
3. 重启REAPER；

---

## 4. 手动安装

1. 任意位置解压zip；
2. 将reaper_MantrikaTools-x64或者reaper_MantrikaTools-arm64 和MantrikaTools Config目录移动到UserPlugins目录中；
3. 重启REAPER；

---

## 5. 更新

一共有两种方式，取决于你的安装方式：

1. 如果是通过Reapack路径安装，那么直接更新就好；
2. 如果是手动安装，可以在Extension 菜单，找到 Mantrika Tools -> Mantrika Options -> Check for updates...

---

## 6. 卸载 

- 删除主dll文件：`\REAPER\UserPlugins\reaper_MantrikaTools-x64.dll`
- 删除整个配置文件夹： `\REAPER\UserPlugins\MantrikaTools Config`

---

## 7. 目录说明

- `MantrikaTools Config` ：所有的配置文件本身，均为人类可读的json格式，支持直接修改文件，但通常不建议这样做；
- MantrikaTools Config\resource：里面包含两个clap，这是功能所必须的clap，会跟随版本同步更新；

---

