---
title: 云服务器上 git 的安装及基本配置
publishDate: 2025-01-22 23:34:00
description: '云服务器上 git 的安装及基本配置'
tags:
  - Ubuntu
  - linux
  - git
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

## 安装

官网地址：https://git-scm.com/downloads/linux

我们这里直接使用命令行安装

```bash
apt-get install git
```

安装完成之后，输入命令 `git --version`，查看是否安装成功。

## 基本配置

全局配置好邮箱以及用户名

```bash
git config --global user.name 敖烈
git config --global user.email notd0535@gmail.com
```

使用`ssh -T git@github.com`测试连通性，首次使用输入yes

![20250121162643](http://blog.notd.cn/images/20250121162643.png)

首次会出现`Permission denied (publickey).` 我们需要去生成一个SSH Key配置到GitHub上。

![20250121162924](http://blog.notd.cn/images/20250121162924.png)

## 生成SSH Key

使用命令 `ssh-keygen` 可以生成配对的 `id_rsa` 与 `id_rsa.pub` 文件，生成之后只需把 `id_rsa.pub` 配置到github上。

```bash
# 生成一个 ssh-key
# -t: 可选择 dsa | ecdsa | ed25519 | rsa | rsa1，代表加密方式
# -C: 注释，一般写自己的邮箱
ssh-keygen -t rsa -C "yunus"

# 生成 id_rsa/id_rsa.pub: 配对的私钥与公钥
ls ~/.ssh
> authorized_keys  config  id_rsa  id_rsa.pub  known_hosts
```

使用的时候有个需要输入的，回车三下就好。

![20250121164302](http://blog.notd.cn/images/20250121164302.png)

复制`~/.ssh/id_rsa.pub`中 文件内容，并粘贴到github 的配置中。

```bash
cat ~/.ssh/id_rsa.pub
> ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDRqfJXjYMxk9RuZB5os1DoDUW6w4dg/lYfJi6U4dfAG0rh2VbcqONUS15nFsoCac4LAUqY/Lu06lIWj9GBqfPTCiZozuSNVmKPMvHYc4xVeRbijanPodhqj2TGC7zDkj279iyLDVvB2EHpWKsa1a7XyxecUNpAEcNUH57TA...yunus
```

在github的`ssh keys`设置中：https://github.com/settings/keys 点击`New SSH key`添加刚才生成的`public key`。

详细内容参考官网：https://help.github.com/cn/articles/adding-a-new-ssh-key-to-your-github-account

![20250121164545](http://blog.notd.cn/images/20250121164545.png)

再次使用`ssh -T git@github.com`测试连通性，如果出现`Hi yunus! You've successfully authenticated, but GitHub does not provide shell access.`则表示配置成功。