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

	var highAlert = -79.5;
	var lowAlert = -80.5;

	$('.alertButton').click(function() {

		var currentTime = Math.round((new Date).getTime() / 1000);
		var fiveHoursAgo = currentTime-(5*60*60);
		console.log(currentTime);
		console.log(fiveHoursAgo);
		var limit = 1200 //1200 is every data point within the past 5 hours

		$.getJSON("https://api.elementalmachines.io/api/machines/8092d98c-b92f-4343-a8ae-104f90362de8/samples.json?access_token=7eb3d0a32f2ba1e8039657ef2bd1913d95707ff53e37dfd0344ac62ded3df033&from="+fiveHoursAgo+"&limit="+limit, function(data) {
			
			//check to make sure we can receive and parse the API data at all
			console.log("Current temperature is " + data[data.length-1].tempextcal + ", logged at: " + data[data.length-1].sample_date);

			var i;
			var maxTemp = 0;
			var temp = 0;
			var timeStamp;
			var date;
			var highAlertCounter = 0;
			var lowAlertCounter = 0;

			for (i = 0; i < data.length; i++) {
				temp = data[i].tempextcal;
				timeStamp = data[i].sample_epoch;
				date = data[i].sample_date;

				// high temp alert check
				if (Math.abs(temp) < Math.abs(highAlert)) {
					highAlertCounter++;
					//console.log(temp);
				};

				// low temp alert check
				if (Math.abs(temp) > Math.abs(lowAlert)) {
					lowAlertCounter++;
					//console.log(temp);
				};

				if (Math.abs(temp) > maxTemp) {
					maxTemp = data[i].tempextcal;
				};
			};

			console.log("done, data length: " + data.length);
			console.log("High Temp Alerts: " + highAlertCounter);
			console.log("Low Temp Alerts: " + lowAlertCounter);

			alert("There have been " + highAlertCounter + " high-temp alerts and " + lowAlertCounter + " low alerts in the past " + limit / 240 + " hours.");
		});
	})

	

});

