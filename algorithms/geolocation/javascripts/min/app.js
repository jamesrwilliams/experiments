(function($) {
	'use strict';
	
	var LOADED;
	
	function geocodeAddress(_locations) {
		
		var location = _locations;
		
		var geocoder = new google.maps.Geocoder();
		
		geocoder.geocode({
			
			'address': location
		
		}, function(results, status) {
			
			if (status === 'OK') {
     			
     			var lat = results[0].geometry.location.lat();
				var lng = results[0].geometry.location.lng();
     			
     			$("table.table > tbody").append("<tr><td>" + location + "</td><td>" + lat + "</td><td>" + lng + "</td></tr>");
									
			} else {
				
				console.warn('Geocode was not successful for the following reason: ' + status);
				
			}
			
		});
	}
	
	function geocode(_input){
		
		var locations = _input;
		
		$("#start").attr('disabled', true);
		$("#start").text('Running');
		
		for (var i = 0; i < (locations.length); i++) {
			(function(i) {
				setTimeout(function() {
					
					geocodeAddress(locations[i]);			
					
				}, 1010 * i);
				
			}(i));				
			
		}
		
	}
	
	function api_ready(google){
		
		LOADED = true;
		
		$("#start").removeAttr('disabled');
		$("#start").text('Start');
		
	}
	
	$(document).ready(function(){
		
		var keyString = window.localStorage.getItem("API_KEY");
		
		if (keyString) {
			
			$("#api_key").val(keyString);
					
		}
		
		$("#api_key").blur(function(){
			
			var key_string = $(this).val();

			if (key_string !== "") {
				
				window.localStorage.setItem("API_KEY", key_string);
				
			}
			
		});
				
		$("#validate").click(function(){
			
			var key = $("#api_key").val();
						
			if (key) {
				
				var script = document.createElement('script');

				script.setAttribute('src','https://maps.googleapis.com/maps/api/js?key=' + key);
				script.setAttribute('async', '');
				script.setAttribute('defer', '');

				document.head.appendChild(script);
				
				var sniffgoogle = setInterval(function() {
				
					if (typeof google !== 'undefined') {
						
						clearInterval(sniffgoogle);
						api_ready(google);
						
					}
					
				}, 500);
				
			}else{
				
				console.log("No Key");
				
			}	
			
		});
		
		$("#start").click(function(){
						
			if (typeof( $(this).attr('disabled') ) != 'undefined') {
				
				console.log("Validate API Key");
				
			}else if($("#input_data").val().length === 0){
				
				console.log("Add Some Data to check");
				
			}else{
				
				$("table.table tbody").empty();
			
				var data = $("#input_data").val().split("\n");
				
				geocode(data);
				
			}
			
		});
		
	});
	
})(jQuery);

















