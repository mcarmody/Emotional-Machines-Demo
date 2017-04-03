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
	var today = new Date;
	var isAM = true;
	var readableDate;

	var highAlert = -79.5;
	var lowAlert = -80.5;
	var maxTemp = 0;
	var temp = 0;
	var timeStamp;
	var date;
	var highAlertCounter = 0;
	var lowAlertCounter = 0;

	$('.alertButton').click(function() {


		var currentTime = Math.round((today).getTime() / 1000);
		var limit = 1200 //1200 is every data point within the past 5 hours
		var fiveHoursAgo = currentTime-(limit / 240 * 60 * 60);
		var highAlertHTML = $(this).siblings(".highAlerts");
		var lowAlertHTML = $(this).siblings(".lowAlerts");
		var tempHTML = $(this).siblings(".elementDatum");	
		var highAlertCounter = 0;
		var lowAlertCounter = 0;
		

		$.ajax({
			url: "https://api.elementalmachines.io/api/machines/8092d98c-b92f-4343-a8ae-104f90362de8/samples.json?access_token=7eb3d0a32f2ba1e8039657ef2bd1913d95707ff53e37dfd0344ac62ded3df033&from="+fiveHoursAgo+"&limit="+limit,
			dataType: 'json',
			async: true,
			success: function(data) {
			
				//check to make sure we can receive and parse the API data at all
				console.log("Current temperature is " + data[data.length-1].tempextcal + ", logged at: " + data[data.length-1].sample_date);
				temp = data[data.length-1].tempextcal;
				console.log(temp);

				var i;

				for (i = 0; i < data.length; i++) {
					loopTemp = data[i].tempextcal;
					loopTimeStamp = data[i].sample_epoch;
					loopDate = data[i].sample_date;

					// high temp alert check
					if (Math.abs(loopTemp) < Math.abs(highAlert)) {
						highAlertCounter++;
						//console.log(temp);
					};

					// low temp alert check
					if (Math.abs(loopTemp) > Math.abs(lowAlert)) {
						lowAlertCounter++;
						//console.log(temp);
					};

					if (Math.abs(loopTemp) > maxTemp) {
						maxTemp = data[i].tempextcal;
					};
				};

				console.log("done, data length: " + data.length);
				console.log("There have been " + highAlertCounter + " high-temp alerts and " + lowAlertCounter + " low alerts in the past " + limit / 240 + " hours.");
			}
		}).done( function() {
			//update the page text
			highAlertHTML.html(highAlertCounter);
			lowAlertHTML.html(lowAlertCounter);
			tempHTML.html(temp);
		});


		// make the date human-readable

		var hours;

		if (today.getHours > 12) {
			hours = today.getHours()-12;
			isAM = false;
		} else {
			hours = today.getHours();
		};
		
		var minutes;

		if (today.getMinutes() < 10) {
			minutes = "0" + today.getMinutes()
		} else {
			minutes = today.getMinutes();
		};

		if (isAM) {
			minutes = minutes + " AM"
		} else {
			minutes = minutes + " PM"
		};

		readableDate = today.getMonth() + "/" + today.getDay() + "/" + (today.getYear()-100) + ", " + today.getHours() + ":" + minutes;


		//update the page text
		$(this).siblings(".lastUpdate").html(readableDate);
	
	});

	

});

