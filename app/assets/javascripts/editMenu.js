$(document).ready(function() {

	$('.editButton').click(function() {
		var editMenu = $('.editMenu');
		editMenu.animate({width:'toggle'},300);

		$.getJSON("https://api.elementalmachines.io:443/api/machines/8092d98c-b92f-4343-a8ae-104f90362de8.json?access_token=7eb3d0a32f2ba1e8039657ef2bd1913d95707ff53e37dfd0344ac62ded3df033", function(data) {
			editMenu.find('.editHeader').html(data.name + " Alerts");
		});
		
	});
});