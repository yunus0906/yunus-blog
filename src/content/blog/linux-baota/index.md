---
title: 从 0 开始，Ubuntu 系统的云服务器安装宝塔系统
publishDate: 2025-01-21 15:30:00
description: '从 0 开始，Ubuntu 系统的云服务器安装宝塔系统'
tags:
  - Ubuntu
  - linux
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

## 前期设置

我们直接从购买好服务器并安装好系统开始。我这里的系统是`Ubuntu-22.04-x64`

### 设置账密
购买好服务器之后的第一件事就是设置密码。越复杂越好，可以记在本子上，安全第一。

### 开放安全组

有的云服务器厂商会自带一些安全组，也可以绑定一些自己常用的，我们一会要用ssh工具连接服务器，大多数服务器的端口是22，所以在安全组中开放22端口。我这里是使用了自定义端口`46206`，开放的设置如下:

![20250121154150](http://blog.notd.cn/images/20250121154150.png)

## SSH连接

### 使用SSH连接服务器

我这里使用的工具是`Termius` 其他SSH工具都可以，根据自己的软件喜好使用就好。

![20250121154948](http://blog.notd.cn/images/20250121154948.png)

如果是没登录成功，大概率是安全组没开放端口，或者密码输错了。

### 安装宝塔系统

我这里使用的是宝塔一键式安装，地址：https://www.bt.cn/new/download.html

看清自己的系统和需要的版本，我这里是`Ubuntu`，执行命令：

```bash
wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh && sudo bash install_panel.sh ed8484bec
```

![20250121155106](http://blog.notd.cn/images/20250121155106.png)

输入`y`，回车，等待安装完成。

![20250121155329](http://blog.notd.cn/images/20250121155329.png)

弹出这个内容默认N就好。

![20250121155614](http://blog.notd.cn/images/20250121155614.png)

弹出此内容的时候说明已经安装成功。

![20250121155930](http://blog.notd.cn/images/20250121155930.png)

接下来我们根据提示去安全组开放端口。

![20250121160126](http://blog.notd.cn/images/20250121160126.png)

### 登录宝塔

打开IPV4的面板地址，输入账号密码进行登录，通常端口后面都会有一个随机字母组成的安全

![20250121160358](http://blog.notd.cn/images/20250121160358.png)

后面同意协议，注册或登录你的宝塔账号，就可以开始使用了。

### 安装软件

初次登陆后，宝塔会提示安装一些软件，选择你需要的，我这里安装的是

![20250121160937](http://blog.notd.cn/images/20250121160937.png)

至此，宝塔安装完成。开始你的部署之旅吧！