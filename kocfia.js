/* @todo
 * https://github.com/baggachipz/TimerBar-jQuery-Plugin
 * canvas zoom http://jsfiddle.net/mBzVR/4/
 * http://lexadecimal.com/
 *
 * split the code by module, use localstorage to keep modules, with timestamp
 * server set a cookie with modules timestamps and version number
 * on server serve only outdated modules
 * use localstorage to get missing modules
 */

/*
 * https://www314.kingdomsofcamelot.com/fb/e2/src/main_src.php?g=M&y=0&n=fb149&l=fr_FR&messagebox=&sp=MTMyNzI1MDYxN3ZCHE__I3GaJow-&standalone=1&pf=1&res=1&iframe=1&lang=fr&ts=1327252086.92&entrypt=kabamGameInfo&lp=index
 * https://www280.kingdomsofcamelot.com/fb/e2/src/main_src.php?g=&y=0&n=&l=fr_FR&messagebox=&sp=MTMyNzI0NjkxNVpEHE916vtk27A-&fbIframeOn=1&standalone=0&res=1&iframe=1&lang=fr&ts=1327252570.5915&s=280&appBar=&signed_request=vqZ8zHGizRd5MFAjJSDtgR9t-SK330EnSqFWL2WgtRA.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzMjcyNTg4MDAsImlzc3VlZF9hdCI6MTMyNzI1MjU2Niwib2F1dGhfdG9rZW4iOiJBQUFBQUhseVpBcjlzQkFPUVpDUHcyaXpIYTQ2NmNHZnNsNDI4akhnWkFTTUtEU3RhdnB3dTZZaU9wTllxcnRTeUtGeHREMWVXUDEweDExQjRlMVJiZmpKM1pDSVpCd2d1bG1IcWVnYlpDNFpBYzlIV3NBMnhBQUMiLCJ1c2VyIjp7ImNvdW50cnkiOiJmciIsImxvY2FsZSI6ImZyX0ZSIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjEwMDAwMTUxNTcxNzg0OCJ9
 *
 * open in a iframe on kabam site, get the seed with a grease monkey script and postMessage it to the main window
 */

