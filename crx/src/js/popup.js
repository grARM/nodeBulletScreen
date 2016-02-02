$(document).ready(function(){
	$('#bili－start').click(function(){
		var server = $('#serverSocket').val() || '127.0.0.1:8081';
		crxTool.send('serverInit', {
			server: server
		}, function(){});

		var clientUrl = "http://"+server+"/pages/bulletClient.html";
		$('#qr-url a').attr('href', clientUrl).parent().show();

		$('#qr-code').qrcode({
			text	: clientUrl
		}).show();
	});
});