/**
*	autoMail v0.4
*	日期：2014-01-18
*	作者：张恕征
*	邮箱：469741414@qq.com
*	主页：http://www.zhangshuzheng.cn/
*******************************************************************
*	升级详情：	v0.1	改进	1、规划头部版权和升级信息板式
*******************************************************************
*				v0.2	改进	1、input获取焦点后再定位，解决定位错误的问题
*******************************************************************
*				v0.3	改进	1、样式文件封装进来，使用时只需要一个js文件
*						改进	2、美化面板样式
*						新增	1、支持一个页面多个input输入框调用
*						新增	2、右下角增加官网链接
*						BUG		1、多个input的时候，上下按键选项有问题
*******************************************************************
*				v1.0	改进	1、支持多个input上下按键选择
*						改进	2、当面板显示状态，禁止回车提交，使用了keypress事件，兼容了IE
*						改进	3、禁止输入空格键
*						改进	4、当input各种height各种padding时，也能精确定位
*						改进	5、鼠标事件改为mousedown，在blur之前执行，防止点击失败
*						改进	6、兼容IE6/IE7下宽度也可以随内容长度自动拉宽
*******************************************************************
*	加密压缩工具：http://tool.chinaz.com/js.aspx 混淆加密 记得多加混淆前缀
*	解密美化工具：http://js.clicki.cn/ 解压
*******************************************************************
*	Copyright (c) 2014, Zhang Shuzheng All rights reserved.
*/
(function($){

	$.fn.autoMail = function(options){
		/*面板样式*/
		var style = '<style type="text/css">\n'+
						'.autoMail{position:absolute;z-index:9999;background:#fff;border:1px solid #e5e5e5;font-size:12px;padding:2px;font-family:Georgia;display:none;}\n'+
						'.autoMail .autoMailTip{margin:0;padding:0;line-height:30px;text-indent:10px;font-size:12px;color:#999;border-bottom:1px solid #E5E5E5;cursor:default;}\n'+
						'.autoMail ul{margin:0;padding:0;background:#f5f5f5;}\n'+
						'.autoMail ul li{list-style:none;line-height:30px;text-indent:10px;border-top:1px solid #fff;border-bottom:1px solid #E5E5E5;color:#666;cursor:pointer;}\n'+
						'.autoMail .cmail{background:#e5e5e5;color:#000;}\n'+
						'.autoMail .autoMailCopy{text-align:right;background:#fff;border-top:1px solid #fff;line-height:1.5em;padding:2px 5px;font-size:10px;-webkit-transform:scale(0.8);}\n'+
						'.autoMail .autoMailCopy a{color:#b5b5b5;text-decoration:none;}\n'+
					'</style>';
		$('head').append(style);
		/*主体功能*/
		var opts = $.extend({}, $.fn.autoMail.defaults, options);
		return this.each(function(i){
			//获取初始化参数
			var $this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			
			//页面插入空下拉列表html
			var $autoMail = $('<div class="autoMail""></div>');
			$('body').append($autoMail);
			
			//设置高亮li
			function setEmailLi(index){
				$('.autoMail').eq(i).find('li').removeClass('cmail').eq(index).addClass('cmail');
				//防止上下键时 光标跳动*
				return false;
			}
			//初始化邮箱列表
			var emails = o.emails;
			//当前选中li下标
			var eindex = -1;
			//初始化填充下拉列表
			var init = function(input){
				//取消浏览器自动提示
				input.attr('autocomplete','off');
				//添加提示邮箱列表
				if(input.val()!=""){
					var emailList = '<div class="autoMailTip">请选择邮箱类型 ↓</div><ul>';
					for(var i = 0; i < emails.length; i++) {
						emailList += '<li>'+input.val()+'@'+emails[i]+'</li>';
					}
					emailList += '</ul><div class="autoMailCopy"><a href="http://www.zhangshuzheng.cn/" target="_blank">&copy;autoMail</a></div>';
					$autoMail.html(emailList).show();
				}
				//添加鼠标事件
				$('.autoMail li').hover(function(){
					$(this).addClass('cmail');
				},function(){
					$(this).removeClass('cmail');
				}).mousedown(function(){//用mousedown事件，在blur事件之前执行，防止面板消失点击失败
					input.val($(this).html()).focus();
					$autoMail.hide();
				});
			}
			//监听事件
			$this.focus(function(){
				//初始化下标
				eindex = -1;
				//初始化面板位置
				$autoMail.css({'top':$this.offset().top+$this.outerHeight(true)+'px','left':$this.offset().left+'px'});
				//控制显示时机
				if($this.val().indexOf('@') == -1){
					init($this);
				}
			}).blur(function(){
				//失去焦点后隐藏面板,延迟，for 点击版权链接
				$autoMail.delay(100).hide(0);
			}).keyup(function(e){
				if($this.val().indexOf('@') == -1){
					//上键
					if(e.keyCode == 40){
						eindex ++;
						if(eindex >= $('.autoMail').eq(i).find('li').length){
							eindex = 0;
						}
						setEmailLi(eindex);
					//下键
					}else if(e.keyCode == 38){
						eindex --;
						if(eindex < 0){
							eindex = $('.autoMail').eq(i).find('li').length-1;
						}
						setEmailLi(eindex);
					//回车键
					}else if(e.keyCode == 13){
						if(eindex >= 0){
							$this.val($('.autoMail').eq(i).find('li').eq(eindex).html());
							$autoMail.hide();
						}
					}else{
						eindex = -1;
						init($this);
					}
				}
			}).keypress(function(e){
				//禁止输入空格
				if(e.keyCode == 32){
					return false;
				}
				//当面板显示状态，禁止回车提交
				if(e.keyCode == 13){
					if(!$autoMail.is(":hidden")){
						return false;
					}
				}
			});
		});
	}
	$.fn.autoMail.defaults = {
		emails:[]
	}
})(jQuery);
