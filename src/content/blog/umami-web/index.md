---
title: 搭建 umami 网站流量统计平台
publishDate: 2024-12-06 09:39:00
description: '使用 umami + MySql+ Vercel 搭建一个网站流量统计平台'
tags:
  - umami
  - Vercel
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

## 

> 使用`百度统计`固然好用，但是我还是想搭建一个自己的统计平台，所以选择了`umami`。

## 技术选型

我这里的选择的是`umami`+`MySql`+`Vercel`。我觉得网上的云数据库我用的实在是不熟练，而且 PlanetScale 也取消免费账户。虽然这个选型有点奇怪，但是在自己的云服务器上搭建好 mysql，再去配合 Vercel 这样能节省很多事情。

## 准备工作

好像不需要什么特别的准备

- Vercel
- MySql(在云服务器安装 MySql 可以自行 google)

注意事项
- `mysql` 的版本不能低于 8.0
- `NodeJs` 版本不能低于 16.13

## 下载 Umami

地址: <https://github.com/umami-software/umami>

可以在本地启动起来，看看 dev，或者直接 fork 到自己的账号，直接在 Vercel 部署。

我这里演示在本地启动。看部署直接看[部署到 Vercel](#部署到-vercel)

```bash
git clone https://github.com/umami-software/umami.git
cd umami
```

## 创建数据库

我这里用 Navicat 连接 MySql 创建的数据库。也可以使用命令行。

```bash
mysql> create database umami;
```

![20241206091258](http://blog.notd.cn/images/20241206091258.png)

## 在本地启动项目

```bash
npm install -g yarn
yarn install
```

在根目录创建一个`.env`文件，里面填入你的数据库连接信息。
```bash
DATABASE_URL=connection-url
```
`connection-url`的值可以参考这里，我们这里使用Mysql。
```bash
postgresql://username:mypassword@localhost:5432/mydb
mysql://username:mypassword@localhost:3306/mydb
```

运行`build`，会将数据库初始化，并且生成`.next`文件夹。
```bash
yarn build
```

等待运行完成后，再运行`start`。
```bash
yarn start
```
访问`http://localhost:3000`，可以看到 umami 的登录页面。

> 默认账号：`admin` 密码：`umami`。

## 部署到 Vercel
在Vercel 上创建一个新项目，选择`Import Git Repository`，选择你的项目，然后选择`Deploy`。

配置好环境变量
```bash
DATABASE_URL=mysql://username:mypassword@localhost:3306/mydb
```
配置好之后，等待部署完成，会自动的在你的数据库中创建表信息。

访问你的域名，即可看到 umami 的登录页面。

> 默认账号：`admin` 密码：`umami`。

![20241206093033](http://blog.notd.cn/images/20241206093033.png)

## 常见问题
1. 部属Vercel时报错，原因是因为env文件没配置好导致的，可以先保存项目，在`setting->Environment Variables`中save好数据库的配置文件，然后再部署。
``` bash
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
ERROR: "check-env" exited with 1.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
Error: Command "yarn run build" exited with 1
```
![20241206101438](http://blog.notd.cn/images/20241206101438.png)

2. Vercel报错

``` bash
Error: The file "/vercel/path0/next/routes-manifest.json" couldn't be found. This is often caused by a misconfiguration in your project.
```

- 打开 Vercel Dashboard。
- 找到你的项目，点击「Deployments」。
- 触发新部署，并确保选中「Clear Cache」。
- 重启！