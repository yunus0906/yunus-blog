---
title: 在 CentOS8 上将 Python 版本升级到 3.9
publishDate: 2024-12-02 15:41:00
description: '在 CentOS8 上将 Python 版本升级到 3.9'
tags:
  - python
  - linux
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

## 1. 检查系统中的现有 Python 版本

运行以下命令查看当前安装的 Python 版本：

```bash
python3 --version
```

## 2. 安装所需的工具和依赖

确保系统中有 `gcc` 和 `development tools`，它们是编译 Python 源码所必需的。

```bash
sudo dnf groupinstall "Development Tools" -y
sudo dnf install gcc libffi-devel bzip2 bzip2-devel zlib-devel xz-devel wget make -y
```

## 3. 下载 Python 3.9 源码

从 Python 官方网站下载 Python 3.9 的源码：

```bash
wget https://www.python.org/ftp/python/3.9.9/Python-3.9.9.tgz
```

（可以访问 [Python 下载页面](https://www.python.org/ftp/python/) 获取最新版本链接。）

## 4. 解压并进入目录

```bash
tar xvf Python-3.9.9.tgz
cd Python-3.9.9
```

## 5. 编译和安装

运行以下命令编译并安装：

```bash
./configure --enable-optimizations
make -j$(nproc)
sudo make altinstall
```

> **注意** : 使用 `make altinstall` 而不是 `make install`，以避免覆盖系统的默认 `python3` 二进制文件。

`make -j$(nproc)` 是在编译代码时的一种优化方式，具体含义如下：**分解解释：**

1. **`make`** :

- 是 GNU Make 工具，用于自动化编译和构建软件。

2. **`-j`** :

- 指定同时运行的并行任务（并行编译的线程数）。

- 通过并行处理，可以显著加快编译速度，特别是在多核 CPU 的系统上。

## 6. 验证安装

安装完成后，运行以下命令检查是否安装成功：

```bash
python3.9 --version
```

## 7. （可选）设置默认 Python 版本

如果需要将 `python3` 指向新版本的 Python 3.9，可以更新符号链接：

```bash
sudo alternatives --install /usr/bin/python3 python3 /usr/local/bin/python3.9 1
sudo alternatives --config python3
```

1. **`sudo alternatives --install`** :

   - `alternatives` 是一个管理系统中同一功能的多版本可执行程序的工具。

   - `--install` 参数用于注册一个新的可选项。

2. **`/usr/bin/python3`** :

   - 表示将来访问 `python3` 命令时，系统将从这里寻找指向实际 Python 版本的符号链接。

3. **`python3`** :

   - 表示这个符号链接的逻辑名称（组名）。组名可以是多个版本的统称。

4. **`/usr/local/bin/python3.9`** :

   - 是实际的 Python 3.9 可执行文件的路径。

   - 这里表示将 Python 3.9 注册为 `python3` 组中的一个版本选项。

5. **`1`** :

   - 优先级值。

   - 数字越大，优先级越高。如果有多个版本的 Python 注册到 `python3` 组，`alternatives` 会根据优先级选择默认版本。

按照提示选择 `python3.9`。8. 更新 `pip`升级 `pip` 到最新版本：

```bash
python3.9 -m ensurepip
python3.9 -m pip install --upgrade pip
```

完成后，Python 3.9 就已经成功安装并可以使用了。
