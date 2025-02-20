---
title: Flarum 论坛 宝塔安装教程
publishDate: 2025-01-21 15:30:00
description: '从 0 开始，在宝塔中安装 Flarum 论坛'
tags:
    - Flarum
    - linux
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

## Flarum论坛

Flarum论坛现在大家都人手一个了，我也模仿学习一下，记录一下。

### 准备工作

系统环境：Ubuntu 22.04
PHP环境：8.3
MySQL环境：8.0
Nginx环境：1.18

### 创建站点

在宝塔面板创建一个PHP站点，同时创建MySQL数据库。

创建站点后将站点目录中的所有文件全部删除，保持站点目录为空的状态。

### 删除PHP禁用函数

宝塔面板的默认PHP安装后会禁用一些危险函数。我们需要将这些函数在禁用列表删除。

`putenv`，`pcntl_signal`，`proc_open`

![20250121223139](http://blog.notd.cn/images/20250121223139.png)

### 安装fileinfo扩展

程序需要使用到fileinfo

![20250121223443](http://blog.notd.cn/images/20250121223443.png)

### 确认Composer状态

进入服务器SSH，cd到文件夹位置，输入命令 `composer` 查看服务器是否安装了Composer。

遇到问题：

```bash
error: Uncaught Error: Call to undefined function Composer\XdebugHandler\putenv()
```

在禁用函数中把`putenv`删除掉。

![20250121224703](http://blog.notd.cn/images/20250121224703.png)

出现以下内容说明Composer存在。

![20250121224929](http://blog.notd.cn/images/20250121224929.png)

如果没安装Composer，安装命令：
```bash
php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
```

### 安装Flarum

文档：https://docs.flarum.org/zh/install

在PHP站点的空白目录执行命令：

```bash
composer create-project flarum/flarum:^1.8.0 .
```

提示以下信息，代表安装成功。

![20250121225639](http://blog.notd.cn/images/20250121225639.png)

### 更改运行目录

![20250121230219](http://blog.notd.cn/images/20250121230219.png)

### 更改文件夹权限

`storage`文件夹权限设为`777`，用户组`root`

![20250121230313](http://blog.notd.cn/images/20250121230313.png)

### 填写配置信息

填写信息 install 就可以使用了。

![20250121230928](http://blog.notd.cn/images/20250121230928.png)

## 问题

<h3>The PHP extension 'mbstring' is required.</h3>

安装`mbstring`拓展。

![20250121230609](http://blog.notd.cn/images/20250121230609.png)

<h3>The /www/wwwroot/www.o3oyoo.com/public/assets directory is not writable. </h3>

给`public/assets`文件夹权限设为`777`，用户组`root`

![20250121230458](http://blog.notd.cn/images/20250121230458.png)

<h3>打开`/admin`报404</h3>

在伪静态添加以下内容。

![20250121231818](http://blog.notd.cn/images/20250121231818.png)

```bash
# Pass requests that don't refer directly to files in the filesystem to index.php
location / {
try_files $uri $uri/ /index.php?$query_string;
}
 
# Uncomment the following lines if you are not using a `public` directory
# to prevent sensitive resources from being exposed.
# location ~* ^/(\.git|composer\.(json|lock)|auth\.json|config\.php|flarum|storage|vendor) {
# deny all;
# return 404;
# }
 
# The following directives are based on best practices from H5BP Nginx Server Configs
# https://github.com/h5bp/server-configs-nginx
 
# Expire rules for static content
location ~* \.(?:manifest|appcache|html?|xml|json)$ {
add_header Cache-Control "max-age=0";
}
 
location ~* \.(?:rss|atom)$ {
add_header Cache-Control "max-age=3600";
}
 
location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|mp4|ogg|ogv|webm|htc)$ {
add_header Cache-Control "max-age=2592000";
access_log off;
}
 
location ~* \.(?:css|js)$ {
add_header Cache-Control "max-age=31536000";
access_log off;
}
 
location ~* \.(?:ttf|ttc|otf|eot|woff|woff2)$ {
add_header Cache-Control "max-age=2592000";
access_log off;
}
 
# Gzip compression
gzip on;
gzip_comp_level 5;
gzip_min_length 256;
gzip_proxied any;
gzip_vary on;
gzip_types
application/atom+xml
application/javascript
application/json
application/ld+json
application/manifest+json
application/rss+xml
application/vnd.geo+json
application/vnd.ms-fontobject
application/x-font-ttf
application/x-web-app-manifest+json
application/xhtml+xml
application/xml
font/opentype
image/bmp
image/svg+xml
image/x-icon
text/cache-manifest
text/css
text/javascript
text/plain
text/vcard
text/vnd.rim.location.xloc
text/vtt
text/x-component
text/x-cross-domain-policy;
```

<h3>安装中文语言包</h3>

在SSH中执行下面命令，然后管理后台启用即可。

```bash
composer require flarum-lang/chinese-simplified
php flarum cache:clear
```

<h3>申请HTTPS</h3>

![20250121232112](http://blog.notd.cn/images/20250121232112.png)

网页报错：Something went wrong while trying to load the full version of this site. Try hard-refreshing this page to fix the error.

![20250121232233](http://blog.notd.cn/images/20250121232233.png)

解决办法：

打开安装根目录，编辑config.php 文件, 
把 'url' => 'http://www.xxxx.com', 修改成 'url' => '//www.xxxx.com',
改好保存，刷新缓存就可以了。

![20250121232640](http://blog.notd.cn/images/20250121232640.png)

## 参考

https://tech.18miaoxing.cn/archives/69064#toc_id_2_1