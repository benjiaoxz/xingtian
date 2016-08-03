(function($) {
  /* nabbg */
  var Plugin = function(el, options) {
    this.el = el;
    this.options = $.extend(true, {}, Plugin.DEFAULTS, options);
console.log(this.options)
    if(this.el.getContext) {
      this.ctx = this.el.getContext('2d');
      Plugin.init.apply(this);
    }
  }

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
  }

  $.fn.navbg = function(option) {
    return this.each(function() {
      if(option && typeof option == 'object') {
        new Plugin(this, option);
      } else if( typeof option == 'string') {
        new Plugin(this)[option]();
      } else {
        new Plugin(this, null);
      }
    })
  }
})(jQuery);
