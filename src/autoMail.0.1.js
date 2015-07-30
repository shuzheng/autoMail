/**
*	autoMail v0.1
*	日期：2011-06-30
*	作者：张恕征
*	邮箱：469741414@qq.com
*	主页：http://www.zhangshuzheng.com/
*******************************************************************
*	升级详情：	v0.1	改进	1、规划头部版权和升级信息板式
*******************************************************************
*	Copyright (c) 2011, Zhang Shuzheng All rights reserved.
*/
(function($){
	$.fn.autoMail = function(options){
		var opts = $.extend({}, $.fn.autoMail.defaults, options);
		return this.each(function(){
			var $this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			
			var top = $this.offset().top + $this.height() + 6;
			var left = $this.offset().left;
			var $mailBox = $('<div id="mailBox" style="top:'+top+'px;left:'+left+'px;width:'+$this.width()+'px"></div>');
			$('body').append($mailBox);
			
			//设置高亮li
			function setEmailLi(index){
				$('#mailBox li').removeClass('cmail').eq(index).addClass('cmail');
			}
			//初始化邮箱列表
			var emails = o.emails;
			var init = function(input){
				//取消浏览器自动提示
				input.attr('autocomplete','off');
				//添加提示邮箱列表
				if(input.val()!=""){
					var emailList = '<p>请选择邮箱类型</p><ul>';
					for(var i = 0; i < emails.length; i++) {
						emailList += '<li>'+input.val()+'@'+emails[i]+'</li>';
					}
					emailList += '</ul>';
					$mailBox.html(emailList).show(0);
				}else{
					$mailBox.hide(0);
				}
				//添加鼠标事件
				$('#mailBox li').hover(function(){
					$('#mailBox li').removeClass('cmail');
					$(this).addClass('cmail');
				},function(){
					$(this).removeClass('cmail');
				}).click(function(){
					input.val($(this).html());
					$mailBox.hide(0);
				});
			}
			//当前高亮下标
			var eindex = -1;
			//监听事件
			$this.focus(function(){
				if($this.val().indexOf('@') == -1){
					init($this);
				}else{
					$mailBox.hide(0);
				}
			}).blur(function(){
				setTimeout(function(){
					$mailBox.hide(0);
				},1000);//
			}).keyup(function(event){
				if($this.val().indexOf('@') == -1){
					//上键
					if(event.keyCode == 40){
						eindex ++;
						if(eindex >= $('#mailBox li').length){
							eindex = 0;
						}
						setEmailLi(eindex);
					//下键
					}else if(event.keyCode == 38){
						eindex --;
						if(eindex < 0){
							eindex = $('#mailBox li').length-1;
						}
						setEmailLi(eindex);
					//回车键
					}else if(event.keyCode == 13){
						if(eindex >= 0){
							$this.val($('#mailBox li').eq(eindex).html());
							$mailBox.hide(0);
						}
					}else{
						eindex = -1;
						init($this);
					}
				}else{
					$mailBox.hide(0);
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
