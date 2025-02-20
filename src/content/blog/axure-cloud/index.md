---
title: Axure Cloud 本地部署
publishDate: 2025-02-15
description: 'Axure Cloud for Business On-Premises 本地服务端部署'
tags:
  - Axure
heroImage: { src: './thumbnail.jpg', color: '#64574D' }
language: '中文'
---


## 简介

**Axure** ，产品经理、UI设计和前端人比较熟悉的一款，用来编辑、上传、预览选型图的软件，通过Axure Cloud提供团队协作。一般公司比较多。

Axure官方在2024年12月18日发布了一个Axure RP 9.0的新版本，大致意思就是不更新客户端就不能继续使用Axure Cloud，2025年2月中就有同行不能使用。

当然，Axure Cloud的服务器本就在国外，访问非常慢，国内用户需要挂科技才能正常访问。在查阅官方文档和别的大佬的文章后，找到一个解决办法：**内网环境或云服务器部署 Axure Cloud，用户可通过Axure8/9连接本地Axure Cloud并团队协作。**

官方文档： [Installing Axure Cloud for Business On-Premises | Axure Docs](https://docs.axure.com/axure-cloud/business/install-on-premises/)

## 环境要求

- Windows Server 2012 及以上、Windows 7 及以上（目前只能Windows）
    - Windows Server 2008 R2 及以下亲测不可用
    - 2 Ghz CPU（推荐 2 核）
    - 2 GB RAM（推荐 4GB）
    - 30 GB 可用磁盘空间
- .NET Framework 4.7.2 [官方下载](https://dotnet.microsoft.com/zh-cn/download/dotnet-framework/net472)
- MySQL 5.7 及以上、Sql Server
    - 需要安装使用混合模式身份验证（“SQL Server 和 Windows 身份验证模式”）的 SQL Server。
    - 我这里使用的是MySql

<h3>MySql安装</h3>

MySql有非常多的安装方式，如果是不太了解这一块 建议google一下。
官网下载：[MySQL Downloads](https://www.mysql.com/cn/downloads/)

## 安装

> Axure Cloud for Business 本地部署使用 [ASP.NET's built-in Kestrel web server](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-2.2)，而不是 [Windows Server's Internet Information Services (IIS)](https://www.iis.net/)**安装 Axure Cloud for Business 将停用“默认网站”并启动侦听端口 80 的新服务。**

### 数据库设置

选择MySql，输入账密、服务器IP，端口号。本地IP输入`localhost`。端口一般是3306，或者输入自己设置的。

![20250220095332](http://blog.notd.cn/images/20250220095332.png)

#### 创建或选择数据库

- 如果您尚未在数据库服务器上创建 Axure Cloud 数据库，请保持选中**“创建新数据库**”。
- 如果您之前在数据库服务器上创建了 Axure Cloud 数据库并希望将其用于此安装，请选择 **使用现有数据库** ，然后从下拉列表中的可用数据库中进行选择。

![20250220095143](http://blog.notd.cn/images/20250220095143.png)

#### 创建数据库用户

- 选择 **创建新用户** 以创建新的数据库用户，该用户具有 Axure Cloud Web 服务所需的最低权限。如果您在上一步中创建新数据库，则需要此选项。
- 如果您在上一步中选择连接到现有数据库，则可以选择 **Use Existing User/Password（使用现有用户/密码）**。如果需要，您可以为现有数据库创建新用户。

![20250220095158](http://blog.notd.cn/images/20250220095158.png)

#### 配置管理用户

之后用来登录的超级管理员账号

![20250220095209](http://blog.notd.cn/images/20250220095209.png)

#### 许可证密钥

如果你在官网购买了正版，请在此输入密钥。没有的话空着就行，之后会替换补丁进行破解。

![image|690x323](upload://wtfWZpamuYNgFoJymP9Wk85Iw2t.png)

#### 补丁文件

安装完成后会自动打开网页，进入登录页。
1. 打开 **任务管理器>服务** 停止 `AxureCloudWebSiteService` 服务。
2. 将文件夹内的`破解文件`覆盖到`你的安装位置\Axure\Share9\site`。默认`C:\Program Files\Axure\Share9\site`。
3. 重新启动 `AxureCloudWebSiteService` 服务。
4. 刷新网页登录账号。

![20250220095405](http://blog.notd.cn/images/20250220095405.png)

![20250220095419](http://blog.notd.cn/images/20250220095419.png)

![20250220095425](http://blog.notd.cn/images/20250220095425.png)

## 使用

我这里使用的是Axure9。
1. 发布->发布到Axure云。
2. 选择 `Manage server`，点击 `添加->内部服务器` 输入服务器/内网地址（不需要输入端口）如`http://192.168.1.88` 输入账密（账密是在登录上超级管理员之后自行添加的账号，也可以直接使用超级管理员账号）
3. 确定后就可以上传了。

![20250220095437](http://blog.notd.cn/images/20250220095437.png)

![20250220095443](http://blog.notd.cn/images/20250220095443.png)

![20250220095449](http://blog.notd.cn/images/20250220095449.png)

## 下载

夸克：https://pan.quark.cn/s/615f192bd4c5

度盘：https://pan.baidu.com/s/1MEab8bdiEp-TxOF2g0GhYw?pwd=hwze 提取码: hwze

## 问题整理

1. 如果登录之后有 `60 days left in trial`的提示，点击一下`Assign Seat` 及破解成功。
2. 安装数据库时遇到 `SSL Authentication Error` 我是用本地数据库的时候遇到的问题，换了一个云数据库就好了，暂时不知道为什么。
3. 登录时用户不存在，超级管理阿远创建好账号后，需要用户使用该账号打开地址登录一下。
