define(function (require, exports, module){
	var $ = require('zepto');
	var frozen = require('frozen');


	Zepto(function($){
		var textarea = $('#bul-textarea');
		var sizeSel = $('#size-select .ui-select select');
		var colorSel = $('#color-select .ui-select select');
		var regUnSafety = /(link)|(script)|(style)/gi;

		var bulletDialog = function(option, cb){
			if(!$.dialog || typeof $.dialog == 'undefined'){
				alert(option.content);
				return;
			}
			var dialogOption = {
		        title:'对话框',
		        content:'温馨提示内容',
		        button:["确认","取消"]
		    };

		    $.extend(dialogOption, option);

			var dia=$.dialog(dialogOption);

		    dia.on("dialog:action",function(e){
		        console.log(e.index);
		        cb && cb();
		    });
		    dia.on("dialog:hide",function(e){
		        console.log("dialog hide");
		        cb && cb();
		    });
		};

		//console.log($);
		$('#btn-bullet-submit').on('tap', function(){
			var sData = {
				txt: textarea.val(),
				size: sizeSel.val(),
				color: colorSel.val()
			};

			if(sData.txt == ''){
				bulletDialog({
					title: '子弹为组装未完成',
					content: '弹幕内容不能为空'
				});
				return;
			}

			if(regUnSafety.test(sData.txt)){
				bulletDialog({
					title: '子弹为组装未完成',
					content: '弹幕内容不能包含危险脚本'
				});				
				return;
			}

			$.post('/ajaxs/addBullet', sData, function (res){
				console.log(res);
				if(res.errorCode == 0){
					//textarea.val('');
					bulletDialog({
						title: '子弹装填完成',
						content: '发射成功'
					});
				}
				
			});
		});


		$('#btn-bullet-clean').on('tap', function(){
			textarea.val('');
		});

	});

});