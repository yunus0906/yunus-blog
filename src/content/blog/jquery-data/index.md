---
title: jQuery 获取 data-*属性值
publishDate: 2024-12-08 10:29:00
description: 'jQuery 属性使用'
tags:
  - jQuery
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

## jQuery 获取 data-属性值

```html
<div id="example" data-name="John" data-age="25"></div>
```

使用 `.data()` 获取属性值

```javascript
// 获取单个 data-* 属性值
var name = $("#example").data("name"); // "John"
var age = $("#example").data("age"); // 25
console.log(name, age);
```

## 注意事项

1. `.data()` 方法会自动处理 `data-*` 属性名的转化。例如：

- `data-user-name` 会映射为 `userName`。

- 直接使用 `.data('userName')` 即可。

2. 如果你希望获取属性的原始值（不经过 jQuery 的缓存），可以用原生的 `.attr()` 方法：

```javascript
var rawName = $("#example").attr("data-name"); // "John"
console.log(rawName);
```

动态添加的 `data-*` 属性如果是在 DOM 渲染后动态添加了 `data-*` 属性，`.data()` 方法可能无法检测到。可以直接使用 `.attr()` 方法：

```javascript
$("#example").attr("data-city", "New York");

// 使用 attr 获取动态添加的值
var city = $("#example").attr("data-city"); // "New York"

// 使用 data 获取动态添加的值（无效，需手动刷新缓存）
console.log($("#example").data("city")); // undefined
```

如需让 `.data()` 获取动态添加的值，可以手动刷新缓存：

```javascript
$("#example").data("city", "New York");
var city = $("#example").data("city"); // "New York"
console.log(city);
```
