/* @todo
 * modification de l'autoscout
 * https://github.com/baggachipz/TimerBar-jQuery-Plugin
 * canvas zoom http://jsfiddle.net/mBzVR/4/
 * http://lexadecimal.com/
 */
console.info('kocfia start');
//console.log(reloadParams);

/*
 * https://www314.kingdomsofcamelot.com/fb/e2/src/main_src.php?g=M&y=0&n=fb149&l=fr_FR&messagebox=&sp=MTMyNzI1MDYxN3ZCHE__I3GaJow-&standalone=1&pf=1&res=1&iframe=1&lang=fr&ts=1327252086.92&entrypt=kabamGameInfo&lp=index
 * https://www280.kingdomsofcamelot.com/fb/e2/src/main_src.php?g=&y=0&n=&l=fr_FR&messagebox=&sp=MTMyNzI0NjkxNVpEHE916vtk27A-&fbIframeOn=1&standalone=0&res=1&iframe=1&lang=fr&ts=1327252570.5915&s=280&appBar=&signed_request=vqZ8zHGizRd5MFAjJSDtgR9t-SK330EnSqFWL2WgtRA.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzMjcyNTg4MDAsImlzc3VlZF9hdCI6MTMyNzI1MjU2Niwib2F1dGhfdG9rZW4iOiJBQUFBQUhseVpBcjlzQkFPUVpDUHcyaXpIYTQ2NmNHZnNsNDI4akhnWkFTTUtEU3RhdnB3dTZZaU9wTllxcnRTeUtGeHREMWVXUDEweDExQjRlMVJiZmpKM1pDSVpCd2d1bG1IcWVnYlpDNFpBYzlIV3NBMnhBQUMiLCJ1c2VyIjp7ImNvdW50cnkiOiJmciIsImxvY2FsZSI6ImZyX0ZSIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjEwMDAwMTUxNTcxNzg0OCJ9
 *
 * open in a iframe on kabam site, get the seed with a grease monkey script and postMessage it to the main window
 */

