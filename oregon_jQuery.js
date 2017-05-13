/********************************************** jQuery Functions *********************************************/
$(document).ready(function() {
	$('#menu_contrastSlider').on('input', function() {
    	$("span[id^='wrapper_']").css('opacity', $(this).val());
	});
});