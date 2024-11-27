---
title: JeeSite 框架使用汇总
publishDate: 2024-11-27 08:00:00
description: '在使用JeeSite中遇到的问题或者灵活的使用方法在这里记录，实时更新。'
tags:
  - JeeSite
  - jQuery
  - SpringBoot
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

## 重写列表查询点击事件
``` javascript
// 移除submit事件再添加submit，方法内判断验证是否通过，判断cardNo状态是false时刷新表格。
$("#searchForm").unbind('submit').submit(function(e){
  let validate = $("#searchForm").validate();
  if ( !validate.invalid.cardNo) {
    $("#dataGrid").dataGrid('refresh', 1);
  }
  return false;
});
```

## 使用 jQuery布局插件UI Layout
``` javascript
$(function(){  
	var myLayout =$("body").layout({     
		applyDefaultStyles: true,			//应用默认样式  
		scrollToBookmarkOnLoad:false,	//页加载时滚动到标签  
		showOverflowOnHover:false,		//鼠标移过显示被隐藏的，只在禁用滚动条时用。  
		north__closable:false,				*//可以被关闭  
		north__resizable:false,				*//可以改变大小  
		north__size:50,								*//pane的大小
		spacing_open:8,								//边框的间隙  
		spacing_closed:60,						//关闭时边框的间隙  
		resizerTip:"可调整大小",				//鼠标移到边框时，提示语  
		//resizerCursor:"resize-p" 		//鼠标移上的指针样式  
		resizerDragOpacity:0.9,				//调整大小边框移动时的透明度  
		maskIframesOnResize:"#ifa",		//在改变大小的时候，标记iframe（未通过测试）  
		sliderTip:"显示/隐藏侧边栏",		//在某个Pane隐藏后，当鼠标移到边框上显示的提示语。  
		sliderCursor:"pointer",				//在某个Pane隐藏后，当鼠标移到边框上时的指针样式。  
		slideTrigger_open:"dblclick",	//在某个Pane隐藏后，鼠标触发其显示的事件。(click", "dblclick", "mouseover)  
		slideTrigger_close:"click",		//在某个Pane隐藏后，鼠标触发其关闭的事件。("click", "mouseout")  
		togglerTip_open:"关闭",				//pane打开时，当鼠标移动到边框上按钮上，显示的提示语  
		togglerTip_closed:"打开",			//pane关闭时，当鼠标移动到边框上按钮上，显示的提示语  
		togglerLength_open:100,				//pane打开时，边框按钮的长度  
		togglerLength_closed:200,     //pane关闭时，边框按钮的长度  
		hideTogglerOnSlide:true,      //在边框上隐藏打开/关闭按钮(测试未通过)  
		togglerAlign_open:"left",     //pane打开时，边框按钮显示的位置  
		togglerAlign_closed:"right",  //pane关闭时，边框按钮显示的位置  
		togglerContent_open:          //pane打开时，边框按钮中需要显示的内容可以是符号"<"等。需要加入默认css样式.ui-layout-toggler .content 
			"<div style='background:red'>AAA</div>",  
		togglerContent_closed:"<img/>",//pane关闭时，同上。  
		enableCursorHotkey:true,       //启用快捷键CTRL或shift + 上下左右。  
		customHotkeyModifier:"shift",  //自定义快捷键控制键("CTRL", "SHIFT", "CTRL+SHIFT"),不能使用alt  
		south__customHotkey:"shift+0", //自定义快捷键（测试未通过）  
		fxName:"drop",								 //打开关闭的动画效果  
		fxSpeed:"slow",								 //动画速度  
		//fxSettings: { duration: 500, easing: "bounceInOut" }//自定义动画设置(未通过测试)  
		//initClosed:true,//初始时，所有pane关闭  
		//initHidden:true //初始时，所有pane隐藏  
		onresize :ons,								 //调整大小时调用的函数  
		onshow_start:start,  
		onshow_end:end  
		/* 
		其他回调函数 
		
		显示时调用 
		onshow = "" 
		onshow_start = ""  
		onshow_end = ""  
		隐藏时调用 
		onhide = ""  
		onhide_start = ""  
		onhide_end = ""  
		打开时调用 
		onopen = ""  
		onopen_start = ""  
		onopen_end = ""  
		关闭时调用 
		onclose = ""  
		onclose_start = ""  
		onclose_end = ""  
		改变大小时调用 
		onresize = ""  
		onresize_start = ""  
		onresize_end = ""  
		*/  
	});
});  
```