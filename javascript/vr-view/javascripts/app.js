(function($) {
	'use strict';

	window.addEventListener('load', onVrViewLoad)
	function onVrViewLoad() {
	  var vrView = new VRView.Player('#vrview', {
	    video: 'https://d3ln2sx41zmbfg.cloudfront.net/temp/example_360-VR.mp4',
	    is_stereo: true
	  });
	}

})(jQuery);















