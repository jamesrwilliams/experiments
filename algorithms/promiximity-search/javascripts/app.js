/* global google */

(function($) {
	'use strict';
	
	var i;
	
	var Bamp = {
		/**
		 * Variable options
		 */
		options: {
			results_to_show:	10,				// Total number of results to show
			active_class:		'highlight',	// Class to toggle on results when active
			coords:				{				// Default map coordinates
				lat: 55.3781,
				lng: -3.4360
			},
			icons: {							// Pin images
				user: '/images/current_location.png',
				pin: '/images/locationPin.png'
			}
		},
		/**
		 * Target elements, $ for jQuery objects
		 */
		el: {
			$map:		$('#map'),				// Map target container
			$reset:		$('#reset'),			// Reset map
			$debug:		$('#debug'),			// Enable debugging
			$search:	$('#search'),			// Search form
			$locate:	$('#locate'),			// HTML5 navigator API
			$results:	$('#locations')			// Element to print results
		},
		/**
		 * Variables saved by processes
		 */
		var: {
			current_location:	false,			// Current search/located marker
			closest_results:	[],				// Closest locations to current marker
			location_markers:	[]				// All locations markers
		},
		/**
		 * Easily accessible data
		 */
		map: false,
		locations: [{"id":1,"store_name":"Sainsbury's Chichester","store_postcode":"PO19 7YR","lat":50.843414,"lng":-0.7563425},{"id":2,"store_name":"Sainsbury's Colchester Ave","store_postcode":"CF23 9XN","lat":51.4951554,"lng":-3.147537},{"id":3,"store_name":"Sainsbury's East Grinstead","store_postcode":"RH19 1DD","lat":51.1256757,"lng":-0.0175153},{"id":4,"store_name":"Sainsbury's Crayford","store_postcode":"DA1 4HW","lat":51.4501425,"lng":0.1777474},{"id":5,"store_name":"Sainsbury's Locksbottom","store_postcode":"BR6 8NZ","lat":51.3664,"lng":0.05565},{"id":6,"store_name":"Sainsbury's Streatham Common","store_postcode":"SW16 3PY","lat":51.42004,"lng":-0.1292},{"id":7,"store_name":"Sainsbury's West Grn","store_postcode":"BL5 3ZS","lat":53.546497,"lng":-2.524789},{"id":8,"store_name":"Sainsbury's North Cheam","store_postcode":"SM3 9AA","lat":51.37194,"lng":-0.22488},{"id":9,"store_name":"Sainsbury's Bybrook","store_postcode":"TN24 8YN","lat":51.1585832,"lng":0.8675428},{"id":10,"store_name":"Sainsbury's Hampden Park","store_postcode":"BN22 9PW","lat":50.7935311,"lng":0.2797085},{"id":11,"store_name":"Sainsbury's Sevenoaks","store_postcode":"TN14 5EG","lat":51.29723,"lng":0.1929},{"id":12,"store_name":"Sainsbury's Haywards Heath","store_postcode":"RH16 1DG","lat":51.0066041,"lng":-0.1066436},{"id":13,"store_name":"Sainsbury's Cromwell Rd","store_postcode":"SW7 4EJ","lat":51.4949014,"lng":-0.1886473},{"id":14,"store_name":"Sainsbury's Springfield","store_postcode":"CM2 5PA","lat":51.7510521,"lng":0.5127204},{"id":15,"store_name":"Sainsbury's Winchmore Hill","store_postcode":"N21 3RS","lat":51.62941,"lng":-0.09861},{"id":16,"store_name":"Sainsbury's Low Hall","store_postcode":"E4 8ST","lat":51.6033788,"lng":-0.0177508},{"id":17,"store_name":"Sainsbury's Leamington","store_postcode":"CV34 6RH","lat":52.278575,"lng":-1.546849},{"id":18,"store_name":"Sainsbury's Clapham Common","store_postcode":"SW4 7SL","lat":51.462,"lng":-0.13602},{"id":19,"store_name":"Sainsbury's Forestside","store_postcode":"BT8 6FX","lat":54.563864,"lng":-5.909654},{"id":20,"store_name":"Sainsbury's Strand Rd","store_postcode":"BT48 7TL","lat":55.01056,"lng":-7.31576},{"id":21,"store_name":"Sainsbury's Newry","store_postcode":"BT35 8QS","lat":54.1676711,"lng":-6.3394992},{"id":22,"store_name":"Sainsbury's Calcot","store_postcode":"RG31 7SA","lat":51.441842,"lng":-1.060242},{"id":23,"store_name":"Sainsbury's Cameron Toll","store_postcode":"EH16 5PB","lat":55.9267863,"lng":-3.1637367},{"id":24,"store_name":"Sainsbury's Beckton","store_postcode":"E6 6JF","lat":51.52166,"lng":0.06719},{"id":25,"store_name":"Sainsbury's Heyford Hill","store_postcode":"OX4 4XR","lat":51.72169,"lng":-1.2324},{"id":26,"store_name":"Sainsbury's Fairfield Park","store_postcode":"MK41 7PJ","lat":52.1455315,"lng":-0.4857478},{"id":27,"store_name":"Sainsbury's Finchley Rd","store_postcode":"NW3 6LU","lat":51.5480313,"lng":-0.1819782},{"id":28,"store_name":"Sainsbury's St Albans","store_postcode":"AL1 2QU","lat":51.74334,"lng":-0.34115},{"id":29,"store_name":"Sainsbury's Kenton","store_postcode":"HA3 0JA","lat":51.5819153,"lng":-0.3151979},{"id":30,"store_name":"Sainsbury's Kidderminster","store_postcode":"DY11 6XP","lat":52.3915762,"lng":-2.2543081},{"id":31,"store_name":"Sainsbury's Burpham","store_postcode":"GU4 7JU","lat":51.267956,"lng":-0.557526},{"id":32,"store_name":"Sainsbury's Hedge End","store_postcode":"SO30 2UH","lat":50.9179884,"lng":-1.3142126},{"id":33,"store_name":"Sainsbury's Kempshott","store_postcode":"RG22 4TW","lat":51.2354688,"lng":-1.1391663},{"id":34,"store_name":"Sainsbury's Torquay","store_postcode":"TQ2 7HT","lat":50.488149,"lng":-3.556971},{"id":35,"store_name":"Sainsbury's Bridgemead","store_postcode":"SN5 7AA","lat":51.557944,"lng":-1.810372},{"id":36,"store_name":"Sainsbury's Godalming","store_postcode":"GU7 1LQ","lat":51.186378,"lng":-0.603588},{"id":37,"store_name":"Sainsbury's Bagshot Rd","store_postcode":"RG12 7SS","lat":51.3926757,"lng":-0.7404158},{"id":38,"store_name":"Sainsbury's Watchmoor Park","store_postcode":"GU15 3YN","lat":51.32262,"lng":-0.76229},{"id":39,"store_name":"Sainsbury's Winterstoke Rd","store_postcode":"BS3 2NS","lat":51.43368,"lng":-2.61923},{"id":40,"store_name":"Sainsbury's Water Lane","store_postcode":"GU9 9NJ","lat":51.22205,"lng":-0.77563},{"id":41,"store_name":"Sainsbury's Kiln Lane","store_postcode":"KT17 1EQ","lat":51.3416418,"lng":-0.2576942},{"id":42,"store_name":"Sainsbury's Cobham","store_postcode":"KT11 1HW","lat":51.3367407,"lng":-0.4209875},{"id":43,"store_name":"Sainsbury's Newbury","store_postcode":"RG14 5AB","lat":51.39855,"lng":-1.3197},{"id":44,"store_name":"Sainsbury's Sydenham","store_postcode":"SE26 4PU","lat":51.428919,"lng":-0.033136},{"id":45,"store_name":"Sainsbury's Longwater","store_postcode":"NR5 0JS","lat":52.6527986,"lng":1.1844029},{"id":46,"store_name":"Sainsbury's Hankridge Farm","store_postcode":"TA1 2LR","lat":51.021028,"lng":-3.063016},{"id":47,"store_name":"Sainsbury's Monks Cross","store_postcode":"YO32 9LG","lat":53.9867299,"lng":-1.0490378},{"id":48,"store_name":"Sainsbury's Marshall Lake","store_postcode":"B90 4AJ","lat":52.40153,"lng":-1.81994},{"id":49,"store_name":"Sainsbury's Shrewsbury","store_postcode":"SY3 9NB","lat":52.6871248,"lng":-2.7541404},{"id":50,"store_name":"Sainsbury's Lincoln","store_postcode":"LN6 7QN","lat":53.20511,"lng":-0.57913},{"id":51,"store_name":"Sainsbury's Fosse Park","store_postcode":"LE19 1WT","lat":52.59775,"lng":-1.18449},{"id":52,"store_name":"Sainsbury's Beaconsfield","store_postcode":"HP9 1QH","lat":51.6096507,"lng":-0.6430197},{"id":53,"store_name":"Sainsbury's Preston","store_postcode":"PR1 6PJ","lat":53.77518,"lng":-2.68733},{"id":54,"store_name":"Sainsbury's Blackhall","store_postcode":"EH4 2EB","lat":55.9575161,"lng":-3.2412706},{"id":55,"store_name":"Sainsbury's Cheadle","store_postcode":"SK8 3BB","lat":53.3780628,"lng":-2.2166866},{"id":56,"store_name":"Sainsbury's Sunderland","store_postcode":"SR3 1PD","lat":54.8847134,"lng":-1.4077008},{"id":57,"store_name":"Sainsbury's Durham","store_postcode":"DH1 5GD","lat":54.8067001,"lng":-1.5790835},{"id":58,"store_name":"Sainsbury's Castle Boulevard","store_postcode":"NG7 1GX","lat":52.9454828,"lng":-1.1645571},{"id":59,"store_name":"Sainsbury's Coldhams Lane","store_postcode":"CB1 3HP","lat":52.199016,"lng":0.157623},{"id":60,"store_name":"Sainsbury's Archer Rd","store_postcode":"S8 0TD","lat":53.34553,"lng":-1.49226},{"id":61,"store_name":"Sainsbury's Darnley","store_postcode":"G53 7RH","lat":55.8060348,"lng":-4.3447184},{"id":62,"store_name":"Sainsbury's Denton","store_postcode":"M34 3SJ","lat":53.455885,"lng":-2.130572},{"id":63,"store_name":"Sainsbury's Sury Basin","store_postcode":"KT2 5NZ","lat":51.4157931,"lng":-0.3029537},{"id":64,"store_name":"Sainsbury's Sprucefield","store_postcode":"BT27 5UQ","lat":54.492784,"lng":-6.064021},{"id":65,"store_name":"Sainsbury's Team Valley","store_postcode":"NE11 0JY","lat":54.92234,"lng":-1.60963},{"id":66,"store_name":"Sainsbury's Holywood Exchange","store_postcode":"BT3 9EJ","lat":54.6267174,"lng":-5.8565523},{"id":67,"store_name":"Sainsbury's Bishops Stortford","store_postcode":"CM23 3XG","lat":51.8700389,"lng":0.1616364},{"id":68,"store_name":"Sainsbury's Maidenhead","store_postcode":"SL6 8AG","lat":51.5244744,"lng":-0.7188764},{"id":69,"store_name":"Sainsbury's Milton Keynes","store_postcode":"MK9 2FW","lat":52.0366438,"lng":-0.7624494},{"id":70,"store_name":"Sainsbury's Braehead","store_postcode":"G51 4BT","lat":55.871485,"lng":-4.3566647},{"id":71,"store_name":"Sainsbury's Slough Uxbridge Rd","store_postcode":"SL1 1SU","lat":51.5080547,"lng":-0.5791808},{"id":72,"store_name":"Sainsbury's Wakefield Marsh Way","store_postcode":"WF1 1QQ","lat":53.684654,"lng":-1.494582},{"id":73,"store_name":"Sainsbury's Heaton Newcastle","store_postcode":"NE7 7JW","lat":54.99619,"lng":-1.57779},{"id":74,"store_name":"Sainsbury's Waterlooville","store_postcode":"PO7 7UL","lat":50.88299,"lng":-1.0361873},{"id":75,"store_name":"Sainsbury's Longbridge","store_postcode":"B31 2TW","lat":52.3958988,"lng":-1.9833249},{"id":76,"store_name":"Sainsbury's Leicester North","store_postcode":"LE4 7SJ","lat":52.6675734,"lng":-1.1040186},{"id":77,"store_name":"Sainsbury's Rustington","store_postcode":"BN16 3RT","lat":50.81778,"lng":-0.49472},{"id":78,"store_name":"Sainsbury's Thanet Wt Wood Cross","store_postcode":"CT12 5FJ","lat":51.3561812,"lng":1.3931524},{"id":79,"store_name":"Sainsbury's W'ton St Marks","store_postcode":"WV3 0ST","lat":52.5830002,"lng":-2.1347611},{"id":80,"store_name":"Sainsbury's High Wycombe","store_postcode":"HP11 2DN","lat":51.63275,"lng":-0.75488},{"id":81,"store_name":"Sainsbury's Fulham Wharf","store_postcode":"SW6 2GD","lat":51.46803,"lng":-0.18595},{"id":82,"store_name":"Sainsbury's Local Holborn","store_postcode":"EC1N 2TD","lat":51.518,"lng":-0.1085},{"id":83,"store_name":"Sainsbury's Local Tottenham Court Road","store_postcode":"W1T 7NE","lat":51.52384,"lng":-0.13632},{"id":84,"store_name":"Sainsbury's Local Martineau Place","store_postcode":"B2 4SJ","lat":52.4805,"lng":-1.89588},{"id":85,"store_name":"Sainsbury's Local Warren Street","store_postcode":"W1T 7NE","lat":51.52384,"lng":-0.13632},{"id":86,"store_name":"Sainsbury's Local Mayfair","store_postcode":"W1J 8LT","lat":51.5081055,"lng":-0.143451},{"id":87,"store_name":"Sainsbury's Local Euston Tower","store_postcode":"NW1 3DP","lat":51.5260041,"lng":-0.1388339},{"id":88,"store_name":"Sainsbury's Local Edinburgh Shandwick Place","store_postcode":"EH2 4RT","lat":55.949666,"lng":-3.209478},{"id":89,"store_name":"Sainsbury's Local Canada Water Station","store_postcode":"SE16 7ED","lat":51.4985736,"lng":-0.0496365},{"id":90,"store_name":"Sainsbury's Local Earlsfield","store_postcode":"SW18 2NY","lat":51.44201,"lng":-0.18734},{"id":91,"store_name":"Aston University","store_postcode":"B4 7ET","lat":52.5074364,"lng":-1.8756734},{"id":92,"store_name":"Cotswold Chocolate Company","store_postcode":"GL54 1BN","lat":51.9297664,"lng":-1.7220646},{"id":93,"store_name":"Gusto","store_postcode":"GL50 1SD","lat":51.8957665,"lng":-2.0819993},{"id":94,"store_name":"The Sprout and Flower","store_postcode":"BA12 6DJ","lat":51.0902159,"lng":-2.2685698},{"id":95,"store_name":"Warwick University","store_postcode":"CV4 7AL","lat":52.3800625,"lng":-1.5616976},{"id":96,"store_name":"Wolverhampton University","store_postcode":"WV1 1LY","lat":52.5882926,"lng":-2.1281653},{"id":97,"store_name":"Simply Heavenly","store_postcode":"RM7 0ES","lat":51.5687395,"lng":0.1569713},{"id":98,"store_name":"Confex","store_postcode":"GL56 0JQ","lat":51.988233,"lng":-1.6865149},{"id":99,"store_name":"Wildas","store_postcode":"CV5 8HU","lat":52.4175095,"lng":-1.5437747},{"id":100,"store_name":"Wildas","store_postcode":"CV6 4AB","lat":52.4344298,"lng":-1.5056763},{"id":101,"store_name":"Wildas","store_postcode":"CV22 5BQ","lat":52.3590589,"lng":-1.2289732},{"id":102,"store_name":"Sam's","store_postcode":"GL54 2AA","lat":51.8842024,"lng":-1.7558138},{"id":103,"store_name":"Sherborne Village Shop","store_postcode":"GL54 3DH","lat":51.828756,"lng":-1.749985},{"id":104,"store_name":"Annandale Water Motorway Service Area","store_postcode":"DG11 1HD","lat":55.2200347,"lng":-3.4105976},{"id":105,"store_name":"Bothwell Motorway Service Area","store_postcode":"G71 8BG","lat":55.814179,"lng":-4.0626117},{"id":106,"store_name":"Chester Motorway Service Area","store_postcode":"CH2 4QZ","lat":53.2685171,"lng":-2.8027213},{"id":107,"store_name":"Clacket Lane Motorway Service Area","store_postcode":"TN16 2ER","lat":51.2735042,"lng":0.0381743},{"id":108,"store_name":"Durham Motorway Service Area","store_postcode":"DH6 5NP","lat":54.728551,"lng":-1.523208},{"id":109,"store_name":"Hamilton Motorway Service Area","store_postcode":"ML3 6JW","lat":55.7870387,"lng":-4.0343657},{"id":110,"store_name":"Killington Lake Motorway Service Area","store_postcode":"LA8 0NW","lat":54.3140872,"lng":-2.6350256},{"id":111,"store_name":"Magor Motorway Service Area","store_postcode":"NP26 3YL","lat":51.588314,"lng":-2.836144},{"id":112,"store_name":"Maidstone Motorway Service Area","store_postcode":"ME17 1SS","lat":51.2670458,"lng":0.6139768},{"id":113,"store_name":"Northampton Motorway Service Area","store_postcode":"NN4 9QY","lat":52.2097896,"lng":-0.9433141},{"id":114,"store_name":"Norton Canes Motorway Service Area","store_postcode":"WS11 9UX","lat":52.6650486,"lng":-1.9671635},{"id":115,"store_name":"Pont Abraham Motorway Service Area","store_postcode":"SA4 0FU","lat":51.746868,"lng":-4.065199},{"id":116,"store_name":"Rownhams Motorway Service Area","store_postcode":"SO16 8AP","lat":50.9586194,"lng":-1.4484143},{"id":117,"store_name":"Sandbach Motorway Service Area","store_postcode":"CW11 2FZ","lat":53.138917,"lng":-2.337256},{"id":118,"store_name":"Sedgemoor Motorway Service Area","store_postcode":"BS26 2UF","lat":51.26998,"lng":-2.9232242},{"id":119,"store_name":"Stafford South Motorway Service Area","store_postcode":"ST15 0XE","lat":52.873875,"lng":-2.163627},{"id":120,"store_name":"Strensham Motorway Service Area","store_postcode":"WR8 0BZ","lat":52.066387,"lng":-2.158278},{"id":121,"store_name":"Sutton Scotney Motorway Service Area","store_postcode":"SO21 3JY","lat":51.1570989,"lng":-1.346256},{"id":122,"store_name":"Taunton Deane Motorway Service Area","store_postcode":"TA3 7PF","lat":50.9777431,"lng":-3.1474672},{"id":123,"store_name":"Tibshelf Motorway Service Area","store_postcode":"BE55 5TZ","lat":53.1390221,"lng":-1.3292277},{"id":124,"store_name":"Watford Gap Motorway Service Area","store_postcode":"NN6 7UZ","lat":52.306178,"lng":-1.122319},{"id":125,"store_name":"Waitrose","store_postcode":"","lat":51.8178628,"lng":-3.0281961},{"id":126,"store_name":"Waitrose","store_postcode":"","lat":53.40567,"lng":-2.3637928},{"id":127,"store_name":"Waitrose","store_postcode":"","lat":51.5221975,"lng":-0.0920464},{"id":128,"store_name":"Waitrose","store_postcode":"","lat":51.5173677,"lng":-0.1882745},{"id":129,"store_name":"Waitrose","store_postcode":"","lat":51.7632366,"lng":-0.5698347},{"id":130,"store_name":"Waitrose","store_postcode":"","lat":51.5757088,"lng":-0.2218239},{"id":131,"store_name":"Waitrose","store_postcode":"","lat":50.9547395,"lng":-0.1311452},{"id":132,"store_name":"Waitrose","store_postcode":"","lat":51.504909,"lng":-0.016952},{"id":133,"store_name":"Waitrose","store_postcode":"","lat":51.5241288,"lng":-0.1028132},{"id":134,"store_name":"Waitrose","store_postcode":"","lat":51.123843,"lng":-0.0114146},{"id":135,"store_name":"Waitrose","store_postcode":"","lat":51.482528,"lng":-0.0160269},{"id":136,"store_name":"Waitrose","store_postcode":"","lat":54.9725407,"lng":-2.0971545},{"id":137,"store_name":"Waitrose","store_postcode":"","lat":50.8434763,"lng":-0.1765919},{"id":138,"store_name":"Waitrose","store_postcode":"","lat":52.3420513,"lng":-1.5770327},{"id":139,"store_name":"Waitrose","store_postcode":"","lat":51.4883012,"lng":-0.1670226},{"id":140,"store_name":"Waitrose","store_postcode":"","lat":51.523105,"lng":-0.7144837},{"id":141,"store_name":"Waitrose","store_postcode":"","lat":51.4314607,"lng":-1.3244166},{"id":142,"store_name":"Waitrose","store_postcode":"","lat":51.7529734,"lng":-1.2803972},{"id":143,"store_name":"Waitrose","store_postcode":"","lat":52.2973367,"lng":-0.6206527},{"id":144,"store_name":"Waitrose","store_postcode":"","lat":51.269786,"lng":0.1938624},{"id":145,"store_name":"Waitrose","store_postcode":"","lat":52.413462,"lng":-1.7832726},{"id":146,"store_name":"Waitrose","store_postcode":"","lat":50.2736898,"lng":-5.0376051},{"id":147,"store_name":"Waitrose","store_postcode":"","lat":53.7493099,"lng":-2.6765443},{"id":148,"store_name":"Waitrose","store_postcode":"","lat":51.3406699,"lng":-2.9564977},{"id":149,"store_name":"Waitrose","store_postcode":"","lat":52.5751993,"lng":-2.1366418},{"id":150,"store_name":"Waitrose","store_postcode":"","lat":51.6717975,"lng":-1.2802328},{"id":151,"store_name":"Waitrose","store_postcode":"","lat":51.2680837,"lng":-1.0775337},{"id":152,"store_name":"Waitrose","store_postcode":"","lat":51.4131042,"lng":-3.2417971},{"id":153,"store_name":"Waitrose","store_postcode":"","lat":51.6206385,"lng":-0.6515095},{"id":154,"store_name":"Waitrose","store_postcode":"","lat":51.6236963,"lng":0.4168563},{"id":155,"store_name":"Waitrose","store_postcode":"","lat":50.8250046,"lng":-0.1519409},{"id":156,"store_name":"Waitrose","store_postcode":"","lat":52.2441024,"lng":0.7082636},{"id":157,"store_name":"Waitrose","store_postcode":"","lat":53.1927291,"lng":-2.8776365},{"id":158,"store_name":"Waitrose","store_postcode":"","lat":51.3219894,"lng":-0.1371448},{"id":159,"store_name":"Waitrose","store_postcode":"","lat":51.6513731,"lng":-0.0834832},{"id":160,"store_name":"Waitrose","store_postcode":"","lat":51.003443,"lng":-0.1037365},{"id":161,"store_name":"Waitrose","store_postcode":"","lat":51.9491157,"lng":-0.2806664},{"id":162,"store_name":"Waitrose","store_postcode":"","lat":52.034334,"lng":1.2039883},{"id":163,"store_name":"Waitrose","store_postcode":"","lat":51.4165596,"lng":-2.4833433},{"id":164,"store_name":"Waitrose","store_postcode":"","lat":50.8745994,"lng":0.0141278},{"id":165,"store_name":"Waitrose","store_postcode":"","lat":51.4203722,"lng":-1.7310951},{"id":166,"store_name":"Waitrose","store_postcode":"","lat":52.2459932,"lng":0.4061121},{"id":167,"store_name":"Waitrose","store_postcode":"","lat":51.5306839,"lng":-3.1374779},{"id":168,"store_name":"Waitrose","store_postcode":"","lat":53.1429708,"lng":-2.3637832},{"id":169,"store_name":"Waitrose","store_postcode":"","lat":53.3727643,"lng":-1.4785795},{"id":170,"store_name":"Waitrose","store_postcode":"","lat":51.5690695,"lng":-0.3472847},{"id":171,"store_name":"Waitrose","store_postcode":"","lat":51.477882,"lng":-0.8663589},{"id":172,"store_name":"Waitrose","store_postcode":"","lat":51.8030505,"lng":-0.2045855},{"id":173,"store_name":"Waitrose","store_postcode":"","lat":53.7550275,"lng":-0.4468722},{"id":174,"store_name":"Waitrose","store_postcode":"","lat":52.5752072,"lng":1.1237104},{"id":175,"store_name":"Waitrose","store_postcode":"","lat":51.1526649,"lng":-0.9678255},{"id":176,"store_name":"Waitrose","store_postcode":"","lat":51.4822522,"lng":-0.1351108},{"id":177,"store_name":"Waitrose","store_postcode":"","lat":51.3832721,"lng":-2.3587572},{"id":178,"store_name":"Waitrose","store_postcode":"","lat":51.4115868,"lng":-0.0263842},{"id":179,"store_name":"Waitrose","store_postcode":"","lat":52.0300533,"lng":-1.1488295},{"id":180,"store_name":"Waitrose","store_postcode":"","lat":51.3989948,"lng":0.0192932},{"id":181,"store_name":"Waitrose","store_postcode":"","lat":52.1716682,"lng":0.1108986},{"id":182,"store_name":"Waitrose","store_postcode":"","lat":50.7364388,"lng":-1.7778584},{"id":183,"store_name":"Waitrose","store_postcode":"","lat":51.2308545,"lng":-0.3341914},{"id":184,"store_name":"Waitrose","store_postcode":"","lat":52.1120843,"lng":-2.3285041},{"id":185,"store_name":"Waitrose","store_postcode":"","lat":51.3661738,"lng":-0.4005748},{"id":186,"store_name":"Waitrose","store_postcode":"","lat":51.0643124,"lng":-0.3300995},{"id":187,"store_name":"Waitrose","store_postcode":"","lat":51.5461246,"lng":-0.1795429},{"id":188,"store_name":"Waitrose","store_postcode":"","lat":51.5360097,"lng":-0.123455},{"id":189,"store_name":"Waitrose","store_postcode":"","lat":50.8637644,"lng":-1.2754012},{"id":190,"store_name":"Waitrose","store_postcode":"","lat":53.0799696,"lng":-0.8125106},{"id":191,"store_name":"Waitrose","store_postcode":"","lat":52.6001367,"lng":-1.0804116},{"id":192,"store_name":"Waitrose","store_postcode":"","lat":51.4657265,"lng":-1.0191415},{"id":193,"store_name":"Waitrose","store_postcode":"","lat":51.3405832,"lng":-0.7774913},{"id":194,"store_name":"Waitrose","store_postcode":"","lat":51.7495954,"lng":-0.9782691},{"id":195,"store_name":"Waitrose","store_postcode":"","lat":50.6999014,"lng":-3.249081},{"id":196,"store_name":"Waitrose","store_postcode":"","lat":52.182558,"lng":-2.195375},{"id":197,"store_name":"Waitrose","store_postcode":"","lat":51.5130083,"lng":-0.3213315},{"id":198,"store_name":"Waitrose","store_postcode":"","lat":53.3287758,"lng":-2.2298512}],
		/**
		 * App initiation;
		 * Application defaults
		 * Click events
		 * User inputs
		 * @param  {object} Override defaults
		 */
		init: function(args) {
			var self = Bamp;

			// Set args if given
			self.options = $.extend(self.options, args);

			// Create and save google map as variable
			self.map = new google.maps.Map(self.el.$map[0], {
				zoom: 6,
				center: self.options.coords,
				minZoom: 5, 
				maxZoom: 12
			});

			// Hide HTML5 navigatior API button if geolocation is not available
			if ( !('geolocation' in navigator) ) {
				self.el.$locate.hide();
			}

			// Location search form submit
			self.el.$search.on('submit', function() {

				// Get input value
				var search_val = self.el.$search.find('input').val();

				// Check if field has value, else reset map
				if ( $.trim( search_val ) ) {

					// Init google's geocoder API
					var geocoder = new google.maps.Geocoder();

					// Send GET request with search value
					geocoder.geocode({
						address: search_val,
						componentRestrictions: {
							country: 'UK'
						}
					}, function(results, status) {
						
						// If request response was successfull
						if (status === 'OK') {

							// Check we have the correct data
							if ( results[0].geometry ) {
								var lat = results[0].geometry.location.lat(),
									lng = results[0].geometry.location.lng();
								
								// Search for closest results
								self.fn.search(lat, lng);
							} else {
								window.console.warn('Results returned empty');
							}

						} else {
							window.console.warn('Geocode was not successful for the following reason: ' + status);
						}

					});

				} else {

					// If input was empty, assume user wanted to reset map and center
					self.fn.reset(true);
				}

				return false;
			});

			// Navigator API button
			self.el.$locate.on('click', function() {

				// Use HTML5 API to get users current position
				navigator.geolocation.getCurrentPosition(function(position) {
					var lat = position.coords.latitude,
						lng = position.coords.longitude;

					// Search for closest results
					self.fn.search(lat, lng);
				});

				return false;
			});

			// Reset button
			self.el.$reset.on('click', function() {

				// Reset and center map
				self.fn.reset(true);

				self.el.$search.find('input').val('');

				return false;
			});

		},
		/**
		 * All additional helper functions
		 */
		fn: {
			/**
			 * Rest map by clearing all markers
			 * @param  {boolean} recenter Option to recenter map to starting position
			 */
			reset: function(recenter) {
				var self = Bamp;

				// Set default value for paramater
				recenter = typeof recenter !== 'undefined' ? recenter : false;

				// Empty results dom elements
				self.el.$results.empty();

				// Reset current location marker
				if (self.var.current_location) {
					self.var.current_location.setMap(null);
				}

				// Clear all results markers
				if (self.var.closest_results.length) {
					for (i = 0; i < self.var.closest_results.length; i++) {
						self.var.closest_results[i].setMap(null);
					}

					// Reset array
					self.var.closest_results = [];
				}

				// Clear all locations markers
				if (self.var.location_markers.length) {
					for (i = 0; i < self.var.location_markers.length; i++) {
						self.var.location_markers[i].setMap(null);
					}

					// Reset array
					self.var.location_markers = [];
				}

				// Recenter map to default coords
				if (recenter) {
					self.map.setZoom(6);

					// If recenter param was object of coordinates, else use default
					if (typeof recenter === 'object') {
						self.map.setCenter(recenter);
					} else {
						self.map.setCenter(self.options.coords);
					}
				}

			},
			/**
			 * Search for closest results
			 * @param  {number} lat
			 * @param  {numbet} lng
			 */
			search: function(lat, lng) {
				var self = Bamp;

				// Clear all previous markers
				self.fn.reset();

				// Add users current location marker
				self.var.current_location = new google.maps.Marker({
					position: {
						lat: lat,
						lng: lng
					},
					map: self.map,
					icon: self.options.icons.user
				});	

				// Create a temporary clone of all locations for data manipulation
				var temp_locations = self.locations;

				// 1 Degree to radian
				var radian = Math.PI / 180;
				
				// Loop each location and determine distance
				for (i = 0; i < temp_locations.length; i++) {
					var location_lat	= temp_locations[i].lat,
						location_lng	= temp_locations[i].lng;
				
					var lat_rad			= ( location_lat - lat ) * radian,
						lng_rad			= ( location_lng - lng ) * radian;

					// Some crazy math shit.. don't know what it does, but it works (y) <-- only msn users will remeber that
					var area			= Math.sin(lat_rad/2) * Math.sin(lat_rad / 2) + Math.cos(lat * radian) * Math.cos(lat * radian) * Math.sin(lng_rad / 2) * Math.sin(lng_rad / 2),
						circumference	= 2 * Math.atan2(Math.sqrt(area), Math.sqrt(1 - area)),
						distance		= 6371 * circumference; // Radius of earth in km * value gives distance in miles

					// Add distance from search to location
					temp_locations[i].distance = distance;
				}

				// Sort locations by distance
				temp_locations.sort(function(a, b) {
					return a.distance - b.distance;
				});

				// Create map bounds
				var bounds = new google.maps.LatLngBounds();

				// Process each result
				for (i = 0; i < temp_locations.length; i++) {

					// Break at number of results
					if (i > self.options.results_to_show) {
						break;
					}

					var this_location = temp_locations[i];

					// Generate and bind events for result
					self.fn.process_result( this_location );

					// Extend map bounds
					bounds.extend({
						lat: this_location.lat,
						lng: this_location.lng
					});
				}

				// Will set map zoon and position to fit all markers
				self.map.fitBounds( bounds );

			},
			/**
			 * Generate DOM and bind events for result
			 * @param  {object} data Location data
			 */
			process_result: function(data) {
				var self = Bamp;

				// Check data is given
				if (data) {
					// Create DOM list item, this way processes quicker than:
					// $('<li>');
					var $li = $(document.createElement('li'));

					// Set element content
					$li.html( data.store_name+' - '+data.store_postcode );

					// Bind element click event
					$li.on('click', function() {

						// Center map of result marker
						self.map.setCenter({
							lat: data.lat,
							lng: data.lng
						});

						// Set active result
						self.fn.set_active_result( $li );

					});

					// Add result element to DOM
					self.el.$results.prepend( $li );

					// Create map marker for result
					var marker = new google.maps.Marker({
						position: {
							lat: data.lat,
							lng: data.lng
						},
						map: self.map,
						icon: self.options.icons.pin,
						info: data
					});

					// Add marker to array for resetting
					self.var.closest_results.push( marker );

					// Bind click event to marker
					google.maps.event.addListener(marker, 'click', function() {

						// Set active result
						self.fn.set_active_result( $li );

						// Prevent other actions from firing
						return false;
					});

					return $li;
				}

				// Log warning if no data was provided
				window.console.warn('No object passed to render location.');

				return false;
			},
			/**
			 * Set active result, posibility to run additional events
			 * e.g. GA tracking, AJAX request
			 * @param  {jquery object} jQuery element object
			 */
			set_active_result: function($li) {
				var self = Bamp;

				// Remove any currently active
				self.el.$results.find('.'+self.options.active_class).removeClass( self.options.active_class );

				// Add active class to relevent list item
				$li.addClass( self.options.active_class );
			}
		}
	};

	/**
	 * Initiate bam maps on window load (waits for google js api to load)
	 */
	$(window).load(function() {
		/**
		 * Accepts args e.g.
		 * 
		 * Bamp.init({
		 * 	results_to_show: 5,
		 * 	coords: {
		 * 		lat: 0.00000,
		 * 		lng: 0.00000
		 * 	}
		 * });
		 *
		 */
		Bamp.init();
	});


})(jQuery);










