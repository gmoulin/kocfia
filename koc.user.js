// ==UserScript==
// @name			KOC
// @version			0.1
// @namespace		KOC
// @description		améliorations et automatisations diverses pour KOC
// @require			http://userscripts.org/scripts/source/68059.user.js
// @require			http://code.jquery.com/jquery-1.7.min.js
// @require			http://koc.kapok.fr/jquery-ui-1.8.16.custom.min.js
// @include			*kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==

/*
 * http://userscripts.org/scripts/source/68059.user.js -> used to run the whole script inside the page scope
 * else prototypes are not reachable (grease monkey sandbox limitation)
 */

console.info('koc start');

jQuery.noConflict(); //the iframe already have a jquery 1.4 and prototype libraries

var kocCss = "#crossPromoBarContainer, #progressBar { display: none !important; }"
		+ "\n.drag-handle { cursor: move; width: 10px; height: 20px; background-color: grey; float: left;}"
;

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
		return false;
	}

String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
};


var kocFrame = parent.document.getElementById('kofc_iframe_0');
//force koc iframe to width 100%
kocFrame.style.width = '100%';

//force wrapping iframe to width 100%
var style = document.createElement('style')
style.innerHTML = 'body { margin:0; width:100% !important;}';
kocFrame.parentNode.appendChild(style);

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
			'init': function(){
				console.info('KOC init function');

				//clean and arrange the window
					$head.append( $('<link rel="stylesheet" href="http://koc.kapok.fr/jquery-ui-1.8.16.custom.css" type="text/css">') )
								.append( $('<style>').text(kocCss) );

				//gather the default conf
					for( var i = 0; i < KOC.modules.length; i++ ){
						var mod = KOC.modules[i];
						KOC.defaultConf[mod] = KOC[mod].options;
					}
					KOC.conf = KOC.defaultConf;

					console.log(KOC.defaultConf);
				//get stored conf if present
					try {
						var storedConf = localStorage.getObject('koc_conf');
						if( storedConf ){
							$.extend(true, KOC.conf, storedConf);
							console.info('used stored conf');
							console.log(storedConf);
						}
					} catch( e ){
						console.error(e);
					}
					console.log(KOC.conf);

				//ajax sniffer
					KOC.ajaxSniffer();

				//modules init
					for( var i = 0; i < KOC.modules.length; i++ ){
						KOC[ KOC.modules[i] ].on();
					}

				//configuration panel
					KOC.confPanel();
			},
			'storeConf': function(){
				console.info('KOC storeConf function', KOC.conf);
				localStorage.setObject('koc_conf', KOC.conf);
			},
			'modules': ['chat', 'transport'],
			'towns': {},
			/* AJAX SNIFFER */
				'ajaxSniffer': function(){
					console.info('KOC ajaxSniffer function');
					XMLHttpRequest.prototype.oldOpen = XMLHttpRequest.prototype.open;
					var newOpen = function(method, url, async, user, password){
						var filename = url.substring(url.lastIndexOf('/')+1);
						switch(filename){
							case 'getChat.php':
								if( KOC.conf.chat.active && ( KOC.conf.chat.cleanHelp || KOC.conf.chat.highlightLeaders || KOC.conf.chat.highlightFriends || KOC.conf.chat.highlightFoes ) ){
									this.addEventListener("load", function(){
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

									}, false);
								}
								break;
							case 'allianceGetLeaders.php':
								if( KOC.conf.chat.active && KOC.conf.chat.highlightLeaders ){
									this.addEventListener("load", function(){
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
									}, false);
								}
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

					var $tabs = $('<ul>'),
						$optionsSection = $('<section id="koc-options">');

					$tabs.append('<li><a href="#koc-options">Options</a></li>');

					for( var i = 0; i < KOC.modules.length; i++ ){
						var mod = KOC.modules[i];
						$tabs.append(
							'<li class="koc-conf-panel-tab '+ (this.conf[mod].active ? 'on' : 'off') +'">'
							+ '<a href="#koc-'+ mod +'">'+ mod.capitalize() +'</a>'
							+ '</li>'
						);
						$confPanel.append( '<section id="koc-'+ mod +'"></section>' );
					}

					KOC.generic.optionPanel( $optionsSection );

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
								else if( typeof KOC[ mod ][ func ] != 'function' ) func += 'On';
							} else {
								status = 0;
								if( func == 'active' ) func = 'off';
								else if( typeof KOC[ mod ][ func ] != 'function' ) func += 'Off';
							}

							KOC.conf[ mod ][ infos[1] ] = status;
							KOC.storeConf();

							if( typeof KOC[ mod ][ func ] == 'function' ) KOC[ mod ][ func ]();
							else console.error(mod, func, typeof KOC[ mod ][ func ], KOC[ mod ][ func ]);
						})
						.on('click', 'button', function(e){
							e.preventDefault();
							var $this = $(this),
								infos = $this.attr('rel').split('-');
							KOC[ infos[0] ][ infos[1] ]();
						});

					$confPanel
						.prepend( $('<nav id="koc-conf-panel-tabs">').append( $tabs ) )
						.prepend( $dragHandle.clone() )
						.prepend( '<span class="ui-icon ui-icon-close"></span>' )
						.append( $optionsSection )
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
					KOC.$buttons = $('<div id="koc-buttons">').append( $kocConfPanelToggle );
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
							KOC[ mod ].modPanel();
						}

						KOC.$confPanel.show();
					}
				},
				'generateOption': function(module, option, text, checked){
					return '<p><input type="checkbox" id="'+ module +'-'+ option +'" '+ (checked ? 'checked' : '') +' /><label for="'+ module +'-'+ option +'">'+ text +'</label></p>';
				},
				'generateButton': function(module, action, text){
					return '<p><button rel="'+ module +'-'+ action +'">'+ text +'</button></p>';
				},
			/* GENERIC */
				'generic': {
					'cleanLocalStorage': function(){
						console.info('KOC generic cleanLocalStorage function');
						localStorage.clear();
					},
					'optionPanel': function($optionsSection){
						console.info('KOC generic optionPanel function');
						$optionsSection.append( KOC.generateButton('generic', 'cleanLocalStorage', 'Remise à zèro des données persistantes') );
						for( var i = 0; i < KOC.modules.length; i++ ){
							KOC[ KOC.modules[i] ].confPanel( $optionsSection );
						}
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
					'friendsList': [],
					'foesList': [],
					'leaders': {},
					'confPanel': function( $section ){
						console.info('KOC chat confPanel function');
						var $code = $('<p>').append( $('<h2>').text('Chat') );
						$code.append( KOC.generateOption('chat', 'active', 'Activer le module', KOC.conf.chat.active) );
						$code.append( KOC.generateOption('chat', 'moveable', 'Chat déplacable et redimensionnable', KOC.conf.chat.moveable) );
						$code.append( KOC.generateOption('chat', 'cleanHelp', 'Aider automiquement et masquer les demandes', KOC.conf.chat.cleanHelp) );
						$code.append( KOC.generateButton('chat', 'onRight', 'Repositionner le chat à droite') );
						$code.append( KOC.generateOption('chat', 'highlightLeaders', 'Changer la couleur des messages de la chancellerie (chats Général et Alliance)', KOC.conf.chat.highlightLeaders) );
						$code.append( KOC.generateButton('chat', 'getLeadersList', 'Raffraîchir la liste des joueurs de la chancellerie') );
						$code.append( KOC.generateOption('chat', 'highlightFriends', 'Changer la couleur des messages des amis (chat Général)', KOC.conf.chat.highlightFriends) );
						$code.append( KOC.generateOption('chat', 'highlightFoes', 'Changer la couleur des messages des ennemis (chat Général)', KOC.conf.chat.highlightFoes) );

						$section.append( $code );
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
								var persistentFriendsList = localStorage.getObject('koc_chat_friends_list');
								if( persistentFriendsList ){
									KOC.chat.friendsList = persistentFriendsList.split(',');
								}
							} catch(e){
								console.error(e);
							}

						//highlightFoes
							try{
								var persistentFoesList = localStorage.getObject('koc_chat_foes_list');
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
							localStorage.setObject('koc_chat_friends_list', KOC.chat.friendsList.join(','));
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
							localStorage.setObject('koc_chat_foes_list', KOC.chat.foesList.join(','));
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
					'automaticRules': {},
					'temporaryRules': {},
					'confPanel': function( $section ){
						console.info('KOC transport confPanel function');
						var $code = $('<p>').append( $('<h2>').text('Transport') );
						$code.append( KOC.generateOption('transport', 'active', 'Activer le module', KOC.conf.transport.active) );

						$section.append( $code );
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
							var persistentTransportAutomaticRules = localStorage.getObject('koc_transport_automatic_rules');
							if( persistentTransportAutomaticRules ){
								KOC.transport.automaticRules = persistentTransportAutomaticRules;
							}
						} catch(e){
							console.error(e);
						}

						if( KOC.conf.transport.automatic ){
							KOC.conf.transport.automaticOn();
						}

						try{
							var persistentTransportTemporaryRules = localStorage.getObject('koc_transport_temporary_rules');
							if( persistentTransportTemporaryRules ){
								KOC.transport.temporaryRules = persistentTransportTemporaryRules;
							}
						} catch(e){
							console.error(e);
						}
					},
					'off': function(){
						console.info('KOC transport off function');

						KOC.conf.transport.automaticOff();
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
			'conf': { // will contains all the modules default configuration options
			}
		};

		setTimeout(function(){ KOC.init(); }, 10000);
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
updateSeed.php
{"ok":true,"updateSeed":{"city":{"60115":{"production":{"ok":true,"mightInc":0,"reports":[],"fiscalUnixTime":1.32079439e+9,"happiness":"91","grievance":"0","population":"19656","laborPopulation":"8800","populationCap":"21600","gold":133088779,"goldUpkeep":"294","taxRate":"0","resourceUnixTime":1320794614,"resource1x3600":2.56759151e+12,"resource2x3600":6.17511239e+11,"resource3x3600":1.37605195e+11,"resource4x3600":1.10328477e+12,"resource1Productivity":"5750","resource2Productivity":"4040","resource3Productivity":"26400","resource4Productivity":"53900","resource1Capx3600":"2106000000","resource2Capx3600":"1490760000","resource3Capx3600":"9540000000","resource4Capx3600":"19440000000","resource1Upkeep":"324866","resource2Upkeep":"0","resource3Upkeep":"0","resource4Upkeep":"0","AETHERSTONE":"500"},"construction":{"eventUnixTime":"1320796869","constructionUnixTime":"1320793930","cityId":"60115","buildingId":"1498975","mayorPolitics":"72","techLevel":"6","constructionType":"4","constructionLevel":"7","constructionProgress":"0","constructionNeeded":"5760","constructionEta":"2011-11-08 16:01:09","constructionTicker":"2011-11-08 15:12:10","constructionStatus":"1","eventType":10},"research":{"eventUnixTime":"1320917411","researchUnixTime":"1320773902","cityId":"60115","playerId":null,"mayorInt":"72","techId":"10","researchLevel":"8","researchProgress":"9629","researchNeeded":"204800","researchEta":"2011-11-10 01:30:11","researchTicker":"2011-11-08 09:38:22","researchStatus":"1","eventType":20}},"60451":{"production":{"ok":true,"mightInc":0,"reports":[],"fiscalUnixTime":1.32079434e+9,"happiness":"91","grievance":"0","population":"19656","laborPopulation":"8770","populationCap":"21600","gold":29989267,"goldUpkeep":"240","taxRate":"0","resourceUnixTime":1320794614,"resource1x3600":3.66683956e+12,"resource2x3600":7.38384539e+11,"resource3x3600":3.03850095e+10,"resource4x3600":2.01605956e+10,"resource1Productivity":"5750","resource2Productivity":"4000","resource3Productivity":"25350","resource4Productivity":"56300","resource1Capx3600":"2106000000","resource2Capx3600":"1476000000","resource3Capx3600":"9162000000","resource4Capx3600":"20304000000","resource1Upkeep":"555795","resource2Upkeep":"0","resource3Upkeep":"0","resource4Upkeep":"0","AETHERSTONE":"0"},"construction":{"eventUnixTime":"1320795559","constructionUnixTime":"1320789681","cityId":"60451","buildingId":"1565574","mayorPolitics":"72","techLevel":"6","constructionType":"4","constructionLevel":"8","constructionProgress":"0","constructionNeeded":"11520","constructionEta":"2011-11-08 15:39:19","constructionTicker":"2011-11-08 14:01:21","constructionStatus":"1","eventType":10},"research":{"eventUnixTime":"1320816453","researchUnixTime":"1320792923","cityId":"60451","playerId":null,"mayorInt":"72","techId":"12","researchLevel":"5","researchProgress":"0","researchNeeded":"32000","researchEta":"2011-11-08 21:27:33","researchTicker":"2011-11-08 14:55:23","researchStatus":"1","eventType":20}},"63675":{"production":{"ok":true,"mightInc":0,"reports":[],"fiscalUnixTime":1.32079456e+9,"happiness":"91","grievance":"0","population":"15284","laborPopulation":"1630","populationCap":"16800","gold":9720366,"goldUpkeep":"118","taxRate":"0","resourceUnixTime":1320794614,"resource1x3600":6.14101562e+12,"resource2x3600":7.13453332e+11,"resource3x3600":3.726493e+11,"resource4x3600":2.77392587e+11,"resource1Productivity":"5750","resource2Productivity":"2800","resource3Productivity":"5750","resource4Productivity":"5750","resource1Capx3600":"2106000000","resource2Capx3600":"1044000000","resource3Capx3600":"2106000000","resource4Capx3600":"2106000000","resource1Upkeep":"1017164","resource2Upkeep":"0","resource3Upkeep":"0","resource4Upkeep":"0","AETHERSTONE":"0"},"construction":{"eventUnixTime":"1320794965","constructionUnixTime":"1320791972","cityId":"63675","buildingId":"1564639","mayorPolitics":"65","techLevel":"6","constructionType":"2","constructionLevel":"8","constructionProgress":"0","constructionNeeded":"5760","constructionEta":"2011-11-08 15:29:25","constructionTicker":"2011-11-08 14:39:32","constructionStatus":"1","eventType":10},"research":{"eventUnixTime":"1320798589","researchUnixTime":"1320793155","cityId":"63675","playerId":null,"mayorInt":"65","techId":"15","researchLevel":"3","researchProgress":"0","researchNeeded":"7200","researchEta":"2011-11-08 16:29:49","researchTicker":"2011-11-08 14:59:15","researchStatus":"1","eventType":20}}},"guardian":{"60115":{"cityId":60115,"level":"1","upgrade":false,"timeLeft":0,"type":"wood","troopBoost":"1","guardianCount":1,"resources":{"wood":40,"ore":0,"food":0,"stone":0}},"60451":{"cityId":60451,"level":"0","upgrade":false,"timeLeft":0,"type":"wood","troopBoost":0,"guardianCount":1,"resources":{"wood":0,"ore":0,"food":0,"stone":0}},"63675":{"cityId":63675,"level":"0","upgrade":false,"timeLeft":0,"type":"wood","troopBoost":0,"guardianCount":1,"resources":{"wood":0,"ore":0,"food":0,"stone":0}}}},"newReportCount":14,"newTradeReports":"0","newDisasterReportCount":"0","newMailCount":"0","allianceDiplomacies":{"friendly":{"a990":{"allianceId":"990","allianceName":"la fureur du MAGICIEN","relation":"1","membersCount":"8","rank":""},"a2039":{"allianceId":"2039","allianceName":"Le Moulin Rouge","relation":"1","membersCount":"18","rank":""},"a1670":{"allianceId":"1670","allianceName":"Les Chevaliers Normands","relation":"1","membersCount":"6","rank":""}},"hostile":null,"friendlyToThem":null,"friendlyToYou":{"a1034":{"allianceId":"1034","allianceName":"De_kaamelot","relation":"1","membersCount":"0"},"a1408":{"allianceId":"1408","allianceName":"FredFabElo68","relation":"1","membersCount":"1"},"a1602":{"allianceId":"1602","allianceName":"Les Pirates Poutreurs","relation":"1","membersCount":"0"},"a2006":{"allianceId":"2006","allianceName":"LeS PouTreUrS LeGenDaireS","relation":"1","membersCount":"0"}},"allianceId":"769","allianceName":"LES GAIS POUTREURS"},"updateMight":900293,"reqmicrotime":1.32079461e+9,"resmicrotime":1.32079462e+9}

_dispatch.php
{"ok":true,"settings":{"playerId":"16273562","cityId":"60115","autoDelReport":"0","troopMode":"0","pausePct":"100","raidStartTime":"1320793620","lastUpdated":"1320793620"},"queue":[{"botMarches":{"marchUnixTime":1320794467,"destinationUnixTime":1320794670,"returnUnixTime":1320794873,"lastUpdatedUnixTime":1320794671,"marchId":41191,"playerId":16273562,"cityId":60115,"botSettingsId":13396,"botMarchStatus":2,"botState":1,"modalState":0,"restPeriod":3194,"fromPlayerId":16273562,"fromCityId":60115,"fromAllianceId":769,"fromXCoord":95,"fromYCoord":538,"toPlayerId":0,"toCityId":0,"toTileId":329493,"toAllianceId":0,"toXCoord":96,"toYCoord":542,"toTileType":51,"toTileLevel":3,"marchType":9,"marchStatus":8,"marchTimestamp":1320794467,"destinationEta":1320794670,"returnEta":1320794873,"gold":3000,"resource1":300000,"resource2":30000,"resource3":3000,"resource4":300,"unit0Count":0,"unit1Count":0,"unit2Count":0,"unit3Count":0,"unit4Count":0,"unit5Count":0,"unit6Count":3500,"unit7Count":0,"unit8Count":0,"unit9Count":50,"unit10Count":0,"unit11Count":0,"unit12Count":0,"unit0Return":0,"unit1Return":0,"unit2Return":0,"unit3Return":0,"unit4Return":0,"unit5Return":0,"unit6Return":3500,"unit7Return":0,"unit8Return":0,"unit9Return":50,"unit10Return":0,"unit11Return":0,"unit12Return":0,"speed":252,"knightId":189766,"knightCombat":64,"knightCombatBoostExpiration":false,"knightLevel":1,"knightSkillPointsApplied":9,"fromInformatics":6,"fromLoadTech":6,"lastUpdated":1320794671},"cityMarches":{"marchUnixTime":1320794467,"destinationUnixTime":1320794670,"returnUnixTime":1320794873,"lastUpdatedUnixTime":1320794671,"marchId":41191,"playerId":16273562,"cityId":60115,"botSettingsId":13396,"botMarchStatus":2,"botState":1,"modalState":0,"restPeriod":3194,"fromPlayerId":16273562,"fromCityId":60115,"fromAllianceId":769,"fromXCoord":95,"fromYCoord":538,"toPlayerId":0,"toCityId":0,"toTileId":329493,"toAllianceId":0,"toXCoord":96,"toYCoord":542,"toTileType":51,"toTileLevel":3,"marchType":9,"marchStatus":8,"marchTimestamp":1320794467,"destinationEta":1320794670,"returnEta":1320794873,"gold":3000,"resource1":300000,"resource2":30000,"resource3":3000,"resource4":300,"unit0Count":0,"unit1Count":0,"unit2Count":0,"unit3Count":0,"unit4Count":0,"unit5Count":0,"unit6Count":3500,"unit7Count":0,"unit8Count":0,"unit9Count":50,"unit10Count":0,"unit11Count":0,"unit12Count":0,"unit0Return":0,"unit1Return":0,"unit2Return":0,"unit3Return":0,"unit4Return":0,"unit5Return":0,"unit6Return":3500,"unit7Return":0,"unit8Return":0,"unit9Return":50,"unit10Return":0,"unit11Return":0,"unit12Return":0,"speed":252,"knightId":189766,"knightCombat":64,"knightCombatBoostExpiration":false,"knightLevel":1,"knightSkillPointsApplied":9,"fromInformatics":6,"fromLoadTech":6,"lastUpdated":1320794671}},{"botMarches":{"marchUnixTime":1320794476,"destinationUnixTime":1320794679,"returnUnixTime":1320794882,"lastUpdatedUnixTime":1320794681,"marchId":41192,"playerId":16273562,"cityId":60115,"botSettingsId":13396,"botMarchStatus":2,"botState":1,"modalState":0,"restPeriod":3194,"fromPlayerId":16273562,"fromCityId":60115,"fromAllianceId":769,"fromXCoord":95,"fromYCoord":538,"toPlayerId":0,"toCityId":0,"toTileId":329943,"toAllianceId":0,"toXCoord":99,"toYCoord":542,"toTileType":51,"toTileLevel":4,"marchType":9,"marchStatus":8,"marchTimestamp":1320794476,"destinationEta":1320794679,"returnEta":1320794882,"gold":4000,"resource1":400000,"resource2":40000,"resource3":4000,"resource4":400,"unit0Count":0,"unit1Count":0,"unit2Count":0,"unit3Count":0,"unit4Count":0,"unit5Count":0,"unit6Count":7500,"unit7Count":0,"unit8Count":0,"unit9Count":75,"unit10Count":0,"unit11Count":0,"unit12Count":0,"unit0Return":0,"unit1Return":0,"unit2Return":0,"unit3Return":0,"unit4Return":0,"unit5Return":0,"unit6Return":7500,"unit7Return":0,"unit8Return":0,"unit9Return":75,"unit10Return":0,"unit11Return":0,"unit12Return":0,"speed":288,"knightId":189762,"knightCombat":64,"knightCombatBoostExpiration":false,"knightLevel":1,"knightSkillPointsApplied":9,"fromInformatics":6,"fromLoadTech":7,"lastUpdated":1320794681},"cityMarches":{"marchUnixTime":1320794476,"destinationUnixTime":1320794679,"returnUnixTime":1320794882,"lastUpdatedUnixTime":1320794681,"marchId":41192,"playerId":16273562,"cityId":60115,"botSettingsId":13396,"botMarchStatus":2,"botState":1,"modalState":0,"restPeriod":3194,"fromPlayerId":16273562,"fromCityId":60115,"fromAllianceId":769,"fromXCoord":95,"fromYCoord":538,"toPlayerId":0,"toCityId":0,"toTileId":329943,"toAllianceId":0,"toXCoord":99,"toYCoord":542,"toTileType":51,"toTileLevel":4,"marchType":9,"marchStatus":8,"marchTimestamp":1320794476,"destinationEta":1320794679,"returnEta":1320794882,"gold":4000,"resource1":400000,"resource2":40000,"resource3":4000,"resource4":400,"unit0Count":0,"unit1Count":0,"unit2Count":0,"unit3Count":0,"unit4Count":0,"unit5Count":0,"unit6Count":7500,"unit7Count":0,"unit8Count":0,"unit9Count":75,"unit10Count":0,"unit11Count":0,"unit12Count":0,"unit0Return":0,"unit1Return":0,"unit2Return":0,"unit3Return":0,"unit4Return":0,"unit5Return":0,"unit6Return":7500,"unit7Return":0,"unit8Return":0,"unit9Return":75,"unit10Return":0,"unit11Return":0,"unit12Return":0,"speed":288,"knightId":189762,"knightCombat":64,"knightCombatBoostExpiration":false,"knightLevel":1,"knightSkillPointsApplied":9,"fromInformatics":6,"fromLoadTech":7,"lastUpdated":1320794681}}],"_ctrl":"BotManager","_action":"getMarches"}

march.php
{"ok":true,"marchId":"899079","tileId":"328887","tileType":"51","tileLevel":"7","initTS":"1320794844","distance":3.60555128,"speed":5100,"eta":"1320794879","delay":30,"liftFog":false,"updateSeed":{"city":{"60115":{"production":{"fiscalUnixTime":"1320794748","resourceUnixTime":"1320794844","cityId":"60115","happiness":"92","grievance":"0","population":"19872","populationCap":"21600","laborPopulation":"8800","taxRate":"0","goldUpkeep":"294","gold":"133095485","leaderPolitics":"0","leaderResourcefulness":"72","resource1Productivity":"5750","resource2Productivity":"4040","resource3Productivity":"26400","resource4Productivity":"53900","resource1Upkeep":"325766","resource2Upkeep":"0","resource3Upkeep":"0","resource4Upkeep":"0","resource1Capx3600":"2106000000","resource2Capx3600":"1490760000","resource3Capx3600":"9540000000","resource4Capx3600":"19440000000","resource1x3600":"2569933305760","resource2x3600":"617637239072","resource3x3600":"137630394900","resource4x3600":"1103179291873","resourceTimestamp":"2011-11-08 15:27:24","fiscalTimestamp":"2011-11-08 15:25:48","leaderCombat":"0","unit0Count":"0","unit1Count":"28","unit2Count":"21646","unit3Count":"225","unit4Count":"298","unit5Count":"236","unit6Count":"3000","unit7Count":"5698","unit8Count":"175","unit9Count":"1375","unit10Count":"130","unit11Count":"0","unit12Count":"0","gateStatus":"0","trainingLock":"0","marchLock":"0","resourcefulnessKnightId":"186058","politicsKnightId":"186057","combatKnightId":"186054","intelligenceKnightId":"186056","levyTimestamp":"2011-11-08 13:44:08","appeaseTimestamp":"0000-00-00 00:00:00","ok":{"ok":true}}}}},"atkBoostTime":0,"atk2BoostTime":0,"defBoostTime":0,"def2BoostTime":0,"knightCombatBoostTime":0,"marchUnixTime":1320794844,"reqmicrotime":"1320794844.6557","resmicrotime":"1320794844.8385"}
*/