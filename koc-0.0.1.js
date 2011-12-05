console.info('koc start');

var kocConfPanelCss = "#koc-conf-panel-toggle {}"
	+ "\n.drag-handle { cursor: move; width: 10px; height: 20px; background-color: grey; float: left;}"
	+ "\n#koc-conf-panel .ui-icon-close { position: absolute; right: -3px; top: -3px; cursor: pointer; }"
	+ "\n#koc-conf-panel { max-height: 700px; display: none; position: absolute; z-index: 100001; }"
	+ "\n#koc-conf-panel label + select { margin-left: 5px; }"
	+ "\n#koc-conf-panel .drag-handle { height: 36px; }"
	+ "\n#koc-conf-panel .ui-icon-close { float: right; cursor: pointer; }"
	+ "\n#koc-conf-panel .ui-icon-trash { cursor: pointer; display: inline-block; }"
	+ "\n#koc-conf-panel ul:not(.ui-accordion-content) { margin: 5px; }"
	+ "\n.koc-conf-panel-tab.on:after, .koc-conf-panel-tab.off:after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 0; border-width: 10px; border-style: solid; }"
	+ "\n.koc-conf-panel-tab.on:after { border-color: transparent green green transparent; }"
	+ "\n.koc-conf-panel-tab.off:after { border-color: transparent red red transparent; }"
	+ "\n#koc-options p { margin: 3px 0; }"
	+ "\n#koc-chat ul { padding-left: 0; }"
	+ "\n.ui-tabs .ui-tabs-panel { overflow: auto; padding: 0; }"
	+ "\n.ui-tabs-panel h3:not(.ui-accordion-header) { margin: 0;}"
	+ "\n.ui-tabs-panel h3:not(.ui-accordion-header):not(:first-child) { margin: 4px 0; }"
	+ "\n.ui-tabs-panel h3 p { float: right; font-size: 11px; margin: 0; }"
	+ "\n.ui-tabs-panel h3 span { float: right; font-size: 11px; margin: 0; cursor: pointer; }"
	+ "\n.ui-tabs-panel .help { display:none; }"
	+ "\n.ui-accordion .ui-accordion-header { text-indent: 30px; }"
	+ "\n.mapLink { text-decoration: underline; color: blue; cursor: pointer; }"
	+ "\n.attack-form fieldset small { display: block; }"
	+ "\n.attack-form .keep, .attack-form .add-wave, .attack-form .launch, .attack-form .save, .attack-form .saveAndLaunch { display: none; }"
	+ "\n.attack-form { counter-reset: waves; }"
	+ "\n.attack-form .wave legend::after { counter-increment: waves; content: ' ' counter(waves); }"
	+ "\n.attack-form .wave label { display: inline-block; }"
	+ "\n.attack-form .wave > label, .attack-form .unit-block label:first-child { min-width: 80px; }"
	+ "\n.attack-form .unit-block select + label { margin-left: 10px; }"
	+ "\n.attack-form .unit-qty { width: 60px; }"
	+ "\n.attack-form textarea { width: 150px; height: 120px; }"
	+ "\n.attack-form .builds { display: none; float: right; max-width: 220px; }"
	+ "\n.attack-form .builds div { -moz-column-count: 2; -moz-column-gap: 5px; -webkit-column-count: 2; -webkit-column-gap: 5px; column-count: 2; column-gap: 5px; }"
	+ "\n.attack-list li { display: block; margin-bottom: 8px; }"
	+ "\n.attack-list li span { display: inline-block; padding-right: 5px; }"
	+ "\n.attack-list li img { width: 18px; }"
	+ "\n.attack-list .attack-errors { display: block; }"
	+ "\n.koc-timer-div { position: absolute; color: red; font-weight: bold; left: 612px; display: none; font-family: Verdana, Helvetica, sans-serif; }"
	+ "\n#koc-reload-msg { top: 3px; }"
	+ "\n#general-refreshFrequency, #general-reloadFrequency { width: 30px; text-align: center; }"
	+ "\n#koc-conf-panel .coord { width: 30px; text-align: center; }"
	+ "\n#koc-map .save, #koc-map .filter { display: none; }"
;

var kocChatMoveableCss = ".kocmain .mod_comm { background: #FCF8DD; border: 1px solid #A56631; z-index: 99997; }"
	+ "\n.kocmain .mod_comm .comm_tabs { background-color: #1054A7; width: auto; top: 0; left: 10px; height: 20px; }"
	+ "\n.kocmain .mod_comm .comm_body { top: 20px; }"
	+ "\n.kocmain .mod_comm .comm_body form { height: 25px; }"
	+ "\n.kocmain .mod_comm .mod_comm_forum { padding-left: 0; }"
	+ "\n.kocmain .mod_comm .comm_global .postaction .button20 { top: 2px; }"
	+ "\n.kocmain .mod_comm .comm_global .postaction { width: auto; padding: 3px 5px; }"
	+ "\n.kocmain .mod_comm .comm_global .postaction #mod_comm_input { position: absolute; top: 5px; left: 5px; }"
	+ "\n.kocmain .mod_comm .comm_global .chatlist { width: auto; margin-left: 0; border: none; }"
	+ "\n.kocmain .mod_comm .kocMerlinSmall { float: right; padding: 4px; font-size: 10px; }"
	+ "\n.kocmain .mod_comm .seltab1 a.tab2, .kocmain .mod_comm .seltab2 a.tab1 { height: 20px; line-height: 20px; padding: 0 5px; }"
	+ "\n.kocmain .mod_comm .seltab1 a.tab1, .kocmain .mod_comm .seltab2 a.tab2 { background: #FCF8DD; height: 20px; line-height: 20px; padding-right: 5px; }"
	+ "\n.kocmain .mod_comm .seltab1 a.tab1 span, .kocmain .mod_comm .seltab2 a.tab2 span { background: none; height: 20px; line-height: 20px; padding-left: 5px; }"
	+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content { width: auto; float: none; }"
	+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info { width: auto; }"
	+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info .nm { padding-left: 18px; }"
	+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info b { display: none; }"
	+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .tx { width: auto; float: none; }"
	+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .flag { display: none; }"
	+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap img { margin-right: 0; width: 15px; height: 15px; float: none; position: absolute; top: 2px; left: 2px; }"
;
var kocChatHelpCss = ".kocmain .mod_comm .comm_global .chatlist .noalliance { display: none; }"
	+ "\n.kocmain .mod_comm.ui-draggable { display: block; }"
;

var kocChatHighlightLeadersCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.chancellor:not(.direct) { background-color: #C3ECE4; }"
	+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.vice_chancellor:not(.direct) { background-color: #C7E3F7; }"
	+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.officer:not(.direct) { background-color: #D5D2F7; }"
;

var kocChatHighlightFriendsCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.friend:not(.direct) { background-color: #FAE4E4; }";
var kocChatHighlightFoesCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.foe:not(.direct) { background-color: #FFCAA2; }";

var kocOverviewCss = "#koc-overview { position:absolute; font: 10px/20px Verdana, sans serif; font-width: normal;  z-index: 100000; display: none; }"
	+ "\n#koc-overview .handle { margin: 0 0 2px 0; text-indent: 3px; }"
	+ "\n#koc-overview .ui-icon-close { float: right; cursor: pointer; }"
	+ "\n#koc-overview .ui-tabs .ui-tabs-panel { padding: 2px; }"
	+ "\n#koc-overview .overview-parts-toggles { float: left; margin: 0; }"
	+ "\n#koc-overview .wrap { width: 100%; overflow: hidden; }"
	+ "\n#koc-overview table { width: 100%; float: left; }"
	+ "\n#koc-overview thead tr { display: block; position: relative; }"
	+ "\n#koc-overview tbody { overflow: auto; display: block; width: 100%; }"
	+ "\n#koc-overview tr.highlight td, #koc-overview th.highlight { background-color: #F8E0A8; }"
	+ "\n#koc-overview tr td.sum { background-color: #D9F4F1; }"
	+ "\n#koc-overview img { width:20px; }"
	+ "\n#koc-overview tr td.sum, #koc-overview tr td.sum ~ td { text-align: right; }"
	+ "\n#koc-overview th[colspan] { width: auto; }"
	+ "\n#koc-overview .img { width: 20px; }"
	+ "\n#koc-overview .label { width: 100px; text-overflow: ellipsis; }"
	+ "\n#koc-overview .sum { width: 55px; }"
	+ "\n#koc-overview thead tr th:last-child, #koc-overview thead tr td:last-child { width: auto; }"
	+ "\n#koc-overview .sizer td, #koc-overview .sizer td.sum, #koc-overview .sizer.highlight td { height: 1px; line-height: 1px; background-color: black; padding: 0; }"
;

var kocNotepadCss = "#koc-notepad { padding: 2px 3px; }"
	+ "\n#koc-notepad { position:absolute; font: 10px/20px Verdana, sans serif; font-width: normal;  z-index: 100000; display: none; }"
	+ "\n#koc-notepad .ui-icon-close { float: right; cursor: pointer; }"
	+ "\n#koc-notepad .wrap { width: 100%; overflow: auto; }"
	+ "\n#koc-notepad textarea { width: 99%; height: 150px; }"
	+ "\n#koc-notepad .wrap input + label { display: block; }"
	+ "\n#koc-notepad .charsLeft { float: right; }"
	+ "\n#koc-notepad ul { display: block; -moz-column-count: 3; -moz-column-gap: 1em; -webkit-column-count: 3; -webkit-column-gap: 1em; column-count: 3; column-gap: 1em; }"
	+ "\n#koc-notepad .handle { margin-top: 0; }"
	+ "\n#koc-notepad li .ui-icon { display: inline-block; }"
	+ "\n#koc-notepad li { white-space: nowrap; }"
	+ "\n#koc-notepad li button { max-width: 120px; text-overflow: ellipsis; overflow: hidden; }"
;

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
		for( var i = 0; i < l; i++ ){
			for( var j= i + 1; j < l; j++ ){
				// If this[i] is found later in the array
				if( this[i] === this[j] ) j = ++i;
			}
			a.push(this[i]);
		}
		return a;
	};

	Array.max = function( array ){
		return Math.max.apply( Math, array );
	};

	Array.min = function( array ){
		return Math.min.apply( Math, array );
	};

var KOC = {};

var debug = {};

jQuery(document).ready(function(){

//prototype json.stringify bug with array
	if(window.Prototype) {
		delete Object.prototype.toJSON;
		delete Array.prototype.toJSON;
		delete Hash.prototype.toJSON;
		delete String.prototype.toJSON;
	}

(function($){
	try{
		//pointers
			var $head = $('head'),
				$body = $('body'),
				$chatInput = $('#mod_comm_input'),
				$chatGeneral = $('#mod_comm_list1'),
				$chatAlliance = $('#mod_comm_list2'),
				$chat = $('#kocmain_bottom').find('.mod_comm');

		//shared
			var $dragHandle = $('<div class="drag-handle">');

		var reloadTimeout, reloadInterval, reloadTimer, refreshTimeout;

		KOC = {
			'server': null,
			'modules': ['chat', 'fbWallPopup', 'overview', 'crestHunt', 'notepad', 'map'],
			'modulesLabel': {
				'crestHunt': 'Armoiries',
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

				//gather the default conf
					console.time('default conf gathering');
					for( var i = 0; i < KOC.modules.length; i++ ){
						var mod = KOC.modules[i];
						KOC.defaultConf[mod] = KOC[mod].options;
					}
					KOC.conf = KOC.defaultConf;
					console.timeEnd('default conf gathering');

				//get stored conf if present
					try {
						var storedConf = localStorage.getObject('koc_conf_' + KOC.server);
						if( storedConf ){
							$.extend(true, KOC.conf, storedConf);
							console.info('used stored conf');
						}
					} catch( e ){
						console.error(e);
					}
					console.log(KOC.conf);

				//gather stored items list
					for( var i = 0; i < KOC.modules.length; i++ ){
						var mod = KOC.modules[i];
						if( KOC[mod].stored ){
							for( var j = 0; j < KOC[mod].stored.length; j++ ){
								KOC.stored.push( mod + '_' + KOC[mod].stored[j] );
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

				//refresh button
					KOC.$buttons.append(
						$('<button id="koc-refresh-seed">')
							.text('Raffraîchir')
							.attr('title', 'Force la mise à jour des données du jeux.')
							.click(function(e){ KOC.shared.updateSeed(); })
					);
					KOC.$refreshButton = $('#koc-refresh-seed');

				//modules init
					for( var i = 0; i < KOC.modules.length; i++ ){
						console.time('koc '+ KOC.modules[i] +' on');
						KOC[ KOC.modules[i] ].on();
						console.timeEnd('koc '+ KOC.modules[i] +' on');
					}

				//map links
					$body.on('click', '.mapLink', function(){
						var coord = $(this).text().split(',');
						window.Modal.hideModalAll();
						window.changeview_map( document.getElementById('mod_views_map') );
						$('#mapXCoor').val( coord[0] );
						$('#mapYCoor').val( coord[1] );
						window.reCenterMapWithCoor();
					});

				//specials
					//KOC.special.();

				//reload game form
					var $form = $('<form>', { 'id': 'koc-reload', 'target': '_top', 'action': '', 'method': 'post' });
					$form.append(' <input type="hidden" name="s" value="'+ KOC.server +'">');
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
			},
			/* default configuration */
				//each module has its own default conf
				'defaultConf': {
					'general': {
						'reload': 0,
						'reloadFrequency': 30,
						'refresh': 0,
						'refreshFrequency': 30,
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
					{'name': 'gold', 'key': 'rec0', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
					{'name': 'resource1x3600', 'key': 'rec1', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
					{'name': 'resource2x3600', 'key': 'rec2', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
					{'name': 'resource3x3600', 'key': 'rec3', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
					{'name': 'resource4x3600', 'key': 'rec4', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
					{'name': 'resource7', 'key': '7', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/aetherstone_30.png'},
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
					{'rows': 2, 'name': 'unt1', 'label': ['Unité', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_1_30_s34.jpg'},
					{'rows': 2, 'name': 'unt2', 'label': ['Milicien', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_2_30_s34.jpg'},
					{'rows': 2, 'name': 'unt3', 'label': ['Eclaireur', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_3_30_s34.jpg'},
					{'rows': 2, 'name': 'unt4', 'label': ['Piquier', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_4_30_s34.jpg'},
					{'rows': 2, 'name': 'unt5', 'label': ['Paladin', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_5_30_s34.jpg'},
					{'rows': 2, 'name': 'unt6', 'label': ['Archer', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_6_30_s34.jpg'},
					{'rows': 2, 'name': 'unt7', 'label': ['Cavalerie', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_7_30_s34.jpg'},
					{'rows': 2, 'name': 'unt8', 'label': ['Cavalerie Lourde', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_8_30_s34.jpg'},
					{'rows': 2, 'name': 'unt9', 'label': ['Wagon', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_9_30_s34.jpg'},
					{'rows': 2, 'name': 'unt10', 'label': ['Baliste', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_10_30_s34.jpg'},
					{'rows': 2, 'name': 'unt11', 'label': ['Bélier', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_11_30_s34.jpg'},
					{'rows': 2, 'name': 'unt12', 'label': ['Catapulte', 'en CB'], 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_12_30_s34.jpg'},
				],
				'defenses': [
					{'name': 'frt53', 'label': 'Arbalètes', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_53_30.jpg'},
					{'name': 'frt55', 'label': 'Trébuchets', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_55_30.jpg'},
					{'name': 'frt60', 'label': 'Pièges', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_60_30.jpg'},
					{'name': 'frt61', 'label': 'Chausse-trapes', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_61_30.jpg'},
					{'name': 'frt62', 'label': 'Palissades', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_62_30.jpg'},
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
										try{
											var r = JSON.parse(this.responseText);
										} catch(e){
											console.warn(e);
											console.log(this.responseText);
										}
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
							case 'march.php':
								this.addEventListener("load", function(){
									setTimeout(function(){ KOC.overview.updateFromSeed() }, 500);
								}, false);
								break;
							case 'levyGold.php':
								this.addEventListener("load", function(){
									setTimeout(function(){ KOC.overview.updateFromSeed() }, 500);
								}, false);
								break;
							case 'train.php':
								this.addEventListener("load", function(){
									setTimeout(function(){ KOC.overview.updateFromSeed() }, 500);
								}, false);
								break;
							case 'updateSeed.php':
								this.addEventListener("load", function(){
									//console.debug(JSON.parse(this.responseText));
									var r = JSON.parse(this.responseText);
									if( r.updateMarch ){
										for( var c in debug ){
											for( var i = 0; i < debug[c].length; i++ ){
												var m = debug[c][i];
												console.debug('update march', c, m, r.updateMarch);
												if( r.updateMarch && r.updateMarch[c] && r.updateMarch[c][m] ){
													var v = 'n/a';
													if( r.updateMarch[c][m][0]['fght'] && r.updateMarch[c][m][0]['fght']['s1'] && r.updateMarch[c][m][0]['fght']['s1']['u6'] ){
														v = r.updateMarch[c][m][0]['fght']['s1']['u6'][1];
													}
													if( r.updateMarch[c][m][0]['unit6Return'] ) v = r.updateMarch[c][m][0]['unit6Return'];

													console.debug('update march', c, m, 'archers survivant', v, r.updateMarch[c][m]);
												}
											}
										}
									}
									setTimeout(function(){
										for( var c in debug ){
											for( var i = 0; i < debug[c].length; i++ ){
												var m = debug[c][i];
												console.debug('seed', c, m, 'archer', window.seed.units[ c.replace(/c/, 'city') ]['unt6'], window.seed.units[ c.replace(/c/, 'city') ]);
											}
										}
										KOC.overview.updateFromSeed();
									}, 500);
								}, false);
								break;
							case '_dispatch.php':
								this.addEventListener("load", function(){
									setTimeout(function(){ KOC.overview.updateFromSeed() }, 500);
								}, false);
								break;
							case 'magicalboxPreview.php':
								this.addEventListener("load", function(){
									setTimeout(function(){ window.Modal.hideModal(); }, 300);
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

					for( var i = 0; i < KOC.modules.length; i++ ){
						var mod = KOC.modules[i];
						if( typeof KOC[mod].modPanel == 'function' ){
							var active = this.conf[mod].active;
							var name = ( KOC.modulesLabel[mod] ? KOC.modulesLabel[mod] : mod.capitalize() );
							lis += '<li class="koc-conf-panel-tab '+ (active ? 'on' : 'off') +'">'
								 + '<a href="#koc-'+ mod +'">'+ name +'</a>'
								 + '</li>';
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
							'helper': "original",
							handle: '.ui-tabs-nav',
							'stop': function(event, ui){
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
								if( !$(ui.panel).find('h3').length ){
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

					for( var i = 0; i < KOC.modules.length; i++ ){
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
						localStorage.setObject('koc_conf_' + KOC.server, KOC.conf);
					},
					'cleanLocalStorage': function(){
						console.info('KOC shared cleanLocalStorage function');
						for( var i = 0; i < KOC.stored.length; i++ ){
							localStorage.removeItem('koc_' + KOC.stored[i] + '_' + KOC.server);
						}
					},
					'optionPanel': function($optionsSection){
						console.info('KOC shared optionPanel function');
						var code = '<h3>Global</h3>'
							+ '<div>'
							+ KOC.shared.generateButton('shared', 'cleanLocalStorage', 'Remise à zèro des données persistantes', null)
							+ KOC.shared.generateButton('shared', 'reloadGame', 'Recharger la page')
							+ KOC.shared.generateCheckbox('general', 'refresh', 'Rafraîchir les données toutes les ', KOC.conf.general.refresh).replace(/<\/p>/, '')
							+ KOC.shared.generateInput('general', 'refreshFrequency', ' minutes', KOC.conf.general.refreshFrequency).replace(/<p>/, '')
							+ KOC.shared.generateCheckbox('general', 'reload', 'Recharger toutes les ', KOC.conf.general.reload).replace(/<\/p>/, '')
							+ KOC.shared.generateInput('general', 'reloadFrequency', ' minutes', KOC.conf.general.reloadFrequency).replace(/<p>/, '')
							+ '</div>';
						$optionsSection.append( code );
						for( var i = 0; i < KOC.modules.length; i++ ){
							KOC[ KOC.modules[i] ].confPanel( $optionsSection );
						}
					},
					'reloadCountdown': function(status){
						console.info('KOC shared reloadCountdown function', status);
						if( status ){
							reloadTimer = parseFloat(KOC.conf.general.reloadFrequency) * 60 * 1000;
							reloadTimeout = setTimeout(function(){
								console.info('KOC shared reloadCountdown timeout function');
								$('#koc-reload').submit();
								clearInterval( reloadInterval );
							}, reloadTimer - 1);

							KOC.$reloadTimer.show().find('.koc-timer').html( KOC.shared.readableDuration(reloadTimer / 1000) );
							reloadInterval = setInterval(function(){
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
							refreshTimeout = setTimeout(function(){
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
					'getCities': function(){
						console.time('cities');
						for( var i = 0; i < window.seed.cities.length; i++ ){
							var c = window.seed.cities[i];
							KOC.cities.push( {'id': c[0], 'name': c[1], 'coords': {'x': c[2], 'y': c[3]}, 'roman': window.roman[i]} );
							KOC.citiesId.push( c[0] );
						}
						console.timeEnd('cities');
					},
					'getCityById': function( cityId ){
						if( cityId.indexOf('city') != 0 ) cityId = cityId.replace(/city/, '');
						for( var i = 0; i < KOC.cities.length; i++ ){
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
							time = time / 3600; //get time in days
							return Math.floor(time / 24)+'j';
						} else {
							if( time < 61 ){
								return time + 's';
							} else if( time > 3600 ){
								return Math.floor( time / 3600 ) + 'h';
							} else {
								return Math.floor( time / 60 ) + 'm';
							}
						}
					},
					'generateCheckbox': function(module, option, text, checked){
						return '<p>'
							 + '<input type="checkbox" class="conf-toggle" id="'+ module +'-'+ option +'" '+ (checked ? 'checked' : '') +' />'
							 + '<label for="'+ module +'-'+ option +'">'+ text +'</label>'
							 + '</p>';
					},
					'generateInput': function(module, option, text, value){
						return '<p>'
							 + '<input type="text" class="conf-choice" id="'+ module +'-'+ option +'" value="'+ value +'" />'
							 + '<label for="'+ module +'-'+ option +'">'+ text +'</label>'
							 + '</p>';
					},
					'generateButton': function(module, action, text, param){
						return '<p><button rel="'+ module +'-'+ action +'" class="conf-action" '+ (param != null ? 'data-param="'+param+'"' : '') +'>'+ text +'</button></p>';
					},
					'generateRadio': function(module, name, values, labels, selected){
						var code = '<p>';
						if( values.length && labels.length && values.length == labels.length ){
							for( var i = 0; i < values.length; i++ ){
								if( i > 0 ) code += '<br />';
								code += '<input type="radio" class="conf-toggle" id="'+ module +'-'+ values[i] +'" name="'+ module + '_' + name +'" '+ (selected[i] == 1 ? 'checked' : '') +' />'
									 +  '<label for="'+ module +'-'+ values[i] +'">'+ labels[i] +'</label>';
							}
						}
						code += '</p>';
						return code;
					},
					'generateSelect': function(module, name, label, selected, options){
						var code = '<p><label for="'+ module + '-' + name +'">'+ label +'</label><select id="'+ module + '-' + name +'" class="conf-choice"><option value=""></option>';
						if( options.values && options.labels && options.values.length == options.labels.length){
							var values = options.values,
								labels = options.labels;
							for( var i = 0; i < values.length; i++ ){
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
							techTwelveModifier = parseInt(window.seed.tech.tch12);

						for( var i = 0; i < troops.length; i++ ){
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
						for( var b in window.seed.buildings[cityId] ){
							if( window.seed.buildings[cityId].hasOwnProperty(b) ){
								var building = window.seed.buildings[cityId][b];

								if( building[0] == 12 ) level = parseInt(building[1], 10);
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
						var code = '';
						if( !$.isArray(coords) ) coords = [coords];
						for( var i = 0; i < coords.length; i++ ){
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
							setTimeout(function(){ KOC.shared.updatingSeed = false; }, 10000);
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
				},
			/* FACEBOOK WALL POST POPUP */
				'fbWallPopup': {
					'options': {
						'active': 0,
						'cancel': 0,
						'post': 0,
						'privacyLevel': null,
					},
					'privacyLevelList': {'values': [80, 50, 40, 10], 'labels': ['public', 'amis d\'amis', 'amis', 'privé']},
					'confPanel': function( $section ){
						console.info('KOC fbWallPopup confPanel function');
						var code = '<h3>Popup facebook pour poster sur le mur</h3>'
							+ '<div>'
							+ KOC.shared.generateCheckbox('fbWallPopup', 'active', 'Activer le module', KOC.conf.fbWallPopup.active)
							+ KOC.shared.generateRadio('fbWallPopup', 'action', ['cancel', 'post'], ['annulation automatique', 'publication automatique'], [KOC.conf.fbWallPopup.cancel, KOC.conf.fbWallPopup.post])
							+ KOC.shared.generateSelect('fbWallPopup', 'privacyLevel', 'niveau de visibilité', KOC.conf.fbWallPopup.privacyLevel, KOC.fbWallPopup.privacyLevelList)
							+ '</div>';

						$section.append( code );
					},
					'on': function(){
						console.info('koc fbWallPopup on function');
					},
					'off': function(){
						console.info('koc fbWallPopup off function');
					},
				},
			/* CHAT */
				'chat': {
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
						var code = '<h3>Chat</h3>'
							+ '<div>'
							+ KOC.shared.generateCheckbox('chat', 'active', 'Activer le module', KOC.conf.chat.active)
							+ KOC.shared.generateCheckbox('chat', 'moveable', 'Chat déplacable et redimensionnable', KOC.conf.chat.moveable)
							+ KOC.shared.generateCheckbox('chat', 'cleanHelp', 'Aider automiquement et masquer les demandes', KOC.conf.chat.cleanHelp)
							+ KOC.shared.generateButton('chat', 'onRight', 'Repositionner le chat à droite')
							+ KOC.shared.generateCheckbox('chat', 'highlightLeaders', 'Changer la couleur des messages de la chancellerie (chats Général et Alliance)', KOC.conf.chat.highlightLeaders)
							+ KOC.shared.generateButton('chat', 'getLeadersList', 'Raffraîchir la liste des joueurs de la chancellerie')
							+ KOC.shared.generateCheckbox('chat', 'highlightFriends', 'Changer la couleur des messages des amis (chat Général)', KOC.conf.chat.highlightFriends)
							+ KOC.shared.generateCheckbox('chat', 'highlightFoes', 'Changer la couleur des messages des ennemis (chat Général)', KOC.conf.chat.highlightFoes)
							+ KOC.shared.generateButton('chat', 'cleanFriendsList', 'Vider la liste d\'amis')
							+ KOC.shared.generateButton('chat', 'cleanFoesList', 'Vider la liste d\'ennemis')
							+ '</div>';

						$section.append( code );
					},
					'modPanel': function(){
						console.info('KOC chat modPanel function');
						var $section = KOC.$confPanel.find('#koc-chat').html('');

						var friends = '';
						for(var i = 0; i < KOC.chat.friendsList.length; i++ ){
							friends += '<li><a href="#">'+ KOC.chat.friendsList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
						}

						var foes = '';
						for(var i = 0; i < KOC.chat.foesList.length; i++ ){
							foes += '<li><a href="#">'+ KOC.chat.foesList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
						}

						$section.append('<h3>Liste d\'amis</h3>'
								+ '<p><label for="koc-friend">Joueur : </label>'
								+ '<input type="text" name="koc-friend" id="koc-friend" />'
								+ '<button rel="friends">Ajouter</button></p>'
								+ '<ul class="koc-chat-list" rel="friends">' + friends + '</ul>'
								+ '<h3>Liste d\'ennemis</h3>'
								+ '<p><label for="koc-foe">Joueur : </label>'
								+ '<input type="text" name="koc-foe" id="koc-foe" />'
								+ '<button rel="foes">Ajouter</button></p>'
								+ '<ul class="koc-chat-list" rel="foes">' + foes + '</ul>'
							)
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
									var f = '';
									for(var i = 0; i < KOC.chat[list].length; i++ ){
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
										setTimeout(function(){ hideChatRules(); }, 500);
									}
								};
								setTimeout(function(){ hideChatRules(); }, 500);
							}

						//highlightleaders
							if( KOC.conf.chat.highlightLeaders ){
								KOC.chat.highlightLeadersOn();
							}

						//highlightFriendsAndFoes
							try{
								var persistentFriendsList = localStorage.getObject('koc_chat_friends_list_' + KOC.server);
								if( persistentFriendsList ){
									KOC.chat.friendsList = persistentFriendsList;
								}
							} catch(e){
								console.error(e);
							}

						//highlightFoes
							try{
								var persistentFoesList = localStorage.getObject('koc_chat_foes_list_' + KOC.server);
								if( persistentFoesList ){
									KOC.chat.foesList = persistentFoesList;
								}
							} catch(e){
								console.error(e);
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
									'helper': "original",
									'handle': '.drag-handle',
									'stop': function(event, ui){
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
								})
								.prepend( $dragHandle.clone() );

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
								.css({'top': 0, 'left': 0})
								.find('.drag-handle').remove();
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
								setTimeout(function(){
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
							localStorage.setObject('koc_chat_friends_list_' + KOC.server, KOC.chat.friendsList);
						},
						'cleanFriendsList': function(){
							console.info('KOC cleanFriendsList function');
							KOC.chat.friendsList = [];
							localStorage.setObject('koc_chat_friends_list_' + KOC.server, '');
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
							localStorage.setObject('koc_chat_foes_list_' + KOC.server, KOC.chat.foesList);
						},
						'cleanFoesList': function(){
							console.info('KOC cleanFoesList function');
							KOC.chat.foesList = [];
							localStorage.setObject('koc_chat_foes_list_' + KOC.server, '');
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
				},
			/* OVERVIEW */
				'overview': {
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
					'parts': {
						'population': 'population',
						'troops': 'unités',
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
						var code = '<h3>Vue globale</h3>'
							+ '<div>'
							+ KOC.shared.generateRadio('overview', 'action', ['replace', 'moveable'], ['Remplace le dessous du jeu (ne pas oublier de mettre le chat à droite)', 'Vue globale déplacable et redimensionnable'], [KOC.conf.overview.replace, KOC.conf.overview.moveable])
							+ KOC.shared.generateButton('overview', 'resetPlacement', 'Remise à zéro de la position')
							+ KOC.shared.generateButton('overview', 'resetDimensions', 'Remise à zéro des dimensions')
							+ '</div>';

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

						//parts toggles checkboxes
							var toggles = '<p class="overview-parts-toggles">';
							for( var p in KOC.overview.parts ){
								if( KOC.overview.parts.hasOwnProperty(p) ){
									toggles += '<input type="checkbox" id="overview-'+ p +'" name="'+ p +'" '+ (KOC.conf.overview.parts_visible[p] ? 'checked' : '' ) +'>'
											+  '<label for="overview-'+ p +'">'+ KOC.overview.parts[p] +'</label>';
								}
							}
							toggles += '</p>';

						//headers
						//data line for cities
							for( var i = 0; i < KOC.cities.length; i++ ){
								headers += '<th title="'+ KOC.cities[i].name +'">'+ window.roman[i] +'</th>';
								dataLine += '<td>&nbsp;</td>';
								sizer += '<td></td>';
							}
							headers += '</tr></thead>';
							cols += i;
							sizer += '</tr>';

						dataTable += headers + '<tbody>' + sizer;

						//bodies
							var left = 0;
							for( var p in KOC.overview.parts ){
								if( KOC.overview.parts.hasOwnProperty(p) ){
									dataTable += '<tr class="'+ p +'">'
											  +  '<th colspan="'+ cols +'" class="'+ p +'">'
											  +  KOC.overview.parts[p]
											  + '</th>'
											  +  '</tr>';
									for( var i = 0; i < KOC[p].length; i++ ){
										if( !KOC[p][i].hasOwnProperty('label') && KOC[p][i].hasOwnProperty('key') ){
											KOC[p][i].label = window.resourceinfo[ KOC[p][i].key ];
										}
										var rowspan = KOC[p][i].rows;
										if( rowspan ){
											for( var j = 0; j < rowspan; j++ ){
												dataTable += '<tr class="'+ p +'">'
														  +  (j == 0 ? '<td class="img" rowspan="'+ rowspan +'"><img src="'+ KOC[p][i].icon +'"></td>' : '')
														  +  '<td class="label">'+ KOC[p][i].label[j] +'</td>'
														  +  '<td class="sum"></td>'
														  +  dataLine + '</tr>';
											}
										} else {
											dataTable += '<tr class="'+ p +'">'
													  +  '<td class="img"><img src="'+ KOC[p][i].icon +'"></td>'
													  +  '<td class="label">'+ KOC[p][i].label +'</td>'
													  +  '<td class="sum"></td>'
													  +  dataLine + '</tr>';
										}
									}
								}
							}

						dataTable += '</tbody></table>';

						$overview.append( toggles + '<div class="wrap">' + dataTable + '</div>' );

						$body.append( $overview );
						KOC.$overview = $('#koc-overview');
						KOC.overview.$toggles = KOC.$overview.find('.overview-parts-toggles');
						KOC.overview.$wrap = KOC.$overview.find('.wrap');
						KOC.overview.$table = $('#koc-overview-data');
						KOC.overview.$header = KOC.overview.$table.find('thead');
						KOC.overview.$headersThs = KOC.overview.$header.find('th');
						KOC.overview.$tbody = KOC.overview.$table.find('tbody');
						KOC.overview.$cityTds = KOC.overview.$tbody.find('.sizer').find('td');
						KOC.overview.$tbodyTrs = KOC.overview.$tbody.find('tr').filter(':not(.sizer)');

						KOC.$overview
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
								.on('click', '.overview-parts-toggles input', function(e){
									var $this = $(this),
										name = this.name,
										checked = $this.is(':checked');

									KOC.overview.$tbodyTrs.filter( '.' + name ).toggle( checked );

									KOC.conf.overview.parts_visible[ name ] = checked;

									KOC.shared.storeConf();
								});

						KOC.overview.$toggles.find('input').each(function(){
							var $this = $(this),
								name = this.name,
								checked = $this.is(':checked');
							KOC.overview.$tbodyTrs.filter( '.' + name ).toggle( checked );
						});

						KOC.overview.updateFromSeed();

						if( KOC.conf.overview.moveable ){
							KOC.overview.moveableOn();
						} else if( KOC.conf.overview.replace ){
							KOC.overview.replaceOn();
						}
					},
					'off': function(){
						console.info('KOC overview off function');
						$('#koc-overview-css').remove();
						KOC.$overview.remove();
						KOC.$overview = null;
					},
					'updateFromSeed': function(){
						console.info('KOC overview updateFromSeed function', window.seed);
						var $popTrs = KOC.overview.$tbodyTrs.filter('.population').filter(':not(:first)'),
							$resTrs = KOC.overview.$tbodyTrs.filter('.resources').filter(':not(:first)'),
							$resCapTrs = KOC.overview.$tbodyTrs.filter('.resources_cap').filter(':not(:first)'),
							$resProdDetailTrs = KOC.overview.$tbodyTrs.filter('.resources_production_detail').filter(':not(:first)'),
							$resProdBarbarianTrs = KOC.overview.$tbodyTrs.filter('.resources_production_barbarian').filter(':not(:first)'),
							$resConsoTrs = KOC.overview.$tbodyTrs.filter('.resources_consumption').filter(':not(:first)'),
							$resProdTotalTrs = KOC.overview.$tbodyTrs.filter('.resources_production_total').filter(':not(:first)'),
							$resAutonomyTrs = KOC.overview.$tbodyTrs.filter('.resources_autonomy').filter(':not(:first)'),
							$troopsTrs = KOC.overview.$tbodyTrs.filter('.troops').filter(':not(:first)'),
							$defensesTrs = KOC.overview.$tbodyTrs.filter('.defenses').filter(':not(:first)');

						for( var i = 0; i < KOC.citiesId.length; i++ ){
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

												for( var j = 0; j < KOC.troops.length; j++ ){
													if( !barbariansTroops[j] ) barbariansTroops[j] = 0;
													barbariansTroops[j] += parseFloat(marche['unit'+ ( j + 1 ) +'Count']);
												}
											}
										}
									}
								}

							//population
								var line = 0;
								for( var j = 0; j < KOC.population.length; j++ ){
									var type = KOC.population[j];
									if( type.rows ){
										for( var k = 0; k < type.rows; k++ ){
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

											line++;
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

										line++;
									}
								}

							//resources
								for( var j = 0; j < KOC.resources.length; j++ ){
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
								for( var j = 0; j < KOC.resources_cap.length; j++ ){
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
										for( var j = 0; j < seed.wilds.length; j++ ){
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

								for( var j = 0; j < KOC.resources_production_detail.length; j++ ){
									var type = KOC.resources_production_detail[j],
										r = j + 1; //no gold
									if( type.rows ){
										for( var k = 0; k < type.rows; k++ ){
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

											line++;
										}
									}
								}

							//resources from barbarian camps
								for( var j = 0; j < KOC.resources_production_barbarian.length; j++ ){
									var $tds = $resProdBarbarianTrs.eq(j).find('td'),
										$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
										n = 0;
									if( barbariansRes.length ){
										for( var k = 0; k < barbariansRes.length; k++ ){
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
								for( var j = 0; j < KOC.resources_consumption.length; j++ ){
									var type = KOC.resources_consumption[j];
									if( type.rows ){
										for( var k = 0; k < type.rows; k++ ){
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

											line++;
										}
									}
								}

							//resources production total
								for( var j = 0; j < KOC.resources_production_total.length; j++ ){
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
								for( var j = 0; j < KOC.resources_autonomy.length; j++ ){
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
											$td.html('0s')
										} else {
											var n = s / total[j] * 3600;
											$td.html( KOC.shared.readableDuration( n ) );
										}
									} else {
										$td.html('-');
									}
								}

							//troops
								var line = 0;
								for( var j = 0; j < KOC.troops.length; j++ ){
									var type = KOC.troops[j];
									if( type.rows ){
										for( var k = 0; k < type.rows; k++ ){
											var $tds = $troopsTrs.eq( line ).find('td'),
												$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
												n = null;

											if( type.label[k] == 'en CB' && barbariansTroops.length ){
												n = ( barbariansTroops[j] ? parseFloat( barbariansTroops[j] ) : 0 );
											} else if( seed.units[ type.name ] ){
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

											line++;
										}
									}
								}

							//defenses
								for( var j = 0; j < KOC.defenses.length; j++ ){
									var type = KOC.defenses[j];
									if( type.rows ){
										for( var k = 0; k < type.rows; k++ ){
											var $tds = $defensesTrs.eq( j ).find('td'),
												$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i ),
												n = null;

											if( seed.defenses[ type.name ] ){
												n = parseFloat( seed.defenses[ type.name ] );
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
								}
						}

						KOC.overview.sums();
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

						var tableH = size.height - KOC.overview.$toggles.height() - KOC.overview.$toggles.position().top - 5;
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

							KOC.$overview
								.prepend('<h3 class="handle">Vue Globale</h3>')
								.prepend( '<span class="ui-icon ui-icon-close"></span>' )
								.draggable({
									'helper': "original",
									'handle': '.handle',
									'stop': function(event, ui){
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
									KOC.$overview.hide();
									KOC.conf.overview.visible = 0;
									KOC.shared.storeConf();
								});

							if( KOC.conf.overview.visible ){
								KOC.$overview.show();

								KOC.overview.calcInnerSizes( KOC.conf.overview.size );
							}

							var $kocOverviewToggle = $('<button id="koc-overview-toggle">').text('Vue Globale');
							$kocOverviewToggle.click(function(){
								console.info('$kocOverviewToggle click');
								KOC.$overview.toggle();

								if( KOC.$overview.is(':visible') ){
									KOC.overview.calcInnerSizes( KOC.conf.overview.size );
								}

								KOC.conf.overview.visible = (KOC.$overview.is(':visible') ? 1 : 0);
								KOC.shared.storeConf();
							});

							KOC.$buttons.append($kocOverviewToggle);
						},
						'moveableOff': function(){
							console.info('KOC overview moveableOff function');
							KOC.$overview
								.draggable('destroy')
								.resizable('destroy')
								.find('.handle, .ui-icon-close').remove();
						},
						'resetPlacement': function(){
							console.info('KOC overview resetPlacement function');
							if( KOC.conf.overview.moveable ){
								//console.log(KOC.$overview);
								//console.log(KOC.overview.options.position);
								KOC.$overview.css( KOC.overview.options.position );
								KOC.conf.overview.position = KOC.overview.options.position;
								KOC.shared.storeConf();
							}
						},
						'resetDimensions': function(){
							console.info('KOC overview resetDimensions function');
							if( KOC.conf.overview.moveable ){
								//console.log(KOC.$overview);
								//console.log(KOC.overview.options.size);
								KOC.$overview.css( KOC.overview.options.size );
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

							KOC.$overview.css({
								'height': $b.outerHeight() + $f.outerHeight(),
								'width': $b.outerWidth(),
								'top': p.top,
								'left': p.left,
							});

							$b.hide();
							$f.hide();
							KOC.$overview.show();

							KOC.overview.calcInnerSizes({'height': h, 'width': w});

							$('#koc-overview-toggle').remove();
						},
						'replaceOff': function(){
							console.info('KOC overview replaceOff function');

							$('#kocmain_bottom').show().siblings('.panel_fiendlist').show();
						},
				},
			/* CREST HUNT */
				'crestHunt': {
					'options': {
						'active': 1,
						'automatic': 0,
					},
					'stored': ['attacks'],
					'attacks': {}, //by city id and attack id
					'onGoingAttacks': {},
					'confPanel': function( $section ){
						console.info('KOC crestHunt confPanel function');
						var code = '<h3>Armoiries</h3>'
							+ '<div>'
							+ KOC.shared.generateCheckbox('crestHunt', 'active', 'Activer le module', KOC.conf.crestHunt.active)
							+ KOC.shared.generateCheckbox('crestHunt', 'automatic', 'Lancer les attaques automatiques', KOC.conf.crestHunt.automatic)
							+ KOC.shared.generateButton('crestHunt', 'deleteAllPlans', 'Supprimer toutes les attaques enregistrées')
							+ '</div>';

						$section.append( code );
					},
					'modPanel': function(){
						console.info('KOC crestHunt modPanel function');
						var $section = KOC.$confPanel.find('#koc-crestHunt').html('');

						var form = '<h3>Configurer une attaque<span class="ui-icon ui-icon-info"></span></h3>'
							+ '<div class="attack-form">'
							+ '<ul class="message"></ul>'
							+ '<input type="hidden" class="edit-attackId" name="attackId" value="" />'
							+ '<input type="hidden" class="edit-cityId" name="cityId" value="" />'
							+ '<fieldset>'
							+ '<legend>Ville</legend>';

						for( var i = 0; i < KOC.cities.length; i++ ){
							var city = KOC.cities[i];
							form += '<input id="koc-crestHunt-city'+ city.id +'" name="city" value="'+ city.id +'" type="radio" class="city-choice" />'
								 +  '<label for="koc-crestHunt-city'+ city.id +'">'+ city.roman + ' ' + city.name +'</label>';
						}

						form += '</fieldset>'
							 +  '<fieldset class="builds">'
							 +  '<legend>Attaques types</legend>'
							 +  '<div>'
							 +  '<button class="build" rel="5">TS5 (emp5)</button>'
							 +  '<button class="build" rel="6">TS6 (emp7)</button>'
							 +  '<button class="build" rel="7">TS7 (emp8)</button>'
							 +  '<button class="build" rel="8">TS8 (emp9)</button>'
							 +  '<button class="build" rel="9">TS9 (emp 9)</button>'
							 +  '<button class="build" rel="9bis">TS9 (emp10)</button>'
							 +  '<button class="build" rel="10">TS10 (emp10)</button>'
							 +  '</div>'
							 +  '</fieldset>'
							 +  '<fieldset>'
							 +  '<legend>Coordonnées</legend>'
							 +  '<label>Niveau&nbsp;:&nbsp;</label>'
							 +  '<input type="text" class="targetLevel" />'
							 +  '<small>format: x,y x,y x,y ...</small>'
							 +  '<textarea name="coords"></textarea>'
							 +  '</fieldset>';

						KOC.crestHunt.$waveSkeleton = $('<fieldset class="wave">'
							 +	'<legend>Vague</legend>'
							 +	'<label>Chevalier&nbsp;:&nbsp;</label><select class="knight-choice" name="knight">'
							 +	'<option value="">N\'importe lequel</option>'
							 +	'</select>'
							 +	'<div class="unit-block">'
							 +	'<label>Unité&nbsp;:&nbsp;</label><select class="unit-choice">'
							 +	'<option value="">Choisir</option>'
							 +	'</select>'
							 +	'<label>Quantité&nbsp;:&nbsp;</label><input class="unit-qty" type="text" />'
							 +	'</div>'
							 +	'<button class="add-unit">Ajouter une autre unité</button>'
							 +	'</fieldset>');

						form += '<fieldset class="keep">'
							 +	'<legend>Conserver</legend>'
							 +	'<div class="unit-block">'
							 +	'<label>Unité&nbsp;:&nbsp;</label><select class="unit-choice">'
							 +	'<option value="">Choisir</option>'
							 +	'</select>'
							 +	'<label>Quantité&nbsp;:&nbsp;</label><input class="unit-qty" type="" />'
							 +	'</div>'
							 +	'<button class="add-unit">Ajouter une autre unité</button>'
							 +	'</fieldset>'
							 +  '<button class="add-wave">Ajouter une vague</button>'
							 +	'<button class="launch">Lancer</button>'
							 +	'<button class="save">Sauvegarder</button>'
							 +	'<button class="saveAndLaunch">Sauvegarder et Lancer</button>'
							 +	'<button class="reset">Annuler</button>'
							 +	'</div>';

						//attacks list
						var onGoing = '<h3>Attaques en cours</h3>'
							 +  '<div class="attack-list ongoing">';

						var savedAttacks = '<h3>'
							 +  KOC.shared.generateCheckbox('crestHunt', 'automatic', 'mode automatique', KOC.conf.crestHunt.automatic)
							 +  'Attaques enregistrées</h3>'
							 +  '<div class="attack-list saved">';

						for( var i = 0; i < KOC.cities.length; i++ ){
							var city = KOC.cities[i];
							var line = '<h3>' + city.roman + ' ' + city.name + '</h3>'
								 +  '<ul data-city="'+ city.id +'"></ul>';

							onGoing += line;
							savedAttacks += line;
						}
						onGoing += '</div>';
						savedAttacks += '</div>';

						var help = '<div id="koc-crestHunt-help" class="help" title="Aide armoiries"><ul>'
							+ '<li>Les terres sauvages occupées ne seront pas attaquées (vérification pour chaque coordonnée à chaque attaque)</li>'
							+ '<li>Une attaque sera annulée au bout de 10 erreurs consécutives <br />(coordonnée occupée, aucun chevalier, point de ralliement plein, pas assez de troupes, ...)</li>'
							+ '<li>Les attaques sauvegardées peuvent être lancées manuellement ou via le mode automatique</li>'
							+ '<li>Pour le formulaire les erreurs seront listées au-dessus</li>'
							+ '<li>Pour les attaques sauvegardées les erreurs seront listées en-dessous</li>'
							+ '<li>Si une vague est en erreur les vagues précédentes seront rappelées (sous réserves des limitations de temps de marche restant)</li>'
							+ '</ul><ol>'
							+ '<li>Sélectionner une ville</li>'
							+ '<li>Spécifier une ou plusieurs coordonnées (séparées par un retour à la ligne, sous le format x,y)</li>'
							+ '<li>Remplir les vagues d\'attaques (manuellement ou via les attaques préprogrammées)</li>'
							+ '<li>Les quantités de troupes peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2M pour deux millions, 3G pour trois milliards)</li>'
							+ '<li>Spécifier les quantités de troupes à conserver (optionnel)</li>'
							+ '</ol></div>';

						$section.append( form + onGoing + savedAttacks + help )
							//automatic toggle (function call will be done by $confPanel event listener
							.on('change', '.conf-toggle', function(){
								//KOC.$confPanelNav.find('#koc-crestHunt').parent().toggleClass('on off');
								KOC.crestHunt.$saved.find('.charge').hide();
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
										var d = new Date();
										result.attack.id = Math.floor(d.getTime() / 1000);
										KOC.crestHunt.launchAttack( result.attack );
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

									if( $(this).hasClass('saveAndLaunch') ) KOC.crestHunt.launchAttack( result.attack );
								}
							})
							//attack plan delete
							.on('click', '.delete', function(){
								var $this = $(this),
									$li = $(this).parent(),
									isEdit = $this.hasClass('edit'),
									attackId = $li.data('attack'),
									cityId = $li.data('city');

								KOC.crestHunt.deletePlan( attackId, cityId, true );
								$li.remove();
							})
							//attack plan edit and duplication
							.on('click', '.edit, .duplicate', function(){
								KOC.crestHunt.resetForm();
								var $this = $(this),
									$li = $this.parent(),
									attackId = $li.data('attack'),
									cityId = $li.data('city'),
									attack = KOC.crestHunt.attacks[ cityId ][ attackId ];

								if( attack ){
									KOC.crestHunt.$form.find('.keep, .add-wave, .save, .launch, .saveAndLaunch, .builds').show();

									if( $this.hasClass('edit') ){
										KOC.crestHunt.$form.find('.edit-attackId').val( attack.id );
										KOC.crestHunt.$form.find('.edit-cityId').val( attack.cityId );
									}

									KOC.crestHunt.$form.find('.city-choice').filter('[value='+ cityId +']').prop('checked', true);
									KOC.crestHunt.$form.find('textarea').val(attack.coords.join("\n"));

									KOC.crestHunt.addWaves( attack.waves.length, attack.cityId );

									var $waves = KOC.crestHunt.$form.find('.wave');
									for( var i = 0; i < attack.waves.length; i++ ){
										var $wave = $waves.eq(i),
											wave = attack.waves[i];

										$wave.find('.knight-choice').val( wave.knight );

										if( wave.units.length > 1 ){
											for( var j = 1; j < wave.units.length; j++ ){
												$wave.find('.add-unit').trigger('click');
											}
										}

										var $blocks = $wave.find('.unit-block');
										for( var j = 0; j < wave.units.length; j++ ){
											var $b = $blocks.eq(j),
												unit = wave.units[j];
											$b.find('.unit-choice').val( unit.id );
											$b.find('.unit-qty').val( KOC.shared.format( unit.qty ) );
										}
									}

									var $keep = KOC.crestHunt.$form.find('.keep');
									if( attack.keep.length > 1 ){
										for( var i = 1; i < attack.keep.length; i++ ){
											$keep.find('.add-unit').trigger('click');
										}
									}

									var $blocks = $keep.find('.unit-block');
									for( var i = 0; i < attack.keep.length; i++ ){
										var unit = attack.keep[i];

										var $b = $blocks.eq(i);
										$b.find('.unit-choice').val( unit.id );
										$b.find('.unit-qty').val( KOC.shared.format( unit.qty ) );
									}
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
								var $li = $(this).parent();
								var attack = KOC.crestHunt.attacks[ $li.data('city') ][ $li.data('attack') ];
								if( attack ){ attack.stop = 1; }
							})
							//manual launch
							.on('click', '.charge', function(){
								if( KOC.conf.crestHunt.active ){
									if( !KOC.conf.crestHunt.automatic ){
										var $li = $(this).hide().parent();
										var attack = KOC.crestHunt.attacks[ $li.data('city') ][ $li.data('attack') ];
										if( attack ){
											attack.lastCoordIndex = 0;
											attack.abort = 0;
											KOC.crestHunt.launchAttack( attack );
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

						KOC.crestHunt.$form = $section.find('.attack-form');
						KOC.crestHunt.$saved = $section.find('.attack-list.saved');
						KOC.crestHunt.$ongoing = $section.find('.attack-list.ongoing');

						KOC.crestHunt.$saved.accordion({collapsible: true, autoHeight: false}).find('h3').eq(0).click().blur();
						KOC.crestHunt.$ongoing.accordion({collapsible: true, autoHeight: false}).find('h3').eq(0).click().blur();
					},
					'on': function(){
						console.info('KOC crestHunt on function');
						try{
							var persistentCrestHuntAttacks = localStorage.getObject('koc_crestHunt_attacks_' + KOC.server);
							if( persistentCrestHuntAttacks ){
								KOC.crestHunt.attacks = persistentCrestHuntAttacks;

								for( var i = 0; i < KOC.citiesId.length; i++ ){
									KOC.crestHunt.listCityAttacks( KOC.citiesId[i] );
								}

								KOC.crestHunt.$saved.find('.charge').toggle( KOC.conf.crestHunt.automatic );
							}
						} catch(e){
							console.error(e);
						}

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
						//launching stored attacks
						for( var c in KOC.crestHunt.attacks ){
							if( KOC.crestHunt.attacks.hasOwnProperty(c) ){
								var attacks = KOC.crestHunt.attacks[c];
								for( a in attacks ){
									if( attacks.hasOwnProperty(a) ){
										KOC.crestHunt.launchAttack( attacks[a] );
									}
								}
							}
						}

						KOC.crestHunt.$saved.find('.charge').hide();
					},
					'automaticOff': function(){
						console.info('KOC crestHunt automaticOff function');
						//show all manual launch buttons
						KOC.crestHunt.$saved.find('.charge').show();

						//hide the on going attacks one
						KOC.crestHunt.$onGoing.find('li').each2(function(i, $li){
							KOC.crestHunt.$saved.find('li').filter('[data-city='+ $li.data('city') +'][data-attack='+ $li.data('attack') +']').find('.charge').hide();
						});
					},
					'storeAttacks': function(){
						console.info('KOC crestHunt storeAttacks function');
						try{
							localStorage.setObject('koc_crestHunt_attacks_' + KOC.server, KOC.crestHunt.attacks);
						} catch(e){
							alert(e);
						}
					},
					'planAttack': function(){
						console.info('KOC crestHunt planAttack function');
						var $waves = KOC.crestHunt.$form.find('.wave'),
							$keep = KOC.crestHunt.$form.find('.keep'),
							$cityChoice = KOC.crestHunt.$form.find('.city-choice').filter(':checked'),
							level = parseInt( $.trim( KOC.crestHunt.$form.find('.targetLevel').val() ) ),
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
								var wrongGPS = false;
								for( var i = 0; i < coords.length; i++ ){
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
										var u = $.trim( $b.find('.unit-choice').val() ),
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
								} else {
									if( unitList.length && $.inArray(u, unitList) > -1 ){
										attack.keep.push({'id': u, 'qty': q});
									} else {
										errors.push('L\'unité à conserver ne correspond pas à une des unités de l\'attaque.');
									}
								}
							});

							if( errors.length ){
								errors = errors.unique();
							}

						return {'attack': attack, 'errors': errors};
					},
					'launchAttack': function( attack ){
						console.info('KOC crestHunt launchAttack function', attack);
						if( !KOC.conf.crestHunt.active ){
							return;
						}

						if( !attack.hasOwnProperty('abort') ) attack.abort = 0;

						if( attack.stop ){
							attack.aborts.push('Attaque stoppée sur demande.');
							KOC.crestHunt.refreshOngoingInfo(attack, true);
							return;
						}

						if( attack.abort > 10 ){
							attack.aborts.push('Trop d\'erreurs détectées. Attaque stoppée.');
							KOC.crestHunt.refreshOngoingInfo(attack, true);
							return;
						}

						//check previous marches
						if( attack.marching.length ){
							if( window.seed.queue_atkp[ attack.cityId ] ){
								var d = new Date(),
									ts = d.getTime();
								var params = window.g_ajaxparams;
								for( var i = 0; i < attack.marching.length; i++ ){
									//debug
									KOC.shared.fetchMarch(attack.marching[i]);

									var m = window.seed.queue_atkp[ 'city' + attack.cityId ][ 'm' + attack.marching[i] ];
									if( m && m.marchStatus == 0 && m.returnUnixTime < ts ){ //status unknown and return time in the past
										for( var j = 1; j < 13; j++ ){
											if( m['unit'+ j +'Count'] > 0 && m['unit'+ j +'Return'] == 0 ){
												params.rid = attack.marching[i];
												$.ajax({
													url: window.g_ajaxpath + "ajax/fetchMarch.php" + window.g_ajaxsuffix,
													async: false,
													type: 'post',
													data: params,
													dataType: 'json',
													success: function(result){
														console.debug( result );
													}
												});
											}
										}
									}
								}
							}
						}

						attack.marching = [];
						attack.aborts = [];
						var abort = false;
						debug[ 'c' + attack.cityId ] = [];

						var defaultParams = window.g_ajaxparams;
						if( defaultParams == null ){
							alert('Paramètres ajax manquant. Raffraîchissez la page.');
							return;
						}

						defaultParams.cid = attack.cityId;
						defaultParams.type = 4; //MARCH_TYPE_ATTACK

						//check rally point slots
						var slots = KOC.shared.getRallyPointLevel(attack.cityId);
						if( slots == 12 ) slots--; //eleven armies at level 12
						for( a in window.seed.queue_atkp[attack.cityId] ){
							if( window.seed.queue_atkp[attack.cityId].hasOwnProperty(a) ) slots--;
						}

						if( slots < attack.waves ){
							abort = true;
							attack.aborts.push('Pas assez de place dans le point de ralliement.');
						}

						if( !abort ){
							if( attack.lastCoordIndex == attack.coords.length ){
								if( !KOC.conf.crestHunt.automatic ){
									attack.aborts.push('Attaque finie.');
									KOC.crestHunt.refreshOngoingInfo(attack, true);
									KOC.shared.updateSeed();
									KOC.shared.freeKnights( attack.cityId );
									return;
								}

								attack.lastCoordIndex = 0;
							}

							var coord = null,
								time = null;
							for( var i = attack.lastCoordIndex; i < attack.coords.length; i++ ){
								//check claim on the target
								var params = window.g_ajaxparams,
									gps = attack.coords[ i ].split(',');
									validCoord = false;

								var x = Math.floor(parseInt(gps[0], 10) / 5) * 5;
								var y = Math.floor(parseInt(gps[1], 10) / 5) * 5;

								params.blocks = "bl_" + x + "_bt_" + y;

								$.ajax({
									url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
									async: false,
									type: 'post',
									data: params,
									dataType: 'json',
									success: function(result){
										if( result.data ){
											var info = result.data['l_'+ gps[0] +'_t_'+ gps[1]];
											if( info ){
												console.log('fetchMapTiles info for', attack.coords[ i ]);
												var type = parseInt(info.tileType, 10);
												if( type <= 0 || type > 50 ){
													attack.aborts.push('Coordonnées '+ KOC.shared.mapLink(attack.coords[ i ]) +' n\'est pas une terre sauvage.');
												} else if( info.tileUserId != null && info.tileUserId != "0" ){
													attack.aborts.push('Coordonnées '+ KOC.shared.mapLink(attack.coords[ i ]) +' occupées.');
												} else if( info.tileLevel != attack.targetLevel ){
													attack.aborts.push('Coordonnées '+ KOC.shared.mapLink(attack.coords[ i ]) +' n\'est pas du niveau spécifié.');
												} else {
													validCoord = true;
												}
											} else {
												attack.aborts.push('Informations sur '+ KOC.shared.mapLink(attack.coords[ i ]) +' manquantes.');
											}
										}
									},
									error: function(){
										attack.aborts.push('Informations sur '+ KOC.shared.mapLink(attack.coords[ i ]) +' introuvables.');
									},
								});

								if( validCoord ){
									coord = gps;
									break;
								}
							}

							if( coord == null ){
								abort = true;
								attack.aborts.push('Aucune coordonnée validée pour l\'attaque.');
								KOC.crestHunt.refreshOngoingInfo(attack, false);
							}
						}

						if( !abort && coord ){
							defaultParams.xcoord = coord[0];
							defaultParams.ycoord = coord[1];

							defaultParams.gold = 0;
							defaultParams.r1 = 0;
							defaultParams.r2 = 0;
							defaultParams.r3 = 0;
							defaultParams.r4 = 0;
							defaultParams.r5 = 0;
							defaultParams.items = '';

							var params = defaultParams;

							//find back lost knights
							KOC.shared.freeKnights( attack.cityId );

							//console.log('waves loop');
							for( var i = 0; i < attack.waves.length; i++ ){
								if( abort ) break; //previous wave ko
								console.log('wave', i+1, attack.waves[i]);
								var resources = [0, 0, 0, 0, 0],
									unitsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									wave = attack.waves[i],
									knights = KOC.shared.getAvailableKnights( attack.cityId ),
									knight = null;

								//console.log('knight check');
								if( !knights.length ){
									attack.aborts.push('Aucun chevalier disponible.');
									abort = true;
								} else {
									//check knight
									if( wave.knight == '' ){
										knight = knights[0].knightId;
									} else {
										for( var k in knights ){
											if( knights.hasOwnProperty(k) ){
												if( wave.knight == knights[k].knightId ){
													knight = knights[k].knightId;
													break;
												}
											}
										}
										if( knight == null ){
											attack.aborts.push('Chevalier indisponible.');
											abort = true;
										}
									}
								}

								if( !abort ){
									params.kid = knight;
									//console.log('unit check');

									units = window.seed.units[ 'city' + attack.cityId ];
									for( var j = 0; j < wave.units.length; j++ ){
										var unit = wave.units[j];
										var unitKey = unit.id.replace(/nt/, '');
										var unitNum = parseInt(unit.id.replace(/unt/, ''), 10); //for unitsArr, 0 based
										var qty = parseFloat(unit.qty);
										params[ unitKey ] = qty;
										unitsArr[ unitNum ] = qty;

										//console.log('wave', i+1, 'unit', j+1, unit);

										var available = parseFloat(units[ unit.id ]);
										//check troops
										if( available < qty ){
											attack.aborts.push('Pas assez de troupe ('+ window.unitcost[ unit.id ][0] +').');
											abort = true;
											break;
										} else {
											for( var k = 0; k < attack.keep.length; k++ ){
												var keep = attack.keep[k];
												if( unit.id == keep.id && available - qty < parseFloat(keep.qty) ){
													attack.aborts.push('Pas assez de troupe ('+ window.unitcost[ unit.id ][0] +') (conservation).');
													abort = true;
													break;
												}
											}
											if( abort ) break;
										}
									}
								}

								if( !abort ){
									console.log('launching attack', params, unitsArr);
									var p = params;
									$.ajax({
										url: window.g_ajaxpath + "ajax/march.php" + window.g_ajaxsuffix,
										async: false,
										type: 'post',
										data: params,
										dataType: 'json',
										success: function( result ){
											if( result.ok ){
												//console.log('wave', i+1, 'launched');
												console.debug('attack launched', result);
												debug[ 'c' + attack.cityId ].push('m' + result.marchId);
												attack.marching.push(result.marchId);
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
													//console.log('update knight status', 'city' + p.cid, 'knt' + p.kid, window.seed.knights[ 'city' + p.cid ][ 'knt' + p.kid ]);

													$('#koc-refresh-seed').trigger('click');
												}
												if( result.updateSeed ) window.update_seed(result.updateSeed);

												window.updateBoosts(result);
												if( result.liftFog ){
													window.update_boosts();
													window.seed.playerEffects.fogExpire = 0;
													window.g_mapObject.getMoreSlots();
												}

												console.log('wave', i+1, 'launched - result parsing done');
											} else {
												console.log('wave', i+1, 'failed to launch');
												if( result.msg ){
													attack.aborts.push('Plan d\'attaque sur '+ attack.coords[ attack.lastCoordIndex ] +' refusé ('+ result.msg +').');
												} else {
													attack.aborts.push('Plan d\'attaque sur '+ attack.coords[ attack.lastCoordIndex ] +' refusé (capcha ?).');
												}
												abort = true;
											}
										},
										error: function(){
											console.log('wave', i+1, 'failed to launch');
											attack.aborts.push('Plan d\'attaque sur '+ attack.coords[ lastCoordIndex ] +' refusé (requête KO).');
											abort = true;
										},
									});
								}

								if( abort && attack.marching.length ){
									console.log('calling back previous waves', attack.marching.length);
									KOC.crestHunt.recallWaves( attack );
								}

								if( !abort && (i + 1) < attack.waves.length ){
									//wait 10 seconds before the next wave
									var date = new Date(), curDate;
									do { curDate = new Date(); }
									while( curDate - date < 10000);
								}
								console.log('end of wave', i + 1);
							}
						}

						KOC.crestHunt.refreshOngoingInfo(attack, false);

						//console.log('after checks and waves launches', attack);
						if( !abort ){
							attack.lastCoordIndex = attack.lastCoordIndex + 1;

							if( KOC.crestHunt.attacks[ attack.cityId ]
								&& KOC.crestHunt.attacks[ attack.cityId ][ attack.id ]
							){
								KOC.crestHunt.attacks[ attack.cityId ][ attack.id ].lastCoordIndex = attack.lastCoordIndex;
								KOC.crestHunt.storeAttacks();
							}
						}

						if( abort ){
							var time = 0;
							attack.abort = attack.abort + 1;
						}

						//console.log('time', KOC.shared.readableDuration(time), time, KOC.shared.readableDuration(time*2));
						time *= 1000; //timestamp in milliseconds in javascript

						//force resfresh
						setTimeout(function(){ console.debug('attack defender recall'); KOC.crestHunt.recallDefenders( attack ); }, time + 30000);

						time *= 2; //round-trip

						setTimeout(function(){ console.debug('attack seed refresh'); KOC.shared.updateSeed(); }, time + 30000);

						//next roundu
						setTimeout(function(){ console.debug('attack next round', attack.id, 'city', attack.cityId); KOC.crestHunt.launchAttack( attack ); }, time + 45000);
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

						var code = '<li data-city="'+ attack.cityId +'" data-attack="'+ attack.id +'">'
							 +  '<span class="form">Depuis ' + city.roman + ' ' + city.name + '</span>'
							 +  '<span class="to">Vers terres sauvages niveau ' + attack.targetLevel + ' en : ' + KOC.shared.mapLink( attack.coords ) +'</span>';

						var knights = window.seed.knights[ 'city' + city.id ];
						for( var j = 0; j < attack.waves.length; j++ ){
							var wave = attack.waves[j];
							code += '<div class="wave">Vague '+ (j + 1) + '&nbsp;:&nbsp;'
								 +  '<span class="knight">chevalier&nbsp;:&nbsp;'
								 +  ( wave.knight ? knights[ wave.knight ].knightName + '(niveau '+ knights[ attack.knight ].skillPointsApplied +', '+ KOC.shared.getKnightStatText( knight ) +')' : 'n\'importe lequel' )
								 +  '</span>'
								 +  '<span class="troops">';

							var unitsCode = '';
							for( var k = 0; k < wave.units.length; k++ ){
								var unit = wave.units[k];
								if( unitsCode.length ) unitsCode += ', ';

								unitsCode += KOC.shared.format( unit.qty )
										  +  '<img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_'
										  +  unit.id.replace(/unt/, '') + '_50_s34.jpg" title="'+ window.unitcost[ unit.id ][0] +'">';
							}
							code += unitsCode + '</span></div>';
						}

						code += '<div class="wave">Conserver&nbsp;:&nbsp;<span class="troops">'
						var unitsCode = '';
						for( var j = 0; j < attack.keep.length; j++ ){
							var unit = attack.keep[j];
							if( unitsCode.length ) unitsCode += ', ';

							unitsCode += KOC.shared.format( unit.qty )
									  +  '<img src="https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_'
									  +  unit.id.replace(/unt/, '') + '_50_s34.jpg" title="'+ window.unitcost[ unit.id ][0] +'">';
						}
						code += unitsCode + '</span></div>';

						code += '<button class="charge">Lancer</button>'
							 +  '<button class="edit">Modifier</button>'
							 +  '<button class="duplicate">Dupliquer</button>'
							 +  '<button class="delete">Supprimer</button>'
							 +  '<button class="stop">Arrêter au retour des troupes</button>'
							 +  '</li>';

						return code;
					},
					'refreshOngoingInfo': function(attack, noButton){
						console.info('KOC crestHunt refreshOngoingInfo function', noButton, attack);

						var $li = KOC.crestHunt.$ongoing.find('li').filter('[data-city='+ attack.cityId +'][data-attack='+ attack.id +']');
						if( $li.length == 0 ){
							var city = city = KOC.shared.getCityById( attack.cityId );
							var code = '<li data-city="'+ attack.cityId +'" data-attack="'+ attack.id +'">'
								+ '<span class="form">Depuis ' + city.roman + ' ' + city.name + '</span>'
								+ '<span class="to">Vers terres sauvages niveau ' + attack.targetLevel + ' en : ' + KOC.shared.mapLink( attack.coords ) +'</span>'
								+ '<div class="current"></div>'
								+ '<button class="stop">Arrêter au retour des troupes</button>'
								+ '<div class="info"></div></li>';

							$li = $( code );

							KOC.crestHunt.$ongoing.find('ul').filter('[data-city='+ attack.cityId +']').append( $li );
						}

						//attack stopped
						if( noButton ){
							$li.find('.current').remove();
							$li.find('.stop').removeClass('stop').addClass('trash').html('Enlever les informations sur cette attaque.');

							//show the manual launch button
							KOC.crestHunt.$saved.find('li').filter('[data-city='+ attack.cityId +'][data-attack='+ attack.id +']').find('.charge').show();
						} else {
							$li.find('.current').html( 'Attaque vers : ' + KOC.shared.mapLink( attack.coords[ attack.lastCoordIndex ] ) + '(' + (attack.lastCoordIndex + 1) + 'e)' );
						}

						if( attack.aborts.length ){
							attack.aborts = attack.aborts.unique();
							$li.find('.info').html( attack.aborts.join('<br />') );
						}
					},
					'listCityAttacks': function( cityId ){
						console.info('KOC crestHunt listCityAttacks function', cityId);
						var $ul = KOC.crestHunt.$saved.find('ul').filter('[data-city='+ cityId +']');
						$ul.empty();

						var attacks = KOC.crestHunt.attacks[ cityId ],
							code = '';
						if( attacks ){
							for( var a in attacks ){
								if( attacks.hasOwnProperty(a) ){
									code += KOC.crestHunt.attackInfo( attacks[a], cityId );
								}
							}
						}

						$ul.append( code );
					},
					//fill the keep <select> options too
					'addWaves': function( num, cityId ){
						console.info('KOC crestHunt addWaves function', num, cityId);
						if( cityId.indexOf('city') != 0 ) cityId = 'city' + cityId;
						var $clone = KOC.crestHunt.$waveSkeleton.clone();
						$clone.insertBefore( KOC.crestHunt.$form.find('.keep') );
						for( var i = 1; i < num; i++ ){
							$clone.clone().insertBefore( KOC.crestHunt.$form.find('.keep') );
						}

						var knights = KOC.shared.getAvailableKnights( cityId ),
							choices = '';
						for( var i = 0; i < knights.length; i++ ){
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
					'recallWaves': function( attack ){
						console.info('KOC crestHunt recallWaves function', attack);
						if( attack.marching.length ){
							//recall previous waves
							for( var k = 0; k < attack.marching.length; k++ ){
								window.attack_recall(attack.marching[k], 2, attack.cityId);
							}
						}
					},
					'recallDefenders': function( attack ){
						console.info('KOC crestHunt recallDefenders function', attack);
						if( attack.marching.length ){
							//recall previous waves
							for( var k = 0; k < attack.marching.length; k++ ){
								var c = 'city' + attack.cityId,
									m = "m" + attack.marching[k],
									march = window.seed.queue_atkp[c][m];
								if( march && march.marchStatus == 2 ){ //MARCH_STATUS_DEFENDING
									window.attack_recall(attack.marching[k], 1, attack.cityId);
								}
							}
						}
					},
				},
			/* NOTEPAD */
				'notepad':{
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
						var code = '<h3>Bloc-note</h3>'
							+ '<div>'
							+ KOC.shared.generateButton('notepad', 'resetPositionAndDimension', 'Remise à zéro de la position et des dimensions')
							+ KOC.shared.generateButton('notepad', 'clean', 'Supprimer les notes')
							+ '</div>';

						$section.append( code );
					},
					'on': function(){
						console.info('KOC notepad on function');
						$head.append( $('<style id="koc-notepad-css">').text(kocNotepadCss) );

						try{
							var notes = localStorage.getObject('koc_notepad_notes_' + KOC.server);
							if( notes ){
								KOC.notepad.notes = notes;
							}
						} catch(e){
							alert(e);
						}

						var $notepad = $('<div id="koc-notepad" class="ui-widget ui-widget-content ui-corner-all">');

						var code = '<h3 class="handle">Bloc Note</h3><div class="wrap">'
								 + '<label for="koc-notepad-note-name">Nom de la note&nbsp;:&nbsp;</label>'
								 + '<input type="text" id="koc-notepad-note-name" />'
								 + '<label for="koc-notepad-note-text"><span class="charsLeft">1000 caractères restant</span>Contenu&nbsp;:&nbsp;</label>'
								 + '<textarea id="koc-notepad-note-text"></textarea>'
								 + '<br /><button class="save">Enregistrer</button>'
								 + '<button class="cancel">Annuler</button>';

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
								'helper': "original",
								'handle': '.handle',
								'stop': function(event, ui){
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

						KOC.$notepad =  $('#koc-notepad');
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
									KOC.notepad.$charsLeft.text(l + ' caractères restant');
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

						localStorage.setObject('koc_notepad_notes_' + KOC.server, '');

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
						localStorage.setObject('koc_notepad_notes_' + KOC.server, KOC.notepad.notes);
					},
				},
			/* MAP */
				'map': {
					'options': {
						'active': 1,
					},
					'stored': ['search'],
					'search': {},/*{by city, tiles}*/
					'confPanel': function( $section ){
						console.info('KOC map confPanel function');
						var code = '<h3>Carte</h3>'
							+ '<div>'
							+ KOC.shared.generateButton('map', 'cleanSearch', 'Supprimer toutes les recherches géographiques');

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

						var code = '<fieldset class="search"><legend>Recherche</legend>'
							+ '<label for="koc-map-search-type">Type&nbsp;:&nbsp;</label>'
							+ '<select id="koc-map-search-type">'
							+ '<option value="">Choisir</option>'
							+ '<option value="C">Cités</option>'
							+ '<option value="CB">Camps Barbares</option>'
							+ '<option value="TS">Terres Sauvages</option>'
							+ '<option value="FS">Forêts Sombres</option>'
							+ '</select>'
							+ '<br /><label for="koc-map-search-near-x">Autour de&nbsp;:&nbsp;</label>'
							+ '<input type="text" id="koc-map-search-near-x" class="coord" />'
							+ '<input type="text" id="koc-map-search-near-y" class="coord" />'
							+ '<br /><label for="koc-map-search-range-min">Distance&nbsp;:&nbsp;</label>'
							+ '<input type="text" id="koc-map-search-range-min" class="coord" />'
							+ '<input type="text" id="koc-map-search-range-max" class="coord" />'
							+ '<button class="go">Rechercher</button>'
							+ '<button class="cancel">Annuler</button>'
							+ '</fieldset><fieldset class="save">'
							+ '<label for="koc-map-search-city">Sauvegarder la recherche dans la cité&nbsp;:&nbsp;</label>'
							+ '<select id="koc-map-search-city"><option value="">Choisir</option>';

						for( var c in KOC.cities ){
							if( KOC.cities.hasOwnProperty(c) ){
								var city = KOC.cities[c];
								code += '<option value="'+ city.id +'">'+ city.roman + ' ' + city.name +'</option>';
							}
						}

						code += '</select><button>Sauvegarder</button></fieldset>'
							 +  '<fieldset class="filter"><legend>Filter les résultats</legend>'
							 +  '<label for="koc-map-filter-level-min">Niveau de&nbsp;:&nbsp;</label>'
							 +  '<input type="text" id="koc-map-filter-level-min" class="coord" />'
							 +  '<label for="koc-map-filter-level-max">à&nbsp;:&nbsp;</label>'
							 +  '<input type="text" id="koc-map-filter-level-max" class="coord" />'
							 +  '<div class="type">'
							 +  '<input type="checkbox" id="koc-map-filter-type-plaine" value="10" />'
							 +  '<label for="koc-map-filter-type-plaine">Plaine</label>'
							 +  '<input type="checkbox" id="koc-map-filter-type-lac" value="11" />'
							 +  '<label for="koc-map-filter-type-lac">Lac</label>'
							 +  '<input type="checkbox" id="koc-map-filter-type-foret" value="20" />'
							 +  '<label for="koc-map-filter-type-foret">Forêt</label>'
							 +  '<input type="checkbox" id="koc-map-filter-type-colline" value="30" />'
							 +  '<label for="koc-map-filter-type-colline">Colline</label>'
							 +  '<input type="checkbox" id="koc-map-filter-type-montagne" value="40" />'
							 +  '<label for="koc-map-filter-type-montagne">Montagne</label>'
							 +  '</div><div class="status">'
							 +  '<input type="checkbox" id="koc-map-filter-status" />'
							 +  '<label for="koc-map-filter-status">Libre</label>'
							 +  '</div></fieldset><div class="search-result"></div>';

						$section
							.append( code )
							.on('click', '.search .go', function(){
								var type = $('#koc-map-search-type').val(),
									coordX = $.trim( $('#koc-map-search-near-x').val() ),
									coordY = $.trim( $('#koc-map-search-near-y').val() ),
									rangeMin = $.trim( $('#koc-map-search-range-min').val() ),
									rangeMax = $.trim( $('#koc-map-search-range-max').val() ),
									errors = [];

								if( type == '' ){
									errors.push('Veuillez choisir un type.');
								}

								if( coordX == '' || coordY == '' ){
									errors.push('Veuillez spécifier une coordonnée.');
								} else {
									coordX = parseInt(coordX, 10);
									coordY = parseInt(coordY, 10);
									if( coordX && coordY ){
										if( coordX < 0 || coordX > 750 || coordY < 0 || coordY > 750 ){
											errors.push('Coordonnée invalide.');
										}
									} else {
										errors.push('Veuillez spécifier une coordonnée.');
									}
								}

								if( rangeMin == '' && rangeMax == '' ){
									errors.push('Veuillez spécifier une distance.');
								} else {
									rangeMin = parseInt(coordX, 10);
									rangeMax = parseInt(coordY, 10);
									if( rangeMin && rangeMax ){
										if( rangeMin < 0 || rangeMax < 0 || rangeMin > rangeMax ){
											errors.push('Distance invalide.');
										}
									} else {
										errors.push('Veuillez spécifier une distance.');
									}
								}


								if( errors.length ){
									alert( errors.join("\n") );
								} else {
									KOC.map.tmp = null;
									KOC.map.explore( type, coordX, coordY, rangeMin, rangeMax );
									KOC.map.displayResults();

									KOC.map.$save.show();
									KOC.map.$filter.show();
									if( type == 'TS' ){
										KOC.map.$filter.find('.type').show();
									} else {
										KOC.map.$filter.find('.type').hide();
									}
								}
							})
							.on('click', '.search .cancel', function(){
								KOC.map.$search.find('input, select').val('');
								KOC.map.$save.hide();
								KOC.map.$filter.hide();
								KOC.map.$results.empty();
							})
							.on('click', '.save button', function(){
								var cityId = KOC.map.$save.find('select').val();
								if( cityId == '' ){
									alert('Vous devez spécifier une ville pour sauvegarder cette recherche.');
								} else {
									KOC.map.search[cityId] = KOC.map.results;
									KOC.map.storeSearch();
								}
							})
							.on('change', '.filter input', function(){
								var $lis = KOC.map.$result.find('li').hide(),
									min = parseInt( $.trim( $('#koc-map-filter-level-min').val() ) ) || 0,
									max = parseInt( $.trim( $('#koc-map-filter-level-min').val() ) ) || 10,
									isTS = KOC.map.$result.find('ul').hasClass('.TS'),
									product = [];

								for( var i = min; i <= max; i++ ){
									product.push( '.level' + i );
								}

								if( isTS ){
									var $types = KOC.map.$result.find('.type').find('input').filter(':checked');
									if( $types.length ){
										$types.each(function(){
											product.push( '.type' + this.value );
										});
									}
								}

								product = product.reduce(function(previousValue, currentValue, index, array){
									var tmp = [];
									for( var i = 0; i < previousValue.length; i++ ){
										for( var j = 0; j < currentValue.length; j++ ){
											tmp.push(previousValue[i].concat(currentValue[j]));
										}
									}
									return tmp;
								});

								$lis.filter( product.join(',') ).show();
							});

						KOC.map.$search = $('#koc-map').find('.search');
						KOC.map.$save = $('#koc-map').find('.save');
						KOC.map.$filter = $('#koc-map').find('.filter');
						KOC.map.$result = $('#koc-map').find('.search-result');
					},
					'on': function(){
						console.info('KOC map on function');

						try{
							var search = localStorage.getObject('koc_map_search_' + KOC.server);
							if( search ){
								KOC.map.search = search;
							}
						} catch(e){
							alert(e);
						}
					},
					'cleanSearch': function(){
						console.info('KOC map cleanSearch function');
						localStorage.removeItem('koc_map_search_' + KOC.server);
					},
					'cleanSearchForCity': function( cityId ){
						console.info('KOC map cleanSearchForCity function');
						KOC.map.search[cityId] = {};
						localStorage.setObject('koc_map_search_' + KOC.server, KOC.map.search);
					},
					'storeSearch': function(){
						console.info('KOC map storeSearch function');
						localStorage.setObject('koc_map_search_' + KOC.server, KOC.map.search);
					},
					'explore': function( type, coordX, coordY, rangeMin, rangeMax ){
						console.info('KOC map generateSearch function');
						var x = Math.floor(coordX / 5) * 5;
						var y = Math.floor(coordY / 5) * 5;

						var params = window.g_ajaxparams,
							blocks = [];

						for( var i = x - rangeMax; i <= x - rangeMin; i + 5 ){
							for( var j = y - rangeMax; j <= y - rangeMin; j + 5 ){
								blocks.push("bl_" + i + "_bt_" + j);
							}
						}

						params.blocks = blocks.join(',');

						$.ajax({
							url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
							async: false,
							type: 'post',
							data: params,
							dataType: 'json',
							success: function(result){
								if( result.data ){
									KOC.map.tmp = result.data;
								}
							},
							error: function(){
								alert('La requête a échoué.');
							},
						});
					},
					'displayResults': function(){
						console.info('KOC map displayResults function');
						//@todo
					},
				},
			/* FORMATION */
				'formation': {
					'options': {
						'active': 1,
					},
					'stored': ['rules'],
					'rules': {},/*{idCity, unit, min, max, keep ressources, use labor, boost, active}*/
					'confPanel': function( $section ){
						console.info('KOC formation confPanel function');
						var code = '<h3>Formation</h3>'
							+ '<div>'
							+ KOC.shared.generateCheckbox('formation', 'automatic', 'Lancer les formations automatiques', KOC.conf.formation.automatic)
							+ '</div>';

						$section.append( code );
					},
					'modPanel': function(){
						console.info('KOC formation modPanel function');
						var $section = KOC.$confPanel.find('#koc-formation').html('');

						var autoCode = '';
						//by city
						for( var i = 0; i < KOC.citiesId.length; i++ ){
							var cityId = KOC.citiesId[i];
							var rule = KOC.formation.rules[ cityId ];
							//available units
							var units = KOC.formation.getTrainableUnits( cityId );
							//unsafeWindow.unitcost

							autoCode += '<div class="city">'
									 +	'<p>'
									 +	'<input type="checkbox" id="koc-formation-auto-city-'+ cityId +'" name="city" '+ ( rule && rule.active ? 'checked' : '' ) +' value="'+ cityId +'">'
									 +	'<label for="koc-formation-auto-'+ cityId +'">'+ city.name +'</label>';

							//choose unit (check building requirements and tech requirements)
								autoCode += '<label for="koc-formation-auto-city-'+ cityId +'-unit">Unités</label>'
										 +	'<select id="koc-formation-auto-city-'+ cityId +'-unit" name="unit">'
										 +	'<option value=""></option>';

								for( var u in units ){
									if( units.hasOwnProperty(u) ){
										autoCode += '<option value="'+ u +'">'+ units[u] +'</option>';
									}
								}
								autoCode += '</select>';

							//choose pack size min and max
								autoCode += '<label for="koc-formation-auto-city-'+ cityId +'-min">min</label>'
										 +	'<input type="text" id="koc-formation-auto-'+ cityId +'-min" name="min">'
										 +	'<label for="koc-formation-auto-city-'+ cityId +'-max">max</label>'
										 +	'<input type="text" id="koc-formation-auto-'+ cityId +'-max" name="max">'
										 +	'<button>max</button>';

							//choose speed
								autoCode += '<label for="koc-formation-auto-city-'+ cityId +'-speed">Vitesse</label>'
										 +	'<select id="koc-formation-auto-city-'+ cityId +'-speed" name="speed">'
										 +	'<option value="0">Normal</option>'
										 +	'<option value="1">5-15% (coût x2)</option>'
										 +	'<option value="2">10-25% (coût x4)</option>'
										 +	'</select>';

							//choose boost
							// /!\ boost incompatible avec speed
							/*
								autoCode += '<label for="koc-formation-auto-city-'+ cityId +'-item">Objet ?</label>'
										 +	'<select id="koc-formation-auto-city-'+ cityId +'-item" name="item">'
										 +	'<option value="">Non</option>'
										 +	'<option value="36">"+ window.itemlist.i36.name + '(' + (window.seed.items.i36 ? window.seed.items.i36 : 0) + ')</option>'
										 +	'<option value="37">"+ window.itemlist.i37.name + '(' + (window.seed.items.i37 ? window.seed.items.i37 : 0) + ')</option>'
										 +	'<option value="38">"+ window.itemlist.i38.name + '(' + (window.seed.items.i38 ? window.seed.items.i38 : 0) + ')</option>'
										 +	'</select>';
							*/

							//choose workforce percentage
								autoCode += '<label for="koc-formation-auto-city-'+ cityId +'-labor">Travailleurs</label>'
										 +	'<select id="koc-formation-auto-city-'+ cityId +'-labor" name="labor">'
										 +	'<option value=""></option>'
										 +	'</select>';

							//nice to have
								/*
								autoCode += '<label>Durée</label>'
										 +	'<output></output>';
								*/
							autoCode += '</p>';
							//keep resources ? (in easy format, with validation)
							autoCode += '<p>'
									 +	'<label>Garder</label>';

							for( var j = 0; j < KOC.resources.length; j++ ){
								var r = KOC.resources[j];
								autoCode += '<label for="koc-formation-auto-city-keep-'+ r.name +'">'
										 +	'<img src="'+ r.icon +'" title="'+ r.label +'">'
										 +	'</label>'
										 +	'<input type="text" id="koc-formation-auto-city-keep-'+ r.name +'" name="'+ r.name +'">';
							}
							autoCode += '</p>'
									 +	'</div>';
						}

						//manual formation

						//list current formations and queue
							//timing for current one
							//delete queued formations
								/*var param2=cityId; // id de la ville
								var param3=q[num][0]; // Type de trouoe
								var param4=q[num][1]; // Qte troupe
								var param5=end; // debut
								var param6=start; // fin
								var param7=actual; // duree
								var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
								params.cityId = param2;
								params.requestType ="CANCEL_TRAINING";
								params.numtrptrn = param4;
								params.trnETA= param5;
								params.trnNeeded = param7;
								params.trnTmp = param6;
								params.typetrn= param3;
								new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelTraining.php" + unsafeWindow.g_ajaxsuffix, {
										 method: "post",
										 parameters: params,*/

						//defenses
					},
					'on': function(){
						console.info('KOC formation on function');

						try{
							var persistentFormationRules = localStorage.getObject('koc_formation_rules_' + KOC.server);
							if( persistentFormationRules ){
								KOC.formation.automaticRules = persistentFormationRules;
							}
						} catch(e){
							console.error(e);
						}
					},
					'off': function(){
						console.info('KOC formation off function');
					},
					'getTrainableUnits': function( cityId ){
						console.info('KOC formation getTrainableUnits function', cityId);

						var units = {};

						for( var u in window.unitcost ){
							if( window.unitcost.hasOwnProperty(u) ){
								var unitc = window.unitcost[u];
								//check building requirement
									if( typeof unitc[8] == 'object' ){
										for( building in unitc[8] ){
											if( unitc[8].hasOwnProperty( building ) ){
												if( KOC.shared.buildingHighestLevel( cityId, building.substr(1) ) < unitc[8][building][1] ){
													continue;
												}
											}
										}
									}
								//check tech requirement
									if( typeof unitc[9] == 'object' ){
										for( tech in unitc[9] ){
											if( unitc[9].hasOwnProperty( tech ) ){
												if( window.seed.tech[ 'tch' + tech.substr(1) ] < unitc[9][tech][1] ){
													continue;
												}
											}
										}
									}

								units[ u ] = unitc.name;
							}

							return units;
						}
					},
					'trainingDuration': function( qty, unitId, boost, speed ){
						console.info('KOC formation trainingDuration function');

						var m = window.modal_barracks_train_max( unitId );
						if( qty > m ) qty = m;

						var t = window.modal_barracks_traintime(unitId, qty);
						if( speed == 0 ){
							return window.timestr(t);
						} else if( speed == 1 ){
							var h = window.timestr( Math.ceil( (100 - window.gambleOptionResults1[0]) / 100 * t) ),
								b = window.timestr( Math.ceil( (100 - window.gambleOptionResults1[1]) / 100 * t) );
							return h + " - " + b;
						} else if( speed == 2 ){
							var h = window.timestr( Math.ceil( (100 - window.gambleOptionResults2[0]) / 100 * t) ),
								b = window.timestr( Math.ceil( (100 - window.gambleOptionResults2[1]) / 100 * t) );
							return h + " - " + b;
						} else {
							//boost and speed are incompatible
							if( boost == 36 ){
								t = parseInt((t * 0.7), 10);
							} else if( boost == 37 ){
								t = parseInt(time * 0.5)
							} else if( boost == 38 ){
								t = parseInt(time * 0.3)
							}
							return window.timestr(t);
						}
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
												resourceLost;
											if (gambleId != null) {
												time = rslt.timeNeeded
											}
											for (var i = 1; i < 5; i++) {
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
				},
			/* TRANSPORT */
				'transport': {
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

						try{
							var persistentTransportRules = localStorage.getObject('koc_transport_rules_' + KOC.server);
							if( persistentTransportRules ){
								KOC.transport.rules = persistentTransportRules;
							}
						} catch(e){
							console.error(e);
						}
					},
					'automaticOff': function(){
						console.info('KOC transport automaticOff function');

						KOC.conf.transport.automatic = 0;
						KOC.shared.storeConf();
					},
					'storeAutomaticRules': function(){
						console.info('koc transport storeAutomaticRules function');
						localStorage.setObject('koc_transport_rules_' + KOC.server, KOC.transport.rules);
					},
					//'generateTransport': function(origin, destination, troops, ressources)
					//getCitiesForPlayer
					//getCitiesForSelf
					//getTroopsByTown
					//getTransportDuration
				},
			/* SPECIAL */
				'special': {
				},
		};

		var trys = 60;
		function load(){
			if( window.seed && window.seed.cities ){
				setTimeout(function(){
					console.log(window);
					console.log(window.seed);
					console.log(window.unitstats);
					console.time('Koc init');
					console.log('Koc init');
					KOC.init();
					console.timeEnd('Koc init');
				}, 2000);
			} else {
				trys--;
				if( trys <= 0 ) window.location.reload();
				else setTimeout(function(){ load(); }, 1000);
			}
		}
		load();
	} catch (e) {
		console.error(e);
	}
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
	//- recherche de TS / CB / FS
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

	//Avoir des recherches de TS/CB/FS indexées par villes et mémorisées pour ne pas avoir à refaire les recherches à chaque fois qu'on passe d'une recherche sur une ville à une autre.

	//Renforcement :
	//- garder x miliciens dans la ville 1, le reste va à la ville 2
	//- prise en compte des attaques (CB, ...)
	//- envoyer de la nourriture avec les renforts


	//Coordination :
	//Si on pouvait intégrer le planificateur ce serait top (au moins les données source : récupérer tous les temps de marche des pourfendeurs connectés jusqu'à un point donné, pour un type d'unité à choisir)

	//Laboratorie :
	//-auto search
	//-liste d'attente

	//bloc note
*/
/*
params.rid = marchid;
new Ajax.Request(g_ajaxpath + "ajax/fetchMarch.php" + g_ajaxsuffix, {

update_march
*/