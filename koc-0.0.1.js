console.info('koc start');

var kocConfPanelCss = "#koc-conf-panel-toggle {}"
		+ "\n#koc-conf-panel { max-height: 700px; }"
		+ "\n#koc-conf-panel .drag-handle { height: 36px; }"
		+ "\n#koc-conf-panel .ui-icon-close { float: right; cursor: pointer; }"
		+ "\n#koc-conf-panel .ui-icon-trash { cursor: pointer; display: inline-block; }"
		+ "\n#koc-conf-panel { display: none; position: absolute; z-index: 99999; }"
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
		+ "\n#koc-overview #koc-overview-fixed-col { float:left; clear: left; margin-top: 20px; }"
		+ "\n#koc-overview #koc-overview-data { overflow: auto; padding-right: 20px; padding-bottom: 20px; float:left; }"
		+ "\n#koc-overview th, #koc-overview td { height: 20px; width: 35px; }"
		+ "\n#koc-overview tr.highlight td, #koc-overview th.highlight { background-color: #F0ECEB; }"
		+ "\n#koc-overview-fixedHeaders { padding-left: 54px; }"
		+ "\n#koc-overview-fixedCols { clear: left; float: left; }"
		+ "\n#koc-overview-fixedCols tr td:first-child { width:20px; }"
		+ "\n#koc-overview-fixedCols img { width:20px; }"
		+ "\n#koc-overview-data td { text-align: right; }"
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
			'format': function( num ){
				if( typeof num == 'undefined' || num == null ) return '&nbsp;';
				if( typeof num != 'string' ){
					num = '' + Math.floor(num);
				}
				var l = num.length;
				num = parseFloat(num);
				if( l <= 3 ){
					return num;
				} else if( l <= 6 ){
					return Math.floor(num /          1000) + 'K';
				} else if( l <= 9 ){
					return Math.floor(num /       1000000) + 'M';
				} else if( l <= 12 ){
					return Math.floor(num /    1000000000) + 'G';
				} else {
					return Math.floor(num /    1000000000) + 'G';
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
			'storeConf': function(){
				console.info('KOC storeConf function', KOC.conf);
				localStorage.setObject('koc_conf_' + KOC.server, KOC.conf);
			},
			'cities': [],//[{'id','name','coords': {x,y}}, ...]
			'cityIds': [],
			'resources': [
				{'name': 'gold', 'label': 'or', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{'name': 'upkeep', 'label': 'dépense', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/gold_30.png' },
				{'name': 'resource1x3600', 'label': 'nourriture', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2x3600', 'label': 'bois', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3x3600', 'label': 'pierre', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4x3600', 'label': 'minerai', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
				{'name': 'AETHERSTONE', 'label': 'pierre d\'éther', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/aetherstone_30.png'},
				{'name': 'resource1Productivity', 'label': 'production', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2Productivity', 'label': 'production', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3Productivity', 'label': 'production', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4Productivity', 'label': 'production', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
				{'name': 'resource1Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4Capx3600', 'label': 'plafond', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
				{'name': 'resource1Upkeep', 'label': 'dépense', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/food_30.png' },
				{'name': 'resource2Upkeep', 'label': 'dépense', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/wood_30.png' },
				{'name': 'resource3Upkeep', 'label': 'dépense', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/stone_30.png' },
				{'name': 'resource4Upkeep', 'label': 'dépense', 'icon': 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/iron_30.png' },
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
					'upkeep': {'index': 3, 'var': 'gold'},
					'resource1x3600': {'index': 0, 'type': 'rec1', 'var': 'res'},
					'resource2x3600': {'index': 0, 'type': 'rec2', 'var': 'res'},
					'resource3x3600': {'index': 0, 'type': 'rec3', 'var': 'res'},
					'resource4x3600': {'index': 0, 'type': 'rec4', 'var': 'res'},
					'resource1Capx3600': {'index': 1, 'type': 'rec1', 'var': 'res'},
					'resource2Capx3600': {'index': 1, 'type': 'rec2', 'var': 'res'},
					'resource3Capx3600': {'index': 1, 'type': 'rec3', 'var': 'res'},
					'resource4Capx3600': {'index': 1, 'type': 'rec4', 'var': 'res'},
					'resource5': {'index': 0, 'type': 'rec5', 'var': 'res'},
					'resource2Productivity': {'index': 2, 'type': 'rec2', 'var': 'res'},
					'resource1Productivity': {'index': 2, 'type': 'rec1', 'var': 'res'},
					'resource3Productivity': {'index': 2, 'type': 'rec3', 'var': 'res'},
					'resource4Productivity': {'index': 2, 'type': 'rec4', 'var': 'res'},
					'resource2Upkeep': {'index': 3, 'type': 'rec2', 'var': 'res'},
					'resource1Upkeep': {'index': 3, 'type': 'rec1', 'var': 'res'},
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
											KOC.overview.update(r.updateSeed);
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
											KOC.overview.update(r.updateSeed);
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
											KOC.overview.update(r.data);
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
											KOC.overview.update(r.updateSeed);
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

					var $optionsSection = $('<section id="koc-options">'),
						lis = '<li><a href="#koc-options">Options</a></li>',
						sections = '';

					for( var i = 0; i < KOC.modules.length; i++ ){
						var mod = KOC.modules[i];
						if( typeof KOC[mod].modPanel == 'function' ){
							lis += '<li class="koc-conf-panel-tab '+ (this.conf[mod].active ? 'on' : 'off') +'">'
								 + '<a href="#koc-'+ mod +'">'+ mod.capitalize() +'</a>'
								 + '</li>';
							sections += '<section id="koc-'+ mod +'"></section>';
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
							KOC.storeConf();

							if( typeof KOC[ mod ][ func ] == 'function' ) KOC[ mod ][ func ]();
							else console.warn('not a function', mod, func, typeof KOC[ mod ][ func ]);
						})
						.on('change', 'select', function(){
							var $this = $(this),
								infos = this.id.split('-'),
								mod = infos[0],
								option = infos[1];

							KOC.conf[ mod ][ option ] = $this.val();
							KOC.storeConf();
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
								KOC.storeConf();
							}
						})
						.resizable({
							minWidth: 250,
							minHeight: 250,
							handles: 'n, e, s, w, ne, se, sw, nw',
							stop: function(event, ui){
								KOC.conf.confPanel.size = ui.size;
								KOC.storeConf();

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
								KOC.storeConf();

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
							KOC.storeConf();
						});

					var $kocConfPanelToggle = $('<button id="koc-conf-panel-toggle">').text('KOC');
					$kocConfPanelToggle.click(function(){
						console.info('$kocConfPanelToggle click');
						KOC.$confPanel.toggle();
						KOC.conf.confPanel.visible = (KOC.$confPanel.is(':visible') ? 1 : 0);
						KOC.storeConf();
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
							KOC.cityIds.push( c[0] );
						}
						console.timeEnd('cities');
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
									handle: '.drag-handle',
									'stop': function(event, ui){
										KOC.conf.chat.position = ui.position;
										KOC.storeConf();
									}
								})
								.resizable({
									minWidth: 250,
									resize: function(event, ui){
										$chat
											.find('.comm_body')
												.css('height', function(){ return ui.size.height - 20;})
											.find('.chatlist')
												.css('height', function(){ return $(this).parent().height() - 43; });

										$chatInput
											.width(function(){ return ui.size.width - 65; })
											.siblings('.button20').css('left', function(){ return ui.size.width - 55; });
									},
									stop: function(event, ui){
										KOC.conf.chat.size = ui.size;
										KOC.storeConf();
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
							KOC.storeConf();
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
						'size': {'width': false, 'height': false},
						'replace': 0,
						'moveable': 1,
						'visible': 0,
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

						var fixedHeaders = '<table id="koc-overview-fixedHeaders"><thead><tr>',
							fixedCols = '<table id="koc-overview-fixedCols">',
							dataTable = '<table id="koc-overview-data">',
							dataLine = '',
							$overview = $('<section id="koc-overview" class="ui-widget ui-widget-content ui-corner-all">');

						//headers
							for( var i = 0; i < KOC.cities.length; i++ ){
								fixedHeaders += '<th title="'+ KOC.cities[i].name +'">'+ window.roman[i] +'</th>';
							}

						//data line for cities
							for( var j = 0; j < KOC.cities.length; j++ ){
								dataLine += '<td>&nbsp;</td>';
							}

						//resources
							fixedCols += '<tbody class="resources">';
							dataTable += '<tbody class="resources">';
							for( var i = 0; i < KOC.resources.length; i++ ){
								fixedCols += '<tr><td><img src="'+ KOC.resources[i].icon +'" title="'+ KOC.resources[i].label +'"></td><td></td></tr>';
								dataTable += '<tr>' + dataLine + '</tr>';
							}
							fixedCols += '</tbody>';
							dataTable += '</tbody>';

						//troops
							fixedCols += '<tbody class="troops">';
							dataTable += '<tbody class="troops">';
							for( var i = 0; i < KOC.troops.length; i++ ){
								fixedCols += '<tr><td><img src="'+ KOC.troops[i].icon +'" title="'+ KOC.troops[i].label +'"></td><td></td></tr>';
								dataTable += '<tr>' + dataLine + '</tr>';
							}
							fixedCols += '</tbody>';
							dataTable += '</tbody>';

						//population
							fixedCols += '<tbody class="population">';
							dataTable += '<tbody class="population">';
							for( var i = 0; i < KOC.population.length; i++ ){
								fixedCols += '<tr><td><img src="'+ KOC.population[i].icon +'" title="'+ KOC.population[i].label +'"></td><td></td></tr>';
								dataTable += '<tr>' + dataLine + '</tr>';
							}
							fixedCols += '</tbody>';
							dataTable += '</tbody>';

							fixedHeaders += '</tr></thead></table>';
							fixedCols += '</table>';
							dataTable += '</table>';

						$overview
							.append( fixedHeaders + fixedCols + dataTable )
							//highlight from headers
								.on('mouseenter', 'th', function(){
									var col = KOC.overview.$fixedHeadersThs.index( $(this).addClass('highlight') );
									KOC.overview.$dataTableTbodies.each2(function(i, $tbody){
										console.log($tbody);
										$tbody.find('tr').each2(function(j, $tr){
											console.log($tr);
											console.log($tr.find('td'));
											$tr.find('td').eq(col).addClass('highlight');
										});
									});
								})
								.on('mouseleave', 'th', function(){
									var col = KOC.overview.$fixedHeadersThs.index( $(this).removeClass('highlight') );
									KOC.overview.$dataTableTbodies.each2(function(i, $tbody){
										$tbody.find('tr').each2(function(j, $tr){
											$tr.find('td').eq(col).removeClass('highlight');
										});
									});
								})
							//highlight from fixed cols
								.on('mouseenter', '#koc-overview-fixedCols tr', function(){
									var $this = $(this).addClass('highlight'),
										c = '.' + $this.closest('tbody').attr('class'),
										line = KOC.overview.$fixedColsTbodies.filter(c).find('tr').index( $this );
									KOC.overview.$dataTableTbodies.filter(c).find('tr').eq(line).addClass('highlight');
								})
								.on('mouseleave', '#koc-overview-fixedCols tr', function(){
									var $this = $(this).removeClass('highlight'),
										c = '.' + $this.closest('tbody').attr('class'),
										line = KOC.overview.$fixedColsTbodies.filter(c).find('tr').index( $this );
									KOC.overview.$dataTableTbodies.filter(c).find('tr').eq(line).removeClass('highlight');
								})
							//highlight from body
								.on('mouseenter', '#koc-overview-dataTable tr', function(){
									var $this = $(this).addClass('highlight'),
										c = '.' + $this.closest('tbody').attr('class'),
										line = KOC.overview.$dataTableTbodies.filter(c).find('tr').index( $this );
									KOC.overview.$fixedColsTbodies.filter(c).find('tr').eq(line).addClass('highlight');
								})
								.on('mouseleave', '#koc-overview-dataTable tr', function(){
									var $this = $(this).removeClass('highlight'),
										c = '.' + $this.closest('tbody').attr('class'),
										line = KOC.overview.$dataTableTbodies.filter(c).find('tr').index( $this );
									KOC.overview.$fixedColsTbodies.filter(c).find('tr').eq(line).removeClass('highlight');
								})
								.on('mouseenter', '#koc-overview-dataTable td', function(){
									var $this = $(this),
										col = $this.parent().find('td').index( $this );
									KOC.overview.$fixedHeadersThs.eq(col).addClass('highlight');
								})
								.on('mouseleave', '#koc-overview-dataTable td', function(){
									var $this = $(this),
										col = $this.parent().find('td').index( $this );
									KOC.overview.$fixedHeadersThs.eq(col).removeClass('highlight');
								});

						$body.append( $overview );
						KOC.$overview = $('#koc-overview');
						KOC.overview.$fixedHeaders = $('#koc-overview-fixedHeaders');
						KOC.overview.$fixedHeadersThs = KOC.overview.$fixedHeaders.find('th');
						KOC.overview.$fixedCols = $('#koc-overview-fixedCols');
						KOC.overview.$fixedColsTbodies = KOC.overview.$fixedCols.find('tbody');
						KOC.overview.$dataTable = $('#koc-overview-data');
						KOC.overview.$dataTableTbodies = KOC.overview.$dataTable.find('tbody');

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
					'update': function( data ){
						console.info('KOC overview update function', data);
return;
						if( data.city ){
							var popFixedTrs = KOC.overview.$fixedColsTbodies.filter('.population').find('tr'),
								popDataTrs = KOC.overview.$dataTableTbodies.filter('.population').find('tr'),
								resFixedTrs = KOC.overview.$fixedColsTbodies.filter('.resources').find('tr'),
								resDataTrs = KOC.overview.$dataTableTbodies.filter('.resources').find('tr'),
								troFixedTrs = KOC.overview.$fixedColsTbodies.filter('.troops').find('tr'),
								troDataTrs = KOC.overview.$dataTableTbodies.filter('.troops').find('tr'),
								sums = {};

							for( var i = 0; i < KOC.cityIds.length; i++ ){
								var city = data.city[ KOC.cityIds[i] ];
								if( city ){
									var prod = city.production;
									if( prod ){
										//resources
											if( !sums.hasOwnProperty('resources') ) sums.resources = {};
											for( var j = 0; j < KOC.resources.length; j++ ){
												var type = KOC.resources[j];
												if( prod.hasOwnProperty(type.name) ){
													resDataTrs.eq(j).find('td').eq(i)
														.text(function(){
															if( !sums.resources.hasOwnProperty(type.name) ) sums.resources[ type.name ] = 0;
															var n = parseFloat(prod[ type.name ]);
															if( type.name.indexOf('x3600') > -1 ) n = Math.floor( n / 3600 );
															else if( type.name == 'upkeep' ) n *= 10;
															sums.resources[ type.name ] += n;
															return KOC.format( n );
														})
														.attr('title', function(){
															var n = parseFloat(prod[ type.name ]);
															if( type.name.indexOf('x3600') > -1 ) n = Math.floor( n / 3600 );
															else if( type.name == 'upkeep' ) n *= 10;
															return KOC.readable(n);
														});
												}
											}

										//population
											if( !sums.population ) sums.population = {};
											for( var j = 0; j < KOC.population.length; j++ ){
												var type = KOC.population[j];
												if( prod.hasOwnProperty(type.name) ){
													popDataTrs.eq(j).find('td').eq(i)
														.text(function(){
															if( !sums.population.hasOwnProperty(type.name) ) sums.population[ type.name ] = 0;
															var n = parseFloat(prod[ type.name ]);
															sums.population[ type.name ] += n;
															return KOC.format( n );
														});
												} else if( type.name == 'availablePopulation' ) {
													if( prod.hasOwnProperty(type.take) && prod.hasOwnProperty(type.substract) ){
														popDataTrs.eq(j).find('td').eq(i)
															.text(function(){
																if( !sums.population.hasOwnProperty(type.name) ) sums.population[ type.name ] = 0;
																var n = parseFloat(prod[ type.take ]) - parseFloat(prod[ type.substract ]);
																sums.population[ type.name ] += n;
																return KOC.format( n );
															});
													}
												}
											}
									}
								}
							}

							if( sums.resources ){
								for( var j = 0; j < KOC.resources.length; j++ ){
									var type = KOC.resources[j];
									resFixedTrs.eq(j).find('td').eq(1)
										.text(function(){
											return KOC.format( sums.resources[ type.name ] );
										})
										.attr('title', function(){
											var n = parseFloat(prod[ type.name ]);
											if( type.name.indexOf('x3600') > -1 ) n = Math.floor( n / 3600 );
											var title = KOC.readable( n );
											if( type.upkeep && prod[ type.upkeep ] ){
												title += ' ; dépense : ' + KOC.format( sums.resources[ type.upkeep ] );
											}
											if( type.productivity && prod[ type.productivity ] ){
												title += ' ; production : ' + KOC.format( sums.resources[ type.productivity ] );
											}
											if( type.cap && prod[ type.cap ] ){
												title += ' ; plafond : ' + KOC.format( sums.resources[ type.cap ] );
											}
											return title;
										});
								}
							}
							if( sums.population ){
								for( var j = 0; j < KOC.population.length; j++ ){
									var type = KOC.population[j];
									resFixedTrs.eq(j).find('td').eq(1)
										.text(function(){
											return KOC.format( sums.population[ type.name ] );
										});
								}
							}
						}
					},
					'updateFromSeed': function(){
						console.info('KOC overview updateFromSeed function');
						var popFixedTrs = KOC.overview.$fixedColsTbodies.filter('.population').find('tr'),
							popDataTrs = KOC.overview.$dataTableTbodies.filter('.population').find('tr'),
							resFixedTrs = KOC.overview.$fixedColsTbodies.filter('.resources').find('tr'),
							resDataTrs = KOC.overview.$dataTableTbodies.filter('.resources').find('tr'),
							troFixedTrs = KOC.overview.$fixedColsTbodies.filter('.troops').find('tr'),
							troDataTrs = KOC.overview.$dataTableTbodies.filter('.troops').find('tr'),
							sums = {};

						for( var i = 0; i < KOC.cityIds.length; i++ ){
							var stats = window.seed.citystats[ 'city' + KOC.cityIds[i] ],
								seed = {
									'pop': stats.pop,
									'gold': stats.gold,
									'res': window.seed.resources[ 'city' + KOC.cityIds[i] ],
									'units': window.seed.units[ 'city' + KOC.cityIds[i] ]
								};

							//population
								if( !sums.hasOwnProperty('pop') ) sums['pop'] = {};
								for( var j = 0; j < KOC.population.length; j++ ){
									var type = KOC.population[j],
										inSeed = KOC.inSeed.population[ type.name ];
									if( !sums.pop.hasOwnProperty(type.name) ) sums.pop[ type.name ] = 0;
									if( inSeed ){
										var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );

										popDataTrs.eq(j).find('td').eq(i)
											.text( KOC.format( n ) )
											.attr('title', KOC.readable( n ));

										sums.pop[ type.name ] = sums.pop[ type.name ] + n;
									} else if( type.name == 'availablePopulation' ){
										var take = KOC.inSeed.population[ type.take ],
											substract = KOC.inSeed.population[ type.substract ],
											n = parseFloat( seed[ take.var ][ take.index ] ) - parseFloat( seed[ substract.var ][ substract.index ] );

										popDataTrs.eq(j).find('td').eq(i)
											.text( KOC.format( n ) )
											.attr('title', KOC.readable( n ));

										sums.pop[ type.name ] = sums.pop[ type.name ] + n;
									} else {
										popDataTrs.eq(j).find('td').eq(i)
											.html('&nbsp;')
											.attr('title', KOC.readable( n ));
									}
								}
							//resources
								if( !sums.hasOwnProperty('res') ) sums['res'] = {};
								for( var j = 0; j < KOC.resources.length; j++ ){
									var type = KOC.resources[j],
										inSeed = KOC.inSeed.resources[ type.name ];
									if( !sums.res.hasOwnProperty(type.name) ) sums.res[ type.name ] = 0;
									if( inSeed ){
										if( inSeed.hasOwnProperty('type') ){
											var n = parseFloat( seed[ inSeed.var ][ inSeed.type ][ inSeed.index ] );
										} else {
											var n = parseFloat( seed[ inSeed.var ][ inSeed.index ] );
										}

										if( type.name.indexOf('x3600') > -1 ) n = n / 3600;
										else if( type.name == 'upkeep' ) n *= 10;

										sums.res[ type.name ] = sums.res[ type.name ] + n;

										resDataTrs.eq(j).find('td').eq(i)
											.text( KOC.format( n ) )
											.attr('title', KOC.readable(n));
									} else {
										resDataTrs.eq(j).find('td').eq(i)
											.html('&nbsp;')
											.attr('title', '');
									}
								}
							//troops
								if( !sums.hasOwnProperty('tro') ) sums['tro'] = {};
								for( var j = 0; j < KOC.troops.length; j++ ){
									var type = KOC.troops[j];
									if( !sums.tro.hasOwnProperty(type.name) ) sums.tro[ type.name ] = 0;
									if( seed.units[ type.name ] ){
										var n = parseFloat( seed.units[ type.name ] );
										troDataTrs.eq(j).find('td').eq(i)
											.text( KOC.format( n ) )
											.attr('title', KOC.readable(n));
										sums.tro[ type.name ] = sums.tro[ type.name ] + n;
									} else {
										troDataTrs.eq(j).find('td').eq(i)
											.html('&nbsp;')
											.attr('title', '');
									}
								}
						}

						if( sums.res ){
							for( var j = 0; j < KOC.resources.length; j++ ){
								var type = KOC.resources[j];
								if( sums.res[ type.name ] ){
									resFixedTrs.eq(j).find('td').eq(1)
										.text( KOC.format( sums.res[ type.name ] ) )
										.attr('title', KOC.readable( sums.res[ type.name ] ));
								} else {
									resFixedTrs.eq(j).find('td').eq(1)
										.html('&nbsp;')
										.attr('title', '');
								}
							}
						}

						if( sums.pop ){
							for( var j = 0; j < KOC.population.length; j++ ){
								var type = KOC.population[j];
								if( sums.pop[ type.name ] ){
									popFixedTrs.eq(j).find('td').eq(1)
										.text( KOC.format( sums.pop[ type.name ] ) )
										.attr('title', KOC.readable( sums.pop[ type.name ] ));
								} else {
									popFixedTrs.eq(j).find('td').eq(1)
										.html('&nbsp;')
										.attr('title', '');
								}
							}
						}

						if( sums.tro ){
							for( var j = 0; j < KOC.troops.length; j++ ){
								var type = KOC.troops[j];
								if( sums.tro[ type.name ] ){
									troFixedTrs.eq(j).find('td').eq(1)
										.text( KOC.format( sums.tro[ type.name ] )
										.attr('title', KOC.readable( sums.tro[ type.name ] ));
								} else {
									troFixedTrs.eq(j).find('td').eq(1)
										.html('&nbsp;')
										.attr('title', '');
								}
							}
						}
					},
					/* moveable */
						'moveableOn': function(){
							console.info('KOC overview movableOn function');
							KOC.overview.replaceOff();

							KOC.$overview
								.draggable({
									'helper': "original",
									handle: '.drag-handle',
									'stop': function(event, ui){
										KOC.conf.overview.position = ui.position;
										KOC.storeConf();
									}
								})
								.resizable({
									minWidth: 250,
									minHeight: 250,
									stop: function(event, ui){
										KOC.conf.overview.size = ui.size;
										KOC.storeConf();
									}
								})
								.css({
									'top': KOC.conf.overview.position.top,
									'left': KOC.conf.overview.position.left,
								})
								.prepend( $dragHandle.clone() );

							if( KOC.conf.overview.visible ){
								KOC.$overview.show();
							}

							var $kocOverviewToggle = $('<button id="koc-overview-toggle">').text('OVERVIEW');
							$kocOverviewToggle.click(function(){
								console.info('$kocOverviewToggle click');
								KOC.$overview.toggle();
								KOC.conf.overview.visible = (KOC.$overview.is(':visible') ? 1 : 0);
								KOC.storeConf();
							});

							KOC.$buttons.append($kocOverviewToggle);
						},
						'moveableOff': function(){
							console.info('KOC overview moveableOff function');
							KOC.$overview
								.draggable('destroy')
								.resizable('destroy')
								.find('.drag-handle').remove();
						},
					/* replace */
						'replaceOn': function(){
							//@toto
							KOC.overview.moveableOff();
							var $b = $('#kocmain_bottom'),
								p = $b.offset();
							KOC.$overview.css({
								'height': $b.outerHeight(),
								'width': $b.outerWidth(),
								'top': p.top,
								'left': p.left
							});
							$('#koc-overview-toggle').remove();
						},
						'replaceOff': function(){
							console.info('KOC overview replaceOff function');
							KOC.$overview
								.draggable('destroy')
								.resizable('destroy')
								.find('.drag-handle').remove();
						},
						'resetPlacement': function(){
							KOC.$overview.css( KOC.overview.conf.position );
							KOC.conf.overview.position = KOC.overview.options.position;
							KOC.storeConf();
						},
						'resetDimensions': function(){
							KOC.$overview.css( KOC.overview.conf.size );
							KOC.conf.overview.size = KOC.overview.options.size;
							KOC.storeConf();
						},
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

/*
column-count: 3;
column-gap: 3em;
column-rule: 1px solid #CCC;

column-span: all;

*/
