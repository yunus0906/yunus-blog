---
title: php 运行 composer install 报错
publishDate: 2024-12-21 22:29:00
description: 'Process class relies on proc_open, which is not available on your PHP i'
tags:
  - php
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

## 遇到的问题

运行 composer install 报错 ：

### 问题 1

```bash
  The Process class relies on proc_open, which is not available on your PHP i
  nstallation.
```

![20241221091834](http://blog.notd.cn/images/20241221091834.png)

### 问题 2

```bash
PHP Fatal error:  Uncaught TypeError: Return value of Symfony\Component\Process\Process::close() must be of the type integer, null returned in phar://composer2.5.8/composer.phar/vendor/symfony/process/Process.php:1466
Stack trace:
```

![20241221092531](http://blog.notd.cn/images/20241221092531.png)

## 解决

在 PHP 的配置文件 php.ini 中，确保未禁用 `proc_open`,`proc_get_status` 函数。找到以下配置项：

```bash
disable_functions = ...
```

确保 `proc_open`,`proc_get_status` 不在禁用列表中。如果存在，请移除。

验证是否已启用

```bash
php -r "var_dump(function_exists('proc_open'));"
php -r "var_dump(function_exists('proc_get_status'));"
```

如果输出为 `bool(true)`，则说明已启用。
