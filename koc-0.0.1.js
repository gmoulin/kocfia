console.info('koc start');


var kocConfPanelCss = "#koc-conf-panel-toggle {}"
		+ "\n.drag-handle { cursor: move; width: 10px; height: 20px; background-color: grey; float: left;}"
		+ "\n#koc-conf-panel .ui-icon-close { float: right; cursor: pointer; }"
		+ "\n#koc-conf-panel { max-height: 700px; display: none; position: absolute; z-index: 99999; }"
		+ "\n#koc-conf-panel .drag-handle { height: 36px; }"
		+ "\n#koc-conf-panel .ui-icon-close { float: right; cursor: pointer; }"
		+ "\n#koc-conf-panel .ui-icon-trash { cursor: pointer; display: inline-block; }"
		+ "\n#koc-conf-panel-tabs { padding-left: 10px; }"
		+ "\n.koc-conf-panel-tab.on:after, .koc-conf-panel-tab.off:after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 0; border-width: 10px; border-style: solid; }"
		+ "\n.koc-conf-panel-tab.on:after { border-color: transparent green green transparent; }"
		+ "\n.koc-conf-panel-tab.off:after { border-color: transparent red red transparent; }"
		+ "\n#koc-chat ul { padding-left: 0; }"
		+ "\n.ui-tabs .ui-tabs-panel { overflow: auto; padding: 5px; }"
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
var kocChatHelpCss = ".kocmain .mod_comm .comm_global .chatlist .noalliance { display: none; }";

var kocChatHighlightLeadersCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.chancellor:not(.direct) { background-color: #C3ECE4; }"
		+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.vice_chancellor:not(.direct) { background-color: #C7E3F7; }"
		+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.officer:not(.direct) { background-color: #D5D2F7; }"
;

var kocChatHighlightFriendsCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.friend:not(.direct) { background-color: #FAE4E4; }";
var kocChatHighlightFoesCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.foe:not(.direct) { background-color: #FFCAA2; }";

var kocOverviewCss = "#koc-overview { position:absolute; font: 10px/20px Verdana, sans serif; font-width: normal;  z-index: 99998; display: none; }"
		+ "\n#koc-overview .ui-icon-close { float: right; cursor: pointer; }"
		+ "\n#koc-overview .overview-parts-toggles { float: left; margin: 0; }"
		+ "\n#koc-overview table { width: 100%; }"
		+ "\n#koc-overview thead { height: 20px; }"
		+ "\n#koc-overview thead tr { display: block; position: relative; height: 20px; }"
		+ "\n#koc-overview tbody { margin-right: 20px; }"
		+ "\n#koc-overview tbody { display: block; overflow: auto; width: 100%; }"
		+ "\n#koc-overview th, #koc-overview td { height: 20px; width: 45px; }"
		+ "\n#koc-overview tr.highlight td, #koc-overview th.highlight { background-color: #F8E0A8; }"
		+ "\n#koc-overview tr td.sum { background-color: #D9F4F1; }"
		+ "\n#koc-overview tr td:first-child, #koc-overview tr th:first-child { width:20px; }"
		+ "\n#koc-overview img { width:20px; }"
		+ "\n#koc-overview tr td:not(:first-child) { text-align: right; }"
;

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

(function($){
	try{
		/* helpers */
			//pointers
				var $head = $('head'),
					$body = $('body'),
					$chatInput = $('#mod_comm_input'),
					$chatGeneral = $('#mod_comm_list1'),
					$chatAlliance = $('#mod_comm_list2'),
					$chat = $('#kocmain_bottom').find('.mod_comm');

			//shared
				var $dragHandle = $('<div class="drag-handle">');

		var KOC = {
			'server': null,
			'modules': ['chat', 'transport', 'fbWallPopup', 'overview'],
			'stored': ['conf'],
			'init': function(){
				console.info('KOC init function');
				//get server id
					KOC.server = KOC.generic.getServer();
					console.log('server', KOC.server);
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

					console.log(KOC.defaultConf);

				//get stored conf if present
					try {
						var storedConf = localStorage.getObject('koc_conf_' + KOC.server);
						if( storedConf ){
							$.extend(true, KOC.conf, storedConf);
							console.info('used stored conf');
							console.log(storedConf);
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

				//configuration panel
					console.time('confPanel');
					KOC.confPanel();
					console.timeEnd('confPanel');

				//get player cities
					KOC.generic.getCities();

				//modules init
					for( var i = 0; i < KOC.modules.length; i++ ){
						console.time('koc '+ KOC.modules[i] +' on');
						KOC[ KOC.modules[i] ].on();
						console.timeEnd('koc '+ KOC.modules[i] +' on');
					}
			},
			'cities': [],//[{'id','name','coords': {x,y}}, ...]
			'citiesId': [],
			'resources': [
				{'name': 'gold', 'label': 'or', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{'name': 'resource1x3600', 'label': 'nourriture', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2x3600', 'label': 'bois', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3x3600', 'label': 'pierre', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4x3600', 'label': 'minerai', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
				{'name': 'resource5', 'label': 'pierre d\'éther', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/aetherstone_30.png'},
			],
			/*'resources_productivity': [
				{'name': 'resource1Productivity', 'label': 'production', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2Productivity', 'label': 'production', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3Productivity', 'label': 'production', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4Productivity', 'label': 'production', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],*/
			'resources_cap': [
				{'name': 'resource1Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			'resources_upkeep': [
				{'name': 'upkeep', 'label': 'dépense', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{'name': 'resource1Upkeep', 'label': 'dépense', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2Upkeep', 'label': 'dépense', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3Upkeep', 'label': 'dépense', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4Upkeep', 'label': 'dépense', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			'resources_autonomy': [
				{'label': 'autonomie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{'label': 'autonomie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'label': 'autonomie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'label': 'autonomie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'label': 'autonomie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
			],
			'population': [
				{'name': 'population', 'label': 'population', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/population_40.png'},
				{'name': 'populationCap', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/population_40.png'},
				{'name': 'laborPopulation', 'label': 'péon', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/population_40.png'},
				{'name': 'availablePopulation', 'label': 'glandeur', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/population_40.png', 'take': 'population', 'substract': 'laborPopulation' },
				{'name': 'taxRate', 'label': 'taxation', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/taxes.png'},
				{'name': 'hapiness', 'label': 'bonheur', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/happiness.png'},
			],
			'troops': [
				{'name': 'unt1', 'label': 'Unité de Ravitaillement', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_1_30_s34.jpg'},
				{'name': 'unt2', 'label': 'Milicien', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_2_30_s34.jpg'},
				{'name': 'unt3', 'label': 'Eclaireur', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_3_30_s34.jpg'},
				{'name': 'unt4', 'label': 'Piquier', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_4_30_s34.jpg'},
				{'name': 'unt5', 'label': 'Paladin', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_5_30_s34.jpg'},
				{'name': 'unt6', 'label': 'Archer', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_6_30_s34.jpg'},
				{'name': 'unt7', 'label': 'Cavalerie', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_7_30_s34.jpg'},
				{'name': 'unt8', 'label': 'Cavalerie Lourde', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_8_30_s34.jpg'},
				{'name': 'unt9', 'label': 'Wagon de Ravitaillement', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_9_30_s34.jpg'},
				{'name': 'unt10', 'label': 'Baliste', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_10_30_s34.jpg'},
				{'name': 'unt11', 'label': 'Bélier', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_11_30_s34.jpg'},
				{'name': 'unt12', 'label': 'Catapulte', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/units/unit_12_30_s34.jpg'},
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
					'resource5': {'index': 0, 'type': 'rec5', 'var': 'res'},
				},
				'resources_cap': {
					'resource1Capx3600': {'index': 1, 'type': 'rec1', 'var': 'res'},
					'resource2Capx3600': {'index': 1, 'type': 'rec2', 'var': 'res'},
					'resource3Capx3600': {'index': 1, 'type': 'rec3', 'var': 'res'},
					'resource4Capx3600': {'index': 1, 'type': 'rec4', 'var': 'res'},
				},
				/*'resources_productivity': {
					'resource1Productivity': {'index': 2, 'type': 'rec1', 'var': 'res'},
					'resource2Productivity': {'index': 2, 'type': 'rec2', 'var': 'res'},
					'resource3Productivity': {'index': 2, 'type': 'rec3', 'var': 'res'},
					'resource4Productivity': {'index': 2, 'type': 'rec4', 'var': 'res'},
				},*/
				'resources_upkeep': {
					'upkeep': {'index': 2, 'var': 'gold'},
					'resource1Upkeep': {'index': 3, 'type': 'rec1', 'var': 'res'},
					'resource2Upkeep': {'index': 3, 'type': 'rec2', 'var': 'res'},
					'resource3Upkeep': {'index': 3, 'type': 'rec3', 'var': 'res'},
					'resource4Upkeep': {'index': 3, 'type': 'rec4', 'var': 'res'},
				}
			},
			/* AJAX SNIFFER */
				'ajaxSniffer': function(){
					console.info('KOC ajaxSniffer function');
					XMLHttpRequest.prototype.oldOpen = XMLHttpRequest.prototype.open;
					var newOpen = function(method, url, async, user, password){
						var filename = url.substring(url.lastIndexOf('/')+1);
						switch(filename){
							case 'getChat.php':
								this.addEventListener("load", function(){
									if( KOC.conf.chat.active && ( KOC.conf.chat.cleanHelp || KOC.conf.chat.highlightLeaders || KOC.conf.chat.highlightFriends || KOC.conf.chat.highlightFoes ) ){
										console.time('getChat load');
										try{
											var r = JSON.parse(this.responseText);
										} catch(e){
											console.error(e);
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
										console.timeEnd('getChat load');
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
									if( KOC.conf.overview.active ){
										console.time('march load');
										var r = JSON.parse(this.responseText);
										if( r.updateSeed ){
											KOC.overview.update( r.updateSeed );
										}
										console.timeEnd('march load');
									}
								}, false);
								break;
							case 'levyGold.php':
								this.addEventListener("load", function(){
									if( KOC.conf.overview.active ){
										console.time('levyGold load');
										var r = JSON.parse(this.responseText);
										if( r.updateSeed ){
											KOC.overview.update( r.updateSeed );
										}
										console.timeEnd('levyGold load');
									}
								}, false);
								break;
							case 'train.php':
								this.addEventListener("load", function(){
									if( KOC.conf.overview.active ){
										console.time('train load');
										var r = JSON.parse(this.responseText);
										if( r.data ){
											KOC.overview.update( r.data );
										}
										console.timeEnd('train load');
									}
								}, false);
								break;
							case 'updateSeed.php':
								this.addEventListener("load", function(){
									if( KOC.conf.overview.active ){
										console.time('updateSeed load');
										try{
											var r = JSON.parse(this.responseText);
										} catch(e){
											console.error(e);
											console.log(this.responseText);
										}
										if( r.updateSeed ){
											KOC.overview.update( r.updateSeed );
										}
										console.timeEnd('updateSeed load');
									}
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
							lis += '<li class="koc-conf-panel-tab '+ (this.conf[mod].active ? 'on' : 'off') +'">'
								 + '<a href="#koc-'+ mod +'">'+ mod.capitalize() +'</a>'
								 + '</li>';
							sections += '<div id="koc-'+ mod +'"></div>';
						}
					}

					console.time('generic option panel');
					KOC.generic.optionPanel( $optionsSection );
					console.timeEnd('generic option panel');

					//manage the checked status change of the options
					$optionsSection
						.on('change', 'input', function(){
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
								//else if( typeof KOC[ mod ][ func ] != 'function' ) func += 'On';
							} else {
								status = 0;
								if( func == 'active' ) func = 'off';
								//else if( typeof KOC[ mod ][ func ] != 'function' ) func += 'Off';
							}

							KOC.conf[ mod ][ infos[1] ] = status;
							KOC.generic.storeConf();

							if( typeof KOC[ mod ][ func ] == 'function' ) KOC[ mod ][ func ]();
							else console.warn('not a function', mod, func, typeof KOC[ mod ][ func ]);
						})
						.on('change', 'select', function(){
							var $this = $(this),
								infos = this.id.split('-'),
								mod = infos[0],
								option = infos[1];

							KOC.conf[ mod ][ option ] = $this.val();
							KOC.generic.storeConf();
						})
						.on('click', 'button', function(e){
							e.preventDefault();
							var $this = $(this),
								infos = $this.attr('rel').split('-');
							KOC[ infos[0] ][ infos[1] ]();
						});

					$confPanel
						.append( '<span class="ui-icon ui-icon-close"></span>' )
						.append( $dragHandle.clone() )
						.append( '<nav id="koc-conf-panel-tabs"><ul>' + lis + '</ul></nav>' )
						.append( $optionsSection )
						.append( sections )
						.draggable({
							'helper': "original",
							handle: '.drag-handle',
							'stop': function(event, ui){
								KOC.conf.confPanel.position = ui.position;
								KOC.generic.storeConf();
							}
						})
						.resizable({
							minWidth: 250,
							minHeight: 250,
							handles: 'n, e, s, w, ne, se, sw, nw',
							stop: function(event, ui){
								KOC.conf.confPanel.size = ui.size;
								KOC.generic.storeConf();

								KOC.$confPanel.find('.ui-tabs-panel').css({
									'max-width': KOC.conf.confPanel.size.width,
									'max-height': KOC.conf.confPanel.size.height - 46,
								});
							}
						})
						.tabs({
							collapsible: true,
							selected: KOC.conf.confPanel.selected,
							select: function(event, ui){
								//save the selected panel index
								KOC.conf.confPanel.selected = ui.index;
								KOC.generic.storeConf();

								//dynamic generation of the panel on first call
								if( !$(ui.panel).find('h2').length ){
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
							KOC.generic.storeConf();
						});

					var $kocConfPanelToggle = $('<button id="koc-conf-panel-toggle">').text('KOC');
					$kocConfPanelToggle.click(function(){
						console.info('$kocConfPanelToggle click');
						KOC.$confPanel.toggle();
						KOC.conf.confPanel.visible = (KOC.$confPanel.is(':visible') ? 1 : 0);
						KOC.generic.storeConf();
					});

					$body.append( $confPanel );

					$('<div id="koc-buttons">')
						.html( $kocConfPanelToggle )
						.insertBefore( $('#main_engagement_tabs') );
					KOC.$buttons = $('#koc-buttons');

					KOC.$confPanel = $('#koc-conf-panel');
					KOC.$confPanelNav = $('#koc-conf-panel-tabs');

					if( KOC.conf.confPanel.size.width != 'auto' ){
						KOC.$confPanel.find('.ui-tabs-panel').css({
							'max-width': KOC.conf.confPanel.size.width,
							'max-height': KOC.conf.confPanel.size.height - 46,
						});
					}

					if( KOC.conf.confPanel.visible ){
						if( KOC.conf.confPanel.selected > 0 ){
							var mod = KOC.$confPanel.find('.ui-tabs-selected').find('a').attr('href').split('-')[1];
							console.time('confPanel memorized tab load');
							if( typeof KOC[ mod ].modPanel == 'function' ) KOC[ mod ].modPanel();
							console.timeEnd('confPanel memorized tab load');
						}

						KOC.$confPanel.show();
					}
				},
				'generateCheckbox': function(module, option, text, checked){
					return '<p>'
						 + '<input type="checkbox" id="'+ module +'-'+ option +'" '+ (checked ? 'checked' : '') +' />'
						 + '<label for="'+ module +'-'+ option +'">'+ text +'</label>'
						 + '</p>';
				},
				'generateButton': function(module, action, text){
					return '<p><button rel="'+ module +'-'+ action +'">'+ text +'</button></p>';
				},
				'generateRadio': function(module, name, values, labels, selected){
					var code = '<p>';
					if( values.length && labels.length && values.length == labels.length ){
						for( var i = 0; i < values.length; i++ ){
							if( i > 0 ) code += '<br />';
							code += '<input type="radio" id="'+ module +'-'+ values[i] +'" name="'+ module + '_' + name +'" '+ (selected[i] == 1 ? 'checked' : '') +' />'
						 		  + '<label for="'+ module +'-'+ values[i] +'">'+ labels[i] +'</label>';
						}
					}
					code += '</p>';
					return code;
				},
				'generateSelect': function(module, name, label, selected, options){
					var code = '<p><label for="'+ module + '_' + name +'">'+ label +'</label><select id="'+ module + '_' + name +'"><option value=""></option>';
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
			/* GENERIC */
				'generic': {
					'storeConf': function(){
						console.info('KOC storeConf function', KOC.conf);
						localStorage.setObject('koc_conf_' + KOC.server, KOC.conf);
					},
					'cleanLocalStorage': function(){
						console.info('KOC generic cleanLocalStorage function');
						for( var i = 0; i < KOC.storedObjects.length; i++ ){
							localStorage.removeItem('koc_' + KOC.storedObjects[i] + '_' + KOC.server);
						}
					},
					'optionPanel': function($optionsSection){
						console.info('KOC generic optionPanel function');
						$optionsSection.append( KOC.generateButton('generic', 'cleanLocalStorage', 'Remise à zèro des données persistantes') );
						for( var i = 0; i < KOC.modules.length; i++ ){
							KOC[ KOC.modules[i] ].confPanel( $optionsSection );
						}
					},
					'getServer': function(){
						return window.domainName;
					},
					'getCities': function(){
						console.time('cities');
						for( var i = 0; i < window.seed.cities.length; i++ ){
							var c = window.seed.cities[i];
							KOC.cities.push( {'id': c[0], 'name': c[1], 'coords': {'x': c[2], 'y': c[3]}} );
							KOC.citiesId.push( c[0] );
						}
						console.timeEnd('cities');
					},
					'format': function( num ){
						if( typeof num == 'undefined' || num == null ) return '&nbsp;';
						if( typeof num != 'string' ){
							num = '' + Math.floor(num);
						}
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
							decimal = s.substr(s.length - 3, 2),
							s = s.substr(0, s.length - 3);
						if( s.length == 1 ){
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
						var code = '<p>'
							+ '<h2>Popup facebook pour poster sur le mur</h2>'
							+ KOC.generateCheckbox('fbWallPopup', 'active', 'Activer le module', KOC.conf.fbWallPopup.active)
							+ KOC.generateRadio('fbWallPopup', 'action', ['cancel', 'post'], ['annulation automatique', 'publication automatique'], [KOC.conf.fbWallPopup.cancel, KOC.conf.fbWallPopup.post])
							+ KOC.generateSelect('fbWallPopup', 'privacyLevel', 'niveau de visibilité', KOC.conf.fbWallPopup.privacyLevel, KOC.fbWallPopup.privacyLevelList)
							+ '</p>';

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
						var code = '<p>'
							+ '<h2>Chat</h2>'
							+ KOC.generateCheckbox('chat', 'active', 'Activer le module', KOC.conf.chat.active)
							+ KOC.generateCheckbox('chat', 'moveable', 'Chat déplacable et redimensionnable', KOC.conf.chat.moveable)
							+ KOC.generateCheckbox('chat', 'cleanHelp', 'Aider automiquement et masquer les demandes', KOC.conf.chat.cleanHelp)
							+ KOC.generateButton('chat', 'onRight', 'Repositionner le chat à droite')
							+ KOC.generateCheckbox('chat', 'highlightLeaders', 'Changer la couleur des messages de la chancellerie (chats Général et Alliance)', KOC.conf.chat.highlightLeaders)
							+ KOC.generateButton('chat', 'getLeadersList', 'Raffraîchir la liste des joueurs de la chancellerie')
							+ KOC.generateCheckbox('chat', 'highlightFriends', 'Changer la couleur des messages des amis (chat Général)', KOC.conf.chat.highlightFriends)
							+ KOC.generateCheckbox('chat', 'highlightFoes', 'Changer la couleur des messages des ennemis (chat Général)', KOC.conf.chat.highlightFoes)
							+ '</p>';

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

						$section.append('<h2>Liste d\'amis</h2>'
								+ '<p><label for="koc-friend">Joueur : </label>'
								+ '<input type="text" name="koc-friend" id="koc-friend" />'
								+ '<button rel="friends">Ajouter</button></p>'
								+ '<ul class="koc-chat-list" rel="friends">' + friends + '</ul>'
								+ '<h2>Liste d\'ennemis</h2>'
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
									KOC.chat.friendsList = persistentFriendsList.split(',');
								}
							} catch(e){
								console.error(e);
							}

						//highlightFoes
							try{
								var persistentFoesList = localStorage.getObject('koc_chat_foes_list_' + KOC.server);
								if( persistentFoesList ){
									KOC.chat.foesList = persistentFoesList.split(',');
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
						KOC.chat.movableOff();
						KOC.chat.cleanHelpOff();
						KOC.chat.highlightLeadersOff();
						KOC.chat.highlightFriendsOff();
						KOC.chat.highlightFoesOff();
					},
					/* moveable */
						'moveableOn': function(){
							console.info('KOC chat movableOn function');
							$head.append( $('<style id="koc-chat-moveable">').text(kocChatMoveableCss) );

							$chat
								.draggable({
									'helper': "original",
									'handle': '.drag-handle',
									'stop': function(event, ui){
										KOC.conf.chat.position = ui.position;
										KOC.generic.storeConf();
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
										KOC.generic.storeConf();
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
							KOC.generic.storeConf();
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
							//ajax call to get the leaders, highlighting will be done in the ajax response listener
							getDirectoryTabAllianceMembers();
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
							localStorage.setObject('koc_chat_friends_list_' + KOC.server, KOC.chat.friendsList.join(','));
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
							localStorage.setObject('koc_chat_foes_list_' + KOC.server, KOC.chat.foesList.join(','));
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
			/* TRANSPORT */
				'transport': {
					'options': {
						'active': 1,
						'automatic': 0,
					},
					'stored': ['automatic_rules', 'temporary_rules'],
					'automaticRules': {},
					'temporaryRules': {},
					'confPanel': function( $section ){
						console.info('KOC transport confPanel function');
						var code = '<p>'
							+ '<h2>Transport</h2>'
							+ KOC.generateCheckbox('transport', 'active', 'Activer le module', KOC.conf.transport.active)
							+ '</p>';

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

						try{
							var persistentTransportAutomaticRules = localStorage.getObject('koc_transport_automatic_rules_' + KOC.server);
							if( persistentTransportAutomaticRules ){
								KOC.transport.automaticRules = persistentTransportAutomaticRules;
							}
						} catch(e){
							console.error(e);
						}

						if( KOC.conf.transport.automatic ){
							KOC.transport.automaticOn();
						}

						try{
							var persistentTransportTemporaryRules = localStorage.getObject('koc_transport_temporary_rules_' + KOC.server);
							if( persistentTransportTemporaryRules ){
								KOC.transport.temporaryRules = persistentTransportTemporaryRules;
							}
						} catch(e){
							console.error(e);
						}

						if( KOC.conf.transport.temporary ){
							KOC.transport.temporaryOn();
						}
					},
					'off': function(){
						console.info('KOC transport off function');
						KOC.transport.automaticOff();
						KOC.transport.temporaryOff();
					},
					'automaticOn': function(){
						console.info('KOC transport automaticOn function');
					},
					'automaticOff': function(){
						console.info('KOC transport automaticOff function');
					},
					'storeAutomaticRules': function(){
						localStorage.setObject('koc_transport_automatic_rules_' + KOC.server, KOC.transport.automaticRules);
					},
					'storeTemporaryRules': function(){
						localStorage.setObject('koc_transport_temporary_rules_' + KOC.server, KOC.transport.temporaryRules);
					},
					//'generateTransport': function(origin, destination, troops, ressources)
					//getCitiesForPlayer
					//getCitiesForSelf
					//getTroopsByTown
					//getTransportDuration
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
							'resources': 1,
							/*'resources_productivity': 1,*/
							'resources_cap': 1,
							'resources_upkeep': 1,
							'resources_autonomy': 1,
						},
					},
					'parts': {
						'population': 'population',
						'troops': 'unités',
						'resources': 'ressources',
						/*'resources_productivity': 'productivité',*/
						'resources_cap': 'plafond',
						'resources_upkeep': 'dépense',
						'resources_autonomy': 'autonomie',
					},
					'confPanel': function( $section ){
						console.info('KOC overview confPanel function');
						var code = '<p>'
							+ '<h2>Vue globale</h2>'
							+ KOC.generateCheckbox('overview', 'active', 'Activer le module', KOC.conf.overview.active)
							+ KOC.generateRadio('overview', 'action', ['replace', 'moveable'], ['Remplace le dessous du jeu (ne pas oublier de mettre le chat à droite)', 'Vue globale déplacable et redimensionnable'], [KOC.conf.overview.replace, KOC.conf.overview.moveable])
							+ KOC.generateButton('overview', 'resetPlacement', 'Remise à zéro de la position')
							+ KOC.generateButton('overview', 'resetDimensions', 'Remise à zéro des dimensions')
							+ '</p>';

						$section.append( code );
					},
					'on': function(){
						console.info('KOC overview on function');
						$head.append( $('<style id="koc-overview-css">').text(kocOverviewCss) );

						var dataTable = '<table id="koc-overview-data">',
							headers = '<thead><tr><th>&nbsp;</th><th>&nbsp;</th>',
							dataLine = '',
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
							}
							headers += '</tr></thead>';

						dataTable += headers + '<tbody>';

						//bodies
							for( var p in KOC.overview.parts ){
								if( KOC.overview.parts.hasOwnProperty(p) ){
									dataTable += '<tr class="'+ p +'">'
											  +  '<th colspan="99" class="'+ p +'">'
											  +  KOC.overview.parts[p]
											  +  ( p == 'resources_autonomy' ? ' (à l\'instant T, ne tient pas compte de la production, des camps barbares, des formations et des constructions)' : '' )
											  + '</th>'
											  +  '</tr>';
									for( var i = 0; i < KOC[p].length; i++ ){
										dataTable += '<tr class="'+ p +'">'
												  +  '<td><img src="'+ KOC[p][i].icon +'" title="'+ KOC[p][i].label +'"></td>'
												  +  '<td class="sum"></td>'
												  +  dataLine + '</tr>';
									}
								}
							}

						dataTable += '</tbody></table>';

						$overview.append( toggles + dataTable );

						$body.append( $overview );
						KOC.$overview = $('#koc-overview');
						KOC.overview.$toggles = KOC.$overview.find('.overview-parts-toggles');
						KOC.overview.$table = $('#koc-overview-data');
						KOC.overview.$header = KOC.overview.$table.find('thead');
						KOC.overview.$headersThs = KOC.overview.$header.find('th');
						KOC.overview.$tbody = KOC.overview.$table.find('tbody');
						KOC.overview.$tbodyTrs = KOC.overview.$tbody.find('tr');

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

									KOC.generic.storeConf();
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
					'update': function data(){
						console.info('KOC overview update function');
						if( data.city ){
							var popDataTrs = KOC.overview.$tbodyTrs.filter('.population').filter(':not(:first)'),
								resDataTrs = KOC.overview.$tbodyTrs.filter('.resources').filter(':not(:first)'),
								/*resPDataTrs = KOC.overview.$tbodyTrs.filter('.resources_productivity').filter(':not(:first)'),*/
								resCDataTrs = KOC.overview.$tbodyTrs.filter('.resources_cap').filter(':not(:first)'),
								resUDataTrs = KOC.overview.$tbodyTrs.filter('.resources_upkeep').filter(':not(:first)'),
								resADataTrs = KOC.overview.$tbodyTrs.filter('.resources_autonomy').filter(':not(:first)'),
								troDataTrs = KOC.overview.$tbodyTrs.filter('.troops').filter(':not(:first)');

							for( var i = 0; i < KOC.citiesId.length; i++ ){
								var c = data.city[ KOC.citiesId[i] ];
								if( c && c.production ){
									var p = c.production;

									//population
										for( var j = 0; j < KOC.popuplation.length; j++ ){
											var type = KOC.population[j];
											if( p.hasOwnProperty( type.name ) ){
												var n = p[ type.name ];

												popDataTrs.eq(j).find('td').eq(i)
													.text( KOC.generic.format( n ) )
													.attr('title', KOC.generic.readable( n ))
													.data('ori', n);
											} else if( type.name == 'availablePopulation' && p.hasOwnProperty( type.take ) && p.hasOwnProperty( type.substract ) ){
												var n = parseFloat( p[ type.take ] ) - parseFloat( p[ type.substract ] );

												popDataTrs.eq(j).find('td').eq(i)
													.text( KOC.generic.format( n ) )
													.attr('title', KOC.generic.readable( n ))
													.data('ori', n);

											} else {
												popDataTrs.eq(j).find('td').eq(i)
													.html('&nbsp;')
													.attr('title', '')
													.data('ori', 0);
											}
										}
									//resources
										for( var j = 0; j < KOC.resources.length; j++ ){
											var type = KOC.resources[j];
											if( type.name == 'resource5' && !p.hasOwnProperty( type.name ) ){
												type.name = 'AETHERSTONE';
											}
											if( p.hasOwnProperty( type.name ) ){
												var n = p[ type.name ];

												if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

												resDataTrs.eq(j).find('td').eq(i)
													.text( KOC.generic.format( n ) )
													.attr('title', KOC.generic.readable(n))
													.data('ori', n);
											} else {
												resDataTrs.eq(j).find('td').eq(i)
													.html('&nbsp;')
													.attr('title', '')
													.data('ori', 0);
											}
										}
									//resources productivity
										/*for( var j = 0; j < KOC.resources_productivity.length; j++ ){
											var type = KOC.resources_productivity[j],
												inSeed = KOC.inSeed.resources_productivity[ type.name ];
											if( inSeed ){
												if( inSeed.hasOwnProperty('type') ){
													var n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
												} else {
													var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
												}

												resPDataTrs.eq(j).find('td').eq(i)
													.text( KOC.generic.format( n ) )
													.attr('title', KOC.generic.readable(n))
													.data('ori', n);
											} else {
												resPDataTrs.eq(j).find('td').eq(i)
													.html('&nbsp;')
													.attr('title', '')
													.data('ori', 0);
											}
										}*/
									//resources cap
										for( var j = 0; j < KOC.resources_cap.length; j++ ){
											var type = KOC.resources_cap[j];
											if( p.hasOwnProperty( type.name ) ){
												var n = p[ type.name ];

												if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

												resCDataTrs.eq(j).find('td').eq(i)
													.text( KOC.generic.format( n ) )
													.attr('title', KOC.generic.readable(n))
													.data('ori', n);
											} else {
												resCDataTrs.eq(j).find('td').eq(i)
													.html('&nbsp;')
													.attr('title', '')
													.data('ori', 0);
											}
										}
									//resources upkeep
										for( var j = 0; j < KOC.resources_upkeep.length; j++ ){
											var type = KOC.resources_upkeep[j];
											if( p.hasOwnProperty( type.name ) ){
												var n = p[ type.name ];

												if( type.name == 'upkeep' ) n = n * 10;

												resUDataTrs.eq(j).find('td').eq(i)
													.text( KOC.generic.format( n ) )
													.attr('title', KOC.generic.readable(n))
													.data('ori', n);
											} else {
												resUDataTrs.eq(j).find('td').eq(i)
													.html('&nbsp;')
													.attr('title', '')
													.data('ori', 0);
											}
										}
									//resources autonomy
										for( var j = 0; j < KOC.resources_autonomy.length; j++ ){
											var upkeep = KOC.resources_upkeep[j],
												stock = KOC.resources[j];

											if( p.hasOwnProperty( upkeep.name ) && p.hasOwnProperty( stock.name ) ){
												var a = p[ stock.name ] / 3600 / p[ upkeep.name ] * 3600;

												resADataTrs.eq(j).find('td').eq(i)
													.text( KOC.generic.readableDuration( a ) );
											} else {
												resADataTrs.eq(j).find('td').eq(i)
													.html('&nbsp;');
											}
										}
									//troops
										for( var j = 0; j < KOC.troops.length; j++ ){
											var type = KOC.troops[j];
											if( p.hasOwnProperty( type.name ) ){
												var n = p[ type.name ];

												troDataTrs.eq(j).find('td').eq(i)
													.text( KOC.generic.format( n ) )
													.attr('title', KOC.generic.readable(n))
													.data('ori', n);
											} else {
												troDataTrs.eq(j).find('td').eq(i)
													.html('&nbsp;')
													.attr('title', '')
													.data('ori', 0);
											}
										}
								}
							}

							KOC.overview.sums();
						}
					},
					'updateFromSeed': function(){
						console.info('KOC overview updateFromSeed function');
						var popDataTrs = KOC.overview.$tbodyTrs.filter('.population').filter(':not(:first)'),
							resDataTrs = KOC.overview.$tbodyTrs.filter('.resources').filter(':not(:first)'),
							/*resPDataTrs = KOC.overview.$tbodyTrs.filter('.resources_productivity').filter(':not(:first)'),*/
							resCDataTrs = KOC.overview.$tbodyTrs.filter('.resources_cap').filter(':not(:first)'),
							resUDataTrs = KOC.overview.$tbodyTrs.filter('.resources_upkeep').filter(':not(:first)'),
							resADataTrs = KOC.overview.$tbodyTrs.filter('.resources_autonomy').filter(':not(:first)'),
							troDataTrs = KOC.overview.$tbodyTrs.filter('.troops').filter(':not(:first)');

						for( var i = 0; i < KOC.citiesId.length; i++ ){
							var cityId = 'city' + KOC.citiesId[i],
								stats = window.seed.citystats[ cityId ],
								seed = {
									'pop': stats.pop,
									'gold': stats.gold,
									'res': window.seed.resources[ cityId ],
									'units': window.seed.units[ cityId ]
								};

							//population
								for( var j = 0; j < KOC.population.length; j++ ){
									var type = KOC.population[j],
										inSeed = KOC.inSeed.population[ type.name ];
									if( inSeed ){
										var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );

										popDataTrs.eq(j).find('td').eq(i + 2)
											.text( KOC.generic.format( n ) )
											.attr('title', KOC.generic.readable( n ))
											.data('ori', n);

									} else if( type.name == 'availablePopulation' ){
										var take = KOC.inSeed.population[ type.take ],
											substract = KOC.inSeed.population[ type.substract ],
											n = parseFloat( seed[ take.var ][ take.index ] ) - parseFloat( seed[ substract.var ][ substract.index ] );

										popDataTrs.eq(j).find('td').eq(i + 2)
											.text( KOC.generic.format( n ) )
											.attr('title', KOC.generic.readable( n ))
											.data('ori', n);

									} else {
										popDataTrs.eq(j).find('td').eq(i + 2)
											.html('&nbsp;')
											.attr('title', KOC.generic.readable( n ))
											.data('ori', 0);
									}
								}
							//resources
								for( var j = 0; j < KOC.resources.length; j++ ){
									var type = KOC.resources[j],
										inSeed = KOC.inSeed.resources[ type.name ];
									if( inSeed ){
										if( inSeed.hasOwnProperty('type') ){
											var n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
										} else {
											var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
										}

										if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

										resDataTrs.eq(j).find('td').eq(i + 2)
											.text( KOC.generic.format( n ) )
											.attr('title', KOC.generic.readable(n))
											.data('ori', n);
									} else {
										resDataTrs.eq(j).find('td').eq(i + 2)
											.html('&nbsp;')
											.attr('title', '')
											.data('ori', 0);
									}
								}
							//resources productivity
								/*for( var j = 0; j < KOC.resources_productivity.length; j++ ){
									var type = KOC.resources_productivity[j],
										inSeed = KOC.inSeed.resources_productivity[ type.name ];
									if( inSeed ){
										if( inSeed.hasOwnProperty('type') ){
											var n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
										} else {
											var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
										}

										resPDataTrs.eq(j).find('td').eq(i + 2)
											.text( KOC.generic.format( n ) )
											.attr('title', KOC.generic.readable(n))
											.data('ori', n);
									} else {
										resPDataTrs.eq(j).find('td').eq(i + 2)
											.html('&nbsp;')
											.attr('title', '')
											.data('ori', 0);
									}
								}*/
							//resources cap
								for( var j = 0; j < KOC.resources_cap.length; j++ ){
									var type = KOC.resources_cap[j],
										inSeed = KOC.inSeed.resources_cap[ type.name ];
									if( inSeed ){
										if( inSeed.hasOwnProperty('type') ){
											var n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
										} else {
											var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
										}

										if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

										resCDataTrs.eq(j).find('td').eq(i + 2)
											.text( KOC.generic.format( n ) )
											.attr('title', KOC.generic.readable(n))
											.data('ori', n);
									} else {
										resCDataTrs.eq(j).find('td').eq(i + 2)
											.html('&nbsp;')
											.attr('title', '')
											.data('ori', 0);
									}
								}
							//resources upkeep
								for( var j = 0; j < KOC.resources_upkeep.length; j++ ){
									var type = KOC.resources_upkeep[j],
										inSeed = KOC.inSeed.resources_upkeep[ type.name ];
									if( inSeed ){
										if( inSeed.hasOwnProperty('type') ){
											var n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
										} else {
											var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
										}

										if( type.name == 'upkeep' ) n = n * 10;

										resUDataTrs.eq(j).find('td').eq(i + 2)
											.text( KOC.generic.format( n ) )
											.attr('title', KOC.generic.readable(n))
											.data('ori', n);
									} else {
										resUDataTrs.eq(j).find('td').eq(i + 2)
											.html('&nbsp;')
											.attr('title', '')
											.data('ori', 0);
									}
								}
							//resources autonomy
								for( var j = 0; j < KOC.resources_autonomy.length; j++ ){
									var upkeep = KOC.resources_upkeep[j],
										upkeepInSeed = KOC.inSeed.resources_upkeep[ upkeep.name ],
										stock = KOC.resources[j],
										stockInSeed = KOC.inSeed.resources[ stock.name ];

									if( upkeepInSeed && stockInSeed ){
										if( upkeepInSeed.hasOwnProperty('type') ){
											var u = parseFloat( seed[ upkeepInSeed.var ][ upkeepInSeed.type ][ upkeepInSeed.index ] ),
												s = parseFloat( seed[ stockInSeed.var ][ stockInSeed.type ][ stockInSeed.index ] );
											if( s > 0 ) s = s / 3600;
										} else {
											var u = parseFloat( seed[ upkeepInSeed.var ][ upkeepInSeed.index ] ) * 10,
												s = parseFloat( seed[ stockInSeed.var ][ stockInSeed.index ] );
										}

										if( s == 0 || u == 0 ){
											resADataTrs.eq(j).find('td').eq(i + 2)
												.text('-');
										} else {
											var a = s / u * 3600;
											resADataTrs.eq(j).find('td').eq(i + 2)
												.text( KOC.generic.readableDuration( a ) );
										}
									} else {
										resADataTrs.eq(j).find('td').eq(i + 1)
											.html('&nbsp;');
									}
								}
							//troops
								for( var j = 0; j < KOC.troops.length; j++ ){
									var type = KOC.troops[j];
									if( seed.units[ type.name ] ){
										var n = parseFloat( seed.units[ type.name ] );
										troDataTrs.eq(j).find('td').eq(i + 2)
											.text( KOC.generic.format( n ) )
											.attr('title', KOC.generic.readable(n))
											.data('ori', n);
									} else {
										troDataTrs.eq(j).find('td').eq(i + 2)
											.html('&nbsp;')
											.attr('title', '')
											.data('ori', 0);
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
									$tds.filter(':gt(1)').each2(function(j, $tr){
										sum += parseFloat( $tr.data('ori') );
									});

									$tds.eq(1)
										.text( KOC.generic.format( sum ) )
										.attr('title', KOC.generic.readable(sum));
								}
							}
						});
					},
					/* moveable */
						'moveableOn': function(){
							console.info('KOC overview movableOn function');
							KOC.overview.replaceOff();

							KOC.$overview
								.prepend( $dragHandle.clone() )
								.prepend( '<span class="ui-icon ui-icon-close"></span>' )
								.draggable({
									'helper': "original",
									'handle': '.drag-handle',
									'stop': function(event, ui){
										KOC.conf.overview.position = ui.position;
										KOC.nnnstoreConf();
									}
								})
								.resizable({
									'minWidth': 250,
									'minHeight': 250,
									'resize': function(event, ui){
										var tableH = ui.size.height - KOC.overview.$toggles.height() - 5;
										KOC.overview.$table.css('height', tableH);
										KOC.overview.$tbody.css('height', tableH - KOC.overview.$header.height());
									},
									'stop': function(event, ui){
										KOC.conf.overview.size = ui.size;
										KOC.generic.storeConf();
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
									KOC.generic.storeConf();
								});

							if( KOC.conf.overview.visible ){
								KOC.$overview.show();

								var tableH = KOC.conf.overview.size.height - KOC.overview.$toggles.height() - 5;
								KOC.overview.$table.css('height', tableH);
								KOC.overview.$tbody.css('height', tableH - KOC.overview.$header.height());
							}

							var $kocOverviewToggle = $('<button id="koc-overview-toggle">').text('OVERVIEW');
							$kocOverviewToggle.click(function(){
								console.info('$kocOverviewToggle click');
								KOC.$overview.toggle();

								var tableH = KOC.conf.overview.size.height - KOC.overview.$toggles.height() - 5;
								KOC.overview.$table.css('height', tableH);
								KOC.overview.$tbody.css('height', tableH - KOC.overview.$header.height());

								KOC.conf.overview.visible = (KOC.$overview.is(':visible') ? 1 : 0);
								KOC.generic.storeConf();
							});

							KOC.$buttons.append($kocOverviewToggle);
						},
						'moveableOff': function(){
							console.info('KOC overview moveableOff function');
							KOC.$overview
								.draggable('destroy')
								.resizable('destroy')
								.find('.drag-handle, .ui-icon-close').remove();
						},
						'resetPlacement': function(){
							console.info('KOC overview resetPlacement function');
							KOC.$overview.css( KOC.overview.conf.position );
							KOC.conf.overview.position = KOC.overview.options.position;
							KOC.generic.storeConf();
						},
						'resetDimensions': function(){
							console.info('KOC overview resetDimensions function');
							KOC.$overview.css( KOC.overview.conf.size );
							KOC.conf.overview.size = KOC.overview.options.size;
							KOC.generic.storeConf();
						},
					/* replace */
						'replaceOn': function(){
							console.info('KOC overview replaceOn function');
							KOC.overview.moveableOff();

							var $b = $('#kocmain_bottom'),
								p = $b.offset();

							KOC.$overview.css({
								'height': $b.outerHeight(),
								'width': $b.outerWidth(),
								'top': p.top,
								'left': p.left,
							});

							var tableH = KOC.$overview.height() - KOC.overview.$toggles.height() - 5;
							KOC.overview.$table.css('height', tableH);
							KOC.overview.$tbody.css('height', tableH - KOC.overview.$header.height());

							$('#koc-overview-toggle').remove();
						},
						'replaceOff': function(){
							console.info('KOC overview replaceOff function');
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
						var code = '<p>'
							+ '<h2>Formation</h2>'
							+ KOC.generateCheckbox('formation', 'active', 'Activer le module', KOC.conf.formation.active)
							+ '</p>';

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
									 +  '<p>'
									 +  '<input type="checkbox" id="koc-formation-auto-city-'+ cityId +'" name="city" '+ ( rule && rule.active ? 'checked' : '' ) +' value="'+ cityId +'">'
									 +  '<label for="koc-formation-auto-'+ cityId +'">'+ city.name +'</label>';

							//choose unit (check building requirements and tech requirements)
								autoCode += '<label for="koc-formation-auto-city-'+ cityId +'-unit">Unités</label>'
										 +  '<select id="koc-formation-auto-city-'+ cityId +'-unit" name="unit">'
										 +  '<option value=""></option>';

								for( var u in units ){
									if( units.hasOwnProperty(u) ){
										autoCode += '<option value="'+ u +'">'+ units[u] +'</option>';
									}
								}
								autoCode += '</select>';

							//choose pack size min and max
								autoCode += '<label for="koc-formation-auto-city-'+ cityId +'-min">min</label>'
										 +  '<input type="text" id="koc-formation-auto-'+ cityId +'-min" name="min">'
										 +  '<label for="koc-formation-auto-city-'+ cityId +'-max">max</label>'
										 +  '<input type="text" id="koc-formation-auto-'+ cityId +'-max" name="max">'
										 +  '<button>max</button>';

							//choose speed
								autoCode += '<label for="koc-formation-auto-city-'+ cityId +'-speed">Vitesse</label>'
										 +  '<select id="koc-formation-auto-city-'+ cityId +'-speed" name="speed">'
										 +  '<option value="0">Normal</option>'
										 +  '<option value="1">5-15% (coût x2)</option>'
										 +  '<option value="2">10-25% (coût x4)</option>'
										 +  '</select>';

							//choose boost
							// /!\ boost incompatible avec speed
							/*
								autoCode += '<label for="koc-formation-auto-city-'+ cityId +'-item">Objet ?</label>'
										 +  '<select id="koc-formation-auto-city-'+ cityId +'-item" name="item">'
										 +  '<option value="">Non</option>'
										 +  '<option value="36">"+ window.itemlist.i36.name + '(' + (window.seed.items.i36 ? window.seed.items.i36 : 0) + ')</option>'
										 +  '<option value="37">"+ window.itemlist.i37.name + '(' + (window.seed.items.i37 ? window.seed.items.i37 : 0) + ')</option>'
										 +  '<option value="38">"+ window.itemlist.i38.name + '(' + (window.seed.items.i38 ? window.seed.items.i38 : 0) + ')</option>'
										 +  '</select>';
							*/

							//choose workforce percentage
								autoCode += '<label for="koc-formation-auto-city-'+ cityId +'-labor">Travailleurs</label>'
										 +  '<select id="koc-formation-auto-city-'+ cityId +'-labor" name="labor">'
										 +  '<option value=""></option>'
										 +  '</select>';

							//nice to have
								/*
								autoCode += '<label>Durée</label>'
										 +  '<output></output>';
								*/
							autoCode += '</p>';
							//keep resources ? (in easy format, with validation)
							autoCode += '<p>'
									 +  '<label>Garder</label>';

							for( var j = 0; j < KOC.resources.length; j++ ){
								var r = KOC.resources[j];
								autoCode += '<label for="koc-formation-auto-city-keep-'+ r.name +'">'
										 +  '<img src="'+ r.icon +'" title="'+ r.label +'">'
										 +  '</label>'
										 +  '<input type="text" id="koc-formation-auto-city-keep-'+ r.name +'" name="'+ r.name +'">';
							}
							autoCode += '</p>'
									 +  '</div>';
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
												if( KOC.generic.buildingHighestLevel( cityId, building.substr(1) ) < unitc[8][building][1] ){
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
			/* default configuration */
				//each module has its own default conf
				'defaultConf': {
					'confPanel': {
						'position': {'top': 100, 'left': 100},
						'size': {'width': 'auto', 'height': 'auto'},
						'selected': 0,
						'visible': 0,
					}
				},
		};

		var trys = 60;
		function load(){
			if( window.seed && window.seed.cities ){
				console.log(window.seed);
				setTimeout(function(){
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
	//- consommation
	//- autonomie
	//- formation
	//- gains

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
	//- TS
	  //- vérification vague 1 et 2
	  //- liste de coordonnées
	  //- uniquement les vides ou non (exploration)
	//- rappel des quantités de troupes (mode anti-post-it :P)
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
/*'productionPerHour': function( cityId ){
	var modifiers = [],
		wMods = [],
		wilderness = window.seed.wilderness[ cityId ],
		knights = window.seed.knights[ cityId ],
		leaders = window.seed.leaders[ cityId ],
		cityStat = window.seed.citystats[ cityId ],
		tech = window.seed.tech,
		res = window.seed.resources[ cityId ];

	for( var w in wilderness ){
		if( wilderness.hasOwnProperty(w) ){
			var t = parseFloat( wilderness[ w ].tileType );
			wMods[ Math.floor(t / 10) ] = parseFloat( wilderness[ w ].tileLevel );
		}
	}

	var kmod = 0;
	if( knights ){
		var t = knights[ 'knt' + leaders.resourcefulnessKnightId ];
		if( t ){
			kmod = parseFloat( t.resourcefulness );
		}
	}

	var pmod = 1,
		p = citystat['pop'][0],
		l = citystat['pop'][3];
	if( p && l && p < l ){
		pmod = p / l;
	}

	for( var i = 1; i <= KOC.resources_productivity.length; i++ ){
		var u = res['rec' + i],
			t = tech['tch' + i];

		modifiers[i] = parseFloat( (u[2] * (1 + tech / 10 + kmod / 100 + 0.05 * wMods[i]) * pmod + 100 ) );
	}

	return modifiers;
}*/
