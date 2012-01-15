/* @todo
 * correction formatage durée
 * modification de l'autoscout
 */
console.info('koc start');
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

var KOC = {};

var debug = {};

jQuery(document).ready(function(){
//CSS rules declarations
	var kocConfPanelCss = "#koc-conf-panel-toggle {}";
		kocConfPanelCss += "\n#koc-conf-panel .ui-icon-close { position: absolute; right: -3px; top: -3px; cursor: pointer; }";
		kocConfPanelCss += "\n#koc-conf-panel { display: none; position: absolute; z-index: 100001; }";
		kocConfPanelCss += "\n#koc-conf-panel label + select { margin-left: 5px; }";
		kocConfPanelCss += "\n#koc-conf-panel .ui-icon-close { float: right; cursor: pointer; }";
		kocConfPanelCss += "\n#koc-conf-panel .ui-icon-trash { cursor: pointer; display: inline-block; }";
		kocConfPanelCss += "\n#koc-conf-panel ul:not(.ui-accordion-content) { margin: 5px; }";
		kocConfPanelCss += "\n.koc-conf-panel-tab.on { background-image: -moz-linear-gradient(-45deg, green 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: -webkit-linear-gradient(-45deg, green 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: linear-gradient(-45deg, green 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-repeat: no-repeat, repeat-x; background-position: 0 0, 50% 50%; }";
		kocConfPanelCss += "\n.koc-conf-panel-tab.off { background-image: -moz-linear-gradient(-45deg, red 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: -webkit-linear-gradient(-45deg, red 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-image: linear-gradient(-45deg, red 15%, transparent 15%, transparent), url('images/ui-bg_glass_100_f6f6f6_1x400.png'); background-repeat: no-repeat, repeat-x; background-position: 0 0, 50% 50%; }";
		kocConfPanelCss += "\n#koc-options p { margin: 3px 0; }";
		kocConfPanelCss += "\n#koc-chat ul { padding-left: 0; }";
		kocConfPanelCss += "\n.ui-tabs .ui-tabs-panel { overflow: auto; padding: 0; }";
		kocConfPanelCss += "\n.ui-tabs-panel h3:not(.ui-accordion-header) { margin: 0;}";
		kocConfPanelCss += "\n.ui-tabs-panel h3:not(.ui-accordion-header):not(:first-child) { margin: 4px 0; }";
		kocConfPanelCss += "\n.ui-tabs-panel h3 p { float: right; font-size: 11px; margin: 0; }";
		kocConfPanelCss += "\n.ui-tabs-panel h3 span { float: right; font-size: 11px; margin: 0 5px; cursor: pointer; }";
		kocConfPanelCss += "\n.ui-tabs-panel .help { display:none; }";
		kocConfPanelCss += "\n.ui-accordion .ui-accordion-header { text-indent: 30px; }";
		kocConfPanelCss += "\n.mapLink { text-decoration: underline; color: blue; cursor: pointer; }";
		kocConfPanelCss += "\n.ui-tabs-panel .infos span { float: right; margin-right: 5px; }";
		kocConfPanelCss += "\n.ui-tabs-panel .accordion { clear: both; margin-top: 5px; }";
		kocConfPanelCss += "\n.attack-form fieldset small { display: block; }";
		kocConfPanelCss += "\n.attack-form .keep, .attack-form .add-wave, .attack-form .launch, .attack-form .save, .attack-form .saveAndLaunch { display: none; }";
		kocConfPanelCss += "\n.attack-form { counter-reset: waves; }";
		kocConfPanelCss += "\n.attack-form .wave legend::after { counter-increment: waves; content: ' ' counter(waves); }";
		kocConfPanelCss += "\n.attack-form .wave label { display: inline-block; }";
		kocConfPanelCss += "\n.attack-form .wave > label, .attack-form .unit-block label:first-child { min-width: 80px; }";
		kocConfPanelCss += "\n.attack-form .unit-block select + label { margin-left: 10px; }";
		kocConfPanelCss += "\n.attack-form .unit-qty { width: 60px; }";
		kocConfPanelCss += "\n.attack-form textarea { width: 150px; height: 120px; }";
		kocConfPanelCss += "\n.attack-form .builds { display: none; float: right; max-width: 220px; }";
		kocConfPanelCss += "\n.attack-form .builds div { -moz-column-count: 2; -moz-column-gap: 5px; -webkit-column-count: 2; -webkit-column-gap: 5px; column-count: 2; column-gap: 5px; }";
		kocConfPanelCss += "\n.attack-list.ui-accordion-content { padding: 2px; }";
		kocConfPanelCss += "\n.attack-list table { width: 100%; }";
		kocConfPanelCss += "\n.attack-list th { padding: 2px; }";
		kocConfPanelCss += "\n.attack-list td { padding: 2px; vertical-align: top; white-space: nowrap; }";
		kocConfPanelCss += "\n.attack-list .actions, .attack-list .current { text-align: center; }";
		kocConfPanelCss += "\n.attack-list .coords, .attack-list .info { white-space: normal; max-width: 200px; }";
		kocConfPanelCss += "\n.attack-list td .ui-icon { float: left; margin: 0 2px; cursor: pointer; }";
		kocConfPanelCss += "\n.attack-list td span:not(.ui-icon) { display: inline-block; padding-right: 5px; }";
		kocConfPanelCss += "\n.attack-list td img { width: 18px; }";
		kocConfPanelCss += "\n.attack-list .attack-errors { display: block; }";
		kocConfPanelCss += "\n.koc-timer-div { position: absolute; color: red; font-weight: bold; left: 612px; display: none; font-family: Verdana, Helvetica, sans-serif; }";
		kocConfPanelCss += "\n#koc-reload-msg { top: 3px; }";
		kocConfPanelCss += "\n#general-refreshFrequency, #general-reloadFrequency { width: 30px; text-align: center; }";
		kocConfPanelCss += "\n#koc-conf-panel .coord { width: 30px; text-align: center; }";
		kocConfPanelCss += "\n#koc-map .save, #koc-map .filter { display: none; }";
		kocConfPanelCss += "\n#koc-map .search-status { padding: 3px; text-align: center; }";
		kocConfPanelCss += "\n#koc-map .search-result table { min-width: 50%; }";
		kocConfPanelCss += "\n#koc-map .search-result textarea { float: right; width: 90px; height: 90px; }";
		kocConfPanelCss += "\n#koc-formation .forms input[type=text] { width: 50px; }";
		kocConfPanelCss += "\n#koc-formation .forms img { width: 18px; height: 18px; position: relative; top: 4px; }";
		kocConfPanelCss += "\n#koc-formation .forms fieldset input + label, #koc-formation .forms fieldset select + label, #koc-formation .forms fieldset label + label { margin: 0 3px 0 10px; }";
		kocConfPanelCss += "\n#koc-formation .forms .save { float: right; }";
		kocConfPanelCss += "\n#koc-formation .forms fieldset { clear: both; }";
		kocConfPanelCss += "\n#koc-formation .ongoing .unit { display: inline-block; min-width: 80px; }";
		kocConfPanelCss += "\n#koc-formation .ongoing .ui-icon-trash { position: relative; top: 2px; }";
		kocConfPanelCss += "\n#koc-formation .ongoing img { margin-right: 5px; width: 18px; height: 18px; position: relative; top: 2px; }";
		kocConfPanelCss += "\n#koc-formation .ongoing.ui-accordion .ui-accordion-content { padding: 5px; }";
		kocConfPanelCss += "\n#koc-formation .ongoing ol { padding-bottom: 3px; }";
		kocConfPanelCss += "\n#koc-formation .ongoing table { width: 100%; }";
		kocConfPanelCss += "\n#koc-formation .ongoing th, #koc-formation .ongoing td { width: 50%; }";
		kocConfPanelCss += "\n#koc-formation .ongoing td { vertical-align: top; }";
		kocConfPanelCss += "\n#koc-formation .ongoing .canceled, #koc-formation .ongoing .canceled span { text-decoration: line-though; }";
		kocConfPanelCss += "\n#koc-formation .ongoing .canceled .ui-icon-trash { visibility: hidden; }";
		kocConfPanelCss += "\n#koc-gloryTournament .scout-form input[type=checkbox] + label { margin-right: 10px; }";

	var kocChatMoveableCss = ".kocmain .mod_comm { background: #FCF8DD; border: 1px solid #A56631; z-index: 99997; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_tabs { background-color: #1054A7; width: auto; top: 0; left: 10px; height: 20px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_body { top: 20px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_body form { height: 25px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .mod_comm_forum { padding-left: 0; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction .button20 { top: 2px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction { width: auto; padding: 3px 5px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction #mod_comm_input { position: absolute; top: 5px; left: 5px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist { width: auto; margin-left: 0; border: none; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .kocMerlinSmall { float: right; padding: 4px; font-size: 10px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .seltab1 a.tab2, .kocmain .mod_comm .seltab2 a.tab1 { height: 20px; line-height: 20px; padding: 0 5px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .seltab1 a.tab1, .kocmain .mod_comm .seltab2 a.tab2 { background: #FCF8DD; height: 20px; line-height: 20px; padding-right: 5px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .seltab1 a.tab1 span, .kocmain .mod_comm .seltab2 a.tab2 span { background: none; height: 20px; line-height: 20px; padding-left: 5px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content { width: auto; float: none; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .message.clearfix { width: auto; display: block; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info { width: auto; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info .nm { padding-left: 18px; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info b { display: none; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .tx { width: auto; float: none; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .flag { display: none; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap img { margin-right: 0; width: 15px; height: 15px; float: none; position: absolute; top: 2px; left: 2px; cursor: pointer; z-index: 1; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .tx a { text-decoration: underline; }";
		kocChatMoveableCss += "\n.kocmain .mod_comm .tx a:hover { text-decoration: none; }";

	var kocChatHelpCss = ".kocmain .mod_comm .comm_global .chatlist .noalliance { display: none; }";
		kocChatHelpCss += "\n.kocmain .mod_comm.ui-draggable { display: block; }";

	var kocChatHighlightLeadersCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.chancellor:not(.direct) { background-color: #C3ECE4; }";
		kocChatHighlightLeadersCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.vice_chancellor:not(.direct) { background-color: #C7E3F7; }";
		kocChatHighlightLeadersCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.officer:not(.direct) { background-color: #D5D2F7; }";

	var kocChatHighlightFriendsCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.friend:not(.direct) { background-color: #FAE4E4; }";
	var kocChatHighlightFoesCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.foe:not(.direct) { background-color: #FFCAA2; }";

	var kocOverviewCss = "#koc-overview { position:absolute; font: 10px/20px Verdana, sans serif; font-width: normal;  z-index: 100000; display: none; }";
		kocOverviewCss += "\n#koc-overview .ui-icon-close { float: right; cursor: pointer; }";
		kocOverviewCss += "\n#koc-overview > h3 { margin: 2px 0; text-indent: 10px; }";
		kocOverviewCss += "\n#koc-overview .ui-tabs .ui-tabs-panel { padding: 2px; }";
		kocOverviewCss += "\n#koc-overview .wrap { width: 100%; overflow: hidden; }";
		kocOverviewCss += "\n#koc-overview table { width: 100%; float: left; }";
		kocOverviewCss += "\n#koc-overview thead tr { display: block; position: relative; }";
		kocOverviewCss += "\n#koc-overview tbody { overflow: auto; display: block; width: 100%; }";
		kocOverviewCss += "\n#koc-overview tr.highlight td, #koc-overview th.highlight { background-color: #F8E0A8; }";
		kocOverviewCss += "\n#koc-overview tr.highlight.toggle th, #koc-overview .toggle th.highlight, #koc-overview .toggle th { background-color: #CCC; }";
		kocOverviewCss += "\n#koc-overview tr td.sum { background-color: #D9F4F1; }";
		kocOverviewCss += "\n#koc-overview img { width:20px; }";
		kocOverviewCss += "\n#koc-overview tr td.sum, #koc-overview tr td.sum ~ td { text-align: right; }";
		kocOverviewCss += "\n#koc-overview .toggle th { width: auto; cursor: pointer; }";
		kocOverviewCss += "\n#koc-overview .details-toggle { margin-left: 10px; font-size: 12px; font-weight: normal; }";
		kocOverviewCss += "\n#koc-overview .details-toggle label:not(:last-child) { padding-right: 8px; }";
		kocOverviewCss += "\n#koc-overview .details-toggle input { position: relative; top: 2px; }";
		kocOverviewCss += "\n#koc-overview .toggle .ui-icon { float: left; }";
		kocOverviewCss += "\n#koc-overview .img { width: 20px; }";
		kocOverviewCss += "\n#koc-overview .label { width: 100px; text-overflow: ellipsis; }";
		kocOverviewCss += "\n#koc-overview .sum { width: 55px; }";
		kocOverviewCss += "\n#koc-overview thead tr th:last-child, #koc-overview thead tr td:last-child { width: auto; }";
		kocOverviewCss += "\n#koc-overview .sizer td, #koc-overview .sizer td.sum, #koc-overview .sizer.highlight td { height: 1px; line-height: 1px; background-color: black; padding: 0; }";

	var kocNotepadCss = "#koc-notepad { padding: 2px 3px; }";
		kocNotepadCss += "\n#koc-notepad { position:absolute; font: 10px/20px Verdana, sans serif; font-width: normal;	z-index: 100000; display: none; }";
		kocNotepadCss += "\n#koc-notepad .ui-icon-close { float: right; cursor: pointer; }";
		kocNotepadCss += "\n#koc-notepad .wrap { width: 100%; overflow: auto; }";
		kocNotepadCss += "\n#koc-notepad textarea { width: 100%; height: 150px; box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }";
		kocNotepadCss += "\n#koc-notepad .wrap input + label { display: block; }";
		kocNotepadCss += "\n#koc-notepad .charsLeft { float: right; }";
		kocNotepadCss += "\n#koc-notepad ul { display: block; -moz-column-count: 3; -moz-column-gap: 1em; -webkit-column-count: 3; -webkit-column-gap: 1em; column-count: 3; column-gap: 1em; }";
		kocNotepadCss += "\n#koc-notepad li .ui-icon { display: inline-block; }";
		kocNotepadCss += "\n#koc-notepad li { white-space: nowrap; }";
		kocNotepadCss += "\n#koc-notepad li button { max-width: 120px; text-overflow: ellipsis; overflow: hidden; }";

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

	KOC = {
		'server': null,
		'modules': ['chat', 'fbWallPopup', 'overview', 'crestHunt', 'notepad', 'map', 'formation'], //, 'gloryTournament'],
		'modulesLabel': {
			'crestHunt': 'Armoiries',
			//'gloryTournament': 'Tournoi de Gloire',
		},
		'stored': ['conf'],
		'init': function(){
			console.info('KOC init function');

			//get server id
				KOC.server = KOC.shared.getServer();
				console.info('server', KOC.server);
				if( KOC.server == null ){
					console.error('wrong server id');
					return;
				}

			//get server id
				KOC.kabamuid = KOC.shared.getUserId();
				console.info('kabamuid', KOC.kabamuid);
				if( KOC.kabamuid == null ){
					console.error('wrong user id');
					return;
				}

			KOC.storeUniqueId = KOC.server + '_' + KOC.kabamuid;

			//gather the default conf
				console.time('default conf gathering');
				var i, modulesLength = KOC.modules.length;
				for( i = 0; i < modulesLength; i += 1 ){
					var mod = KOC.modules[i];
					KOC.defaultConf[mod] = KOC[mod].options;
				}
				KOC.conf = KOC.defaultConf;
				console.timeEnd('default conf gathering');

			//get stored conf if present
				try {
					var storedConf = localStorage.getObject('koc_conf_' + KOC.storeUniqueId);
					if( storedConf ){
						$.extend(true, KOC.conf, storedConf);
						console.info('used stored conf');
					}
				} catch( e ){
					console.error(e);
				}
				//console.log(KOC.conf);

			//set message event listener
			//used to pass data between iframes
				window.addEventListener('message', function(event){
					//console.log(event);
					//return the conf values for fbWallPopup module
					if( event.origin.indexOf('facebook.com') != -1 ){
						event.source.postMessage(KOC.conf.fbWallPopup, 'https://apps.facebook.com/');
						event.source.postMessage(KOC.conf.fbWallPopup, 'http://apps.facebook.com/');
					}
					return;
				}, false);

				//console.log('message');
				top.postMessage('loaded1', 'https://apps.facebook.com/');
				top.postMessage('loaded2', 'http://apps.facebook.com/');
				//top.postMessage('loaded3', window.location.href);
				window.setInterval(function(){
					//console.log('message');
					top.postMessage('loaded1', 'https://apps.facebook.com/');
					top.postMessage('loaded2', 'http://apps.facebook.com/');
					//top.postMessage('loaded3', window.location.href);
				}, 10000);

			//gather stored items list for deletion ease
				for( i = 0; i < modulesLength; i += 1 ){
					var mod = KOC.modules[i];
					if( KOC[mod].stored ){
						var j, length = KOC[mod].stored.length;
						for( j = 0; j < length; j += 1 ){
							KOC.stored.push( mod + '_' + KOC[mod].stored[j] );

							try{
								var stored = localStorage.getObject('koc_' + mod + '_' + KOC[mod].stored[j] + '_' + KOC.storeUniqueId);
								if( stored ){
									KOC[mod][ KOC[mod].stored[j] ] = stored;
								}
							} catch(e){
								alert(e);
							}

						}
					}
				}

			//ajax sniffer
				console.time('sniffer');
				KOC.ajaxSniffer();
				console.timeEnd('sniffer');

			//get player cities
				KOC.shared.getCities();

			//configuration panel
				console.time('confPanel');
				KOC.confPanel();
				console.timeEnd('confPanel');

			//modules init
				var initModule = function(i){
					//delayed init for modules
					window.setTimeout(function(){
						console.time('koc '+ KOC.modules[i] +' on');
						KOC[ KOC.modules[i] ].on();
						console.timeEnd('koc '+ KOC.modules[i] +' on');
					}, i * 1000 + 1000);
				};
				for( i = 0; i < modulesLength; i += 1 ){
					if( KOC.conf[KOC.modules[i]].active ){
						initModule(i);
					}
				}

			//refresh button
				KOC.$buttons.append(
					$('<button id="koc-refresh-seed">')
						.text('Raffraîchir')
						.attr('title', 'Force la mise à jour des données du jeux, sauf les troupes.')
						.click(function(e){ KOC.shared.updateSeed(); })
				);
				KOC.$refreshButton = $('#koc-refresh-seed');

				KOC.$buttons.append(
					$('<button id="koc-free-knights">')
						.text('Rappeler les chevaliers perdus')
						.click(function(e){
							for( var i = 0; i < KOC.citiesId.length; i += 1 ){
								KOC.shared.freeKnights( KOC.citiesId[i] );
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
				var $form = $('<form>', { 'id': 'koc-reload', 'target': '_top', 'action': '', 'method': 'post' });
				$form.append(' <input type="hidden" name="s" value="'+ KOC.storeUniqueId +'">');
				$body.append( $form.hide() );

			//reload timeout
				$body.append('<div id="koc-reload-msg" class="koc-timer-div">Rechargement de la page dans : <span class="koc-timer"></span></div>');
				KOC.$reloadTimer = $('#koc-reload-msg');
				if( KOC.conf.general.reload ){
					KOC.shared.reloadCountdown(1);
				}

			//refresh data
				if( KOC.conf.general.refresh ){
					KOC.shared.refreshCountdown(1);
				}

			//merlin box
				$body.on('click', '.mod_comm_mmb, .kocMerlinSmall', function(){
					merlinBoxClick = true;
				});

				if( KOC.conf.general.hideMagicalBoxPreview ){
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
				if( KOC.conf.general.hideOtherPlayersCourtInvitation ){
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
				if( KOC.conf.general.hideFairPopup ){
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
					'size': {'width': 350, 'height': 250},
					'selected': 0,
					'visible': 0,
				}
			},
		/* DATA */
			'cities': [],//[{'id','name','coords': {x,y}}, ...]
			'citiesId': [],
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
				console.info('KOC ajaxSniffer function');
				var buffer = null;
				XMLHttpRequest.prototype.oldOpen = XMLHttpRequest.prototype.open;
				var newOpen = function(method, url, async, user, password){
					var filename = url.substring(url.lastIndexOf('/')+1);
					switch(filename){
						case 'getChat.php':
							this.addEventListener("load", function(){
								if( KOC.conf.chat.active && ( KOC.conf.chat.cleanHelp || KOC.conf.chat.highlightLeaders || KOC.conf.chat.highlightFriends || KOC.conf.chat.highlightFoes ) ){
									try {
										var r = JSON.parse(this.responseText);
										if( r.data && r.data.newChats ){
											if( r.data.newChats['2'] && r.data.newChats['2'].length > 0 ){
												if( KOC.conf.chat.cleanHelp ) KOC.chat.cleanHelp( r.data.newChats[2] );
												if( KOC.conf.chat.highlightLeaders ) KOC.chat.highlightLeaders( $chatAlliance, r.data.newChats['2'].length );
											}
											if( r.data.newChats['1'] && r.data.newChats['1'].length > 0 ){
												if( KOC.conf.chat.highlightLeaders ) KOC.chat.highlightLeaders( $chatGeneral, r.data.newChats['1'].length );
												if( KOC.conf.chat.highlightFriends || KOC.conf.chat.highlightFoes ) KOC.chat.highlightFriendsAndFoes( r.data.newChats['1'].length );
											}
										}
									} catch(e){
										console.warn(e);
										//console.log(this.responseText);
									}
								}
							}, false);
							break;
						case 'allianceGetLeaders.php':
							this.addEventListener("load", function(){
								if( KOC.conf.chat.active && KOC.conf.chat.highlightLeaders ){
									console.time('allianceGetLeaders load');
									var r = JSON.parse(this.responseText);
									if( r.officers ){
										KOC.chat.leaders = {};
										for( var o in r.officers ){
											if( r.officers.hasOwnProperty(o) ){
												KOC.chat.leaders[ r.officers[o].genderAndName ] = r.officers[o].type.toLowerCase();
											}
										}
									}
									KOC.chat.highlightLeaders( $chatAlliance, 0 );
									KOC.chat.highlightLeaders( $chatGeneral, 0 );
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
								window.setTimeout(function(){ KOC.overview.updateFromSeed(); }, 500);
							}, false);
							break;
						case 'changeCityName.php':
							this.addEventListener("load", function(){
								window.setTimeout(function(){
									KOC.shared.getCities();
									KOC.overview.updateFromSeed();
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
									if( r.updateSeed ) window.setTimeout(function(){ KOC.overview.updateFromSeed(); }, 500);
								} catch(e){
									window.setTimeout(function(){ KOC.overview.updateFromSeed(); }, 500);
									console.warn(e);
									//console.log(this.responseText);
								}
							}, false);
							break;
						case 'march.php':
							this.addEventListener("load", function(){
								try{
									var r = JSON.parse(this.responseText);
									if( r.ok ) window.setTimeout(function(){ KOC.overview.updateFromSeed(); }, 500);
								} catch(e){
									window.setTimeout(function(){ KOC.overview.updateFromSeed(); }, 500);
									console.warn(e);
									//console.log(this.responseText);
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
								window.setTimeout(function(){ KOC.overview.updateFromSeed(); }, 500);
							}, false);
							break;
						case 'magicalboxPreview.php':
							this.addEventListener("load", function(){
								//using merlinBoxClick flag to avoid closing the modal on game asked by the user
								if( KOC.conf.general.hideMagicalBoxPreview && !merlinBoxClick ){
									window.setTimeout(function(){ window.Modal.hideModal(); }, 300);
								}
								merlinBoxClick = false;
							}, false);
							break;
						case 'viewCourt.php':
							this.addEventListener("load", function(){
								if( KOC.conf.general.hideOtherPlayersCourtInvitation ){
									window.setTimeout(function(){ window.Modal.hideModal(); }, 300);
								}
							}, false);
							break;
						case 'rollFriendChance.php':
							this.addEventListener("load", function(){
								if( KOC.conf.general.hideFairPopup ){
									//console.log($('#modalContent1').find('.button20.sendfriendbtn'));
									window.setTimeout(function(){ $('#modalContent1').find('.button20.sendfriendbtn').click(); }, 300);
								}
							}, false);
							break;
						case '_dispatch.php':
							this.addEventListener("load", function(){
								window.setTimeout(function(){
									KOC.chat.cleanHelp(0); //to clean self construction help messages
									KOC.overview.updateFromSeed();
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
				console.info('KOC confPanel function');
				$head.append( $('<style>').text(kocConfPanelCss) );

				var $confPanel = $('<div id="koc-conf-panel">');

				var $optionsSection = $('<div id="koc-options">'),
					lis = '<li><a href="#koc-options">Options</a></li>',
					sections = '';

				var i, modulesLength = KOC.modules.length;
				for( i = 0; i < modulesLength; i += 1 ){
					var mod = KOC.modules[i];
					if( typeof KOC[mod].modPanel == 'function' ){
						var active = KOC.conf[mod].active;
						var name = ( KOC.modulesLabel[mod] ? KOC.modulesLabel[mod] : mod.capitalize() );
						lis += '<li class="koc-conf-panel-tab '+ (active ? 'on' : 'off') +'">';
						lis += '<a href="#koc-'+ mod +'">'+ name +'</a>';
						lis += '</li>';
						sections += '<div id="koc-'+ mod +'"></div>';
					}
				}

				console.time('shared option panel');
				KOC.shared.optionPanel( $optionsSection );
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
							KOC.$confPanelNav.find('li').find('a').filter('[href=#koc-'+ mod +']').parent().toggleClass('on off');
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

						KOC.conf[ mod ][ infos[1] ] = status;

						if( mod == 'general' ){
							if( infos[1] == 'reload' ){
								KOC.shared.reloadCountdown(status);
							}
							if( infos[1] == 'refresh' ){
								KOC.shared.refreshCountdown(status);
							}
						}

						if( $this.is('input[type=radio]') ){
							var $linked = $this.siblings('input').filter('[type=radio]').each(function(){
								var infos = this.id.split('-');
								KOC.conf[ infos[0] ][ infos[1] ] = 0;
								var func = infos[1] + 'Off';

								if( typeof KOC[ mod ][ func ] == 'function' ) KOC[ mod ][ func ]();
							});
						}

						KOC.shared.storeConf();

						if( KOC[ mod ] && typeof KOC[ mod ][ func ] == 'function' ) KOC[ mod ][ func ]();
						//else console.warn('not a function', mod, func);
					})
					.on('change', '.conf-choice', function(){
						var $this = $(this),
							infos = this.id.split('-');
						KOC.conf[ infos[0] ][ infos[1] ] = $this.val();
						KOC.shared.storeConf();
					})
					.on('click', '.conf-action', function(e){
						e.preventDefault();
						var $this = $(this),
							infos = $this.attr('rel').split('-'),
							param = $this.data('param');
						if( param ){
							KOC[ infos[0] ][ infos[1] ](param);
						} else {
							KOC[ infos[0] ][ infos[1] ]();
						}
					});

				$confPanel
					.append( '<span class="ui-icon ui-icon-close"></span>' )
					.append( '<nav id="koc-conf-panel-tabs"><ul>' + lis + '</ul></nav>' )
					.append( $optionsSection )
					.append( sections )
					.draggable({
						helper: "original",
						distance: 20,
						stop: function(event, ui){
							KOC.conf.confPanel.position = ui.position;
							KOC.shared.storeConf();
						}
					})
					.resizable({
						minWidth: 250,
						minHeight: 250,
						handles: 'n, e, s, w, ne, se, sw, nw',
						resize: function(event, ui){
							KOC.$confPanelTabs.css('height', KOC.calcConfPanelInnerHeight());
						},
						stop: function(event, ui){
							KOC.conf.confPanel.size = ui.size;
							KOC.shared.storeConf();
						}
					})
					.tabs({
						collapsible: true,
						selected: KOC.conf.confPanel.selected,
						select: function(event, ui){
							//save the selected panel index
							KOC.conf.confPanel.selected = ui.index;
							KOC.shared.storeConf();

							//dynamic generation of the panel on first call
							if( $(ui.panel).html().length == 0 ){
								var mod = ui.panel.id.split('-')[1];
								KOC[mod].modPanel();
							}
						},
					})
					.css({
						'top': KOC.conf.confPanel.position.top,
						'left': KOC.conf.confPanel.position.left,
						'width': KOC.conf.confPanel.size.width,
						'height': KOC.conf.confPanel.size.height
					})
					.find('.ui-icon-close').click(function(e){
						e.preventDefault();
						KOC.$confPanel.hide();
						KOC.conf.confPanel.visible = 0;
						KOC.shared.storeConf();
					});

				var $kocConfPanelToggle = $('<button id="koc-conf-panel-toggle">').text('KOC');
				$kocConfPanelToggle.click(function(){
					console.info('$kocConfPanelToggle click');
					KOC.$confPanel.toggle();
					KOC.conf.confPanel.visible = (KOC.$confPanel.is(':visible') ? 1 : 0);
					KOC.shared.storeConf();

					KOC.$confPanelTabs.css('height', KOC.calcConfPanelInnerHeight());
				});

				$body.append( $confPanel );
				$('#koc-options').accordion({collapsible: true, autoHeight: false});

				$('<div id="koc-buttons">')
					.html( $kocConfPanelToggle )
					.insertBefore( $('#main_engagement_tabs') );
				KOC.$buttons = $('#koc-buttons');

				KOC.$confPanel = $('#koc-conf-panel');
				KOC.$confPanelNav = $('#koc-conf-panel-tabs');
				KOC.$confPanelTabs = KOC.$confPanel.find('.ui-tabs-panel');

				for( i = 0; i < modulesLength; i += 1 ){
					var mod = KOC.modules[i];
					if( typeof KOC[ mod ].modPanel == 'function' ) KOC[ mod ].modPanel();
				}

				if( KOC.conf.confPanel.visible ){
					KOC.$confPanel.show();
					KOC.$confPanelTabs.css('height', KOC.calcConfPanelInnerHeight());
				}
			},
			'calcConfPanelInnerHeight': function(){
				return KOC.$confPanel.innerHeight() - KOC.$confPanelNav.height() - 20;
			},
		/* SHARED */
			'shared': {
				'storeConf': function(){
					console.info('KOC storeConf function', KOC.conf);
					localStorage.setObject('koc_conf_' + KOC.storeUniqueId, KOC.conf);
				},
				'cleanLocalStorage': function(){
					console.info('KOC shared cleanLocalStorage function');
					var i, length = KOC.stored.length;
					for( i = 0; i < length; i += 1 ){
						localStorage.removeItem('koc_' + KOC.stored[i] + '_' + KOC.storeUniqueId);
					}
					$('#koc-map-load-saved').find('option').filter(':gt(0)').remove();
				},
				'optionPanel': function($optionsSection){
					console.info('KOC shared optionPanel function');
					var code = '<h3>Global</h3>';
						code += '<div>';
						code += KOC.shared.generateButton('shared', 'cleanLocalStorage', 'Remise à zèro des données persistantes', null);
						code += KOC.shared.generateButton('shared', 'reloadGame', 'Recharger la page');
						code += KOC.shared.generateCheckbox('general', 'refresh', 'Rafraîchir les données toutes les ', KOC.conf.general.refresh).replace(/<\/p>/, '');
						code += KOC.shared.generateInput('general', 'refreshFrequency', ' minutes', KOC.conf.general.refreshFrequency).replace(/<p>/, '');
						code += KOC.shared.generateCheckbox('general', 'reload', 'Recharger toutes les ', KOC.conf.general.reload).replace(/<\/p>/, '');
						code += KOC.shared.generateInput('general', 'reloadFrequency', ' minutes', KOC.conf.general.reloadFrequency).replace(/<p>/, '');
						code += KOC.shared.generateCheckbox('general', 'hideMagicalBoxPreview', 'Masquer automatiquement la pub pour la boîte magique de Merlin', KOC.conf.general.hideMagicalBoxPreview);
						code += KOC.shared.generateCheckbox('general', 'hideOtherPlayersCourtInvitation', 'Masquer automatiquement les invations pour voir la cour d\'un joueur', KOC.conf.general.hideOtherPlayersCourtInvitation);
						code += KOC.shared.generateCheckbox('general', 'hideFairPopup', 'Masquer automatiquement les fêtes foraines (avec envoie)', KOC.conf.general.hideFairPopup);
						code += '</div>';
					$optionsSection.append( code );

					var i, length = KOC.modules.length;
					for( i = 0; i < length; i += 1 ){
						KOC[ KOC.modules[i] ].confPanel( $optionsSection );
					}
				},
				'reloadCountdown': function(status){
					console.info('KOC shared reloadCountdown function', status);
					if( status ){
						reloadTimer = parseFloat(KOC.conf.general.reloadFrequency) * 60 * 1000;
						reloadTimeout = window.setTimeout(function(){
							console.info('KOC shared reloadCountdown timeout function');
							$('#koc-reload').submit();
							clearInterval( reloadInterval );
						}, reloadTimer - 1);

						KOC.$reloadTimer.show().find('.koc-timer').html( KOC.shared.readableDuration(reloadTimer / 1000) );
						reloadInterval = window.setInterval(function(){
							reloadTimer -= 1000;
							KOC.$reloadTimer.find('.koc-timer').html( KOC.shared.readableDuration(reloadTimer / 1000) );
						}, 1000);
					} else if( reloadTimeout ){
						clearTimeout( reloadTimeout );
						clearInterval( reloadInterval );
						KOC.$reloadTimer.hide();
					}
				},
				'refreshCountdown': function(status){
					console.info('KOC shared refreshCountdown function', status);
					if( status ){
						refreshTimeout = window.setTimeout(function(){
							console.info('KOC shared refreshCountdown timeout function');
							$('#koc-refresh-seed').trigger('click');
						}, parseFloat(KOC.conf.general.refreshFrequency) * 60 * 1000);
					} else if( refreshTimeout ){
						clearTimeout( refreshTimeout );
					}
				},
				'getServer': function(){
					console.info('koc shared getServer function');
					return window.domainName;
				},
				'getUserId': function(){
					console.info('koc shared getUserId function');
					return window.kabamuid;
				},
				'getCities': function(){
					console.time('cities');
					var i, length = window.seed.cities.length;
					for( i = 0; i < length; i += 1 ){
						var c = window.seed.cities[i];
						KOC.cities.push( {'id': c[0], 'name': c[1], 'coords': {'x': c[2], 'y': c[3]}, 'roman': window.roman[i]} );
						KOC.citiesId.push( c[0] );
					}
					console.timeEnd('cities');
				},
				'getCityById': function( cityId ){
					if( cityId.indexOf('city') != 0 ) cityId = cityId.replace(/city/, '');
					var i, length = KOC.cities.length;
					for( i = 0; i < length; i += 1 ){
						if( KOC.cities[i].id == cityId ){
							return KOC.cities[i];
						}
					}
					return false;
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
						num = (num / 1000).toFixed(2);
						suffix = 'K';
					} else if( l <= 9 ){
						num = (num / 1000000).toFixed(2);
						suffix = 'M';
					} else if( l <= 12 ){
						num = (num / 1000000000).toFixed(2);
						suffix = 'G';
					} else {
						num = (num / 1000000000).toFixed(2);
						suffix = 'G';
					}

					var s = '' + num,
						decimal = s.substr(s.length - 2, 2),
						s = s.substr(0, s.length - 3);
					if( decimal.substr(1, 1) == '0' ){
						num = parseFloat(num).toFixed(1);
					}
					if( decimal == '00' ){
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
					time = Math.floor( parseFloat( time ) );
					if( time > 86400 ){ //1 day
						var h = Math.floor( time % 3600 );
						time = time / 3600;
						var j = Math.floor(time / 24);
						if( j > 10 ){
							return j + 'j';
						} else {
							return j + 'j' + h + 'h';
						}
					} else {
						if( time < 61 ){
							return time + 's';
						} else if( time > 3600 ){
							var m = Math.floor( (time % 3600) / 60 );
							return Math.floor( time / 3600 ) + 'h' + m + 'm';
						} else {
							var s = Math.floor( time % 60 );
							return Math.floor( time / 60 ) + 'm' + s + 's';
						}
					}
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
				'marchTimeCalculator': function(cityId, troops, from_x, from_y, is_round_trip, items_applied){
					console.info('koc shared marchTimeCalculator function', cityId, troops, from_x, from_y, is_round_trip, items_applied);
					var speed = 99999,
						total_troops = 0,
						time = 0,
						city = KOC.shared.getCityById( cityId ),
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
				'getRallyPointLevel': function( cityId ){
					var level = 0;
					if( cityId.indexOf('city') != 0 ) cityId = 'city' + cityId;
					for( var b in window.seed.buildings[cityId] ){
						if( window.seed.buildings[cityId].hasOwnProperty(b) ){
							var building = window.seed.buildings[cityId][b];

							if( building[0] == 12 ){
								level = parseInt(building[1], 10);
								break;
							}
						}
					}
					return level;
				},
				'getAvailableKnights': function( cityId ){
					if( cityId.indexOf('city') != 0 ) cityId = 'city' + cityId;
					var leaders = window.seed.leaders[cityId],
						knights = [];
					for( var k in window.seed.knights[cityId] ){
						if( window.seed.knights[cityId].hasOwnProperty(k) ){
							var knight = window.seed.knights[cityId][k];
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
				'freeKnights': function( cityId ){
					console.info('KOC shared freeKnights function', cityId);
					if( cityId.indexOf('city') != 0 ) cityId = 'city' + cityId;
					var leaders = window.seed.leaders[cityId],
						attacks = window.seed.queue_atkp[cityId],
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

					for( var k in window.seed.knights[cityId] ){
						if( window.seed.knights[cityId].hasOwnProperty(k) ){
							if( window.seed.knights[cityId][k].knightStatus != 1
								&& $.inArray( window.seed.knights[cityId][k].knightId, occupiedKnights ) == -1
							){
								//console.log('freed', window.seed.knights[cityId][k].knightName );
								window.seed.knights[cityId][k].knightStatus = 1;
							}
						}
					}
				},
				'updatingSeed': false,
				'updateSeed': function(){
					if( !KOC.shared.updatingSeed ){
						KOC.shared.updatingSeed = true;
						window.update_seed_ajax(true, null);
						window.setTimeout(function(){ KOC.shared.updatingSeed = false; }, 10000);
					}
				},
				'fetchMarch': function( id ){
					console.info('KOC shared fetchMarch function', id);
					var params = window.g_ajaxparams;
					params.rid = id;
					$.ajax({
						url: window.g_ajaxpath + "ajax/fetchMarch.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						success: function(result){
							console.debug( result );
						}
					});
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
				'buildingHighestLevel': function( cityId, buildingId ){
					console.info('KOC shared buildingHighestLevel function');

					if( cityId.indexOf('city') == -1 ){
						cityId = 'city' + cityId;
					}

					var level = 0, b;
					for( b in window.seed.buildings[cityId] ){
						if( window.seed.buildings[cityId].hasOwnProperty(b) ){
							var building = window.seed.buildings[cityId][b],
								buildingLevel = parseInt(building[1], 10);

							if( building[0] == buildingId && level < buildingLevel ) level = buildingLevel;
						}
					}
					return level;
				},
				'forceMarchUpdate': function( attack ){
					console.info('KOC shared forceMarchUpdate function');
					if( window.seed.queue_atkp[ 'city' + attack.cityId ] ){
						var mParams = window.g_ajaxparams,
							i = 0, j, march,
							status = [],
							mLength = attack.marching.length;
						//console.log(mLength, attack.marching);
						if( mLength == 0 ){
							return;
						}

						var checkMarch = function(i){
							console.info('KOC shared forceMarchUpdate checkMarch function');
							status[i] = false;
							march = window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ];
							//console.log('march', i, march);
							if( march ){
								if( !march.hasOwnProperty('kocUpdated') ){
									var mParams = window.g_ajaxparams;
									mParams.rid = attack.marching[i];
									$.ajax({
										url: window.g_ajaxpath + "ajax/fetchMarch.php" + window.g_ajaxsuffix,
										type: 'post',
										data: mParams,
										dataType: 'json',
									}).done(function(data){
										if( data.ok ){
											status[i] = true;
											//set the units Return value
											for( j = 1; j < 13; j += 1 ){
												if( data.march['unit'+ j +'Return'] ){
													window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ]['unit'+ j +'Return'] = data.march['unit'+ j +'Return'];
												}
											}
											for( j = 1; j < 6; j += 1 ){
												if( data.march['resource' + j] ){
													window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ]['resource' + j] = data.march['resource' + j];
												}
											}
											window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ].marchStatus = data.march.marchStatus;
											window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ].hasUpdated = true;

											if( data.march.marchStatus == 2 ){ //MARCH_STATUS_DEFENDING
												window.attack_recall(attack.marching[i], 1, attack.cityId);
											}

											window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ].kocUpdated = true;
										} else {
											console.log(data);
										}
									})
									.always(function(){
										i += 1;
										if( i < mLength ){
											checkMarch(i);
										} else {
											for( var j = 0; j < status.length; j += 1 ){
												if( !status ) return setTimeout(function(){ KOC.shared.forceMarchUpdate( attack ); }, 10000);
											}
										}
									});
								} else {
									status[i] = true;
								}
							} else {
								i += 1;
								if( i < mLength ){
									 checkMarch(i);
								} else {
									for( var j = 0; j < status.length; j += 1 ){
										if( !status ) return setTimeout(function(){ KOC.shared.forceMarchUpdate( attack ); }, 10000);
									}
								}
							}
						}

						checkMarch(i);
					}
				},
				'recallWaves': function( attack ){
					console.info('KOC shared recallWaves function', attack);
					if( attack.marching.length ){
						//recall previous waves
						var k, length = attack.marching.length;
						for( k = 0; k < length; k += 1 ){
							window.attack_recall( attack.marching[k], 2, attack.cityId );
						}
					}
				},
			},
	};

	//modules
		/* FACEBOOK WALL POST POPUP */
			KOC.fbWallPopup = {
				'options': {
					'active': 0,
					'cancel': 0,
					'post': 0,
					'privacyLevel': null,
				},
				'privacyLevelList': {'values': [80, 50, 40, 10], 'labels': ['public', 'amis d\'amis', 'amis', 'privé']},
				'confPanel': function( $section ){
					console.info('KOC fbWallPopup confPanel function');
					var code = '<h3>Popup facebook pour poster sur le mur</h3>';
						code += '<div>';
						code += KOC.shared.generateCheckbox('fbWallPopup', 'active', 'Activer le module', KOC.conf.fbWallPopup.active);
						code += KOC.shared.generateRadio('fbWallPopup', 'action', ['cancel', 'post'], ['annulation automatique', 'publication automatique'], [KOC.conf.fbWallPopup.cancel, KOC.conf.fbWallPopup.post]);
						code += KOC.shared.generateSelect('fbWallPopup', 'privacyLevel', 'niveau de visibilité', KOC.conf.fbWallPopup.privacyLevel, KOC.fbWallPopup.privacyLevelList);
						code += '</div>';

					$section.append( code );
				},
				'on': function(){
					console.info('koc fbWallPopup on function');
				},
				'off': function(){
					console.info('koc fbWallPopup off function');
				},
			};

		/* CHAT */
			KOC.chat = {
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
					console.info('KOC chat confPanel function');
					var code = '<h3>Chat</h3>';
						code += '<div>';
						code += KOC.shared.generateCheckbox('chat', 'active', 'Activer le module', KOC.conf.chat.active);
						code += KOC.shared.generateCheckbox('chat', 'moveable', 'Chat déplacable et redimensionnable', KOC.conf.chat.moveable);
						code += KOC.shared.generateCheckbox('chat', 'cleanHelp', 'Aider automiquement et masquer les demandes', KOC.conf.chat.cleanHelp);
						code += KOC.shared.generateButton('chat', 'onRight', 'Repositionner le chat à droite');
						code += KOC.shared.generateCheckbox('chat', 'highlightLeaders', 'Changer la couleur des messages de la chancellerie (chats Général et Alliance)', KOC.conf.chat.highlightLeaders);
						code += KOC.shared.generateButton('chat', 'getLeadersList', 'Raffraîchir la liste des joueurs de la chancellerie');
						code += KOC.shared.generateCheckbox('chat', 'highlightFriends', 'Changer la couleur des messages des amis (chat Général)', KOC.conf.chat.highlightFriends);
						code += KOC.shared.generateCheckbox('chat', 'highlightFoes', 'Changer la couleur des messages des ennemis (chat Général)', KOC.conf.chat.highlightFoes);
						code += KOC.shared.generateButton('chat', 'cleanFriendsList', 'Vider la liste d\'amis');
						code += KOC.shared.generateButton('chat', 'cleanFoesList', 'Vider la liste d\'ennemis');
						code += '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOC chat modPanel function');
					var $section = KOC.$confPanel.find('#koc-chat').html('');

					var friends = '',
						i, length = KOC.chat.friendsList.length;
					for( i = 0; i < length; i += 1 ){
						friends += '<li><a href="#">'+ KOC.chat.friendsList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
					}

					var foes = '';
					length = KOC.chat.foesList.length;
					for( i = 0; i < length; i += 1 ){
						foes += '<li><a href="#">'+ KOC.chat.foesList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
					}

					var code = '<h3>Liste d\'amis</h3>';
						code += '<p><label for="koc-friend">Joueur : </label>';
						code += '<input type="text" name="koc-friend" id="koc-friend" />';
						code += '<button rel="friends">Ajouter</button></p>';
						code += '<ul class="koc-chat-list" rel="friends">' + friends + '</ul>';
						code += '<h3>Liste d\'ennemis</h3>';
						code += '<p><label for="koc-foe">Joueur : </label>';
						code += '<input type="text" name="koc-foe" id="koc-foe" />';
						code += '<button rel="foes">Ajouter</button></p>';
						code += '<ul class="koc-chat-list" rel="foes">' + foes + '</ul>';

					$section.append( code )
						.on('click', 'button', function(e){
							e.preventDefault();

							var $this = $(this),
								rel = $this.attr('rel'),
								list = rel + 'List',
								name = $this.parent().find('input').val(),
								$ul = $('#koc-chat').find('ul').filter('[rel='+ rel +']');

							if( !$ul.find('li').find('a').filter(':contains("'+ name +'")').length ){
								KOC.chat[list].push( name );
								KOC.chat[list].sort();
								var f = '', i, length = KOC.chat[list].length;
								for( i = 0; i < length; i += 1 ){
									f += '<li><a href="#">'+ KOC.chat[list][ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
								}
								$ul.html( f );

								if( rel == 'friends' ) KOC.chat.storeFriendsList();
								else if( rel == 'foes' ) KOC.chat.storeFoesList();

								if( KOC.chat.highlightFriends || KOC.chat.highlightFoes ){
									KOC.chat.highlightFriendsAndFoes(0);
								}
							}
						})
						.on('click', '.ui-icon-trash', function(){
							var $li = $(this).parent(),
								rel = $li.parent().attr('rel'),
								list = rel + 'List';
							KOC.chat[list].splice(KOC.chat[list].indexOf( $li.find('a').text() ), 1);
							if( rel == 'friends' ) KOC.chat.storeFriendsList();
							else if( rel == 'foes' ) KOC.chat.storeFoesList();
							$li.remove();
						})
						.on('click', 'a', function(e){
							e.preventDefault();
							//use game native function
							Chat.whisper( $(this).text() );
						});
				},
				'on': function(){
					console.info('KOC chat on function');
					//placement
						if( KOC.conf.chat.moveable ){
							KOC.chat.moveableOn();
						}

						if( KOC.conf.chat.onRight && KOC.conf.chat.position.top == 0 ){
							KOC.chat.onRight();
						}

					//clean help
						if( KOC.conf.chat.cleanHelp ){
							KOC.chat.cleanHelpOn();
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
						if( KOC.conf.chat.highlightLeaders ){
							KOC.chat.highlightLeadersOn();
						}

					//highlightFriendsAndFoes
						if( $.isEmptyObject( KOC.chat.friendsList ) ){
							try{
								var persistentFriendsList = localStorage.getObject('koc_chat_friends_list_' + KOC.storeUniqueId);
								if( persistentFriendsList ){
									KOC.chat.friendsList = persistentFriendsList;
								}
							} catch(e){
								console.error(e);
							}
						}

					//highlightFoes
						if( $.isEmptyObject( KOC.chat.foesList ) ){
							try{
								var persistentFoesList = localStorage.getObject('koc_chat_foes_list_' + KOC.storeUniqueId);
								if( persistentFoesList ){
									KOC.chat.foesList = persistentFoesList;
								}
							} catch(e){
								console.error(e);
							}
						}

						if( KOC.conf.chat.highlightFriends ){
							KOC.chat.highlightFriendsOn();
						}

						if( KOC.conf.chat.highlightFoes ){
							KOC.chat.highlightFoesOn();
						}
				},
				'off': function(){
					console.info('KOC chat off function');
					KOC.chat.moveableOff();
					KOC.chat.cleanHelpOff();
					KOC.chat.highlightLeadersOff();
					KOC.chat.highlightFriendsOff();
					KOC.chat.highlightFoesOff();
				},
				/* moveable */
					'moveableOn': function(){
						console.info('KOC chat moveableOn function');
						$head.append( $('<style id="koc-chat-moveable">').text(kocChatMoveableCss) );

						$chat
							.draggable({
								helper: "original",
								distance: 20,
								stop: function(event, ui){
									KOC.conf.chat.position = ui.position;
									KOC.shared.storeConf();
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
									KOC.conf.chat.size = ui.size;
									KOC.shared.storeConf();
								}
							})
							.css({
								'top': KOC.conf.chat.position.top,
								'left': KOC.conf.chat.position.left,
							});

						if( KOC.conf.chat.size.width ){
							$chat.css('width', KOC.conf.chat.size.width);

							$chatInput.width(function(){ return KOC.conf.chat.size.width - 65; })
								.siblings('.button20').css('left', function(){ return KOC.conf.chat.size.width - 55; });
						}

						if( KOC.conf.chat.size.height ) $chat.css('height', KOC.conf.chat.size.height);
						else $chat.css('height', $chat.parent().css('height')); //original height

						$chat
							.find('.comm_body')
								.css('height', function(){ return $chat.height() - 20;})
							.find('.chatlist')
								.css('height', function(){ return $(this).parent().height() - 43; });
						var $jeu = $chat.find('.mod_comm_mmb');
						$jeu.data('ori', $jeu.html())
							.removeClass('mod_comm_mmb').addClass('kocMerlinSmall').html('Boîtes Magiques');
					},
					'moveableOff': function(){
						console.info('KOC chat moveableOff function');
						$('#koc-chat-moveable').remove();
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
						var $jeu = $chat.find('.kocMerlinSmall');
							$jeu.removeClass('kocMerlinSmall').addClass('mod_comm_mmb').html( $jeu.data('ori') ).removeData('ori');
					},
					'onRight': function(){
						console.info('KOC chat onRight function');
						KOC.conf.chat.position = {
							'top': KOC.conf.chat.onRightPosition.top,
							'left': KOC.conf.chat.onRightPosition.left
						};
						$chat.css(KOC.conf.chat.position);
						KOC.shared.storeConf();
					},
				/* cleanHelp */
					'cleanHelpOn': function(){
						console.info('KOC chat cleanHelpOn function');
						$head.append( $('<style id="koc-chat-help">').text(kocChatHelpCss) );
					},
					'cleanHelpOff': function(){
						console.info('KOC chat cleanHelpOff function');
						$('#koc-chat-help').remove();
					},
					'cleanHelp': function( nbMsg ){
						console.info('KOC chat cleanHelp function');
						//suppression du superflu (demande aide et son résultat)
						if( KOC.conf.chat.active && KOC.conf.chat.cleanHelp ){
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
						console.info('koc chat highlightLeaders function');
						if( $targetChat == null ){
							KOC.chat.highlightLeadersReset();
							KOC.chat.highlightLeaders( $chatAlliance, 0 );
							KOC.chat.highlightLeaders( $chatGeneral, 0 );
						} else {
							console.info('KOC chat highlightLeaders function', $targetChat, nbMsg);
							var $messages = $targetChat.find('.chatwrap');
							if( nbMsg > 0 ){
								$messages.filter(':lt('+ nbMsg +')');
							}

							$messages.find('.nm').each2(function(i, $nm){
								var name = $nm.text();
								if( KOC.chat.leaders[ name ] ){
									$nm.closest('.chatwrap').removeClass('chancellor vice_chancellor officer').addClass( KOC.chat.leaders[ name ] );
								}
							});
						}
					},
					'getLeadersList': function(){
						console.info('koc chat getLeadersList function');
						//ajax call to get the leaders, highlighting will be done in the ajax response listener
						window.getDirectoryTabAllianceMembers();
					},
					'highlightLeadersOn': function(){
						console.info('KOC chat highlightLeadersOn function');
						KOC.chat.getLeadersList();

						$head.append( $('<style id="koc-chat-highlight-leaders">').text(kocChatHighlightLeadersCss) );
					},
					'highlightLeadersOff': function(){
						console.info('KOC chat highlightLeadersOff function');
						$('#koc-chat-highlight-leaders').remove();
						KOC.chat.leaders = {};
					},
				/* highlight friends */
					'highlightFriendsOn': function( highlight ){
						console.info('KOC chat highlightFriendsOn function');
						$head.append( $('<style id="koc-chat-highlight-friends">').text(kocChatHighlightFriendsCss) );
						KOC.chat.highlightFriendsAndFoes(0);
					},
					'highlightFriendsOff': function(){
						console.info('KOC chat highlightFriendsOff function');
						$('#koc-chat-highlight-friends').remove();
					},
					'storeFriendsList': function(){
						console.info('KOC storeFriendsList function');
						localStorage.setObject('koc_chat_friends_list_' + KOC.storeUniqueId, KOC.chat.friendsList);
					},
					'cleanFriendsList': function(){
						console.info('KOC cleanFriendsList function');
						KOC.chat.friendsList = [];
						localStorage.setObject('koc_chat_friends_list_' + KOC.storeUniqueId, '');
						$('#koc-chat').find('ul').filter('[rel=friends]').empty();
					},
				/* highlight foes */
					'highlightFoesOn': function(){
						console.info('KOC chat highlightFoesOn function');
						$head.append( $('<style id="koc-chat-highlight-foes">').text(kocChatHighlightFoesCss) );
						KOC.chat.highlightFriendsAndFoes(0);
					},
					'highlightFoesOff': function(){
						console.info('KOC chat highlightFoesOff function');
						$('#koc-chat-highlight-foes').remove();
					},
					'storeFoesList': function(){
						console.info('KOC storeFoesList function');
						localStorage.setObject('koc_chat_foes_list_' + KOC.storeUniqueId, KOC.chat.foesList);
					},
					'cleanFoesList': function(){
						console.info('KOC cleanFoesList function');
						KOC.chat.foesList = [];
						localStorage.setObject('koc_chat_foes_list_' + KOC.storeUniqueId, '');
						$('#koc-chat').find('ul').filter('[rel=foes]').empty();
					},
				/* highlight friends and foes */
					'highlightFriendsAndFoes': function( nbMsg ){
						console.info('KOC chat highlightFriendsAndFoes function', nbMsg);
						var $messages = $chatGeneral.find('.chatwrap'),
							highlightFriends = KOC.conf.chat.highlightFriends && KOC.chat.friendsList.length,
							highlightFoes = KOC.conf.chat.highlightFoes && KOC.chat.foesList.length;

						if( nbMsg > 0 ){
							$messages.filter(':lt('+ nbMsg +')');
						}

						$messages.removeClass('friend foe').find('.nm').each2(function(i, $nm){
							var name = $nm.text().replace(/^(Lady |Lord )/, '');
							if( highlightFriends && $.inArray(name, KOC.chat.friendsList) > -1 ){
								$nm.closest('.chatwrap').addClass('friend');
							}
							if( highlightFoes && $.inArray(name, KOC.chat.foesList) > -1 ){
								$nm.closest('.chatwrap').addClass('foe');
							}
						});
					},
			};

		/* OVERVIEW */
			KOC.overview = {
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
					console.info('KOC overview confPanel function');
					var code = '<h3>Vue globale</h3>';
						code += '<div>';
						code += KOC.shared.generateRadio('overview', 'action', ['replace', 'moveable'], ['Remplace le dessous du jeu (ne pas oublier de mettre le chat à droite)', 'Vue globale déplacable et redimensionnable'], [KOC.conf.overview.replace, KOC.conf.overview.moveable]);
						code += KOC.shared.generateButton('overview', 'resetPlacement', 'Remise à zéro de la position');
						code += KOC.shared.generateButton('overview', 'resetDimensions', 'Remise à zéro des dimensions');
						code += '</div>';

					$section.append( code )
						.on('click', '#overview-replace, #overview-moveable', function(){
							$(this).closest('div').find('button').toggle( $(this).is('#overview-moveable') );
						})
						.find('#overview-replace').closest('div').find('button').toggle( KOC.conf.overview.moveable );
				},
				'on': function(){
					console.info('KOC overview on function');

					$head.append( $('<style id="koc-overview-css">').text(kocOverviewCss) );

					var dataTable = '<table id="koc-overview-data">',
						headers = '<thead><tr><th class="img">&nbsp;</th><th class="label">&nbsp;</th><th class="sum">Total</th>',
						dataLine = '',
						sizer = '<tr class="sizer"><td class="img"></td><td class="label"></td><td class="sum"></td>';
						cols = 3,
						$overview = $('<div id="koc-overview" class="ui-widget ui-widget-content ui-corner-all">');

					//headers
					//data line for cities
						var i, length = KOC.cities.length;
						for( i = 0; i < length; i += 1 ){
							headers += '<th title="'+ KOC.cities[i].name +'">'+ window.roman[i] +'</th>';
							dataLine += '<td>&nbsp;</td>';
							sizer += '<td></td>';
						}
						headers += '</tr></thead>';
						cols += i;
						sizer += '</tr>';

					dataTable += headers + '<tbody>' + sizer;

					//body lines
					var left = 0, i, j, length, part, koc_part;
					for( part in KOC.overview.parts ){
						if( KOC.overview.parts.hasOwnProperty( part ) ){
							dataTable += '<tr class="'+ part +' toggle"><th colspan="'+ cols +'">';
							dataTable += '<span class="ui-icon ui-icon-triangle-1-'+ (KOC.conf.overview.parts_visible[ part ] ? 'se' : 'e') +'"></span>';
							dataTable += KOC.overview.parts[ part ].capitalize();
							if( part == 'troops' ){
								dataTable += '<span class="details-toggle">(';
								dataTable += '<input type="checkbox" id="koc-overview-troops-barbian-toogle" value="troops_barbarian" '+ (KOC.conf.overview.parts_visible['troops_barbarian'] ? 'checked' : '') +'><label for="koc-overview-troops-barbian-toogle">CB</label>';
								dataTable += ')</span>';
							} else if( part == 'resources' ){
								dataTable += '<span class="details-toggle">(';
								dataTable += '<input type="checkbox" id="koc-overview-resources-cap-toogle" value="resources_cap" '+ (KOC.conf.overview.parts_visible['resources_cap'] ? 'checked' : '') +'>';
								dataTable += '<label for="koc-overview-resources-cap-toogle">Plafond</label>';
								dataTable += '<input type="checkbox" id="koc-overview-resources-production-detail-toogle" value="resources_production_detail" '+ (KOC.conf.overview.parts_visible['resources_production_detail'] ? 'checked' : '') +'>';
								dataTable += '<label for="koc-overview-resources-production-detail-toogle">Prod</label>';
								dataTable += '<input type="checkbox" id="koc-overview-resources-production-barbarian-toogle" value="resources_production_barbarian" '+ (KOC.conf.overview.parts_visible['resources_production_detail'] ? 'checked' : '') +'>';
								dataTable += '<label for="koc-overview-resources-production-barbarian-toogle">CB</label>';
								dataTable += '<input type="checkbox" id="koc-overview-resources-consumption-toogle" value="resources_consumption" '+ (KOC.conf.overview.parts_visible['resources_consumption'] ? 'checked' : '') +'>';
								dataTable += '<label for="koc-overview-resources-consumption-toogle">Conso</label>';
								dataTable += '<input type="checkbox" id="koc-overview-resources-production-total-toogle" value="resources_production_total" '+ (KOC.conf.overview.parts_visible['resources_production_total'] ? 'checked' : '') +'>';
								dataTable += '<label for="koc-overview-resources-production-total-toogle">Total</label>';
								dataTable += '<input type="checkbox" id="koc-overview-resources-autonomy-toogle" value="resources_autonomy" '+ (KOC.conf.overview.parts_visible['resources_autonomy'] ? 'checked' : '') +'>';
								dataTable += '<label for="koc-overview-resources-autonomy-toogle">Autonomie</label>';
								dataTable += ')</span>';
							}
							dataTable += '</th></tr>';
							koc_part = KOC[ part ];
							length = koc_part.length;
							for( i = 0; i < length; i += 1 ){
								if( !koc_part[i].hasOwnProperty('label') && koc_part[i].hasOwnProperty('key') ){
									koc_part[i].label = window.resourceinfo[ koc_part[i].key ];
								}
								var rowspan = koc_part[i].rows;
								if( rowspan ){
									for( j = 0; j < rowspan; j += 1 ){
										dataTable += '<tr class="'+ part + (part == 'troops' && j == 1 ? '_barbarian' : '' ) +'">';
										dataTable += (j == 0 ? '<td class="img" rowspan="'+ rowspan +'"><img src="'+ koc_part[i].icon +'"></td>' : '');
										dataTable += '<td class="label">'+ koc_part[i].label[j] +'</td>';
										dataTable += '<td class="sum"></td>';
										dataTable += dataLine + '</tr>';
									}
								} else {
									dataTable += '<tr class="'+ part +'">';
									dataTable += '<td class="img"><img src="'+ koc_part[i].icon +'"></td>';
									dataTable += '<td class="label">'+ koc_part[i].label +'</td>';
									dataTable += '<td class="sum"></td>';
									dataTable += dataLine + '</tr>';
								}
							}
						}
					}
					dataTable += '</tbody></table>';

					$overview.append('<div class="wrap">' + dataTable + '</div>');

					$body.append( $overview );
					KOC.overview.$div = $('#koc-overview');

					KOC.overview.$div
						//highlight from headers
							.on('mouseenter', 'th', function(){
								var col = KOC.overview.$headersThs.index( $(this).addClass('highlight') );
								KOC.overview.$tbodyTrs.find('tr').each2(function(j, $tr){
									$tr.find('td').eq(col).addClass('highlight');
								});
							})
							.on('mouseleave', 'th', function(){
								var col = KOC.overview.$headersThs.index( $(this).removeClass('highlight') );
								KOC.overview.$tbodyTrs.find('tr').each2(function(j, $tr){
									$tr.find('td').eq(col).removeClass('highlight');
								});
							})
						//highlight from body
							.on('mouseenter', 'tbody td', function(){
								var $this = $(this),
									col = $this.parent().addClass('highlight').find('td').index( $this );
								KOC.overview.$headersThs.eq(col).addClass('highlight');
							})
							.on('mouseleave', 'tbody td', function(){
								var $this = $(this),
									col = $this.parent().removeClass('highlight').find('td').index( $this );
								KOC.overview.$headersThs.eq(col).removeClass('highlight');
							})
						//toggles
							.on('click', '.toggle', function(){
								var $this = $(this),
									$triangle = $this.find('.ui-icon'),
									part = $this.attr('class').split(' ')[0];
									opened = !$triangle.hasClass('ui-icon-triangle-1-se');

								if( opened ) $triangle.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-se');
								else $triangle.removeClass('ui-icon-triangle-1-se').addClass('ui-icon-triangle-1-e');

								var $trs = KOC.overview.$tbodyTrs.filter( '.' + part );

								$trs.filter(':not(.toggle)').toggle( opened );

								if( !opened ){
									var $details = $trs.filter('.toggle').find('.details-toggle');
									if( $details.length ){
										$details.find('input').each2(function(i, $input){
											var detail = $input.val();

											$input.prop('checked', false);
											KOC.overview.$tbodyTrs.filter( '.' + detail ).hide();
											KOC.conf.overview.parts_visible[ detail ] = false;
										});
									}
								}

								KOC.conf.overview.parts_visible[ part ] = opened;

								KOC.shared.storeConf();
							})
							.on('click', '.details-toggle input', function(e){
								e.stopPropagation();

								var $this = $(this),
									checked = $this.prop('checked'),
									part = $this.val();

								var $trs = KOC.overview.$tbodyTrs.filter( '.' + part ).toggle( checked ),
									$triangle = $trs.filter('.toggle').find('.ui-icon');

								if( checked ) $triangle.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-se');
								else $triangle.removeClass('ui-icon-triangle-1-se').addClass('ui-icon-triangle-1-e');

								KOC.conf.overview.parts_visible[ part ] = checked;
								KOC.shared.storeConf();
							});

					KOC.overview.$wrap = KOC.overview.$div.find('.wrap');
					KOC.overview.$table = KOC.overview.$div.find('#koc-overview-data');
					KOC.overview.$header = KOC.overview.$table.find('thead');
					KOC.overview.$headersThs = KOC.overview.$header.find('th');
					KOC.overview.$tbody = KOC.overview.$table.find('tbody');
					KOC.overview.$cityTds = KOC.overview.$tbody.find('.sizer').find('td');
					KOC.overview.$tbodyTrs = KOC.overview.$tbody.find('tr').filter(':not(.sizer)');

					var trs, $details, detail;
					for( part in KOC.conf.overview.parts_visible ){
						if( KOC.conf.overview.parts_visible.hasOwnProperty(part) ){
							$trs = KOC.overview.$tbodyTrs.filter( '.' + part );

							if( !KOC.conf.overview.parts_visible[part] ){
								$trs.filter(':not(.toggle)').hide();
							}

							$details = $trs.filter('.toggle').find('.details-toggle');
							if( $details.length ){
								$details.find('input').each2(function(i, $input){
									$input.prop('checked', false);
									detail = $input.val();
									KOC.overview.$tbodyTrs.filter( '.' + detail ).toggle( KOC.conf.overview.parts_visible[detail] );
								});
							}
						}
					}

					window.setTimeout(function(){ KOC.overview.updateFromSeed(); }, 1000);

					if( KOC.conf.overview.replace ){
						KOC.overview.replaceOn();
					} else {
						KOC.overview.moveableOn();
					}
				},
				'off': function(){
					console.info('KOC overview off function');
					$('#koc-overview-css').remove();
					KOC.overview.$div.remove();
					KOC.overview.$div = null;
				},
				'updateFromSeed': function(){
					if( KOC.overview.updating ) return;
					KOC.overview.updating = true;

					console.info('KOC overview updateFromSeed function');
					var $popTrs = KOC.overview.$tbodyTrs.filter('.population').filter(':not(:first)'),
						$resTrs = KOC.overview.$tbodyTrs.filter('.resources').filter(':not(:first)'),
						$resCapTrs = KOC.overview.$tbodyTrs.filter('.resources_cap').filter(':not(:first)'),
						$resProdDetailTrs = KOC.overview.$tbodyTrs.filter('.resources_production_detail').filter(':not(:first)'),
						$resProdBarbarianTrs = KOC.overview.$tbodyTrs.filter('.resources_production_barbarian').filter(':not(:first)'),
						$resConsoTrs = KOC.overview.$tbodyTrs.filter('.resources_consumption').filter(':not(:first)'),
						$resProdTotalTrs = KOC.overview.$tbodyTrs.filter('.resources_production_total').filter(':not(:first)'),
						$resAutonomyTrs = KOC.overview.$tbodyTrs.filter('.resources_autonomy').filter(':not(:first)'),
						$troopsTrs = KOC.overview.$tbodyTrs.filter('.troops').filter(':not(:first)'),
						$troopsBarbarianTrs = KOC.overview.$tbodyTrs.filter('.troops_barbarian').filter(':not(:first)'),
						$defensesTrs = KOC.overview.$tbodyTrs.filter('.defenses').filter(':not(:first)');

					var i, j, k, length = KOC.citiesId.length, subLength;
					for( i = 0; i < length; i += 1 ){
						var cityId = 'city' + KOC.citiesId[i];
						var stats = window.seed.citystats[ cityId ];
						var seed = {
								'pop': stats.pop,
								'gold': stats.gold,
								'res': window.seed.resources[ cityId ],
								'units': window.seed.units[ cityId ],
								'guardian': window.seed.guardian[cityId],
								'knights': window.seed.knights[cityId],
								'wilds': window.seed.wilderness[cityId],
								'fortifications': window.seed.fortifications[cityId]
							};

						//barbarian camps
							var barbariansRes = [],
								barbariansTroops = [],
								marches = window.seed.queue_atkp[ cityId ];
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

											subLength = KOC.troops.length;
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
							subLength = KOC.population.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOC.population[j];
								if( type.rows ){
									var rowsLength = type.rows;
									for( k = 0; k < rowsLength; k += 1 ){
										var inSeed = KOC.inSeed.population[ type.name[k] ],
											$tds = $popTrs.eq(line).find('td'),
											$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
											n = null;
										if( inSeed ){
											n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
										} else if( type.name[k] == 'availablePopulation' ){
											var take = KOC.inSeed.population[ type.name[0] ],
												substract = KOC.inSeed.population[ type.name[2] ];

											n = parseFloat( seed[ take.var ][ take.index ] ) - parseFloat( seed[ substract.var ][ substract.index ] );
										}

										if( n != null ){
											$td.html( KOC.shared.format( n ) )
												.attr('title', KOC.shared.readable( n ))
												.data('ori', n);
										} else {
											$td.html('&nbsp;')
												.attr('title', KOC.shared.readable( n ))
												.data('ori', 0);
										}

										line += 1;
									}

								} else {
									var inSeed = KOC.inSeed.population[ type.name ],
										$tds = $popTrs.eq(line).find('td'),
										$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
									if( inSeed ){
										var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );

										$td.html( KOC.shared.format( n ) )
											.attr('title', KOC.shared.readable( n ))
											.data('ori', n);

									} else {
										$td.html('&nbsp;')
											.attr('title', KOC.shared.readable( n ))
											.data('ori', 0);
									}

									line += 1;
								}
							}

						//resources
							subLength = KOC.resources.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOC.resources[j],
									inSeed = KOC.inSeed.resources[ type.name ],
									$tds = $resTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
								if( inSeed ){
									if( inSeed.hasOwnProperty('type') ){
										var n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
									} else {
										var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
									}

									if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

									$td.html( KOC.shared.format( n ) )
										.attr('title', KOC.shared.readable(n))
										.data('ori', n);
								} else {
									$td.html('&nbsp;')
										.attr('title', '')
										.data('ori', 0);
								}
							}

						//resources cap
							subLength = KOC.resources_cap.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOC.resources_cap[j],
									inSeed = KOC.inSeed.resources_cap[ type.name ],
									$tds = $resCapTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
								if( inSeed ){
									var n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
									if( n > 0 ) n = n / 3600;

									$td.html( KOC.shared.format( n ) )
										.attr('title', KOC.shared.readable(n))
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
								nbLine = KOC.resources_production_detail.length / 4,
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
									var k = seed.knights[ "knt" + window.seed.leaders[cityId].resourcefulnessKnightId ];
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

							subLength = KOC.resources_production_detail.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOC.resources_production_detail[j],
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
											$td.html( KOC.shared.format( n ) )
												.attr('title', KOC.shared.readable( n ))
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
							subLength = KOC.resources_production_barbarian.length;
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

									$td.html( KOC.shared.format( n ) )
										.attr('title', KOC.shared.readable( n ))
										.data('ori', n );
								} else {
									$td.html( '&nbsp;' )
										.attr('title', '')
										.data('ori', '0');
								}
							}

						//resources consumption
							var line = 0;
							subLength = KOC.resources_consumption.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOC.resources_consumption[j];
								if( type.rows ){
									var rowsLength = type.rows;
									for( k = 0; k < rowsLength; k += 1 ){
										var $tds = $resConsoTrs.eq(line).find('td'),
											$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
											n = null;
										//'dépense', 'formation'
										switch( type.label[k] ){
											case 'dépense':
												var inSeed = KOC.inSeed.resources_consumption[ type.name ];
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
											$td.html( KOC.shared.format( n ) )
												.attr('title', KOC.shared.readable( n ))
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
							subLength = KOC.resources_production_total.length;
							for( j = 0; j < subLength; j += 1 ){
								var $tds = $resProdTotalTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );

								if( total[j] ){
									total[j] += 100;
									$td.html( KOC.shared.format( total[j] ) )
										.attr('title', KOC.shared.readable( total[j] ))
										.data('ori', total[j] );
								} else {
									$td.html('&nbsp;');
								}
							}

						//resources autonomy
							subLength = KOC.resources_autonomy.length;
							for( j = 0; j < subLength; j += 1 ){
								var stock = KOC.resources[j],
									stockInSeed = KOC.inSeed.resources[ stock.name ],
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
										$td.html( KOC.shared.readableDuration( n ) );
									}
								} else {
									$td.html('-');
								}
							}

						//troops
							subLength = KOC.troops.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOC.troops[j],
									$tds = $troopsTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
									n = null;

								if( seed.units[ type.name ] ){
									n = parseFloat( seed.units[ type.name ] );
								}

								if( n != null ){
									$td.html( KOC.shared.format( n ) )
										.attr('title', KOC.shared.readable(n))
										.data('ori', n);
								} else {
									$td.html('&nbsp;')
										.attr('title', '')
										.data('ori', 0);
								}
							}

						//troops barbarian
							subLength = KOC.troops_barbarian.length;
							for( j = 0; j < subLength; j += 1 ){
								var type = KOC.troops_barbarian[j],
									$tds = $troopsBarbarianTrs.eq(j).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
									n = null;

								if( barbariansTroops.length && barbariansTroops[j] ){
									n = parseFloat( barbariansTroops[j] );
								}

								if( n != null ){
									$td.html( KOC.shared.format( n ) )
										.attr('title', KOC.shared.readable(n))
										.data('ori', n);
								} else {
									$td.html('&nbsp;')
										.attr('title', '')
										.data('ori', 0);
								}
							}

						//defenses
							subLength = KOC.defenses.length;
							for( j = 0; j < subLength; j += 1 ){
								var fort = KOC.defenses[j];
								var $tds = $defensesTrs.eq( j ).find('td'),
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
									n = null;

								if( seed.fortifications.hasOwnProperty( fort.name ) ){
									n = parseFloat( seed.fortifications[ fort.name ] );
								}

								if( n != null ){
									$td.html( KOC.shared.format( n ) )
										.attr('title', KOC.shared.readable(n))
										.data('ori', n);
								} else {
									$td.html('&nbsp;')
										.attr('title', '')
										.data('ori', 0);
								}
							}
					}

					KOC.overview.sums();
					KOC.overview.updating = false;
				},
				'sums': function(){
					KOC.overview.$tbodyTrs.each2(function(i, $tr){
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
									$sumTd.html( KOC.shared.format( sum ) )
										.attr('title', KOC.shared.readable(sum));
								}
							}
						}
					});
				},
				'getCityColWidth': function( tableWidth ){
					console.info('koc overview getCityColWidth function');
					var cityColWidth = tableWidth - 25;
					cityColWidth -= KOC.overview.$cityTds.eq(0).width();
					cityColWidth -= KOC.overview.$cityTds.eq(1).width();
					cityColWidth -= KOC.overview.$cityTds.eq(2).width();
					cityColWidth /= KOC.cities.length;

					return Math.floor(cityColWidth);
				},
				'calcInnerSizes': function( size ){
					console.info('koc overview calcInnerSizes function');
					KOC.overview.$cityTds.filter(':gt(2)').css('width', '');

					var tableH = size.height - 30 - (KOC.overview.movable ? KOC.overview.$div.find('h3').outerHeight(true) : 0);
					KOC.overview.$wrap.css('height', tableH);
					KOC.overview.$tbody.css('height', tableH - KOC.overview.$header.height());

					KOC.overview.$cityTds.filter(':gt(2)').css('width', KOC.overview.getCityColWidth( size.width ) + 'px');

					KOC.overview.$headersThs.filter(':gt(2)').each2(function(i, $th){
						$th.css('width', KOC.overview.$cityTds.eq(i + 3).css('width'));
					});
				},
				/* moveable */
					'moveableOn': function(){
						console.info('KOC overview moveableOn function');

						KOC.overview.$div
							.prepend('<h3>Vue Globale</h3>')
							.prepend('<span class="ui-icon ui-icon-close"></span>')
							.draggable({
								helper: "original",
								handle: 'h3',
								distance: 20,
								stop: function(event, ui){
									KOC.conf.overview.position = ui.position;
									KOC.shared.storeConf();
								}
							})
							.resizable({
								'minWidth': 250,
								'minHeight': 250,
								'resize': function(event, ui){
									KOC.overview.calcInnerSizes( ui.size );
								},
								'stop': function(event, ui){
									KOC.conf.overview.size = ui.size;
									KOC.shared.storeConf();
								}
							})
							.css({
								'top': KOC.conf.overview.position.top,
								'left': KOC.conf.overview.position.left,
								'width': KOC.conf.overview.size.width,
								'height': KOC.conf.overview.size.height,
							})
							.on('click', '.ui-icon-close', function(e){
								e.preventDefault();
								KOC.overview.$div.hide();
								KOC.conf.overview.visible = 0;
								KOC.shared.storeConf();
							});

						if( KOC.conf.overview.visible ){
							KOC.overview.$div.show();

							KOC.overview.calcInnerSizes( KOC.conf.overview.size );
						} else {
							KOC.overview.$div.hide();
						}

						var $kocOverviewToggle = $('<button id="koc-overview-toggle">').text('Vue Globale');
						$kocOverviewToggle.click(function(){
							console.info('$kocOverviewToggle click');
							KOC.overview.$div.toggle();

							if( KOC.overview.$div.is(':visible') ){
								KOC.overview.calcInnerSizes( KOC.conf.overview.size );
							}

							KOC.conf.overview.visible = (KOC.overview.$div.is(':visible') ? 1 : 0);
							KOC.shared.storeConf();
						});

						KOC.$buttons.append($kocOverviewToggle);
					},
					'moveableOff': function(){
						console.info('KOC overview moveableOff function');
						KOC.overview.$div
							.draggable('destroy')
							.resizable('destroy')
							.find('h3, .ui-icon-close').remove();
					},
					'resetPlacement': function(){
						console.info('KOC overview resetPlacement function');
						if( KOC.conf.overview.moveable ){
							KOC.overview.$div.css( KOC.overview.options.position );
							KOC.conf.overview.position = KOC.overview.options.position;
							KOC.shared.storeConf();
						}
					},
					'resetDimensions': function(){
						console.info('KOC overview resetDimensions function');
						if( KOC.conf.overview.moveable ){
							KOC.overview.$div.css( KOC.overview.options.size );
							KOC.conf.overview.size = KOC.overview.options.size;
							KOC.shared.storeConf();
						}
					},
				/* replace */
					'replaceOn': function(){
						console.info('KOC overview replaceOn function');

						var $b = $('#kocmain_bottom'),
							$f = $b.siblings('.panel_friendlist');
						var p = $b.offset();
						var h = $b.outerHeight() + $f.outerHeight(),
							w = $b.outerWidth();

						KOC.overview.$div.css({
							'height': $b.outerHeight() + $f.outerHeight(),
							'width': $b.outerWidth(),
							'top': p.top,
							'left': p.left,
						});

						//$b.hide();
						$f.hide();
						KOC.overview.$div.show();
						$b.find('.mod_comm').css('display', 'block');

						KOC.overview.calcInnerSizes({'height': h, 'width': w});

						$('#koc-overview-toggle').remove();
					},
					'replaceOff': function(){
						console.info('KOC overview replaceOff function');

						$('#kocmain_bottom').show().siblings('.panel_fiendlist').show();
					},
			};

		/* CREST HUNT */
			KOC.crestHunt = {
				'options': {
					'active': 1,
					'automatic': 0,
				},
				'stored': ['attacks'],
				'attacks': {}, //by city id and attack id
				'confPanel': function( $section ){
					console.info('KOC crestHunt confPanel function');
					var code = '<h3>Armoiries</h3>';
					code += '<div>';
					code += KOC.shared.generateCheckbox('crestHunt', 'active', 'Activer le module', KOC.conf.crestHunt.active);
					code += KOC.shared.generateCheckbox('crestHunt', 'automatic', 'Lancer les attaques automatiques', KOC.conf.crestHunt.automatic);
					code += KOC.shared.generateButton('crestHunt', 'deleteAllPlans', 'Supprimer toutes les attaques enregistrées');
					code += '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOC crestHunt modPanel function');
					var $section = KOC.$confPanel.find('#koc-crestHunt').html('');

					var header = '<div class="infos cf">';
					header += '<span class="ui-icon ui-icon-info"></span>';
					header += '<span><input type="checkbox" id="crestHunt-panel-automatic" '+ (KOC.conf.crestHunt.automatic ? 'checked' : '') +' autocomplete="off" />';
					header += '<label for="crestHunt-panel-automatic">attaques automatiques</label></span>';
					header += '</div>'

					var form = '<h3>Configurer une attaque</h3>';
					form += '<div class="attack-form">';
					form += '<ul class="message"></ul>';
					form += '<input type="hidden" class="edit-attackId" name="attackId" value="" autocomplete="off" />';
					form += '<input type="hidden" class="edit-cityId" name="cityId" value="" autocomplete="off" />';
					form += '<fieldset>';
					form += '<legend>Ville</legend>';

					var i, length = KOC.cities.length;
					for( i = 0; i < length; i += 1 ){
						var city = KOC.cities[i];
						form += '<input id="koc-crestHunt-city'+ city.id +'" name="city" value="'+ city.id +'" type="radio" class="city-choice" autocomplete="off" />';
						form += '<label for="koc-crestHunt-city'+ city.id +'">'+ city.roman + ' ' + city.name +'</label>';
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
					KOC.crestHunt.$waveSkeleton = $(skel);

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
						var city = KOC.cities[i];
						var line = '<tbody data-city="'+ city.id +'"></tbody>';

						onGoing += line;
						savedPlans += line;
					}
					onGoing += '</table></div>';
					savedPlans += '</table></div>';

					var help = '<div id="koc-crestHunt-help" class="help" title="Aide armoiries"><h4>Règles, limitations et informations :</h4><ul>';
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
						.on('change', '#crestHunt-panel-automatic', function(){
							$('#crestHunt-automatic').prop('checked', $(this).prop('checked')).change();
						})
						//load knights and units on city change )
						.on('change', '.city-choice', function(){
							var $waves = KOC.crestHunt.$form.find('.wave');
							if( $waves.length ) $waves.remove();

							KOC.crestHunt.$form.find('.keep, .add-wave, .save, .launch, .saveAndLaunch, .builds').show();

							KOC.crestHunt.addWaves(2, $(this).val());
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
							var $clone = KOC.crestHunt.$form.find('.wave').eq(0).clone();
							$clone.find('input, select').val('');
							$clone.insertBefore( KOC.crestHunt.$form.find('.add-wave') );
						})
						//reset form
						.on('click', '.reset', KOC.crestHunt.resetForm)
						//launch
						.on('click', '.launch', function(){
							console.info('attack launch click');
							if( KOC.conf.crestHunt.active ){
								var result = KOC.crestHunt.planAttack();
								if( result.errors.length ){
									KOC.crestHunt.$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
								} else {
									KOC.crestHunt.$form.find('.message').empty();
									var d = new Date();
									result.attack.id = Math.floor(d.getTime() / 1000);
									KOC.crestHunt.launchAttack( result.attack );

									//open ongoing accordion
									KOC.crestHunt.$accordion.accordion('activate', 2);
								}
							} else {
								alert('Le module n\'est pas actif. Les lancements d\'attaques sont bloqués.');
							}
						})
						//save
						.on('click', '.save, .saveAndLaunch', function(){
							console.info('attack save click');
							var result = KOC.crestHunt.planAttack();
							if( result.errors.length ){
								KOC.crestHunt.$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
							} else {
								KOC.crestHunt.$form.find('.message').empty();

								if( !KOC.crestHunt.attacks[ result.attack.cityId ] ){
									KOC.crestHunt.attacks[ result.attack.cityId ] = {};
								}

								var editAttackId = KOC.crestHunt.$form.find('.edit-attackId').val(),
									editCityId = KOC.crestHunt.$form.find('.edit-cityId').val();
								if( editAttackId != '' && editCityId != '' ){
									KOC.crestHunt.deletePlan( editAttackId, editCityId, false );
									KOC.crestHunt.$saved.find('li')
										.filter('[data-city='+ editCityId +'][data-attack='+ editAttackId +']')
										.remove();
								}

								var d = new Date();
								result.attack.id = Math.floor(d.getTime() / 1000);

								KOC.crestHunt.attacks[ result.attack.cityId ][ result.attack.id ] = result.attack;

								KOC.crestHunt.$saved.find('ul').filter('[data-city='+ result.attack.cityId +']')
									.append( KOC.crestHunt.attackInfo( result.attack, null ) );

								KOC.crestHunt.storeAttacks();

								if( KOC.conf.crestHunt.active && $(this).hasClass('saveAndLaunch') ){
									result.attack.id = Math.floor(d.getTime() / 1000);
									KOC.crestHunt.launchAttack( result.attack );

									//open ongoing accordion
									KOC.crestHunt.$accordion.accordion('activate', 2);
								} else {
									//open saved accordion
									KOC.crestHunt.$accordion.accordion('activate', 1);
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
									cityId = $tr.data('city');

								KOC.crestHunt.deletePlan( attackId, cityId, true );
								$tr.remove();
							}
						})
						//attack plan edit and duplication
						.on('click', '.edit, .duplicate', function(){
							KOC.crestHunt.resetForm();
							var $this = $(this),
								$tr = $this.parent(),
								attackId = $tr.data('attack'),
								cityId = $tr.data('city'),
								attack = KOC.crestHunt.attacks[ cityId ][ attackId ];

							if( attack ){
								KOC.crestHunt.$form.find('.keep, .add-wave, .save, .launch, .saveAndLaunch, .builds').show();

								if( $this.hasClass('edit') ){
									KOC.crestHunt.$form.find('.edit-attackId').val( attack.id );
									KOC.crestHunt.$form.find('.edit-cityId').val( attack.cityId );
								}

								KOC.crestHunt.$form.find('.city-choice').filter('[value='+ cityId +']').prop('checked', true);
								KOC.crestHunt.$form.find('.targetLevel').val(attack.targetLevel);
								KOC.crestHunt.$form.find('textarea').val(attack.coords.join("\n"));

								KOC.crestHunt.addWaves( attack.waves.length, attack.cityId );

								var $waves = KOC.crestHunt.$form.find('.wave');
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
										$b.find('.unit-qty').val( KOC.shared.format( unit.qty ) );
									}
								}

								var $keep = KOC.crestHunt.$form.find('.keep');
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
									$b.find('.unit-qty').val( KOC.shared.format( unit.qty ) );
								}

								//open form accordion
								KOC.crestHunt.$accordion.accordion('activate', 0);
							} else {
								alert('Plan d\'attaque introuvable.')
							}
						})
						//knight choice change
						.on('change', '.knight-choice', function(){
							var id = $(this).val();
							if( id != '' ){
								KOC.crestHunt.$form.find('.knight-choice').not( this ).each2(function(i, $kc){
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
							if( KOC.conf.crestHunt.active ){
								if( !KOC.conf.crestHunt.automatic ){
									var $tr = $(this).hide().parent().parent();
									var attack = KOC.crestHunt.attacks[ $tr.data('city') ][ $tr.data('attack') ];
									if( attack ){
										attack.lastCoordIndex = 0;
										attack.abort = 0;
										attack.aborts = [];
										attack.marching = [];
										KOC.crestHunt.refreshOngoingInfo( attack, false );
										KOC.crestHunt.launchAttack( attack );

										//open ongoing accordion
										KOC.crestHunt.$accordion.accordion('activate', 2);
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
							KOC.crestHunt.$form.find('.wave').remove();
							KOC.crestHunt.addWaves(2, 'city' + KOC.crestHunt.$form.find('.city-choice').filter(':checked').val());

							var $waves = KOC.crestHunt.$form.find('.wave');
							var $addUnit = $waves.find('.add-unit');
							var $level = KOC.crestHunt.$form.find('.targetLevel');
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

					KOC.crestHunt.$accordion = $section.find('.accordion');
					KOC.crestHunt.$form = $section.find('.attack-form');
					KOC.crestHunt.$saved = $section.find('.attack-list.saved');
					KOC.crestHunt.$ongoing = $section.find('.attack-list.ongoing');

					KOC.crestHunt.$accordion.accordion({collapsible: true, autoHeight: false}).accordion('activate', false);
				},
				'on': function(){
					console.info('KOC crestHunt on function');
					if( $.isEmptyObject( KOC.crestHunt.attacks ) ){
						try{
							var persistentCrestHuntAttacks = localStorage.getObject('koc_crestHunt_attacks_' + KOC.storeUniqueId);
							if( persistentCrestHuntAttacks ){
								KOC.crestHunt.attacks = persistentCrestHuntAttacks;
							}
						} catch(e){
							console.error(e);
						}
					}

					var i, length = KOC.citiesId.length;
					for( i = 0; i < length; i += 1 ){
						KOC.crestHunt.listCityAttacks( KOC.citiesId[i] );
					}

					KOC.crestHunt.$saved.find('.charge').toggle( KOC.conf.crestHunt.automatic );

					if( KOC.conf.crestHunt.automatic ){
						KOC.crestHunt.automaticOn();
					}
				},
				'off': function(){
					console.info('KOC crestHunt off function');

					KOC.crestHunt.automaticOff();
				},
				'automaticOn': function(){
					console.info('KOC crestHunt automaticOn function');
					$('#crestHunt-panel-automatic').prop('checked', true);

					KOC.crestHunt.$saved.find('.charge').hide(); //hide manual launch button

					//using closure to have a "copy" of the attack plan
					var i = 1;
					var schredule = function(attack, i){
						var delay = window.setTimeout(function(){
							console.info('launching automatic attack', attack.id, attack.cityId, attack);
							attack.abort = 0;
							attack.aborts = [];
							KOC.crestHunt.launchAttack( attack );
						}, i * 20000);
					};

					//launching stored attacks
					for( var c in KOC.crestHunt.attacks ){
						if( KOC.crestHunt.attacks.hasOwnProperty(c) ){
							//console.log(KOC.crestHunt.attacks[c]);
							for( var a in KOC.crestHunt.attacks[c] ){
								if( KOC.crestHunt.attacks[c].hasOwnProperty(a) ){
									schredule(KOC.crestHunt.attacks[c][a], i);
									i += 1;
								}
							}
						}
					}
				},
				'automaticOff': function(){
					console.info('KOC crestHunt automaticOff function');
					$('#crestHunt-panel-automatic').prop('checked', false);

					//show all manual launch buttons
					KOC.crestHunt.$saved.find('.charge').show();

					//hide the on going attacks one
					KOC.crestHunt.$ongoing.find('tr').each2(function(i, $tr){
						KOC.crestHunt.$saved.find('tr').filter('[data-city='+ $tr.data('city') +'][data-attack='+ $tr.data('attack') +']').find('.charge').hide();
					});
				},
				'storeAttacks': function(){
					console.info('KOC crestHunt storeAttacks function');
					try{
						localStorage.setObject('koc_crestHunt_attacks_' + KOC.storeUniqueId, KOC.crestHunt.attacks);
					} catch(e){
						alert(e);
					}
				},
				'planAttack': function(){
					console.info('KOC crestHunt planAttack function');
					var $waves = KOC.crestHunt.$form.find('.wave'),
						$keep = KOC.crestHunt.$form.find('.keep'),
						$cityChoice = KOC.crestHunt.$form.find('.city-choice').filter(':checked'),
						level = $.trim( KOC.crestHunt.$form.find('.targetLevel').val() ),
						coords = $.trim( KOC.crestHunt.$form.find('textarea').val().replace(/\n/g, ' ') ),
						errors = [],
						regexp = /[^0-9, ]/,
						attack = { 'waves': [], 'lastCoordIndex': 0, 'keep': [] };

					//check form
						//city
						if( !$cityChoice.length ){
							errors.push('Ville de départ obligatoire.');
						} else {
							attack.cityId = $cityChoice.val();
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
										q = KOC.shared.decodeFormat( $.trim( $b.find('.unit-qty').val() ) );

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
								q = KOC.shared.decodeFormat( $.trim( $b.find('.unit-qty').val() ) );

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
					console.info('KOC crestHunt launchAttack function', attack);
					attack.lastCoordIndex = 0;
					attack.abort = 0;
					attack.aborts = [];
					attack.marching = [];
					KOC.crestHunt.refreshOngoingInfo( attack, false );
					KOC.checkAndLaunchAttack( attack );
				},
				'resetForm': function(){
					console.info('KOC crestHunt resetForm function');
					KOC.crestHunt.$form.find('.keep, .add-wave, .save, .launch, .saveAndLaunch, .builds').hide();
					KOC.crestHunt.$form.find('.wave').remove();
					var $keep = KOC.crestHunt.$form.find('.keep');
					$keep.find('.unit-block').filter(':gt(0)').remove();
					$keep.find('.unit-choice').find('option').filter(':gt(0)').remove();
					var $inputs = KOC.crestHunt.$form.find('input');
					$inputs.filter('[type="text"], [type="hidden"]').val('');
					$inputs.filter('[type="radio"], [type="checkbox"]').prop('checked', false);
					KOC.crestHunt.$form.find('select, textarea').val('');
					KOC.crestHunt.$form.find('.message').empty();
				},
				'deletePlan': function( attackId, cityId, save ){
					console.info('KOC crestHunt deletePlan function', attackId, cityId, save);
					delete KOC.crestHunt.attacks[ cityId ][ attackId ];

					if( save ) KOC.crestHunt.storeAttacks();
				},
				'deleteAllPlans': function(){
					console.info('KOC crestHunt deleteAllPlans function');
					KOC.crestHunt.attacks = {};
					KOC.crestHunt.storeAttacks();

					$('#koc-crestHunt').find('.attack-list').find('ul').empty();
				},
				'attackInfo': function( attack, city ){
					console.info('KOC crestHunt attackInfo function', attack, city);
					if( city == null ){
						city = KOC.shared.getCityById( attack.cityId );
					} else if( !city.id ){
						city = KOC.shared.getCityById( city );
					}

					var code = '<tr data-city="'+ attack.cityId +'" data-attack="'+ attack.id +'">';
					code += '<td class="actions">';
					code += '<span class="ui-icon ui-icon-flag charge" title="Lancer"></span>';
					code += '<span class="ui-icon ui-icon-pencil edit" title="Modifier"></span>';
					code += '<span class="ui-icon ui-icon-copy duplicate" title="Dupliquer"></span>';
					code += '<span class="ui-icon ui-icon-trash delete" title="Supprimer"></span>';
					code += '</td>';
					code += '<td class="form">' + city.roman + ' ' + city.name + '</td>';
					code += '<td class="to">TS ' + attack.targetLevel + '</td>';
					code += '<td class="coords">' + KOC.shared.mapLink( attack.coords ) +'</td>';
					code += '<td class="waves">';

					var knights = window.seed.knights[ 'city' + city.id ],
						j, k, wavesLength = attack.waves.length, unitsLength;
					for( j = 0; j < wavesLength; j += 1 ){
						var wave = attack.waves[j];
						code += '<div class="wave">Vague '+ (j + 1) + '&nbsp;:&nbsp;';
						code += '<div class="knight">chevalier&nbsp;:&nbsp;';
						code += ( wave.knight ? knights[ wave.knight ].knightName + '(niveau '+ knights[ attack.knight ].skillPointsApplied +', '+ KOC.shared.getKnightStatText( knight ) +')' : 'n\'importe lequel' );
						code += '</div>';
						code += '<div class="troops">unités&nbsp;:&nbsp;';

						var unitsCode = '';
						unitsLength = wave.units.length;
						for( k = 0; k < unitsLength; k += 1 ){
							var unit = wave.units[k];
							if( unitsCode.length ) unitsCode += ', ';

							unitsCode += KOC.shared.format( unit.qty );
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

						unitsCode += KOC.shared.format( unit.qty );
						unitsCode += '<img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_';
						unitsCode += unit.id.replace(/unt/, '') + '_50_s34.jpg" title="'+ window.unitcost[ unit.id ][0] +'">';
					}
					code += unitsCode + '</div></td></tr>';

					return code;
				},
				'refreshOngoingInfo': function(attack, noButton){
					console.info('KOC crestHunt refreshOngoingInfo function');

					var $tr = KOC.crestHunt.$ongoing.find('tr').filter('[data-city='+ attack.cityId +'][data-attack='+ attack.id +']');
					if( $tr.length == 0 ){
						var city = city = KOC.shared.getCityById( attack.cityId );
						var code = '<tr data-city="'+ attack.cityId +'" data-attack="'+ attack.id +'">';
						code += '<td class="action"><span class="ui-icon ui-icon-cancel" title="Arrêter au retour des troupes"></span></td>';
						code += '<td class="form">' + city.roman + ' ' + city.name + '</td>';
						code += '<td class="to">TS ' + attack.targetLevel + '</td>';
						code += '<td class="coords">' + KOC.shared.mapLink( attack.coords ) +'</td>';
						code += '<td class="current"></td>';
						code += '<td class="info"></td></tr>';

						$tr = $( code );

						KOC.crestHunt.$ongoing.find('tbody').filter('[data-city='+ attack.cityId +']').append( $tr );
					}

					//attack stopped
					if( noButton ){
						$tr.find('.stop').removeClass('stop').addClass('trash').attr('title', 'Enlever les informations sur cette attaque.');

						//show the manual launch button
						KOC.crestHunt.$saved.find('tr').filter('[data-city='+ attack.cityId +'][data-attack='+ attack.id +']').find('.charge').show();
					} else {
						$tr.find('.current').html( KOC.shared.mapLink( attack.coords[ attack.lastCoordIndex ] ) + '(' + (attack.lastCoordIndex + 1) + 'e / ' + attack.coords.length + ')' );
					}

					if( attack.aborts.length ){
						attack.aborts = attack.aborts.unique();
						$tr.find('.info').html( attack.aborts.join('<br />') );
					} else {
						$tr.find('.info').html('');
					}
				},
				'listCityAttacks': function( cityId ){
					console.info('KOC crestHunt listCityAttacks function', cityId);
					var $tbody = KOC.crestHunt.$saved.find('tbody').filter('[data-city='+ cityId +']');
					$tbody.empty();

					var attacks = KOC.crestHunt.attacks[ cityId ],
						code = '';
					if( attacks ){
						for( var a in attacks ){
							if( attacks.hasOwnProperty(a) ){
								code += KOC.crestHunt.attackInfo( attacks[a], cityId );
							}
						}
					}

					$tbody.append( code );
				},
				//fill the keep <select> options too
				'addWaves': function( num, cityId ){
					console.info('KOC crestHunt addWaves function', num, cityId);
					if( cityId.indexOf('city') != 0 ) cityId = 'city' + cityId;
					var $clone = KOC.crestHunt.$waveSkeleton.clone(), i;
					$clone.insertBefore( KOC.crestHunt.$form.find('.keep') );
					for( i = 1; i < num; i += 1 ){
						$clone.clone().insertBefore( KOC.crestHunt.$form.find('.keep') );
					}

					var knights = KOC.shared.getAvailableKnights( cityId ),
						choices = '', i, length = knights.length;
					for( i = 0; i < length; i += 1 ){
						var knight = knights[i];
						choices += '<option value="'+ knight.knightId +'">'+ knight.knightName + '(niveau '+ knight.skillPointsApplied + ', ' + KOC.shared.getKnightStatText( knight ) +')</option>';
					}

					KOC.crestHunt.$form.find('.knight-choice').each2(function(i, $kc){
						$kc.append( choices );
					});

					var units = window.seed.units[ cityId ],
						choices = '';
					for( var u in units ){
						if( units.hasOwnProperty(u) ){
							var name = window.unitcost[u][0];
							if( name == 'Unité de Ravitaillement' ) name = 'Ravitailleur';
							choices += '<option value="'+ u +'">'+ name + ' ('+ KOC.shared.format(units[u]) +')</option>';
						}
					}

					KOC.crestHunt.$form.find('.unit-choice').each2(function(i, $uc){
						$uc.append( choices );
					});
				},
			};

		/* NOTEPAD */
			KOC.notepad = {
				'options': {
					'active': 0,
					'visible': 0,
					'moveable': 1,
					'position': {'top': 10, 'left': 10},
					'size': {'width': 300, 'height': 280},
				},
				'stored': ['notes'],
				'notes': {},
				'confPanel': function( $section ){
					console.info('KOC notepad confPanel function');
					var code = '<h3>Bloc-note</h3>';
					code += '<div>';
					code += KOC.shared.generateButton('notepad', 'resetPositionAndDimension', 'Remise à zéro de la position et des dimensions');
					code += KOC.shared.generateButton('notepad', 'clean', 'Supprimer les notes');
					code += '</div>';

					$section.append( code );
				},
				'on': function(){
					console.info('KOC notepad on function');
					$head.append( $('<style id="koc-notepad-css">').text(kocNotepadCss) );

					if( $.isEmptyObject( KOC.notepad.notes ) ){
						try{
							var notes = localStorage.getObject('koc_notepad_notes_' + KOC.storeUniqueId);
							if( notes ){
								KOC.notepad.notes = notes;
							}
						} catch(e){
							alert(e);
						}
					}

					var $notepad = $('<div id="koc-notepad" class="ui-widget ui-widget-content ui-corner-all">');

					var code = '<h3>Bloc Note</h3><div class="wrap">';
					code += '<label for="koc-notepad-note-name">Nom de la note&nbsp;:&nbsp;</label>';
					code += '<input type="text" id="koc-notepad-note-name" />';
					code += '<label for="koc-notepad-note-text"><span class="charsLeft">1000 caractères restant</span>Contenu&nbsp;:&nbsp;</label>';
					code += '<textarea id="koc-notepad-note-text"></textarea>';
					code += '<br /><button class="save">Enregistrer</button>';
					code += '<button class="cancel">Annuler</button>';

					code += '<h3>Notes :</h3><ul class="notes">';
					for( var n in KOC.notepad.notes ){
						if( KOC.notepad.notes.hasOwnProperty(n) ){
							var note = KOC.notepad.notes[n];
							code += '<li><button data-id="'+ n +'">'+ note.name +'</button><span class="ui-icon ui-icon-trash"></span></li>';
						}
					}
					code += '</ul>';

					$notepad
						.append( '<span class="ui-icon ui-icon-close"></span>' )
						.append( code )
						.draggable({
							helper: "original",
							distance: 20,
							stop: function(event, ui){
								KOC.conf.notepad.position = ui.position;
								KOC.shared.storeConf();
							}
						})
						.resizable({
							'minWidth': 200,
							'minHeight': 200,
							'stop': function(event, ui){
								KOC.conf.notepad.size = ui.size;
								KOC.shared.storeConf();
							}
						})
						.css({
							'top': KOC.conf.notepad.position.top,
							'left': KOC.conf.notepad.position.left,
							'width': KOC.conf.notepad.size.width,
							'height': KOC.conf.notepad.size.height,
						})
						.on('click', '.ui-icon-close', function(){
							KOC.$notepad.hide();
							KOC.conf.notepad.visible = 0;
							KOC.shared.storeConf();
						})
						.on('click', '.save', function(){
							var name = $.trim( KOC.notepad.$name.val() ),
								text = $.trim( KOC.notepad.$textarea.val() );

							if( name.length ){
								if( text.length > 1000 ){
									alert('Texte trop long.');
								} else {
									var d = new Date(),
										id = Math.floor( d.getTime() / 1000 );
									KOC.notepad.notes[ id ] = {'name': name, 'text': text};
									KOC.notepad.storeNotes();

									KOC.notepad.$notes.append( '<li><button data-id="'+ id +'">'+ name +'</button><span class="ui-icon ui-icon-trash"></span></li>' );
								}
							} else {
								alert('Nom de la note invalide.');
							}
						})
						.on('click', '.cancel', function(){
							KOC.notepad.$name.val('');
							KOC.notepad.$textarea.val('');
						})
						.on('click', '.notes button', function(){
							KOC.notepad.load( $(this).data('id') );
						})
						.on('click', '.notes .ui-icon-trash', function(){
							var $this = $(this);
							KOC.notepad.delete( $this.siblings().data('id') );
							$this.parent().remove();
						});

					$body.append( $notepad );

					KOC.$notepad =	$('#koc-notepad');
					KOC.notepad.$notes = KOC.$notepad.find('.notes');
					KOC.notepad.$wrap = KOC.$notepad.find('.wrap');
					KOC.notepad.$span = KOC.notepad.$wrap.find('pre span');
					KOC.notepad.$name = $('#koc-notepad-note-name');
					KOC.notepad.$textarea = $('#koc-notepad-note-text');
					KOC.notepad.$charsLeft = KOC.$notepad.find('.charsLeft');

					KOC.notepad.$textarea[0].addEventListener('input', function(){
							var text = KOC.notepad.$textarea.val(),
								l = 1000 - parseFloat(text.length);
							if( l < 2 ){
								KOC.notepad.$charsLeft.text(l + ' caractère restant');
							} else {
								KOC.notepad.$charsLeft.text(l + ' caractères restant')
							}
					}, false);

					if( KOC.conf.notepad.visible ){
						KOC.$notepad.show();
					}

					var $kocNotepadToggle = $('<button id="koc-notepad-toggle">').text('Bloc Note');
					$kocNotepadToggle.click(function(){
						console.info('$kocNotepadToggle click');
						KOC.$notepad.toggle();

						KOC.conf.notepad.visible = (KOC.$notepad.is(':visible') ? 1 : 0);
						KOC.shared.storeConf();
					});

					KOC.$buttons.append($kocNotepadToggle);
				},
				'off': function(){
					console.info('KOC notepad off function');
					$('#koc-notepad-toggle').remove();
					$('#koc-notepad-css').remove();
				},
				'resetPositionAndDimension': function(){
					console.info('KOC notepad resetPositionAndDimension function');

					KOC.$notepad.css({
						top: KOC.notepad.options.position.top,
						left: KOC.notepad.options.position.left,
						width: KOC.notepad.options.size.width,
						height: KOC.notepad.options.size.height,
					});

					KOC.conf.notepad.position.top = KOC.notepad.options.position.top;
					KOC.conf.notepad.position.left = KOC.notepad.options.position.left;
					KOC.conf.notepad.size.width = KOC.notepad.options.size.width;
					KOC.conf.notepad.size.height = KOC.notepad.options.size.height;

					KOC.shared.storeConf();
				},
				'clean': function(){
					console.info('KOC notepad clean function');

					localStorage.setObject('koc_notepad_notes_' + KOC.storeUniqueId, '');

					KOC.notepad.$notes.empty();
				},
				'load': function( id ){
					console.info('KOC notepad load function');

					if( KOC.notepad.notes[id] ){
						KOC.notepad.$name.val( KOC.notepad.notes[id].name );
						KOC.notepad.$textarea.val( KOC.notepad.notes[id].text );
					} else {
						alert('Note introuvable.');
					}
				},
				'delete': function( id ){
					console.info('koc notepad delete function');
					delete KOC.notepad.notes[id];
					KOC.notepad.storeNotes();
				},
				'storeNotes': function(){
					console.info('KOC notepad storeNotes function');
					localStorage.setObject('koc_notepad_notes_' + KOC.storeUniqueId, KOC.notepad.notes);
				},
			};

		/* MAP */
			KOC.map = {
				'options': {
					'active': 1,
				},
				'stored': ['search'],
				'search': {},/*{by city, tiles}*/
				'currentSearch': [],
				'loadTypeLabels': { 'C': 'cités', 'CB': 'Camps Barbares', 'TS': 'Terres Sauvages', 'FS': 'Forêts Sombres' },
				'confPanel': function( $section ){
					console.info('KOC map confPanel function');
					var code = '<h3>Carte</h3>';
					code += '<div>';
					code += KOC.shared.generateButton('map', 'cleanSearch', 'Supprimer toutes les recherches géographiques');

					for( var c in KOC.cities ){
						if( KOC.cities.hasOwnProperty(c) ){
							var city = KOC.cities[c];
							code += KOC.shared.generateButton('map', 'cleanSearchForCity', 'Supprimer les recherches géographiques de ' + city.roman + ' ' +city.name, city.id).replace(/<\/p>/, '');
						}
					}
					code += '</p></div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOC map modPanel function');
					var $section = KOC.$confPanel.find('#koc-map').html('');

					var code = '<fieldset class="search"><legend>Recherche</legend>';
					code += '<label for="koc-map-near-x">Autour de&nbsp;:&nbsp;</label>';
					code += '<input type="text" id="koc-map-near-x" class="coord" value="1" />';
					code += '<input type="text" id="koc-map-near-y" class="coord" value="20"  />';
					code += '<select id="koc-map-city-coord"><option value="">Villes</option>';

					var loadOptions = '';
					for( var c in KOC.cities ){
						if( KOC.cities.hasOwnProperty(c) ){
							var city = KOC.cities[c];
							code += '<option value="'+ city.coords.x + '|' + city.coords.y +'">'+ city.roman + ' ' + city.name +'</option>';

							if( KOC.map.search.hasOwnProperty( city.id ) ){
								for( var t in KOC.map.search[ city.id ] ){
									if( KOC.map.search[ city.id ].hasOwnProperty(t) ){
										loadOptions += '<option value="'+ city.id +'">'+ city.roman + ' ' + city.name +'</option>';
									}
								}
							}
						}
					}

					code += '</select>';
					code += '<br /><label for="koc-map-range-min">Distance entre&nbsp;:&nbsp;</label>';
					code += '<input type="text" id="koc-map-range-min" class="coord" />';
					code += '<label for="koc-map-range-max">&nbsp;et&nbsp;</label>';
					code += '<input type="text" id="koc-map-range-max" class="coord" />';
					code += '<button class="go">Rechercher</button>';
					code += '<button class="cancel">Annuler</button>';
					code += '<br /><label for="koc-map-load-saved">Ou charger une recherche sauvegardée&nbsp;:&nbsp;</label>';
					code += '<br /><select id="koc-map-load-saved"><option value="">Choisir</option>'+ loadOptions +'</select>';
					code += '</fieldset><fieldset class="save"><legend>Sauvegarde</legend>';
					code += '<label for="koc-map-city-save">Sauvegarder la recherche dans la cité&nbsp;:&nbsp;</label>';
					code += '<select id="koc-map-city-save"><option value="">Choisir</option>';

					for( var c in KOC.cities ){
						if( KOC.cities.hasOwnProperty(c) ){
							var city = KOC.cities[c];
							code += '<option value="'+ city.id +'">'+ city.roman + ' ' + city.name +'</option>';
						}
					}

					code += '</select><button>Sauvegarder</button></fieldset>';
					code += '<fieldset class="filter"><legend>Filter les résultats</legend>';
					code += '<div class="category"><label for="koc-map-category">Catégorie&nbsp;:&nbsp;</label>';
					code += '<select id="koc-map-category">';
					code += '<option value="">Choisir</option>';
					code += '<option value="C">Cités</option>';
					code += '<option value="CB">Camps Barbares</option>';
					code += '<option value="TS">Terres Sauvages</option>';
					code += '<option value="FS">Forêts Sombres</option>';
					code += '</select></div>';
					code += '<div class="level"><label for="koc-map-level-min">Niveau entre&nbsp;:&nbsp;</label>';
					code += '<input type="text" id="koc-map-level-min" class="coord" />';
					code += '<label for="koc-map-level-max">&nbsp;et&nbsp;:&nbsp;</label>';
					code += '<input type="text" id="koc-map-level-max" class="coord" />';
					code += '</div><div class="type"><label>Type&nbsp;:&nbsp;</label>';
					code += '<input type="checkbox" id="koc-map-type-grassland" value="10" />';
					code += '<label for="koc-map-type-grassland">Prairie</label>';
					code += '<input type="checkbox" id="koc-map-type-lake" value="11" />';
					code += '<label for="koc-map-type-lake">Lac</label>';
					code += '<input type="checkbox" id="koc-map-type-forest" value="20" />';
					code += '<label for="koc-map-type-forest">Forêt</label>';
					code += '<input type="checkbox" id="koc-map-type-hill" value="30" />';
					code += '<label for="koc-map-type-hill">Colline</label>';
					code += '<input type="checkbox" id="koc-map-type-mountain" value="40" />';
					code += '<label for="koc-map-type-mountain">Montagne</label>';
					code += '<input type="checkbox" id="koc-map-type-plain" value="50" />';
					code += '<label for="koc-map-type-plain">Prairie</label>';
					code += '</div><div class="status">';
					code += '<label for="koc-map-status">Libre</label>';
					code += '<input type="checkbox" id="koc-map-status" />';
					code += '</div><div class="mist">';
					code += '<label for="koc-map-mist">Sous brumes</label>';
					code += '<input type="checkbox" id="koc-map-mist" />';
					code += '</div></fieldset><div class="search-status"></div><div class="search-result"></div>';

					$section
						.append( code )
						.on('change', '#koc-map-city-coord', function(){
							var v = $(this).val();
							if( v != '' ){
								var cityCoord = v.split('|');
								$('#koc-map-near-x').val( cityCoord[0] );
								$('#koc-map-near-y').val( cityCoord[1] );
							}
						})
						.on('click', '.search .go', function(event){
							console.log('search click');
							event.stopPropagation();
							KOC.map.$save.hide();
							KOC.map.$filter.hide();
							KOC.map.$results.empty();
							$(this).attr('disabled', 'disabled').html('Chargement');

							var coordX = $.trim( $('#koc-map-near-x').val() ),
								coordY = $.trim( $('#koc-map-near-y').val() ),
								rangeMin = $.trim( $('#koc-map-range-min').val() ),
								rangeMax = $.trim( $('#koc-map-range-max').val() ),
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
								KOC.map.explore( coordX, coordY, rangeMin, rangeMax );
							}
						})
						.on('click', '.search .cancel', function(event){
							event.stopPropagation();
							if( KOC.map.xhr ) KOC.map.xhr.abort(); //kill the ajax request
							KOC.map.searching = false;
							KOC.map.$search.find('input, select').val('');
							KOC.map.$search.find('.go').removeAttr('disabled').html('Rechercher');
							//KOC.map.$save.hide();
							//KOC.map.$filter.hide();
							//KOC.map.$results.empty();
							KOC.map.$status.empty();
						})
						.on('click', '.save button', function(event){
							event.stopPropagation();
							var cityId = $('#koc-map-city-save').val();
							if( cityId && cityId != '' ){
								if( !KOC.map.search.hasOwnProperty( cityId ) ) KOC.map.search[cityId] = {};
								KOC.map.search[cityId] = KOC.map.currentSearch;
								KOC.map.storeSearch();

								var loadOptions = '<option value="">Choisir</option>';
								for( var c in KOC.map.search ){
									if( KOC.map.search.hasOwnProperty(c) ){
										var city = KOC.shared.getCityById(c);
										loadOptions += '<option value="'+ c +'">'+ city.roman + ' ' + city.name +'</option>';
									}
								}
								$('#koc-map-load-saved').html( loadOptions );
							} else {
								alert('Vous devez spécifier une ville pour sauvegarder cette recherche.');
							}
						})
						.on('change', '#koc-map-load-saved', function(){
							event.stopPropagation();
							var cityId = $(this).val();
							if( cityId != '' ){
								KOC.map.$save.hide();
								KOC.map.$filter.show();
								KOC.map.$category.val('').trigger('change');
								KOC.map.currentSearch = KOC.map.search[ cityId ];
							}
						})
						.on('change', '#koc-map-category', function(event){
							event.stopPropagation();
							var $inputs = KOC.map.$filter.find('input');

							$inputs.filter('[type=checkbox]').prop('checked', false);
							$inputs.filter('[type=text]').val('');

							var category = $(this).val();
							KOC.map.$filter.find('.level, .type, .status, .mist').hide();
							if( category != '' ){
								if( category != 'C' ) KOC.map.$filter.find('.level').show();

								if( category == 'TS' ){
									KOC.map.$filter.find('.type, .status').show();
								} else if( category == 'C' ){
									KOC.map.$filter.find('.mist').show();
								}

								KOC.map.displayResultsByCategory();
							} else {
								KOC.map.$results.empty();
							}
						})
						.on('change', '.filter input[type=checkbox]', function(event){
							event.stopPropagation();
							KOC.map.filterResults();
						})
						.on('keyup', '.filter input[type=text]', function(event){
							event.stopPropagation();
							KOC.map.filterResults();
						});

					KOC.map.$search = $('#koc-map').find('.search');
					KOC.map.$save = $('#koc-map').find('.save');
					KOC.map.$filter = $('#koc-map').find('.filter');
					KOC.map.$category = $('#koc-map-category');
					KOC.map.$results = $('#koc-map').find('.search-result');
					KOC.map.$status = $('#koc-map').find('.search-status');
				},
				'on': function(){
					console.info('KOC map on function');

					if( $.isEmptyObject( KOC.map.search ) ){
						try{
							var search = localStorage.getObject('koc_map_search_' + KOC.storeUniqueId);
							if( search ){
								KOC.map.search = search;
							}
						} catch(e){
							console.log(e);
						}
					}
				},
				'cleanSearch': function(){
					console.info('KOC map cleanSearch function');
					localStorage.removeItem('koc_map_search_' + KOC.storeUniqueId);

					$('#koc-map-load-saved').find('option').filter(':gt(0)').remove();
				},
				'cleanSearchForCity': function( cityId ){
					console.info('KOC map cleanSearchForCity function');
					KOC.map.search[cityId] = {};
					localStorage.setObject('koc_map_search_' + KOC.storeUniqueId, KOC.map.search);

					$('#koc-map-load-saved').find('option').filter('[value='+ cityId +']').remove();
				},
				'storeSearch': function(){
					console.info('KOC map storeSearch function');
					localStorage.setObject('koc_map_search_' + KOC.storeUniqueId, KOC.map.search);
				},
				'explore': function( coordX, coordY, rangeMin, rangeMax ){
					if( KOC.map.searching ) return;
					console.info('KOC map explore function');

					/* deferred functions */
						//display the partialExplore results, while merging them with previous results
						var parseResults = function( dfd, coordX, coordY, rangeMin, rangeMax, result ){
							console.info('KOC map explore deferred parseResults function');
							var leftRangeMax = coordX - rangeMax,
								leftRangeMin = coordX - rangeMin,
								rightRangeMax = coordX + rangeMax,
								rightRangeMin = coordX + rangeMin,
								topRangeMax = coordY - rangeMax,
								topRangeMin = coordY - rangeMin,
								bottomRangeMax = coordY + rangeMax,
								bottomRangeMin = coordY + rangeMin;

							var tiles = [];
							//merge results with previous deferred partialExplore results
							if( KOC.map.currentSearch.tiles ){
								tiles = KOC.map.currentSearch.tiles;
							}

							for( var id in result.data ){
								if( result.data.hasOwnProperty(id) ){
									var tile = result.data[id];
									var range = KOC.shared.getDistance(coordX, coordY, tile.xCoord, tile.yCoord);
									if( range >= rangeMin && range <= rangeMax ){
										//city
											if( tile.tileType == 51 ){
												if( tile.tileCityId != null ){
													var user = result.userInfo['u'+ tile.tileUserId];
													var name = (user.s == 'M' ? 'Lord' : 'Lady') + ' ' + user.n;
													tiles.push({ 'category': 'C', 'range': range, 'x': tile.xCoord, 'y': tile.yCoord, 'might': KOC.shared.format(user.m), 'player': name, 'city': tile.cityName, 'misted': 0 });
												} else {
										//barbarian
													tiles.push({ 'category': 'CB', 'range': range, 'x': tile.xCoord, 'y': tile.yCoord, 'level': tile.tileLevel });
												}
											} else if( tile.tileType == 53 ){
												tiles.push({ 'category': 'C', 'range': range, 'x': tile.xCoord, 'y': tile.yCoord, 'might': '?', 'player': '?', 'city': '?', 'misted': 1 });
										//dark forest
											} else if( tile.tileType == 54 ){
												tiles.push({ 'category': 'FS', 'range': range, 'x': tile.xCoord, 'y': tile.yCoord, 'level': tile.tileLevel });
										//wilderness (swamp tileType = 0)
											} else if( tile.tileType >= 10 && tile.tileType <= 50 ){
												var label = '';

												if( tile.tileType == 10 ) label = 'Prairie';
												else if( tile.tileType == 11 ) label = 'Lac';
												else if( tile.tileType == 20 ) label = 'Forêt';
												else if( tile.tileType == 30 ) label = 'Colline';
												else if( tile.tileType == 40 ) label = 'Montagne';
												else if( tile.tileType == 50 ) label = 'Plaine';

												var user = null;
												var might = '';
												var name = '';

												if( tile.tileUserId != null ){
													if( tile.tileUserId == "0" ){
														might = '?';
														name = '?';
													} else {
														user = (tile.tileUserId != null ? result.userInfo['u'+ tile.tileUserId] : null);
														name = (user != null ? (user.s == 'M' ? 'Lord' : 'Lady') + ' ' + user.n : '?');
														might = (user != null ? KOC.shared.format(user.m) : '?');
													}
												}

												tiles.push({ 'category': 'TS', 'range': range, 'type': tile.tileType, 'label': label, 'x': tile.xCoord, 'y': tile.yCoord, 'might': might, 'player': name, 'level': tile.tileLevel });
											}
									}
								}
							}

							tiles = uniqueObject( tiles );
							tiles.sort(function(a, b){ return a.range - b.range });

							KOC.map.currentSearch = {'x': coordX, 'y': coordY, 'rangeMin': rangeMin, 'rangeMax': rangeMax, 'tiles': tiles};

							if( KOC.map.$category.val() != '' ) KOC.map.displayResultsByCategory();

							if( !loop ) return dfd.resolve();
							else {
								start += 100;
								end += 100;
								return dfd.pipe( partialExplore(dfd) );
							}
						};

						//split the full coordinates search in small requests of 100 coordinates
						var partialExplore = function(dfd){
							console.info('KOC map explore deferred partialExplore function', start, end, length);
							loop = true;
							if( end > length ){
								end = length;
								loop = false;
							}

							KOC.map.$status.html('Recherche des coordonnées ' + start + ' à ' + end + ' sur ' + length + '.');

							if( start == end ) end += 1; //avoid the start = end case with the slice which need a difference
							params.blocks = blocks.slice(start, end).join(',');
							KOC.map.xhr = $.ajax({
								url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
								type: 'post',
								data: params,
								dataType: 'json'
							})
							.done(function(result){
								if( result.ok && result.data ){
									if( start == 0 ){
										var chosenCityIndex = $('#koc-map-city-coord')[0].selectedIndex;
										if( chosenCityIndex ){
											$('#koc-map-city-save').prop('selectedIndex', chosenCityIndex);
										}
										KOC.map.$filter.show();
										KOC.map.$category.val('').trigger('change');
									}

									return dfd.pipe( parseResults( dfd, coordX, coordY, rangeMin, rangeMax, result ) );
								} else {
									return dfd.reject();
								}
							})
							.fail(function(){
								return dfd.reject();
							});
						};

						var searchSequence = function(){
							console.info('KOC map explore deferred searchSequence function');
							return $.Deferred(function(dfd){
								return dfd.pipe( partialExplore(dfd) );
							}).promise();
						};

					KOC.map.searching = true;

					KOC.map.currentSearch = {};

					KOC.map.$status.empty();

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
								var range = KOC.shared.getDistance(coordX, coordY, i, j);
								if( range >= rangeMin && range <= rangeMax ){
									blocks.push("bl_" + ( i >= 750 ? i - 750 : i ) + "_bt_" + ( j >= 750 ? j - 750 : j ));
								}
							}
						}
					}
					var loop, start = 0, end = 99, length = blocks.length;
					$.when( searchSequence() )
						.done(function(){
							KOC.map.$status.html('Recherche finie.');
						})
						.fail(function(){
							KOC.map.$status.html('Recherche échouée avant la fin.');
						})
						.always(function(){
							KOC.map.$save.show();
							KOC.map.$search.find('.go').removeAttr('disabled').html('Rechercher');
							KOC.map.searching = false;
						});
				},
				'displayResultsByCategory': function(){
					console.info('KOC map displayResultsByCategory function');
					var tiles = KOC.map.currentSearch.tiles,
						category = KOC.map.$category.val(),
						code = '<table><thead><tr>',
						coords = [],
						i, tile,
						length = tiles.length;
					switch( category ){
						case 'C' : //cities
							code += '<th>Distance</th>';
							code += '<th>Coordonnée</th>';
							code += '<th>Nom</th>';
							code += '<th>Joueur</th>';
							code += '<th>Puissance</th>';
							code += '<th>Sous brumes</th>';
							code += '</tr></thead><tbody class="'+ category +'">';
							for( i = 0; i < length; i += 1 ){
								tile = tiles[i];
								if( tile.category == category ){
									coords.push( tile.x + ',' + tile.y );
									code += '<tr class="'+ ( tile.misted ? 'misted' : '' ) +'">';
									code += '<td>'+ tile.range +'</td>';
									code += '<td data-coord="'+ tile.x + ',' + tile.y +'">'+ KOC.shared.mapLink(tile.x + ',' + tile.y) +'</td>';
									code += '<td>'+ tile.city +'</td>';
									code += '<td>'+ tile.player +'</td>';
									code += '<td>'+ tile.might +'</td>';
									code += '<td>'+ (tile.misted ? 'Oui' : 'Non') +'</td>';
									code += '</tr>';
								}
							}
							break;
						case 'CB' : //barbarian
							code += '<th>Distance</th>';
							code += '<th>Coordonnée</th>';
							code += '<th>Niveau</th>';
							code += '</tr></thead><tbody class="'+ category +'">';
							for( i = 0; i < length; i += 1 ){
								tile = tiles[i];
								if( tile.category == category ){
									coords.push( tile.x + ',' + tile.y );
									code += '<tr class="level'+ tile.level +'">';
									code += '<td>'+ tile.range +'</td>';
									code += '<td data-coord="'+ tile.x + ',' + tile.y +'">'+ KOC.shared.mapLink(tile.x + ',' + tile.y) +'</td>';
									code += '<td>'+ tile.level +'</td>';
									code += '</tr>';
								}
							}
							break;
						case 'FS' : //dark forests
							code += '<th>Distance</th>';
							code += '<th>Coordonnée</th>';
							code += '<th>Niveau</th>';
							code += '</tr></thead><tbody class="'+ category +'">';
							for( i = 0; i < length; i += 1 ){
								tile = tiles[i];
								if( tile.category == category ){
									coords.push( tile.x + ',' + tile.y );
									code += '<tr class="level'+ tile.level +'">';
									code += '<td>'+ tile.range +'</td>';
									code += '<td data-coord="'+ tile.x + ',' + tile.y +'">'+ KOC.shared.mapLink(tile.x + ',' + tile.y) +'</td>';
									code += '<td>'+ tile.level +'</td>';
									code += '</tr>';
								}
							}
							break;
						case 'TS' : //wilderness
							code += '<th>Distance</th>';
							code += '<th>Coordonnée</th>';
							code += '<th>Type</th>';
							code += '<th>Niveau</th>';
							code += '<th>Joueur</th>';
							code += '<th>Puissance</th>';
							code += '</tr></thead><tbody class="'+ category +'">';
							for( i = 0; i < length; i += 1 ){
								tile = tiles[i];
								if( tile.category == category ){
									coords.push( tile.x + ',' + tile.y );
									code += '<tr class="level'+ tile.level +' type'+ tile.type +' '+ ( tile.player == '' ? 'free' : '' ) +'">';
									code += '<td>'+ tile.range +'</td>';
									code += '<td data-coord="'+ tile.x + ',' + tile.y +'">'+ KOC.shared.mapLink(tile.x + ',' + tile.y) +'</td>';
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

					KOC.map.$results.html( coordsList + code );
					KOC.map.filterResults();
				},
				'filterResults': function(){
					console.info('KOC map filterResults function');
					var category = KOC.map.$category.val(),
						$tbody = KOC.map.$results.find('tbody'),
						$trs = $tbody.find('tr'),
						min = parseInt( $.trim( $('#koc-map-level-min').val() ), 10 ),
						max = parseInt( $.trim( $('#koc-map-level-max').val() ), 10 ),
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
						var $types = KOC.map.$filter.find('.type').find('input').filter(':checked');
						if( $types.length ){
							$types.each(function(){
								if( this.value == 10 ) types.push( '.type50' ); //two possible values for plains
								types.push( '.type' + this.value );
							});
							if( types.length ) classes.push( types );
						}
						if( KOC.map.$filter.find('.status').find('input').filter(':checked').length ){
							status.push('.free');
							classes.push( status );
						}
					}

					if( category == 'C' ){
						if( KOC.map.$filter.find('.status').find('input').filter(':checked').length ){
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

					if( classes.length ) $trs.hide().filter( classes.join(',') ).show();
					else $trs.show();

					var list = [];
					$trs.filter(':visible').each2(function(i, $tr){
						var coord = $tr.find('td').eq(1).data('coord');
						if( coord ) list.push(coord);
					});
					$('#coordsList').html( list.join("\n") );
				},
			};

		/* FORMATION */
			KOC.formation = {
				'options': {
					'active': 1,
					'automatic': 0,
				},
				'stored': ['rules'],
				'rules': {}, //by city id
				'schredules': {}, //by city id
				'confPanel': function( $section ){
					console.info('KOC formation confPanel function');
					var code = '<h3>Formation</h3>';
					code += '<div>';
					code += KOC.shared.generateCheckbox('formation', 'active', 'Activer le module', KOC.conf.formation.active);
					code += KOC.shared.generateCheckbox('formation', 'automatic', 'Lancer les formations automatiques', KOC.conf.formation.automatic);
					code += KOC.shared.generateButton('formation', 'deleteAllRules', 'Supprimer toutes les règles de formation enregistrées');
					code += '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOC formation modPanel function');
					var $section = KOC.$confPanel.find('#koc-formation').html('');

					var form = '<h3>Formulaires<span class="ui-icon ui-icon-info"></span></h3><div class="forms">';
					form += '<h3>Formations automatiques</h3>';
					form += '<div class="automatic-train-form">';
					form += '<ul class="message"></ul>';
					form += '<button class="save">Enregistrer</button>';

					var i, j, u, d, f, res,
						cLength = KOC.citiesId.length,
						cityId, city,
						rule, units, defenses, availableUnits,
						rLength = KOC.resources.length;
					//by city
					for( i = 0; i < cLength; i += 1 ){
						cityId = KOC.citiesId[i];
						city = KOC.shared.getCityById( cityId );
						rule = KOC.formation.rules[ cityId ];
						//available units
						availableUnits = window.seed.units[ 'city' + cityId ];
						availableDefenses = window.seed.fortifications[ 'city' + cityId ];
						units = KOC.formation.getTrainableUnits( cityId );
						defenses = KOC.formation.getTrainableDefenses( cityId );

						form += '<fieldset>';
						form += '<legend>';
						form += '<input type="checkbox" class="train-city" id="koc-formation-auto-city-'+ cityId +'" name="city" '+ ( rule && rule.active ? 'checked' : '' ) +' value="'+ cityId +'" autocomplete="off" />';
						form += city.roman +' '+ city.name +'</legend><p>';

						//choose unit (check building requirements and tech requirements)
							form += '<label for="koc-formation-auto-city-'+ cityId +'-unit">Unités&nbsp;:&nbsp;</label>';
							form += '<select id="koc-formation-auto-city-'+ cityId +'-unit" class="train-unit" name="unit" autocomplete="off">';
							form += '<option value=""></option>';

							for( u in units ){
								if( units.hasOwnProperty(u) ){
									var name = window.unitcost[u][0];
									if( name == 'Unité de Ravitaillement' ) name = 'Ravitailleur';

									form += '<option value="'+ u +'">'+ name + ' ('+ (availableUnits.hasOwnProperty(u) ? KOC.shared.format(availableUnits[u]) : '0' ) +')</option>';
								}
							}
							form += '</select>';

						//choose pack size min and max]
							form += '<label for="koc-formation-auto-city-'+ cityId +'-min">Min&nbsp;:&nbsp;</label>';
							form += '<input type="text" id="koc-formation-auto-'+ cityId +'-min" name="min" class="train-min" autocomplete="off" />';
							form += '<label for="koc-formation-auto-city-'+ cityId +'-max">Max&nbsp;:&nbsp;</label>';
							form += '<input type="text" id="koc-formation-auto-'+ cityId +'-max" name="max" class="train-max" autocomplete="off" />';
							form += '<button class="train-unit-max">max</button>';

						//choose speed
							form += '<br /><label for="koc-formation-auto-city-'+ cityId +'-speed">Vitesse&nbsp;:&nbsp;</label>';
							form += '<select id="koc-formation-auto-city-'+ cityId +'-speed" name="speed" class="train-speed" autocomplete="off">';
							form += '<option value="0">Normal</option>';
							form += '<option value="1">5-15% (coût x2)</option>';
							form += '<option value="2">10-25% (coût x4)</option>';
							form += '</select>';

						//choose boost
						// /!\ boost incompatible avec speed
						/*
							form += '<label for="koc-formation-auto-city-'+ cityId +'-item">Objet ?</label>';
							form += '<select id="koc-formation-auto-city-'+ cityId +'-item" name="item" autocomplete="off">';
							form += '<option value="">Non</option>';
							form += '<option value="36">"+ window.itemlist.i36.name + '(' + (window.seed.items.i36 ? window.seed.items.i36 : 0) + ')</option>';
							form += '<option value="37">"+ window.itemlist.i37.name + '(' + (window.seed.items.i37 ? window.seed.items.i37 : 0) + ')</option>';
							form += '<option value="38">"+ window.itemlist.i38.name + '(' + (window.seed.items.i38 ? window.seed.items.i38 : 0) + ')</option>';
							form += '</select>';
						*/

						//choose workforce percentage
							form += '<label for="koc-formation-auto-city-'+ cityId +'-workforce">Travailleurs&nbsp;:&nbsp;</label>';
							form += '<select id="koc-formation-auto-city-'+ cityId +'-workforce" name="workforce" class="train-workforce" autocomplete="off">';
							form += '<option value="0">0%</option>';
							form += '<option value="0.25">25%</option>';
							form += '<option value="0.50">50%</option>';
							form += '<option value="0.75">75%</option>';
							form += '<option value="1">100%</option>';
							form += '</select>';

						//nice to have
							/*
							form += '<label>Durée</label>';
							form += '<output></output>';
							*/
						form += '</p>';

						//defenses
							form += '<p>';
							form += '<label for="koc-formation-auto-city-'+ cityId +'-defense">Défenses&nbsp;:&nbsp;</label>';
							form += '<select id="koc-formation-auto-city-'+ cityId +'-defense" name="defense" class="train-defense" autocomplete="off">';
							form += '<option value=""></option>';
							for( d in defenses ){
								if( defenses.hasOwnProperty(d) ){
									f = d.replace(/frt/, 'fort');
									form += '<option value="'+ d +'">'+ window.fortcost[d][0] + ' ('+ (availableDefenses.hasOwnProperty(f) ? KOC.shared.format(availableDefenses[f]) : '0' ) +')</option>';
								}
							}
							form += '</select>';
							form += '<label for="koc-formation-auto-city-'+ cityId +'-qty">Quantité&nbsp;:&nbsp;</label>';
							form += '<input type="text" id="koc-formation-auto-'+ cityId +'-quantity" name="quantity" class="train-quantity" autocomplete="off" />';
							form += '<button class="train-defense-max">max</button>';
							form += '</p>';

						//keep resources ? (in easy format, with validation)
							form += '<p class="train-keep">';
							form += '<label>Garder&nbsp;:&nbsp;</label>';
							for( j = 0; j < rLength; j += 1 ){
								res = KOC.resources[j];
								form += '<label for="koc-formation-auto-city-keep-'+ res.name +'">';
								form += '<img src="'+ res.icon +'" title="'+ res.label +'">';
								form += '</label>';
								form += '<input type="text" id="koc-formation-auto-city-keep-'+ res.name +'" name="'+ res.name +'" autocomplete="off" />';
							}
							form += '</p>';
							form += '</fieldset>';
					}

					form += '<button class="save">Enregistrer</button>';
					form += '</div>';

					//manual formation form
						form += '<h3>Formations manuelles</h3>';
						form += '<div class="manual-train-form">';
						form += '<ul class="message"></ul>';
						form += '<button class="launch">Former</button>'
						form += '<button class="reset">Annuler</button>'
						form += '</div>';

					form += '</div>';

					//formations list
					var onGoing = '<h3>Formations en cours</h3><div class="formation-list ongoing">';

					for( i = 0; i < cLength; i += 1 ){
						cityId = KOC.citiesId[i];
						city = KOC.shared.getCityById( cityId );
						onGoing += '<h3>' + city.roman + ' ' + city.name + '</h3><ul data-city="'+ city.id +'"></ul>';
					}
					onGoing += '</div>';

					var help = '<div id="koc-formation-help" class="help" title="Aide formation"><ul>';
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
						//launch
						.on('change', '.city', function(){
							console.info('auto formation toggle click');
							if( KOC.conf.formation.active ){
								var $this = $(this),
									cityId = $this.value(),
									isChecked = $this.prop('checked');
								if( isChecked ){
									KOC.formation.startAutoFormation( cityId );
								} else {
									KOC.formation.stopAutoFormation( cityId );
								}
							} else {
								alert('Le module n\'est pas actif. Les lancements de formations automatiques sont bloqués.');
							}
						})
						//save auto formation
						.on('click', '.save', function(){
							console.info('automatic rule save click');
							var result = KOC.formation.planAutomaticRule();
							if( result.errors.length ){
								KOC.formation.$autoForm.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
							} else {
								KOC.formation.$autoForm.find('.message').empty();

								KOC.formation.rules = result.rules;
								KOC.formation.storeRules();

								if( KOC.conf.formation.active ){
									KOC.formation.startAutomaticFormations();
								}
							}
						})
						//save manual formation
						.on('click', '.launch', function(){
							console.log('manual formation launch');
							var result = KOC.formation.planManualRule();
							if( result.errors.length ){
								KOC.formation.$manualForm.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
							} else {
								KOC.formation.$manualForm.find('.message').empty();

								KOC.formation.launchFormation( result.rule );
							}
						})
						//reset manual form
						.on('click', '.reset', KOC.formation.resetForm)
						//calc max trainable units
						.on('click', '.train-unit-max', function(){
							var $fieldset = $(this).closest('fieldset');
							KOC.formation.calcMaxTrainable( $fieldset );
						})
						//calc max trainable units
						.on('click', '.train-defense-max', function(){
							var $fieldset = $(this).closest('fieldset');
							KOC.formation.calcMaxDefense( $fieldset );
						})
						//speed change, affect max
						.on('change', '.train-speed', function(){
							var $fieldset = $(this).closest('fieldset');
							KOC.formation.calcMaxTrainable( $fieldset );
						})
						.on('click', '.ongoing .formations .ui-icon-trash', function(){
							var $this = $(this);
							KOC.formation.cancelTraining( $this.attr('rel'), $this.parent() );
						})
						.on('click', '.ongoing .defenses .ui-icon-trash', function(){
							var $this = $(this);
							KOC.formation.cancelFortification( $this.attr('rel'), $this.parent() );
						})
						.find('.help').dialog({ autoOpen: false, zIndex: 100002 });

					KOC.formation.$autoForm = $section.find('.automatic-rule-form');
					KOC.formation.$manualForm = $section.find('.manual-rule-form');
					KOC.formation.$ongoing = $section.find('.formation-list.ongoing');

					$section.find('.forms').accordion({collapsible: true, autoHeight: false}).find('h3').eq(0).click().blur();
					KOC.formation.$ongoing.accordion({collapsible: true, autoHeight: false}).find('h3').eq(0).click().blur();
				},
				'on': function(){
					console.info('KOC formation on function');
					try{
						var persistentFormationRules = localStorage.getObject('koc_formation_attacks_' + KOC.storeUniqueId);
						if( persistentFormationRules ){
							KOC.formation.rules = persistentFormationRules;
						}
					} catch(e){
						console.error(e);
					}

					var i, length = KOC.citiesId.length;
					for( i = 0; i < length; i += 1 ){
						KOC.formation.listCityFormations( KOC.citiesId[i] );
					}

					if( KOC.conf.formation.automatic ){
						KOC.formation.automaticOn();
					}
				},
				'off': function(){
					console.info('KOC formation off function');

					KOC.formation.automaticOff();
				},
				'automaticOn': function(){
					console.info('KOC formation automaticOn function');
					$('#formation-panel-automatic').prop('checked', true);
				},
				'automaticOff': function(){
					console.info('KOC formation automaticOff function');
					$('#formation-panel-automatic').prop('checked', false);

					for( var c in KOC.formation.rules ){
						if( KOC.formation.rules.hasOwnProperty(c) ){
							KOC.formation.schredules[ c ] = false;
						}
					}
				},
				'startAutomaticFormation': function( cityId ){
					console.info('KOC formation automaticOn function');
					KOC.formation.schredules[ cityId ] = true;
					KOC.formation.launchRule( KOC.formation.rules[ cityId ] );
				},
				'stopAutomaticFormation': function( cityId ){
					console.info('KOC formation automaticOn function');
					KOC.formation.schredules[ cityId ] = false;
				},
				'storeRules': function(){
					console.info('KOC formation storeRules function');
					try{
						localStorage.setObject('koc_formation_rules_' + KOC.storeUniqueId, KOC.formation.rules);
					} catch(e){
						alert(e);
					}
				},
				'planAutomaticRule': function(){
					console.info('KOC formation planAutomaticAttack function');
					var rules = {},
						errors = {},
						$fieldsets = KOC.formation.$autoForm.find('fieldset'),
						rule, nbErr, hasTroop, hasDef, cityLabel, $city, troop, defense, min, max, quantity, $res, rkeep;

					$fieldsets.each2(function(i, $fieldset){
						rule = {};
						nbErr = 0;
						hasTroop = false;
						hasDef = false;
						$city = $fieldset.find('.train-city');
						cityLabel = $.trim( $fieldset.find('legend').text() );
						//city
						rule.city = $city.val();
						rule.active = $city.prop('checked') ? 1 : 0;
						//check troop
						troop = $fieldset.find('.train-unit').val();
						if( troop != '' ){
							hasTroop = true;
							rule.troop = troop;

							//check min and max
							min = KOC.shared.decodeFormat( $.trim( $fieldset.find('.train-min').val() ) );
							max = KOC.shared.decodeFormat( $.trim( $fieldset.find('.train-max').val() ) );

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
							quantity = KOC.shared.decodeFormat( $.trim( $fieldset.find('.train-quantity').val() ) );
							if( qty != false && qty > 1 ){
								rule.qty = qty;
							}
						}

						//check keep
						rule.keep = {};
						$fieldset.find('.train-keep').find('input').each2(function(i, $res){
							res = KOC.shared.decodeFormat( $.trim( $res ) );
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
							rules[ rule.city ] = rule;
						}
					});


					return {'rules': rules, 'errors': errors};
				},
				'startAutomaticFormations': function(){
					console.info('KOC formation startAutomaticFormations function');
				},
				'planManualRule': function(){
					console.info('KOC formation planManualAttack function');
					var rule = {},
						errors = {};
					return {'rule': rule, 'errors': errors};
				},
				'launchRule': function( rule ){
					console.info('KOC formation launchRule function', rule);

					//walls_train_defense
					//
				},
				'resetForm': function(){
					console.info('KOC formation resetForm function');
					var $inputs = KOC.formation.$manualForm.find('input');
					inputs.filter('[type=checkbox]').prop('checked', false);
					inputs.filter('[type=text]').val('');

					KOC.formation.$manualForm.find('select').val('');

					KOC.formation.$manualForm.find('.message').empty();
				},
				'listCityFormations': function( cityId ){
					console.info('KOC formation listCityFormations function', cityId);
					var $ul = KOC.formation.$ongoing.find('ul').filter('[data-city='+ cityId +']');
					$ul.empty();

					city = 'city' + cityId;

					var code = '', i, formation, unit,
						queue = window.seed.queue_unt[city];
					//array of [tid, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]

					code += '<table border="0">';
					code += '<thead><tr><th>Formations</th><th>Fortifications</th></tr></thead>';
					code += '<tbody><tr><td>';

					//troops
					code += '<ol class="formations">';
					for( i = 0; i < queue.length; i += 1 ){
						formation = queue[i];
						for( j = 0; j < KOC.troops.length; j += 1 ){
							if( KOC.troops[j].name == 'unt' + formation[0] ){
								unit = KOC.troops[j];
								break;
							}
						}

						code += '<li><span class="ui-icon ui-icon-trash" rel="'+ i +','+ cityId +','+ formation[0] +','+ formation[1] +','+ formation[3] +','+ formation[2] +','+ formation[5] +'" title="Annuler cette formation"></span>&nbsp;';
						code += '<img src="'+ unit.icon +'" alt="'+ unit.label[0] +'" title="'+ unit.label[0] +'" />&nbsp;';
						code += '<span class="unit">'+ KOC.shared.format( formation[1] ) +'</span>';
						code += KOC.shared.readableDuration( formation[3] - formation[2] ) +'</li>';
					}
					code += '</ol></td><td>';

					//defenses
					code += '<ol class="defenses">';
					queue = window.seed.queue_fort[city];
					for( i = 0; i < queue.length; i += 1 ){
						formation = queue[i];
						for( j = 0; j < KOC.defenses.length; j += 1 ){
							if( KOC.defenses[j].name == 'fort' + formation[0] ){
								unit = KOC.defenses[j];
								break;
							}
						}

						code += '<li><span class="ui-icon ui-icon-trash" rel="'+ i +','+ cityId +','+ unit[0] +','+ unit[1] +','+ unit[3] +','+ unit[2] +','+ unit[5] +','+ unit[6] +'" title="Annuler cette fortification"></span>&nbsp;';
						code += '<img src="'+ unit.icon +'" alt="'+ unit.label +'" title="'+ unit.label +'" />&nbsp;';
						code += '<span class="unit">'+ KOC.shared.format( formation[1] ) +'</span>';
						code += KOC.shared.readableDuration( formation[3] - formation[2] ) +'</li>';
					}
					code += '</ol></td></tr></tbody></table>';

					$ul.append( code );
				},
				'getTrainableUnits': function( cityId ){
					console.info('KOC formation getTrainableUnits function', cityId);

					var units = {}, u, unitc, building, tech, b, t;

					for( u in window.unitcost ){
						if( window.unitcost.hasOwnProperty(u) ){
							unitc = window.unitcost[u];
							//check building requirement
								b = true;
								if( typeof unitc[8] == 'object' ){
									b = false;
									for( building in unitc[8] ){
										if( unitc[8].hasOwnProperty( building ) ){
											if( KOC.shared.buildingHighestLevel( cityId, building.substr(1) ) >= unitc[8][building][1] ){
												b = true;
											}
										}
									}
								}
							//check tech requirement
								t = true;
								if( typeof unitc[9] == 'object' ){
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
				'getTrainableDefenses': function( cityId ){
					console.info('KOC formation getTrainableDefenses function', cityId);

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
											if( KOC.shared.buildingHighestLevel( cityId, building.substr(1) ) >= fortc[8][building][1] ){
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
				'calcMaxTrainable': function( $fieldset ){
					console.info('KOC formation calcMaxTrainable function');
					var unit = $fieldset.find('.train-unit').val(),
						$max = $fieldset.find('.train-max');

					if( unit == '' ){
						$max.val('').attr('title', '');
						return;
					}

					var mod, i, nb, cost = [], res = [],
						speed = $fieldset.find('.train-speed').val(),
						cityId = 'city' + $fieldset.find('.train-city').val(),
						unitcost = window.unitcost[unit],
						resources = window.seed.resources[cityId],
						cityStat = window.seed.citystats[cityId];

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
							console.log(res[i], cost[i], res[i] / cost[i]);
							nb = Math.min(nb, res[i] / cost[i]);
						}
					}

					$max.val( KOC.shared.format(nb) || 0 ).attr('title', nb || 0);
				},
				'calcMaxDefense': function( $fieldset ){
					console.info('KOC formation calcMaxDefense function');
					var def = $fieldset.find('.train-defense').val(),
						$qty = $fieldset.find('.train-quantity');

					if( def == '' ){
						$qty.val('').attr('title', '');
						return;
					}

					var mod, i, d, nb, check, slot, cost = [], res = [],
						cityId = 'city' + $fieldset.find('.train-city').val(),
						fortcost = window.fortcost[def],
						resources = window.seed.resources[cityId],
						buildings = window.seed.buildings[cityId];

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
					d = parseInt(buildings.pos1[1], 10);
					for( i = 1; i < (d + 1); i += 1 ){
						mod += (i * 1000);
					}

					mod = mod / 2;

					slot = KOC.formation.getWallSlots(cityId, 2);
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

					$qty.val( KOC.shared.format(nb) || 0 ).attr('title', nb);
				},
				'getWallSlots': function(cityId, withQueue ){
					console.info('KOC formation getWallSlots function');
					var fortifications = window.seed.fortifications[cityId],
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

					if( withQueue == 2 ){
						var queue = window.seed.queue_fort[cityId];
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
				'cancelTraining': function( info, $li ){
					console.info('KOC formation cancelTraining function');
					var i, j, totalReturn,
						params = $.extend({}, window.g_ajaxparams);

					info = info.split(',');

					params.requestType = "CANCEL_TRAINING";
					params.cityId      = info[1];
					params.typetrn     = info[2];
					params.numtrptrn   = info[3];
					params.trnETA      = info[4];
					params.trnTmp      = info[5];
					params.trnNeeded   = info[6];

					cityId = 'city' + info[1];

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
									for( var i = 0; i < window.seed.queue_unt[cityId].length; i++ ){
										if( i > info[0] ){
											window.seed.queue_unt[cityId][i][2] = parseInt(result.dateTraining[j]["start"], 10);
											window.seed.queue_unt[cityId][i][3] = parseInt(result.dateTraining[j]["end"], 10);
											j += 1;
										}
									}

									for( i = 1; i < 5; i += 1 ){
										totalReturn = parseInt(window.unitcost["unt" + info[1]][i], 10) * parseInt(info[2], 10) * 3600 / 2;
										window.seed.resources[cityId]["rec" + i][0] = parseInt(window.seed.resources[cityId]["rec" + i][0], 10) + totalReturn;
									}
								});

								$li.addClass('canceled');

								setTimeout(function(){ KOC.formation.listCityFormations( info[1] ); }, 500);
							} else if( result.msg ){
								alert( result.msg );
							}
						});
				},
				'cancelFortification': function( info, $li ){
					console.info('KOC formation cancelFortification function');
					var i, j, totalReturn,
						params = $.extend({}, window.g_ajaxparams);

					info = info.split(',');

					params.requestType = "CANCEL_FORTIFICATIONS";
					params.cityId      = info[1];
					params.typefrt     = info[2];
					params.numtrpfrt   = info[3];
					params.frtETA      = info[4];
					params.frtTmp      = info[5];
					params.frtNeeded   = info[6];
					params.frtid       = info[0];

					cityId = 'city' + info[1];

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
									for( var i = 0; i < window.seed.queue_unt[cityId].length; i++ ){
										if( i > info[0] ){
											window.seed.queue_fort[cityId][i][2] = parseInt(result.dateFortifications[j]["start"], 10);
											window.seed.queue_fort[cityId][i][3] = parseInt(result.dateFortifications[j]["end"], 10);
											j += 1;
										}
									}

									for( i = 1; i < 5; i += 1 ){
										totalReturn = parseInt(window.fortcost["frt" + info[1]][i], 10) * parseInt(info[2], 10) * 3600 / 2;
										window.seed.resources[cityId]["rec" + i][0] = parseInt(window.seed.resources[cityId]["rec" + i][0], 10) + totalReturn;
									}
								});

								$li.addClass('canceled');

								setTimeout(function(){ KOC.formation.listCityFormations( info[1] ); }, 500);
							} else if( result.msg ){
								alert( result.msg );
							}
						});
				},
				'train': function(qty, unitId, boost, speed){
					console.info('KOC formation train function');

					/*if( boost != null ) window.train_unit(unitId, qty, boost, null);
					else if( speed != null) window.train_unit(unitId, qty, null, speed);*/

						/*function train_unit(tid, num, iid, gambleId) {
							var time = modal_barracks_traintime(tid, num);
							if (iid == 36) {
								time = parseInt(time * 0.7)
							} else {
								if (iid == 37) {
									time = parseInt(time * 0.5)
								} else {
									if (iid == 38) {
										time = parseInt(time * 0.3)
									}
								}
							}
							var params = Object.clone(g_ajaxparams);
							params.cid = currentcityid;
							params.type = tid;
							params.quant = num;
							params.items = iid;
							params.gambleId = gambleId;
							var profiler = new cm.Profiler("ResponseTime", "train.php");
							new Ajax.Request(g_ajaxpath + "ajax/train.php" + g_ajaxsuffix, {
								method: "post",
								parameters: params,
								onSuccess: function (transport) {
									profiler.stop();
									var rslt = eval("(" + transport.responseText + ")");
									if (rslt.ok) {
										var resourceFactors = [],
											resourceLost, i;
										if (gambleId != null) {
											time = rslt.timeNeeded
										}
										for( i = 1; i < 5; i += 1 ){
											if (rslt.gamble) {
												resourceFactors.push(rslt.gamble[i.toString()])
											} else {
												resourceFactors.push(1)
											}
											resourceLost = parseInt(unitcost["unt" + tid][i]) * 3600 * parseInt(num);
											resourceLost = resourceLost * resourceFactors[i - 1];
											seed.resources["city" + currentcityid]["rec" + i][0] = parseInt(seed.resources["city" + currentcityid]["rec" + i][0]) - resourceLost
										}
										seed.citystats["city" + currentcityid].gold[0] = parseInt(seed.citystats["city" + currentcityid].gold[0]) - parseInt(unitcost["unt" + tid][5]) * parseInt(num);
										seed.citystats["city" + currentcityid].pop[0] = parseInt(seed.citystats["city" + currentcityid].pop[0]) - parseInt(unitcost["unt" + tid][6]) * parseInt(num);
										seed.queue_unt["city" + currentcityid].push([tid, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]);
										queue_changetab_train();
										changeBarracksModalTabs(1);
										seed.items["i" + iid] = Number(seed.items["i" + iid]) - 1;
										ksoItems[iid].subtract();
										if (rslt.updateSeed) {
											update_seed(rslt.updateSeed)
										}
										UserEngagement.popViralModalUEP(1)
									} else {
										Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
									}
								},
								onFailure: function () {
									profiler.stop()
								}
							})
						};*/
					//by city
					//check
						//population
						//barracks
							/*var availableTrainingSlots = 0;
							try{
							var barracksTotal = getCityBuilding(cityId, 13).count;
							var trainingSlotsUsed = Seed.queue_unt['city'+cityId].length;
							if(trainingSlotsUsed!=null){
								var availableTrainingSlots = barracksTotal-trainingSlotsUsed;
							}*/
						//ressources
							//enough for the pack size
							//will leave enough resources after ?
					//try to train
						 /*var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
						 params.cid = cityId;
						 params.type = unitId;
						 params.quant = num;
						 params.items = 0;
						 params.gambleId = gam;
						 new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, {
						   method: "post",
						   parameters: params,*/
					//
					//
				}
			};

		/* TRANSPORT */
			KOC.transport = {
				'options': {
					'active': 1,
					'automatic': 0,
				},
				'stored': ['rules'],
				'rules': {},
				'confPanel': function( $section ){
					console.info('KOC transport confPanel function');
					var code = '<h3>Transport</h3>'
						+ '<div>'
						+ KOC.shared.generateCheckbox('transport', 'active', 'Activer le module', KOC.conf.transport.active)
						+ '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOC transport modPanel function');
					var $section = KOC.$confPanel.find('#koc-transport').html('');

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
					console.info('KOC transport on function');

					KOC.conf.transport.active = 1;
					KOC.shared.storeConf();
				},
				'off': function(){
					console.info('KOC transport off function');

					KOC.conf.transport.active = 0;
					KOC.conf.transport.automatic = 0;
					KOC.shared.storeConf();

					KOC.transport.automaticOff();
				},
				'automaticOn': function(){
					console.info('KOC transport automaticOn function');

					KOC.conf.transport.automatic = 1;
					KOC.shared.storeConf();

					if( $.isEmptyObject( KOC.transport.rules ) ){
						try{
							var persistentTransportRules = localStorage.getObject('koc_transport_rules_' + KOC.storeUniqueId);
							if( persistentTransportRules ){
								KOC.transport.rules = persistentTransportRules;
							}
						} catch(e){
							console.error(e);
						}
					}
				},
				'automaticOff': function(){
					console.info('KOC transport automaticOff function');

					KOC.conf.transport.automatic = 0;
					KOC.shared.storeConf();
				},
				'storeAutomaticRules': function(){
					console.info('koc transport storeAutomaticRules function');
					localStorage.setObject('koc_transport_rules_' + KOC.storeUniqueId, KOC.transport.rules);
				},
				//'generateTransport': function(origin, destination, troops, ressources)
				//getCitiesForPlayer
				//getCitiesForSelf
				//getTroopsByTown
				//getTransportDuration
			};

		/* GLORY TOURNAMENT */
			/*KOC.gloryTournament = {
				'options': {
					'active': 1,
					'automatic': 0,
				},
				'stored': ['rule'],
				'rule': {},
				'confPanel': function( $section ){
					console.info('KOC gloryTournament confPanel function');
					var code = '<h3>Tournoi de Gloire</h3>';
					code += '<div>';
					code += KOC.shared.generateCheckbox('gloryTournament', 'active', 'Activer le module', KOC.conf.gloryTournament.active);
					code += KOC.shared.generateCheckbox('gloryTournament', 'automatic', 'Lancer les éclairages automatiques', KOC.conf.gloryTournament.automatic);
					code += KOC.shared.generateButton('gloryTournament', 'deleteRule', 'Supprimer la règle enregistrée');
					code += '</div>';

					$section.append( code );
				},
				'modPanel': function(){
					console.info('KOC gloryTournament modPanel function');
					var $section = KOC.$confPanel.find('#koc-gloryTournament').html('');

					var form = '<h3><span class="ui-icon ui-icon-info"></span>';
					form += '<span><input type="checkbox" id="gloryTournament-panel-automatic" '+ (KOC.conf.gloryTournament.automatic ? 'checked' : '') +' autocomplete="off" />';
					form += '<label for="gloryTournament-panel-automatic">éclairages automatiques</label></span>';
					form += 'Configurer un éclairage</h3>';
					form += '<div class="scout-form">';
					form += '<ul class="message"></ul>';
					form += '<fieldset><div><label>Envoyer depuis&nbsp;:&nbsp;</label><br />';

					var i, length = KOC.cities.length;
					for( i = 0; i < length; i += 1 ){
						var city = KOC.cities[i],
							checked = ( KOC.gloryTournament.rule.hasOwnProperty('cities') ? $.inArray(city.id, KOC.gloryTournament.rule.cities) > -1 : false );
						form += '<input id="koc-gloryTournament-city'+ city.id +'" name="city" value="'+ city.id +'" type="checkbox" class="city-choice" '+ (checked ? 'checked' : '') +' autocomplete="off" />';
						form += '<label for="koc-gloryTournament-city'+ city.id +'">'+ city.roman + ' ' + city.name +'</label>';
					}

					form += '</div><div>';
					var c = ( KOC.gloryTournament.rule.hasOwnProperty('coord') ? KOC.gloryTournament.rule.coord : '' );
					form += '<label>Coordonnée&nbsp;:&nbsp;</label><input type="text" name="coord" id="gloryTournament-coord" value="'+ c +'" autocomplete="off" />';
					form += '</div>';
					form += '<button class="save">Sauvegarder</button>';
					form += '<button class="reset">Annuler</button>';
					form += '</fieldset></div>';

					var help = '<div id="koc-gloryTournament-help" class="help" title="Aide Tournoi de Gloire"><ul>';
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
							var $inputs = KOC.gloryTournament.$form.find('input');
							$inputs.filter('[type=text]').val('');
							$inputs.filter('[type=cgeckbox]').prop('checked', false);
						})
						//launch
						.on('click', '.save', function(){
							var result = KOC.gloryTournament.planScout();
							if( result.errors.length ){
								KOC.gloryTournament.$form.find('.message').html( '<li>' + result.errors.join('</li><li>') + '</li>' );
							} else {
								KOC.gloryTournament.$form.find('.message').empty();
								KOC.gloryTournament.rule = result.rule;
								KOC.gloryTournament.storeRule();
							}
						})
						.find('.help').dialog({ autoOpen: false, zIndex: 100002 });

					KOC.gloryTournament.$form = $section.find('.scout-form');
				},
				'on': function(){
					console.info('KOC gloryTournament on function');
					if( $.isEmptyObject( KOC.gloryTournament.rule ) ){
						try{
							var persistentGloryTournamentRule = localStorage.getObject('koc_gloryTournament_rule_' + KOC.storeUniqueId);
							if( persistentGloryTournamentRule ){
								KOC.gloryTournament.rule = persistentGloryTournamentRule;
							}
						} catch(e){
							console.error(e);
						}
					}

					if( KOC.conf.gloryTournament.automatic ){
						KOC.gloryTournament.automaticOn();
					}
				},
				'off': function(){
					console.info('KOC gloryTournament off function');

					KOC.gloryTournament.automaticOff();
				},
				'automaticOn': function(){
					console.info('KOC gloryTournament automaticOn function');
					$('#gloryTournament-panel-automatic').prop('checked', true);

					if( !$.isEmptyObject( KOC.gloryTournament.rule ) ){
						console.info('launching automatic scout', KOC.gloryTournament.rule);
						KOC.gloryTournament.launchScout();
					}
				},
				'automaticOff': function(){
					console.info('KOC gloryTournament automaticOff function');
					$('#gloryTournament-panel-automatic').prop('checked', false);
				},
				'storeRule': function(){
					console.info('KOC gloryTournament storeRule function');
					try{
						localStorage.setObject('koc_gloryTournament_rule_' + KOC.storeUniqueId, KOC.gloryTournament.rule);
					} catch(e){
						alert(e);
					}
				},
				'deleteRule': function(){
					console.info('KOC gloryTournament deleteRule function');
					KOC.gloryTournament.rule = {};
					KOC.gloryTournament.storeRule();

					$('#koc-crestHunt').find('.attack-list').find('ul').empty();
				},
				'planScout': function(){
					console.info('KOC gloryTournament planScout function');
					var $cities = KOC.gloryTournament.$form.find('.city-choice').filter(':checked'),
						coord = $.trim( KOC.gloryTournament.$form.find('#gloryTournament-coord').val().replace(/\n/g, ' ') ),
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
					var rule = KOC.gloryTournament.rule;
					console.info('KOC gloryTournament launchScout function', rule);
					if( $.isEmptyObject( rule ) ){
						return false;
					}

					if( !KOC.conf.gloryTournament.active || !KOC.conf.gloryTournament.automatic ){
						return false;
					}

					//by city steps
					var byCity = function( dfd ){
						console.info('KOC gloryTournament deferred byCity function', cityIndex + 1);

						if( !KOC.conf.gloryTournament.active || !KOC.conf.gloryTournament.automatic ){
							return dfd.reject();
						}

						cityIndex += 1;
						if( cityIndex < rule.cities.length ){
							cityId = rule.cities[ cityIndex ];
							city = 'city' + cityId;
							wParams.cid = cityId;
							return dfd.pipe( checkRaillyPoint( dfd ) );
						}

						return dfd.resolve();
					};

					//step 1 of the sequence
					var checkRaillyPoint = function( dfd ){
						console.info('KOC gloryTournament deferred checkRaillyPoint function');
						slots = KOC.shared.getRallyPointLevel( city );
						if( slots == 12 ) slots -= 1; //eleven armies at level 12
						for( a in window.seed.queue_atkp[ city ] ){
							if( window.seed.queue_atkp[ city ].hasOwnProperty(a) ) slots -= 1;
						}

						if( slots < 1 ){
							return setTimeout(function(){ dfd.pipe( byCity( dfd ) ); }, 6000);
						}

						dfd.pipe( checkUnit( dfd ) );
					};

					//step 2 of the sequence
					var checkUnit = function( dfd ){
						console.info('KOC gloryTournament deferred checkUnit function');

						units = window.seed.units[ city ];

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
						console.info('KOC gloryTournament deferred launchScouts function');
						$.when( subSequence( dfd ) )
							.done(function(){
								return dfd.resolve();
							});
					};

					//sub sequence, launch scout for each ralliement point slot available
					var subSequence = function( dfd ){
						console.info('KOC gloryTournament deferred subSequence function');
						return $.Deferred(function( sdfd ){
							return sdfd.pipe( launch( dfd, sdfd ) );
						}).promise();
					};

					var checkMarch = function( city, mid ){
						console.info('KOC gloryTournament deferred checkMarch function');
						var march = window.seed.queue_atkp[ city ][ 'm' + mid ];
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
											window.seed.queue_atkp[ city ][ mid ]['unit'+ j +'Return'] = data.march['unit'+ j +'Return'];
										}
									}

									for( j = 1; j < 6; j += 1 ){
										if( data.march['resource' + j] ){
											window.seed.queue_atkp[ city ][ mid ]['resource' + j] = data.march['resource' + j];
										}
									}

									window.seed.queue_atkp[ city ][ mid ].marchStatus = data.march.marchStatus;
									window.seed.queue_atkp[ city ][ mid ].hasUpdated = true;
								}
							});
						}
					};

					var removeMarch = function( city, mid ){
						console.info('KOC gloryTournament deferred checkMarch function');
						var march = window.seed.queue_atkp[ city ][ 'm' + mid ];
						if( march ){
							delete window.seed.queue_atkp[ city ][ 'm' + mid ];
						}

						if( cityId == window.currentcityid ) window.attack_generatequeue();
					}

					//sub sequence, launch scout
					var launch = function( dfd, sdfd ){
						console.info('KOC gloryTournament deferred launch function');
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

								setTimeout(function(){ checkMarch( city, result.marchId); }, timediff * 1000 + 5000);
								setTimeout(function(){ removeMarch( city, result.marchId); }, timediff * 1000 + 30000);
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
								console.log('2 scouts launched from '+ cityId, cityIndex + 1);
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
						console.info('KOC gloryTournament deferred sequence function');
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
						cityId, city, slots, a, units, unitKey, unitNum, qty, available,
						resources = [0, 0, 0, 0, 0],
						unitsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

					$.when( sequence() )
						.always(function(){
							if( KOC.conf.gloryTournament.active && KOC.conf.gloryTournament.automatic ){
								setTimeout(function(){ KOC.gloryTournament.launchScout(); }, 30000);
							}
						});
				}
			};*/

	/* CHECK AND LAUNCH ATTACK */
		KOC.checkAndLaunchAttack = function( attack ){
			console.info('KOC checkAndLaunchAttack function', attack.id, attack.cityId, attack);
			if( !KOC.conf.crestHunt.active ){
				return false;
			}

			if( !attack.hasOwnProperty('abort') ) attack.abort = 0;

			var $tr = KOC.crestHunt.$ongoing.find('tbody').filter('[data-city='+ attack.cityId +']').find('tr').filter('[data-attack='+ attack.id +']');
			if( $tr.length && $tr.data('stop') ){
				attack.aborts.push('Attaque stoppée sur demande.');
				KOC.crestHunt.refreshOngoingInfo(attack, true);
				KOC.crestHunt.$saved
					.find('tbody').filter('[data-city='+ attack.cityId +']')
					.find('tr').filter('[data-attack='+ attack.id +']')
					.find('.charge').show();
				return false;
			}

			if( attack.abort > 10 ){
				attack.aborts.push('Trop d\'erreurs détectées. Attaque stoppée.');
				KOC.crestHunt.refreshOngoingInfo(attack, true);
				return false;
			}

			//security, defining missing properties
			if( !attack.hasOwnProperty('marching') ) attack.marching = [];
			if( !attack.hasOwnProperty('aborts') ) attack.aborts = [];
			if( !attack.hasOwnProperty('abort') ) attack.abort = 0;
			if( !attack.hasOwnProperty('lastCoordIndex') ) attack.lastCoordIndex = 0;

			//attacks loop only if in automatic mode
			if( attack.lastCoordIndex >= attack.coords.length ){
				if( KOC.conf.crestHunt.automatic && KOC.crestHunt.attacks[ attack.cityId ] && KOC.crestHunt.attacks[ attack.cityId ][ attack.id ]){
					attack.lastCoordIndex = 0;
				} else {
					attack.aborts.push('Attaque finie');
					KOC.crestHunt.refreshOngoingInfo(attack, true);
					return;
				}
			}

			attack.marching = [];

			/* deferred attack functions */
				//check previous marches for "away without leave" troops
				//first in attack sequence, will pipe the deferred resolution to resetTracks function
				var previousMarchingCheck = function(dfd){
					console.info('KOC checkAndLaunchAttack deferred previousMarchingCheck function');
					if( window.seed.queue_atkp[ 'city' + attack.cityId ] ){
						var mParams = window.g_ajaxparams,
							i = 0, j, march,
							mLength = attack.marching.length;
						if( mLength == 0 ){
							return dfd.pipe( resetTracks(dfd) );
						}

						var checkMarch = function(dfd, i){
							console.info('KOC checkAndLaunchAttack deferred checkMarch function');
							march = window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ];
							//console.log('march', i, march);
							if( march && !march.hasOwnProperty('kocUpdated') ){
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
												window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ]['unit'+ j +'Return'] = data.march['unit'+ j +'Return'];
											}
										}

										for( j = 1; j < 6; j += 1 ){
											if( data.march['resource' + j] ){
												window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ]['resource' + j] = data.march['resource' + j];
											}
										}

										window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ].marchStatus = data.march.marchStatus;
										window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ].hasUpdated = true;

										window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ].kocUpdated = true;

										if( data.march.marchStatus == 2 ){ //MARCH_STATUS_DEFENDING
											window.attack_recall(attack.marching[i], 1, attack.cityId);
										}

										i += 1;
										attempts = 3;
										if( i >= mLength ){
											 return dfd.pipe( resetTracks(dfd) );
										} else return dfd.pipe( checkMarch(dfd, i) );

									} else {
										console.log(data);
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
					console.info('KOC checkAndLaunchAttack deferred resetTracks function');
					//force refresh of attack queue for current city with march from the attack
					if( attack.marching.length && window.currentcityid == attack.cityId ){
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
					console.info('KOC checkAndLaunchAttack deferred checkRallyPoint function');
					var slots = KOC.shared.getRallyPointLevel(attack.cityId),
						a;
					if( slots == 12 ) slots -= 1; //eleven armies at level 12
					for( a in window.seed.queue_atkp[attack.cityId] ){
						if( window.seed.queue_atkp[attack.cityId].hasOwnProperty(a) ) slots -= 1;
					}

					if( slots < attack.waves ){
						attack.aborts.push('Pas assez de place dans le point de ralliement.');
						return dfd.reject();
					}
					return dfd.pipe(checkCoords(dfd));
				};

				//loop function for checking each coords until one valid is found, use deferred.pipe() to iterate
				//fourth in attack sequence, will pipe the deferred resolution to checkCoord function
				var checkCoords = function(dfd){
					console.info('KOC checkAndLaunchAttack deferred checkCoords function');
					coordIndex = attack.lastCoordIndex;
					attempts = 3;
					return dfd.pipe(checkCoord(dfd));
				};

				//check one coord and return the result using the deferred object in parameter
				//fifth in attack sequence, will pipe the deferred resolution to checkAndLaunchWaves function if a suitable coordinate is found
				var checkCoord = function( dfd ){
					console.info('KOC checkAndLaunchAttack deferred checkCoord function');

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
								//console.log('fetchMapTiles info', info);
								var type = parseInt(info.tileType, 10);
								if( type <= 0 || type > 50 ){
									attack.aborts.push('Coordonnées '+ attack.coords[ coordIndex ] +' ('+ (coordIndex + 1) +'e) n\'est pas une terre sauvage.');
									coordIndex += 1;
									return dfd.pipe( checkCoord(dfd) );

								} else if( info.tileUserId != null || info.tileCityId != null ){ //"0" -> under mists, "xxx" -> no mists
									attack.aborts.push( KOC.shared.mapLink( attack.coords[ coordIndex ] ) +' ('+ (coordIndex + 1) +'e) occupées.');
									coordIndex += 1;
									return dfd.pipe( checkCoord(dfd) );

								} else {
									baseParams.xcoord = gps[0];
									baseParams.ycoord = gps[1];
									attack.lastCoordIndex = coordIndex;
									return dfd.pipe( checkAndLaunchWaves(dfd) );
								}
							} else {
								attack.aborts.push('Informations sur '+ KOC.shared.mapLink( attack.coords[ coordIndex ] ) +' ('+ (coordIndex + 1) +'e) manquantes.');

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
							console.log(result);
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

								attempts = 3;

								return dfd.pipe( checkCoord(dfd) );
							}
						}
					})
					.fail(function(){
						attack.aborts.push('Informations sur '+ KOC.shared.mapLink( attack.coords[ coordIndex ] ) +' ('+ (coordIndex + 1) +'e) introuvables.');

						coordIndex += 1;

						if( coordIndex >= attack.coords.length ){
							attack.lastCoordIndex = coordIndex - 1;
							attack.aborts.push('Aucune coordonnée validée pour l\'attaque.');
							return dfd.reject();
						}

						attempts = 3;
						return dfd.pipe( checkCoord(dfd) );
					});
				};

				//loop function for checking and launching each wave, use deferred.pipe() to iterate
				//sixth in attack sequence, will pipe the deferred resolution to checkAndLaunchWave function
				var checkAndLaunchWaves = function(dfd){
					console.info('KOC checkAndLaunchAttack deferred checkAndLaunchWaves function');
					waveIndex = 0;
					return dfd.pipe(checkAndLaunchWave(dfd));
				};

				//seventh in attack sequence, will pipe the deferred resolution to checkAndLaunchWave function until all waves are launched
				var checkAndLaunchWave = function( dfd ){
					console.info('KOC checkAndLaunchAttack deferred checkAndLaunchWave function');

					/* deferred wave specific functions */
						//first in wave sequence, will pipe the deferred resolution to checkKnight function
						var findLostKnights = function(wdfd){
							console.info('KOC checkAndLaunchAttack deferred findLostKnights function');
							KOC.shared.freeKnights( attack.cityId );
							return wdfd.pipe( checkKnight(wdfd) );
						};

						//second in wave sequence, will pipe the deferred resolution to checkUnits function
						var checkKnight = function(wdfd){
							console.info('KOC checkAndLaunchAttack deferred checkKnight function');
							var knights = KOC.shared.getAvailableKnights( attack.cityId ),
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
							console.info('KOC checkAndLaunchAttack deferred checkUnits function');
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
							return wdfd.pipe( launchWave(wdfd) );
						};

						//fourth and last in wave sequence
						var launchWave = function(wdfd){
							console.info('KOC checkAndLaunchAttack deferred launchWave function');
							//console.log('wave', waveIndex + 1, attack.id, attack.cityId, wave);
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

									//console.log('wave', waveIndex + 1, 'launched - result parsing done');
									return wdfd.resolve();

								} else {
									console.log(result);
									if( result.msg ){
										attack.aborts.push('Plan d\'attaque sur '+ KOC.shared.mapLink( attack.coords[ attack.lastCoordIndex ] ) +' refusé ('+ result.msg +').');
										return wdfd.reject();
									} else if( result.user_action == 'marchCaptcha' ){
										attack.aborts.push('Plan d\'attaque sur '+ KOC.shared.mapLink( attack.coords[ attack.lastCoordIndex ] ) +' refusé (captcha !).');
										return wdfd.reject();
									}

									launchAttempts -= 1;
									if( launchAttempts > 0 ){
										return wdfd.pipe( launchWave(wdfd) );
									} else {
										return wdfd.reject();
									}
								}
							}).fail(function(){
								//network or server error
								attack.aborts.push('Plan d\'attaque sur '+ attack.coords[ lastCoordIndex ] +' refusé (requête KO).');

								launchAttempts -= 1;
								if( launchAttempts > 0 ){
									return wdfd.pipe( launchWave(wdfd) );
								} else {
									return wdfd.reject();
								}
							});
						};

						var waveSequence = function(){
							return $.Deferred(function( wdfd ){
								//calling sequencialy findLostKnights(), checkKnight(), checkUnits(), launchWave()
								//using deferred.pipe() to iterate
								return wdfd.pipe( findLostKnights(wdfd) );
							}).promise();
						};

					var units = window.seed.units[ 'city' + attack.cityId ],
						wParams = $.extend({}, baseParams),
						resources = [0, 0, 0, 0, 0],
						unitsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						wave = attack.waves[ waveIndex ],
						knight = null,
						kLength = attack.keep.length,
						launchAttempts = 3;
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
								//console.log('calling back previous waves', attack.marching.length);
								KOC.shared.recallWaves( attack );
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

			baseParams.cid = attack.cityId;
			baseParams.type = 4; //MARCH_TYPE_ATTACK
			baseParams.gold = 0;
			baseParams.r1 = 0;
			baseParams.r2 = 0;
			baseParams.r3 = 0;
			baseParams.r4 = 0;
			baseParams.r5 = 0;
			baseParams.items = '';

			var coordIndex, waveIndex, time, increment = true, attempts = 3;

			//using deferred to sequentialize asynchronous tasks
			$.when( attackSequence() )
				.fail(function(){
					time = 0;
					attack.abort = attack.abort + 1;
				})
				.always(function(){
					//console.log('after launching waves');
					KOC.crestHunt.refreshOngoingInfo(attack, false);

					attack.lastCoordIndex = attack.lastCoordIndex + 1;

					//save the last coord if the attack is a stored one
					if( KOC.crestHunt.attacks[ attack.cityId ]
						&& KOC.crestHunt.attacks[ attack.cityId ][ attack.id ]
					){
						KOC.crestHunt.attacks[ attack.cityId ][ attack.id ].lastCoordIndex = attack.lastCoordIndex;
						KOC.crestHunt.storeAttacks();
					}

					//console.log('time', KOC.shared.readableDuration(time), time, KOC.shared.readableDuration(time*2));
					time *= 1000; //timestamp in milliseconds in javascript

					//force march update 10s after impact
					window.setTimeout(function(){
						KOC.shared.forceMarchUpdate( attack );
					}, time + 10000);

					time *= 2; //round-trip

					//force refresh
					window.setTimeout(function(){
						//console.log('attack seed refresh');
						KOC.shared.updateSeed();
					}, time + 30000);

					//next round
					window.setTimeout(function(){
						//console.log('attack next round', attack.id, 'city', attack.cityId);
						KOC.checkAndLaunchAttack( attack );
					}, time + 45000);
				});
		};

	var trys = 60;
	function load(){
		if( window.seed && window.seed.cities ){
			window.setTimeout(function(){
				/*console.log(window);
				console.log(window.seed);
				console.log(window.unitstats);*/
				console.time('Koc init');
				console.log('Koc init');
				KOC.init();
				console.timeEnd('Koc init');
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
	//- CB
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
