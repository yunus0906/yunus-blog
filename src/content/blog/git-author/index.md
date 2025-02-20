---
title: Git 修改提交者信息
publishDate: 2025-02-20 16:24:00
description: 'Git 修改提交者信息'
tags:
    - git
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

> 有的时候因为电脑上有多个git账号，不同的项目需要分开管理，所以就需要修改提交者。

## 查看

``` bash
git config user.name
git config user.email
```

## 修改

### 设置全局

``` bash
git config --global user.name "Author Name"
git config --global user.email "Author Email"
```

### 设置当前仓库

``` bash
git config user.name "Author Name"
git config user.email "Author Email"
```