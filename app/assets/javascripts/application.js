// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {

	$('.elementHeader').click(function() {
		$(this).toggleClass('highlighted');
		$(this).find('i').toggleClass('fa-caret-right').toggleClass('fa-caret-down');
		$(this).siblings('.detailTable').toggleClass('hidden');
	});

	var lastFiveHours = [];

	$('.alertButton').click(function() {

		var currentTime = Math.round((new Date).getTime() / 1000);
		var fiveHoursAgo = currentTime-(5*60*60);
		console.log(currentTime);
		console.log(fiveHoursAgo);
		var limit = 1200 //this is every data point within the past 5 hours

		$.getJSON("https://api.elementalmachines.io/api/machines/8092d98c-b92f-4343-a8ae-104f90362de8/samples.json?access_token=7eb3d0a32f2ba1e8039657ef2bd1913d95707ff53e37dfd0344ac62ded3df033&from="+fiveHoursAgo+"&limit=1200", function(data) {
			
			//check to make sure we can receive and parse the API data at all
			console.log("Current temperature is " + data[1].tempextcal);

			var i;
			for (i = 0; i < data.length; i++) {
				var temp = data[i].tempextcal;
				var timeStamp = data[i].sample_epoch;
				var date = data[i].sample_date;
			};

			console.log("done, data length: "+ data.length);
		});
	})

	

});

