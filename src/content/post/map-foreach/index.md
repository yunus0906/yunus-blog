---
title: Map() forEach 循环 获取当前参数和Index
publishDate: 2024-12-16 09:36:00
description: 'javascript New Map() forEach 循环 获取当前参数和Index'
tags:
  - javascript
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

> 在 `Map.prototype.forEach` 方法中，`forEach` 的回调函数参数只提供 **value** 、**key** 和 **Map 本身** ，没有直接的 `index`。如果需要获取索引，可以通过以下方式实现。

## 方法一：使用外部计数器

```javascript
const mapData = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
  ["key3", "value3"],
]);

let index = 0;
mapData.forEach((value, key) => {
  console.log(`Index: ${index}, Key: ${key}, Value: ${value}`);
  index++;
});
```

## 方法二：转换为数组后使用索引

可以先使用 `Array.from()` 将 `Map` 转换为数组，利用数组的 `forEach`，它支持索引参数。

```javascript
const mapData = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
  ["key3", "value3"],
]);

Array.from(mapData).forEach(([key, value], index) => {
  console.log(`Index: ${index}, Key: ${key}, Value: ${value}`);
});
```

方法三：结合 `entries()` 和 `for-of`使用 `entries()` 和解构赋值，通过额外的计数器变量来实现索引。

```javascript
const mapData = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
  ["key3", "value3"],
]);

let index = 0;
for (const [key, value] of mapData.entries()) {
  console.log(`Index: ${index}, Key: ${key}, Value: ${value}`);
  index++;
}
```

## 输出示例

对于如下 `Map`：

```javascript
const mapData = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
  ["key3", "value3"],
]);
```

**输出结果** ：

```plaintext
Index: 0, Key: key1, Value: value1
Index: 1, Key: key2, Value: value2
Index: 2, Key: key3, Value: value3
```

推荐使用 **方法二** 或 **方法三** ，代码更加简洁且不容易出错。
