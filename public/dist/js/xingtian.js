(function($) {
  /* nabbg */
  var Plugin = function(el, options) {
    this.el = el;
    this.options = $.extend(true, {}, Plugin.DEFAULTS, options);

    if(this.el.getContext) {
      this.ctx = this.el.getContext('2d');
      Plugin.init.apply(this);
    }
  };

  Plugin.DEFAULTS = {

  };

  Plugin.init = function() {
    this.ctx.save();

    var lg = this.options.lineargrad;
    var linearGrad = this.ctx.createLinearGradient(0, 0, this.el.width, this.el.height);
    linearGrad.addColorStop(0, '#00ABEB');
    linearGrad.addColorStop(0.5, '#fff');

    this.ctx.fillStyle = linearGrad;
    this.ctx.fillRect(0, 0, this.el.width, this.el.height);

    this.ctx.restore();
  };

  $.fn.navbg = function(option) {
    return this.each(function() {
      if(option && typeof option == 'object') {
        new Plugin(this, option);
      } else if( typeof option == 'string') {
        new Plugin(this)[option]();
      } else {
        new Plugin(this, null);
      }
    });
  };
})(jQuery);


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

(function($) {
	/*  
	 ***	轮播
	 *	@paused				动画状态
	 *	@amount				item总数
	 *	@current 			当前位置
	 *  @interval 			间隔时间
	 **
	 ***	方法
	 *	left,right 	 		方向
	 *	action				显示前
	 *	shown				显示后
	 **
	*/
	var Plugin = function(opt, element) {
		this.$element = $(element);
		this.options = opt;
		this.$item = this.$element.find('.item');
		this.$left = this.$element.find('.left');
		this.$right = this.$element.find('.right');
		this.paused = true;
		this.amount = this.$item.length - 1;
		this.current = 0;

		/* init */
		this.$item.eq(this.current).addClass('open');

		/* bind */
		if(this.amount !== 0) {
			this.$left.on('click', $.proxy(this.left, this));
			this.$right.on('click', $.proxy(this.right, this));
		}
	};

	Plugin.DEFAULT = {
		interval: 600
	};

	Plugin.prototype.left = function() {
		var that = this;

		if(that.paused) {
			that.paused = false;

			/* options */
			var _current = that.current;
			var _prev = _current;

			if(_current == that.amount) {
				/* last */
				_current = 0;
			} else {
				_current++;
			}
			that.current = _current;

			/* element */
			var $prev = that.$item.eq(_prev);
			var $current = that.$item.eq(_current);

			var action = $.Event("carousel.left:action");
				that.$element.trigger(action);
				doit.apply(that);
		}

		function doit() {
			/* do it */
			/* prev */
			$prev.addClass('left-leave');

			/* current */
			$current.addClass('left open');

			/* interval */
			setTimeout(function() {
				$prev.removeClass('left-leave open');
				$current.removeClass('left');
				that.paused = true;

				var shown = $.Event("carousel.left:shown");
					that.$element.trigger(shown);
			}, that.options.interval);
		}
	};

	Plugin.prototype.right = function() {
		var that = this;

		if(that.paused) {
			that.paused = false;

			/* options */
			var _current = that.current;
			var _prev = _current;

			if(_current === 0) {
				/* first */
				_current = that.amount;
			} else {
				_current--;
			}
			that.current = _current;

			/* element */
			var $prev = that.$item.eq(_prev);
			var $current = that.$item.eq(_current);

			var action = $.Event("carousel.right:action");
				that.$element.trigger(action);
				doit.apply(that);
		}

		function doit() {
			/* do it */
			/* prev */
			$prev.addClass('right-leave');

			/* current */
			$current.addClass('right open');

			/* interval */
			setTimeout(function() {
				$prev.removeClass('right-leave open');
				$current.removeClass('right');
				that.paused = true;

				var shown = $.Event("carousel.right:shown");
					that.$element.trigger(shown);
			}, that.options.interval);
		}
	};
	
	$.fn.xingtianCarousel = function(opt) {
		return this.each(function() {
			var options = $.extend({}, Plugin.DEFAULT, typeof opt == 'object' && opt);
			new Plugin(options, this);
		});
	};
})(jQuery);

(function($) {
  /**
   *** 模仿书写代码
   **
   *  @message:   信息，要与code的数量一致
   *  @speed:     间隔时间
   *  @restore:   恢复时间
   *  @counterS:  截取的长度，默认0
   *  @counterL:  code数量，默认0
   **
  **/
  var Plugin = function(opt, el) {
    this.$el = $(el);
    this.options = opt;

    Plugin.writeCode.call(this);
  };

  Plugin.DEFAULT = {
    message: null,
    speed: 130,
    restore: 3000,
    counterS: 0,
    counterL: 0
  };

  Plugin.writeCode = function() {
    var that = this,
        $el = that.$el;
    var message = that.options.message[that.options.counterL];

    /* append cursor */
    var $cursor = $("<span class='cursor'>|</span>");
    $el.find("code").eq(that.options.counterL).after($cursor);

    var auto = setInterval(function() {
      if(that.options.counterS <= message.length) {
        /* one by one */
        $el.find("code").eq(that.options.counterL).text(message.slice(0, that.options.counterS));
        that.options.counterS++;
      } else {
        clearInterval(auto);
        that.options.counterL++;
        if(that.options.counterL < that.options.message.length) {
          /* next message */
          that.options.counterS = 0;
          $cursor.remove();
          Plugin.writeCode.call(that);
        } else {
          /* restore */
          setTimeout(function() {
            that.options.counterS = 0;
            that.options.counterL = 0;
            $cursor.remove();
            $el.find("code").text('');
            Plugin.writeCode.call(that);
          }, that.options.restore);
        }
      }
    }, that.options.speed);
    
  };

  $.fn.xingtianWriteCode = function(opt) {
    return this.each(function() {
      var options = $.extend(true, {}, Plugin.DEFAULT, typeof opt == 'object' && opt);
      new Plugin(options, this);
    });
  };
})(jQuery);