(function(window,document) {

	
	var date = document.getElementById('date');
	dateCtx = date.getContext('2d');
	
	
	drawArc(dateCtx);
	drawRulers(dateCtx);
	drawText(dateCtx);

	/*画圆*/
	function drawArc(ctx) {
		ctx.save();

		ctx.beginPath();
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 4;
		ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
		ctx.arc(75, 75, 70, 0, Math.PI * 2, true);
		ctx.fillStyle = '#fff';
		ctx.fill();

		ctx.restore();
		ctx.save();

		ctx.beginPath();
		ctx.arc(75, 75, 70, 0, Math.PI * 2, true);
		ctx.strokeStyle = '#ccc';
		ctx.stroke();

		ctx.restore();
	}

	/*标尺*/
	function drawRulers(ctx) {
		ctx.save();

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(150, 150);
		ctx.closePath();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(150, 0);
		ctx.lineTo(0, 150);
		ctx.closePath();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(75, 0);
		ctx.lineTo(75, 150);
		ctx.closePath();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(0, 75);
		ctx.lineTo(150, 75);
		ctx.closePath();
		ctx.stroke();

		ctx.restore();
	}

	/*写字*/
	
	function drawText(ctx) {

		var dateArr = ['2012.12','2013.6','2013.7','2014.1','2014.4','2015.2','2015.3','2016.5'];

		for(var i = 0; i < 8; i++) {
			var x = 75 + Math.sin(Math.PI * (2 * 6 - i) / 4) * 70;
				y = 75 + Math.cos(Math.PI * (2 * 6 - i) / 4) * 70;

			x = x - ctx.measureText(dateArr[i]).width / 2;

			ctx.save();
			ctx.beginPath();
			ctx.fillText(dateArr[i], x, y);
			ctx.closePath();
			ctx.restore();
		}
		
	}
	

})(window,document);