/* helpers */
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
		var o = {}, i, l = this.length, r = [];
		for( i = 0; i < l; i += 1 ) o[ this[i] ] = this[i];
		for( i in o ) r.push( o[i] );
		return r;
	};

	var uniqueObject = function( arr ){
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

	var product = function(){
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

//prototype json.stringify bug with array
	if( window.Prototype ){
		delete Object.prototype.toJSON;
		delete Array.prototype.toJSON;
		delete Hash.prototype.toJSON;
		delete String.prototype.toJSON;
		delete Number.prototype.toJSON;
		delete Boolean.prototype.toJSON;
	}

jQuery(document).ready(function(){
//CSS rules declarations
	var confPanelCss  = "\n#kocfia-conf-panel .ui-icon-close { position: absolute; right: -3px; top: -3px; cursor: pointer; }";
		confPanelCss += "\n#kocfia-conf-panel { display: none; position: absolute; z-index: 100001; }";
		confPanelCss += "\n#kocfia-conf-panel label + select { margin-left: 5px; }";
		confPanelCss += "\n#kocfia-conf-panel .ui-icon-trash { cursor: pointer; display: inline-block; position: relative; top: 2px; }";
		confPanelCss += "\n#kocfia-conf-panel .trip .ui-icon-trash, #kocfia-conf-panel .actions .ui-icon-trash { top: 0; }";
		confPanelCss += "\n#kocfia-conf-panel .trip { text-align: center; }";
		confPanelCss += "\n#kocfia-conf-panel img { position: relative; top: 4px; margin: 0 2px; }";
		confPanelCss += "\n#kocfia-conf-panel ul:not(.ui-accordion-content) { margin: 5px; }";
		confPanelCss += "\n#kocfia-conf-panel .coord { width: 30px; text-align: center; }";

		confPanelCss += "\n.kocfia-timer-div { position: absolute; color: red; font-weight: bold; left: 612px; display: none; font-family: Verdana, Helvetica, sans-serif; }";
		confPanelCss += "\n.mapLink { text-decoration: underline; color: blue; cursor: pointer; }";
		confPanelCss += "\n.navTab .ui-icon { height: 10px; display: inline-block; background-position: -32px -82px; }";

		confPanelCss += "\n#kocfia-conf-panel-wrapper { overflow: auto; }";
		confPanelCss += "\n#kocfia-conf-panel-content .ui-accordion .ui-accordion-content { padding: 3px; overflow: visible; }";

		confPanelCss += "\n.kocfia-conf-panel-tab.on { background-image: -webkit-linear-gradient(-45deg, green 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: -moz-linear-gradient(-45deg, green 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: linear-gradient(-45deg, green 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-repeat: no-repeat, repeat-x; background-position: 0 0, 50% 50%; }";
		confPanelCss += "\n.kocfia-conf-panel-tab.off { background-image: -webkit-linear-gradient(-45deg, red 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: -moz-linear-gradient(-45deg, red 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: linear-gradient(-45deg, red 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-repeat: no-repeat, repeat-x; background-position: 0 0, 50% 50%; }";
		confPanelCss += "\n.kocfia-conf-panel-tab.on.auto { background-image: -webkit-linear-gradient(-45deg, green 15%, transparent 15%, transparent), -webkit-linear-gradient(-45deg, transparent 90%, blue 90%, blue), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: -moz-linear-gradient(-45deg, green 15%, transparent 15%, transparent), -moz-linear-gradient(-45deg, transparent 90%, blue 90%, blue), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: linear-gradient(-45deg, green 15%, transparent 15%, transparent), linear-gradient(-45deg, transparent 90%, blue 90%, blue), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-repeat: no-repeat, no-repeat, repeat-x; background-position: 0 0, right bottom, 50% 50%; }";

		confPanelCss += "\n#kocfia-options p { margin: 3px 0; }";
		confPanelCss += "\n#kocfia-chat ul { padding-left: 0; }";
		confPanelCss += "\n#kocfia-reload-msg { top: 3px; }";
		confPanelCss += "\n#general-refreshFrequency, #general-reloadFrequency { width: 30px; text-align: center; }";

		confPanelCss += "\n#kocfia-map .save, #kocfia-map .filter { display: none; }";
		confPanelCss += "\n#kocfia-map .search-status { padding: 3px; text-align: center; }";
		confPanelCss += "\n#kocfia-map .search-result table { width: 100%; }";
		confPanelCss += "\n#kocfia-map .filter textarea { float: right; width: 70px; height: 70px; display: none; }";
		confPanelCss += "\n#kocfia-map .buttonset { display: inline-block; }";

		confPanelCss += "\n.ui-tabs .ui-tabs-panel { padding: 0; }";
		confPanelCss += "\n.ui-tabs-panel h3:not(.ui-accordion-header) { margin: 0;}";
		confPanelCss += "\n.ui-tabs-panel h3:not(.ui-accordion-header):not(:first-child) { margin: 4px 0; }";
		confPanelCss += "\n.ui-tabs-panel h3 p { float: right; font-size: 11px; margin: 0; }";
		confPanelCss += "\n.ui-tabs-panel h3 span, .ui-tabs-panel .infos span { float: right; font-size: 11px; margin: 0 5px; cursor: pointer; }";
		confPanelCss += "\n.ui-tabs-panel table { font-size: 11px; }";
		confPanelCss += "\n.ui-tabs-panel .help { display:none; }";
		confPanelCss += "\n.ui-tabs-panel .ui-icon-info { cursor: pointer; }";
		confPanelCss += "\n.ui-tabs-panel .accordion { clear: both; margin-top: 5px; }";

		confPanelCss += "\n.ui-accordion .ui-accordion-header { text-indent: 30px; }";

		confPanelCss += "\n.attack-form fieldset small { display: block; }";
		confPanelCss += "\n.attack-form fieldset select { max-width: 150px; }";
		confPanelCss += "\n.attack-form .keep, .attack-form .add-wave, .attack-form .launch, .attack-form .save, .attack-form .saveAndLaunch { display: none; }";
		confPanelCss += "\n.attack-form .targetLevel, .attack-form .rallypointSlot { width: 25px; text-align: center; }";
		confPanelCss += "\n.attack-form { counter-reset: waves; }";
		confPanelCss += "\n.attack-form .wave legend::after { counter-increment: waves; content: ' ' counter(waves); }";
		confPanelCss += "\n.attack-form .wave label { display: inline-block; }";
		confPanelCss += "\n.attack-form .wave > label, .attack-form .unit-block label:first-child { min-width: 80px; }";
		confPanelCss += "\n.attack-form .unit-block select + label { margin-left: 10px; }";
		confPanelCss += "\n.attack-form .unit-qty { width: 30px; text-align: center; }";
		confPanelCss += "\n.attack-form textarea { width: 150px; height: 120px; }";
		confPanelCss += "\n.attack-form .builds { display: none; float: right; max-width: 220px; }";
		confPanelCss += "\n.attack-form .builds div { column-count: 2; column-gap: 5px; -webkit-column-count: 2; -webkit-column-gap: 5px; column-count: 2; column-gap: 5px; }";
		confPanelCss += "\n.attack-form .rallypointSlot { margin-right: 5px; }";

		confPanelCss += "\n#kocfia-scout .attack-form .launch, #kocfia-scout .attack-form .save, #kocfia-scout .attack-form .saveAndLaunch { display: inline-block; }";
		confPanelCss += "\n#kocfia-scout .attack-form table { width: 100%; }";
		confPanelCss += "\n#kocfia-scout .attack-form tr td:first-child { text-align: right; white-space: nowrap; }";
		confPanelCss += "\n#kocfia-scout .attack-form tr td { text-align: center; vertical-align: top; }";
		confPanelCss += "\n#kocfia-scout .attack-form tr td[colspan] { text-align: left; }";
		confPanelCss += "\n#kocfia-scout .attack-form tfoot tr td[colspan] { text-align: left; }";
		confPanelCss += "\n#kocfia-scout .attack-form textarea { width: 80%; height: 100px; }";
		confPanelCss += "\n#kocfia-scout .attack-form tr td input[type=text] { width: 95%; max-width: 40px; }";
		confPanelCss += "\n#kocfia-scout .ongoing tbody .trip div { position: relative; }";
		confPanelCss += "\n#kocfia-scout .ongoing tbody .trip div .ui-icon { position: absolute; top: 0; left: 0; float: none; }";

		confPanelCss += "\n.attack-list.ui-accordion-content { padding: 2px; }";
		confPanelCss += "\n.attack-list .wave { padding-bottom: 3px; margin-bottom: 3px; border-bottom: 1px solid #ccc; }";
		confPanelCss += "\n.attack-list td .wave:last-child { border-bottom: none; }";
		confPanelCss += "\n.attack-list th { padding: 2px; }";
		confPanelCss += "\n.attack-list td { padding: 2px; vertical-align: top; white-space: nowrap; }";
		confPanelCss += "\n.attack-list .actions, .attack-list .current { text-align: center; }";
		confPanelCss += "\n.attack-list .coords, .attack-list .info { white-space: normal; max-width: 200px; }";
		confPanelCss += "\n.attack-list td .ui-icon { float: left; margin: 0 2px; cursor: pointer; }";
		confPanelCss += "\n.attack-list td div .ui-icon { float: none; display: inline-block; }";
		confPanelCss += "\n.attack-list td div { text-align: center; }";
		confPanelCss += "\n.attack-list td span:not(.ui-icon) { display: inline-block; padding-right: 5px; }";
		confPanelCss += "\n.attack-list .attack-errors { display: block; }";

		confPanelCss += "\n.attack-list img, .formation-list img { width: 18px; }";
		confPanelCss += "\n.attack-list table, .formation-list table { width: 100%; }";
		confPanelCss += "\n.attack-list .toggle, .formation-list .toggle { cursor: pointer; }";
		confPanelCss += "\n.attack-list .toggle .ui-icon, .formation-list .toggle .ui-icon { float: left; }";
		confPanelCss += "\n.attack-list thead th, .formation-list thead th { background-color: #cccccc; }";
		confPanelCss += "\n.attack-list tbody th, .formation-list tbody th { background-color: #e1d5d4; }";
		confPanelCss += "\n.attack-list tbody td, .formation-list tbody td { background-color: #fdf8f0; }";

		confPanelCss += "\n.ongoing img { margin-right: 5px; width: 18px; height: 18px; position: relative; top: 2px; }";
		confPanelCss += "\n.ongoing .time { display: inline-block; margin-left: 10px; }";
		confPanelCss += "\n.ongoing.ui-accordion .ui-accordion-content { padding: 5px; }";
		confPanelCss += "\n.ongoing ol { margin: 0; padding-left: 30px; }";
		confPanelCss += "\n.ongoing table { width: 100%; }";
		confPanelCss += "\n.ongoing td { vertical-align: top; }";
		confPanelCss += "\n.ongoing .canceled, .ongoing .canceled span { text-decoration: line-though; }";
		confPanelCss += "\n.ongoing .canceled .ui-icon-trash { visibility: hidden; }";

		confPanelCss += "\n.ongoing td.coords, .attack-list td.coords { max-width: 200px; }";
		confPanelCss += "\n.ongoing .coords small, .attack-list .coords small { display: block; max-height: 110px; overflow: hidden; }";

		confPanelCss += "\n#kocfia-formation .forms input[type=text] { width: 40px; text-align: center; }";
		confPanelCss += "\n#kocfia-formation .forms select { max-width: 100px }";
		confPanelCss += "\n#kocfia-formation .forms img { width: 18px; height: 18px; position: relative; top: 4px; }";
		confPanelCss += "\n#kocfia-formation .forms fieldset input + label, #kocfia-formation .forms fieldset select + label, #kocfia-formation .forms fieldset label + label, #kocfia-formation .forms fieldset button + label { margin: 0 3px 0 10px; }";
		confPanelCss += "\n#kocfia-formation .forms .save { float: right; }";
		confPanelCss += "\n#kocfia-formation .forms fieldset { clear: both; }";
		confPanelCss += "\n#kocfia-formation .manual-train-form .launch, #kocfia-formation .manual-train-form .reset { display: none; }";
		confPanelCss += "\n#kocfia-formation .ui-icon-copy { cursor: pointer; display: inline-block; margin-right: 5px; }";
		confPanelCss += "\n#kocfia-formation fieldset p:first-child { margin-top: 0; }";
		confPanelCss += "\n#kocfia-formation fieldset p:last-child { margin-bottom: 0; }";
		confPanelCss += "\n#kocfia-formation .rule-switch-form table { width: 100%; }";
		confPanelCss += "\n#kocfia-formation .rule-switch-form td { padding: 3px; }";
		confPanelCss += "\n#kocfia-formation .rule-switch-form tr td:last-child { text-align: right; }";
		confPanelCss += "\n#kocfia-formation .rule-switch-form label { padding-right: 4px; }";
		confPanelCss += "\n#kocfia-formation .forms .rule-switch-form input { width: 80px; text-align: left; }";
		confPanelCss += "\n#kocfia-formation .rule-switch-form select { width: 80px; }";

		confPanelCss += "\n.formation-list table { width: 100%; }";
		confPanelCss += "\n.formation-list ol li { white-space: nowrap; }";
		confPanelCss += "\n.formation-list .global { text-align: center; }";

		confPanelCss += "\n#kocfia-map-canvas { width: 350px; height: 350px; background: #000; }";

		confPanelCss += "\n.cf:before, .cf:after { content: \"\"; display: table; }";
		confPanelCss += "\n.cf:after { clear: both; }";

		confPanelCss += "\n.darkForest-form .buttons button { float:right; margin: 0 5px; }";
		confPanelCss += "\n.darkForest-form table { width: 100%; }";
		confPanelCss += "\n.darkForest-form tr td:not(:last-child) { border-right: 1px solid #ccc; }";
		confPanelCss += "\n.darkForest-form .city-header td { background-color: #CCCCCC; }";
		confPanelCss += "\n.darkForest-form input[type=checkbox] { position: relative; top: 2px; }";
		confPanelCss += "\n.darkForest-form .city-header button { float: right; margin: 0 5px 0 10px; }";
		confPanelCss += "\n.darkForest-form .city-header td > label { font-weight: bold; font-size: 13px; }";
		confPanelCss += "\n.darkForest-form .city-header td div { margin: 0 15px; float:right; width: auto; }";
		confPanelCss += "\n.darkForest-form .city-header input[type=text] { width: 20px; margin-right: 3px; }";
		confPanelCss += "\n.darkForest-form input[type=text] { text-align: center; }";
		confPanelCss += "\n.darkForest-form .rule, .darkForest-form .keep { text-align: center; vertical-align: top; }";
		confPanelCss += "\n.darkForest-form .rule .ui-icon, .darkForest-form .keep .ui-icon { display: inline-block; cursor: pointer; }";
		confPanelCss += "\n#kocfia-conf-panel .darkForest-form .rule .ui-icon-trash { position: absolute; top: 2px; right: 2px; }";
		confPanelCss += "\n.darkForest-form .rule .level-active { position: absolute; top: 2px; left: 2px; }";
		confPanelCss += "\n.darkForest-form .targetLevel { width: 20px; }";
		confPanelCss += "\n.darkForest-form tr:not(.city-header) td > div { margin: 4px 0; width: 200px; margin: 0 auto; }";
		confPanelCss += "\n.darkForest-form .rule div, .darkForest-form .keep div { position: relative; padding: 2px; }";
		confPanelCss += "\n.darkForest-form div .ui-icon { position: absolute; top: 0; right: 0; }";
		confPanelCss += "\n.darkForest-form .waves { counter-reset: waves; }";
		confPanelCss += "\n.darkForest-form .wave { margin: 4px 15px; border-top: 1px dotted #666; }";
		confPanelCss += "\n.darkForest-form .ui-icon.ui-icon-plusthick { top: 2px; }";
		confPanelCss += "\n.darkForest-form .ui-icon.ui-icon-trash { top: 4px; }";
		confPanelCss += "\n.darkForest-form .ui-icon.ui-icon-minusthick { top: 3px; right: 12px; }";
		confPanelCss += "\n.darkForest-form .wave .ui-icon.ui-icon-minusthick { right: -3px; }";
		confPanelCss += "\n.darkForest-form .wave strong:after { counter-increment: waves; content: ' ' counter(waves); }";
		confPanelCss += "\n.darkForest-form label { font-weight: bold; }";
		confPanelCss += "\n.darkForest-form .unit-qty { width: 45px; }";
		confPanelCss += "\n.darkForest-form .unit-choice { width: 90px; }";
		confPanelCss += "\n#kocfia-darkForest .ongoing .trip > div { position: relative; padding-bottom: 5px; margin: 0 5px 5px 5px; }";
		confPanelCss += "\n#kocfia-darkForest .ongoing .trip > div:not(:last-child) { border-bottom: 1px solid #ccc; }";
		confPanelCss += "\n#kocfia-darkForest .ongoing .trip div div { width: 200px; height: 60px; float: left; padding: 2px 4px; }";
		confPanelCss += "\n#kocfia-darkForest .ongoing .trip div div:not(:last-child) { border-right: 1px solid #ccc; margin-right: 10px; }";
		confPanelCss += "\n#kocfia-darkForest .ongoing .trip div .ui-icon { position: absolute; top: 0; left: 0; }";

		confPanelCss += '\n#kocfia-conf-panel .ui-buttonset { display: inline-block; }';
		confPanelCss += '\n#kocfia-conf-panel #kocfia-wilderness .ui-buttonset { display: block; margin: 2px 0; }';
		confPanelCss += '\n#kocfia-conf-panel .ui-buttonset .ui-button-text { padding: 1px 0.5em; min-width: 30px; }';
		confPanelCss += '\n#kocfia-conf-panel #kocfia-transport .coord { width: 50px; }';

		confPanelCss += '\n#kocfia-transport .troop img { width: 20px; }';
		confPanelCss += '\n#kocfia-transport .res img { width: 20px; }';
		confPanelCss += '\n#kocfia-transport .manual-form .buttons { display: none; }';
		confPanelCss += '\n#kocfia-transport .manual-form .quantity { display: none; }';
		confPanelCss += '\n#kocfia-transport .manual-form .quantity input { width: 50px; }';
		confPanelCss += '\n#kocfia-transport .manual-form .res input { width: 50px; }';
		confPanelCss += '\n#kocfia-transport .manual-form .troop select { margin-top: 5px; }';

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
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .tx { width: auto; float: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .flag { display: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap img { margin-right: 0; width: 15px; height: 15px; float: none; position: absolute; top: 2px; left: 2px; cursor: pointer; z-index: 1; }";
		chatMoveableCss += "\n.kocmain .mod_comm .tx a { text-decoration: underline; }";
		chatMoveableCss += "\n.kocmain .mod_comm .tx a:hover { text-decoration: none; }";
		chatMoveableCss += "\n#comm_tabs.seltab2 .tab2 { cursor: normal; }";
		chatMoveableCss += "\n#comm_tabs.seltab1 .tab1 { cursor: normal; }";
		chatMoveableCss += "\n.kocmain .mod_comm .kocfia-chat-top-wrapper { height: 20px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global { top: 0; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .kocfia-chat-list-wrapper { overflow-y: show; overflow-x: hidden; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .kocfia-chat-list-wrapper .chatlist { overflow: visible; height: auto; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_body { height: auto; }";
		chatMoveableCss += "\n.kocmain .mod_comm .kocfia-chat-bottom { height: 5px; }";

	var chatHelpCss = ".kocmain .mod_comm .comm_global .chatlist .noalliance { display: none; }";
		chatHelpCss += "\n.kocmain .mod_comm.ui-draggable { display: block; }";

	var chatHighlightLeadersCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.chancellor:not(.direct) { background-color: #EAFC83; }";
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
		overviewCss += "\n#kocfia-overview .sizer td, #kocfia-overview .sizer td.sum, #kocfia-overview .sizer.highlight td { height: 0; line-height: 0; padding: 0; }";

	var notepadCss = "#kocfia-notepad { padding: 2px 3px; }";
		notepadCss += "\n#kocfia-notepad .title { margin: 0 }";
		notepadCss += "\n#kocfia-notepad { position:absolute; font: 10px/20px Verdana, sans serif; font-width: normal;	z-index: 100000; display: none; }";
		notepadCss += "\n#kocfia-notepad .ui-icon-close { float: right; cursor: pointer; }";
		notepadCss += "\n#kocfia-notepad .wrapper { width: 100%; overflow: auto; margin: 3px 0; }";
		notepadCss += "\n#kocfia-notepad textarea { width: 100%; height: 150px; box-sizing: border-box; box-sizing: border-box; }";
		notepadCss += "\n#kocfia-notepad .wrapper input + label { display: block; }";
		notepadCss += "\n#kocfia-notepad .charsLeft { float: right; }";
		notepadCss += "\n#kocfia-notepad ul { display: block; column-count: 3; column-gap: 1em; margin-top: 0; padding-left: 18px; }";
		notepadCss += "\n#kocfia-notepad li .ui-icon { display: inline-block; position: relative; top: 2px; }";
		notepadCss += "\n#kocfia-notepad li { white-space: nowrap; }";
		notepadCss += "\n#kocfia-notepad li button { max-width: 120px; text-overflow: ellipsis; overflow: hidden; }";

(function(window, document, $, undefined){
	//pointers
	var $head = $('head'),
		$body = $('body'),
		reloadTimeout, reloadInterval, reloadTimer, refreshTimeout,
		resetRaidInterval, autoFormationInterval, autoFormationInfoCleanInterval,
		merlinBoxClick = false;

	var KOCFIA = {
		version: '0.4.9',
		debug: true,
		debugWhat: {transport: 1},
		server: null,
		modules: ['chat', 'fbWallPopup', 'overview', 'wilderness', 'darkForest', 'scout', 'notepad', 'map', 'formation', 'transport'],
		modulesLabel: {
			overview: 'Vue globale',
			map: 'Carte',
			wilderness: 'TS',
			darkForest: 'FO',
			scout: 'Eclairage',
		},
		stored: ['conf'],
		/* default configuration */
			//each module has its own default conf
			defaultConf: {
				general: {
					reload: 0,
					reloadFrequency: 30,
					refresh: 0,
					refreshFrequency: 30,
					hideMagicalBoxPreview: 0,
					hideOtherPlayersCourtInvitation: 0,
					hideFairPopup: 0,
					resetRaidTimer: 0,
				},
				confPanel: {
					position: {top: 100, left: 100},
					size: {width: 550, height: 350},
					selected: 0,
					visible: 0,
				}
			},
		/* DATA */
			cities: {},//cityXXXX:{'id','name',coords: {x,y}}, ...]
			citiesKey: [],
			resources: [
				{name: 'gold', label: 'Or', key: 'rec0', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{name: 'resource1x3600', label: 'Nourriture', key: 'rec1', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{name: 'resource2x3600', label: 'Bois', key: 'rec2', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{name: 'resource3x3600', label: 'Pierre', key: 'rec3', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{name: 'resource4x3600', label: 'Minerai', key: 'rec4', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
				{name: 'resource7', label: 'Pierre d\'Ether', key: '7', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/aetherstone_30.png'},
			],
			resources_cap: [
				{name: 'resource1Capx3600', label: 'plafond', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{name: 'resource2Capx3600', label: 'plafond', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{name: 'resource3Capx3600', label: 'plafond', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{name: 'resource4Capx3600', label: 'plafond', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			resources_production_detail: [
				{rows: 6, name: 'resource1', label: ['base', 'gardien', 'chevalier', 'technologie', 'TS', 'sort'], icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{rows: 6, name: 'resource2', label: ['base', 'gardien', 'chevalier', 'technologie', 'TS', 'sort'], icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{rows: 6, name: 'resource3', label: ['base', 'gardien', 'chevalier', 'technologie', 'TS', 'sort'], icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{rows: 6, name: 'resource4', label: ['base', 'gardien', 'chevalier', 'technologie', 'TS', 'sort'], icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			resources_production_barbarian: [
				{name: 'gold', label: 'camps barbare', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{name: 'resource1', label: 'camps barbare', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{name: 'resource2', label: 'camps barbare', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{name: 'resource3', label: 'camps barbare', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{name: 'resource4', label: 'camps barbare', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			resources_consumption: [
				{rows: 2, name: 'gold', label: ['dépense', 'formation'], icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{rows: 2, name: 'resource1', label: ['dépense', 'formation'], icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{rows: 2, name: 'resource2', label: ['dépense', 'formation'], icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{rows: 2, name: 'resource3', label: ['dépense', 'formation'], icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{rows: 2, name: 'resource4', label: ['dépense', 'formation'], icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			resources_production_total: [
				{name: 'gold', label: 'total', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{name: 'resource1', label: 'total', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{name: 'resource2', label: 'total', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{name: 'resource3', label: 'total', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{name: 'resource4', label: 'total', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			resources_autonomy: [
				{name: 'gold', label: 'autonomie', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{name: 'resource1x3600', label: 'autonomie', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{name: 'resource2x3600', label: 'autonomie', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{name: 'resource3x3600', label: 'autonomie', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{name: 'resource4x3600', label: 'autonomie', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			population: [
				{rows: 4, name: ['population', 'populationCap', 'laborPopulation', 'availablePopulation'], label: ['population', 'plafond', 'péon', 'glandeur'], icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/population_40.png'},
				{name: 'taxRate', label: 'taxation', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/taxes.png'},
				{name: 'hapiness', label: 'bonheur', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/happiness.png'},
			],
			unitInfo: {
				unt1: {label: 'Ravitailleur', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_1_30_s34.jpg'},
				unt2: {label: 'Milicien', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_2_30_s34.jpg'},
				unt3: {label: 'Eclaireur', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_3_30_s34.jpg'},
				unt4: {label: 'Piquier', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_4_30_s34.jpg'},
				unt5: {label: 'Paladin', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_5_30_s34.jpg'},
				unt6: {label: 'Archer', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_6_30_s34.jpg'},
				unt7: {label: 'Cavalerie', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_7_30_s34.jpg'},
				unt8: {label: 'Cavalerie Lourde', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_8_30_s34.jpg'},
				unt9: {label: 'Wagon', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_9_30_s34.jpg'},
				unt10: {label: 'Baliste', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_10_30_s34.jpg'},
				unt11: {label: 'Bélier', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_11_30_s34.jpg'},
				unt12: {label: 'Catapulte', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_12_30_s34.jpg'},
			},
			troops: [
				{name: 'unt1', label: 'Ravitailleur', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_1_30_s34.jpg'},
				{name: 'unt2', label: 'Milicien', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_2_30_s34.jpg'},
				{name: 'unt3', label: 'Eclaireur', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_3_30_s34.jpg'},
				{name: 'unt4', label: 'Piquier', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_4_30_s34.jpg'},
				{name: 'unt5', label: 'Paladin', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_5_30_s34.jpg'},
				{name: 'unt6', label: 'Archer', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_6_30_s34.jpg'},
				{name: 'unt7', label: 'Cavalerie', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_7_30_s34.jpg'},
				{name: 'unt8', label: 'Cavalerie Lourde', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_8_30_s34.jpg'},
				{name: 'unt9', label: 'Wagon', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_9_30_s34.jpg'},
				{name: 'unt10', label: 'Baliste', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_10_30_s34.jpg'},
				{name: 'unt11', label: 'Bélier', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_11_30_s34.jpg'},
				{name: 'unt12', label: 'Catapulte', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_12_30_s34.jpg'},
			],
			troops_barbarian: [
				{name: 'unt1', label: 'Ravitailleur', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_1_30_s34.jpg'},
				{name: 'unt2', label: 'Milicien', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_2_30_s34.jpg'},
				{name: 'unt3', label: 'Eclaireur', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_3_30_s34.jpg'},
				{name: 'unt4', label: 'Piquier', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_4_30_s34.jpg'},
				{name: 'unt5', label: 'Paladin', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_5_30_s34.jpg'},
				{name: 'unt6', label: 'Archer', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_6_30_s34.jpg'},
				{name: 'unt7', label: 'Cavalerie', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_7_30_s34.jpg'},
				{name: 'unt8', label: 'Cavalerie Lourde', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_8_30_s34.jpg'},
				{name: 'unt9', label: 'Wagon', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_9_30_s34.jpg'},
				{name: 'unt10', label: 'Baliste', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_10_30_s34.jpg'},
				{name: 'unt11', label: 'Bélier', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_11_30_s34.jpg'},
				{name: 'unt12', label: 'Catapulte', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_12_30_s34.jpg'},
			],
			defenses: [
				{name: 'fort53', label: 'Arbalètes', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_53_30.jpg'},
				{name: 'fort55', label: 'Trébuchets', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_55_30.jpg'},
				{name: 'fort60', label: 'Pièges', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_60_30.jpg'},
				{name: 'fort61', label: 'Chausse-trapes', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_61_30.jpg'},
				{name: 'fort62', label: 'Palissades', icon: 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_62_30.jpg'},
			],
			inSeed: {
				population: {
					population: {index: 0, var: 'pop'},
					populationCap: {index: 1, var: 'pop'},
					laborPopulation: {index: 3, var: 'pop'},
					taxRate: {index: 1, var: 'gold'},
					hapiness: {index: 2, var: 'pop'},
				},
				resources: {
					gold: {index: 0, var: 'gold'},
					resource1x3600: {index: 0, type: 'rec1', var: 'res'},
					resource2x3600: {index: 0, type: 'rec2', var: 'res'},
					resource3x3600: {index: 0, type: 'rec3', var: 'res'},
					resource4x3600: {index: 0, type: 'rec4', var: 'res'},
					resource7: {index: 0, type: 'rec5', var: 'res'},
				},
				resources_cap: {
					resource1Capx3600: {index: 1, type: 'rec1', var: 'res'},
					resource2Capx3600: {index: 1, type: 'rec2', var: 'res'},
					resource3Capx3600: {index: 1, type: 'rec3', var: 'res'},
					resource4Capx3600: {index: 1, type: 'rec4', var: 'res'},
				},
				resources_consumption: {
					gold: {index: 2, var: 'gold'},
					resource1: {index: 3, type: 'rec1', var: 'res'},
					resource2: {index: 3, type: 'rec2', var: 'res'},
					resource3: {index: 3, type: 'rec3', var: 'res'},
					resource4: {index: 3, type: 'rec4', var: 'res'},
				},
			},
	};

	KOCFIA.init = function(){
		if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.info('KOCFIA init function');

		//get server id
			KOCFIA.server = Shared.getServer();
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.info('server', KOCFIA.server);
			if( KOCFIA.server == null ){
				alert('wrong server id');
				return;
			}

		//get user id
			KOCFIA.kabamuid = Shared.getUserId();
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.info('kabamuid', KOCFIA.kabamuid);
			if( KOCFIA.kabamuid == null ){
				alert('wrong user id');
				return;
			}

		KOCFIA.storeUniqueId = KOCFIA.server + '_' + KOCFIA.kabamuid;

		//prepare the module with shared parts
		KOCFIA.wilderness = $.extend({}, KOCFIA.autoAttack, KOCFIA.wilderness);
		KOCFIA.darkForest = $.extend({}, KOCFIA.autoAttack, KOCFIA.darkForest);
		KOCFIA.scout = $.extend({}, KOCFIA.autoAttack, KOCFIA.scout);

		//gather the default conf
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.time('default conf gathering');
			var i, modulesLength = KOCFIA.modules.length;
			for( i = 0; i < modulesLength; i += 1 ){
				var mod = KOCFIA.modules[i];
				KOCFIA.defaultConf[ mod ] = $.extend(true, {}, KOCFIA[ mod ].options);
			}
			KOCFIA.conf = $.extend(true, {}, KOCFIA.defaultConf);
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.timeEnd('default conf gathering');

		//get stored conf if present
			var storedConf = localStorage.getObject('kocfia_conf_' + KOCFIA.storeUniqueId);
			if( storedConf ){
				KOCFIA.conf = $.extend(true, {}, KOCFIA.conf, storedConf);
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.info('used stored conf');
			}
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.log(KOCFIA.conf);

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

		//test 30s after init it the loading screen is still visible
		window.setTimeout(function(){
			var $loadingScreen = $('#kocinitloading');
			if( $loadingScreen.length == 0 || $loadingScreen.is(':visible') ){
				$('#kocfia-reload').submit();
			}
		}, 30000);

		//gather stored items list for deletion ease
			var i, j, mod, length, stored;
			for( i = 0; i < modulesLength; i += 1 ){
				mod = KOCFIA.modules[i];
				if( KOCFIA[ mod ].stored ){
					length = KOCFIA[ mod ].stored.length;
					for( j = 0; j < length; j += 1 ){
						KOCFIA.stored.push( mod + '_' + KOCFIA[ mod ].stored[j] );
						stored = localStorage.getObject('kocfia_' + mod + '_' + KOCFIA[ mod ].stored[j] + '_' + KOCFIA.storeUniqueId);
						if( stored ){
							KOCFIA[ mod ][ KOCFIA[ mod ].stored[j] ] = stored;
						}
					}
				}
			}

		//ajax sniffer
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.time('sniffer');
			KOCFIA.ajaxSniffer();
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.timeEnd('sniffer');

		//get player cities
			Shared.getCities();

		//configuration panel
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.time('confPanel');
			KOCFIA.confPanel();
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.timeEnd('confPanel');

		//modules init
			//needed asap
			KOCFIA.chat.$chatInput = $('#mod_comm_input');
			KOCFIA.chat.$chatGeneral = $('#mod_comm_list1');
			KOCFIA.chat.$chatAlliance = $('#mod_comm_list2');
			KOCFIA.chat.$chat = $('#kocmain_bottom').find('.mod_comm');

			var initModule = function(i){
				//delayed init for modules
				window.setTimeout(function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.time('kocfia '+ KOCFIA.modules[i] +' on');
					KOCFIA[ KOCFIA.modules[i] ].on();
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.timeEnd('kocfia '+ KOCFIA.modules[i] +' on');
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
					.click(function(e){ Shared.updateSeed(); })
			);
			KOCFIA.$refreshButton = $('#kocfia-refresh-seed');

			KOCFIA.$buttons.append(
				$('<button id="kocfia-free-knights">')
					.html('Rappeler les chevaliers perdus')
					.click(function(e){
						for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
							Shared.freeKnights( KOCFIA.citiesKey[i] );
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
			var $form = $('<form>', { id: 'kocfia-reload', target: '_top', action: '', method: 'post' });
			$form.append(' <input type="hidden" name="s" value="'+ KOCFIA.storeUniqueId +'">');
			$body.append( $form.hide() );

		//reload timeout
			$body.append('<div id="kocfia-reload-msg" class="kocfia-timer-div">Rechargement de la page dans : <span class="kocfia-timer"></span></div>');
			KOCFIA.$reloadTimer = $('#kocfia-reload-msg');
			if( KOCFIA.conf.general.reload ){
				Shared.reloadCountdown(1);
			}

		//refresh data
			if( KOCFIA.conf.general.refresh ){
				Shared.refreshCountdown(1);
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
				var hideCourtInvitation = window.setInterval(function(){
					if( $('#modalBox1').is(':visible') && $('#modalBox1').hasClass('modalBoxUEP') ){
						window.Modal.hideModal();
						clearInterval(hideCourtInvitation);
					}
					i += 1;
					if( i > 30 ) clearInterval(hideCourtInvitation);
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

		//reset raid timer
			if( KOCFIA.conf.general.autoResetBarbarianRaids ){
				Shared.reloadCountdown(1);
			}

		//gift page in a new tab
			var $tabs = $('#main_engagement_tabs').find('.navTab');
			var $clone = $tabs.eq(1).clone().removeAttr('onclick').attr('target', '_blank')
				.attr('href', 'https://apps.facebook.com/kingdomsofcamelot/?page=choosegift');
			$clone.find('span').html('Cadeaux').append('<b class="ui-icon ui-icon-extlink"></strong>');

			$clone.insertBefore( $tabs.eq(2) );
	};

	/* AJAX SNIFFER */
		KOCFIA.ajaxSniffer = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('ajaxSniffer') ) console.info('KOCFIA ajaxSniffer function');
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
								var r = JSON.parse(this.responseText);
								if( r.data && r.data.newChats ){
									if( r.data.newChats['2'] && r.data.newChats['2'].length > 0 ){
										if( KOCFIA.conf.chat.cleanHelp ) KOCFIA.chat.cleanHelp( r.data.newChats[2] );
										if( KOCFIA.conf.chat.highlightLeaders ) KOCFIA.chat.highlightLeaders( KOCFIA.chat.$chatAlliance, r.data.newChats['2'].length );
									}
									if( r.data.newChats['1'] && r.data.newChats['1'].length > 0 ){
										if( KOCFIA.conf.chat.highlightLeaders ) KOCFIA.chat.highlightLeaders( KOCFIA.chat.$chatGeneral, r.data.newChats['1'].length );
										if( KOCFIA.conf.chat.highlightFriends || KOCFIA.conf.chat.highlightFoes ) KOCFIA.chat.highlightFriendsAndFoes( r.data.newChats['1'].length );
									}
								}
							}
						}, false);
						break;
					case 'allianceGetLeaders.php':
						this.addEventListener("load", function(){
							if( KOCFIA.conf.chat.active && KOCFIA.conf.chat.highlightLeaders ){
								if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('ajaxSniffer') ) console.time('allianceGetLeaders load');
								var r = JSON.parse(this.responseText);
								if( r.officers ){
									KOCFIA.chat.leaders = {};
									for( var o in r.officers ){
										if( r.officers.hasOwnProperty(o) ){
											KOCFIA.chat.leaders[ r.officers[o].genderAndName ] = r.officers[o].type.toLowerCase();
										}
									}
								}
								KOCFIA.chat.highlightLeaders( KOCFIA.chat.$chatAlliance, 0 );
								KOCFIA.chat.highlightLeaders( KOCFIA.chat.$chatGeneral, 0 );
								if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('ajaxSniffer') ) console.timeEnd('allianceGetLeaders load');
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
					case 'relocate.php':
					case 'relocateAndChangename.php':
						this.addEventListener("load", function(){
							window.setTimeout(function(){
								//will force coords update for dark forest
								KOCFIA.darkForest.coords.status = 'outdated';
								KOCFIA.overview.updateFromSeed();
							}, 500);
						}, false);
						break;
					case 'changeCityName.php':
						this.addEventListener("load", function(){
							window.setTimeout(function(){
								Shared.getCities();
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
							var r = JSON.parse(this.responseText);
							if( r.updateSeed ) window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 500);
						}, false);
						break;
					case 'march.php':
						this.addEventListener("load", function(){
							var r = JSON.parse(this.responseText);
							if( r.ok ) window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 500);
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
		};

		/* CONFIGURATION PANEL */
		KOCFIA.confPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('confPanel') ) console.info('KOCFIA confPanel function');
			$head.append( $('<style>').html(confPanelCss) );

			var $confPanel = $('<div id="kocfia-conf-panel">');

			var $optionsSection = $('<div id="kocfia-options">'),
				lis = '<li><a href="#kocfia-options">Options</a></li>',
				sections = '';

			var i, modulesLength = KOCFIA.modules.length;
			for( i = 0; i < modulesLength; i += 1 ){
				var mod = KOCFIA.modules[i];
				if( typeof KOCFIA[ mod ].modPanel == 'function' ){
					var active = KOCFIA.conf[ mod ].active;
					var auto = (KOCFIA.conf[ mod ].hasOwnProperty('automatic') ? KOCFIA.conf[ mod ].automatic : false);
					var name = ( KOCFIA.modulesLabel[ mod ] ? KOCFIA.modulesLabel[ mod ] : mod.capitalize() );
					lis += '<li class="kocfia-conf-panel-tab '+ (active ? 'on' : 'off') +' '+ (auto ? 'auto' : '') +'">';
					lis += '<a href="#kocfia-'+ mod +'">'+ name +'</a>';
					lis += '</li>';
					sections += '<div id="kocfia-'+ mod +'"></div>';
				}
			}

			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('confPanel') ) console.time('option panel');
			KOCFIA.optionPanel( $optionsSection );
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('confPanel') ) console.timeEnd('option panel');

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
					} else if( func.indexOf('automatic') > -1 ){
						KOCFIA.$confPanelNav.find('li').find('a').filter('[href=#kocfia-'+ mod +']').parent().toggleClass('auto');
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
							Shared.reloadCountdown(status);
						}
						if( infos[1] == 'refresh' ){
							Shared.refreshCountdown(status);
						}
						if( infos[1] == 'resetRaidTimer' ){
							Shared.resetRaidTimer(status);
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

					Shared.storeConf();

					if( KOCFIA[ mod ] && typeof KOCFIA[ mod ][ func ] == 'function' ) KOCFIA[ mod ][ func ]();
					//else console.error('not a function', mod, func);
				})
				.on('change', '.conf-choice', function(){
					var $this = $(this),
						infos = this.id.split('-');
					KOCFIA.conf[ infos[0] ][ infos[1] ] = $this.val();
					Shared.storeConf();
				})
				.on('click', '.conf-action', function(e){
					e.preventDefault();
					var $this = $(this),
						infos = $this.attr('rel').split('-'),
						param = $this.data('param');
					if( infos[0] == 'shared' ){
						if( param ){
							Shared[ infos[1] ]( param );
						} else {
							Shared[ infos[1] ]();
						}
					} else {
						if( param ){
							KOCFIA[ infos[0] ][ infos[1] ](param);
						} else {
							KOCFIA[ infos[0] ][ infos[1] ]();
						}
					}
				});

			var $content = $('<div id="kocfia-conf-panel-content">')
				.append( $optionsSection )
				.append( sections );

			var $wrapper = $('<div id="kocfia-conf-panel-wrapper">')
				.append( $content );

			$confPanel
				.append( '<span class="ui-icon ui-icon-close"></span>' )
				.append( '<nav id="kocfia-conf-panel-tabs"><ul>' + lis + '</ul></nav>' )
				.append( $wrapper );

			$confPanel
				.draggable({
					//helper: 'original',
					//appendTo: 'body',
					//containment: 'parent',
					handle: '#kocfia-conf-panel-tabs, #kocfia-conf-panel-content',
					scroll: true,
					distance: 20,
					stop: function(event, ui){
						KOCFIA.conf.confPanel.position = ui.position;
						Shared.storeConf();
					}
				})
				.resizable({
					minWidth: 250,
					minHeight: 250,
					handles: 'n, e, s, w, ne, se, sw, nw',
					resize: function(event, ui){
						KOCFIA.$confPanelWrapper.css('height', KOCFIA.calcConfPanelInnerHeight());
					},
					stop: function(event, ui){
						KOCFIA.conf.confPanel.size = ui.size;
						Shared.storeConf();
					}
				})
				.tabs({
					collapsible: true,
					selected: KOCFIA.conf.confPanel.selected,
					select: function(event, ui){
						//save the selected panel index
						KOCFIA.conf.confPanel.selected = ui.index;
						Shared.storeConf();

						//dynamic generation of the panel on first call
						if( $(ui.panel).html().length == 0 ){
							var mod = ui.panel.id.split('-')[1];
							KOCFIA[ mod ].modPanel();
						}
					},
				})
				.css({
					top: KOCFIA.conf.confPanel.position.top,
					left: KOCFIA.conf.confPanel.position.left,
					width: KOCFIA.conf.confPanel.size.width,
					height: KOCFIA.conf.confPanel.size.height
				})
				.find('.ui-icon-close').click(function(e){
					e.preventDefault();
					KOCFIA.$confPanel.hide();
					KOCFIA.conf.confPanel.visible = 0;
					Shared.storeConf();
				});

			var $confPanelToggle = $('<button id="kocfia-conf-panel-toggle">').html('KOCFIA v'+ KOCFIA.version);
			$confPanelToggle.click(function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('confPanel') ) console.info('$kocConfPanelToggle click');
				KOCFIA.$confPanel.toggle();
				KOCFIA.conf.confPanel.visible = (KOCFIA.$confPanel.is(':visible') ? 1 : 0);
				Shared.storeConf();

				KOCFIA.$confPanelWrapper.css('height', KOCFIA.calcConfPanelInnerHeight());
			});

			$body.append( $confPanel );

			$('#kocfia-options').accordion({collapsible: true, autoHeight: false, animated: false});

			$('<div id="kocfia-buttons">')
				.html( $confPanelToggle )
				.insertBefore( $('#main_engagement_tabs') );

			KOCFIA.$buttons = $('#kocfia-buttons');

			KOCFIA.$confPanel = $('#kocfia-conf-panel');
			KOCFIA.$confPanelNav = $('#kocfia-conf-panel-tabs');
			KOCFIA.$confPanelWrapper = KOCFIA.$confPanel.find('#kocfia-conf-panel-wrapper');

			for( i = 0; i < modulesLength; i += 1 ){
				var mod = KOCFIA.modules[i];
				if( typeof KOCFIA[ mod ].modPanel == 'function' ) KOCFIA[ mod ].modPanel();
			}

			//help dialogs
			KOCFIA.$confPanel.find('.help').dialog({ autoOpen: false, height: 300, width: 400, zIndex: 100002 });

			if( KOCFIA.conf.confPanel.visible ){
				KOCFIA.$confPanel.show();
				KOCFIA.$confPanelWrapper.css('height', KOCFIA.calcConfPanelInnerHeight());
			}
		};

		KOCFIA.calcConfPanelInnerHeight = function(){
			return KOCFIA.$confPanel.innerHeight() - KOCFIA.$confPanelNav.height() - 20;
		};

		KOCFIA.optionPanel = function($optionsSection){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('confPanel') ) console.info('KOCFIA shared optionPanel function');
			var code = '<h3>Global</h3>';
				code += '<div>';
				code += Shared.generateButton('shared', 'cleanLocalStorage', 'Remise à zèro des données persistantes', null);
				code += Shared.generateButton('shared', 'reloadGame', 'Recharger la page');
				code += Shared.generateCheckbox('general', 'refresh', 'Rafraîchir les données toutes les ', KOCFIA.conf.general.refresh).replace(/<\/p>/, '');
				code += Shared.generateInput('general', 'refreshFrequency', ' minutes', KOCFIA.conf.general.refreshFrequency).replace(/<p>/, '');
				code += Shared.generateCheckbox('general', 'reload', 'Recharger toutes les ', KOCFIA.conf.general.reload).replace(/<\/p>/, '');
				code += Shared.generateInput('general', 'reloadFrequency', ' minutes', KOCFIA.conf.general.reloadFrequency).replace(/<p>/, '');
				code += Shared.generateCheckbox('general', 'hideMagicalBoxPreview', 'Masquer automatiquement la pub pour la boîte magique de Merlin', KOCFIA.conf.general.hideMagicalBoxPreview);
				code += Shared.generateCheckbox('general', 'hideOtherPlayersCourtInvitation', 'Masquer automatiquement les invations pour voir la cour d\'un joueur', KOCFIA.conf.general.hideOtherPlayersCourtInvitation);
				code += Shared.generateCheckbox('general', 'hideFairPopup', 'Masquer automatiquement les fêtes foraines (avec envoie)', KOCFIA.conf.general.hideFairPopup);
				code += '<br>' + Shared.generateCheckbox('general', 'resetRaidTimer', 'Remise à zéro du compteur des attaques de camps barbares', KOCFIA.conf.general.resetRaidTimer);
				code += '</div>';
			$optionsSection.append( code );

			/* @todo disabled until finish */
			$optionsSection.find('#general-refresh, #general-refreshFrequency').attr('disabled', 'disabled');

			var i, length = KOCFIA.modules.length;
			for( i = 0; i < length; i += 1 ){
				KOCFIA[ KOCFIA.modules[i] ].confPanel( $optionsSection );
			}
		};

	/* SHARED */
		Shared = {};

		Shared.storeConf = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA storeConf function', KOCFIA.conf);
			localStorage.setObject('kocfia_conf_' + KOCFIA.storeUniqueId, KOCFIA.conf);
		};

		Shared.cleanLocalStorage = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared cleanLocalStorage function');
			var i, length = KOCFIA.stored.length;
			for( i = 0; i < length; i += 1 ){
				localStorage.removeItem('kocfia_' + KOCFIA.stored[i] + '_' + KOCFIA.storeUniqueId);
			}
			$('#kocfia-map-load-saved').find('option').filter(':gt(0)').remove();
		};

		Shared.reloadGame = function(){
			$('#kocfia-reload').submit();
		};

		Shared.reloadCountdown = function(status){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared reloadCountdown function', status);
			if( status ){
				reloadTimer = parseFloat(KOCFIA.conf.general.reloadFrequency) * 60 * 1000;
				reloadTimeout = window.setTimeout(function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared reloadCountdown timeout function');
					$('#kocfia-reload').submit();
					clearInterval( reloadInterval );
				}, reloadTimer - 1);

				KOCFIA.$reloadTimer.show().find('.kocfia-timer').html( Shared.readableDuration(reloadTimer / 1000) );
				reloadInterval = window.setInterval(function(){
					reloadTimer -= 1000;
					KOCFIA.$reloadTimer.find('.kocfia-timer').html( Shared.readableDuration(reloadTimer / 1000) );
				}, 1000);
			} else if( reloadTimeout ){
				clearTimeout( reloadTimeout );
				clearInterval( reloadInterval );
				KOCFIA.$reloadTimer.hide();
			}
		};

		Shared.refreshCountdown = function(status){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared refreshCountdown function', status);
			if( status ){
				refreshTimeout = window.setTimeout(function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared refreshCountdown timeout function');
					$('#kocfia-refresh-seed').trigger('click');
				}, parseFloat(KOCFIA.conf.general.refreshFrequency) * 60 * 1000);
			} else if( refreshTimeout ){
				clearTimeout( refreshTimeout );
			}
		};

		Shared.resetRaidTimer = function(status){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared resetRaidTimer function', status);
			if( status ){
				var params = $.extend({}, window.g_ajaxparams);

				params.pf = 0;
				params.ctrl = 'BotManager';
				params.action = 'resetRaidTimer';
				params.settings = {};

				var resetByCity = function( cityKey, attempts ){
					params.settings.cityId = cityKey.replace(/city/, '');

					$.ajax({
						url: window.g_ajaxpath + "ajax/_dispatch.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						timeout: 10000,
					})
					.done(function( result ){
						if( result.ok ){
							window.cityinfo_army();
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								resetByCity( cityKey, attempts );
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							resetByCity( cityKey, attempts );
						}
					});
				};

				var cityKey;
				for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
					cityKey = KOCFIA.citiesKey[i];
					window.setTimeout(function(){ resetByCity( cityKey, 3 ); }, i * 5000);
				}

				resetRaidInterval = window.setInterval(function(){
					var cityKey;
					for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
						cityKey = KOCFIA.citiesKey[i];
						window.setTimeout(function(){ resetByCity( cityKey, 3 ); }, i * 5000);
					}
				}, 60 * 60 * 1000); //one hour
			} else if( resetRaidInterval ){
				clearInterval( resetRaidInterval );
			}
		};

		Shared.getServer = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('kocfia shared getServer function');
			return window.domainName;
		};

		Shared.getUserId = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('kocfia shared getUserId function');
			return window.kabamuid;
		};

		Shared.getCities = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.time('cities');
			var i, length = window.seed.cities.length;
			for( i = 0; i < length; i += 1 ){
				var c = window.seed.cities[i];
				KOCFIA.cities['city' + c[0]] = {id: c[0], name: c[1], coords: {x: c[2], y: c[3]}, roman: window.roman[i], label: window.roman[i] +' '+ c[1]};
				KOCFIA.citiesKey.push( 'city' + c[0] );
			}
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.timeEnd('cities');
		};

		Shared.getKnightStatText = function( knight ){
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
		};

		Shared.format = function( num ){
			if( typeof num == 'undefined' || num == null ) return '';
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
		};

		Shared.decodeFormat = function( num ){
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
		};

		Shared.readable = function( num ){
			if( typeof num == 'undefined' || num == null ) return '';
			num = '' + Math.floor( parseFloat(num) );
			var length = num.length;
			var s = '';

			while( length > 3 ){
				s = "'" + num.substr(length - 3, 3) + s;
				length -= 3;
			}

			return num.substr(0, length) + s;
		};

		Shared.readableDuration = function( time ){
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
					v = parseInt(Math.floor(time / time_units[i][0]), 10);
				} else {
					v = parseInt(Math.floor((time % time_units[i-1][0]) / time_units[i][0]), 10);
				}
				if( v > 0 ) values.push( v + time_units[i][1] );
			}

			return values.join(' ');
		};

		Shared.generateCheckbox = function(module, option, text, checked){
			return '<p><input type="checkbox" class="conf-toggle" id="'+ module +'-'+ option +'" '+ (checked ? 'checked' : '') +' /><label for="'+ module +'-'+ option +'">'+ text +'</label></p>';
		};

		Shared.generateInput = function(module, option, text, value){
			return '<p><input type="text" class="conf-choice" id="'+ module +'-'+ option +'" value="'+ value +'" /><label for="'+ module +'-'+ option +'">'+ text +'</label></p>';
		};

		Shared.generateButton = function(module, action, text, param){
			return '<p><button rel="'+ module +'-'+ action +'" class="conf-action" '+ (param != null ? 'data-param="'+param+'"' : '') +'>'+ text +'</button></p>';
		};

		Shared.generateRadio = function(module, name, values, labels, selected){
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
		};

		Shared.generateSelect = function(module, name, label, selected, options){
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
		};

		Shared.marchTimeCalculator = function(cityKey, troops, from_x, from_y, is_round_trip, items_applied, isFriendly){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('kocfia shared marchTimeCalculator function', cityKey, troops, from_x, from_y, is_round_trip, items_applied);
			var speed = 99999,
				total_troops = 0,
				time = 0,
				city = KOCFIA.cities[cityKey],
				d = new Date(),
				ts = parseInt(d.getTime() / 1000, 10);

			var techElevenModifier = parseInt(window.seed.tech.tch11, 10),
				techTwelveModifier = parseInt(window.seed.tech.tch12, 10),
				i, length = troops.length,
				j, troop_speed;
			for( i = 0; i < length; i += 1 ){
				j = i + 1;

				if( troops[i] <= 0 || !window.unitstats.hasOwnProperty("unt" + j) ) continue;

				total_troops += troops[i];
				troop_speed = parseInt(window.unitstats["unt" + j][3]) * (1 + 0.1 * techElevenModifier, 10);

				if( j > 6 ){
					troop_speed = troop_speed * (1 + 0.05 * techTwelveModifier);
				}

				if( troop_speed < speed ){
					speed = troop_speed;
				}
			}

			if( 0 == speed ) return "";

			var i, guardianBonus = 0;
			for( i = 0; i < window.seed.guardian.length; i += 1 ){
				guardian = window.seed.guardian[i];
				if( guardian.city == cityKey && guardian.type == 'food' && guardian.level > 0 ){
					guardianBonus = guardian.level;
					break;
				}
			}

			var multiplier = 1 + (guardianBonus * 0.01),
				time = 0,
				minimum_time = 173,
				barbarian_raid = false,
				attack_selected = !isFriendly,
				x = Math.abs(parseInt(city.coords.x, 10) - parseInt(from_x, 10)),
				y = Math.abs(parseInt(city.coords.y, 10) - parseInt(from_y, 10));
			if( x > 375 ) x = 750 - x;
			if( y > 375 ) y = 750 - y;

			var distance = Math.sqrt((x * x) + (y * y));

			if( isFriendly ){
				var level = Shared.buildingHighestLevel(cityKey, 18);
				if( level > 0 ) speed = speed * (1 + level / 2);
			}

			time = Math.ceil(distance * 6000 / speed);

			if( items_applied["57"] && window.seed.items.i57 > 0 ) time = parseInt(time * 0.5, 10);
			else if( items_applied["55"] && window.seed.items.i55 > 0 ) time = parseInt(time * 0.75, 10);

			time += 30;

			if( seed.playerEffects.returnExpire > ts ) time = parseInt(time * 0.75, 10);

			if( is_round_trip ) time *= 2;

			if( time < minimum_time && barbarian_raid && attack_selected ) time = minimum_time;

			return time;
		};

		Shared.getAvailableKnights = function( cityKey ){
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
		};

		Shared.mapLink = function( coords ){
			if( !$.isArray(coords) ) coords = [coords];
			var code = '', i, length = coords.length;
			for( i = 0; i < length; i += 1 ){
				code += '<span class="mapLink">'+ coords[i] +'</span>';
			}
			return code;
		};

		Shared.freeKnights = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared freeKnights function', cityKey);
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
		};

		Shared.updatingSeed = false;
		Shared.updateSeed = function(){
			if( !Shared.updatingSeed ){
				Shared.updatingSeed = true;
				window.update_seed_ajax(true, null);
				window.setTimeout(function(){ Shared.updatingSeed = false; }, 10000);
			}
		};

		Shared.getDistance = function( fromX, fromY, toX, toY ){
			fromX = parseInt(fromX, 10);
			fromY = parseInt(fromY, 10);
			toX = parseInt(toX, 10);
			toY = parseInt(toY, 10);

			var max = 750,
				middle = max / 2,
				x = Math.abs(toX - fromX),
				y = Math.abs(toY - fromY);

			if (x > middle) {
				x = max - x;
			}
			if (y > middle) {
				y = max - y;
			}
			return Math.round(100 * Math.sqrt(x * x + y * y)) / 100;
		};

		Shared.buildingHighestLevel = function( cityKey, buildingId ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared buildingHighestLevel function');

			var level = 0, b;
			for( b in window.seed.buildings[cityKey] ){
				if( window.seed.buildings[cityKey].hasOwnProperty(b) ){
					var building = window.seed.buildings[cityKey][b],
						buildingLevel = parseInt(building[1], 10);

					if( building[0] == buildingId && level < buildingLevel ) level = buildingLevel;
				}
			}
			return level;
		};

		Shared.barracksCount = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared barracksCount function');

			var b, count = 0;
			for( b in window.seed.buildings[cityKey] ){
				if( window.seed.buildings[cityKey].hasOwnProperty(b) ){
					if( window.seed.buildings[cityKey][b][0] == 13 ) count += 1;
				}
			}
			return count;
		};

		Shared.forceMarchUpdate = function( attack ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared forceMarchUpdate function');
			if( window.seed.queue_atkp[ attack.cityKey ] ){
				var mParams = window.g_ajaxparams,
					i = 0, j, march,
					status = [],
					mLength = attack.marching.length;
				if( mLength == 0 ){
					return;
				}

				var checkMarch = function(i, attempts){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared forceMarchUpdate checkMarch function');
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
								timeout: 10000,
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
										window.attack_recall(attack.marching[i], 1, attack.cityKey.replace(/city/, ''));
									}

									window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].kocfiaUpdated = true;

									i += 1;
									if( i < mLength ){
										return checkMarch(i, 3);
									} else {
										for( var j = 0; j < status.length; j += 1 ){
											if( !status[j] ) return window.setTimeout(function(){ Shared.forceMarchUpdate( attack ); }, 10000);
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
												if( !status[j] ) return setTimeout(function(){ Shared.forceMarchUpdate( attack ); }, 10000);
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
											if( !status[j] ) return setTimeout(function(){ Shared.forceMarchUpdate( attack ); }, 10000);
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
								if( !status[j] ) return setTimeout(function(){ Shared.forceMarchUpdate( attack ); }, 10000);
							}
						}
					}
				}

				checkMarch(i, 3);
			}
		};

		Shared.recallWaves = function( attack ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared recallWaves function', attack);
			if( attack.marching.length ){
				//recall previous waves
				var k, length = attack.marching.length;
				for( k = 0; k < length; k += 1 ){
					window.attack_recall( attack.marching[k], 2, attack.cityKey );
				}
			}
		};

		Shared.getRallyPointSlots = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared barracksCount function');

			var slots = Shared.buildingHighestLevel(cityKey, 12),
				a, attack;
			if( slots == 12 ) slots -= 1; //eleven armies at level 12
			for( a in window.seed.queue_atkp[cityKey] ){
				if( window.seed.queue_atkp[cityKey].hasOwnProperty(a) ){
					attack = window.seed.queue_atkp[cityKey][a];

					// cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN 9
					// cm.BOT_STATUS.BOT_MARCH_STOPPED 3
					//stopped barbarian camp
					if( attack.marchType == 9 && attack.marchStatus == 3 ) continue;

					// cm.MARCH_TYPES.MARCH_TYPE_ATTACK 4
					// cm.MARCH_TYPES.MARCH_TYPE_SCOUT 3
					// cm.MARCH_STATUS.MARCH_STATUS_UNKNOWN 5
					// cm.MARCH_STATUS.MARCH_STATUS_INACTIVE 0
					//attack or scout march
					if( (attack.marchType == 4 || attack.marchType == 4) && (attack.marchStatus == 0 || attack.marchStatus == 5) ) continue;

					slots -= 1;
				}
			}

			return slots;
		};

	/* FACEBOOK WALL POST POPUP */
		KOCFIA.fbWallPopup = {
			options: {
				active: 0,
				cancel: 0,
				post: 0,
			}
		};

		KOCFIA.fbWallPopup.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('fbWallPopup') ) console.info('KOCFIA fbWallPopup confPanel function');
			var code = '<h3>Popup facebook pour poster sur le mur</h3>';
			code += '<div>';
			code += '<p>PAS FINI</p>';
			code += Shared.generateCheckbox('fbWallPopup', 'active', 'Activer le module', KOCFIA.conf.fbWallPopup.active);
			code += Shared.generateRadio('fbWallPopup', 'action', ['cancel', 'post'], ['annulation automatique', 'publication automatique'], [KOCFIA.conf.fbWallPopup.cancel, KOCFIA.conf.fbWallPopup.post]);
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.fbWallPopup.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('fbWallPopup') ) console.info('kocfia fbWallPopup on function');
		};

		KOCFIA.fbWallPopup.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('fbWallPopup') ) console.info('kocfia fbWallPopup off function');
		};

	/* CHAT */
		KOCFIA.chat = {
			options: {
				active: 1,
				moveable: 1,
				cleanHelp: 1,
				onRight: 1,
				position: {top: 0, left: 0},
				size: {width: false, height: false},
				onRightPosition: {top: '-562px', left: '761px'},
				highlightLeaders: 0,
				highlightFriends: 0,
				highlightFoes: 0,
			},
			stored: ['friends_list', 'foes_list'],
			friendsList: [],
			foesList: [],
			leaders: {},
		};

		KOCFIA.chat.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat confPanel function');
			var code = '<h3>Chat</h3>';
				code += '<div>';
				code += Shared.generateCheckbox('chat', 'active', 'Activer le module', KOCFIA.conf.chat.active);
				code += Shared.generateCheckbox('chat', 'moveable', 'Chat déplacable et redimensionnable', KOCFIA.conf.chat.moveable);
				code += Shared.generateCheckbox('chat', 'cleanHelp', 'Aider automiquement et masquer les demandes', KOCFIA.conf.chat.cleanHelp);
				code += Shared.generateButton('chat', 'onRight', 'Repositionner le chat à droite');
				code += Shared.generateCheckbox('chat', 'highlightLeaders', 'Changer la couleur des messages de la chancellerie (chats Général et Alliance)', KOCFIA.conf.chat.highlightLeaders);
				code += Shared.generateButton('chat', 'getLeadersList', 'Raffraîchir la liste des joueurs de la chancellerie');
				code += Shared.generateCheckbox('chat', 'highlightFriends', 'Changer la couleur des messages des amis (chat Général)', KOCFIA.conf.chat.highlightFriends);
				code += Shared.generateCheckbox('chat', 'highlightFoes', 'Changer la couleur des messages des ennemis (chat Général)', KOCFIA.conf.chat.highlightFoes);
				code += Shared.generateButton('chat', 'cleanFriendsList', 'Vider la liste d\'amis');
				code += Shared.generateButton('chat', 'cleanFoesList', 'Vider la liste d\'ennemis');
				code += '</div>';

			$section.append( code );
		};

		KOCFIA.chat.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat modPanel function');
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
				code += '<ul class="kocfia-chat-list" rel="friends"></ul>';
				code += '<h3>Liste d\'ennemis</h3>';
				code += '<p><label for="kocfia-foe">Joueur : </label>';
				code += '<input type="text" name="kocfia-foe" id="kocfia-foe" />';
				code += '<button rel="foes">Ajouter</button></p>';
				code += '<ul class="kocfia-chat-list" rel="foes"></ul>';

			$section.append( code )
				.on('click', 'button', function(e){
					e.preventDefault();

					var $this = $(this),
						rel = $this.attr('rel'),
						list = rel + 'List',
						$input = $this.parent().find('input'),
						name = $input.val(),
						$ul = KOCFIA.chat.$lists.filter('[rel='+ rel +']');

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

					$input.val('');
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

			KOCFIA.chat.$lists = $('#kocfia-chat').find('.kocfia-chat-list')
		};

		KOCFIA.chat.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat on function');

			//get leader boards
			KOCFIA.chat.getLeadersList();

			//dupplicate input
				KOCFIA.chat.$chatInput.clone().attr('id', 'mod_comm_input_clone')
					.appendTo( KOCFIA.chat.$chat.find('.postaction') );
				KOCFIA.chat.$chatInputClone = $('#mod_comm_input_clone');

				KOCFIA.chat.$chat.find('.postaction').find('.button20')
					.removeAttr('onclick')
					.click(function(e){
						e.preventDefault();
						e.stopPropagation();
						KOCFIA.chat.$chatInput.val( KOCFIA.chat.$chatInputClone.val() );
						window.Chat.sendChat();
						KOCFIA.chat.$chatInputClone.val('');
					});

				KOCFIA.chat.$chat.prepend('<div class="kocfia-chat-top-wrapper">').append('<div class="kocfia-chat-bottom">');
				KOCFIA.chat.$chat.find('.kocfia-merlin-small, .mod_comm_mmb, .comm_tabs').appendTo( KOCFIA.chat.$chat.find('.kocfia-chat-top-wrapper') );

				KOCFIA.chat.$chat.find('.comm_body').append('<div class="kocfia-chat-form-wrapper">');
				KOCFIA.chat.$chat.find('.comm_body').find('.mod_comm_forum, form').appendTo( KOCFIA.chat.$chat.find('.kocfia-chat-form-wrapper') );

				KOCFIA.chat.$chat.find('.comm_body').append('<div class="kocfia-chat-list-wrapper">');
				KOCFIA.chat.$chat.find('.chatlist').appendTo( KOCFIA.chat.$chat.find('.kocfia-chat-list-wrapper') );

				KOCFIA.chat.$formWrapper = KOCFIA.chat.$chat.find('.kocfia-chat-form-wrapper');
				KOCFIA.chat.$listWrapper = KOCFIA.chat.$chat.find('.kocfia-chat-list-wrapper');

				//redefine the whisper function to use the cloned input
				window.Chat.whisper = function(to){
					if( typeof to === "string" && to.length != 0 ){
						var text = KOCFIA.chat.$chatInputClone.val().strip();
						if( text.charAt(0) == "@" ) text = "";

						KOCFIA.chat.$chatInputClone.val("@" + to + " " + text).focus();
					}
				};

			//clean help
				if( KOCFIA.conf.chat.cleanHelp ){
					KOCFIA.chat.cleanHelpOn();
				} else {
					var hideChatRules = function(){
						var tmp = KOCFIA.chat.$chatAlliance.find('.noalliance');
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

			//update lists in panel
				var friends = '', foes = '',
					i, length = KOCFIA.chat.friendsList.length;
				for( i = 0; i < length; i += 1 ){
					friends += '<li><a href="#">'+ KOCFIA.chat.friendsList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
				}

				length = KOCFIA.chat.foesList.length;
				for( i = 0; i < length; i += 1 ){
					foes += '<li><a href="#">'+ KOCFIA.chat.foesList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
				}

				KOCFIA.chat.$lists.filter('[rel=friends]').empty().append( friends );
				KOCFIA.chat.$lists.filter('[rel=foes]').empty().append( foes );

			//activate highlight
				if( KOCFIA.conf.chat.highlightFriends ){
					KOCFIA.chat.highlightFriendsOn();
				}

				if( KOCFIA.conf.chat.highlightFoes ){
					KOCFIA.chat.highlightFoesOn();
				}

			//placement
				if( KOCFIA.conf.chat.moveable ){
					KOCFIA.chat.moveableOn();
				}

				if( KOCFIA.conf.chat.onRight && KOCFIA.conf.chat.position.top == 0 ){
					KOCFIA.chat.onRight();
				}
		};

		KOCFIA.chat.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat off function');
			KOCFIA.chat.moveableOff();
			KOCFIA.chat.cleanHelpOff();
			KOCFIA.chat.highlightLeadersOff();
			KOCFIA.chat.highlightFriendsOff();
			KOCFIA.chat.highlightFoesOff();
		};

		/* moveable */
		KOCFIA.chat.moveableOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat moveableOn function');
			$head.append( $('<style id="kocfia-chat-moveable">').html(chatMoveableCss) );

			KOCFIA.chat.$chat
				.draggable({
					helper: 'original',
					containment: 'body',
					handle: '.kocfia-chat-top-wrapper, .kocfia-chat-form-wrapper, .kocfia-chat-bottom',
					scroll: true,
					distance: 20,
					stop: function(event, ui){
						KOCFIA.conf.chat.position = ui.position;
						Shared.storeConf();
					}
				})
				.resizable({
					minWidth: 250,
					minHeight: 150,
					resize: function(event, ui){
						KOCFIA.chat.$listWrapper
							.css('height', ui.size.height - 25 - KOCFIA.chat.$formWrapper.height());

						KOCFIA.chat.$chatInput
							.width(function(){ return ui.size.width - 65; })
							.siblings('.button20').css('left', function(){ return ui.size.width - 55; });
					},
					stop: function(event, ui){
						KOCFIA.conf.chat.size = ui.size;
						Shared.storeConf();
					}
				})
				.css({
					top: KOCFIA.conf.chat.position.top,
					left: KOCFIA.conf.chat.position.left,
				});

			if( KOCFIA.conf.chat.size.width ){
				KOCFIA.chat.$chat.css('width', KOCFIA.conf.chat.size.width);

				KOCFIA.chat.$chatInput.width(function(){ return KOCFIA.conf.chat.size.width - 65; })
					.siblings('.button20').css('left', function(){ return KOCFIA.conf.chat.size.width - 55; });
			}

			if( KOCFIA.conf.chat.size.height ) KOCFIA.chat.$chat.css('height', KOCFIA.conf.chat.size.height);
			else KOCFIA.chat.$chat.css('height', KOCFIA.chat.$chat.parent().css('height')); //original height

			KOCFIA.chat.$listWrapper
				.css('height', KOCFIA.chat.$chat.height() - 25 - KOCFIA.chat.$formWrapper.height());

			var $jeu = KOCFIA.chat.$chat.find('.mod_comm_mmb');
			$jeu.data('ori', $jeu.html())
				.removeClass('mod_comm_mmb').addClass('kocfia-merlin-small').html('Boîtes Magiques');
		};

		KOCFIA.chat.moveableOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat moveableOff function');
			$('#kocfia-chat-moveable').remove();
			KOCFIA.chat.$chat[0].style = '';
			KOCFIA.chat.$chat
				.draggable('destroy')
				.resizable('destroy')
				.css({top: 0, left: 0});
			KOCFIA.chat.$chatInput.css('width', '')
				.siblings('.button20').css('left', '');

			KOCFIA.chat.$listWrapper.css('height', '');

			var $jeu = KOCFIA.chat.$chat.find('.kocfia-merlin-small');
				$jeu.removeClass('kocfia-merlin-small').addClass('mod_comm_mmb').html( $jeu.data('ori') ).removeData('ori');
		};

		KOCFIA.chat.onRight = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat onRight function');
			KOCFIA.conf.chat.position = {
				top: KOCFIA.conf.chat.onRightPosition.top,
				left: KOCFIA.conf.chat.onRightPosition.left
			};
			KOCFIA.chat.$chat.css(KOCFIA.conf.chat.position);
			Shared.storeConf();
		};

		/* cleanHelp */
		KOCFIA.chat.cleanHelpOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat cleanHelpOn function');
			$head.append( $('<style id="kocfia-chat-help">').html(chatHelpCss) );
		};

		KOCFIA.chat.cleanHelpOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat cleanHelpOff function');
			$('#kocfia-chat-help').remove();
		};

		KOCFIA.chat.cleanHelp = function( nbMsg ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat cleanHelp function');
			//suppression du superflu (demande aide et son résultat)
			if( KOCFIA.conf.chat.active && KOCFIA.conf.chat.cleanHelp ){
				window.setTimeout(function(){
					var $messages = KOCFIA.chat.$chatAlliance.find('.chatwrap');
					if( nbMsg > 0 ){
						$messages.filter(':lt('+ nbMsg +')');
					}
					$messages
						.find('.tx')
						.find('a').each(function(){
							var $helpLink = $(this);
							if( $helpLink.attr('onclick') && $helpLink.attr('onclick').indexOf('claimAllianceChatHelp') == 0 ){
								$helpLink
									.click() //clic auto sur les demandes d'aides
									.closest('.chatwrap').remove(); //et suppression de la demande d'aide
								//suppression du résultat -> masqué en css .noalliance
							}
						});
				}, 250);
			}
		};

		/* highlight leaders */
		KOCFIA.chat.highlightLeaders = function( $targetChat, nbMsg ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('kocfia chat highlightLeaders function');
			if( $targetChat && $targetChat.length ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightLeaders function', $targetChat, nbMsg);
				var $messages = $targetChat.find('.chatwrap');
				if( nbMsg > 0 ){
					$messages.filter(':lt('+ nbMsg +')');
				}

				$messages.find('.nm').each(function(){
					var $nm = $(this),
						name = $nm.text();
					if( KOCFIA.chat.leaders[ name ] ){
						$nm.closest('.chatwrap').removeClass('chancellor vice_chancellor officer').addClass( KOCFIA.chat.leaders[ name ] );
					}
				});
			}
		};

		KOCFIA.chat.getLeadersList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('kocfia chat getLeadersList function');
			//ajax call to get the leaders, highlighting will be done in the ajax response listener
			window.getDirectoryTabAllianceMembers();
		};

		KOCFIA.chat.highlightLeadersOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightLeadersOn function');
			KOCFIA.chat.getLeadersList();

			$head.append( $('<style id="kocfia-chat-highlight-leaders">').html(chatHighlightLeadersCss) );
		};

		KOCFIA.chat.highlightLeadersOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightLeadersOff function');
			$('#kocfia-chat-highlight-leaders').remove();
			KOCFIA.chat.leaders = {};
		};

		/* highlight friends */
		KOCFIA.chat.highlightFriendsOn = function( highlight ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightFriendsOn function');
			$head.append( $('<style id="kocfia-chat-highlight-friends">').html(chatHighlightFriendsCss) );
			KOCFIA.chat.highlightFriendsAndFoes(0);
		};

		KOCFIA.chat.highlightFriendsOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightFriendsOff function');
			$('#kocfia-chat-highlight-friends').remove();
		};

		KOCFIA.chat.storeFriendsList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA storeFriendsList function');
			localStorage.setObject('kocfia_chat_friends_list_' + KOCFIA.storeUniqueId, KOCFIA.chat.friendsList);
		};

		KOCFIA.chat.cleanFriendsList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA cleanFriendsList function');
			KOCFIA.chat.friendsList = [];
			localStorage.setObject('kocfia_chat_friends_list_' + KOCFIA.storeUniqueId, '');
			$('#kocfia-chat').find('ul').filter('[rel=friends]').empty();
		};

		/* highlight foes */
		KOCFIA.chat.highlightFoesOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightFoesOn function');
			$head.append( $('<style id="kocfia-chat-highlight-foes">').html(chatHighlightFoesCss) );
			KOCFIA.chat.highlightFriendsAndFoes(0);
		};

		KOCFIA.chat.highlightFoesOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightFoesOff function');
			$('#kocfia-chat-highlight-foes').remove();
		};

		KOCFIA.chat.storeFoesList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA storeFoesList function');
			localStorage.setObject('kocfia_chat_foes_list_' + KOCFIA.storeUniqueId, KOCFIA.chat.foesList);
		};

		KOCFIA.chat.cleanFoesList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA cleanFoesList function');
			KOCFIA.chat.foesList = [];
			localStorage.setObject('kocfia_chat_foes_list_' + KOCFIA.storeUniqueId, '');
			$('#kocfia-chat').find('ul').filter('[rel=foes]').empty();
		};

		/* highlight friends and foes */
		KOCFIA.chat.highlightFriendsAndFoes = function( nbMsg ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightFriendsAndFoes function', nbMsg);
			if( KOCFIA.hasOwnProperty('$chatGeneral') ){
				var $messages = KOCFIA.chat.$chatGeneral.find('.chatwrap'),
					highlightFriends = KOCFIA.conf.chat.highlightFriends && KOCFIA.chat.friendsList.length,
					highlightFoes = KOCFIA.conf.chat.highlightFoes && KOCFIA.chat.foesList.length;

				if( nbMsg > 0 ){
					$messages.filter(':lt('+ nbMsg +')');
				}

				$messages.removeClass('friend foe').find('.nm').each(function(){
					var $nm = $(this),
						name = $nm.text().replace(/^(Lady |Lord )/, '');
					if( highlightFriends && $.inArray(name, KOCFIA.chat.friendsList) > -1 ){
						$nm.closest('.chatwrap').addClass('friend');
					}
					if( highlightFoes && $.inArray(name, KOCFIA.chat.foesList) > -1 ){
						$nm.closest('.chatwrap').addClass('foe');
					}
				});
			}
		};

	/* OVERVIEW */
		KOCFIA.overview = {
			options: {
				active: 1,
				position: {top: 100, left: 100},
				size: {width: 500, height: 300},
				replace: 0,
				moveable: 1,
				visible: 0,
				parts_visible: {
					population: 1,
					troops: 1,
					troops_barbarian: 1,
					defenses: 1,
					resources: 1,
					resources_cap: 1,
					resources_production_detail: 1,
					resources_production_barbarian: 1,
					resources_consumption: 1,
					resources_production_total: 1,
					resources_autonomy: 1,
				},
			},
			updating: false,
			parts: {
				population: 'population',
				troops: 'unités',
				troops_barbarian: 'unités en camps barbares',
				defenses: 'fortifications',
				resources: 'ressources',
				resources_cap: 'plafond',
				resources_production_detail: 'détail production',
				resources_production_barbarian: 'production camps barbares',
				resources_consumption: 'dépense',
				resources_production_total: 'total production',
				resources_autonomy: 'autonomie',
			}
		};

		KOCFIA.overview.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview confPanel function');
			var code = '<h3>Vue globale</h3>';
				code += '<div>';
				code += Shared.generateCheckbox('overview', 'active', 'Activer le module', KOCFIA.conf.overview.active);
				code += Shared.generateRadio('overview', 'action', ['replace', 'moveable'], ['Remplace le dessous du jeu (ne pas oublier de mettre le chat à droite)', 'Vue globale déplacable et redimensionnable'], [KOCFIA.conf.overview.replace, KOCFIA.conf.overview.moveable]);
				code += Shared.generateButton('overview', 'resetPlacement', 'Remise à zéro de la position');
				code += Shared.generateButton('overview', 'resetDimensions', 'Remise à zéro des dimensions');
				code += '</div>';

			$section.append( code )
				.on('click', '#overview-replace, #overview-moveable', function(){
					$(this).closest('div').find('button').toggle( $(this).is('#overview-moveable') );
				})
				.find('#overview-replace').closest('div').find('button').toggle( KOCFIA.conf.overview.moveable );
		};

		KOCFIA.overview.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview on function');

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
						KOCFIA.overview.$tbodyTrs.find('tr').each(function(){
							$(this).find('td').eq(col).addClass('highlight');
						});
					})
					.on('mouseleave', 'th', function(){
						var col = KOCFIA.overview.$headersThs.index( $(this).removeClass('highlight') );
						KOCFIA.overview.$tbodyTrs.find('tr').each(function(){
							$(this).find('td').eq(col).removeClass('highlight');
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
								$details.find('input').each(function(){
									var $input = $(this),
										detail = $input.val();

									$input.prop('checked', false);
									KOCFIA.overview.$tbodyTrs.filter( '.' + detail ).hide();
									KOCFIA.conf.overview.parts_visible[ detail ] = false;
								});
							}
						}

						KOCFIA.conf.overview.parts_visible[ part ] = opened;

						Shared.storeConf();
					});

			KOCFIA.overview.$div
				.find('.details-toggle').each(function(){
					var $detail = $(this);
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
						Shared.storeConf();
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
						if( part.indexOf('_') > -1 ) $trs.filter('.toggle').hide();
					}
				}
			}

			window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 1000);

			if( KOCFIA.conf.overview.replace ){
				KOCFIA.overview.replaceOn();
			} else {
				KOCFIA.overview.moveableOn();
			}
		};

		KOCFIA.overview.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview off function');
			$('#kocfia-overview-css').remove();
			KOCFIA.overview.$div.remove();
			KOCFIA.overview.$div = null;
		};

		KOCFIA.overview.updateFromSeed = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview updateFromSeed function');
			if( !KOCFIA.conf.overview.active ) return;

			if( KOCFIA.overview.updating ) return;
			KOCFIA.overview.updating = true;

			if( !KOCFIA.overview.hasOwnProperty('$tbodyTrs') ) return; //overview panel not initialized

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
				$defensesTrs = KOCFIA.overview.$tbodyTrs.filter('.defenses').filter(':not(:first)'),
				i, j, k, m, b, r, n, s,
				length = KOCFIA.citiesKey.length,
				subLength, population, hapiness,
				cityKey, stats, seed, rowsLength,
				barbariansRes, barbariansTroops,
				marches, marche, populationModifier,
				time, factor, bonusG, bonusW, fort,
				line, type, $tds, $td, stock, stockInSeed,
				take, substract, bonusK, brLength,
				base, total, nbLine, d, timestamp,
				keys = ['gold', 'food', 'wood', 'stone', 'ore'],
				guardianBase = {gold: 0, food: 0, wood: 0, stone: 0, ore: 0};
			for( i = 0; i < length; i += 1 ){
				cityKey = KOCFIA.citiesKey[i];
				stats = window.seed.citystats[ cityKey ];
				seed = {
					pop: stats.pop,
					gold: stats.gold,
					res: window.seed.resources[ cityKey ],
					units: window.seed.units[ cityKey ],
					guardian: window.seed.guardian[ cityKey ],
					knights: window.seed.knights[ cityKey ],
					wilds: window.seed.wilderness[ cityKey ],
					fortifications: window.seed.fortifications[ cityKey ]
				};

				//barbarian camps
					barbariansRes = [];
					barbariansTroops = [];
					marches = window.seed.queue_atkp[ cityKey ];
					if( marches ){
						for( m in marches ){
							if( marches.hasOwnProperty(m) ){
								marche = marches[m];
								//cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN: 9
								//cm.BOT_STATUS.BOT_MARCH_MARCHING: 1,
								//cm.BOT_STATUS.BOT_MARCH_RETURNING: 2,
								//cm.BOT_STATUS.BOT_MARCH_RESTING: 7,
								if( marche.marchType == 9 ){
									//get attack duration (go, fight, return, unload, repeat)
									time = parseFloat(marche.returnUnixTime) - parseFloat(marche.marchUnixTime) + (parseFloat(marche.restPeriod) / 60);

									//how many attacks in one hour
									factor = 3600 / time;

									//get resources in one hour
									barbarianRes = [ factor * parseFloat(marche.gold), factor * parseFloat(marche.resource1), factor * parseFloat(marche.resource2), factor * parseFloat(marche.resource3), factor * parseFloat(marche.resource4) ];

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
					line = 0;
					subLength = KOCFIA.population.length;
					for( j = 0; j < subLength; j += 1 ){
						var type = KOCFIA.population[j];
						if( type.rows ){
							var rowsLength = type.rows;
							for( k = 0; k < rowsLength; k += 1 ){
								inSeed = KOCFIA.inSeed.population[ type.name[k] ];
								$tds = $popTrs.eq(line).find('td');
								$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
								n = null;
								if( inSeed ){
									n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
								} else if( type.name[k] == 'availablePopulation' ){
									take = KOCFIA.inSeed.population[ type.name[0] ];
									substract = KOCFIA.inSeed.population[ type.name[2] ];

									n = parseFloat( seed[ take.var ][ take.index ] ) - parseFloat( seed[ substract.var ][ substract.index ] );
								}

								if( n != null ){
									$td.html( Shared.format( n ) )
										.attr('title', Shared.readable( n ))
										.data('ori', n);
								} else {
									$td.html('&nbsp;')
										.attr('title', Shared.readable( n ))
										.data('ori', 0);
								}

								line += 1;
							}

						} else {
							inSeed = KOCFIA.inSeed.population[ type.name ];
							$tds = $popTrs.eq(line).find('td');
							$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
							if( inSeed ){
								n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );

								$td.html( Shared.format( n ) )
									.attr('title', Shared.readable( n ))
									.data('ori', n);

							} else {
								$td.html('&nbsp;')
									.attr('title', Shared.readable( n ))
									.data('ori', 0);
							}

							line += 1;
						}
					}

				//resources
					subLength = KOCFIA.resources.length;
					for( j = 0; j < subLength; j += 1 ){
						type = KOCFIA.resources[j];
						inSeed = KOCFIA.inSeed.resources[ type.name ];
						$tds = $resTrs.eq(j).find('td');
						$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
						if( inSeed ){
							if( inSeed.hasOwnProperty('type') ){
								n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
							} else {
								n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
							}

							if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

							$td.html( Shared.format( n ) )
								.attr('title', Shared.readable(n))
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
						type = KOCFIA.resources_cap[j];
						inSeed = KOCFIA.inSeed.resources_cap[ type.name ];
						$tds = $resCapTrs.eq(j).find('td');
						$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
						if( inSeed ){
							n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
							if( n > 0 ) n = n / 3600;

							$td.html( Shared.format( n ) )
								.attr('title', Shared.readable(n))
								.data('ori', n);
						} else {
							$td.html('&nbsp;')
								.attr('title', '')
								.data('ori', 0);
						}
					}

				//resources production detail
					base = [];
					total = [0, 0, 0, 0, 0];
					line = 0;
					nbLine = KOCFIA.resources_production_detail.length / 4;
					d = new Date();
					timestamp = parseFloat(d.getTime() / 1000);

					//guardian bonus
						guardianBonus = ( seed.guardian ? seed.guardian[0] : {} );
						if( guardianBonus.hasOwnProperty('type') && guardianBonus.type == -1 ) guardian.type = 'wood';

						bonusG = $.extend({}, guardianBase, guardianBonus);

					//knight bonus
						bonusK = 0;
						if( seed.knights ){
							k = seed.knights[ "knt" + window.seed.leaders[cityKey].resourcefulnessKnightId ];
							if( k ){
								bonusK = parseFloat(k.resourcefulness);
								if( k.resourcefulnessBoostExpireUnixtime > timestamp ){
									bonusK *= 1.25;
								}
							}
						}

					//wild bonus
						bonusW = [0, 0, 0, 0, 0];
						if( seed.wilds ){
							subLength = seed.wilds.length;
							for( j = 0; j < subLength; j += 1 ){
								b = seed.wilds[ j ].tileType[0];
								bonusW[ b ] += parseInt( seed.wilds[ j ].tileLevel, 10);
							}
						}

					//population modifier
						populationModifier = 1;
						population = parseFloat(seed.pop[0]);
						hapiness = parseFloat(seed.pop[3]);
						if( hapiness > population ){
							populationModifier = population / hapiness;
						}

					subLength = KOCFIA.resources_production_detail.length;
					for( j = 0; j < subLength; j += 1 ){
						type = KOCFIA.resources_production_detail[j];
						r = j + 1; //no gold
						if( type.rows ){
							rowsLength = type.rows;
							for( k = 0; k < rowsLength; k += 1 ){
								$tds = $resProdDetailTrs.eq(line).find('td');
								$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
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
									$td.html( Shared.format( n ) )
										.attr('title', Shared.readable( n ))
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
						$tds = $resProdBarbarianTrs.eq(j).find('td');
						$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
						n = 0;
						if( barbariansRes.length ){
							brLength = barbariansRes.length;
							for( k = 0; k < brLength; k += 1 ){
								n += barbariansRes[k][j];
							}
							total[j] += n;

							$td.html( Shared.format( n ) )
								.attr('title', Shared.readable( n ))
								.data('ori', n );
						} else {
							$td.html( '&nbsp;' )
								.attr('title', '')
								.data('ori', '0');
						}
					}

				//resources consumption
					line = 0;
					subLength = KOCFIA.resources_consumption.length;
					for( j = 0; j < subLength; j += 1 ){
						type = KOCFIA.resources_consumption[j];
						if( type.rows ){
							rowsLength = type.rows;
							for( k = 0; k < rowsLength; k += 1 ){
								$tds = $resConsoTrs.eq(line).find('td');
								$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
								n = null;
								//'dépense', 'formation'
								switch( type.label[k] ){
									case 'dépense':
										inSeed = KOCFIA.inSeed.resources_consumption[ type.name ];
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
									$td.html( Shared.format( n ) )
										.attr('title', Shared.readable( n ))
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
						$tds = $resProdTotalTrs.eq(j).find('td');
						$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );

						if( total[j] ){
							total[j] += 100;
							$td.html( Shared.format( total[j] ) )
								.attr('title', Shared.readable( total[j] ))
								.data('ori', total[j] );
						} else {
							$td.html('&nbsp;');
						}
					}

				//resources autonomy
					subLength = KOCFIA.resources_autonomy.length;
					for( j = 0; j < subLength; j += 1 ){
						stock = KOCFIA.resources[j];
						stockInSeed = KOCFIA.inSeed.resources[ stock.name ];
						$tds = $resAutonomyTrs.eq(j).find('td');
						$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
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
								$td.html( Shared.readableDuration( n ) );
							}
						} else {
							$td.html('-');
						}
					}

				//troops
					subLength = KOCFIA.troops.length;
					for( j = 0; j < subLength; j += 1 ){
						type = KOCFIA.troops[j];
						$tds = $troopsTrs.eq(j).find('td');
						$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
						n = null;

						if( seed.units.hasOwnProperty(type.name) ){
							n = parseFloat( seed.units[ type.name ] );
						}

						if( n != null ){
							$td.html( Shared.format( n ) )
								.attr('title', Shared.readable(n))
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
						type = KOCFIA.troops_barbarian[j];
						$tds = $troopsBarbarianTrs.eq(j).find('td');
						$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
						n = null;

						if( barbariansTroops.length && barbariansTroops[j] ){
							n = parseFloat( barbariansTroops[j] );
						}

						if( n != null ){
							$td.html( Shared.format( n ) )
								.attr('title', Shared.readable(n))
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
						fort = KOCFIA.defenses[j];
						$tds = $defensesTrs.eq( j ).find('td');
						$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
						n = null;

						if( seed.fortifications.hasOwnProperty( fort.name ) ){
							n = parseFloat( seed.fortifications[ fort.name ] );
						}

						if( n != null ){
							$td.html( Shared.format( n ) )
								.attr('title', Shared.readable(n))
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
		};

		KOCFIA.overview.sums = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview sums function');
			KOCFIA.overview.$tbodyTrs.each(function(){
				var $tr = $(this);
				if( !$tr.hasClass('resources_autonomy') ){
					var sum = 0,
						$tds = $tr.find('td');
					if( $tds.length ){
						var $sumTd = $tds.filter('.sum'),
							col = $tds.index( $sumTd );
						$tds.filter(':gt('+ col +')').each(function(){
							var $td = $(this);
							if( $td.data('ori') ) sum += parseFloat( $td.data('ori') );
						});

						if( sum == Number.NaN ){
							$sumTd.html( '-' )
								.attr('title', '');
						} else {
							$sumTd.html( Shared.format( sum ) )
								.attr('title', Shared.readable(sum));
						}
					}
				}
			});
		};

		KOCFIA.overview.getCityColWidth = function( tableWidth ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('kocfia overview getCityColWidth function');
			var cityColWidth = tableWidth - 25;
			cityColWidth -= KOCFIA.overview.$cityTds.eq(0).width();
			cityColWidth -= KOCFIA.overview.$cityTds.eq(1).width();
			cityColWidth -= KOCFIA.overview.$cityTds.eq(2).width();
			cityColWidth /= KOCFIA.citiesKey.length;

			return Math.floor(cityColWidth);
		};

		KOCFIA.overview.calcInnerSizes = function( size ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('kocfia overview calcInnerSizes function');
			KOCFIA.overview.$cityTds.filter(':gt(2)').css('width', '');

			var tableH = size.height - 30 - (KOCFIA.overview.movable ? KOCFIA.overview.$div.find('h3').outerHeight(true) : 0);
			KOCFIA.overview.$wrap.css('height', tableH);
			KOCFIA.overview.$tbody.css('height', tableH - KOCFIA.overview.$header.height());

			KOCFIA.overview.$cityTds.filter(':gt(2)').css('width', KOCFIA.overview.getCityColWidth( size.width ) + 'px');

			KOCFIA.overview.$headersThs.filter(':gt(2)').each(function(){
				$(this).css('width', KOCFIA.overview.$cityTds.eq(i + 3).css('width'));
			});
		};

		/* moveable */
			KOCFIA.overview.moveableOn = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview moveableOn function');

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
							Shared.storeConf();
						}
					})
					.resizable({
						minWidth: 250,
						minHeight: 250,
						resize: function(event, ui){
							KOCFIA.overview.calcInnerSizes( ui.size );
						},
						stop: function(event, ui){
							KOCFIA.conf.overview.size = ui.size;
							Shared.storeConf();
						}
					})
					.css({
						top: KOCFIA.conf.overview.position.top,
						left: KOCFIA.conf.overview.position.left,
						width: KOCFIA.conf.overview.size.width,
						height: KOCFIA.conf.overview.size.height,
					})
					.on('click', '.ui-icon-close', function(e){
						e.preventDefault();
						KOCFIA.overview.$div.hide();
						KOCFIA.conf.overview.visible = 0;
						Shared.storeConf();
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
					Shared.storeConf();
				});

				KOCFIA.$buttons.append($overviewToggle);
			};

			KOCFIA.overview.moveableOff = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview moveableOff function');
				KOCFIA.overview.$div
					.draggable('destroy')
					.resizable('destroy')
					.find('h3, .ui-icon-close').remove();
			};

			KOCFIA.overview.resetPlacement = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview resetPlacement function');
				if( KOCFIA.conf.overview.moveable ){
					KOCFIA.overview.$div.css( KOCFIA.overview.options.position );
					KOCFIA.conf.overview.position = KOCFIA.overview.options.position;
					Shared.storeConf();
				}
			};

			KOCFIA.overview.resetDimensions = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview resetDimensions function');
				if( KOCFIA.conf.overview.moveable ){
					KOCFIA.overview.$div.css( KOCFIA.overview.options.size );
					KOCFIA.conf.overview.size = KOCFIA.overview.options.size;
					Shared.storeConf();
				}
			};

		/* replace */
			KOCFIA.overview.replaceOn = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview replaceOn function');

				var $b = $('#kocmain_bottom'),
					$f = $b.siblings('.panel_friendlist');
				var p = $b.offset();
				var h = $b.outerHeight() + $f.outerHeight(),
					w = $b.outerWidth();

				KOCFIA.overview.$div.css({
					height: $b.outerHeight() + $f.outerHeight(),
					width: $b.outerWidth() - 2, /* borders */
					top: p.top + 2, /* borders */
					left: p.left,
				});

				//$b.hide();
				$f.hide();
				KOCFIA.overview.$div.show();
				$b.find('.mod_comm').css('display', 'block');

				KOCFIA.overview.calcInnerSizes({height: h, width: w});

				$('#kocfia-overview-toggle').remove();
			};

			KOCFIA.overview.replaceOff = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview replaceOff function');

				$('#kocmain_bottom').show().siblings('.panel_fiendlist').show();
			};

	/* AutoAttack shared base */
		KOCFIA.autoAttack = {
			module: 'autoAttack',
			options: {
				active: 1,
				automatic: 0,
			},
			stored: ['attacks'],
			attacks: {}, //by city id and attack id
		};

		KOCFIA.autoAttack.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel[ this.module ] +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox(this.module, 'active', 'Activer le module', KOCFIA.conf[ this.module ].active);
			code += Shared.generateCheckbox(this.module, 'automatic', 'Lancer les '+ (this.module == 'scout' ? 'éclairages' : 'attaques') +' automatiques', KOCFIA.conf[ this.module ].automatic);
			code += Shared.generateButton(this.module, 'deleteAllPlans', 'Supprimer toutes les '+ (this.module == 'scout' ? 'éclairages' : 'attaques') +' enregistrées');
			if( this.module == 'darkForest' ){
				code += Shared.generateButton(this.module, 'deleteAllCoords', 'Supprimer toutes les coordonnées enregistrées');
			}
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.autoAttack.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' on function');

			if( this.module != 'scout' ){
				var i, length = KOCFIA.citiesKey.length;
				for( i = 0; i < length; i += 1 ){
					KOCFIA[ this.module ].listCityAttacks( KOCFIA.citiesKey[i] );
				}
			} else KOCFIA[ this.module ].listAttacks();

			if( KOCFIA.conf[ this.module ].automatic ){
				KOCFIA[ this.module ].automaticOn();
			}
		};

		KOCFIA.autoAttack.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' off function');

			KOCFIA[ this.module ].automaticOff();
		};

		KOCFIA.autoAttack.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' automaticOn function');
			var module = this.module;

			$('#'+ module +'-panel-automatic').prop('checked', true);

			KOCFIA[ module ].$saved.find('.charge').hide(); //hide manual launch button

			if( module == 'darkForest' ) KOCFIA[ module ].$form.find('.launch').show();

			KOCFIA[ module ].$accordion.accordion('activate', (this.module == 'darkForest' ? 1 : 2));

			//using closure to have a "copy" of the attack plan
			var i = 1;
			var delayedLaunch = function(attack, i){
				var delay = window.setTimeout(function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('launching automatic attack', attack.id, attack.cityKey, attack);
					KOCFIA[ module ].launchAttack( attack );
				}, i * 20000);
			};

			if( this.module == 'wilderness' ){
				//launching stored attacks
				for( var c in KOCFIA[ module ].attacks ){
					if( KOCFIA[ module ].attacks.hasOwnProperty(c) ){
						for( var a in KOCFIA[ module ].attacks[c] ){
							if( KOCFIA[ module ].attacks[c].hasOwnProperty(a) ){
								delayedLaunch(KOCFIA[ module ].attacks[c][a], i);
								i += 1;
							}
						}
					}
				}
			} else if( this.module == 'scout' ){
				//launching stored attacks
				for( var a in KOCFIA[ module ].attacks ){
					if( KOCFIA[ module ].attacks.hasOwnProperty(a) ){
						delayedLaunch(KOCFIA[ module ].attacks[a], i);
						i += 1;
					}
				}
			} else {
				delayedLaunch(KOCFIA[ module ].attacks, i);
			}
		};

		KOCFIA.autoAttack.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' automaticOff function');
			var module = this.module;

			$('#'+ module +'-panel-automatic').prop('checked', false);

			if( module == 'darkForest' ) KOCFIA[ module ].$form.find('.launch').hide();

			//show all manual launch buttons
			KOCFIA[ module ].$saved.find('.charge').show();

			//hide the on going attacks one
			KOCFIA[ module ].$ongoing.find('tr').each(function(){
				var $tr = $(this);
				KOCFIA[ module ].$saved.find('tr').filter('[data-city='+ $tr.data('city') +'][data-attack='+ $tr.data('attack') +']').find('.charge').hide();
			});
		};

		KOCFIA.autoAttack.storeAttacks = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' storeAttacks function');
			localStorage.setObject('kocfia_'+ this.module +'_attacks_' + KOCFIA.storeUniqueId, KOCFIA[ this.module ].attacks);
		};

		KOCFIA.autoAttack.deletePlan = function( attackId, cityKey, save ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' deletePlan function', attackId, cityKey, save);
			delete KOCFIA[ this.module ].attacks[ cityKey ][ attackId ];

			if( save ) KOCFIA[ this.module ].storeAttacks();
		};

		KOCFIA.autoAttack.deleteAllPlans = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' deleteAllPlans function');
			KOCFIA[ this.module ].attacks = {};
			KOCFIA[ this.module ].storeAttacks();

			KOCFIA[ this.module ].$saved.find('tbody').empty();
		};

		KOCFIA.autoAttack.addWaves = function( num, cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' addWaves function', num, cityKey);
			//fill the keep <select> options too

			var $clone = KOCFIA[ this.module ].$waveSkeleton.clone(), i;
			$clone.insertBefore( KOCFIA[ this.module ].$form.find('.keep') );
			for( i = 1; i < num; i += 1 ){
				$clone.clone().insertBefore( KOCFIA[ this.module ].$form.find('.keep') );
			}

			if( this.module == 'wilderness' ){
				var knights = Shared.getAvailableKnights( cityKey ),
					choices = '', i, length = knights.length;
				for( i = 0; i < length; i += 1 ){
					var knight = knights[i];
					choices += '<option value="'+ knight.knightId +'">'+ knight.knightName + '(niveau '+ knight.skillPointsApplied + ', ' + Shared.getKnightStatText( knight ) +')</option>';
				}

				KOCFIA.wilderness.$form.find('.knight-choice').each(function(){
					$(this).append( choices );
				});
			}

			var choices = '';
			for( var u in window.unitcost ){
				if( window.unitcost.hasOwnProperty(u) ){
					var name = window.unitcost[u][0];
					if( name == 'Unité de Ravitaillement' ) name = 'Ravitailleur';
					else if( name == 'Wagon de Ravitaillement' ) name = 'Wagon';
					choices += '<option value="'+ u +'">'+ name + '</option>';
				}
			}

			KOCFIA[ this.module ].$form.find('.unit-choice').each(function(){
				$(this).append( choices );
			});
		};

		KOCFIA.autoAttack.attackInfo = function( attack ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' attackInfo function', attack);
			var city = KOCFIA.cities[ attack.cityKey ];

			var code = '<tr data-city="'+ attack.cityKey +'" data-attack="'+ attack.id +'">';
			code += '<td class="trip">'+ city.label;
			code += '<br />Vers : TS' + attack.targetLevel;
			code += '<br />'+ attack.coords.length +' coordonnée(s)';
			code += '<br />Garder '+ attack.rpSlot +' place'+ (attack.rpSlot > 1 ? 's' : '');
			code += '<div><span class="ui-icon ui-icon-flag charge" title="Lancer"></span>';
			code += '<span class="ui-icon ui-icon-pencil edit" title="Modifier"></span>';
			code += '<span class="ui-icon ui-icon-copy duplicate" title="Dupliquer"></span>';
			code += '<span class="ui-icon ui-icon-trash delete" title="Supprimer"></span>';
			code += '</div></td>';
			code += '<td class="coords"><small>' + Shared.mapLink( attack.coords ) +'</small></td>';
			code += '<td class="waves">';

			var knights = window.seed.knights[ attack.cityKey ],
				j, k, wavesLength = attack.waves.length, unitsLength;
			for( j = 0; j < wavesLength; j += 1 ){
				var wave = attack.waves[j];
				code += '<div class="wave">Vague '+ (j + 1) + '&nbsp;:&nbsp;';
				code += '<div class="knight">chevalier&nbsp;:&nbsp;';
				code += ( wave.knight ? knights[ wave.knight ].knightName + '(niveau '+ knights[ attack.knight ].skillPointsApplied +', '+ Shared.getKnightStatText( knight ) +')' : 'n\'importe' );
				code += '</div>';
				code += '<div class="troops">unités&nbsp;:&nbsp;';

				var unitsCode = '';
				unitsLength = wave.units.length;
				for( k = 0; k < unitsLength; k += 1 ){
					var unit = wave.units[k];
					if( unitsCode.length ) unitsCode += ', ';

					unitsCode += Shared.format( unit.qty );
					unitsCode +=  '<img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_';
					unitsCode += unit.id.replace(/unt/, '') + '_50_s34.jpg" title="'+ window.unitcost[ unit.id ][0] +'">';
				}
				code += unitsCode + '</div></div>';
			}
			code += '</td><td class="keep"><div class="troops">'
			var unitsCode = '', keepLength = attack.keep.length;
			for( j = 0; j < keepLength; j += 1 ){
				var unit = attack.keep[j];
				if( unitsCode.length ) unitsCode += '<br />';

				unitsCode += Shared.format( unit.qty );
				unitsCode += '<img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_';
				unitsCode += unit.id.replace(/unt/, '') + '_50_s34.jpg" title="'+ window.unitcost[ unit.id ][0] +'">';
			}
			code += unitsCode + '</div></td></tr>';

			return code;
		};

		KOCFIA.autoAttack.listCityAttacks = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' listCityAttacks function', cityKey);
			var $tbody = KOCFIA[ this.module ].$saved.find('tbody').filter('[data-city='+ cityKey +']');
			$tbody.empty();

			var attacks = KOCFIA[ this.module ].attacks[ cityKey ],
				code = '';
			if( attacks ){
				for( var a in attacks ){
					if( attacks.hasOwnProperty(a) ){
						code += KOCFIA[ this.module ].attackInfo( attacks[a] );
					}
				}
			}

			$tbody.append( code );
		};

		KOCFIA.autoAttack.refreshOngoingInfo = function(attack, noButton, msg){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' refreshOngoingInfo function');

			var $tr = KOCFIA[ this.module ].$ongoing.find('tr').filter('[data-city='+ attack.cityKey +'][data-attack='+ attack.id +']'),
				$trash = $tr.find('.trash');
			if( $tr.length == 0 || $trash.length ){
				if( $trash.length ) $tr.remove();

				var city = KOCFIA.cities[ attack.cityKey ],
					code = '<tr data-city="'+ attack.cityKey +'" data-attack="'+ attack.id +'" data-stop="0">';
				code += '<td class="trip">';
				code += '<span class="ui-icon ui-icon-cancel stop" title="Arrêter l\'attaque"></span>';
				code += city.label;
				code += '<br />Vers : TS' + attack.targetLevel;
				code += '<br />Garder '+ attack.rpSlot +' place'+ (attack.rpSlot > 1 ? 's' : '') +'</td>';
				code += '<td class="coords"><small>' + Shared.mapLink( attack.coords ) +'</small></td>';
				code += '<td class="current"></td>';
				code += '<td class="info"></td></tr>';

				$tr = $( code );

				KOCFIA[ this.module ].$ongoing.find('tbody').filter('[data-city='+ attack.cityKey +']').append( $tr );
			}

			//attack stopped
			if( noButton ){
				$tr.find('.stop').removeClass('stop').removeClass('ui-icon-stop')
					.addClass('trash').addClass('ui-icon-trash')
					.attr('title', 'Enlever les informations.');

				//show the manual launch button
				KOCFIA[ this.module ].$saved.find('tr').filter('[data-city='+ attack.cityKey +'][data-attack='+ attack.id +']').find('.charge').show();
			} else {
				$tr.find('.current').html( Shared.mapLink( attack.coords[ attack.coordIndex ] ) + '<br />' + (attack.coordIndex + 1) + 'e / ' + attack.coords.length );
			}

			//clean old messages
			var d = new Date(),
				timestamp = d.getTime() / 1000,
				obsolete = 5 * 60 * 1000,
				msgTimestamp;

			$msg = $tr.find('.info').find('div');
			if( $msg.length > 9 ){
				var $tmp = $msg.filter(':lt(9)'); //keep one for td width
				$tmp.slideUp(500, function(){ $tmp.remove(); });
			}
			$msg.each(function(){
				var $div = $(this);
				msgTimestamp = $div.data('timestamp');
				if( msgTimestamp && timestamp - msgTimestamp > obsolete ){
					$div.remove();
				}
			});

			if( !$.isEmptyObject(msg) ){
				$tr.find('.info').append( '<div data-timestamp="'+ msg[0] +'">'+ msg[1] +'</div>' );
			}
		};

		KOCFIA.autoAttack.launchAttack = function( attack ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' launchAttack function', attack);
			attack.coordIndex = 0;
			attack.marching = [];
			KOCFIA.checkAndLaunchAttack( attack );
		};

		KOCFIA.autoAttack.getHeader = function(){
			var header = '<div class="infos cf">';
			header += '<span class="ui-icon ui-icon-info"></span>';
			header += '<span><input type="checkbox" id="'+ this.module +'-panel-automatic" '+ (KOCFIA.conf[ this.module ].automatic ? 'checked' : '') +' autocomplete="off" />';
			header += '<label for="'+ this.module +'-panel-automatic">attaques automatiques</label></span>';
			header += '</div>'

			return header;
		};

		KOCFIA.autoAttack.getListsTemplate = function(){
			//ongoing
				var onGoing = '<h3>Attaques en cours</h3>';
				onGoing += '<div class="attack-list ongoing">';
				onGoing += '<table><thead><tr>';
				onGoing += '<th class="trip">Itinéraire</th>';
				if( this.module == 'wilderness' ){
					onGoing += '<th class="coords">Coordonnées</th>';
				}
				onGoing += '<th class="current">Cible</th>';
				onGoing += '<th class="info">Info</th>';
				onGoing += '</tr></thead>';

			//attacks plan
				var savedPlans = '<h3>Attaques enregistrées</h3>';
				savedPlans += '<div class="attack-list saved">';
				savedPlans += '<table><thead><tr>';
				savedPlans += '<th class="trip">Itinéraire</th>';
				if( this.module == 'wilderness' ){
					savedPlans += '<th class="coords">Coordonnées</th>';
				}
				savedPlans += '<th class="waves">Vagues</th>';
				savedPlans += '<th class="keep">Converser</th>';
				savedPlans += '</tr></thead>';

			//attacks ongoing and plan tbodies
				for( i = 0; i < length; i += 1 ){
					var cityKey = KOCFIA.citiesKey[i],
						city = KOCFIA.cities[cityKey];
					var line = '<tbody data-city="'+ cityKey +'"></tbody>';

					onGoing += line;
					savedPlans += line;
				}
				onGoing += '</table></div>';
				savedPlans += '</table></div>';

			return savedPlans + onGoing;
		};

		KOCFIA.autoAttack.addSectionListeners = function(){
			var module = this.module;

			KOCFIA.$confPanel.find('#kocfia-'+ this.module)
				.on('change', '#'+ module +'-panel-automatic', function(){
					var checked = $(this).prop('checked');
					$('#'+ module +'-automatic').prop('checked', checked).change();
					if( checked ) KOCFIA[ module ].$accordion.accordion('activate', 2);
				})
				//load knights and units on city change )
				.on('change', '.city-choice', function(){
					var $waves = KOCFIA[ module ].$form.find('.wave');
					if( $waves.length ) $waves.remove();

					KOCFIA[ module ].$form.find('.keep, .add-wave, .save, .launch, .saveAndLaunch, .builds').show();

					KOCFIA[ module ].addWaves((module == 'wilderness' ? 2 : 1), $(this).val());
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
					var $clone = KOCFIA[ module ].$form.find('.wave').eq(0).clone();
					$clone.find('input, select').val('');
					$clone.insertBefore( KOCFIA[ module ].$form.find('.keep') );
				})
				//reset form
				.on('click', '.reset', function(){
					KOCFIA[ module ].$form.find('.keep, .add-wave, .save, .launch, .saveAndLaunch, .builds').hide();
					KOCFIA[ module ].$form.find('.wave').remove();

					var $keep = KOCFIA[ module ].$form.find('.keep');
					$keep.find('.unit-block').filter(':gt(0)').remove();
					$keep.find('.unit-choice').find('option').filter(':gt(0)').remove();

					var $inputs = KOCFIA[ module ].$form.find('input');
					$inputs.filter('[type="text"], [type="hidden"]').val('');
					$inputs.filter('[type="radio"], [type="checkbox"]').prop('checked', false);

					KOCFIA[ module ].$form.find('select, textarea').val('');
					KOCFIA[ module ].$form.find('.message').empty();
				})
				//launch
				.on('click', '.launch', function(){
					if( KOCFIA.conf[ module ].active ){
						var result = KOCFIA[ module ].planAttack();
						if( result.errors.length ){
							KOCFIA[ module ].$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
						} else {
							KOCFIA[ module ].$form.find('.message').empty();
							var d = new Date();
							result.attack.id = Math.floor(d.getTime() / 1000);
							KOCFIA[ module ].launchAttack( result.attack );

							//open ongoing accordion
							KOCFIA[ module ].$accordion.accordion('activate', 2);
						}
					} else {
						alert('Le module n\'est pas actif. Les lancements d\'attaques sont bloqués.');
					}
				})
				//save
				.on('click', '.save, .saveAndLaunch', function(){
					var result = KOCFIA[ module ].planAttack();
					if( result.errors.length ){
						KOCFIA[ module ].$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
					} else {
						KOCFIA[ module ].$form.find('.message').empty();

						if( !KOCFIA[ module ].attacks[ result.attack.cityKey ] ){
							KOCFIA[ module ].attacks[ result.attack.cityKey ] = {};
						}

						var editAttackId = KOCFIA[ module ].$form.find('.edit-attackId').val(),
							editCityKey = KOCFIA[ module ].$form.find('.edit-cityKey').val();
						if( editAttackId != '' && editCityKey != '' ){
							KOCFIA[ module ].deletePlan( editAttackId, editCityKey, false );
							KOCFIA[ module ].$saved.find('tbody').filter('[data-city='+ editCityKey +']')
								.find('tr').filter('[data-attack='+ editAttackId +']')
								.remove();
						}

						var d = new Date();
						result.attack.id = Math.floor(d.getTime() / 1000);

						KOCFIA[ module ].attacks[ result.attack.cityKey ][ result.attack.id ] = result.attack;

						KOCFIA[ module ].$saved.find('tbody').filter('[data-city='+ result.attack.cityKey +']')
							.append( KOCFIA[ module ].attackInfo( result.attack ) );

						KOCFIA[ module ].storeAttacks();

						if( KOCFIA.conf[ module ].active && $(this).hasClass('saveAndLaunch') ){
							KOCFIA[ module ].launchAttack( result.attack );

							//open ongoing accordion
							KOCFIA[ module ].$accordion.accordion('activate', 2);
						} else {
							//open saved accordion
							KOCFIA[ module ].$accordion.accordion('activate', 1);
						}
					}
				})
				//attack plan delete
				.on('click', '.delete', function(){
					if( confirm('Etes-vous sûr ?') ){
						var $this = $(this),
							$tr = $this.closest('tr');

						KOCFIA[ module ].deletePlan( $tr.data('attack'), $tr.data('city'), true );
						$tr.remove();
					}
				})
				//attack plan edit and duplication
				.on('click', '.edit, .duplicate', function(){
					KOCFIA[ module ].$form.find('.reset').trigger('click');
					var $this = $(this),
						$tr = $this.closest('tr'),
						attackId = $tr.data('attack'),
						cityKey = $tr.data('city'),
						attack = KOCFIA[ module ].attacks[ cityKey ][ attackId ];

					if( attack ){
						KOCFIA[ module ].$form.find('.keep, .add-wave, .save, .launch, .saveAndLaunch, .builds').show();

						if( $this.hasClass('edit') ){
							KOCFIA[ module ].$form.find('.edit-attackId').val( attack.id );
							KOCFIA[ module ].$form.find('.edit-cityKey').val( attack.cityKey );
						}

						KOCFIA[ module ].$form.find('.city-choice').filter('[value='+ cityKey +']').prop('checked', true);
						KOCFIA[ module ].$form.find('.targetLevel').val( attack.targetLevel );
						KOCFIA[ module ].$form.find('.rallypointSlot').val( attack.rpSlot );

						if( module == 'wilderness' ){
							KOCFIA[ module ].$form.find('textarea').val(attack.coords.join("\n"));
						}

						KOCFIA[ module ].addWaves( attack.waves.length, attack.cityKey );

						var $waves = KOCFIA[ module ].$form.find('.wave');
						var i, j, wavesLength = attack.waves.length, unitsLength;
						for( i = 0; i < wavesLength; i += 1 ){
							var $wave = $waves.eq(i),
								wave = attack.waves[i];

							if( module == 'wilderness' ){
								$wave.find('.knight-choice').val( wave.knight );
							} else {
								$wave.find('.knight-priority').val( wave.knightPriority );
							}

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
								$b.find('.unit-qty').val( Shared.format( unit.qty ) );
							}
						}

						var $keep = KOCFIA[ module ].$form.find('.keep'),
							keepLength = attack.keep.length;
						if( keepLength > 1 ){
							for( i = 1; i < keepLength; i += 1 ){
								$keep.find('.add-unit').trigger('click');
							}
						}

						var $blocks = $keep.find('.unit-block');
						for( i = 0; i < keepLength; i += 1 ){
							var unit = attack.keep[i];

							var $b = $blocks.eq(i);
							$b.find('.unit-choice').val( unit.id );
							$b.find('.unit-qty').val( Shared.format( unit.qty ) );
						}

						//open form accordion
						KOCFIA[ module ].$accordion.accordion('activate', 0);
					} else {
						alert('Plan d\'attaque introuvable.')
					}
				})
				//knight choice change
				.on('change', '.knight-choice', function(){
					var id = $(this).val();
					if( id != '' ){
						KOCFIA[ module ].$form.find('.knight-choice').not( this ).each(function(){
							if( this.value == id ) this.value = '';
						});
					}
				})
				//stop on next round
				.on('click', '.stop', function(){
					if( confirm('Etes-vous sûr ?') ){
						var d = new Date();

						$(this).removeClass('ui-icon-cancel').removeClass('stop').addClass('ui-icon-trash').addClass('trash').attr('title', 'Enlever les informations')
							.closest('tr').data('stop', 1)
							.find('.info').append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Attaque stoppée sur demande</div>');
					}
				})
				//manual launch
				.on('click', '.charge', function(){
					if( KOCFIA.conf[ module ].active ){
						if( !KOCFIA.conf[ module ].automatic ){
							var $tr = $(this).hide().closest('tr'),
								attack = KOCFIA[ module ].attacks[ $tr.data('city') ][ $tr.data('attack') ];
							if( attack ){
								attack.coordIndex = 0;
								attack.marching = [];
								KOCFIA[ module ].refreshOngoingInfo( attack, false );
								KOCFIA[ module ].launchAttack( attack );

								//open ongoing accordion
								KOCFIA[ module ].$accordion.accordion('activate', 2);
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
					KOCFIA[ module ].$form.find('.wave').remove();
					KOCFIA[ module ].addWaves((module == 'wilderness' ? 2 : 1), KOCFIA[ module ].$form.find('.city-choice').filter(':checked').val());

					var $waves = KOCFIA[ module ].$form.find('.wave'),
						$addUnit = $waves.find('.add-unit'),
						$level = KOCFIA[ module ].$form.find('.targetLevel');

					if( module == 'wilderness' ){
						$addUnit.eq(1).trigger('click');

						if( rel == '8' || rel == '9' || rel == '9bis' ){
							$addUnit.eq(0).trigger('click');
						}
					}

					var $uChoices = $waves.find('.unit-choice'),
						$uQuantity = $waves.find('.unit-qty');

					KOCFIA[ module ].getBuildsConf($level, $uChoices, $uQuantity, rel);
				})
				//remove ongoing attack info line
				.on('click', '.trash', function(){
					$(this).closest('tr').remove();
				});
		};

		KOCFIA.autoAttack.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-'+ this.module).html('');

			var header = KOCFIA[ this.module ].getHeader();
			var form = KOCFIA[ this.module ].getForm();
			var lists = KOCFIA[ this.module ].getListsTemplate();
			var help = KOCFIA[ this.module ].getHelp();

			KOCFIA[ this.module ].addSectionListeners();

			$section.append( header + '<div class="accordion">' + form + lists + '</div>' + help );

			$section.find('.buttonset').buttonset();

			KOCFIA[ this.module ].$accordion = $section.find('.accordion');
			KOCFIA[ this.module ].$form = $section.find('.attack-form');
			KOCFIA[ this.module ].$saved = $section.find('.attack-list.saved');
			KOCFIA[ this.module ].$ongoing = $section.find('.attack-list.ongoing');

			if( this.module == 'darkForest' ){
				KOCFIA[ this.module ].$form = $section.find('.darkForest-form');
				KOCFIA[ this.module ].loadPlan();
			}

			KOCFIA[ this.module ].$accordion.accordion({collapsible: true, autoHeight: false, animated: false}).accordion('activate', false);
		};

	/* DARK FOREST */
		KOCFIA.darkForest = {
			module: 'darkForest',
			coords: {}, //dark forest and bogs coords by city
			stored: ['attacks', 'coords'],
			currentSearch: {}
		};

		KOCFIA.darkForest.planAttack = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' planAttack function');
			var errors = [], $cb,
				cityKey, cityActive, city, cityLabel,
				rps, levelActive, level,
				keep, check, wave,
				waves, targets, $tbody, $rule,
				regexp = /[^0-9, ]/,
				plan = { type: 'attack', category: this.module, cities: [], info: {}, levels: {}, coordIndex: 0 };

			var checkUnitBlock = function( $block ){
				var unit = $block.find('.unit-choice').val();
				if( unit != '' ){
					var qty = Shared.decodeFormat( $.trim( $block.find('.unit-qty').val() ) );
					if( qty !== false ) return {id: unit, qty: qty};
				}

				return false;
			};

			//check form
			KOCFIA[ this.module ].$form.find('tbody').each(function(){
				$tbody = $(this);

				cityKey = $tbody.data('city');
				cityActive = null;
				city = KOCFIA.cities[ cityKey ];
				cityLabel = city ? city.label : null;
				rps = null;
				level = null;
				levelActive = null;
				keep = [];
				waves = [];
				targets = [];

				cityActive = $tbody.find('.city-active').is(':checked');

				rps = parseInt( $.trim( $tbody.find('.rallypointSlot').val() ), 10 );
				if( isNaN(rps) ) rps = 0;

				$tbody.find('.keep').find('.unit-block').each(function(){
					check = checkUnitBlock( $(this) );
					if( check !== false ) keep.push( check );
				});

				plan.levels[ cityKey ] = {};

				$tbody.find('.rule').each(function(){
					$rule = $(this);
					if( $rule.closest('tbody').filter('[data-city='+ cityKey +']').length ){
						levelActive = $rule.find('.level-active').is(':checked');

						knightPriority = $rule.find('.knight-priority').val();

						$rule.find('.wave').each(function(){
							var $wave = $(this);
							wave = {units: []};
							$wave.find('.unit-block').each(function(){
								check = checkUnitBlock( $(this) );
								if( check !== false ){
									wave.units.push( check );
								}
							});
							if( wave.units.length ){
								waves.push(wave);
							}
						});

						level = parseInt( $.trim( $rule.find('.targetLevel').val() ), 10 );
						if( isNaN(level) || level < 1 || level > 10 ){
							//show error only if the rule is not empty
							if( levelActive || waves.length ){
								errors.push('L\'un des niveaux de FS ciblé est invalide dans la ligne pour '+ cityLabel);
								return;
							}
						} else if( $.inArray(level, targets) > -1 ){
							errors.push('Une seule configuration possible par niveau pour '+ cityLabel);
							return;
						} else if( levelActive ){
							targets.push(level);
						}

						if( waves.length ){
							plan.levels[ cityKey ][level] = {active: levelActive, knightPriority: knightPriority, waves: waves };
						} else if( cityActive ){
							errors.push('Au moins une vague valide doit être spécifiée pour chaque niveau de FS ciblé dans la ligne pour '+ cityLabel);
							return;
						}
					}
				});

				plan.cities.push( cityKey );
				plan.info[ cityKey ] = { active: cityActive, rps: rps, keep: keep, targetsLevel: targets };
			});

			if( errors.length ){
				errors = errors.unique();
			} else {
				var empty = true;
				for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
					if( !$.isEmptyObject(plan.levels[ KOCFIA.citiesKey[i] ]) ){
						empty = false;
						break;
					} else if( plan.info[ KOCFIA.citiesKey[i] ].active ){
						city = KOCFIA.cities[ KOCFIA.citiesKey[i] ];
						errors.push('Au moins une vague valide doit être spécifiée pour '+ city.label);
					}
				}

				if( empty ){
					errors.push('Au moins une vague valide doit être spécifiée pour une des villes');
				}
			}

			return {plan: plan, errors: errors};
		};

		KOCFIA.darkForest.getBuildsList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuilds function');
			var builds = '<div>';
			builds += '<button class="build" rel="1">FS1 (emp9+)</button>';
			builds += '<button class="build" rel="2">FS2 (emp10)</button>';
			/*
			builds += '<button class="build" rel="3">FS3 (emp11)</button>';
			builds += '<button class="build" rel="4">FS4 (emp11)</button>';
			builds += '<button class="build" rel="5">FS5 (emp11)</button>';
			builds += '<button class="build" rel="6">FS6 (emp11)</button>';
			builds += '<button class="build" rel="7">FS7 (emp11)</button>';
			builds += '<button class="build" rel="8">FS8 (emp11)</button>';
			builds += '<button class="build" rel="9">FS9 (emp11)</button>';
			builds += '<button class="build" rel="10">FS10 (emp11)</button>';
			*/
			builds += '</div>';

			return builds;
		};

		KOCFIA.darkForest.listCityAttacks = function( cityKey ){}

		KOCFIA.darkForest.getBuildsConf = function($level, $uChoices, $uQuantity, rel){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuildsConf function');
			switch( rel ){
				case '1':
						$level.val( 1 );
						//wave 1
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('10k');
					break;
				case '2':
						$level.val( 2 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('90k');
					/*
						//wave 2
						$uChoices.eq(1).val('unt2');
						$uQuantity.eq(1).val('1');
						$uChoices.eq(2).val('unt6');
						$uQuantity.eq(2).val('2.5k');
					*/
					break;
			}
		};

		KOCFIA.darkForest.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getHelp function');
			var help = '<div id="kocfia-'+ this.module +'-help" class="help" title="Aide '+ KOCFIA.modulesLabel[ this.module ] +'">';
			help += '<h4>Règles, limitations et informations :</h4>';
			help += '<ul>';
			help += '<li>Chaque coordonnée est vérifiée avant lancement (vérification du niveau et si ce n\'est pas un marais)</li>';
			help += '<li>Les attaques sauvegardées peuvent être lancées manuellement ou via le mode automatique</li>';
			help += '<li>Pour le formulaire les erreurs seront listées au-dessus</li>';
			help += '<li>Aucune vague n\'est lancée si il n\'y a pas assez de chevaliers pour lancer tous les vagues de l\'attaque</li>';
			help += '<li>Si une vague est en erreur les vagues précédentes seront rappelées (sous réserves des limitations de temps de marche restant > 1min)</li>';
			help += '<li>Lors du démarrage du mode automatique, 20 secondes s\'écoulent entre chaque lancement de plan d\'attaque sauvegardé</li>';
			help += '<li>Dix secondes s\'écoulent entre chaque lancement de vague</li>';
			help += '<li>Chaque requête au serveur est exécutée au maximum 3 fois lors de problème réseau ou serveur</li>';
			help += '<li>Pour les coordonnées une recherche automatique est effectuée à 100 de distance autour de la ville de l\'attaque pour lister les fôrets sombres et marais</li>';
			help += '<li>Ces coordonnées sont mises à jour en cas d\'erreur durant la recherche ou la vérification avant lancement</li>';
			help += '</ul>';
			help += '<h4>Méthode :</h4>';
			help += '<ol>';
			help += '<li>Sélectionner une ville</li>';
			help += '<li>Spécifier le niveau pour les FS attaquées</li>';
			help += '<li>Spécifier combien de places conserver dans le point de ralliement (optionnel)</li>';
			help += '<li>Remplir les vagues d\'attaques (manuellement ou via les attaques préprogrammées)</li>';
			help += '<li>Spécifier la priorité pour les chevaliers (optionnel, par défaut le premier chevalier disponible est utilisé)</li>';
			help += '<li>Les quantités de troupes peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2M pour deux millions, 3G pour trois milliards)</li>';
			help += '<li>Spécifier les quantités de troupes à conserver (optionnel)</li>';
			help += '</ol>';
			help += '</div>';

			return help;
		};

		KOCFIA.darkForest.getCoords = function(  ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getCoords function');
			if( !$.isEmptyObject(KOCFIA[ this.module ].coords) ){
				return KOCFIA[ this.module ].coords;
			} else {
				return false;
			}
		};

		KOCFIA.darkForest.search = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' search function');
			var module = this.module;
			return $.Deferred(function(dfd){
				KOCFIA[ module ].coords = {};

				/* deferred functions */
					//display the partialExplore results, while merging them with previous results
					var parseResults = function( cdfd, coordX, coordY, rangeMin, rangeMax, result ){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( module ) ) console.info('KOCFIA '+ module +' explore deferred parseResults function');
						var leftRangeMax = coordX - rangeMax,
							leftRangeMin = coordX - rangeMin,
							rightRangeMax = coordX + rangeMax,
							rightRangeMin = coordX + rangeMin,
							topRangeMax = coordY - rangeMax,
							topRangeMin = coordY - rangeMin,
							bottomRangeMax = coordY + rangeMax,
							bottomRangeMin = coordY + rangeMin;

						//merge results with previous deferred partialExplore results
						if( KOCFIA[ module].currentSearch.length ){
							coords = KOCFIA[ module ].currentSearch;
						}

						var id, tile, range;
						for( id in result.data ){
							if( result.data.hasOwnProperty(id) ){
								tile = result.data[id];
								range = Shared.getDistance(coordX, coordY, tile.xCoord, tile.yCoord);
								if( range >= rangeMin && range <= rangeMax ){
									//dark forest (tileType = 54) or swamp (tileType = 0)
									if( tile.tileType == 0 || tile.tileType == 54 ){
										coords.push(tile.xCoord +','+ tile.yCoord);
									}
								}
							}
						}

						KOCFIA[ module].currentSearch = coords;

						if( !loop ) return cdfd.resolve();
						else {
							start += 100;
							end += 100;
							return cdfd.pipe( partialExplore(cdfd, 3) );
						}
					};

					//split the full coordinates search in small requests of 100 coordinates
					var partialExplore = function(cdfd, attempts){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( module ) ) console.info('KOCFIA '+ module +' explore deferred partialExplore function', start, end, length);
						loop = true;
						if( end > length ){
							end = length;
							loop = false;
						}

						if( start == end ) start -= 1; //avoid the start = end case with the slice which need a difference

						params.blocks = blocks.slice(start, end).join(',');

						if( params.blocks.length == 0 && loop == false ) return cdfd.resolve();

						$.ajax({
							url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json',
							timeout: 10000,
						})
						.done(function(result){
							if( result.ok && result.data ){
								return cdfd.pipe( parseResults( cdfd, coordX, coordY, rangeMin, rangeMax, result ) );
							} else {
								attempts -= 1;
								if( attempts > 0 ){
									return cdfd.pipe( partialExplore(cdfd, attempts) );
								} else {
									return cdfd.reject();
								}
							}
						})
						.fail(function(){
							attempts -= 1;
							if( attempts > 0 ){
								return cdfd.pipe( partialExplore(cdfd, attempts) );
							} else {
								return cdfd.reject();
							}
						});
					};

					var computeBlocks = function(cdfd){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( module ) ) console.info('KOCFIA '+ module +' explore deferred computeBlocks function', cityIndex);

						if( blocksUnicityDone ){
							length = blocks.length;
							var d = new Date();
							KOCFIA[ module ].$ongoing.find('.info').append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Parcours de '+ length +' coordonnées</div>');
							return cdfd.pipe( partialExplore(cdfd, 3) );
						} else if( cityIndex >= KOCFIA.citiesKey.length ){
							window.setTimeout(function(){
								blocks = blocks.unique();
								blocksUnicityDone = true;
								return cdfd.pipe( computeBlocks(cdfd) );
							}, 500);
						} else {
							city = KOCFIA.cities[ KOCFIA.citiesKey[ cityIndex ] ];

							coordX = parseInt(city.coords.x, 10);
							coordY = parseInt(city.coords.y, 10);

							leftCoordMin = Math.floor(coordX - radiusMin);
							rightCoordMin = Math.floor(coordX + radiusMin);
							topCoordMin = Math.floor(coordY - radiusMin);
							bottomCoordMin = Math.floor(coordY + radiusMin);

							maxX = coordX + radiusMax,
							maxY = coordY + radiusMax;

							for( i = coordX - radiusMax; i <= maxX; i += 1 ){
								for( j = coordY - radiusMax; j <= maxY; j += 1 ){
									if( (i <= leftCoordMin || i >= rightCoordMin) && (j <= topCoordMin || j >= bottomCoordMin) ){
										range = Shared.getDistance(coordX, coordY, i, j);
										if( range >= rangeMin && range <= rangeMax ){
											blocks.push("bl_" + ( i >= 750 ? i - 750 : i ) + "_bt_" + ( j >= 750 ? j - 750 : j ));
										}
									}
								}
							}

							window.setTimeout(function(){
								cityIndex += 1;
								return cdfd.pipe( computeBlocks(cdfd) );
							}, 500);
						}
					};

					var searchSequence = function(){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( module ) ) console.info('KOCFIA '+ module +' explore deferred searchSequence function');
						return $.Deferred(function(cdfd){
							return cdfd.pipe( computeBlocks(cdfd) );
						}).promise();
					};

				var params = window.g_ajaxparams,
					blocks = [],
					rangeMin = 1,
					rangeMax = 100,
					coords = [],
					i, j, k,
					city, range,
					coordX, coordY,
					maxX, maxY,
					leftCoordMin,
					rightCoordMin,
					topCoordMin,
					bottomCoordMin;

				//calculate the radius of the circle based on the distance max
				var radiusMax = Math.ceil(rangeMax / 2 * Math.PI),
					radiusMin = Math.floor(rangeMin / 2 * Math.PI);

				var loop, start = 0, end = 99, length, cityIndex = 0, blocksUnicityDone = false;
				$.when( searchSequence() )
					.done(function(){
						KOCFIA[ module ].coords.status = 'complete';
					})
					.fail(function(){
						//mark search as not good
						KOCFIA[ module ].coords.status = 'partial';
					})
					.always(function(){
						KOCFIA[ module ].coords.list = coords.unique();
						KOCFIA[ module ].currentSearch = [];

						KOCFIA[ module ].storeCoords();

						return dfd.resolve();
					});
			}).promise();
		};

		KOCFIA.darkForest.storeCoords = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' storeCoords function');
			localStorage.setObject('kocfia_'+ this.module +'_coords_' + KOCFIA.storeUniqueId, KOCFIA[ this.module ].coords);
		};

		KOCFIA.darkForest.deleteAllCoords = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' deleteAllCoords function');

			KOCFIA[ this.module ].coords = {};
			KOCFIA[ this.module ].storeCoords();
		};

		KOCFIA.darkForest.deletePlan = function( attackId, save ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' deletePlan function', attackId, save);
			delete KOCFIA[ this.module ].attacks[ attackId ];

			if( save ) KOCFIA[ this.module ].storeAttacks();
		};

		KOCFIA.darkForest.refreshOngoingInfo = function(attack, noButton, msg){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' refreshOngoingInfo function');
			var $tr = KOCFIA[ this.module ].$ongoing.find('tbody').find('tr'),
				$trash = $tr.find('.trash');
			if( $tr.length == 0 || $trash.length ){
				if( $trash.length ) $tr.remove();
				//attack.cities = [cityKey];
				//attack.info[ cityKey ] = {active: cityActive, rps: rps, keep: [{id: unit, qty: qty}], targetsLevel: targets};
				//attack.levels[ cityKey ][ level ] = {active: levelActive, knightPriority: knightPriority, waves: [{ units: [{id: unit, qty: qty}] }] });

				var code = '<tr data-stop="0">';
				code += '<td class="trip">';

				var cityKey, city, i, j, k, u, t, info, keep, unit, rule;
				for( i = 0; i < attack.cities.length; i += 1 ){
					cityKey = attack.cities[i];
					city = KOCFIA.cities[ cityKey ];

					if( attack.info[ cityKey ].active ){
						//city info, targets, keep
						info = attack.info[ cityKey ];
						code += '<div class="cf"><div class="city">';
						if( i == 0 ) code += '<span class="ui-icon ui-icon-cancel stop" title="Arrêter"></span>';

						code += city.label;
						code += '<br>Garder '+ info.rps +' place'+ (info.rps > 1 ? 's' : '');
						code += '<br>FS ciblée'+ (info.targetsLevel.length > 1 ? 's' : '') +' : ' + info.targetsLevel.join(', ');

						if( info.keep.length ){
							code += '<br>Garder : ';
							for( j = 0; j < info.keep.length; j += 1 ){
								keep = info.keep[ j ];
								if( j > 0 ) code += ', ';

								for( k = 0; k < KOCFIA.troops.length; k += 1 ){
									if( KOCFIA.troops[k].name == keep.id ){
										unit = KOCFIA.troops[k];
										break;
									}
								}

								code += '<img src="'+ unit.icon +'" alt="'+ unit.label[0] +'" title="'+ unit.label[0] +'" />';
								code += ' ' + Shared.format( keep.qty );
							}
						}
						code += '</div>';

						//rules
						for( j = 0; j < info.targetsLevel.length; j += 1 ){
							rule = attack.levels[ cityKey ][ info.targetsLevel[ j ] ];
							if( rule.active ){
								code += '<div class="rule">';
								code += 'FS'+ info.targetsLevel[ j ];
								code += '<br>Chevalier : '+ (rule.knightPriority == 'highest' ? 'Combat haut' : (rule.knightPriority == 'lowest' ? 'Combat bas' : 'n\'importe'));
								for( k = 0; k < rule.waves.length; k += 1 ){
									code += '<br>Vague '+ (k + 1) +' : ';
									for( u = 0; u < rule.waves[k].units.length; u += 1 ){
										if( u > 0 ) code += ', ';
										troop = rule.waves[k].units[u];

										for( t = 0; t < KOCFIA.troops.length; t += 1 ){
											if( KOCFIA.troops[t].name == troop.id ){
												unit = KOCFIA.troops[t];
												break;
											}
										}

										code += '<img src="'+ unit.icon +'" alt="'+ unit.label[0] +'" title="'+ unit.label[0] +'" />';
										code += ' ' + Shared.format( troop.qty );
									}
								}
								code += '</div>';
							}
						}
						code += '</div>';
					}
				}
				code += '</td><td class="info"></td></tr>';

				$tr = $( code );

				KOCFIA[ this.module ].$ongoing.find('tbody').append( $tr );
			}

			//attack stopped
			if( noButton ){
				$tr.find('.stop').removeClass('stop').removeClass('ui-icon-stop')
					.addClass('trash').addClass('ui-icon-trash')
					.attr('title', 'Enlever les informations.');
			}

			//clean old messages
			var d = new Date(),
				timestamp = d.getTime() / 1000,
				obsolete = 5 * 60 * 1000,
				msgTimestamp;
			$msg = $tr.find('.info').find('div');
			if( $msg.length > 14 ){
				var $tmp = $msg.filter(':lt(14)'); //keep one for td width
				$tmp.slideUp(500, function(){ $tmp.remove(); });
			}
			$msg.each(function(){
				var $div = $(this);
				msgTimestamp = $div.data('timestamp');
				if( msgTimestamp && timestamp - msgTimestamp > obsolete ){
					$div.remove();
				}
			});

			if( !$.isEmptyObject(msg) ){
				$tr.find('.info').append('<div data-timestamp="'+ msg[0] +'">'+ msg[1] +'</div>');
			}
		};

		KOCFIA.darkForest.getForm = function(){
			var form = '<h3>Configurer</h3>';
			form += '<div class="darkForest-form">';

			//form message area
			form += '<ul class="message"></ul>';

			//form edit inputs
			form += '<input type="hidden" class="edit-attackId" name="attackId" value="" autocomplete="off" />';

			//buttons
			form += '<div class="buttons cf"><button class="reset">Annuler</button>';
			form += '<button class="save">Sauvegarder</button>';
			form += '<button class="launch">Lancer</button></div>';

			form += '<table>';
			//city choice
			var i, length = KOCFIA.citiesKey.length;
			for( i = 0; i < length; i += 1 ){
				var cityKey = KOCFIA.citiesKey[i],
					city = KOCFIA.cities[cityKey];
				form += '<tbody data-city="'+ cityKey +'"><tr class="city-header"><td colspan="2">'
				form += '<button class="add-rule">Ajouter une règle</button>';
				form += '<div><label for="kocfia-'+ this.module +'-'+ cityKey +'-rps">Laisser&nbsp;:&nbsp;</label>';
				form += '<input id="kocfia-'+ this.module +'-'+ cityKey +'-rps" type="text" class="rallypointSlot" /> place(s) dans le point de ralliement</div>';
				form += '<input id="kocfia-'+ this.module +'-'+ cityKey +'" name="city" value="'+ cityKey +'" type="checkbox" class="city-active" autocomplete="off" />';
				form += '<label for="kocfia-'+ this.module +'-'+ cityKey +'">'+ city.label +'</label>';
				form += '</td></tr><tr><td class="keep"><div>';
				form += '<span class="ui-icon ui-icon-plusthick add-unit">+</span><strong>Troupes à conserver</strong>';
				form += '</div></td></tr></tbody>';
			}
			form += '</table>'

			var levelSkel = '<td class="rule"><div><span class="ui-icon ui-icon-trash remove-rule"></span>';
			levelSkel += '<input type="checkbox" class="level-active" autocomplete="off" />';
			levelSkel += '<label>Niveau&nbsp;:&nbsp;</label>';
			levelSkel += '<input type="text" class="targetLevel" /></div>';
			levelSkel += '<div><label>Priorité chevalier&nbsp;:&nbsp;</label>';
			levelSkel += '<select class="knight-priority">';
			levelSkel += '<option value="">aucune</option>';
			levelSkel += '<option value="highest">combat haut</option>';
			levelSkel += '<option value="lowest">combat bas</option>';
			levelSkel += '</select></div><div class="waves">';
			levelSkel += '<span class="ui-icon ui-icon-plusthick add-wave">+</span><strong>Contenu des vagues</strong>';
			levelSkel += '</div></td>';
			KOCFIA[ this.module ].$levelSkel = $(levelSkel);

			var unitSkel = '<div class="unit-block">';
			unitSkel += '<select class="unit-choice" autocomplete="off">';
			unitSkel += '<option value="">Choisir</option>';
			unitSkel += '</select>';
			unitSkel += '<input class="unit-qty" type="text" autocomplete="off" />';
			unitSkel += '</div>';
			KOCFIA[ this.module ].$unitSkel = $(unitSkel);

			//wave skeleton
			var waveSkel = '<div class="wave">';
			waveSkel += '<span class="ui-icon ui-icon-plusthick add-unit">+</span>';
			waveSkel += '<strong>Vague</strong>';
			waveSkel += '</div>';
			KOCFIA[ this.module ].$waveSkel = $(waveSkel);

			//buttons
			form += '<div class="buttons cf"><button class="reset">Annuler</button>';
			form += '<button class="save">Sauvegarder</button>';
			form += '<button class="launch">Lancer</button></div>';

			form += '</div>';

			return form;
		};

		KOCFIA.darkForest.getListsTemplate = function(){
			//ongoing
				var onGoing = '<h3>Attaques en cours</h3>';
				onGoing += '<div class="attack-list ongoing">';
				onGoing += '<table><thead><tr>';
				onGoing += '<th class="trip">Plans</th>';
				onGoing += '<th class="info">Info</th>';
				onGoing += '</tr></thead>';
				onGoing += '<tbody></tbody>';
				onGoing += '</table></div>';

			return onGoing;
		};

		KOCFIA.darkForest.loadPlan = function(){
			var plan = KOCFIA[ this.module ].attacks;
			if( !$.isEmptyObject(plan) ){
				//attack.cities = [cityKey];
				//attack.info[ cityKey ] = {active: cityActive, rps: rps, keep: [{id: unit, qty: qty}], targetsLevel: targets};
				//attack.levels[ cityKey ][ level ] = {active: levelActive, knightPriority: knightPriority, waves: [{ units: [{id: unit, qty: qty}] }] });

				var cityKey, $keep, cityInfo, $addUnit, $block, i, j, l, r, levels, level, $rules, $rule, $waves;
				KOCFIA[ this.module ].$form.find('tbody').each(function(){
					var $tbody = $(this);
					cityKey = $tbody.data('city');

					if( $.inArray(cityKey, plan.cities) > -1 ){
						cityInfo = plan.info[ cityKey ];
						$tbody.find('.city-active').prop('checked', cityInfo.active);
						$tbody.find('.rallypointSlot').val( cityInfo.rps );


						$keep = $tbody.find('.keep');
						if( cityInfo.keep.length ){
							$addUnit = $keep.find('.add-unit');
							for( i = 0; i < cityInfo.keep.length; i += 1 ){
								$addUnit.trigger('click');
							}

							$blocks = $keep.find('.unit-block');
							for( i = 0; i < cityInfo.keep.length; i += 1 ){
								$block = $blocks.eq(i);
								$block.find('.unit-choice').val( cityInfo.keep[i].id );
								$block.find('.unit-qty').val( Shared.format( cityInfo.keep[i].qty ) );
							}
						} else {
							//add a unit block in keep div
							$tbody.find('.keep').find('.add-unit').trigger('click');
						}

						if( plan.levels.hasOwnProperty( cityKey ) ){
							levels = plan.levels[ cityKey ];

							for( l in plan.levels[ cityKey ] ){
								if( plan.levels[ cityKey ].hasOwnProperty( l ) ){
									$tbody.find('.add-rule').trigger('click');
								}
							}

							$rules = $tbody.find('.rule');
							r = 0;
							for( l in plan.levels[ cityKey ] ){
								if( plan.levels[ cityKey ].hasOwnProperty( l ) ){
									level = levels[ l ];
									$rule = $rules.eq(r);

									$rule.find('.level-active').prop('checked', level.active);
									$rule.find('.targetLevel').val( l );
									$rule.find('.knight-priority').val( level.knightPriority );

									$addWave = $rule.find('.add-wave');
									for( i = 1; i < level.waves.length; i += 1 ){
										$addWave.trigger('click');
									}

									$waves = $rule.find('.wave');
									for( i = 0; i < level.waves.length; i += 1 ){
										for( j = 0; j < level.waves[i].units.length; j += 1 ){
											if( j > 0 ) $waves.eq(i).find('.add-unit').trigger('click');
											$block = $waves.eq(i).find('.unit-block').eq(j);
											$block.find('.unit-choice').val( level.waves[i].units[j].id );
											$block.find('.unit-qty').val( Shared.format( level.waves[i].units[j].qty ) );
										}
									}

									r += 1;
								}
							}
						} else {
							//add the default empty rule
							$tbody.find('.add-rule').trigger('click');
						}
					} else {
						//add the default empty rule
						$tbody.find('.add-rule').trigger('click');
						//add a unit block in keep div
						$tbody.find('.keep').find('.add-unit').trigger('click');
					}
				});
			} else {
				//add the default empty rule
				KOCFIA[ this.module ].$form.find('.add-rule').trigger('click');
				//add a unit block in keep div
				KOCFIA[ this.module ].$form.find('.keep').find('.add-unit').trigger('click');
			}
		}

		KOCFIA.darkForest.addSectionListeners = function(){
			var module = this.module;
			KOCFIA.$confPanel.find('#kocfia-'+ this.module)
				.on('change', '#'+ module +'-panel-automatic', function(){
					var checked = $(this).prop('checked');
					$('#'+ module +'-automatic').prop('checked', checked).change();
					if( checked ) KOCFIA[ module ].$accordion.accordion('activate', 1);
					KOCFIA[ module ].$form.find('.launch').toggle( checked );
				})
				//add rule (level) button
				.on('click', '.add-rule', function(){
					var $tr = $(this).closest('tbody').find('tr').eq(1),
						$clone = KOCFIA[ module ].$levelSkel.clone();

					$clone.appendTo( $tr ).find('.add-wave').trigger('click');
				})
				//add wave button
				.on('click', '.add-wave', function(){
					KOCFIA[ module ].$waveSkel.clone()
						.appendTo( $(this).closest('.waves') )
						.find('.add-unit').trigger('click');
				})
				//add unit button
				.on('click', '.add-unit', function(){
					var $div = $(this).closest('div'),
						$clone = KOCFIA[ module ].$unitSkel.clone(),
						$blocks = $div.closest('table').find('.unit-block');

					if( $blocks.length ){
						$clone.find('select').html( $blocks.eq(0).find('select').find('option').clone() );
					} else {
						var choices = '<option value=""></option>';
						//init select values
						for( u in window.unitcost ){
							if( window.unitcost.hasOwnProperty(u) ){
								var name = window.unitcost[u][0];
								if( name == 'Unité de Ravitaillement' ) name = 'Ravitailleur';
								else if( name == 'Wagon de Ravitaillement' ) name = 'Wagon';
								choices += '<option value="'+ u +'">'+ name +'</option>';
							}
						}

						$clone.find('select').html( choices );
					}

					if( $div.find('.unit-block').length ){
						$clone.append('<span class="ui-icon ui-icon-minusthick remove"></span>');
					}

					$clone.appendTo( $div ).find('select').val('');
				})
				//remove unit button
				.on('click', '.remove', function(){
					$(this).parent().remove();
				})
				//remove unit button
				.on('click', '.remove-rule', function(){
					$(this).closest('td').remove();
				})
				//reset form
				.on('click', '.reset', function(){
					KOCFIA[ module ].$form.find('tbody').each(function(){
						$(this).find('tr').eq(1).find('td').filter(':gt(1)').remove();
					});

					var $inputs = KOCFIA[ module ].$form.find('input');
					$inputs.filter('[type="text"], [type="hidden"]').val('');
					$inputs.filter('[type="radio"], [type="checkbox"]').prop('checked', false);

					KOCFIA[ module ].$form.find('select').val('');

					KOCFIA[ module ].$form.find('.message').empty();
				})
				//save
				.on('click', '.save', function(){
					var result = KOCFIA[ module ].planAttack();
					if( result.errors.length ){
						KOCFIA[ module ].$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
					} else {
						KOCFIA[ module ].$form.find('.message').empty();
						KOCFIA[ module ].attacks = result.plan;

						KOCFIA[ module ].storeAttacks();
					}
				})
				//stop on next round
				.on('click', '.stop', function(){
					if( confirm('Etes-vous sûr ?') ){
						var d = new Date();

						KOCFIA[ module ].$form.find('.launch').show();

						$(this).removeClass('ui-icon-cancel').removeClass('stop').addClass('ui-icon-trash').addClass('trash').attr('title', 'Enlever les informations')
							.closest('tr').data('stop', 1)
							.find('.info')
							.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Attaque stoppée sur demande</div>');
					}
				})
				//manual launch
				.on('click', '.launch', function(){
					if( KOCFIA.conf[ module ].active ){
						if( !KOCFIA.conf[ module ].automatic ){
							var $tr = $(this).hide().closest('tr'),
								attack = KOCFIA[ module ].attacks;
							if( attack ){
								attack.coordIndex = 0;
								attack.marching = [];

								//open ongoing accordion
								KOCFIA[ module ].$accordion.accordion('activate', 1);

								KOCFIA.checkAndLaunchAttack( attack );
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
				//remove ongoing attack info line
				.on('click', '.trash', function(){
					$(this).closest('tr').remove();
				});
		};

	/* WILDERNESS */
		KOCFIA.wilderness = {
			module: 'wilderness'
		};

		KOCFIA.wilderness.getForm = function(){
			var form = '<h3>Configurer une attaque</h3>';
			form += '<div class="attack-form">';

			//form message area
			form += '<ul class="message"></ul>';

			//form edit inputs
			form += '<input type="hidden" class="edit-attackId" name="attackId" value="" autocomplete="off" />';
			form += '<input type="hidden" class="edit-cityKey" name="cityKey" value="" autocomplete="off" />';

			//city choice
			var i, length = KOCFIA.citiesKey.length;
			form += '<fieldset>';
			form += '<legend>Ville</legend><div class="buttonset">';
			for( i = 0; i < length; i += 1 ){
				var cityKey = KOCFIA.citiesKey[i],
					city = KOCFIA.cities[cityKey];
				form += '<input id="kocfia-'+ this.module +'-'+ cityKey +'" name="city" value="'+ cityKey +'" type="radio" class="city-choice" autocomplete="off" />';
				form += '<label for="kocfia-'+ this.module +'-'+ cityKey +'">'+ city.label +'</label>';
			}
			form += '</div></fieldset>';

			form += '<fieldset>';
			form += '<legend>Coordonnées</legend>';
			//pre configured attack builds
			form += KOCFIA[ this.module ].getBuildsList();
			form += '<small>format: x,y x,y x,y ...</small>';
			form += '<textarea name="coords" autocomplete="off"></textarea>';
			form += '</fieldset>';

			form += '<fieldset>';
			form += '<legend>Détail</legend>';
			form += '<label>Niveau&nbsp;:&nbsp;</label>';
			form += '<input type="text" class="targetLevel" />';
			form += '<div><label>Laisser&nbsp;:&nbsp;</label>';
			form += '<input type="text" class="rallypointSlot" /> place(s) dans le point de ralliement</div>';
			form += '</fieldset>';

			//wave skeleton
			var skel = '<fieldset class="wave">';
			skel += '<legend>Vague</legend>';
			skel += '<label>Chevalier&nbsp;:&nbsp;</label>';
			skel += '<select class="knight-choice" name="knight" autocomplete="off">';
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
			KOCFIA[ this.module ].$waveSkeleton = $(skel);

			//unit keep
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

			//buttons
			form += '<button class="add-wave">Ajouter une vague</button>';
			form += '<button class="launch">Lancer</button>';
			form += '<button class="save">Sauvegarder</button>';
			form += '<button class="saveAndLaunch">Sauvegarder et Lancer</button>';
			form += '<button class="reset">Annuler</button>';

			form += '</div>';

			return form;
		};

		KOCFIA.wilderness.planAttack = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' planAttack function');
			var $waves = KOCFIA[ this.module ].$form.find('.wave'),
				$keep = KOCFIA[ this.module ].$form.find('.keep'),
				$cityChoice = KOCFIA[ this.module ].$form.find('.city-choice').filter(':checked'),
				level = $.trim( KOCFIA[ this.module ].$form.find('.targetLevel').val() ),
				coords = $.trim( KOCFIA[ this.module ].$form.find('textarea').val().replace(/\n/g, ' ') ),
				errors = [],
				regexp = /[^0-9, ]/,
				attack = { type: 'attack', category: this.module, waves: [], coordIndex: 0, keep: [] };

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
				var unitList = [], w;
				$waves.each(function(){
					var $wave = $(this);
					w = {units: []};

					//knight
						w.knight = $wave.find('.knight-choice').val();

					//troops
						$wave.find('.unit-block').each(function(){
							var $b = $(this),
								valid = true;
								u = $b.find('.unit-choice').val(),
								q = Shared.decodeFormat( $.trim( $b.find('.unit-qty').val() ) );

							if( u.length == 0 ){
								valid = false;
							}

							if( q == false || q < 1 ){
								valid = false;
							}

							if( valid ){
								unitList.push(u);
								w.units.push({id: u, qty: q});
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
				$keep.find('.unit-block').each(function(){
					var $b = $(this),
						u = $.trim( $b.find('.unit-choice').val() ),
						q = Shared.decodeFormat( $.trim( $b.find('.unit-qty').val() ) );

					if( u.length == 0 && q != false && q > 0 ){
						errors.push('L\'unité à conserver doit être spécifiée.');
					} else if( u.length > 0 && (q == false || q < 1) ){
						errors.push('L\'unité à conserver doit avoir une quantité.');
					} else if( u.length > 0 && unitList.length && $.inArray(u, unitList) > -1 ){
						attack.keep.push({id: u, qty: q});
					}
				});

				//rally point free slot
				var rps = $.trim(KOCFIA[ this.module ].$form.find('.rallypointSlot').val());
				if( rps == '' ) rps = 0;

				rps = parseInt( rps, 10 );
				if( isNaN(rps) || rps < 0 ){
					errors.push('Le nombre de places à conserver dans le point de ralliement doit être un chiffre positif.');
				} else attack.rpSlot = rps;

				if( errors.length ){
					errors = errors.unique();
				}

			return {attack: attack, errors: errors};
		};

		KOCFIA.wilderness.getBuildsList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuilds function');
			var builds = '<fieldset class="builds">';
			builds += '<legend>Attaques types</legend>';
			builds += '<div>';
			builds += '<button class="build" rel="5">TS5 (emp5)</button>';
			builds += '<button class="build" rel="6">TS6 (emp7)</button>';
			builds += '<button class="build" rel="7">TS7 (emp8)</button>';
			builds += '<button class="build" rel="8">TS8 (emp9)</button>';
			builds += '<button class="build" rel="9">TS9 (emp 9)</button>';
			builds += '<button class="build" rel="9bis">TS9 (emp10)</button>';
			builds += '<button class="build" rel="10">TS10 (emp10)</button>';
			builds += '</div>';
			builds += '</fieldset>';

			return builds;
		};

		KOCFIA.wilderness.getBuildsConf = function($level, $uChoices, $uQuantity, rel){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuildsConf function');
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
		};

		KOCFIA.wilderness.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getHelp function');
			var help = '<div id="kocfia-'+ this.module +'-help" class="help" title="Aide '+ KOCFIA.modulesLabel[ this.module ] +'">';
			help += '<h4>Règles, limitations et informations :</h4><ul>';
			help += '<li>Les terres sauvages occupées ne seront pas attaquées (vérification pour chaque coordonnée à chaque attaque)</li>';
			help += '<li>Les attaques sauvegardées peuvent être lancées manuellement ou en activant les attaques automatiques</li>';
			help += '<li>Pour le formulaire les erreurs seront listées au-dessus</li>';
			help += '<li>Aucune vague n\'est lancée si il n\'y a pas assez de chevaliers pour lancer tous les vagues de l\'attaque</li>';
			help += '<li>Si une vague est en erreur les vagues précédentes seront rappelées (sous réserves des limitations de temps de marche restant > 1min)</li>';
			help += '<li>Lors du démarrage du mode automatique, 20 secondes s\'écoulent entre chaque lancement de plan d\'attaque sauvegardée</li>';
			help += '<li>Dix secondes s\'écoulent entre chaque lancement de vague</li>';
			help += '<li>Dix secondes après impact sur la cible, une mise à jour des données de la marche est effectuée (survivants, status)</li>';
			help += '<li>Les campeurs sont automatiquement rappelés</li>';
			help += '<li>Chaque requête au serveur est exécutée au maximum 3 fois lors de problème réseau ou serveur</li>';
			help += '</ul><h4>Méthode :</h4><ol>';
			help += '<li>Sélectionner une ville</li>';
			help += '<li>Spécifier une ou plusieurs coordonnées (séparées par un retour à la ligne, sous le format x,y)</li>';
			help += '<li>Spécifier le niveau pour les TS attaquées</li>';
			help += '<li>Spécifier combien de places conserver dans le point de ralliement (optionnel)</li>';
			help += '<li>Remplir les vagues d\'attaques (manuellement ou via les attaques préprogrammées)</li>';
			help += '<li>Spécifier les chevaliers (optionnel, par défaut le premier chevalier disponible est utilisé)</li>';
			help += '<li>Les quantités de troupes peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2M pour deux millions, 3G pour trois milliards)</li>';
			help += '<li>Spécifier les quantités de troupes à conserver (optionnel)</li>';
			help += '</ol></div>';

			return help;
		};

	/* SCOUT */
		KOCFIA.scout = {
			module: 'scout'
		};

		KOCFIA.scout.getHelp = function(){
			var help = '<div id="kocfia-'+ this.module +'-help" class="help" title="Aide '+ KOCFIA.modulesLabel[ this.module ] +'">';
			help += '<h4>Règles, limitations et informations :</h4>';
			help += '<ul>';
			help += '<li></li>';
			help += '<li>Les éclairages sauvegardes peuvent être lancés manuellement ou en activant les éclairages automatiques</li>';
			help += '<li>Pour le formulaire les erreurs seront listées au-dessus</li>';
			help += '<li>Lors du démarrage du mode automatique, 20 secondes s\'écoulent entre chaque lancement de plan d\'éclairage sauvegardé</li>';
			help += '<li>Dix secondes s\'écoulent entre chaque lancement de vague</li>';
			help += '<li>Chaque requête au serveur est exécutée au maximum 3 fois lors de problème réseau ou serveur</li>';
			help += '</ul>';
			help += '<h4>Méthode :</h4>';
			help += '<ol>';
			help += '<li>Sélectionner une ou plusieurs villes</li>';
			help += '<li>Spécifier une ou plusieurs coordonnées (séparées par un retour à la ligne, sous le format x,y)</li>';
			help += '<li>Spécifier combien de places conserver dans le point de ralliement (optionnel)</li>';
			help += '<li>Spécifier les quantités d\'éclaireurs à envoyer par éclairage (optionnel)</li>';
			help += '<li>Les quantités de troupes peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2M pour deux millions, 3G pour trois milliards)</li>';
			help += '<li>Spécifier les quantités d\'éclaireurs à conserver (optionnel)</li>';
			help += '</ol>';
			help += '</div>';

			return help;
		};

		KOCFIA.scout.getHeader = function(){
			var header = '<div class="infos cf">';
			header += '<span class="ui-icon ui-icon-info"></span>';
			header += '<span><input type="checkbox" id="'+ this.module +'-panel-automatic" '+ (KOCFIA.conf[ this.module ].automatic ? 'checked' : '') +' autocomplete="off" />';
			header += '<label for="'+ this.module +'-panel-automatic">éclairages automatiques</label></span>';
			header += '</div>'

			return header;
		};

		KOCFIA.scout.getForm = function(){
			var form = '<h3>Configurer un éclairage</h3>';
			form += '<div class="attack-form">';

			//form message area
			form += '<ul class="message"></ul>';

			//form edit inputs
			form += '<input type="hidden" class="edit-attackId" name="attackId" value="" autocomplete="off" />';

			var checkBoxes = '', inputs = '', cityKey, city;
			form += '<table>';
			form += '<thead>';
			form += '<tr><th>&nbsp;</th>';
			for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				cityKey = KOCFIA.citiesKey[i];
				city = KOCFIA.cities[cityKey];

				checkBoxes += '<td><input id="kocfia-'+ this.module +'-'+ cityKey +'" name="city" value="'+ cityKey +'" type="checkbox" class="city-choice" autocomplete="off" /></td>';
				form += '<th><label for="kocfia-'+ this.module +'-'+ cityKey +'">'+ city.label +'</label></th>';

				inputs += '<td><input class="unit-qty" name="'+ cityKey +'" type="text" autocomplete="off" /></td>';
			}
			form += '</tr>';
			form += '</thead>';
			form += '<tbody>';
			form += '<tr class="cities"><td>Depuis :</td>'
			form += checkBoxes + '</tr>';
			form += '<tr class="quantities"><td>Quantité :</td>'
			form += inputs + '</tr>';
			form += '<tr class="keeps"><td>Conserver :</td>'
			form += inputs + '</tr>';
			form += '<tr><td>Garder :</td>';
			form += '<td colspan="99">';
			form += '<input type="text" class="rallypointSlot"> place(s) dans le point de ralliement</td>';
			form += '</td></tr>';
			form += '<tr><td>Coordonnées :</td>';
			form += '<td colspan="99">';
			form += '<small>format: x,y x,y x,y ...</small><br />';
			form += '<textarea name="coords" autocomplete="off"></textarea>';
			form += '</td></tr>';
			form += '</tbody></table>';

			//buttons
			form += '<button class="launch">Lancer</button>';
			form += '<button class="save">Sauvegarder</button>';
			form += '<button class="saveAndLaunch">Sauvegarder et Lancer</button>';
			form += '<button class="reset">Annuler</button>';

			form += '</div>';

			return form;
		};

		KOCFIA.scout.getListsTemplate = function(){
			//attacks list
				var onGoing = '<h3>Eclairage en cours</h3>';
				onGoing += '<div class="attack-list ongoing">';
				onGoing += '<table><thead><tr>';
				onGoing += '<th class="trip">Détails</th>';
				onGoing += '<th class="coords">Coordonnées</th>';
				onGoing += '<th class="current">Cible</th>';
				onGoing += '<th class="info">Info</th>';
				onGoing += '</tr></thead>';
				onGoing += '<tbody></tbody></table></div>';

			//attacks plan
				var savedPlans = '<h3>Eclairages enregistrées</h3>';
				savedPlans += '<div class="attack-list saved">';
				savedPlans += '<table><thead><tr>';
				savedPlans += '<th class="trip">Détails</th>';
				savedPlans += '<th class="coords">Coordonnées</th>';
				savedPlans += '</tr></thead>';
				savedPlans += '<tbody></tbody></table></div>';

			return savedPlans + onGoing;
		};

		KOCFIA.scout.addSectionListeners = function(){
			var module = this.module;
			KOCFIA.$confPanel.find('#kocfia-'+ this.module)
				.on('change', '#'+ module +'-panel-automatic', function(){
					var checked = $(this).prop('checked');
					$('#'+ module +'-automatic').prop('checked', checked).change();
					if( checked ) KOCFIA[ module ].$accordion.accordion('activate', 2);
				})
				//reset form
				.on('click', '.reset', function(){
					var $inputs = KOCFIA[ module ].$form.find('input');

					$inputs.filter('[type=checkbox]').prop('checked', false);
					$inputs.filter('[type=text]').val('');
					KOCFIA[ module ].$form.find('textarea').val('');
				})
				//launch
				.on('click', '.launch', function(){
					if( KOCFIA.conf[ module ].active ){
						var result = KOCFIA[ module ].planAttack();
						if( result.errors.length ){
							KOCFIA[ module ].$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
						} else {
							KOCFIA[ module ].$form.find('.message').empty();
							var d = new Date();
							result.attack.id = Math.floor(d.getTime() / 1000);
							KOCFIA[ module ].launchAttack( result.attack );

							//open ongoing accordion
							KOCFIA[ module ].$accordion.accordion('activate', 2);
						}
					} else {
						alert('Le module n\'est pas actif. Les lancements d\'attaques sont bloqués.');
					}
				})
				//save
				.on('click', '.save, .saveAndLaunch', function(){
					var result = KOCFIA[ module ].planAttack();
					if( result.errors.length ){
						KOCFIA[ module ].$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
					} else {
						KOCFIA[ module ].$form.find('.message').empty();

						var editAttackId = KOCFIA[ module ].$form.find('.edit-attackId').val();
						if( editAttackId != '' ){
							KOCFIA[ module ].deletePlan( editAttackId, false );

							KOCFIA[ module ].$saved.find('tbody')
								.find('tr').filter('[data-attack='+ editAttackId +']')
								.remove();
						}

						var d = new Date();
						result.attack.id = Math.floor(d.getTime() / 1000);

						KOCFIA[ module ].attacks[ result.attack.id ] = result.attack;

						KOCFIA[ module ].$saved.find('tbody')
							.append( KOCFIA[ module ].attackInfo( result.attack ) );

						KOCFIA[ module ].storeAttacks();

						if( KOCFIA.conf[ module ].active && $(this).hasClass('saveAndLaunch') ){
							KOCFIA[ module ].launchAttack( result.attack );

							//open ongoing accordion
							KOCFIA[ module ].$accordion.accordion('activate', 2);
						} else {
							//open saved accordion
							KOCFIA[ module ].$accordion.accordion('activate', 1);
						}
					}
				})
				//attack plan delete
				.on('click', '.delete', function(){
					if( confirm('Etes-vous sûr ?') ){
						var $this = $(this),
							$tr = $(this).closest('tr'),
							attackId = $tr.data('attack');

						KOCFIA[ module ].deletePlan( attackId, true );
						$tr.remove();
					}
				})
				//attack plan edit and duplication
				.on('click', '.edit, .duplicate', function(){
					//reset
					var $inputs = KOCFIA[ module ].$form.find('input');

					$inputs.filter('[type=checkbox]').prop('checked', false);
					$inputs.filter('[type=text]').val('');
					KOCFIA[ module ].$form.find('textarea').val('');

					var $this = $(this),
						$tr = $this.closest('tr'),
						attackId = $tr.data('attack'),
						attack = KOCFIA[ module ].attacks[ attackId ],
						cityKey;

					if( attack ){
						if( $this.hasClass('edit') ){
							KOCFIA[ module ].$form.find('.edit-attackId').val( attack.id );
						}

						var $checkBoxes = KOCFIA[ module ].$form.find('.cities').find('input');
						$checkBoxes.each(function(){
							var $cb = $(this);
							if( $.inArray($cb.val(), attack.cities) > -1 ) $cb.prop('checked', true);
						});

						var $quantities = KOCFIA[ module ].$form.find('.quantities').find('input');
						$quantities.each(function(){
							cityKey = this.name;
							if( attack.units.hasOwnProperty( cityKey ) ){
								this.value = Shared.format(attack.units[ cityKey ]);
							}
						});

						var $keeps = KOCFIA[ module ].$form.find('.keeps').find('input');
						$keeps.each(function(){
							cityKey = this.name;
							if( attack.units.hasOwnProperty( cityKey ) ){
								this.value = Shared.format(attack.keeps[ cityKey ]);
							}
						});

						KOCFIA[ module ].$form.find('textarea').val(attack.coords.join("\n"));
						KOCFIA[ module ].$form.find('.rallypointSlot').val(attack.rpSlot);

						//open form accordion
						KOCFIA[ module ].$accordion.accordion('activate', 0);
					} else {
						alert('Plan d\'attaque introuvable.')
					}
				})
				//stop on next round
				.on('click', '.stop', function(){
					if( confirm('Etes-vous sûr ?') ){
						var d = new Date();

						$(this).removeClass('ui-icon-cancel').removeClass('stop').addClass('ui-icon-trash').addClass('trash').attr('title', 'Enlever les informations')
							.closest('tr').data('stop', 1)
							.find('.info').append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Eclairage stoppé sur demande</div>');
					}
				})
				//manual launch
				.on('click', '.charge', function(){
					if( KOCFIA.conf[ module ].active ){
						if( !KOCFIA.conf[ module ].automatic ){
							var $tr = $(this).hide().closest('tr');
							var attack = KOCFIA[ module ].attacks[ $tr.data('attack') ];
							if( attack ){
								attack.coordIndex = 0;
								attack.marching = [];
								KOCFIA[ module ].refreshOngoingInfo( attack, false );
								KOCFIA[ module ].launchAttack( attack );

								//open ongoing accordion
								KOCFIA[ module ].$accordion.accordion('activate', 2);
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
				//remove ongoing attack info line
				.on('click', '.trash', function(){
					$(this).closest('tr').remove();
				});
		};

		KOCFIA.scout.deletePlan = function( attackId, save ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' deletePlan function', attackId, save);
			delete KOCFIA[ this.module ].attacks[ attackId ];

			if( save ) KOCFIA[ this.module ].storeAttacks();
		};

		KOCFIA.scout.attackInfo = function( attack ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' attackInfo function', attack);

			var code = '<tr data-attack="'+ attack.id +'">';
			code += '<td class="trip">';
			var cityKey, city, i;
			for( i = 0; i < attack.cities.length; i += 1 ){
				cityKey= attack.cities[i];
				city = KOCFIA.cities[ cityKey ];

				code += '<div>';
				code += city.label + ': ';
				code += Shared.format( attack.units[ cityKey ] );
				if( attack.keeps.hasOwnProperty(cityKey) ){
					code += ' ('+ Shared.format( attack.keeps[ cityKey ] ) +')';
				}
				code += '</div>';
			}
			code += '<div>Garder '+ attack.rpSlot +' place'+ (attack.rpSlot > 1 ? 's' : '') +' dans le point de ralliement</div>';
			code += '<div>'+ attack.coords.length +' coordonnée(s)</div>';
			code += '<div><span class="ui-icon ui-icon-flag charge" title="Lancer"></span>';
			code += '<span class="ui-icon ui-icon-pencil edit" title="Modifier"></span>';
			code += '<span class="ui-icon ui-icon-copy duplicate" title="Dupliquer"></span>';
			code += '<span class="ui-icon ui-icon-trash delete" title="Supprimer"></span>';
			code += '</div></td>';
			code += '<td class="coords">' + Shared.mapLink( attack.coords ) +'</td>';
			code += '</tr>';

			return code;
		};

		KOCFIA.scout.listAttacks = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' listAttacks function');
			var $tbody = KOCFIA[ this.module ].$saved.find('tbody');
			$tbody.empty();

			var code = '', a;
			if( !$.isEmptyObject(KOCFIA[ this.module ].attacks) ){
				for( a in KOCFIA[ this.module ].attacks ){
					if( KOCFIA[ this.module ].attacks.hasOwnProperty(a) ){
						code += KOCFIA[ this.module ].attackInfo( KOCFIA[ this.module ].attacks[a] );
					}
				}
			}

			$tbody.append( code );
		};

		KOCFIA.scout.refreshOngoingInfo = function(attack, noButton, msg){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' refreshOngoingInfo function');

			var $tr = KOCFIA[ this.module ].$ongoing.find('tr').filter('[data-attack='+ attack.id +']'),
				$trash = $tr.find('.trash');
			if( $tr.length == 0 || $trash.length ){
				if( $trash.length ) $tr.remove();
				var code = '<tr data-attack="'+ attack.id +'" data-stop="0">';
				code += '<td class="trip">';

				var cityKey, city, i;
				for( i = 0; i < attack.cities.length; i += 1 ){
					cityKey = attack.cities[i];
					city = KOCFIA.cities[ cityKey ];

					code += '<div>';
					if( i == 0 ) code += '<span class="ui-icon ui-icon-cancel stop" title="Arrêter l\'éclairage"></span>';
					code += city.label + ': ';
					code += Shared.format( attack.units[ cityKey ] );
					if( attack.keeps.hasOwnProperty(cityKey) ){
						code += ' ('+ Shared.format( attack.keeps[ cityKey ] ) +')';
					}
					code += '</div>'
				}
				code += '<div>Garder '+ attack.rpSlot +' place'+ (attack.rpSlot > 1 ? 's' : '') +'</div>';
				code += '</td><td class="coords">' + Shared.mapLink( attack.coords ) +'</td>';
				code += '<td class="current"></td>';
				code += '<td class="info"></td>';
				code += '</tr>';

				$tr = $( code );

				KOCFIA[ this.module ].$ongoing.find('tbody').append( $tr );
			}

			//attack stopped
			if( noButton ){
				$tr.find('.stop').removeClass('stop').removeClass('ui-icon-stop')
					.addClass('trash').addClass('ui-icon-trash')
					.attr('title', 'Enlever les informations.');

				//show the manual launch button
				KOCFIA[ this.module ].$saved.find('tr').filter('[data-attack='+ attack.id +']').find('.charge').show();
			} else {
				$tr.find('.current').html( Shared.mapLink( attack.coords[ attack.coordIndex ] ) + '<br>' + (attack.coordIndex + 1) + 'e / ' + attack.coords.length );
			}

			//clean old messages
			var d = new Date(),
				timestamp = d.getTime() / 1000,
				obsolete = 5 * 60 * 1000,
				msgTimestamp;
			$msg = $tr.find('.info').find('div');
			if( $msg.length > 9 ){
				var $tmp = $msg.filter(':lt(9)'); //keep one for td width
				$tmp.slideUp(500, function(){ $tmp.remove(); });
			}
			$msg.each(function(){
				var $div = $(this);
				msgTimestamp = $div.data('timestamp');
				if( msgTimestamp && timestamp - msgTimestamp > obsolete ){
					$div.remove();
				}
			});

			if( !$.isEmptyObject(msg) ){
				$tr.find('.info').append('<div data-timestamp="'+ msg[0] +'">'+ msg[1] +'</div>');
			}
		};

		KOCFIA.scout.planAttack = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' planAttack function');
			var errors = [],
				regexp = /[^0-9, ]/,
				rule;

			//check form
				var $checkBoxes = KOCFIA[ this.module ].$form.find('.cities').find('input').filter(':checked'),
					cities = $checkBoxes.map(function(){ return this.value; }).get();

				if( cities.length == 0 ){
					errors.push('Au moins une cité sélectionnée est nécessaire.');
				}

				var $quantities = KOCFIA[ this.module ].$form.find('.quantities').find('input'),
					units = {}, q, cityKey;
				$quantities.each(function(i, input){
					q = $.trim( input.value );
					if( q != '' ){
						q = Shared.decodeFormat( q );
						cityKey = input.name;

						if( q == false || q < 1 ){
							errors.push('Au moins une des quantités pour éclairer est invalide.');
						} else {
							units[ cityKey ] = q;
						}
					}
				});

				if( $.isEmptyObject(units) ){
					errors.push('Au moins une quantité pour éclairer est nécessaire.');
				}

				var $keeps = KOCFIA[ this.module ].$form.find('.keeps').find('input'),
					keeps = {};
				$keeps.each(function(i, input){
					q = $.trim( input.value );
					if( q != '' ){
						q = Shared.decodeFormat( q );
						cityKey = input.name;

						if( q == false || q < 1 ){
							errors.push('Au moins une des quantités à conserver est invalide.');
						} else {
							keeps[ cityKey ] = q;
						}
					}
				});

				//coord
				var coords,
					coord = $.trim( KOCFIA[ this.module ].$form.find('textarea').val().replace(/\n/g, ' ') );
				if( coord.length == 0 ){
					errors.push('Coordonnée requise.');
				} else if( regexp.test( coord ) ){
					errors.push('Pour la coordonnée, veuillez respecter le format x,y.');
				}
				coords = coord.split(' ');

				//rally point free slot
				var rps = $.trim(KOCFIA[ this.module ].$form.find('.rallypointSlot').val());
				if( rps == '' ) rps = 0;
				rps = parseInt( rps, 10 );
				if( isNaN(rps) || rps < 0 ){
					errors.push('Le nombre de places à conserver dans le point de ralliement doit être un chiffre positif.');
				}

				if( errors.length ){
					errors = errors.unique();
				}

				rule = {cities: cities, units: units, keeps: keeps, category: this.module, type: 'scout', rpSlot: rps, coords: coords};

			return {attack: rule, errors: errors};
		};

	/* NOTEPAD */
		KOCFIA.notepad = {
			options: {
				active: 1,
				visible: 0,
				moveable: 1,
				position: {top: 10, left: 10},
				size: {width: 300, height: 280},
			},
			stored: ['notes'],
			notes: {}
		};

		KOCFIA.notepad.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad confPanel function');
			var code = '<h3>Bloc-note</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('notepad', 'active', 'Activer le module', KOCFIA.conf.notepad.active);
			code += Shared.generateButton('notepad', 'resetPositionAndDimension', 'Remise à zéro de la position et des dimensions');
			code += Shared.generateButton('notepad', 'clean', 'Supprimer les notes');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.notepad.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad on function');
			$head.append( $('<style id="kocfia-notepad-css">').html(notepadCss) );

			var $notepad = $('<div id="kocfia-notepad" class="ui-widget ui-widget-content ui-corner-all">');

			var code = '<h3 class="title">Bloc Note</h3><div class="wrapper"><div class="content">';
			code += '<label for="kocfia-notepad-note-name">Nom de la note&nbsp;:&nbsp;</label>';
			code += '<input type="text" id="kocfia-notepad-note-name" />';
			code += '<br><label for="kocfia-notepad-note-text">';
			code += '<span class="charsLeft">1000 caractères restant</span>Contenu&nbsp;:&nbsp;</label>';
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
			code += '</ul></div></div>';

			$notepad
				.append( '<span class="ui-icon ui-icon-close"></span>' )
				.append( code )
				.draggable({
					handle: 'h3, .content',
					scroll: true,
					distance: 20,
					stop: function(event, ui){
						KOCFIA.conf.notepad.position = ui.position;
						Shared.storeConf();
					}
				})
				.resizable({
					minWidth: 200,
					minHeight: 200,
					resize: function(){
						KOCFIA.notepad.$wrapper.css('height', KOCFIA.notepad.calcInnerHeight());
					},
					stop: function(event, ui){
						KOCFIA.conf.notepad.size = ui.size;
						Shared.storeConf();
					}
				})
				.css({
					top: KOCFIA.conf.notepad.position.top,
					left: KOCFIA.conf.notepad.position.left,
					width: KOCFIA.conf.notepad.size.width,
					height: KOCFIA.conf.notepad.size.height,
				})
				.on('click', '.ui-icon-close', function(){
					KOCFIA.notepad.$div.hide();
					KOCFIA.conf.notepad.visible = 0;
					Shared.storeConf();
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
							KOCFIA.notepad.notes[ id ] = {name: name, text: text};
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
			KOCFIA.notepad.$title = KOCFIA.notepad.$div.find('.title');
			KOCFIA.notepad.$notes = KOCFIA.notepad.$div.find('.notes');
			KOCFIA.notepad.$wrapper = KOCFIA.notepad.$div.find('.wrapper');
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
				KOCFIA.notepad.$wrapper.css('height', KOCFIA.notepad.calcInnerHeight());
			}

			var $notepadToggle = $('<button id="kocfia-notepad-toggle">').html('Bloc Note');
			$notepadToggle.click(function(){
				KOCFIA.notepad.$div.toggle();

				KOCFIA.conf.notepad.visible = (KOCFIA.notepad.$div.is(':visible') ? 1 : 0);

				if( KOCFIA.conf.notepad.visible ) KOCFIA.notepad.$wrapper.css('height', KOCFIA.notepad.calcInnerHeight());

				Shared.storeConf();
			});

			KOCFIA.$buttons.append($notepadToggle);
		};

		KOCFIA.notepad.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad off function');
			KOCFIA.notepad.$div.remove();
			$('#kocfia-notepad-toggle').remove();
			$('#kocfia-notepad-css').remove();
		};

		KOCFIA.notepad.calcInnerHeight = function(){
			return KOCFIA.notepad.$div.innerHeight() - KOCFIA.notepad.$title.height() - 20;
		};

		KOCFIA.notepad.resetPositionAndDimension = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad resetPositionAndDimension function');

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

			Shared.storeConf();
		};

		KOCFIA.notepad.clean = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad clean function');

			localStorage.setObject('kocfia_notepad_notes_' + KOCFIA.storeUniqueId, '');

			KOCFIA.notepad.$notes.empty();
		};

		KOCFIA.notepad.load = function( id ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad load function');

			if( KOCFIA.notepad.notes[id] ){
				KOCFIA.notepad.$name.val( KOCFIA.notepad.notes[id].name );
				KOCFIA.notepad.$textarea.val( KOCFIA.notepad.notes[id].text );
			} else {
				alert('Note introuvable.');
			}
		};

		KOCFIA.notepad.delete = function( id ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('kocfia notepad delete function');
			delete KOCFIA.notepad.notes[id];
			KOCFIA.notepad.storeNotes();
		};

		KOCFIA.notepad.storeNotes = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad storeNotes function');
			localStorage.setObject('kocfia_notepad_notes_' + KOCFIA.storeUniqueId, KOCFIA.notepad.notes);
		};

	/* MAP */
		KOCFIA.map = {
			options: {
				active: 1,
			},
			stored: ['search'],
			search: {},/*{by city, tiles}*/
			currentSearch: {},
			loadTypeLabels: { C: 'cités', CB: 'Camps Barbares', TS: 'Terres Sauvages', FS: 'Forêts Sombres' },
		};

		KOCFIA.map.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map confPanel function');
			var code = '<h3>Carte</h3>';
			code += '<div>';
			code += Shared.generateButton('map', 'cleanSearch', 'Supprimer toutes les recherches géographiques');

			var i, cityKey, city;
			for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				cityKey = KOCFIA.citiesKey[i];
				city = KOCFIA.cities[cityKey];
				code += Shared.generateButton('map', 'cleanSearchForCity', 'Supprimer les recherches géographiques de ' + city.label, cityKey).replace(/<\/p>/, '');
			}
			code += '</p></div>';

			$section.append( code );
		};

		KOCFIA.map.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map modPanel function');
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
				code += '<option value="'+ city.coords.x + '|' + city.coords.y +'">'+ city.label +'</option>';

				if( KOCFIA.map.search.hasOwnProperty( cityKey ) ){
					if( !$.isEmptyObject( KOCFIA.map.search[ cityKey ] ) ){
						loadOptions += '<option value="'+ cityKey +'">'+ city.label +'</option>';
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
				code += '<option value="'+ cityKey +'">'+ city.label +'</option>';
			}

			code += '</select><button>Sauvegarder</button></fieldset>';
			code += '<fieldset class="filter"><legend>Filter les résultats</legend>';
			code += '<textarea id="kocfia-map-coordsList"></textarea>';
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
			code += '<div class="buttonset">';
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
			code += '</div></div><div class="status">';
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
								loadOptions += '<option value="'+ key +'">'+ city.label +'</option>';
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

					KOCFIA.map.$filter.find('.level, .type, .status, .mist').hide();
					KOCFIA.map.$coordsList.hide();

					var category = $(this).val();
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

			$section.find('.buttonset').buttonset();

			KOCFIA.map.$search = $('#kocfia-map').find('.search');
			KOCFIA.map.$save = $('#kocfia-map').find('.save');
			KOCFIA.map.$filter = $('#kocfia-map').find('.filter');
			KOCFIA.map.$category = $('#kocfia-map-category');
			KOCFIA.map.$coordsList = $('#kocfia-map-coordsList');
			KOCFIA.map.$results = $('#kocfia-map').find('.search-result');
			KOCFIA.map.$status = $('#kocfia-map').find('.search-status');
		};

		KOCFIA.map.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map on function');
		};

		KOCFIA.map.cleanSearch = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map cleanSearch function');
			localStorage.removeItem('kocfia_map_search_' + KOCFIA.storeUniqueId);

			$('#kocfia-map-load-saved').find('option').filter(':gt(0)').remove();
		};

		KOCFIA.map.cleanSearchForCity = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map cleanSearchForCity function');
			KOCFIA.map.search[cityKey] = {};
			localStorage.setObject('kocfia_map_search_' + KOCFIA.storeUniqueId, KOCFIA.map.search);

			$('#kocfia-map-load-saved').find('option').filter('[value='+ cityKey +']').remove();
		};

		KOCFIA.map.storeSearch = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map storeSearch function');
			localStorage.setObject('kocfia_map_search_' + KOCFIA.storeUniqueId, KOCFIA.map.search);
		};

		KOCFIA.map.explore = function( coordX, coordY, rangeMin, rangeMax ){
			if( KOCFIA.map.searching ) return;
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map explore function');

			/* deferred functions */
				//display the partialExplore results, while merging them with previous results
				var parseResults = function( dfd, coordX, coordY, rangeMin, rangeMax, result ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map explore deferred parseResults function');
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
							range = Shared.getDistance(coordX, coordY, tile.xCoord, tile.yCoord);
							if( range >= rangeMin && range <= rangeMax ){
								//city
									if( tile.tileType == 51 ){
										if( tile.tileCityId != null ){
											user = result.userInfo['u'+ tile.tileUserId];
											name = (user.s == 'M' ? 'Lord' : 'Lady') + ' ' + user.n;
											tiles.city.push({ category: 'C', range: range, x: tile.xCoord, y: tile.yCoord, might: Shared.format(user.m), player: name, city: tile.cityName, misted: 0 });
										} else {
								//barbarian
											tiles.barbarian.push({ category: 'CB', range: range, x: tile.xCoord, y: tile.yCoord, level: tile.tileLevel });
										}
									} else if( tile.tileType == 53 ){
										tiles.city.push({ category: 'C', range: range, x: tile.xCoord, y: tile.yCoord, might: '?', player: '?', city: '?', misted: 1 });
								//dark forest
									} else if( tile.tileType == 54 ){
										tiles.darkForest.push({ category: 'FS', range: range, x: tile.xCoord, y: tile.yCoord, level: tile.tileLevel });
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
												might = (user != null ? Shared.format(user.m) : '?');
											}
										}

										tiles.wilderness.push({ category: 'TS', range: range, type: tile.tileType, label: label, x: tile.xCoord, y: tile.yCoord, might: might, player: name, level: tile.tileLevel });
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

					KOCFIA.map.currentSearch = {x: coordX, y: coordY, rangeMin: rangeMin, rangeMax: rangeMax, tiles: tiles};

					if( KOCFIA.map.$category.val() != '' ) KOCFIA.map.displayResultsByCategory();
					else {
						KOCFIA.map.$filter.find('.level, .type, .status, .mist').hide();
						KOCFIA.map.$coordsList.hide();
						KOCFIA.map.$results.empty();
					}

					if( !loop ) return dfd.resolve();
					else {
						start += 100;
						end += 100;
						return dfd.pipe( partialExplore(dfd, 3) );
					}
				};

				//split the full coordinates search in small requests of 100 coordinates
				var partialExplore = function(dfd, attempts){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map explore deferred partialExplore function', start, end, length);

					if( !KOCFIA.map.searching ){
						return dfd.reject();
					}

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
							dataType: 'json',
							timeout: 10000,
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
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map explore deferred searchSequence function');
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
						var range = Shared.getDistance(coordX, coordY, i, j);
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
					KOCFIA.map.$status.html('Recherche stoppée ou échouée avant la fin.');
				})
				.always(function(){
					KOCFIA.map.$save.show();
					KOCFIA.map.$search.find('.go').removeAttr('disabled').html('Rechercher');
					KOCFIA.map.searching = false;
				});
		};

		KOCFIA.map.displayResultsByCategory = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map displayResultsByCategory function');
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
							code += '<td>'+ Shared.mapLink(tile.x + ',' + tile.y) +'</td>';
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
							code += '<td>'+ Shared.mapLink(tile.x + ',' + tile.y) +'</td>';
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
							code += '<td>'+ Shared.mapLink(tile.x + ',' + tile.y) +'</td>';
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
							code += '<td>'+ Shared.mapLink(tile.x + ',' + tile.y) +'</td>';
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

			KOCFIA.map.$results.html( code );
			KOCFIA.map.filterResults();
		};

		KOCFIA.map.filterResults = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map filterResults function');
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
			$trs.filter(':visible').each(function(){
				var coord = $(this).data('coord');
				if( coord ) list.push(coord);
			});

			KOCFIA.map.$coordsList.html( list.join("\n") ).show();
		};

	/* FORMATION */
		KOCFIA.formation = {
			options: {
				active: 1,
				automatic: 0,
			},
			stored: ['rules', 'savedRules'],
			rules: {}, //by city id
			savedRules: {}, //by name
		};

		KOCFIA.formation.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation confPanel function');
			var code = '<h3>Formation</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('formation', 'active', 'Activer le module', KOCFIA.conf.formation.active);
			code += Shared.generateCheckbox('formation', 'automatic', 'Lancer les formations automatiques', KOCFIA.conf.formation.automatic);
			code += Shared.generateButton('formation', 'deleteAllRules', 'Supprimer toutes les règles de formation enregistrées');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.formation.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-formation').html('');

			var form = '<h3>Configurations';
			form += '<span class="ui-icon ui-icon-info"></span>';
			form += '<span><input type="checkbox" id="formation-panel-automatic" '+ (KOCFIA.conf.formation.automatic ? 'checked' : '') +' autocomplete="off" />';
			form += '<label for="formation-panel-automatic">formations automatiques</label></span>';
			form += '</h3><div class="forms">';

			//automatic formation form
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

			//automatic formation rules save / charge form
				form += '<h3>Commutateur de règles automatiques</h3>';
				form += '<div class="rule-switch-form">';
				form += '<table><tbody><tr><td>';
				form += '<label for="kocfia-formation-rule-name">Nom de la règle : </label>';
				form += '<input type="text" id="kocfia-formation-rule-name" autocomplete="off">';
				form += '<button class="train-rule-save">Sauvegarder</button>';
				form += '</td><td>';
				form += '<select id="kocfia-formation-rule-switch">';
				form += '<option value="">Choisir</option>';
				for( var ruleName in KOCFIA.formation.savedRules ){
					if( KOCFIA.formation.savedRules.hasOwnProperty( ruleName ) ){
						form += '<option value="'+ ruleName +'">'+ ruleName +'</option>';
					}
				}
				form += '</select>';
				form += '<button class="train-rule-load">Activer</button>';
				form += '<button class="train-rule-delete">Supprimer</button>';
				form += '</td></tr></tbody></table></div>';

			//manual formation form
				form += '<h3>Formations manuelles</h3>';
				form += '<div class="manual-train-form">';
				form += '<ul class="message"></ul>';
				form += '<fieldset>';

				form += '<select id="kocfia-formation-city" class="train-city"><option value="">Villes</option>';
				for( i = 0; i < cLength; i += 1 ){
					cityKey = KOCFIA.citiesKey[i];
					city = KOCFIA.cities[cityKey];
					form += '<option value="'+ cityKey +'">'+ city.label +'</option>';
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
					onGoing += city.label +'</th></tr></tbody>';
				}
				onGoing += '</table></div>';

			//help
				var help = '<div id="kocfia-formation-help" class="help" title="Aide formation"><ul>';
				help += '<h3>Formation automatique</h3><ul>';
				help += '<li>Cocher les villes ou la formation automatique sera utilisée</li>';
				help += '<li>Une ville décochée sera omise lors des tentatives de formations automatique</li>';
				help += '<li>Choisir une unité ou une fortification ou les deux</li>';
				help += '<li>Spécifier une quantité de troupe minimum et maximum</li>';
				help += '<li>Spécifier une vitesse (optionnel, par défaut vitesse de base)</li>';
				help += '<li>Choisir le pourcentage de travailleurs utilisables (optionnel, par défaut 0%)</li>';
				help += '<li>Spécifier une quantité de fortification</li>';
				help += '<li>Spécifier les quantités de ressources à conserver (optionnel)</li>';
				help += '<li>Les quantités de troupes peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2M pour deux millions, 3G pour trois milliards)</li>';
				help += '<li>Cliquer sur enregistrer</li>';
				help += '<li>Si les formations automatiques sont actives, la modification sera prise en compte dès la prochaine tentative de formation</li>';
				help += '<li>Douze minutes entre chaque tentative</li>';
				help += '</ul><h3>Commutateur</h3><ul>';
				help += '<li>La configuration automatique en cours peut être sauvegardée</li>';
				help += '<li>Une configuration sauvegardée peut être chargée ou supprimée</li>';
				help += '<li>Une configuration chargée sera prise en compte à la prochaine tentative de formation (pour les villes cochées)</li>';
				help += '<li>Une configuration supprimée n\'affecte pas la configuration en cours</li>';
				help += '</ul><h3>Formation manuelle</h3><ul>';
				help += '<li>Choisir une ville</li>';
				help += '<li>Le remplissage du formulaire se fait comme pour les formations automatiques</li>';
				help += '<li>Cliquer sur Former</li>';
				help += '<li>La file d\'attente sera remplie jusqu\'à ne plus avoir de place dans les casernes ou d\'avoir une erreur</li>';
				help += '<li>20 secondes entre chaque tentative</li>';
				help += '</ul></div>';

			$section.append( form + onGoing + help )
			//listener
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
						$fieldset.find('.launch, .reset').hide();
					} else {
						$dynamic.html( KOCFIA.formation.getFieldset(cityKey, false) );
						$fieldset.find('.launch, .reset').show();
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
					var result = KOCFIA.formation.planRule();
					if( result.errors.length ){
						KOCFIA.formation.$manualForm.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
					} else {
						KOCFIA.formation.$manualForm.find('.message').empty();

						KOCFIA.formation.launchFormations( result.rule );
					}
				})
				//reset manual form
				.on('click', '.reset', function(){
					$fieldset.find('.launch, .reset').hide();
					var $inputs = KOCFIA.formation.$manualForm.find('input');
					inputs.filter('[type=checkbox]').prop('checked', false);
					inputs.filter('[type=text]').val('');

					KOCFIA.formation.$manualForm.find('select').val('');

					KOCFIA.formation.$manualForm.find('.message').empty();
				})
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
						$output.html( Shared.readableDuration(time[0]) + ' - ' + Shared.readableDuration(time[1]) );
					} else $output.html( Shared.readableDuration(time) );
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

					$output.html( Shared.readableDuration(time) );
				})
				//calc max trainable units
				.on('click', '.train-unit-max', function(){
					var $fieldset = $(this).closest('fieldset');

					var unit = $fieldset.find('.train-unit').val(),
						$max = $fieldset.find('.train-max'),
						$min = $fieldset.find('.train-min');

					if( unit == '' ){
						$max.val('').attr('title', '').trigger('change');
						return;
					}

					var speed = $fieldset.find('.train-speed').val(),
						cityKey = $fieldset.find('.train-city').val();

					var max = KOCFIA.formation.calcMaxUnit( cityKey, unit, speed ),
						min = max * 0.9;

					if( $min.val() == '' ) $min.val( Shared.format(min) || 0 ).attr('title', Shared.readable(min) || 0).trigger('change');
					$max.val( Shared.format(max) || 0 ).attr('title', Shared.readable(max) || 0).trigger('change');
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

					$qty.val( Shared.format(nb) || 0 ).attr('title', nb || 0).trigger('change');
				})
				//unit change, affect max unit
				.on('change', '.train-unit', function(){
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
				//defense change, affect quantity
				.on('change', '.train-defense', function(){
					var $fieldset = $(this).closest('fieldset');

					var defense = $fieldset.find('.train-defense').val(),
						$qty = $fieldset.find('.train-qty');
					if( defense == '' ){
						$qty.val('').attr('title', '');
						return;
					} else {
						//will call the duration update
						$qty.trigger('change');
					}
				})
				//training and fortification cancel
				.on('click', '.ongoing .unit .ui-icon-trash', function(){
					var $this = $(this), d = new Date(),
						cityKey = $this.closest('tbody').data('city'),
						$info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city='+ cityKey +']').find('.info');
					if( $this.hasClass('recursive') ){
						var cancelSequence = function(){
							return $.Deferred(function(dfd){
								KOCFIA.formation.cancelTraining(dfd, cityKey, i, null, 3);
							}).promise();
						};

						var i = window.seed.queue_unt[cityKey].length;

						$info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation des formations en masse en cours.</div>');

						$.when( cancelSequence() )
							.done(function(){
								$info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation des formations en masse finies.</div>');
							})
							.fail(function(){
								$info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation des formations en masse échouée.</div>');
							})
							.always(function(){
								KOCFIA.formation.listCityFormations( cityKey );
							});
					} else {
						$info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation d\'une formation en cours.</div>');
						KOCFIA.formation.cancelTraining( null, null, null, $this.attr('rel'), 3 );
					}
				})
				.on('click', '.ongoing .fort .ui-icon-trash', function(){
					var $this = $(this), d = new Date(),
						cityKey = $this.closest('tbody').data('city'),
						$info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city='+ cityKey +']').find('.info');

					if( $this.hasClass('recursive') ){
						var cancelSequence = function(){
							return $.Deferred(function(dfd){
								KOCFIA.formation.cancelFortification(dfd, cityKey, i, null, 3);
							}).promise();
						};

						var i = window.seed.queue_frt[cityKey].length;

						$info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation des fortifications en masse en cours.</div>');

						$.when( cancelSequence() )
							.done(function(){
								$info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation des fortifications en masse finie.</div>');
							})
							.fail(function(){
								$info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation des fortifications en masse échouée.</div>');
							})
							.always(function(){
								KOCFIA.formation.listCityFormations( cityKey );
							});
					} else {
						$info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation d\'une fortification en cours.</div>');
						KOCFIA.formation.cancelFortification( null, null, null, $this.attr('rel'), 3 );
					}
				})
				//keep values copy accross fieldsets
				.on('click', '.ui-icon-copy', function(){
					var $this = $(this),
						$fieldset = $this.closest('fieldset'),
						$other = $fieldset.siblings('fieldset'),
						rel = $this.attr('rel');
					if( rel == 'keep' ){
						var keeps = $fieldset.find('.train-keep').find('input').map(function(){ return this.value; }).get();

						$other.each(function(){
							$(this).find('.train-keep').find('input').each(function(j, field){
								field.value = keeps[j];
							});
						});
					} else if( rel == 'unit' ){
						var units = $fieldset.find('.unit').find('input, select').map(function(){ return this.value; }).get();

						$other.each(function(){
							$(this).find('.unit').find('input, select').each(function(j){
								var $field = $(this);
								if( $field.hasClass('train-unit') ){
									if( $field.find('option').filter('[value='+ units[j] +']').length ){
										$field.val(units[j]);
									} else {
										$field.val('');
									}
								} else {
									$field.val(units[j]);
								}
							});
						});

						$other.find('.train-max').trigger('change');
					} else if( rel == 'defense' ){
						var defenses = $fieldset.find('.defense').find('input, select').map(function(){ return this.value; }).get();

						$other.each(function(){
							$(this).find('.defense').find('input, select').each(function(j){
								var $field = $(this);
								if( $field.hasClass('train-defense') ){
									if( $field.find('option').filter('[value='+ defenses[j] +']').length ){
										$field.val(defenses[j]);
									} else {
										$field.val('');
									}
								} else {
									$field.val(defenses[j]);
								}
							});
						});

						$other.find('.train-qty').trigger('change');
					}
				})
				//current rule save
				.on('click', '.train-rule-save', function(){
					var name = $.trim( KOCFIA.formation.$ruleName.val() ),
						code = '<option value="">Choisir</option>',
						ruleName;
					if( name != '' ){
						if( KOCFIA.formation.savedRules.hasOwnProperty( name ) ){
							alert('Nom déjà utilisé');
						} else {
							KOCFIA.formation.$ruleName.val('');
							KOCFIA.formation.savedRules[ name ] = $.extend({}, KOCFIA.formation.rules);
							KOCFIA.formation.storeSavedRules();

							for( ruleName in KOCFIA.formation.savedRules ){
								if( KOCFIA.formation.savedRules.hasOwnProperty( ruleName ) ){
									code += '<option value="'+ ruleName +'">'+ ruleName +'</option>';
								}
							}
							KOCFIA.formation.$ruleSwitch.empty().append( code );
						}
					}
				})
				//saved rule load
				.on('click', '.train-rule-load', function(){
					var choice = KOCFIA.formation.$ruleSwitch.val(),
						code = '', i;
					if( choice != '' && KOCFIA.formation.savedRules.hasOwnProperty( choice ) ){
						KOCFIA.formation.rules = $.extend({}, KOCFIA.formation.savedRules[ choice ]);

						KOCFIA.formation.$autoForm.find('fieldset').remove();
						for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
							code += KOCFIA.formation.getFieldset( KOCFIA.citiesKey[i], true );
						}

						KOCFIA.formation.$autoForm.find('button').eq(0).after( code );

						KOCFIA.formation.$forms.accordion('activate', 0);

						KOCFIA.formation.$ruleSwitch.val('');
						KOCFIA.formation.storeRules();
					}
				})
				//saved rule delete
				.on('click', '.train-rule-delete', function(){
					var choice = KOCFIA.formation.$ruleSwitch.val(),
						code = '', i;

					if( choice != '' && KOCFIA.formation.savedRules.hasOwnProperty( choice ) ){
						if( confirm('Etes-vous sûr ?') ){
							delete KOCFIA.formation.savedRules[ choice ];

							KOCFIA.formation.$ruleSwitch.find('option').filter('[value='+ choice +']').remove();
							KOCFIA.formation.$ruleSwitch.val('');

							KOCFIA.formation.storeSavedRules();
						}
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
				});

			KOCFIA.formation.$forms = $section.find('.forms');
			KOCFIA.formation.$autoForm = $section.find('.automatic-train-form');
			KOCFIA.formation.$manualForm = $section.find('.manual-train-form');
			KOCFIA.formation.$ongoing = $section.find('.formation-list.ongoing');
			KOCFIA.formation.$ruleSwitch = $section.find('#kocfia-formation-rule-switch');
			KOCFIA.formation.$ruleName = $section.find('#kocfia-formation-rule-name');

			KOCFIA.formation.$autoForm.find('.train-max, .train-qty').trigger('change');

			KOCFIA.formation.$forms.accordion({collapsible: true, autoHeight: false, animated: false}).accordion('activate', false);
		};

		KOCFIA.formation.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation on function');

			KOCFIA.formation.getTrainingGamble( 3 );

			var delayed = function(i){
				window.setTimeout(function(){
					KOCFIA.formation.listCityFormations( KOCFIA.citiesKey[i] );
				}, i * 2000 + 5000);
			}

			var i, length = KOCFIA.citiesKey.length;
			for( i = 0; i < length; i += 1 ){
				delayed(i);
			}

			if( KOCFIA.conf.formation.automatic ){
				KOCFIA.formation.automaticOn();
			}
		};

		KOCFIA.formation.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation off function');

			KOCFIA.formation.automaticOff();
		};

		KOCFIA.formation.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation automaticOn function');
			$('#formation-panel-automatic').prop('checked', true);

			//recursive call every 12 minutes
			autoFormationInterval = window.setInterval(function(){
				KOCFIA.formation.launchAutomaticFormations();
			}, 1 * 60 * 1000);

			KOCFIA.formation.launchAutomaticFormations();
		};

		KOCFIA.formation.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation automaticOff function');
			$('#formation-panel-automatic').prop('checked', false);

			window.clearInterval( autoFormationInterval );
			window.clearInterval( autoFormationInfoCleanInterval );
		};

		KOCFIA.formation.getFieldset = function( cityKey, withWrapper ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getFieldset function');
			var city = KOCFIA.cities[ cityKey ],
				rule = KOCFIA.formation.rules[ cityKey ],
				units = KOCFIA.formation.getTrainableUnits( cityKey ),
				defenses = KOCFIA.formation.getTrainableDefenses( cityKey ),
				rLength = KOCFIA.resources.length;

			var form = '';
			if( withWrapper ){
				form += '<fieldset>';
				form += '<legend>';
				form += '<input type="checkbox" class="train-city" id="kocfia-formation-auto-'+ cityKey +'" name="city" ';
				form += ( rule && rule.active ? 'checked' : '' ) +' value="'+ cityKey +'" autocomplete="off" />';
				form += city.label +'</legend>';
			}

			form += '<p class="unit">';
			if( withWrapper ) form += '<span class="ui-icon ui-icon-copy" rel="unit"></span>';
			//choose unit (check building requirements and tech requirements)
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-unit">Unités&nbsp;:&nbsp;</label>';
				form += '<select id="kocfia-formation-auto-'+ cityKey +'-unit" class="train-unit" name="unit" autocomplete="off">';
				form += '<option value=""></option>';

				for( u in units ){
					if( units.hasOwnProperty(u) ){
						var name = window.unitcost[u][0];
						if( name == 'Unité de Ravitaillement' ) name = 'Ravitailleur';
						else if( name == 'Wagon de Ravitaillement' ) name = 'Wagon';

						form += '<option value="'+ u +'" '+ ( rule && rule.troop == u ? 'selected' : '' ) +'>'+ name +'</option>';
					}
				}
				form += '</select>';

			//choose pack size min and max
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-min">Min&nbsp;:&nbsp;</label>';
				form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-min" name="min" class="train-min" ';
				form += 'autocomplete="off" value="'+ ( rule && rule.min >= 0 ? Shared.format(rule.min) : '' ) +'" />';
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-max">Max&nbsp;:&nbsp;</label>';
				form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-max" name="max" class="train-max" ';
				form += 'autocomplete="off" value="'+ ( rule && rule.max >= 0 ? Shared.format(rule.max) : '' ) +'" />';
				form += '<button class="train-unit-max">max</button>';

			//choose speed
				form += '<br /><label for="kocfia-formation-auto-'+ cityKey +'-speed">Vitesse&nbsp;:&nbsp;</label>';
				form += '<select id="kocfia-formation-auto-'+ cityKey +'-speed" name="speed" class="train-speed" autocomplete="off">';
				form += '<option value="0">Normal</option>';
				form += '<option value="1"'+ ( rule && rule.speed == 1 ? 'selected' : '' ) +'>5-15% (coût x2)</option>';
				form += '<option value="2"'+ ( rule && rule.speed == 2 ? 'selected' : '' ) +'>10-25% (coût x4)</option>';
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
				form += '<option value="0.25" '+ ( rule && rule.workforce == 0.25 ? 'selected' : '' ) +'>25%</option>';
				form += '<option value="0.50" '+ ( rule && rule.workforce == 0.50 ? 'selected' : '' ) +'>50%</option>';
				form += '<option value="0.75" '+ ( rule && rule.workforce == 0.75 ? 'selected' : '' ) +'>75%</option>';
				form += '<option value="1"'+ ( rule && rule.workforce == 1 ? 'selected' : '' ) +'>100%</option>';
				form += '</select>';

			//duration
				form += '<label>Durée&nbsp;:&nbsp;</label>';
				form += '<output class="unit-duration"></output>';
			form += '</p>';

			//defenses
				form += '<p class="defense">';
				if( withWrapper ) form += '<span class="ui-icon ui-icon-copy" rel="defense"></span>';
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-defense">Défenses&nbsp;:&nbsp;</label>';
				form += '<select id="kocfia-formation-auto-'+ cityKey +'-defense" name="defense" class="train-defense" autocomplete="off">';
				form += '<option value=""></option>';
				for( d in defenses ){
					if( defenses.hasOwnProperty(d) ){
						f = d.replace(/frt/, 'fort');
						form += '<option value="'+ d +'" '+ ( rule && rule.defense == d ? 'selected' : '' ) +'>';
						form += window.fortcost[d][0] +'</option>';
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
				if( withWrapper ) form += '<span class="ui-icon ui-icon-copy" rel="keep"></span>';
				form += '<label>Garder&nbsp;:&nbsp;</label>';
				for( j = 0; j < rLength; j += 1 ){
					res = KOCFIA.resources[j];
					if( res.name != 'resource7' ){
						form += '<label for="kocfia-formation-auto-'+ cityKey +'-keep-'+ res.name +'">';
						form += '<img src="'+ res.icon +'" title="'+ res.label +'">';
						form += '</label>';
						form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-keep-'+ res.name +'" ';
						form += 'name="'+ res.key +'" autocomplete="off" ';
						form += 'value="'+ ( rule && rule.keep[ res.key ] >= 0 ? Shared.format(rule.keep[ res.key ]) : '' ) +'">';
					}
				}
			form += '</p>';
			if( withWrapper ) form += '</fieldset>';

			return form;
		};

		KOCFIA.formation.storeRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation storeRules function');
			localStorage.setObject('kocfia_formation_rules_' + KOCFIA.storeUniqueId, KOCFIA.formation.rules);
		};

		KOCFIA.formation.storeSavedRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation storeSavedRules function');
			localStorage.setObject('kocfia_formation_savedRules_' + KOCFIA.storeUniqueId, KOCFIA.formation.savedRules);
		};

		KOCFIA.formation.getTrainingGamble = function( attempts ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getTrainingGamble function');
			var params = $.extend({}, window.g_ajaxparams);

			$.ajax({
				url: window.g_ajaxpath + "ajax/getTroopGambles.php" + window.g_ajaxsuffix,
				type: 'post',
				data: params,
				dataType: 'json',
				timeout: 10000,
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
		};

		KOCFIA.formation.planAutomaticRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation planAutomaticRules function');
			var rules = {},
				errors = [],
				$fieldsets = KOCFIA.formation.$autoForm.find('fieldset'),
				rule, nbErr, hasTroop, hasDef, cityLabel, $city, troop, defense, min, max, quantity, $res, rkeep;

			$fieldsets.each(function(){
				var $fieldset = $(this),
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
					min = Shared.decodeFormat( $.trim( $fieldset.find('.train-min').val() ) );
					max = Shared.decodeFormat( $.trim( $fieldset.find('.train-max').val() ) );

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
					quantity = Shared.decodeFormat( $.trim( $fieldset.find('.train-quantity').val() ) );
					if( qty != false && qty >= 1 ){
						rule.qty = qty;
					}
				}

				//check keep
				rule.keep = {};
				if( hasTroop || hasDef ){
					$fieldset.find('.train-keep').find('input').each(function(){
						res = $.trim( this.value );
						if( res != '' ){
							res = Shared.decodeFormat( res );
							if( res == false ){
								nbErr += 1;
								errors.push('Au moins une des quantité de ressources à conserver est invalide pour '+ cityLabel +'.');
							} else {
								rule.keep[ this.name ] = res;
							}
						}
					});
				}

				if( nbErr == 0 && (hasTroop || hasDef) ){
					rules[ rule.cityKey ] = rule;
				}
			});

			return {rules: rules, errors: errors};
		};

		KOCFIA.formation.planRule = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation planRule function');
			var rule = {},
				errors = [],
				$fieldset = KOCFIA.formation.$manualForm.find('fieldset'),
				nbErr, hasTroop, hasDef, cityLabel = '', $city, troop,
				defense, min, max, quantity, $res, res, rkeep;

			nbErr = 0;
			hasTroop = false;
			hasDef = false;
			$city = $fieldset.find('.train-city');

			//city
			rule.cityKey = $city.val();

			if( rule.cityKey == '' ){
				errors.push('Cité invalide.');
			}

			//check troop
			troop = $fieldset.find('.train-unit').val();
			if( troop != '' ){
				hasTroop = true;
				rule.troop = troop;

				//check min and max
				min = Shared.decodeFormat( $.trim( $fieldset.find('.train-min').val() ) );
				max = Shared.decodeFormat( $.trim( $fieldset.find('.train-max').val() ) );

				if( min != false && max != false && min >= 1 && max >= min ){
					rule.min = min;
					rule.max = max;
				} else {
					errors.push('Quantités de troupes invalide.');
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
				quantity = Shared.decodeFormat( $.trim( $fieldset.find('.train-quantity').val() ) );
				if( qty != false && qty > 1 ){
					rule.qty = qty;
				}
			}

			//check keep
			rule.keep = {};
			$fieldset.find('.train-keep').find('input').each(function(){
				res = $.trim( this.value );
				if( res != '' ){
					res = Shared.decodeFormat( res );
					if( res != false && res > 1 ){
						rule.keep[ this.name ] = res;
					} else {
						nbErr += 1;
						errors.push('Au moins une des quantité de ressources à conserver est invalide.');
					}
				}
			});

			if( !hasTroop && !hasDef ){
				errors.push('Aucune troupe et aucune fortification, règle non prise en compte.');
			}

			return {rule: rule, errors: errors};
		};

		KOCFIA.formation.launchAutomaticFormations = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation launchAutomaticFormations function');
			if( !KOCFIA.conf.formation.active || !KOCFIA.conf.formation.automatic ){
				return;
			}

			var delayedTrain = function(i, rule){
				window.setTimeout(function(){
					KOCFIA.formation.addToQueue( rule, null );
				}, i * 12000);
			};

			var cityKey, rule, i = 0;
			for( cityKey in KOCFIA.formation.rules ){
				if( KOCFIA.formation.rules.hasOwnProperty(cityKey) ){
					rule = KOCFIA.formation.rules[ cityKey ];
					if( rule.active ){
						delayedTrain( i, rule );
						i += 1;
					}
				}
			}
		};

		KOCFIA.formation.launchFormations = function( rule ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation launchFormations function');
			if( !KOCFIA.conf.formation.active ){
				return;
			}

			KOCFIA.formation.fillQueue( rule );
		};

		KOCFIA.formation.listCityFormations = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation listCityFormations function', cityKey);
			var $tbody = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city='+ cityKey +']'),
				$tr = $tbody.find('tr').filter(':gt(0)'),
				updateOnly = false;
			if( $tr.length ) updateOnly = true;
			var code = '', formations = '', fortifications = '',
				i, formation, unit,
				queue = window.seed.queue_unt[cityKey];
			//array of [tid, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]

			//troops
			formations += '<div class="global">Supprimer &ge; 2 <span class="ui-icon ui-icon-trash recursive"></span></div>'
			formations += '<ol class="formations">';
			for( i = 0; i < queue.length; i += 1 ){
				formation = queue[i];
				unit = KOCFIA.unitInfo[ (formation[0].indexOf('unt') == -1 ? 'unt' : '') + formation[0] ];

				formations += '<li><span class="ui-icon ui-icon-trash" rel="'+ i +','+ cityKey.replace(/city/, '') +','+ formation[0] +','+ formation[1] +','+ formation[3] +','+ formation[2] +','+ formation[5] +'" title="Annuler cette formation"></span>&nbsp;';
				formations += '<img src="'+ unit.icon +'" alt="'+ unit.label +'" title="'+ unit.label +'" />&nbsp;';
				formations += '<span class="unit">'+ Shared.format( formation[1] ) +'</span>';
				formations += '<span class="time">'+ Shared.readableDuration( formation[3] - formation[2] ) +'</span></li>';
			}
			formations += '</ol>';

			//defenses
			fortifications += '<div class="global">Supprimer &ge; 2 <span class="ui-icon ui-icon-trash recursive"></span></div>'
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

				fortifications += '<li><span class="ui-icon ui-icon-trash" rel="'+ i +','+ cityKey.replace(/city/, '') +','+ unit[0] +','+ unit[1] +','+ unit[3] +','+ unit[2] +','+ unit[5] +','+ unit[6] +'" title="Annuler cette fortification"></span>&nbsp;';
				fortifications += '<img src="'+ unit.icon +'" alt="'+ unit.label +'" title="'+ unit.label +'" />&nbsp;';
				fortifications += '<span class="unit">'+ Shared.format( formation[1] ) +'</span>';
				fortifications += Shared.readableDuration( formation[3] - formation[2] ) +'</li>';
			}
			fortifications += '</ol>';

			if( updateOnly ){
				$tr.find('.unit').html( formations );
				$tr.find('.fort').html( fortifications );

			} else $tbody.append( '<tr><td class="unit">' + formations + '</td><td class="fort">' + fortifications + '</td><td class="info"></td></tr>' );
		};

		KOCFIA.formation.getTrainableUnits = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getTrainableUnits function', cityKey);

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
									if( Shared.buildingHighestLevel( cityKey, building.substr(1) ) >= unitc[8][building][1] ){
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
		};

		KOCFIA.formation.getTrainableDefenses = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getTrainableDefenses function', cityKey);

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
									if( Shared.buildingHighestLevel( cityKey, building.substr(1) ) >= fortc[8][building][1] ){
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
		};

		KOCFIA.formation.calcMaxUnit = function( cityKey, unit, speed ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation calcMaxUnit function');

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
		};

		KOCFIA.formation.calcMaxDefense = function( cityKey, def ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation calcMaxDefense function');
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
		};

		KOCFIA.formation.unitTrainDuration = function( cityKey, unit, qty, speed ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation unitTrainDuration function');
			if( unit.indexOf('unt') == -1 ){
				unit = 'unt' + unit;
			}

			qty = Shared.decodeFormat( qty );

			var time = parseInt(window.unitcost[unit][7], 10) * qty,
				buildings = window.seed.buildings[cityKey],
				b, building,
				u = parseInt(unit.replace(/unt/, ''), 10),
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
						if( u >= 9 ){
							workshopMod = level;
						}

					} else if( building[0] == 17 && level > stableMod ){
						if( u >= 7 ){
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
			techBoost = workshopMod + stableMod;
			if( knights ){
				knight = knights["knt" + window.seed.leaders[cityKey].combatKnightId];
				if( knight ){
					knightCombat = parseInt(knight.combat, 10);
					knightBoost = ( parseInt(knight.combatBoostExpireUnixtime, 10) - timestamp > 0 ? knightCombat * 1.25 : knightCombat );
					modifier += 0.005 * knightBoost;
				}
			}

			if( window.seed.tech ){
				techBoost += parseFloat(window.seed.tech.tch5);
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
		};

		KOCFIA.formation.defenseTrainDuration = function( cityKey, fort, qty ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation defenseTrainDuration function');
			if( fort.indexOf('frt') == -1 ){
				fort = 'frt' + fort;
			}

			qty = Shared.decodeFormat( qty );

			var time = parseInt(window.fortcost[fort][7], 10) * qty,
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
		};

		KOCFIA.formation.getWallSlots = function(cityKey, withQueue ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getWallSlots function');
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
		};

		KOCFIA.formation.cancelTraining = function( dfd, cityKey, i, info, attempts ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation cancelTraining function');
			var i, j, totalReturn,
				params = $.extend({}, window.g_ajaxparams);

			if( dfd ){
				if( i == 0 || i > window.seed.queue_unt.length ) return dfd.resolve();

				info = window.seed.queue_unt[cityKey][i];
			} else {
				info = info.split(',');
				cityKey = 'city' + info[1];
			}

			var $info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city='+ cityKey +']').find('.info');

			params.requestType = "CANCEL_TRAINING";
			params.cityId	   = info[1];
			params.typetrn	   = info[2];
			params.numtrptrn   = info[3];
			params.trnETA	   = info[4];
			params.trnTmp	   = info[5];
			params.trnNeeded   = info[6];

			var d = new Date();

			$.ajax({
					url: window.g_ajaxpath + 'ajax/cancelTraining.php' + window.g_ajaxsuffix,
					type: 'post',
					data: params,
					dataType: 'json',
					timeout: 10000,
				})
				.done(function( result ){
					if( result.ok ){
						window.update_seed_ajax(true, function(){
							for( var k = 1; k < 5; k += 1 ){
								totalReturn = parseInt(window.unitcost["unt" + info[1]][k], 10) * parseInt(info[2], 10) * 3600 / 2;
								window.seed.resources[cityKey]["rec" + k][0] = parseInt(window.seed.resources[cityKey]["rec" + k][0], 10) + totalReturn;
							}
						});

						var j = 0, k;
						for( k = 0; k < window.seed.queue_unt[cityKey].length; k += 1 ){
							if( k > info[0] ){
								window.seed.queue_unt[cityKey][k][2] = parseInt(result.dateTraining[j]["start"], 10);
								window.seed.queue_unt[cityKey][k][3] = parseInt(result.dateTraining[j]["end"], 10);
								j += 1;
							}
						}
						//remove canceled training
						window.seed.queue_unt[cityKey].splice(info[0], 1);

						if( dfd == null ){
							KOCFIA.formation.listCityFormations( cityKey );
							$info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation réussie.</div>');
						} else {
							return dfd.pipe( KOCFIA.formation.cancelTraining(dfd, cityKey, i-1, null, 3) );
						}
					} else {
						attempts -= 1;
						if( attempts > 0 ){
							if( dfd ) return dfd.pipe( KOCFIA.formation.cancelTraining(dfd, cityKey, i+1, null, attempts) );
							else KOCFIA.formation.cancelTraining( null, null, null, info, attempts );
						} else {
							if( dfd ) return dfd.reject();
							else $info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation de formation échouée (erreur serveur).</div>');
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
						else $info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation de formation échouée (erreur internet).</div>');
					}
				});
		};

		KOCFIA.formation.cancelFortification = function( dfd, cityKey, i, info, attempts ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation cancelFortification function');
			var i, j, totalReturn,
				params = $.extend({}, window.g_ajaxparams),
				d = new Date();

			if( dfd ){
				if( i == 0 || i > window.seed.queue_frt.length ) return dfd.resolve();

				info = window.seed.queue_frt[cityKey][i];
			} else {
				info = info.split(',');
				cityKey = 'city' + info[1];
			}

			var $info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city='+ cityKey +']').find('.info');

			params.requestType = "CANCEL_FORTIFICATIONS";
			params.cityId	   = info[1];
			params.typefrt	   = info[2];
			params.numtrpfrt   = info[3];
			params.frtETA	   = info[4];
			params.frtTmp	   = info[5];
			params.frtNeeded   = info[6];
			params.frtid	   = info[0];

			$.ajax({
					url: window.g_ajaxpath + 'ajax/cancelFortifications.php' + window.g_ajaxsuffix,
					type: 'post',
					data: params,
					dataType: 'json',
					timeout: 10000,
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
							else $info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation de fortification échouée (erreur serveur).</div>');
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
						else $info.append('<div data-timestamp="'+ (d.getTime() / 1000) +'">Annulation de fortification échouée (erreur internet).</div>');
					}
				});
		};

		KOCFIA.formation.addToQueue = function( rule, dfd ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue function', rule);
			//automatic launch, will add one formation to the queue according to the rule parameters
			//called by fillQueue with a deferred object, pipe on self until queue is filled or adding is not possible

			//step 1 of 3 for trainUnitSequence
			var checkUnitRequirements = function( udfd ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred checkUnitRequirements function');
				var modifier = 1;
				if( rule.speed == 1 ) modifier = 2;
				else if( rule.speed == 2 ) modifier = 4;

				var costs = window.unitcost[rule.troop],
					res = window.seed.resources[rule.cityKey],
					stats = window.seed.citystats[rule.cityKey];

				if( typeof costs[8] == 'object' && !$.isArray(costs[8]) && !$.isEmptyObject(costs[8]) ){
					var k, level;
					for( k in costs[8] ){  // check building requirement
						if( costs[8].hasOwnProperty(k) ){
							level = Shared.buildingHighestLevel( rule.cityKey, k.substr(1) );
							if( level < costs[8][k][1] ){
								msg.push([d.getTime() / 1000, 'Cette unité ne peut être entraînée dans cette ville (niveau de bâtiment requis trop bas).']);
								return udfd.resolve();
							}
						}
					}
				}

				if( typeof costs[9] == 'object' && !$.isArray(costs[9]) && !$.isEmptyObject(costs[9]) ){
					var t;
					for( t in costs[9] ){  // check tech requirement
						if( costs[9].hasOwnProperty(t) ){
							if( parseInt(window.seed.tech['tch' + t.substr(1)], 10) < costs[9][t][1] ){
								msg.push([d.getTime() / 1000, 'Cette unité ne peut être entraînée (niveau de recherche trop bas).']);
								return udfd.resolve();
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
					msg.push([d.getTime() / 1000, 'Pas assez de population ou de ressources disponibles (unité).']);
					return udfd.resolve();
				}

				if( qty > rule.max ) qty = rule.max;

				return udfd.pipe( checkBarracks(udfd) );
			};

			//step 2 of 3 for trainUnitSequence
			var checkBarracks = function( udfd ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred checkBarracks function');
				var barracksCount = Shared.barracksCount( rule.cityKey ),
					queue = window.seed.queue_unt[ rule.cityKey ],
					slotsUsed = queue.length || 0;
				if( barracksCount - slotsUsed > 0 ){
					return udfd.pipe( train(udfd) );
				} else {
					msg.push([d.getTime() / 1000, 'Pas de caserne disponible.']);
					return udfd.resolve();
				}
			};

			//step 3 of 3 for trainUnitSequence
			var train = function( udfd ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred train function');
				var wParams = $.extend({}, baseParams);
				wParams.type = rule.troop.replace(/unt/, '');
				wParams.quant = qty;
				wParams.items = '';
				wParams.gambleId = rule.speed;

				$.ajax({
						url: window.g_ajaxpath + "ajax/train.php" + window.g_ajaxsuffix,
						type: 'post',
						data: wParams,
						dataType: 'json',
						timeout: 10000,
					})
					.done(function( result ){
						if( result.ok ){
							var resourceFactors = [],
								resourceLost, r, unit;

							for( r = 1; r < 5; r += 1 ){
								resourceFactors.push( result.gamble ? result.gamble[i] : 1 );
								resourceLost = parseInt(window.unitcost[rule.troop][i], 10) * 3600 * qty * resourceFactors[i - 1];
								window.seed.resources[rule.cityKey]["rec" + r][0] = parseInt(window.seed.resources[rule.cityKey]["rec" + r][0], 10) - resourceLost;
							}
							window.seed.citystats[rule.cityKey].gold[0] = parseInt(window.seed.citystats[rule.cityKey].gold[0], 10) - parseInt(window.unitcost[rule.troop][5], 10) * qty;
							window.seed.citystats[rule.cityKey].pop[0] = parseInt(window.seed.citystats[rule.cityKey].pop[0], 10) - parseInt(window.unitcost[rule.troop][6], 10) * qty;

							window.seed.queue_unt[rule.cityKey].push([rule.troop, qty, result.initTS, parseInt(result.initTS) + result.timeNeeded, 0, result.timeNeeded, null]);

							/*
							seed.items["i" + iid] = Number(seed.items["i" + iid]) - 1;
							ksoItems[iid].subtract();
							*/

							unit = KOCFIA.unitInfo[ rule.troop ];
							msg.push([d.getTime() / 1000, 'Lancement de '+ Shared.format( qty ) +' <img src="'+ unit.icon +'" alt="'+ unit.label[0] +'" title="'+ unit.label[0] +'" />.']);

							return udfd.resolve();
						} else {
							if( result.msg ){
								msg.push([d.getTime() / 1000, 'Formation refusée ('+ result.msg +').']);
								return udfd.resolve();
							} else {
								trainAttempts -= 1;
								if( trainAttempts > 0 ){
									window.setTimeout(function(){ udfd.pipe( train(udfd) ); }, 10000);
								} else {
									msg.push([d.getTime() / 1000, 'Formation refusée.']);
									return udfd.resolve();
								}
							}
						}
					})
					.fail(function(){
						//network or server error
						trainAttempts -= 1;
						if( trainAttempts > 0 ){
							window.setTimeout(function(){ udfd.pipe( train(udfd) ); }, 10000);
						} else {
							msg.push([d.getTime() / 1000, 'Formation refusée (requête KO).']);
							return udfd.resolve();
						}
					});
			};

			//units training sequence
			var trainUnitSequence = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred trainUnitSequence function');
				return $.Deferred(function( udfd ){
					if( rule.troop ){ //units
						udfd.pipe( checkUnitRequirements(udfd) );
					} else udfd.resolve();
				}).promise();
			};

			//step 1 of 3 for buildFortificationSequence
			var checkFortificationRequirements = function(fdfd){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred checkFortificationRequirements function');
				var costs = window.fortcost[rule.defense],
					res = window.seed.resources[rule.cityKey];

				if( !$.emptyObject(costs[8]) ){
					var k, level;
					for( k in costs[8] ){  // check building requirement
						if( costs[8].hasOwnProperty(k) ){
							level = Shared.buildingHighestLevel( rule.cityKey, k.substr(1) );
							if( level < costs[8][k][1] ){
								msg.push([d.getTime() / 1000, 'Cette fortification ne peut être construite dans cette ville (niveau de bâtiment requis trop bas).']);
								return fdfd.resolve();
							}
						}
					}
				}

				if( !$.emptyObject(costs[9]) ){
					var t;
					for( t in costs[9] ){  // check tech requirement
						if( costs[9].hasOwnProperty(t) ){
							if( parseInt(window.seed.tech['tch' + t.substr(1)], 10) < costs[9][t][1] ){
								msg.push([d.getTime() / 1000, 'Cette fortification ne peut être construite (niveau de recherche trop bas).']);
								return fdfd.resolve();
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
					msg.push([d.getTime() / 1000, 'Pas assez de ressources disponibles (fortifications).']);
					return fdfd.resolve();
				}

				if( qty > rule.max ) qty = rule.max;

				return fdfd.pipe( checkWall(fdfd) );
			};

			//step 2 of 3 for buildFortificationSequence
			var checkWall = function(fdfd){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred checkWall function');
				var i, wallSlots = KOCFIA.formation.getWallSlots(rule.cityKey, false),
					queue = window.seed.queue_fort[ rule.cityKey ],
					slotsUsed = queue.length || 0;

				if( wallSlots - slotsUsed > 0 ){
					return fdfd.pipe( build(fdfd) );
				} else {
					msg.push([d.getTime() / 1000, 'Rempart déjà occupé (queue pleine).']);
					return fdfd.resolve();
				}
			};

			//step 3 of 3 for buildFortificationSequence
			var build = function(fdfd){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred build function');
				var wParams = $.extend({}, baseParams);
				wParams.type = rule.defense.replace(/frt/, '');
				wParams.quant = qty;
				wParams.items = '';

				$.ajax({
						url: window.g_ajaxpath + "ajax/fortify.php" + window.g_ajaxsuffix,
						type: 'post',
						data: wParams,
						dataType: 'json',
						timeout: 10000,
					})
					.done(function( result ){
						if( result.ok ){
							var r, unit,
								fortcost = window.fortcost["frt" + rule.defense],
								time = KOCFIA.formation.defenseTrainDuration(rule.cityKey, rule.defense, qty);

							/*
							if(iid == 26) {
								time = parseInt(time * 0.7)
								window.seed.items.i26 = parseInt(window.seed.items.i26) - 1;
								window.ksoItems[26].subtract()
							}
							*/
							for( r = 1; r < 5; r += 1 ){
								window.seed.resources[rule.cityKey]["rec" + r][0] = parseInt(resources["rec" + r][0], 10) - parseInt(fortcost[i], 10) * 3600 * qty;
							}
							window.seed.citystats[rule.cityKey].gold[0] = parseInt(window.seed.citystats[rule.cityKey].gold[0], 10) - parseInt(fortcost[5], 10) * qty;
							window.seed.citystats[rule.cityKey].pop[0] = parseInt(window.seed.citystats[rule.cityKey].pop[0], 10) - parseInt(fortcost[6], 10) * qty;

							window.seed.queue_fort[rule.cityKey].push([rule.defense, qty, result.initTS, parseInt(result.initTS) + time, 0, time, result.fortifyId]);

							for( j = 0; j < KOCFIA.defenses.length; j += 1 ){
								if( KOCFIA.defenses[j].name == rule.defense ){
									unit = KOCFIA.defenses[j];
									break;
								}
							}
							msg.push([d.getTime() / 1000, 'Lancement de '+ Shared.format( qty ) +' <img src="'+ unit.icon +'" alt="'+ unit.label[0] +'" title="'+ unit.label[0] +'" />.']);

							return fdfd.resolve();
						} else {
							if( result.msg ){
								msg.push([d.getTime() / 1000, 'Formation refusée ('+ result.msg +').']);
								return fdfd.resolve();
							} else {
								trainAttempts -= 1;
								if( trainAttempts > 0 ){
									window.setTimeout(function(){ fdfd.pipe( train(fdfd) ); }, 10000);
								} else {
									msg.push([d.getTime() / 1000, 'Formation refusée.']);
									return fdfd.resolve();
								}
							}
						}
					})
					.fail(function(){
						//network or server error
						trainAttempts -= 1;
						if( trainAttempts > 0 ){
							window.setTimeout(function(){ fdfd.pipe( train(fdfd) ); }, 10000);
						} else {
							msg.push([d.getTime() / 1000, 'Formation refusée (requête KO).']);
							return fdfd.resolve();
						}
					});
			};

			//fortifications building sequence
			var buildFortificationSequence = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred buildFortificationSequence function');
				return $.Deferred(function( fdfd ){
					if( rule.defense ){
						fdfd.pipe( checkFortificationRequirements(fdfd) );
					} else fdfd.resolve();
				}).promise();
			};

			var qty, r, msg = [], resNeeded = [], resAvailable = [],
				trainAttempts = 3, d = new Date();

			var baseParams = jQuery.extend(true, {}, window.g_ajaxparams);
			if( baseParams == null ){
				alert('Paramètres ajax manquant. Raffraîchissez la page.');
				return;
			}
			baseParams.cid = rule.cityKey.replace(/city/, '');

			var $info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city='+ rule.cityKey +']').find('.info');

			$.when( trainUnitSequence(), buildFortificationSequence() )
				.always(function(){
					//clean old messages
					var timestamp = d.getTime() / 1000,
						obsolete = 60 * 60 * 1000,
						msgTimestamp;
					$msg = $info.find('div');
					if( $msg.length > 9 ) $msg.filter(':lt(10)').remove();
					if( $msg.length ){
						$msg.each(function(){
							var $div = $(this);
							msgTimestamp = parseFloat($div.data('timestamp'));
							if( msgTimestamp && timestamp - msgTimestamp > obsolete ){
								$div.remove();
							}
						});
					}

					if( msg.length ){
						var m = '', i;
						for( i = 0; i < msg.length; i += 1 ){
							m += '<div data-timestamp="'+ msg[i][0] +'">'+ msg[i][1] +'</div>';
						}
						$info.append( m );
					}

					//manual launch
					if( dfd != null ){
						if( msg.length ){
							return dfd.reject();
						} else {
							KOCFIA.formation.listCityFormations( rule.cityKey );
							window.setTimeout(function(){ dfd.pipe( KOCFIA.formation.addToQueue(rule, dfd) ); }, 15000);
						}
					} else {
						KOCFIA.formation.listCityFormations( rule.cityKey );
					}
				});
		};

		KOCFIA.formation.fillQueue = function( rule ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation fillQueue function', rule);
			//manual launch, will fill the training queue according to the rule parameters

			var fillSequence = function(){
				return $.Deferred(function( dfd ){
					return dfd.pipe( KOCFIA.formation.addToQueue(rule, dfd) );
				}).promise();
			};

			var $info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city='+ rule.cityKey +']').find('.info');

			$.when( fillSequence() )
				.always(function(){
					//user information by city
					var d = new Date(),
						timestamp = d.getTime() / 1000;

					$info.append('<div data-timestamp="'+ timestamp +'">Lancement des formations fini.</div>');
					KOCFIA.formation.listCityFormations( rule.cityKey );
				});
		};

	/* TRANSPORT */
		KOCFIA.transport = {
			options: {
				active: 1,
				automatic: 0,
			},
			stored: ['rules'],
			rules: {},
		};

		KOCFIA.transport.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport confPanel function');
			var code = '<h3>Transport</h3>'
				+ '<div>'
				+ Shared.generateCheckbox('transport', 'active', 'Activer le module', KOCFIA.conf.transport.active)
				+ '</div>';

			$section.append( code );
		};

		KOCFIA.transport.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-transport').html('');

			var manualForm = KOCFIA.transport.getManualForm();

			$section.append( '<div class="accordion">' + manualForm + '</div>' );

			KOCFIA.transport.$accordion = $section.find('.accordion');
			KOCFIA.transport.$manualForm = $section.find('.manual-form');
			KOCFIA.transport.$form = $section.find('.attack-form');
			KOCFIA.transport.$saved = $section.find('.attack-list.saved');
			KOCFIA.transport.$ongoing = $section.find('.attack-list.ongoing');

			KOCFIA.transport.$accordion.accordion({collapsible: true, autoHeight: false, animated: false}).accordion('activate', false);

			KOCFIA.transport.addManualFormListeners();

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
		};

		KOCFIA.transport.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport on function');

			KOCFIA.conf.transport.active = 1;
			Shared.storeConf();
		};

		KOCFIA.transport.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport off function');

			KOCFIA.conf.transport.active = 0;
			KOCFIA.conf.transport.automatic = 0;
			Shared.storeConf();

			KOCFIA.transport.automaticOff();
		};

		KOCFIA.transport.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport automaticOn function');

			KOCFIA.conf.transport.automatic = 1;
			Shared.storeConf();
		};

		KOCFIA.transport.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport automaticOff function');

			KOCFIA.conf.transport.automatic = 0;
			Shared.storeConf();
		};

		KOCFIA.transport.storeAutomaticRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport storeAutomaticRules function');
			localStorage.setObject('kocfia_transport_rules_' + KOCFIA.storeUniqueId, KOCFIA.transport.rules);
		};

		KOCFIA.transport.getUnits = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getUnits function');
			var cityKeyFrom = KOCFIA.transport.$manualForm.find('.from').find('input').filter(':checked').val(),
				units = window.seed.units[ cityKeyFrom ],
				cityKeyTo = KOCFIA.transport.$manualForm.find('.to').find('input').filter(':checked').val(),
				coord = $.trim( KOCFIA.transport.$manualForm.find('.coord').val() ),
				code = '', n, i, u, d, label;

			if( units.hasOwnProperty('unt1') ){
				n = parseInt(units['unt1'], 10);
				if( n > 0 ){
					d = KOCFIA.transport.getDuration( cityKeyFrom, cityKeyTo, coord, 'unt1' );
					code += '<input type="radio" name="troop" id="kocfia-transport-manual-unt1" value="unt1">';
					code += '<label for="kocfia-transport-manual-unt1" title="'+ Shared.readable(n) +'">';
					code += '<img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_1_30_s34.jpg">';
					code += '&nbsp;Ravitalleur ('+ Shared.format(n) +')';
					code += (d != '' ? '<span class="duration"> - '+ Shared.readableDuration( d ) +'</span>' : '');
					code += '</label><br>';
				}
			}

			if( units.hasOwnProperty('unt7') ){
				n = parseInt(units['unt7'], 10);
				if( n > 0 ){
					d = KOCFIA.transport.getDuration( cityKeyFrom, cityKeyTo, coord, 'unt7' );
					code += '<input type="radio" name="troop" id="kocfia-transport-manual-unt7" value="unt7">';
					code += '<label for="kocfia-transport-manual-unt7" title="'+ Shared.readable(n) +'">';
					code += '<img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_7_30_s34.jpg">';
					code += '&nbsp;Cavalerie ('+ Shared.format(n) +')';
					code += (d != '' ? '<span class="duration"> - '+ Shared.readableDuration( d ) +'</span>' : '');
					code += '</label><br>';
				}
			}

			if( units.hasOwnProperty('unt9') ){
				n = parseInt(units['unt9'], 10);
				if( n > 0 ){
					d = KOCFIA.transport.getDuration( cityKeyFrom, cityKeyTo, coord, 'unt9' );
					code += '<input type="radio" name="troop" id="kocfia-transport-manual-unt9" value="unt9">';
					code += '<label for="kocfia-transport-manual-unt9" title="'+ Shared.readable(n) +'">';
					code += '<img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_9_30_s34.jpg">';
					code += '&nbsp;Wagon ('+ Shared.format(n) +')';
					code += (d != '' ? '<span class="duration"> - '+ Shared.readableDuration( d ) +'</span>' : '');
					code += '</label><br>';
				}
			}

			code += '<select name="troop-list"><option value="">Ou</option>';
			for( u in units ){
				if( units.hasOwnProperty(u) && u != 'unt1' && u != 'unt7' && u != 'unt9' ){
					n = parseInt(units[ u ], 10);
					if( n > 0 ){
						if( KOCFIA.unitInfo.hasOwnProperty( u ) ){
							label = KOCFIA.unitInfo[u].label;
						}

						d = KOCFIA.transport.getDuration( cityKeyFrom, cityKeyTo, coord, u );

						code += '<option value="'+ u +'" title="'+ Shared.readable(n) +'">'+ label +' ('+ Shared.format(n) +')';
						code += (d != '' ? '- '+ Shared.readableDuration( d ) : '') +'</option>';
					}
				}
			}
			code += '</select>';

			return code;
		};

		KOCFIA.transport.getResources = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getResources function');
			var code = '', i, type, inSeed, n,
				res = window.seed.resources[ cityKey ],
				gold = window.seed.citystats[ cityKey ];

			for( i = 0; i < KOCFIA.resources.length; i += 1 ){
				type = KOCFIA.resources[i];
				inSeed = KOCFIA.inSeed.resources[ type.name ];

				if( inSeed ){
					if( inSeed.var == 'gold' ){
						n = parseFloat( gold[ inSeed.index ] );
					} else {
						n = parseFloat( res[ inSeed.type ][ inSeed.index ] );
					}

					if( n > 0 ){
						if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

						code += '<button rel="'+ type.name +'" data-label="'+ type.label +'" title="'+ Shared.readable(n) +'">'+ type.label +' <small>('+ Shared.format(n) +')</small></button>';
					}
				}
			}
			return code;
		};

		KOCFIA.transport.getDuration = function( cityKeyFrom, cityKeyTo, coord, unit ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getDuration function');
			var coordXTo = null,
				coordYTo = null,
				city, distance;

			if( cityKeyTo ){
				city = KOCFIA.cities[ cityKeyTo ];
				coordXTo = city.coords.x;
				coordYTo = city.coords.y;
			} else if( coord != '' ){
				coord = coord.split(',');
				if( coord.length != 2 ) return '';
				coord[0] = parseInt(coord[0], 10);
				coord[1] = parseInt(coord[1], 10);
				if( isNaN(coord[0]) || coord[0] < 0 || coord[0] > 750 ) return '';
				if( isNaN(coord[1]) || coord[1] < 0 || coord[1] > 750 ) return '';

				coordXTo = coord[0];
				coordYTo = coord[1];
			}

			if( coordXTo == null ) return '';

			var is_round_trip = false,
				items_applied = {},
				isFriendly = true,
				troops = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				u = parseInt(unit.replace(/unt/, ''), 10);

			troops[u] = 1;

			return Shared.marchTimeCalculator(cityKeyFrom, troops, coordXTo, coordYTo, is_round_trip, items_applied, isFriendly);
		};

		KOCFIA.transport.getManualForm = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getManualForm function');
			var c, city;

			var form = '<h3>Transport Manuel</h3>';
			form += '<div class="manual-form">';

			form += '<label>Depuis&nbsp;:&nbsp;</label><div class="from">';
			for( c in KOCFIA.cities ){
				if( KOCFIA.cities.hasOwnProperty(c) ){
					city = KOCFIA.cities[ c ];
					form += '<input type="radio" name="from" value="'+ c +'" id="kocfia-transport-manual-from-'+ c +'"><label for="kocfia-transport-manual-from-'+ c +'">'+ city.roman +'</label>';
				}
			}
			form += '</div>';

			form += '<br><br><label>Vers&nbsp;:&nbsp;</label><input type="text" name="coord" class="coord">';
			form += '&nbsp;ou&nbsp;<div class="to">';
			for( c in KOCFIA.cities ){
				if( KOCFIA.cities.hasOwnProperty(c) ){
					city = KOCFIA.cities[ c ];
					form += '<input type="radio" name="to" value="'+ c +'" id="kocfia-transport-manual-to-'+ c +'"><label for="kocfia-transport-manual-to-'+ c +'">'+ city.roman +'</label>';
				}
			}
			form += '</div>';

			form += '<br><label>Troupes&nbsp;:&nbsp;</label>';
			form += '<div class="troop">';
			form += '</div>';
			form += '<div class="quantity"><label for="kocfia-transport-manual-quantity">Quantité&nbsp:&nbsp;</label><input type="text" name="qty"></div>';

			form += '<label>Ressources&nbsp;:&nbsp;</label>';
			form += '<div class="resources">';
			form += '<div class="available"></div>';
			form += '<div class="chosen"></div>';
			form += '</div>';

			form += '<div class="buttons">';
			form += '<button class="launch">Envoyer</button>';
			form += '<button class="reset">Annuler</button>';
			form += '</div>';

			form += '<div class="result"></div>';

			form += '</div>';

			return form;
		};

		KOCFIA.transport.getSupplyForm = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getSupplyForm function');
		};

		KOCFIA.transport.getPileUpForm = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getPileUpForm function');
		};

		KOCFIA.transport.getListsTemplate = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getListsTemplate function');
		};

		KOCFIA.transport.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getHelp function');
		};

		KOCFIA.transport.planManualTransport = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport planManualTransport function');
		};

		KOCFIA.transport.launchManualTransport = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport launchManualTransport function');
		};

		KOCFIA.transport.addManualFormListeners = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport addManualFormListeners function');

			KOCFIA.transport.$manualForm.find('.from, .to').buttonset();
			KOCFIA.transport.$manualForm
				//city from and to
				.on('change', '.from input', function(){
					var code = KOCFIA.transport.getResources( this.value ),
						$res = KOCFIA.transport.$manualForm.find('.resources');
					$res.find('.available').empty().append( code ).buttonset();
					$res.find('.chosen').empty();
				})
				.bind('getAndSetTroops', function(){
					var code = KOCFIA.transport.getUnits(),
						$troop = KOCFIA.transport.$manualForm.find('.troop'),
						$checked = $troop.find('input').filter(':checked'),
						select = $troop.find('select').val(),
						unit;
					if( $checked.length ) unit = $checked.val();
					else if( select != '' ) unit = select;

					$troop.empty().append( code );

					if( unit ){
						var $input = $troop.find('input').filter('[value='+ unit +']');
						if( $input.length ) $input.prop('checked', true);
						else $troop.find('select').val( unit );
					}
				})
				.on('change', '.to input', function(){
					KOCFIA.transport.$manualForm.find('.coord').val('');
				})
				.on('change', '.from input, .to input', function(){
					if( KOCFIA.transport.$manualForm.find('.from').find('input').filter(':checked').length ){
						KOCFIA.transport.$manualForm.trigger('getAndSetTroops');
					}
				})
				.on('keyup', '.coord', function(){
					$(this).siblings('.ui-buttonset').find('input').prop('checked', false).button('refresh');
					if( KOCFIA.transport.$manualForm.find('.from').find('input').filter(':checked').length ){
						KOCFIA.transport.$manualForm.trigger('getAndSetTroops');
					}
				})
				//revert radios or select for troops change
				.on('change', '.troop input, .troop select', function(){
					if( $(this).is('input') ){
						KOCFIA.transport.$manualForm.find('.troop').find('select').val('');
					} else {
						KOCFIA.transport.$manualForm.find('.troop').find('input').prop('checked', false);
					}
					KOCFIA.transport.$manualForm.find('.quantity').show();
				})
				//resources
				.on('click', '.resources .available button', function(){
					KOCFIA.transport.$manualForm.find('.buttons').show();

					var $this = $(this),
						label = $this.data('label'),
						res = $this.attr('rel'),
						$chosen = KOCFIA.transport.$manualForm.find('.resources').find('.chosen'),
						$chosenRes = $chosen.find('input'),
						chosenRes = $chosenRes.map(function(){ return this.rel; }).get();

					if( $.inArray(res, chosenRes) > -1 ){
						$chosen.filter('[rel='+ res +']').focus();
					} else {
						var code = '', i, r;
						for( i = 0; i < KOCFIA.resources.length; i += 1 ){
							r = KOCFIA.resources[i];
							if( r.name == res ){
								code += '<div class="res">';
								code += '<label><img src="'+ r.icon +'">&nbsp;'+ label +'</label>&nbsp;';
								code += '<input type="text" name="'+ res +'" value="">';
								code += '<span class="ui-icon ui-icon-trash remove"></span>';
								code += '</div>';
								break;
							}
						}

						$chosen.append( code );
					}
				})
				.on('click', '.resources .remove', function(){
					$(this).closest('div').remove();
				})
				.on('click', '.reset', function(){
					KOCFIA.transport.$manualForm.find('.troop, .resources, .result').empty();
					KOCFIA.transport.$manualForm.find('.quantity').hide().find('input').val('');
					KOCFIA.transport.$manualForm.find('.buttons').hide();

					KOCFIA.transport.$manualForm.find('.coord').val('');

					KOCFIA.transport.$manualForm.find('.from, .to').find('input').filter('[type=radio]').prop('checked', false).button('refresh');
				})
				.on('click', '.launch', function(){
					var result = KOCFIA.transport.planManualTransport();
					if( result.errors.length ){
						KOCFIA.transport.$manualForm.find('.result').append( result.errors.join('<br>') );
					} else {
						KOCFIA.transport.launchManualTransport( result.plan );
					}
				})
			;
		};

	/* MAP VISUALISATION WITH CANVAS */
		KOCFIA.canvas = {
			options: {
				active: 1,
			},
			/*
			provinces: [
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
			confPanel: function( $section ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA canvas confPanel function');
				var code = '<h3>Carte</h3>';
				code += '<div>';
				code += Shared.generateCheckbox('canvas', 'active', 'Activer le module', KOCFIA.conf.canvas.active);
				code += '</div>';

				$section.append( code );
			},
			modPanel: function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA canvas modPanel function');
				var $section = KOCFIA.$confPanel.find('#kocfia-canvas').html(''),
					code = '<canvas id="kocfia-map-canvas" width="'+ width +'" height="'+ height +'"></canvas>';

				$section.append( code );

				KOCFIA.canvas.cv = $('#kocfia-map-canvas')[0];
				KOCFIA.canvas.ctx = KOCFIA.canvas.cv.getContext('2d');

				KOCFIA.canvas.grid();
			},
			on: function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA formation on function');
			},
			off: function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA formation off function');
			},
			grid: function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA canvas grid function');
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
			drawCoords: function( coords ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA canvas drawCoords function');
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
		KOCFIA.checkAndLaunchAttack = function( attack ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack function', attack.id, attack);
			var mod = attack.category,
				label = (attack.type != 'scout' ? 'attaque' : 'eclairage'),
				d = new Date(),
				stopped = false,
				status,
				check = KOCFIA.conf[ mod ] && KOCFIA.conf[ mod ].hasOwnProperty('active') && KOCFIA.conf[ mod ].active;
			if( !check ){
				KOCFIA[ mod ].refreshOngoingInfo(attack, true, [d.getTime() / 1000, (mod == 'scout' ? 'Eclairages automatiques stoppés' : 'Attaque automatiques stoppées')]);
				return;
			}

			KOCFIA[ mod ].refreshOngoingInfo(attack, false, [d.getTime() / 1000, 'Tentative de lancement en cours']);

			var $tr = null;
			if( mod == 'wilderness' ){
				$tr = KOCFIA[ mod ].$ongoing.find('tbody').filter('[data-city='+ attack.cityKey +']').find('tr').filter('[data-attack='+ attack.id +']');
			} else if( mod == 'darkForest' ){
				var $tr = KOCFIA[ mod ].$ongoing.find('tbody').find('tr');
			} else if( mod == 'scout' ){
				var $tr = KOCFIA[ mod ].$ongoing.find('tbody').find('tr').filter('[data-attack='+ attack.id +']');
			}

			var stop = function(){
				stopped = true;
				//KOCFIA[ mod ].refreshOngoingInfo(attack, true, [d.getTime() / 1000, (mod == 'scout' ? 'Eclairage stoppé' : 'Attaque stoppée') +' sur demande.']);

				if( attack.marching.length ) Shared.recallWaves( attack );

				if( $tr != null ) $tr.find('.charge').show();
			}

			if( $tr.data('stop') ){
				stop();
				return false;
			}

			//coords
			if( mod == 'darkForest' ){
				var darkForestCoords = KOCFIA[ mod ].getCoords();
				if( darkForestCoords === false || darkForestCoords.status != 'complete' || darkForestCoords.list.length == 0 ){
					KOCFIA[ mod ].refreshOngoingInfo(attack, false, [d.getTime() / 1000, 'Récupération des coordonnées']);

					//launch the search for coords
					$.when( KOCFIA.darkForest.search() )
						.always(function(){
							KOCFIA.checkAndLaunchAttack( attack );
						});
					return;
				} else {
					coords = darkForestCoords.list;
				}
			} else {
				coords = attack.coords;
			}
			coordsLength = coords.length;

			//security, defining missing properties
			if( !attack.hasOwnProperty('marching') ) attack.marching = [];
			if( !attack.hasOwnProperty('coordIndex') ) attack.coordIndex = 0;

			var coordsLength, coords, waveIndex, time, city, bunch = [];

			/** sequences
			 * wilderness
			 *		previousMarchingCheck
			 *		resetTracks
			 *		checkRallyPoint
			 *		checkCoords (recursive on coords list)
			 *			checkCoord
			 *		checkAndLaunchWaves
			 *			findLostKnights
			 *			checkKnight
			 *			checkUnits
			 *			launchWave
			 *
			 * scout
			 *		previousMarchingCheck
			 *		resetTracks
			 *		checkRallyPoint (for all cities, at least a slot free, counting keep free slot parameter)
			 *		checkCoords (recursive on coords list)
			 *			checkCoord
			 *				use the closest city with a slot free in rally point (not via checkRallyPoint)
			 *		checkAndLaunchWaves
			 *			findLostKnights
			 *			checkKnight
			 *			checkUnits
			 *			launchWave
			 *
			 * darkForest
			 *		previousMarchingCheck
			 *		resetTracks
			 *		checkRallyPoint (for all cities, at least a slot free, counting keep free slot parameter)
			 *		checkCoords (recursive on coords list)
			 *			checkCoordByBunch ( do 10 coords at a time )
			 *				byBunch check
			 *				if a dark forest of a targeted level is found
			 *				for each city with a matching level rule
			 *					check the rally point (not via checkRallyPoint)
			 *						checkAndLaunchWaves
			 *							findLostKnights
			 *							checkKnight
			 *							checkUnits
			 *							launchWave
			 */

			/* deferred attack functions */
				//check previous marches for "away without leave" troops
				var previousMarchingCheck = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred previousMarchingCheck function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					if( mod == 'darkForest' && !attack.hasOwnProperty('marchingCoords') ) attack.marchingCoords = [];

					var marches = [],
						marchesCoord = [];

					var checkMarch = function(dfd, i){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkMarch function');

						if( mod == 'wilderness' ){
							march = window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ];
						} else {
							march = null;
							for( j = 0; j < attack.cities.length; j+= 1 ){
								if( window.seed.queue_atkp[ attack.cities[j] ] ){
									attack.cityKey = attack.cities[j];
									march = window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ];
									if( march ){
										break;
									}
								}
							}

							if( march == null ){
								i += 1;
								if( i >= mLength ){
									attack.marching = marches;
									return dfd.pipe( resetTracks(dfd) );
								} else {
									return dfd.pipe( checkMarch(dfd, i) );
								}
							}
						}

						if( march ){
							marches.push( attack.marching[i] );
							if( mod != 'wilderness' ) marchesCoord.push( march.toXCoord +','+ march.toYCoord );
						}

						if( march && !march.hasOwnProperty('kocfiaUpdated') ){
							var mParams = window.g_ajaxparams;
							mParams.rid = attack.marching[i];
							$.ajax({
								url: window.g_ajaxpath + "ajax/fetchMarch.php" + window.g_ajaxsuffix,
								type: 'post',
								data: mParams,
								dataType: 'json',
								timeout: 10000,
							})
							.done(function(data){
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
										attack.marching = marches;
										if( mod != 'wilderness' ) attack.marchingCoords = marchesCoord;
										return dfd.pipe( resetTracks(dfd) );
									} else {
										return dfd.pipe( checkMarch(dfd, i) );
									}
								} else {
									attempts -= 1;
									if( attempts > 0 ){
										return dfd.pipe( checkMarch(dfd, i) );
									} else {
										i += 1;
										if( i >= mLength ){
											attack.marching = marches;
											if( mod != 'wilderness' ) attack.marchingCoords = marchesCoord;
											return dfd.pipe( resetTracks(dfd) );
										} else {
											return dfd.pipe( checkMarch(dfd, i) );
										}
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
									if( i >= mLength ){
										attack.marching = marches;
										if( mod != 'wilderness' ) attack.marchingCoords = marchesCoord;
										return dfd.pipe( resetTracks(dfd) );
									} else {
										return dfd.pipe( checkMarch(dfd, i) );
									}
								}
							});
						} else {
							i += 1;
							if( i >= mLength ){
								attack.marching = marches;
								if( mod != 'wilderness' ) attack.marchingCoords = marchesCoord;
								return dfd.pipe( resetTracks(dfd) );
							} else {
								return dfd.pipe( checkMarch(dfd, i) );
							}
						}
					};

					if( mod == 'wilderness' ){
						if( window.seed.queue_atkp[ attack.cityKey ] ){
							var mParams = window.g_ajaxparams,
								i = 0, j, march,
								mLength = attack.marching.length;
							if( mLength == 0 ){
								return dfd.pipe( resetTracks(dfd) );
							}

							return dfd.pipe( checkMarch(dfd, i) );
						} else {
							return dfd.pipe( resetTracks(dfd) );
						}
					} else {
						//attack.marching is shared by all cities
						var mParams = window.g_ajaxparams,
							i = 0, j, march,
							mLength = attack.marching.length;
						if( mLength == 0 ){
							return dfd.pipe( resetTracks(dfd) );
						} else {
							return dfd.pipe( checkMarch(dfd, i) );
						}
					}
				};

				//attack tracking arrays reset
				var resetTracks = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred resetTracks function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					//force refresh of attack queue for current city with march from the attack
					if( attack.marching.length ){
						window.attack_generatequeue();
					}

					return dfd.pipe(checkRallyPoint(dfd));
				};

				//check rally point slots
				var checkRallyPoint = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkRallyPoint function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					if( mod == 'darkForest' ){
						//at least a slot is needed in an "active" city
						var i, slots, keepFree;
						for( i = 0; i < attack.cities.length; i += 1 ){
							if( attack.info[ attack.cities[i] ].active ){
								slots = Shared.getRallyPointSlots( attack.cities[i] );
								keepFree = attack.hasOwnProperty('rpSlot') ? parseInt(attack.rpSlot, 10) : 0;
								if( slots - keepFree > 0 ){
									return dfd.pipe(checkCoords(dfd));
								}
							}
						}

						KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Pas assez de place dans le point de ralliement pour les villes actives.']);
						return dfd.reject();
					} else if( mod == 'scout' ){
						//at least a slot is needed in a city
						var i, slots, keepFree;
						for( i = 0; i < attack.cities.length; i += 1 ){
							slots = Shared.getRallyPointSlots( attack.cities[i] );
							keepFree = attack.hasOwnProperty('rpSlot') ? parseInt(attack.rpSlot, 10) : 0;
							if( slots - keepFree > 0 ){
								return dfd.pipe(checkCoords(dfd));
							}
						}

						KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Pas assez de place dans le point de ralliement pour les villes actives.']);
						return dfd.reject();
					} else {
						var slots = Shared.getRallyPointSlots( attack.cityKey ),
							keepFree = attack.hasOwnProperty('rpSlot') ? parseInt(attack.rpSlot, 10) : 0;
						if( slots - keepFree <= 0 || slots - keepFree < attack.waves.length ){
							KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Pas assez de place dans le point de ralliement.']);
							return dfd.reject();
						}
					}
					return dfd.pipe(checkCoords(dfd));
				};

				//loop function for checking each coords until one valid is found, use deferred.pipe() to iterate
				var checkCoords = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkCoords function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					if( mod != 'darkForest' ){
						return dfd.pipe(checkCoord(dfd, 3));
					} else {
						return dfd.pipe(checkCoordsByBunch(dfd, 3));
					}
				};


				var byBunch = function(dfd, data){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred byBunch function');
					var bunchIndex = 0;

					var bunchSequence = function(dfd){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkBunch function');
						return $.Deferred(function(bdfd){
							return bdfd.pipe( check(bdfd, data) );
						}).promise();
					};


					var check = function(bdfd){
						if( bunchIndex >= bunch.length ){
							return bdfd.resolve();
						}

						var info, type;

						info = data['l_'+ bunch[ bunchIndex ][0] +'_t_'+ bunch[ bunchIndex ][1]];
						if( info ){
							type = parseInt(info.tileType, 10);
							if( type != 54 && type != 0 ){
								//KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e / '+ coordsLength +') n\'est pas une forêt sombre ou un marais']);
								//will force the update of coords on next checkAndLaunchAttack call
								KOCFIA[ mod ].coords.status = 'outdated';
								bunchIndex += 1;
								return bdfd.pipe( check(bdfd) );
							} else if( type == 0 ){
								//KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e / '+ coordsLength +') est un marais']);
								bunchIndex += 1;
								return bdfd.pipe( check(bdfd) );
							} else if( $.inArray(coords[ attack.coordIndex + bunchIndex ], attack.marchingCoords) > -1 ){
								//KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e / '+ coordsLength +') déjà attaquée']);
								bunchIndex += 1;
								return bdfd.pipe( check(bdfd) );
							} else {
								//check if the coord level correspond to an "active" city with an "active" rule
								var found = false, level, i, j, k, wave, enoughUnits,
									units, unit, unitKey, unitNum, qty, available,
									keep, slots, keepFree, knights, highest, lowest;
								for( i = 0; i < attack.cities.length; i += 1 ){
									attack.cityKey = attack.cities[i];
									if( attack.info[ attack.cityKey ].active ){
										city = KOCFIA.cities[ attack.cityKey ];
										//checking range and looping if over max range
										if( Shared.getDistance(city.coords.x, city.coords.y, gps[0], gps[1]) > 100 ){
											continue;
										}

										if( attack.levels[ attack.cityKey ].hasOwnProperty( info.tileLevel ) && attack.levels[ attack.cityKey ][ info.tileLevel ].active ){
											//set the attack for on wave launch
												attack.rpSlot = attack.info[ attack.cityKey ].rps;

												level = attack.levels[ attack.cityKey ][ info.tileLevel ];
												attack.waves = level.waves;
												attack.keep = attack.info[ attack.cityKey ].keep;

											//check rally point slot
												slots = Shared.getRallyPointSlots( attack.cityKey );
												keepFree = parseInt(attack.rpSlot, 10) || 0;
												if( slots - keepFree <= 0 || slots - keepFree < attack.levels[ attack.cityKey ][ info.tileLevel ].waves.length ){
													//KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Pas assez de place dans le point de ralliement de '+ city.label]);
													continue;
												}

											//check knight
												Shared.freeKnights( attack.cityKey );
												knights = Shared.getAvailableKnights( attack.cityKey );
												if( knights.length < level.waves.length ){
													//KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Pas assez de chevalier'+ (level.waves.length > 1 ? 's' : '') +' disponible'+ (level.waves.length > 1 ? 's' : '') +' pour lancer '+ (level.waves.length > 1 ? 'les '+ level.waves.length +' vagues' : 'la vague') +' depuis '+ city.label]);
													continue;
												}

												if( level.knightPriority == '' ){
													knight = knights[0].knightId;
												} else if( level.knightPriority == 'highest' ){
													highest = 0;
													for( k in knights ){
														if( knights.hasOwnProperty(k) ){
															if( parseFloat(knights[k].knight.combat) > highest ){
																knight = knights[k].knightId;
															}
														}
													}
													if( knight == null ){
														//KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Chevalier indisponible dans '+ city.label]);
														continue;
													}
												} else if( level.knightPriority == 'lowest' ){
													lowest = 0;
													for( k in knights ){
														if( knights.hasOwnProperty(k) ){
															if( parseFloat(knights[k].knight.combat) < lowest ){
																knight = knights[k].knightId;
															}
														}
													}
													if( knight == null ){
														//KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Chevalier indisponible dans '+ city.label]);
														continue;
													}
												}
												baseParams.kid = knight;

											//check units
												units = window.seed.units[ attack.cityKey ]
												enoughUnits = true;
												for( w = 0; w < level.waves.length; w += 1 ){
													if( !enoughUnits ) continue;
													wave = level.waves[w];
													for( j = 0; j < wave.units.length; j += 1 ){
														unit = wave.units[j];
														unitKey = unit.id.replace(/nt/, '');
														unitNum = parseInt(unit.id.replace(/unt/, ''), 10); //for unitsArr, 0 based
														qty = parseFloat(unit.qty);

														available = parseFloat(units[ unit.id ]);
														if( available < qty ){
															//KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Pas assez de troupe ('+ window.unitcost[ unit.id ][0] +') dans '+ city.label]);
															enoughUnits = false;
														} else {
															for( k = 0; k < attack.keep.length; k += 1 ){
																keep = attack.keep[k];
																if( unit.id == keep.id && available - qty < parseFloat(keep.qty) ){
																	//KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Pas assez de troupe ('+ window.unitcost[ unit.id ][0] +') (conservation) dans '+ city.label]);
																	enoughUnits = false;
																}
															}
														}
													}
												}
												if( !enoughUnits ) continue;

											baseParams.cid = attack.cityKey.replace(/city/, '');

											//for the city all checks are ok
											found = true;
											break;
										}
									}
								}

								if( !found ){
									//KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e / '+ coordsLength +') n\'est pas du bon niveau ('+ info.tileLevel +').']);
									bunchIndex += 1;
									return bdfd.pipe( check(bdfd) );
								}

								baseParams.xcoord = gps[0];
								baseParams.ycoord = gps[1];
								bunchIndex += 1;
								return bdfd.pipe( checkAndLaunchWaves(bdfd) );
							}
						}
					};

					$.when( bunchSequence() )
						.always(function(){
							attack.coordIndex += bunchIndex;
							dfd.pipe( checkCoordByBunch(dfd, 3) );
						});
				};

				var checkCoordByBunch = function(dfd, 3){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkCoordByBunch function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}
					KOCFIA[ mod ].refreshOngoingInfo(attack, false);

					if( attack.coordIndex >= coordsLength ){
						KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Aucune coordonnée validée pour l\''+ label +'.']);
						return dfd.reject();
					}

					var cParams = jQuery.extend(true, {}, window.g_ajaxparams),
						i, gps, blocks = [];

					for( i = 0; i < 10; i += 1 ){
						gps = coords[ attack.coordIndex + i ].split(',');
						bunch.push( gps );

						blocks.push("bl_" + gps[0] + "_bt_" + gps[1]);

						if( attack.coordIndex + i >= coordsLength ){
							break;
						}
					}

					cParams.blocks = blocks.join(',');

					$.ajax({
						url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
						type: 'post',
						data: cParams,
						dataType: 'json',
						timeout: 10000,
					})
					.done(function(result){
						if( result.data ){
							return dfd.pipe( byBunch(dfd, result.data) );
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( checkCoordByBunch(dfd, attempts) );
							} else {
								attack.coordIndex += 1;
								return dfd.pipe( checkCoordByBunch(dfd, 3) );
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( checkCoordByBunch(dfd, attempts) );
						} else {
							attack.coordIndex += 1;

							return dfd.pipe( checkCoordByBunch(dfd, 3) );
						}
					});
				};

				//check one coord and return the result using the deferred object in parameter
				var checkCoord = function( dfd, attempts ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkCoord function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					KOCFIA[ mod ].refreshOngoingInfo(attack, false);

					if( attack.coordIndex >= coordsLength ){
						KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Aucune coordonnée validée pour l\''+ label +'.']);
						return dfd.reject();
					}

					var gps = coords[ attack.coordIndex ].split(','),
						cParams = jQuery.extend(true, {}, window.g_ajaxparams);

					//check claim on the target
					cParams.blocks = "bl_" + gps[0] + "_bt_" + gps[1];
					$.ajax({
						url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
						type: 'post',
						data: cParams,
						dataType: 'json',
						timeout: 10000,
					})
					.done(function(result){
						if( result.data ){
							var info = result.data['l_'+ gps[0] +'_t_'+ gps[1]];
							if( info ){
								var type = parseInt(info.tileType, 10);
								if( mod == 'wilderness' ){
									if( type <= 0 || type > 50 ){
										KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e) n\'est pas une terre sauvage']);
										attack.coordIndex += 1;

										return dfd.pipe( checkCoord(dfd, 3) );

									} else if( info.tileUserId != null || info.tileCityId != null ){ //"0" -> under mists, "xxx" -> no mists
										KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e) occupées']);
										attack.coordIndex += 1;
										return dfd.pipe( checkCoord(dfd, 3) );

									} else {
										baseParams.xcoord = gps[0];
										baseParams.ycoord = gps[1];
										return dfd.pipe( checkAndLaunchWaves(dfd) );
									}
								} else if( mod == 'scout' ){
									var closest = '', range = 999;
									for( i = 0; i < attack.cities.length; i += 1 ){
										attack.cityKey = attack.cities[i];
										city = KOCFIA.cities[ attack.cityKey ];

										var slots = Shared.getRallyPointSlots( attack.cityKey ),
											keepFree = parseInt(attack.rpSlot, 10) || 0;
										if( slots - keepFree > 0 ){
											if( Shared.getDistance(city.coords.x, city.coords.y, gps[0], gps[1]) < range ){
												closest = attack.cityKey;
											}
										} else {
											KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Pas assez de place dans le point de ralliement de '+ city.label]);
										}
									}

									if( closest != '' ){
										attack.cityKey = closest;
										city = KOCFIA.cities[ attack.cityKey ];
										baseParams.cid = attack.cityKey.replace(/city/, '');
									} else {
										//all cities have no slots left
										return dfd.reject();
									}

									baseParams.xcoord = gps[0];
									baseParams.ycoord = gps[1];
									return dfd.pipe( checkAndLaunchWaves(dfd) );
								}
							} else {
								KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Informations sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e) manquantes.']);

								attack.coordIndex += 1;

								return dfd.pipe( checkCoord(dfd, 3) );
							}
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( checkCoord(dfd, attempts) );
							} else {
								attack.coordIndex += 1;

								return dfd.pipe( checkCoord(dfd, 3) );
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( checkCoord(dfd, attempts) );
						} else {
							attack.coordIndex += 1;

							return dfd.pipe( checkCoord(dfd, 3) );
						}
					});
				};

				//loop function for checking and launching each wave, use deferred.pipe() to iterate
				var checkAndLaunchWaves = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkAndLaunchWaves function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					waveIndex = 0;
					return dfd.pipe(checkAndLaunchWave(dfd));
				};

				//check wave integrity (knight, troops, keep) and launch the wave
				var checkAndLaunchWave = function( dfd ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkAndLaunchWave function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					/* deferred wave specific functions */
						//first in wave sequence, will pipe the deferred resolution to checkKnight function
						var findLostKnights = function(wdfd){
							if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred findLostKnights function');
							if( $tr.data('stop') ){
								stop();
								return dfd.reject();
							}

							Shared.freeKnights( attack.cityKey );
							return wdfd.pipe( checkKnight(wdfd) );
						};

						//second in wave sequence, will pipe the deferred resolution to checkUnits function
						var checkKnight = function(wdfd){
							if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkKnight function');
							if( $tr.data('stop') ){
								stop();
								return dfd.reject();
							}

							var knights = Shared.getAvailableKnights( attack.cityKey ),
								k;

							if( waveIndex == 0 && knights.length < attack.waves.length ){
								KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Pas assez de chevalier disponible pour lancer les '+ attack.waves.length +' vagues.']);
								return wdfd.reject();
							}

							if( !knights.length ){
								KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Aucun chevalier disponible.']);
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
									KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, 'Chevalier indisponible.']);
									return wdfd.reject();
								}
							}

							wParams.kid = knight;
							return wdfd.pipe( checkUnits(wdfd) );
						};

						//third in wave sequence, will pipe the deferred resolution to launchWave function
						var checkUnits = function(wdfd){
							if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkUnits function');
							if( $tr.data('stop') ){
								stop();
								return dfd.reject();
							}

							var j, k, unit, unitKey, unitNum, qty, available, keep;
							for( j = 0; j < wave.units.length; j += 1 ){
								unit = wave.units[j];
								unitKey = unit.id.replace(/nt/, '');
								unitNum = parseInt(unit.id.replace(/unt/, ''), 10); //for unitsArr, 0 based
								qty = parseFloat(unit.qty);
								wParams[ unitKey ] = qty;
								unitsArr[ unitNum ] = qty;

								available = parseFloat(units[ unit.id ]);
								if( available < qty ){
									KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, (mod == 'scout' ? city.label + ' ' : '') +'Pas assez de troupe ('+ window.unitcost[ unit.id ][0] +').']);
									return wdfd.reject();
								} else {
									for( k = 0; k < kLength; k += 1 ){
										keep = attack.keep[k];
										if( unit.id == keep.id && available - qty < parseFloat(keep.qty) ){
											KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, (mod == 'scout' ? city.label + ' ' : '') +'Pas assez de troupe ('+ window.unitcost[ unit.id ][0] +') (conservation).']);
											return wdfd.reject();
										}
									}
								}
							}
							return wdfd.pipe( launchWave(wdfd, 3) );
						};

						//fourth and last in wave sequence
						var launchWave = function(wdfd, launchAttempts){
							if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred launchWave function');
							if( $tr.data('stop') ){
								stop();
								return dfd.reject();
							}

							var p = wParams; //params is redefined in $.ajax, need for attach_addoutgoingmarch call
							$.ajax({
								url: window.g_ajaxpath + "ajax/march.php" + window.g_ajaxsuffix,
								type: 'post',
								data: wParams,
								dataType: 'json',
								timeout: 10000,
							}).done(function( result ){
								if( result.ok ){
									attack.marching.push( result.marchId );
									if( mod == 'darkForest' ){
										attack.marchingCoords.push( p.xcoord +','+ p.ycoord );
									}

									var timediff = parseInt(result.eta, 10) - parseInt(result.initTS, 10);

									ts = parseInt(d.getTime() / 1000, 10);
									time = timediff; //for the wait before next attack

									window.attach_addoutgoingmarch(result.marchId, result.marchUnixTime, ts + timediff, p.xcoord, p.ycoord, unitsArr, p.type, p.kid, resources, result.tileId, result.tileType, result.tileLevel, p.cid, true);

									//force the status of a knight to avoid reusing it on next wave
									if( p.kid != 0 ){
										window.seed.knights[ 'city' + p.cid ][ 'knt' + p.kid ].knightStatus = 10;
									}

									window.updateBoosts( result );
									if( result.liftFog ){
										window.update_boosts();
										window.seed.playerEffects.fogExpire = 0;
										window.g_mapObject.getMoreSlots();
									}

									return wdfd.resolve();
								} else {
									if( result.msg ){
										KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, (mod == 'scout' ? city.label + ' ' : '') +'Plan d\''+ label +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' refusé ('+ result.msg + (result.msg.indexOf('marais') ? '(le serveur a retourné un type de coordonnées pas à jour)' : '') +').']);
										//sometimes the checkCoord find a dark forest that is in fact a swamp with an incorrect tileType
										if( mod == 'darkForest' && result.msg.indexOf('marais') > -1 ) attack.coordIndex += 1;
										return wdfd.reject();
									} else if( result.user_action == 'marchCaptcha' ){
										KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, (mod == 'scout' ? city.label + ' ' : '') +'Plan d\''+ label +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' refusé (captcha !).']);
										return wdfd.reject();
									} else {
										KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, (mod == 'scout' ? city.label + ' ' : '') +'Plan d\''+ label +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' refusé (erreur serveur).']);
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
								KOCFIA[ mod ].refreshOngoingInfo(attack, false, [ d.getTime() / 1000, (mod == 'scout' ? city.label + ' ' : '') +'Plan d\''+ label +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' refusé (erreur internet).']);

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
								if( mod == 'wilderness' ){
									return wdfd.pipe( findLostKnights(wdfd) );
								} else if( mod == 'darkForest' ){
									return wdfd.pipe( checkUnits(wdfd, 3) );
								} else { //scout
									//no knight for scouting, so we pipe directly to checking unit
									wParams.kid = 0;
									return wdfd.pipe( checkUnits(wdfd) );
								}
							}).promise();
						};

					var units = window.seed.units[ attack.cityKey ],
						wParams = $.extend({}, baseParams),
						resources = [0, 0, 0, 0, 0],
						unitsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						knight = null,
						wave,
						kLength;
					if( attack.category == 'scout' ){
						attack.waves = [{ units: [{id: 'unt3', qty: attack.units[ attack.cityKey ]}] }];
						attack.keep = [];
						if( attack.keeps.hasOwnProperty( attack.cityKey ) ){
							attack.keep = [{id: 'unt3', qty: attack.keeps[ attack.cityKey ]}];
						}
					}

					wave = attack.waves[ waveIndex ],
					kLength = attack.keep.length;

					$.when( waveSequence() )
						.done(function(){
							waveIndex += 1;
							if( waveIndex < attack.waves.length ){
								if( mod == 'wilderness' ){
									//launch next wave in 10s
									window.setTimeout(function(){
										dfd.pipe( checkAndLaunchWave(dfd) );
									}, 10000);
								} else if( mod == 'darkForest'){
									//launch next wave in 10s
									window.setTimeout(function(){
										dfd.pipe( checkAndLaunchWave(dfd) );
									}, 10000);
								} else if( mod == 'scout'){
									//launch next wave in 5s
									window.setTimeout(function(){
										dfd.pipe( checkAndLaunchWave(dfd) );
									}, 5000);
								}
							}

							return dfd.resolve();
						})
						.fail(function(){
							if( attack.marching.length ){
								Shared.recallWaves( attack );
							}

							return dfd.reject();
						});
				};

				var attackSequence = function(){
					return $.Deferred(function( dfd ){
						//using deferred.pipe() to iterate
						return dfd.pipe( previousMarchingCheck(dfd) );
					}).promise();
				};

			var baseParams = jQuery.extend(true, {}, window.g_ajaxparams);
			if( baseParams == null ){
				alert('Paramètres ajax manquant. Raffraîchissez la page.');
				return;
			}

			baseParams.cid = (mod == 'wilderness' ? attack.cityKey.replace(/city/, '') : null);
			baseParams.type = (mod != 'scout' ? 4 : 3); //MARCH_TYPE_ATTACK 4, MARCH_TYPE_SCOUT 3
			baseParams.gold = 0;
			baseParams.r1 = 0;
			baseParams.r2 = 0;
			baseParams.r3 = 0;
			baseParams.r4 = 0;
			baseParams.r5 = 0;
			baseParams.items = '';

			//using deferred to sequentialize asynchronous tasks
			$.when( attackSequence() )
				.done(function(){
					KOCFIA[ mod ].refreshOngoingInfo(attack, false, [d.getTime() / 1000, (mod == 'scout' ? 'Eclairage lancé' : 'Attaque lancée') +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) + 'e / ' + coords.length +')' +(mod != 'wilderness' ? ' depuis '+ city.label : '')]);

					attack.coordIndex += 1;
				})
				.fail(function(){
					time = 0;
					//if( mod == 'darkForest' ) time = 10 * 60;
				})
				.always(function(){
					if( stopped ) return;

					//save the last coord if the attack is a stored one
					if( KOCFIA[ mod ].attacks[ attack.cityKey ]
						&& KOCFIA[ mod ].attacks[ attack.cityKey ][ attack.id ]
					){
						KOCFIA[ mod ].attacks[ attack.cityKey ][ attack.id ].coordIndex = attack.coordIndex;
						KOCFIA[ mod ].storeAttacks();
					} else if( mod == 'scout' ){
						KOCFIA[ mod ].attacks[ attack.id ].coordIndex = attack.coordIndex;
						KOCFIA[ mod ].storeAttacks();
					} else if( mod == 'darkForest' ){
						KOCFIA[ mod ].attacks.coordIndex = attack.coordIndex;
						KOCFIA[ mod ].storeAttacks();
					}

					time *= 1000; //timestamp in milliseconds in javascript

					//force march update 10s after impact
					window.setTimeout(function(){
						Shared.forceMarchUpdate( attack );
					}, time + 10000);

					if( mod == 'scout' ){
						//when finished (coords), loop only in automatic mode
						if( attack.coordIndex >= coordsLength ){
							if( KOCFIA.conf[ mod ].automatic && KOCFIA[ mod ].attacks[ attack.id ] ){
								attack.coordIndex = 0;
							} else {
								KOCFIA[ mod ].refreshOngoingInfo(attack, true, [d.getTime() / 1000, 'Eclairage fini']);
								return;
							}
						}

						//next round
						window.setTimeout(function(){
							KOCFIA.checkAndLaunchAttack( attack );
						}, 10000);

					} else if( mod == 'darkForest' ){
						//force refresh
						window.setTimeout(function(){
							Shared.updateSeed();
						}, time + 5000);

						//attacks loop only if in automatic mode
						if( attack.coordIndex >= coordsLength ){
							if( KOCFIA.conf[ mod ].automatic ){
								attack.coordIndex = 0;
							} else {
								KOCFIA[ mod ].refreshOngoingInfo(attack, true, [d.getTime() / 1000, 'Attaque finie']);
								return;
							}
						}

						//check if there is some place left in the active cities
						var i, slots, keepFree, citiesWithEmptySlot = 0;
						for( i = 0; i < attack.cities.length; i += 1 ){
							attack.cityKey = attack.cities[i];
							if( attack.info[ attack.cityKey ].active ){
								attack.rpSlot = attack.info[ attack.cityKey ].rps;
								slots = Shared.getRallyPointSlots( attack.cityKey );
								keepFree = parseInt(attack.rpSlot, 10) || 0;
								if( slots - keepFree > 1 ){
									citiesWithEmptySlot += 1;
								}
							}
						}

						//more than 2 third of the active cities have free slots
						if( citiesWithEmptySlot > 2 * attack.cities.length / 3 ){
							//next round
							window.setTimeout(function(){
								KOCFIA.checkAndLaunchAttack( attack );
							}, 60000);
						} else {
							//not enough places, wait 5 minutes
							window.setTimeout(function(){
								KOCFIA.checkAndLaunchAttack( attack );
							}, 5 * 60000);
						}

					} else if( mod == 'wilderness' ){
						time *= 2; //round-trip

						//force refresh
						window.setTimeout(function(){
							Shared.updateSeed();
						}, time + 30000);

						//attacks loop only if in automatic mode
						if( attack.coordIndex >= coordsLength ){
							if( KOCFIA.conf[ mod ].automatic && KOCFIA[ mod ].attacks[ attack.cityKey ] && KOCFIA[ mod ].attacks[ attack.cityKey ][ attack.id ]){
								attack.coordIndex = 0;
							} else {
								KOCFIA[ mod ].refreshOngoingInfo(attack, true, [d.getTime() / 1000, 'Attaque finie']);
								return;
							}
						}

						//next round
						window.setTimeout(function(){
							KOCFIA.checkAndLaunchAttack( attack );
						}, time + 45000);
					}
				});
		};

		KOCFIA.init();
})(window, document, jQuery);

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
