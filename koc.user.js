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

console.log('koc start');

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
		+ "\n.koc-conf-panel-tab.on { background-color: #A5C77F; }"
		+ "\n.koc-conf-panel-tab.off { background-color: #A2ABA5; }"
		+ "\nkoc-chat ul { padding-left: 0; }"
;

var kocChatMoveableCss = ".kocmain .mod_comm { background: #FCF8DD; border: 1px solid #A56631; }"
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

var kocChatHighlightFriendsCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.friend:not(.direct) { background-color: #C3ECE4; }";
var kocChatHighlightFoesCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.foe:not(.direct) { background-color: #C3ECE4; }";

(function($){
	try{
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
					return false;
				}

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

			String.prototype.capitalize = function(){
				return this.charAt(0).toUpperCase() + this.slice(1);
			};

			//pointers
				var $head = $('head'),
					$body = $('body'),
					$chatInput = $('#mod_comm_input'),
					$chatGeneral = $('#mod_comm_list1'),
					$chatAlliance = $('#mod_comm_list2'),
					$chat = $('#kocmain_bottom').find('.mod_comm');

			//shared
				var $dragHandle = $('<div class="drag-handle">');

		console.log('before KOC object declaration');
		var KOC = {
			'init': function(){
				console.log('KOC init function');

				//clean and arrange the window
					$head.append( $('<link rel="stylesheet" href="http://koc.kapok.fr/jquery-ui-1.8.16.custom.css" type="text/css">') )
								.append( $('<style>').text(kocCss) );

					var kocFrame = parent.document.getElementById('kofc_iframe_0');
					//force koc iframe to width 100%
					kocFrame.style.width = '100%';

					//force wrapping iframe to width 100%
					var style = document.createElement('style')
					style.innerHTML = 'body { margin:0; width:100% !important;}';
					kocFrame.parentNode.appendChild(style);

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
							console.log('used stored conf');
							console.log(storedConf);
						}
					} catch( e ){
						console.error(e);
					}
					console.log(KOC.conf);

				//ajax sniffer
					KOC.ajaxSniffer();

				//configuration panel
					KOC.confPanel();

				//modules init
					for( var i = 0; i < KOC.modules.length; i++ ){
						KOC[ KOC.modules[i] ].on();
					}
			},
			'storeConf': function(){
				console.log('KOC storeConf function');
				console.log(KOC.conf);
				localStorage.setObject('koc_conf', KOC.conf);
			},
			'modules': ['chat', 'transport'],
			'towns': {},
			/* AJAX SNIFFER */
				'ajaxSniffer': function(){
					console.log('KOC ajaxSniffer function');
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
												if( KOC.conf.chat.highlightFriends ) KOC.chat.highlightFriends( r.data.newChats['1'].length );
												if( KOC.conf.chat.highlightFoes ) KOC.chat.highlightFoes( r.data.newChats['1'].length );
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
										console.log(KOC.chat.leaders);
										KOC.chat.highlightLeaders();
									}, false);
								}
								break;
						}

						this.oldOpen(method, url, async, user, password);
					}
					XMLHttpRequest.prototype.open = newOpen;
				},
			/* CONFIGURATION PANEL */
				//@todo generate panels content on first call, not on load (reduce loading time)
				//@todo remember which panel was opened
				'confPanel': function(){
					console.log('KOC confPanel function');
					$head.append( $('<style>').text(kocConfPanelCss) );

					var $confPanel = $('<div id="koc-conf-panel">');

					var $tabs = $('<ul>'),
						$optionsSection = $('<section id="koc-options">');

					$tabs.append('<li><a href="#koc-options">Options</a></li>');

					for( var i = 0; i < KOC.modules.length; i++ ){
						var mod = KOC.modules[i];
						$tabs.append(
							'<li class="koc-conf-panel-tab '+ (this[mod].active ? 'on' : 'off') +'">'
							+ '<a href="#koc-'+ mod +'">'+ mod.capitalize() +'</a>'
							+ '</li>'
						);
						$confPanel.append( '<section id="koc-'+ mod +'"></section>' );

						this[mod].confPanel( $optionsSection );
					}

					//manage the checked status change of the options
					$optionsSection
						.on('input', 'change', null, function(){
							var $this = $(this),
								infos = this.id.split('-'),
								mod = infos[0],
								func = infos[1],
								status = null;

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
							if( typeof KOC[ mod ][ func ] != 'function' ) KOC[ mod ][ func ]();
						})
						.on('button', 'click', null, function(e){
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
								if( !ui.panel.find('h2').length ){
									var mod = ui.panel.attr('id').split('-')[1];
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
							$('#koc-conf-panel').hide();
						});

					var $kocConfPanelToggle = $('<button id="koc-conf-panel-toggle">').text('KOC');
					$kocConfPanelToggle.click(function(){
						console.log('$kocConfPanelToggle click');
						$('#koc-conf-panel').toggle();
					});

					$body.append( $confPanel );
					KOC.$buttons = $('<div id="koc-buttons">').append( $kocConfPanelToggle );
					KOC.$buttons.insertBefore( $('#main_engagement_tabs') );
				},
				'generateOption': function(module, option, text, checked){
					return '<p><input type="checkbox" id="'+ module +'-'+ option +'" '+ (checked ? 'checked' : '') +' /><label for="'+ module +'-'+ option +'">'+ text +'</label></p>';
				},
				'generateButton': function(module, action, text){
					return '<p><button rel="'+ module +'-'+ action +'">'+ text +'</button></p>';
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
						console.log('KOC chat confPanel function');
						var $code = $('<p>').append( $('<h2>').text('Chat') );
						$code.append( KOC.generateOption('chat', 'active', 'Activer le module', KOC.conf.chat.active) );
						$code.append( KOC.generateOption('chat', 'moveable', 'Chat déplacable et redimensionnable', KOC.conf.chat.moveable) );
						$code.append( KOC.generateOption('chat', 'cleanHelp', 'Aider automiquement et masquer les demandes', KOC.conf.chat.cleanHelp) );
						$code.append( KOC.generateButton('chat', 'onRight', 'Repositionner le chat à droite') );
						$code.append( KOC.generateOption('chat', 'highlightLeaders', 'Changer la couleur des messages de la chancellerie (chats Général et Alliance)', KOC.conf.chat.highlightLeaders) );
						$code.append( KOC.generateButton('chat', 'getLeadersList', 'Raffraîchir la liste des joueurs de la chancellerie') );
						$code.append( KOC.generateOption('chat', 'highlightFriend', 'Changer la couleur des messages des amis (chat Général)', KOC.conf.chat.highlightFriends) );
						$code.append( KOC.generateOption('chat', 'highlightFoes', 'Changer la couleur des messages des ennemis (chat Général)', KOC.conf.chat.highlightFoes) );

						$section.append( $code );
					},
					'modPanel': function(){
						console.log('KOC chat modPanel function');
						var $section = $('#koc-chat');

						var friends = '';
						for(var i = 0; i < KOC.chat.friendsList.length; i++ ){
							friends += '<li><a href="#">'+ KOC.chat.friendsList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
						}

						var foes = '';
						for(var i = 0; i < KOC.chat.foesList.length; i++ ){
							foes += '<li><a href="#">'+ KOC.chat.foesList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>'
						}

						$section.append('<h2>Liste d\'amis</h2>')
								.append(
									  '<p><label for="koc-friend">Joueur : </label>'
									+ '<input type="text" name="koc-friend" id="koc-friend" />'
									+ '<button rel="friends">Ajouter</button></p>'
								)
								.append( $('<ul class="koc-chat-list" rel="friends">').append( friends ) )
								.append('<h2>Liste d\'ennemis</h2>')
								.append(
									  '<p><label for="koc-foe">Joueur : </label>'
									+ '<input type="text" name="koc-foe" id="koc-foe" />'
									+ '<button rel="foes">Ajouter</button></p>'
								)
								.append( $('<ul class="koc-chat-list" rel="foes">').append( foes ) );

						$section
							.on('button', 'click', null, function(e){
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
								}
							})
							.on('.ui-icon-trash', 'click', null, function(){
								var $li = $(this).parent(),
									rel = $li.parent().attr('rel'),
									list = rel + 'List';
								KOC.chat[list].splice(KOC.chat[list].indexOf( $li.find('a').text() ), 1);
								if( rel == 'friends' ) KOC.chat.storeFriendsList();
								else if( rel == 'foes' ) KOC.chat.storeFoesList();
								$li.remove();
							})
							.on('a', 'click', null, function(e){
								e.preventDefault();
								//use "native" function
								Chat.whisper( $(this).text() );
							});
					},
					'on': function(){
						console.log('KOC chat on function');
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

						//highlightFriends
							try{
								var persistentFriendsList = localStorage.getObject('koc_chat_friends_list');
								if( persistentFriendsList ){
									KOC.chat.friendsList = persistentFriendsList;
								}
							} catch(e){
								console.error(e);
							}

							if( KOC.conf.chat.highlightFriends ){
								KOC.chat.highlightFriendsOn();
							}

						//highlightFoes
							try{
								var persistentFoesList = localStorage.getObject('koc_chat_foes_list');
								if( persistentFoesList ){
									KOC.chat.foesList = persistentFoesList;
								}
							} catch(e){
								console.error(e);
							}

							if( KOC.conf.chat.highlightFoes ){
								KOC.chat.highlightFoesOn();
							}
					},
					'off': function(){
						console.log('KOC chat off function');
						KOC.chat.movableOff();
						KOC.chat.cleanHelpOff();
						KOC.chat.highlightLeadersOff();
						KOC.chat.highlightFriendsOff();
						KOC.chat.highlightFoesOff();
					},
					/* moveable */
						'moveableOn': function(){
							console.log('KOC chat movableOn function');
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
							console.log('KOC chat moveableOff function');
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
							console.log('KOC chat onRight function');
							KOC.conf.chat.position = {
								'top': KOC.conf.chat.onRightPosition.top,
								'left': KOC.conf.chat.onRightPosition.left
							};
							$chat.css(KOC.conf.chat.position);
							KOC.storeConf();
						},
					/* cleanHelp */
						'cleanHelpOn': function(){
							console.log('KOC chat cleanHelpOn function');
							$head.append( $('<style id="koc-chat-help">').text(kocChatHelpCss) );
						},
						'cleanHelpOff': function(){
							console.log('KOC chat cleanHelpOff function');
							$('#koc-chat-help').remove();
						},
						'cleanHelp': function( nbMsg ){
							console.log('KOC chat cleanHelp function');
							//suppression du superflu (demande aide et son résultat)
								if( KOC.conf.chat.active && KOC.conf.chat.cleanHelp ){
									setTimeout(function(){
										$chatAlliance
											.find('.chatwrap')
											.filter(':lt('+ nbMsg +')')
											.find('.tx')
											.find('a').each2(function(i, $helpLink){
												if( $helpLink.attr('onclick').indexOf('claimAllianceChatHelp') == 0 ){
													console.log('link found');
													$helpLink
														.click() //clic auto sur les demandes d'aides
														.closest('.chatwrap').remove(); //et suppression de la demande d'aide
													//suppression du résultat -> masqué en css .noalliance
												}
											});
									}, 250);
								}

							//highlight leaders
								if( KOC.conf.chat.active && KOC.conf.chat.highlightLeaders ){
									setTimeout(function(){
										$chatAlliance
											.find('.chatwrap')
											.find('nm').each2(function(i, $nm){
												var name = $nm.text();
												if( $.inArray(name, KOC.chat.leaders) > -1 ){
													$nm.closest('.chatwrap').removeClass('chancellor vice-chancellor officer').addClass( KOC.chat.leaders[ name ] );
												}
											});
									}, 250);
								}
						},
					/* highlight leaders */
						'highlightLeaders': function( $targetChat, nbMsg ){
							console.log('KOC chat highlightLeaders function');
							var $messages = $targetChat.find('.chatwrap');
							if( nbMsg > 0 ){
								$messages.filters(':lt('+ nbMsg +')');
							}

							$messages.find('.nm').each2(function(i, $nm){
								var name = $nm.text();
								if( KOC.chat.leaders[ name ] ){
									$nm.closest('.chatwrap').removeClass('chancellor vice_chancellor officer').addClass( KOC.chat.leaders[ name ] );
								}
							});
						},
						'getLeadersList': function(){
							//ajax call to get the leaders, highlighting will be done in the ajax response listener
							getDirectoryTabAllianceMembers();
						},
						'highlightLeadersOn': function(){
							console.log('KOC chat highlightLeadersOn function');
							KOC.chat.getLeadersList();

							$head.append( $('<style id="koc-chat-highlight-leaders">').text(kocChatHighlightLeadersCss) );
						},
						'highlightLeadersOff': function(){
							console.log('KOC chat highlightLeadersOff function');
							$('#koc-chat-highlight-leaders').remove();
							KOC.chat.leaders = {};
						},
					/* highlight friends */
						'highlightFriendsOn': function(){
							console.log('KOC chat highlightFriendsOn function');
							$head.append( $('<style id="koc-chat-highlight-friends">').text(kocChatHighlightFriendsCss) );
							KOC.chat.hightlightFriends(0);
						},
						'highlightFriendsOff': function(){
							console.log('KOC chat highlightFriendsOff function');
							$('#koc-chat-highlight-friends').remove();
						},
						'storeFriendsList': function(){
							console.log('KOC storeFriendsList function');
							console.log(KOC.chat.friendsList);
							localStorage.setObject('koc_chat_friends_list', KOC.chat.friendsList);
						},
						'highlightFriends': function( nbMsg ){
							console.log('KOC chat highlightFriends function');
							if( KOC.chat.friendsList.lenght ){
								var $messages = $chatGeneral.find('.chatwrap');
								if( nbMsg > 0 ){
									$messages.filters(':lt('+ nbMsg +')');
								}

								$messages.find('.nm').each2(function(i, $nm){
									var name = $nm.text().replace(/^(Lady |Lord )/, '');
									if( KOC.chat.friendsList[ name ] ){
										$nm.closest('.chatwrap').addClass('friend');
									}
								});
							}
						},
					/* highlight foes */
						'highlightFoesOn': function(){
							console.log('KOC chat highlightFoesOn function');
							$head.append( $('<style id="koc-chat-highlight-foes">').text(kocChatHighlightFoesCss) );
							KOC.chat.hightlightFoes(0);
						},
						'highlightFoesOff': function(){
							console.log('KOC chat highlightFoesOff function');
							$('#koc-chat-highlight-foes').remove();
						},
						'storeFoesList': function(){
							console.log('KOC storeFoesList function');
							console.log(KOC.chat.foesList);
							localStorage.setObject('koc_chat_foes_list', KOC.chat.foesList);
						},
						'highlightFoes': function( nbMsg ){
							console.log('KOC chat highlightFoes function');
							if( KOC.chat.foesList.lenght ){
								var $messages = $chatGeneral.find('.chatwrap');
								if( nbMsg > 0 ){
									$messages.filters(':lt('+ nbMsg +')');
								}

								$messages.find('.nm').each2(function(i, $nm){
									var name = $nm.text().replace(/^(Lady |Lord )/, '');
									if( KOC.chat.foesList[ name ] ){
										$nm.closest('.chatwrap').addClass('foe');
									}
								});
							}
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
						console.log('KOC transport confPanel function');
						var $code = $('<p>').append( $('<h2>').text('Transport') );
						$code.append( KOC.generateOption('transport', 'active', 'Activer le module', KOC.conf.transport.active) );

						$section.append( $code );
					},
					'modPanel': function(){
						console.log('KOC transport modPanel function');

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
						console.log('KOC transport on function');

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
						console.log('KOC transport off function');

						KOC.conf.transport.automaticOff();
					},
					'automaticOn': function(){
						console.log('KOC transport automaticOn function');
					},
					'automaticOff': function(){
						console.log('KOC transport automaticOff function');
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
					}
				},
			'conf': { // will contains all the modules default configuration options
			}
		};

		console.log('after KOC object declaration');

		KOC.init();
	} catch (e) {
		console.log(e);
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
