$(function() {
	/* 技能动画 */
	$('.option').on('click', function() {
		var _switch = $('.selection').data('switch');
		var $el = $('.selection').data('el');
		var $target = $(this).data('target');
		var $option = $(this).data('option');

		if(!_switch) {
			if($el != $option) {
				$(this).siblings().removeClass('active');
				$('.wrapper .item').removeClass('active');
				$(this).addClass('active');

				$($target).siblings().slideUp(function() {
					$($target).slideDown(function() {
						$(this).addClass('active');
						$('.selection').data({'el': $option});
					});
				});
			} else {
				$(this).removeClass('active');
				$($target).slideUp(function() {
					$(this).removeClass('active');
					$('.selection').data({'el': false});
				});
			}
		}
	});
	$('.option').eq(0).click();
});