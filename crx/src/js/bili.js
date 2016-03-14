$.extend({
	getJsonUtf8: function(url, data, callback){
		$.ajax({
			dataType:'jsonp',
			url: url,
			data: data,
			jsonp: 'callback',
			async: true,
			contentType: "application/jsonp; charset=utf-8",
			success:function(json) {
			  	if(json){
			  		callback && callback(json);
			        // alert("内容提交成功！"); 
			  	} else {
			        // alert("内容提交失败！");
				}
			},
			error: function(err) {
			    //console.log(err);
			}
		});
	}
});

$(document).ready(function(){
	var bullet = {
		server: '127.0.0.1:8081',
		dom: {},
		onoff: true,
		speed: 1,
		longLinkTime: 0,
		RegTxt: (/(style)|(link)|(script)|(iframe)/gi),
		bullets: [],
		screenSize: {
			"width": $(window).width(),
			"height": $(window).height()
		},
		lastDate: (new Date()).getTime(),
		addBullets: function(arr){
			var that = this;
			// this.bullets.concat(arr);
			$.each(arr, function (i,v){
				that.bullets.push(v);
			});
		},
		txtSafety: function(txt){
			return this.RegTxt.test(txt);
		},
		showBullets: function(){
			var that = this;
			if(!that.onoff){return;}
			var showArr = [];
			showArr = showArr.concat(that.bullets);
			that.bullets.length = 0;
			$.each(showArr, function (iShow, vShow){
				that.txtSafety(vShow.txt);
				that.bulletAnimate(vShow);
			});
		},
		bulletAnimate: function(bullet){
			var that = this;
			var bTop = parseInt(Math.random()*(that.screenSize.height - 50), 10);
			var bLeft = that.screenSize.width;
			var bSpeed = 10000 / that.speed; 
			$('<p style="white-space:nowrap; position: fixed;left: '+bLeft+'px;top:'+bTop+'px;color:'+bullet.color+'; font-size:'+bullet.size+';">'+bullet.txt+'<p>').appendTo($('body')).animate({
				"left": '-' + (30*bullet.txt.length) + "px"
			},bSpeed, function(){
				//$(this).remove();
			});
		},
		init: function(server){
			if(server && server != ''){
				this.server = server;
			}
			//this.loadCSS();
			this.render();
			this.eventRun();
			this.longLinkStart();
		},
		loadCSS: function(){
			var that = this;
			var cssfiles = [
				'/javascripts/lib/frozen/css/frozen.css',
				'/stylesheets/base.css'
			];
			$.each(cssfiles, function(i,v){
				$('head').append('<link rel="stylesheet" type="text/css" href="'+that.server+v+'" />');
			});
		},
		render: function(){
			var bulletDom = $('<div id="bullet-ctl" style="position: fixed; right: 0; top: 50px; width:200px; height: 100px;background-color: rgba(255,255,255,0.5);">'+
								'<div class="btn-close" style="position: absolute; top: 0; left: -20px; width: 20px; height: 50px;text-align: center;background-color:rgba(255,255,255,0.5);">弹<br>幕</div>'+
								'<div class="bullet-wrap">'+
									'<form action="#">'+
										'<div class="ui-form-item ui-form-item-switch"><p>弹幕开关：</p><label class="ui-switch"><input id="bullet-onoff" type="checkbox" checked></label></div>'+
										'<div class="ui-form-item">'+
					                        '<label>弹幕速度：</label>'+
					                        '<div class="ui-select">'+
					                            '<select id="bullet-speed">'+
					                                '<option value="0.5">0.5倍速</option>'+
					                                '<option value="1" selected="">1倍速</option>'+
					                                '<option value="2">2倍速</option>'+
					                                '<option value="3">3倍速</option>'+
					                            '</select>'+
					                        '</div>'+
					                    '</div>'+
									'</form>'+
								'</div>'+
							'</div>').appendTo($('body'));
			this.dom = bulletDom;
		},
		eventRun: function(){
			var that = this;
			that.dom.attr('data-width',that.dom.width());
			that.dom.find('.btn-close').click(function(){
				if(that.dom.width() == 0){
					that.dom.width(that.dom.attr('data-width'));
					that.dom.find('.bullet-wrap').show();
				}else{
					that.dom.width(0);
					that.dom.find('.bullet-wrap').hide();
				}
			});

			$('#bullet-onoff').on('change', function(){
				that.onoff = $(this).prop('checked');
				if(that.onoff){
					that.longLinkStart();
				}else{
					that.longLinkStop();
				}
			});

			$('#bullet-speed').on('change', function(){
				that.speed = parseFloat($(this).val());
				console.log(that.speed);
			});
		},
		longLinkStart: function(){
			this.longLinkTime = this.longLinkCtl();
		},
		longLinkStop: function(){
			clearInterval(this.longLinkTime);
		},
		longLinkCtl:function(){
			var that = this;
			var time = setInterval(function(){
				$.get('http://'+that.server+'/ajaxs/longLink',{
					"lastDate": that.lastDate
				}, function (res){
					if(res.errorCode != 0){return;}
					that.addBullets(res.data);
					that.lastDate = res.lastDate;
					that.showBullets();
				}, 'json');
			}, 3000);
			return time;
		}
	};

	//bullet.init();
	crxTool.sendListen('serverInit', function (request, sender, sendResponse){
	    bullet.init(request.server);
	    //sendResponse({width: document.getElementById(request.id).offsetWidth});
	});
});