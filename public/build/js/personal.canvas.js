function Personal() {
	this.el = document.getElementById('personal');

	if(this.el.getContext) {
		this.el.width = window.innerWidth;
		this.el.height = window.innerHeight;
		this.ctx = this.el.getContext('2d');

		Personal.drawBg.apply(this);

		var that = this;
		window.onresize = function() {
			that.el.width = this.innerWidth;
			that.el.height = this.innerHeight;
			Personal.drawBg.apply(that);
		};
	}
}

Personal.drawBg = function() {
	this.ctx.save();

	var W = this.el.width,
		H = this.el.height;

	var n = 10,
		aph = 0.1;
	var wL = parseInt(W / n),
		hL = parseInt(H / n);

	for(var i = 0; i < wL; i++) {
		for(var j = 0; j < hL; j++) {
			if((i + j) % 2 === 0) {
				this.ctx.beginPath();
				this.ctx.fillStyle = 'rgba(255, 255, 255, ' + aph + ')';
			} else {
				this.ctx.beginPath();
				this.ctx.fillStyle = 'rgba(0, 0, 0, ' + aph + ')';
			}

			this.ctx.fillRect(i * n, j * n, n, n);
		}
	}
	this.ctx.restore();
	this.ctx.save();

	var img = new Image();
	var that = this;
	var	iW = 100,
		iH = 149;
	var iX = 20,
		iY = H - iH - 20;

	img.onload = function() {
		that.ctx.drawImage(this, iX, iY, iW, iH);
		that.ctx.restore();
	};

	img.src = 'build/img/lufei.png';
};