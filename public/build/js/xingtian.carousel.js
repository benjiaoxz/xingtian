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
		if(this.amount != 0) {
			this.$left.on('click', $.proxy(this.left, this));
			this.$right.on('click', $.proxy(this.right, this));
		}
	}

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

			if(_current == 0) {
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
	}
})(jQuery);