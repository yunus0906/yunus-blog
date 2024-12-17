---
title: 本地运行 BroadcastChannel 和常见问题
publishDate: 2024-12-04 23:30:00
description: 'ccbikai/BroadcastChannel'
tags:
  - vercel
  - github
  - astro
  - telegram
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

> 项目地址：https://github.com/ccbikai/BroadcastChannel

## 安装依赖

- 确保您的系统已安装 [Node.js](https://nodejs.org/) （建议使用 LTS 版本）。
- 我这里使用的 `pnpm` 安装依赖，可以根据自己电脑的环境使用 npm 或其他。

- 克隆项目代码：

```bash
git clone https://github.com/ccbikai/BroadcastChannel.git
```

- 进入项目目录并安装依赖：

```bash
cd BroadcastChannel
pnpm install
```

## 配置环境变量

- 将项目根目录下`.env.example`复制出一个新文件`.env`并按照要求添加内容

```makefile
## Telegram 频道用户名，必须配置。 t.me/ 后面那串字符
CHANNEL=miantiao_me

## 语言和时区设置，语言选项见[dayjs](https://github.com/iamkun/dayjs/tree/dev/src/locale)
LOCALE=zh-cn
TIMEZONE=Asia/Shanghai

## 社交媒体用户名
TELEGRAM=ccbikai
TWITTER=ccbikai
GITHUB=ccbikai

## 下面两个社交媒体需要为 URL
DISCORD=https://DISCORD.com
PODCASRT=https://PODCASRT.com

## 头部尾部代码注入，支持 HTML
FOOTER_INJECT=FOOTER_INJECT
HEADER_INJECT=HEADER_INJECT

## SEO 配置项，可不让搜索引擎索引内容
NO_FOLLOW=false
NO_INDEX=false

## Sentry 配置项，收集服务端报错
SENTRY_AUTH_TOKEN=SENTRY_AUTH_TOKEN
SENTRY_DSN=SENTRY_DSN
SENTRY_PROJECT=SENTRY_PROJECT

## Telegram 主机名称和静态资源代理，不建议修改
TELEGRAM_HOST=telegram.dog
STATIC_PROXY=

## 启用谷歌站内搜索
GOOGLE_SEARCH_SITE=memo.miantiao.me

## 启用标签页, 标签使用英文逗号分割
TAGS=标签A,标签B,标签C

## 展示评论
COMMENTS=true

## 链接页面中的超链接, 使用英文逗号和分号分割
LINKS=Title1,URL1;Title2,URL3;Title3,URL3;

## 侧边栏导航项, 使用英文逗号和分号分割
NAVS=Title1,URL1;Title2,URL3;Title3,URL3;
```

## 运行

```bash
pnpm run dev
```

- 打开浏览器，访问 `http://localhost:4321`，即可查看本地运行的微型博客。
  **注意事项：**

## 常见问题：

### `<no response> fetch failed`

```bash
Fetching https://telegram.dog/s/demo { before: '', after: '', q: '', type: 'list', id: '' }
22:15:07 [ERROR] [GET] "https://telegram.dog/s/demo": <no response> fetch failed
  Stack trace:
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    [...] See full stack trace in the browser, or rerun with --verbose.
  Caused by:
  fetch failed
    at node:internal/deps/undici/undici:12502:13
    [...] See full stack trace in the browser, or rerun with --verbose.
```

1. 可能是自身电脑的网络不稳定，如果 `telegram.dog` 不可用，尝试切换到其他镜像站点，例如 `https://t.me/` 修改项目代码中与抓取 Telegram 数据相关的部分，将 `https://telegram.dog` 替换为 `https://t.me`。

> 目前还没有更好的办法，在国内的话本地项目没办法访问 tg 的网站，如果有更好的办法，欢迎在评论区讨论

2. 确保 `.env` 文件中的 `CHANNEL` 字段填写正确

### 为什么部署后内容为空？

- 检查频道是否是公开的，必须是公开的
- 频道用户名是字符串，不是数字
- 关闭频道 Restricting Saving Content 设置项
- 修改完环境变量后需要重新部署
- Telegram 会屏蔽一些敏感频道的公开展示， 可以通过访问 `https://t.me/s/频道用户名` 确认
