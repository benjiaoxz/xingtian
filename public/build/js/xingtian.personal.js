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
  }

  Plugin.DEFAULT = {
    message: null,
    speed: 130,
    restore: 3000,
    counterS: 0,
    counterL: 0
  }

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
    
  }

  $.fn.xingtianWriteCode = function(opt) {
    return this.each(function() {
      var options = $.extend(true, {}, Plugin.DEFAULT, typeof opt == 'object' && opt);
      new Plugin(options, this);
    });
  }
})(jQuery);