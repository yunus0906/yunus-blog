---
title: JeeSite 框架使用汇总
publishDate: 2024-11-27 11:02:00
description: '在使用JeeSite中遇到的问题或者灵活的使用方法在这里记录，实时更新。'
tags:
  - JeeSite
  - jQuery
  - SpringBoot
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---

## 自定义 Select 组件

``` html
<div class="form-group">
    <label class="control-label">${text('小区')}：</label>
    <div class="control-inline">
        <#form:treeselect id="community" title="小区选择"
        path="heatUser.communityId"
        labelPath="heatUser.communityName"
        url="${ctx}/basic/community/treeData"
        callbackFuncName="callbackFuncFindBuildingName"
        class="" allowClear="true"/>
    </div>
</div>
<div class="form-group">
    <label class="control-label">${text('楼栋')}：</label>
    <div class="control-inline width-90">
        <select id="heatUser_buildingName" name="heatUser.buildingName" class="form-control">
            <option value="">&nbsp;</option>
        </select>
    </div>
</div>
```

``` javascript
$('#heatUser_buildingName').on('select2:select', function (e) {
	callbackFuncFindUnitName();
	$('#HouseNumberList').val('').trigger("change");
});

function callbackFuncFindBuildingName() {
	if (!$('#communityCode').val()){
		$('#heatUser_buildingName').html('<option value="">&nbsp;</option>');
		return;
	}
	js.ajaxSubmit('${ctx}/basic/heatUser/findBuildingName', {
		communityId: $('#communityCode').val()
	}, function(data){
		$('#heatUser_buildingName').html('<option value="">&nbsp;</option>');
		if (data.length === 0) {
			return;
		}
		data.forEach(function(item) {
			$('#heatUser_buildingName').append('<option value="'+item+'">'+item+'</option>')
		})
		callbackFuncFindUnitName();
	})
}
```


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

## 自定义列表跨列功能
``` javascript
function mergeCellsForColumns(columnName) {
	const gridId = "dataGrid";
	let rows = $("#" + gridId + ",#" + gridId + "__frozen").find(">tbody>tr:gt(0):not(.jqgroup)");
	// 选择器：获取 ID 为 gridId 和 gridId + "__frozen" 的元素，查找tbody下所有tr，过滤掉第一行(索引0)和jqgroup类的行

	let firstCell = rows.eq(0).children("[aria-describedby='" + gridId + "_" + columnName + "']"),
			columnIndex = firstCell.index(), // 获取该元素在行中的索引
			rowspanCount = 1; // 初始化计数器rowspanCount

	rows.slice(1).each(function(rowIndex, row) {
		let currentCell = $(row).children("td").eq(columnIndex); // 获取当前tr中的指定列

		if (firstCell.text() === currentCell.text()) {
			rowspanCount++; // 如果该单元格的文本与前一个相同，增加计数器rowspanCount
			currentCell.hide(); // 隐藏该单元格
		} else {
			firstCell.attr("rowspan", rowspanCount); // 否则，给当前单元格设置rowspan属性，表示跨行
			// firstCell.text(inletTempList[firstCell.text()]); // 添加自定义展示内容
			firstCell = currentCell; // 更新当前单元格为新的单元格
			rowspanCount = 1; // 重置计数器rowspanCount
		}
		firstCell.attr("rowspan", rowspanCount); // 最后再设置当前单元格的rowspan
	})
}
```