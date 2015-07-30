/**
*	autoMail v0.3
*	日期：2013-11-12
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
*	Copyright (c) 2013, Zhang Shuzheng All rights reserved.
*/
(function($){

	$.fn.autoMail = function(options){
		/*面板样式*/
		var style = '<style type="text/css">\n'+
						'.autoMail{position:absolute;z-index:9999;*width:250px;background:#fff;border:1px solid #e5e5e5;font-size:12px;padding:2px;font-family:Georgia;display:none;}\n'+
						'.autoMail .autoMailTip{width:100%;margin:0;padding:0;height:30px;line-height:30px;text-indent:10px;font-size:12px;color:#999;border-bottom:1px solid #E5E5E5;cursor:default;clear:both;overflow:hidden;}\n'+
						'.autoMail ul{width:100%;margin:0;padding:0;background:#f5f5f5;overflow:hidden;}\n'+
						'.autoMail ul li{width:100%;list-style:none;height:32px;line-height:30px;text-indent:10px;border-top:1px solid #fff;border-bottom:1px solid #E5E5E5;color:#666;cursor:pointer;overflow:hidden;}\n'+
						'.autoMail .cmail{background:#e5e5e5;color:#000;}\n'+
						'.autoMail .getAutoMail{text-align:right;background:#fff;border-top:1px solid #fff;height:20px;line-height:1.5em;padding:2px 5px;font-size:10px;-webkit-transform:scale(0.8);float:right;}\n'+
						'.autoMail .getAutoMail a{color:#b5b5b5;text-decoration:none;}\n'+
					'</style>';
		$('head').append(style);
		/*主体功能*/
		var opts = $.extend({}, $.fn.autoMail.defaults, options);
		return this.each(function(i){
			//获取初始化参数
			var $this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			
			//页面插入下拉列表html
			var $autoMail = $('<div class="autoMail""></div>');
			$('body').append($autoMail);
			
			//设置高亮li
			function setEmailLi(index){
				$('.autoMail li').removeClass('cmail').eq(index).addClass('cmail');
			}
			//初始化邮箱列表
			var emails = o.emails;
			var init = function(input){
				//取消浏览器自动提示
				input.attr('autocomplete','off');
				//添加提示邮箱列表
				if(input.val()!=""){
					var emailList = '<div class="autoMailTip">请选择邮箱类型</div><ul>';
					for(var i = 0; i < emails.length; i++) {
						emailList += '<li>'+input.val()+'@'+emails[i]+'</li>';
					}
					emailList += '</ul><div class="getAutoMail"><a href="http://www.zhangshuzheng.com/" target="_blank">&copy;autoMail</a></div>';
					$autoMail.html(emailList).show(0);
				}else{
					$autoMail.hide(0);
				}
				//添加鼠标事件
				$('.autoMail li').hover(function(){
					$('.autoMail li').removeClass('cmail');
					$(this).addClass('cmail');
				},function(){
					$(this).removeClass('cmail');
				}).click(function(){
					input.val($(this).html());
					$autoMail.hide(0);
				});
			}
			//当前高亮下标
			var eindex = -1;
			//监听事件
			$this.focus(function(){
				$autoMail.css({'top':$this.offset().top+$this.height()+6+'px','left':$this.offset().left+'px'});
				if($this.val().indexOf('@') == -1){
					init($this);
				}else{
					$autoMail.hide(0);
				}
			}).blur(function(){
				setTimeout(function(){
					$autoMail.hide(0);
				},1000);
			}).keyup(function(event){
				if($this.val().indexOf('@') == -1){
					//上键
					if(event.keyCode == 40){
						eindex ++;
						if(eindex >= $('.autoMail li').length){
							eindex = 0;
						}
						setEmailLi(eindex);
					//下键
					}else if(event.keyCode == 38){
						eindex --;
						if(eindex < 0){
							eindex = $('.autoMail li').length-1;
						}
						setEmailLi(eindex);
					//回车键
					}else if(event.keyCode == 13){
						if(eindex >= 0){
							$this.val($('.autoMail li').eq(eindex).html());
							$autoMail.hide(0);
						}
					}else{
						eindex = -1;
						init($this);
					}
				}else{
					$autoMail.hide(0);
				}
			//如果在表单中，防止回车提交
			}).keydown(function(event){
				if(event.keyCode == 13){
					return false;
				}
			});
		});
	}
	$.fn.autoMail.defaults = {
		emails:[]
	}
})(jQuery);
