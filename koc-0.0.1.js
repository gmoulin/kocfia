console.info('koc start');

var kocConfPanelCss = "#koc-conf-panel-toggle {}"
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

var kocChatMoveableCss = ".kocmain .mod_comm { background: #FCF8DD; border: 1px solid #A56631; z-index: 99998; }"
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

var kocOverviewCss = "#koc-overview { position:absolute; font: 10px/20px Verdana, sans serif; font-width: normal; }"
		+ "\n#koc-overview #koc-overview-fixed-col { float:left; clear: left; margin-top: 20px; }"
		+ "\n#koc-overview #koc-overview-data { overflow: auto; padding-right: 20px; padding-left: 20px; }"
		+ "\n#koc-overview th, #koc-overview td { height: 20px; width: 20px; }"
		+ "\n#koc-overview tr.highlight td, #koc-overview th.highlight { background-color: #F0ECEB; }"
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
			'serverId': null,
			'modules': ['chat', 'transport', 'fb-wall-popup', 'overview'],
			'stored': ['conf'],
			'format': function( num ){

			},
			'init': function(){
				console.info('KOC init function');
				//get server id
					KOC.serverId = KOC.generic.getServerId();
					console.log('serverId', KOC.serverId);
					if( KOC.serverId == null ){
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
						var storedConf = localStorage.getObject('koc_conf_' + KOC.serverId);
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

				//@todo
				//fill 'static' data tables (icons)
					console.time('cities');
					//cities
					console.timeEnd('cities');
					console.time('population');
					//population
					console.timeEnd('population');
					console.time('ressources');
					//ressources
					console.timeEnd('ressources');
					console.time('troops');
					//troops
					console.timeEnd('troops');

				//modules init
					for( var i = 0; i < KOC.modules.length; i++ ){
						console.time('koc '+ KOC.modules[i] +' on');
						KOC[ KOC.modules[i] ].on();
						console.timeEnd('koc '+ KOC.modules[i] +' on');
					}

				//configuration panel
					console.time('confPanel');
					KOC.confPanel();
					console.timeEnd('confPanel');
			},
			'storeConf': function(){
				console.info('KOC storeConf function', KOC.conf);
				localStorage.setObject('koc_conf_' + KOC.serverId, KOC.conf);
			},
			'cities': [],//[{'id','name','gps'}, ...]
			'ressources': [
				{'name': 'gold', 'label': 'or', 'icon': '', 'upkeep': 'goldUpkeep'},
				{'name': 'resource1x3600', 'label': 'nourriture', 'icon': '', 'productivity': 'resource1Productivity', 'upkeep': 'resource1Upkeep', 'cap': 'resource1Capx3600'},
				{'name': 'resource2x3600', 'label': 'bois', 'icon': '', 'productivity': 'resource2Productivity', 'upkeep': 'resource2Upkeep', 'cap': 'resource2Capx3600'},
				{'name': 'resource3x3600', 'label': 'pierre', 'icon': '', 'productivity': 'resource3Productivity', 'upkeep': 'resource3Upkeep', 'cap': 'resource3Capx3600'},
				{'name': 'resource4x3600', 'label': 'minerai', 'icon': '', 'productivity': 'resource4Productivity', 'upkeep': 'resource4Upkeep', 'cap': 'resource4Capx3600'},
				{'name': 'AETHERSTONE', 'label': 'ether', 'icon': ''},
			],
			'population': [
				{'name': 'population', 'label': 'population', 'icon': ''},
				{'name': 'populationCap', 'label': 'plafond', 'icon': ''},
				{'name': 'laborPopulation', 'label': 'péon', 'icon': ''},
				{'name': 'availablePopulation', 'label': 'glandeur', 'icon': '', 'take': 'population', 'substract': 'laborPopulation'},
				{'name': 'taxRate', 'label': 'taxation', 'icon': ''},
				{'name': 'hapiness', 'label': 'bonheur', 'icon': ''},
				{'name': 'grievance', 'label': 'grief', 'icon': ''},
			],
			'troops': [
				{'name': '', 'label': '', 'icon': ''}
			],
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
										var r = JSON.parse(this.responseText);
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
						lis += '<li class="koc-conf-panel-tab '+ (this.conf[mod].active ? 'on' : 'off') +'">'
							 + '<a href="#koc-'+ mod +'">'+ mod.capitalize() +'</a>'
							 + '</li>';
						sections += '<section id="koc-'+ mod +'"></section>';
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
						.append(
							  '<span class="ui-icon ui-icon-close"></span>'
							+ $dragHandle.clone()
							+ '<nav id="koc-conf-panel-tabs"><ul>' + lis + '</ul></nav>'
							+ $optionsSection
							+ sections
						)
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
					KOC.$buttons = $('<div id="koc-buttons">').html( $kocConfPanelToggle );
					KOC.$buttons.insertBefore( $('#main_engagement_tabs') );

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
							KOC[ mod ].modPanel();
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
							code += '<input type="radio" id="'+ module +'-'+ values[i] +'" name="'+ module + '_' + name +'" '+ (selected[i] == 1 ? 'checked' : '') +' />'
						 		  + '<label for="'+ module +'-'+ values[i] +'">'+ labels[i] +'</label>';
						}
					}
					code += '</p>';
					return code;
				},
				'generateSelect': function(module, name, label, selected, options){
					var code = '<p><label for="'+ module + '_' + name +'">'+ label +'</label><select id="'+ module + '_' + name +'"><option value=""></option>';
					if( options.values && options.labels && options.values.length == options.labels.length)
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
							localStorage.removeItem('koc_' + KOC.storedObjects[i] + '_' + KOC.serverId);
						}
					},
					'optionPanel': function($optionsSection){
						console.info('KOC generic optionPanel function');
						$optionsSection.append( KOC.generateButton('generic', 'cleanLocalStorage', 'Remise à zèro des données persistantes') );
						for( var i = 0; i < KOC.modules.length; i++ ){
							KOC[ KOC.modules[i] ].confPanel( $optionsSection );
						}
					},
					'getServerId': function(){
						var regexp = new RegExp('^[a-zA-z]+([0-9]+)\.', 'i'),
							match = regexp.exec(document.location.hostname);
						if( match ){
							return match[1];
						}
						return null;
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
								var persistentFriendsList = localStorage.getObject('koc_chat_friends_list_' + KOC.serverId);
								if( persistentFriendsList ){
									KOC.chat.friendsList = persistentFriendsList.split(',');
								}
							} catch(e){
								console.error(e);
							}

						//highlightFoes
							try{
								var persistentFoesList = localStorage.getObject('koc_chat_foes_list_' + KOC.serverId);
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
											if( $helpLink.attr('onclick').indexOf('claimAllianceChatHelp') == 0 ){
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
							localStorage.setObject('koc_chat_friends_list_' + KOC.serverId, KOC.chat.friendsList.join(','));
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
							localStorage.setObject('koc_chat_foes_list_' + KOC.serverId, KOC.chat.foesList.join(','));
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
							var persistentTransportAutomaticRules = localStorage.getObject('koc_transport_automatic_rules_' + KOC.serverId);
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
							var persistentTransportTemporaryRules = localStorage.getObject('koc_transport_temporary_rules_' + KOC.serverId);
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
					},
					'confPanel': function( $section ){
						console.info('KOC overview confPanel function');
						var code = '<p>'
							+ '<h2>Vue globale</h2>'
							+ KOC.generateCheckbox('overview', 'active', 'Activer le module', KOC.conf.overview.active)
							+ KOC.generateRadio('overview', ['replace', 'moveable'], ['Remplace le dessous du jeu (ne pas oublier de mettre le chat à droite)', 'Vue globale déplacable et redimensionnable'], [KOC.conf.overview.replace, KOC.conf.overview.moveable])
							+ KOC.generateButton('overview', 'resetPlacement', 'Remise à zéro de la position')
							+ KOC.generateButton('overview', 'resetDimensions', 'Remise à zéro des dimensions')
							+ '</p>';

						$section.append( code );
					},
					'on': function(){
						console.info('KOC overview on function');
						$head.append( $('<style id="koc-overview-css">').text(kocOverviewCss) );

						var $overview = $('<section id="koc-overview">'),
							fixed-headers = '<table id="overview-fixed-headers"><thead><tr>',
							fixed-cols = '<table id="overview-fixed-cols">',
							data-table = '<table id="overview-data">',
							data-line = '';

						//headers
						for( var i = 0; i < KOC.cities.length; i++ ){
							fixed-headers += '<th>'+ KOC.cities[i].name +'</th>';
						}

						//data line for cities
						for( var j = 0; j < KOC.cities.length; j++ ){
							data-line += '<td></td>';
						}

						//ressources
						fixed-cols += '<tbody class="ressources">';
						data-table += '<tbody class="ressources">';
						for( var i = 0; i < KOC.ressources.length; i++ ){
							fixed-cols += '<tr><td><img src="'+ KOC.ressources[i].icon +'" title="'+ KOC.ressources[i].label +'"></td><td></td></tr>';
							data-table += '<tr>' + data-line + '</tr>';
						}
						fixed-cols += '</tbody>';
						data-table += '</tbody>';

						//troops
						fixed-cols += '<tbody class="troops">';
						data-table += '<tbody class="troops">';
						for( var i = 0; i < KOC.troops.length; i++ ){
							fixed-cols += '<tr><td><img src="'+ KOC.troops[i].icon +'" title="'+ KOC.troops[i].label +'"></td><td></td></tr>';
							data-table += '<tr>' + data-line + '</tr>';
						}
						fixed-cols += '</tbody>';
						data-table += '</tbody>';

						//population
						fixed-cols += '<tbody class="population">';
						data-table += '<tbody class="popula)ion">';
						for( var i = 0; i < KOC.population.length; i++ ){
							fixed-cols += '<tr><td><img src="'+ KOC.population[i].icon +'" title="'+ KOC.population[i].label +'"></td><td></td></tr>';
							data-table += '<tr>' + data-line + '</tr>';
						}
						fixed-cols += '</tbody>';
						data-table += '</tbody>';

						fixed-headers += '</tr></thead></table>';
						fixed-cols += '</table>';
						data-table += '</table>';

						$overview
							.append( fixed-headers + fixed-col + data-table )
							//highlight from headers
							.on('mouseenter', 'th', function(){
								var line = KOC.overview.$fixed-headers-ths.index( $(this).addClass('highlight') );
								KOC.overview.$data-table-tbodies.each2(function(i, $tbody){
									$tbody.find('tr').each2(function(j, $tr){
										$tr.eq(col).addClass('highlight');
									});
								});
							})
							.on('mouseleave', 'th', function(){
								var line = KOC.overview.$fixed-headers-ths.index( $(this).removeClass('highlight') );
								KOC.overview.$data-table-tbodies.each2(function(i, $tbody){
									$tbody.find('tr').each2(function(j, $tr){
										$tr.eq(col).removeClass('highlight');
									});
								});
							})
							//highlight from fixed cols
							.on('mouseenter', '#overview-fixed-cols tr', function(){
								var $this = $(this).addClass('highlight'),
									c = '.' + $this.closest('tbody').attr('class'),
									line = KOC.overview.$fixed-cols-tbodies.filter(c).find('tr').index( $this );
								KOC.overview.$data-table-tbodies.filter(c).find('tr').eq(line).addClass('highlight');
							})
							.on('mouseleave', '#overview-fixed-cols tr', function(){
								var $this = $(this).removeClass('highlight'),
									c = '.' + $this.closest('tbody').attr('class'),
									line = KOC.overview.$fixed-cols-tbodies.filter(c).find('tr').index( $this );
								KOC.overview.$data-table-tbodies.filter(c).find('tr').eq(line).removeClass('highlight');
							})
							//highlight from body
							.on('mouseenter', '#overview-data-table tr', function(){
								var $this = $(this).addClass('highlight'),
									c = '.' + $this.closest('tbody').attr('class'),
									line = KOC.overview.$data-table-tbodies.filter(c).find('tr').index( $this );
								KOC.overview.$fixed-cols-tbodies.filter(c).find('tr').eq(line).addClass('highlight');
							})
							.on('mouseleave', '#overview-data-table tr', function(){
								var $this = $(this).removeClass('highlight'),
									c = '.' + $this.closest('tbody').attr('class'),
									line = KOC.overview.$data-table-tbodies.filter(c).find('tr').index( $this );
								KOC.overview.$fixed-cols-tbodies.filter(c).find('tr').eq(line).removeClass('highlight');
							})
							.on('mouseenter', '#overview-data-table td', function(){
								var $this = $(this),
									col = $this.parent().find('td').index( $this );
								KOC.overview.$fixed-headers-ths.eq(col).addClass('highlight');
							})
							.on('mouseleave', '#overview-data-table td', function(){
								var $this = $(this),
									col = $this.parent().find('td').index( $this );
								KOC.overview.$fixed-headers-ths.eq(col).removeClass('highlight');
							});

						$('body').append( $overview );
						KOC.$overview = $('#koc-overview');
						KOC.overview.$fixed-headers = $('#koc-overview-fixed-headers');
						KOC.overview.$fixed-headers-ths = KOC.overview.$fixed-headers.find('th');
						KOC.overview.$fixed-cols = $('#koc-overview-fixed-cols');
						KOC.overview.$fixed-cols-tbodies = KOC.overview.$fixed-cols.find('tbody');
						KOC.overview.$data-table = $('#koc-overview-data');
						KOC.overview.$data-table-tbodies = KOC.overview.$data-table.find('tbody');
					},
					'off': function(){
						console.info('KOC overview off function');
						$('#koc-overview-css').remove();
						KOC.$overview.remove();
						KOC.$overview = null;
					},
					'update': function( data ){
						if( data.city ){
							var popFixedTrs = KOC.overview.$fixed-cols-tbodies.filter('.population').find('tr'),
								popDataTrs = KOC.overview.$data-table-tbodies.filter('.population').find('tr'),
								resFixedTrs = KOC.overview.$fixed-cols-tbodies.filter('.ressources').find('tr'),
								resDataTrs = KOC.overview.$data-table-tbodies.filter('.ressources').find('tr'),
								troFixedTrs = KOC.overview.$fixed-cols-tbodies.filter('.troops').find('tr'),
								troDataTrs = KOC.overview.$data-table-tbodies.filter('.troops').find('tr'),
								sums = {'production': {}, 'ressources': {}, 'troops': {}};

							for( var i = 0; i < KOC.cities.length; i++ ){
								var city = data.city[ KOC.cities[i].id ];
								if( city ){
										var prod = city.production;
										if( prod ){
											//production
												for( var j = 0; j < KOC.production.length; j++ ){
													var type = KOC.production[i];
													if( prod.hasOwnProperty(type.name) ){
														resDataTrs.eq(j).find('td').eq(i)
															.text(function(){
																if( !sum.production.hasOwnProperty(type.name) ) sum.production[ type.name ] = 0;
																sum.production[ type.name ] += prod[ type.name ];
																return KOC.format( prod[ type.name ] );
															})
															.attr('title', function(){
																var title = '';
																if( type.upkeep && prod[ type.upkeep ] ){
																	if( !sum.production.hasOwnProperty(type.upkeep) ) sum.production[ type.upkeep ] = 0;
																	sum.production[ type.upkeep ] += prod[ type.upkeep ];
																	title += 'dépense : ' + KOC.format( prod[ type.upkeep ] );
																}
																if( type.productivity && prod[ type.productivity ] ){
																	if( title.length ) title += ' | ';
																	if( !sum.production.hasOwnProperty(type.productivity) ) sum.production[ type.productivity ] = 0;
																	sum.production[ type.productivity ] += prod[ type.productivity ];
																	title += 'production : ' + KOC.format( prod[ type.productivity ] );
																}
																if( type.cap && prod[ type.cap ] ){
																	if( title.length ) title += ' | ';
																	if( !sum.production.hasOwnProperty(type.cap) ) sum.production[ type.cap ] = 0;
																	sum.production[ type.cap ] += prod[ type.cap ];
																	title += 'plafond : ' + KOC.format( prod[ type.cap ] );
																}
																return title;
															});
													}
												}

											//population
												for( var j = 0; j < KOC.population.length; j++ ){
													var type = KOC.population[i];
													if( prod.hasOwnProperty(type.name) ){
														resDataTrs.eq(j).find('td').eq(i)
															.text(function(){
																if( !sum.population.hasOwnProperty(type.name) ) sum.population[ type.name ] = 0;
																sum.population[ type.name ] += prod[ type.name ];
																return KOC.format( prod[ type.name ] );
															});
													} else if( type.name == 'availablePopulation' ) {
														if( prod.hasOwnProperty(type.take) && prod.hasOwnProperty(type.substract) ){
															resDataTrs.eq(j).find('td').eq(i)
																.text(function(){
																	if( !sum.population.hasOwnProperty(type.name) ) sum.population[ type.name ] = 0;
																	var n = prod[ type.take ] - prod[ type.substract ];
																	sum.population[ type.name ] += n;
																	return KOC.format( n );
																});
														}
													}
												}
										}
								}
							}

							if( sums.production ){
								for( var j = 0; j < KOC.production.length; j++ ){
									var type = KOC.production[i];
									resFixedTrs.eq(j).find('td').eq(1)
										.text(function(){
											return sum.production[ type.name ].kocFormat();
										})
										.attr('title', function(){
											var title = '';
											if( type.upkeep && prod[ type.upkeep ] ){
												title += 'dépense : ' + KOC.format( sum.production[ type.upkeep ] );
											}
											if( type.productivity && prod[ type.productivity ] ){
												title += 'production : ' + KOC.format( sum.production[ type.productivity ] );
											}
											if( type.cap && prod[ type.cap ] ){
												title += 'plafond : ' + KOC.format( sum.production[ type.cap ] );
											}
											return title;
										});
								}
							}
							if( sums.population ){
								for( var j = 0; j < KOC.population.length; j++ ){
									var type = KOC.population[i];
									resFixedTrs.eq(j).find('td').eq(1)
										.text(function(){
											return KOC.format( sum.population[ type.name ] );
										});
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
						},
						'moveableOff': function(){
							console.info('KOC overview moveableOff function');
							$('#koc-overview-moveable').remove();
							KOC.$overview
								.draggable('destroy')
								.resizable('destroy')
								.find('.drag-handle').remove();
						},
					/* replace */
						'replaceOn': function(){
							//@toto
							var $b = $('#'),
								p = $b.offset();
							KOC.$overview.css({
								'height': $b.outerHeight(),
								'width': $b.outerWidth(),
								'top': p.top,
								'left': p.left
							});
						},
						'replaceOff': function(){
							console.info('KOC overview moveableOff function');
							$('#koc-overview-moveable').remove();
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
				}
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

		console.time('Koc init');
		KOC.init();
		console.timeEnd('Koc init');
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
