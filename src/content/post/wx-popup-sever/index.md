---
title: 微信小程序开发 用户隐私弹窗 解决方案
publishDate: 2024-11-18 10:31:49
description: '微信小程序隐私弹窗功能。'
tags:
  - 微信小程序
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---


## 微信小程序开发 用户隐私弹窗 解决方案


## 前言
> 微信小程序隐私弹窗功能，代码写过很多次了，在这里存个教程的档，希望能帮助到迷茫的人。

## 代码逻辑
### 什么情况下要用到用户隐私弹窗
如下图，当你的小程序要获取以下信息时，就需要同意隐私弹窗。否则小程序审核的时候就会失败。

![20241118143354](http://blog.notd.cn/images/20241118143354.png)

### 隐私条款在哪编写
1. 可以在小程序代码中实现隐私条款页面，创建一个页面，在页面中编写隐私条款。直接跳转到页面即可。
2. 可以在`腾讯文档`中写好隐私条款，再通过跳转方法，半屏或者全屏打开腾讯文档 [腾讯文档开发者文档](https://docs.qq.com/open/document/app/mini-program/jump-mp/jump_from_mp.html)

    ```js
    wx.navigateToMiniProgram({
        appId: 'wxd45c635d754dbf59',
        path: 'pages/detail/detail?url=' + encodeURIComponent('https://docs.qq.com/doc/DVmtlZUVtVGxQZFp3'),
    });
    ```
3. 使用`wx.openPrivacyContract()`方法直接打开小程序`隐私协议开发指南`[文档](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html)，本教程也是使用的这个办法，首先要在`微信开发平台->设置->服务内容声明`完善好`用户隐私保护指引`。

![20241118144619](http://blog.notd.cn/images/20241118144619.png)

## 代码实现
当了解了以上步骤之后，我们就可以开始开发，接下来我们要知道获取/同意 当前小程序的隐私内容。

[`wx.requirePrivacyAuthorize()`](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/privacy/wx.requirePrivacyAuthorize.html) 模拟隐私接口调用，并触发隐私弹窗逻辑。

[`wx.onNeedPrivacyAuthorization()`](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/privacy/wx.onNeedPrivacyAuthorization.html)调用 wx.requirePrivacyAuthorize 接口来模拟隐私接口调用，并且用户还未同意过隐私协议时如果用户已经同意过隐私协议，则不会再触发 onNeedPrivacyAuthorization 事件。

[`wx.openPrivacyContract`](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/privacy/wx.openPrivacyContract.html) 跳转至隐私协议页面。

### 配置信息
在`app.json`中配置。
```js 
    "__usePrivacyCheck__": true,
    "usingComponents": {
        "privacy-popup": "/components/privacyPopup/privacyPopup"
    },
```
文档中写在2023年10月17日之后， `app.json` 中不配置`__usePrivacyCheck__`隐私相关功能都会启用。但是亲测(2024年11月)不生效，还得配置。

### 弹窗组件使用
在需要弹出弹窗的页面添加以下代码
``` html
<!--html-->
<privacy-popup id="privacy-popup"/>
```
``` js
// js
//入口
onReady(){
    // 弹窗组件的tabBarPageShow方法，用于在页面显示时调用，避免在页面隐藏时弹窗
    this.selectComponent('#privacy-popup').tabBarPageShow();
},

// 在点击某个按钮时使用下面代码，如果用户同意了隐私协议，则进行某些操作
if (wx.requirePrivacyAuthorize) {
    wx.requirePrivacyAuthorize({
        success: res => {
        console.log('用户同意了隐私协议 或 无需用户同意隐私协议')
        // 如：进入某页面，在这里写
        },
        fail: res => {
        console.log('用户拒绝了隐私协议')
        }
    })
}

// 非TabBar页面，在页面隐藏时需要销毁弹窗组件。
onUnload(){
    this.selectComponent('#privacy-popup').disPopUp()
},
```

### 弹窗组件
通常在`components`目录下创建一个文件夹，存放弹窗组件，如：`privacyPopup`
```json
// privacyPopup.json
// 我这里用的是 tdesign 的UI组件，可以根据自己项目进行修改。
{
    "component": true,
    "usingComponents": {
      "t-popup": "tdesign-miniprogram/popup/popup",
      "t-icon": "tdesign-miniprogram/icon/icon",
      "t-button": "tdesign-miniprogram/button/button"
    }
}
```

``` js
// privacyPopup.js
let privacyHandler
let privacyResolves = new Set()
let closeOtherPagePopUpHooks = new Set()

if (wx.onNeedPrivacyAuthorization) {
  wx.onNeedPrivacyAuthorization(resolve => {
    if (typeof privacyHandler === 'function') {
      privacyHandler(resolve)
    }
  })
}

const closeOtherPagePopUp = (closePopUp) => {
  closeOtherPagePopUpHooks.forEach(hook => {
    if (closePopUp !== hook) {
      hook()
    }
  })
}

Component({
  data: {
    // 在这里编写你要写的提示信息
    title: "用户隐私保护提示",
    desc1: "感谢您使用本小程序，您使用本小程序前应当阅井同意",
    urlTitle: "《用户隐私保护指引》",
    desc2: "当您点击同意并开始时用产品服务时，即表示你已理解并同息该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法使用本小程序的所有功能。",
    innerShow: false,
    height: 0,
  },
  lifetimes: {
    attached: function() {
      const closePopUp = () => {
        this.disPopUp()
      }
      privacyHandler = resolve => {
        privacyResolves.add(resolve)
        this.popUp()
        // 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
        closeOtherPagePopUp(closePopUp)
      }
      
      this.closePopUp = closePopUp
      closeOtherPagePopUpHooks.add(this.closePopUp)
    },
    detached: function() {
      closeOtherPagePopUpHooks.delete(this.closePopUp)
    }
  },
  methods: {
    handleAgree(e) {
      this.disPopUp()
      // 这里演示了同时调用多个wx隐私接口时要如何处理：让隐私弹窗保持单例，点击一次同意按钮即可让所有pending中的wx隐私接口继续执行 （看page/index/index中的 wx.getClipboardData 和 wx.startCompass）
      privacyResolves.forEach(resolve => {
        resolve({
          event: 'agree',
          buttonId: 'agree-btn'
        })
      })
      privacyResolves.clear()
    },
    handleDisagree(e) {
      this.disPopUp()
      privacyResolves.forEach(resolve => {
        resolve({
          event: 'disagree',
        })
      })
      privacyResolves.clear()
    },
    popUp() {
      if (this.data.innerShow === false) {
        this.setData({
          innerShow: true
        })
      }
    },
    disPopUp() {
      if (this.data.innerShow === true) {
        this.setData({
          innerShow: false
        })
      }
    },
    openPrivacyContract() {
      wx.openPrivacyContract({
        success: res => {
          console.log('openPrivacyContract success')
        },
        fail: res => {
          console.error('openPrivacyContract fail', res)
        }
      })
    },
    tabBarPageShow() {
      if (this.closePopUp) {
        privacyHandler = resolve => {
          privacyResolves.add(resolve)
          this.popUp()
          // 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
          closeOtherPagePopUp(this.closePopUp)
        }
      }
    }
  }
})

``` 

``` html
<!-- privacyPopup.wxml -->
<t-popup visible="{{innerShow}}"  placement="center">
    <view class="block">
        <view>
        <text style="font-weight: bold;">{{title}}</text>
        <view class="weui-half-screen-dialog__bd">
            <view class="weui-half-screen-dialog__tips">{{desc1}}</view>
            <view class="weui-half-screen-dialog__tips" style="color:blue" bindtap="openPrivacyContract">{{urlTitle}}</view>
            <view class="weui-half-screen-dialog__tips">{{desc2}}</view>
            <view style="margin-top: 32rpx; display: flex;">
            <t-button theme="primary" bindtap="handleDisagree" variant="outline">不同意</t-button>
            <t-button id="agree-btn"
                type="default"
                theme="primary"
                open-type="agreePrivacyAuthorization"
                bindagreeprivacyauthorization="handleAgree"
            >同意并继续</t-button>
            </view>
        </view>
        </view>
        <t-icon t-class="close-btn" name="close-circle" size="64rpx" color="#fff" bind:tap="handleDisagree" />
    </view>
</t-popup>
```

``` css
/** privacyPopup.wxss */
.block {
    position: relative;
    width: 260px;
    height: 280px;
    padding: 24rpx;
    background: var(--td-bg-color-container);
    border-radius: 16rpx;
}

.close-btn {
    position: absolute;
    left: 50%;
    margin-left: -32rpx;
    bottom: calc(-1 * (48rpx + 64rpx));
}

.weui-half-screen-dialog__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
    padding-bottom: 112rpx;
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.9);
}
.weui-half-screen-dialog__tips {
    padding-top: 32rpx;
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.4;
}
```