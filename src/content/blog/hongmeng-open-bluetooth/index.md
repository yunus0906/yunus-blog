---
title: 部分鸿蒙系统的手机无法打开蓝牙 system permission denied.
publishDate: 2024-12-18 10:15:00
description: '解决鸿蒙系统的手机调用 wx.openBluetoothAdapter 失败'
tags:
  - uni-app
  - 微信小程序
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

鸿蒙系统的手机调用 wx.openBluetoothAdapter 失败，提示报错信息

```bash
打开蓝牙适配器失败: system permission denied.
```

## 解决：

这个版本用蓝牙会用到 `其他权限->附近设备` 这个权限。微信会弹框申请，如果用户拒绝了权限，将无法使用蓝牙。需要引导用户在设置页里手动开启权限。

![2024122308543357](http://blog.notd.cn/images/2024122308543357.jpg)