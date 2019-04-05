jQuery(document).ready(function($) {

	console.log("Hello there");

	$("#ssl-check").submit(function(e) {
	
		e.preventDefault();
		
		var $table = $('#results tbody');
		var requestURL = $("#urlInput").val();
		
		$.ajax({
			url: '/system/request.php',
			type: 'POST',
			dataType: 'json',
			data: {'url': requestURL},
		})
		.done(function(response) {
			
			console.log(response);
			
			$table.append('<tr><td>' + requestURL + '</td><td>' + response.validTo_time_t + '</td><td><code>' + JSON.stringify(response.issuer, null, 4) + '</code></td></tr>')
			
			
		})
		.fail(function() {
			console.log("error");
		});
	
	});
	
});