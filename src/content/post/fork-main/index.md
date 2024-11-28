---
title: 创建GitHub仓库 并与开源仓库更新保持同步
publishDate: 2024-11-28 09:39:00
description: '不通过Github的GitHub fork功能，通过GitHub的webhook机制，实现GitHub仓库与开源仓库的更新同步。'
tags:
  - GitHub
  - Git
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

> 提供在 Idea、WebStorm 等 JetBrains 软件的同步方法和 SourceTree 两种办法

## SourceTree

### 克隆仓库到本地

1. 打开 Sourcetree，点击主界面的 **克隆/新建（Clone/New）** 按钮。

2. 在弹出的窗口中：

- **来源路径（Source Path/URL）** ：输入你 fork 的仓库地址（例如 `https://github.com/你的用户名/仓库名.git`）。

- **目标路径（Destination Path）** ：选择你想保存仓库的本地文件夹。

- 点击 **克隆（Clone）** 。

### 添加上游仓库 (upstream)

1. 打开 Sourcetree，选择刚克隆的仓库。

2. 点击顶部工具栏的 **存储库（Repository）** > **远程（Repository Settings）** 。

3. 在弹出的 **远程仓库** 设置窗口中：

- 点击 **添加（Add）** 。

- **远程名称** ：填写 `upstream`。

- **URL/路径** ：输入原始仓库的地址（例如 `https://github.com/原始用户名/仓库名.git`）。

- 点击 **确定（OK）** 。

4. 返回主界面，点击 **远程** ，你应该能看到两个远程地址：

- `origin`：指向你自己的 fork。

- `upstream`：指向原始仓库。

### 从上游仓库同步更新

当你需要同步原始仓库的更新时：

1. 点击 **远程** 标签。

2. 右键 `upstream`，选择 **拉取（Fetch）** ，会获取原始仓库的最新更改。

3. 点击顶部工具栏的 **拉取（Pull）** ：

- 在 **远程** 下拉框中选择 `upstream`。

- 在 **分支** 下拉框中选择原始仓库的分支（例如 `main` 或 `master`）。

- 点击 **确定** 。

4. 如果你只想合并这些更改到当前分支：

- 确保当前分支已切换到你要更新的分支（例如 `main`）。

- Sourcetree 会自动将 `upstream` 的更改合并到你的分支中。

### 开发与提交更改

1. 在本地分支进行开发：

- 点击顶部工具栏的 **分支（Branch）** 按钮，输入新分支名称（例如 `feature-branch`），点击 **创建分支** 。

2. 修改文件后：

- Sourcetree 会自动检测到更改的文件，右侧会列出改动。

- 勾选需要提交的文件，填写 **提交信息（Commit Message）** ，点击 **提交（Commit）** 。

3. 提交后，点击 **推送（Push）** 将更改推送到 `origin` 的远程分支。

### 与原始仓库保持同步

定期重复 [从上游仓库同步更新](#从上游仓库同步更新)，从 `upstream` 拉取更新，将原始仓库的改动同步到你的分支中。


## JetBrains IDE

这里以IDEA为例

### 克隆仓库到本地
1. 打开 IDEA，点击 **File**  > **New**  > **Project from Version Control** 。
 
2. 在弹出的窗口中：
 
  - **URL** ：输入你 fork 仓库的地址（例如 `https://github.com/你的用户名/仓库名.git`）。
 
  - **Directory** ：选择你希望保存的本地路径。
 
  - 点击 **Clone** 。

IDEA 会自动拉取代码并打开项目。


### 添加上游仓库 (upstream)
1. 打开 IDEA 的 **Terminal** （快捷键：`Alt+F12` 或 `Cmd+Option+T`）。
 
2. 在终端中运行以下命令将原始仓库添加为 `upstream`：

```bash
git remote add upstream https://github.com/原始用户名/仓库名.git
```
 
3. 验证远程仓库：

```bash
git remote -v
```
你应该看到类似以下内容：

```perl
origin    https://github.com/你的用户名/仓库名.git (fetch)
origin    https://github.com/你的用户名/仓库名.git (push)
upstream  https://github.com/原始用户名/仓库名.git (fetch)
upstream  https://github.com/原始用户名/仓库名.git (push)
```

### 同步原始仓库的更新
当原始仓库有更新时，你可以同步到本地仓库。

#### 方法一：通过终端操作 
 
1. 打开 **Terminal** 。
 
2. 拉取原始仓库的更新：

```bash
git fetch upstream
```
 
3. 合并更新到你的本地主分支：

```bash
git merge upstream/main
```
如果主分支是 `master`，替换为：

```bash
git merge upstream/master
```

#### 方法二：通过 IDEA 图形化界面 
 
1. 点击 IDEA 的右上角 **Git**  工具栏，打开 **Git Log**  面板。
 
2. 点击 **Remote Branches**  标签，找到 `upstream/main` 或 `upstream/master`。
 
3. 右键 `upstream/main`，选择 **Merge into Current**  或 **Rebase onto Current** 。 
  - **Merge** ：将原始仓库的更改直接合并到当前分支。
 
  - **Rebase** ：将原始仓库的更改应用到当前分支之上，保持更干净的提交记录。


### 开发与提交更改
1. **创建新分支**  
  - 在右上角的分支菜单中，点击当前分支旁边的 **+**  按钮，输入新分支名（例如 `feature-branch`）。

  - IDEA 会自动切换到新分支。
 
2. **修改代码** 
  - 编辑代码后，IDEA 会在右侧的 Git 面板中显示文件改动。

3. **提交更改**  
  - 按下 `Ctrl+K`（或 `Cmd+K`），弹出 **Commit Changes**  窗口。
 
  - 填写提交信息，勾选改动的文件，点击 **Commit** 。
 
4. **推送到远程仓库**  
  - 按下 `Ctrl+Shift+K`（或 `Cmd+Shift+K`），选择你的远程仓库（`origin`）和分支，点击 **Push** 。

### 定期同步原始仓库
定期重复 **第4步** ，从 `upstream` 同步原始仓库的更改到你的分支。

**7. 提交 Pull Request**  
1. 推送你的改动到 `origin` 仓库。

2. 打开 GitHub，进入你 fork 的仓库页面。
 
3. 点击 **Pull Request** ，选择你的分支与原始仓库的主分支，提交 PR。
