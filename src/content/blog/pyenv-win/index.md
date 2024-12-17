---
title: Windows python版本管理工具pyenv-win
publishDate: 2024-08-06 15:41:00
description: 'Windows python版本管理工具pyenv-win'
tags:
  - python
  - pyenv-win
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

> pyenv开源地址：https://github.com/pyenv/pyenv
>
> pyenv-win分支开源地址：https://github.com/pyenv-win/pyenv-win

## 安装方式

### 压缩包安装

下载地址：https://github.com/pyenv-win/pyenv-win/archive/master.zip

将压缩包中的`pyenv-win`目录解压并放置到一个目录下

![20241127163826](http://blog.notd.cn/images/20241127163826.png)

> 其他安装方式，可查看官网 <https://pyenv-win.github.io/pyenv-win/#installation>

## pyenv-win的基本命令

```powershell
# 查看pyenv版本
pyenv --version

# 查询全部可安装的python版本
pyenv install -l

# 选择python版本，进行安装，例如安装python 3.7.9
pyenv install 3.7.9

# 将python 3.7.9，设置为全局使用
pyenv global 3.7.9

# 将python 3.7.9，设置为本地用户使用（设置全局后，就不用再配置本地用户）
pyenv local 3.7.9

# 查询本地所有python版本
pyenv versions

# 卸载python版本，例如卸载python 3.7.9
pyenv uninstall 3.7.9
```

## 配置环境变量

在环境变量中添加以下参数：

```powershell
# 我的安装位置是D:\Program Data\pyenv
变量名称      变量值
PYENV        D:\Program Data\pyenv
PYENV_ROOT   D:\Program Data\pyenv

# Path添加
%PYENV%\bin
%PYENV%\shims
```

## 参考文章

[pyenv-win 安装与配置](https://www.cnblogs.com/fanqisoft/p/17482506.html)
