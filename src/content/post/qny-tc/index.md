---
title: 基于七牛云搭建Markdown的图床
publishDate: 2024-11-12 18:00:00
description: '使用PicGo+七牛云搭建图床，实现图片上传存储，在VSCode中编写文章。'
tags:
  - Markdown
  - PicGo
  - VSCode
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---


## 前言
> 网络上有很多基于PicGo+Markdown的教程了，在下面[参考文章](#参考文章)中，各文章都写的非常好，这里不多赘述。
> 
我的电脑上只有VSCode，所以就选择了**VSCode+PicGo插件+七牛云**来编写笔记。

七牛云需要绑定一个已备案的域名，新建好七牛云的存储空间之后给一个30天的临时域名，可以搭建好图床之后，抽时间完成域名购买和备案。如果已经购买好域名，可以先看[已备案域名](#绑定已备案域名)，准备好之后再配置七牛云。

## 准备工作

### 七牛云配置
1. 注册[七牛云](https://portal.qiniu.com/signup)，完成实名认证。可以免费使用10GB空间。
2. 打开工作台，找到[存储空间-新建存储空间](https://portal.qiniu.com/kodo/bucket).或者进入存储空间后再点击新建空间。***选择访问控制类型为公开空间***。
   
   ![tuchuang_3_2024-10-29_16-48-16](http://blog.notd.cn/images/tuchuang_3_2024-10-29_16-48-16.png)
3. 30天的临时域名，如果已经准备好域名，可以先看[已备案域名](#已备案域名)，下面的域名就按照配置好的域名就行。
   
   ![Snipaste_2024-10-29_16-57-23](http://blog.notd.cn/images/Snipaste_2024-10-29_16-57-23.png)
4. 可以在文件管理中创建目录`images/`用于存放图片。

### 绑定已备案域名
我的域名是阿里云（<https://wanwang.aliyun.com/>）买的，自己根据自己需求购买就好。

2. 购买好域名，例如：`www.xxx.com`，找到域名管理->域名列表，点击`解析`->`添加记录`。我这里解析一个`blog`的二级域名。记录类型选择`CNAME`。记录值一会在七牛云获取，这里先随便写一个。
   
   ![Snipaste_2024-10-30_09-03-26](http://blog.notd.cn/images/Snipaste_2024-10-30_09-03-26.png)
   ![Snipaste_2024-10-30_09-12-18](http://blog.notd.cn/images/Snipaste_2024-10-30_09-12-18.png)
3. 返回七牛云存储空间打开添加域名，加速域名中输入刚刚解析的域名。其他参数默认就可以。
   
   ![Snipaste_2024-10-30_09-15-29](http://blog.notd.cn/images/Snipaste_2024-10-30_09-15-29.png)
4. 配置完成之后它会返回域名管理页面，点击复制`CNAME`的参数，将其粘贴到阿里云域名管理页面的`记录值`中。
   
   ![Snipaste_2024-10-30_09-18-26](http://blog.notd.cn/images/Snipaste_2024-10-30_09-18-26.png)
5. 保存后返回七牛云存储空间，点击刷新，刷新之后会看到`已配置`，说明配置成功。到这一步已经可以使用了，如果为了安全起见，还是配置一下HTTPS。
6. **配置HTTPS**：再阿里云控制台搜索`SSL证书`，打开`数字证书管理服务`->`SSL证书管理`->`个人测试证书(原免费证书)`。点击创建证书，证书类型选择免费证书。也可以购买。看个人需求。域名名称就是上述步骤中绑定的域名。
   
   ![Snipaste_2024-10-30_09-29-14](http://blog.notd.cn/images/Snipaste_2024-10-30_09-29-14.png)
7. 确认后点击`证书申请`，填好自己的信息，提交审核。静候邮件就可以了。我这里用时15分钟。
8. 回到`SSL证书管理`页面，找到刚刚申请的证书，点击下载，选择`Nginx`，然后下载。
   
9.  返回七牛云，打开`空间设置`->`域名管理`->`自动逸CDN加速域名`，打开自己的域名，找到`HTTPS配置`->`修改配置`，上传刚刚下载的文件。保存即可。
    
   ![Snipaste_2024-10-30_10-54-17](http://blog.notd.cn/images/Snipaste_2024-10-30_10-54-17.png)
   ![Snipaste_2024-10-30_10-55-15](http://blog.notd.cn/images/Snipaste_2024-10-30_10-55-15.png)
10. 再将自己的域名保存到`PicGo`拆建的Url,请看下文。

### VSCode配置
1. 编写Markdown先下载`Markdown All in One`插件,可以预览。
   
   ![Snipaste_2024-10-29_17-10-09](http://blog.notd.cn/images/Snipaste_2024-10-29_17-10-09.png)
2. 下载`PicGo`插件，点击设置。
   ![Snipaste_2024-10-29_17-11-49](http://blog.notd.cn/images/Snipaste_2024-10-29_17-11-49.png)
   ![Snipaste_2024-10-29_17-17-01](http://blog.notd.cn/images/Snipaste_2024-10-29_17-17-01.png)
3. 配置关键参数 `PicGo/Pic Bed:Current`，首先必须要设置为`qiniu`
   
   ![Snipaste_2024-10-29_17-18-40](http://blog.notd.cn/images/Snipaste_2024-10-29_17-18-40.png)
4. 配置其他参数 `PicGo/Pic Bed/Qiniu:`, `AccessKey`、`SecretKey`、`Area`、`Path`、`Options`、`Bucket`、`Url`。[Area选择区域文档](https://developer.qiniu.com/kodo/1671/region-endpoint-fq)。
   
   ```
   AccessKey: 在七牛云->个人中心->密钥管理->Access Key
   SecretKey: 在七牛云->个人中心->密钥管理->Secret Key
   Area: 选择区域:
      华东-浙江 z0
      华东-浙江2 cn-east-2
      华北-河北 z1
      华南-广东 z2
      北美-洛杉矶 na0
      亚太-新加坡（原东南亚） as0
      亚太-河内 ap-southeast-2
      亚太-胡志明 ap-southeast-3
   Path: 保存到路径，例如：images/，没有的留空。
   Options: 上传选项，可以不填。
   Bucket: 七牛云存储空间名称，就是自己创建好的名字。
   Url: 七牛云存储空间绑定的域名，没有绑定就填写临时域名。
   ```
5. 配置完成之后，使用快捷键上传图片。
   ```
      // 可以在设置中更改上传快捷键
      Ctrl+Alt+U 从剪切板粘贴上传
      Ctrl+Alt+E 从文件选择上传
      Ctrl+Alt+O 从文件路径上传
   ```
   上传之后提示`PicGo: image uploaded successfully.`则上传成功。

## 遇到的问题
上传成功但是打开遇到下图问题，这是绑定的临时域名之后会出现的问题，可以通过绑定自己的域名解决，也可以去七牛云的文件管理中将该图片的CDN复制下来放到Markdown中。

![20241030084427](http://blog.notd.cn/images/20241030084427.png)

## 参考文章
> [Markdown自建云图床（七牛云+PicGo）使用指南](https://blog.zwbcc.cn/archives/1694871257806)
>
> [使用Typora+PicGo+七牛云搭建图床，实现图片上传存储](https://kailin.blog/miscellanies/typora/)
>
> [七牛云图床和Markdown使用](https://www.cnblogs.com/ssgeek/p/10854839.html)
>
> [七牛云+picGo：搭建图床](https://www.cnblogs.com/chenzibai/p/17203006.html)
>
> [基于七牛云搭建Markdown图床](http://www.yelldo.fun/2020/07/05/my_blog/%E5%B7%A5%E4%BD%9C%E6%95%88%E7%8E%87/%E5%9F%BA%E4%BA%8E%E4%B8%83%E7%89%9B%E4%BA%91%E5%9B%BE%E5%BA%8A%E6%90%AD%E5%BB%BA/)
>
> [VSCode配置PicGo将图片文件上传到七牛云图床](https://www.xcstar.com.cn/index.php/archives/25/)