---
title: JeeSite-Vue3 框架使用汇总
publishDate: 2024-11-27 08:00:00
description: '在使用JeeSiteVue3中遇到的问题或者灵活的使用方法在这里记录，实时更新。'
tags:
  - JeeSite
  - Vue
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

## 打开关闭加载框
``` javascript
import { useLoading } from './hooks/useLoading';
const { getLoading, setLoading } = useLoading({
  loading: boolean
});
// 使用
const isLoad = getLoading()
setLoading(true)
```