/* helpers */
	/*
	 * jQuery each2 - v0.2 - 8/02/2010
	 * http://benalman.com/projects/jquery-misc-plugins/
	 *
	 * Inspired by James Padolsey's quickEach
	 * http://gist.github.com/500145
	 *
	 * Copyright (c) 2010 "Cowboy" Ben Alman
	 * Dual licensed under the MIT and GPL licenses.
	 * http://benalman.com/about/license/
	 */
	(function(a){var b=a([1]);a.fn.each2=function(d){var c=-1;while((b.context=b[0]=this[++c])&&d.call(b[0],c,b)!==false){}return this}})(jQuery);

	//localStorage method for caching javascript objects
		if( typeof window.Storage != "undefined" ){
			window.Storage.prototype.setObject = function(key, value){
				this.setItem(key, JSON.stringify(value));
			}

			window.Storage.prototype.getObject = function(key){
				return this.getItem(key) && JSON.parse( this.getItem(key) );
			}
		} else {
			alert('Pour utiliser ce script veuillez mettre à jour votre navigateur !');
		}

	String.prototype.capitalize = function(){
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	// Return new array with duplicate values removed
	Array.prototype.unique = function(){
		var a = [];
		var l = this.length;
		for( var i = 0; i < l; i += 1 ){
			for( var j= i + 1; j < l; j += 1 ){
				// If this[i] is found later in the array
				if( this[i] === this[j] ) j = ++i;
			}
			a.push(this[i]);
		}
		return a;
	};

	function uniqueObject( arr ){
		var hash = {}, result = [], i , length = arr.length;
		for( i = 0; i < length; i += 1 ){
			var key = JSON.stringify(arr[i]);
			if( !hash.hasOwnProperty( key ) ){
				hash[ key ] = true;
				result.push( arr[i] );
			}
		}
		return result;
	}

	function product(){
		return Array.prototype.reduce.call(arguments, function(as, bs){
			return [a.concat(b) for each (a in as) for each (b in bs)]
		}, [[]]);
	}

	Array.max = function( array ){
		return Math.max.apply( Math, array );
	};

	Array.min = function( array ){
		return Math.min.apply( Math, array );
	};

var KOCFIA = {};

jQuery(document).ready(function(){
//CSS rules declarations
	var confPanelCss  = "\n#kocfia-conf-panel .ui-icon-close { position: absolute; right: -3px; top: -3px; cursor: pointer; }";
		confPanelCss += "\n#kocfia-conf-panel { display: none; position: absolute; z-index: 100001; }";
		confPanelCss += "\n#kocfia-conf-panel label + select { margin-left: 5px; }";
		confPanelCss += "\n#kocfia-conf-panel .ui-icon-close { float: right; cursor: pointer; }";
		confPanelCss += "\n#kocfia-conf-panel .ui-icon-trash { cursor: pointer; display: inline-block; }";
		confPanelCss += "\n#kocfia-conf-panel ul:not(.ui-accordion-content) { margin: 5px; }";
		confPanelCss += "\n.kocfia-conf-panel-tab.on { background-image: -moz-linear-gradient(-45deg, green 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: -webkit-linear-gradient(-45deg, green 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: linear-gradient(-45deg, green 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-repeat: no-repeat, repeat-x; background-position: 0 0, 50% 50%; }";
		confPanelCss += "\n.kocfia-conf-panel-tab.off { background-image: -moz-linear-gradient(-45deg, red 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: -webkit-linear-gradient(-45deg, red 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: linear-gradient(-45deg, red 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-repeat: no-repeat, repeat-x; background-position: 0 0, 50% 50%; }";
		confPanelCss += "\n#kocfia-options p { margin: 3px 0; }";
		confPanelCss += "\n#kocfia-chat ul { padding-left: 0; }";
		confPanelCss += "\n.ui-tabs .ui-tabs-panel { overflow: auto; padding: 0; }";
		confPanelCss += "\n.ui-tabs-panel h3:not(.ui-accordion-header) { margin: 0;}";
		confPanelCss += "\n.ui-tabs-panel h3:not(.ui-accordion-header):not(:first-child) { margin: 4px 0; }";
		confPanelCss += "\n.ui-tabs-panel h3 p { float: right; font-size: 11px; margin: 0; }";
		confPanelCss += "\n.ui-tabs-panel h3 span { float: right; font-size: 11px; margin: 0 5px; cursor: pointer; }";
		confPanelCss += "\n.ui-tabs-panel .help { display:none; }";
		confPanelCss += "\n.ui-accordion .ui-accordion-header { text-indent: 30px; }";
		confPanelCss += "\n.mapLink { text-decoration: underline; color: blue; cursor: pointer; }";
		confPanelCss += "\n.ui-tabs-panel .infos span { float: right; margin-right: 5px; }";
		confPanelCss += "\n.ui-tabs-panel .accordion { clear: both; margin-top: 5px; }";
		confPanelCss += "\n.attack-form fieldset small { display: block; }";
		confPanelCss += "\n.attack-form .keep, .attack-form .add-wave, .attack-form .launch, .attack-form .save, .attack-form .saveAndLaunch { display: none; }";
		confPanelCss += "\n.attack-form { counter-reset: waves; }";
		confPanelCss += "\n.attack-form .wave legend::after { counter-increment: waves; content: ' ' counter(waves); }";
		confPanelCss += "\n.attack-form .wave label { display: inline-block; }";
		confPanelCss += "\n.attack-form .wave > label, .attack-form .unit-block label:first-child { min-width: 80px; }";
		confPanelCss += "\n.attack-form .unit-block select + label { margin-left: 10px; }";
		confPanelCss += "\n.attack-form .unit-qty { width: 60px; }";
		confPanelCss += "\n.attack-form textarea { width: 150px; height: 120px; }";
		confPanelCss += "\n.attack-form .builds { display: none; float: right; max-width: 220px; }";
		confPanelCss += "\n.attack-form .builds div { -moz-column-count: 2; -moz-column-gap: 5px; -webkit-column-count: 2; -webkit-column-gap: 5px; column-count: 2; column-gap: 5px; }";
		confPanelCss += "\n.attack-list.ui-accordion-content { padding: 2px; }";
		confPanelCss += "\n.attack-list table, .formation-list table { width: 100%; }";
		confPanelCss += "\n.attack-list .toggle, .formation-list .toggle { cursor: pointer; }";
		confPanelCss += "\n.attack-list .toggle .ui-icon, .formation-list .toggle .ui-icon { float: left; }";
		confPanelCss += "\n.attack-list thead th, .formation-list thead th { background-color: #cccccc; }";
		confPanelCss += "\n.attack-list tbody th, .formation-list tbody th { background-color: #e1d5d4; }";
		confPanelCss += "\n.attack-list tbody td, .formation-list tbody td { background-color: #fdf8f0; }";
		confPanelCss += "\n.attack-list img, .formation-list img { width: 18px; }";
		confPanelCss += "\n.attack-list th { padding: 2px; }";
		confPanelCss += "\n.attack-list td { padding: 2px; vertical-align: top; white-space: nowrap; }";
		confPanelCss += "\n.attack-list .actions, .attack-list .current { text-align: center; }";
		confPanelCss += "\n.attack-list .coords, .attack-list .info { white-space: normal; max-width: 200px; }";
		confPanelCss += "\n.attack-list td .ui-icon { float: left; margin: 0 2px; cursor: pointer; }";
		confPanelCss += "\n.attack-list td span:not(.ui-icon) { display: inline-block; padding-right: 5px; }";
		confPanelCss += "\n.attack-list .attack-errors { display: block; }";
		confPanelCss += "\n.kocfia-timer-div { position: absolute; color: red; font-weight: bold; left: 612px; display: none; font-family: Verdana, Helvetica, sans-serif; }";
		confPanelCss += "\n#kocfia-reload-msg { top: 3px; }";
		confPanelCss += "\n#general-refreshFrequency, #general-reloadFrequency { width: 30px; text-align: center; }";
		confPanelCss += "\n#kocfia-conf-panel .coord { width: 30px; text-align: center; }";
		confPanelCss += "\n#kocfia-map .save, #kocfia-map .filter { display: none; }";
		confPanelCss += "\n#kocfia-map .search-status { padding: 3px; text-align: center; }";
		confPanelCss += "\n#kocfia-map .search-result table { min-width: 50%; }";
		confPanelCss += "\n#kocfia-map .search-result textarea { float: right; width: 90px; height: 90px; }";
		confPanelCss += "\n#kocfia-formation .forms input[type=text] { width: 50px; text-align: center; }";
		confPanelCss += "\n#kocfia-formation .forms select { max-width: 100px }";
		confPanelCss += "\n#kocfia-formation .forms img { width: 18px; height: 18px; position: relative; top: 4px; }";
		confPanelCss += "\n#kocfia-formation .forms fieldset input + label, #kocfia-formation .forms fieldset select + label, #kocfia-formation .forms fieldset label + label, #kocfia-formation .forms fieldset button + label { margin: 0 3px 0 10px; }";
		confPanelCss += "\n#kocfia-formation .forms .save { float: right; }";
		confPanelCss += "\n#kocfia-formation .forms fieldset { clear: both; }";
		//confPanelCss += "\n.formation-list.ongoing .unit { display: inline-block; min-width: 80px; }";
		confPanelCss += "\n.attack-list.ongoing .ui-icon-trash { position: relative; top: 2px; }";
		confPanelCss += "\n.ongoing img { margin-right: 5px; width: 18px; height: 18px; position: relative; top: 2px; }";
		confPanelCss += "\n.ongoing .time { display: inline-block; margin-left: 10px; }";
		confPanelCss += "\n.ongoing.ui-accordion .ui-accordion-content { padding: 5px; }";
		confPanelCss += "\n.ongoing ol { margin:0; }";
		confPanelCss += "\n.ongoing table { width: 100%; }";
		confPanelCss += "\n.ongoing td { vertical-align: top; }";
		confPanelCss += "\n.ongoing .canceled, .ongoing .canceled span { text-decoration: line-though; }";
		confPanelCss += "\n.ongoing .canceled .ui-icon-trash { visibility: hidden; }";
		confPanelCss += "\n#kocfia-formation .ongoing thead th, #kocfia-formation .ongoing td { width: 30%; }";
		confPanelCss += "\n#kocfia-formation .ongoing thead tr th:last-child, #kocfia-formation .ongoing tr td:last-child { width: 40%; }";
		confPanelCss += "\n#kocfia-map-canvas { width: 350px; height: 350px; background: #000; }";
		confPanelCss += "\n#kocfia-gloryTournament .scout-form input[type=checkbox] + label { margin-right: 10px; }";

	var chatMoveableCss = ".kocmain .mod_comm { background: #FCF8DD; border: 1px solid #A56631; z-index: 99997; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_tabs { background-color: #1054A7; width: auto; top: 0; left: 0; height: 20px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_body { top: 20px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_body form { height: 25px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .mod_comm_forum { padding-left: 0; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction .button20 { top: 2px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction { width: auto; padding: 3px 5px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction #mod_comm_input { display: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction #mod_comm_input_clone { position: absolute; top: 5px; left: 5px; border: 1px solid #A56631; width: 265px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist { width: auto; margin-left: 0; border: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .kocfia-merlin-small { float: right; padding: 4px; font-size: 10px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .seltab1 a.tab2, .kocmain .mod_comm .seltab2 a.tab1 { height: 20px; line-height: 20px; padding: 0 5px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .seltab1 a.tab1, .kocmain .mod_comm .seltab2 a.tab2 { background: #FCF8DD; height: 20px; line-height: 20px; padding-right: 5px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .seltab1 a.tab1 span, .kocmain .mod_comm .seltab2 a.tab2 span { background: none; height: 20px; line-height: 20px; padding-left: 5px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content { width: auto; float: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .message.clearfix { width: auto; display: block; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info { width: auto; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info .nm { padding-left: 18px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info b { display: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .tx { width: auto; float: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .flag { display: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap img { margin-right: 0; width: 15px; height: 15px; float: none; position: absolute; top: 2px; left: 2px; cursor: pointer; z-index: 1; }";
		chatMoveableCss += "\n.kocmain .mod_comm .tx a { text-decoration: underline; }";
		chatMoveableCss += "\n.kocmain .mod_comm .tx a:hover { text-decoration: none; }";

	var chatHelpCss = ".kocmain .mod_comm .comm_global .chatlist .noalliance { display: none; }";
		chatHelpCss += "\n.kocmain .mod_comm.ui-draggable { display: block; }";

	var chatHighlightLeadersCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.chancellor:not(.direct) { background-color: #C3ECE4; }";
		chatHighlightLeadersCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.vice_chancellor:not(.direct) { background-color: #C7E3F7; }";
		chatHighlightLeadersCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.officer:not(.direct) { background-color: #D5D2F7; }";

	var chatHighlightFriendsCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.friend:not(.direct) { background-color: #FAE4E4; }";
	var chatHighlightFoesCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.foe:not(.direct) { background-color: #FFCAA2; }";

	var overviewCss = "#kocfia-overview { position:absolute; font: 10px/20px Verdana, sans serif; font-width: normal;  z-index: 100000; display: none; }";
		overviewCss += "\n#kocfia-overview .ui-icon-close { float: right; cursor: pointer; }";
		overviewCss += "\n#kocfia-overview > h3 { margin: 2px 0; text-indent: 10px; }";
		overviewCss += "\n#kocfia-overview .ui-tabs .ui-tabs-panel { padding: 2px; }";
		overviewCss += "\n#kocfia-overview .wrap { width: 100%; overflow: hidden; }";
		overviewCss += "\n#kocfia-overview table { width: 100%; float: left; }";
		overviewCss += "\n#kocfia-overview thead tr { display: block; position: relative; }";
		overviewCss += "\n#kocfia-overview tbody { overflow: auto; display: block; width: 100%; }";
		overviewCss += "\n#kocfia-overview tr.highlight td, #kocfia-overview th.highlight { background-color: #F8E0A8; }";
		overviewCss += "\n#kocfia-overview tr.highlight.toggle th, #kocfia-overview .toggle th.highlight, #kocfia-overview .toggle th { background-color: #CCC; }";
		overviewCss += "\n#kocfia-overview tr td.sum { background-color: #D9F4F1; }";
		overviewCss += "\n#kocfia-overview img { width:20px; }";
		overviewCss += "\n#kocfia-overview tr td.sum, #kocfia-overview tr td.sum ~ td { text-align: right; }";
		overviewCss += "\n#kocfia-overview .toggle th { width: auto; cursor: pointer; }";
		overviewCss += "\n#kocfia-overview .details-toggle { margin-left: 10px; font-size: 10px; font-weight: normal; }";
		overviewCss += "\n#kocfia-overview .details-toggle label { cursor: pointer; }";
		overviewCss += "\n#kocfia-overview .details-toggle label:not(:last-child) { padding-right: 8px; }";
		overviewCss += "\n#kocfia-overview .details-toggle input { position: relative; top: 2px; }";
		overviewCss += "\n#kocfia-overview .toggle .ui-icon { float: left; }";
		overviewCss += "\n#kocfia-overview .img { width: 20px; }";
		overviewCss += "\n#kocfia-overview .label { width: 100px; text-overflow: ellipsis; }";
		overviewCss += "\n#kocfia-overview .sum { width: 55px; }";
		overviewCss += "\n#kocfia-overview thead tr th:last-child, #kocfia-overview thead tr td:last-child { width: auto; }";
		overviewCss += "\n#kocfia-overview .sizer td, #kocfia-overview .sizer td.sum, #kocfia-overview .sizer.highlight td { height: 1px; line-height: 1px; background-color: black; padding: 0; }";

	var notepadCss = "#kocfia-notepad { padding: 2px 3px; }";
		notepadCss += "\n#kocfia-notepad { position:absolute; font: 10px/20px Verdana, sans serif; font-width: normal;	z-index: 100000; display: none; }";
		notepadCss += "\n#kocfia-notepad .ui-icon-close { float: right; cursor: pointer; }";
		notepadCss += "\n#kocfia-notepad .wrap { width: 100%; overflow: auto; }";
		notepadCss += "\n#kocfia-notepad textarea { width: 100%; height: 150px; box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }";
		notepadCss += "\n#kocfia-notepad .wrap input + label { display: block; }";
		notepadCss += "\n#kocfia-notepad .charsLeft { float: right; }";
		notepadCss += "\n#kocfia-notepad ul { display: block; -moz-column-count: 3; -moz-column-gap: 1em; -webkit-column-count: 3; -webkit-column-gap: 1em; column-count: 3; column-gap: 1em; }";
		notepadCss += "\n#kocfia-notepad li .ui-icon { display: inline-block; }";
		notepadCss += "\n#kocfia-notepad li { white-space: nowrap; }";
		notepadCss += "\n#kocfia-notepad li button { max-width: 120px; text-overflow: ellipsis; overflow: hidden; }";

//prototype json.stringify bug with array
	if( window.Prototype ){
		delete Object.prototype.toJSON;
		delete Array.prototype.toJSON;
		delete Hash.prototype.toJSON;
		delete String.prototype.toJSON;
	}

(function($){
	//pointers
		var $head = $('head'),
			$body = $('body'),
			$chatInput = $('#mod_comm_input'),
			$chatGeneral = $('#mod_comm_list1'),
			$chatAlliance = $('#mod_comm_list2'),
			$chat = $('#kocmain_bottom').find('.mod_comm');

	var reloadTimeout, reloadInterval, reloadTimer, refreshTimeout,
		merlinBoxClick = false;

	KOCFIA = {
		'server': null,
		'modules': ['chat', 'fbWallPopup', 'overview', 'wilderness', 'notepad', 'map', 'formation'], //, 'gloryTournament'],
		'modulesLabel': {
			'wilderness': 'TS',
			'darkForest': 'FS',
			//'gloryTournament': 'Tournoi de Gloire',
		},
		'stored': ['conf'],
		//'ajax': [],
		'init': function(){
			console.info('KOCFIA init function');

			//get server id
				KOCFIA.server = KOCFIA.shared.getServer();
				console.info('server', KOCFIA.server);
				if( KOCFIA.server == null ){
					console.error('wrong server id');
					return;
				}

			//get user id
				KOCFIA.kabamuid = KOCFIA.shared.getUserId();
				console.info('kabamuid', KOCFIA.kabamuid);
				if( KOCFIA.kabamuid == null ){
					console.error('wrong user id');
					return;
				}

			KOCFIA.storeUniqueId = KOCFIA.server + '_' + KOCFIA.kabamuid;

			//gather the default conf
				console.time('default conf gathering');
				var i, modulesLength = KOCFIA.modules.length;
				for( i = 0; i < modulesLength; i += 1 ){
					var mod = KOCFIA.modules[i];
					KOCFIA.defaultConf[mod] = KOCFIA[mod].options;
				}
				KOCFIA.conf = KOCFIA.defaultConf;
				console.timeEnd('default conf gathering');

			//get stored conf if present
				try {
					var storedConf = localStorage.getObject('kocfia_conf_' + KOCFIA.storeUniqueId);
					if( storedConf ){
						$.extend(true, KOCFIA.conf, storedConf);
						console.info('used stored conf');
					}
				} catch( e ){
					console.error(e);
				}
				//console.log(KOCFIA.conf);

			//set message event listener
			//used to pass data between iframes
				window.addEventListener('message', function(event){
					//return the conf values for fbWallPopup module
					if( event.origin.indexOf('facebook.com') != -1 ){
						event.source.postMessage(KOCFIA.conf.fbWallPopup, 'https://apps.facebook.com/');
						event.source.postMessage(KOCFIA.conf.fbWallPopup, 'http://apps.facebook.com/');
					}
					return;
				}, false);

				top.postMessage('loaded1', 'https://apps.facebook.com/');
				top.postMessage('loaded2', 'http://apps.facebook.com/');
				//top.postMessage('loaded3', window.location.href);
				window.setInterval(function(){
					top.postMessage('loaded1', 'https://apps.facebook.com/');
					top.postMessage('loaded2', 'http://apps.facebook.com/');
					//top.postMessage('loaded3', window.location.href);
				}, 10000);

			//gather stored items list for deletion ease
				for( i = 0; i < modulesLength; i += 1 ){
					var mod = KOCFIA.modules[i];
					if( KOCFIA[mod].stored ){
						var j, length = KOCFIA[mod].stored.length;
						for( j = 0; j < length; j += 1 ){
							KOCFIA.stored.push( mod + '_' + KOCFIA[mod].stored[j] );

							try{
								var stored = localStorage.getObject('kocfia_' + mod + '_' + KOCFIA[mod].stored[j] + '_' + KOCFIA.storeUniqueId);
								if( stored ){
									KOCFIA[mod][ KOCFIA[mod].stored[j] ] = stored;
								}
							} catch(e){
								alert(e);
							}

						}
					}
				}

			//ajax sniffer
				console.time('sniffer');
				KOCFIA.ajaxSniffer();
				console.timeEnd('sniffer');

			//get player cities
				KOCFIA.shared.getCities();

			//configuration panel
				console.time('confPanel');
				KOCFIA.confPanel();
				console.timeEnd('confPanel');

			//modules init
				var initModule = function(i){
					//delayed init for modules
					window.setTimeout(function(){
						console.time('kocfia '+ KOCFIA.modules[i] +' on');
						KOCFIA[ KOCFIA.modules[i] ].on();
						console.timeEnd('kocfia '+ KOCFIA.modules[i] +' on');
					}, i * 1000 + 1000);
				};

				for( i = 0; i < modulesLength; i += 1 ){
					if( KOCFIA.conf[KOCFIA.modules[i]].active ){
						initModule(i);
					}
				}

			//refresh button
				KOCFIA.$buttons.append(
					$('<button id="kocfia-refresh-seed">')
						.html('Raffraîchir')
						.attr('title', 'Force la mise à jour des données du jeux, sauf les troupes.')
						.click(function(e){ KOCFIA.shared.updateSeed(); })
				);
				KOCFIA.$refreshButton = $('#kocfia-refresh-seed');

				KOCFIA.$buttons.append(
					$('<button id="kocfia-free-knights">')
						.html('Rappeler les chevaliers perdus')
						.click(function(e){
							for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
								KOCFIA.shared.freeKnights( KOCFIA.citiesKey[i] );
							}
						})
				);

			//map links
				$body.on('click', '.mapLink', function(){
					var coord = $(this).text().split(',');
					window.Modal.hideModalAll();
					window.changeview_map( document.getElementById('mod_views_map') );
					$('#mapXCoor').val( coord[0] );
					$('#mapYCoor').val( coord[1] );
					window.reCenterMapWithCoor();
				});

			//reload game form
				var $form = $('<form>', { 'id': 'kocfia-reload', 'target': '_top', 'action': '', 'method': 'post' });
				$form.append(' <input type="hidden" name="s" value="'+ KOCFIA.storeUniqueId +'">');
				$body.append( $form.hide() );

			//reload timeout
				$body.append('<div id="kocfia-reload-msg" class="kocfia-timer-div">Rechargement de la page dans : <span class="kocfia-timer"></span></div>');
				KOCFIA.$reloadTimer = $('#kocfia-reload-msg');
				if( KOCFIA.conf.general.reload ){
					KOCFIA.shared.reloadCountdown(1);
				}

			//refresh data
				if( KOCFIA.conf.general.refresh ){
					KOCFIA.shared.refreshCountdown(1);
				}

			//merlin box
				$body.on('click', '.mod_comm_mmb, .kocfia-merlin-small', function(){
					merlinBoxClick = true;
				});

				if( KOCFIA.conf.general.hideMagicalBoxPreview ){
					var i = 0;
					var hideMerlinPreview = window.setInterval(function(){
						if( $('#modalBox1').is(':visible') ){
							if( $('#modalTitle1').text().indexOf('Merlin') > -1 ){
								window.Modal.hideModal();
								clearInterval(hideMerlinPreview);
							}
						}
						i += 1;
						if( i > 30 ) clearInterval(hideMerlinPreview);
					}, 1000);
				}

			//other players court invitations
				if( KOCFIA.conf.general.hideOtherPlayersCourtInvitation ){
					var i = 0;
					var hideViewCourt = window.setInterval(function(){
						if( $('#modalBox1').is(':visible') && $('#modalBox1').hasClass('modalBoxUEP') ){
							window.Modal.hideModal();
							clearInterval(hideViewCourt);
						}
						i += 1;
						if( i > 30 ) clearInterval(hideViewCourt);
					}, 1000);
				}

			//fair popup
				if( KOCFIA.conf.general.hideFairPopup ){
					var i = 0;
					var hideViewCourt = window.setInterval(function(){
						if( $('#modalBox1').is(':visible') && $('#modalBox1').hasClass('modalBoxUEP') ){
							$('#modalContent1').find('.button20.sendfriendbtn').click();
							clearInterval(hideViewCourt);
						}
						i += 1;
						if( i > 30 ) clearInterval(hideViewCourt);
					}, 1000);
				}
		},
		/* default configuration */
			//each module has its own default conf
			'defaultConf': {
				'general': {
					'reload': 0,
					'reloadFrequency': 30,
					'refresh': 0,
					'refreshFrequency': 30,
					'hideMagicalBoxPreview': 0,
					'hideOtherPlayersCourtInvitation': 0,
					'hideFairPopup': 0,
				},
				'confPanel': {
					'position': {'top': 100, 'left': 100},
					'size': {'width': 550, 'height': 350},
					'selected': 0,
					'visible': 0,
				}
			},
		/* DATA */
			'cities': {},//cityXXXX:{'id','name','coords': {x,y}}, ...]
			'citiesKey': [],
			'resources': [
				{'name': 'gold', 'label': 'Or', 'key': 'rec0', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{'name': 'resource1x3600', 'label': 'Nourriture', 'key': 'rec1', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2x3600', 'label': 'Bois', 'key': 'rec2', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3x3600', 'label': 'Pierre', 'key': 'rec3', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4x3600', 'label': 'Minerai', 'key': 'rec4', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
				{'name': 'resource7', 'label': 'Pierre d\'Ether', 'key': '7', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/aetherstone_30.png'},
			],
			'resources_cap': [
				{'name': 'resource1Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			'resources_production_detail': [
				{'rows': 6, 'name': 'resource1', 'label': ['base', 'gardien', 'chevalier', 'technologie', 'TS', 'sort'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'rows': 6, 'name': 'resource2', 'label': ['base', 'gardien', 'chevalier', 'technologie', 'TS', 'sort'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'rows': 6, 'name': 'resource3', 'label': ['base', 'gardien', 'chevalier', 'technologie', 'TS', 'sort'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'rows': 6, 'name': 'resource4', 'label': ['base', 'gardien', 'chevalier', 'technologie', 'TS', 'sort'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			'resources_production_barbarian': [
				{'name': 'gold', 'label': 'camps barbare', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{'name': 'resource1', 'label': 'camps barbare', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2', 'label': 'camps barbare', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3', 'label': 'camps barbare', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4', 'label': 'camps barbare', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			'resources_consumption': [
				{'rows': 2, 'name': 'gold', 'label': ['dépense', 'formation'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{'rows': 2, 'name': 'resource1', 'label': ['dépense', 'formation'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'rows': 2, 'name': 'resource2', 'label': ['dépense', 'formation'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'rows': 2, 'name': 'resource3', 'label': ['dépense', 'formation'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'rows': 2, 'name': 'resource4', 'label': ['dépense', 'formation'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			'resources_production_total': [
				{'name': 'gold', 'label': 'total', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{'name': 'resource1', 'label': 'total', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2', 'label': 'total', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3', 'label': 'total', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4', 'label': 'total', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			'resources_autonomy': [
				{'name': 'gold', 'label': 'autonomie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{'name': 'resource1x3600', 'label': 'autonomie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2x3600', 'label': 'autonomie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3x3600', 'label': 'autonomie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4x3600', 'label': 'autonomie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			'population': [
				{'rows': 4, 'name': ['population', 'populationCap', 'laborPopulation', 'availablePopulation'], 'label': ['population', 'plafond', 'péon', 'glandeur'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/population_40.png'},
				{'name': 'taxRate', 'label': 'taxation', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/taxes.png'},
				{'name': 'hapiness', 'label': 'bonheur', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/happiness.png'},
			],
			'troops': [
				{'name': 'unt1', 'label': 'Ravitailleur', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_1_30_s34.jpg'},
				{'name': 'unt2', 'label': 'Milicien', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_2_30_s34.jpg'},
				{'name': 'unt3', 'label': 'Eclaireur', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_3_30_s34.jpg'},
				{'name': 'unt4', 'label': 'Piquier', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_4_30_s34.jpg'},
				{'name': 'unt5', 'label': 'Paladin', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_5_30_s34.jpg'},
				{'name': 'unt6', 'label': 'Archer', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_6_30_s34.jpg'},
				{'name': 'unt7', 'label': 'Cavalerie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_7_30_s34.jpg'},
				{'name': 'unt8', 'label': 'Cavalerie Lourde', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_8_30_s34.jpg'},
				{'name': 'unt9', 'label': 'Wagon', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_9_30_s34.jpg'},
				{'name': 'unt10', 'label': 'Baliste', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_10_30_s34.jpg'},
				{'name': 'unt11', 'label': 'Bélier', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_11_30_s34.jpg'},
				{'name': 'unt12', 'label': 'Catapulte', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_12_30_s34.jpg'},
			],
			'troops_barbarian': [
				{'name': 'unt1', 'label': 'Ravitailleur', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_1_30_s34.jpg'},
				{'name': 'unt2', 'label': 'Milicien', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_2_30_s34.jpg'},
				{'name': 'unt3', 'label': 'Eclaireur', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_3_30_s34.jpg'},
				{'name': 'unt4', 'label': 'Piquier', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_4_30_s34.jpg'},
				{'name': 'unt5', 'label': 'Paladin', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_5_30_s34.jpg'},
				{'name': 'unt6', 'label': 'Archer', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_6_30_s34.jpg'},
				{'name': 'unt7', 'label': 'Cavalerie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_7_30_s34.jpg'},
				{'name': 'unt8', 'label': 'Cavalerie Lourde', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_8_30_s34.jpg'},
				{'name': 'unt9', 'label': 'Wagon', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_9_30_s34.jpg'},
				{'name': 'unt10', 'label': 'Baliste', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_10_30_s34.jpg'},
				{'name': 'unt11', 'label': 'Bélier', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_11_30_s34.jpg'},
				{'name': 'unt12', 'label': 'Catapulte', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_12_30_s34.jpg'},
			],
			'defenses': [
				{'name': 'fort53', 'label': 'Arbalètes', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_53_30.jpg'},
				{'name': 'fort55', 'label': 'Trébuchets', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_55_30.jpg'},
				{'name': 'fort60', 'label': 'Pièges', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_60_30.jpg'},
				{'name': 'fort61', 'label': 'Chausse-trapes', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_61_30.jpg'},
				{'name': 'fort62', 'label': 'Palissades', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_62_30.jpg'},
			],
			'inSeed': {
				'population': {
					'population': {'index': 0, 'var': 'pop'},
					'populationCap': {'index': 1, 'var': 'pop'},
					'laborPopulation': {'index': 3, 'var': 'pop'},
					'taxRate': {'index': 1, 'var': 'gold'},
					'hapiness': {'index': 2, 'var': 'pop'},
				},
				'resources': {
					'gold': {'index': 0, 'var': 'gold'},
					'resource1x3600': {'index': 0, 'type': 'rec1', 'var': 'res'},
					'resource2x3600': {'index': 0, 'type': 'rec2', 'var': 'res'},
					'resource3x3600': {'index': 0, 'type': 'rec3', 'var': 'res'},
					'resource4x3600': {'index': 0, 'type': 'rec4', 'var': 'res'},
					'resource7': {'index': 0, 'type': 'rec5', 'var': 'res'},
				},
				'resources_cap': {
					'resource1Capx3600': {'index': 1, 'type': 'rec1', 'var': 'res'},
					'resource2Capx3600': {'index': 1, 'type': 'rec2', 'var': 'res'},
					'resource3Capx3600': {'index': 1, 'type': 'rec3', 'var': 'res'},
					'resource4Capx3600': {'index': 1, 'type': 'rec4', 'var': 'res'},
				},
				'resources_consumption': {
					'gold': {'index': 2, 'var': 'gold'},
					'resource1': {'index': 3, 'type': 'rec1', 'var': 'res'},
					'resource2': {'index': 3, 'type': 'rec2', 'var': 'res'},
					'resource3': {'index': 3, 'type': 'rec3', 'var': 'res'},
					'resource4': {'index': 3, 'type': 'rec4', 'var': 'res'},
				},
			},
		/* AJAX SNIFFER */
			'ajaxSniffer': function(){
				console.info('KOCFIA ajaxSniffer function');
				XMLHttpRequest.prototype.oldOpen = XMLHttpRequest.prototype.open;
				var newOpen = function(method, url, async, user, password){
					var filename = url.substring(url.lastIndexOf('/')+1);

					//KOCFIA.ajax[filename] = (KOCFIA.ajax[filename] || 0) + 1;

					//this.addEventListener('load', function(){ KOCFIA.ajax[filename] = KOCFIA.ajax[filename] - 1; });
					//this.addEventListener('abort', function(){ KOCFIA.ajax[filename] = KOCFIA.ajax[filename] - 1; });
					//this.addEventListener('error', function(){ KOCFIA.ajax[filename] = KOCFIA.ajax[filename] - 1; });

					switch(filename){
						case 'getChat.php':
							this.addEventListener("load", function(){
								if( KOCFIA.conf.chat.active && ( KOCFIA.conf.chat.cleanHelp || KOCFIA.conf.chat.highlightLeaders || KOCFIA.conf.chat.highlightFriends || KOCFIA.conf.chat.highlightFoes ) ){
									try {
										var r = JSON.parse(this.responseText);
										if( r.data && r.data.newChats ){
											if( r.data.newChats['2'] && r.data.newChats['2'].length > 0 ){
												if( KOCFIA.conf.chat.cleanHelp ) KOCFIA.chat.cleanHelp( r.data.newChats[2] );
												if( KOCFIA.conf.chat.highlightLeaders ) KOCFIA.chat.highlightLeaders( $chatAlliance, r.data.newChats['2'].length );
											}
											if( r.data.newChats['1'] && r.data.newChats['1'].length > 0 ){
												if( KOCFIA.conf.chat.highlightLeaders ) KOCFIA.chat.highlightLeaders( $chatGeneral, r.data.newChats['1'].length );
												if( KOCFIA.conf.chat.highlightFriends || KOCFIA.conf.chat.highlightFoes ) KOCFIA.chat.highlightFriendsAndFoes( r.data.newChats['1'].length );
											}
										}
									} catch(e){
										console.warn(e);
									}
								}
							}, false);
							break;
						case 'allianceGetLeaders.php':
							this.addEventListener("load", function(){
								if( KOCFIA.conf.chat.active && KOCFIA.conf.chat.highlightLeaders ){
									console.time('allianceGetLeaders load');
									var r = JSON.parse(this.responseText);
									if( r.officers ){
										KOCFIA.chat.leaders = {};
										for( var o in r.officers ){
											if( r.officers.hasOwnProperty(o) ){
												KOCFIA.chat.leaders[ r.officers[o].genderAndName ] = r.officers[o].type.toLowerCase();
											}
										}
									}
									KOCFIA.chat.highlightLeaders( $chatAlliance, 0 );
									KOCFIA.chat.highlightLeaders( $chatGeneral, 0 );
									console.timeEnd('allianceGetLeaders load');
								}
							}, false);
							break;
						//with update seed
						case 'allianceLeave.php':
						case 'assignknight.php':
						case 'boostCombat.php':
						case 'boostKnight.php':
						case 'boostProduction.php':
						case 'buyWildTraps.php':
						case 'buyItem.php':
						case 'cancelConstruction.php':
						case 'cancelFortifications.php':
						case 'cancelTraining.php':
						case 'changename.php':
						case 'construct.php':
						case 'courtSelectItem.php':
						case 'destroyBuilding.php':
						case 'destruct.php':
						case 'dismissUnits.php':
						case 'doveOut.php':
						case 'experienceKnight.php':
						case 'fertilizePeople.php':
						case 'fireKnight.php':
						case 'fogUser.php':
						case 'fortify.php':
						case 'gate.php':
						case 'hireknight.php':
						case 'hireSpecialKnight.php':
						case 'hireWildMerc.php':
						case 'hypnotize.php':
						case 'itemChest.php':
						case 'kickoutReinforcements.php':
						case 'magicalboxPick.php':
						case 'medals.php':
						case 'progressTutorial.php':
						case 'quest.php':
						case 'reduceTroopUpkeep.php':
						case 'relocate.php':
						case 'relocateAndChangename.php':
						case 'research.php':
						case 'resetKnight.php':
						case 'resourceCrate.php':
						case 'rewardKnight.php':
						case 'speedupConstruction.php':
						case 'speedupFortify.php':
						case 'speedupMarch.php':
						case 'speedupResearch.php':
						case 'speedupTrade.php':
						case 'speedupTraining.php':
						case 'skillupKnight.php':
						case 'trade.php':
						case 'train.php':
						case 'undefend.php':
						case 'untrade.php':
						case 'updateSeed.php':
						case 'useMysteryChest.php':
						case 'vacationMode.php':
						case 'volunteee.php':
							this.addEventListener("load", function(){
								window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 500);
							}, false);
							break;
						case 'changeCityName.php':
							this.addEventListener("load", function(){
								window.setTimeout(function(){
									KOCFIA.shared.getCities();
									KOCFIA.overview.updateFromSeed();
								}, 500);
							}, false);
							break;
						case 'abandonWilderness.php':
						case 'changeTax.php':
						case 'getCityTradeStatus.php':
						case 'levyGold.php':
						case 'spreadWealth.php':
							this.addEventListener("load", function(){
								try{
									var r = JSON.parse(this.responseText);
									if( r.updateSeed ) window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 500);
								} catch(e){
									window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 500);
									console.warn(e);
								}
							}, false);
							break;
						case 'march.php':
							this.addEventListener("load", function(){
								try{
									var r = JSON.parse(this.responseText);
									if( r.ok ) window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 500);
								} catch(e){
									window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 500);
									console.warn(e);
								}
							}, false);
							break;
						case 'cancelMarch.php':
							this.addEventListener("load", function(){
								window.setTimeout(function(){
									if( $('#modalBox1').is(':visible') && $('#modalBox1').find('.kofcalert').length ){
										window.Modal.hideModal();
									}
								}, 300);
								window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 500);
							}, false);
							break;
						case 'magicalboxPreview.php':
							this.addEventListener("load", function(){
								//using merlinBoxClick flag to avoid closing the modal on game asked by the user
								if( KOCFIA.conf.general.hideMagicalBoxPreview && !merlinBoxClick ){
									window.setTimeout(function(){ window.Modal.hideModal(); }, 300);
								}
								merlinBoxClick = false;
							}, false);
							break;
						case 'viewCourt.php':
							this.addEventListener("load", function(){
								if( KOCFIA.conf.general.hideOtherPlayersCourtInvitation ){
									window.setTimeout(function(){ window.Modal.hideModal(); }, 300);
								}
							}, false);
							break;
						case 'rollFriendChance.php':
							this.addEventListener("load", function(){
								if( KOCFIA.conf.general.hideFairPopup ){
									window.setTimeout(function(){ $('#modalContent1').find('.button20.sendfriendbtn').click(); }, 300);
								}
							}, false);
							break;
						case '_dispatch.php':
							this.addEventListener("load", function(){
								window.setTimeout(function(){
									KOCFIA.chat.cleanHelp(0); //to clean self construction help messages
									KOCFIA.overview.updateFromSeed();
								}, 500);
							}, false);
							break;
					}

					this.oldOpen(method, url, async, user, password);
				}
				XMLHttpRequest.prototype.open = newOpen;
			},
		/* CONFIGURATION PANEL */
			'confPanel': function(){
				console.info('KOCFIA confPanel function');
				$head.append( $('<style>').html(confPanelCss) );

				var $confPanel = $('<div id="kocfia-conf-panel">');

				var $optionsSection = $('<div id="kocfia-options">'),
					lis = '<li><a href="#kocfia-options">Options</a></li>',
					sections = '';

				var i, modulesLength = KOCFIA.modules.length;
				for( i = 0; i < modulesLength; i += 1 ){
					var mod = KOCFIA.modules[i];
					if( typeof KOCFIA[mod].modPanel == 'function' ){
						var active = KOCFIA.conf[mod].active;
						var name = ( KOCFIA.modulesLabel[mod] ? KOCFIA.modulesLabel[mod] : mod.capitalize() );
						lis += '<li class="kocfia-conf-panel-tab '+ (active ? 'on' : 'off') +'">';
						lis += '<a href="#kocfia-'+ mod +'">'+ name +'</a>';
						lis += '</li>';
						sections += '<div id="kocfia-'+ mod +'"></div>';
					}
				}

				console.time('shared option panel');
				KOCFIA.shared.optionPanel( $optionsSection );
				console.timeEnd('shared option panel');

				//manage the checked status change of the options
				$confPanel
					.on('click', '.ui-icon-info', function(){
						var $this = $(this),
							pos = $this.offset(),
							id = '#' + $this.closest('.ui-tabs-panel').attr('id') + '-help';
						$(id).dialog('option', 'position', [pos.left, pos.top]).dialog('open');
					})
					.on('change', '.conf-toggle', function(){
						var $this = $(this),
							infos = this.id.split('-'),
							mod = infos[0],
							func = infos[1],
							status = null;

						if( func == 'active' ){
							KOCFIA.$confPanelNav.find('li').find('a').filter('[href=#kocfia-'+ mod +']').parent().toggleClass('on off');
						}

						if( $this.is(':checked') ){
							status = 1;
							if( func == 'active' ) func = 'on';
							else func += 'On';
						} else {
							status = 0;
							if( func == 'active' ) func = 'off';
							else func += 'Off';
						}

						KOCFIA.conf[ mod ][ infos[1] ] = status;

						if( mod == 'general' ){
							if( infos[1] == 'reload' ){
								KOCFIA.shared.reloadCountdown(status);
							}
							if( infos[1] == 'refresh' ){
								KOCFIA.shared.refreshCountdown(status);
							}
						}

						if( $this.is('input[type=radio]') ){
							var $linked = $this.siblings('input').filter('[type=radio]').each(function(){
								var infos = this.id.split('-');
								KOCFIA.conf[ infos[0] ][ infos[1] ] = 0;
								var func = infos[1] + 'Off';

								if( typeof KOCFIA[ mod ][ func ] == 'function' ) KOCFIA[ mod ][ func ]();
							});
						}

						KOCFIA.shared.storeConf();

						if( KOCFIA[ mod ] && typeof KOCFIA[ mod ][ func ] == 'function' ) KOCFIA[ mod ][ func ]();
						//else console.warn('not a function', mod, func);
					})
					.on('change', '.conf-choice', function(){
						var $this = $(this),
							infos = this.id.split('-');
						KOCFIA.conf[ infos[0] ][ infos[1] ] = $this.val();
						KOCFIA.shared.storeConf();
					})
					.on('click', '.conf-action', function(e){
						e.preventDefault();
						var $this = $(this),
							infos = $this.attr('rel').split('-'),
							param = $this.data('param');
						if( param ){
							KOCFIA[ infos[0] ][ infos[1] ](param);
						} else {
							KOCFIA[ infos[0] ][ infos[1] ]();
						}
					});

				$confPanel
					.append( '<span class="ui-icon ui-icon-close"></span>' )
					.append( '<nav id="kocfia-conf-panel-tabs"><ul>' + lis + '</ul></nav>' )
					.append( $optionsSection )
					.append( sections )
					.draggable({
						helper: "original",
						appendTo: 'body',
						containment: 'parent',
						scroll: true,
						distance: 20,
						stop: function(event, ui){
							KOCFIA.conf.confPanel.position = ui.position;
							KOCFIA.shared.storeConf();
						}
					})
					.resizable({
						minWidth: 250,
						minHeight: 250,
						handles: 'n, e, s, w, ne, se, sw, nw',
						resize: function(event, ui){
							KOCFIA.$confPanelTabs.css('height', KOCFIA.calcConfPanelInnerHeight());
						},
						stop: function(event, ui){
							KOCFIA.conf.confPanel.size = ui.size;
							KOCFIA.shared.storeConf();
						}
					})
					.tabs({
						collapsible: true,
						selected: KOCFIA.conf.confPanel.selected,
						select: function(event, ui){
							//save the selected panel index
							KOCFIA.conf.confPanel.selected = ui.index;
							KOCFIA.shared.storeConf();

							//dynamic generation of the panel on first call
							if( $(ui.panel).html().length == 0 ){
								var mod = ui.panel.id.split('-')[1];
								KOCFIA[mod].modPanel();
							}
						},
					})
					.css({
						'top': KOCFIA.conf.confPanel.position.top,
						'left': KOCFIA.conf.confPanel.position.left,
						'width': KOCFIA.conf.confPanel.size.width,
						'height': KOCFIA.conf.confPanel.size.height
					})
					.find('.ui-icon-close').click(function(e){
						e.preventDefault();
						KOCFIA.$confPanel.hide();
						KOCFIA.conf.confPanel.visible = 0;
						KOCFIA.shared.storeConf();
					});

				var $confPanelToggle = $('<button id="kocfia-conf-panel-toggle">').html('KOCFIA');
				$confPanelToggle.click(function(){
					console.info('$kocConfPanelToggle click');
					KOCFIA.$confPanel.toggle();
					KOCFIA.conf.confPanel.visible = (KOCFIA.$confPanel.is(':visible') ? 1 : 0);
					KOCFIA.shared.storeConf();

					KOCFIA.$confPanelTabs.css('height', KOCFIA.calcConfPanelInnerHeight());
				});

				$body.append( $confPanel );
				$('#kocfia-options').accordion({collapsible: true, autoHeight: false});

				$('<div id="kocfia-buttons">')
					.html( $confPanelToggle )
					.insertBefore( $('#main_engagement_tabs') );
				KOCFIA.$buttons = $('#kocfia-buttons');

				KOCFIA.$confPanel = $('#kocfia-conf-panel');
				KOCFIA.$confPanelNav = $('#kocfia-conf-panel-tabs');
				KOCFIA.$confPanelTabs = KOCFIA.$confPanel.find('.ui-tabs-panel');

				for( i = 0; i < modulesLength; i += 1 ){
					var mod = KOCFIA.modules[i];
					if( typeof KOCFIA[ mod ].modPanel == 'function' ) KOCFIA[ mod ].modPanel();
				}

				if( KOCFIA.conf.confPanel.visible ){
					KOCFIA.$confPanel.show();
					KOCFIA.$confPanelTabs.css('height', KOCFIA.calcConfPanelInnerHeight());
				}
			},
			'calcConfPanelInnerHeight': function(){
				return KOCFIA.$confPanel.innerHeight() - KOCFIA.$confPanelNav.height() - 20;
			},
		/* SHARED */
			'shared': {
				'storeConf': function(){
					console.info('KOCFIA storeConf function', KOCFIA.conf);
					localStorage.setObject('kocfia_conf_' + KOCFIA.storeUniqueId, KOCFIA.conf);
				},
				'cleanLocalStorage': function(){
					console.info('KOCFIA shared cleanLocalStorage function');
					var i, length = KOCFIA.stored.length;
					for( i = 0; i < length; i += 1 ){
						localStorage.removeItem('kocfia_' + KOCFIA.stored[i] + '_' + KOCFIA.storeUniqueId);
					}
					$('#kocfia-map-load-saved').find('option').filter(':gt(0)').remove();
				},
				'optionPanel': function($optionsSection){
					console.info('KOCFIA shared optionPanel function');
					var code = '<h3>Global</h3>';
						code += '<div>';
						code += KOCFIA.shared.generateButton('shared', 'cleanLocalStorage', 'Remise à zèro des données persistantes', null);
						code += KOCFIA.shared.generateButton('shared', 'reloadGame', 'Recharger la page');
						code += KOCFIA.shared.generateCheckbox('general', 'refresh', 'Rafraîchir les données toutes les ', KOCFIA.conf.general.refresh).replace(/<\/p>/, '');
						code += KOCFIA.shared.generateInput('general', 'refreshFrequency', ' minutes', KOCFIA.conf.general.refreshFrequency).replace(/<p>/, '');
						code += KOCFIA.shared.generateCheckbox('general', 'reload', 'Recharger toutes les ', KOCFIA.conf.general.reload).replace(/<\/p>/, '');
						code += KOCFIA.shared.generateInput('general', 'reloadFrequency', ' minutes', KOCFIA.conf.general.reloadFrequency).replace(/<p>/, '');
						code += KOCFIA.shared.generateCheckbox('general', 'hideMagicalBoxPreview', 'Masquer automatiquement la pub pour la boîte magique de Merlin', KOCFIA.conf.general.hideMagicalBoxPreview);
						code += KOCFIA.shared.generateCheckbox('general', 'hideOtherPlayersCourtInvitation', 'Masquer automatiquement les invations pour voir la cour d\'un joueur', KOCFIA.conf.general.hideOtherPlayersCourtInvitation);
						code += KOCFIA.shared.generateCheckbox('general', 'hideFairPopup', 'Masquer automatiquement les fêtes foraines (avec envoie)', KOCFIA.conf.general.hideFairPopup);
						code += '</div>';
					$optionsSection.append( code );

					var i, length = KOCFIA.modules.length;
					for( i = 0; i < length; i += 1 ){
						KOCFIA[ KOCFIA.modules[i] ].confPanel( $optionsSection );
					}
				},
				'reloadGame': function(){
					$('#kocfia-reload').submit();
				},
				'reloadCountdown': function(status){
					console.info('KOCFIA shared reloadCountdown function', status);
					if( status ){
						reloadTimer = parseFloat(KOCFIA.conf.general.reloadFrequency) * 60 * 1000;
						reloadTimeout = window.setTimeout(function(){
							console.info('KOCFIA shared reloadCountdown timeout function');
							$('#kocfia-reload').submit();
							clearInterval( reloadInterval );
						}, reloadTimer - 1);

						KOCFIA.$reloadTimer.show().find('.kocfia-timer').html( KOCFIA.shared.readableDuration(reloadTimer / 1000) );
						reloadInterval = window.setInterval(function(){
							reloadTimer -= 1000;
							KOCFIA.$reloadTimer.find('.kocfia-timer').html( KOCFIA.shared.readableDuration(reloadTimer / 1000) );
						}, 1000);
					} else if( reloadTimeout ){
						clearTimeout( reloadTimeout );
						clearInterval( reloadInterval );
						KOCFIA.$reloadTimer.hide();
					}
				},
				'refreshCountdown': function(status){
					console.info('KOCFIA shared refreshCountdown function', status);
					if( status ){
						refreshTimeout = window.setTimeout(function(){
							console.info('KOCFIA shared refreshCountdown timeout function');
							$('#kocfia-refresh-seed').trigger('click');
						}, parseFloat(KOCFIA.conf.general.refreshFrequency) * 60 * 1000);
					} else if( refreshTimeout ){
						clearTimeout( refreshTimeout );
					}
				},
				'getServer': function(){
					console.info('kocfia shared getServer function');
					return window.domainName;
				},
				'getUserId': function(){
					console.info('kocfia shared getUserId function');
					return window.kabamuid;
				},
				'getCities': function(){
					console.time('cities');
					var i, length = window.seed.cities.length;
					for( i = 0; i < length; i += 1 ){
						var c = window.seed.cities[i];
						KOCFIA.cities['city' + c[0]] = {'id': c[0], 'name': c[1], 'coords': {'x': c[2], 'y': c[3]}, 'roman': window.roman[i]};
						KOCFIA.citiesKey.push( 'city' + c[0] );
					}
					console.timeEnd('cities');
				},
				'getKnightStatText': function( knight ){
					var stat = Math.max(parseFloat(knight.resourcefulness), parseFloat(knight.politics), parseFloat(knight.combat), parseFloat(knight.intelligence));

					if( knight.resourcefulness == knight.politics && knight.resourcefulness == knight.combat && knight.resourcefulness == knight.intelligence ){
						return 'pas de statistique principale';
					} else if( knight.resourcefulness == stat ){
						return 'R'+stat;
					} else if( knight.politics == stat ){
						return 'P'+stat;
					} else if( knight.combat == stat ){
						return 'C'+stat;
					} else if( knight.intelligence == stat ){
						return 'I'+stat;
					}
				},
				'format': function( num ){
					if( typeof num == 'undefined' || num == null ) return '&nbsp;';
					num = '' + num;
					if( num.indexOf(',') > -1 ) num.replace(/,/, '.');
					num = '' + parseFloat(num).toFixed(0);
					var l = num.length,
						suffix = '',
						decimal;
					num = parseFloat(num);
					if( l <= 3 ){
						return num;
					} else if( l <= 6 ){
						num = (num / 1000).toFixed(1);
						suffix = 'K';
					} else if( l <= 9 ){
						num = (num / 1000000).toFixed(1);
						suffix = 'M';
					} else if( l <= 12 ){
						num = (num / 1000000000).toFixed(1);
						suffix = 'G';
					} else {
						num = (num / 1000000000).toFixed(1);
						suffix = 'G';
					}

					var s = '' + num,
						decimal = s.substr(s.length - 1, 1),
						s = s.substr(0, s.length - 2);
					if( decimal == '0' ){
						return parseFloat(num).toFixed(0) + suffix
					} else if( s.length == 1 ){
						return num + suffix;
					} else if( s.length == 2 ){
						return parseFloat(num).toFixed(1) + suffix;
					} else {
						return Math.floor( num ) + suffix;
					}
				},
				'decodeFormat': function( num ){
					num = num.toString();
					var regexp = new RegExp('^[0-9]+(\.[0-9]{1,2})?([KMG]){0,1}$', 'gi'),
						match = regexp.exec(num);
					if( !match ){
						return false;
					} else if( match[2] ){
						num = parseFloat(num.substr(0, num.length-1));
						if( match[2] == 'K' || match[2] == 'k' ) num *= 1000;
						if( match[2] == 'M' || match[2] == 'm' ) num *= 1000000;
						if( match[2] == 'G' || match[2] == 'g' ) num *= 1000000000;
						return num;
					} else if( parseFloat(num) == num ){
						return num;
					} else {
						return false;
					}
				},
				'readable': function( num ){
					if( typeof num == 'undefined' || num == null ) return '';
					num = '' + Math.floor( parseFloat(num) );
					var length = num.length;
					var s = '';

					while( length > 3 ){
						s = "'" + num.substr(length - 3, 3) + s;
						length -= 3;
					}

					return num.substr(0, length) + s;
				},
				'readableDuration': function( time ){
					if( isNaN( parseFloat(time) ) || !isFinite(time) ){
						return '-';
					}
					time = Math.floor( parseFloat(time) );

					var time_units = [
						[31556926, 'a'],
						[2629744, 'm'],
						[86400, 'j'],
						[3600, 'h'],
						[60, 'm'],
						[1, 's']
					];

					var values = [], i, length = time_units.length, v;
					for( i = 0; i < length; i++ ){
						if( i === 0 ){
							v = parseInt(time / time_units[i][0], 10);
						} else {
							v = parseInt((time % time_units[i-1][0]) / time_units[i][0], 10);
						}
						if( v > 0 ) values.push( v + time_units[i][1] );
					}

					return values.join(' ');
				},
				'generateCheckbox': function(module, option, text, checked){
					return '<p><input type="checkbox" class="conf-toggle" id="'+ module +'-'+ option +'" '+ (checked ? 'checked' : '') +' /><label for="'+ module +'-'+ option +'">'+ text +'</label></p>';
				},
				'generateInput': function(module, option, text, value){
					return '<p><input type="text" class="conf-choice" id="'+ module +'-'+ option +'" value="'+ value +'" /><label for="'+ module +'-'+ option +'">'+ text +'</label></p>';
				},
				'generateButton': function(module, action, text, param){
					return '<p><button rel="'+ module +'-'+ action +'" class="conf-action" '+ (param != null ? 'data-param="'+param+'"' : '') +'>'+ text +'</button></p>';
				},
				'generateRadio': function(module, name, values, labels, selected){
					var code = '<p>';
					if( values.length && labels.length && values.length == labels.length ){
						var i, length = values.length;
						for( i = 0; i < length; i += 1 ){
							if( i > 0 ) code += '<br />';
							code += '<input type="radio" class="conf-toggle" id="'+ module +'-'+ values[i] +'" name="'+ module + '_' + name +'" '+ (selected[i] == 1 ? 'checked' : '') +' />';
							code += '<label for="'+ module +'-'+ values[i] +'">'+ labels[i] +'</label>';
						}
					}
					code += '</p>';
					return code;
				},
				'generateSelect': function(module, name, label, selected, options){
					var code = '<p><label for="'+ module + '-' + name +'">'+ label +'</label><select id="'+ module + '-' + name +'" class="conf-choice"><option value=""></option>';
					if( options.values && options.labels && options.values.length == options.labels.length){
						var values = options.values,
							labels = options.labels,
							i, length = values.length;
						for( i = 0; i < length; i += 1 ){
							code += '<option value="'+ values[i] +'" '+ (values[i] == selected ? 'selected' : '') +'>'+ labels[i] +'</option>';
						}
					}
					code += '</select></p>';
					return code;
				},
				'marchTimeCalculator': function(cityKey, troops, from_x, from_y, is_round_trip, items_applied){
					console.info('kocfia shared marchTimeCalculator function', cityKey, troops, from_x, from_y, is_round_trip, items_applied);
					var speed = 99999,
						total_troops = 0,
						time = 0,
						city = KOCFIA.cities[cityKey],
						d = new Date(),
						ts = parseInt(d.getTime() / 1000, 10);

					var techElevenModifier = parseInt(window.seed.tech.tch11),
						techTwelveModifier = parseInt(window.seed.tech.tch12),
						i, length = troops.length;
					for( i = 0; i < length; i += 1 ){
						var j = i + 1;
						if( troops.length <= 0 || window.unitstats["unt" + j] == null ) continue;
						total_troops += troops[i];
						var troop_speed = parseInt(window.unitstats["unt" + j][3]) * (1 + 0.1 * techElevenModifier);
						if( j > 6 ){
							troop_speed = troop_speed * (1 + 0.05 * techTwelveModifier)
						}
						if( troop_speed < speed ){
							speed = troop_speed;
						}
					}

					if( 0 == speed ) return "";

					var x = Math.abs(parseInt(city.coords.x, 10) - parseInt(from_x, 10));
					if (x > 375) x = 750 - x;
					var y = Math.abs(parseInt(city.coords.y, 10) - parseInt(from_y, 10));
					if (y > 375) y = 750 - y;

					time = parseInt(Math.sqrt((x * x) + (y * y)) * 6000 / speed);
					if( items_applied["57"] && window.seed.items.i57 > 0 ){
						time = parseInt(time * 0.5);
					} else if( items_applied["55"] && window.seed.items.i55 > 0 ){
						time = parseInt(time * 0.75);
					}
					time += 30;

					if( window.seed.playerEffects.returnExpire > ts ){
						time = parseInt(time * 0.75);
					}
					if( is_round_trip ) time *= 2;

					var guardianBonus = cm.guardianModalModel.getMarchBonus();
					var multiplier = 100 / (100 + guardianBonus);

					time = parseInt(time * multiplier, 10);

					return time;
				},
				'getAvailableKnights': function( cityKey ){
					var leaders = window.seed.leaders[cityKey],
						knights = [];
					for( var k in window.seed.knights[cityKey] ){
						if( window.seed.knights[cityKey].hasOwnProperty(k) ){
							var knight = window.seed.knights[cityKey][k];
							if( knight.knightStatus == 1
								&& leaders.resourcefulnessKnightId != knight.knightId
								&& leaders.politicsKnightId != knight.knightId
								&& leaders.combatKnightId != knight.knightId
								&& leaders.intelligenceKnightId != knight.knightId
							){
								knights.push( knight );
							}
						}
					}
					return knights;
				},
				'mapLink': function( coords ){
					if( !$.isArray(coords) ) coords = [coords];
					var code = '', i, length = coords.length;
					for( i = 0; i < length; i += 1 ){
						code += '<span class="mapLink">'+ coords[i] +'</span>';
					}
					return code;
				},
				'freeKnights': function( cityKey ){
					console.info('KOCFIA shared freeKnights function', cityKey);
					var leaders = window.seed.leaders[cityKey],
						attacks = window.seed.queue_atkp[cityKey],
						occupiedKnights = [];

					for( var a in attacks ){
						if( attacks.hasOwnProperty(a) ){
							occupiedKnights.push( attacks[a].knightId );
						}
					}

					if( leaders.resourcefulnessKnightId ) occupiedKnights.push( leaders.resourcefulnessKnightId );
					if( leaders.politicsKnightId ) occupiedKnights.push( leaders.politicsKnightId );
					if( leaders.combatKnightId ) occupiedKnights.push( leaders.combatKnightId );
					if( leaders.intelligenceKnightId ) occupiedKnights.push( leaders.intelligenceKnightId );

					for( var k in window.seed.knights[cityKey] ){
						if( window.seed.knights[cityKey].hasOwnProperty(k) ){
							if( window.seed.knights[cityKey][k].knightStatus != 1
								&& $.inArray( window.seed.knights[cityKey][k].knightId, occupiedKnights ) == -1
							){
								window.seed.knights[cityKey][k].knightStatus = 1;
							}
						}
					}
				},
				'updatingSeed': false,
				'updateSeed': function(){
					if( !KOCFIA.shared.updatingSeed ){
						KOCFIA.shared.updatingSeed = true;
						window.update_seed_ajax(true, null);
						window.setTimeout(function(){ KOCFIA.shared.updatingSeed = false; }, 10000);
					}
				},
				'getDistance': function( fromX, fromY, toX, toY ){
					var max = 750;
					var middle = max / 2;
					var x = Math.abs(toX - fromX);
					if (x > middle) {
						x = max - x;
					}
					var y = Math.abs(toY - fromY);
					if (y > middle) {
						y = max - y;
					}
					return Math.round(100 * Math.sqrt(x * x + y * y)) / 100;
				},
				'buildingHighestLevel': function( cityKey, buildingId ){
					console.info('KOCFIA shared buildingHighestLevel function');

					var level = 0, b;
					for( b in window.seed.buildings[cityKey] ){
						if( window.seed.buildings[cityKey].hasOwnProperty(b) ){
							var building = window.seed.buildings[cityKey][b],
								buildingLevel = parseInt(building[1], 10);

							if( building[0] == buildingId && level < buildingLevel ) level = buildingLevel;
						}
					}
					return level;
				},
				'barracksCount': function( cityKey ){
					console.info('KOCFIA shared barracksCount function');

					var b, count = 0;
					for( b in window.seed.buildings[cityKey] ){
						if( window.seed.buildings[cityKey].hasOwnProperty(b) ){
							if( window.seed.buildings[cityKey][b][0] == 13 ) count += 1;
						}
					}
					return count;
				},
				'forceMarchUpdate': function( attack ){
					console.info('KOCFIA shared forceMarchUpdate function');
					if( window.seed.queue_atkp[ attack.cityKey ] ){
						var mParams = window.g_ajaxparams,
							i = 0, j, march,
							status = [],
							mLength = attack.marching.length;
						if( mLength == 0 ){
							return;
						}

						var checkMarch = function(i, attempts){
							console.info('KOCFIA shared forceMarchUpdate checkMarch function');
							status[i] = false;
							march = window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ];
							if( march ){
								if( !march.hasOwnProperty('kocfiaUpdated') ){
									var mParams = window.g_ajaxparams;
									mParams.rid = attack.marching[i];
									$.ajax({
										url: window.g_ajaxpath + "ajax/fetchMarch.php" + window.g_ajaxsuffix,
										type: 'post',
										data: mParams,
										dataType: 'json',
									})
									.done(function(data){
										if( data.ok ){
											status[i] = true;
											//set the units Return value
											for( j = 1; j < 13; j += 1 ){
												if( data.march['unit'+ j +'Return'] ){
													window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ]['unit'+ j +'Return'] = data.march['unit'+ j +'Return'];
												}
											}
											for( j = 1; j < 6; j += 1 ){
												if( data.march['resource' + j] ){
													window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ]['resource' + j] = data.march['resource' + j];
												}
											}
											window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].marchStatus = data.march.marchStatus;
											window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].hasUpdated = true;

											if( data.march.marchStatus == 2 ){ //MARCH_STATUS_DEFENDING
												window.attack_recall(attack.marching[i], 1, attack.cityKey);
											}

											window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].kocfiaUpdated = true;

											i += 1;
											if( i < mLength ){
												return checkMarch(i, 3);
											} else {
												for( var j = 0; j < status.length; j += 1 ){
													if( !status[j] ) return window.setTimeout(function(){ KOCFIA.shared.forceMarchUpdate( attack ); }, 10000);
												}
											}

										} else {
											attempts -= 1;
											if( attempts > 0 ){
												return checkMarch(i, attempts);
											} else {
												i += 1;
												if( i < mLength ){
													return checkMarch(i, 3);
												} else {
													for( var j = 0; j < status.length; j += 1 ){
														if( !status[j] ) return setTimeout(function(){ KOCFIA.shared.forceMarchUpdate( attack ); }, 10000);
													}
												}
											}
										}
									})
									.fail(function(){
										attempts -= 1;
										if( attempts > 0 ){
											return checkMarch(i, attempts);
										} else {
											i += 1;
											if( i < mLength ){
												return checkMarch(i, 3);
											} else {
												for( var j = 0; j < status.length; j += 1 ){
													if( !status[j] ) return setTimeout(function(){ KOCFIA.shared.forceMarchUpdate( attack ); }, 10000);
												}
											}
										}
									});
								} else {
									status[i] = true;
								}
							} else {
								i += 1;
								if( i < mLength ){
									return checkMarch(i, 3);
								} else {
									for( var j = 0; j < status.length; j += 1 ){
										if( !status[j] ) return setTimeout(function(){ KOCFIA.shared.forceMarchUpdate( attack ); }, 10000);
									}
								}
							}
						}

						checkMarch(i, 3);
					}
				},
				'recallWaves': function( attack ){
					console.info('KOCFIA shared recallWaves function', attack);
					if( attack.marching.length ){
						//recall previous waves
						var k, length = attack.marching.length;
						for( k = 0; k < length; k += 1 ){
							window.attack_recall( attack.marching[k], 2, attack.cityKey );
						}
					}
				},
				'getRallyPointSlots': function( cityKey ){
					console.info('KOCFIA shared barracksCount function');

					var slots = KOCFIA.shared.buildingHighestLevel(cityKey, 12),
						a, attack;
					if( slots == 12 ) slots -= 1; //eleven armies at level 12
					for( a in window.seed.queue_atkp[cityKey] ){
						if( window.seed.queue_atkp[cityKey].hasOwnProperty(a) ){
							attack = window.seed.queue_atkp[cityKey][a];

							// cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN 9
							// cm.BOT_STATUS.BOT_MARCH_STOPPED 3
							//stopped barbarian camp
							if( attack.type == 9 && attack.status == 3 ) continue;

							// cm.MARCH_TYPES.MARCH_TYPE_ATTACK 4
							// cm.MARCH_TYPES.MARCH_TYPE_SCOUT 3
							// cm.MARCH_STATUS.MARCH_STATUS_UNKNOWN 5
							// cm.MARCH_STATUS.MARCH_STATUS_INACTIVE 0
							//attack or scout march
							if( (attack.type == 4 || attack.type == 4) && (attack.status == 0 || attack.status == 5) ) continue;

							slots -= 1;
						}
					}

					return slots;
				},
			},
	};

	//modules
		/* FACEBOOK WALL POST POPUP */
			KOCFIA.fbWallPopup = {
				'options': {
					'active': 0,
					'cancel': 0,
					'post': 0,
					'privacyLevel': null,
				},
				'privacyLevelList': {'values': [80, 50, 40, 10], 'labels': ['public', 'amis d\'amis', 'amis', 'privé']},
				'confPanel': function( $section ){
					console.info('KOCFIA fbWallPopup confPanel function');
					var code = '<h3>Popup facebook pour poster sur le mur</h3>';
					code += '<div>';
					code += '<p>PAS FINI</p>';
					code += KOCFIA.shared.generateCheckbox('fbWallPopup', 'active', 'Activer le module', KOCFIA.conf.fbWallPopup.active);
					code += KOCFIA.shared.generateRadio('fbWallPopup', 'action', ['cancel', 'post'], ['annulation automatique', 'publication automatique'], [KOCFIA.conf.fbWallPopup.cancel, KOCFIA.conf.fbWallPopup.post]);
					code += KOCFIA.shared.generateSelect('fbWallPopup', 'privacyLevel', 'niveau de visibilité', KOCFIA.conf.fbWallPopup.privacyLevel, KOCFIA.fbWallPopup.privacyLevelList);
					code += '</div>';

					$section.append( code );
				},
				'on': function(){
					console.info('kocfia fbWallPopup on function');
				},
				'off': function(){
					console.info('kocfia fbWallPopup off function');
				},
			};

		/* CHAT */
			KOCFIA.chat = {
				'options': {
					'active': 1,
					'moveable': 1,
					'cleanHelp': 1,
					'onRight': 1,
					'position': {'top': 0, 'left': 0},
					'size': {'width': false, 'height': false},
					'onRightPosition': {'top': '-562px', 'left': '761px'},
					'highlightLeaders': 0,
					'highlightFriends': 0,
					'highlightFoes': 0,
				},
				'stored': ['friends_list', 'foes_list'],
				'friendsList': [],
				'foesList': [],
				'leaders': {},
				'confPanel': function( $section ){
					console.info('KOCFIA chat confPanel function');
					var code = '<h3>Chat</h3>';
						code += '<div>';
						code += KOCFIA.shared.generateCheckbox('chat', 'active', 'Activer le module', KOCFIA.conf.chat.active);
						code += KOCFIA.shared.generateCheckbox('chat', 'moveable', 'Chat déplacable et redimensionnable', KOCFIA.conf.chat.moveable);
						code += KOCFIA.shared.generateCheckbox('chat', 'cleanHelp', 'Aider automiquement et masquer les demandes', KOCFIA.conf.chat.cleanHelp);
						code += KOCFIA.shared.generateButton('chat', 'onRight', 'Repositionner le chat à droite');
						code += KOCFIA.shared.generateCheckbox('chat', 'highlightLeaders', 'Changer la couleur des messages de la chancellerie (chats Général et Alliance)', KOCFIA.conf.chat.highlightLeaders);
						code += KOCFIA.shared.generateButton('chat', 'getLeadersList', 'Raffraîchir la liste des joueurs de la chancellerie');
						code += KOCFIA.shared.generateCheckbox('chat', 'highlightFriends', 'Changer la couleur des messages des amis (chat Général)', KOCFIA.conf.chat.highlightFriends);
						code += KOCFIA.shared.generateCheckbox('chat', 'highlightFoes', 'Changer la couleur des messages des ennemis (chat Général)', KOCFIA.conf.chat.highlightFoes);
						code += KOCFIA.shared.generateButton('chat', 'cleanFriendsList', 'Vider la liste d\'amis');
						code += KOCFIA.shared.generateButton('chat', 'cleanFoesList', 'Vider la liste d\'ennemis');
						code += '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOCFIA chat modPanel function');
					var $section = KOCFIA.$confPanel.find('#kocfia-chat').html('');

					var friends = '',
						i, length = KOCFIA.chat.friendsList.length;
					for( i = 0; i < length; i += 1 ){
						friends += '<li><a href="#">'+ KOCFIA.chat.friendsList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
					}

					var foes = '';
					length = KOCFIA.chat.foesList.length;
					for( i = 0; i < length; i += 1 ){
						foes += '<li><a href="#">'+ KOCFIA.chat.foesList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
					}

					var code = '<h3>Liste d\'amis</h3>';
						code += '<p><label for="kocfia-friend">Joueur : </label>';
						code += '<input type="text" name="kocfia-friend" id="kocfia-friend" />';
						code += '<button rel="friends">Ajouter</button></p>';
						code += '<ul class="kocfia-chat-list" rel="friends">' + friends + '</ul>';
						code += '<h3>Liste d\'ennemis</h3>';
						code += '<p><label for="kocfia-foe">Joueur : </label>';
						code += '<input type="text" name="kocfia-foe" id="kocfia-foe" />';
						code += '<button rel="foes">Ajouter</button></p>';
						code += '<ul class="kocfia-chat-list" rel="foes">' + foes + '</ul>';

					$section.append( code )
						.on('click', 'button', function(e){
							e.preventDefault();

							var $this = $(this),
								rel = $this.attr('rel'),
								list = rel + 'List',
								name = $this.parent().find('input').val(),
								$ul = $('#kocfia-chat').find('ul').filter('[rel='+ rel +']');

							if( !$ul.find('li').find('a').filter(':contains("'+ name +'")').length ){
								KOCFIA.chat[list].push( name );
								KOCFIA.chat[list].sort();
								var f = '', i, length = KOCFIA.chat[list].length;
								for( i = 0; i < length; i += 1 ){
									f += '<li><a href="#">'+ KOCFIA.chat[list][ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
								}
								$ul.html( f );

								if( rel == 'friends' ) KOCFIA.chat.storeFriendsList();
								else if( rel == 'foes' ) KOCFIA.chat.storeFoesList();

								if( KOCFIA.chat.highlightFriends || KOCFIA.chat.highlightFoes ){
									KOCFIA.chat.highlightFriendsAndFoes(0);
								}
							}
						})
						.on('click', '.ui-icon-trash', function(){
							var $li = $(this).parent(),
								rel = $li.parent().attr('rel'),
								list = rel + 'List';
							KOCFIA.chat[list].splice(KOCFIA.chat[list].indexOf( $li.find('a').text() ), 1);
							if( rel == 'friends' ) KOCFIA.chat.storeFriendsList();
							else if( rel == 'foes' ) KOCFIA.chat.storeFoesList();
							$li.remove();
						})
						.on('click', 'a', function(e){
							e.preventDefault();
							//use game native function
							Chat.whisper( $(this).text() );
						});
				},
				'on': function(){
					console.info('KOCFIA chat on function');
					//placement
						if( KOCFIA.conf.chat.moveable ){
							KOCFIA.chat.moveableOn();
						}

						if( KOCFIA.conf.chat.onRight && KOCFIA.conf.chat.position.top == 0 ){
							KOCFIA.chat.onRight();
						}

					//dupplicate input
						$chatInput.clone().attr('id', 'mod_comm_input_clone')
							.appendTo( $chat.find('.postaction') );
						$chatInput = $('#mod_comm_input_clone');

						//redefine the whisper function to use the cloned input
						window.Chat.whisper = function(to){
							if( typeof to === "string" && to.length != 0 ){
								var text = $chatInput.val().strip();
								if( text.charAt(0) == "@" ) text = "";

								$chatInput.val("@" + to + " " + text).focus();
							}
						};

					//clean help
						if( KOCFIA.conf.chat.cleanHelp ){
							KOCFIA.chat.cleanHelpOn();
						} else {
							var hideChatRules = function(){
								var tmp = $chatAlliance.find('.noalliance');
								if( tmp.length ){
									tmp.first().hide();
								} else {
									window.setTimeout(function(){ hideChatRules(); }, 500);
								}
							};
							window.setTimeout(function(){ hideChatRules(); }, 500);
						}

					//highlightleaders
						if( KOCFIA.conf.chat.highlightLeaders ){
							KOCFIA.chat.highlightLeadersOn();
						}

					//highlightFriendsAndFoes
						if( $.isEmptyObject( KOCFIA.chat.friendsList ) ){
							try{
								var persistentFriendsList = localStorage.getObject('kocfia_chat_friends_list_' + KOCFIA.storeUniqueId);
								if( persistentFriendsList ){
									KOCFIA.chat.friendsList = persistentFriendsList;
								}
							} catch(e){
								console.error(e);
							}
						}

					//highlightFoes
						if( $.isEmptyObject( KOCFIA.chat.foesList ) ){
							try{
								var persistentFoesList = localStorage.getObject('kocfia_chat_foes_list_' + KOCFIA.storeUniqueId);
								if( persistentFoesList ){
									KOCFIA.chat.foesList = persistentFoesList;
								}
							} catch(e){
								console.error(e);
							}
						}

						if( KOCFIA.conf.chat.highlightFriends ){
							KOCFIA.chat.highlightFriendsOn();
						}

						if( KOCFIA.conf.chat.highlightFoes ){
							KOCFIA.chat.highlightFoesOn();
						}
				},
				'off': function(){
					console.info('KOCFIA chat off function');
					KOCFIA.chat.moveableOff();
					KOCFIA.chat.cleanHelpOff();
					KOCFIA.chat.highlightLeadersOff();
					KOCFIA.chat.highlightFriendsOff();
					KOCFIA.chat.highlightFoesOff();
				},
				/* moveable */
					'moveableOn': function(){
						console.info('KOCFIA chat moveableOn function');
						$head.append( $('<style id="kocfia-chat-moveable">').html(chatMoveableCss) );

						$chat
							.draggable({
								helper: "original",
								appendTo: 'body',
								containment: 'parent',
								scroll: true,
								distance: 20,
								stop: function(event, ui){
									KOCFIA.conf.chat.position = ui.position;
									KOCFIA.shared.storeConf();
								}
							})
							.resizable({
								'minWidth': 250,
								'resize': function(event, ui){
									$chat
										.find('.comm_body')
											.css('height', function(){ return ui.size.height - 20;})
										.find('.chatlist')
											.css('height', function(){ return $(this).parent().height() - 43; });

									$chatInput
										.width(function(){ return ui.size.width - 65; })
										.siblings('.button20').css('left', function(){ return ui.size.width - 55; });
								},
								'stop': function(event, ui){
									KOCFIA.conf.chat.size = ui.size;
									KOCFIA.shared.storeConf();
								}
							})
							.css({
								'top': KOCFIA.conf.chat.position.top,
								'left': KOCFIA.conf.chat.position.left,
							});

						if( KOCFIA.conf.chat.size.width ){
							$chat.css('width', KOCFIA.conf.chat.size.width);

							$chatInput.width(function(){ return KOCFIA.conf.chat.size.width - 65; })
								.siblings('.button20').css('left', function(){ return KOCFIA.conf.chat.size.width - 55; });
						}

						if( KOCFIA.conf.chat.size.height ) $chat.css('height', KOCFIA.conf.chat.size.height);
						else $chat.css('height', $chat.parent().css('height')); //original height

						$chat
							.find('.comm_body')
								.css('height', function(){ return $chat.height() - 20;})
							.find('.chatlist')
								.css('height', function(){ return $(this).parent().height() - 43; });
						var $jeu = $chat.find('.mod_comm_mmb');
						$jeu.data('ori', $jeu.html())
							.removeClass('mod_comm_mmb').addClass('kocfia-merlin-small').html('Boîtes Magiques');
					},
					'moveableOff': function(){
						console.info('KOCFIA chat moveableOff function');
						$('#kocfia-chat-moveable').remove();
						$chat[0].style = '';
						$chat
							.draggable('destroy')
							.resizable('destroy')
							.css({'top': 0, 'left': 0});
						$chatInput.css('width', '')
							.siblings('.button20').css('left', '');
						$chat
							.find('.comm_body').css('height', '')
							.find('.chatlist').css('height', '');
						var $jeu = $chat.find('.kocfia-merlin-small');
							$jeu.removeClass('kocfia-merlin-small').addClass('mod_comm_mmb').html( $jeu.data('ori') ).removeData('ori');
					},
					'onRight': function(){
						console.info('KOCFIA chat onRight function');
						KOCFIA.conf.chat.position = {
							'top': KOCFIA.conf.chat.onRightPosition.top,
							'left': KOCFIA.conf.chat.onRightPosition.left
						};
						$chat.css(KOCFIA.conf.chat.position);
						KOCFIA.shared.storeConf();
					},
				/* cleanHelp */
					'cleanHelpOn': function(){
						console.info('KOCFIA chat cleanHelpOn function');
						$head.append( $('<style id="kocfia-chat-help">').html(chatHelpCss) );
					},
					'cleanHelpOff': function(){
						console.info('KOCFIA chat cleanHelpOff function');
						$('#kocfia-chat-help').remove();
					},
					'cleanHelp': function( nbMsg ){
						console.info('KOCFIA chat cleanHelp function');
						//suppression du superflu (demande aide et son résultat)
						if( KOCFIA.conf.chat.active && KOCFIA.conf.chat.cleanHelp ){
							window.setTimeout(function(){
								var $messages = $chatAlliance.find('.chatwrap');
								if( nbMsg > 0 ){
									$messages.filter(':lt('+ nbMsg +')');
								}
								$messages
									.find('.tx')
									.find('a').each2(function(i, $helpLink){
										if( $helpLink.attr('onclick') && $helpLink.attr('onclick').indexOf('claimAllianceChatHelp') == 0 ){
											$helpLink
												.click() //clic auto sur les demandes d'aides
												.closest('.chatwrap').remove(); //et suppression de la demande d'aide
											//suppression du résultat -> masqué en css .noalliance
										}
									});
							}, 250);
						}
					},
				/* highlight leaders */
					'highlightLeaders': function( $targetChat, nbMsg ){
						console.info('kocfia chat highlightLeaders function');
						if( $targetChat == null ){
							KOCFIA.chat.highlightLeadersReset();
							KOCFIA.chat.highlightLeaders( $chatAlliance, 0 );
							KOCFIA.chat.highlightLeaders( $chatGeneral, 0 );
						} else {
							console.info('KOCFIA chat highlightLeaders function', $targetChat, nbMsg);
							var $messages = $targetChat.find('.chatwrap');
							if( nbMsg > 0 ){
								$messages.filter(':lt('+ nbMsg +')');
							}

							$messages.find('.nm').each2(function(i, $nm){
								var name = $nm.text();
								if( KOCFIA.chat.leaders[ name ] ){
									$nm.closest('.chatwrap').removeClass('chancellor vice_chancellor officer').addClass( KOCFIA.chat.leaders[ name ] );
								}
							});
						}
					},
					'getLeadersList': function(){
						console.info('kocfia chat getLeadersList function');
						//ajax call to get the leaders, highlighting will be done in the ajax response listener
						window.getDirectoryTabAllianceMembers();
					},
					'highlightLeadersOn': function(){
						console.info('KOCFIA chat highlightLeadersOn function');
						KOCFIA.chat.getLeadersList();

						$head.append( $('<style id="kocfia-chat-highlight-leaders">').html(chatHighlightLeadersCss) );
					},
					'highlightLeadersOff': function(){
						console.info('KOCFIA chat highlightLeadersOff function');
						$('#kocfia-chat-highlight-leaders').remove();
						KOCFIA.chat.leaders = {};
					},
				/* highlight friends */
					'highlightFriendsOn': function( highlight ){
						console.info('KOCFIA chat highlightFriendsOn function');
						$head.append( $('<style id="kocfia-chat-highlight-friends">').html(chatHighlightFriendsCss) );
						KOCFIA.chat.highlightFriendsAndFoes(0);
					},
					'highlightFriendsOff': function(){
						console.info('KOCFIA chat highlightFriendsOff function');
						$('#kocfia-chat-highlight-friends').remove();
					},
					'storeFriendsList': function(){
						console.info('KOCFIA storeFriendsList function');
						localStorage.setObject('kocfia_chat_friends_list_' + KOCFIA.storeUniqueId, KOCFIA.chat.friendsList);
					},
					'cleanFriendsList': function(){
						console.info('KOCFIA cleanFriendsList function');
						KOCFIA.chat.friendsList = [];
						localStorage.setObject('kocfia_chat_friends_list_' + KOCFIA.storeUniqueId, '');
						$('#kocfia-chat').find('ul').filter('[rel=friends]').empty();
					},
				/* highlight foes */
					'highlightFoesOn': function(){
						console.info('KOCFIA chat highlightFoesOn function');
						$head.append( $('<style id="kocfia-chat-highlight-foes">').html(chatHighlightFoesCss) );
						KOCFIA.chat.highlightFriendsAndFoes(0);
					},
					'highlightFoesOff': function(){
						console.info('KOCFIA chat highlightFoesOff function');
						$('#kocfia-chat-highlight-foes').remove();
					},
					'storeFoesList': function(){
						console.info('KOCFIA storeFoesList function');
						localStorage.setObject('kocfia_chat_foes_list_' + KOCFIA.storeUniqueId, KOCFIA.chat.foesList);
					},
					'cleanFoesList': function(){
						console.info('KOCFIA cleanFoesList function');
						KOCFIA.chat.foesList = [];
						localStorage.setObject('kocfia_chat_foes_list_' + KOCFIA.storeUniqueId, '');
						$('#kocfia-chat').find('ul').filter('[rel=foes]').empty();
					},
				/* highlight friends and foes */
					'highlightFriendsAndFoes': function( nbMsg ){
						console.info('KOCFIA chat highlightFriendsAndFoes function', nbMsg);
						var $messages = $chatGeneral.find('.chatwrap'),
							highlightFriends = KOCFIA.conf.chat.highlightFriends && KOCFIA.chat.friendsList.length,
							highlightFoes = KOCFIA.conf.chat.highlightFoes && KOCFIA.chat.foesList.length;

						if( nbMsg > 0 ){
							$messages.filter(':lt('+ nbMsg +')');
						}

						$messages.removeClass('friend foe').find('.nm').each2(function(i, $nm){
							var name = $nm.text().replace(/^(Lady |Lord )/, '');
							if( highlightFriends && $.inArray(name, KOCFIA.chat.friendsList) > -1 ){
								$nm.closest('.chatwrap').addClass('friend');
							}
							if( highlightFoes && $.inArray(name, KOCFIA.chat.foesList) > -1 ){
								$nm.closest('.chatwrap').addClass('foe');
							}
						});
					},
			};

		/* OVERVIEW */
			KOCFIA.overview = {
				'options': {
					'active': 1,
					'position': {'top': 100, 'left': 100},
					'size': {'width': 500, 'height': 300},
					'replace': 0,
					'moveable': 1,
					'visible': 0,
					'parts_visible': {
						'population': 1,
						'troops': 1,
						'troops_barbarian': 1,
						'defenses': 1,
						'resources': 1,
						'resources_cap': 1,
						'resources_production_detail': 1,
						'resources_production_barbarian': 1,
						'resources_consumption': 1,
						'resources_production_total': 1,
						'resources_autonomy': 1,
					},
				},
				'updating' : false,
				'parts': {
					'population': 'population',
					'troops': 'unités',
					'troops_barbarian': 'unités en camps barbares',
					'defenses': 'fortifications',
					'resources': 'ressources',
					'resources_cap': 'plafond',
					'resources_production_detail': 'détail production',
					'resources_production_barbarian': 'production camps barbares',
					'resources_consumption': 'dépense',
					'resources_production_total': 'total production',
					'resources_autonomy': 'autonomie',
				},
				'confPanel': function( $section ){
					console.info('KOCFIA overview confPanel function');
					var code = '<h3>Vue globale</h3>';
						code += '<div>';
						code += KOCFIA.shared.generateCheckbox('overview', 'active', 'Activer le module', KOCFIA.conf.overview.active);
						code += KOCFIA.shared.generateRadio('overview', 'action', ['replace', 'moveable'], ['Remplace le dessous du jeu (ne pas oublier de mettre le chat à droite)', 'Vue globale déplacable et redimensionnable'], [KOCFIA.conf.overview.replace, KOCFIA.conf.overview.moveable]);
						code += KOCFIA.shared.generateButton('overview', 'resetPlacement', 'Remise à zéro de la position');
						code += KOCFIA.shared.generateButton('overview', 'resetDimensions', 'Remise à zéro des dimensions');
						code += '</div>';

					$section.append( code )
						.on('click', '#overview-replace, #overview-moveable', function(){
							$(this).closest('div').find('button').toggle( $(this).is('#overview-moveable') );
						})
						.find('#overview-replace').closest('div').find('button').toggle( KOCFIA.conf.overview.moveable );
				},
				'on': function(){
					console.info('KOCFIA overview on function');

					$head.append( $('<style id="kocfia-overview-css">').html(overviewCss) );

					var dataTable = '<table id="kocfia-overview-data">',
						headers = '<thead><tr><th class="img">&nbsp;</th><th class="label">&nbsp;</th><th class="sum">Total</th>',
						dataLine = '',
						sizer = '<tr class="sizer"><td class="img"></td><td class="label"></td><td class="sum"></td>';
						cols = 3,
						$overview = $('<div id="kocfia-overview" class="ui-widget ui-widget-content ui-corner-all">');

					//headers
					//data line for cities
						var i, cityKey, length = KOCFIA.citiesKey.length;
						for( i = 0; i < length; i += 1 ){
							cityKey = KOCFIA.citiesKey[i];
							headers += '<th title="'+ KOCFIA.cities[cityKey].name +'">'+ window.roman[i] +'</th>';
							dataLine += '<td>&nbsp;</td>';
							sizer += '<td></td>';
						}
						headers += '</tr></thead>';
						cols += i;
						sizer += '</tr>';

					dataTable += headers + '<tbody>' + sizer;

					//body lines
					var left = 0, i, j, length, part, kocfia_part;
					for( part in KOCFIA.overview.parts ){
						if( KOCFIA.overview.parts.hasOwnProperty( part ) ){
							dataTable += '<tr class="'+ part +' toggle"><th colspan="'+ cols +'">';
							dataTable += '<span class="ui-icon ui-icon-triangle-1-'+ (KOCFIA.conf.overview.parts_visible[ part ] ? 'se' : 'e') +'"></span>';
							dataTable += KOCFIA.overview.parts[ part ].capitalize();
							if( part == 'troops' ){
								dataTable += '<span class="details-toggle">(';
								dataTable += '<input type="checkbox" id="kocfia-overview-troops-barbian-toogle" value="troops_barbarian" '+ (KOCFIA.conf.overview.parts_visible['troops_barbarian'] ? 'checked' : '') +'><label for="kocfia-overview-troops-barbian-toogle">CB</label>';
								dataTable += ')</span>';
							} else if( part == 'resources' ){
								dataTable += '<span class="details-toggle">(';
								dataTable += '<input type="checkbox" id="kocfia-overview-resources-cap-toogle" value="resources_cap" '+ (KOCFIA.conf.overview.parts_visible['resources_cap'] ? 'checked' : '') +'>';
								dataTable += '<label for="kocfia-overview-resources-cap-toogle">Plafond</label>';
								dataTable += '<input type="checkbox" id="kocfia-overview-resources-production-detail-toogle" value="resources_production_detail" '+ (KOCFIA.conf.overview.parts_visible['resources_production_detail'] ? 'checked' : '') +'>';
								dataTable += '<label for="kocfia-overview-resources-production-detail-toogle">Prod</label>';
								dataTable += '<input type="checkbox" id="kocfia-overview-resources-production-barbarian-toogle" value="resources_production_barbarian" '+ (KOCFIA.conf.overview.parts_visible['resources_production_detail'] ? 'checked' : '') +'>';
								dataTable += '<label for="kocfia-overview-resources-production-barbarian-toogle">CB</label>';
								dataTable += '<input type="checkbox" id="kocfia-overview-resources-consumption-toogle" value="resources_consumption" '+ (KOCFIA.conf.overview.parts_visible['resources_consumption'] ? 'checked' : '') +'>';
								dataTable += '<label for="kocfia-overview-resources-consumption-toogle">Conso</label>';
								dataTable += '<input type="checkbox" id="kocfia-overview-resources-production-total-toogle" value="resources_production_total" '+ (KOCFIA.conf.overview.parts_visible['resources_production_total'] ? 'checked' : '') +'>';
								dataTable += '<label for="kocfia-overview-resources-production-total-toogle">Total</label>';
								dataTable += '<input type="checkbox" id="kocfia-overview-resources-autonomy-toogle" value="resources_autonomy" '+ (KOCFIA.conf.overview.parts_visible['resources_autonomy'] ? 'checked' : '') +'>';
								dataTable += '<label for="kocfia-overview-resources-autonomy-toogle">Autonomie</label>';
								dataTable += ')</span>';
							}
							dataTable += '</th></tr>';
							kocfia_part = KOCFIA[ part ];
							length = kocfia_part.length;
							for( i = 0; i < length; i += 1 ){
								if( !kocfia_part[i].hasOwnProperty('label') && kocfia_part[i].hasOwnProperty('key') ){
									kocfia_part[i].label = window.resourceinfo[ kocfia_part[i].key ];
								}
								var rowspan = kocfia_part[i].rows;
								if( rowspan ){
									for( j = 0; j < rowspan; j += 1 ){
										dataTable += '<tr class="'+ part + (part == 'troops' && j == 1 ? '_barbarian' : '' ) +'">';
										dataTable += (j == 0 ? '<td class="img" rowspan="'+ rowspan +'"><img src="'+ kocfia_part[i].icon +'"></td>' : '');
										dataTable += '<td class="label">'+ kocfia_part[i].label[j] +'</td>';
										dataTable += '<td class="sum"></td>';
										dataTable += dataLine + '</tr>';
									}
								} else {
									dataTable += '<tr class="'+ part +'">';
									dataTable += '<td class="img"><img src="'+ kocfia_part[i].icon +'"></td>';
									dataTable += '<td class="label">'+ kocfia_part[i].label +'</td>';
									dataTable += '<td class="sum"></td>';
									dataTable += dataLine + '</tr>';
								}
							}
						}
					}
					dataTable += '</tbody></table>';

					$overview.append('<div class="wrap">' + dataTable + '</div>');

					$body.append( $overview );
					KOCFIA.overview.$div = $('#kocfia-overview');

					KOCFIA.overview.$div
						//highlight from headers
							.on('mouseenter', 'th', function(){
								var col = KOCFIA.overview.$headersThs.index( $(this).addClass('highlight') );
								KOCFIA.overview.$tbodyTrs.find('tr').each2(function(j, $tr){
									$tr.find('td').eq(col).addClass('highlight');
								});
							})
							.on('mouseleave', 'th', function(){
								var col = KOCFIA.overview.$headersThs.index( $(this).removeClass('highlight') );
								KOCFIA.overview.$tbodyTrs.find('tr').each2(function(j, $tr){
									$tr.find('td').eq(col).removeClass('highlight');
								});
							})
						//highlight from body
							.on('mouseenter', 'tbody td', function(){
								var $this = $(this),
									col = $this.parent().addClass('highlight').find('td').index( $this );
								KOCFIA.overview.$headersThs.eq(col).addClass('highlight');
							})
							.on('mouseleave', 'tbody td', function(){
								var $this = $(this),
									col = $this.parent().removeClass('highlight').find('td').index( $this );
								KOCFIA.overview.$headersThs.eq(col).removeClass('highlight');
							})
						//toggles
							.on('click', '.toggle', function(){
								var $this = $(this),
									$triangle = $this.find('.ui-icon'),
									part = $this.attr('class').split(' ')[0];
									opened = !$triangle.hasClass('ui-icon-triangle-1-se');

								if( opened ) $triangle.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-se');
								else $triangle.removeClass('ui-icon-triangle-1-se').addClass('ui-icon-triangle-1-e');

								var $trs = KOCFIA.overview.$tbodyTrs.filter( '.' + part );

								$trs.filter(':not(.toggle)').toggle( opened );

								if( !opened ){
									var $details = $trs.filter('.toggle').find('.details-toggle');
									if( $details.length ){
										$details.find('input').each2(function(i, $input){
											var detail = $input.val();

											$input.prop('checked', false);
											KOCFIA.overview.$tbodyTrs.filter( '.' + detail ).hide();
											KOCFIA.conf.overview.parts_visible[ detail ] = false;
										});
									}
								}

								KOCFIA.conf.overview.parts_visible[ part ] = opened;

								KOCFIA.shared.storeConf();
							});

					KOCFIA.overview.$div
						.find('.details-toggle').each2(function(i, $detail){
							$detail.bind('click', function(e){
								e.stopPropagation();
							}).on('change', 'input', function(e){
								var $this = $(this),
									checked = $this.prop('checked'),
									part = $this.val();

								var $trs = KOCFIA.overview.$tbodyTrs.filter( '.' + part ).toggle( checked ),
									$triangle = $trs.filter('.toggle').find('.ui-icon');

								if( checked ) $triangle.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-se');
								else $triangle.removeClass('ui-icon-triangle-1-se').addClass('ui-icon-triangle-1-e');

								KOCFIA.conf.overview.parts_visible[ part ] = checked;
								KOCFIA.shared.storeConf();
							});
						});

					KOCFIA.overview.$wrap = KOCFIA.overview.$div.find('.wrap');
					KOCFIA.overview.$table = KOCFIA.overview.$div.find('#kocfia-overview-data');
					KOCFIA.overview.$header = KOCFIA.overview.$table.find('thead');
					KOCFIA.overview.$headersThs = KOCFIA.overview.$header.find('th');
					KOCFIA.overview.$tbody = KOCFIA.overview.$table.find('tbody');
					KOCFIA.overview.$cityTds = KOCFIA.overview.$tbody.find('.sizer').find('td');
					KOCFIA.overview.$tbodyTrs = KOCFIA.overview.$tbody.find('tr').filter(':not(.sizer)');

					var trs, $details, detail;
					for( part in KOCFIA.conf.overview.parts_visible ){
						if( KOCFIA.conf.overview.parts_visible.hasOwnProperty(part) ){
							$trs = KOCFIA.overview.$tbodyTrs.filter( '.' + part );

							if( !KOCFIA.conf.overview.parts_visible[part] ){
								$trs.filter(':not(.toggle)').hide();
							}
						}
					}

					window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 1000);

					if( KOCFIA.conf.overview.replace ){
						KOCFIA.overview.replaceOn();
					} else {
						KOCFIA.overview.moveableOn();
					}
				},
				'off': function(){
					console.info('KOCFIA overview off function');
					$('#kocfia-overview-css').remove();
					KOCFIA.overview.$div.remove();
					KOCFIA.overview.$div = null;
				},
				'updateFromSeed': function(){
					if( !KOCFIA.conf.overview.active ) return;

					if( KOCFIA.overview.updating ) return;
					KOCFIA.overview.updating = true;

					if( !KOCFIA.overview.hasOwnProperty('$tbodyTrs') ) return; //overview panel not initialized

					console.info('KOCFIA overview updateFromSeed function');
					var $popTrs = KOCFIA.overview.$tbodyTrs.filter('.population').filter(':not(:first)'),
						$resTrs = KOCFIA.overview.$tbodyTrs.filter('.resources').filter(':not(:first)'),
						$resCapTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_cap').filter(':not(:first)'),
						$resProdDetailTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_production_detail').filter(':not(:first)'),
						$resProdBarbarianTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_production_barbarian').filter(':not(:first)'),
						$resConsoTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_consumption').filter(':not(:first)'),
						$resProdTotalTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_production_total').filter(':not(:first)'),
						$resAutonomyTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_autonomy').filter(':not(:first)'),
						$troopsTrs = KOCFIA.overview.$tbodyTrs.filter('.troops').filter(':not(:first)'),
						$troopsBarbarianTrs = KOCFIA.overview.$tbodyTrs.filter('.troops_barbarian').filter(':not(:first)'),
						$defensesTrs = KOCFIA.overview.$tbodyTrs.filter('.defenses').filter(':not(:first)');

					var i, j, k, length = KOCFIA.citiesKey.length, subLength;
					for( i = 0; i < length; i += 1 ){
						var cityKey = KOCFIA.citiesKey[i],
							stats = window.seed.citystats[ cityKey ],
							seed = {
								'pop': stats.pop,
								'gold': stats.gold,
								'res': window.seed.resources[ cityKey ],
								'units': window.seed.units[ cityKey ],
								'guardian': window.seed.guardian[ cityKey ],
								'knights': window.seed.knights[ cityKey ],
								'wilds': window.seed.wilderness[ cityKey ],
								'fortifications': window.seed.fortifications[ cityKey ]
							};

						//barbarian camps
							var barbariansRes = [],
								barbariansTroops = [],
								marches = window.seed.queue_atkp[ cityKey ];
							if( marches ){
								for( var m in marches ){
									if( marches.hasOwnProperty(m) ){
										var marche = marches[m];
										//cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN: 9
										//cm.BOT_STATUS.BOT_MARCH_MARCHING: 1,
										//cm.BOT_STATUS.BOT_MARCH_RETURNING: 2,
										//cm.BOT_STATUS.BOT_MARCH_RESTING: 7,
										if( marche.marchType == 9 ){
											//get attack duration (go, fight, return, unload, repeat)
											var time = parseFloat(marche.returnUnixTime) - parseFloat(marche.marchUnixTime) + (parseFloat(marche.restPeriod) / 60);

											//how many attacks in one hour
											var factor = 3600 / time;

											//get resources in one hour
											var barbarianRes = [ factor * parseFloat(marche.gold), factor * parseFloat(marche.resource1), factor * parseFloat(marche.resource2), factor * parseFloat(marche.resource3), factor * parseFloat(marche.resource4) ];

											barbariansRes.push( barbarianRes );

											subLength = KOCFIA.troops.length;
											for( j = 0; j < subLength; j += 1 ){
												if( !barbariansTroops[j] ) barbariansTroops[j] = 0;
												barbariansTroops[j] += parseFloat(marche['unit'+ ( j + 1 ) +'Count']);
											}
										}
									}
								}
							}

						//population
							var line = 0;
							subLength = KOCFIA.population.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOCFIA.population[j];
								if( type.rows ){
									var rowsLength = type.rows;
									for( k = 0; k < rowsLength; k += 1 ){
										var inSeed = KOCFIA.inSeed.population[ type.name[k] ],
											$tds = $popTrs.eq(line).find('td'),
											$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
											n = null;
										if( inSeed ){
											n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
										} else if( type.name[k] == 'availablePopulation' ){
											var take = KOCFIA.inSeed.population[ type.name[0] ],
												substract = KOCFIA.inSeed.population[ type.name[2] ];

											n = parseFloat( seed[ take.var ][ take.index ] ) - parseFloat( seed[ substract.var ][ substract.index ] );
										}

										if( n != null ){
											$td.html( KOCFIA.shared.format( n ) )
												.attr('title', KOCFIA.shared.readable( n ))
												.data('ori', n);
										} else {
											$td.html('&nbsp;')
												.attr('title', KOCFIA.shared.readable( n ))
												.data('ori', 0);
										}

										line += 1;
									}

								} else {
									var inSeed = KOCFIA.inSeed.population[ type.name ],
										$tds = $popTrs.eq(line).find('td'),
										$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
									if( inSeed ){
										var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );

										$td.html( KOCFIA.shared.format( n ) )
											.attr('title', KOCFIA.shared.readable( n ))
											.data('ori', n);

									} else {
										$td.html('&nbsp;')
											.attr('title', KOCFIA.shared.readable( n ))
											.data('ori', 0);
									}

									line += 1;
								}
							}

						//resources
							subLength = KOCFIA.resources.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOCFIA.resources[j],
									inSeed = KOCFIA.inSeed.resources[ type.name ],
									$tds = $resTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
								if( inSeed ){
									if( inSeed.hasOwnProperty('type') ){
										var n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
									} else {
										var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
									}

									if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

									$td.html( KOCFIA.shared.format( n ) )
										.attr('title', KOCFIA.shared.readable(n))
										.data('ori', n);
								} else {
									$td.html('&nbsp;')
										.attr('title', '')
										.data('ori', 0);
								}
							}

						//resources cap
							subLength = KOCFIA.resources_cap.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOCFIA.resources_cap[j],
									inSeed = KOCFIA.inSeed.resources_cap[ type.name ],
									$tds = $resCapTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
								if( inSeed ){
									var n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
									if( n > 0 ) n = n / 3600;

									$td.html( KOCFIA.shared.format( n ) )
										.attr('title', KOCFIA.shared.readable(n))
										.data('ori', n);
								} else {
									$td.html('&nbsp;')
										.attr('title', '')
										.data('ori', 0);
								}
							}

						//resources production detail
							var base = [],
								total = [0, 0, 0, 0, 0],
								line = 0,
								nbLine = KOCFIA.resources_production_detail.length / 4,
								d = new Date(),
								timestamp = parseFloat(d.getTime() / 1000);

							//guardian bonus
								var keys = ['gold', 'food', 'wood', 'stone', 'ore'],
									guardianBase = { 'gold': 0, 'food': 0, 'wood': 0, 'stone': 0, 'ore': 0 },
									guardianBonus = ( seed.guardian ? seed.guardian[0] : {} );
								if( guardianBonus.hasOwnProperty('type') && guardianBonus.type == -1 ) guardian.type = 'wood';

								var bonusG = $.extend({}, guardianBase, guardianBonus);

							//knight bonus
								var bonusK = 0;
								if( seed.knights ){
									var k = seed.knights[ "knt" + window.seed.leaders[cityKey].resourcefulnessKnightId ];
									if( k ){
										bonusK = parseFloat(k.resourcefulness);
										if( k.resourcefulnessBoostExpireUnixtime > timestamp ){
											bonusK *= 1.25;
										}
									}
								}

							//wild bonus
								var bonusW = [0, 0, 0, 0, 0];
								if( seed.wilds ){
									subLength = seed.wilds.length;
									for( j = 0; j < subLength; j += 1 ){
										var b = seed.wilds[ j ].tileType[0];
										bonusW[ b ] += parseInt( seed.wilds[ j ].tileLevel, 10);
									}
								}

							//population modifier
								var populationModifier = 1,
									population = parseFloat(seed.pop[0]),
									hapiness = parseFloat(seed.pop[3]);
								if( hapiness > population ){
									populationModifier = population / hapiness;
								}

							subLength = KOCFIA.resources_production_detail.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOCFIA.resources_production_detail[j],
									r = j + 1; //no gold
								if( type.rows ){
									var rowsLength = type.rows;
									for( k = 0; k < rowsLength; k += 1 ){
										var $tds = $resProdDetailTrs.eq(line).find('td'),
											$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
											n = null;
										//'base', 'gardien', 'chevalier', 'technologie', 'TS', 'sort'
										switch( type.label[k] ){
											case 'base':
													n = parseFloat(seed.res["rec" + r][2] * populationModifier);
													base[r] = n;
													total[r] = n;
												break;
											case 'gardien':
													n = parseFloat( bonusG[ keys[r] ] );
													total[r] += n;
												break;
											case 'chevalier':
													n = parseFloat(base[r] * (bonusK / 100));
													total[r] += n;
												break;
											case 'technologie':
													n = parseFloat(base[r] * (parseFloat(window.seed.tech["tch" + r]) / 10));
													total[r] += n;
												break;
											case 'TS':
													n = parseFloat(base[r] * 0.05 * bonusW[r]);
													total[r] += n;
												break;
											case 'sort':
													if( parseInt( window.seed.playerEffects["r" + r + "BstExp"]) > timestamp ){
														n = parseFloat(base[r] * 0.25);
													}
													total[r] += n || 0;
												break;
										}

										if( n != null ){
											$td.html( KOCFIA.shared.format( n ) )
												.attr('title', KOCFIA.shared.readable( n ))
												.data('ori', n);
										} else {
											$td.html( '&nbsp;' )
												.attr('title', '')
												.data('ori', '0');
										}

										line += 1;
									}
								}
							}

						//resources from barbarian camps
							subLength = KOCFIA.resources_production_barbarian.length;
							for( j = 0; j < subLength; j += 1 ){
								var $tds = $resProdBarbarianTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
									n = 0;
								if( barbariansRes.length ){
									var brLength = barbariansRes.length
									for( k = 0; k < brLength; k += 1 ){
										n += barbariansRes[k][j];
									}
									total[j] += n;

									$td.html( KOCFIA.shared.format( n ) )
										.attr('title', KOCFIA.shared.readable( n ))
										.data('ori', n );
								} else {
									$td.html( '&nbsp;' )
										.attr('title', '')
										.data('ori', '0');
								}
							}

						//resources consumption
							var line = 0;
							subLength = KOCFIA.resources_consumption.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOCFIA.resources_consumption[j];
								if( type.rows ){
									var rowsLength = type.rows;
									for( k = 0; k < rowsLength; k += 1 ){
										var $tds = $resConsoTrs.eq(line).find('td'),
											$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
											n = null;
										//'dépense', 'formation'
										switch( type.label[k] ){
											case 'dépense':
												var inSeed = KOCFIA.inSeed.resources_consumption[ type.name ];
												if( inSeed ){
													if( inSeed.hasOwnProperty('type') ){
														n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
													} else {
														n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
													}
													total[j] -= n;
												}
												break;
											case 'formation':
													n = 0;
													total[j] -= n;
												break;
										}

										if( n != null ){
											$td.html( KOCFIA.shared.format( n ) )
												.attr('title', KOCFIA.shared.readable( n ))
												.data('ori', n);
										} else {
											$td.html( '&nbsp;' )
												.attr('title', '')
												.data('ori', '0');
										}

										line += 1;
									}
								}
							}

						//resources production total
							subLength = KOCFIA.resources_production_total.length;
							for( j = 0; j < subLength; j += 1 ){
								var $tds = $resProdTotalTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );

								if( total[j] ){
									total[j] += 100;
									$td.html( KOCFIA.shared.format( total[j] ) )
										.attr('title', KOCFIA.shared.readable( total[j] ))
										.data('ori', total[j] );
								} else {
									$td.html('&nbsp;');
								}
							}

						//resources autonomy
							subLength = KOCFIA.resources_autonomy.length;
							for( j = 0; j < subLength; j += 1 ){
								var stock = KOCFIA.resources[j],
									stockInSeed = KOCFIA.inSeed.resources[ stock.name ],
									$tds = $resAutonomyTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
									s = 0;
								if( stockInSeed ){
									if( stockInSeed.hasOwnProperty('type') ){
										s = parseFloat( seed[ stockInSeed.var ][ stockInSeed.type ][ stockInSeed.index ] );
										if( s > 0 ) s = s / 3600;
									} else {
										s = parseFloat( seed[ stockInSeed.var ][ stockInSeed.index ] );
									}

									if( total[j] >= 0 ){
										$td.html('-');
									} else if( s == 0 ){
										$td.html('0s');
									} else {
										var n = s / ( -1 * total[j] ) * 3600;
										$td.html( KOCFIA.shared.readableDuration( n ) );
									}
								} else {
									$td.html('-');
								}
							}

						//troops
							subLength = KOCFIA.troops.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOCFIA.troops[j],
									$tds = $troopsTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
									n = null;

								if( seed.units[ type.name ] ){
									n = parseFloat( seed.units[ type.name ] );
								}

								if( n != null ){
									$td.html( KOCFIA.shared.format( n ) )
										.attr('title', KOCFIA.shared.readable(n))
										.data('ori', n);
								} else {
									$td.html('&nbsp;')
										.attr('title', '')
										.data('ori', 0);
								}
							}

						//troops barbarian
							subLength = KOCFIA.troops_barbarian.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOCFIA.troops_barbarian[j],
									$tds = $troopsBarbarianTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
									n = null;

								if( barbariansTroops.length && barbariansTroops[j] ){
									n = parseFloat( barbariansTroops[j] );
								}

								if( n != null ){
									$td.html( KOCFIA.shared.format( n ) )
										.attr('title', KOCFIA.shared.readable(n))
										.data('ori', n);
								} else {
									$td.html('&nbsp;')
										.attr('title', '')
										.data('ori', 0);
								}
							}

						//defenses
							subLength = KOCFIA.defenses.length;
							for( j = 0; j < subLength; j += 1 ){
								var fort = KOCFIA.defenses[j];
								var $tds = $defensesTrs.eq( j ).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
									n = null;

								if( seed.fortifications.hasOwnProperty( fort.name ) ){
									n = parseFloat( seed.fortifications[ fort.name ] );
								}

								if( n != null ){
									$td.html( KOCFIA.shared.format( n ) )
										.attr('title', KOCFIA.shared.readable(n))
										.data('ori', n);
								} else {
									$td.html('&nbsp;')
										.attr('title', '')
										.data('ori', 0);
								}
							}
					}

					KOCFIA.overview.sums();
					KOCFIA.overview.updating = false;
				},
				'sums': function(){
					KOCFIA.overview.$tbodyTrs.each2(function(i, $tr){
						if( !$tr.hasClass('resources_autonomy') ){
							var sum = 0,
								$tds = $tr.find('td');
							if( $tds.length ){
								var $sumTd = $tds.filter('.sum'),
									col = $tds.index( $sumTd );
								$tds.filter(':gt('+ col +')').each2(function(j, $td){
									if( $td.data('ori') ) sum += parseFloat( $td.data('ori') );
								});

								if( sum == Number.NaN ){
									$sumTd.html( '-' )
										.attr('title', '');
								} else {
									$sumTd.html( KOCFIA.shared.format( sum ) )
										.attr('title', KOCFIA.shared.readable(sum));
								}
							}
						}
					});
				},
				'getCityColWidth': function( tableWidth ){
					console.info('kocfia overview getCityColWidth function');
					var cityColWidth = tableWidth - 25;
					cityColWidth -= KOCFIA.overview.$cityTds.eq(0).width();
					cityColWidth -= KOCFIA.overview.$cityTds.eq(1).width();
					cityColWidth -= KOCFIA.overview.$cityTds.eq(2).width();
					cityColWidth /= KOCFIA.citiesKey.length;

					return Math.floor(cityColWidth);
				},
				'calcInnerSizes': function( size ){
					console.info('kocfia overview calcInnerSizes function');
					KOCFIA.overview.$cityTds.filter(':gt(2)').css('width', '');

					var tableH = size.height - 30 - (KOCFIA.overview.movable ? KOCFIA.overview.$div.find('h3').outerHeight(true) : 0);
					KOCFIA.overview.$wrap.css('height', tableH);
					KOCFIA.overview.$tbody.css('height', tableH - KOCFIA.overview.$header.height());

					KOCFIA.overview.$cityTds.filter(':gt(2)').css('width', KOCFIA.overview.getCityColWidth( size.width ) + 'px');

					KOCFIA.overview.$headersThs.filter(':gt(2)').each2(function(i, $th){
						$th.css('width', KOCFIA.overview.$cityTds.eq(i + 3).css('width'));
					});
				},
				/* moveable */
					'moveableOn': function(){
						console.info('KOCFIA overview moveableOn function');

						KOCFIA.overview.$div
							.prepend('<h3>Vue Globale</h3>')
							.prepend('<span class="ui-icon ui-icon-close"></span>')
							.draggable({
								helper: "original",
								appendTo: 'body',
								containment: 'parent',
								scroll: true,
								distance: 20,
								stop: function(event, ui){
									KOCFIA.conf.overview.position = ui.position;
									KOCFIA.shared.storeConf();
								}
							})
							.resizable({
								'minWidth': 250,
								'minHeight': 250,
								'resize': function(event, ui){
									KOCFIA.overview.calcInnerSizes( ui.size );
								},
								'stop': function(event, ui){
									KOCFIA.conf.overview.size = ui.size;
									KOCFIA.shared.storeConf();
								}
							})
							.css({
								'top': KOCFIA.conf.overview.position.top,
								'left': KOCFIA.conf.overview.position.left,
								'width': KOCFIA.conf.overview.size.width,
								'height': KOCFIA.conf.overview.size.height,
							})
							.on('click', '.ui-icon-close', function(e){
								e.preventDefault();
								KOCFIA.overview.$div.hide();
								KOCFIA.conf.overview.visible = 0;
								KOCFIA.shared.storeConf();
							});

						if( KOCFIA.conf.overview.visible ){
							KOCFIA.overview.$div.show();

							KOCFIA.overview.calcInnerSizes( KOCFIA.conf.overview.size );
						} else {
							KOCFIA.overview.$div.hide();
						}

						var $overviewToggle = $('<button id="kocfia-overview-toggle">').html('Vue Globale');
						$overviewToggle.click(function(){
							KOCFIA.overview.$div.toggle();

							if( KOCFIA.overview.$div.is(':visible') ){
								KOCFIA.overview.calcInnerSizes( KOCFIA.conf.overview.size );
							}

							KOCFIA.conf.overview.visible = (KOCFIA.overview.$div.is(':visible') ? 1 : 0);
							KOCFIA.shared.storeConf();
						});

						KOCFIA.$buttons.append($overviewToggle);
					},
					'moveableOff': function(){
						console.info('KOCFIA overview moveableOff function');
						KOCFIA.overview.$div
							.draggable('destroy')
							.resizable('destroy')
							.find('h3, .ui-icon-close').remove();
					},
					'resetPlacement': function(){
						console.info('KOCFIA overview resetPlacement function');
						if( KOCFIA.conf.overview.moveable ){
							KOCFIA.overview.$div.css( KOCFIA.overview.options.position );
							KOCFIA.conf.overview.position = KOCFIA.overview.options.position;
							KOCFIA.shared.storeConf();
						}
					},
					'resetDimensions': function(){
						console.info('KOCFIA overview resetDimensions function');
						if( KOCFIA.conf.overview.moveable ){
							KOCFIA.overview.$div.css( KOCFIA.overview.options.size );
							KOCFIA.conf.overview.size = KOCFIA.overview.options.size;
							KOCFIA.shared.storeConf();
						}
					},
				/* replace */
					'replaceOn': function(){
						console.info('KOCFIA overview replaceOn function');

						var $b = $('#kocmain_bottom'),
							$f = $b.siblings('.panel_friendlist');
						var p = $b.offset();
						var h = $b.outerHeight() + $f.outerHeight(),
							w = $b.outerWidth();

						KOCFIA.overview.$div.css({
							'height': $b.outerHeight() + $f.outerHeight(),
							'width': $b.outerWidth(),
							'top': p.top,
							'left': p.left,
						});

						//$b.hide();
						$f.hide();
						KOCFIA.overview.$div.show();
						$b.find('.mod_comm').css('display', 'block');

						KOCFIA.overview.calcInnerSizes({'height': h, 'width': w});

						$('#kocfia-overview-toggle').remove();
					},
					'replaceOff': function(){
						console.info('KOCFIA overview replaceOff function');

						$('#kocmain_bottom').show().siblings('.panel_fiendlist').show();
					},
			};

		/* WILDERNESS */
			KOCFIA.wilderness = {
				'options': {
					'active': 1,
					'automatic': 0,
				},
				'stored': ['attacks'],
				'attacks': {}, //by city id and attack id
				'confPanel': function( $section ){
					console.info('KOCFIA wilderness confPanel function');
					var code = '<h3>Armoiries</h3>';
					code += '<div>';
					code += KOCFIA.shared.generateCheckbox('wilderness', 'active', 'Activer le module', KOCFIA.conf.wilderness.active);
					code += KOCFIA.shared.generateCheckbox('wilderness', 'automatic', 'Lancer les attaques automatiques', KOCFIA.conf.wilderness.automatic);
					code += KOCFIA.shared.generateButton('wilderness', 'deleteAllPlans', 'Supprimer toutes les attaques enregistrées');
					code += '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOCFIA wilderness modPanel function');
					var $section = KOCFIA.$confPanel.find('#kocfia-wilderness').html('');

					var header = '<div class="infos cf">';
					header += '<span class="ui-icon ui-icon-info"></span>';
					header += '<span><input type="checkbox" id="wilderness-panel-automatic" '+ (KOCFIA.conf.wilderness.automatic ? 'checked' : '') +' autocomplete="off" />';
					header += '<label for="wilderness-panel-automatic">attaques automatiques</label></span>';
					header += '</div>'

					var form = '<h3>Configurer une attaque</h3>';
					form += '<div class="attack-form">';
					form += '<ul class="message"></ul>';
					form += '<input type="hidden" class="edit-attackId" name="attackId" value="" autocomplete="off" />';
					form += '<input type="hidden" class="edit-cityKey" name="cityKey" value="" autocomplete="off" />';
					form += '<fieldset>';
					form += '<legend>Ville</legend>';

					var i, length = KOCFIA.citiesKey.length;
					for( i = 0; i < length; i += 1 ){
						var cityKey = KOCFIA.citiesKey[i],
							city = KOCFIA.cities[cityKey];
						form += '<input id="kocfia-wilderness-'+ cityKey +'" name="city" value="'+ cityKey +'" type="radio" class="city-choice" autocomplete="off" />';
						form += '<label for="kocfia-wilderness-'+ cityKey +'">'+ city.roman + ' ' + city.name +'</label>';
					}

					form += '</fieldset>';
					form += '<fieldset class="builds">';
					form += '<legend>Attaques types</legend>';
					form += '<div>';
					form += '<button class="build" rel="5">TS5 (emp5)</button>';
					form += '<button class="build" rel="6">TS6 (emp7)</button>';
					form += '<button class="build" rel="7">TS7 (emp8)</button>';
					form += '<button class="build" rel="8">TS8 (emp9)</button>';
					form += '<button class="build" rel="9">TS9 (emp 9)</button>';
					form += '<button class="build" rel="9bis">TS9 (emp10)</button>';
					form += '<button class="build" rel="10">TS10 (emp10)</button>';
					form += '</div>';
					form += '</fieldset>';
					form += '<fieldset>';
					form += '<legend>Coordonnées</legend>';
					form += '<label>Niveau&nbsp;:&nbsp;</label>';
					form += '<input type="text" class="targetLevel" />';
					form += '<small>format: x,y x,y x,y ...</small>';
					form += '<textarea name="coords" autocomplete="off"></textarea>';
					form += '</fieldset>';

					var skel = '<fieldset class="wave">';
					skel += '<legend>Vague</legend>';
					skel += '<label>Chevalier&nbsp;:&nbsp;</label><select class="knight-choice" name="knight" autocomplete="off">';
					skel += '<option value="">N\'importe lequel</option>';
					skel += '</select>';
					skel += '<div class="unit-block">';
					skel += '<label>Unité&nbsp;:&nbsp;</label><select class="unit-choice" autocomplete="off">';
					skel += '<option value="">Choisir</option>';
					skel += '</select>';
					skel += '<label>Quantité&nbsp;:&nbsp;</label><input class="unit-qty" type="text" autocomplete="off" />';
					skel += '</div>';
					skel += '<button class="add-unit">Ajouter une autre unité</button>';
					skel += '</fieldset>';
					KOCFIA.wilderness.$waveSkeleton = $(skel);

					form += '<fieldset class="keep">';
					form += '<legend>Conserver</legend>';
					form += '<div class="unit-block">';
					form += '<label>Unité&nbsp;:&nbsp;</label><select class="unit-choice">';
					form += '<option value="">Choisir</option>';
					form += '</select>';
					form += '<label>Quantité&nbsp;:&nbsp;</label><input class="unit-qty" type="" autocomplete="off" />';
					form += '</div>';
					form += '<button class="add-unit">Ajouter une autre unité</button>';
					form += '</fieldset>';
					form +=  '<button class="add-wave">Ajouter une vague</button>';
					form += '<button class="launch">Lancer</button>';
					form += '<button class="save">Sauvegarder</button>';
					form += '<button class="saveAndLaunch">Sauvegarder et Lancer</button>';
					form += '<button class="reset">Annuler</button>';
					form += '</div>';

					//attacks list
					var onGoing = '<h3>Attaques en cours</h3>';
					onGoing += '<div class="attack-list ongoing">';
					onGoing += '<table><thead><tr>';
					onGoing += '<th class="action">Actions</th>';
					onGoing += '<th class="from">Ville</th>';
					onGoing += '<th class="to">Cible</th>';
					onGoing += '<th class="coords">Coordonnées</th>';
					onGoing += '<th class="current">Cible</th>';
					onGoing += '<th class="info">Info</th>';
					onGoing += '</tr></thead>';

					var savedPlans = '<h3>Attaques enregistrées</h3>';
					savedPlans += '<div class="attack-list saved">';
					savedPlans += '<table><thead><tr>';
					savedPlans += '<th class="action">Actions</th>';
					savedPlans += '<th class="from">Ville</th>';
					savedPlans += '<th class="to">Cible</th>';
					savedPlans += '<th class="coords">Coordonnées</th>';
					savedPlans += '<th class="waves">Vagues</th>';
					savedPlans += '<th class="keep">Converser</th>';
					savedPlans += '</tr></thead>';

					for( i = 0; i < length; i += 1 ){
						var cityKey = KOCFIA.citiesKey[i],
							city = KOCFIA.cities[cityKey];
						var line = '<tbody data-city="'+ cityKey +'"></tbody>';

						onGoing += line;
						savedPlans += line;
					}
					onGoing += '</table></div>';
					savedPlans += '</table></div>';

					var help = '<div id="kocfia-wilderness-help" class="help" title="Aide armoiries"><h4>Règles, limitations et informations :</h4><ul>';
					help += '<li>Les terres sauvages occupées ne seront pas attaquées (vérification pour chaque coordonnée à chaque attaque)</li>';
					help += '<li>Une attaque sera annulée au bout de 10 erreurs consécutives <br />(coordonnée occupée, aucun chevalier, point de ralliement plein, pas assez de troupes, ...)</li>';
					help += '<li>Les attaques sauvegardées peuvent être lancées manuellement ou via le mode automatique</li>';
					help += '<li>Pour le formulaire les erreurs seront listées au-dessus</li>';
					help += '<li>Aucune vague n\'est lancée si il n\'y a pas assez de chevaliers pour lancer tous les vagues de l\'attaque</li>';
					help += '<li>Si une vague est en erreur les vagues précédentes seront rappelées (sous réserves des limitations de temps de marche restant > 1min)</li>';
					help += '<li>Lors du démarrage du mode automatique, 20 secondes s\'écoulent entre chaque lancement de plan d\'attaque sauvegardé</li>';
					help += '<li>Dix secondes s\'écoulent entre chaque lancement de vague</li>';
					help += '<li>Chaque requête au serveur est exécutée au maximum 3 fois lors de problème réseau ou serveur</li>';
					help += '</ul><h4>Méthode :</h4><ol>';
					help += '<li>Sélectionner une ville</li>';
					help += '<li>Spécifier une ou plusieurs coordonnées (séparées par un retour à la ligne, sous le format x,y)</li>';
					help += '<li>Remplir les vagues d\'attaques (manuellement ou via les attaques préprogrammées)</li>';
					help += '<li>Spécifier les chevaliers (optionnel, par défaut le premier chevalier disponible est utilisé)</li>';
					help += '<li>Les quantités de troupes peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2M pour deux millions, 3G pour trois milliards)</li>';
					help += '<li>Spécifier les quantités de troupes à conserver (optionnel)</li>';
					help += '</ol></div>';

					$section.append( header + '<div class="accordion">' + form + savedPlans + onGoing + '</div>' + help )
						.on('change', '#wilderness-panel-automatic', function(){
							$('#wilderness-automatic').prop('checked', $(this).prop('checked')).change();
						})
						//load knights and units on city change )
						.on('change', '.city-choice', function(){
							var $waves = KOCFIA.wilderness.$form.find('.wave');
							if( $waves.length ) $waves.remove();

							KOCFIA.wilderness.$form.find('.keep, .add-wave, .save, .launch, .saveAndLaunch, .builds').show();

							KOCFIA.wilderness.addWaves(2, $(this).val());
						})
						//add unit button
						.on('click', '.add-unit', function(){
							var $this = $(this),
								$b = $this.siblings('.unit-block').eq(0).clone();

							$b.find('input, select').val('');
							$b.append('<button class="remove">Supprimer cette unité</button>')
							  .insertBefore( $this );
						})
						//remove unit button
						.on('click', '.remove', function(){
							$(this).parent().remove();
						})
						//add wave button
						.on('click', '.add-wave', function(){
							var $clone = KOCFIA.wilderness.$form.find('.wave').eq(0).clone();
							$clone.find('input, select').val('');
							$clone.insertBefore( KOCFIA.wilderness.$form.find('.keep') );
						})
						//reset form
						.on('click', '.reset', KOCFIA.wilderness.resetForm)
						//launch
						.on('click', '.launch', function(){
							console.info('attack launch click');
							if( KOCFIA.conf.wilderness.active ){
								var result = KOCFIA.wilderness.planAttack();
								if( result.errors.length ){
									KOCFIA.wilderness.$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
								} else {
									KOCFIA.wilderness.$form.find('.message').empty();
									var d = new Date();
									result.attack.id = Math.floor(d.getTime() / 1000);
									KOCFIA.wilderness.launchAttack( result.attack );

									//open ongoing accordion
									KOCFIA.wilderness.$accordion.accordion('activate', 2);
								}
							} else {
								alert('Le module n\'est pas actif. Les lancements d\'attaques sont bloqués.');
							}
						})
						//save
						.on('click', '.save, .saveAndLaunch', function(){
							console.info('attack save click');
							var result = KOCFIA.wilderness.planAttack();
							if( result.errors.length ){
								KOCFIA.wilderness.$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
							} else {
								KOCFIA.wilderness.$form.find('.message').empty();

								if( !KOCFIA.wilderness.attacks[ result.attack.cityKey ] ){
									KOCFIA.wilderness.attacks[ result.attack.cityKey ] = {};
								}

								var editAttackId = KOCFIA.wilderness.$form.find('.edit-attackId').val(),
									editCityKey = KOCFIA.wilderness.$form.find('.edit-cityKey').val();
								if( editAttackId != '' && editCityKey != '' ){
									KOCFIA.wilderness.deletePlan( editAttackId, editCityKey, false );
									KOCFIA.wilderness.$saved.find('tbody').filter('[data-city='+ editCityKey +']')
										.find('tr').filter('[data-attack='+ editAttackId +']')
										.remove();
								}

								var d = new Date();
								result.attack.id = Math.floor(d.getTime() / 1000);

								KOCFIA.wilderness.attacks[ result.attack.cityKey ][ result.attack.id ] = result.attack;

								KOCFIA.wilderness.$saved.find('tbody').filter('[data-city='+ cityKey +']')
									.append( KOCFIA.wilderness.attackInfo( result.attack ) );

								KOCFIA.wilderness.storeAttacks();

								if( KOCFIA.conf.wilderness.active && $(this).hasClass('saveAndLaunch') ){
									result.attack.id = Math.floor(d.getTime() / 1000);
									KOCFIA.wilderness.launchAttack( result.attack );

									//open ongoing accordion
									KOCFIA.wilderness.$accordion.accordion('activate', 2);
								} else {
									//open saved accordion
									KOCFIA.wilderness.$accordion.accordion('activate', 1);
								}
							}
						})
						//attack plan delete
						.on('click', '.delete', function(){
							if( confirm('Etes-vous sûr ?') ){
								var $this = $(this),
									$tr = $(this).parent().parent(),
									isEdit = $this.hasClass('edit'),
									attackId = $tr.data('attack'),
									cityKey = $tr.data('city');

								KOCFIA.wilderness.deletePlan( attackId, cityKey, true );
								$tr.remove();
							}
						})
						//attack plan edit and duplication
						.on('click', '.edit, .duplicate', function(){
							KOCFIA.wilderness.resetForm();
							var $this = $(this),
								$tr = $this.parent(),
								attackId = $tr.data('attack'),
								cityKey = $tr.data('city'),
								attack = KOCFIA.wilderness.attacks[ cityKey ][ attackId ];

							if( attack ){
								KOCFIA.wilderness.$form.find('.keep, .add-wave, .save, .launch, .saveAndLaunch, .builds').show();

								if( $this.hasClass('edit') ){
									KOCFIA.wilderness.$form.find('.edit-attackId').val( attack.id );
									KOCFIA.wilderness.$form.find('.edit-cityKey').val( attack.cityKey );
								}

								KOCFIA.wilderness.$form.find('.city-choice').filter('[value='+ cityKey +']').prop('checked', true);
								KOCFIA.wilderness.$form.find('.targetLevel').val(attack.targetLevel);
								KOCFIA.wilderness.$form.find('textarea').val(attack.coords.join("\n"));

								KOCFIA.wilderness.addWaves( attack.waves.length, attack.cityKey );

								var $waves = KOCFIA.wilderness.$form.find('.wave');
								var i, j, wavesLength = attack.waves.length, unitsLength;
								for( i = 0; i < wavesLength; i += 1 ){
									var $wave = $waves.eq(i),
										wave = attack.waves[i];

									$wave.find('.knight-choice').val( wave.knight );

									if( wave.units.length > 1 ){
										for( var j = 1; j < wave.units.length; j += 1 ){
											$wave.find('.add-unit').trigger('click');
										}
									}

									var $blocks = $wave.find('.unit-block');
									unitsLength = wave.units.length;
									for( j = 0; j < unitsLength; j += 1 ){
										var $b = $blocks.eq(j),
											unit = wave.units[j];
										$b.find('.unit-choice').val( unit.id );
										$b.find('.unit-qty').val( KOCFIA.shared.format( unit.qty ) );
									}
								}

								var $keep = KOCFIA.wilderness.$form.find('.keep');
								if( attack.keep.length > 1 ){
									var keepLength = attack.keep.length;
									for( i = 1; i < keepLength; i += 1 ){
										$keep.find('.add-unit').trigger('click');
									}
								}

								var $blocks = $keep.find('.unit-block');
								for( i = 0; i < keepLength; i += 1 ){
									var unit = attack.keep[i];

									var $b = $blocks.eq(i);
									$b.find('.unit-choice').val( unit.id );
									$b.find('.unit-qty').val( KOCFIA.shared.format( unit.qty ) );
								}

								//open form accordion
								KOCFIA.wilderness.$accordion.accordion('activate', 0);
							} else {
								alert('Plan d\'attaque introuvable.')
							}
						})
						//knight choice change
						.on('change', '.knight-choice', function(){
							var id = $(this).val();
							if( id != '' ){
								KOCFIA.wilderness.$form.find('.knight-choice').not( this ).each2(function(i, $kc){
									if( $kc.val() == id ) $kc.val('');
								});
							}
						})
						//stop on next round
						.on('click', '.stop', function(){
							if( confirm('Etes-vous sûr ?') ){
								var $tr = $(this).parent().parent();
								$tr.data('stop', 1);
							}
						})
						//manual launch
						.on('click', '.charge', function(){
							if( KOCFIA.conf.wilderness.active ){
								if( !KOCFIA.conf.wilderness.automatic ){
									var $tr = $(this).hide().parent().parent();
									var attack = KOCFIA.wilderness.attacks[ $tr.data('city') ][ $tr.data('attack') ];
									if( attack ){
										attack.lastCoordIndex = 0;
										attack.abort = 0;
										attack.aborts = [];
										attack.marching = [];
										KOCFIA.wilderness.refreshOngoingInfo( attack, false );
										KOCFIA.wilderness.launchAttack( attack );

										//open ongoing accordion
										KOCFIA.wilderness.$accordion.accordion('activate', 2);
									} else {
										alert('Plan d\'attaque introuvable.')
									}
								} else {
									alert('Le mode automatic est activé. Le lancement d\'attaque sauvegardée est bloqué (attaque déjà en cours).');
								}
							} else {
								alert('Le module n\'est pas actif. Les lancements d\'attaques sont bloqués.');
							}
						})
						//attack templates
						.on('click', '.build', function(){
							var rel = $(this).attr('rel');
							KOCFIA.wilderness.$form.find('.wave').remove();
							KOCFIA.wilderness.addWaves(2, KOCFIA.wilderness.$form.find('.city-choice').filter(':checked').val());

							var $waves = KOCFIA.wilderness.$form.find('.wave');
							var $addUnit = $waves.find('.add-unit');
							var $level = KOCFIA.wilderness.$form.find('.targetLevel');
							$addUnit.eq(1).trigger('click')
							if( rel == '8' || rel == '9' || rel == '9bis' ){
								$addUnit.eq(0).trigger('click');
							}
							var $uChoices = $waves.find('.unit-choice'),
								$uQuantity = $waves.find('.unit-qty');

							switch( rel ){
								case '5':
										$level.val( 5 );
										//wave 1
										$uChoices.eq(0).val('unt2');
										$uQuantity.eq(0).val('50');
										//wave 2
										$uChoices.eq(1).val('unt2');
										$uQuantity.eq(1).val('1');
										$uChoices.eq(2).val('unt6');
										$uQuantity.eq(2).val('2.5k');
									break;
								case '6':
										$level.val( 6 );
										//wave 1
										$uChoices.eq(0).val('unt2');
										$uQuantity.eq(0).val('100');
										//wave 2
										$uChoices.eq(1).val('unt2');
										$uQuantity.eq(1).val('1');
										$uChoices.eq(2).val('unt6');
										$uQuantity.eq(2).val('4.2k');
									break;
								case '7':
										$level.val( 7 );
										//wave 1
										$uChoices.eq(0).val('unt2');
										$uQuantity.eq(0).val('150');
										//wave 2
										$uChoices.eq(1).val('unt2');
										$uQuantity.eq(1).val('1');
										$uChoices.eq(2).val('unt6');
										$uQuantity.eq(2).val('6k');
									break;
								case '8':
										$level.val( 8 );
										//wave 1
										$uChoices.eq(0).val('unt2');
										$uQuantity.eq(0).val('299');
										$uChoices.eq(1).val('unt10');
										$uQuantity.eq(1).val('1');

										//wave 2
										$uChoices.eq(2).val('unt10');
										$uQuantity.eq(2).val('800');
										$uChoices.eq(3).val('unt6');
										$uQuantity.eq(3).val('10k');
									break;
								case '9':
										$level.val( 9 );
										//wave 1
										$uChoices.eq(0).val('unt2');
										$uQuantity.eq(0).val('599');
										$uChoices.eq(1).val('unt10');
										$uQuantity.eq(1).val('1');

										//wave 2
										$uChoices.eq(2).val('unt10');
										$uQuantity.eq(2).val('2.5k');
										$uChoices.eq(3).val('unt6');
										$uQuantity.eq(3).val('40k');
									break;
								case '9bis':
										$level.val( 9 );
										//wave 1
										$uChoices.eq(0).val('unt2');
										$uQuantity.eq(0).val('599');
										$uChoices.eq(1).val('unt10');
										$uQuantity.eq(1).val('1');

										//wave 2
										$uChoices.eq(2).val('unt10');
										$uQuantity.eq(2).val('1.6k');
										$uChoices.eq(3).val('unt6');
										$uQuantity.eq(3).val('15k');
									break;
								case '10':
										$level.val( 10 );
										//wave 1
										$uChoices.eq(0).val('unt2');
										$uQuantity.eq(0).val('1199');

										//wave 2
										$uChoices.eq(1).val('unt2');
										$uQuantity.eq(1).val('1');
										$uChoices.eq(2).val('unt6');
										$uQuantity.eq(2).val('69999');
									break;
							}
						})
						//remove ongoing attack info line
						.on('click', '.trash', function(){
							$(this).parent().remove();
						})
						.find('.help').dialog({ autoOpen: false, zIndex: 100002 });

					KOCFIA.wilderness.$accordion = $section.find('.accordion');
					KOCFIA.wilderness.$form = $section.find('.attack-form');
					KOCFIA.wilderness.$saved = $section.find('.attack-list.saved');
					KOCFIA.wilderness.$ongoing = $section.find('.attack-list.ongoing');

					KOCFIA.wilderness.$accordion.accordion({collapsible: true, autoHeight: false}).accordion('activate', false);
				},
				'on': function(){
					console.info('KOCFIA wilderness on function');
					if( $.isEmptyObject( KOCFIA.wilderness.attacks ) ){
						try{
							var persistentwildernessAttacks = localStorage.getObject('kocfia_wilderness_attacks_' + KOCFIA.storeUniqueId);
							if( persistentwildernessAttacks ){
								KOCFIA.wilderness.attacks = persistentwildernessAttacks;
							}
						} catch(e){
							console.error(e);
						}
					}

					var i, length = KOCFIA.citiesKey.length;
					for( i = 0; i < length; i += 1 ){
						KOCFIA.wilderness.listCityAttacks( KOCFIA.citiesKey[i] );
					}

					KOCFIA.wilderness.$saved.find('.charge').toggle( KOCFIA.conf.wilderness.automatic );

					if( KOCFIA.conf.wilderness.automatic ){
						KOCFIA.wilderness.automaticOn();
					}
				},
				'off': function(){
					console.info('KOCFIA wilderness off function');

					KOCFIA.wilderness.automaticOff();
				},
				'automaticOn': function(){
					console.info('KOCFIA wilderness automaticOn function');
					$('#wilderness-panel-automatic').prop('checked', true);

					KOCFIA.wilderness.$saved.find('.charge').hide(); //hide manual launch button

					//using closure to have a "copy" of the attack plan
					var i = 1;
					var schredule = function(attack, i){
						var delay = window.setTimeout(function(){
							console.info('launching automatic attack', attack.id, attack.cityKey, attack);
							attack.abort = 0;
							attack.aborts = [];
							KOCFIA.wilderness.launchAttack( attack );
						}, i * 20000);
					};

					//launching stored attacks
					for( var c in KOCFIA.wilderness.attacks ){
						if( KOCFIA.wilderness.attacks.hasOwnProperty(c) ){
							for( var a in KOCFIA.wilderness.attacks[c] ){
								if( KOCFIA.wilderness.attacks[c].hasOwnProperty(a) ){
									schredule(KOCFIA.wilderness.attacks[c][a], i);
									i += 1;
								}
							}
						}
					}
				},
				'automaticOff': function(){
					console.info('KOCFIA wilderness automaticOff function');
					$('#wilderness-panel-automatic').prop('checked', false);

					//show all manual launch buttons
					KOCFIA.wilderness.$saved.find('.charge').show();

					//hide the on going attacks one
					KOCFIA.wilderness.$ongoing.find('tr').each2(function(i, $tr){
						KOCFIA.wilderness.$saved.find('tr').filter('[data-city='+ $tr.data('city') +'][data-attack='+ $tr.data('attack') +']').find('.charge').hide();
					});
				},
				'storeAttacks': function(){
					console.info('KOCFIA wilderness storeAttacks function');
					try{
						localStorage.setObject('kocfia_wilderness_attacks_' + KOCFIA.storeUniqueId, KOCFIA.wilderness.attacks);
					} catch(e){
						alert(e);
					}
				},
				'planAttack': function(){
					console.info('KOCFIA wilderness planAttack function');
					var $waves = KOCFIA.wilderness.$form.find('.wave'),
						$keep = KOCFIA.wilderness.$form.find('.keep'),
						$cityChoice = KOCFIA.wilderness.$form.find('.city-choice').filter(':checked'),
						level = $.trim( KOCFIA.wilderness.$form.find('.targetLevel').val() ),
						coords = $.trim( KOCFIA.wilderness.$form.find('textarea').val().replace(/\n/g, ' ') ),
						errors = [],
						regexp = /[^0-9, ]/,
						attack = { 'type': 'attack', 'waves': [], 'lastCoordIndex': 0, 'keep': [] };

					//check form
						//city
						if( !$cityChoice.length ){
							errors.push('Ville de départ obligatoire.');
						} else {
							attack.cityKey = $cityChoice.val();
						}

						//targetLevel
						if( level == '' ){
							errors.push('Le niveau des terres sauvages ciblées est requis.');
						} else if( level == Number.NaN ){
							errors.push('Le niveau des terres sauvages ciblées est éronné, il doit être un chiffre.');
						} else if( level < 1 || level > 10 ){
							errors.push('Le niveau des terres sauvages ciblées est éronné, il doit être compris entre 1 et 10.');
						} else {
							attack.targetLevel = level;
						}

						//coords
						if( coords.length == 0 ){
							errors.push('Au moins une coordonnée est requise.');
						} else if( regexp.test( coords ) ){
							errors.push('Pour les coordonnées, veuillez respecter le format x,y avec un saut de ligne entre deux coordonnées.');
						} else {
							coords = coords.split(' ');
							var wrongGPS = false, i, length = coords.length;
							for( i = 0; i < length; i += 1 ){
								var coord = coords[i].split(',');
								if( coord[0] < 0 || coord[0] > 750 || coord[0] < 0 || coord[0] > 750 ){
									wrongGPS = true;
								}
							}
							if( wrongGPS ){
								errors.push('Une des coordonnées est erronée.');
							} else {
								attack.coords = coords;
							}
						}

						//waves
						var unitList = [];
						$waves.each2(function(i, $wave){
							var w = {'units': []};

							//knight
								w.knight = $wave.find('.knight-choice').val();

							//troops
								$wave.find('.unit-block').each2(function(i, $b){
									var valid = true;
									var u = $b.find('.unit-choice').val(),
										q = KOCFIA.shared.decodeFormat( $.trim( $b.find('.unit-qty').val() ) );

									if( u.length == 0 ){
										valid = false;
									}

									if( q == false || q < 1 ){
										valid = false;
									}

									if( valid ){
										unitList.push(u);
										w.units.push({'id': u, 'qty': q});
									}
								});

							if( w.units.length ){
								attack.waves.push(w);
							}
						});

						if( !attack.waves.length ){
							errors.push('Au moins une unité de l\'attaque doit être spécifiée.');
							errors.push('Au moins une unité de l\'attaque doit avoir une quantité valide.');
						}

						//keep
						$keep.find('.unit-block').each2(function(i, $b){
							var k = {},
								u = $.trim( $b.find('.unit-choice').val() ),
								q = KOCFIA.shared.decodeFormat( $.trim( $b.find('.unit-qty').val() ) );

							if( u.length == 0 && q != false && q > 0 ){
								errors.push('L\'unité à conserver doit être spécifiée.');
							} else if( u.length > 0 && (q == false || q < 1) ){
								errors.push('L\'unité à conserver doit avoir une quantité.');
							} else if( u.length > 0 && unitList.length && $.inArray(u, unitList) > -1 ){
								attack.keep.push({'id': u, 'qty': q});
							}
						});

						if( errors.length ){
							errors = errors.unique();
						}

					return {'attack': attack, 'errors': errors};
				},
				'launchAttack': function( attack ){
					console.info('KOCFIA wilderness launchAttack function', attack);
					attack.lastCoordIndex = 0;
					attack.abort = 0;
					attack.aborts = [];
					attack.marching = [];
					KOCFIA.wilderness.refreshOngoingInfo( attack, false );
					KOCFIA.checkAndLaunchAttack( attack, 'wilderness' );
				},
				'resetForm': function(){
					console.info('KOCFIA wilderness resetForm function');
					KOCFIA.wilderness.$form.find('.keep, .add-wave, .save, .launch, .saveAndLaunch, .builds').hide();
					KOCFIA.wilderness.$form.find('.wave').remove();
					var $keep = KOCFIA.wilderness.$form.find('.keep');
					$keep.find('.unit-block').filter(':gt(0)').remove();
					$keep.find('.unit-choice').find('option').filter(':gt(0)').remove();
					var $inputs = KOCFIA.wilderness.$form.find('input');
					$inputs.filter('[type="text"], [type="hidden"]').val('');
					$inputs.filter('[type="radio"], [type="checkbox"]').prop('checked', false);
					KOCFIA.wilderness.$form.find('select, textarea').val('');
					KOCFIA.wilderness.$form.find('.message').empty();
				},
				'deletePlan': function( attackId, cityKey, save ){
					console.info('KOCFIA wilderness deletePlan function', attackId, cityKey, save);
					delete KOCFIA.wilderness.attacks[ cityKey ][ attackId ];

					if( save ) KOCFIA.wilderness.storeAttacks();
				},
				'deleteAllPlans': function(){
					console.info('KOCFIA wilderness deleteAllPlans function');
					KOCFIA.wilderness.attacks = {};
					KOCFIA.wilderness.storeAttacks();

					$('#kocfia-wilderness').find('.attack-list').find('ul').empty();
				},
				'attackInfo': function( attack ){
					console.info('KOCFIA wilderness attackInfo function', attack);
					var city = KOCFIA.cities[ attack.cityKey ];

					var code = '<tr data-city="'+ attack.cityKey +'" data-attack="'+ attack.id +'">';
					code += '<td class="actions">';
					code += '<span class="ui-icon ui-icon-flag charge" title="Lancer"></span>';
					code += '<span class="ui-icon ui-icon-pencil edit" title="Modifier"></span>';
					code += '<span class="ui-icon ui-icon-copy duplicate" title="Dupliquer"></span>';
					code += '<span class="ui-icon ui-icon-trash delete" title="Supprimer"></span>';
					code += '</td>';
					code += '<td class="form">' + city.roman + ' ' + city.name + '</td>';
					code += '<td class="to">TS ' + attack.targetLevel + '</td>';
					code += '<td class="coords">' + KOCFIA.shared.mapLink( attack.coords ) +'</td>';
					code += '<td class="waves">';

					var knights = window.seed.knights[ attack.cityKey ],
						j, k, wavesLength = attack.waves.length, unitsLength;
					for( j = 0; j < wavesLength; j += 1 ){
						var wave = attack.waves[j];
						code += '<div class="wave">Vague '+ (j + 1) + '&nbsp;:&nbsp;';
						code += '<div class="knight">chevalier&nbsp;:&nbsp;';
						code += ( wave.knight ? knights[ wave.knight ].knightName + '(niveau '+ knights[ attack.knight ].skillPointsApplied +', '+ KOCFIA.shared.getKnightStatText( knight ) +')' : 'n\'importe lequel' );
						code += '</div>';
						code += '<div class="troops">unités&nbsp;:&nbsp;';

						var unitsCode = '';
						unitsLength = wave.units.length;
						for( k = 0; k < unitsLength; k += 1 ){
							var unit = wave.units[k];
							if( unitsCode.length ) unitsCode += ', ';

							unitsCode += KOCFIA.shared.format( unit.qty );
							unitsCode +=  '<img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_';
							unitsCode += unit.id.replace(/unt/, '') + '_50_s34.jpg" title="'+ window.unitcost[ unit.id ][0] +'">';
						}
						code += unitsCode + '</div></div>';
					}
					code += '</td><td class="keep"><div class="troops">'
					var unitsCode = '', keepLength = attack.keep.length;
					for( j = 0; j < keepLength; j += 1 ){
						var unit = attack.keep[j];
						if( unitsCode.length ) unitsCode += ', ';

						unitsCode += KOCFIA.shared.format( unit.qty );
						unitsCode += '<img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_';
						unitsCode += unit.id.replace(/unt/, '') + '_50_s34.jpg" title="'+ window.unitcost[ unit.id ][0] +'">';
					}
					code += unitsCode + '</div></td></tr>';

					return code;
				},
				'refreshOngoingInfo': function(attack, noButton){
					console.info('KOCFIA wilderness refreshOngoingInfo function');

					var $tr = KOCFIA.wilderness.$ongoing.find('tr').filter('[data-city='+ attack.cityKey +'][data-attack='+ attack.id +']');
					if( $tr.length == 0 ){
						var city = KOCFIA.cities[ attack.cityKey ],
							code = '<tr data-city="'+ attack.cityKey +'" data-attack="'+ attack.id +'">';
						code += '<td class="action"><span class="ui-icon ui-icon-cancel" title="Arrêter au retour des troupes"></span></td>';
						code += '<td class="form">' + city.roman + ' ' + city.name + '</td>';
						code += '<td class="to">TS ' + attack.targetLevel + '</td>';
						code += '<td class="coords">' + KOCFIA.shared.mapLink( attack.coords ) +'</td>';
						code += '<td class="current"></td>';
						code += '<td class="info"></td></tr>';

						$tr = $( code );

						KOCFIA.wilderness.$ongoing.find('tbody').filter('[data-city='+ attack.cityKey +']').append( $tr );
					}

					//attack stopped
					if( noButton ){
						$tr.find('.stop').removeClass('stop').addClass('trash').attr('title', 'Enlever les informations sur cette attaque.');

						//show the manual launch button
						KOCFIA.wilderness.$saved.find('tr').filter('[data-city='+ attack.cityKey +'][data-attack='+ attack.id +']').find('.charge').show();
					} else {
						$tr.find('.current').html( KOCFIA.shared.mapLink( attack.coords[ attack.lastCoordIndex ] ) + '(' + (attack.lastCoordIndex + 1) + 'e / ' + attack.coords.length + ')' );
					}

					if( attack.aborts.length ){
						attack.aborts = attack.aborts.unique();
						$tr.find('.info').html( attack.aborts.join('<br />') );
					} else {
						$tr.find('.info').html('');
					}
				},
				'listCityAttacks': function( cityKey ){
					console.info('KOCFIA wilderness listCityAttacks function', cityKey);
					var $tbody = KOCFIA.wilderness.$saved.find('tbody').filter('[data-city='+ cityKey +']');
					$tbody.empty();

					var attacks = KOCFIA.wilderness.attacks[ cityKey ],
						code = '';
					if( attacks ){
						for( var a in attacks ){
							if( attacks.hasOwnProperty(a) ){
								code += KOCFIA.wilderness.attackInfo( attacks[a] );
							}
						}
					}

					$tbody.append( code );
				},
				//fill the keep <select> options too
				'addWaves': function( num, cityKey ){
					console.info('KOCFIA wilderness addWaves function', num, cityKey);

					var $clone = KOCFIA.wilderness.$waveSkeleton.clone(), i;
					$clone.insertBefore( KOCFIA.wilderness.$form.find('.keep') );
					for( i = 1; i < num; i += 1 ){
						$clone.clone().insertBefore( KOCFIA.wilderness.$form.find('.keep') );
					}

					var knights = KOCFIA.shared.getAvailableKnights( cityKey ),
						choices = '', i, length = knights.length;
					for( i = 0; i < length; i += 1 ){
						var knight = knights[i];
						choices += '<option value="'+ knight.knightId +'">'+ knight.knightName + '(niveau '+ knight.skillPointsApplied + ', ' + KOCFIA.shared.getKnightStatText( knight ) +')</option>';
					}

					KOCFIA.wilderness.$form.find('.knight-choice').each2(function(i, $kc){
						$kc.append( choices );
					});

					var units = window.seed.units[ cityKey ],
						choices = '';
					for( var u in units ){
						if( units.hasOwnProperty(u) ){
							var name = window.unitcost[u][0];
							if( name == 'Unité de Ravitaillement' ) name = 'Ravitailleur';
							choices += '<option value="'+ u +'">'+ name + ' ('+ KOCFIA.shared.format(units[u]) +')</option>';
						}
					}

					KOCFIA.wilderness.$form.find('.unit-choice').each2(function(i, $uc){
						$uc.append( choices );
					});
				},
			};

		/* NOTEPAD */
			KOCFIA.notepad = {
				'options': {
					'active': 1,
					'visible': 0,
					'moveable': 1,
					'position': {'top': 10, 'left': 10},
					'size': {'width': 300, 'height': 280},
				},
				'stored': ['notes'],
				'notes': {},
				'confPanel': function( $section ){
					console.info('KOCFIA notepad confPanel function');
					var code = '<h3>Bloc-note</h3>';
					code += '<div>';
					code += KOCFIA.shared.generateCheckbox('notepad', 'active', 'Activer le module', KOCFIA.conf.notepad.active);
					code += KOCFIA.shared.generateButton('notepad', 'resetPositionAndDimension', 'Remise à zéro de la position et des dimensions');
					code += KOCFIA.shared.generateButton('notepad', 'clean', 'Supprimer les notes');
					code += '</div>';

					$section.append( code );
				},
				'on': function(){
					console.info('KOCFIA notepad on function');
					$head.append( $('<style id="kocfia-notepad-css">').html(notepadCss) );

					if( $.isEmptyObject( KOCFIA.notepad.notes ) ){
						try{
							var notes = localStorage.getObject('kocfia_notepad_notes_' + KOCFIA.storeUniqueId);
							if( notes ){
								KOCFIA.notepad.notes = notes;
							}
						} catch(e){
							alert(e);
						}
					}

					var $notepad = $('<div id="kocfia-notepad" class="ui-widget ui-widget-content ui-corner-all">');

					var code = '<h3>Bloc Note</h3><div class="wrap">';
					code += '<label for="kocfia-notepad-note-name">Nom de la note&nbsp;:&nbsp;</label>';
					code += '<input type="text" id="kocfia-notepad-note-name" />';
					code += '<label for="kocfia-notepad-note-text"><span class="charsLeft">1000 caractères restant</span>Contenu&nbsp;:&nbsp;</label>';
					code += '<textarea id="kocfia-notepad-note-text"></textarea>';
					code += '<br /><button class="save">Enregistrer</button>';
					code += '<button class="cancel">Annuler</button>';

					code += '<h3>Notes :</h3><ul class="notes">';
					for( var n in KOCFIA.notepad.notes ){
						if( KOCFIA.notepad.notes.hasOwnProperty(n) ){
							var note = KOCFIA.notepad.notes[n];
							code += '<li><button data-id="'+ n +'">'+ note.name +'</button><span class="ui-icon ui-icon-trash"></span></li>';
						}
					}
					code += '</ul></div>';

					$notepad
						.append( '<span class="ui-icon ui-icon-close"></span>' )
						.append( code )
						.draggable({
							helper: "original",
							appendTo: 'body',
							containment: 'parent',
							scroll: true,
							distance: 20,
							stop: function(event, ui){
								KOCFIA.conf.notepad.position = ui.position;
								KOCFIA.shared.storeConf();
							}
						})
						.resizable({
							'minWidth': 200,
							'minHeight': 200,
							'stop': function(event, ui){
								KOCFIA.conf.notepad.size = ui.size;
								KOCFIA.shared.storeConf();
							}
						})
						.css({
							'top': KOCFIA.conf.notepad.position.top,
							'left': KOCFIA.conf.notepad.position.left,
							'width': KOCFIA.conf.notepad.size.width,
							'height': KOCFIA.conf.notepad.size.height,
						})
						.on('click', '.ui-icon-close', function(){
							KOCFIA.notepad.$div.hide();
							KOCFIA.conf.notepad.visible = 0;
							KOCFIA.shared.storeConf();
						})
						.on('click', '.save', function(){
							var name = $.trim( KOCFIA.notepad.$name.val() ),
								text = $.trim( KOCFIA.notepad.$textarea.val() );

							if( name.length ){
								if( text.length > 1000 ){
									alert('Texte trop long.');
								} else {
									var d = new Date(),
										id = Math.floor( d.getTime() / 1000 );
									KOCFIA.notepad.notes[ id ] = {'name': name, 'text': text};
									KOCFIA.notepad.storeNotes();

									KOCFIA.notepad.$notes.append( '<li><button data-id="'+ id +'">'+ name +'</button><span class="ui-icon ui-icon-trash"></span></li>' );
								}
							} else {
								alert('Nom de la note invalide.');
							}
						})
						.on('click', '.cancel', function(){
							KOCFIA.notepad.$name.val('');
							KOCFIA.notepad.$textarea.val('');
						})
						.on('click', '.notes button', function(){
							KOCFIA.notepad.load( $(this).data('id') );
						})
						.on('click', '.notes .ui-icon-trash', function(){
							var $this = $(this);
							KOCFIA.notepad.delete( $this.siblings().data('id') );
							$this.parent().remove();
						});

					$body.append( $notepad );

					KOCFIA.notepad.$div = $('#kocfia-notepad');
					KOCFIA.notepad.$notes = KOCFIA.notepad.$div.find('.notes');
					KOCFIA.notepad.$wrap = KOCFIA.notepad.$div.find('.wrap');
					KOCFIA.notepad.$span = KOCFIA.notepad.$wrap.find('pre span');
					KOCFIA.notepad.$name = $('#kocfia-notepad-note-name');
					KOCFIA.notepad.$textarea = $('#kocfia-notepad-note-text');
					KOCFIA.notepad.$charsLeft = KOCFIA.notepad.$div.find('.charsLeft');

					KOCFIA.notepad.$textarea[0].addEventListener('input', function(){
							var text = KOCFIA.notepad.$textarea.val(),
								l = 1000 - parseFloat(text.length);
							if( l < 2 ){
								KOCFIA.notepad.$charsLeft.html(l + ' caractère restant');
							} else {
								KOCFIA.notepad.$charsLeft.html(l + ' caractères restant')
							}
					}, false);

					if( KOCFIA.conf.notepad.visible ){
						KOCFIA.notepad.$div.show();
					}

					var $notepadToggle = $('<button id="kocfia-notepad-toggle">').html('Bloc Note');
					$notepadToggle.click(function(){
						KOCFIA.notepad.$div.toggle();

						KOCFIA.conf.notepad.visible = (KOCFIA.notepad.$div.is(':visible') ? 1 : 0);
						KOCFIA.shared.storeConf();
					});

					KOCFIA.$buttons.append($notepadToggle);
				},
				'off': function(){
					console.info('KOCFIA notepad off function');
					KOCFIA.notepad.$div.remove();
					$('#kocfia-notepad-toggle').remove();
					$('#kocfia-notepad-css').remove();
				},
				'resetPositionAndDimension': function(){
					console.info('KOCFIA notepad resetPositionAndDimension function');

					KOCFIA.notepad.$div.css({
						top: KOCFIA.notepad.options.position.top,
						left: KOCFIA.notepad.options.position.left,
						width: KOCFIA.notepad.options.size.width,
						height: KOCFIA.notepad.options.size.height,
					});

					KOCFIA.conf.notepad.position.top = KOCFIA.notepad.options.position.top;
					KOCFIA.conf.notepad.position.left = KOCFIA.notepad.options.position.left;
					KOCFIA.conf.notepad.size.width = KOCFIA.notepad.options.size.width;
					KOCFIA.conf.notepad.size.height = KOCFIA.notepad.options.size.height;

					KOCFIA.shared.storeConf();
				},
				'clean': function(){
					console.info('KOCFIA notepad clean function');

					localStorage.setObject('kocfia_notepad_notes_' + KOCFIA.storeUniqueId, '');

					KOCFIA.notepad.$notes.empty();
				},
				'load': function( id ){
					console.info('KOCFIA notepad load function');

					if( KOCFIA.notepad.notes[id] ){
						KOCFIA.notepad.$name.val( KOCFIA.notepad.notes[id].name );
						KOCFIA.notepad.$textarea.val( KOCFIA.notepad.notes[id].text );
					} else {
						alert('Note introuvable.');
					}
				},
				'delete': function( id ){
					console.info('kocfia notepad delete function');
					delete KOCFIA.notepad.notes[id];
					KOCFIA.notepad.storeNotes();
				},
				'storeNotes': function(){
					console.info('KOCFIA notepad storeNotes function');
					localStorage.setObject('kocfia_notepad_notes_' + KOCFIA.storeUniqueId, KOCFIA.notepad.notes);
				},
			};

		/* MAP */
			KOCFIA.map = {
				'options': {
					'active': 1,
				},
				'stored': ['search'],
				'search': {},/*{by city, tiles}*/
				'currentSearch': {},
				'loadTypeLabels': { 'C': 'cités', 'CB': 'Camps Barbares', 'TS': 'Terres Sauvages', 'FS': 'Forêts Sombres' },
				'confPanel': function( $section ){
					console.info('KOCFIA map confPanel function');
					var code = '<h3>Carte</h3>';
					code += '<div>';
					code += KOCFIA.shared.generateButton('map', 'cleanSearch', 'Supprimer toutes les recherches géographiques');

					var i, cityKey, city;
					for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
						cityKey = KOCFIA.citiesKey[i];
						city = KOCFIA.cities[cityKey];
						code += KOCFIA.shared.generateButton('map', 'cleanSearchForCity', 'Supprimer les recherches géographiques de ' + city.roman + ' ' +city.name, cityKey).replace(/<\/p>/, '');
					}
					code += '</p></div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOCFIA map modPanel function');
					var $section = KOCFIA.$confPanel.find('#kocfia-map').html('');

					var code = '<fieldset class="search"><legend>Recherche</legend>';
					code += '<label for="kocfia-map-near-x">Autour de&nbsp;:&nbsp;</label>';
					code += '<input type="text" id="kocfia-map-near-x" class="coord" />';
					code += '<input type="text" id="kocfia-map-near-y" class="coord" />';
					code += '<select id="kocfia-map-city-coord"><option value="">Villes</option>';

					var loadOptions = '', c, cityKey, city, length = KOCFIA.citiesKey.length;
					for( c = 0; c < length; c += 1 ){
						cityKey = KOCFIA.citiesKey[c];
						city = KOCFIA.cities[cityKey];
						code += '<option value="'+ city.coords.x + '|' + city.coords.y +'">'+ city.roman + ' ' + city.name +'</option>';

						if( KOCFIA.map.search.hasOwnProperty( cityKey ) ){
							if( !$.isEmptyObject( KOCFIA.map.search[ cityKey ] ) ){
								loadOptions += '<option value="'+ cityKey +'">'+ city.roman + ' ' + city.name +'</option>';
							}
						}
					}

					code += '</select>';
					code += '<br /><label for="kocfia-map-range-min">Distance entre&nbsp;:&nbsp;</label>';
					code += '<input type="text" id="kocfia-map-range-min" class="coord" value="1" />';
					code += '<label for="kocfia-map-range-max">&nbsp;et&nbsp;</label>';
					code += '<input type="text" id="kocfia-map-range-max" class="coord" value="20" />';
					code += '<button class="go">Rechercher</button>';
					code += '<button class="cancel">Annuler</button>';
					code += '<br /><label for="kocfia-map-load-saved">Ou charger une recherche sauvegardée&nbsp;:&nbsp;</label>';
					code += '<select id="kocfia-map-load-saved"><option value="">Choisir</option>'+ loadOptions +'</select>';
					code += '</fieldset><fieldset class="save"><legend>Sauvegarde</legend>';
					code += '<label for="kocfia-map-city-save">Sauvegarder la recherche dans la cité&nbsp;:&nbsp;</label>';
					code += '<select id="kocfia-map-city-save"><option value="">Choisir</option>';

					for( c = 0; c < length; c += 1 ){
						cityKey = KOCFIA.citiesKey[c];
						city = KOCFIA.cities[cityKey];
						code += '<option value="'+ cityKey +'">'+ city.roman + ' ' + city.name +'</option>';
					}

					code += '</select><button>Sauvegarder</button></fieldset>';
					code += '<fieldset class="filter"><legend>Filter les résultats</legend>';
					code += '<div class="category"><label for="kocfia-map-category">Catégorie&nbsp;:&nbsp;</label>';
					code += '<select id="kocfia-map-category">';
					code += '<option value="">Choisir</option>';
					code += '<option value="C">Cités</option>';
					code += '<option value="CB">Camps Barbares</option>';
					code += '<option value="TS">Terres Sauvages</option>';
					code += '<option value="FS">Forêts Sombres</option>';
					code += '</select></div>';
					code += '<div class="level"><label for="kocfia-map-level-min">Niveau entre&nbsp;:&nbsp;</label>';
					code += '<input type="text" id="kocfia-map-level-min" class="coord" />';
					code += '<label for="kocfia-map-level-max">&nbsp;et&nbsp;:&nbsp;</label>';
					code += '<input type="text" id="kocfia-map-level-max" class="coord" />';
					code += '</div><div class="type"><label>Type&nbsp;:&nbsp;</label>';
					code += '<input type="checkbox" id="kocfia-map-type-grassland" value="10" />';
					code += '<label for="kocfia-map-type-grassland">Prairie</label>';
					code += '<input type="checkbox" id="kocfia-map-type-lake" value="11" />';
					code += '<label for="kocfia-map-type-lake">Lac</label>';
					code += '<input type="checkbox" id="kocfia-map-type-forest" value="20" />';
					code += '<label for="kocfia-map-type-forest">Forêt</label>';
					code += '<input type="checkbox" id="kocfia-map-type-hill" value="30" />';
					code += '<label for="kocfia-map-type-hill">Colline</label>';
					code += '<input type="checkbox" id="kocfia-map-type-mountain" value="40" />';
					code += '<label for="kocfia-map-type-mountain">Montagne</label>';
					code += '<input type="checkbox" id="kocfia-map-type-plain" value="50" />';
					code += '<label for="kocfia-map-type-plain">Plaine</label>';
					code += '</div><div class="status">';
					code += '<label for="kocfia-map-status">Libre</label>';
					code += '<input type="checkbox" id="kocfia-map-status" />';
					code += '</div><div class="mist">';
					code += '<label for="kocfia-map-mist">Sous brumes</label>';
					code += '<input type="checkbox" id="kocfia-map-mist" />';
					code += '</div></fieldset><div class="search-status"></div><div class="search-result"></div>';

					$section
						.append( code )
						.on('change', '#kocfia-map-city-coord', function(){
							var v = $(this).val();
							if( v != '' ){
								var cityCoord = v.split('|');
								$('#kocfia-map-near-x').val( cityCoord[0] );
								$('#kocfia-map-near-y').val( cityCoord[1] );
							}
						})
						.on('click', '.search .go', function(event){
							event.stopPropagation();
							KOCFIA.map.$save.hide();
							KOCFIA.map.$filter.hide();
							KOCFIA.map.$results.empty();
							$(this).attr('disabled', 'disabled').html('Chargement');

							var coordX = $.trim( $('#kocfia-map-near-x').val() ),
								coordY = $.trim( $('#kocfia-map-near-y').val() ),
								rangeMin = $.trim( $('#kocfia-map-range-min').val() ),
								rangeMax = $.trim( $('#kocfia-map-range-max').val() ),
								errors = [];

							if( coordX == '' || coordY == '' ){
								errors.push('Veuillez spécifier une coordonnée.');
							} else {
								coordX = parseInt(coordX, 10);
								coordY = parseInt(coordY, 10);
								if( coordX != Number.NaN && coordY != Number.NaN ){
									if( coordX < 0 || coordX > 749 || coordY < 0 || coordY > 749 ){
										errors.push('Coordonnée invalide.');
									}
								} else {
									errors.push('Veuillez spécifier une coordonnée.');
								}
							}

							if( rangeMin == '' && rangeMax == '' ){
								errors.push('Veuillez spécifier une distance.');
							} else {
								rangeMin = parseInt(rangeMin, 10);
								rangeMax = parseInt(rangeMax, 10);
								if( rangeMin != Number.NaN && rangeMax != Number.NaN ){
									if( rangeMin < 1 || rangeMax < 1 || rangeMin > rangeMax ){
										errors.push('Distance invalide. Minimum 1 de distance et distance minimum inférieure ou égale à la distance max.');
									}
								} else {
									errors.push('Veuillez spécifier une distance.');
								}
							}

							if( errors.length ){
								alert( errors.join("\n") );
								$(this).removeAttr('disabled').html('Rechercher');
							} else {
								KOCFIA.map.explore( coordX, coordY, rangeMin, rangeMax );
							}
						})
						.on('click', '.search .cancel', function(event){
							event.stopPropagation();
							if( KOCFIA.map.xhr ) KOCFIA.map.xhr.abort(); //kill the ajax request
							KOCFIA.map.searching = false;
							KOCFIA.map.$search.find('input, select').val('');
							KOCFIA.map.$search.find('.go').removeAttr('disabled').html('Rechercher');
							//KOCFIA.map.$save.hide();
							//KOCFIA.map.$filter.hide();
							//KOCFIA.map.$results.empty();
							KOCFIA.map.$status.empty();
						})
						.on('click', '.save button', function(event){
							event.stopPropagation();
							var cityKey = $('#kocfia-map-city-save').val();
							if( cityKey && cityKey != '' ){
								if( !KOCFIA.map.search.hasOwnProperty( cityKey ) ) KOCFIA.map.search[cityKey] = {};
								KOCFIA.map.search[cityKey] = KOCFIA.map.currentSearch;
								KOCFIA.map.storeSearch();

								var loadOptions = '<option value="">Choisir</option>';
								for( var key in KOCFIA.map.search ){
									if( KOCFIA.map.search.hasOwnProperty(key) ){
										var city = KOCFIA.cities[key];
										loadOptions += '<option value="'+ key +'">'+ city.roman + ' ' + city.name +'</option>';
									}
								}
								$('#kocfia-map-load-saved').html( loadOptions );
							} else {
								alert('Vous devez spécifier une ville pour sauvegarder cette recherche.');
							}
						})
						.on('change', '#kocfia-map-load-saved', function(event){
							event.stopPropagation();
							var cityKey = $(this).val();
							if( cityKey != '' ){
								KOCFIA.map.$save.hide();
								KOCFIA.map.$filter.show();
								KOCFIA.map.$status.empty();
								KOCFIA.map.$category.val('').trigger('change');
								KOCFIA.map.currentSearch = KOCFIA.map.search[ cityKey ];
							}
						})
						.on('change', '#kocfia-map-category', function(event){
							event.stopPropagation();
							var $inputs = KOCFIA.map.$filter.find('input');

							$inputs.filter('[type=checkbox]').prop('checked', false);
							$inputs.filter('[type=text]').val('');

							var category = $(this).val();
							KOCFIA.map.$filter.find('.level, .type, .status, .mist').hide();
							if( category != '' ){
								if( category != 'C' ) KOCFIA.map.$filter.find('.level').show();

								if( category == 'TS' ){
									KOCFIA.map.$filter.find('.type, .status').show();
								} else if( category == 'C' ){
									KOCFIA.map.$filter.find('.mist').show();
								}

								KOCFIA.map.displayResultsByCategory();
							} else {
								KOCFIA.map.$results.empty();
							}
						})
						.on('change', '.filter input[type=checkbox]', function(event){
							event.stopPropagation();
							KOCFIA.map.filterResults();
						})
						.on('keyup', '.filter input[type=text]', function(event){
							event.stopPropagation();
							KOCFIA.map.filterResults();
						});

					KOCFIA.map.$search = $('#kocfia-map').find('.search');
					KOCFIA.map.$save = $('#kocfia-map').find('.save');
					KOCFIA.map.$filter = $('#kocfia-map').find('.filter');
					KOCFIA.map.$category = $('#kocfia-map-category');
					KOCFIA.map.$results = $('#kocfia-map').find('.search-result');
					KOCFIA.map.$status = $('#kocfia-map').find('.search-status');
				},
				'on': function(){
					console.info('KOCFIA map on function');

					if( $.isEmptyObject( KOCFIA.map.search ) ){
						try{
							var search = localStorage.getObject('kocfia_map_search_' + KOCFIA.storeUniqueId);
							if( search ){
								KOCFIA.map.search = search;
							}
						} catch(e){
							console.error(e);
						}
					}
				},
				'cleanSearch': function(){
					console.info('KOCFIA map cleanSearch function');
					localStorage.removeItem('kocfia_map_search_' + KOCFIA.storeUniqueId);

					$('#kocfia-map-load-saved').find('option').filter(':gt(0)').remove();
				},
				'cleanSearchForCity': function( cityKey ){
					console.info('KOCFIA map cleanSearchForCity function');
					KOCFIA.map.search[cityKey] = {};
					localStorage.setObject('kocfia_map_search_' + KOCFIA.storeUniqueId, KOCFIA.map.search);

					$('#kocfia-map-load-saved').find('option').filter('[value='+ cityKey +']').remove();
				},
				'storeSearch': function(){
					console.info('KOCFIA map storeSearch function');
					localStorage.setObject('kocfia_map_search_' + KOCFIA.storeUniqueId, KOCFIA.map.search);
				},
				'explore': function( coordX, coordY, rangeMin, rangeMax ){
					if( KOCFIA.map.searching ) return;
					console.info('KOCFIA map explore function');

					/* deferred functions */
						//display the partialExplore results, while merging them with previous results
						var parseResults = function( dfd, coordX, coordY, rangeMin, rangeMax, result ){
							console.info('KOCFIA map explore deferred parseResults function');
							var leftRangeMax = coordX - rangeMax,
								leftRangeMin = coordX - rangeMin,
								rightRangeMax = coordX + rangeMax,
								rightRangeMin = coordX + rangeMin,
								topRangeMax = coordY - rangeMax,
								topRangeMin = coordY - rangeMin,
								bottomRangeMax = coordY + rangeMax,
								bottomRangeMin = coordY + rangeMin;

							var tiles = { city: [], barbarian: [], darkForest: [], wilderness: [] };
							//merge results with previous deferred partialExplore results

							if( KOCFIA.map.currentSearch.hasOwnProperty('tiles')
								&& KOCFIA.map.currentSearch.tiles.wilderness.length
							){
								tiles = KOCFIA.map.currentSearch.tiles;
							}

							var id, tile, range, user, name, label, might;
							for( id in result.data ){
								if( result.data.hasOwnProperty(id) ){
									tile = result.data[id];
									range = KOCFIA.shared.getDistance(coordX, coordY, tile.xCoord, tile.yCoord);
									if( range >= rangeMin && range <= rangeMax ){
										//city
											if( tile.tileType == 51 ){
												if( tile.tileCityId != null ){
													user = result.userInfo['u'+ tile.tileUserId];
													name = (user.s == 'M' ? 'Lord' : 'Lady') + ' ' + user.n;
													tiles.city.push({ 'category': 'C', 'range': range, 'x': tile.xCoord, 'y': tile.yCoord, 'might': KOCFIA.shared.format(user.m), 'player': name, 'city': tile.cityName, 'misted': 0 });
												} else {
										//barbarian
													tiles.barbarian.push({ 'category': 'CB', 'range': range, 'x': tile.xCoord, 'y': tile.yCoord, 'level': tile.tileLevel });
												}
											} else if( tile.tileType == 53 ){
												tiles.city.push({ 'category': 'C', 'range': range, 'x': tile.xCoord, 'y': tile.yCoord, 'might': '?', 'player': '?', 'city': '?', 'misted': 1 });
										//dark forest
											} else if( tile.tileType == 54 ){
												tiles.darkForest.push({ 'category': 'FS', 'range': range, 'x': tile.xCoord, 'y': tile.yCoord, 'level': tile.tileLevel });
										//wilderness (swamp tileType = 0)
											} else if( tile.tileType >= 10 && tile.tileType <= 50 ){
												label = '';

												if( tile.tileType == 10 ) label = 'Prairie';
												else if( tile.tileType == 11 ) label = 'Lac';
												else if( tile.tileType == 20 ) label = 'Forêt';
												else if( tile.tileType == 30 ) label = 'Colline';
												else if( tile.tileType == 40 ) label = 'Montagne';
												else if( tile.tileType == 50 ) label = 'Plaine';

												user = null;
												might = '';
												name = '';

												if( tile.tileUserId != null ){
													if( tile.tileUserId == "0" ){
														might = '?';
														name = '?';
													} else {
														user = (tile.tileUserId != null ? result.userInfo['u'+ tile.tileUserId] : null);
														name = (user != null ? (user.s == 'M' ? 'Lord' : 'Lady') + ' ' + user.n : '?');
														might = (user != null ? KOCFIA.shared.format(user.m) : '?');
													}
												}

												tiles.wilderness.push({ 'category': 'TS', 'range': range, 'type': tile.tileType, 'label': label, 'x': tile.xCoord, 'y': tile.yCoord, 'might': might, 'player': name, 'level': tile.tileLevel });
											}
									}
								}
							}

							tiles.city = uniqueObject( tiles.city );
							tiles.barbarian = uniqueObject( tiles.barbarian );
							tiles.darkForest = uniqueObject( tiles.darkForest );
							tiles.wilderness = uniqueObject( tiles.wilderness );

							tiles.city.sort(function(a, b){ return a.range - b.range });
							tiles.barbarian.sort(function(a, b){ return a.range - b.range });
							tiles.darkForest.sort(function(a, b){ return a.range - b.range });
							tiles.wilderness.sort(function(a, b){ return a.range - b.range });

							KOCFIA.map.currentSearch = {'x': coordX, 'y': coordY, 'rangeMin': rangeMin, 'rangeMax': rangeMax, 'tiles': tiles};

							if( KOCFIA.map.$category.val() != '' ) KOCFIA.map.displayResultsByCategory();

							if( !loop ) return dfd.resolve();
							else {
								start += 100;
								end += 100;
								return dfd.pipe( partialExplore(dfd, 3) );
							}
						};

						//split the full coordinates search in small requests of 100 coordinates
						var partialExplore = function(dfd, attempts){
							console.info('KOCFIA map explore deferred partialExplore function', start, end, length);

							loop = true;
							if( end > length ){
								end = length;
								loop = false;
							}

							KOCFIA.map.$status.html('Recherche des coordonnées ' + start + ' à ' + end + ' sur ' + length + '.');

							if( start == end ) end += 1; //avoid the start = end case with the slice which need a difference
							params.blocks = blocks.slice(start, end).join(',');
							KOCFIA.map.xhr = $.ajax({
									url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
									type: 'post',
									data: params,
									dataType: 'json'
								})
								.done(function(result){
									if( result.ok && result.data ){
										if( start == 0 ){
											var chosenCityIndex = $('#kocfia-map-city-coord')[0].selectedIndex;
											if( chosenCityIndex ){
												$('#kocfia-map-city-save').prop('selectedIndex', chosenCityIndex);
											}
											KOCFIA.map.$filter.show();
											KOCFIA.map.$category.val('').trigger('change');
										}

										return dfd.pipe( parseResults( dfd, coordX, coordY, rangeMin, rangeMax, result ) );
									} else {
										attempts -= 1;
										if( attempts > 0 ){
											return dfd.pipe( partialExplore(dfd, attempts) );
										} else {
											return dfd.reject();
										}
									}
								})
								.fail(function(){
									attempts -= 1;
									if( attempts > 0 ){
										return dfd.pipe( partialExplore(dfd, attempts) );
									} else {
										return dfd.reject();
									}
								});
						};

						var searchSequence = function(){
							console.info('KOCFIA map explore deferred searchSequence function');
							return $.Deferred(function(dfd){
								return dfd.pipe( partialExplore(dfd, 3) );
							}).promise();
						};

					KOCFIA.map.searching = true;

					KOCFIA.map.currentSearch = {};

					KOCFIA.map.$status.empty();

					var params = window.g_ajaxparams,
						blocks = [];

					//calculate the radius of the circle based on the distance max
					var radiusMax = Math.ceil(rangeMax / 2 * Math.PI);
					var radiusMin = Math.floor(rangeMin / 2 * Math.PI);

					var leftCoordMin = Math.floor(coordX - radiusMin);
					var rightCoordMin = Math.floor(coordX + radiusMin);
					var topCoordMin = Math.floor(coordY - radiusMin);
					var bottomCoordMin = Math.floor(coordY + radiusMin);

					var i, j, maxX = coordX + radiusMax, maxY = coordY + radiusMax;
					for( i = coordX - radiusMax; i <= maxX; i += 1 ){
						for( j = coordY - radiusMax; j <= maxY; j += 1 ){
							if( (i <= leftCoordMin || i >= rightCoordMin) && (j <= topCoordMin || j >= bottomCoordMin) ){
								var range = KOCFIA.shared.getDistance(coordX, coordY, i, j);
								if( range >= rangeMin && range <= rangeMax ){
									blocks.push("bl_" + ( i >= 750 ? i - 750 : i ) + "_bt_" + ( j >= 750 ? j - 750 : j ));
								}
							}
						}
					}
					var loop, start = 0, end = 99, length = blocks.length;
					$.when( searchSequence() )
						.done(function(){
							KOCFIA.map.$status.html('Recherche finie.');
						})
						.fail(function(){
							KOCFIA.map.$status.html('Recherche échouée avant la fin.');
						})
						.always(function(){
							KOCFIA.map.$save.show();
							KOCFIA.map.$search.find('.go').removeAttr('disabled').html('Rechercher');
							KOCFIA.map.searching = false;
						});
				},
				'displayResultsByCategory': function(){
					console.info('KOCFIA map displayResultsByCategory function');
					var tiles = KOCFIA.map.currentSearch.tiles,
						category = KOCFIA.map.$category.val(),
						code = '<table><thead><tr>',
						coords = [],
						i, tile, lenght;
					switch( category ){
						case 'C' : //cities
							length = tiles.city.length;
							code += '<th>Distance</th>';
							code += '<th>Coordonnée</th>';
							code += '<th>Nom</th>';
							code += '<th>Joueur</th>';
							code += '<th>Puissance</th>';
							code += '<th>Sous brumes</th>';
							code += '</tr></thead><tbody class="'+ category +'">';
							for( i = 0; i < length; i += 1 ){
								tile = tiles.city[i];
								if( tile.category == category ){
									coords.push( tile.x + ',' + tile.y );
									code += '<tr class="'+ ( tile.misted ? 'misted' : '' ) +'" data-coord="'+ tile.x + ',' + tile.y +'">';
									code += '<td>'+ tile.range +'</td>';
									code += '<td>'+ KOCFIA.shared.mapLink(tile.x + ',' + tile.y) +'</td>';
									code += '<td>'+ tile.city +'</td>';
									code += '<td>'+ tile.player +'</td>';
									code += '<td>'+ tile.might +'</td>';
									code += '<td>'+ (tile.misted ? 'Oui' : 'Non') +'</td>';
									code += '</tr>';
								}
							}
							break;
						case 'CB' : //barbarian
							length = tiles.barbarian.length;
							code += '<th>Distance</th>';
							code += '<th>Coordonnée</th>';
							code += '<th>Niveau</th>';
							code += '</tr></thead><tbody class="'+ category +'">';
							for( i = 0; i < length; i += 1 ){
								tile = tiles.barbarian[i];
								if( tile.category == category ){
									coords.push( tile.x + ',' + tile.y );
									code += '<tr class="level'+ tile.level +'" data-coord="'+ tile.x + ',' + tile.y +'">';
									code += '<td>'+ tile.range +'</td>';
									code += '<td>'+ KOCFIA.shared.mapLink(tile.x + ',' + tile.y) +'</td>';
									code += '<td>'+ tile.level +'</td>';
									code += '</tr>';
								}
							}
							break;
						case 'FS' : //dark forests
							length = tiles.darkForest.length;
							code += '<th>Distance</th>';
							code += '<th>Coordonnée</th>';
							code += '<th>Niveau</th>';
							code += '</tr></thead><tbody class="'+ category +'">';
							for( i = 0; i < length; i += 1 ){
								tile = tiles.darkForest[i];
								if( tile.category == category ){
									coords.push( tile.x + ',' + tile.y );
									code += '<tr class="level'+ tile.level +'" data-coord="'+ tile.x + ',' + tile.y +'">';
									code += '<td>'+ tile.range +'</td>';
									code += '<td>'+ KOCFIA.shared.mapLink(tile.x + ',' + tile.y) +'</td>';
									code += '<td>'+ tile.level +'</td>';
									code += '</tr>';
								}
							}
							break;
						case 'TS' : //wilderness
							length = tiles.wilderness.length;
							code += '<th>Distance</th>';
							code += '<th>Coordonnée</th>';
							code += '<th>Type</th>';
							code += '<th>Niveau</th>';
							code += '<th>Joueur</th>';
							code += '<th>Puissance</th>';
							code += '</tr></thead><tbody class="'+ category +'">';
							for( i = 0; i < length; i += 1 ){
								tile = tiles.wilderness[i];
								if( tile.category == category ){
									coords.push( tile.x + ',' + tile.y );
									code += '<tr class="level'+ tile.level +' type'+ tile.type +' '+ ( tile.player == '' ? 'free' : '' ) +'" data-coord="'+ tile.x + ',' + tile.y +'">';
									code += '<td>'+ tile.range +'</td>';
									code += '<td>'+ KOCFIA.shared.mapLink(tile.x + ',' + tile.y) +'</td>';
									code += '<td>'+ tile.label +'</td>';
									code += '<td>'+ tile.level +'</td>';
									code += '<td>'+ tile.player +'</td>';
									code += '<td>'+ tile.might +'</td>';
									code += '</tr>';
								}
							}
							break;
					}
					code += '</tbody></table>';

					var coordsList = '<textarea id="coordsList">'+ coords.join("\n") +'</textarea>';

					KOCFIA.map.$results.html( coordsList + code );
					KOCFIA.map.filterResults();
				},
				'filterResults': function(){
					console.info('KOCFIA map filterResults function');
					var category = KOCFIA.map.$category.val(),
						$tbody = KOCFIA.map.$results.find('tbody'),
						$trs = $tbody.find('tr'),
						min = parseInt( $.trim( $('#kocfia-map-level-min').val() ), 10 ),
						max = parseInt( $.trim( $('#kocfia-map-level-max').val() ), 10 ),
						classes = [],
						levels = [],
						types = [],
						status = [];

					if( min || max ){
						if( !min ) min = 1;
						if( !max ) max = 10;
						var i;
						for( i = min; i <= max; i += 1 ){
							levels.push( '.level' + i );
						}
						if( levels.length ) classes.push( levels );
					}

					if( category == 'TS' ){
						var $types = KOCFIA.map.$filter.find('.type').find('input').filter(':checked');
						if( $types.length ){
							$types.each(function(){
								types.push( '.type' + this.value );
							});
							if( types.length ) classes.push( types );
						}
						if( KOCFIA.map.$filter.find('.status').find('input').filter(':checked').length ){
							status.push('.free');
							classes.push( status );
						}
					}

					if( category == 'C' ){
						if( KOCFIA.map.$filter.find('.status').find('input').filter(':checked').length ){
							status.push('.misted');
							classes.push( status );
						}
					}

					//cartesian product
					if( classes.length ){
						classes = classes.reduce(function(previousValue, currentValue, index, array){
							var tmp = [], i, j, pLength = previousValue.length, cLength;
							for( i = 0; i < pLength; i += 1 ){
								cLength = currentValue.length;
								for( j = 0; j < cLength; j += 1 ){
									tmp.push(previousValue[i].concat(currentValue[j]));
								}
							}
							return tmp;
						});
					}

					//inject style
					$head.find('#kocfia-map-search-result-filter').remove();
					if( classes.length ){
						var rule = '#kocfia-map .search-result tbody tr { display: none; }';
						rule += '#kocfia-map .search-result table ' + classes.join(', #kocfia-map .search-result tbody ') + '{ display: table-row; }';

						$head.append( $('<style id="kocfia-map-search-result-filter">').html( rule ) );
					}

					var list = [];
					$trs.filter(':visible').each2(function(i, $tr){
						var coord = $tr.data('coord');
						if( coord ) list.push(coord);
					});

					$('#coordsList').html( list.join("\n") );
				},
			};

		/* FORMATION */
			KOCFIA.formation = {
				'options': {
					'active': 1,
					'automatic': 0,
				},
				'stored': ['rules'],
				'rules': {}, //by city id
				'confPanel': function( $section ){
					console.info('KOCFIA formation confPanel function');
					var code = '<h3>Formation</h3>';
					code += '<div>';
					code += KOCFIA.shared.generateCheckbox('formation', 'active', 'Activer le module', KOCFIA.conf.formation.active);
					code += KOCFIA.shared.generateCheckbox('formation', 'automatic', 'Lancer les formations automatiques', KOCFIA.conf.formation.automatic);
					code += KOCFIA.shared.generateButton('formation', 'deleteAllRules', 'Supprimer toutes les règles de formation enregistrées');
					code += '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOCFIA formation modPanel function');
					var $section = KOCFIA.$confPanel.find('#kocfia-formation').html('');

					var form = '<h3>Formulaires<span class="ui-icon ui-icon-info"></span></h3><div class="forms">';
					form += '<h3>Formations automatiques</h3>';
					form += '<div class="automatic-train-form">';
					form += '<ul class="message"></ul>';
					form += '<button class="save">Enregistrer</button>';

					var i, j, u, d, f, res,
						cLength = KOCFIA.citiesKey.length,
						cityKey, city,
						rule, units, defenses, availableUnits;
					//by city
					for( i = 0; i < cLength; i += 1 ){
						form += KOCFIA.formation.getFieldset( KOCFIA.citiesKey[i], true );
					}

					form += '<button class="save">Enregistrer</button>';
					form += '</div>';

					//manual formation form
						form += '<h3>Formations manuelles</h3>';
						form += '<div class="manual-train-form">';
						form += '<ul class="message"></ul>';
						form += '<fieldset>';

						form += '<select id="kocfia-formation-city"><option value="">Villes</option>';
						for( i = 0; i < cLength; i += 1 ){
							cityKey = KOCFIA.citiesKey[i];
							city = KOCFIA.cities[cityKey];
							form += '<option value="'+ cityKey +'">'+ city.roman + ' ' + city.name +'</option>';
						}
						form += '</select>';
						form += '<div class="dynamic"></div>';
						form += '<button class="launch">Former</button>'
						form += '<button class="reset">Annuler</button>'
						form += '</fieldset>';
						form += '</div>';

					form += '</div>';

					//formations list
					var onGoing = '<h3>Formations en cours</h3><div class="formation-list ongoing">';
					onGoing += '<table><thead><tr><th class="unit">Formations</th><th class="fort">Fortifications</th><th class="info">Infos</th></tr></thead>';
					for( i = 0; i < cLength; i += 1 ){
						cityKey = KOCFIA.citiesKey[i];
						city = KOCFIA.cities[cityKey];

						onGoing += '<tbody data-city="'+ cityKey +'"><tr class="toggle"><th colspan="3">';
						onGoing += '<span class="ui-icon ui-icon-triangle-1-se"></span>';
						onGoing += city.roman + ' ' + city.name +'</th></tr></tbody>';
					}
					onGoing += '</table></div>';

					var help = '<div id="kocfia-formation-help" class="help" title="Aide formation"><ul>';
					/*help += '<li>Les terres sauvages occupées ne seront pas attaquées (vérification pour chaque coordonnée à chaque attaque)</li>';
					help += '<li>Une attaque sera annulée au bout de 10 erreurs consécutives <br />(coordonnée occupée, aucun chevalier, point de ralliement plein, pas assez de troupes, ...)</li>';
					help += '<li>Les attaques sauvegardées peuvent être lancées manuellement ou via le mode automatique</li>';
					help += '<li>Pour le formulaire les erreurs seront listées au-dessus</li>';
					help += '<li>Pour les attaques sauvegardées les erreurs seront listées en-dessous</li>';
					help += '<li>Si une vague est en erreur les vagues précédentes seront rappelées (sous réserves des limitations de temps de marche restant)</li>';
					help += '<li>Lors du démarrage du mode automatique, 20 secondes s\'écoulent entre chaque lancement de plan d\'attaque sauvegardé</li>';
					help += '<li>Dix secondes s\'écoulent entre chaque lancement de vague</li>';*/
					help += '</ul></div>';

					$section.append( form + onGoing + help )
						.on('change', '#formation-panel-automatic', function(){
							$('#formation-automatic').prop('checked', $(this).prop('checked')).change();
						})
						//save auto formation
						.on('click', '.save', function(){
							var result = KOCFIA.formation.planAutomaticRules();
							if( result.errors.length ){
								KOCFIA.formation.$autoForm.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
							} else {
								KOCFIA.formation.$autoForm.find('.message').empty();

								KOCFIA.formation.rules = result.rules;
								KOCFIA.formation.storeRules();
							}
						})
						//city change in manual formation
						.on('change', '#kocfia-formation-city', function(){
							var $this = $(this),
								$fieldset = $this.closest('fieldset'),
								$dynamic = $fieldset.find('.dynamic'),
								cityKey = $this.val();
							if( cityKey == '' ){
								//saving the form values
								$fieldset.data('values', $dynamic.find(':input').serializeArray());
								$dynamic.html('');
							} else {
								$dynamic.html( KOCFIA.formation.getFieldset(cityKey, false) );
								var data = $fieldset.data('values'),
									$inputs = $dynamic.find(':input'),
									field;
								if( data ){
									for( var i = 0; i < data.length; i += 1 ){
										field = data[i];
										$inputs.filter('[name='+ field.name +']').val( field.value );
									}
									$inputs.find('.train-max, .train-quantity').trigger('change');
								}
							}
						})
						//save manual formation
						.on('click', '.launch', function(){
							var result = KOCFIA.formation.planManualRule();
							if( result.errors.length ){
								KOCFIA.formation.$manualForm.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
							} else {
								KOCFIA.formation.$manualForm.find('.message').empty();

								KOCFIA.formation.launchFormation( result.rule );
							}
						})
						//reset manual form
						.on('click', '.reset', KOCFIA.formation.resetForm)
						//unit train max change affect duration
						.on('keyup change', '.train-max', function(){
							var $fieldset = $(this).closest('fieldset');

							var unit = $fieldset.find('.train-unit').val(),
								max = $fieldset.find('.train-max').val(),
								speed = $fieldset.find('.train-speed').val(),
								$output = $fieldset.find('.unit-duration');

							if( unit == '' || max == '' ){
								$output.html('');
								return;
							}

							var cityKey = $fieldset.find('.train-city').val();

							var time = KOCFIA.formation.unitTrainDuration( cityKey, unit, max, speed );

							//if speed != 0 readableDuration returns a range of two times
							if( $.isArray(time) ){
								$output.html( KOCFIA.shared.readableDuration(time[0]) + ' - ' + KOCFIA.shared.readableDuration(time[1]) );
							} else $output.html( KOCFIA.shared.readableDuration(time) );
						})
						//fortification quantit' change affect duration
						.on('keyup change', '.train-quantity', function(){
							var $fieldset = $(this).closest('fieldset');

							var def = $fieldset.find('.train-defense').val(),
								qty = $fieldset.find('.train-quantity').val(),
								$output = $fieldset.find('.def-duration');

							if( def == '' || qty == '' ){
								$output.html('');
								return;
							}

							var cityKey = $fieldset.find('.train-city').val();

							var time = KOCFIA.formation.defenseTrainDuration( cityKey, def, qty );

							$output.html( KOCFIA.shared.readableDuration(time) );
						})
						//calc max trainable units
						.on('click', '.train-unit-max', function(){
							var $fieldset = $(this).closest('fieldset');

							var unit = $fieldset.find('.train-unit').val(),
								$max = $fieldset.find('.train-max');

							if( unit == '' ){
								$max.val('').attr('title', '').trigger('change');
								return;
							}

							var speed = $fieldset.find('.train-speed').val(),
								cityKey = $fieldset.find('.train-city').val();

							var nb = KOCFIA.formation.calcMaxUnit( cityKey, unit, speed );

							$max.val( KOCFIA.shared.format(nb) || 0 ).attr('title', nb || 0).trigger('change');
						})
						//calc max fortifications
						.on('click', '.train-defense-max', function(){
							var $fieldset = $(this).closest('fieldset');

							var def = $fieldset.find('.train-defense').val(),
								$qty = $fieldset.find('.train-quantity');

							if( def == '' ){
								$qty.val('').attr('title', '');
								return;
							}

							var cityKey = $fieldset.find('.train-city').val();

							var nb = KOCFIA.formation.calcMaxDefense( cityKey, def );

							$qty.val( KOCFIA.shared.format(nb) || 0 ).attr('title', nb);
						})
						//speed change, affect max unit
						.on('change', '.train-speed', function(){
							var $fieldset = $(this).closest('fieldset');

							var unit = $fieldset.find('.train-unit').val(),
								$max = $fieldset.find('.train-max');
							if( unit == '' ){
								$max.val('').attr('title', '');
								return;
							} else {
								//will call the duration update
								$max.trigger('change');
							}
						})
						//training and fortification cancel
						.on('click', '.ongoing .unit .ui-icon-trash', function(){
							var $this = $(this),
								cityKey = $this.closest('tbody').data('city');
							if( $this.hasClass('recursive') ){
								var cancelSequence = function(){
									return $.Deferred(function(dfd){
										KOCFIA.formation.cancelTraining(dfd, cityKey, i, null, 3);
									}).promise();
								};

								var i = window.seed.queue_unt[cityKey].length;

								$('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation des formations en masse en cours.');

								$.when( cancelSequence() )
									.done(function(){
										$('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation des formations en masse finies.');
									})
									.fail(function(){
										$('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation des formations en masse échouée.');
									})
									.always(function(){
										KOCFIA.formation.listCityFormations( cityKey );
									});
							} else {
								$('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation d\'une formation en cours.');
								KOCFIA.formation.cancelTraining( null, null, null, $this.attr('rel'), 3 );
							}
						})
						.on('click', '.ongoing .fort .ui-icon-trash', function(){
							var $this = $(this),
								cityKey = $this.closest('tbody').data('city');
							if( $this.hasClass('recursive') ){
								var cancelSequence = function(){
									return $.Deferred(function(dfd){
										KOCFIA.formation.cancelFortification(dfd, cityKey, i, null, 3);
									}).promise();
								};

								var i = window.seed.queue_frt[cityKey].length;

								$.when( cancelSequence() )
									.done(function(){
										$('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation des fortifications en masse finie.');
									})
									.fail(function(){
										$('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation des fortifications en masse échouée.');
									})
									.always(function(){
										KOCFIA.formation.listCityFormations( cityKey );
									});
							} else {
								$('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation d\'une fortification en cours.');
								KOCFIA.formation.cancelFortification( null, null, null, $this.attr('rel'), 3 );
							}
						})
						//toggle
						.on('click', '.toggle', function(){
							var $this = $(this),
								$triangle = $this.find('.ui-icon'),
								$trs = $this.parent().find('tr').filter(':gt(0)');
								opened = !$triangle.hasClass('ui-icon-triangle-1-se');

							if( opened ) $triangle.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-se');
							else $triangle.removeClass('ui-icon-triangle-1-se').addClass('ui-icon-triangle-1-e');

							$trs.toggle( opened );
						})
						//help dialog
						.find('.help').dialog({ autoOpen: false, zIndex: 100002 });

					KOCFIA.formation.$autoForm = $section.find('.automatic-train-form');
					KOCFIA.formation.$manualForm = $section.find('.manual-train-form');
					KOCFIA.formation.$ongoing = $section.find('.formation-list.ongoing');

					$section.find('.forms').accordion({collapsible: true, autoHeight: false}).accordion('activate', false);
				},
				'on': function(){
					console.info('KOCFIA formation on function');
					try{
						var persistentFormationRules = localStorage.getObject('kocfia_formation_attacks_' + KOCFIA.storeUniqueId);
						if( persistentFormationRules ){
							KOCFIA.formation.rules = persistentFormationRules;
						}
					} catch(e){
						console.error(e);
					}

					KOCFIA.formation.getTrainingGamble( 3 );

					var i, length = KOCFIA.citiesKey.length;
					for( i = 0; i < length; i += 1 ){
						KOCFIA.formation.listCityFormations( KOCFIA.citiesKey[i] );
					}

					if( KOCFIA.conf.formation.automatic ){
						KOCFIA.formation.automaticOn();
					}
				},
				'off': function(){
					console.info('KOCFIA formation off function');

					KOCFIA.formation.automaticOff();
				},
				'automaticOn': function(){
					console.info('KOCFIA formation automaticOn function');
					$('#formation-panel-automatic').prop('checked', true);

					KOCFIA.formation.launchAutomaticFormations();
				},
				'automaticOff': function(){
					console.info('KOCFIA formation automaticOff function');
					$('#formation-panel-automatic').prop('checked', false);
				},
				'getFieldset': function( cityKey, withWrapper ){
					console.info('KOCFIA formation getFieldset function');
					var city = KOCFIA.cities[ cityKey ],
						rule = KOCFIA.formation.rules[ cityKey ],
						availableUnits = window.seed.units[ cityKey ],
						availableDefenses = window.seed.fortifications[ cityKey ],
						units = KOCFIA.formation.getTrainableUnits( cityKey ),
						defenses = KOCFIA.formation.getTrainableDefenses( cityKey ),
						rLength = KOCFIA.resources.length;

					var form = '';
					if( withWrapper ){
						form += '<fieldset>';
						form += '<legend>';
						form += '<input type="checkbox" class="train-city" id="kocfia-formation-auto-'+ cityKey +'" name="city" ';
						form += ( rule && rule.active ? 'checked' : '' ) +' value="'+ cityKey +'" autocomplete="off" />';
						form += city.roman +' '+ city.name +'</legend>';
					}

					form += '<p>';

					//choose unit (check building requirements and tech requirements)
						form += '<label for="kocfia-formation-auto-'+ cityKey +'-unit">Unités&nbsp;:&nbsp;</label>';
						form += '<select id="kocfia-formation-auto-'+ cityKey +'-unit" class="train-unit" name="unit" autocomplete="off">';
						form += '<option value=""></option>';

						for( u in units ){
							if( units.hasOwnProperty(u) ){
								var name = window.unitcost[u][0];
								if( name == 'Unité de Ravitaillement' ) name = 'Ravitailleur';
								else if( name == 'Wagon de Ravitaillement' ) name = 'Wagon';

								form += '<option value="'+ u +'" '+ ( rule && rule.troop == u ? 'checked' : '' ) +'>'+ name + ' ('+ (availableUnits.hasOwnProperty(u) ? KOCFIA.shared.format(availableUnits[u]) : '0' ) +')</option>';
							}
						}
						form += '</select>';

					//choose pack size min and max
						form += '<label for="kocfia-formation-auto-'+ cityKey +'-min">Min&nbsp;:&nbsp;</label>';
						form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-min" name="min" class="train-min" ';
						form += 'autocomplete="off" value="'+ ( rule && rule.min >= 0 ? KOCFIA.shared.format(rule.min) : '' ) +'" />';
						form += '<label for="kocfia-formation-auto-'+ cityKey +'-max">Max&nbsp;:&nbsp;</label>';
						form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-max" name="max" class="train-max" ';
						form += 'autocomplete="off" '+ ( rule && rule.max >= 0 ? KOCFIA.shared.format(rule.max) : '' ) +'" />';
						form += '<button class="train-unit-max">max</button>';

					//choose speed
						form += '<br /><label for="kocfia-formation-auto-'+ cityKey +'-speed">Vitesse&nbsp;:&nbsp;</label>';
						form += '<select id="kocfia-formation-auto-'+ cityKey +'-speed" name="speed" class="train-speed" autocomplete="off">';
						form += '<option value="0">Normal</option>';
						form += '<option value="1"'+ ( rule && rule.speed == 1 ? 'checked' : '' ) +'>5-15% (coût x2)</option>';
						form += '<option value="2"'+ ( rule && rule.speed == 2 ? 'checked' : '' ) +'>10-25% (coût x4)</option>';
						form += '</select>';

					//choose boost
					// /!\ boost incompatible avec speed
					/*
						form += '<label for="kocfia-formation-auto-'+ cityKey +'-item">Objet ?</label>';
						form += '<select id="kocfia-formation-auto-'+ cityKey +'-item" name="item" autocomplete="off">';
						form += '<option value="">Non</option>';
						form += '<option value="36">"+ window.itemlist.i36.name + '(' + (window.seed.items.i36 ? window.seed.items.i36 : 0) + ')</option>';
						form += '<option value="37">"+ window.itemlist.i37.name + '(' + (window.seed.items.i37 ? window.seed.items.i37 : 0) + ')</option>';
						form += '<option value="38">"+ window.itemlist.i38.name + '(' + (window.seed.items.i38 ? window.seed.items.i38 : 0) + ')</option>';
						form += '</select>';
					*/

					//choose workforce percentage
						form += '<label for="kocfia-formation-auto-'+ cityKey +'-workforce">Travailleurs&nbsp;:&nbsp;</label>';
						form += '<select id="kocfia-formation-auto-'+ cityKey +'-workforce" name="workforce" class="train-workforce" autocomplete="off">';
						form += '<option value="0">0%</option>';
						form += '<option value="0.25" '+ ( rule && rule.workforce == 0.25 ? 'checked' : '' ) +'>25%</option>';
						form += '<option value="0.50" '+ ( rule && rule.workforce == 0.50 ? 'checked' : '' ) +'>50%</option>';
						form += '<option value="0.75" '+ ( rule && rule.workforce == 0.75 ? 'checked' : '' ) +'>75%</option>';
						form += '<option value="1"'+ ( rule && rule.workforce == 1 ? 'checked' : '' ) +'>100%</option>';
						form += '</select>';

					//duration
						form += '<label>Durée&nbsp;:&nbsp;</label>';
						form += '<output class="unit-duration"></output>';
					form += '</p>';

					//defenses
						form += '<p>';
						form += '<label for="kocfia-formation-auto-'+ cityKey +'-defense">Défenses&nbsp;:&nbsp;</label>';
						form += '<select id="kocfia-formation-auto-'+ cityKey +'-defense" name="defense" class="train-defense" autocomplete="off">';
						form += '<option value=""></option>';
						for( d in defenses ){
							if( defenses.hasOwnProperty(d) ){
								f = d.replace(/frt/, 'fort');
								form += '<option value="'+ d +'" '+ ( rule && rule.defense == d ? 'checked' : '' ) +'>';
								form += window.fortcost[d][0] + ' ('+ (availableDefenses.hasOwnProperty(f) ? KOCFIA.shared.format(availableDefenses[f]) : '0' ) +')</option>';
							}
						}
						form += '</select>';
						form += '<label for="kocfia-formation-auto-'+ cityKey +'-qty">Quantité&nbsp;:&nbsp;</label>';
						form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-quantity" name="quantity" class="train-quantity" autocomplete="off" value=" '+ ( rule && rule.quantity >= 0  ? rule.quantity : '' ) +'">';
						form += '<button class="train-defense-max">max</button>';
						form += '<label>Durée&nbsp;:&nbsp;</label>';
						form += '<output class="def-duration"></output>';
						form += '</p>';

					//keep resources ? (in easy format, with validation)
						form += '<p class="train-keep">';
						form += '<label>Garder&nbsp;:&nbsp;</label>';
						for( j = 0; j < rLength; j += 1 ){
							res = KOCFIA.resources[j];
							if( res.name != 'resource7' ){
								form += '<label for="kocfia-formation-auto-'+ cityKey +'-keep-'+ res.name +'">';
								form += '<img src="'+ res.icon +'" title="'+ res.label +'">';
								form += '</label>';
								form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-keep-'+ res.name +'" ';
								form += 'name="'+ res.key +'" autocomplete="off" ';
								form += 'value="'+ ( rule && rule.keep[ res.key ] >= 0 ? KOCFIA.shared.format(rule.keep[ res.key ]) : '' ) +'">';
							}
						}
					form += '</p>';
					if( withWrapper ) form += '</fieldset>';

					return form;
				},
				'storeRules': function(){
					console.info('KOCFIA formation storeRules function');
					try{
						localStorage.setObject('kocfia_formation_rules_' + KOCFIA.storeUniqueId, KOCFIA.formation.rules);
					} catch(e){
						alert(e);
					}
				},
				'getTrainingGamble': function( attempts ){
					console.info('KOCFIA formation getTrainingGamble function');
					var params = $.extend({}, window.g_ajaxparams);

					$.ajax({
						url: window.g_ajaxpath + "ajax/getTroopGambles.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json'
					})
					.done(function(result){
						var min1 = result["1"].min,
							max1 = result["1"].max,
							cost1 = result["1"].cost,
							min2 = result["2"].min,
							max2 = result["2"].max,
							cost2 = result["2"].cost;

						window.gambleOptionResults1 = [min1, max1, cost1];
						window.gambleOptionResults2 = [min2, max2, cost2];
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							KOCFIA.formation.getTrainingGamble( attempts );
						}
					});
				},
				'planAutomaticRules': function(){
					console.info('KOCFIA formation planAutomaticRules function');
					var rules = {},
						errors = [],
						$fieldsets = KOCFIA.formation.$autoForm.find('fieldset'),
						rule, nbErr, hasTroop, hasDef, cityLabel, $city, troop, defense, min, max, quantity, $res, rkeep;

					$fieldsets.each2(function(i, $fieldset){
						rule = {};
						nbErr = 0;
						hasTroop = false;
						hasDef = false;
						$city = $fieldset.find('.train-city');
						cityLabel = $.trim( $fieldset.find('legend').text() );
						//city
						rule.cityKey = $city.val();
						rule.active = $city.prop('checked') ? 1 : 0;

						//check troop
						troop = $fieldset.find('.train-unit').val();
						if( troop != '' ){
							hasTroop = true;
							rule.troop = troop;

							//check min and max
							min = KOCFIA.shared.decodeFormat( $.trim( $fieldset.find('.train-min').val() ) );
							max = KOCFIA.shared.decodeFormat( $.trim( $fieldset.find('.train-max').val() ) );

							if( min != false && max != false && min >= 1 && max >= min ){
								rule.min = min;
								rule.max = max;
							} else {
								errors.push('Quantités de troupes invalide pour '+ cityLabel +'.');
								nbErr += 1;
							}

							//speed
							rule.speed = $fieldset.find('.train-speed').val();

							//workforce
							rule.workforce = parseFloat( $fieldset.find('.train-workforce').val() );
						}

						//check defense
						defense = $fieldset.find('.train-defense').val();
						if( defense != '' ){
							hasDef = false;
							rule.defense = defense;

							//check quantity
							quantity = KOCFIA.shared.decodeFormat( $.trim( $fieldset.find('.train-quantity').val() ) );
							if( qty != false && qty >= 1 ){
								rule.qty = qty;
							}
						}

						//check keep
						rule.keep = {};
						if( hasTroop || hasDef ){
							$fieldset.find('.train-keep').find('input').each2(function(j, $res){
								res = $.trim( $res.val() );
								if( res != '' ){
									res = KOCFIA.shared.decodeFormat( res );
									if( res == false ){
										nbErr += 1;
										errors.push('Au moins une des quantité de ressources à conserver est invalide pour '+ cityLabel +'.');
									} else {
										rule.keep[ $res.attr('name') ] = res;
									}
								}
							});
						}

						if( !hasTroop && !hasDef ){
							errors.push('Règle vide ou invalide pour '+ cityLabel +', non prise en compte.');
						} else if( nbErr == 0 ){
							rules[ rule.cityKey ] = rule;
						}
					});

					return {'rules': rules, 'errors': errors};
				},
				'planRule': function(){
					console.info('KOCFIA formation planRule function');
					var rule = {},
						errors = {},
						$fieldset = KOCFIA.formation.$manualForm.find('fieldset'),
						nbErr, hasTroop, hasDef, cityLabel, $city, troop, defense, min, max, quantity, $res, rkeep;

					nbErr = 0;
					hasTroop = false;
					hasDef = false;
					$city = $fieldset.find('.train-city');
					cityLabel = $.trim( $fieldset.find('legend').html() );

					//city
					rule.cityKey = $city.val();
					rule.active = 1;

					//check troop
					troop = $fieldset.find('.train-unit').val();
					if( troop != '' ){
						hasTroop = true;
						rule.troop = troop;

						//check min and max
						min = KOCFIA.shared.decodeFormat( $.trim( $fieldset.find('.train-min').val() ) );
						max = KOCFIA.shared.decodeFormat( $.trim( $fieldset.find('.train-max').val() ) );

						if( min != false && max != false && min >= 1 && max >= min ){
							rule.min = min;
							rule.max = max;
						} else {
							errors.push('Quantités de troupes invalide pour '+ cityLabel +'.');
							nbErr += 1;
						}

						//speed
						rule.speed = $fieldset.find('.train-speed').val();

						//workforce
						rule.workforce = parseFloat( $fieldset.find('.train-workforce').val() );
					}

					//check defense
					defense = $fieldset.find('.train-defense').val();
					if( defense != '' ){
						hasDef = false;
						rule.defense = defense;

						//check quantity
						quantity = KOCFIA.shared.decodeFormat( $.trim( $fieldset.find('.train-quantity').val() ) );
						if( qty != false && qty > 1 ){
							rule.qty = qty;
						}
					}

					//check keep
					rule.keep = {};
					$fieldset.find('.train-keep').find('input').each2(function(i, $res){
						res = KOCFIA.shared.decodeFormat( $.trim( $res ) );
						if( res != false && res > 1 ){
							rule.keep[ $res.attr('name') ] = res;
						} else {
							nbErr += 1;
							errors.push('Au moins une des quantité de ressources à conserver est invalide pour '+ cityLabel +'.');
						}
					});

					if( !hasTroop && !hasDef ){
						errors.push('Règle invalide pour '+ cityLabel +', non prise en compte.');
					} else if( nbErr == 0 ){
						rules[ rule.cityKey ] = rule;
					}

					return {'rule': rule, 'errors': errors};
				},
				'launchAutomaticFormations': function(){
					console.info('KOCFIA formation launchAutomaticFormations function');
					if( !KOCFIA.conf.formation.active || !KOCFIA.conf.formation.automatic ){
						return;
					}

					var delayedTrain = function(i, rule){
						window.setTimeout(function(){
							KOCFIA.formation.addToQueue( rule, null );
						}, i * 12000);
					};

					var cityKey, rule, i = 1;
					for( cityKey in KOCFIA.formation.rules ){
						if( KOCFIA.formation.rules.hasOwnProperty(cityKey) ){
							rule = KOCFIA.formation.rules[ cityKey ];
							if( rule.active ){
								delayedTrain( i, rule );
							}
						}
					}

					//self call every 2 minutes
					window.setTimeout(function(){
						KOCFIA.formation.launchAutomaticFormations();
					}, 120000);
				},
				'launchFormations': function( rule ){
					console.info('KOCFIA formation launchFormations function');
					if( !KOCFIA.conf.formation.active || KOCFIA.conf.formation.automatic ){
						return;
					}

					var delayedTrain = function(i, rule){
						window.setTimeout(function(){
							KOCFIA.formation.fillQueue( rule );
						}, i * 12000);
					};

					var cityKey, rule, i = 1;
					for( cityKey in KOCFIA.formation.rules ){
						if( KOCFIA.formation.rules.hasOwnProperty(cityKey) ){
							delayedTrain( i, KOCFIA.formation.rules[cityKey] );
						}
					}
				},
				'resetForm': function(){
					console.info('KOCFIA formation resetForm function');
					var $inputs = KOCFIA.formation.$manualForm.find('input');
					inputs.filter('[type=checkbox]').prop('checked', false);
					inputs.filter('[type=text]').val('');

					KOCFIA.formation.$manualForm.find('select').val('');

					KOCFIA.formation.$manualForm.find('.message').empty();
				},
				'listCityFormations': function( cityKey ){
					console.info('KOCFIA formation listCityFormations function', cityKey);
					var $tbody = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city='+ cityKey +']'),
						$tr = $tbody.find('tr').filter(':gt(0)'),
						updateOnly = false;
					if( $tr.length ) updateOnly = true;

					var code = '', formations = '', fortifications = '',
						i, formation, unit,
						queue = window.seed.queue_unt[cityKey];
					//array of [tid, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]

					//troops
					formations += 'Supprimer à partir de la seconde <span class="ui-icon ui-icon-trash recursive"></span>'
					formations += '<ol class="formations">';
					for( i = 0; i < queue.length; i += 1 ){
						formation = queue[i];
						for( j = 0; j < KOCFIA.troops.length; j += 1 ){
							if( KOCFIA.troops[j].name == 'unt' + formation[0] ){
								unit = KOCFIA.troops[j];
								break;
							}
						}

						formations += '<li><span class="ui-icon ui-icon-trash" rel="'+ i +','+ cityKey +','+ formation[0] +','+ formation[1] +','+ formation[3] +','+ formation[2] +','+ formation[5] +'" title="Annuler cette formation"></span>&nbsp;';
						formations += '<img src="'+ unit.icon +'" alt="'+ unit.label[0] +'" title="'+ unit.label[0] +'" />&nbsp;';
						formations += '<span class="unit">'+ KOCFIA.shared.format( formation[1] ) +'</span>';
						formations += '<span class="time">'+ KOCFIA.shared.readableDuration( formation[3] - formation[2] ) +'</span></li>';
					}
					formations += '</ol>';

					//defenses
					fortifications += 'Supprimer à partir de la seconde <span class="ui-icon ui-icon-trash recursive"></span>'
					fortifications += '<ol class="defenses">';
					queue = window.seed.queue_fort[cityKey];
					for( i = 0; i < queue.length; i += 1 ){
						formation = queue[i];
						for( j = 0; j < KOCFIA.defenses.length; j += 1 ){
							if( KOCFIA.defenses[j].name == 'fort' + formation[0] ){
								unit = KOCFIA.defenses[j];
								break;
							}
						}

						fortifications += '<li><span class="ui-icon ui-icon-trash" rel="'+ i +','+ cityKey +','+ unit[0] +','+ unit[1] +','+ unit[3] +','+ unit[2] +','+ unit[5] +','+ unit[6] +'" title="Annuler cette fortification"></span>&nbsp;';
						fortifications += '<img src="'+ unit.icon +'" alt="'+ unit.label +'" title="'+ unit.label +'" />&nbsp;';
						fortifications += '<span class="unit">'+ KOCFIA.shared.format( formation[1] ) +'</span>';
						fortifications += KOCFIA.shared.readableDuration( formation[3] - formation[2] ) +'</li>';
					}
					fortifications += '</ol>';

					if( updateOnly ){
						$tr.find('.unit').html( formations );
						$tr.find('.fort').html( fortifications );

					} else $tbody.append( '<tr><td class="unit">' + formations + '</td><td class="fort">' + fortifications + '</td><td class="info"><div id="kocfia-formation-'+ cityKey +'-info"></div></td></tr>' );
				},
				'getTrainableUnits': function( cityKey ){
					console.info('KOCFIA formation getTrainableUnits function', cityKey);

					var units = {}, u, unitc, building, tech, b, t;

					for( u in window.unitcost ){
						if( window.unitcost.hasOwnProperty(u) ){
							unitc = window.unitcost[u];
							//check building requirement
								b = true;
								if( typeof unitc[8] == 'object' && !$.isArray(unitc[8]) && !$.isEmptyObject(unitc[8]) ){
									b = false;
									for( building in unitc[8] ){
										if( unitc[8].hasOwnProperty( building ) ){
											if( KOCFIA.shared.buildingHighestLevel( cityKey, building.substr(1) ) >= unitc[8][building][1] ){
												b = true;
											}
										}
									}
								}

							//check tech requirement
								t = true;
								if( typeof unitc[9] == 'object' && !$.isArray(unitc[9]) && !$.isEmptyObject(unitc[9]) ){
									t = false;
									for( tech in unitc[9] ){
										if( unitc[9].hasOwnProperty( tech ) ){
											if( window.seed.tech[ 'tch' + tech.substr(1) ] >= unitc[9][tech][1] ){
												t = true;
											}
										}
									}
								}

							if( b && t ) units[ u ] = unitc.name;
						}
					}
					return units;
				},
				'getTrainableDefenses': function( cityKey ){
					console.info('KOCFIA formation getTrainableDefenses function', cityKey);

					var forts = {}, f, fortc, building, tech, b, t;

					for( f in window.fortcost ){
						if( window.fortcost.hasOwnProperty(f) ){
							fortc = window.fortcost[f];
							//check building requirement
								b = true;
								if( typeof fortc[8] == 'object' ){
									b = false;
									for( building in fortc[8] ){
										if( fortc[8].hasOwnProperty( building ) ){
											if( KOCFIA.shared.buildingHighestLevel( cityKey, building.substr(1) ) >= fortc[8][building][1] ){
												b = true;
											}
										}
									}
								}
							//check tech requirement
								t = true;
								if( typeof fortc[9] == 'object' ){
									t = false;
									for( tech in fortc[9] ){
										if( fortc[9].hasOwnProperty( tech ) ){
											if( window.seed.tech[ 'tch' + tech.substr(1) ] >= fortc[9][tech][1] ){
												t = true;
											}
										}
									}
								}

							if( b && t ) forts[ f ] = fortc.name;
						}
					}
					return forts;
				},
				'calcMaxUnit': function( cityKey, unit, speed ){
					console.info('KOCFIA formation calcMaxUnit function');

					var mod, i, nb, cost = [], res = [],
						unitcost = window.unitcost[unit],
						resources = window.seed.resources[cityKey],
						cityStat = window.seed.citystats[cityKey];

					if( speed == 0 ){
						mod = 1;
					} else if( speed == 1 ){
						mod = ~~ (1 * window.gambleOptionResults1[2]);
					} else if( speed == 2 ){
						mod = ~~ (1 * window.gambleOptionResults2[2]);
					}

					for( i = 1; i < 5; i += 1 ){
						cost.push( parseInt(unitcost[i], 10) * 3600 * mod );
						res.push( parseInt(resources["rec" + i][0], 10) );
					}

					cost.push( parseInt(unitcost[5], 10) * mod );
					res.push( parseInt(cityStat.gold[0], 10) );

					cost.push( parseInt(unitcost[6], 10) );
					res.push( parseInt(cityStat.pop[0], 10) - parseInt(cityStat.pop[3], 10) );

					nb = res[0] / cost[0];
					for( i = 1; i < cost.length; i += 1 ){
						if( cost[i] != 0 ){
							nb = Math.min(nb, res[i] / cost[i]);
						}
					}

					return nb;
				},
				'calcMaxDefense': function( cityKey, def ){
					console.info('KOCFIA formation calcMaxDefense function');
					var mod, i, d, nb, check, slot, cost = [], res = [],
						fortcost = window.fortcost[def],
						resources = window.seed.resources[cityKey],
						buildings = window.seed.buildings[cityKey];

					for( i = 1; i < 5; i += 1 ){
						cost.push( parseInt(fortcost[i], 10) * 3600 );
						res.push( parseInt(resources["rec" + i][0], 10) );
					}

					nb = res[0] / cost[0];
					for( i = 1; i < cost.length; i += 1 ){
						nb = Math.min(nb, res[i] / cost[i]);
					}

					nb = parseInt(nb, 10);

					mod = 0;
					wallLevel = parseInt(buildings.pos1[1], 10);
					for( i = 1; i < (wallLevel + 1); i += 1 ){
						mod += (i * 1000);
					}

					mod = mod / 2;

					slot = KOCFIA.formation.getWallSlots(cityKey, true);
					check = 0;
					def = def.replace(/frt/, '');
					if( def < 60 ){
						check = parseInt((mod - slot[0]) / parseInt(window.fortstats["unt" + def][5], 10), 10);
					} else {
						check = parseInt((mod - slot[1]) / parseInt(window.fortstats["unt" + def][5], 10), 10);
					}

					if( check < nb ){
						nb = check;
					}

					return nb;
				},
				'unitTrainDuration': function( cityKey, unit, qty, speed ){
					console.info('KOCFIA formation unitTrainDuration function');
					if( unit.indexOf('unt') == -1 ){
						unit = 'unt' + unit;
					}

					qty = KOCFIA.shared.decodeFormat( qty );

					var time = parseInt(window.unitcost[unit][7], 10) * qty,
						buildings = window.seed.buildings[cityKey],
						b, building,
						barracksMod = 0,
						workshopMod = 0,
						stableMod = 0,
						level, modifier, techBoost,
						knightCombat, knightBoost, knights, knight, k,
						date = new Date(),
						timestamp = date.getTime() / 1000;

					for( b in buildings ){
						if( buildings.hasOwnProperty(b) ){
							building = buildings[b];
							level = parseInt(building[1], 10);
							if( building[0] == 13 && level > 0 ){
								barracksMod += parseInt(building[1], 10) + 9;

							} else if( building[0] == 16 && level > workshopMod ){
								if( unit >= 9 ){
									workshopMod = level;
								}

							} else if( building[0] == 17 && level > stableMod ){
								if( unit >= 7 ){
									stableMod = level;
								}
							}
						}
					}

					modifier = barracksMod / 10;
					techBoost = 0;
					knightCombat = 0;

					knights = window.seed.knights[cityKey];
					time = Math.max(1, Math.ceil(time / modifier));

					modifier = 1;
					l = workshopMod + stableMod;
					if( knights ){
						knight = knights["knt" + window.seed.leaders[cityKey].combatKnightId];
						if( knight ){
							knightCombat = parseInt(knight.combat, 10);
							knightBoost = ( parseInt(knight.combatBoostExpireUnixtime, 10) - timestamp > 0 ? knightCombat * 1.25 : knightCombat );
							modifier += 0.005 * knightBoost;
						}
					}

					if( window.seed.tech ){
						techBoost += window.seed.tech.tch5;
					}
					modifier += (0.1 * techBoost);

					time = Math.max(1, Math.ceil(time / modifier))

					if( speed == 0 ){
						return time;
					} else if( speed == 1 ){
						var range = [
							Math.ceil((100 - window.gambleOptionResults1[1]) / 100 * time),
							Math.ceil((100 - window.gambleOptionResults1[0]) / 100 * time)
						];
						return range;
					} else if( speed == 2 ){
						var range = [
							Math.ceil((100 - window.gambleOptionResults2[1]) / 100 * time),
							Math.ceil((100 - window.gambleOptionResults2[0]) / 100 * time)
						];
						return range;
					}
				},
				'defenseTrainDuration': function( cityKey, fort, qty ){
					console.info('KOCFIA formation defenseTrainDuration function');

					var time = parseInt(window.fortcost['frt' + fort][7], 10) * qty,
						modifier = 1 + 0.1 * parseInt(window.seed.tech.tch16, 10),
						a = 0,
						knights = seed.knights[cityKey],
						knight, knightCombat, knightBoost,
						date = new Date(),
						timestamp = date.getTime() / 1000;
					if( knights ){
						knight = knights["knt" + window.seed.leaders[cityKey].politicsKnightId];
						if( knight ){
							knightCombat = parseInt(knight.combat, 10);
							knightBoost = ( parseInt(knight.politicsBoostExpireUnixtime, 10) - timestamp > 0 ? knightCombat * 1.25 : knightCombat );
							modifier += 0.005 * knightBoost;
						}
					}

					return Math.max(1, Math.ceil(time / modifier));
				},
				'getWallSlots': function(cityKey, withQueue ){
					console.info('KOCFIA formation getWallSlots function');
					var fortifications = window.seed.fortifications[cityKey],
						result = [0, 0],
						f, def, fortification;
					for( f in fortifications ){
						if( fortifications.hasOwnProperty(f) ){
							fortification = fortifications[f];
							def = f.replace(/fort/, '');

							if( def < 60 ){
								result[0] += parseInt(window.fortstats["unt" + def][5], 10) * parseInt(fortification, 10);
							} else {
								result[1] += parseInt(window.fortstats["unt" + def][5], 10) * parseInt(fortification, 10);
							}
						}
					}

					if( withQueue ){
						var queue = window.seed.queue_fort[cityKey];
						for( var i = 0; i < queue.length; i += 1 ){
							def = parseInt(queue[i][0], 10);
							if( def < 60 ){
								result[0] += parseInt(window.fortstats["unt" + def][5], 10) * parseInt(queue[i][1], 10);
							} else {
								result[1] += parseInt(window.fortstats["unt" + def][5], 10) * parseInt(queue[i][1], 10);
							}
						}
					}

					return result;
				},
				'cancelTraining': function( dfd, cityKey, i, info, attempts ){
					console.info('KOCFIA formation cancelTraining function');
					var i, j, totalReturn,
						params = $.extend({}, window.g_ajaxparams);

					if( dfd ){
						if( i == 0 || i > window.seed.queue_unt.length ) return dfd.resolve();

						info = window.seed.queue_unt[cityKey][i];
					} else {
						info = info.split(',');
					}

					params.requestType = "CANCEL_TRAINING";
					params.cityId      = info[1];
					params.typetrn     = info[2];
					params.numtrptrn   = info[3];
					params.trnETA      = info[4];
					params.trnTmp      = info[5];
					params.trnNeeded   = info[6];

					$.ajax({
							url: window.g_ajaxpath + 'ajax/cancelTraining.php' + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json'
						})
						.done(function( result ){
							if( result.ok ){
								window.update_seed_ajax(true, function(){
									j = 0;
									for( var i = 0; i < window.seed.queue_unt[cityKey].length; i++ ){
										if( i > info[0] ){
											window.seed.queue_unt[cityKey][i][2] = parseInt(result.dateTraining[j]["start"], 10);
											window.seed.queue_unt[cityKey][i][3] = parseInt(result.dateTraining[j]["end"], 10);
											j += 1;
										}
									}
									//remove canceled training
									window.seed.queue_unt[cityKey].splice(info[0], 1);

									for( i = 1; i < 5; i += 1 ){
										totalReturn = parseInt(window.unitcost["unt" + info[1]][i], 10) * parseInt(info[2], 10) * 3600 / 2;
										window.seed.resources[cityKey]["rec" + i][0] = parseInt(window.seed.resources[cityKey]["rec" + i][0], 10) + totalReturn;
									}

									if( dfd != null ) KOCFIA.formation.listCityFormations( info[1] );
								});

								if( dfd != null ){
									return dfd.pipe( KOCFIA.formation.cancelTraining(dfd, cityKey, i-1, null, 3) );
								}
							} else {
								attempts -= 1;
								if( attempts > 0 ){
									if( dfd ) return dfd.pipe( KOCFIA.formation.cancelTraining(dfd, cityKey, i+1, null, attempts) );
									else KOCFIA.formation.cancelTraining( null, null, null, info, attempts );
								} else {
									if( dfd ) return dfd.reject();
									else $('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation de formation échouée (erreur serveur).');
								}
							}
						}).fail(function(){
							//network or server error
							attempts -= 1;
							if( attempts > 0 ){
								if( dfd ) return dfd.pipe( KOCFIA.formation.cancelTraining(dfd, cityKey, i-1, null, attempts) );
								else KOCFIA.formation.cancelTraining( null, null, null, info, attempts );
							} else {
								if( dfd ) return dfd.reject();
								else $('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation de formation échouée (erreur internet).');
							}
						});
				},
				'cancelFortification': function( dfd, cityKey, i, info, attempts ){
					console.info('KOCFIA formation cancelFortification function');
					var i, j, totalReturn,
						params = $.extend({}, window.g_ajaxparams);

					if( dfd ){
						if( i == 0 || i > window.seed.queue_frt.length ) return dfd.resolve();

						info = window.seed.queue_frt[cityKey][i];
					} else {
						info = info.split(',');
					}

					params.requestType = "CANCEL_FORTIFICATIONS";
					params.cityId      = info[1];
					params.typefrt     = info[2];
					params.numtrpfrt   = info[3];
					params.frtETA      = info[4];
					params.frtTmp      = info[5];
					params.frtNeeded   = info[6];
					params.frtid       = info[0];

					$.ajax({
							url: window.g_ajaxpath + 'ajax/cancelFortifications.php' + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json'
						})
						.done(function( result ){
							if( result.ok ){
								window.update_seed_ajax(true, function(){
									j = 0;
									for( var i = 0; i < window.seed.queue_unt[cityKey].length; i++ ){
										if( i > info[0] ){
											window.seed.queue_fort[cityKey][i][2] = parseInt(result.dateFortifications[j]["start"], 10);
											window.seed.queue_fort[cityKey][i][3] = parseInt(result.dateFortifications[j]["end"], 10);
											j += 1;
										}
									}
									//remove canceled fortification
									window.seed.queue_fort[cityKey].splice(info[0], 1);

									for( i = 1; i < 5; i += 1 ){
										totalReturn = parseInt(window.fortcost["frt" + info[1]][i], 10) * parseInt(info[2], 10) * 3600 / 2;
										window.seed.resources[cityKey]["rec" + i][0] = parseInt(window.seed.resources[cityKey]["rec" + i][0], 10) + totalReturn;
									}
									if( dfd != null ) KOCFIA.formation.listCityFormations( info[1] );
								});

								if( dfd != null ){
									return dfd.pipe( KOCFIA.formation.cancelFortification(dfd, cityKey, i-1, null, 3) );
								}
							} else {
								attempts -= 1;
								if( attempts > 0 ){
									if( dfd ) return dfd.pipe( KOCFIA.formation.cancelFortification(dfd, cityKey, i-1, null, attempts) );
									else KOCFIA.formation.cancelFortification( null, null, null, info, attempts );
								} else {
									if( dfd ) return dfd.reject();
									else $('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation de fortification échouée (erreur serveur).');
								}
							}
						}).fail(function(){
							//network or server error
							attempts -= 1;
							if( attempts > 0 ){
								if( dfd ) return dfd.pipe( KOCFIA.formation.cancelFortification(dfd, cityKey, i-1, null, attempts) );
								else KOCFIA.formation.cancelFortification( null, null, null, info, attempts );
							} else {
								if( dfd ) return dfd.reject();
								else $('#kocfia-formation-'+ cityKey +'-info').append( '<br>Annulation de fortification échouée (erreur internet).');
							}
						});
				},
				'addToQueue': function( rule, dfd ){
					console.info('KOCFIA formation addToQueue function', rule);
					//automatic launch, will add one formation to the queue according to the rule parameters
					//called by fillQueue with a deferred object, pipe on self until queue is filled or adding is not possible

					//step 1 of 3 for trainUnitSequence
					var checkUnitRequirements = function( sdfd ){
						console.info('KOCFIA formation addToQueue deferred checkUnitRequirements function');
						var modifier = 1;
						if( rule.speed == 1 ) modifier = 2;
						else if( rule.speed == 2 ) modifier = 4;

						var costs = window.unitcost[rule.troop],
							res = window.seed.resources[cityKey],
							stats = window.seed.citystats[cityKey];

						if( typeof costs[8] == 'object' && !$.isArray(costs[8]) && !$.isEmptyObject(costs[8]) ){
							var k, level;
							for( k in costs[8] ){  // check building requirement
								if( costs[8].hasOwnProperty(k) ){
									level = KOCFIA.shared.buildingHighestLevel( cityKey, k.substr(1) );
									if( level < costs[8][k][1] ){
										msg.push('Cette unité ne peut être entraînée dans cette ville (niveau de bâtiment requis trop bas).');
										return sdfd.resolve();
									}
								}
							}
						}

						if( typeof costs[9] == 'object' && !$.isArray(costs[9]) && !$.isEmptyObject(costs[9]) ){
							var t;
							for( t in costs[9] ){  // check tech requirement
								if( costs[9].hasOwnProperty(t) ){
									if( parseInt(window.seed.tech['tch' + t.substr(1)], 10) < costs[9][t][1] ){
										msg.push('Cette unité ne peut être entraînée (niveau de recherche trop bas).');
										return sdfd.resolve();
									}
								}
							}
						}

						//resources
						var keep;
						for( r = 1; r < 5; r += 1 ){
							resNeeded.push( parseInt(costs[r], 10) * 3600 * modifier );

							//take into account the rule keep parameter
							keep = (rule.keep.hasOwnProperty( 'rec' + r ) ? rule.keep['rec' + r] : 0);
							resAvailable.push( parseInt(res["rec" + r][0], 10) - keep );
						}

						//gold
						resNeeded.push( parseInt(costs[5], 10) * modifier );
						keep = (rule.keep.hasOwnProperty( 'rec0' ) ? rule.keep['rec0'] : 0);
						resAvailable.push( parseInt(stats.gold[0], 10) - keep );

						//population
						resNeeded.push( parseInt(costs[6], 10) );

						var pop = parseInt(stats.pop[0], 10) - parseInt(stats.pop[3], 10);
						if( rule.workforce > 0 ){
							pop += parseInt( (parseInt(stats.pop[3], 10) * rule.workforce), 10);
						}
						resAvailable.push( pop );

						qty = resAvailable[0] / resNeeded[0];
						for( i = 1; i < resNeeded.length; i += 1 ){
							if( resNeeded[i] !=0 ){
								qty = Math.min(qty, resAvailable[i] / resNeeded[i]);
							}
						}

						if( qty < rule.min ){
							msg.push('Pas assez de population ou de ressources disponibles (unité).');
							return sdfd.resolve();
						}

						if( qty > rule.max ) qty = rule.max;

						return sdfd.pipe( checkBarracks(sdfd) );
					};

					//step 2 of 3 for trainUnitSequence
					var checkBarracks = function( sdfd ){
						console.info('KOCFIA formation addToQueue deferred checkBarracks function');
						var barracksCount = KOCFIA.shared.barracksCount( cityKey ),
							queue = window.seed.queue_unt[ cityKey ],
							slotsUsed = queue.length || 0;
						if( barracksCount - slotsUsed > 0 ){
							return sdfd.pipe( train(sdfd) );
						} else {
							msg.push('Pas de caserne disponible.');
							return sdfd.resolve();
						}
					};

					//step 3 of 3 for trainUnitSequence
					var train = function( sdfd ){
						console.info('KOCFIA formation addToQueue deferred train function');
						var wParams = $.extend({}, baseParams);
						wParams.type = rule.troop.replace(/unt/, '');
						wParams.quant = qty;
						wParams.items = '';
						wParams.gambleId = rule.speed;

						$.ajax({
								url: window.g_ajaxpath + "ajax/train.php" + window.g_ajaxsuffix,
								type: 'post',
								data: wParams,
								dataType: 'json'
							})
							.done(function( result ){
								if( result.ok ){
									var resourceFactors = [],
										resourceLost, r, unit;

									for( r = 1; r < 5; r += 1 ){
										resourceFactors.push( result.gamble ? result.gamble[i] : 1 );
										resourceLost = parseInt(window.unitcost[rule.troop][i], 10) * 3600 * qty * resourceFactors[i - 1];
										window.seed.resources[cityKey]["rec" + r][0] = parseInt(window.seed.resources[cityKey]["rec" + r][0], 10) - resourceLost;
									}
									window.seed.citystats[cityKey].gold[0] = parseInt(window.seed.citystats[cityKey].gold[0], 10) - parseInt(window.unitcost[rule.troop][5], 10) * qty;
									window.seed.citystats[cityKey].pop[0] = parseInt(window.seed.citystats[cityKey].pop[0], 10) - parseInt(window.unitcost[rule.troop][6], 10) * qty;

									window.seed.queue_unt[cityKey].push([rule.troop, qty, result.initTS, parseInt(result.initTS) + result.timeNeeded, 0, result.timeNeeded, null]);

									/*
									seed.items["i" + iid] = Number(seed.items["i" + iid]) - 1;
									ksoItems[iid].subtract();
									*/

									for( j = 0; j < KOCFIA.troops.length; j += 1 ){
										if( KOCFIA.troops[j].name == rule.troop ){
											unit = KOCFIA.troops[j];
											break;
										}
									}
									added.push('Lancement de '+ KOCFIA.shared.format( qty ) +' <img src="'+ unit.icon +'" alt="'+ unit.label[0] +'" title="'+ unit.label[0] +'" />.');

									return sdfd.resolve();
								} else {
									if( result.msg ){
										msg.push('Formation refusée ('+ result.msg +').');
										return sdfd.resolve();
									} else {
										trainAttempts -= 1;
										if( trainAttempts > 0 ){
											return sdfd.pipe( train(sdfd) );
										} else {
											msg.push('Formation refusée.');
											return sdfd.resolve();
										}
									}
								}
							})
							.fail(function(){
								//network or server error
								trainAttempts -= 1;
								if( trainAttempts > 0 ){
									return sdfd.pipe( train(sdfd) );
								} else {
									msg.push('Formation refusée (requête KO).');
									return sdfd.resolve();
								}
							});
					};

					//units training sequence
					var trainUnitSequence = function(){
						console.info('KOCFIA formation addToQueue deferred trainUnitSequence function');
						return $.Deferred(function( sdfd ){
							if( rule.troop ){ //units
								sdfd.pipe( checkUnitRequirements(sdfd) );
							} else sdfd.resolve();
						}).promise();
					};

					//step 1 of 3 for buildFortificationSequence
					var checkFortificationRequirements = function(sdfd){
						console.info('KOCFIA formation addToQueue deferred checkFortificationRequirements function');
						var costs = window.fortcost[rule.defense],
							res = window.seed.resources[cityKey];

						if( !$.emptyObject(costs[8]) ){
							var k, level;
							for( k in costs[8] ){  // check building requirement
								if( costs[8].hasOwnProperty(k) ){
									level = KOCFIA.shared.buildingHighestLevel( cityKey, k.substr(1) );
									if( level < costs[8][k][1] ){
										msg.push('Cette fortification ne peut être construite dans cette ville (niveau de bâtiment requis trop bas).');
										return sdfd.resolve();
									}
								}
							}
						}

						if( !$.emptyObject(costs[9]) ){
							var t;
							for( t in costs[9] ){  // check tech requirement
								if( costs[9].hasOwnProperty(t) ){
									if( parseInt(window.seed.tech['tch' + t.substr(1)], 10) < costs[9][t][1] ){
										msg.push('Cette fortification ne peut être construite (niveau de recherche trop bas).');
										return sdfd.resolve();
									}
								}
							}
						}

						//resources
						for( r = 1; r < 5; r += 1 ){
							resNeeded.push( parseInt(costs[r], 10) * 3600 );

							//take into account the rule keep parameter
							resAvailable.push( parseInt(res["rec" + r][0], 10) - rule.keep[r] );
						}

						resNeeded.push( parseInt(costs[5], 10) * modifier );
						resAvailable.push( parseInt(stats.gold[0], 10) );

						qty = resAvailable[0] / resNeeded[0];
						for( i = 1; i < resNeeded.length; i += 1 ){
							if( resNeeded[i] !=0 ){
								num = Math.min(num, resAvailable[i] / resNeeded[i]);
							}
						}

						if( qty < rule.min ){
							msg.push('Pas assez de ressources disponibles (fortifications).');
							return sdfd.resolve();
						}

						if( qty > rule.max ) qty = rule.max;

						return sdfd.pipe( checkWall(sdfd) );
					};

					//step 2 of 3 for buildFortificationSequence
					var checkWall = function(sdfd){
						console.info('KOCFIA formation addToQueue deferred checkWall function');
						var i, wallSlots = KOCFIA.formation.getWallSlots(cityKey, false),
							queue = window.seed.queue_fort[ cityKey ],
							slotsUsed = queue.length || 0;

						if( wallSlots - slotsUsed > 0 ){
							return sdfd.pipe( build(sdfd) );
						} else {
							msg.push('Rempart déjà occupé (queue pleine).');
							return sdfd.resolve();
						}
					};

					//step 3 of 3 for buildFortificationSequence
					var build = function(sdfd){
						console.info('KOCFIA formation addToQueue deferred build function');
						var wParams = $.extend({}, baseParams);
						wParams.type = rule.defense.replace(/frt/, '');
						wParams.quant = qty;
						wParams.items = '';

						$.ajax({
								url: window.g_ajaxpath + "ajax/fortify.php" + window.g_ajaxsuffix,
								type: 'post',
								data: wParams,
								dataType: 'json'
							})
							.done(function( result ){
								if( result.ok ){
									var r, unit, cityKey = rule.cityKey,
										fortcost = window.fortcost["frt" + rule.defense],
										time = KOCFIA.formation.defenseTrainDuration(cityKey, rule.defense, qty);

									/*
									if(iid == 26) {
										time = parseInt(time * 0.7)
										window.seed.items.i26 = parseInt(window.seed.items.i26) - 1;
										window.ksoItems[26].subtract()
									}
									*/
									for( r = 1; r < 5; r += 1 ){
										window.seed.resources[cityKey]["rec" + r][0] = parseInt(resources["rec" + r][0], 10) - parseInt(fortcost[i], 10) * 3600 * qty;
									}
									window.seed.citystats[cityKey].gold[0] = parseInt(window.seed.citystats[cityKey].gold[0], 10) - parseInt(fortcost[5], 10) * qty;
									window.seed.citystats[cityKey].pop[0] = parseInt(window.seed.citystats[cityKey].pop[0], 10) - parseInt(fortcost[6], 10) * qty;

									window.seed.queue_fort[cityKey].push([rule.defense, qty, result.initTS, parseInt(result.initTS) + time, 0, time, result.fortifyId]);

									for( j = 0; j < KOCFIA.defenses.length; j += 1 ){
										if( KOCFIA.defenses[j].name == rule.defense ){
											unit = KOCFIA.defenses[j];
											break;
										}
									}
									added.push('Lancement de '+ KOCFIA.shared.format( qty ) +' <img src="'+ unit.icon +'" alt="'+ unit.label[0] +'" title="'+ unit.label[0] +'" />.');

									return sdfd.resolve();
								} else {
									if( result.msg ){
										msg.push('Formation refusée ('+ result.msg +').');
										return sdfd.resolve();
									} else {
										trainAttempts -= 1;
										if( trainAttempts > 0 ){
											return sdfd.pipe( train(sdfd) );
										} else {
											msg.push('Formation refusée.');
											return sdfd.resolve();
										}
									}
								}
							})
							.fail(function(){
								//network or server error
								trainAttempts -= 1;
								if( trainAttempts > 0 ){
									return sdfd.pipe( train(sdfd) );
								} else {
									msg.push('Formation refusée (requête KO).');
									return sdfd.resolve();
								}
							});
					};

					//fortifications building sequence
					var buildFortificationSequence = function(){
						console.info('KOCFIA formation addToQueue deferred buildFortificationSequence function');
						return $.Deferred(function( sdfd ){
							if( rule.defense ){
								sfdf.pipe( checkFortificationRequirements(sdfd) );
							} else sdfd.resolve();
						}).promise();
					};

					var qty, r, msg = [], added= [], resNeeded = [], resAvailable = [],
						trainAttempts = 3;

					var baseParams = jQuery.extend(true, {}, window.g_ajaxparams);
					if( baseParams == null ){
						alert('Paramètres ajax manquant. Raffraîchissez la page.');
						return;
					}
					baseParams.cid = rule.cityKey.replace(/city/, '');

					var $info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city='+ rule.cityKey +']').find('.info');
					if( dfd == null ){
						//clean information
						$info.empty();
					}

					$.when( trainUnitSequence(), buildFortificationSequence() )
						.done(function(){
							//user information
							if( dfd == null ){
								$info.append( added.join('<br />') );
							}
						})
						.always(function(){
							//user information
							$info.append( msg.join('<br />') );

							//manual launch
							if( dfd ){
								if( msg.length ){
									dfd.reject();
								} else {
									dfd.pipe( KOCFIA.formation.addToQueue(rule, dfd) );
								}
							} else {
								KOCFIA.formation.listCityFormations( rule.cityKey );
							}
						});
				},
				'fillQueue': function( rule ){
					console.info('KOCFIA formation fillQueue function', rule);
					//manual launch, will fill the training queue according to the rule parameters

					var fillSequence = function(){
						return $.Deferred(function( dfd ){
							return dfd.pipe( KOCFIA.formation.addToQueue(rule, dfd) );
						}).promise();
					};

					var $info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city='+ rule.cityKey +']').find('.info');

					//clean information
					$info.empty();

					$.when( fillSequence() )
						.always(function(){
							//user information by city
							$info.append( '<br />Lancement des formations fini.' );
							KOCFIA.formation.listCityFormations( rule.cityKey );
						});
				},
			};

		/* TRANSPORT */
			KOCFIA.transport = {
				'options': {
					'active': 1,
					'automatic': 0,
				},
				'stored': ['rules'],
				'rules': {},
				'confPanel': function( $section ){
					console.info('KOCFIA transport confPanel function');
					var code = '<h3>Transport</h3>'
						+ '<div>'
						+ KOCFIA.shared.generateCheckbox('transport', 'active', 'Activer le module', KOCFIA.conf.transport.active)
						+ '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOCFIA transport modPanel function');
					var $section = KOCFIA.$confPanel.find('#kocfia-transport').html('');

					//envoie manuel
						//ville expéditrice
						//ville destinataire
							//une par défaut
							//plusieurs possibles (*)
								//un ou plusieurs envoies
								//-> règle automatique temporaire
						//ou coordonnées
							//manuelle
							//via liste
							//plusieurs possibles (*)
						//choix troupes
							//une par défaut
							//plusieurs possible
						//-> capacité totale
						//choix des ressources
							//une par défaut
							//plusieurs possible
						//temps du trajet (recalculé à chaque changement de troupe)
						//bouton envoie
					//envoie automatique
						//garder x minerais dans la ville 1, le reste va à la ville 2
						//approvisionnement ville x à partri de ville y si ressources < z
						//activation / désactivation par ville
				},
				'on': function(){
					console.info('KOCFIA transport on function');

					KOCFIA.conf.transport.active = 1;
					KOCFIA.shared.storeConf();
				},
				'off': function(){
					console.info('KOCFIA transport off function');

					KOCFIA.conf.transport.active = 0;
					KOCFIA.conf.transport.automatic = 0;
					KOCFIA.shared.storeConf();

					KOCFIA.transport.automaticOff();
				},
				'automaticOn': function(){
					console.info('KOCFIA transport automaticOn function');

					KOCFIA.conf.transport.automatic = 1;
					KOCFIA.shared.storeConf();

					if( $.isEmptyObject( KOCFIA.transport.rules ) ){
						try{
							var persistentTransportRules = localStorage.getObject('kocfia_transport_rules_' + KOCFIA.storeUniqueId);
							if( persistentTransportRules ){
								KOCFIA.transport.rules = persistentTransportRules;
							}
						} catch(e){
							console.error(e);
						}
					}
				},
				'automaticOff': function(){
					console.info('KOCFIA transport automaticOff function');

					KOCFIA.conf.transport.automatic = 0;
					KOCFIA.shared.storeConf();
				},
				'storeAutomaticRules': function(){
					console.info('kocfia transport storeAutomaticRules function');
					localStorage.setObject('kocfia_transport_rules_' + KOCFIA.storeUniqueId, KOCFIA.transport.rules);
				},
				//'generateTransport': function(origin, destination, troops, ressources)
				//getCitiesForPlayer
				//getCitiesForSelf
				//getTroopsByTown
				//getTransportDuration
			};

		/* GLORY TOURNAMENT */
			/*KOCFIA.gloryTournament = {
				'options': {
					'active': 1,
					'automatic': 0,
				},
				'stored': ['rule'],
				'rule': {},
				'confPanel': function( $section ){
					console.info('KOCFIA gloryTournament confPanel function');
					var code = '<h3>Tournoi de Gloire</h3>';
					code += '<div>';
					code += KOCFIA.shared.generateCheckbox('gloryTournament', 'active', 'Activer le module', KOCFIA.conf.gloryTournament.active);
					code += KOCFIA.shared.generateCheckbox('gloryTournament', 'automatic', 'Lancer les éclairages automatiques', KOCFIA.conf.gloryTournament.automatic);
					code += KOCFIA.shared.generateButton('gloryTournament', 'deleteRule', 'Supprimer la règle enregistrée');
					code += '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOCFIA gloryTournament modPanel function');
					var $section = KOCFIA.$confPanel.find('#kocfia-gloryTournament').html('');

					var form = '<h3><span class="ui-icon ui-icon-info"></span>';
					form += '<span><input type="checkbox" id="gloryTournament-panel-automatic" '+ (KOCFIA.conf.gloryTournament.automatic ? 'checked' : '') +' autocomplete="off" />';
					form += '<label for="gloryTournament-panel-automatic">éclairages automatiques</label></span>';
					form += 'Configurer un éclairage</h3>';
					form += '<div class="scout-form">';
					form += '<ul class="message"></ul>';
					form += '<fieldset><div><label>Envoyer depuis&nbsp;:&nbsp;</label><br />';

					var i, length = KOCFIA.citiesKey.length;
					for( i = 0; i < length; i += 1 ){
						var city = KOCFIA.cities[i],
							checked = ( KOCFIA.gloryTournament.rule.hasOwnProperty('cities') ? $.inArray(i, KOCFIA.gloryTournament.rule.cities) > -1 : false );
						form += '<input id="kocfia-gloryTournament-'+ i +'" name="city" value="'+ i +'" type="checkbox" class="city-choice" '+ (checked ? 'checked' : '') +' autocomplete="off" />';
						form += '<label for="kocfia-gloryTournament-'+ i +'">'+ city.roman + ' ' + city.name +'</label>';
					}

					form += '</div><div>';
					var c = ( KOCFIA.gloryTournament.rule.hasOwnProperty('coord') ? KOCFIA.gloryTournament.rule.coord : '' );
					form += '<label>Coordonnée&nbsp;:&nbsp;</label><input type="text" name="coord" id="gloryTournament-coord" value="'+ c +'" autocomplete="off" />';
					form += '</div>';
					form += '<button class="save">Sauvegarder</button>';
					form += '<button class="reset">Annuler</button>';
					form += '</fieldset></div>';

					var help = '<div id="kocfia-gloryTournament-help" class="help" title="Aide Tournoi de Gloire"><ul>';
					help += '<li>Envoie 2 éclaireurs en éclairage sur une coordonnée donnée à partir des villes cochées</li>';
					help += '<li>Utilise la règle définie à chaque tentative</li>';
					help += '<li>Ne vérifie pas si un boost d\'attaque est actif (gardien, objet, bonus, ...)</li>';
					help += '<li>Utilise tous les slots des points de ralliements disponibles</li>';
					help += '<li>Les éclairages sont actifs quand le module et les éclairages automatiques sont actifs (cochés)</li>';
					help += '</ul></div>';

					$section.append( form + help )
						.on('change', '#gloryTournament-panel-automatic', function(){
							$('#gloryTournament-automatic').prop('checked', $(this).prop('checked')).change();
						})
						//reset form
						.on('click', '.reset', function(){
							var $inputs = KOCFIA.gloryTournament.$form.find('input');
							$inputs.filter('[type=text]').val('');
							$inputs.filter('[type=cgeckbox]').prop('checked', false);
						})
						//launch
						.on('click', '.save', function(){
							var result = KOCFIA.gloryTournament.planScout();
							if( result.errors.length ){
								KOCFIA.gloryTournament.$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
							} else {
								KOCFIA.gloryTournament.$form.find('.message').empty();
								KOCFIA.gloryTournament.rule = result.rule;
								KOCFIA.gloryTournament.storeRule();
							}
						})
						.find('.help').dialog({ autoOpen: false, zIndex: 100002 });

					KOCFIA.gloryTournament.$form = $section.find('.scout-form');
				},
				'on': function(){
					console.info('KOCFIA gloryTournament on function');
					if( $.isEmptyObject( KOCFIA.gloryTournament.rule ) ){
						try{
							var persistentGloryTournamentRule = localStorage.getObject('kocfia_gloryTournament_rule_' + KOCFIA.storeUniqueId);
							if( persistentGloryTournamentRule ){
								KOCFIA.gloryTournament.rule = persistentGloryTournamentRule;
							}
						} catch(e){
							console.error(e);
						}
					}

					if( KOCFIA.conf.gloryTournament.automatic ){
						KOCFIA.gloryTournament.automaticOn();
					}
				},
				'off': function(){
					console.info('KOCFIA gloryTournament off function');

					KOCFIA.gloryTournament.automaticOff();
				},
				'automaticOn': function(){
					console.info('KOCFIA gloryTournament automaticOn function');
					$('#gloryTournament-panel-automatic').prop('checked', true);

					if( !$.isEmptyObject( KOCFIA.gloryTournament.rule ) ){
						console.info('launching automatic scout', KOCFIA.gloryTournament.rule);
						KOCFIA.gloryTournament.launchScout();
					}
				},
				'automaticOff': function(){
					console.info('KOCFIA gloryTournament automaticOff function');
					$('#gloryTournament-panel-automatic').prop('checked', false);
				},
				'storeRule': function(){
					console.info('KOCFIA gloryTournament storeRule function');
					try{
						localStorage.setObject('kocfia_gloryTournament_rule_' + KOCFIA.storeUniqueId, KOCFIA.gloryTournament.rule);
					} catch(e){
						alert(e);
					}
				},
				'deleteRule': function(){
					console.info('KOCFIA gloryTournament deleteRule function');
					KOCFIA.gloryTournament.rule = {};
					KOCFIA.gloryTournament.storeRule();

					$('#kocfia-wilderness').find('.attack-list').find('ul').empty();
				},
				'planScout': function(){
					console.info('KOCFIA gloryTournament planScout function');
					var $cities = KOCFIA.gloryTournament.$form.find('.city-choice').filter(':checked'),
						coord = $.trim( KOCFIA.gloryTournament.$form.find('#gloryTournament-coord').val().replace(/\n/g, ' ') ),
						errors = [],
						regexp = /[^0-9, ]/,
						rule = {};

					//check form
						//city
						if( !$cities.length ){
							errors.push('Au moins une ville de départ obligatoire.');
						} else {
							rule.cities = $cities.map(function(){ return this.value; }).get();
						}

						//coord
						if( coord.length == 0 ){
							errors.push('Coordonnée requise.');
						} else if( regexp.test( coord ) ){
							errors.push('Pour la coordonnée, veuillez respecter le format x,y.');
						} else {
							var c = coord.split(',');
							if( c[0] < 0 || c[0] > 750 || c[0] < 0 || c[0] > 750 ){
								errors.push('Coordonnée erronée.');
							} else {
								rule.coord = coord;
							}
						}

						rule.unit = {'id': 'unt3', 'qty': 2};

						if( errors.length ){
							errors = errors.unique();
						}

					return {'rule': rule, 'errors': errors};
				},
				'launchScout': function(){
					var rule = KOCFIA.gloryTournament.rule;
					console.info('KOCFIA gloryTournament launchScout function', rule);
					if( $.isEmptyObject( rule ) ){
						return false;
					}

					if( !KOCFIA.conf.gloryTournament.active || !KOCFIA.conf.gloryTournament.automatic ){
						return false;
					}

					//by city steps
					var byCity = function( dfd ){
						console.info('KOCFIA gloryTournament deferred byCity function', cityIndex + 1);

						if( !KOCFIA.conf.gloryTournament.active || !KOCFIA.conf.gloryTournament.automatic ){
							return dfd.reject();
						}

						cityIndex += 1;
						if( cityIndex < rule.cities.length ){
							cityKey = rule.cities[ cityIndex ];
							wParams.cid = cityKey.replace(/city/, '');
							return dfd.pipe( checkRaillyPoint( dfd ) );
						}

						return dfd.resolve();
					};

					//step 1 of the sequence
					var checkRaillyPoint = function( dfd ){
						console.info('KOCFIA gloryTournament deferred checkRaillyPoint function');
						slots = KOCFIA.shared.buildingHighestLevel( cityKey, 12 );
						if( slots == 12 ) slots -= 1; //eleven armies at level 12
						for( a in window.seed.queue_atkp[ cityKey ] ){
							if( window.seed.queue_atkp[ cityKey ].hasOwnProperty(a) ) slots -= 1;
						}

						if( slots < 1 ){
							return setTimeout(function(){ dfd.pipe( byCity( dfd ) ); }, 6000);
						}

						dfd.pipe( checkUnit( dfd ) );
					};

					//step 2 of the sequence
					var checkUnit = function( dfd ){
						console.info('KOCFIA gloryTournament deferred checkUnit function');

						units = window.seed.units[ cityKey ];

						unitKey = rule.unit.id.replace(/nt/, '');
						unitNum = parseInt(rule.unit.id.replace(/unt/, ''), 10); //for unitsArr, 0 based
						qty = parseFloat(rule.unit.qty);
						wParams[ unitKey ] = qty;
						unitsArr[ unitNum ] = qty;

						available = parseFloat( units[ rule.unit.id ] );
						if( available < qty ){
							return setTimeout(function(){ dfd.pipe( byCity( dfd ) ); }, 6000);
						}

						return dfd.pipe( launchScouts( dfd ) );
					};

					//step 3 of the sequence
					var launchScouts = function( dfd ){
						console.info('KOCFIA gloryTournament deferred launchScouts function');
						$.when( subSequence( dfd ) )
							.done(function(){
								return dfd.resolve();
							});
					};

					//sub sequence, launch scout for each ralliement point slot available
					var subSequence = function( dfd ){
						console.info('KOCFIA gloryTournament deferred subSequence function');
						return $.Deferred(function( sdfd ){
							return sdfd.pipe( launch( dfd, sdfd ) );
						}).promise();
					};

					var checkMarch = function( cityKey, mid ){
						console.info('KOCFIA gloryTournament deferred checkMarch function');
						var march = window.seed.queue_atkp[ cityKey ][ 'm' + mid ];
						if( march ){
							var mParams = window.g_ajaxparams;
							mParams.rid = mid;
							$.ajax({
								url: window.g_ajaxpath + "ajax/fetchMarch.php" + window.g_ajaxsuffix,
								type: 'post',
								data: mParams,
								dataType: 'json',
							})
							.done(function(data){
								if( data.ok ){
									mid = 'm' + mid;
									//set the units Return value
									for( j = 1; j < 13; j += 1 ){
										if( data.march['unit'+ j +'Return'] ){
											window.seed.queue_atkp[ cityKey ][ mid ]['unit'+ j +'Return'] = data.march['unit'+ j +'Return'];
										}
									}

									for( j = 1; j < 6; j += 1 ){
										if( data.march['resource' + j] ){
											window.seed.queue_atkp[ cityKey ][ mid ]['resource' + j] = data.march['resource' + j];
										}
									}

									window.seed.queue_atkp[ cityKey ][ mid ].marchStatus = data.march.marchStatus;
									window.seed.queue_atkp[ cityKey ][ mid ].hasUpdated = true;
								}
							});
						}
					};

					var removeMarch = function( cityKey, mid ){
						console.info('KOCFIA gloryTournament deferred checkMarch function');
						var march = window.seed.queue_atkp[ cityKey ][ 'm' + mid ];
						if( march ){
							delete window.seed.queue_atkp[ cityKey ][ 'm' + mid ];
						}

						if( cityKey.replace(/city/, '') == window.currentcityid ) window.attack_generatequeue();
					}

					//sub sequence, launch scout
					var launch = function( dfd, sdfd ){
						console.info('KOCFIA gloryTournament deferred launch function');
						var p = wParams, //params is redefined in $.ajax, need for attach_addoutgoingmarch call
							captcha = false;
						$.ajax({
							url: window.g_ajaxpath + "ajax/march.php" + window.g_ajaxsuffix,
							type: 'post',
							data: wParams,
							dataType: 'json'
						})
						.done(function( result ){
							if( result.ok ){
								var timediff = parseInt(result.eta, 10) - parseInt(result.initTS, 10),
									d = new Date();
									ts = parseInt(d.getTime() / 1000, 10);
									time = timediff; //for the wait before next attack
								try{
									window.attach_addoutgoingmarch(result.marchId, result.marchUnixTime, ts + timediff, p.xcoord, p.ycoord, unitsArr, p.type, p.kid, resources, result.tileId, result.tileType, result.tileLevel, p.cid, true);
								} catch(e){
									console.warn(e);
								}

								if( result.updateSeed ) window.update_seed(result.updateSeed);

								window.updateBoosts(result);
								if( result.liftFog ){
									window.update_boosts();
									window.seed.playerEffects.fogExpire = 0;
									window.g_mapObject.getMoreSlots();
								}

								setTimeout(function(){ checkMarch( cityKey, result.marchId); }, timediff * 1000 + 5000);
								setTimeout(function(){ removeMarch( cityKey, result.marchId); }, timediff * 1000 + 30000);
							} else {
								console.log('error', result);
								if( result.hasOwnProperty('user_action') && result.user_action == 'marchCaptcha' ){
									$('#gloryTournament-panel-automatic').prop('checked', false).change();
									alert('Kabam capcha ! Eclairages stoppés en attendant ! Faite un éclairage manuel en validant le capcha puis relancer.');
									captcha = true;
								}
							}
						})
						.always(function(){
							if( captcha ){
								return dfd.reject();
							} else {
								console.log('2 scouts launched from '+ cityKey, cityIndex + 1);
								slots -= 1;
								if( slots < 1 ){
									console.log('next city', cityIndex + 1);
									return setTimeout(function(){ dfd.pipe( byCity( dfd ) ); }, 6000);
								}

								console.log('next launch', slots);
								setTimeout(function(){ sdfd.pipe( launch( dfd, sdfd ) ); }, 10000);
							}
						});
					};

					//main sequence
					var sequence = function(){
						console.info('KOCFIA gloryTournament deferred sequence function');
						return $.Deferred( function( dfd ){
							return dfd.pipe( byCity( dfd ) );
						}).promise();
					};


					var wParams = jQuery.extend(true, {}, window.g_ajaxparams);
					if( wParams == null ){
						alert('Paramètres ajax manquant. Raffraîchissez la page.');
						return;
					}
					wParams.type = 3; //MARCH_TYPE_SCOUT
					wParams.gold = 0;
					wParams.r1 = 0;
					wParams.r2 = 0;
					wParams.r3 = 0;
					wParams.r4 = 0;
					wParams.r5 = 0;
					wParams.items = '';

					var c = rule.coord.split(',');
					wParams.xcoord = c[0];
					wParams.ycoord = c[1];

					wParams.kid = 0;

					var cityIndex = -1,
						cityKey, city, slots, a, units, unitKey, unitNum, qty, available,
						resources = [0, 0, 0, 0, 0],
						unitsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

					$.when( sequence() )
						.always(function(){
							if( KOCFIA.conf.gloryTournament.active && KOCFIA.conf.gloryTournament.automatic ){
								setTimeout(function(){ KOCFIA.gloryTournament.launchScout(); }, 30000);
							}
						});
				}
			};*/

		/* MAP VISUALISATION WITH CANVAS */
			KOCFIA.canvas = {
				'options': {
					'active': 1,
				},
				/*
				'provinces': [
					{name: 'Tintagel', x: 75, y: 75},
					{name: 'Cornouailles', x: 225, y: 75},
					{name: 'Astolat', x: 375, y: 75},
					{name: 'Lyonesse', x: 525, y: 75},
					{name: 'Corbenic', x: 625, y: 75},
					{name: 'Paimpont', x: 75, y: 225},
					{name: 'Caméliard', x: 225, y: 225},
					{name: 'Sarras', x: 375, y: 225},
					{name: 'Canoel', x: 525, y: 225},
					{name: 'Avalon', x: 625, y: 225},
					{name: 'Carmathen', x: 75, y: 375},
					{name: 'Shallot', x: 225, y: 375},
					{name: '-------', x: 375, y: 375},
					{name: 'Cadbury', x: 525, y: 375},
					{name: 'Glaston Bury', x: 625, y: 375},
					{name: 'Camlann', x: 75, y: 525},
					{name: 'Orkney', x: 225, y: 525},
					{name: 'Dore', x: 375, y: 525},
					{name: 'Loegrie', x: 525, y: 525},
					{name: 'Caerleon', x: 625, y: 525},
					{name: 'Parménie', x: 75, y: 675},
					{name: 'Bodmin Moor', x: 225, y: 675},
					{name: 'Celwig', x: 375, y: 675},
					{name: 'Listenoise', x: 525, y: 675},
					{name: 'Albion', x: 625, y: 675},
				],
				*/
				'confPanel': function( $section ){
					console.info('KOCFIA canvas confPanel function');
					var code = '<h3>Carte</h3>';
					code += '<div>';
					code += KOCFIA.shared.generateCheckbox('canvas', 'active', 'Activer le module', KOCFIA.conf.canvas.active);
					code += '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOCFIA canvas modPanel function');
					var $section = KOCFIA.$confPanel.find('#kocfia-canvas').html(''),
						code = '<canvas id="kocfia-map-canvas" width="'+ width +'" height="'+ height +'"></canvas>';

					$section.append( code );

					KOCFIA.canvas.cv = $('#kocfia-map-canvas')[0];
					KOCFIA.canvas.ctx = KOCFIA.canvas.cv.getContext('2d');

					KOCFIA.canvas.grid();
				},
				'on': function(){
					console.info('KOCFIA formation on function');
				},
				'off': function(){
					console.info('KOCFIA formation off function');
				},
				'grid': function(){
					console.info('KOCFIA canvas grid function');
					var width = 375, height = 375, size = 75, x;

					//clear the canvas
					KOCFIA.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
					KOCFIA.canvas.ctx.clearRect(0, 0, KOCFIA.canvas.cv.width, KOCFIA.canvas.cv.height);

					for( x = 0; x <= width; x += size ){
						KOCFIA.canvas.ctx.moveTo(0 + x, 0);
						KOCFIA.canvas.ctx.lineTo(0 + x, height);
					}

					for( x = 0; x <= height; x += size ){
						KOCFIA.canvas.ctx.moveTo(0, 0 + x);
						KOCFIA.canvas.ctx.lineTo(width, 0 + x);
					}

					KOCFIA.canvas.ctx.strokeStyle = '#ede55a';
					KOCFIA.canvas.ctx.stroke();
				},
				'drawCoords': function( coords ){
					console.info('KOCFIA canvas drawCoords function');
					if( !$.isArray( coords ) ) coords = [ coords ];

					var size = KOCFIA.canvas.cv.width,
						scale = size / 750,
						i, x, y, c;
					KOCFIA.canvas.ctx.fillStyle = '#fa501a';
					for( i = 0; i < coords.length; i += 1 ){
						c = coords[i];
						x = c.x * scale;
						y = c.y * scale;

						KOCFIA.canvas.ctx.fillRect(x, y, x, y);
					}
				},
			},

	/* CHECK AND LAUNCH ATTACK */
		KOCFIA.checkAndLaunchAttack = function( attack, mod ){
			console.info('KOCFIA checkAndLaunchAttack function', attack.id, attack.cityKey, attack);
			var check = KOCFIA.conf[ mod ] && KOCFIA.conf[ mod ].hasOwnProperty('active') && KOCFIA.conf[ mod ].active;
			if( !check ){
				return false;
			}

			if( !attack.hasOwnProperty('abort') ) attack.abort = 0;

			var $tr = KOCFIA[mod].$ongoing.find('tbody').filter('[data-city='+ attack.cityKey +']').find('tr').filter('[data-attack='+ attack.id +']');
			if( $tr.length && $tr.data('stop') ){
				attack.aborts.push('Attaque stoppée sur demande.');
				KOCFIA[mod].refreshOngoingInfo(attack, true);
				KOCFIA[mod].$saved
					.find('tbody').filter('[data-city='+ attack.cityKey +']')
					.find('tr').filter('[data-attack='+ attack.id +']')
					.find('.charge').show();
				return false;
			}

			if( attack.abort > 10 ){
				attack.aborts.push('Trop d\'erreurs détectées. Attaque stoppée.');
				KOCFIA[mod].refreshOngoingInfo(attack, true);
				return false;
			}

			//security, defining missing properties
			if( !attack.hasOwnProperty('marching') ) attack.marching = [];
			if( !attack.hasOwnProperty('aborts') ) attack.aborts = [];
			if( !attack.hasOwnProperty('abort') ) attack.abort = 0;
			if( !attack.hasOwnProperty('lastCoordIndex') ) attack.lastCoordIndex = 0;

			//attacks loop only if in automatic mode
			if( attack.lastCoordIndex >= attack.coords.length ){
				if( KOCFIA.conf[mod].automatic && KOCFIA[mod].attacks[ attack.cityKey ] && KOCFIA[mod].attacks[ attack.cityKey ][ attack.id ]){
					attack.lastCoordIndex = 0;
				} else {
					attack.aborts.push('Attaque finie');
					KOCFIA[mod].refreshOngoingInfo(attack, true);
					return;
				}
			}

			attack.marching = [];

			/* deferred attack functions */
				//check previous marches for "away without leave" troops
				//first in attack sequence, will pipe the deferred resolution to resetTracks function
				var previousMarchingCheck = function(dfd){
					console.info('KOCFIA checkAndLaunchAttack deferred previousMarchingCheck function');
					if( window.seed.queue_atkp[ attack.cityKey ] ){
						var mParams = window.g_ajaxparams,
							i = 0, j, march,
							mLength = attack.marching.length;
						if( mLength == 0 ){
							return dfd.pipe( resetTracks(dfd) );
						}

						var checkMarch = function(dfd, i){
							console.info('KOCFIA checkAndLaunchAttack deferred checkMarch function');
							march = window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ];
							if( march && !march.hasOwnProperty('kocfiaUpdated') ){
								var mParams = window.g_ajaxparams;
								mParams.rid = attack.marching[i];
								$.ajax({
									url: window.g_ajaxpath + "ajax/fetchMarch.php" + window.g_ajaxsuffix,
									type: 'post',
									data: mParams,
									dataType: 'json',
								}).done(function(data){
									if( data.ok ){
										//set the units Return value
										for( j = 1; j < 13; j += 1 ){
											if( data.march['unit'+ j +'Return'] ){
												window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ]['unit'+ j +'Return'] = data.march['unit'+ j +'Return'];
											}
										}

										for( j = 1; j < 6; j += 1 ){
											if( data.march['resource' + j] ){
												window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ]['resource' + j] = data.march['resource' + j];
											}
										}

										window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].marchStatus = data.march.marchStatus;
										window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].hasUpdated = true;

										window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].kocfiaUpdated = true;

										if( data.march.marchStatus == 2 ){ //MARCH_STATUS_DEFENDING
											window.attack_recall(attack.marching[i], 1, attack.cityKey);
										}

										i += 1;
										attempts = 3;
										if( i >= mLength ){
											 return dfd.pipe( resetTracks(dfd) );
										} else return dfd.pipe( checkMarch(dfd, i) );

									} else {
										attempts -= 1;
										if( attempts > 0 ){
											return dfd.pipe( checkMarch(dfd, i) );
										} else {
											i += 1;
											return dfd.pipe( checkMarch(dfd, i) );
										}
									}
								})
								.fail(function(){
									//network or server error
									attempts -= 1;
									if( attempts > 0 ){
										return dfd.pipe( checkMarch(dfd, i) );
									} else {
										i += 1;
										return dfd.pipe( checkMarch(dfd, i) );
									}

								});
							} else {
								i += 1;
								if( i >= mLength ){
									 return dfd.pipe( resetTracks(dfd) );
								} else return dfd.pipe( checkMarch(dfd, i) );
							}
						}

						dfd.pipe( checkMarch(dfd, i) );
					} else {
						return dfd.pipe( resetTracks(dfd) );
					}
				};

				//attack tracking arrays reset
				//second in attack sequence, will pipe the deferred resolution to checkRallyPoint function
				var resetTracks = function(dfd){
					console.info('KOCFIA checkAndLaunchAttack deferred resetTracks function');
					//force refresh of attack queue for current city with march from the attack
					if( attack.marching.length && window.currentcityid == attack.cityKey.replace(/city/, '') ){
						window.attack_generatequeue();
					}

					attack.marching = [];

					//only reset aborts message at the start of the attack
					if( !attack.hasOwnProperty('aborts') ) attack.aborts = [];
					else if( attack.lastCoordIndex != 0 && attack.lastCoordIndex != attack.coords.length ) attack.aborts = [];

					return dfd.pipe(checkRallyPoint(dfd));
				};

				//check rally point slots
				//third in attack sequence, will pipe the deferred resolution to checkCoords function
				var checkRallyPoint = function(dfd){
					console.info('KOCFIA checkAndLaunchAttack deferred checkRallyPoint function');

					var slots = KOCFIA.shared.getRallyPointSlots( attack.cityKey );

					if( slots < attack.waves ){
						attack.aborts.push('Pas assez de place dans le point de ralliement.');
						return dfd.reject();
					}
					return dfd.pipe(checkCoords(dfd));
				};

				//loop function for checking each coords until one valid is found, use deferred.pipe() to iterate
				//fourth in attack sequence, will pipe the deferred resolution to checkCoord function
				var checkCoords = function(dfd){
					console.info('KOCFIA checkAndLaunchAttack deferred checkCoords function');
					coordIndex = attack.lastCoordIndex;
					return dfd.pipe(checkCoord(dfd, 3));
				};

				//check one coord and return the result using the deferred object in parameter
				//fifth in attack sequence, will pipe the deferred resolution to checkAndLaunchWaves function if a suitable coordinate is found
				var checkCoord = function( dfd, attempts ){
					console.info('KOCFIA checkAndLaunchAttack deferred checkCoord function');

					var cParams = jQuery.extend(true, {}, window.g_ajaxparams),
						gps = attack.coords[ coordIndex ].split(',');

					//check claim on the target
					cParams.blocks = "bl_" + gps[0] + "_bt_" + gps[1];
					$.ajax({
						url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
						type: 'post',
						data: cParams,
						dataType: 'json'
					})
					.done(function(result){
						if( result.data ){
							var info = result.data['l_'+ gps[0] +'_t_'+ gps[1]];
							if( info ){
								var type = parseInt(info.tileType, 10);
								if( type <= 0 || type > 50 ){
									attack.aborts.push('Coordonnées '+ attack.coords[ coordIndex ] +' ('+ (coordIndex + 1) +'e) n\'est pas une terre sauvage.');
									coordIndex += 1;
									return dfd.pipe( checkCoord(dfd) );

								} else if( info.tileUserId != null || info.tileCityId != null ){ //"0" -> under mists, "xxx" -> no mists
									attack.aborts.push( KOCFIA.shared.mapLink( attack.coords[ coordIndex ] ) +' ('+ (coordIndex + 1) +'e) occupées.');
									coordIndex += 1;
									return dfd.pipe( checkCoord(dfd) );

								} else {
									baseParams.xcoord = gps[0];
									baseParams.ycoord = gps[1];
									attack.lastCoordIndex = coordIndex;
									return dfd.pipe( checkAndLaunchWaves(dfd) );
								}
							} else {
								attack.aborts.push('Informations sur '+ KOCFIA.shared.mapLink( attack.coords[ coordIndex ] ) +' ('+ (coordIndex + 1) +'e) manquantes.');

								coordIndex += 1;

								if( coordIndex >= attack.coords.length ){
									attack.lastCoordIndex = coordIndex - 1;
									attack.aborts.push('Aucune coordonnée validée pour l\'attaque.');
									return dfd.reject();
								}

								attempts = 3;

								return dfd.pipe( checkCoord(dfd) );
							}
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( checkCoord(dfd) );
							} else {
								coordIndex += 1;

								if( coordIndex >= attack.coords.length ){
									attack.lastCoordIndex = coordIndex - 1;
									attack.aborts.push('Aucune coordonnée validée pour l\'attaque.');
									return dfd.reject();
								}

								return dfd.pipe( checkCoord(dfd, 3) );
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( checkCoord(dfd, attempts) );
						} else {
							coordIndex += 1;

							if( coordIndex >= attack.coords.length ){
								attack.lastCoordIndex = coordIndex - 1;
								attack.aborts.push('Aucune coordonnée validée pour l\'attaque.');
								return dfd.reject();
							}

							return dfd.pipe( checkCoord(dfd, 3) );
						}
					});
				};

				//loop function for checking and launching each wave, use deferred.pipe() to iterate
				//sixth in attack sequence, will pipe the deferred resolution to checkAndLaunchWave function
				var checkAndLaunchWaves = function(dfd){
					console.info('KOCFIA checkAndLaunchAttack deferred checkAndLaunchWaves function');
					waveIndex = 0;
					return dfd.pipe(checkAndLaunchWave(dfd));
				};

				//seventh in attack sequence, will pipe the deferred resolution to checkAndLaunchWave function until all waves are launched
				var checkAndLaunchWave = function( dfd ){
					console.info('KOCFIA checkAndLaunchAttack deferred checkAndLaunchWave function');

					/* deferred wave specific functions */
						//first in wave sequence, will pipe the deferred resolution to checkKnight function
						var findLostKnights = function(wdfd){
							console.info('KOCFIA checkAndLaunchAttack deferred findLostKnights function');
							KOCFIA.shared.freeKnights( attack.cityKey );
							return wdfd.pipe( checkKnight(wdfd) );
						};

						//second in wave sequence, will pipe the deferred resolution to checkUnits function
						var checkKnight = function(wdfd){
							console.info('KOCFIA checkAndLaunchAttack deferred checkKnight function');
							var knights = KOCFIA.shared.getAvailableKnights( attack.cityKey ),
								k;
							if( waveIndex == 0 && knights.length < attack.waves.length ){
								attack.aborts.push('Pas assez de chevalier disponible pour lancer les '+ attack.waves.length +' vagues.');
								return wdfd.reject();
							}

							if( !knights.length ){
								attack.aborts.push('Aucun chevalier disponible.');
								return wdfd.reject();
							}

							if( wave.knight == '' ){
								knight = knights[0].knightId;
							} else {
								for( k in knights ){
									if( knights.hasOwnProperty(k) ){
										if( wave.knight == knights[k].knightId ){
											knight = knights[k].knightId;
											break;
										}
									}
								}
								if( knight == null ){
									attack.aborts.push('Chevalier indisponible.');
									return wdfd.reject();
								}
							}

							wParams.kid = knight;
							return wdfd.pipe( checkUnits(wdfd) );
						};

						//third in wave sequence, will pipe the deferred resolution to launchWave function
						var checkUnits = function(wdfd){
							console.info('KOCFIA checkAndLaunchAttack deferred checkUnits function');
							var j, k, unit, unitKey, unitNum, qty, available, keep;
							uLength = wave.units.length;
							for( j = 0; j < uLength; j += 1 ){
								unit = wave.units[j];
								unitKey = unit.id.replace(/nt/, '');
								unitNum = parseInt(unit.id.replace(/unt/, ''), 10); //for unitsArr, 0 based
								qty = parseFloat(unit.qty);
								wParams[ unitKey ] = qty;
								unitsArr[ unitNum ] = qty;

								available = parseFloat(units[ unit.id ]);
								if( available < qty ){
									attack.aborts.push('Pas assez de troupe ('+ window.unitcost[ unit.id ][0] +').');
									return wdfd.reject();
								} else {
									for( k = 0; k < kLength; k += 1 ){
										keep = attack.keep[k];
										if( unit.id == keep.id && available - qty < parseFloat(keep.qty) ){
											attack.aborts.push('Pas assez de troupe ('+ window.unitcost[ unit.id ][0] +') (conservation).');
											return wdfd.reject();
										}
									}
								}
							}
							return wdfd.pipe( launchWave(wdfd, 3) );
						};

						//fourth and last in wave sequence
						var launchWave = function(wdfd, launchAttempts){
							console.info('KOCFIA checkAndLaunchAttack deferred launchWave function');
							var p = wParams; //params is redefined in $.ajax, need for attach_addoutgoingmarch call
							$.ajax({
								url: window.g_ajaxpath + "ajax/march.php" + window.g_ajaxsuffix,
								type: 'post',
								data: wParams,
								dataType: 'json'
							}).done(function( result ){
								if( result.ok ){
									attack.marching.push( result.marchId );
									var timediff = parseInt(result.eta, 10) - parseInt(result.initTS, 10),
										d = new Date();
										ts = parseInt(d.getTime() / 1000, 10);
										time = timediff; //for the wait before next attack
									try{
										window.attach_addoutgoingmarch(result.marchId, result.marchUnixTime, ts + timediff, p.xcoord, p.ycoord, unitsArr, p.type, p.kid, resources, result.tileId, result.tileType, result.tileLevel, p.cid, true);
									} catch(e){
										console.warn(e);
										//to avoid using the same knight on wave 2 as the seed is not yet updated
										window.seed.knights[ 'city' + p.cid ][ 'knt' + p.kid ].knightStatus = 10;
									}

									if( result.updateSeed ) window.update_seed( result.updateSeed );

									window.updateBoosts( result );
									if( result.liftFog ){
										window.update_boosts();
										window.seed.playerEffects.fogExpire = 0;
										window.g_mapObject.getMoreSlots();
									}

									return wdfd.resolve();

								} else {
									if( result.msg ){
										attack.aborts.push('Plan d\'attaque sur '+ KOCFIA.shared.mapLink( attack.coords[ attack.lastCoordIndex ] ) +' refusé ('+ result.msg +').');
										return wdfd.reject();
									} else if( result.user_action == 'marchCaptcha' ){
										attack.aborts.push('Plan d\'attaque sur '+ KOCFIA.shared.mapLink( attack.coords[ attack.lastCoordIndex ] ) +' refusé (captcha !).');
										return wdfd.reject();
									} else {
										attack.aborts.push('Plan d\'attaque sur '+ attack.coords[ lastCoordIndex ] +' refusé (erreur serveur).');
										launchAttempts -= 1;
										if( launchAttempts > 0 ){
											return wdfd.pipe( launchWave(wdfd, launchAttempts) );
										} else {
											return wdfd.reject();
										}
									}
								}
							}).fail(function(){
								//network or server error
								attack.aborts.push('Plan d\'attaque sur '+ attack.coords[ lastCoordIndex ] +' refusé (erreur internet).');

								launchAttempts -= 1;
								if( launchAttempts > 0 ){
									return wdfd.pipe( launchWave(wdfd, launchAttempts) );
								} else {
									return wdfd.reject();
								}
							});
						};

						var waveSequence = function(){
							return $.Deferred(function( wdfd ){
								//calling sequencialy findLostKnights(), checkKnight(), checkUnits(), launchWave()
								//using deferred.pipe() to iterate
								if( attack.type == 'attack' ){
									return wdfd.pipe( findLostKnights(wdfd) );
								} else { //scout
									wParams.kid = 0;
									return wdfd.pipe( checkUnits(wdfd) );
								}
							}).promise();
						};

					var units = window.seed.units[ attack.cityKey ],
						wParams = $.extend({}, baseParams),
						resources = [0, 0, 0, 0, 0],
						unitsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						wave = attack.waves[ waveIndex ],
						knight = null,
						kLength = attack.keep.length;
					$.when( waveSequence() )
						.done(function(){
							waveIndex += 1;
							if( waveIndex < attack.waves.length ){
								//launch next wave in 10s
								window.setTimeout(function(){
									dfd.pipe( checkAndLaunchWave(dfd) );
								}, 10000);
							} else return dfd.resolve();

						}).fail(function(){
							if( attack.marching.length ){
								KOCFIA.shared.recallWaves( attack );
							}
							return dfd.reject();
						});
				};

				var attackSequence = function(){
					return $.Deferred(function( dfd ){
						//calling sequencialy previousMarchingCheck(), resetTracks(), checkRallyPoint(), checkCoords(), checkAndLaunchWaves()
						//using deferred.pipe() to iterate
						return dfd.pipe( previousMarchingCheck(dfd) );
					}).promise();
				};

			var baseParams = jQuery.extend(true, {}, window.g_ajaxparams);
			if( baseParams == null ){
				alert('Paramètres ajax manquant. Raffraîchissez la page.');
				return;
			}

			baseParams.cid = attack.cityKey.replace(/city/, '');
			baseParams.type = 4; //MARCH_TYPE_ATTACK
			baseParams.gold = 0;
			baseParams.r1 = 0;
			baseParams.r2 = 0;
			baseParams.r3 = 0;
			baseParams.r4 = 0;
			baseParams.r5 = 0;
			baseParams.items = '';

			var coordIndex, waveIndex, time, increment = true;

			//using deferred to sequentialize asynchronous tasks
			$.when( attackSequence() )
				.fail(function(){
					time = 0;
					attack.abort = attack.abort + 1;
				})
				.always(function(){
					KOCFIA[mod].refreshOngoingInfo(attack, false);

					attack.lastCoordIndex = attack.lastCoordIndex + 1;

					//save the last coord if the attack is a stored one
					if( KOCFIA[mod].attacks[ attack.cityKey ]
						&& KOCFIA[mod].attacks[ attack.cityKey ][ attack.id ]
					){
						KOCFIA[mod].attacks[ attack.cityKey ][ attack.id ].lastCoordIndex = attack.lastCoordIndex;
						KOCFIA[mod].storeAttacks();
					}

					time *= 1000; //timestamp in milliseconds in javascript

					//force march update 10s after impact
					window.setTimeout(function(){
						KOCFIA.shared.forceMarchUpdate( attack );
					}, time + 10000);

					time *= 2; //round-trip

					//force refresh
					window.setTimeout(function(){
						KOCFIA.shared.updateSeed();
					}, time + 30000);

					//next round
					window.setTimeout(function(){
						KOCFIA.checkAndLaunchAttack( attack, mod );
					}, time + 45000);
				});
		};

	var trys = 60;
	function load(){
		if( window.seed && !$.isEmptyObject(window.seed.cities) && !$.isEmptyObject(window.seed.citystats) ){
			window.setTimeout(function(){
				/*console.log(window);
				console.log(window.seed);
				console.log(window.unitstats);*/
				console.time('kocfia init');
				console.log('kocfia init');
				KOCFIA.init();
				console.timeEnd('kocfia init');
			}, 2000);
		} else {
			trys -= 1;
			if( trys <= 0 ) window.location.reload();
			else window.setTimeout(function(){ load(); }, 1000);
		}
	}
	load();
})(jQuery);

});
/*
	//Construction :
	//- mise en place de la ville (à détailler)
		//- positionnement
		//- nombre
	//- file d'attente des construction par ville
		//- modifiable (suppression, insertion, ordre)
		//- gestion des erreurs

	//Entraînement :
	//- entraînement automatique
	//- entraînement programmé (x miliciens puis y archers puis ...)
	//- prise en compte des options (accélérations, ...)

	//Recherche :
	//- file d'attente des recherches par ville

	//Statistiques :
	//X- consommation
	//X- autonomie
	//- formation
	//X- gains

	//Exploration :
	//X recherche de TS / CB / FS
	//- recherche ennemi
	//- voir les villes amies
	//les villes ennemis ca serait cool aussi!!

	//Alerte :
	//- attaque
		//- plusieurs niveaux de dangerosité (éclairage, grosse attaque, vidage, ...)
	//- manque de nourriture
	//- manque de ressource (couplée avec les files d'attente)

	//Rapport :
	//- auto-suppression
	//- sauvegarde
	//- consultation simplifiée
	//- scan des rapports d'alliance
	//- vision claire des horaires

	//Attaque :
	//X- TS
	  //X- vérification vague 1 et 2
	  //X- liste de coordonnées
	  //- uniquement les vides ou non (exploration)
	  //X- rappel des quantités de troupes (mode anti-post-it :P)
	//- mode rainbow (1 cible, x attaques de y miliciens)

	//X Avoir des recherches de TS/CB/FS indexées par villes et mémorisées pour ne pas avoir à refaire les recherches à chaque fois qu'on passe d'une recherche sur une ville à une autre.

	//Renforcement :
	//- garder x miliciens dans la ville 1, le reste va à la ville 2
	//- prise en compte des attaques (CB, ...)
	//- envoyer de la nourriture avec les renforts


	//Coordination :
	//Si on pouvait intégrer le planificateur ce serait top (au moins les données source : récupérer tous les temps de marche des pourfendeurs connectés jusqu'à un point donné, pour un type d'unité à choisir)

	//Laboratorie :
	//-auto search
	//-liste d'attente

	//mode tournoi
		//sauvegarde puissance récurrent
		//pas de sauvegarde durant un tournois
		//donner la position avec la différence sur le plus proche avec changement de cadeau
*/
